import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findKommentar } from "@/content/kommentare";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/kommentar/$slug")({
  loader: ({ params }) => {
    const item = findKommentar(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    const slug = item ? `${item.datum}-${item.ausgabe.toLocaleLowerCase("de-DE")}` : "";
    return pageMeta(
      `/kommentar/${slug}`,
      item ? `${item.titel} — vKG.capital` : "Kommentar — vKG.capital",
      item?.text.slice(0, 160) ?? "Tageskommentar von vKG.capital.",
    );
  },
  component: KommentarSeite,
});

function KommentarSeite() {
  const { item } = Route.useLoaderData();
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <p className="text-xs font-semibold tracking-widest text-pine uppercase">
        Markt kompakt · {item.datum} · {item.ausgabe}
        {item.muster ? " · Muster" : ""}
      </p>
      <h1 className="mt-3 text-4xl font-medium text-ink">{item.titel}</h1>
      <p className="mt-3 text-sm text-muted">{item.autor}</p>
      <p className="mt-6 text-lg text-muted">{item.text}</p>
      <p className="mt-6 text-sm text-ink">Keine Anlageberatung.</p>
      <p className="mt-8">
        <Link to="/kommentar" className="underline decoration-line underline-offset-4 hover:text-pine">
          Alle Kommentare
        </Link>
      </p>
    </article>
  );
}
