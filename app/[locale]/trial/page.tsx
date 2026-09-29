import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { trialPlanAligned, startLabel } from "@/lib/content/plans";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ReadinessView } from "@/components/site/product-views";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.trial, description: d.trial.lead, alternates: { canonical: `/${params.locale}/trial`, languages: { en: "/en/trial", es: "/es/trial" } } };
}

/**
 * Trial. The copy is the owner's exact wording; conditions in plain sight. The setup steps sit
 * next to the readiness check as the agency sees it, and the prepared media place carries a
 * real poster of that check (audit Z14). The Essential wording appears only after API's
 * TRIAL_PLAN_ALIGNED (R26).
 */
export default function TrialPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const t = d.trial;
  const aligned = trialPlanAligned();

  return (
    <>
      <Section rhythm="opening" labelledBy="tr-h1" className="overflow-hidden">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-12 items-center">
            <Reveal className="xl:col-span-6">
              <Eyebrow className="mb-4">{t.eyebrow}</Eyebrow>
              <Display size="xl" id="tr-h1">{t.h1}</Display>
              <Lead className="mt-6">{t.lead}</Lead>
              {aligned && <Caption className="mt-3">{d.packages.ctaTrialEssential}: {t.how[0].line}</Caption>}
              <CtaRow className="mt-12">
                <ButtonLink href={p("/signup")} size="lg">{aligned ? d.packages.ctaTrialEssential : t.ctaPrimary}</ButtonLink>
                <ButtonLink href={p("/packages")} size="lg" variant="secondary">{t.ctaSecondary}</ButtonLink>
              </CtaRow>
              <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
            </Reveal>
            <Reveal delay={80} mode="opacity" className="xl:col-span-6">
              <div className="field-sky rounded-xl p-5 md:p-8">
                <ReadinessView locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="tr-how">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-5">
              <SectionHead eyebrow={t.howEyebrow} title={t.howH2} id="tr-how" />
              <ol className="mt-8 hairline-list border-y border-line-hairline">
                {t.how.map((s, i) => (
                  <li key={s.title} className="py-5">
                    <p className="t-caption tnum text-text-muted">0{i + 1}</p>
                    <Heading size="m" className="mt-2">{s.title}</Heading>
                    <p className="mt-2 t-body-m text-text-secondary">{s.line}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            {/* LAUNCH_COPY_v1 §5.3: the "what the website never does" block is governance text, not customer copy (S-16). */}
            <Reveal delay={80} className="xl:col-span-7">
              <ul className="space-y-4">
                {d.packages.trialLines.map((l) => (
                  <li key={l} className="t-body-m text-text-secondary border-l border-line-strong pl-4">{l}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section rhythm="feature" hairline labelledBy="tr-steps">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <Reveal className="xl:col-span-5">
              <SectionHead eyebrow={t.stepsEyebrow} title={t.stepsH2} lead={t.stepsLead} id="tr-steps" />
            </Reveal>
            <ol className="xl:col-span-7 hairline-list border-y border-line-hairline">
              {t.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-4 py-4">
                  <span className="t-caption tnum text-text-muted pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block t-heading-s text-text-primary">{s.title}</span>
                    <span className="block mt-1 t-body-s text-text-secondary">{s.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section rhythm="feature" labelledBy="tr-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Display size="l" id="tr-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
            </CtaRow>
          </div>
        </div>
      </Section>
    </>
  );
}
