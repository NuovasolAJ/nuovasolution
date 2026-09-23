import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, gatedFeatures, CATALOG_SOURCE } from "@/lib/content/plans";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StatusChip, StatusGlyph } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.packages, description: d.packages.lead, alternates: { canonical: `/${params.locale}/packages`, languages: { en: "/en/packages", es: "/es/packages" } } };
}

/**
 * Packages, comparable side by side (design probe 2026-09-23). Contents and limits come
 * from the staging plan catalog (lib/content/plans.ts). No amount is shown: there is no price
 * authority. The payment path is described as it is: trial, proposal, invoice by transfer,
 * plan active only on a confirmed payment. Online checkout is not built.
 */
export default function PackagesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const pk = d.packages;
  const p = (path: string) => localePath(locale, path);
  const featureName = (k: string) => (pk.featureNames as Record<string, string>)[k] ?? k;
  const limitName = (k: string) => (pk.limits as Record<string, string>)[k] ?? k;

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="pk-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-default relative">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{pk.eyebrow}</Eyebrow>
            <Display size="xl" id="pk-h1">{pk.h1}</Display>
            <Lead className="mt-6">{pk.lead}</Lead>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="default" labelledBy="pk-plans">
        <div className="container-default">
          <Reveal>
            <Eyebrow as="h2" id="pk-plans">{pk.tiersEyebrow}</Eyebrow>
            <p className="mt-3 t-body-m text-text-secondary measure-body">{pk.tiersLead}</p>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3" data-plan-cards>
            {catalogPlans.map((plan, i) => {
              const highlighted = plan.code === "growth";
              return (
                <Reveal key={plan.code} delay={i * 60} as="li" className={cn("card flex flex-col rounded-xl p-6", highlighted && "border-ink-950 shadow-lift")} data-plan={plan.code}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Heading size="l" as="h3">{plan.display_name}</Heading>
                      <p className="mt-1 t-caption text-text-muted">{pk.catalogCode.replace("{code}", plan.code)}</p>
                    </div>
                    {highlighted && <span className="rounded-pill bg-ink-950 px-2.5 py-1 t-caption text-ivory">{pk.recommended}</span>}
                  </div>
                  <div className="mt-5 rounded-lg bg-surface-sunken px-4 py-3">
                    <p className="t-heading-s text-text-primary">{pk.amount}</p>
                    <p className="mt-1 t-caption text-text-muted">{pk.amountLine}</p>
                  </div>
                  <p className="mt-6 t-eyebrow text-text-muted">{pk.limitsHeading}</p>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    {(["offices", "seats", "leads_month", "crm_connections", "voice_minutes"] as const).map((k) => {
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
                    {plan.features.map((f) => {
                      const gated = gatedFeatures[f];
                      return (
                        <li key={f} className="flex flex-wrap items-center gap-x-2 gap-y-1 t-body-s">
                          <StatusGlyph glyph={gated ? "clock" : "check"} size={14} className={gated ? "shrink-0 text-signal-attention" : "shrink-0 text-signal-positive"} />
                          <span className={gated ? "text-text-secondary" : "text-text-primary"}>{featureName(f)}</span>
                          {gated && <StatusChip status={gated} locale={locale} />}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-8 flex flex-col gap-2 pt-2 mt-auto">
                    <ButtonLink href={p("/signup")} full variant={highlighted ? "primary" : "secondary"}>{pk.ctaTrial}</ButtonLink>
                    <ButtonLink href={p("/contact")} full variant="tertiary" className="justify-center">{pk.ctaProposal}</ButtonLink>
                  </div>
                </Reveal>
              );
            })}
          </ol>
          <Caption className="mt-5">{pk.catalogNote} {pk.catalogSource.replace("{source}", CATALOG_SOURCE)}</Caption>
        </div>
      </Section>

      <Section rhythm="feature" surface="ivory" labelledBy="pk-pay">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]"><SectionHead eyebrow={pk.payEyebrow} title={pk.payH2} lead={pk.amountNote} id="pk-pay" /></Reveal>
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

      <Section rhythm="default" hairline labelledBy="pk-faq">
        <div className="container-text !mx-0">
          <Eyebrow as="h2" id="pk-faq">{pk.faqEyebrow}</Eyebrow>
          <div className="mt-6 hairline-list border-y border-line-hairline">
            {pk.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 t-heading-s text-text-primary">
                  {f.q}
                  <span aria-hidden="true" className="text-text-muted transition-transform duration-control group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 t-body-m text-text-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section rhythm="feature" labelledBy="pk-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Display size="l" id="pk-close" className="mx-auto max-w-[20ch]">{d.trial.h1}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/trial")} size="lg" variant="secondary">{d.nav.trial}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
          </div>
        </div>
      </Section>
    </>
  );
}
