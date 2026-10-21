import { createFileRoute, Link } from "@tanstack/react-router";
import { TikTokMark } from "@/components/tiktok-mark";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import {
  ExtLink,
  Hinweis,
  LegalPage,
  LegalSection,
  PHONE_DISPLAY,
  PHONE_TEL,
  Platzhalter,
  WHATSAPP_URL,
} from "@/components/legal";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/impressum")({
  head: () =>
    pageMeta(
      "/impressum",
      "Impressum — vKG.capital",
      "Impressum von vKG.capital gemäß § 5 DDG und § 18 Abs. 2 MStV. von Kymmel & Gassmann, Fitzweg 6, 64823 Groß-Umstadt. Keine Anlageberatung.",
    ),
  component: Impressum,
});

const inlineLink = "underline decoration-line underline-offset-4 hover:text-pine";

function Impressum() {
  return (
    <LegalPage kicker="Kontakt und Impressum" title="Impressum">
      <Hinweis>
        Unvollständig bis zum Ausfüllen. Die gelb markierten Platzhalter{" "}
        <Platzhalter>[Vorname Nachname]</Platzhalter> und <Platzhalter>[E-Mail folgt]</Platzhalter> müssen noch
        eingesetzt werden. Ohne den vollständigen Namen der verantwortlichen Personen und ohne eine E-Mail-Adresse
        genügt dieses Impressum nicht § 5 DDG. Telefon und WhatsApp ersetzen die E-Mail nicht. Keine Rechtsberatung.
      </Hinweis>

      <LegalSection title="Angaben gemäß § 5 DDG">
        <address className="border border-line bg-panel px-5 py-6 not-italic">
          <p>vKG.capital</p>
          <p>www.vkg.capital</p>
          <p className="mt-3">ein Angebot von</p>
          <p className="mt-2">
            <Platzhalter>[Vorname Nachname]</Platzhalter> und <Platzhalter>[Vorname Nachname]</Platzhalter>
          </p>
          <p>handelnd unter der Bezeichnung von Kymmel & Gassmann</p>
          <p className="mt-4">Fitzweg 6</p>
          <p>64823 Groß-Umstadt</p>
          <p>Deutschland</p>
        </address>
        <Hinweis>
          Eine Firma ist nicht eingetragen. Registergericht, Registernummer und Umsatzsteuer-Identifikationsnummer
          fehlen deshalb. Bitte rechtlich und steuerlich prüfen: Betreiben zwei Personen das Angebot gemeinsam, kann
          auch ohne Anmeldung eine Gesellschaft bürgerlichen Rechts (GbR) entstehen. Dann sind der Name der GbR und
          beide Gesellschafter mit Vor- und Nachnamen zu nennen.
        </Hinweis>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon:{" "}
          <a className={inlineLink} href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>
        </p>
        <p>
          WhatsApp:{" "}
          <a
            className={`${inlineLink} inline-flex items-center gap-1.5`}
            href={WHATSAPP_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <WhatsAppMark className="size-4 text-[#25D366]" />
            {PHONE_DISPLAY}
          </a>
        </p>
        <p>
          E-Mail: <Platzhalter>[E-Mail folgt]</Platzhalter>
        </p>
        <p>Website: www.vkg.capital</p>
        <p className="font-medium">LinkedIn</p>
        <p>
          Simon von Kymmel:{" "}
          <ExtLink href="https://www.linkedin.com/in/simon-von-kymmel-450757333">
            linkedin.com/in/simon-von-kymmel-450757333
          </ExtLink>
        </p>
        <p>
          Robin Gassmann:{" "}
          <ExtLink href="https://de.linkedin.com/in/robin-gassmann">linkedin.com/in/robin-gassmann</ExtLink>
        </p>
        <p className="font-medium">Kanäle</p>
        <p>
          Instagram: <ExtLink href="https://www.instagram.com/vkg.capital/">@vkg.capital</ExtLink>
        </p>
        <p>
          TikTok:{" "}
          <ExtLink href="https://www.tiktok.com/@vkg.capital0">
            <TikTokMark className="mr-1.5 inline size-4 align-text-bottom" />
            @vkg.capital0
          </ExtLink>
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV (V.i.S.d.P.)">
        <p>
          <Platzhalter>[Vorname Nachname]</Platzhalter>
          <br />
          Fitzweg 6
          <br />
          64823 Groß-Umstadt
        </p>
        <p className="text-sm text-muted">
          Hier muss eine natürliche Person stehen, keine Marke und kein Firmenname. Sind mehrere Personen
          verantwortlich, ist anzugeben, für welchen Bereich jeweils.
        </p>
      </LegalSection>

      <LegalSection title="Hinweis zu den Inhalten (keine Anlageberatung)">
        <p>
          Die Inhalte auf vKG.capital dienen ausschließlich der allgemeinen Information. Sie stellen keine
          Anlageberatung, keine Anlagevermittlung und keine Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten
          dar. Kursangaben stammen von externen Datenanbietern, sind ohne Gewähr und können verzögert oder fehlerhaft
          sein. Anlageentscheidungen treffen Leserinnen und Leser in eigener Verantwortung.
        </p>
      </LegalSection>

      <LegalSection title="Quellen">
        <p>
          Kursdaten: Yahoo Finance. Die Kurse werden auf unserem Server abgerufen und können verzögert sein. Nachrichten:
          eigene Kurzzusammenfassungen mit Link zur jeweiligen Originalquelle (unter anderem tagesschau, n-tv, DER
          SPIEGEL). Die verlinkten Originalbeiträge verantworten die jeweiligen Redaktionen.
        </p>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für
          diese Inhalte ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine
          Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Links
          umgehend.
        </p>
      </LegalSection>

      <LegalSection title="Urheberrecht">
        <p>
          Die von uns erstellten Texte, Grafiken und das Logo unterliegen dem deutschen Urheberrecht. Vervielfältigung
          und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen der vorherigen Zustimmung.
        </p>
      </LegalSection>

      <LegalSection title="Datenschutz und Nutzungsbedingungen">
        <p>
          Informationen zur Verarbeitung personenbezogener Daten stehen in der{" "}
          <Link to="/datenschutz" className={inlineLink}>
            Datenschutzerklärung
          </Link>
          . Regeln für die kostenlose Nutzung stehen in den{" "}
          <Link to="/agb" className={inlineLink}>
            Nutzungsbedingungen
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
