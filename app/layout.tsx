import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider }   from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  title: "NuovaSolution — Never Miss a Lead Again",
  description:
    "Instant replies. Qualified clients. Real opportunities. AI lead capture and qualification for real estate agencies in Spain.",
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
      </body>
    </html>
  );
}
