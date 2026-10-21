import { createFileRoute } from "@tanstack/react-router";
import {
  ExtLink,
  Hinweis,
  LegalPage,
  LegalSection,
  PHONE_DISPLAY,
  PHONE_TEL,
  Platzhalter,
  VerantwortlicheAnschrift,
  WHATSAPP_URL,
} from "@/components/legal";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/datenschutz")({
  head: () =>
    pageMeta(
      "/datenschutz",
      "Datenschutz — vKG.capital",
      "Datenschutzerklärung von vKG.capital: Hosting über Cloudflare und Vercel, Server-Logdaten, selbst gehostete Schriften, Kontakt per Telefon und WhatsApp, externe Links. Keine Tracking-Cookies.",
    ),
  component: Datenschutz,
});

const inlineLink = "underline decoration-line underline-offset-4 hover:text-pine";

function Datenschutz() {
  return (
    <LegalPage kicker="Datenschutz" title="Datenschutzerklärung">
      <Hinweis>
        Vorlage, keine Rechtsberatung. Gelb markierte Platzhalter und die Hinweise „Bitte prüfen“ müssen die Betreiber
        vor einer Veröffentlichung mit den Verträgen der Dienstleister abgleichen.
      </Hinweis>

      <LegalSection title="1. Verantwortliche">
        <p>
          Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der
          Datenschutz-Grundverordnung (DSGVO) sind:
        </p>
        <VerantwortlicheAnschrift />
        <p>
          Telefon / WhatsApp:{" "}
          <a className={inlineLink} href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>{" "}
          (
          <a className={inlineLink} href={WHATSAPP_URL} rel="noopener noreferrer" target="_blank">
            WhatsApp
          </a>
          )
          <br />
          E-Mail: <Platzhalter>[E-Mail folgt]</Platzhalter>
        </p>
        <p>Ein Datenschutzbeauftragter ist nicht bestellt, da hierzu keine gesetzliche Pflicht besteht.</p>
      </LegalSection>

      <LegalSection title="2. Überblick">
        <p>
          vKG.capital ist ein Informationsangebot zu Börse, Märkten und Wirtschaft. Sie können die Website nutzen, ohne
          sich zu registrieren und ohne uns Daten aktiv mitzuteilen. Wir setzen keine Analyse-, Tracking- oder
          Werbedienste ein, haben kein Kontaktformular, kein Nutzerkonto und keinen Newsletter.
        </p>
        <p>Personenbezogene Daten werden nur in folgenden Fällen verarbeitet:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>technisch beim Aufruf der Website (Server-Logdaten und ein Sicherheits-Cookie des Auslieferungsnetzes),</li>
          <li>wenn Ihr Browser das technische Skript der Hosting-Plattform von grok.com lädt,</li>
          <li>wenn Sie uns per Telefon, WhatsApp oder E-Mail kontaktieren,</li>
          <li>
            wenn Sie einen Link zu einem externen Angebot anklicken (dann gelten die Datenschutzbestimmungen des
            jeweiligen Anbieters).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Rechtsgrundlagen">
        <p>Wir verarbeiten Daten auf Grundlage von</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse) für die sichere, stabile und
            fehlerfreie Bereitstellung der Website,
          </li>
          <li>
            <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertrag oder vorvertragliche Maßnahmen), wenn Ihre Anfrage auf
            eine Zusammenarbeit zielt,
          </li>
          <li>
            <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung), soweit wir Sie ausdrücklich um eine Einwilligung
            bitten,
          </li>
          <li>
            <strong>§ 25 Abs. 2 Nr. 2 TDDDG</strong> für das Speichern von oder den Zugriff auf Informationen in Ihrem
            Endgerät, soweit dies für den von Ihnen gewünschten Dienst unbedingt erforderlich ist.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Hosting und Server-Logdaten">
        <p>
          Die Website wurde mit dem App-Builder „Grok Build“ erstellt. Beim Aufruf der derzeit veröffentlichten Adresse
          unter grok.me wird sie über das Netz von Cloudflare ausgeliefert. Die Anwendung selbst läuft bei Vercel, nach
          dem Antwortkopf der Live-Seite in einer Region in den USA (Kennung iad1). Technische Prüfung am 21. Oktober
          2026.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Cloudflare, Inc.</strong>, 101 Townsend St., San Francisco, CA 94107, USA (Auslieferungsnetz, Schutz
            vor Angriffen und missbräuchlichen Zugriffen),
          </li>
          <li>
            <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA (Betrieb der Anwendung).
          </li>
        </ul>
        <Hinweis>
          Bitte prüfen: Dienstleister, Anschriften und die konkrete Region mit den Unterlagen des Plattformbetreibers
          abgleichen. Zeigt die eigene Domain vkg.capital später auf einen anderen Hoster oder eine andere Region, ist
          dieser Abschnitt anzupassen. Die Plattform selbst wird von SpaceXAI LLC betrieben, siehe Abschnitt 12.
        </Hinweis>
        <p>Beim Aufruf verarbeiten diese Dienstleister automatisch Daten, die Ihr Browser übermittelt (Server-Logdaten):</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>IP-Adresse,</li>
          <li>Datum und Uhrzeit des Zugriffs,</li>
          <li>aufgerufene Seite oder Datei und übertragene Datenmenge,</li>
          <li>HTTP-Statuscode,</li>
          <li>Referrer-URL (zuvor besuchte Seite), soweit Ihr Browser sie übermittelt,</li>
          <li>Browsertyp und -version, Betriebssystem.</li>
        </ul>
        <p>
          Dazu gehören auch die Abrufe von Kursen und Nachrichten an unseren eigenen Server. Ihr Browser spricht dabei
          uns an, nicht die Kurs- oder Nachrichtenquelle. Zweck sind Auslieferung, Stabilität, Sicherheit, Abwehr von
          Angriffen und Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
          liegt in einer technisch fehlerfreien und sicheren Website.
        </p>
        <p>
          Speicherdauer: Die Dienstleister speichern Logdaten nur so lange, wie es für diese Zwecke erforderlich ist,
          und löschen oder anonymisieren sie danach. Wir selbst werten die Logdaten nicht zu Profilen aus und führen
          sie nicht mit anderen Daten zusammen.
        </p>
        <Hinweis>
          Bitte prüfen: Die konkrete Aufbewahrungsfrist von Cloudflare und Vercel ist uns aus dem Quellcode nicht
          bekannt und hier noch einzutragen. Mit dem Plattformbetreiber und den genannten Dienstleistern muss ein
          Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO bestehen. Ob er abgeschlossen und abgelegt ist, ist anhand
          der Kontounterlagen zu bestätigen.
        </Hinweis>
        <p>
          Soweit Daten in die USA übermittelt werden, stützen wir das auf den Angemessenheitsbeschluss der
          EU-Kommission zum EU-US Data Privacy Framework (Art. 45 DSGVO), soweit der jeweilige Anbieter danach
          zertifiziert ist, und ergänzend auf EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
        </p>
        <Hinweis>
          Bitte prüfen: Die Zertifizierung der Anbieter unter https://www.dataprivacyframework.gov vor dem Verlassen auf
          Art. 45 DSGVO kontrollieren.
        </Hinweis>
      </LegalSection>

      <LegalSection title="5. Cookies und Speicherung im Browser">
        <p>
          Wir setzen keine Cookies zu Analyse-, Marketing- oder Trackingzwecken ein und betreiben kein
          Einwilligungsverwaltungs-Banner. Die Website legt für den gewöhnlichen Lesevorgang keine eigenen Cookies an
          und speichert keine Inhalte in Local Storage oder Session Storage.
        </p>
        <p>
          <strong>Sicherheits-Cookie „__cf_bm“ (Cloudflare).</strong> Beim Aufruf der über grok.me ausgelieferten Seite
          setzt Cloudflare das Cookie __cf_bm. Es dient dazu, automatisierte Zugriffe von menschlichen Besuchen zu
          unterscheiden und die Website vor Missbrauch zu schützen. Das Cookie enthält eine zufällige Kennung, wird
          nicht zu Werbe- oder Analysezwecken genutzt und läuft nach etwa 30 Minuten ab. Es ist als HttpOnly und Secure
          markiert. Rechtsgrundlage für das Speichern ist § 25 Abs. 2 Nr. 2 TDDDG, für die damit verbundene
          Datenverarbeitung Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Sie können Cookies in den Einstellungen Ihres Browsers löschen oder blockieren. Der Schutz der Website kann
          dann eingeschränkt sein.
        </p>
        <Hinweis>
          Bitte prüfen: Das Cookie __cf_bm haben wir an der Live-Adresse unter grok.me beobachtet. Fällt Cloudflare bei
          einem Wechsel der Domain oder des Hostings weg, ist dieser Absatz zu streichen.
        </Hinweis>
      </LegalSection>

      <LegalSection title="6. Schriftarten">
        <p>
          Diese Website verwendet die Schriftarten Newsreader und Source Sans 3. Die Schriftdateien werden von unserem
          eigenen Webserver ausgeliefert. Beim Aufruf entsteht keine Verbindung zu Servern von Google oder einem anderen
          Schriftanbieter.
        </p>
      </LegalSection>

      <LegalSection title="7. Börsenkurse und Nachrichten">
        <p>
          <strong>Kursdaten.</strong> Die angezeigten Kurse ruft unser Server bei Yahoo Finance ab
          (query1.finance.yahoo.com). Der Abruf erfolgt serverseitig. Ihr Browser baut dabei keine Verbindung zu Yahoo
          auf, und es werden keine personenbezogenen Daten von Ihnen an Yahoo übermittelt. Die Kurse können verzögert
          sein.
        </p>
        <p>
          <strong>Nachrichten.</strong> Unter Nachrichten zeigen wir Überschriften und kurze eigene Zusammenfassungen
          mit Link zur Originalquelle. Die Meldungen werden serverseitig über öffentlich bereitgestellte Feeds von
          tagesschau.de, n-tv.de und spiegel.de abgerufen. Bilder der Quellen werden nicht eingebunden. Erst wenn Sie
          einen Link anklicken, verlassen Sie unsere Website.
        </p>
        <p>
          <strong>Kurzzusammenfassungen.</strong> Soweit auf dem Server ein Zugang zur API von xAI eingerichtet ist,
          sendet der Server Überschrift, Quellenname und einen kurzen Auszug der Meldung an api.x.ai, um eine eigene
          Zusammenfassung zu erzeugen. In dieser Anfrage stehen keine IP-Adresse und keine anderen Daten aus Ihrem
          Besuch. Anbieter dieses Dienstes ist die SpaceXAI LLC, 800 W Cesar Chavez St., Austin, TX 78701, USA.
          Datenschutzhinweise: <ExtLink href="https://x.ai/legal/privacy-policy">x.ai/legal/privacy-policy</ExtLink>.
          Ohne diesen Zugang zeigen wir die Meldung ohne eigene Zusammenfassung.
        </p>
        <Hinweis>
          Bitte prüfen: Bei einem Wechsel der Kursquelle oder der Nachrichtenfeeds ist dieser Abschnitt anzupassen. Für
          die API ist zu bestätigen, dass ein Auftragsverarbeitungsvertrag besteht, falls in den übermittelten
          Meldungstexten ausnahmsweise personenbezogene Daten Dritter stehen.
        </Hinweis>
      </LegalSection>

      <LegalSection title="8. Kontakt per Telefon, WhatsApp oder E-Mail">
        <p>
          Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (zum Beispiel Name, Telefonnummer,
          E-Mail-Adresse und den Inhalt der Nachricht), um Ihre Anfrage zu beantworten.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einer möglichen Zusammenarbeit
          zusammenhängt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Beantwortung von Anfragen). Wir löschen
          die Daten, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen.
        </p>
        <p>
          <strong>WhatsApp.</strong> Der WhatsApp-Hinweis auf der Website ist ein einfacher Link (wa.me), kein
          eingebettetes Element. Beim bloßen Besuch unserer Website werden keine Daten an WhatsApp übertragen. Erst
          wenn Sie den Link anklicken, öffnet sich die WhatsApp-Website oder die App. Anbieter ist die WhatsApp Ireland
          Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. WhatsApp verarbeitet dabei unter anderem
          Ihre Telefonnummer, Metadaten der Kommunikation und Geräteinformationen. Daten können an die Meta Platforms,
          Inc. in den USA übermittelt werden. Bitte nutzen Sie WhatsApp nur, wenn Sie mit dieser Verarbeitung
          einverstanden sind. Alternativ erreichen Sie uns telefonisch oder, sobald sie eingetragen ist, per E-Mail.
          Datenschutzhinweise:{" "}
          <ExtLink href="https://www.whatsapp.com/legal/privacy-policy-eea">
            whatsapp.com/legal/privacy-policy-eea
          </ExtLink>
          .
        </p>
        <p>
          Wenn Sie uns per WhatsApp schreiben, verarbeiten auch wir Ihre Telefonnummer, Ihren Profilnamen und den
          Nachrichteninhalt zur Beantwortung. Die Rechtsgrundlagen sind dieselben wie oben.
        </p>
      </LegalSection>

      <LegalSection title="9. Links zu externen Websites">
        <p>
          Unsere Website enthält einfache Links zu Angeboten Dritter, insbesondere zu Nachrichtenseiten (tagesschau.de,
          n-tv.de, spiegel.de) und zu LinkedIn-Profilen. Es sind keine eingebetteten Inhalte und kein Kartendienst. Beim
          Aufruf unserer Website werden keine Daten an diese Anbieter übertragen. Erst nach einem Klick gelten die
          Datenschutzbestimmungen des jeweiligen Anbieters, auf die wir keinen Einfluss haben.
        </p>
        <p>
          LinkedIn wird betrieben von der LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Irland. Hinweise:{" "}
          <ExtLink href="https://www.linkedin.com/legal/privacy-policy">linkedin.com/legal/privacy-policy</ExtLink>.
        </p>
      </LegalSection>

      <LegalSection title="10. Instagram">
        <p>
          Wir betreiben einen Instagram-Kanal (@vkg.capital) und verlinken ihn. Es handelt sich um einen einfachen Link
          ohne eingebettete Inhalte oder Plugins. Beim Besuch unserer Website werden keine Daten an Instagram
          übertragen.
        </p>
        <p>
          Wenn Sie den Kanal besuchen, verarbeitet die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5,
          Irland, Ihre Daten nach ihren eigenen Bestimmungen (
          <ExtLink href="https://privacycenter.instagram.com/policy">privacycenter.instagram.com/policy</ExtLink>
          ). Soweit wir Statistiken des Kanals (Insights) abrufen, sind wir für diese gemeinsam mit Meta verantwortlich
          (Art. 26 DSGVO). Die Vereinbarung dazu stellt Meta unter{" "}
          <ExtLink href="https://www.facebook.com/legal/terms/page_controller_addendum">
            facebook.com/legal/terms/page_controller_addendum
          </ExtLink>{" "}
          bereit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Information unserer Leserinnen und Leser).
          Betroffenenrechte können Sie auch direkt gegenüber Meta geltend machen.
        </p>
      </LegalSection>

      <LegalSection title="11. TikTok">
        <p>
          Wir verlinken den Kanal @vkg.capital0 ohne eingebettete Inhalte. Beim Besuch unserer Website werden keine
          Daten an TikTok übertragen. Erst der Klick öffnet TikTok. Den Dienst betreibt die TikTok Technology Limited,
          10 Earlsfort Terrace, Dublin, D02 T380, Irland. Datenschutzhinweise:{" "}
          <ExtLink href="https://www.tiktok.com/legal/page/eea/privacy-policy/de">
            tiktok.com/legal/page/eea/privacy-policy/de
          </ExtLink>
          .
        </p>
        <Hinweis>
          Bitte prüfen: Werden über den TikTok-Kanal Statistiken abgerufen, kann eine gemeinsame Verantwortlichkeit mit
          TikTok entstehen. Die zugehörige Vereinbarung ist dann zu ergänzen. Ohne Nutzung solcher Statistiken bleibt
          es bei dem einfachen Link.
        </Hinweis>
      </LegalSection>

      <LegalSection title="12. Plattform-Skript des App-Builders">
        <p>
          Die Plattform, mit der diese Website erstellt und ausgeliefert wird, bindet auf jeder HTML-Seite ein
          technisches Skript von grok.com ein (https://grok.com/grok-app-builder/extensions.js). Dabei wird Ihre
          IP-Adresse an den Plattformbetreiber übermittelt, weil Ihr Browser die Datei von dort lädt. Das Skript dient
          dem Hinweis „Created with Grok“ und der zugehörigen Plattformfunktion. Wir setzen es nicht für eigene Werbung
          oder Reichweitenmessung ein.
        </p>
        <p>
          Anbieter ist die SpaceXAI LLC, 800 W Cesar Chavez St., Austin, TX 78701, USA. Datenschutzhinweise:{" "}
          <ExtLink href="https://x.ai/legal/privacy-policy">x.ai/legal/privacy-policy</ExtLink>. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. f DSGVO (Betrieb der Website über die gewählte Plattform). Eine Übermittlung in die USA
          kann dabei nicht ausgeschlossen werden, siehe die Grundlagen in Abschnitt 4.
        </p>
        <Hinweis>
          Bitte prüfen: Diesen Abschnitt behalten, solange das Skript ausgeliefert wird. Wird die Website ohne die
          Grok-Plattform betrieben, ist er zu entfernen.
        </Hinweis>
      </LegalSection>

      <LegalSection title="13. Ihre Rechte">
        <p>Sie haben nach der DSGVO das Recht auf</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Auskunft über Ihre bei uns gespeicherten Daten (Art. 15),</li>
          <li>Berichtigung unrichtiger Daten (Art. 16),</li>
          <li>Löschung (Art. 17),</li>
          <li>Einschränkung der Verarbeitung (Art. 18),</li>
          <li>Datenübertragbarkeit (Art. 20),</li>
          <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3).</li>
        </ul>
        <p>
          <strong>Widerspruchsrecht (Art. 21 DSGVO).</strong> Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
          widersprechen. Wenden Sie sich dazu an die oben genannten Kontaktdaten.
        </p>
        <p>
          <strong>Beschwerderecht.</strong> Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns
          zuständig ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Postfach 3163, 65021
          Wiesbaden,{" "}
          <ExtLink href="https://datenschutz.hessen.de">datenschutz.hessen.de</ExtLink>.
        </p>
      </LegalSection>

      <LegalSection title="14. Keine automatisierte Entscheidungsfindung">
        <p>
          Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht
          statt. Die serverseitige Kurzzusammenfassung von Nachrichten bewertet keine Personen und hat keine rechtliche
          Wirkung für Sie.
        </p>
      </LegalSection>

      <LegalSection title="15. Sicherheit">
        <p>Die Website wird ausschließlich verschlüsselt über HTTPS (TLS) ausgeliefert.</p>
      </LegalSection>

      <LegalSection title="16. Änderungen">
        <p>
          Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die
          jeweils hier veröffentlichte Fassung.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
