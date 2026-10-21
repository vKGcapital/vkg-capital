import { createFileRoute } from "@tanstack/react-router";
import { Impressum } from "@/components/redaktion";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/impressum")({
  head: () =>
    pageMeta(
      "/impressum",
      "Impressum — vKG.capital",
      "Kontakt und Impressum von vKG.capital, Simon von Kymmel und Robin Gassmann, Fitzweg 6, 64823 Groß-Umstadt.",
    ),
  component: Impressum,
});