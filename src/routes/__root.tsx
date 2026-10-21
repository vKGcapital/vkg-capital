import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/redaktion";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "vKG.capital — Börsennews" },
      {
        name: "description",
        content:
          "Börse, Märkte und Wirtschaft, täglich kompakt für den DACH-Raum. Kurse und Nachrichten von vKG.capital. Keine Anlageberatung.",
      },
      { name: "theme-color", content: "#082840" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/mark.png" },
      { rel: "preload", as: "image", href: "/logo-400.webp", type: "image/webp" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  loader: () => ({
    year: new Intl.DateTimeFormat("de-DE", { year: "numeric", timeZone: "Europe/Berlin" }).format(new Date()),
  }),
  component: RootDocument,
});

function RootDocument() {
  const { year } = Route.useLoaderData();
  return (
    <html lang="de" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="inhalt" className="flex-1">
              <Outlet />
            </main>
            <SiteFooter year={year} />
          </div>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
