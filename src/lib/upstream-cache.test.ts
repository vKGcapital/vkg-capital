import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { NEWS_BUDGET_MS, REVALIDATE_WAIT_MS, UPSTREAM_TIMEOUT_MS } from "./upstream-budget.ts";
import { createStaleWhileRevalidate, readUpstream } from "./upstream-cache.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("upstream budgets", () => {
  it("caps each upstream at a few seconds", () => {
    assert.ok(UPSTREAM_TIMEOUT_MS <= 4_000, `quote/feed timeout is ${UPSTREAM_TIMEOUT_MS}ms`);
    assert.ok(NEWS_BUDGET_MS <= 4_500, `news budget is ${NEWS_BUDGET_MS}ms`);
    assert.ok(REVALIDATE_WAIT_MS <= 1_000, `stale wait is ${REVALIDATE_WAIT_MS}ms`);
    assert.ok(REVALIDATE_WAIT_MS < UPSTREAM_TIMEOUT_MS);
  });
});

describe("readUpstream", () => {
  it("returns while a peer accepts and never responds", async () => {
    const server = createServer(() => {});
    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => resolve());
    });
    const address = server.address() as AddressInfo;
    const started = performance.now();
    try {
      await assert.rejects(() => readUpstream(`http://127.0.0.1:${address.port}/hang`, {}, 400));
      const elapsed = performance.now() - started;
      assert.ok(elapsed < 1_000, `hung upstream blocked for ${elapsed.toFixed(0)}ms`);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  it("returns while a blackhole address never connects", async () => {
    const started = performance.now();
    await assert.rejects(() => readUpstream("http://192.0.2.1:81/hang", {}, 400));
    const elapsed = performance.now() - started;
    assert.ok(elapsed < 1_200, `blackhole connect blocked for ${elapsed.toFixed(0)}ms`);
  });
});

describe("stale while revalidate", () => {
  it("serves the last good payload when the refresh hangs", async () => {
    let calls = 0;
    const read = createStaleWhileRevalidate({
      freshMs: 40,
      waitForFreshMs: REVALIDATE_WAIT_MS,
      loadTimeoutMs: REVALIDATE_WAIT_MS + 200,
      isFresh: (value: { ok: boolean }) => value.ok,
      load: () => {
        calls += 1;
        if (calls === 1) return Promise.resolve({ ok: true, price: 18_432 });
        return new Promise<{ ok: boolean }>(() => {});
      },
    });

    assert.deepEqual(await read(), { ok: true, price: 18_432 });
    await new Promise((resolve) => setTimeout(resolve, 50));

    const started = performance.now();
    const value = await read();
    const elapsed = performance.now() - started;
    assert.deepEqual(value, { ok: true, price: 18_432 });
    assert.ok(elapsed < REVALIDATE_WAIT_MS + 350, `stale read took ${elapsed.toFixed(0)}ms`);
    assert.equal(calls, 2);
  });

  it("keeps the last good payload when a refresh fails", async () => {
    let calls = 0;
    const read = createStaleWhileRevalidate({
      freshMs: 20,
      waitForFreshMs: 200,
      loadTimeoutMs: 500,
      isFresh: (value: { ok: boolean }) => value.ok,
      load: async () => {
        calls += 1;
        if (calls === 1) return { ok: true, price: 9 };
        return { ok: false, price: 0 };
      },
    });
    assert.deepEqual(await read(), { ok: true, price: 9 });
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.deepEqual(await read(), { ok: true, price: 9 });
  });

  it("shares one refresh across concurrent readers", async () => {
    let calls = 0;
    const read = createStaleWhileRevalidate({
      freshMs: 5_000,
      waitForFreshMs: 50,
      loadTimeoutMs: 500,
      isFresh: () => true,
      load: async () => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 40));
        return calls;
      },
    });
    const values = await Promise.all([read(), read(), read(), read()]);
    assert.deepEqual(values, [1, 1, 1, 1]);
    assert.equal(calls, 1);
  });

  it("stops waiting when there is no cache and the refresh never returns", async () => {
    const read = createStaleWhileRevalidate({
      freshMs: 1_000,
      waitForFreshMs: 50,
      loadTimeoutMs: 200,
      isFresh: () => true,
      load: () => new Promise(() => {}),
    });
    const started = performance.now();
    await assert.rejects(read());
    const elapsed = performance.now() - started;
    assert.ok(elapsed < 700, `cold hang blocked for ${elapsed.toFixed(0)}ms`);
  });
});

describe("pages that do not show quotes or news", () => {
  const quiet = [
    "src/routes/__root.tsx",
    "src/routes/impressum.tsx",
    "src/routes/datenschutz.tsx",
    "src/routes/agb.tsx",
    "src/routes/ueber-uns.tsx",
    "src/routes/kommentar.tsx",
    "src/routes/kommentar.$slug.tsx",
    "src/routes/redaktion.tsx",
    "src/routes/sitemap[.]xml.ts",
  ];

  it("does not load the market or news server functions", () => {
    for (const path of quiet) {
      const source = readFileSync(join(root, path), "utf8");
      assert.equal(source.includes("loadBoard") || source.includes("loadNews"), false, path);
    }
  });

  it("still loads them on the pages that display them", () => {
    for (const path of ["src/routes/index.tsx", "src/routes/maerkte.tsx", "src/routes/nachrichten.tsx"]) {
      const source = readFileSync(join(root, path), "utf8");
      assert.equal(source.includes("loadBoard") || source.includes("loadNews"), true, path);
    }
  });
});
