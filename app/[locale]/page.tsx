import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/section";
import { SectionHead, Eyebrow, Display, Lead, Heading, Caption } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { ProductSurface } from "@/components/ui/product-surface";
import { VideoSlot } from "@/components/ui/video-slot";
import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal, DrawRule } from "@/components/ui/reveal";
import { Split } from "@/components/ui/split";
import { OperatingMap } from "@/components/site/operating-map";
import { StatusNote } from "@/components/ui/status";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;

  return (
    <>
      {/* H-01 Opening. Three levels: atmosphere, product surface, type and action. */}
      <Section rhythm="opening" labelledBy="hero-h1" className="overflow-hidden">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container-default relative">
          <DrawRule className="hidden xl:block left-[calc(58.333%-0.5px)]" />
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-16 items-start">
            <Reveal className="xl:col-span-7 xl:pr-8">
              <Eyebrow className="mb-4">{h.hero.eyebrow}</Eyebrow>
              <Display size="xl" id="hero-h1" className="max-w-[24ch]">{h.hero.h1}</Display>
              <Lead className="mt-6">{h.hero.lead}</Lead>
              <CtaRow className="mt-12">
                <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              </CtaRow>
              <Caption className="mt-4">{h.hero.note}</Caption>
            </Reveal>
            <Reveal delay={120} mode="opacity" className="xl:col-span-5 xl:-mr-[15%]">
              <ProductSurface state="pending" aspect="16:10" aspectMobile="4:5" label={d.common.pending.productView} frame="browser" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H-02 Orientation rail */}
      <Section rhythm="compact" hairline labelledBy="rail-h">
        <div className="container-default">
          <h2 id="rail-h" className="sr-only">{h.rail.heading}</h2>
          <Reveal mode="opacity" as="ul" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-y-0 xl:gap-x-8">
            {h.rail.items.map((it, i) => (
              <li key={i} className="py-4 border-t border-line-hairline first:border-t-0 md:border-t md:[&:nth-child(-n+2)]:border-t-0 xl:border-t-0 xl:border-l xl:first:border-l-0 xl:pl-6 xl:first:pl-0 xl:py-1">
                <p className="t-eyebrow text-text-muted">{it.eyebrow}</p>
                <p className="mt-2 t-body-s text-text-secondary">{it.line}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* H-03 The cost of the gap */}
      <Section rhythm="feature" surface="raised" labelledBy="gap-h">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-8">
              <Reveal>
                <SectionHead eyebrow={h.gap.eyebrow} title={h.gap.h2} lead={h.gap.lead} id="gap-h" />
              </Reveal>
              <dl className="mt-12 hairline-list border-y border-line-hairline">
                {h.gap.ledger.map((row, i) => (
                  <Reveal key={i} delay={i * 60} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 py-5">
                    <div>
                      <dt className="t-heading-m text-text-primary">{row.title}</dt>
                      <dd className="mt-1 t-body-s text-text-secondary">{row.detail}</dd>
                    </div>
                    <dd className="t-caption text-text-muted md:text-right">{row.marker}</dd>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={240}><p className="mt-10 t-body-l text-text-primary measure-lead">{h.gap.close}</p></Reveal>
            </div>
            <div className="hidden xl:block xl:col-span-4" aria-hidden="true" />
          </div>
        </div>
      </Section>

      {/* H-04 Sixty seconds */}
      <Section rhythm="default" labelledBy="film-h">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={h.film.eyebrow} title={h.film.h2} lead={h.film.body} id="film-h" /></Reveal>
        </div>
        <div className="container-wide mt-12">
          <Reveal mode="opacity">
            <VideoSlot id="V-01" locale={locale} caption={h.film.caption} fallbackHref={p("/contact")} fallbackText={d.common.pending.filmFallback} />
          </Reveal>
        </div>
      </Section>

      {/* H-05 The operating picture */}
      <Section rhythm="feature" hairline labelledBy="picture-h">
        <div className="container-default">
          <Split
            ratio="5/7"
            mediaSide="right"
            text={
              <Reveal>
                <SectionHead eyebrow={h.picture.eyebrow} title={h.picture.h2} lead={h.picture.lead} id="picture-h" />
                <Caption className="mt-6">{h.picture.qualifier}</Caption>
              </Reveal>
            }
            media={
              <Reveal delay={120} mode="opacity" className="border border-line-hairline p-6 xl:p-10 bg-surface-canvas">
                <span className="inline-flex h-6 items-center rounded-sm border border-line-interactive px-2 t-caption text-text-secondary mb-6">{d.common.illustrative}</span>
                <OperatingMap nodes={h.picture.nodes} label={h.picture.pathLabel} nextFrom={h.picture.nextFrom} legend={h.picture.legend} />
              </Reveal>
            }
          />
        </div>
      </Section>

      {/* H-06, H-07, H-08 Chapters */}
      {(
        [
          { c: h.chapters.one, side: "right" as const, ratio: "7/5" as const, slug: "ai-sales-agent", ps: "PS-02" },
          { c: h.chapters.two, side: "left" as const, ratio: "5/7" as const, slug: "lead-intelligence", ps: "PS-03" },
          { c: h.chapters.three, side: "right" as const, ratio: "7/5" as const, slug: "property-matching", ps: "PS-04" },
        ] as const
      ).map(({ c, side, ratio, slug }, i) => (
        <Section key={slug} rhythm="feature" surface={i === 1 ? "raised" : "canvas"} hairline={i !== 1} labelledBy={`ch-${i}`}>
          <div className="container-default">
            <Split
              ratio={ratio}
              mediaSide={side}
              text={
                <Reveal>
                  <p className="t-eyebrow text-text-accent" aria-hidden="true">{c.marker} · {c.area}</p>
                  <Display size="m" id={`ch-${i}`} className="mt-4">{c.h2}</Display>
                  <Lead className="mt-6">{c.lead}</Lead>
                  <ul className="mt-10 hairline-list border-y border-line-hairline">
                    {c.points.map((pt, j) => (
                      <li key={j} className="py-4 t-body-m text-text-secondary">{pt}</li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <ButtonLink href={p(`/platform/${slug}`)} variant="tertiary" className="hidden md:inline-flex">{c.cta}</ButtonLink>
                    <ButtonLink href={p(`/platform/${slug}`)} variant="secondary" full className="md:hidden">{c.cta}</ButtonLink>
                  </div>
                </Reveal>
              }
              media={
                <Reveal delay={120} mode="opacity" className={side === "right" ? "xl:-mr-[12%]" : "xl:-ml-[12%]"}>
                  <ProductSurface state="pending" aspect="4:3" aspectMobile="4:5" label={d.common.pending.productView} frame="browser" />
                </Reveal>
              }
            />
          </div>
        </Section>
      ))}

      {/* H-09 Where the work happens. Ivory band, the page's only photography. */}
      <Section rhythm="feature" surface="ivory" labelledBy="ctx-h">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">
            <div className="xl:col-span-5 xl:-ml-[var(--gutter)]">
              <ImageSlot id="IMG-01" locale={locale} aspectOverride="3:4" className="max-xl:aspect-[4/5]" />
            </div>
            <Reveal className="xl:col-span-7">
              <SectionHead eyebrow={h.context.eyebrow} title={h.context.h2} lead={h.context.lead} id="ctx-h" />
              <ul className="mt-10 hairline-list border-y border-line-hairline">
                {h.context.items.map((it) => (
                  <li key={it.title} className="py-4">
                    <p className="t-heading-s text-text-primary">{it.title}</p>
                    <p className="mt-1 t-body-s text-text-secondary">{it.line}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* H-10 Hand over: assistant */}
      <Section rhythm="default" labelledBy="asst-h">
        <div className="container-default">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            <Reveal className="xl:col-span-8">
              <SectionHead eyebrow={h.assistant.eyebrow} title={h.assistant.h2} lead={h.assistant.lead} id="asst-h" />
              <ul className="mt-8 flex flex-wrap gap-2">
                {h.assistant.examples.map((ex) => (
                  <li key={ex} className="rounded-sm border border-line-hairline px-3 py-2 t-body-s text-text-secondary">{ex}</li>
                ))}
              </ul>
              <Caption className="mt-3">{h.assistant.examplesNote}</Caption>
              <StatusNote status="final_acceptance" locale={locale} className="mt-6" />
            </Reveal>
            <div className="xl:col-span-4 xl:pt-10">
              <ButtonLink href={p("/platform/daily-assistant")} variant="secondary" full>{h.assistant.cta}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Both halves: certified internally, external approval pending */}
      <Section rhythm="default" surface="raised" labelledBy="next-h">
        <div className="container-default">
          <Reveal><SectionHead eyebrow={h.next.eyebrow} title={h.next.h2} lead={h.next.lead} id="next-h" /></Reveal>
          <ul className="mt-12 hairline-list border-y border-line-hairline">
            {h.next.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 60} as="li" className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_1fr] gap-2 md:gap-8 py-5">
                <p className="t-heading-s text-text-primary">{it.title}</p>
                <p className="t-body-m text-text-secondary">{it.line}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* H-11 Access */}
      <Section rhythm="default" hairline labelledBy="access-h">
        <div className="container-text !mx-0 xl:!mx-auto">
          <Reveal><SectionHead eyebrow={h.access.eyebrow} title={h.access.h2} id="access-h" /></Reveal>
          <ol className="mt-12 hairline-list border-y border-line-hairline">
            {h.access.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} as="li" className="py-6">
                <p className="t-caption tnum text-text-muted">0{i + 1}</p>
                <Heading size="m" className="mt-2">{s.title}</Heading>
                <p className="mt-2 t-body-s text-text-secondary">{s.line}</p>
              </Reveal>
            ))}
          </ol>
          <CtaRow className="mt-12">
            <ButtonLink href={p("/signup")}>{d.common.startFree}</ButtonLink>
            <ButtonLink href={p("/packages")} variant="secondary">{d.common.seePackages}</ButtonLink>
          </CtaRow>
        </div>
      </Section>

      {/* H-12 Closing */}
      <Section rhythm="feature" surface="deep" labelledBy="close-h">
        <div className="container-text text-center">
          <Reveal mode="opacity">
            <Display size="l" id="close-h" className="mx-auto max-w-[24ch]">{h.closing.h2}</Display>
            <p className="mt-6 t-body-l text-text-secondary mx-auto max-w-[52ch]">{h.closing.body}</p>
            <CtaRow align="center" className="mt-12">
              <ButtonLink href={p("/signup")} size="lg">{d.common.startFree}</ButtonLink>
              <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
            </CtaRow>
            <Caption className="mt-4">{h.closing.caption}</Caption>
          </Reveal>
        </div>
      </Section>
      <Link href={p("/platform")} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:bg-surface-raised focus:px-4 focus:py-3 t-body-s">{d.common.explorePlatform}</Link>
    </>
  );
}
