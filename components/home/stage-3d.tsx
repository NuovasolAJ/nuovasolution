"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { CompareSlider } from "@/components/ui/compare-slider";
import { Rise, useSeen } from "@/components/ui/motion";
import { DemoPlan } from "./scene-art";
import { cn } from "@/lib/utils";

/**
 * The 3D stage (the owner's order of 03.11.2026, point 6; Copy 1102 v2 §5; research 1103 R3 Pyzhevsky, S5 Belgrade Arbor):
 * one large stage, one house, the steps plan → model → empty/furnished as one movement through the same object. When the
 * stage comes into view it walks once from the plan to the model and on to the pair (the handle then belongs to the visitor);
 * the step buttons switch at any time. The whole house without room names or viewer controls is the clean take of the 3D
 * lane's handoff of 30.10. (media/clean_take_fullhd.mp4, 25 s, 1080p) and plays on request with its own poster: nothing of
 * 15 MB loads before a click. Media with their checksums: docs/website_redesign/WEBSITE_BUILD_1103_RETURN_v1.md.
 */
const MEDIA = {
  model: "/media/3d/house-model-clean-1600.webp",
  empty: "/media/3d/living-empty-1200.webp",
  furnished: "/media/3d/living-furnished-1200.webp",
  film: "/media/3d/house-clean-take.mp4",
  filmPoster: "/media/3d/house-clean-take-poster.webp",
};

function Img({ src, alt, w, h, className }: { src: string; alt: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className={className} />;
}

export function Stage3d({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.model3d;
  const steps = l(w.steps);
  const reduce = useReducedMotion();
  const { ref, seen } = useSeen(0.4);
  const [step, setStep] = useState(0);
  const walked = useRef(false);
  const [filmOn, setFilmOn] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  // once in view: plan → model → pair, one walk, then the visitor decides
  useEffect(() => {
    if (!seen || walked.current) return;
    walked.current = true;
    if (reduce) { setStep(2); return; }
    const a = window.setTimeout(() => setStep(1), 1400);
    const b = window.setTimeout(() => setStep(2), 3000);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [seen, reduce]);

  const playFilm = () => {
    setFilmOn(true);
    requestAnimationFrame(() => { const v = video.current; if (v) { v.src = MEDIA.film; v.load(); v.play().catch(() => {}); } });
  };

  return (
    <section id="model-3d" aria-labelledby="m3d-h" className="m3d" data-model3d>
      <div className="container-default">
        <Rise className="m3d-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="m3d-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-4 t-body-l text-text-secondary max-w-[52ch]">{l(w.lead)}</p>
          <p className="mt-4 flex flex-wrap gap-2"><span className="status-pill" data-status="preparing">{l(w.status)}</span><span className="status-pill" data-status="example" data-model3d-example>{l(w.example)}</span></p>
        </Rise>

        <Rise className="m3d-stage" y={24} delay={0.1}>
          <div ref={ref} className="m3d-frame" data-model3d-stage data-m3d-step={step}>
            <div className="m3d-view">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <m.div key="plan" className="m3d-pane m3d-pane-plan" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }} data-m3d-pane="plan">
                    <DemoPlan locale={locale} className="h-full w-full" />
                    <span className="sr-only">{l(w.planAlt)}</span>
                  </m.div>
                )}
                {step === 1 && (
                  <m.div key="model" className="m3d-pane" initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.55 }} data-m3d-pane="model">
                    <Img src={MEDIA.model} alt={l(w.modelAlt)} w={1600} h={900} className="h-full w-full object-cover" />
                  </m.div>
                )}
                {step === 2 && (
                  <m.div key="pair" className="m3d-pane" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.5 }} data-m3d-pane="pair">
                    <CompareSlider label={l(w.pairLabel)} beforeLabel={l(w.empty)} afterLabel={l(w.furnished)} className="h-full w-full rounded-none" initial={reduce ? 50 : 62} before={<Img src={MEDIA.empty} alt={l(w.emptyAlt)} w={1200} h={800} className="h-full w-full object-cover" />} after={<Img src={MEDIA.furnished} alt={l(w.furnishedAlt)} w={1200} h={800} className="h-full w-full object-cover" />} />
                  </m.div>
                )}
                {step === 3 && (
                  <m.div key="film" className="m3d-pane m3d-pane-film" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.5 }} data-m3d-pane="film" data-model3d-film data-model3d-turn-slot="clean-take">
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video ref={video} poster={MEDIA.filmPoster} controls={filmOn} muted playsInline preload="none" aria-label={l(w.film)} className="h-full w-full object-cover" data-media-video data-model3d-video={filmOn ? "on" : "poster"} />
                    {!filmOn && (
                      <button type="button" className="m3d-play" onClick={playFilm} data-model3d-play>
                        <span className="m3d-play-mark" aria-hidden="true"><Play size={20} strokeWidth={2.2} /></span>
                        <span className="m3d-play-words"><span className="m3d-play-title">{l(w.playFilm)}</span><span className="m3d-play-line">{l(w.filmLine)}</span></span>
                      </button>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <ol className="m3d-steps" role="tablist" aria-label={l(w.h2)}>
              {steps.map((s, i) => (
                <li key={s} role="presentation">
                  <button type="button" role="tab" aria-selected={step === i} className={cn("m3d-step", step === i && "is-on")} onClick={() => { walked.current = true; setStep(i); }} data-m3d-step-button={i}>
                    <span className="m3d-step-no tnum">0{i + 1}</span>
                    <span className="m3d-step-name">{s}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </Rise>

        <Rise className="m3d-foot" delay={0.05}>
          <a href={localePath(locale, "/contact")} className="m3d-cta" data-model3d-cta>{l(w.cta)}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
        </Rise>
      </div>
    </section>
  );
}
