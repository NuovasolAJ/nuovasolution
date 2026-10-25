import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, PUBLIC_FEATURES, trialPlanAligned, type PlanCode, startLabel } from "@/lib/content/plans";
import { matrix } from "@/lib/content/package-matrix";
import { getPlans } from "@/lib/contracts/server";
import { Check } from "lucide-react";
import { Display, Eyebrow, Lead, Caption, Heading, SectionHead } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StatusGlyph } from "@/components/ui/status";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.packages, description: d.packages.lead, alternates: { canonical: `/${params.locale}/packages`, languages: { en: "/en/packages", es: "/es/packages" } } };
}

/**
 * Packages (owner direction 2026-09-29). Layers: canvas opening · sand band with the three
 * plans as white stages, the Essential sticker laid over its card · the payment path on canvas.
 *
 * - The free trial belongs to Essential (API TRIAL_PLAN_ALIGNED, staging catalog read
 *   2026-09-29: the trial plan carries Essential's scope and limits for 14 days). Growth and
 *   Scale carry no trial sticker and no trial CTA; they are an offer, and the plan interest
 *   travels to the contact page. A URL parameter grants nothing.
 * - What differs between the plans is shown on the cards (offices, seats, enquiries a month);
 *   what every plan does is said once, below them. CRM connections and voice minutes are not
 *   shown: no external CRM flow and no production number exist (PRODUCT_TRUTH_TABLE_v1 A, D).
 * - No amount and no period is printed before PRICING_AUTHORITY; the page says where both are stated.
 * - An invoice is not a payment. There is no card payment and no checkout on this site.
 * Plan names come from the backend plan catalog when the BFF path returns them; until API
 * publishes PLANS_ENDPOINT the contents are the transcribed staging catalog (lib/content/plans.ts).
 */
