import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapabilities } from "@/lib/content/capabilities";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { FlowRow } from "@/components/site/stage-stack";
import { StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.overview, description: d.platform.lead, alternates: { canonical: `/${params.locale}/platform`, languages: { en: "/en/platform", es: "/es/platform" } } };
}

/**
 * Platform overview: the same continuous example as compact product cards (replaces the
 * schematic map, audit Z12), then the published capabilities as an index. No status chip and
 * no internal formula (audit R27).
 */
export default function PlatformPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const caps = publishedCapabilities();

  return (
    <>
      <Section rhythm="opening" labelledBy="po-h1" className="overflow-hidden">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{d.platform.eyebrow}</Eyebrow>
            <Display size="xl" id="po-h1">{d.platform.h1}</Display>
            <Lead className="mt-6">{d.platform.lead}</Lead>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="default" hairline labelledBy="po-flow">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.platform.exampleEyebrow} title={d.platform.exampleH2} id="po-flow" /></Reveal>
          <div className="mt-12"><FlowRow locale={locale} /></div>
        </div>
      </Section>

      <Section rhythm="feature" surface="ivory" labelledBy="po-index">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.platform.indexEyebrow} title={d.platform.indexH2} id="po-index" /></Reveal>
          {/* LAUNCH_COPY_v1 §7.2: the two on-request modules, one sentence each, only here. */}
          <div className="mt-12 card-quiet p-6" data-on-request>
            <p className="t-eyebrow text-text-muted">{d.nav.onRequest}</p>
            <ul className="mt-3 space-y-2">
              {d.nav.onRequestLines.map((l) => (
                <li key={l} className="flex items-start gap-2 t-body-m text-text-secondary"><StatusGlyph glyph="diamond" size={12} className="mt-2 shrink-0 text-champagne-400" />{l}</li>
              ))}
            </ul>
          </div>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {caps.map((c, i) => (
              <li key={c.slug}>
                <Link href={p(`/platform/${c.slug}`)} className="group card flex h-full flex-col rounded-xl p-6 transition-shadow duration-control hover:shadow-lift">
                  <span className="t-caption tnum text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-4 block t-heading-m text-text-primary">{c.name[locale]}</span>
                  <span className="mt-2 block t-body-s text-text-secondary">{c.navLine[locale]}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 t-body-s text-text-primary">
                    {d.common.readModule}
                    <StatusGlyph glyph="arrow-right" size={14} className="text-text-muted transition-transform duration-micro group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section rhythm="feature" labelledBy="po-close">
        <div className="container-default">
          <div className="field-sand rounded-xl px-6 py-14 text-center md:px-12 md:py-20">
            <Reveal mode="opacity">
              <Display size="l" id="po-close" className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
              <CtaRow align="center" className="mt-10">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
