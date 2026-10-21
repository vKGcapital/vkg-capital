export type Group = "index" | "equity" | "market";

export type Instrument = {
  symbol: string;
  name: string;
  group: Group;
  digits: number;
  unit: string;
};

export const INSTRUMENTS: Instrument[] = [
  { symbol: "^GDAXI", name: "DAX", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^MDAXI", name: "MDAX", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^SDAXI", name: "SDAX", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^STOXX50E", name: "EURO STOXX 50", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^SSMI", name: "SMI", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^ATX", name: "ATX", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "^GSPC", name: "S&P 500", group: "index", digits: 2, unit: "Pkt." },
  { symbol: "EURUSD=X", name: "Euro / US-Dollar", group: "market", digits: 4, unit: "USD" },
  { symbol: "GC=F", name: "Gold", group: "market", digits: 2, unit: "USD" },
  { symbol: "BZ=F", name: "Brent", group: "market", digits: 2, unit: "USD" },
  { symbol: "SAP.DE", name: "SAP", group: "equity", digits: 2, unit: "€" },
  { symbol: "SIE.DE", name: "Siemens", group: "equity", digits: 2, unit: "€" },
  { symbol: "ALV.DE", name: "Allianz", group: "equity", digits: 2, unit: "€" },
  { symbol: "MUV2.DE", name: "Munich Re", group: "equity", digits: 2, unit: "€" },
  { symbol: "DB1.DE", name: "Deutsche Börse", group: "equity", digits: 2, unit: "€" },
  { symbol: "DTE.DE", name: "Deutsche Telekom", group: "equity", digits: 2, unit: "€" },
  { symbol: "IFX.DE", name: "Infineon", group: "equity", digits: 2, unit: "€" },
  { symbol: "BAS.DE", name: "BASF", group: "equity", digits: 2, unit: "€" },
  { symbol: "BAYN.DE", name: "Bayer", group: "equity", digits: 2, unit: "€" },
  { symbol: "BMW.DE", name: "BMW", group: "equity", digits: 2, unit: "€" },
  { symbol: "MBG.DE", name: "Mercedes-Benz", group: "equity", digits: 2, unit: "€" },
  { symbol: "VOW3.DE", name: "Volkswagen Vz.", group: "equity", digits: 2, unit: "€" },
  { symbol: "RWE.DE", name: "RWE", group: "equity", digits: 2, unit: "€" },
  { symbol: "RHM.DE", name: "Rheinmetall", group: "equity", digits: 2, unit: "€" },
  { symbol: "ADS.DE", name: "adidas", group: "equity", digits: 2, unit: "€" },
  { symbol: "VNA.DE", name: "Vonovia", group: "equity", digits: 2, unit: "€" },
];

export type Quote = {
  symbol: string;
  name: string;
  group: Group;
  unit: string;
  digits: number;
  price: number;
  change: number;
  changePercent: number;
  high: number | null;
  low: number | null;
  volume: number | null;
  spark: number[];
  sparkAt: number[];
  quotedAt: string | null;
};

export type BoardPayload = {
  ok: boolean;
  asOf: string;
  message: string | null;
  quotes: Quote[];
};

export type NewsAlso = { source: string; url: string };

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  also: NewsAlso[];
};

export type NewsPayload = {
  ok: boolean;
  asOf: string;
  message: string | null;
  items: NewsItem[];
};

const bySymbol = new Map(INSTRUMENTS.map((item) => [item.symbol, item]));

export function instrumentOf(symbol: string): Instrument | undefined {
  return bySymbol.get(symbol);
}

export function formatNumber(value: number, digits: number): string {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value: number): string {
  const body = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(value);
  return `${body} %`;
}

export function formatVolume(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

export function formatClock(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

export function standLine(quotedAt: string | null, asOf: string): string {
  const tail = "Quelle: Yahoo Finance · Kurse verzögert, ohne Gewähr";
  if (!quotedAt) return `Stand: ohne Zeitstempel · ${tail}`;
  const quoted = new Date(quotedAt);
  const now = new Date(asOf);
  const dayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const sameDay = dayKey.format(quoted) === dayKey.format(now);
  const time = formatClock(quotedAt);
  const dateLabel = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
  }).format(quoted);
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", weekday: "short" }).format(quoted);
  const hm = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(quoted);
  const [hour, minute] = hm.split(":").map((part) => Number(part));
  const minutes = hour * 60 + minute;
  const closed = weekday === "Sat" || weekday === "Sun" || minutes < 9 * 60 || minutes >= 17 * 60 + 30;
  const when = sameDay ? `${time} Uhr` : `${dateLabel}, ${time} Uhr`;
  const closing = !sameDay || closed ? " · Schlusskurs" : "";
  return `Stand: ${when}${closing} · ${tail}`;
}

export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(iso));
}

export function toneOf(percent: number): "up" | "down" | "flat" {
  if (percent >= 0.005) return "up";
  if (percent <= -0.005) return "down";
  return "flat";
}

export function toneClass(percent: number): string {
  const tone = toneOf(percent);
  if (tone === "up") return "text-up";
  if (tone === "down") return "text-down";
  return "text-muted";
}

export function sessionNote(quotes: Quote[]): string | null {
  const dax = quotes.find((quote) => quote.symbol === "^GDAXI");
  if (!dax) return null;
  const mdax = quotes.find((quote) => quote.symbol === "^MDAXI");
  const atx = quotes.find((quote) => quote.symbol === "^ATX");
  const smi = quotes.find((quote) => quote.symbol === "^SSMI");
  const parts = [
    `Der DAX ${verb(dax.changePercent)} und notiert bei ${formatNumber(dax.price, dax.digits)} Punkten.`,
  ];
  if (mdax) parts.push(`Der MDAX ${verb(mdax.changePercent)}.`);
  if (atx && smi) parts.push(`Wien ${verb(atx.changePercent)}, Zürich ${verb(smi.changePercent)}.`);
  return parts.join(" ");
}

function verb(percent: number): string {
  const abs = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(percent));
  if (percent <= -0.05) return `gibt ${abs} Prozent nach`;
  if (percent >= 0.05) return `legt ${abs} Prozent zu`;
  return "steht nahezu unverändert";
}
