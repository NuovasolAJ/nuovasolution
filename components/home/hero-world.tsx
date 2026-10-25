import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, Mail, MessageCircle, Phone, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { channels, heroWords, storyWords, type ChannelKey } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { DuskPhoto, Ridges, RidgesFar, Stars } from "./hero-world-layers";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (master order 2026-10-10 §1; R19 closing order 2026-10-19 §2, §3, §4; R24 owner pictures 01 and 02 of 24.10.):
 * a premium real estate world with the product in the middle, and the product showing work that is done.
 *
 *   far     a few stars, the slowest layer
 *   sky     a coast at dusk, toned to the anthracite of the page
 *   land    the far range, the water, the headland with its tree line (hero-world-layers.tsx)
 *   panel   one large product surface, scrolling with the page: the situation in one line, the customer's question,
 *           the reply with the listing's own data and one question back, and the customer's record as it stands after
 *           that reply (what she wants, her budget, her language) with the alert the team received, the limit line
 *   ground  the page's ivory, which the hero ends on with one straight edge: the panel's foot stands on it (R24: a
 *           clean transition, no foreground scrub and no fog under the panel)
 *
 * On scroll the layers move apart (depth-scene.tsx measures, globals.css moves) and the panel comes upright from a
 * light lean and grows a little: the mechanics of Container Scroll Animation by Manu Arora (Aceternity, MIT,
 * https://21st.dev/@manuarora700/components/container-scroll-animation), driven by the scene's own scroll measure.
 * The lean is small (R24: the hero readable earlier), so the panel's head is on the first screen at 1366 × 768.
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
  const fields = l(w.record.fields);

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
            {/* The ground under the panel's foot is the page's ivory, with one straight edge: the light the panel opens into. */}
            <div className="hero-world-ground" aria-hidden="true" />

            {/* 4 The panel: scrolls with the page, comes upright and grows. */}
            <figure aria-label={l(w.surfaceLabel)} className="hero-panel" data-hero-panel>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-100 px-5 py-3 md:px-7">
                <p className="min-w-0 text-[0.9375rem] font-medium text-ink-950">{l(sw.common.assistant)}</p>
                <ul className="order-3 flex basis-full flex-wrap items-center gap-1.5 md:order-none md:ml-2 md:basis-auto" aria-label={l(sw.common.channelLabel)}>
                  {/* COPY_SYNC_1023 W-4: only WhatsApp and e-mail in the first screen; the web form and the call stay in story A as prototypes */}
                  {channels.filter((c) => c.key === "whatsapp" || c.key === "email").map((c) => {
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
                <div className="space-y-4 px-5 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
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

                {/* The customer's record as it stands after the reply (R24, owner: the record instead of three general checks): the
                    record fills after the reply, field by field, then the alert the team received. */}
                <div className="space-y-3 border-t border-ink-100 bg-[#f6f4ee] px-5 pb-6 pt-5 md:border-l md:border-t-0 md:px-7 md:pb-7 md:pt-6">
                  <StepLabel n={3} className="seq-item" style={delay(2750)}>{l(w.labels.done)}</StepLabel>
                  <div className="seq-item hero-record" data-seq-kind="pop" style={delay(2950)} data-hero-results data-hero-record>
                    <div className="hero-record-head">
                      <p className="t-eyebrow text-[0.6875rem] text-ink-600">{l(w.record.title)}</p>
                      <p className="mt-1 text-[1rem] font-semibold leading-snug text-ink-950">{l(w.record.who)}</p>
                      <p className="tnum text-[0.8125rem] leading-snug text-ink-600" data-hero-result={1}>{l(w.record.updated)}</p>
                    </div>
                    <dl className="hero-record-fields">
                      {fields.map((f, i) => (
                        <div key={f.k} className="seq-item hero-result" style={delay(3300 + i * 320)} data-hero-result={i + 2}>
                          <dt className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-ink-600">{f.k}</dt>
                          <dd className="text-[0.9375rem] font-medium leading-snug text-ink-950">{f.v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="seq-item hero-record-alert" data-seq-kind="pop" style={delay(4400)} data-hero-alert data-hero-result={5}>
                      <span aria-hidden="true" className="hero-result-mark"><Mail size={11} strokeWidth={2.4} /></span>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-950">{l(w.record.alert)}</span>
                        <span className="block text-[0.8125rem] leading-snug text-ink-700">{l(w.record.alertWhy)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="flex items-center gap-2 border-t border-ink-100 px-5 py-3 text-[0.875rem] leading-snug text-ink-800 md:px-7" data-hero-state><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill border-[1.5px] border-ink-500" />{l(w.stateToday)}</p>
            </figure>
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
