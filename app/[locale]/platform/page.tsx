import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilities } from "@/lib/content/capabilities";
import { Section } from "@/components/ui/section";
import { SectionHead, Display, Eyebrow, Lead, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
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
          <Reveal delay={120} mode="opacity" className="mt-12 card rounded-xl p-6 xl:p-10 max-w-wide">
            <span className="inline-flex h-6 items-center rounded-pill border border-line-hairline px-2.5 t-caption text-text-secondary mb-6">{d.common.illustrative}</span>
            <OperatingMap nodes={d.home.picture.nodes} label={d.home.picture.pathLabel} nextFrom={d.home.picture.nextFrom} legend={d.home.picture.legend} />
          </Reveal>
        </div>
      </Section>

      {/* PO-03 Capability index: hairline rows, the whole row is the link. */}
      <Section rhythm="feature" surface="ivory" labelledBy="po-index">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={d.platform.indexEyebrow} title={d.platform.indexH2} id="po-index" /></Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((c, i) => (
              <li key={c.slug}>
                <Link href={p(`/platform/${c.slug}`)} className="group card flex h-full flex-col rounded-xl p-6 transition-shadow duration-control hover:shadow-lift">
                  <span className="flex items-center justify-between gap-3">
                    <span className="t-caption tnum text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <StatusChip status={c.status} locale={locale} />
                  </span>
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

      <Section rhythm="default" hairline labelledBy="po-tenant">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <Reveal className="xl:col-span-8">
              <SectionHead eyebrow={d.platform.tenant.eyebrow} title={d.platform.tenant.h2} lead={d.platform.tenant.body} id="po-tenant" />
            </Reveal>
          </div>
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
              {d.home.closing.caption && <Caption className="mt-4">{d.home.closing.caption}</Caption>}
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
