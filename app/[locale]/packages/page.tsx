import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, PUBLIC_FEATURES, trialPlanAligned, type PlanCode, startLabel } from "@/lib/content/plans";
import { getPlans } from "@/lib/contracts/server";
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
  const limitName = (k: string) => (pk.limits as Record<string, string>)[k] ?? k;
  const planLine = (k: string) => (pk.planLines as Record<string, string>)[k] ?? "";
  const aligned = trialPlanAligned();

  const runtime = await getPlans();
  const backendName = (code: PlanCode) => (runtime.kind === "live" ? runtime.plans.find((x) => x.code === code)?.display_name : undefined);

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
            <ol className="mt-12 grid gap-6 lg:grid-cols-3" data-plan-cards>
              {catalogPlans.map((plan, i) => {
                const essential = plan.code === "essential";
                const trialHere = aligned && essential;
                return (
                  <Reveal key={plan.code} delay={i * 70} as="li" className={cn("stage relative flex flex-col p-7", trialHere && "border-ink-950")} data-plan={plan.code} data-trial={trialHere ? "yes" : "no"}>
                    {trialHere && (
                      <p className="absolute -top-4 right-5 inline-flex -rotate-2 flex-col items-start rounded-lg bg-ink-950 px-4 py-2 text-ivory shadow-overlay" data-trial-sticker>
                        <span className="t-body-s font-semibold leading-tight">{pk.trialBadgeAligned}</span>
                        <span className="t-caption text-ink-300">{pk.noPaymentMethod}</span>
                      </p>
                    )}
                    <Heading size="l" as="h3">{backendName(plan.code) ?? plan.display_name}</Heading>
                    <p className="mt-1 t-body-s text-text-secondary">{planLine(plan.code)}</p>
                    <dl className="mt-6 divide-y divide-line-hairline border-y border-line-hairline">
                      {(["offices", "seats", "leads_month"] as const).map((k) => {
                        const v = plan.limits[k];
                        return (
                          <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                            <dt className="t-body-s text-text-secondary">{limitName(k)}</dt>
                            <dd className="t-heading-m tnum text-text-primary">{v === null ? pk.limits.unlimited : new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB", { useGrouping: "always" } as Intl.NumberFormatOptions).format(v)}</dd>
                          </div>
                        );
                      })}
                    </dl>
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
