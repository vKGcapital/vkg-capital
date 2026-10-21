import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NewsSection } from "@/components/news-section";
import { loadNews } from "@/lib/feeds";
import type { NewsPayload } from "@/lib/market";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/nachrichten")({
  head: () =>
    pageMeta(
      "/nachrichten",
      "Nachrichten — vKG.capital",
      "Kurz zusammengefasst von vKG.capital. Die vollständigen Beiträge lesen Sie bei der jeweiligen Redaktion.",
    ),
  loader: () => loadNews(),
  component: NachrichtenPage,
});

function NachrichtenPage() {
  const initial = Route.useLoaderData();
  const [news, setNews] = useState<NewsPayload>(initial);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadNews()
        .then((next) => setNews(next))
        .catch(() => undefined);
    }, 300_000);
    return () => window.clearInterval(timer);
  }, []);

  return <NewsSection news={news} />;
}
