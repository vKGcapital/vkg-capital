import { Link } from "@tanstack/react-router";

const footerLink = "inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:text-pine";

export function SiteFooter({ year }: { year: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted md:px-6">
        <p className="flex items-center gap-3">
          <img src="/mark.png" alt="" className="h-8 w-8" />
          vKG.capital · von Kymmel & Gassmann · Fitzweg 6, 64823 Groß-Umstadt · {year}
        </p>
        <nav aria-label="Rechtliches" className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link to="/impressum" className={footerLink}>
            Impressum
          </Link>
          <Link to="/datenschutz" className={footerLink}>
            Datenschutz
          </Link>
          <Link to="/agb" className={footerLink}>
            Nutzungsbedingungen
          </Link>
          <span className="inline-flex min-h-11 items-center">Keine Anlageberatung</span>
        </nav>
      </div>
    </footer>
  );
}
