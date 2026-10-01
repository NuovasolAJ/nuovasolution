import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapabilities } from "@/lib/content/capabilities";
import { SectionHead, Display, Eyebrow, Lead } from "@/components/ui/type";
import { Reveal } from "@/components/ui/reveal";
import { FlowRow } from "@/components/site/flow-story";
import { ClosingBand } from "@/components/site/closing-band";
import { StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.overview, description: d.platform.lead, alternates: { canonical: `/${params.locale}/platform`, languages: { en: "/en/platform", es: "/es/platform" } } };
}

/**
 * Platform overview, in the accepted direction (owner 2026-09-30): the claim on the canvas, then one sand
 * ground that carries the example (three real surfaces on white stages) and the four working modules,
 * then a stone panel with what is not a module: 3D on request, the phone being built
 * (COPY_DELTAS_0930 D-48, D-49, D-52: what you get first, then what you do not). No status chip.
 */
export default function PlatformPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const caps = publishedCapabilities();

  return (
    <>
      <section aria-labelledby="po-h1" className="pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{d.platform.eyebrow}</Eyebrow>
            <Display size="xl" id="po-h1">{d.platform.h1}</Display>
            <Lead className="mt-6">{d.platform.lead}</Lead>
          </Reveal>
        </div>
      </section>

      <div className="band band-sand band-shoulders">
        <section aria-labelledby="po-flow" className="pt-[var(--section-default)]">
          <div className="container-default">
            <Reveal className="xl:max-w-[60%]"><SectionHead eyebrow={d.platform.exampleEyebrow} title={d.home.flow.h2} id="po-flow" /></Reveal>
            <div className="mt-10"><FlowRow locale={locale} /></div>
          </div>
        </section>

        <section aria-labelledby="po-index" className="pb-[var(--section-default)] pt-[var(--section-default)]">
          <div className="container-default">
            <Reveal className="xl:max-w-[60%]"><SectionHead eyebrow={d.platform.indexEyebrow} title={d.platform.indexH2} id="po-index" /></Reveal>
            <ol className="mt-10 grid gap-5 md:grid-cols-2" data-modules>
              {caps.map((c, i) => (
                <li key={c.slug}>
                  <Link href={p(`/platform/${c.slug}`)} className="group stage flex h-full flex-col p-6 transition-shadow duration-control hover:shadow-overlay md:p-8">
                    <span className="t-caption tnum text-text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-4 block t-heading-m text-text-primary">{c.name[locale]}</span>
                    <span className="mt-2 block t-body-s text-text-secondary">{c.navLine[locale]}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 t-body-s font-medium text-text-primary">
                      {d.common.readModule}
                      <StatusGlyph glyph="arrow-right" size={14} className="text-text-muted transition-transform duration-micro group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section aria-label={`${d.nav.onRequest} · ${d.nav.beingBuilt}`} className="pt-[var(--section-default)]">
        <div className="container-wide">
          <div className="band band-stone band-panel px-5 py-10 md:px-12 md:py-14">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div data-on-request>
                <p className="t-eyebrow text-text-accent">{d.nav.onRequest}</p>
                <ul className="mt-4 space-y-3">
                  {d.nav.onRequestLines.map((l) => (
                    <li key={l} className="flex items-start gap-2 t-body-m text-text-secondary"><StatusGlyph glyph="diamond" size={12} className="mt-2 shrink-0 text-champagne-400" />{l}</li>
                  ))}
                </ul>
              </div>
              <div data-being-built>
                <p className="t-eyebrow text-text-muted">{d.nav.beingBuilt}</p>
                <ul className="mt-4 space-y-3">
                  {d.nav.beingBuiltLines.map((l) => (
                    <li key={l} className="flex items-start gap-2 t-body-m text-text-secondary"><StatusGlyph glyph="rule" size={12} className="mt-2 shrink-0 text-text-muted" />{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingBand locale={locale} id="po-close" />
    </>
  );
}
