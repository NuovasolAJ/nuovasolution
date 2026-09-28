import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { legalPage, legalSlugs, type LegalSlug } from "@/lib/content/legal";
import { LegalPageView } from "@/components/site/legal-page";
import { publicIndexingAllowed } from "@/lib/contracts/mode";

export function generateStaticParams() {
  return locales.flatMap((locale) => legalSlugs.map((slug) => ({ locale, slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale) || !legalSlugs.includes(params.slug as LegalSlug)) return {};
  const page = legalPage(params.locale, params.slug as LegalSlug);
  return {
    title: page.title,
    alternates: { canonical: `/${params.locale}/legal/${params.slug}`, languages: { en: `/en/legal/${params.slug}`, es: `/es/legal/${params.slug}` } },
    robots: publicIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default function LegalRoute({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale) || !legalSlugs.includes(params.slug as LegalSlug)) notFound();
  return <LegalPageView locale={params.locale as Locale} slug={params.slug as LegalSlug} />;
}
