import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { qaSurface } from "@/lib/contracts/surface";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Lead, Heading, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MediaSlot } from "@/components/ui/media-slot";
import { HeroStack } from "@/components/site/hero-stack";
import { StageStack } from "@/components/site/stage-stack";
import { ReadinessView, RecordView } from "@/components/site/product-views";
import { QaPanel } from "@/components/site/qa-widget";
import { StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home: one sales path (owner criteria 2026-09-28). The pain of an agency, what Nuova does on
 * one continuous example, the visible benefit, the next step. Texts PRODUCT_TEXTS_C3_v1 §2.
 * Sections: hero with the layered enquiry → answer → record; three pains; the flow as stacked
 * product cards; the prepared media place with a real poster; the record your team sees; the
 * setup with the readiness check; the plans; questions; the question box (preview: demo);
 * closing. No status block, no internal formula (audit R27, Z06, Z16); the payment sentence
 * appears once (hero note).
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;
  const faq = d.packages.faq;

  return (
    <>
      {/* H1 */}
      <Section rhythm="opening" labelledBy="hero-h1" className="overflow-hidden">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-12 items-center">
            <Reveal className="xl:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-pill border border-line-hairline bg-surface-raised px-3 py-1.5 t-caption text-text-secondary">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-champagne-400" />
                {h.hero.eyebrow}
              </p>
              <Display size="xl" id="hero-h1" className="mt-6 max-w-[16ch]">{h.hero.h1}</Display>
              <Lead className="mt-6">{h.hero.lead}</Lead>
              <Caption className="mt-3">{h.hero.qualifier}</Caption>
              <CtaRow className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
              <Caption className="mt-4">{h.hero.note}</Caption>
            </Reveal>
            <HeroStack locale={locale} className="xl:col-span-6" />
          </div>
        </div>
      </Section>

      {/* H2 Three pains */}
      <Section rhythm="feature" hairline labelledBy="pains-h">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead title={h.pains.h2} lead={h.pains.lead} id="pains-h" /></Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {h.pains.items.map((it, i) => (
              <Reveal key={it} delay={i * 60} as="li" className="card-quiet flex items-start gap-3 p-6">
                <span aria-hidden="true" className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-apricot-100 text-signal-attention"><StatusGlyph glyph="clock" size={14} /></span>
                <p className="t-body-m text-text-primary">{it}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* H3 to H5 What Nuova does, on one example, as stacked product cards */}
      <Section rhythm="feature" surface="ivory" labelledBy="flow-h">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <SectionHead eyebrow={h.flow.eyebrow} title={h.flow.h2} lead={h.flow.lead} id="flow-h" />
            <ol className="mt-6 flex flex-wrap gap-2" aria-label={h.flow.h2}>
              {h.flow.steps.map((st, j) => (
                <li key={st} className="inline-flex items-center gap-2 rounded-pill bg-surface-raised border border-line-hairline px-3 py-1.5 t-caption text-text-primary">
                  <span className="tnum text-text-muted">{j + 1}</span>
                  {st}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-12">
            <StageStack locale={locale} />
          </div>
        </div>
      </Section>

      {/* The prepared media place: a real product frame today, the film later, no layout shift */}
      <Section rhythm="default" hairline labelledBy="media-h">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.platform.exampleEyebrow} title={d.platform.exampleH2} size="heading-l" id="media-h" /></Reveal>
        </div>
        <div className="container-wide mt-8">
          <Reveal mode="opacity"><MediaSlot id="V-01" locale={locale} caption={d.media.conversation} /></Reveal>
        </div>
      </Section>

      {/* What your team sees: one record */}
      <Section rhythm="feature" hairline labelledBy="record-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-16 items-center">
            <Reveal className="xl:col-span-6">
              <SectionHead eyebrow={h.record.eyebrow} title={h.record.h2} lead={h.record.lead} id="record-h" />
              <div className="mt-8">
                <ButtonLink href={p("/platform/crm")} variant="secondary">{d.common.explorePlatform}</ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={80} className="xl:col-span-6">
              <div className="field-sand rounded-xl p-5 md:p-8">
                <RecordView locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H8 Getting started, with the readiness check as the agency sees it */}
      <Section rhythm="feature" surface="ivory" labelledBy="access-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-6">
              <SectionHead eyebrow={h.access.eyebrow} title={h.access.h2} lead={h.access.lead} id="access-h" />
              <ol className="mt-10 hairline-list border-y border-line-hairline">
                {h.access.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-4 py-4">
                    <span className="t-caption tnum text-text-muted pt-1">0{i + 1}</span>
                    <span>
                      <Heading size="s" className="block">{s.title}</Heading>
                      <span className="block mt-1 t-body-s text-text-secondary">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <CtaRow className="mt-8">
                <ButtonLink href={p("/signup")}>{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/packages")} variant="secondary">{h.access.link}</ButtonLink>
              </CtaRow>
            </Reveal>
            <Reveal delay={80} className="xl:col-span-6">
              <div className="field-sky rounded-xl p-5 md:p-8">
                <ReadinessView locale={locale} />
              </div>
              <Caption className="mt-3">{h.access.viewCaption}</Caption>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Plans and questions */}
      <Section rhythm="feature" hairline labelledBy="offer-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-5">
              <SectionHead eyebrow={h.offer.eyebrow} title={h.offer.h2} lead={h.offer.lead} id="offer-h" />
              <div className="mt-8"><ButtonLink href={p("/packages")} variant="secondary">{h.offer.link}</ButtonLink></div>
            </Reveal>
            <Reveal delay={80} as="dl" className="xl:col-span-7 grid gap-4 md:grid-cols-2">
              {faq.map((f) => (
                <div key={f.q} className="card-quiet p-5">
                  <dt className="t-heading-s text-text-primary">{f.q}</dt>
                  <dd className="mt-2 t-body-s text-text-secondary">{f.a}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Ask Nuova, integrated (hidden entirely when the surface is hidden) */}
      {qaSurface() !== "hidden" && (
        <Section rhythm="feature" surface="ivory" labelledBy="ask-h">
          <div className="container-default">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
              <Reveal className="xl:col-span-5">
                <SectionHead eyebrow={h.ask.eyebrow} title={h.ask.h2} lead={h.ask.lead} id="ask-h" />
                <ul className="mt-8 space-y-3">
                  {h.ask.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 t-body-s text-text-secondary"><StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />{pt}</li>
                  ))}
                </ul>
              </Reveal>
              <div className="xl:col-span-7">
                <QaPanel locale={locale} inline />
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* H9 Closing, on a warm field */}
      <Section rhythm="feature" labelledBy="close-h">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Reveal mode="opacity">
              <Display size="l" id="close-h" className="mx-auto max-w-[20ch]">{h.closing.h2}</Display>
              <p className="mt-6 t-body-l text-text-secondary mx-auto max-w-[48ch]">{h.closing.body}</p>
              <CtaRow align="center" className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </Section>
      <Link href={p("/platform")} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:bg-surface-raised focus:px-4 focus:py-3 t-body-s">{d.common.explorePlatform}</Link>
    </>
  );
}
