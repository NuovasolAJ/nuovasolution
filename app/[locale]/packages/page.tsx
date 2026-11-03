import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { home1103 } from "@/lib/content/home-1103";
import { Display, Eyebrow, Lead, Caption, SectionHead } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StatusGlyph } from "@/components/ui/status";
import { Motion } from "@/components/ui/motion";
import { PlansTable } from "@/components/home/plans-table";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.packages, description: d.packages.lead, alternates: { canonical: `/${params.locale}/packages`, languages: { en: "/en/packages", es: "/es/packages" } } };
}

/**
 * Packages (the owner's order of 03.11.2026: one build for the home page and /packages). The same plans table as the home
 * page (Copy 1102 v2 §6.1: fixed rows, one status word per cell, no empty circles, no prices, no "Disponible"), under the
 * page's own opening (Copy C-10, C-11: the packages cannot be booked yet; access by invitation), then how one pays and the
 * questions. No sign-up link on a public page (claims lines 02.11.); every action leads to a person.
 */
export default function PackagesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const pk = d.packages;
  const p = (path: string) => localePath(locale, path);
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const c = home1103.close;

  return (
    <div data-style="v3">
      <section aria-labelledby="pk-h1" className="pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{pk.eyebrow}</Eyebrow>
            <Display size="xl" id="pk-h1">{pk.h1}</Display>
            <Lead className="mt-6">{pk.lead}</Lead>
          </Reveal>
        </div>
      </section>

      <Motion>
        <PlansTable locale={locale} headed={false} />
      </Motion>

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
            <Display size="l" id="pk-close" className="mx-auto max-w-[20ch]">{l(c.h2)}</Display>
            <p className="mx-auto mt-5 max-w-[44ch] t-body-l text-text-secondary">{l(c.line)}</p>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={`${localePath(locale)}#demo`} size="lg">{l(c.ctaDemo)}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{l(c.ctaContact)}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{l(home1103.hero.access)}</Caption>
          </div>
        </div>
      </section>
    </div>
  );
}
