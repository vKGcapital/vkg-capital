import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { loadBoard, loadNews } from "@/lib/feeds";
import { Sparkline } from "@/components/sparkline";
import { StockSpotlight } from "@/components/stock-spotlight";
import { SessionChart } from "@/components/session-chart";
import { QuoteTicker } from "@/components/quote-ticker";
import { QuoteMeta } from "@/components/quote-meta";
import { NewsFacts } from "@/components/news-section";
import { KOMMENTARE, kommentarSlug } from "@/content/kommentare";
import { pageMeta } from "@/lib/site";
import {
  formatNumber,
  formatPercent,
  formatWhen,
  sessionNote,
  standLine,
  toneClass,
  type BoardPayload,
  type NewsPayload,
} from "@/lib/market";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "/",
      "vKG.capital — Börsennews",
      "Börse, Märkte und Wirtschaft, täglich kompakt für den DACH-Raum. Kurse und Nachrichten von vKG.capital. Keine Anlageberatung.",
    ),
  loader: async () => {
    const [board, news] = await Promise.all([loadBoard(), loadNews()]);
    return { board, news };
  },
  component: Home,
});

const PULSE = ["^GDAXI", "^MDAXI", "^ATX", "^SSMI"];

function Home() {
  const initial = Route.useLoaderData();
  const [board, setBoard] = useState<BoardPayload>(initial.board);
  const [news, setNews] = useState<NewsPayload>(initial.news);

  useEffect(() => {
    const quotes = window.setInterval(() => {
      void loadBoard()
        .then((next) => setBoard(next))
        .catch(() => undefined);
    }, 60_000);
    const headlines = window.setInterval(() => {
      void loadNews()
        .then((next) => setNews(next))
        .catch(() => undefined);
    }, 300_000);
    return () => {
      window.clearInterval(quotes);
      window.clearInterval(headlines);
    };
  }, []);

  const pulse = PULSE.flatMap((symbol) => {
    const quote = board.quotes.find((item) => item.symbol === symbol);
    return quote ? [quote] : [];
  });
  const dax = board.quotes.find((quote) => quote.symbol === "^GDAXI") ?? pulse[0];
  const note = sessionNote(board.quotes);
  const [lead, ...rest] = news.items;
  const side = rest.slice(0, 4);
  const edition = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(board.asOf));

  const groups = [
    { gruppe: "index" as const, title: "Indizes", symbols: ["^GDAXI", "^MDAXI", "^STOXX50E", "^GSPC"] },
    { gruppe: "equity" as const, title: "Aktien", symbols: ["SAP.DE", "SIE.DE", "ALV.DE", "IFX.DE"] },
    { gruppe: "market" as const, title: "Devisen und Rohstoffe", symbols: ["EURUSD=X", "GC=F", "BZ=F"] },
  ];
  const latest = KOMMENTARE[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-16 md:px-6">
      <section className="-mx-4 bg-[#082840] px-4 py-10 text-white md:-mx-6 md:px-8 md:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#8fbfa6] uppercase">{edition}</p>
            <h1 className="mt-4 text-4xl font-medium leading-[1.05] text-white md:text-6xl">
              Kurse sehen.
              <br />
              Märkte einordnen.
            </h1>
            <p className="mt-5 max-w-md text-lg text-[#d5e2ea]">
              Der Börsenkanal von Simon von Kymmel und Robin Gassmann. Kurse und Wirtschaftsnachrichten für den
              DACH-Raum. Keine Anlageberatung.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/maerkte" className="inline-flex min-h-11 items-center bg-white px-5 text-sm font-semibold text-[#082840]">
                Zu den Märkten
              </Link>
              <Link
                to="/nachrichten"
                className="inline-flex min-h-11 items-center border border-white/40 px-5 text-sm font-medium text-white hover:bg-white/10"
              >
                Nachrichten
              </Link>
            </div>
          </div>
          <div className="bg-white px-4 py-5 text-ink md:px-5">
            {dax ? <SessionChart quote={dax} asOf={board.asOf} /> : <p className="text-sm text-muted">Kursverlauf wird geladen.</p>}
          </div>
        </div>
      </section>

      <StockSpotlight quotes={board.quotes} asOf={board.asOf} />

      {latest ? (
        <section className="mt-8 border border-line bg-band px-5 py-6 md:px-8" aria-label="Markt kompakt">
          <p className="text-xs font-semibold tracking-widest text-pine uppercase">Markt kompakt</p>
          <h2 className="mt-2 font-serif text-3xl text-ink">Der Tageskommentar von vKG.capital</h2>
          <p className="mt-4 text-xs text-muted">
            {latest.datum} · {latest.ausgabe}
            {latest.muster ? " · Muster" : ""} · {latest.autor}
          </p>
          <h3 className="mt-3 text-xl font-medium text-ink">{latest.titel}</h3>
          <p className="mt-3 max-w-3xl text-muted">{latest.text}</p>
          <p className="mt-4 text-sm text-ink">Keine Anlageberatung.</p>
          <p className="mt-4">
            <Link to="/kommentar/$slug" params={{ slug: kommentarSlug(latest) }} className="btn">
              Kommentar lesen
            </Link>
          </p>
        </section>
      ) : null}

      <QuoteTicker quotes={board.quotes} />
      <p className="mt-2 text-xs text-muted">{standLine(board.quotes[0]?.quotedAt ?? null, board.asOf)}</p>

      <section className="mt-8" aria-label="Märkte">
        {board.message ? <p className="mb-3 text-sm text-down">{board.message}</p> : null}
        <div className="grid gap-4 lg:grid-cols-3">
          {groups.map((item) => {
            const quotes = item.symbols.flatMap((symbol) => {
              const quote = board.quotes.find((entry) => entry.symbol === symbol);
              return quote ? [quote] : [];
            });
            return (
              <section key={item.gruppe} className={item.gruppe === "equity" ? "bg-[#eef3f6] p-3" : "border border-line bg-panel"}>
                <div className={`flex items-center justify-between gap-3 px-4 py-3 ${item.gruppe === "equity" ? "" : "border-b border-line"}`}>
                  <h2 className="font-serif text-2xl text-ink">{item.title}</h2>
                  <Link to="/maerkte" search={{ gruppe: item.gruppe }} className="text-sm text-ink underline decoration-line underline-offset-4 hover:text-pine">
                    Alle
                  </Link>
                </div>
                <ul className={item.gruppe === "equity" ? "flex flex-col gap-4" : ""}>
                  {quotes.map((quote) => (
                    <li
                      key={quote.symbol}
                      className={
                        item.gruppe === "equity"
                          ? "border border-line bg-white px-4 py-4 shadow-[0_12px_28px_rgba(8,40,64,0.16)]"
                          : "border-b border-line px-4 py-3 last:border-b-0"
                      }
                    >
                      <Link to="/maerkte" search={{ gruppe: item.gruppe }} className="grid grid-cols-[1fr_auto] items-center gap-3">
                        <span>
                          <span className="block text-sm font-medium text-ink">{quote.name}</span>
                          <span className={`text-sm tabular-nums ${toneClass(quote.changePercent)}`}>
                            {formatNumber(quote.price, quote.digits)} {quote.unit} · {formatPercent(quote.changePercent)}
                          </span>
                        </span>
                        <Sparkline values={quote.spark} percent={quote.changePercent} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>

      {pulse.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 border border-line md:grid-cols-4">
          {pulse.map((quote) => (
            <li key={quote.symbol} className="border-line px-4 py-4 max-md:border-b max-md:odd:border-r md:border-r md:last:border-r-0">
              <Link to="/maerkte" search={{ gruppe: "index" }} className="block hover:text-pine">
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">{quote.name}</p>
                <p className="mt-1 font-serif text-2xl tabular-nums text-ink">{formatNumber(quote.price, quote.digits)}</p>
                <p className={`text-sm tabular-nums ${toneClass(quote.changePercent)}`}>{formatPercent(quote.changePercent)}</p>
                <QuoteMeta quotedAt={quote.quotedAt} asOf={board.asOf} />
                <div className="mt-2">
                  <Sparkline values={quote.spark} percent={quote.changePercent} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10 grid gap-10 border-t border-ink pt-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.75fr)]">
        <article>
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Nachrichten</p>
          {lead ? (
            <>
              <h2 className="mt-3 text-3xl font-medium leading-tight text-ink md:text-5xl">{lead.title}</h2>
              <NewsFacts item={lead} />
            </>
          ) : (
            <p className="mt-4 text-muted">{news.message ?? "Die Meldungen werden geladen."}</p>
          )}
          {note ? <p className="mt-8 max-w-2xl border-t border-line pt-6 text-ink">{note}</p> : null}
        </article>

        <aside className="bg-band px-5 py-6 lg:px-6">
          <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">Weitere Meldungen</h2>
          {side.length > 0 ? (
            <ul className="mt-4 divide-y divide-line border-t border-ink">
              {side.map((item) => (
                <li key={item.id} className="py-4">
                  <p className="text-xs tracking-widest text-muted uppercase">
                    {item.source} · {formatWhen(item.publishedAt)}
                  </p>
                  <a href={item.url} className="mt-1 block font-serif text-lg text-ink hover:text-pine" rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </a>
                  {item.summary ? <p className="mt-2 text-sm text-muted">{item.summary}</p> : null}
                  {item.also.map((other) => (
                    <a key={other.url} href={other.url} className="mt-1 block text-sm underline" rel="noopener noreferrer" target="_blank">
                      Auch bei: {other.source}
                    </a>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">Keine weiteren Meldungen.</p>
          )}
          <p className="mt-4">
            <Link to="/nachrichten" className="btn">
              Alle Nachrichten
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
