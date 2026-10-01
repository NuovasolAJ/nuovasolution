import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { trialPlanAligned } from "@/lib/content/plans";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ReadinessView } from "@/components/site/product-views";
import { ClosingBand } from "@/components/site/closing-band";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.trial, description: d.trial.lead, alternates: { canonical: `/${params.locale}/trial`, languages: { en: "/en/trial", es: "/es/trial" } } };
}

/**
 * Trial, in the accepted direction (owner 2026-09-30). The claim and the readiness check as the agency
 * sees it (on a white stage), then one stone ground with how the trial works and the setup steps, each
 * on its own stage. The Essential wording appears only after API's TRIAL_PLAN_ALIGNED (R26).
 */
export default function TrialPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const t = d.trial;
  const aligned = trialPlanAligned();

  return (
    <>
      <section aria-labelledby="tr-h1" className="overflow-hidden pb-[var(--section-default)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-12 xl:gap-12">
            <Reveal className="xl:col-span-6">
              <Eyebrow className="mb-4">{t.eyebrow}</Eyebrow>
              <Display size="xl" id="tr-h1">{t.h1}</Display>
              <Lead className="mt-6">{t.lead}</Lead>
              {aligned && <Caption className="mt-3">{d.packages.ctaTrialEssential}: {t.how[0].line}</Caption>}
              <CtaRow className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{aligned ? d.packages.ctaTrialEssential : t.ctaPrimary}</ButtonLink>
                <ButtonLink href={p("/packages")} size="lg" variant="secondary">{t.ctaSecondary}</ButtonLink>
              </CtaRow>
              <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
            </Reveal>
            <Reveal delay={80} mode="opacity" className="xl:col-span-6">
              <div className="stage overflow-hidden p-2 md:p-3">
                <div className="field-sky rounded-[20px] p-4 md:p-8">
                  <ReadinessView locale={locale} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="band band-stone band-shoulders">
        <section aria-labelledby="tr-how" className="pt-[var(--section-default)]">
          <div className="container-default">
            <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12 xl:gap-16">
              <Reveal className="xl:col-span-5">
                <SectionHead eyebrow={t.howEyebrow} title={t.howH2} id="tr-how" />
              </Reveal>
              <Reveal delay={80} as="ol" className="stage overflow-hidden xl:col-span-7">
                {t.how.map((s, i) => (
                  <li key={s.title} className="border-line-hairline p-6 md:p-7 [&:not(:last-child)]:border-b">
                    <p className="t-caption tnum text-text-accent">0{i + 1}</p>
                    <Heading size="m" className="mt-2">{s.title}</Heading>
                    <p className="mt-2 t-body-m text-text-secondary">{s.line}</p>
                  </li>
                ))}
              </Reveal>
            </div>
            {/* LAUNCH_COPY_v1 §5.3: the "what the website never does" block is governance text, not customer copy (S-16). */}
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {d.packages.trialLines.map((l) => (
                <li key={l} className="rounded-xl border border-line-strong bg-[color:rgba(255,255,255,0.55)] p-5 t-body-m text-text-secondary">{l}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="tr-steps" className="pb-[var(--section-default)] pt-[var(--section-default)]">
          <div className="container-default">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-16">
              <Reveal className="xl:col-span-5">
                <SectionHead eyebrow={t.stepsEyebrow} title={t.stepsH2} lead={t.stepsLead} id="tr-steps" />
              </Reveal>
              <ol className="stage overflow-hidden xl:col-span-7">
                {t.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-4 border-line-hairline p-5 md:p-6 [&:not(:last-child)]:border-b">
                    <span className="pt-1 t-caption tnum text-text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block t-heading-s text-text-primary">{s.title}</span>
                      <span className="mt-1 block t-body-s text-text-secondary">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>

      <ClosingBand locale={locale} id="tr-close" />
    </>
  );
}
