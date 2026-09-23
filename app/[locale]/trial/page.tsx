import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.trial, description: d.trial.lead, alternates: { canonical: `/${params.locale}/trial`, languages: { en: "/en/trial", es: "/es/trial" } } };
}

/** Ivory canvas. The trial copy is the owner's exact wording. Conditions are in plain sight. */
export default function TrialPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const t = d.trial;

  return (
    <>
      <Section rhythm="opening" labelledBy="tr-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-narrow relative !mx-0 xl:!mx-auto">
          <Reveal>
            <Eyebrow className="mb-4">{t.eyebrow}</Eyebrow>
            <Display size="xl" id="tr-h1">{t.h1}</Display>
            <Lead className="mt-6">{t.lead}</Lead>
            <CtaRow className="mt-12">
              <ButtonLink href={p("/signup")} size="lg">{t.ctaPrimary}</ButtonLink>
              <ButtonLink href={p("/packages")} size="lg" variant="secondary">{t.ctaSecondary}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{d.common.noPayment} {d.common.noSalesCall}</Caption>
          </Reveal>
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="tr-how">
        <div className="container-narrow !mx-0 xl:!mx-auto">
          <Reveal><SectionHead eyebrow={t.howEyebrow} title={t.howH2} id="tr-how" /></Reveal>
          <ol className="mt-12 hairline-list border-y border-line-hairline">
            {t.how.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} as="li" className="py-6">
                <p className="t-caption tnum text-text-muted">0{i + 1}</p>
                <Heading size="m" className="mt-2">{s.title}</Heading>
                <p className="mt-2 t-body-m text-text-secondary">{s.line}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section surface="ivory" rhythm="default" hairline labelledBy="tr-honesty">
        <div className="container-narrow !mx-0 xl:!mx-auto">
          <Heading size="l" as="h2" id="tr-honesty">{t.honesty.h2}</Heading>
          <ul className="mt-6 space-y-4">
            {t.honesty.lines.map((l) => (
              <li key={l} className="t-body-m text-text-secondary border-l border-line-strong pl-4">{l}</li>
            ))}
          </ul>
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
              <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
            </CtaRow>
          </div>
        </div>
      </Section>
    </>
  );
}
