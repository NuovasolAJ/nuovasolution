import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight, Mail, MessageCircle, Phone, PanelsTopLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { channels, heroWords, storyWords, type ChannelKey } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { DepthScene } from "@/components/ui/depth-scene";
import { DuskPhoto, Stars, Structure } from "./hero-world-layers";
import { SeqReplay } from "./seq-replay";

/**
 * The hero (master order 2026-10-10 §1; R19 closing order 2026-10-19 §2–§4; R24 owner pictures 01/02; the owner's
 * consolidated closing order of 26.10. §1, §2, §6): a premium real estate world with the product in the middle, and
 * the product showing work that is done. Four layers that read as one space (hero-world-layers.tsx; the owner's binding
 * closing order of 27.10. §2, §3: the product panel is the main motif, the villa backdrop is withdrawn):
 *
 *   1 sky        the coast at dusk, toned calm, one soft light low over the sea, a few stars
 *   2 structure  a discreet spatial structure in thin lines: the horizon, the floor's joints in perspective, a slim
 *                column edge at each side; the floor's light pool under the panel is the page's own canvas colour
 *   3 panel      one large product surface, close and lightly leaning: the situation in one line, the customer's question,
 *                the reply (what is noted, one question back; no listing fact is confirmed, because that reply is in
 *                preparation)
 *   4 results    the customer's record as it stands after the reply, lifted from the panel: who, what she looks for, her
 *                budget, her language, the priority with its reason (the proven e-mail alert), and the next step
 *
 * On scroll the layers move apart (depth-scene.tsx measures, globals.css moves: the far shore lags most, the villas a
 * little, the terrace runs ahead) and the panel comes upright from a light lean. The words stay put. With reduced motion
 * nothing moves and the picture is complete. On a short desktop window (≤ 820 px high) the words and the stage are set
 * tighter, so at 1366 × 768 the headline, the buttons, the enquiry and the first lines of the record stand on the first
 * screen (§1: not only the panel's head).
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
        {/* 1 The sky: the coast at dusk, its glow over the sea, the stars (the slowest layer). */}
        <div data-depth-layer="sky" className="hero-sky" aria-hidden="true">
          <DuskPhoto className="hero-sky-photo" />
          <div className="hero-sky-tone" />
          <div className="hero-sky-glow" />
        </div>
        <Stars className="hero-world-stars" data-depth-layer="far" />

        <div className="container-default relative z-[2]">
          {/* The words, on the open sky. */}
          <div className="hero-words mx-auto max-w-[960px] text-center" data-hero-words>
            <p className="t-eyebrow text-[color:var(--hero-accent)]">{d.home.hero.eyebrow}</p>
            <h1 id="hero-h1" className="hero-h1 mt-4 t-display-xl text-ivory">
              <span className="block text-[color:var(--hero-soft)]">{l(w.h1Soft)}</span>
              <span className="block">{l(w.h1)}</span>
            </h1>
            <p className="hero-lead mx-auto mt-4 max-w-[54ch] t-body-m text-ink-200 md:t-body-l" data-hero-lead>{l(w.lead)}</p>
            <div className="hero-ctas mt-6 flex flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:gap-4">
              <a href="#story" className="hero-cta-main" data-hero-cta="story">
                {l(w.ctaStory)}
                <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <ButtonLink href={p("/signup")} size="lg" variant="secondary" className="hero-cta-second">{startLabel(locale)}</ButtonLink>
            </div>
            <p className="mt-4 t-caption text-ink-300" data-hero-trial>{l(w.trialLine)}</p>
          </div>

          <div className="hero-world-stage" data-seq="run" data-hero-surface>
            {/* 2 The structure: the horizon, the floor in perspective, a column edge at each side; it lags a little behind the page. */}
            <div data-depth-layer="mid" className="hero-structure" aria-hidden="true" data-hero-layer="structure"><Structure className="h-full w-full" /></div>
            {/* The floor's light pool under the panel: the page's canvas colour, so the hero ends on no edge. */}
            <div className="hero-world-land" aria-hidden="true" data-hero-layer="light" />

            {/* 3 The panel: scrolls with the page, comes upright and grows. */}
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
                {/* The conversation: the question, the reply that notes what she asks for and asks one question back */}
                <div className="hero-panel-col space-y-4 px-5 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
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

                {/* The customer's record as it stands after the reply (R24 owner picture 02; closing order 26.10. §6: name and role,
                    what she looks for, her budget, her language, the priority with its reason, the next step): it fills after the
                    reply, field by field, then the alert, then the next step. */}
                <div className="hero-panel-col hero-record-col space-y-3 border-t border-ink-100 bg-[#f6f4ee] px-5 pb-6 pt-5 md:border-l md:border-t-0 md:px-7 md:pb-7 md:pt-6">
                  <StepLabel n={3} className="seq-item" style={delay(2750)}>{l(w.labels.done)}</StepLabel>
                  {/* 4 The results, lifted from the panel (closing order 27.10. §2): the record with the priority and the next step */}
                  <div className="seq-item hero-record hero-record-lift" data-seq-kind="pop" style={delay(2950)} data-hero-results data-hero-record>
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
                    {/* the priority with its reason: the alert the team received (proven end to end: the e-mail alert to the right person) */}
                    <div className="seq-item hero-record-alert" data-seq-kind="pop" style={delay(4400)} data-hero-alert data-hero-result={5}>
                      <span aria-hidden="true" className="hero-result-mark"><Mail size={11} strokeWidth={2.4} /></span>
                      <span className="min-w-0">
                        <span className="block text-[0.75rem] font-medium uppercase tracking-[0.06em] text-ink-600">{l(w.record.priority)}</span>
                        <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-950">{l(w.record.alert)}</span>
                        <span className="block text-[0.8125rem] leading-snug text-ink-700">{l(w.record.alertWhy)}</span>
                      </span>
                    </div>
                    {/* the next step: a person's, said as such */}
                    <p className="seq-item hero-record-next" style={delay(4900)} data-hero-next data-hero-result={6}>
                      <ArrowRight size={13} strokeWidth={2.4} aria-hidden="true" className="mt-[3px] shrink-0 text-[color:var(--accent-ink)]" />
                      <span className="min-w-0"><span className="font-medium text-ink-950">{l(w.record.nextLabel)}:</span> {l(w.record.next)}</span>
                    </p>
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
