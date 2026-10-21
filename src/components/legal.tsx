import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Rubrik } from "@/components/rubrik";

export const LEGAL_STAND = "21. Oktober 2026";

export const PHONE_DISPLAY = "0176 31630687";
export const PHONE_TEL = "tel:+4917631630687";
export const WHATSAPP_URL = "https://wa.me/4917631630687";

const linkClass = "underline decoration-line underline-offset-4 hover:text-pine";

export function Platzhalter({ children }: { children: ReactNode }) {
  return (
    <strong className="mx-0.5 inline bg-[#fff3c4] px-1.5 py-0.5 font-semibold text-ink ring-1 ring-[#e2c56a]">
      {children}
    </strong>
  );
}

export function Hinweis({ children }: { children: ReactNode }) {
  return (
    <p className="border border-[#e2c56a] bg-[#fff3c4] px-4 py-3 text-sm leading-relaxed text-ink">{children}</p>
  );
}

export function LegalPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Rubrik kicker={kicker} title={title} />
      <p className="mt-4 text-sm text-muted">Stand: {LEGAL_STAND}</p>
      <div className="mt-8 space-y-8 text-base leading-relaxed break-words text-ink">{children}</div>
      <nav aria-label="Rechtliches" className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-sm">
        <Link to="/impressum" className={`${linkClass} inline-flex min-h-11 items-center`}>
          Impressum
        </Link>
        <Link to="/datenschutz" className={`${linkClass} inline-flex min-h-11 items-center`}>
          Datenschutz
        </Link>
        <Link to="/agb" className={`${linkClass} inline-flex min-h-11 items-center`}>
          Nutzungsbedingungen
        </Link>
      </nav>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={`${linkClass} break-words`} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

export function VerantwortlicheAnschrift() {
  return (
    <p>
      <Platzhalter>[Vorname Nachname]</Platzhalter> und <Platzhalter>[Vorname Nachname]</Platzhalter>
      <br />
      (handelnd als „von Kymmel & Gassmann“ / vKG.capital)
      <br />
      Fitzweg 6
      <br />
      64823 Groß-Umstadt
      <br />
      Deutschland
    </p>
  );
}
