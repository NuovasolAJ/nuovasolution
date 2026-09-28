import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, PUBLIC_FEATURES, trialPlanAligned, type PlanCode } from "@/lib/content/plans";
import { getPlans } from "@/lib/contracts/server";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
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
 * Packages, comparable side by side. Plan names come from the backend plan catalog when the
 * BFF path returns them; contents and limits from the transcribed staging catalog until API
 * publishes a runtime catalog contract (audit Z11). No amount is shown: there is no price
 * authority. Only features whose capability is published appear (R27). The trial badge and
 * the "Try Essential free" CTA move onto Essential only after API's TRIAL_PLAN_ALIGNED (R26);
 * until then the trial is stated neutrally above the cards. Growth and Scale are an offer:
 * the plan interest travels to the contact page. The payment path is described as it is.
 */
export default async function PackagesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const pk = d.packages;
  const p = (path: string) => localePath(locale, path);
  const featureName = (k: string) => (pk.featureNames as Record<string, string>)[k] ?? k;
  const limitName = (k: string) => (pk.limits as Record<string, string>)[k] ?? k;
  const aligned = trialPlanAligned();

  const runtime = await getPlans();
  const backendName = (code: PlanCode) => (runtime.kind === "live" ? runtime.plans.find((x) => x.code === code)?.display_name : undefined);

  return (
    <>
      <Section rhythm="flush" className="overflow-hidden pt-[var(--section-default)] pb-[var(--section-compact)]" labelledBy="pk-h1">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{pk.eyebrow}</Eyebrow>
            <Display size="xl" id="pk-h1">{aligned ? pk.h1Aligned : pk.h1}</Display>
            <Lead className="mt-6">{pk.lead}</Lead>
            <CtaRow className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{aligned ? pk.ctaTrialEssential : pk.ctaTrial}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{pk.ctaSecondary}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{aligned ? pk.trialBadgeAligned : pk.trialBadge}. {pk.baselineLine}</Caption>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="flush" className="pb-[var(--section-default)]" labelledBy="pk-plans">
        <div className="container-default">
          <Reveal>
            <Eyebrow as="h2" id="pk-plans">{pk.tiersEyebrow}</Eyebrow>
            <p className="mt-3 t-body-m text-text-secondary measure-body">{pk.tiersLead}</p>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3" data-plan-cards>
            {catalogPlans.map((plan, i) => {
              const essential = plan.code === "essential";
              const trialHere = aligned && essential;
              const features = plan.features.filter((f) => PUBLIC_FEATURES.includes(f));
              return (
                <Reveal key={plan.code} delay={i * 60} as="li" className={cn("card flex flex-col rounded-xl p-6", trialHere && "border-ink-950 shadow-lift")} data-plan={plan.code}>
                  <div className="flex items-start justify-between gap-3">
                    <Heading size="l" as="h3">{backendName(plan.code) ?? plan.display_name}</Heading>
                    {trialHere && <span className="rounded-pill bg-ink-950 px-2.5 py-1 t-caption text-ivory">{pk.trialBadgeAligned}</span>}
                  </div>
                  <div className="mt-5 rounded-lg bg-surface-sunken px-4 py-3">
                    <p className="t-heading-s text-text-primary">{pk.amount}</p>
                    <p className="mt-1 t-caption text-text-muted">{pk.amountLine}</p>
                  </div>
                  <p className="mt-6 t-eyebrow text-text-muted">{pk.limitsHeading}</p>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {(["offices", "seats", "leads_month", "crm_connections"] as const).map((k) => {
                      const v = plan.limits[k];
                      return (
                        <div key={k} className="border-t border-line-hairline pt-2">
                          <dt className="t-caption text-text-muted">{limitName(k)}</dt>
                          <dd className="t-body-s tnum text-text-primary">{v === null ? pk.limits.unlimited : v === 0 ? pk.limits.none : String(v)}</dd>
                        </div>
                      );
                    })}
                  </dl>
                  <p className="mt-6 t-eyebrow text-text-muted">{pk.featuresHeading}</p>
                  <ul className="mt-2 space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 t-body-s text-text-primary">
                        <StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />
                        {featureName(f)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-2 pt-2 mt-auto">
                    {trialHere ? (
                      <ButtonLink href={p("/signup")} full>{pk.ctaTrialEssential}</ButtonLink>
                    ) : (
                      <>
                        <ButtonLink href={p(`/contact?plan=${plan.code}`)} full variant={essential ? "secondary" : "primary"}>{pk.ctaProposal}</ButtonLink>
                        {!essential && <p className="t-caption text-text-muted">{pk.proposalLine}</p>}
                      </>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section rhythm="feature" surface="ivory" labelledBy="pk-pay">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead eyebrow={pk.payEyebrow} title={pk.payH2} id="pk-pay" /></Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {pk.paySteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} as="li" className="card-quiet p-5">
                <p className="t-caption tnum text-text-muted">0{i + 1}</p>
                <p className="mt-2 t-heading-s text-text-primary">{s.title}</p>
                <p className="mt-1 t-body-s text-text-secondary">{s.line}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2 t-body-s text-text-secondary measure-body"><StatusGlyph glyph="lock" size={14} className="mt-1 shrink-0 text-text-muted" />{pk.checkoutNote}</p>
        </div>
      </Section>

      <Section rhythm="default" hairline labelledBy="pk-trial">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-5">
              <SectionHead eyebrow={pk.trialEyebrow} title={pk.trialLines[0]} size="heading-l" id="pk-trial" />
              <ul className="mt-6 space-y-3">
                {pk.trialLines.slice(1).map((l) => (
                  <li key={l} className="t-body-m text-text-secondary border-l border-line-strong pl-4">{l}</li>
                ))}
              </ul>
            </Reveal>
            <dl className="xl:col-span-7 grid gap-4 md:grid-cols-2">
              {pk.faq.map((f) => (
                <div key={f.q} className="card-quiet p-5">
                  <dt className="t-heading-s text-text-primary">{f.q}</dt>
                  <dd className="mt-2 t-body-s text-text-secondary">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section rhythm="feature" labelledBy="pk-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Display size="l" id="pk-close" className="mx-auto max-w-[20ch]">{d.trial.h1}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{aligned ? pk.ctaTrialEssential : d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/trial")} size="lg" variant="secondary">{d.nav.trial}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
          </div>
        </div>
      </Section>
    </>
  );
}
