"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Link2, MessageCircleQuestion, Play, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { CompareSlider } from "@/components/ui/compare-slider";
import { Rise, useSeen } from "@/components/ui/motion";
import { DemoPlan } from "./scene-art";
import { cn } from "@/lib/utils";

/**
 * The 3D stage (the owner's orders of 03.11. point 6, 05.11. point 9 and 06.11. points 11 and 12; Copy 1105 v3 §8; the 3D lane's
 * handoff_2026-11-06 with the public-domain wall painting): one large stage, one house, the steps plan → model → empty/furnished
 * → delivery as one movement through the same object. On the wide window the stage is pinned and the steps follow the scroll
 * (one segment of 70 vh each, no clock, no jump: a crossfade that never blocks); a click on a step still jumps. On a narrow window
 * the stage walks once by itself when it comes into view and the steps are tabs. 02 Modelo is the lane's `modelo_planta_baja_loop`
 * (1920 × 1080, 30 fps, 10 s seamless; MP4 first, WebM second); its poster stands until the clip can play, then the clip fades in.
 * 04 Entrega is the lane's `entrega_clip` (18.4 s) behind its poster, loaded only on request, shown when it can play. Under the
 * stage the agent's path of Copy §8 as one connected run of three stations (point 12). The lane's mandatory mark stands on the
 * stage. No status word (the public view leaves the whole section out while 3D is not included; see app/[locale]/page.tsx).
 */
const MEDIA = {
  loopMp4: "/media/3d/house-ground-loop.mp4",
  loopWebm: "/media/3d/house-ground-loop.webm",
  loopPoster: "/media/3d/house-ground-loop-poster-1600.webp",
  empty: "/media/3d/living-empty-1200.webp",
  furnished: "/media/3d/living-furnished-1200.webp",
  filmMp4: "/media/3d/house-delivery.mp4",
  filmWebm: "/media/3d/house-delivery.webm",
  filmPoster: "/media/3d/house-delivery-poster-1600.webp",
};
const SEG = 0.7; // window heights per step on the wide window
const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
const wide = () => window.matchMedia("(min-width: 1024px)").matches;

/** 02 Modelo: the ground floor turning; the poster stands over the clip until it can play (owner point 11: no video before it is ready). */
function TurnClip({ label, posterAlt }: { label: string; posterAlt: string }) {
  const turn = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = turn.current;
    setOn(true);
    const t = window.setTimeout(() => { if (v) { v.load(); v.play().catch(() => {}); } }, 0);
    return () => { window.clearTimeout(t); v?.pause(); };
  }, []);
  return (
    <div className="m3d-clip" data-model3d-turn-ready={ready ? "true" : "false"}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={turn} muted loop playsInline preload="none" aria-label={label} className="h-full w-full object-cover" data-model3d-turn onPlaying={() => setReady(true)} onCanPlay={() => { if (turn.current && !turn.current.paused) setReady(true); }}>
        {on && <source src={MEDIA.loopMp4} type="video/mp4" />}
        {on && <source src={MEDIA.loopWebm} type="video/webm" />}
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MEDIA.loopPoster} alt={posterAlt} width={1600} height={900} decoding="async" className={cn("m3d-clip-poster", ready && "is-gone")} data-model3d-turn-poster />
    </div>
  );
}

