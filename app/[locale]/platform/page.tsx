import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapabilities } from "@/lib/content/capabilities";
import { entryHref, platformTasks, stateWords } from "@/lib/content/platform-map";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { Reveal } from "@/components/ui/reveal";
import { ClosingBand } from "@/components/site/closing-band";
import { StatusGlyph } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.overview, description: d.platform.lead, alternates: { canonical: `/${params.locale}/platform`, languages: { en: "/en/platform", es: "/es/platform" } } };
}

/**
 * Platform overview (owner 2026-10-16: "Plataforma: reines Chaos, keine Struktur"): the claim, then the platform in its
 * four tasks, each a section with its entries on one line grid (the menu's four words lead here), then the four module
 * pages, then what is per order and what is being built. The demonstration with the duplicated lead list is gone;
 * the story itself lives on the home page.
 */
export default function PlatformPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const caps = publishedCapabilities();
  const hrefOf = (href: string) => (href.startsWith("/") && !href.startsWith("/#") ? p(href) : `${localePath(locale)}${href.slice(1)}`);

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

      {/* The four tasks: one section each, the entries on a line grid, every entry clickable. */}
      <section aria-label={d.nav.menuTitle} className="pb-[var(--section-default)]">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14" data-platform-sections>
            {platformTasks.map((task, i) => (
              <section key={task.key} id={task.key} aria-labelledby={`po-${task.key}`} className="scroll-mt-[var(--header-h)]" data-platform-section={task.key}>
                <p className="tnum t-caption text-text-accent">0{i + 1}</p>
                <h2 id={`po-${task.key}`} className="mt-2 t-display-m text-text-primary">{task.title[locale]}</h2>
                <p className="mt-3 max-w-[48ch] t-body-m text-text-secondary">{task.line[locale]}</p>
                <ul className="mt-6 divide-y divide-line-hairline border-y border-line-hairline">
                  {task.entries.map((e) => (
                    <li key={e.key} data-platform-entry={e.key}>
                      <Link href={hrefOf(entryHref(e))} className="group flex min-h-[56px] items-center justify-between gap-4 py-3">
                        <span className="min-w-0">
                          <span className="block t-body-m font-medium text-text-primary">{e.name[locale]}</span>
                          <span className="block t-body-s text-text-secondary">{e.line[locale]}</span>
                          {/* COPY_SYNC_1023 W-3: every row carries its state */}
                          <span className="state-line mt-1" data-state={e.state} data-platform-entry-state>{e.stateLine ? e.stateLine[locale] : stateWords[e.state][locale]}</span>
                        </span>
                        <StatusGlyph glyph="arrow-right" size={14} className="shrink-0 text-text-muted transition-transform duration-micro group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* The module pages */}
      <section aria-labelledby="po-index" className="border-t border-line-hairline pb-[var(--section-default)] pt-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="xl:max-w-[60%]">
            <p className="t-eyebrow text-text-accent">{d.platform.indexEyebrow}</p>
            <h2 id="po-index" className="mt-4 t-display-m text-text-primary">{d.platform.indexH2}</h2>
          </Reveal>
          <ol className="mt-8 divide-y divide-line-hairline border-y border-line-hairline" data-modules>
            {caps.map((c, i) => (
              <li key={c.slug}>
                <Link href={p(`/platform/${c.slug}`)} className="group grid min-h-[64px] grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 py-4">
                  <span className="tnum t-caption text-text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block t-heading-m text-text-primary">{c.name[locale]}</span>
                    <span className="block t-body-s text-text-secondary">{c.navLine[locale]}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 t-body-s font-medium text-text-primary">
                    {d.common.readModule}
                    <StatusGlyph glyph="arrow-right" size={14} className="text-text-muted transition-transform duration-micro group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Per order, and being built: said once, plainly. */}
      <section aria-label={`${d.nav.onRequest} · ${d.nav.beingBuilt}`} className="pb-[var(--section-compact)]">
        <div className="container-default">
          <div className="grid gap-8 border-t border-line-hairline pt-8 lg:grid-cols-2 lg:gap-12">
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
      </section>

      <ClosingBand locale={locale} id="po-close" />
    </>
  );
}
