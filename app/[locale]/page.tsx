import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { qaSurface } from "@/lib/contracts/surface";
import { trialPlanAligned } from "@/lib/content/plans";
import { SectionHead, Display, Eyebrow, Lead, Heading, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroScene } from "@/components/site/hero-scene";
import { FlowStory } from "@/components/site/flow-story";
import { ReadinessView } from "@/components/site/product-views";
import { QaPanel } from "@/components/site/qa-widget";
import { StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home (owner direction 2026-09-29). One main story, told once: enquiry, meaningful answer,
 * record with a priority, a task for a person. The setup of an agency is explained separately.
 *
 * Layers per section (ground · product · foreground):
 * 1 Hero            canvas with the sand arch · the enquiry and the reply · record chip and task card laid over
 * 2 Pains           sand band (shared with 3) · three pains, each with what Nuova does about it · none
 * 3 Flow            sand band · reply, records with the record card, the task card, the real staff app clip · step chips, record overlap, poster label, step rail
 * 4 Statement       canvas · one sentence across the page · none
 * 5 Setup           stone panel · the readiness check as the onboarding renders it · none
 * 6 Essential, FAQ  canvas · the Essential trial card · the sticker
 * 7 Question box    sage panel · the assistant window · none
 * 8 Closing         sand panel · the next step · none
 * The payment sentence appears once (hero note).
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;
  const pk = d.packages;
  const aligned = trialPlanAligned();
  const startLabel = aligned ? pk.ctaTrialEssential : d.common.startFree;
  const stepAnchors = ["#step-answer", "#step-record", "#step-handover", "#step-done"];

  return (
    <>
      {/* 1 Hero */}
      <section aria-labelledby="hero-h1" className="relative overflow-hidden pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-12 xl:gap-10">
            <Reveal className="xl:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-pill border border-line-hairline bg-surface-raised px-3 py-1.5 t-caption text-text-secondary">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-champagne-400" />
                {h.hero.eyebrow}
              </p>
              <Display size="xl" id="hero-h1" className="mt-6 max-w-[14ch]">{h.hero.h1}</Display>
              <Lead className="mt-6">{h.hero.lead}</Lead>
              <Caption className="mt-3">{h.hero.qualifier}</Caption>
              <CtaRow className="mt-9">
                <ButtonLink href={p("/signup")} size="lg">{startLabel}</ButtonLink>
                <ButtonLink href="#flow-h" size="lg" variant="secondary">{h.hero.ctaSecondary}</ButtonLink>
              </CtaRow>
              <Caption className="mt-4">{h.hero.note}</Caption>
            </Reveal>
            <HeroScene locale={locale} className="xl:col-span-6" />
          </div>

          {/* The story in one line; each step jumps to its stage. */}
          <nav aria-label={h.flow.h2} className="mt-10 xl:mt-14">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
              {h.flow.steps.map((st, i) => (
                <li key={st} className="flex items-center gap-2">
                  <a href={stepAnchors[i]} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-line-hairline bg-surface-raised px-4 t-body-s text-text-primary transition-colors duration-micro hover:border-line-interactive">
                    <span className="tnum t-caption text-text-accent">0{i + 1}</span>
                    {st}
                  </a>
                  {i < h.flow.steps.length - 1 && <StatusGlyph glyph="arrow-right" size={14} className="hidden text-text-muted md:block" />}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* 2 and 3 share one ground: the pains, then what happens instead */}
      <div className="band band-sand band-shoulders">
        <section aria-labelledby="pains-h" className="pt-[var(--section-default)]">
          <div className="container-default">
            <Reveal className="xl:max-w-[60%]">
              <SectionHead title={h.problem.h2} lead={h.problem.lead} id="pains-h" />
            </Reveal>
            <ul className="mt-10 grid gap-5 lg:grid-cols-3">
              {h.problem.items.map((it, i) => (
                <Reveal key={it.label} delay={i * 70} as="li" className="flex flex-col">
                  <div className="rounded-t-xl border border-b-0 border-line-strong bg-[color:rgba(255,255,255,0.45)] p-6">
                    <p className="t-eyebrow text-signal-attention">{it.label}</p>
                    <p className="mt-3 t-heading-m text-text-primary">{it.pain}</p>
                  </div>
                  <div className="flex flex-1 items-start gap-3 rounded-b-xl border border-line-hairline bg-surface-raised p-6 shadow-card">
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-sage-100 text-sage-700"><StatusGlyph glyph="check" size={12} /></span>
                    <p className="t-body-m text-text-secondary">
                      <span className="block t-caption font-medium text-sage-700">{h.problem.benefitLabel}</span>
                      {it.benefit}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200}><p className="mt-8 t-body-l text-text-secondary measure-lead">{h.problem.close}</p></Reveal>
          </div>
        </section>

        <section aria-labelledby="flow-h" className="pb-[var(--section-feature)] pt-[var(--section-default)]">
          <div className="container-default">
            <Reveal className="xl:max-w-[60%]">
              <SectionHead eyebrow={h.flow.eyebrow} title={h.flow.h2} lead={h.flow.lead} id="flow-h" className="scroll-mt-[calc(var(--header-h)+24px)]" />
            </Reveal>
            <div className="mt-12">
              <FlowStory locale={locale} />
            </div>
          </div>
        </section>
      </div>

      {/* 4 One sentence across the page */}
      <section aria-labelledby="one-h" className="py-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="mx-auto max-w-[900px] text-center">
            <Eyebrow className="mb-4">{h.record.eyebrow}</Eyebrow>
            <h2 id="one-h" className="t-display-l text-text-primary">{h.record.h2}</h2>
            <p className="mx-auto mt-6 max-w-[56ch] t-body-l text-text-secondary">{h.record.lead}</p>
          </Reveal>
        </div>
      </section>

      {/* 5 Setup, explained on its own */}
      <section aria-labelledby="setup-h" className="pb-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-stone band-panel px-5 py-12 md:px-12 md:py-16">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 xl:grid-cols-12 xl:gap-16">
              <Reveal className="xl:col-span-6">
                <SectionHead eyebrow={h.access.eyebrow} title={h.flow.cards.setup.title} lead={h.flow.cards.setup.line} id="setup-h" />
                <ol className="mt-8 hairline-list border-y border-line-strong">
                  {h.access.steps.map((s, i) => (
                    <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-4 py-4">
                      <span className="pt-1 t-caption tnum text-text-accent">0{i + 1}</span>
                      <span>
                        <Heading size="s" className="block">{s.title}</Heading>
                        <span className="mt-1 block t-body-s text-text-secondary">{s.line}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8"><ButtonLink href={p("/trial")} variant="secondary">{h.access.link}</ButtonLink></div>
              </Reveal>
              <Reveal delay={80} className="xl:col-span-6">
                <ReadinessView locale={locale} />
                <Caption className="mt-3 text-center">{h.access.viewCaption}</Caption>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6 The Essential trial, and the questions people ask */}
      <section aria-labelledby="offer-h" className="pb-[var(--section-default)]">
        <div className="container-default">
          <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-5">
              <div className="stage relative p-7 md:p-9">
                {aligned && (
                  <span className="absolute -top-3 right-6 inline-flex -rotate-2 items-center rounded-pill bg-ink-950 px-3.5 py-1.5 t-caption font-medium text-ivory shadow-overlay">{pk.trialBadgeAligned}</span>
                )}
                <Eyebrow className="mb-3">{h.offer.eyebrow}</Eyebrow>
                <h2 id="offer-h" className="t-display-m text-text-primary">{aligned ? pk.h1 : pk.h1Neutral}</h2>
                <p className="mt-4 t-body-m text-text-secondary">{pk.baselineLine}</p>
                <CtaRow className="mt-7">
                  <ButtonLink href={p("/signup")}>{startLabel}</ButtonLink>
                  <ButtonLink href={p("/packages")} variant="secondary">{h.offer.link}</ButtonLink>
                </CtaRow>
              </div>
            </Reveal>
            <Reveal delay={80} as="dl" className="grid gap-4 md:grid-cols-2 xl:col-span-7">
              {pk.faq.map((f) => (
                <div key={f.q} className="card-quiet p-5">
                  <dt className="t-heading-s text-text-primary">{f.q}</dt>
                  <dd className="mt-2 t-body-s text-text-secondary">{f.a}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 Ask Nuova, integrated (absent when the surface is hidden) */}
      {qaSurface() !== "hidden" && (
        <section aria-labelledby="ask-h" className="pb-[var(--section-default)]">
          <div className="container-wide">
            <div className="band band-sage band-panel px-5 py-12 md:px-12 md:py-16">
              <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 xl:grid-cols-12 xl:gap-16">
                <Reveal className="xl:col-span-5">
                  <SectionHead eyebrow={h.ask.eyebrow} title={h.ask.h2} lead={h.ask.lead} id="ask-h" size="m" />
                  <ul className="mt-8 space-y-3">
                    {/* The assistant hands nothing over and takes no contact details, so only these two statements are made here. */}
                    {[h.ask.points[0], d.qa.boundaries].map((pt) => (
                      <li key={pt} className="flex items-start gap-2 t-body-s text-text-secondary"><StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />{pt}</li>
                    ))}
                  </ul>
                </Reveal>
                <div className="xl:col-span-7">
                  <QaPanel locale={locale} inline />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8 Closing */}
      <section aria-labelledby="close-h" className="pb-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-sand band-panel px-6 py-14 text-center md:px-12 md:py-20">
            <Reveal mode="opacity">
              <Display size="l" id="close-h" className="mx-auto max-w-[20ch]">{h.closing.h2}</Display>
              <p className="mx-auto mt-6 max-w-[48ch] t-body-l text-text-secondary">{h.closing.body}</p>
              <CtaRow align="center" className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{startLabel}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </section>
      <Link href={p("/platform")} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:bg-surface-raised focus:px-4 focus:py-3 t-body-s">{d.common.explorePlatform}</Link>
    </>
  );
}
