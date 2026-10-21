import { useState, type PointerEvent } from "react";
import { formatNumber, formatPercent, standLine, toneClass, type Quote } from "@/lib/market";

const W = 720;
const H = 300;
const LEFT = 108;
const RIGHT = 16;
const TOP = 16;
const BOTTOM = 36;

function clock(seconds: number): string {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(seconds * 1000));
}

function axisDigits(value: number, digits: number): number {
  const size = Math.abs(value);
  if (size >= 1000) return 0;
  if (size >= 100) return 1;
  return digits;
}

export function SessionChart({ quote, asOf, compact = false }: { quote: Quote; asOf: string; compact?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const series = quote.spark;
  const times = quote.sparkAt ?? [];
  if (series.length < 2) {
    return <p className="text-sm text-muted">Für {quote.name} liegt noch kein Tagesverlauf vor.</p>;
  }

  const previous = quote.price - quote.change;
  const low = Math.min(...series, previous);
  const high = Math.max(...series, previous);
  const pad = (high - low) * 0.1 || Math.abs(high) * 0.004 || 1;
  const min = low - pad;
  const max = high + pad;
  const span = max - min;
  const plotW = W - LEFT - RIGHT;
  const plotH = H - TOP - BOTTOM;
  const digits = axisDigits(quote.price, quote.digits);

  const coords = series.map((value, index) => {
    const x = LEFT + (index / (series.length - 1)) * plotW;
    const y = TOP + (1 - (value - min) / span) * plotH;
    return { x, y };
  });
  const line = coords.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)} ${(TOP + plotH).toFixed(1)} L${coords[0].x.toFixed(1)} ${(TOP + plotH).toFixed(1)} Z`;
  const yOf = (value: number) => TOP + (1 - (value - min) / span) * plotH;
  const yTicks = [0, 1, 2, 3].map((step) => min + (span * step) / 3);
  const xTicks = [0, 0.33, 0.66, 1].map((share) => Math.round(share * (series.length - 1)));
  const previousY = yOf(previous);
  const tone = toneClass(quote.changePercent);
  const active = hover != null ? coords[hover] : coords[coords.length - 1];
  const activeValue = hover != null ? series[hover] : series[series.length - 1];
  const activeTime = hover != null ? times[hover] : times[times.length - 1];

  function move(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * W;
    if (x < LEFT || x > LEFT + plotW) {
      setHover(null);
      return;
    }
    const index = Math.round(((x - LEFT) / plotW) * (series.length - 1));
    setHover(Math.max(0, Math.min(series.length - 1, index)));
  }

  return (
    <figure>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-pine uppercase">Tagesverlauf · {quote.name}</p>
          <p className={`mt-1 font-serif tabular-nums text-ink ${compact ? "text-2xl" : "text-3xl"}`}>
            {formatNumber(quote.price, quote.digits)}{" "}
            <span className="font-sans text-base text-muted">{quote.unit}</span>
          </p>
        </div>
        <p className={`text-lg tabular-nums ${tone}`}>{formatPercent(quote.changePercent)}</p>
      </div>
      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={`w-full text-muted ${compact ? "h-36 md:h-44" : "h-auto"}`}
          onPointerMove={move}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${quote.name}, Tagesverlauf mit Zeitachse und Kursachse. Zuletzt ${formatNumber(quote.price, quote.digits)} ${quote.unit}.`}
        >
          {yTicks.map((tick) => {
            const y = yOf(tick);
            return (
              <g key={tick}>
                <line x1={LEFT} x2={W - RIGHT} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.28" />
                <text x={LEFT - 8} y={y + 4} textAnchor="end" fill="#1e3444" fontSize="20">
                  {formatNumber(tick, digits)}
                </text>
              </g>
            );
          })}
          <line
            x1={LEFT}
            x2={W - RIGHT}
            y1={previousY}
            y2={previousY}
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeOpacity="0.7"
          />
          <text x={W - RIGHT} y={previousY - 6} textAnchor="end" fill="#1e3444" fontSize="16">
            Vortag
          </text>
          <path d={area} className={tone} fill="currentColor" opacity="0.16" />
          <path
            key={`${quote.symbol}-${series.length}`}
            d={line}
            className={`chart-line ${tone}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
          />
          {hover != null ? (
            <line x1={active.x} x2={active.x} y1={TOP} y2={TOP + plotH} stroke="currentColor" strokeOpacity="0.45" />
          ) : null}
          <circle cx={active.x} cy={active.y} r="4.5" className={tone} fill="currentColor" />
          {xTicks.map((index) => {
            const stamp = times[index] ?? 0;
            return (
              <text key={index} x={coords[index].x} y={H - 10} textAnchor="middle" fill="#1e3444" fontSize="18">
                {stamp > 0 ? clock(stamp) : ""}
              </text>
            );
          })}
          <text x={LEFT} y={12} fill="#1e3444" fontSize="16">
            {quote.unit}
          </text>
        </svg>
        {hover != null && activeTime > 0 ? (
          <p
            className="pointer-events-none absolute top-2 border border-line bg-paper px-2 py-1 text-xs tabular-nums text-ink"
            style={{ left: `${Math.min(78, Math.max(8, (active.x / W) * 100))}%` }}
          >
            {clock(activeTime)} · {formatNumber(activeValue, quote.digits)} {quote.unit}
          </p>
        ) : null}
      </div>
      <figcaption className="mt-2 text-xs text-[#1e3444]">
        X Uhrzeit · Y Kurs. Gestrichelt: Schluss des Vortags. {standLine(quote.quotedAt, asOf)}
      </figcaption>
    </figure>
  );
}
