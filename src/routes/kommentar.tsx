import { createFileRoute, Link } from "@tanstack/react-router";
import { KOMMENTARE, kommentarSlug } from "@/content/kommentare";
import { Rubrik } from "@/components/rubrik";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/kommentar")({
  head: () =>
    pageMeta(
      "/kommentar",
      "Markt kompakt — vKG.capital",
      "Tageskommentare von vKG.capital. Keine Anlageberatung.",
    ),
  component: KommentarListe,
});

function KommentarListe() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Rubrik kicker="Markt kompakt" title="Tageskommentare" />
      <ul className="mt-8 divide-y divide-line border-t border-ink">
        {KOMMENTARE.map((item) => (
          <li key={kommentarSlug(item)} className="py-5">
            <p className="text-xs tracking-widest text-muted uppercase">
              {item.datum} · {item.ausgabe}
              {item.muster ? " · Muster" : ""}
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              <Link to="/kommentar/$slug" params={{ slug: kommentarSlug(item) }} className="hover:text-pine">
                {item.titel}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{item.autor}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
