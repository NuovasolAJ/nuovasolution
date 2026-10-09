import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { scenes, sceneWords } from "@/lib/content/home-scenes";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroWorld } from "@/components/home/hero-world";
import { ProductScenes, type SceneView, type SceneWords } from "@/components/home/product-scenes";
import { PackageMatrix } from "@/components/home/package-matrix";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home (owner follow-up order 2026-10-06):
 *
 *   1 Hero       dark anthracite · the spatial scene with the product panel (components/home/hero-world.tsx)
 *   2 Scenes     warm ivory · five demonstrations in the same page context (components/home/product-scenes.tsx)
 *   3 Trial      the general entry: 14 days, no card, the real steps in their real order
 *   4 Packages   three packages, each on top of the last, with their honest state; 3D on its own
 *
 * The style foundation v3 (tokens in globals.css) applies to every document that contains [data-style="v3"].
 */
function localize(locale: Locale): { views: SceneView[]; words: Omit<SceneWords, "controls" | "short" | "full" | "fullHide" | "fullTitle" | "assistant" | "record" | "task"> } {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = sceneWords;
  return {
    views: scenes.map((s) => ({ key: s.key, tab: l(s.tab), title: l(s.title), line: l(s.line), kind: s.kind, state: l(s.state), steps: s.steps.map((st) => ({ title: l(st.title), line: l(st.line) })) })),
    words: {
      kindReal: l(w.kindReal),
      kindPrototype: l(w.kindPrototype),
      illustrative: l(w.illustrative),
      entry: { label: l(w.entry.label), whatsapp: l(w.entry.whatsapp), phone: l(w.entry.phone) },
      phone: { incoming: l(w.phone.incoming), caller: l(w.phone.caller), noted: l(w.phone.noted), wish: l(w.phone.wish), state: l(w.phone.state) },
      match: { wish: l(w.match.wish), from: l(w.match.from), criteria: l(w.match.criteria), cards: l(w.match.cards), reply: l(w.match.reply), channel: l(w.match.channel), photo: l(w.match.photo) },
      team: { morning: l(w.team.morning), arrived: l(w.team.arrived), items: l(w.team.items), priority: l(w.team.priority), why: l(w.team.why), take: l(w.team.take), taken: l(w.team.taken), complete: l(w.team.complete), done: l(w.team.done), open: l(w.team.open), again: l(w.team.again), whatsappNote: l(w.team.whatsappNote) },
      social: { listing: l(w.social.listing), listingMeta: l(w.social.listingMeta), draft: l(w.social.draft), caption: l(w.social.caption), approve: l(w.social.approve), approved: l(w.social.approved), comment: l(w.social.comment), commenter: l(w.social.commenter), reply: l(w.social.reply), replyMeta: l(w.social.replyMeta), record: l(w.social.record), recordLines: l(w.social.recordLines) },
      model: { plan: l(w.model.plan), model: l(w.model.model), compare: l(w.model.compare), floors: l(w.model.floors), furniture: l(w.model.furniture), on: l(w.model.on), off: l(w.model.off), rooms: l(w.model.rooms), note: l(w.model.note), sent: l(w.model.sent) },
    },
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  const h = d.home;
  const v3 = h.v3;
  // The conversation as the product writes it today: Spanish, on both language versions.
  const es = getDictionary("es").home.hero.cards;
  const { views, words } = localize(locale);

  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined}>
      <HeroWorld locale={locale} />

      {/* 2 The five scenes. The ivory ground rises over the hero's foot with rounded shoulders. */}
      <section id="demo" aria-labelledby="demo-h" className="relative z-[5] -mt-7 scroll-mt-[var(--header-h)] rounded-t-[28px] bg-[color:var(--surface-canvas)] pb-[var(--section-default)] pt-[var(--section-default)] md:rounded-t-[40px]">
        <div className="container-default">
          <Reveal className="max-w-[720px]">
            <p className="t-eyebrow text-text-accent">{v3.demo.eyebrow}</p>
            <h2 id="demo-h" className="mt-4 t-display-l text-text-primary">{v3.demo.h2}</h2>
            <p className="mt-5 t-body-l text-text-secondary">{v3.demo.lead}</p>
          </Reveal>
          <div className="mt-10 xl:mt-12">
            <ProductScenes
              scenes={views}
              story={v3.story}
              chat={{ enquiry: es.enquiry.text, reply: es.answer.text, notice: es.answer.disclosure }}
              words={{
                ...words,
                controls: v3.demo.controls,
                short: v3.demo.short,
                full: v3.demo.full,
                fullHide: v3.demo.fullHide,
                fullTitle: v3.demo.fullTitle,
                assistant: h.views.conversation.assistant,
                record: { ...v3.demo.record, heading: v3.hero.labels.crm },
                task: { ...v3.demo.task, take: h.hero.cards.task.action, state: h.hero.cards.task.state, title: h.hero.cards.task.title, reason: h.hero.cards.task.reason },
              }}
            />
          </div>
        </div>
      </section>

      {/* 3 The trial: the general entry, the real steps in their real order. */}
      <section aria-labelledby="offer-h" className="pb-[var(--section-default)]">
        <div className="container-default">
          <Reveal mode="opacity" className="grid gap-10 border-t border-line-strong pt-[var(--section-compact)] xl:grid-cols-12 xl:gap-16">
            <div className="xl:col-span-5">
              <h2 id="offer-h" className="max-w-[18ch] t-display-l text-text-primary">{h.closing.h2}</h2>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
                <p className="t-body-s font-medium text-text-secondary" data-offer-line>{v3.offer.line}</p>
              </div>
            </div>
            <div className="xl:col-span-7">
              <p className="t-caption font-medium text-text-muted">{v3.offer.stepsTitle}</p>
              <ol className="mt-3 divide-y divide-line-hairline border-y border-line-hairline" data-offer-steps>
                {v3.offer.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4">
                    <span className="tnum pt-0.5 t-caption text-text-accent">0{i + 1}</span>
                    <span><span className="block t-heading-s text-text-primary">{s.title}</span><span className="mt-1 block t-body-s text-text-secondary">{s.line}</span></span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 t-caption text-text-muted">{v3.offer.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 The packages */}
      <section id="packages" aria-labelledby="packages-h" className="scroll-mt-[var(--header-h)] pb-[var(--section-default)]">
        <div className="container-default">
          <Reveal className="max-w-[720px]">
            <p className="t-eyebrow text-text-accent">{v3.packages.eyebrow}</p>
            <h2 id="packages-h" className="mt-4 t-display-l text-text-primary">{v3.packages.h2}</h2>
            <p className="mt-5 t-body-l text-text-secondary">{v3.packages.lead}</p>
          </Reveal>
          <div className="mt-10">
            <PackageMatrix locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
