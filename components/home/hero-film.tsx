"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's film (the owner's order of 03.11.2026, point 1): the furnished living room of the 3D lane's example house runs
 * dimmed in a loop behind one sentence and the main action. The poster stands first; the film is attached only when the
 * window allows it: not with reduced motion (the poster stays, the owner's rule), not when the connection asks to save data
 * or reports 2G/3G, and on a phone only after the first paint. A visible control pauses and resumes it (report §6: pause and
 * poster). While it runs, three benefits appear one after another (CSS, `data-hf-benefit`).
 */
export function HeroFilm({ src, poster, label, pause, play }: { src: string; poster: string; label: string; pause: string; play: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"poster" | "playing" | "paused">("poster");

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type Conn = { saveData?: boolean; effectiveType?: string };
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const slow = Boolean(conn?.saveData) || /(^|\b)(slow-2g|2g|3g)\b/.test(conn?.effectiveType ?? "");
    if (reduce || slow) return;
    let cancelled = false;
    const attach = () => {
      if (cancelled) return;
      v.src = src;
      v.load();
      v.play().then(() => { if (!cancelled) setState("playing"); }).catch(() => { /* the poster stays */ });
    };
    // a phone gets its first paint before the film is fetched
    const small = window.innerWidth < 768;
    const t = window.setTimeout(attach, small ? 1200 : 0);
    return () => { cancelled = true; window.clearTimeout(t); };
  }, [src]);

  const toggle = () => {
    const v = video.current;
    if (!v || state === "poster") return;
    if (v.paused) { v.play().then(() => setState("playing")).catch(() => {}); } else { v.pause(); setState("paused"); }
  };

  return (
    <div className="hf-media" data-hf-film={state} aria-hidden={state === "poster" ? undefined : undefined}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={video} className="hf-video" poster={poster} muted loop playsInline preload="none" aria-label={label} tabIndex={-1} />
      <div className="hf-shade" aria-hidden="true" />
      {state !== "poster" && (
        <button type="button" className="hf-pause" onClick={toggle} aria-label={state === "playing" ? pause : play} data-hf-pause>
          {state === "playing" ? <Pause size={16} strokeWidth={2.2} aria-hidden="true" /> : <Play size={16} strokeWidth={2.2} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

/** The three benefits that appear one after another while the film runs (CSS delays; static with reduced motion). */
export function HeroBenefits({ benefits }: { benefits: string[] }) {
  return (
    <ul className="hf-benefits" data-hf-benefits>
      {benefits.map((b, i) => (
        <li key={b} className={cn("hf-benefit")} style={{ ["--i" as string]: i }} data-hf-benefit={i + 1}>
          <span className="hf-benefit-mark" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
          {b}
        </li>
      ))}
    </ul>
  );
}

/** The arrow under the hero's words: scrolls to the demonstration. */
export function HeroScrollHint({ label }: { label: string }) {
  return (
    <a href="#demo" className="hf-scroll" data-hero-cta="scroll" aria-label={label}>
      <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
