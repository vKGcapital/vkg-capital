export const SITE_URL = "https://www.vkg.capital";

export function pageMeta(path: string, title: string, description: string) {
  const url = new URL(path, SITE_URL).href;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: "de_DE" },
      { property: "og:site_name", content: "vKG.capital" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
