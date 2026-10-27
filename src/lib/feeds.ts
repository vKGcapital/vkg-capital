import { createServerFn } from "@tanstack/react-start";
import {
  INSTRUMENTS,
  type BoardPayload,
  type Instrument,
  type NewsItem,
  type NewsPayload,
  type Quote,
} from "@/lib/market";
import { selectPublishedAt, shortTeaser } from "@/lib/news-dates";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

type Cache<T> = { at: number; value: T };

let boardCache: Cache<BoardPayload> | null = null;
let newsCache: Cache<NewsPayload> | null = null;

const FEEDS: Array<{ source: string; url: string }> = [
  { source: "tagesschau", url: "https://www.tagesschau.de/wirtschaft/index~rss2.xml" },
  { source: "n-tv", url: "https://www.n-tv.de/wirtschaft/rss" },
  { source: "DER SPIEGEL", url: "https://www.spiegel.de/wirtschaft/index.rss" },
];

export const loadBoard = createServerFn({ method: "GET" }).handler(async (): Promise<BoardPayload> => {
  const now = Date.now();
  if (boardCache && now - boardCache.at < 30_000) return boardCache.value;
  const value = await buildBoard();
  if (value.ok) boardCache = { at: now, value };
  return value;
});

export const loadNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsPayload> => {
  const now = Date.now();
  if (newsCache && now - newsCache.at < 180_000) return newsCache.value;
  const value = await buildNews();
  if (value.ok) newsCache = { at: now, value };
  return value;
});

async function buildBoard(): Promise<BoardPayload> {
  const asOf = new Date().toISOString();
  const batches = chunk(INSTRUMENTS, 6);
  const settled = await Promise.all(batches.map((batch) => fetchSpark(batch)));
  const bySymbol = new Map<string, Quote>();
  for (const list of settled) {
    for (const quote of list) bySymbol.set(quote.symbol, quote);
  }
  const missing = INSTRUMENTS.filter((item) => !bySymbol.has(item.symbol));
  if (missing.length > 0) {
    const extra = await Promise.all(missing.map((item) => fetchChart(item)));
    for (const quote of extra) {
      if (quote) bySymbol.set(quote.symbol, quote);
    }
  }
  const quotes = INSTRUMENTS.flatMap((item) => {
    const quote = bySymbol.get(item.symbol);
    return quote ? [quote] : [];
  });
  if (quotes.length === 0) {
    return {
      ok: false,
      asOf,
      message: "Die Kursquelle ist gerade nicht erreichbar. Bitte gleich noch einmal aktualisieren.",
      quotes: [],
    };
  }
  return { ok: true, asOf, message: null, quotes };
}

