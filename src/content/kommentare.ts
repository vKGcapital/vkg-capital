export type Ausgabe = "Mittag" | "Abend";

export type Kommentar = {
  datum: string;
  ausgabe: Ausgabe;
  titel: string;
  text: string;
  autor: string;
  muster: boolean;
};

export const KOMMENTARE: Kommentar[] = [
  {
    datum: "2026-10-20",
    ausgabe: "Mittag",
    titel: "[Muster] DAX gibt nach – Siemens und Infineon belasten",
    text: "Das ist ein Muster und noch kein veröffentlichter Kommentar. Hier stehen drei bis fünf Sätze zum Handelstag, ohne Empfehlung. Der DAX wird eingeordnet, zwei Titel werden genannt, der Ton bleibt sachlich. Am Ende folgt der Hinweis, dass Leserinnen und Leser selbst entscheiden. Diesen Absatz ersetzen Sie durch den echten Tageskommentar.",
    autor: "vKG.capital",
    muster: true,
  },
];

export function kommentarSlug(item: Pick<Kommentar, "datum" | "ausgabe">): string {
  return `${item.datum}-${item.ausgabe.toLocaleLowerCase("de-DE")}`;
}

export function findKommentar(slug: string): Kommentar | undefined {
  return KOMMENTARE.find((item) => kommentarSlug(item) === slug);
}
