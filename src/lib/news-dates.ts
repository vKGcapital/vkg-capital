/**
 * Publication instants for RSS items.
 *
 * Stadt Wien (verified against the live feed and the article page): `pubDate`
 * is labeled GMT but sits about two hours ahead of `dc:date`. `dc:date` matches
 * `article:published_time`. That gap is what shows Wien items roughly an hour
 * or two ahead of the editorial clock. Prefer `dc:date` only inside that
 * timezone-sized window so a genuinely older created-date is left alone.
 *
 * Hunch, not seen on the Wien feed (those stamps include GMT or +01:00): a
 * datetime with no offset is a DACH local time. `Date.parse` on the UTC server
 * would read it as UTC and place Vienna winter time one hour in the future.
 *
 * Anything still more than a few minutes ahead of fetch time is omitted.
 * Clamping it to "now" would keep an embargo at the top of a newest-first list.
 */

export const FUTURE_TOLERANCE_MS = 15 * 60 * 1000;

const TZ_AHEAD_MIN_MS = 30 * 60 * 1000;
const TZ_AHEAD_MAX_MS = 3 * 60 * 60 * 1000;
const LOCAL_ZONE = "Europe/Vienna";

const MONTHS: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

export function selectPublishedAt(input: { pubDate?: string; dcDate?: string; now: number }): string | null {
  const pubRaw = cleanDateText(input.pubDate ?? "");
  const dcRaw = cleanDateText(input.dcDate ?? "");
  const pub = pubRaw ? parseFeedInstant(pubRaw) : null;
  const dc = dcRaw ? parseFeedInstant(dcRaw) : null;
  let chosen = pub ?? dc;
  if (pub != null && dc != null && hasExplicitZone(dcRaw)) {
    const ahead = pub - dc;
    if (ahead >= TZ_AHEAD_MIN_MS && ahead <= TZ_AHEAD_MAX_MS) chosen = dc;
  }
  if (chosen == null) return null;
  if (chosen - input.now > FUTURE_TOLERANCE_MS) return null;
  return new Date(chosen).toISOString();
}

export function parseFeedInstant(value: string): number | null {
  const text = cleanDateText(value);
  if (!text) return null;
  if (hasExplicitZone(text)) {
    const time = Date.parse(text);
    return Number.isNaN(time) ? null : time;
  }
  return parseZoneless(text);
}

export function shortTeaser(value: string, max = 220): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 40 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

function cleanDateText(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasExplicitZone(value: string): boolean {
  if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(value)) return true;
  return /\s(?:GMT|UTC|UT|[ECMP][SD]T|[A-Z]{2,4})$/.test(value);
}

function parseZoneless(text: string): number | null {
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?$/);
  if (iso) {
    return civilToUtc(
      Number(iso[1]),
      Number(iso[2]),
      Number(iso[3]),
      iso[4] != null ? Number(iso[4]) : 0,
      iso[5] != null ? Number(iso[5]) : 0,
      iso[6] != null ? Number(iso[6]) : 0,
    );
  }
  const rfc = text.match(/^(?:[A-Za-z]{3},?\s+)?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!rfc) return null;
  const month = MONTHS[rfc[2].toLowerCase()];
  if (!month) return null;
  return civilToUtc(
    Number(rfc[3]),
    month,
    Number(rfc[1]),
    rfc[4] != null ? Number(rfc[4]) : 0,
    rfc[5] != null ? Number(rfc[5]) : 0,
    rfc[6] != null ? Number(rfc[6]) : 0,
  );
}

function civilToUtc(year: number, month: number, day: number, hour: number, minute: number, second: number): number | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) return null;
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const offset = zoneOffsetMs(utcGuess);
  let instant = utcGuess - offset;
  const offset2 = zoneOffsetMs(instant);
  if (offset2 !== offset) instant = utcGuess - offset2;
  const seen = partsInZone(instant);
  if (!seen || seen.year !== year || seen.month !== month || seen.day !== day) return null;
  if (seen.hour !== hour || seen.minute !== minute || seen.second !== second) return null;
  return instant;
}

function zoneOffsetMs(utcMs: number): number {
  const seen = partsInZone(utcMs);
  if (!seen) return 0;
  return Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute, seen.second) - utcMs;
}

function partsInZone(utcMs: number): { year: number; month: number; day: number; hour: number; minute: number; second: number } | null {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: LOCAL_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    fmt
      .formatToParts(new Date(utcMs))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  let hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const second = Number(parts.second);
  if ([year, month, day, hour, minute, second].some((part) => Number.isNaN(part))) return null;
  if (hour === 24) hour = 0;
  return { year, month, day, hour, minute, second };
}
