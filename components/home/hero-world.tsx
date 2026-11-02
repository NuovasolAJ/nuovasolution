import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight, Mail, MessageCircle, Phone, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { channels, heroWords, listings, storyWords, type ChannelKey } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { DepthPhoto } from "./hero-world-layers";
import { ListingCard } from "./listing-card";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (master order 2026-10-10 §1; the owner's binding closing order of 27.10.; the owner's order of 30.10., point 1):
 * a spatial product depiction in four layers that read as one space, and a five-second test in the words (for whom: real
 * estate agencies in Spain; what: enquiries on WhatsApp and email answered, recorded and handed to the right person; the
 * benefit: fewer enquiries left unattended).
 *
 *   1 depth    a home, far back and toned to the dusk (hero-world-layers.tsx): the living room of the listing Laura asks about
 *   2 object   the listing card of that flat, set back at the right and lowest (layer "far": it lags most behind the page)
 *   3 record   the customer's record as it stands after the reply, offset behind the app surface at the right (layer "mid")
 *   4 app      the app surface in front: the situation in one line, the customer's question, the reply (what is noted, who
 *              confirms the facts, one question back), the limit of today
 *
 * On scroll the layers move apart (depth-scene.tsx measures, globals.css moves) and the app surface comes upright from a light
 * lean; the depth dissolves into the page's canvas, which the lower half of the composition already stands on, so the hero
 * flows into the sequence below without an edge. The words stay put. With reduced motion nothing moves and the picture is
 * complete. On the phone the three surfaces stack in their own composition (no lean, the object card as a low row).
 */
const ICON: Record<ChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };
const delay = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--seq-delay" as string]: `${ms}ms`, ...extra });