function Img({ src, alt, w, h, className }: { src: string; alt: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className={className} />;
}

export function Stage3d({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.model3d;
  const steps = l(w.steps);
  const reduce = useReducedMotion();
  const { ref, seen } = useSeen(0.1);
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const walked = useRef(false);
  const [filmOn, setFilmOn] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const pathIcons = [Upload, MessageCircleQuestion, Link2];

  // the wide window: the step from the scroll position (the pin holds from the track's top, each step owns one segment)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wide()) return;
      const y = headerHeight() + 24 - el.getBoundingClientRect().top;
      const seg = window.innerHeight * SEG;
      setStep(Math.min(3, Math.max(0, Math.floor(y / seg))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // the narrow window: once in view, plan → the ground floor turning → the pair, one walk, then the visitor decides
  useEffect(() => {
    if (!seen || walked.current || wide()) return;
    walked.current = true;
    if (reduce) { setStep(2); return; }
    const a = window.setTimeout(() => setStep(1), 1400);
    const b = window.setTimeout(() => setStep(2), 7400);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [seen, reduce]);

  /** A click on a step: on the wide window the window scrolls to the step's segment (the pin shows it), otherwise the step is set. */
  const go = (i: number) => {
    walked.current = true;
    setStep(i);
    const el = track.current;
    if (!el || !wide()) return;
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight() - 24;
    window.scrollTo({ top: top + i * window.innerHeight * SEG + 2, behavior: "auto" });
  };

  const playFilm = () => {
    setFilmOn(true);
    requestAnimationFrame(() => { const v = video.current; if (v) { v.load(); v.play().catch(() => {}); } });
  };

  return (
    <section id="model-3d" aria-labelledby="m3d-h" className="m3d" data-model3d>
      <div className="container-default">
        <Rise className="m3d-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="m3d-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-4 t-body-l text-text-secondary max-w-[52ch]">{l(w.lead)}</p>
          <p className="mt-4"><span className="status-pill" data-status="example" data-model3d-example>{l(w.example)}</span></p>
        </Rise>
      </div>

      {/* the scroll track: four segments on the wide window, the pinned stage inside it */}
      <div ref={track} className="m3d-track" data-model3d-track>
        <div className="m3d-pin container-default">
          <div ref={ref} className="m3d-frame" data-model3d-stage data-m3d-step={step}>
            <div className="m3d-view">
              <AnimatePresence mode="sync" initial={false}>
                {step === 0 && (
                  <m.div key="plan" className="m3d-pane m3d-pane-plan" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.5 }} data-m3d-pane="plan">
                    <DemoPlan locale={locale} className="h-full w-full" />
                    <span className="sr-only">{l(w.planAlt)}</span>
                  </m.div>
                )}
                {step === 1 && (
                  <m.div key="model" className="m3d-pane m3d-pane-model" initial={reduce ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.55 }} data-m3d-pane="model">
                    {reduce ? (
                      <Img src={MEDIA.loopPoster} alt={l(w.modelAlt)} w={1600} h={900} className="h-full w-full object-cover" />
                    ) : (
                      <TurnClip label={l(w.modelFilm)} posterAlt={l(w.modelAlt)} />
                    )}
                    <span className="m3d-caption">{l(w.modelLine)}</span>
                  </m.div>
                )}
                {step === 2 && (
                  <m.div key="pair" className="m3d-pane" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.5 }} data-m3d-pane="pair">
                    <CompareSlider label={l(w.pairLabel)} beforeLabel={l(w.empty)} afterLabel={l(w.furnished)} className="h-full w-full rounded-none" initial={62} sweepFrom={reduce ? undefined : 6} before={<Img src={MEDIA.empty} alt={l(w.emptyAlt)} w={1200} h={800} className="h-full w-full object-cover" />} after={<Img src={MEDIA.furnished} alt={l(w.furnishedAlt)} w={1200} h={800} className="h-full w-full object-cover" />} />
                  </m.div>
                )}
                {step === 3 && (
                  <m.div key="film" className="m3d-pane m3d-pane-film" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.5 }} data-m3d-pane="film" data-model3d-film>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video ref={video} poster={MEDIA.filmPoster} controls={filmReady} muted playsInline preload="none" aria-label={l(w.film)} className="h-full w-full object-cover" data-media-video data-model3d-video={filmReady ? "on" : filmOn ? "loading" : "poster"} onPlaying={() => setFilmReady(true)}>
                      {filmOn && <source src={MEDIA.filmMp4} type="video/mp4" />}
                      {filmOn && <source src={MEDIA.filmWebm} type="video/webm" />}
                    </video>
                    {!filmReady && (
                      <button type="button" className="m3d-play" onClick={playFilm} disabled={filmOn} data-model3d-play aria-busy={filmOn}>
                        <span className="m3d-play-mark" aria-hidden="true">{filmOn ? <span className="busy-ring" /> : <Play size={20} strokeWidth={2.2} />}</span>
                        <span className="m3d-play-words"><span className="m3d-play-title">{filmOn ? l(w.loading) : l(w.playFilm)}</span><span className="m3d-play-line">{l(w.filmLine)}</span></span>
                      </button>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
              <span className="m3d-mark" data-model3d-mark>{l(w.mark)}</span>
            </div>
            <ol className="m3d-steps" role="tablist" aria-label={l(w.h2)}>
              {steps.map((s, i) => (
                <li key={s} role="presentation">
                  <button type="button" role="tab" aria-selected={step === i} className={cn("m3d-step", step === i && "is-on", i < step && "is-past")} onClick={() => go(i)} data-m3d-step-button={i}>
                    <span className="m3d-step-no tnum">0{i + 1}</span>
                    <span className="m3d-step-name">{s}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* the agent's path (Copy 1105 v3 §8; the owner's point 12): one line, one connected run of three stations, the action at its end */}
      <div className="container-default">
        <Rise className="m3d-path" delay={0.05} y={16}>
          <p className="m3d-path-title">{l(w.pathTitle)}</p>
          <p className="m3d-path-line" data-model3d-path-line>{l(w.pathLine)}</p>
          <ol className="m3d-path-run" data-model3d-path>
            {l(w.path).map((s, i) => {
              const Icon = pathIcons[i];
              return (
                <li key={s} className="m3d-path-step" data-model3d-path-step={i + 1}>
                  <span className="m3d-path-node" aria-hidden="true"><Icon size={18} strokeWidth={1.9} /></span>
                  <span className="m3d-path-no tnum" aria-hidden="true">{i + 1}</span>
                  <span className="m3d-path-words">{s}</span>
                </li>
              );
            })}
          </ol>
          <a href={localePath(locale, "/contact")} className="m3d-cta" data-model3d-cta>{l(w.cta)}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
        </Rise>
      </div>
    </section>
  );
}
