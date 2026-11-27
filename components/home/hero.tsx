import { preload } from "react-dom";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { brief1120 } from "@/lib/content/brief-1120";
import type { ClaimView } from "@/lib/claims";
import { HeroPhoto, HERO_PHOTO_C } from "./hero-image";
import { ChevronDown } from "lucide-react";
import { HeroDemo } from "./hero-demo";
import { PainBand } from "./pain-band";
import { WhatsAppMark } from "@/components/ui/whatsapp-mark";

/**
 * The hero. The owner's brief of 20.11.2026 (topic 16, "Die Website für den Makleralltag", p. 3) with Copy's screen 1-A
 * (COPY_TO_REDESIGN_1120_PHONE_PREVIEW_PATHS_v1.md, 11cf7a2): one viewing as the red thread — the question "Mientras enseñas un piso,
 * ¿quién atiende a Mila?", under it Mila's WhatsApp message (Spanish on both pages, the EN translation small under it) and the finished
 * task with ONE line, readable on the first screen without sound or motion; the main action opens the finished task in the demonstration
 * ("Ver cómo queda la tarea"); the quiet second action is the one free way, Essential's 14-day trial (Copy stage 1 §0). The picture
 * stays the 3D lane's render until the owner hands over licensed property photography (3D lane, 20.11.: none in the repository); its
 * caption "Estás en una visita · 11:40" names no listing data (Copy batch 1 §1). The assistant's reply W-2 and the task's fields come
 * on the demo's screens 1-B / 1-C, so the first screen shows only what is needed. What stays from before: the picture, the eyebrow, the
 * pain line under the hero and the demonstration's surfaces.
 */
/* RV6 b9b3984: the room is measured against a 100svh probe element, the same unit the CSS decides with — innerHeight grows when a phone's
   browser bar collapses mid-scroll and would flip the mode under the visitor; svh does not move */
const HERO_FIT_SCRIPT = `(function(){var s=document.querySelector('section[data-hero="film"]');if(!s)return;var c=s.querySelector('.hf-content');var p=s.querySelector('.hf-svh');function f(){if(!c||window.innerWidth>=1024){s.removeAttribute('data-hero-fit');return;}var svh=p?p.getBoundingClientRect().height:window.innerHeight;var room=svh-c.getBoundingClientRect().height;s.setAttribute('data-hero-fit',room>=150?'peek':'edge');}f();window.addEventListener('resize',f);window.addEventListener('load',f);if(document.fonts&&document.fonts.ready){document.fonts.ready.then(f);}})();`;
const PICTURE = HERO_PHOTO_C.src; // the owner, 27.11.: photo C for E2 (the 3D render stays in the repository for the later stage)

export function Hero({ locale, view, stage = false }: { locale: Locale; view: ClaimView; stage?: boolean }) {
  const w = home1103.hero;
  const b = brief1120.hero;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const p = (path: string) => localePath(locale, path);
  const mila = b.bubbles[0];
  // the picture is the first paint of the page: preloaded so the largest paint does not wait for it (on the Rundgang stage the stage carries it)
  if (!stage) preload(PICTURE, { as: "image" });

  return (
    <>
      <section aria-labelledby="hero-h1" data-hero="film" data-hero-brief="1120" className="hf">
        <div className="hf-svh" aria-hidden="true" />
        <HeroPhoto alt={l(w.image)} mark={l(b.caption)} stage={stage} />
        <div className="container-default hf-content">
          <div className="hf-words" data-hero-words data-hero-e2="1124">
            {/* the owner's E2 order of 24.11.: the first screen carries at most the headline, one sentence, one main action and the living
                product picture — the eyebrow, the benefit list, the scroll arrow, the second button and the trial line leave the first screen
                (the trial stays in the header, the phone bar and the plans) */}
            <h1 id="hero-h1" className="hf-h1">
              {l(b.h1).split(" ").map((word, i) => (
                <span key={i}><span className="hf-word" style={{ ["--w" as string]: i }}><span>{word}</span></span>{" "}</span>
              ))}
            </h1>
            <p className="hf-lead" data-hero-lead>{l(b.sub)}</p>
            {/* screen 1-A: Mila's message and the finished task (Copy 11cf7a2) — the LIVING picture (E2): the message arrives, then the
                task builds itself up, once (CSS choreography, --d per element; with reduced motion everything stands at once) */}
            <div className="hf-scene hf-scene-live" data-hero-scene data-hero-live>
              <div className="hf-scene-msg" data-hero-scene-enquiry style={{ ["--d" as string]: "900ms" }}>
                <p className="hf-scene-label"><WhatsAppMark size={14} />{l(b.scene.enquiry)} · {mila.time}</p>
                <p className="hf-scene-text" lang="es">{mila.es}</p>
                {locale !== "es" && <p className="hf-scene-translation" data-hero-scene-translation><span className="hf-scene-translation-label">{l(b.translation)}:</span> {mila.en}</p>}
              </div>
              <div className="hf-scene-task" data-hero-scene-task style={{ ["--d" as string]: "1900ms" }}>
                <p className="hf-scene-label" style={{ ["--d" as string]: "2000ms" }}>{l(b.scene.task)}</p>
                <p className="hf-scene-task-title" style={{ ["--d" as string]: "2140ms" }}>{l(b.task.title)}</p>
                <p className="hf-scene-sub" style={{ ["--d" as string]: "2300ms" }}>{l(b.task.line)}</p>
              </div>
              <p className="hf-scene-mark" style={{ ["--d" as string]: "2400ms" }}>{l(b.scene.mark)}</p>
            </div>
            <div className="hf-ctas">
              <a href="#demo" className="hf-cta-main lift" data-hero-cta="task" data-demo-end>{l(b.cta)}</a>
              {/* the trial's way stays reachable from the first screen for the keyboard and the screen reader (visually it lives in the header
                  and the phone bar). RV6 R-13 (34ebc36): a plain sr-only link swallows a sighted keyboard user's focus, so this one appears
                  as the second button while it has keyboard focus (the skip-link pattern) */}
              <a href={p(brief1120.href.essential)} className="hf-cta-trial-kbd" data-hero-cta="trial" data-pilot-cta="hero">{l(b.ctaTrial)}</a>
            </div>
          </div>
        </div>
        {/* the owner, 27.11. (point 2): a quiet, keyboard-reachable scroll hint to the pain section at the foot of the first screen;
            still (no loop), a chevron, not a drawn arrow; sits on the dissolve edge where the hero runs to the fold (anchored to the section) */}
        <a href="#pain" className="hf-edge" data-hero-cta="scroll" aria-label={l(w.scrollPain)}><ChevronDown size={20} strokeWidth={2} aria-hidden="true" /></a>
      </section>
      {/* Copy 1113 §1: the pain line as its own band under the picture (the owner keeps it; Copy stage 2 moves it to directly after the first screen); the demonstration rises into the band */}
      <PainBand locale={locale} />
      {/* RV6 N-5 (39176ea): on the phone the foot of the first screen is a 28 px edge of the next section's ground (CSS default, never a cut
          line) or — only when the whole pain line and its mark fit under the hero — the 160 px peek with the whole line; this measures the
          room (window height minus the hero's content) and sets data-hero-fit; re-measured after fonts and on resize; desktop untouched */}
      <script dangerouslySetInnerHTML={{ __html: HERO_FIT_SCRIPT }} />
      <HeroDemo locale={locale} view={view} />
    </>
  );
}
