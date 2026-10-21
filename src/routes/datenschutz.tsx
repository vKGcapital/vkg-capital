import { createFileRoute } from "@tanstack/react-router";
import { Rubrik } from "@/components/rubrik";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/datenschutz")({
  head: () => pageMeta("/datenschutz", "Datenschutz — vKG.capital", "Datenschutzerklärung von vKG.capital."),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Rubrik kicker="Datenschutz" title="Datenschutzerklärung" />
      <p className="mt-4 text-sm text-muted">Stand: 20.10.2026</p>
      <p className="mt-6 border border-line bg-band px-4 py-4 text-sm text-ink">
        Vorlage, keine Rechtsberatung. Platzhalter in eckigen Klammern und Stellen mit „PRÜFEN“ bitte vor der
        Veröffentlichung füllen.
      </p>

      <h2 className="mt-10 text-2xl font-medium">1. Verantwortliche</h2>
      <p className="mt-3 text-muted">
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der
        Datenschutz-Grundverordnung (DSGVO) sind:
      </p>
      <p className="mt-3 text-muted">
        Simon von Kymmel und Robin Gassmann
        <br />
        (handelnd als „von Kymmel & Gassmann“ / vKG.capital)
        <br />
        Fitzweg 6
        <br />
        64823 Groß-Umstadt
        <br />
        Deutschland
      </p>
      <p className="mt-3 text-muted">
        Telefon / WhatsApp: 0176 31630687
        <br />
        E-Mail: support@vkg.capital
      </p>
      <p className="mt-3 text-muted">Ein Datenschutzbeauftragter ist nicht bestellt, da hierzu keine gesetzliche Pflicht besteht.</p>

      <h2 className="mt-8 text-2xl font-medium">2. Überblick</h2>
      <p className="mt-3 text-muted">
        vKG.capital ist ein Informationsangebot zu Börse, Märkten und Wirtschaft. Sie können die Website nutzen, ohne
        sich zu registrieren und ohne uns Daten aktiv mitzuteilen. Wir setzen keine Analyse-, Tracking- oder
        Werbedienste ein, haben kein Kontaktformular und keinen Newsletter.
      </p>
      <p className="mt-3 text-muted">Personenbezogene Daten werden nur in folgenden Fällen verarbeitet:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        <li>technisch beim Aufruf der Website (Server-Logdaten, Sicherheits-Cookie des Hosting-Netzwerks),</li>
        <li>wenn Sie uns per Telefon, WhatsApp oder E-Mail kontaktieren,</li>
        <li>wenn Sie einen Link zu einem externen Angebot anklicken (dann gelten die Bestimmungen des Anbieters).</li>
      </ul>

      <h2 className="mt-8 text-2xl font-medium">3. Rechtsgrundlagen</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        <li>Art. 6 Abs. 1 lit. f DSGVO für die sichere und fehlerfreie Bereitstellung der Website,</li>
        <li>Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage auf eine Zusammenarbeit zielt,</li>
        <li>Art. 6 Abs. 1 lit. a DSGVO, soweit wir Sie ausdrücklich um eine Einwilligung bitten,</li>
        <li>§ 25 Abs. 2 Nr. 2 TDDDG für unbedingt erforderliche Informationen auf Ihrem Endgerät.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-medium">4. Hosting und Server-Logdaten</h2>
      <p className="mt-3 text-muted">
        Die Website wurde mit dem App-Builder „Grok Build“ erstellt und wird auf dessen Plattform betrieben. Anbieter
        der Plattform ist [Name und Anschrift des Plattformbetreibers laut Nutzungsbedingungen, z. B. X.AI LLC, … –
        PRÜFEN]. Für die Auslieferung setzt die Plattform nach unserer technischen Prüfung folgende Dienstleister ein:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        <li>Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA,</li>
        <li>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</li>
      </ul>
      <p className="mt-3 text-muted">
        [PRÜFEN: Dienstleister und Anschriften mit den Angaben des Plattformbetreibers abgleichen. Wird die Seite
        später über eine eigene Domain oder einen anderen Hoster betrieben, diesen Abschnitt anpassen.]
      </p>
      <p className="mt-3 text-muted">
        Beim Aufruf verarbeiten diese Dienstleister IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene
        Datenmenge, HTTP-Statuscode, Referrer-URL, Browsertyp und Betriebssystem. Zweck sind Auslieferung, Stabilität,
        Sicherheit und Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Speicherdauer: nur so lange, wie
        es für diese Zwecke erforderlich ist [PRÜFEN: konkrete Frist laut Anbieter]. Wir selbst werten die Logdaten
        nicht aus.
      </p>
      <p className="mt-3 text-muted">
        Soweit Daten in die USA übermittelt werden, erfolgt dies auf Grundlage des EU-US Data Privacy Framework (Art.
        45 DSGVO), soweit der Anbieter zertifiziert ist, und ergänzend auf Grundlage von EU-Standardvertragsklauseln.
        [PRÜFEN: Zertifizierung kontrollieren. Auftragsverarbeitung nach Art. 28 DSGVO prüfen.]
      </p>

      <h2 className="mt-8 text-2xl font-medium">5. Cookies und Speicherung im Browser</h2>
      <p className="mt-3 text-muted">
        Wir setzen keine Cookies zu Analyse-, Marketing- oder Trackingzwecken ein. Ein Cookie-Banner ist deshalb nicht
        erforderlich.
      </p>
      <p className="mt-3 text-muted">
        Das Hosting-Netzwerk Cloudflare setzt das Cookie „__cf_bm“, um automatisierte Zugriffe von menschlichen
        Besuchen zu unterscheiden. Es enthält eine zufällige Kennung, dient nicht der Werbung und läuft nach 30 Minuten
        ab. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG und Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <p className="mt-3 text-muted">
        Im Sitzungsspeicher des Browsers liegen technische Informationen, etwa die Scrollposition. Diese Daten
        verlassen Ihr Gerät nicht und werden beim Schließen des Tabs gelöscht.
      </p>

      <h2 className="mt-8 text-2xl font-medium">6. Schriftarten</h2>
      <p className="mt-3 text-muted">
        Diese Website verwendet die Schriftarten „Newsreader“ und „Source Sans 3“. Die Schriftdateien werden direkt von
        unserem eigenen Webserver geladen. Eine Verbindung zu Servern von Google oder anderen Schriftanbietern findet
        nicht statt.
      </p>

      <h2 className="mt-8 text-2xl font-medium">7. Börsenkurse und Nachrichten</h2>
      <p className="mt-3 text-muted">
        Die angezeigten Kurse ruft unser Server bei einem externen Datenanbieter ab (derzeit Yahoo Finance) [PRÜFEN: bei
        Anbieterwechsel anpassen]. Ihr Browser baut dabei keine Verbindung zum Datenanbieter auf.
      </p>
      <p className="mt-3 text-muted">
        Unter Nachrichten zeigen wir kurze, eigene Zusammenfassungen mit Link zur Originalquelle (zum Beispiel
        tagesschau, n-tv, DER SPIEGEL). Bilder der Quellen werden nicht eingebunden. Erst der Klick auf einen Link
        verlässt diese Website.
      </p>

      <h2 className="mt-8 text-2xl font-medium">8. Kontakt per Telefon, WhatsApp oder E-Mail</h2>
      <p className="mt-3 text-muted">
        Wenn Sie uns kontaktieren, verarbeiten wir die mitgeteilten Daten, um die Anfrage zu beantworten.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern es um eine Zusammenarbeit geht, sonst Art. 6 Abs. 1 lit.
        f DSGVO. Wir löschen die Daten, sobald die Anfrage bearbeitet ist und keine Aufbewahrungspflicht
        entgegensteht.
      </p>
      <p className="mt-3 text-muted">
        Der WhatsApp-Link (wa.me) ist ein einfacher Link. Beim Besuch dieser Website werden keine Daten an WhatsApp
        übertragen. Erst der Klick öffnet WhatsApp. Anbieter ist die WhatsApp Ireland Limited, 4 Grand Canal Square,
        Grand Canal Harbour, Dublin 2, Irland. Datenschutzhinweise: https://www.whatsapp.com/legal/privacy-policy-eea
      </p>

      <h2 className="mt-8 text-2xl font-medium">9. Links zu externen Websites</h2>
      <p className="mt-3 text-muted">
        Links zu Nachrichtenseiten und zu Google Maps sind einfache Hyperlinks. Beim Aufruf unserer Website werden
        keine Daten an diese Anbieter übertragen. Nach dem Klick gelten deren Bestimmungen.
      </p>

      <h2 className="mt-8 text-2xl font-medium">10. Instagram</h2>
      <p className="mt-3 text-muted">
        Wir verlinken den Kanal @vkg.capital ohne eingebettete Inhalte. Beim Besuch unserer Website werden keine Daten
        an Instagram übertragen. Den Kanal betreibt die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04
        X2K5, Irland (https://privacycenter.instagram.com/policy). Für Kanalstatistiken sind wir gemeinsam mit Meta
        verantwortlich (Art. 26 DSGVO).
      </p>

      <h2 className="mt-8 text-2xl font-medium">11. TikTok</h2>
      <p className="mt-3 text-muted">
        Wir verlinken den Kanal @vkg.capital0 ohne eingebettete Inhalte. Beim Besuch unserer Website werden keine Daten
        an TikTok übertragen. Erst der Klick öffnet TikTok. Den Dienst betreibt die TikTok Technology Limited, 10
        Earlsfort Terrace, Dublin, D02 T380, Irland (https://www.tiktok.com/legal/page/eea/privacy-policy/de).
      </p>

      <h2 className="mt-8 text-2xl font-medium">12. Plattform-Skript des App-Builders</h2>
      <p className="mt-3 text-muted">
        [PRÜFEN – nur behalten, solange zutreffend:] Die Plattform bindet auf jeder Seite ein technisches Skript von
        grok.com ein. Dabei wird Ihre IP-Adresse an den Plattformbetreiber übermittelt. Das Skript fragt ohne Cookies
        ab, ob ein Hinweis „Created with Grok“ angezeigt werden soll. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        Weitere Informationen: [Link zur Datenschutzerklärung des Plattformbetreibers].
      </p>

      <h2 className="mt-8 text-2xl font-medium">13. Ihre Rechte</h2>
      <p className="mt-3 text-muted">
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art.
        18), Datenübertragbarkeit (Art. 20) und Widerruf einer Einwilligung (Art. 7 Abs. 3). Soweit wir auf Art. 6 Abs.
        1 lit. f DSGVO stützen, können Sie widersprechen (Art. 21). Zuständige Aufsicht: Der Hessische Beauftragte für
        Datenschutz und Informationsfreiheit, Postfach 3163, 65021 Wiesbaden, https://datenschutz.hessen.de
      </p>

      <h2 className="mt-8 text-2xl font-medium">14. Keine automatisierte Entscheidungsfindung</h2>
      <p className="mt-3 text-muted">Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.</p>

      <h2 className="mt-8 text-2xl font-medium">15. Sicherheit</h2>
      <p className="mt-3 text-muted">Die Website wird ausschließlich verschlüsselt über HTTPS (TLS) ausgeliefert.</p>

      <h2 className="mt-8 text-2xl font-medium">16. Änderungen</h2>
      <p className="mt-3 text-muted">
        Wir passen diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die hier
        veröffentlichte Fassung.
      </p>
    </article>
  );
}
