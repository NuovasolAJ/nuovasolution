import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { catalogPlans, isPlanCode } from "@/lib/content/plans";
import { home1103 } from "@/lib/content/home-1103";
import { pilotRequest, interestFromQuery } from "@/lib/content/pilot-request";
import { resolveSwitches } from "@/lib/view";
import { Display, Eyebrow, Lead, Heading } from "@/components/ui/type";
import { Reveal } from "@/components/ui/reveal";
import { PilotRequestForm } from "@/components/site/pilot-request-form";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.contact, description: pilotRequest.lead[params.locale], alternates: { canonical: `/${params.locale}/contact`, languages: { en: "/en/contact", es: "/es/contact" } } };
}

/**
 * /contact = the end of the one offer (the owner's correction order of 16.11.2026, point 1; Copy 1113 §0 C-0 … C-4): the pilot card
 * with the short request, the e-mail and the company phone number beside it (the number only from the environment, NUOVA_E14_PHONE,
 * shown as a number — no WhatsApp link, the owner's rule of 13.11.), the confirmation with the three steps of the pilot. No demo
 * card, no trial card, no second button that leads back here. A plan interest from /packages (?plan=growth) and the 3D interest from
 * the home page (?interes=3d) preselect the request.
 */
export default function ContactPage({ params, searchParams }: { params: { locale: string }; searchParams?: { plan?: string; interes?: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const c = d.contact;
  const w = pilotRequest;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const s = resolveSwitches();
  const plan = isPlanCode(searchParams?.plan) ? catalogPlans.find((x) => x.code === searchParams!.plan) : undefined;
  const phone = process.env.NUOVA_E14_PHONE?.trim() || null;
  const steps = home1103.entry.steps(locale, s.view);

  return (
    <section aria-labelledby="ct-h1" className="contact" data-contact data-contact-phone={phone ? "set" : "unset"}>
      <div className="container-default contact-grid">
        <Reveal className="contact-words">
          <Eyebrow className="mb-4">{c.eyebrow}</Eyebrow>
          <Display size="xl" id="ct-h1">{c.h1}</Display>
          <Lead className="mt-6">{l(w.lead)}</Lead>
          {plan && (
            <div className="stage mt-8 p-5 md:p-6" data-plan-interest={plan.code}>
              <p className="t-heading-s text-text-primary">{c.planInterest.replace("{plan}", plan.display_name)}</p>
            </div>
          )}
          <dl className="contact-ways">
            <div className="contact-way">
              <dt className="t-eyebrow text-text-muted">{l(w.emailLabel)}</dt>
              <dd><a href="mailto:antonio@nuovasolution.com" className="contact-way-value" data-contact-email>antonio@nuovasolution.com</a></dd>
            </div>
            {phone && (
              <div className="contact-way">
                <dt className="t-eyebrow text-text-muted">{l(w.phoneLabel)}</dt>
                <dd><a href={`tel:${phone.replace(/\s+/g, "")}`} className="contact-way-value tnum" data-contact-phone>{phone}</a></dd>
              </div>
            )}
          </dl>
        </Reveal>

        <Reveal delay={80} className="contact-card stage" data-pilot-card>
          <Eyebrow className="mb-3">{l(w.eyebrow)}</Eyebrow>
          <Heading size="l" as="h2">{l(w.h)}</Heading>
          <p className="mt-3 t-body-m text-text-secondary">{l(w.body)}</p>
          <div className="mt-6">
            <PilotRequestForm locale={locale} interest={interestFromQuery(searchParams?.interes)} steps={steps} live={s.live} planName={plan?.display_name} />
          </div>
        </Reveal>
      </div>
      {/* the no-JavaScript way: the address stands above; nothing else is needed */}
      <p className="sr-only">{localePath(locale, "/contact")}</p>
    </section>
  );
}