async function fetchSpark(batch: Instrument[]): Promise<Quote[]> {
  const symbols = batch.map((item) => encodeURIComponent(item.symbol)).join(",");
  const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${symbols}&range=1d&interval=5m`;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return [];
    const data = (await response.json()) as YahooSpark;
    const rows = data.spark?.result ?? [];
    const quotes: Quote[] = [];
    for (const row of rows) {
      const meta = row.response?.[0]?.meta;
      const closes = row.response?.[0]?.indicators?.quote?.[0]?.close ?? [];
      if (!meta) continue;
      const symbol = typeof meta.symbol === "string" ? meta.symbol : row.symbol;
      const spec = batch.find((item) => item.symbol === symbol);
      if (!spec || !symbol) continue;
      const price = asNumber(meta.regularMarketPrice);
      if (price == null) continue;
      const previous = asNumber(meta.previousClose) ?? asNumber(meta.chartPreviousClose);
      const change = previous == null ? (asNumber(meta.fulldayChange) ?? 0) : price - previous;
      const changePercent =
        previous && previous !== 0
          ? (change / previous) * 100
          : (asNumber(meta.regularMarketChangePercent) ?? 0);
      const quotedSeconds = asNumber(meta.regularMarketTime);
      const volume = asNumber(meta.regularMarketVolume);
      const timestamps = row.response?.[0]?.timestamp ?? [];
      const points: Array<{ t: number; v: number }> = [];
      closes.forEach((point, index) => {
        if (typeof point !== "number" || !Number.isFinite(point)) return;
        const stamp = timestamps[index];
        points.push({ t: typeof stamp === "number" ? stamp : 0, v: point });
      });
      const session = points.slice(-96);
      quotes.push({
        symbol,
        name: spec.name,
        group: spec.group,
        unit: spec.unit,
        digits: spec.digits,
        price,
        change,
        changePercent,
        high: asNumber(meta.regularMarketDayHigh),
        low: asNumber(meta.regularMarketDayLow),
        volume: volume && volume > 0 ? volume : null,
        spark: session.map((point) => point.v),
        sparkAt: session.map((point) => point.t),
        quotedAt: quotedSeconds ? new Date(quotedSeconds * 1000).toISOString() : null,
      });
    }
    return quotes;
  } catch {
    return [];
  }
}

async function fetchChart(spec: Instrument): Promise<Quote | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(spec.symbol)}?interval=5m&range=1d&includePrePost=false`;
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      chart?: {
        result?: Array<{
          timestamp?: number[];
          meta?: {
            regularMarketPrice?: unknown;
            previousClose?: unknown;
            chartPreviousClose?: unknown;
            regularMarketTime?: unknown;
            regularMarketVolume?: unknown;
            regularMarketDayHigh?: unknown;
            regularMarketDayLow?: unknown;
          };
          indicators?: { quote?: Array<{ close?: Array<number | null> }> };
        }>;
      };
    };
    const row = data.chart?.result?.[0];
    const meta = row?.meta;
    if (!row || !meta) return null;
    const price = asNumber(meta.regularMarketPrice);
    if (price == null) return null;
    const previous = asNumber(meta.previousClose) ?? asNumber(meta.chartPreviousClose);
    const change = previous == null ? 0 : price - previous;
    const changePercent = previous && previous !== 0 ? (change / previous) * 100 : 0;
    const quotedSeconds = asNumber(meta.regularMarketTime);
    const volume = asNumber(meta.regularMarketVolume);
    const closes = row.indicators?.quote?.[0]?.close ?? [];
    const timestamps = row.timestamp ?? [];
    const points: Array<{ t: number; v: number }> = [];
    closes.forEach((point, index) => {
      if (typeof point !== "number" || !Number.isFinite(point)) return;
      const stamp = timestamps[index];
      points.push({ t: typeof stamp === "number" ? stamp : 0, v: point });
    });
    const session = points.slice(-96);
    return {
      symbol: spec.symbol,
      name: spec.name,
      group: spec.group,
      unit: spec.unit,
      digits: spec.digits,
      price,
      change,
      changePercent,
      high: asNumber(meta.regularMarketDayHigh),
      low: asNumber(meta.regularMarketDayLow),
      volume: volume && volume > 0 ? volume : null,
      spark: session.map((point) => point.v),
      sparkAt: session.map((point) => point.t),
      quotedAt: quotedSeconds ? new Date(quotedSeconds * 1000).toISOString() : null,
    };
  } catch {
    return null;
  }
}

async function buildNews(): Promise<NewsPayload> {
  const asOf = new Date().toISOString();
  const settled = await Promise.all(FEEDS.map((feed) => readFeed(feed.source, feed.url)));
  const merged = mergeDuplicates(settled.flat()).slice(0, 8);
  if (merged.length === 0) {
    return { ok: false, asOf, message: "Nachrichten sind gerade nicht erreichbar.", items: [] };
  }
  const items = await applyOwnSummaries(merged);
  return { ok: true, asOf, message: null, items };
}

const STOP = new Set([
  "der", "die", "das", "und", "oder", "von", "zu", "zum", "zur", "im", "in", "auf", "für", "mit", "ein", "eine",
  "einer", "einem", "einen", "ist", "sind", "wird", "werden", "nach", "bei", "als", "auch", "nicht", "den", "dem",
  "des", "am", "an", "es", "um", "aus", "über", "vor", "bis", "mehr", "so", "wie", "dass", "hat", "haben", "durch",
  "ohne", "nur", "noch", "schon", "seine", "dieser", "diese", "dieses",
]);

type Draft = {
  id: string;
  title: string;
  teaser: string;
  url: string;
  source: string;
  publishedAt: string;
  also: NewsItem["also"];
};

function titleTokens(title: string): { words: Set<string>; numbers: Set<string> } {
  const words = new Set<string>();
  const numbers = new Set(title.match(/\d+(?:[.,]\d+)?/g) ?? []);
  for (const raw of title.toLocaleLowerCase("de-DE").replace(/[^\p{L}\p{N}.,]+/gu, " ").split(/\s+/)) {
    const word = raw.replace(/^[.,]+|[.,]+$/g, "");
    if (word.length < 2 || STOP.has(word)) continue;
    words.add(word);
  }
  return { words, numbers };
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / (left.size + right.size - shared);
}

