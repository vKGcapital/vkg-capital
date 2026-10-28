import { request as httpRequest, type RequestOptions } from "node:http";
import { request as httpsRequest } from "node:https";

export type UpstreamBody = {
  ok: boolean;
  status: number;
  text: string;
};

const MAX_BODY_BYTES = 2_000_000;
const MAX_REDIRECTS = 4;

/**
 * Read a URL with a hard deadline. The socket is destroyed when the deadline
 * hits, including a connect that never completes. `fetch` + AbortSignal leaves
 * those sockets open until the OS gives up.
 */
export function readUpstream(url: string, init: RequestInit = {}, timeoutMs: number): Promise<UpstreamBody> {
  return readUntil(url, init, Date.now() + timeoutMs, 0);
}

function readUntil(url: string, init: RequestInit, deadline: number, redirects: number): Promise<UpstreamBody> {
  const remaining = deadline - Date.now();
  if (remaining <= 0) return Promise.reject(new DOMException("Upstream timed out", "TimeoutError"));
  if (redirects > MAX_REDIRECTS) return Promise.resolve({ ok: false, status: 0, text: "" });

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return Promise.resolve({ ok: false, status: 0, text: "" });
  }
  if (target.protocol !== "https:" && target.protocol !== "http:") {
    return Promise.resolve({ ok: false, status: 0, text: "" });
  }

  const request = target.protocol === "https:" ? httpsRequest : httpRequest;
  const method = init.method ?? "GET";
  const options: RequestOptions = {
    method,
    headers: headersToRecord(init.headers),
    timeout: remaining,
  };

  return new Promise((resolve, reject) => {
    let settled = false;
    const done = (finish: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      init.signal?.removeEventListener("abort", onAbort);
      finish();
    };
    const fail = (error: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      init.signal?.removeEventListener("abort", onAbort);
      req.destroy();
      reject(error);
    };
    const onAbort = () => fail(new DOMException("Upstream aborted", "AbortError"));
    const req = request(target, options, (res) => {
      const status = res.statusCode ?? 0;
      const location = res.headers.location;
      if (location && status >= 300 && status < 400) {
        res.resume();
        const nextInit: RequestInit =
          status === 307 || status === 308 ? init : { ...init, method: "GET", body: undefined };
        let next: string;
        try {
          next = new URL(location, target).toString();
        } catch {
          done(() => resolve({ ok: false, status, text: "" }));
          return;
        }
        done(() => resolve(readUntil(next, nextInit, deadline, redirects + 1)));
        return;
      }
      if (status < 200 || status >= 300) {
        res.resume();
        done(() => resolve({ ok: false, status, text: "" }));
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      res.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > MAX_BODY_BYTES) {
          fail(new DOMException("Upstream body too large", "TimeoutError"));
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => {
        const type = typeof res.headers["content-type"] === "string" ? res.headers["content-type"] : undefined;
        done(() => resolve({ ok: true, status, text: decodeBody(Buffer.concat(chunks), type) }));
      });
      res.on("error", fail);
    });

    const timer = setTimeout(() => fail(new DOMException("Upstream timed out", "TimeoutError")), remaining);
    if (init.signal?.aborted) onAbort();
    else init.signal?.addEventListener("abort", onAbort, { once: true });

    req.on("timeout", () => fail(new DOMException("Upstream timed out", "TimeoutError")));
    req.on("error", (error) => {
      if (!settled) fail(error);
    });

    const body = init.body;
    if (typeof body === "string" || body instanceof Uint8Array) req.end(body);
    else if (body == null) req.end();
    else fail(new TypeError("Unsupported upstream body"));
  });
}

function decodeBody(buffer: Buffer, contentType: string | undefined): string {
  const match = contentType?.match(/charset=([^;]+)/i);
  const charset = match?.[1]?.trim().replaceAll('"', "") || "utf-8";
  try {
    return new TextDecoder(charset).decode(buffer);
  } catch {
    return buffer.toString("utf8");
  }
}

function headersToRecord(headers: HeadersInit | undefined): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    const out: Record<string, string> = {};
    headers.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return { ...headers };
}

export type SwrOptions<T> = {
  freshMs: number;
  /** Max wait for a refresh when a last-good value is already cached. */
  waitForFreshMs: number;
  /** Hard stop so a hung `load` cannot pin the single-flight slot. */
  loadTimeoutMs: number;
  isFresh: (value: T) => boolean;
  load: () => Promise<T>;
};

/**
 * Fresh cache is returned immediately. A stale cache is returned if the refresh
 * misses `waitForFreshMs`. The refresh keeps running and replaces the cache
 * when it succeeds, including when it finishes after that wait.
 * With no cache, the caller waits until `load` settles or `loadTimeoutMs`.
 */
export function createStaleWhileRevalidate<T>(options: SwrOptions<T>): () => Promise<T> {
  let cached: { at: number; value: T } | null = null;
  let inflight: Promise<T> | null = null;

  function refresh(): Promise<T> {
    if (inflight) return inflight;
    let settled = false;
    const run = new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new DOMException(`Refresh timed out after ${options.loadTimeoutMs}ms`, "TimeoutError"));
      }, options.loadTimeoutMs);
      options.load().then(
        (value) => {
          if (options.isFresh(value)) cached = { at: Date.now(), value };
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(value);
        },
        (error: unknown) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(error);
        },
      );
    }).finally(() => {
      if (inflight === run) inflight = null;
    });
    inflight = run;
    return run;
  }

  return async function read(): Promise<T> {
    const hit = cached;
    if (hit && Date.now() - hit.at < options.freshMs) return hit.value;

    const pending = refresh();
    if (!hit) {
      try {
        const value = await pending;
        if (!options.isFresh(value) && cached) return cached.value;
        return value;
      } catch (error) {
        if (cached) return cached.value;
        throw error;
      }
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const outcome = await Promise.race([
      pending.then(
        (value) => ({ type: "value" as const, value }),
        () => ({ type: "error" as const }),
      ),
      new Promise<{ type: "timeout" }>((resolve) => {
        timer = setTimeout(() => resolve({ type: "timeout" }), options.waitForFreshMs);
      }),
    ]);
    clearTimeout(timer);
    if (outcome.type === "value" && options.isFresh(outcome.value)) return outcome.value;
    return hit.value;
  };
}
