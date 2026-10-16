import type { CSSProperties } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { homeV4 } from "@/lib/content/home-v4";
import { DepthScene } from "@/components/ui/depth-scene";
import { ButtonLink } from "@/components/ui/button";
import { DuskPhoto, Ridges, Stars } from "./hero-world-layers";
import { SeqReplay } from "./seq-replay";

/**
 * The first screen (DESIGN.md, CONTENT_MODEL_1016 moment 1): the pain in one sentence, the product rising out of the land.
 *
 *   far     the stars, slowest
 *   sky     the coast at dusk (a licensed photograph, toned to the page)
 *   mid     the ridges and the dark land
 *   panel   one excerpt of the product, scrolling with the page, leaning 18° and standing up as the page moves
 *           (the mechanics of Container Scroll Animation, Manu Arora, MIT; driven by the scene's own --depth)
 *
 * The panel hangs over the hero's lower edge into the ivory page: the product carries the page from dark to light,
 * no band, no edge. The layers sit on the section, not on the stage, so the scene fills any width (1920 included).
 * Reduced motion and no JavaScript: the finished picture, nothing moves.
 */
const delay = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--seq-delay" as string]: `${ms}ms`, ...extra });

export function HeroV4({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeV4.hero;
  const p = w.panel;

  return (
    <section aria-labelledby="hero-h1" data-hero="dark" data-canvas="deep" className="hero4">
      <DepthScene className="hero4-scene">
        <div data-depth-layer="sky" className="hero4-sky" aria-hidden="true">
          <DuskPhoto className="hero4-photo" />
          <div className="hero4-tone" />
        </div>
        <Stars className="hero4-stars" data-depth-layer="far" />
        <div data-depth-layer="mid" className="hero4-ridges" aria-hidden="true"><Ridges className="h-full w-full" /></div>
        <div className="hero4-land" aria-hidden="true" />

        <div className="container-default relative z-[2]">
          <div className="hero4-words">
            <p className="t-eyebrow text-[color:var(--hero-accent)]">{l(w.eyebrow)}</p>
            <h1 id="hero-h1" className="hero4-h1">
              <span className="block">{l(w.h1Soft)}</span>
              <span className="block">{l(w.h1)}</span>
            </h1>
            <p className="hero4-lead" data-hero-lead>{l(w.lead)}</p>
            <div className="hero4-actions" data-hero-cta="trial">
              <ButtonLink href={localePath(locale, "/signup")} size="lg" className="hero4-cta">{l(w.cta)}</ButtonLink>
              <a href="#loss" className="hero4-link" data-hero-cta="story">{l(w.ctaSecond)}<ArrowDown size={16} strokeWidth={2} aria-hidden="true" /></a>
            </div>
            <p className="hero4-trial" data-hero-trial>{l(w.trialLine)}</p>
          </div>

          {/* The panel: one excerpt, four beats, the typing sequence once on entry. */}
          <div className="hero4-stage" data-seq="run" data-hero-surface>
            <figure aria-label={l(p.label)} className="hero-panel hero4-panel" data-hero-panel>
              <div className="hero4-panel-head">
                <p className="hero4-situation" data-hero-situation><span aria-hidden="true" className="hero4-dot" />{l(p.situation)}</p>
                <SeqReplay label={l(p.replay)} compact />
              </div>
              <div className="hero4-panel-body">
                <div className="hero4-chat">
                  <p className="hero4-meta"><MessageCircle size={13} strokeWidth={2.2} aria-hidden="true" />{l(p.channel)}</p>
                  <div className="hero-bubble hero-bubble-in hero4-bubble" data-hero-enquiry>
                    <p lang="en">{p.enquiry}</p>
                    <p className="hero-bubble-meta">{l(p.who)}</p>
                  </div>
                  <p className="hero4-meta seq-item" style={delay(700)}>{l(p.replyLabel)}</p>
                  <div className="relative">
                    <span className="seq-typing typing hero-bubble hero-bubble-out absolute left-0 top-0 items-center gap-1" style={delay(700, { ["--seq-typing-for" as string]: "1300ms" })} aria-hidden="true"><i>●</i><i>●</i><i>●</i></span>
                    <div className="seq-item hero-bubble hero-bubble-out hero4-bubble" style={delay(1950)} data-hero-reply>
                      <p lang="en">{p.reply}</p>
                    </div>
                  </div>
                </div>
                <div className="hero4-after">
                  <div className="seq-item" style={delay(2700)} data-hero-crm>
                    <p className="hero4-meta">{l(p.recordLabel)}</p>
                    <p className="hero4-record">{p.enquiry ? "Laura Serrano" : ""}</p>
                    <p className="hero4-record-line">{l(p.record)}</p>
                  </div>
                  <div className="seq-item hero-next hero4-task" data-seq-kind="pop" style={delay(3500)} data-hero-task>
                    <p className="hero4-meta">{l(p.taskLabel)}</p>
                    <p className="hero4-task-line">{l(p.task)}</p>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </DepthScene>
    </section>
  );
}