function StepLabel({ n, children, className, style }: { n: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p className={cn("flex items-baseline gap-2 text-[0.875rem] font-medium leading-none text-ink-600", className)} style={style}>
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
        {/* 1 The depth: the home, far back, toned; it lags most behind the page and dissolves into the canvas. */}
        <div data-depth-layer="photo" className="hero-depth" aria-hidden="true" data-hero-layer="photo">
          <DepthPhoto className="hero-depth-photo" />
          <div className="hero-depth-tone" />
        </div>

        <div className="container-default relative z-[2]">
          {/* The words, on the dark ground: for whom, what, the benefit. */}
          <div className="hero-words mx-auto max-w-[960px] text-center" data-hero-words>
            <p className="t-eyebrow t-eyebrow-l text-[color:var(--hero-accent)]">{d.home.hero.eyebrow}</p>
            <h1 id="hero-h1" className="hero-h1 mt-4 t-display-xl text-ivory">
              <span className="block text-[color:var(--hero-soft)]">{l(w.h1Soft)}</span>
              <span className="block">{l(w.h1)}</span>
            </h1>
            <p className="hero-lead mx-auto mt-4 max-w-[58ch] t-body-m text-ink-200 md:t-body-l" data-hero-lead>{l(w.lead)}</p>
            <div className="hero-ctas mt-6 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-4">
              <a href="#sequence" className="hero-cta-main" data-hero-cta="story">
                {l(w.ctaStory)}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <ButtonLink href={p("/signup")} size="lg" variant="secondary" className="hero-cta-second">{startLabel(locale)}</ButtonLink>
            </div>
            <p className="mt-4 text-[0.875rem] text-ink-300" data-hero-trial>{l(w.trialLine)}</p>
          </div>

          <div className="hero-world-stage" data-seq="run" data-hero-surface>
            {/* The light pool under the composition: the page's canvas colour, so the hero ends on no edge. */}
            <div className="hero-world-land" aria-hidden="true" data-hero-layer="light" />

            {/* 4 The app surface in front: scrolls with the page, comes upright and grows. */}
            <figure aria-label={l(w.surfaceLabel)} className="hero-panel" data-hero-panel data-hero-layer="app">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-100 px-5 py-3 md:px-6">
                <p className="min-w-0 text-[0.9375rem] font-medium text-ink-950">{l(sw.common.assistant)}</p>
                <ul className="order-3 flex basis-full flex-wrap items-center gap-1.5 md:order-none md:ml-1 md:basis-auto" aria-label={l(sw.common.channelLabel)}>
                  {/* COPY_SYNC_1023 W-4: only WhatsApp and e-mail in the first screen; the web form and the call stay in story A as prototypes */}
                  {channels.filter((c) => c.key === "whatsapp" || c.key === "email").map((c) => {
                    const Icon = ICON[c.key];
                    const on = c.key === "whatsapp";
                    return (
                      <li key={c.key} className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.875rem] font-medium", on ? "bg-[color:var(--channel-whatsapp-ink)] text-white" : "bg-ink-100 text-ink-700")} data-hero-channel={c.key} aria-current={on ? "true" : undefined}>
                        <Icon size={12} strokeWidth={2.2} aria-hidden="true" />{l(c.name)}
                      </li>
                    );
                  })}
                </ul>
                <SeqReplay label={l(w.replay)} compact />
              </div>
              <p className="flex items-center gap-2 border-b border-ink-100 bg-[#f6f4ee] px-5 py-2.5 text-[0.875rem] leading-snug text-ink-800 md:px-6" data-hero-situation><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" />{l(w.situationLine)}</p>

              {/* The conversation: the question, the reply that notes what she asks for and asks one question back */}
              <div className="hero-panel-col space-y-4 px-5 pb-5 pt-5 md:px-6 md:pb-6">
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
                    <p className="mb-1 text-[0.875rem] font-semibold text-[color:var(--channel-whatsapp-ink)]">{l(sw.common.assistant)}</p>
                    <p lang={es ? "es" : "en"}>{es ? w.heroReply : w.heroReplyTranslated.en}</p>
                    <p className="hero-bubble-meta">{l(w.heroReplyTime)}</p>
                  </div>
                </div>
              </div>
              <p className="flex items-start gap-2 border-t border-ink-100 px-5 py-3 text-[0.875rem] leading-snug text-ink-800 md:px-6" data-hero-state><span aria-hidden="true" className="mt-[5px] h-2 w-2 shrink-0 rounded-pill border-[1.5px] border-ink-500" />{l(w.stateToday)}</p>
            </figure>

            {/* 3 and 2: the record and the object, offset behind the app surface at the right; on the phone they follow it. */}
            <div className="hero-side">
              <div className="hero-record-layer" data-depth-layer="mid" data-hero-layer="record">
                <div className="seq-item hero-record hero-record-lift" data-seq-kind="pop" style={delay(2950)} data-hero-results data-hero-record>
                  <div className="hero-record-head">
                    <StepLabel n={3} className="mb-2">{l(w.labels.done)}</StepLabel>
                    <p className="hero-result-key">{l(w.record.title)}</p>
                    <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{l(w.record.who)}</p>
                    <p className="tnum text-[0.875rem] leading-snug text-ink-600" data-hero-result={1}>{l(w.record.updated)}</p>
                  </div>
                  <dl className="hero-record-fields">
                    {fields.map((f, i) => (
                      <div key={f.k} className="seq-item hero-result" style={delay(3300 + i * 320)} data-hero-result={i + 2}>
                        <dt className="hero-result-key">{f.k}</dt>
                        <dd className="hero-result-value">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* the priority with its reason: the alert the team received (the e-mail alert to the right person) */}
                  <div className="seq-item hero-record-alert" data-seq-kind="pop" style={delay(4400)} data-hero-alert data-hero-result={5}>
                    <span aria-hidden="true" className="hero-result-mark"><Mail size={11} strokeWidth={2.4} /></span>
                    <span className="min-w-0">
                      <span className="hero-result-key block">{l(w.record.priority)}</span>
                      <span className="block text-[1rem] font-semibold leading-snug text-ink-950">{l(w.record.alert)}</span>
                      <span className="block text-[0.875rem] leading-snug text-ink-700">{l(w.record.alertWhy)}</span>
                    </span>
                  </div>
                  {/* the next step: a person's, said as such */}
                  <p className="seq-item hero-record-next" style={delay(4900)} data-hero-next data-hero-result={6}>
                    <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" className="mt-[3px] shrink-0 text-[color:var(--accent-ink)]" />
                    <span className="min-w-0"><span className="font-medium text-ink-950">{l(w.record.nextLabel)}:</span> {l(w.record.next)}</span>
                  </p>
                </div>
              </div>
              {/* the sequence's pop runs on an inner wrapper: the layer itself keeps its depth transform (an animation's fill would hold it) */}
              <div className="hero-listing-layer" data-depth-layer="far" data-hero-layer="listing" data-hero-listing>
                <div className="seq-item" data-seq-kind="pop" style={delay(350)}>
                  <ListingCard listing={listings.est204} locale={locale} photoLabel={l(sw.common.photo)} row eyebrow={l(w.listing.label)} note={l(w.listing.note)} className="hero-listing-card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
