import { Link } from "@tanstack/react-router";
import { Rubrik } from "@/components/rubrik";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { TikTokMark } from "@/components/tiktok-mark";

export function Impressum() {
  return (
    <section id="impressum" className="border-t border-line bg-paper">
      <div className="reveal mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <Rubrik kicker="Kontakt und Impressum" title="Angaben gemäß § 5 DDG" />
        <div className="mt-8">
          <address className="border border-line bg-panel px-5 py-6 text-base text-ink not-italic">
            <p>vKG.capital</p>
            <p>www.vkg.capital</p>
            <p className="mt-3">ein Angebot von</p>
            <p>Simon von Kymmel und Robin Gassmann</p>
            <p className="mt-4">Fitzweg 6</p>
            <p>64823 Groß-Umstadt</p>
            <p>Deutschland</p>
          </address>
        </div>
        <div className="mt-4 grid gap-4 text-sm text-muted">
          <div className="border border-line bg-panel px-5 py-5 text-ink">
            <p className="font-medium">Kontakt</p>
            <p className="mt-2">
              Telefon:{" "}
              <a className="underline decoration-line underline-offset-4 hover:text-pine" href="tel:+4917631630687">
                0176 31630687
              </a>
            </p>
            <p className="mt-2">
              WhatsApp:{" "}
              <a className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:text-pine" href="https://wa.me/4917631630687" rel="noopener noreferrer" target="_blank">
                <WhatsAppMark className="size-4 text-[#25D366]" />
                0176 31630687
              </a>
            </p>
            <p className="mt-2">
              E-Mail:{" "}
              <a className="underline decoration-line underline-offset-4 hover:text-pine" href="mailto:support@vkg.capital">
                support@vkg.capital
              </a>
            </p>
            <p className="mt-2">Website: www.vkg.capital</p>
            <p className="mt-4 font-medium">LinkedIn</p>
            <p className="mt-2">
              Simon von Kymmel:{" "}
              <a className="underline decoration-line underline-offset-4 hover:text-pine" href="https://www.linkedin.com/in/simon-von-kymmel-450757333" rel="noopener noreferrer" target="_blank">
                linkedin.com/in/simon-von-kymmel-450757333
              </a>
            </p>
            <p className="mt-2">
              Robin Gassmann:{" "}
              <a className="underline decoration-line underline-offset-4 hover:text-pine" href="https://de.linkedin.com/in/robin-gassmann" rel="noopener noreferrer" target="_blank">
                linkedin.com/in/robin-gassmann
              </a>
            </p>
            <p className="mt-4 font-medium">Kanäle</p>
            <p className="mt-2">
              Instagram:{" "}
              <a className="underline decoration-line underline-offset-4 hover:text-pine" href="https://www.instagram.com/vkg.capital/" rel="noopener noreferrer" target="_blank">
                @vkg.capital
              </a>
            </p>
            <p className="mt-2">
              TikTok:{" "}
              <a className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:text-pine" href="https://www.tiktok.com/@vkg.capital0" rel="noopener noreferrer" target="_blank">
                <TikTokMark className="size-4" />
                @vkg.capital0
              </a>
            </p>
          </div>
          <p className="border border-line bg-panel px-5 py-5">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Simon von Kymmel und Robin Gassmann, Fitzweg 6,
            64823 Groß-Umstadt.
          </p>
          <p className="border border-line bg-panel px-5 py-5">
            Die Inhalte auf vKG.capital dienen ausschließlich der allgemeinen Information. Sie stellen keine
            Anlageberatung, keine Anlagevermittlung und keine Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten
            dar. Kursangaben stammen von externen Datenanbietern, sind ohne Gewähr und können verzögert oder fehlerhaft
            sein. Anlageentscheidungen treffen Leserinnen und Leser in eigener Verantwortung.
          </p>
          <p className="border border-line bg-panel px-5 py-5">
            Kursdaten: Yahoo Finance. Nachrichten: eigene Kurzzusammenfassungen mit Link zur jeweiligen Originalquelle
            (unter anderem tagesschau, n-tv, DER SPIEGEL). Die verlinkten Originalbeiträge verantworten die jeweiligen
            Redaktionen.
          </p>
          <p className="border border-line bg-panel px-5 py-5">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für
            diese Inhalte ist stets der jeweilige Anbieter verantwortlich. Werden uns Rechtsverletzungen bekannt,
            entfernen wir die betreffenden Links umgehend.
          </p>
          <p className="border border-line bg-panel px-5 py-5">
            Die von uns erstellten Texte, Grafiken und das Logo unterliegen dem deutschen Urheberrecht. Vervielfältigung
            und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen der vorherigen Zustimmung.
          </p>
          <p className="px-1 text-ink">
            Informationen zum Datenschutz finden Sie in unserer{" "}
            <Link to="/datenschutz" className="underline decoration-line underline-offset-4 hover:text-pine">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ year }: { year: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted md:px-6">
        <p className="flex items-center gap-3">
          <img src="/mark.png" alt="" className="h-8 w-8" />
          vKG.capital · von Kymmel & Gassmann · Fitzweg 6, 64823 Groß-Umstadt · {year}
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link to="/impressum" className="underline decoration-line underline-offset-4 hover:text-pine">
            Impressum
          </Link>
          <Link to="/datenschutz" className="underline decoration-line underline-offset-4 hover:text-pine">
            Datenschutz
          </Link>
          <span>Keine Anlageberatung</span>
        </p>
      </div>
    </footer>
  );
}