export default async function PackagesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const pk = d.packages;
  const p = (path: string) => localePath(locale, path);
  const featureName = (k: string) => (pk.featureNames as Record<string, string>)[k] ?? k;
  const planLine = (k: string) => (pk.planLines as Record<string, string>)[k] ?? "";
  const aligned = trialPlanAligned();

  const runtime = await getPlans();
  // One package definition for every page (final order 2026-10-12 §9): the display names and the staged lines of the
  // home ladder (lib/content/package-matrix.ts) also here; the plan ids stay the catalogue's.
  const ladder = (code: PlanCode) => matrix.find((m) => m.code === code);
  const backendName = (code: PlanCode) => (runtime.kind === "live" ? runtime.plans.find((x) => x.code === code)?.display_name : undefined) ?? ladder(code)?.name;

  return (
    <>
      <section aria-labelledby="pk-h1" className="pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{pk.eyebrow}</Eyebrow>
            <Display size="xl" id="pk-h1">{aligned ? pk.h1 : pk.h1Neutral}</Display>
            <Lead className="mt-6">{aligned ? pk.lead : pk.leadNeutral}</Lead>
          </Reveal>
        </div>
      </section>

      <div className="band band-sand band-shoulders">
        <section aria-labelledby="pk-plans" className="pb-[var(--section-default)] pt-[var(--section-default)]">
          <div className="container-default">
            <Reveal className="xl:max-w-[62%]">
              <SectionHead title={pk.compareHeading} lead={pk.compareLead} size="m" id="pk-plans" />
            </Reveal>
            {/* R24 picture 10: each card as tall as its content (no empty Enterprise card), the trial mark inside the card instead of a
                sticker over its edge, in the home ladder's words (14 días gratis · Sin tarjeta) */}
            <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start" data-plan-cards>
              {catalogPlans.map((plan, i) => {
                const essential = plan.code === "essential";
                const trialHere = aligned && essential;
                return (
                  <Reveal key={plan.code} delay={i * 70} as="li" className={cn("stage relative flex flex-col p-7", trialHere && "border-ink-950")} data-plan={plan.code} data-trial={trialHere ? "yes" : "no"}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <Heading size="l" as="h3">{backendName(plan.code) ?? plan.display_name}</Heading>
                      {trialHere && (
                        <p className="inline-flex shrink-0 items-center rounded-pill bg-ink-950 px-3 py-1 t-caption font-medium text-ivory" data-trial-sticker>
                          {pk.trialBadgeAligned} · {pk.noPaymentMethod}
                        </p>
                      )}
                    </div>
                    <p className="mt-1 t-caption font-medium text-text-muted">{ladder(plan.code)?.who[locale]}</p>
                    <p className="mt-3 t-body-m text-text-primary">{ladder(plan.code)?.change[locale] ?? planLine(plan.code)}</p>
                    {ladder(plan.code) && <p className="mt-2 t-caption text-text-secondary" data-package-limits>{ladder(plan.code)!.limits[locale]}</p>}
                    {ladder(plan.code) && (
                      <>
                        <p className="mt-5 t-caption font-medium text-text-muted">{ladder(plan.code)!.plus ? ladder(plan.code)!.plus![locale] : pk.included}</p>
                        <ul className="mt-2 space-y-1.5" data-plan-lines>
                          {ladder(plan.code)!.lines.map((ln) => (
                            <li key={ln.key} className={cn("flex items-start gap-2 t-body-s", ln.state === "available" || ln.state === "partial" ? "text-text-primary" : "text-text-secondary")} data-state={ln.state}>
                              {/* R23 (owner, picture 07): a filled check only for what is available; a hollow ring for what is planned or to order */}
                              {ln.state === "available" || ln.state === "partial" ? <Check size={14} strokeWidth={2.5} className="mt-1 shrink-0 text-signal-positive" aria-hidden="true" /> : <span aria-hidden="true" className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-pill border-[1.5px] border-ink-350" />}
                              <span className="min-w-0">{ln.name[locale]}{ln.note && <span className="text-text-muted"> · {ln.note[locale]}</span>}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {/* HANDOVER_1021 C-6 (owner 20.10.): no field of the catalogue's limits renders on a public page until the owner sets them
                        (OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1). The amount block below says where the price is stated. */}
                    <div className="mt-6 rounded-lg bg-surface-sunken px-4 py-3">
                      <p className="t-body-s font-medium text-text-primary">{pk.amount}</p>
                      <p className="mt-0.5 t-caption text-text-muted">{pk.amountLine}</p>
                    </div>
                    <div className="mt-auto flex flex-col gap-3 pt-7">
                      {trialHere ? (
                        <>
                          <ButtonLink href={p("/signup")} full>{pk.ctaTrialEssential}</ButtonLink>
                          <ButtonLink href={p(`/contact?plan=${plan.code}`)} full variant="tertiary" className="justify-center">{pk.ctaProposal}</ButtonLink>
                        </>
                      ) : (
                        <>
                          <ButtonLink href={p(`/contact?plan=${plan.code}`)} full variant="secondary">{pk.ctaProposal}</ButtonLink>
                          <p className="t-caption text-text-muted">{pk.proposalLine}</p>
                        </>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <Reveal className="rounded-xl border border-line-strong bg-[color:rgba(255,255,255,0.5)] p-7">
                <Heading size="m" as="h3">{pk.baselineHeading}</Heading>
                <p className="mt-2 t-body-s text-text-secondary">{pk.baselineLine}</p>
                {/* One column while this block shares the row at 768 px, so a long Spanish name keeps its width. */}
                <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {PUBLIC_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 t-body-s text-text-primary">
                      <StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />
                      <span className="min-w-0 break-words">{featureName(f)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80} className="rounded-xl border border-line-strong bg-[color:rgba(255,255,255,0.5)] p-7">
                <Heading size="m" as="h3">{pk.periodHeading}</Heading>
                <p className="mt-2 t-body-m text-text-secondary">{pk.periodLine}</p>
                <ul className="mt-5 space-y-3">
                  {pk.trialLines.map((l) => (
                    <li key={l} className="border-l border-line-strong pl-4 t-body-s text-text-secondary">{l}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="pk-pay" className="py-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead eyebrow={pk.payEyebrow} title={pk.payH2} id="pk-pay" size="m" /></Reveal>
          <ol className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pk.paySteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} as="li" className="card-quiet relative p-6">
                <p className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 t-caption tnum text-ivory">{i + 1}</p>
                <p className="mt-4 t-heading-s text-text-primary">{s.title}</p>
                <p className="mt-1 t-body-s text-text-secondary">{s.line}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 flex items-start gap-3 rounded-lg bg-surface-sunken p-5 t-body-m text-text-primary measure-text">
            <StatusGlyph glyph="lock" size={16} className="mt-1 shrink-0 text-text-muted" />
            {pk.checkoutNote}
          </p>
        </div>
      </section>

      <section aria-labelledby="pk-faq" className="pb-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-stone band-panel px-5 py-12 md:px-12 md:py-16">
            <div className="mx-auto max-w-[1200px]">
              <Eyebrow as="h2" id="pk-faq">{pk.faqEyebrow}</Eyebrow>
              <dl className="mt-6 grid gap-4 md:grid-cols-2">
                {pk.faq.map((f) => (
                  <div key={f.q} className="stage p-6">
                    <dt className="t-heading-s text-text-primary">{f.q}</dt>
                    <dd className="mt-2 t-body-s text-text-secondary">{f.a}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8"><ButtonLink href={p("/faq")} variant="secondary">{d.home.faqTeaser.link}</ButtonLink></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pk-close" className="pb-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-sand band-panel px-6 py-14 text-center md:px-12 md:py-20">
            <Display size="l" id="pk-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{pk.ctaSecondary}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{d.common.noSalesCall}</Caption>
          </div>
        </div>
      </section>
    </>
  );
}
