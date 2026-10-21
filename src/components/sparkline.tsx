import { toneOf } from "@/lib/market";

export function Sparkline({ values, percent, wide = false }: { values: number[]; percent: number; wide?: boolean }) {
  if (values.length < 2) return <span className={wide ? "block h-16 w-full" : "inline-block h-8 w-28"} />;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const width = wide ? 320 : 112;
  const height = wide ? 72 : 32;
  const path = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 4) - 2;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const tone = toneOf(percent);
  const color = tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-muted";
  const area = `${path} L${width} ${height} L0 ${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${wide ? "h-16 w-full" : "h-8 w-28"} ${color}`} aria-hidden="true">
      <path d={area} fill="currentColor" opacity="0.16" />
      <path
        d={path}
        className="spark-draw"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