function mergeDuplicates(items: Draft[]): Draft[] {
  const sorted = [...items].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  const kept: Array<Draft & { words: Set<string>; numbers: Set<string> }> = [];
  for (const item of sorted) {
    const { words, numbers } = titleTokens(item.title);
    const time = Date.parse(item.publishedAt);
    const match = kept.find((candidate) => {
      if (Math.abs(time - Date.parse(candidate.publishedAt)) > 6 * 60 * 60 * 1000) return false;
      const score = jaccard(words, candidate.words);
      const sharedNumber = [...numbers].some((value) => value.length >= 3 && candidate.numbers.has(value));
      return score >= 0.4 || (sharedNumber && score >= 0.15);
    });
    if (!match) {
      kept.push({ ...item, also: [], words, numbers });
      continue;
    }
    if (match.url !== item.url && !match.also.some((entry) => entry.url === item.url)) {
      match.also.push({ source: item.source, url: item.url });
    }
  }
  return kept.map(({ words: _words, numbers: _numbers, ...item }) => item);
}

const summaryCache = new Map<string, string>();

async function applyOwnSummaries(items: Draft[]): Promise<NewsItem[]> {
  const apiKey = process.env.XAI_API_KEY;
  const pending = items.filter((item) => !summaryCache.has(item.url));
  if (apiKey && pending.length > 0) {
    try {
      const lines = pending
        .map((item, index) => `${index + 1}. ${item.source}: ${item.title}. Stoff: ${item.teaser.slice(0, 280)}`)
        .join("\n");
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 1600,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "Fasse jede Meldung in 1–2 eigenen deutschen Sätzen sachlich zusammen, max. 220 Zeichen, keine wörtlichen Zitate, keine Wertung, keine Anlageempfehlung. Genau eine Zeile je Meldung: Nummer|||Text",
            },
            { role: "user", content: lines },
          ],
        }),
      });
      if (response.ok) {
        const body = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
        const text = body.choices?.[0]?.message?.content ?? "";
        const rows = text.split("\n").flatMap((row) => {
          const strict = row.match(/(\d+)\s*\|\|\|\s*(.+)/);
          const loose = row.match(/^\s*(\d+)[.)]\s+(.+)/);
          const match = strict ?? loose;
          return match ? [match] : [];
        });
        for (const match of rows) {
          if (!match) continue;
          const item = pending[Number(match[1]) - 1];
          const sentence = match[2].replace(/\s+/g, " ").trim();
          if (!item || sentence.length < 12) continue;
          summaryCache.set(item.url, clip(sentence, 220));
        }
      }
    } catch {
      // Ohne Kurzfassung bleiben Überschrift, Quelle und Link.
    }
  }
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    summary: summaryCache.get(item.url) ?? "",
    url: item.url,
    source: item.source,
    publishedAt: item.publishedAt,
    also: item.also,
  }));
}

function clip(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 40 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

async function readFeed(source: string, url: string): Promise<Draft[]> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml" },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRss(xml, source);
  } catch {
    return [];
  }
}

function parseRss(xml: string, source: string): Draft[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const items: Draft[] = [];
  for (const block of blocks) {
    const title = cleanText(firstTag(block, "title"));
    const url = safeHttp(firstTag(block, "link"));
    const publishedAt = selectPublishedAt({
      pubDate: firstTag(block, "pubDate"),
      dcDate: firstTag(block, "dc:date"),
      now: Date.now(),
    });
    if (!title || !url || !publishedAt) continue;
    const id = firstTag(block, "guid") || url;
    items.push({
      id: `${source}:${id}`.slice(0, 240),
      title: truncate(title, 180),
      teaser: shortTeaser(cleanText(firstTag(block, "description"))),
      url,
      source,
      publishedAt,
      also: [],
    });
  }
  return items.slice(0, 8);
}

function firstTag(block: string, name: string): string {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function cleanText(value: string): string {
  return decode(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/"([^"]+)"/g, "„$1“")
    .replace(/\s+/g, " ")
    .trim();
}

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

function safeHttp(value: string): string | null {
  const text = decode(value).trim();
  try {
    const url = new URL(text);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let index = 0; index < items.length; index += size) out.push(items.slice(index, index + size));
  return out;
}

type YahooSpark = {
  spark?: {
    result?: Array<{
      symbol?: string;
      response?: Array<{
        meta?: Record<string, unknown>;
        timestamp?: number[];
        indicators?: { quote?: Array<{ close?: Array<number | null> }> };
      }>;
    }> | null;
  };
};
