import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { FarArt, FrontLeftArt, FrontRightArt, MidLeftArt, MidRightArt, Stars } from "./hero-world-art";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (owner direction 2026-10-05): one spatial scene in four depths, not four cards.
 *
 *   1 far     the sky at dusk, mountain ridges, the coast and the sea
 *   2 mid     the hillsides with the white village
 *   3 panel   one large, legible Nuova panel: enquiry, reply, customer record, next step
 *   4 front   an olive tree, an agave, a terrace wall: they cover the panel's lower corners
 *
 * The headline and the buttons stand on the open sky; no foreground reaches them. The depth is in the
 * still picture (overlap, size, contrast) and on scroll the layers move apart (depth-scene.tsx measures,
 * globals.css moves). The panel leans back a little and comes upright as the page scrolls: the mechanics
 * of Container Scroll Animation by Manu Arora (Aceternity), https://21st.dev/@manuarora700/components/container-scroll-animation
 * (MIT) — perspective on the container, rotateX from tilted to flat, a layered shadow — driven by the
 * scene's own scroll measure instead of a second tracker, without the demo's tall spacers.
 * On a phone and with reduced motion the composition is the same; only the movement is less or none.
 *
 * The panel is a real product path with invented people: the reply in Spanish, the customer record and
 * the task exist in production (package matrix 2026-10-03). The conversation is in Spanish on both
 * language versions, because that is the language the product replies in, and every view names the same
 * person, property, day and language.
 */
const delay = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--seq-delay" as string]: `${ms}ms`, ...extra });

function StepLabel({ n, children, className, style }: { n: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p className={cn("flex items-baseline gap-2 text-[0.8125rem] font-medium leading-none text-ink-600", className)} style={style}>
      <span aria-hidden="true" className="tnum text-ink-400">0{n}</span>
      {children}
    </p>
  );
}

