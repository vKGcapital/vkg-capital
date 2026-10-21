import { Link } from "@tanstack/react-router";
import { Sparkline } from "@/components/sparkline";
import { formatPercent, toneClass, type Quote } from "@/lib/market";

export function QuoteTicker({ quotes }: { quotes: Quote[] }) {
  const items = quotes.filter((quote) => quote.spark.length > 1).slice(0, 12);
  if (items.length === 0) return null;
  const loop = [...items, ...items];
  return (
    <div className="ticker -mx-4 overflow-hidden border-b border-line bg-white md:-mx-6">
      <div className="ticker-track flex">
        {loop.map((quote, index) => (
          <Link
            key={`${quote.symbol}-${index}`}
            to="/maerkte"
            className="flex shrink-0 items-center gap-3 border-r border-line px-5 py-3 hover:bg-band"
          >
            <span className="text-sm font-medium text-ink">{quote.name}</span>
            <Sparkline values={quote.spark} percent={quote.changePercent} />
            <span className={`text-sm tabular-nums ${toneClass(quote.changePercent)}`}>
              {formatPercent(quote.changePercent)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
