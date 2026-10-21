import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Instagram, Menu, X } from "lucide-react";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { TikTokMark } from "@/components/tiktok-mark";

const DESKTOP = [
  { to: "/nachrichten", label: "Nachrichten" },
  { to: "/maerkte", label: "Märkte" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/impressum", label: "Impressum" },
] as const;

const MOBILE = [...DESKTOP, { to: "/datenschutz", label: "Datenschutz" }] as const;

const navBase = "inline-flex min-h-12 items-center justify-center px-3 text-sm transition-colors";

function NavLink({
  to,
  label,
  block,
  onClick,
}: {
  to: (typeof MOBILE)[number]["to"];
  label: string;
  block?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={block ? `${navBase} w-full justify-start px-4` : navBase}
      activeOptions={{ exact: false, includeSearch: false }}
      activeProps={{ className: "bg-white font-semibold text-[#082840]" }}
      inactiveProps={{ className: "font-medium text-white/80 hover:bg-white/10 hover:text-white" }}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="z-30 bg-paper/95 backdrop-blur-sm md:sticky md:top-0">
      <a className="skip" href="#inhalt">
        Zum Inhalt
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 md:px-6 md:py-3">
        <Link to="/" className="inline-flex min-h-11 items-center" onClick={() => setOpen(false)}>
          <picture>
            <source type="image/webp" srcSet="/logo-400.webp 1x, /logo-800.webp 2x" />
            <img
              src="/logo-400.png"
              width={400}
              height={93}
              alt="vKG.capital — zur Startseite"
              className="h-8 w-auto md:h-11"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/4917631630687"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#128C7E] bg-white text-[#075E54] hover:bg-[#f3fbf7] md:w-auto md:gap-2 md:rounded-none md:px-3"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="WhatsApp"
          >
            <WhatsAppMark className="size-5 text-[#25D366]" />
            <span className="hidden text-sm font-medium md:inline">WhatsApp</span>
          </a>
          <a
            href="https://www.instagram.com/vkg.capital/"
            className="hidden min-h-11 items-center gap-2 border border-line bg-white px-3 text-sm text-ink hover:border-ink md:inline-flex"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram className="size-4" aria-hidden="true" />
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@vkg.capital0"
            className="hidden min-h-11 items-center gap-2 border border-line bg-white px-3 text-sm text-ink hover:border-ink md:inline-flex"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="TikTok"
          >
            <TikTokMark className="size-4" />
            TikTok
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink bg-[#082840] text-white md:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Seiten" className={`${open ? "block" : "hidden"} border-t border-line bg-[#082840] md:hidden`}>
        {MOBILE.map((link) => (
          <NavLink key={link.to} to={link.to} label={link.label} block onClick={() => setOpen(false)} />
        ))}
        <a
          href="https://www.instagram.com/vkg.capital/"
          className="inline-flex min-h-12 w-full items-center gap-2 px-4 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram className="size-4" aria-hidden="true" />
          Instagram
        </a>
        <a
          href="https://www.tiktok.com/@vkg.capital0"
          className="inline-flex min-h-12 w-full items-center gap-2 px-4 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TikTokMark className="size-4" />
          TikTok
        </a>
        <a
          href="https://wa.me/4917631630687"
          className="inline-flex min-h-12 w-full items-center gap-2 px-4 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppMark className="size-4 text-[#25D366]" />
          WhatsApp
        </a>
      </nav>
      <nav aria-label="Seiten" className="hidden bg-[#082840] md:block">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-4">
          {DESKTOP.map((link) => (
            <NavLink key={link.to} to={link.to} label={link.label} />
          ))}
        </div>
      </nav>
    </header>
  );
}
