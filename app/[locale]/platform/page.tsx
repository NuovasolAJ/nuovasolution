import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilities } from "@/lib/content/capabilities";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal, DrawRule } from "@/components/ui/reveal";
import { OperatingMap } from "@/components/site/operating-map";
import { StatusChip, StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.overview, description: d.platform.lead, alternates: { canonical: `/${params.locale}/platform`, languages: { en: "/en/platform", es: "/es/platform" } } };
}

export default function PlatformPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <Section rhythm="opening" labelledBy="po-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-default relative">
          <DrawRule className="hidden xl:block left-[calc(66.666%-0.5px)]" />
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{d.platform.eyebrow}</Eyebrow>
            <Display size="xl" id="po-h1">{d.platform.h1}</Display>
            <Lead className="mt-6">{d.platform.lead}</Lead>
          </Reveal>
        </div>
      </Section>

      <Section rhythm="default" hairline labelledBy="po-map">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.home.picture.eyebrow} title={d.home.picture.h2} id="po-map" /></Reveal>
          <Reveal delay={120} mode="opacity" className="mt-12 border border-line-hairline p-6 xl:p-10 max-w-wide">
            <span className="inline-flex h-6 items-center rounded-sm border border-line-interactive px-2 t-caption text-text-secondary mb-6">{d.common.illustrative}</span>
            <OperatingMap nodes={d.home.picture.nodes} label={d.home.picture.pathLabel} nextFrom={d.home.picture.nextFrom} legend={d.home.picture.legend} />
          </Reveal>
        </div>
      </Section>

      {/* PO-03 Capability index: hairline rows, the whole row is the link. */}
      <Section rhythm="feature" surface="raised" labelledBy="po-index">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.platform.indexEyebrow} title={d.platform.indexH2} id="po-index" /></Reveal>
          <ol className="mt-12 hairline-list border-y border-line-hairline">
            {capabilities.map((c, i) => (
              <li key={c.slug}>
                <Link href={p(`/platform/${c.slug}`)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 xl:gap-8 py-5 xl:min-h-24 transition-colors duration-micro hover:bg-surface-hover -mx-4 px-4">
                  <span className="t-caption tnum text-text-muted w-8">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="t-heading-l text-text-primary">{c.name[locale]}</span>
                      <StatusChip status={c.status} locale={locale} />
                    </span>
                    <span className="mt-1 block t-body-s text-text-secondary">{c.navLine[locale]}</span>
                  </span>
                  <span className="text-text-muted transition-transform duration-micro group-hover:translate-x-1"><StatusGlyph glyph="arrow-right" /></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section rhythm="default" hairline labelledBy="po-tenant">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <Reveal className="xl:col-span-8">
              <SectionHead eyebrow={d.platform.tenant.eyebrow} title={d.platform.tenant.h2} lead={d.platform.tenant.body} id="po-tenant" />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section rhythm="feature" surface="deep" labelledBy="po-close">
        <div className="container-text text-center">
          <Reveal mode="opacity">
            <Display size="l" id="po-close" className="mx-auto max-w-[24ch]">{d.home.closing.h2}</Display>
            <CtaRow align="center" className="mt-12">
              <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{d.home.closing.caption}</Caption>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
