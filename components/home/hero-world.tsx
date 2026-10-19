import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, Check, Mail, MessageCircle, Phone, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { channels, heroWords, storyWords, type ChannelKey } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { DuskPhoto, Foreground, Ridges, RidgesFar, Stars } from "./hero-world-layers";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (master order 2026-10-10 §1; R19 closing order 2026-10-19 §2, §3, §4): a premium real estate world with the
 * product in the middle, and the product showing work that is done.
 *
 *   far     a few stars, the slowest layer
 *   sky     a coast at dusk, toned to the anthracite of the page
 *   land    the far range, the water, the headland with its tree line (hero-world-layers.tsx)
 *   panel   one large product surface, scrolling with the page: the situation in one line, the customer's question,
 *           the reply with the listing's own data and one question back, and what is already done (what she wants is
 *           saved, the record is updated, the team is alerted with the reason), the limit line
 *   front   the near ground in front of the panel's foot; it frames the entry and sinks away as the panel stands up
 *
 * On scroll the layers move apart (depth-scene.tsx measures, globals.css moves) and the panel comes upright from a
 * visible lean and grows: the mechanics of Container Scroll Animation by Manu Arora (Aceternity, MIT,
 * https://21st.dev/@manuarora700/components/container-scroll-animation), driven by the scene's own scroll measure.
 * The ground under the panel's foot turns into the page's ivory inside the hero, so the panel opens the light page.
 * With reduced motion nothing moves and the picture is complete.
 */
const ICON: Record<ChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };
const delay = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--seq-delay" as string]: `${ms}ms`, ...extra });

function StepLabel({ n, children, className, style }: { n: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p className={cn("flex items-baseline gap-2 text-[0.8125rem] font-medium leading-none text-ink-600", className)} style={style}>
      <span aria-hidden="true" className="tnum text-ink-500">0{n}</span>
      {children}
    </p>
  );
}

