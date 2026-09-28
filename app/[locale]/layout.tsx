import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { inter } from "@/lib/fonts";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { QaWidget } from "@/components/site/qa-widget";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";
import { AuthFragment } from "@/components/site/auth-fragment";
import { publicIndexingAllowed } from "@/lib/contracts/mode";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: d.meta.title, template: `%s · ${d.meta.siteName}` },
    description: d.meta.description,
    icons: {
      icon: [
        { url: "/favicon-v2.svg", type: "image/svg+xml" },
        { url: "/favicon-v2.png", type: "image/png" },
      ],
      apple: "/favicon-v2.png",
    },
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: d.meta.siteName,
      title: d.meta.title,
      description: d.meta.description,
      locale: params.locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: params.locale === "es" ? "en_GB" : "es_ES",
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description },
    // Indexing is an owner release (audit Z21); every preview is noindex here, in the header and in robots.txt.
    robots: publicIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDictionary(locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS availability so scroll reveals only ever hide content when they can reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link t-body-s">
          {d.common.skip}
        </a>
        <Header locale={locale} />
        {/* main starts below the fixed header (globals.css); the test band sits in the flow under it. */}
        <main id="main">
          <EnvironmentRibbon locale={locale} scope="site" />
          {children}
        </main>
        <Footer locale={locale} />
        <QaWidget locale={locale} />
        <AuthFragment locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
