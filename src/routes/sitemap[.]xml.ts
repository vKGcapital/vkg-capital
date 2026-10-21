import { createFileRoute } from "@tanstack/react-router";
import { KOMMENTARE, kommentarSlug } from "@/content/kommentare";
import { SITE_URL } from "@/lib/site";

const PAGES = ["/", "/nachrichten", "/maerkte", "/ueber-uns", "/impressum", "/datenschutz", "/kommentar"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...PAGES.map((path) => `${SITE_URL}${path === "/" ? "/" : path}`),
          ...KOMMENTARE.map((item) => `${SITE_URL}/kommentar/${kommentarSlug(item)}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
