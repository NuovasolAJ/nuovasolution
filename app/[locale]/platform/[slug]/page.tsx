import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { publishedCapabilities, publishedCapability, publicPoints } from "@/lib/content/capabilities";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StatusGlyph, LabelChip } from "@/components/ui/status";
import { ProductView } from "@/components/site/product-views";
import { ProductClip } from "@/components/ui/product-clip";
import { DAILY_MEDIA_REFERENCE } from "@/components/site/product-views";
import { REFERENCE } from "@/lib/content/home-story";
import { ClosingBand } from "@/components/site/closing-band";

/** Only published capabilities have a page (audit R27). A hidden or unknown slug answers 404, never a home fallback (Z01). */
export function generateStaticParams() {
  return locales.flatMap((locale) => publishedCapabilities().map((c) => ({ locale, slug: c.slug })));
}
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = publishedCapability(params.slug);
  if (!c) return {};
  return {
    title: c.name[params.locale],
    description: c.lead[params.locale],
    alternates: { canonical: `/${params.locale}/platform/${c.slug}`, languages: { en: `/en/platform/${c.slug}`, es: `/es/platform/${c.slug}` } },
  };
}

/**
 * One product page in the accepted direction (owner 2026-09-30). Layer 1: the canvas, then one sand
 * ground for what it does and how it looks in practice. Layer 2: the real surface on a white stage,
 * and the points and the example as white stages. Layer 3: the synthetic-data label and the step
 * marks inside the surfaces. The qualifier stays with the claim it qualifies (review WR-34).
 */
export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const c = publishedCapability(params.slug);
  if (!c) notFound();
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const points = publicPoints(c);
  const related = c.related.map(publishedCapability).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      {/* Opening: the claim, its qualifier, and the real product view */}
      <section aria-labelledby="pd-h1" className="overflow-hidden pb-[var(--section-default)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-6">
              <Eyebrow className="mb-4">{d.product.eyebrowPrefix} · {c.name[locale]}</Eyebrow>
              <Display size="xl" id="pd-h1" className="max-w-[18ch]">{c.h1[locale]}</Display>
              <Lead className="mt-6">{c.lead[locale]}</Lead>
              {c.note && <p className="mt-4 border-l-2 border-line-strong pl-4 t-body-m text-text-secondary measure-lead">{c.note[locale]}</p>}
              <Caption className="mt-3">{d.common.qualifiers.q2}</Caption>
              <CtaRow className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
            <Reveal delay={120} mode="opacity" className="xl:col-span-6">
              {c.slug === "daily-assistant" && DAILY_MEDIA_REFERENCE === REFERENCE ? (
                /* The product video at the function it shows (owner order 2026-10-01 §5), only while its reference matches the site's. */
                <div className="stage overflow-hidden p-5 md:p-7" data-product-media="clip">
                  <h2 className="t-heading-s text-text-primary">{d.home.views.daily.clipHeading}</h2>
                  <p className="mt-1 t-body-s text-text-muted">{d.home.views.daily.clipLead}</p>
                  <div className="mt-5">
                    <ProductClip base="/media/daily/daily-laura" locale={locale} playLabel={d.home.views.daily.playLabel} meta={d.home.views.daily.clipMeta} alt={d.home.views.daily.clipAlt} posterLabel={d.home.views.daily.posterLabel} cues={d.home.views.daily.cues} errorLabel={d.home.views.daily.clipError} />
                  </div>
                  <p className="mt-3 t-caption text-text-muted">{d.home.views.daily.note}</p>
                </div>
              ) : (
                <div className="stage overflow-hidden p-2 md:p-3">
                  <div className="field-sand rounded-[20px] p-4 md:p-8">
                    <ProductView slug={c.slug} locale={locale} />
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <div className="band band-sand band-shoulders">
        {/* What it does */}
        {points.length > 0 && (
          <section aria-labelledby="pd-what" className="pt-[var(--section-default)]">
            <div className="container-default">
              <Reveal><SectionHead title={d.product.whatItDoes} size="heading-l" id="pd-what" /></Reveal>
              {/* One stage, the points separated by hairlines (the 1 px gaps show the line colour). */}
              <ul className="stage mt-8 grid gap-px overflow-hidden bg-[color:var(--border-hairline)] md:grid-cols-2">
                {points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 bg-surface-raised p-6 md:[&:last-child:nth-child(odd)]:col-span-2">
                    <StatusGlyph glyph="check" size={16} className="mt-1 shrink-0 text-signal-positive" />
                    <p className="t-body-m text-text-primary">{pt.text[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* In practice, illustrative and labelled */}
        <section aria-labelledby="pd-practice" className="pb-[var(--section-default)] pt-[var(--section-default)]">
          <div className="container-default">
            <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12 xl:gap-16">
              <Reveal className="xl:col-span-5">
                <SectionHead eyebrow={d.product.inPractice} title={d.product.scenarioLabel} size="heading-l" id="pd-practice" />
                <Caption className="mt-4">{d.common.example}. {d.common.qualifiers.q2}</Caption>
              </Reveal>
              <Reveal delay={120} className="stage p-6 md:p-8 xl:col-span-7">
                <LabelChip>{d.common.example}</LabelChip>
                <p className="mt-4 t-body-l text-text-primary">{c.scenario[locale]}</p>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Fits your operation: names as text, never logos */}
      <section aria-labelledby="pd-fits" className="pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal><SectionHead title={d.product.fits} size="heading-l" id="pd-fits" /></Reveal>
          <ul className="mt-8 max-w-text hairline-list border-y border-line-hairline">
            {c.fits.map((f, i) => (
              <li key={i} className="py-4 t-body-m text-text-secondary">{f[locale]}</li>
            ))}
          </ul>
          <Caption className="mt-4">{d.common.qualifiers.q5}</Caption>
        </div>
      </section>

      {/* Related, published only */}
      {related.length > 0 && (
        <section aria-labelledby="pd-related" className="pt-[var(--section-default)]">
          <div className="container-default">
            <Heading size="s" as="h2" id="pd-related" className="t-eyebrow text-text-muted">{d.product.related}</Heading>
            <ul className="mt-4 hairline-list border-y border-line-hairline">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={p(`/platform/${r.slug}`)} className="group flex min-h-[44px] items-center justify-between gap-4 py-4">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="t-heading-m text-text-primary">{r.name[locale]}</span>
                      <span className="t-body-s text-text-secondary">{r.navLine[locale]}</span>
                    </span>
                    <span className="text-text-muted transition-transform duration-micro group-hover:translate-x-1"><StatusGlyph glyph="arrow-right" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingBand locale={locale} id="pd-close" />
    </>
  );
}
