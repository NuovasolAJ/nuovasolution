import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { faqFrame, faqGroups } from "@/lib/content/faq";
import { Display, Eyebrow, Lead, Heading } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { WithMail } from "@/components/site/legal-page";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const l = params.locale;
  return { title: faqFrame.h1[l], description: faqFrame.lead[l], alternates: { canonical: `/${l}/faq`, languages: { en: "/en/faq", es: "/es/faq" } } };
}

/**
 * The FAQ (COPY_DELTAS_0930 §3, rows of PRODUCT_FAQ_KB_v1 v1.2). Owner 2026-10-06: the categories carry a
 * heading only, no figure under it; the questions open one at a time, so the page is short; the row
 * identifiers and counts stay internal (the kb id is a data attribute, nothing more). The contact line
 * offers an address and promises no reply.
 */
export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <section aria-labelledby="faq-h1" className="pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{faqFrame.eyebrow[locale]}</Eyebrow>
            <Display size="xl" id="faq-h1">{faqFrame.h1[locale]}</Display>
            <Lead className="mt-6">{faqFrame.lead[locale]}</Lead>
          </Reveal>
          <nav aria-label={faqFrame.eyebrow[locale]} className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-flex min-h-[44px] items-center rounded-pill border border-line-hairline bg-surface-raised px-4 t-body-s text-text-primary transition-colors duration-micro hover:border-line-interactive">
                    {g.title[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="band band-sand band-shoulders">
        <div className="container-default space-y-8 pb-[var(--section-default)] pt-[var(--section-default)] md:space-y-10">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="stage scroll-mt-[calc(var(--header-h)+24px)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="border-b border-line-hairline p-6 md:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <Heading size="m" as="h2" id={`${g.id}-h`}>{g.title[locale]}</Heading>
                </div>
                <div className="px-6 py-2 md:px-8 lg:col-span-8">
                  <Accordion items={g.items.map((it) => ({ id: it.kb.replace(/[^A-Za-z0-9]/g, "-"), question: it.q[locale], answer: it.a[locale] }))} className="border-y-0" />
                </div>
              </div>
            </section>
          ))}
          <p className="t-body-m text-text-secondary" data-faq-contact>
            <WithMail text={faqFrame.contact[locale]} />
          </p>
        </div>
      </div>

      <section aria-labelledby="faq-close" className="py-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-stone band-panel px-6 py-14 text-center md:px-12 md:py-20">
            <Reveal mode="opacity">
              <Display size="l" id="faq-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
              <p className="mx-auto mt-6 max-w-[48ch] t-body-l text-text-secondary">{d.home.closing.body}</p>
              <CtaRow align="center" className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
