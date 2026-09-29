import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, isPlanCode } from "@/lib/content/plans";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, Heading, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.contact, description: d.contact.lead, alternates: { canonical: `/${params.locale}/contact`, languages: { en: "/en/contact", es: "/es/contact" } } };
}

/**
 * Direct human reach. Email is real. The scheduling link is an existing external tool with a
 * real href (progressive enhancement only, never href="#"). A plan interest from the packages page (?plan=growth) is
 * shown and carried into the e-mail subject; it grants nothing (audit Z03, Z11).
 */
export default function ContactPage({ params, searchParams }: { params: { locale: string }; searchParams?: { plan?: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const c = d.contact;
  const p = (path: string) => localePath(locale, path);
  const cal = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/nuovasolution/demo";
  const plan = isPlanCode(searchParams?.plan) ? catalogPlans.find((x) => x.code === searchParams!.plan) : undefined;
  const mailto = plan ? `mailto:antonio@nuovasolution.com?subject=${encodeURIComponent(c.proposalSubject.replace("{plan}", plan.display_name))}` : "mailto:antonio@nuovasolution.com";

  return (
    <>
      <Section rhythm="opening" labelledBy="ct-h1">
        <div className="container-default">
          <Reveal className="xl:max-w-[58%]">
            <Eyebrow className="mb-4">{c.eyebrow}</Eyebrow>
            <Display size="xl" id="ct-h1">{c.h1}</Display>
            <Lead className="mt-6">{c.lead}</Lead>
            {plan && (
              <div className="mt-8 card-quiet p-5" data-plan-interest={plan.code}>
                <p className="t-heading-s text-text-primary">{c.planInterest.replace("{plan}", plan.display_name)}</p>
                <p className="mt-1 t-body-s text-text-secondary">{c.planInterestBody}</p>
              </div>
            )}
            <p className="mt-10 t-eyebrow text-text-muted">{c.emailLabel}</p>
            <a href={mailto} className="mt-2 inline-block t-heading-l text-text-primary underline underline-offset-8 decoration-line-strong hover:decoration-ink-950 break-all">antonio@nuovasolution.com</a>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="default" hairline>
        {/* No WhatsApp block: a channel that does not exist is not a contact option (external finding 10, COPY_DELTAS_0929 D-33). */}
        <div className="container-default grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 [&>*]:card [&>*]:rounded-xl [&>*]:p-6">
          <Reveal>
            <Eyebrow className="mb-3">{c.demoEyebrow}</Eyebrow>
            <Heading size="l" as="h2">{c.demoH2}</Heading>
            <p className="mt-3 t-body-m text-text-secondary">{c.demoBody}</p>
            <div className="mt-6"><ButtonLink href={cal} variant="secondary" external>{c.demoCta}</ButtonLink></div>
          </Reveal>
          <Reveal delay={120}>
            <Heading size="l" as="h2">{c.trialH2}</Heading>
            <p className="mt-3 t-body-m text-text-secondary">{c.trialBody}</p>
            <div className="mt-6"><ButtonLink href={p("/signup")}>{d.common.startFree}</ButtonLink></div>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="feature" labelledBy="ct-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Display size="l" id="ct-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/platform")} size="lg" variant="secondary">{d.common.explorePlatform}</ButtonLink>
            </CtaRow>
            {d.home.closing.caption && <Caption className="mt-4">{d.home.closing.caption}</Caption>}
          </div>
        </div>
      </Section>
    </>
  );
}
