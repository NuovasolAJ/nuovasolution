import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPlans } from "@/lib/contracts/server";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { LabelChip, StatusGlyph } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.packages, description: d.packages.lead, alternates: { canonical: `/${params.locale}/packages`, languages: { en: "/en/packages", es: "/es/packages" } } };
}

/**
 * Ivory canvas. Price-free at every stage: there is no pricing authority.
 * Renders display_name and entitlements_summary exactly as served. No quantity,
 * no quota, no figure, no comparative visual device.
 */
export default async function PackagesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const result = await getPlans();
  const stub = result.kind === "stub";
  const plans = result.kind === "awaiting_contract" ? [] : result.plans;

  return (
    <>
      <Section surface="ivory" rhythm="opening" labelledBy="pk-h1">
        <EnvironmentRibbon locale={locale} scope="form" />
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{d.packages.eyebrow}</Eyebrow>
            <Display size="xl" id="pk-h1">{d.packages.h1}</Display>
            <Lead className="mt-6">{d.packages.lead}</Lead>
          </Reveal>
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="pk-plans">
        <div className="container-default">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow as="h2" id="pk-plans">{d.packages.plansEyebrow}</Eyebrow>
            {stub && <LabelChip tone="attention">{d.common.stubData}</LabelChip>}
          </div>
          {result.kind === "awaiting_contract" && (
            <p className="mt-8 flex items-center gap-2 t-body-m text-text-secondary"><StatusGlyph glyph="clock" size={14} />{d.packages.plansAwaiting}</p>
          )}
          <ul className={plans.length ? "mt-8 hairline-list border-y border-line-hairline" : "hidden"}>
            {plans.map((plan) => (
              <li key={plan.code} className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-8 py-8">
                <div className="xl:col-span-4">
                  <Heading size="l" as="h3">{plan.display_name}</Heading>
                </div>
                <div className="xl:col-span-8">
                  <p className="t-eyebrow text-text-muted">{d.packages.included}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {plan.entitlements_summary.map((e) => (
                      <li key={e} className="flex items-center gap-2 t-body-m text-text-secondary"><StatusGlyph glyph="check" size={14} className="text-signal-positive" />{e}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          {stub && <Caption className="mt-4">{d.packages.stubNote}</Caption>}
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="pk-base">
        <div className="container-default grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-5">
            <Reveal><SectionHead eyebrow={d.packages.baselineHeading} title={d.packages.baselineHeading} size="heading-l" id="pk-base" /></Reveal>
            <ul className="mt-6 hairline-list border-y border-line-hairline">
              {d.packages.baseline.map((b) => (
                <li key={b} className="py-3 t-body-m text-text-secondary">{b}</li>
              ))}
            </ul>
          </div>
          <div className="xl:col-span-6 xl:col-start-7">
            <Reveal>
              <Heading size="l" as="h2">{d.packages.noPriceHeading}</Heading>
              <p className="mt-4 t-body-m text-text-secondary measure-body">{d.packages.noPriceBody}</p>
              <p className="mt-4 flex items-center gap-2 t-body-s text-text-muted"><StatusGlyph glyph="lock" size={14} />{d.packages.notAvailable}</p>
              <CtaRow className="mt-8">
                <ButtonLink href={p("/signup")}>{d.packages.cta}</ButtonLink>
                <ButtonLink href={p("/contact")} variant="secondary">{d.packages.ctaSecondary}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="pk-faq">
        <div className="container-text !mx-0">
          <Eyebrow as="h2" id="pk-faq">{d.packages.faqEyebrow}</Eyebrow>
          <div className="mt-6 hairline-list border-y border-line-hairline">
            {d.packages.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 t-heading-s text-text-primary">
                  {f.q}
                  <span aria-hidden="true" className="text-text-muted transition-transform duration-control group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 t-body-m text-text-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section rhythm="feature" surface="deep" labelledBy="pk-close">
        <div className="container-text text-center">
          <Display size="l" id="pk-close" className="mx-auto max-w-[24ch]">{d.trial.h1}</Display>
          <CtaRow align="center" className="mt-12">
            <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
            <ButtonLink href={p("/trial")} size="lg" variant="secondary">{d.nav.trial}</ButtonLink>
          </CtaRow>
          <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
        </div>
      </Section>
    </>
  );
}
