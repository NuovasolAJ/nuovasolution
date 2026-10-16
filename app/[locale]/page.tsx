import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { homeV4 } from "@/lib/content/home-v4";
import { HeroV4 } from "@/components/home/hero-v4";
import { LossScene } from "@/components/home/loss-scene";
import { ClosingMoment, CompareMoment, HomeDemoLine, MorningMoment, QuestionsMoment, StartMoment, WhatMoment } from "@/components/home/moments";
import { PackageMatrix } from "@/components/home/package-matrix";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home in eight moments (CONTENT_MODEL_1016.md, DESIGN.md, owner 2026-10-16):
 *
 *   1 Hero       the pain in one sentence; the product rising out of the land (four layers, scrubbed)
 *   2 Loss       one sentence lighting up word by word; the clock of an unanswered enquiry (scrubbed)
 *   3 Compare    the same enquiry without and with Nuova
 *   4 What       answers · keeps · alerts · sums up, one excerpt each
 *   5 Morning    the team's list with reasons
 *   6 Start      three steps, the CRM sentence, the button
 *   7 Packages   three, each on the last
 *   8 Questions  three of Copy's rows, the closing sentence
 *
 * No entry animation on this page; the product story in full (six interactive scenes) is /platform; the product truth
 * is /hoy. The style foundation v3 (tokens in globals.css) applies to every document that contains [data-style="v3"].
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeV4;

  return (
    <div data-style="v3" data-home="v4" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined}>
      <HeroV4 locale={locale} />
      <LossScene locale={locale} />
      <CompareMoment locale={locale} />
      <WhatMoment locale={locale} />
      <MorningMoment locale={locale} />
      <HomeDemoLine locale={locale} />
      <StartMoment locale={locale} />

      <section id="packages" aria-labelledby="packages-h" className="moment scroll-mt-[var(--header-h)]">
        <div className="container-default">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[720px]">
              <p className="t-eyebrow text-text-accent">{l(w.packages.eyebrow)}</p>
              <h2 id="packages-h" className="mt-4 t-display-l text-text-primary">{l(w.packages.title)}</h2>
            </div>
            <Link href={localePath(locale, "/packages")} className="inline-flex items-center gap-2 t-body-m font-medium text-text-primary underline decoration-line-strong underline-offset-4">{l(w.packages.all)}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-10">
            <PackageMatrix locale={locale} />
          </div>
        </div>
      </section>

      <QuestionsMoment locale={locale} />
      <ClosingMoment locale={locale} />
    </div>
  );
}