export function HeroWorld({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const w = heroWords;
  const sw = storyWords;
  const p = (path: string) => localePath(locale, path);
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const es = locale === "es";
  const results = l(w.results);

  return (
    <section aria-labelledby="hero-h1" data-hero="dark" data-canvas="deep" className="hero-world">
      <DepthScene className="hero-world-scene">
        {/* 1 Far: the stars, slowest of all. 2 Sky: the coast at dusk. */}
        <div data-depth-layer="sky" className="hero-sky" aria-hidden="true">
          <DuskPhoto className="hero-sky-photo" />
          <div className="hero-sky-tone" />
        </div>
        <Stars className="hero-world-stars" data-depth-layer="far" />

        <div className="container-default relative z-[2]">
          {/* The words, on the open sky. */}
          <div className="mx-auto max-w-[960px] text-center">
            <p className="t-eyebrow text-[color:var(--hero-accent)]">{d.home.hero.eyebrow}</p>
            <h1 id="hero-h1" className="mt-4 t-display-xl text-ivory">
              <span className="block text-[color:var(--hero-soft)]">{l(w.h1Soft)}</span>
              <span className="block">{l(w.h1)}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[54ch] t-body-m text-ink-200 md:t-body-l" data-hero-lead>{l(w.lead)}</p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-4">
              <a href="#story" className="hero-cta-main" data-hero-cta="story">
                {l(w.ctaStory)}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <ButtonLink href={p("/signup")} size="lg" variant="secondary" className="hero-cta-second">{startLabel(locale)}</ButtonLink>
            </div>
            <p className="mt-4 t-caption text-ink-300" data-hero-trial>{l(w.trialLine)}</p>
          </div>

          <div className="hero-world-stage" data-seq="run" data-hero-surface>
            {/* 3 The land: the far range and the water, then the headland the panel stands against. */}
            <div className="hero-ridges-far" aria-hidden="true"><RidgesFar className="h-full w-full" /></div>
            <div data-depth-layer="mid" className="hero-ridges" aria-hidden="true"><Ridges className="h-full w-full" /></div>
            <div className="hero-world-land" aria-hidden="true" />
            {/* The ground under the panel's foot is already the page's ivory: the light the panel opens into. */}
            <div className="hero-world-ground" aria-hidden="true" />

            {/* 4 The panel: scrolls with the page, comes upright and grows. */}
            <figure aria-label={l(w.surfaceLabel)} className="hero-panel" data-hero-panel>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-100 px-5 py-3 md:px-7">
                <p className="min-w-0 text-[0.9375rem] font-medium text-ink-950">{l(sw.common.assistant)}</p>
                <ul className="order-3 flex basis-full flex-wrap items-center gap-1.5 md:order-none md:ml-2 md:basis-auto" aria-label={l(sw.common.channelLabel)}>
                  {channels.map((c) => {
                    const Icon = ICON[c.key];
                    const on = c.key === "whatsapp";
                    return (
                      <li key={c.key} className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.75rem] font-medium", on ? "bg-[color:var(--channel-whatsapp-ink)] text-white" : "bg-ink-100 text-ink-700")} data-hero-channel={c.key} aria-current={on ? "true" : undefined}>
                        <Icon size={12} strokeWidth={2.2} aria-hidden="true" />{l(c.name)}
                      </li>
                    );
                  })}
                </ul>
                <p className="ml-auto hidden shrink-0 text-[0.8125rem] text-ink-600 lg:block">{l(sw.common.example)}</p>
                <SeqReplay label={l(w.replay)} compact />
              </div>
              <p className="flex items-center gap-2 border-b border-ink-100 bg-[#f6f4ee] px-5 py-2 text-[0.8125rem] leading-snug text-ink-800 md:px-7" data-hero-situation><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" />{l(w.situationLine)}</p>

              <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                {/* The conversation: the question, the answer from the listing's data, one question back */}
                <div className="space-y-4 px-5 pb-6 pt-5 md:px-7 md:pb-8 md:pt-6">
                  <StepLabel n={1}>{l(w.labels.enquiry)} · {l(w.heroTime)}</StepLabel>
                  <div className="hero-bubble hero-bubble-in" data-hero-enquiry>
                    <p lang={es ? "es" : "en"}>{es ? w.heroEnquiry : w.heroEnquiryTranslated.en}</p>
                    <p className="hero-bubble-meta">{l(w.heroWho)}{es ? "" : " · written in Spanish, shown in English"}</p>
                  </div>

                  <StepLabel n={2} className="seq-item pt-1" style={delay(600)}>{l(w.labels.reply)} · {l(w.heroReplyTime)}</StepLabel>
                  <div className="relative flex justify-end">
                    <span className="seq-typing typing hero-bubble hero-bubble-out absolute right-0 top-0 items-center gap-1" style={delay(600, { ["--seq-typing-for" as string]: "1400ms" })} aria-hidden="true">
                      <i>●</i><i>●</i><i>●</i>
                    </span>
                    <div className="seq-item hero-bubble hero-bubble-out" style={delay(1950)} data-hero-reply>
                      <p className="mb-1 text-[0.8125rem] font-semibold text-[color:var(--channel-whatsapp-ink)]">{l(sw.common.assistant)}</p>
                      <p lang={es ? "es" : "en"}>{es ? w.heroReply : w.heroReplyTranslated.en}</p>
                      <p className="hero-bubble-meta">{l(w.heroReplyTime)}</p>
                    </div>
                  </div>
                </div>

                {/* What is already done: the results of the processing, each one appearing after the reply */}
                <div className="space-y-4 border-t border-ink-100 bg-[#f6f4ee] px-5 pb-6 pt-5 md:border-l md:border-t-0 md:px-7 md:pb-8 md:pt-6">
                  <StepLabel n={3} className="seq-item" style={delay(2750)}>{l(w.labels.done)}</StepLabel>
                  <ol className="space-y-2.5" data-hero-results>
                    {results.map((r, i) => (
                      <li key={r.k} className="seq-item hero-result" data-seq-kind="pop" style={delay(2950 + i * 420)} data-hero-result={i + 1}>
                        <span aria-hidden="true" className="hero-result-mark"><Check size={12} strokeWidth={3} /></span>
                        <span className="min-w-0">
                          <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-950">{r.k}</span>
                          <span className="block text-[0.8125rem] leading-snug text-ink-700">{r.v}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <p className="border-t border-ink-100 px-5 py-2.5 text-[0.75rem] leading-snug text-ink-600 md:px-7" data-hero-state>{l(w.stateToday)}</p>
            </figure>
            {/* The foreground: the layer in front of the panel's foot; it frames the entry and releases the panel on scroll. */}
            <div data-depth-layer="front" className="hero-world-front" aria-hidden="true"><Foreground className="h-full w-full" /></div>
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
