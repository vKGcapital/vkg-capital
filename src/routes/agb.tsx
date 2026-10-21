import { createFileRoute, Link } from "@tanstack/react-router";
import { Hinweis, LegalPage, LegalSection, Platzhalter, VerantwortlicheAnschrift } from "@/components/legal";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/agb")({
  head: () =>
    pageMeta(
      "/agb",
      "Nutzungsbedingungen — vKG.capital",
      "Nutzungsbedingungen für das kostenlose Börsen-Informationsangebot von vKG.capital. Keine Anlageberatung und keine Gewähr für Richtigkeit oder Aktualität der Kurse.",
    ),
  component: Agb,
});

const inlineLink = "underline decoration-line underline-offset-4 hover:text-pine";

function Agb() {
  return (
    <LegalPage kicker="Rechtliches" title="Nutzungsbedingungen (AGB)">
      <Hinweis>
        Diese Bedingungen gelten für ein kostenloses Informationsangebot. Es gibt kein kostenpflichtiges Abo und keinen
        Vertragsschluss über ein Formular. Keine Rechtsberatung. Die gelb markierten Namen sind Platzhalter.
      </Hinweis>

      <LegalSection title="1. Geltungsbereich">
        <p>
          Diese Nutzungsbedingungen gelten für die Nutzung der Website vKG.capital, einschließlich der Seiten zu
          Nachrichten, Märkten und Kommentaren. Anbieter sind
        </p>
        <VerantwortlicheAnschrift />
        <p>
          E-Mail: <Platzhalter>[E-Mail folgt]</Platzhalter>. Telefon und WhatsApp: 0176 31630687. Das{" "}
          <Link to="/impressum" className={inlineLink}>
            Impressum
          </Link>{" "}
          nennt die übrigen Pflichtangaben.
        </p>
        <p>
          Die Website richtet sich an Leserinnen und Leser im deutschsprachigen Raum. Mit dem Abruf der Seiten nutzen
          Sie das Angebot zu diesen Bedingungen, soweit das gesetzlich zulässig ist. Abweichende Bedingungen der
          Nutzerinnen und Nutzer werden nicht Vertragsbestandteil.
        </p>
      </LegalSection>

      <LegalSection title="2. Kostenloses Angebot">
        <p>
          Die Nutzung der Website ist unentgeltlich. Wir bieten darüber keinen kostenpflichtigen Dienst, kein
          Nutzerkonto und keine individuelle Betreuung an. Ein Vertrag über eine entgeltliche Leistung kommt durch den
          bloßen Besuch nicht zustande.
        </p>
      </LegalSection>

      <LegalSection title="3. Keine Anlageberatung">
        <p>
          Die Inhalte dienen ausschließlich der allgemeinen Information. Sie stellen keine Anlageberatung, keine
          Anlagevermittlung, keine Finanzportfolioverwaltung und keine Aufforderung zum Kauf oder Verkauf von
          Finanzinstrumenten dar. Wir geben keine auf Ihre persönlichen Verhältnisse zugeschnittene Empfehlung.
          Anlageentscheidungen treffen Sie in eigener Verantwortung. Vor einer Entscheidung holen Sie bei Bedarf Rat
          von einer hierzu befugten Stelle ein.
        </p>
      </LegalSection>

      <LegalSection title="4. Keine Gewähr für Richtigkeit und Aktualität">
        <p>
          Wir bemühen uns um eine sorgfältige Darstellung. Eine Garantie für Richtigkeit, Vollständigkeit oder
          Aktualität der Inhalte übernehmen wir nicht. Kursangaben stammen von einem externen Datenanbieter (derzeit
          Yahoo Finance), sind ohne Gewähr und können verzögert, unvollständig oder fehlerhaft sein. Nachrichten sind
          kurze eigene Zusammenfassungen mit Verweis auf die Originalquelle. Maßgeblich bleibt der Beitrag der
          jeweiligen Redaktion.
        </p>
        <p>
          Die Website kann vorübergehend nicht erreichbar sein, etwa bei Wartung oder bei einer Störung der Kurs- oder
          Nachrichtenquelle. Ein Anspruch auf eine bestimmte Verfügbarkeit besteht nicht.
        </p>
      </LegalSection>

      <LegalSection title="5. Inhalte Dritter und Links">
        <p>
          Beiträge, die wir verlinken, stammen von Dritten, insbesondere von tagesschau, n-tv und DER SPIEGEL, sowie von
          den Betreibern der verlinkten Profile und Kanäle (LinkedIn, Instagram, TikTok, WhatsApp). Auf diese Inhalte
          haben wir keinen Einfluss. Für sie ist der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung
          waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir den betreffenden
          Link. Mit dem Anklicken verlassen Sie vKG.capital. Es gelten dann die Bedingungen des anderen Angebots.
        </p>
      </LegalSection>

      <LegalSection title="6. Urheberrecht an eigenen Inhalten">
        <p>
          Texte, Zusammenfassungen, Kommentare, Grafiken und das Logo, die wir erstellt haben, unterliegen dem deutschen
          Urheberrecht. Sie dürfen sie für den privaten Gebrauch in den gesetzlichen Grenzen lesen und speichern.
          Vervielfältigung, Bearbeitung und öffentliche Wiedergabe darüber hinaus bedürfen unserer vorherigen
          Zustimmung. Kursdaten und die verlinkten Originalbeiträge bleiben Rechte der jeweiligen Rechteinhaber.
        </p>
      </LegalSection>

      <LegalSection title="7. Haftung">
        <p>
          Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei der Verletzung des Lebens, des Körpers oder
          der Gesundheit sowie nach dem Produkthaftungsgesetz. Eine Garantie übernehmen wir nicht.
        </p>
        <p>
          Bei leicht fahrlässiger Verletzung einer wesentlichen Pflicht, deren Erfüllung die Nutzung der Website erst
          ermöglicht und auf deren Einhaltung Sie regelmäßig vertrauen dürfen, ist die Haftung auf den vorhersehbaren,
          vertragstypischen Schaden begrenzt.
        </p>
        <p>
          Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen. Soweit die Haftung ausgeschlossen oder
          begrenzt ist, gilt das auch zugunsten der Personen, deren Verhalten uns zugerechnet wird, soweit das
          gesetzlich zulässig ist.
        </p>
        <p>
          Für Schäden, die durch die Nutzung der Informationen als Entscheidungsgrundlage für Geldanlagen entstehen,
          gilt zusätzlich Abschnitt 3: Die Inhalte sind keine Beratung. Eine Haftung für Vermögensentscheidungen, die
          Sie auf Grundlage der allgemeinen Informationen treffen, besteht nur in den vorstehenden Grenzen.
        </p>
      </LegalSection>

      <LegalSection title="8. Änderungen">
        <p>
          Wir können diese Nutzungsbedingungen anpassen, wenn sich das Angebot oder die Rechtslage ändert. Es gilt die
          auf dieser Seite veröffentlichte Fassung. Das Datum oben nennt den Stand. Ein kostenpflichtiges
          Dauerschuldverhältnis, das eine gesonderte Zustimmungsfrist auslösen würde, besteht nicht.
        </p>
      </LegalSection>

      <LegalSection title="9. Anwendbares Recht">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Zwingende Verbraucherschutzvorschriften des Staates, in dem
          Sie Ihren gewöhnlichen Aufenthalt haben, bleiben unberührt. Gegenüber Unternehmerinnen und Unternehmern gilt
          das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        </p>
      </LegalSection>

      <LegalSection title="10. Teilunwirksamkeit">
        <p>
          Sollte eine Bestimmung dieser Nutzungsbedingungen unwirksam sein oder werden, bleibt der übrige Text wirksam.
          An die Stelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
