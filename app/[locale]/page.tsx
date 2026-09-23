import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Lead, Heading, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroStack } from "@/components/site/hero-stack";
import { StageStack } from "@/components/site/stage-stack";
import { QaPanel } from "@/components/site/qa-widget";
import { StatusGlyph, StatusChip } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home, light system (design probe 2026-09-23), texts PRODUCT_TEXTS_C3_v1 §2.
 * H1 hero with the layered enquiry → answer → record statement (qualifier under the lead, WR-33),
 * H2 the problem (detail on demand), H3 to H5 and H7 as stacked stage cards with real product
 * views, H6 your brand, H7 what is not ready, H8 getting started, the Q&A window, H9 closing.
 * The payment sentence appears once (hero note). No empty "capture pending" frame anywhere.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;

  return (
    <>
      {/* H1 */}
      <Section rhythm="opening" labelledBy="hero-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-default relative">
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

      {/* H2 The problem */}
      <Section rhythm="feature" hairline labelledBy="problem-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-7">
              <SectionHead title={h.problem.h2} lead={h.problem.lead} id="problem-h" />
            </Reveal>
            <Reveal delay={80} className="xl:col-span-5">
              <details className="group card-quiet">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 t-body-s font-medium text-text-primary">
                  {h.problem.more}
                  <span aria-hidden="true" className="text-text-muted transition-transform duration-control group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-line-hairline px-5 py-4 t-body-m text-text-secondary">{h.problem.detail}</p>
              </details>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H3, H4, H5, H7 as stacked cards */}
      <Section rhythm="feature" surface="ivory" labelledBy="stack-h">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead eyebrow={h.stack.eyebrow} title={h.stack.h2} lead={h.stack.lead} id="stack-h" /></Reveal>
          <div className="mt-12">
            <StageStack locale={locale} />
          </div>
        </div>
      </Section>

      {/* H6 Your brand */}
      <Section rhythm="feature" hairline labelledBy="brand-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-7">
              <SectionHead title={h.brand.h2} lead={h.brand.lead} id="brand-h" />
              <p className="mt-4 inline-flex items-center gap-2 t-body-s text-text-secondary">
                <StatusChip status="in_implementation" locale={locale} />
                {h.brand.note}
              </p>
            </Reveal>
            <Reveal delay={80} className="xl:col-span-5">
              <div className="field-sand rounded-xl p-6">
                <div className="card p-5">
                  <p className="t-caption text-text-muted">{h.views.conversation.agency}</p>
                  <p className="mt-2 t-body-s text-text-primary">{h.views.conversation.turns[1].text}</p>
                  <p className="mt-3 border-t border-line-hairline pt-3 t-caption text-text-muted">{h.stack.stepsDetail}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H7 What is not ready yet */}
      <Section rhythm="feature" surface="ivory" labelledBy="notready-h">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-6">
              <SectionHead title={h.notReady.h2} lead={h.notReady.lead} id="notready-h" />
            </Reveal>
            <Reveal delay={80} as="ul" className="xl:col-span-6 card-quiet divide-y divide-line-hairline">
              {h.notReady.items.map((it) => (
                <li key={it} className="flex items-center gap-3 px-5 py-3 t-body-m text-text-primary">
                  <StatusGlyph glyph="clock" size={14} className="shrink-0 text-signal-attention" />
                  {it}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H8 Getting started */}
      <Section rhythm="feature" hairline labelledBy="access-h">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead eyebrow={h.access.eyebrow} title={h.access.h2} lead={h.access.lead} id="access-h" /></Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {h.access.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} as="li" className="card p-6">
                <p className="t-caption tnum text-text-muted">0{i + 1}</p>
                <Heading size="m" className="mt-3">{s.title}</Heading>
                <p className="mt-2 t-body-s text-text-secondary">{s.line}</p>
              </Reveal>
            ))}
          </ol>
          <CtaRow className="mt-10">
            <ButtonLink href={p("/signup")}>{d.common.startFree}</ButtonLink>
            <ButtonLink href={p("/packages")} variant="secondary">{h.access.link}</ButtonLink>
          </CtaRow>
        </div>
      </Section>

      {/* Ask Nuova, integrated */}
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