export function HeroWorld({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const h = d.home.hero;
  const t = d.home.v3.hero;
  const story = d.home.v3.story;
  const c = h.cards;
  // The conversation as the product writes it today: Spanish, on both language versions.
  const es = getDictionary("es").home.hero.cards;
  const p = (path: string) => localePath(locale, path);

  return (
    <section aria-labelledby="hero-h1" data-hero="dark" data-canvas="deep" className="hero-world">
      <DepthScene className="hero-world-scene">
        <Stars className="hero-world-stars" />

        <div className="container-default relative z-[2]">
          {/* The words, on the open sky. */}
          <div className="mx-auto max-w-[920px] text-center">
            <p className="t-eyebrow text-[color:var(--hero-accent)]">{h.eyebrow}</p>
            <h1 id="hero-h1" className="mt-4 t-display-xl">
              <span className="block text-[color:var(--hero-soft)]">{t.h1Soft}</span>
              <span className="block text-ivory">{t.h1}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[54ch] t-body-l text-ink-200" data-hero-lead>{t.lead}</p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-4">
              <a href="#demo" className="hero-cta-main" data-hero-cta="demo">
                {t.ctaDemo}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <ButtonLink href={p("/signup")} size="lg" variant="secondary" className="hero-cta-second">{startLabel(locale)}</ButtonLink>
            </div>
          </div>

          {/* 3 The panel. Its lower corners lie under the foreground, so nothing to read is put there. */}
          <div className="hero-world-stage" data-seq="run" data-hero-surface>
            {/* 1 Far: the last light, the ridges, the sea. Placed against the stage, so the horizon sits where the panel begins. */}
            <div className="hero-world-glow" aria-hidden="true" />
            <div data-depth-layer="far" className="hero-world-far"><FarArt className="h-full w-full" /></div>
            <div className="hero-world-land" aria-hidden="true" />
            {/* 2 Mid: the village hillsides, left and right of the panel. */}
            <div data-depth-layer="mid" className="hero-world-mid hero-world-mid-left"><MidLeftArt className="h-full w-full" /></div>
            <div data-depth-layer="mid" className="hero-world-mid hero-world-mid-right"><MidRightArt className="h-full w-full" /></div>

            <figure aria-label={t.surfaceLabel} className="hero-panel" data-hero-panel>
              <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-3.5 md:px-7">
                <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-pill bg-[color:var(--channel-whatsapp)]" />
                <p className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-ink-950">WhatsApp · {story.name}</p>
                <p className="hidden shrink-0 text-[0.8125rem] text-ink-500 md:block">{t.example}</p>
                <SeqReplay label={t.replay} compact />
              </div>

              <div className="grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                {/* The conversation */}
                <div className="space-y-4 px-5 py-5 md:px-7 md:pb-36 md:pt-6">
                  <StepLabel n={1}>{t.labels.enquiry}</StepLabel>
                  <div className="hero-bubble hero-bubble-in" data-hero-enquiry>
                    <p lang="es">{es.enquiry.text}</p>
                    <p className="hero-bubble-meta">{story.name} · {story.time}</p>
                  </div>

                  <StepLabel n={2} className="seq-item pt-1" style={delay(600)}>{t.labels.reply}</StepLabel>
                  <div className="relative flex justify-end">
                    <span className="seq-typing typing hero-bubble hero-bubble-out absolute right-0 top-0 items-center gap-1" style={delay(600, { ["--seq-typing-for" as string]: "1400ms" })} aria-hidden="true">
                      <i>●</i><i>●</i><i>●</i>
                    </span>
                    <div className="seq-item hero-bubble hero-bubble-out" style={delay(1950)} data-hero-reply>
                      <p className="mb-1 text-[0.8125rem] font-semibold text-[color:var(--channel-whatsapp-ink)]">{d.home.views.conversation.assistant}</p>
                      <p lang="es">{es.answer.text}</p>
                      <p className="hero-bubble-meta">{story.time}</p>
                    </div>
                  </div>
                </div>

                {/* What the agency has afterwards */}
                <div className="space-y-4 border-t border-ink-100 bg-[#f6f4ee] px-5 pb-32 pt-5 md:border-l md:border-t-0 md:px-7 md:pb-36 md:pt-6">
                  <StepLabel n={3} className="seq-item" style={delay(2750)}>{t.labels.crm}</StepLabel>
                  <div className="seq-item" style={delay(2850)} data-hero-crm>
                    <p className="text-[1.0625rem] font-semibold leading-tight text-ink-950">{story.name}</p>
                    <dl className="mt-3 divide-y divide-ink-100 border-y border-ink-100">
                      {story.fields.map((f, i) => (
                        <div key={f.k} className="seq-item flex gap-3 py-2 text-[0.875rem] leading-snug" style={delay(3050 + i * 150)}>
                          <dt className="w-[5.5rem] shrink-0 text-ink-500">{f.k}</dt>
                          <dd className="min-w-0 flex-1 font-medium text-ink-900">{f.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <StepLabel n={4} className="seq-item pt-1" style={delay(3900)}>{t.labels.next}</StepLabel>
                  <div className="seq-item hero-next" data-seq-kind="pop" style={delay(4000)} data-hero-task>
                    <p className="text-[0.9375rem] font-semibold leading-snug text-ink-950">{c.task.title}</p>
                    <p className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-[0.8125rem] leading-snug text-ink-600">{c.task.state}</span>
                      <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-ink-950 px-3 py-1.5 text-[0.8125rem] font-medium text-ivory">{c.task.action}<ArrowRight size={13} strokeWidth={2.25} /></span>
                    </p>
                  </div>
                </div>
              </div>

            </figure>

            {/* 4 Front: over the panel's lower corners, never over its story. */}
            <div data-depth-layer="front" className="hero-world-front hero-world-front-left"><FrontLeftArt className="h-full w-full" /></div>
            <div data-depth-layer="front" className="hero-world-front hero-world-front-right"><FrontRightArt className="h-full w-full" /></div>
            <div className="hero-world-ground" aria-hidden="true" />
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
