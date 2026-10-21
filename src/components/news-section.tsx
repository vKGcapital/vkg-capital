import { formatWhen, type NewsItem, type NewsPayload } from "@/lib/market";
import { Rubrik } from "@/components/rubrik";

export function NewsSection({ news }: { news: NewsPayload }) {
  const [featured, ...rest] = news.items;

  return (
    <section id="nachrichten">
      <div className="reveal mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <Rubrik kicker="Nachrichten" title="Wirtschaft, kompakt">
          <p className="max-w-sm text-sm text-muted">
            Kurz zusammengefasst von vKG.capital. Die vollständigen Beiträge lesen Sie bei der jeweiligen Redaktion
            (tagesschau, n-tv, DER SPIEGEL).
          </p>
        </Rubrik>

        {news.message ? <p className="mt-8 text-sm text-down">{news.message}</p> : null}

        {featured ? (
          <article className="mt-10 max-w-3xl border-b border-line pb-10">
            <h3 className="text-2xl font-medium text-ink md:text-3xl">
              <a href={featured.url} className="hover:text-pine" rel="noopener noreferrer" target="_blank">
                {featured.title}
              </a>
            </h3>
            <NewsFacts item={featured} />
          </article>
        ) : null}

        {rest.length > 0 ? (
          <ul className="mt-2 divide-y divide-line">
            {rest.map((item) => (
              <li key={item.id} className="py-5">
                <p className="font-serif text-xl font-medium text-ink">{item.title}</p>
                <NewsFacts item={item} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function NewsFacts({ item }: { item: NewsItem }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">
        Quelle: {item.source} · {formatWhen(item.publishedAt)}
      </p>
      {item.summary ? <p className="mt-3 max-w-3xl text-muted">{item.summary}</p> : null}
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={item.url} className="btn" rel="noopener noreferrer" target="_blank">
          Bei {item.source} weiterlesen →
        </a>
        {item.also.map((other) => (
          <a key={other.url} href={other.url} className="text-sm text-ink underline decoration-line underline-offset-4 hover:text-pine" rel="noopener noreferrer" target="_blank">
            Auch bei: {other.source}
          </a>
        ))}
      </p>
    </div>
  );
}
