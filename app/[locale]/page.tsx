import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroWorld } from "@/components/home/hero-world";
import { ProductDemo } from "@/components/home/product-demo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home, the excerpt the owner decides on first (order 2026-10-05 §1 and §10): the hero as one spatial
 * scene and, directly under it, the interactive product demonstration; then the trial, offered again
 * after the benefit has been shown. Nothing else is on the page until the owner has seen this: the
 * modules, the Daily flow, the packages and the FAQ follow in the same direction after the feedback.
 *
 *   1 Hero    dark anthracite · sky, coast, village, the product panel, foreground (components/home/hero-world.tsx)
 *   2 Demo    warm ivory · one case in four large views, chosen by hand or played (components/home/product-demo.tsx)
 *   3 Offer   warm ivory · one line, the trial
 *
 * The style foundation v3 (tokens in globals.css) applies to every document that contains [data-style="v3"].
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;
  const v3 = h.v3;
  // The conversation as the product writes it today: Spanish, on both language versions.
  const es = getDictionary("es").home.hero.cards;

  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined}>
      <HeroWorld locale={locale} />

      {/* 2 The demonstration. The ivory ground rises over the hero's foot with rounded shoulders. */}
      <section id="demo" aria-labelledby="demo-h" className="relative z-[5] -mt-7 scroll-mt-[var(--header-h)] rounded-t-[28px] bg-[color:var(--surface-canvas)] pb-[var(--section-default)] pt-[var(--section-default)] md:rounded-t-[40px]">
        <div className="container-default">
          <Reveal className="max-w-[720px]">
            <p className="t-eyebrow text-text-accent">{v3.demo.eyebrow}</p>
            <h2 id="demo-h" className="mt-4 t-display-l text-text-primary">{v3.demo.h2}</h2>
            <p className="state-line mt-5" data-state="available">{v3.demo.state}</p>
          </Reveal>
          <div className="mt-10 xl:mt-14">
            <ProductDemo
              story={v3.story}
              chat={{ enquiry: es.enquiry.text, reply: es.answer.text, notice: es.answer.disclosure }}
              labels={{
                steps: v3.demo.steps,
                kind: v3.demo.kindReal,
                short: v3.demo.short,
                full: v3.demo.full,
                fullHide: v3.demo.fullHide,
                fullTitle: v3.demo.fullTitle,
                controls: v3.demo.controls,
                record: { ...v3.demo.record, heading: v3.hero.labels.crm },
                task: { ...v3.demo.task, take: h.hero.cards.task.action, state: h.hero.cards.task.state, title: h.hero.cards.task.title, reason: h.hero.cards.task.reason },
                assistant: h.views.conversation.assistant,
              }}
            />
          </div>
        </div>
      </section>

      {/* 3 The trial again, after the benefit has been shown (Copy's closing line, one button). */}
      <section aria-labelledby="offer-h" className="pb-[var(--section-default)]">
        <div className="container-default">
          <Reveal mode="opacity" className="border-t border-line-strong pt-[var(--section-compact)] text-center">
            <h2 id="offer-h" className="mx-auto max-w-[18ch] t-display-l text-text-primary">{h.closing.h2}</h2>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
            </div>
            <p className="mt-4 t-caption text-text-muted">{h.hero.note}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
