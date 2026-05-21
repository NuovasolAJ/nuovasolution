import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider }   from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  title: "NuovaSolution — Never Miss a Lead Again",
  description:
    "Instant replies. Qualified clients. Real opportunities. AI lead capture and qualification for real estate agencies in Spain.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "NuovaSolution — Never Miss a Lead Again",
    description: "Instant replies. Qualified clients. Real opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        {/* Cal.com popup embed — init script */}
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = cal.ns[namespace] || api, p(cal.ns[namespace], ar), p(cal, [L, namespace, ar[2]])) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init"); Cal("init", {origin:"https://cal.com"}); Cal("ui", {"styles":{"branding":{"brandColor":"#C9A96E"}},"hideEventTypeDetails":false,"layout":"month_view"});`,
          }}
        />
      </body>
    </html>
  );
}
