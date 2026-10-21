import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatNumber, formatPercent, toneClass, type Quote } from "@/lib/market";
import { SessionChart } from "@/components/session-chart";

const WATCH = ["SAP.DE", "SIE.DE", "RHM.DE", "IFX.DE", "ALV.DE"];

export function StockSpotlight({ quotes, asOf }: { quotes: Quote[]; asOf: string }) {
  const picks = WATCH.flatMap((symbol) => {
    const quote = quotes.find((item) => item.symbol === symbol);
    return quote ? [quote] : [];
  });
  const mover = [...picks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0];
  const [chosen, setChosen] = useState<string | null>(null);
  const quote = picks.find((item) => item.symbol === chosen) ?? mover;
  if (!quote) return null;

  return (
    <section className="mt-8 bg-[#eef3f6] p-3 md:p-4" aria-label="Aktie im Blick">
      <div className="grid items-start gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="bg-white px-4 py-5 shadow-[0_16px_40px_rgba(8,40,64,0.18)] md:px-6">
          <SessionChart quote={quote} asOf={asOf} compact />
        </div>
        <div className="grid gap-3" role="group" aria-label="Aktie wählen">
          {picks.map((item) => {
            const active = item.symbol === quote.symbol;
            return (
              <button
                key={item.symbol}
                type="button"
                aria-pressed={active}
                onClick={() => setChosen(item.symbol)}
                className={`flex min-h-16 items-center justify-between gap-3 border bg-white px-4 py-3 text-left shadow-[0_10px_24px_rgba(8,40,64,0.16)] ${
                  active ? "border-ink" : "border-transparent hover:border-ink"
                }`}
              >
                <span className="text-base font-medium text-ink">{item.name}</span>
                <span className={`text-base font-semibold tabular-nums ${toneClass(item.changePercent)}`}>
                  {formatNumber(item.price, item.digits)} {item.unit}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 px-1 text-sm text-muted">
        Die Aktie mit der stärksten Tagesbewegung steht im Chart. Eine Karte wählen, um den Verlauf zu wechseln.
      </p>
      <Link to="/maerkte" search={{ gruppe: "equity" }} className="btn mt-4">
        Auf den Märkten ansehen
      </Link>
    </section>
  );
}
