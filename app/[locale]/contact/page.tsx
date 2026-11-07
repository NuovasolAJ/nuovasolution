import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, isPlanCode } from "@/lib/content/plans";
import { entryAction, live } from "@/lib/claims";
import { resolveSwitches } from "@/lib/view";
import { Display, Eyebrow, Lead, Heading } from "@/components/ui/type";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ClosingBand } from "@/components/site/closing-band";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.contact, description: d.contact.lead, alternates: { canonical: `/${params.locale}/contact`, languages: { en: "/en/contact", es: "/es/contact" } } };
}

/**
 * Direct human reach, in the accepted direction (owner 2026-09-30). The address is real; the
 * scheduling link is an existing external tool with a real href. A plan interest from the packages
 * page (?plan=growth) is shown and carried into the e-mail subject; it grants nothing (audit Z03, Z11).
 * The two ways forward sit as white stages on one sand ground.
 */
export default function ContactPage({ params, searchParams }: { params: { locale: string }; searchParams?: { plan?: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const c = d.contact;
  const p = (path: string) => localePath(locale, path);
  const cal = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/nuovasolution/demo";
  const view = resolveSwitches().view;
  const entry = entryAction(locale, view);
  // Copy 1105 v3 §21: the trial block hangs on the trial and public registration
  const trialBlock = live(["trial", "publicSignup"], view);
  const plan = isPlanCode(searchParams?.plan) ? catalogPlans.find((x) => x.code === searchParams!.plan) : undefined;
  const mailto = plan ? `mailto:antonio@nuovasolution.com?subject=${encodeURIComponent(c.proposalSubject.replace("{plan}", plan.display_name))}` : "mailto:antonio@nuovasolution.com";

  return (
    <>
      <section aria-labelledby="ct-h1" className="pb-[var(--section-default)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{c.eyebrow}</Eyebrow>
            <Display size="xl" id="ct-h1">{c.h1}</Display>
            {/* Copy 1107 D-18: no sentence on the trial while it is off */}
            <Lead className="mt-6">{trialBlock ? c.lead : c.leadPublic}</Lead>
            {plan && (
              <div className="stage mt-8 p-5 md:p-6" data-plan-interest={plan.code}>
                <p className="t-heading-s text-text-primary">{c.planInterest.replace("{plan}", plan.display_name)}</p>
                <p className="mt-1 t-body-s text-text-secondary">{c.planInterestBody}</p>
              </div>
            )}
            <p className="mt-10 t-eyebrow text-text-muted">{c.emailLabel}</p>
            <a href={mailto} className="mt-2 inline-block break-all t-heading-l text-text-primary underline decoration-line-strong underline-offset-8 hover:decoration-ink-950">antonio@nuovasolution.com</a>
          </Reveal>
        </div>
      </section>

      {/* No WhatsApp block: a channel that does not exist is not a contact option (external finding 10, COPY_DELTAS_0929 D-33). */}
      <div className="band band-sand band-shoulders">
        <div className="container-default grid grid-cols-1 gap-5 pb-[var(--section-default)] pt-[var(--section-default)] md:grid-cols-2">
          <Reveal className="stage flex flex-col p-6 md:p-8">
            <Eyebrow className="mb-3">{c.demoEyebrow}</Eyebrow>
            <Heading size="l" as="h2">{c.demoH2}</Heading>
            <p className="mt-3 t-body-m text-text-secondary">{c.demoBody}</p>
            <div className="mt-auto pt-6"><ButtonLink href={cal} variant="secondary" external>{c.demoCta}</ButtonLink></div>
          </Reveal>
          {trialBlock && (
            <Reveal delay={120} className="stage flex flex-col p-6 md:p-8" data-contact-trial>
              <Heading size="l" as="h2">{c.trialH2}</Heading>
              <p className="mt-3 t-body-m text-text-secondary">{c.trialBody}</p>
              <div className="mt-auto pt-6"><ButtonLink href={p(entry.href)}>{entry.label}</ButtonLink></div>
            </Reveal>
          )}
        </div>
      </div>

      <ClosingBand locale={locale} id="ct-close" tone="stone" secondary="platform" caption={d.home.closing.caption || undefined} />
    </>
  );
}
