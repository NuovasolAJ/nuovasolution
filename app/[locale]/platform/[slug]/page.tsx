import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilities, capability } from "@/lib/content/capabilities";
import { statusPresentation } from "@/lib/content/statuses";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { VideoSlot } from "@/components/ui/video-slot";
import { videoSlot } from "@/lib/media-manifest";
import { Reveal } from "@/components/ui/reveal";
import { StatusChip, StatusGlyph, StatusNote, LabelChip } from "@/components/ui/status";
import { ProductView } from "@/components/site/product-views";

export function generateStaticParams() {
  return locales.flatMap((locale) => capabilities.map((c) => ({ locale, slug: c.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const c = capability(params.slug);
  if (!c) return {};
  return {
    title: c.name[params.locale],
    description: c.lead[params.locale],
    alternates: { canonical: `/${params.locale}/platform/${c.slug}`, languages: { en: `/en/platform/${c.slug}`, es: `/es/platform/${c.slug}` } },
  };
}

export default function ProductPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const c = capability(params.slug);
  if (!c) notFound();
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const pres = statusPresentation(c.status, locale);
  const publicly = pres.publiclyAvailable;

  return (
    <>
      {/* PD-01 Opening */}
      <Section rhythm="opening" labelledBy="pd-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-default relative">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-16 items-center">
            <Reveal className="xl:col-span-6">
              <Eyebrow className="mb-4">{d.product.eyebrowPrefix} · {c.name[locale]}</Eyebrow>
              <Display size="xl" id="pd-h1" className="max-w-[18ch]">{c.h1[locale]}</Display>
              <Lead className="mt-6">{c.lead[locale]}</Lead>
              <div className="mt-8"><StatusNote status={c.status} locale={locale} /></div>
              <CtaRow className="mt-12">
                {publicly ? (
                  <>
                    <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                    <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
                  </>
                ) : (
                  <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.talkToUs}</ButtonLink>
                )}
              </CtaRow>
            </Reveal>
            <Reveal delay={120} mode="opacity" className="xl:col-span-6">
              <div className="field-sky rounded-xl p-5 md:p-8">
                <ProductView slug={c.slug} locale={locale} name={c.name[locale]} lead={c.lead[locale]} status={c.status} bothHalves={c.bothHalves ? { certified: c.bothHalves.certified[locale], pending: c.bothHalves.pending[locale] } : undefined} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PD-02 What it does, each line with its own status */}
      <Section rhythm="default" hairline labelledBy="pd-what">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.product.whatItDoes} title={d.product.statusHeading} id="pd-what" /></Reveal>
          <ul className="mt-12 hairline-list border-y border-line-hairline">
            {c.points.map((pt, i) => {
              const sp = statusPresentation(pt.status, locale);
              return (
                <Reveal key={i} delay={Math.min(i, 4) * 60} as="li" className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 py-5 items-start">
                  <p className={sp.publiclyAvailable ? "t-heading-m text-text-primary" : "t-heading-m text-text-secondary"}>{pt.text[locale]}</p>
                  <StatusChip status={pt.status} locale={locale} className="md:mt-1" />
                </Reveal>
              );
            })}
          </ul>
          {c.bothHalves && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line-hairline pt-8">
              <div>
                <p className="t-eyebrow text-signal-positive flex items-center gap-2"><StatusGlyph glyph="check" size={12} />{d.product.certified}</p>
                <p className="mt-3 t-body-m text-text-secondary">{c.bothHalves.certified[locale]}</p>
              </div>
              <div>
                <p className="t-eyebrow text-signal-attention flex items-center gap-2"><StatusGlyph glyph="triangle" size={12} />{d.product.pending}</p>
                <p className="mt-3 t-body-m text-text-secondary">{c.bothHalves.pending[locale]}</p>
              </div>
            </div>
          )}
          {c.honesty && <p className="mt-10 t-body-m text-text-secondary measure-body">{c.honesty[locale]}</p>}
          {c.notAvailable && c.notAvailable.length > 0 && (
            <div className="mt-10">
              <p className="t-eyebrow text-text-muted">{d.product.notAvailableHeading}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.notAvailable.map((n, i) => (
                  <li key={i}><LabelChip><StatusGlyph glyph="lock" size={12} className="mr-1.5" />{n[locale]}</LabelChip></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* PD-03 The film, only once a real film exists (no empty frame) */}
      {c.video && videoSlot(c.video)?.status !== "pending" && (
        <Section rhythm="default" surface="raised" labelledBy="pd-film">
          <div className="container-default">
            <Reveal><SectionHead eyebrow={d.product.film} title={c.name[locale]} size="heading-l" id="pd-film" /></Reveal>
          </div>
          <div className="container-wide mt-10">
            <Reveal mode="opacity">
              <VideoSlot id={c.video} locale={locale} fallbackHref={p("/contact")} fallbackText={d.common.pending.moduleFilmFallback} fallbackLabel={d.common.bookDemo} />
            </Reveal>
          </div>
        </Section>
      )}

      {/* PD-04 In practice, illustrative and labelled */}
      <Section rhythm="feature" hairline labelledBy="pd-practice">
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
          <Reveal><SectionHead eyebrow={d.product.fits} title={d.product.fits} size="heading-l" id="pd-fits" /></Reveal>
          <ul className="mt-8 hairline-list border-y border-line-hairline max-w-text">
            {c.fits.map((f, i) => (
              <li key={i} className="py-4 t-body-m text-text-secondary">{f[locale]}</li>
            ))}
          </ul>
          <Caption className="mt-4">{d.common.qualifiers.q5}</Caption>
        </div>
      </Section>

      {/* PD-06 Related */}
      <Section rhythm="compact" surface="raised" labelledBy="pd-related">
        <div className="container-default">
          <Heading size="s" as="h2" id="pd-related" className="t-eyebrow text-text-muted">{d.product.related}</Heading>
          <ul className="mt-4 hairline-list border-y border-line-hairline">
            {c.related.map((slug) => {
              const r = capability(slug);
              if (!r) return null;
              return (
                <li key={slug}>
                  <Link href={p(`/platform/${slug}`)} className="group flex items-center justify-between gap-4 py-4">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="t-heading-m text-text-primary">{r.name[locale]}</span>
                      <StatusChip status={r.status} locale={locale} />
                    </span>
                    <span className="text-text-muted transition-transform duration-micro group-hover:translate-x-1"><StatusGlyph glyph="arrow-right" /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

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
              {d.home.closing.caption && <Caption className="mt-4">{d.home.closing.caption}</Caption>}
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
