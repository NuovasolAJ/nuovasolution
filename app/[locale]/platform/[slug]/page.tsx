import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapabilities, publishedCapability, publicPoints } from "@/lib/content/capabilities";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StatusGlyph, LabelChip } from "@/components/ui/status";
import { ProductView } from "@/components/site/product-views";

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
      {/* PD-01 Opening: the claim, its qualifier, and the real product view */}
      <Section rhythm="opening" labelledBy="pd-h1" className="overflow-hidden">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-16 items-center">
            <Reveal className="xl:col-span-6">
              <Eyebrow className="mb-4">{d.product.eyebrowPrefix} · {c.name[locale]}</Eyebrow>
              <Display size="xl" id="pd-h1" className="max-w-[18ch]">{c.h1[locale]}</Display>
              <Lead className="mt-6">{c.lead[locale]}</Lead>
              {/* The qualifier sits with the claim it qualifies (review WR-34). */}
              <Caption className="mt-3">{d.common.qualifiers.q2}</Caption>
              <CtaRow className="mt-12">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
            <Reveal delay={120} mode="opacity" className="xl:col-span-6">
              <div className="field-sky rounded-xl p-5 md:p-8">
                <ProductView slug={c.slug} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PD-02 What it does */}
      {points.length > 0 && (
        <Section rhythm="default" hairline labelledBy="pd-what">
          <div className="container-default">
            <Reveal><SectionHead title={d.product.whatItDoes} size="heading-l" id="pd-what" /></Reveal>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {points.map((pt, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 60} as="li" className="card-quiet flex items-start gap-3 p-5">
                  <StatusGlyph glyph="check" size={16} className="mt-1 shrink-0 text-signal-positive" />
                  <p className="t-body-m text-text-primary">{pt.text[locale]}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* PD-04 In practice, illustrative and labelled */}
      <Section rhythm="feature" surface="ivory" labelledBy="pd-practice">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-5">
              <SectionHead eyebrow={d.product.inPractice} title={d.product.scenarioLabel} size="heading-l" id="pd-practice" />
              <Caption className="mt-4">{d.common.example}. {d.common.qualifiers.q2}</Caption>
            </Reveal>
            <Reveal delay={120} className="xl:col-span-7 card rounded-xl p-6 md:p-8">
              <LabelChip>{d.common.example}</LabelChip>
              <p className="mt-4 t-body-l text-text-primary">{c.scenario[locale]}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PD-05 Fits your operation: names as text, never logos */}
      <Section rhythm="default" hairline labelledBy="pd-fits">
        <div className="container-default">
          <Reveal><SectionHead title={d.product.fits} size="heading-l" id="pd-fits" /></Reveal>
          <ul className="mt-8 hairline-list border-y border-line-hairline max-w-text">
            {c.fits.map((f, i) => (
              <li key={i} className="py-4 t-body-m text-text-secondary">{f[locale]}</li>
            ))}
          </ul>
          <Caption className="mt-4">{d.common.qualifiers.q5}</Caption>
        </div>
      </Section>

      {/* PD-06 Related, published only */}
      {related.length > 0 && (
        <Section rhythm="compact" surface="raised" labelledBy="pd-related">
          <div className="container-default">
            <Heading size="s" as="h2" id="pd-related" className="t-eyebrow text-text-muted">{d.product.related}</Heading>
            <ul className="mt-4 hairline-list border-y border-line-hairline">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={p(`/platform/${r.slug}`)} className="group flex items-center justify-between gap-4 py-4">
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
        </Section>
      )}

      {/* PD-07 Closing */}
      <Section rhythm="feature" labelledBy="pd-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Reveal mode="opacity">
              <Display size="l" id="pd-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
              <CtaRow align="center" className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
