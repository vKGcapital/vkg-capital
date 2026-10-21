import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  formatClock,
  formatNumber,
  formatPercent,
  formatVolume,
  toneClass,
  type BoardPayload,
  type Group,
  type Quote,
} from "@/lib/market";
import { Sparkline } from "@/components/sparkline";
import { SessionChart } from "@/components/session-chart";
import { Rubrik } from "@/components/rubrik";
import { QuoteMeta } from "@/components/quote-meta";

const FILTERS: Array<{ id: "all" | Group; label: string }> = [
  { id: "all", label: "Alle" },
  { id: "index", label: "Indizes" },
  { id: "equity", label: "Aktien" },
  { id: "market", label: "Devisen & Rohstoffe" },
];

type SortId = "list" | "gainers" | "losers";

export function MarketBoard({
  board,
  refreshing,
  onRefresh,
  initialFilter = "all",
}: {
  board: BoardPayload;
  refreshing: boolean;
  onRefresh: () => void;
  initialFilter?: "all" | Group;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>(initialFilter);
  const [sort, setSort] = useState<SortId>("list");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("^GDAXI");

  const daxTime = board.quotes.find((quote) => quote.symbol === "^GDAXI")?.quotedAt ?? board.quotes[0]?.quotedAt;

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("de-DE");
    const filtered = board.quotes.filter((quote) => {
      const matchesGroup = filter === "all" || quote.group === filter;
      const haystack = `${quote.name} ${quote.symbol}`.toLocaleLowerCase("de-DE");
      const matchesQuery = needle.length === 0 || haystack.includes(needle);
      return matchesGroup && matchesQuery;
    });
    const ranked = [...filtered];
    if (sort === "gainers") ranked.sort((a, b) => b.changePercent - a.changePercent);
    if (sort === "losers") ranked.sort((a, b) => a.changePercent - b.changePercent);
    return ranked;
  }, [board.quotes, filter, query, sort]);

  const shown = visible.find((quote) => quote.symbol === selected) ?? visible[0] ?? null;

  return (
    <section id="maerkte" className="border-y border-line bg-paper">
      <div className="reveal mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <Rubrik kicker="Börseninstrumente" title="Marktübersicht">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-muted">
              {daxTime ? `Kurszeit ${formatClock(daxTime)} Uhr` : "Keine Kurszeit"}
              {refreshing ? " · aktualisiere" : ""}
            </p>
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex min-h-11 items-center gap-2 border border-line bg-panel px-4 text-sm text-ink hover:border-ink disabled:opacity-60"
            >
              <RefreshCw className={`size-4 ${refreshing ? "animate-spin motion-reduce:animate-none" : ""}`} aria-hidden="true" />
              Aktualisieren
            </button>
          </div>
        </Rubrik>

        <p className="mt-4 max-w-2xl text-sm text-muted">
          Kurse verzögert (in der Regel bis zu 15 Minuten), ohne Gewähr. Keine Anlageberatung und keine
          Aufforderung zum Kauf oder Verkauf.
        </p>
        {board.message ? <p className="mt-4 text-sm text-down">{board.message}</p> : null}

        {shown ? (
          <div className="mt-6 max-w-3xl border border-line bg-panel px-4 py-4">
            <SessionChart key={shown.symbol} quote={shown} asOf={board.asOf} compact />
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Instrumentengruppe">
            {FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item.id)}
                  className={`inline-flex min-h-11 items-center px-4 text-sm ${
                    active ? "bg-ink text-paper" : "border border-line text-ink hover:border-ink"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="text-sm text-muted" htmlFor="sort">
              Sortierung
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortId)}
              className="min-h-11 border border-line bg-paper px-3 text-sm text-ink"
            >
              <option value="list">Standard</option>
              <option value="gainers">Gewinner</option>
              <option value="losers">Verlierer</option>
            </select>
            <label className="sr-only" htmlFor="search">
              Instrument suchen
            </label>
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Suchen, etwa SAP oder DAX"
              className="min-h-11 w-full border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted sm:w-64"
            />
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-sm text-muted">Kein Instrument zu dieser Suche.</p>
        ) : (
          <>
            <ul className="mt-8 grid gap-3 md:hidden">
              {visible.map((quote) => (
                <li key={quote.symbol}>
                  <button
                    type="button"
                    onClick={() => setSelected(quote.symbol)}
                    className={`block-card w-full p-4 text-left ${quote.symbol === shown?.symbol ? "border-pine" : ""}`}
                  >
                    <QuoteCard quote={quote} asOf={board.asOf} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden overflow-hidden border border-line bg-panel md:block">
              <table className="w-full text-left">
                <caption className="sr-only">Kurse ausgewählter Börseninstrumente (verzögert)</caption>
                <thead className="bg-band text-xs tracking-widest text-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 pr-4 font-semibold">
                      Instrument
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-semibold">
                      Kurs
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-semibold">
                      Tag
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-semibold">
                      Spanne
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-semibold">
                      Volumen
                    </th>
                    <th scope="col" className="py-3 pr-4 text-right font-semibold">
                      Verlauf
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((quote) => (
                    <tr
                      key={quote.symbol}
                      className={`cursor-pointer border-t border-line ${quote.symbol === shown?.symbol ? "bg-band" : ""}`}
                      onClick={() => setSelected(quote.symbol)}
                    >
                      <th scope="row" className="px-4 py-4 pr-4 font-medium">
                        <button
                          type="button"
                          onClick={() => setSelected(quote.symbol)}
                          className="text-left font-serif text-lg text-ink hover:text-pine"
                        >
                          {quote.name}
                        </button>
                        <span className="mt-1 block text-xs text-muted">{quote.symbol}</span>
                        <QuoteMeta quotedAt={quote.quotedAt} asOf={board.asOf} />
                      </th>
                      <td className="py-4 pr-4 text-right text-base tabular-nums">
                        {formatNumber(quote.price, quote.digits)} {quote.unit}
                      </td>
                      <td className={`py-4 pr-4 text-right tabular-nums ${toneClass(quote.changePercent)}`}>
                        {formatPercent(quote.changePercent)}
                      </td>
                      <td className="py-4 pr-4 text-right text-sm tabular-nums text-muted">
                        {quote.low != null && quote.high != null
                          ? `${formatNumber(quote.low, quote.digits)} – ${formatNumber(quote.high, quote.digits)}`
                          : "—"}
                      </td>
                      <td className="py-4 pr-4 text-right text-sm tabular-nums text-muted">
                        {quote.volume != null ? formatVolume(quote.volume) : "—"}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex justify-end">
                          <Sparkline values={quote.spark} percent={quote.changePercent} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function QuoteCard({ quote, asOf }: { quote: Quote; asOf: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div>
        <p className="font-serif text-xl text-ink">{quote.name}</p>
        <p className="text-xs text-muted">{quote.symbol}</p>
        <QuoteMeta quotedAt={quote.quotedAt} asOf={asOf} />
        <p className="mt-2 text-lg tabular-nums">
          {formatNumber(quote.price, quote.digits)} {quote.unit}
        </p>
        <p className={`text-sm tabular-nums ${toneClass(quote.changePercent)}`}>{formatPercent(quote.changePercent)}</p>
      </div>
      <Sparkline values={quote.spark} percent={quote.changePercent} />
    </div>
  );
}
