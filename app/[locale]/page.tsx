import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { homeWords } from "@/lib/content/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroWorld } from "@/components/home/hero-world";
import { Story } from "@/components/home/story";
import { Model3dSection } from "@/components/home/model-3d";
import { TrustSection } from "@/components/home/trust";
import { PackageMatrix } from "@/components/home/package-matrix";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home (master order 2026-10-10):
 *
 *   1 Hero      dark anthracite · the dusk, the ridges, the product panel, the situation in two cards
 *   2 Story     warm ivory · six chapters A to F, the same enquiry through the whole product, in the scroll
 *   3 3D        the living room of the 3D lane: plan → furnishing → render → the rotatable view
 *   4 Trust     the real setup path, with or without an external CRM, cost, effort, data, the trial
 *   5 Packages  three packages, each on top of the last; 3D on its own
 *
 * The style foundation v3 (tokens in globals.css) applies to every document that contains [data-style="v3"].
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const v3 = d.home.v3;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeWords;

  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined}>
      <HeroWorld locale={locale} />

      {/* 2 The story. The ivory ground rises over the hero's foot with rounded shoulders. */}
      <section id="story" aria-labelledby="story-h" className="relative z-[5] -mt-7 scroll-mt-[var(--header-h)] rounded-t-[28px] bg-[color:var(--surface-canvas)] pb-[var(--section-compact)] pt-[var(--section-default)] md:rounded-t-[40px]">
        <div className="container-default">
          <Reveal className="max-w-[760px]">
            <p className="t-eyebrow text-text-accent">{l(w.story.eyebrow)}</p>
            <h2 id="story-h" className="mt-4 t-display-l text-text-primary">{l(w.story.h2)}</h2>
            <p className="mt-5 t-body-l text-text-secondary">{l(w.story.lead)}</p>
          </Reveal>
          <div className="mt-6 xl:mt-8">
            <Story locale={locale} />
          </div>
        </div>
      </section>

      {/* 3 3D: the living room, from the plan to the rotatable view. */}
      <Model3dSection locale={locale} />

      {/* 4 Trust and conversion: the real way in. */}
      <TrustSection locale={locale} />

      {/* 5 The packages */}
      <section id="packages" aria-labelledby="packages-h" className="scroll-mt-[var(--header-h)] pb-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="max-w-[720px]">
            <p className="t-eyebrow text-text-accent">{v3.packages.eyebrow}</p>
            <h2 id="packages-h" className="mt-4 t-display-l text-text-primary">{v3.packages.h2}</h2>
            <p className="mt-5 t-body-l text-text-secondary">{v3.packages.lead}</p>
          </Reveal>
          <div className="mt-10">
            <PackageMatrix locale={locale} />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
            <p className="t-body-s font-medium text-text-secondary">{v3.offer.line}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
