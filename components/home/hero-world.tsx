import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight, Mail, MessageCircle, Phone, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { channels, enquiries, heroWords, listings, people, storyWords, type ChannelKey } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { DuskPhoto, Ridges, Stars } from "./hero-world-layers";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (master order 2026-10-10 §1, §4): a premium real estate world with the product in the middle.
 *
 *   far     a coast at dusk, toned to the anthracite of the page
 *   mid     calm ridges where the sea meets the land
 *   panel   one large product surface: the enquiry that arrives while the agent is out, the reply in the
 *           customer's language, the record, the next step for the team
 *   front   two floating cards that tell the situation: the viewing in progress (left) and the four enquiries
 *           arriving on four channels (right). They lie over the panel's lower corners, never over its words.
 *
 * On scroll the layers move apart (depth-scene.tsx measures, globals.css moves) and the panel comes upright and
 * grows: the mechanics of Container Scroll Animation by Manu Arora (Aceternity, MIT,
 * https://21st.dev/@manuarora700/components/container-scroll-animation), driven by the scene's own scroll measure.
 * On a phone the cards stand under the panel; with reduced motion nothing moves and the picture is complete.
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
  const laura = enquiries[0];
  const viewing = listings.est118;
  const p = (path: string) => localePath(locale, path);
  const l = <T,>(x: Record<Locale, T>) => x[locale];

  return (
    <section aria-labelledby="hero-h1" data-hero="dark" data-canvas="deep" className="hero-world">
      <DepthScene className="hero-world-scene">
        {/* 1 Far: the dusk. */}
        <div data-depth-layer="far" className="hero-sky" aria-hidden="true">
          <DuskPhoto className="hero-sky-photo" />
          <div className="hero-sky-tone" />
        </div>
        <Stars className="hero-world-stars" />

        <div className="container-default relative z-[2]">
          {/* The words, on the open sky. */}
          <div className="mx-auto max-w-[960px] text-center">
            <p className="t-eyebrow text-[color:var(--hero-accent)]">{d.home.hero.eyebrow}</p>
            <h1 id="hero-h1" className="mt-4 t-display-xl text-ivory">
              <span className="block text-[color:var(--hero-soft)]">{l(w.h1Soft)}</span>
              <span className="block">{l(w.h1)}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[56ch] t-body-l text-ink-200" data-hero-lead>{l(w.lead)}</p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-4">
              <a href="#story" className="hero-cta-main" data-hero-cta="story">
                {l(w.ctaStory)}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <ButtonLink href={p("/signup")} size="lg" variant="secondary" className="hero-cta-second">{startLabel(locale)}</ButtonLink>
            </div>
            <p className="mt-4 t-caption text-ink-300" data-hero-trial>{l(w.trialLine)}</p>
          </div>

          <div className="hero-world-stage" data-seq="run" data-hero-surface>
            {/* 2 Mid: the ridges where the sea meets the land. */}
            <div data-depth-layer="mid" className="hero-ridges" aria-hidden="true"><Ridges className="h-full w-full" /></div>
            <div className="hero-world-land" aria-hidden="true" />

            {/* 3 The panel. */}
            <figure aria-label={l(w.surfaceLabel)} className="hero-panel" data-hero-panel>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-100 px-5 py-3 md:px-7">
                <p className="min-w-0 text-[0.9375rem] font-medium text-ink-950">{l(sw.common.assistant)}</p>
                <ul className="order-3 flex basis-full flex-wrap items-center gap-1.5 md:order-none md:ml-2 md:basis-auto" aria-label={l(sw.common.channelLabel)}>
                  {channels.map((c) => {
                    const Icon = ICON[c.key];
                    const on = c.key === laura.channel;
                    return (
                      <li key={c.key} className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.75rem] font-medium", on ? "bg-[color:var(--channel-whatsapp)] text-white" : "bg-ink-100 text-ink-700")} data-hero-channel={c.key} aria-current={on ? "true" : undefined}>
                        <Icon size={12} strokeWidth={2.2} aria-hidden="true" />{l(c.name)}
                      </li>
                    );
                  })}
                </ul>
                <p className="ml-auto hidden shrink-0 text-[0.8125rem] text-ink-600 lg:block">{l(sw.common.example)}</p>
                <SeqReplay label={l(w.replay)} compact />
              </div>

              <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                {/* The conversation, in the customer's language */}
                <div className="space-y-4 px-5 pb-6 pt-5 md:px-7 md:pb-10 md:pt-6">
                  <StepLabel n={1}>{l(w.labels.enquiry)} · {l(laura.time)}</StepLabel>
                  <div className="hero-bubble hero-bubble-in" data-hero-enquiry>
                    <p lang={laura.lang}>{laura.text}</p>
                    <p className="hero-bubble-meta">{laura.who} · {l(laura.role)}</p>
                  </div>

                  <StepLabel n={2} className="seq-item pt-1" style={delay(600)}>{l(w.labels.reply)} · {l(laura.language)}</StepLabel>
                  <div className="relative flex justify-end">
                    <span className="seq-typing typing hero-bubble hero-bubble-out absolute right-0 top-0 items-center gap-1" style={delay(600, { ["--seq-typing-for" as string]: "1400ms" })} aria-hidden="true">
                      <i>●</i><i>●</i><i>●</i>
                    </span>
                    <div className="seq-item hero-bubble hero-bubble-out" style={delay(1950)} data-hero-reply>
                      <p className="mb-1 text-[0.8125rem] font-semibold text-[color:var(--channel-whatsapp-ink)]">{l(sw.common.assistant)}</p>
                      <p lang={laura.lang}>{laura.reply}</p>
                      <p className="hero-bubble-meta">{l(laura.time)}</p>
                    </div>
                  </div>
                </div>

                {/* What the agency has afterwards */}
                <div className="space-y-4 border-t border-ink-100 bg-[#f6f4ee] px-5 pb-6 pt-5 md:border-l md:border-t-0 md:px-7 md:pb-10 md:pt-6">
                  <StepLabel n={3} className="seq-item" style={delay(2750)}>{l(w.labels.crm)}</StepLabel>
                  <div className="seq-item" style={delay(2850)} data-hero-crm>
                    <p className="text-[1.0625rem] font-semibold leading-tight text-ink-950">{laura.who}</p>
                    <dl className="mt-3 divide-y divide-ink-100 border-y border-ink-100">
                      {laura.recorded.map((f, i) => (
                        <div key={l(f.k)} className="seq-item flex gap-3 py-2 text-[0.875rem] leading-snug" style={delay(3050 + i * 150)}>
                          <dt className="w-[6rem] shrink-0 text-ink-600">{l(f.k)}</dt>
                          <dd className="min-w-0 flex-1 font-medium text-ink-900">{l(f.v)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <StepLabel n={4} className="seq-item pt-1" style={delay(3900)}>{l(w.labels.next)}</StepLabel>
                  <div className="seq-item hero-next" data-seq-kind="pop" style={delay(4000)} data-hero-task>
                    <p className="text-[0.9375rem] font-semibold leading-snug text-ink-950">{l(w.taskTitle)}</p>
                    <p className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-[0.8125rem] leading-snug text-ink-600">{l(w.taskFor)}</span>
                      <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-ink-950 px-3 py-1.5 text-[0.8125rem] font-medium text-ivory">{l(w.taskAction)}<ArrowRight size={13} strokeWidth={2.25} /></span>
                    </p>
                  </div>
                </div>
              </div>
            </figure>

            {/* 4 Front: the situation, as two cards over the panel's lower corners. */}
            <aside data-depth-layer="front" className="hero-float hero-float-left" aria-label={l(sw.situation.viewing)} data-hero-float="viewing">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viewing.photo} alt={l(viewing.photoAlt)} width={800} height={533} loading="eager" decoding="async" className="hero-float-photo" />
              <div className="p-3.5">
                <p className="flex items-center gap-2 text-[0.75rem] font-medium text-ink-600"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[color:var(--signal-attention)]" />{l(sw.situation.viewing)} · {l(sw.situation.now)}</p>
                <p className="mt-1 text-[0.9375rem] font-semibold leading-snug text-ink-950">{viewing.ref} · {l(viewing.place)}</p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-600">{people.agent.name} · 11:00–12:00</p>
              </div>
            </aside>
            <aside data-depth-layer="front" className="hero-float hero-float-right" aria-label={l(sw.situation.arriving)} data-hero-float="arrivals">
              <p className="px-3.5 pt-3 text-[0.75rem] font-medium text-ink-600">{l(sw.situation.arriving)}</p>
              <ul className="px-3.5 pb-3 pt-1">
                {enquiries.map((e, i) => {
                  const Icon = ICON[e.channel];
                  return (
                    <li key={e.channel} className="seq-item flex items-center gap-2.5 py-1.5 text-[0.8125rem]" style={delay(300 + i * 500)}>
                      <span aria-hidden="true" className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill", e.channel === "whatsapp" ? "bg-[color:var(--channel-whatsapp)] text-white" : "bg-ink-100 text-ink-700")}><Icon size={12} strokeWidth={2.2} /></span>
                      <span className="min-w-0 flex-1 truncate font-medium text-ink-950">{e.who}</span>
                      <span className="shrink-0 tnum text-ink-600">{l(e.time).split(" ")[1]} · {l(e.language)}</span>
                    </li>
                  );
                })}
              </ul>
            </aside>
            <div className="hero-world-ground" aria-hidden="true" />
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
