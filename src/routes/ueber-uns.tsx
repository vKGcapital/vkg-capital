import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";
import { Rubrik } from "@/components/rubrik";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { TikTokMark } from "@/components/tiktok-mark";
import { pageMeta } from "@/lib/site";

const PEOPLE = [
  {
    name: "Simon von Kymmel",
    text: "24 Jahre, wohnhaft in Frankfurt am Main. Selbstständiger Physiotherapeut, seit drei Jahren an der Börse und seit 2026 Student der ISM Frankfurt.",
    href: "https://www.linkedin.com/in/simon-von-kymmel-450757333",
  },
  {
    name: "Robin Gassmann",
    text: "Beteiligungsunternehmer in München und Geschäftsführer der Robin Gassmann Beteiligungsgesellschaft mbH. Seit mehr als zehn Jahren an den Kapitalmärkten, mit Beteiligungen an Unternehmen im DACH-Raum.",
    href: "https://de.linkedin.com/in/robin-gassmann",
  },
] as const;

export const Route = createFileRoute("/ueber-uns")({
  head: () =>
    pageMeta(
      "/ueber-uns",
      "Über uns — vKG.capital",
      "vKG.capital ist der Börsenkanal von Simon von Kymmel und Robin Gassmann.",
    ),
  component: UeberUns,
});

function UeberUns() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Rubrik kicker="Über uns" title="von Kymmel & Gassmann" />
      <section className="mt-8">
        <h2 className="text-2xl font-medium">Wer wir sind</h2>
        <p className="mt-3 text-muted">
          vKG.capital ist der Börsenkanal von Simon von Kymmel und Robin Gassmann. Die beiden fassen Börse, Märkte und
          Wirtschaft für den DACH-Raum zusammen. Das Angebot erscheint unter der Anschrift in Groß-Umstadt.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PEOPLE.map((person) => (
            <article key={person.name} className="border border-line bg-panel px-5 py-5">
              <h3 className="font-serif text-2xl text-ink">{person.name}</h3>
              <p className="mt-3 text-sm text-muted">{person.text}</p>
              <a
                href={person.href}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:text-pine"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="size-4" aria-hidden="true" />
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-medium">Was wir machen</h2>
        <p className="mt-3 text-muted">
          Täglich kompakte Wirtschaftsnachrichten in eigenen Worten, eine Marktübersicht für den DACH-Raum und einen
          kurzen Tageskommentar.
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-medium">Was wir nicht machen</h2>
        <p className="mt-3 text-muted">
          Keine Anlageberatung, keine Vermittlung von Finanzinstrumenten, keine individuellen Empfehlungen.
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-medium">Kontakt</h2>
        <p className="mt-4 flex flex-wrap gap-3">
          <a href="https://wa.me/4917631630687" className="btn gap-2" rel="noopener noreferrer" target="_blank">
            <WhatsAppMark className="size-4 text-[#25D366]" />
            WhatsApp
          </a>
          <a href="tel:+4917631630687" className="inline-flex min-h-11 items-center border border-line px-4 text-sm font-medium">
            0176 31630687
          </a>
        </p>
        <p className="mt-4 text-muted">
          E-Mail:{" "}
          <a className="text-ink underline decoration-line underline-offset-4 hover:text-pine" href="mailto:support@vkg.capital">
            support@vkg.capital
          </a>
        </p>
        <p className="mt-3">
          <a className="inline-flex items-center gap-2 underline decoration-line underline-offset-4 hover:text-pine" href="https://www.instagram.com/vkg.capital/" rel="noopener noreferrer" target="_blank">
            <Instagram className="size-4" aria-hidden="true" />
            @vkg.capital
          </a>
        </p>
        <p className="mt-3">
          <a className="inline-flex items-center gap-2 underline decoration-line underline-offset-4 hover:text-pine" href="https://www.tiktok.com/@vkg.capital0" rel="noopener noreferrer" target="_blank">
            <TikTokMark className="size-4" />
            TikTok
          </a>
        </p>
        <p className="mt-3">
          <a className="underline decoration-line underline-offset-4 hover:text-pine" href="/impressum">
            Impressum
          </a>
        </p>
      </section>
    </article>
  );
}
