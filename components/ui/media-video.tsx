"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

/**
 * A video that behaves on a long page (closing order 26.10. §5): it loads nothing but its poster until it comes near the
 * window (preload none → metadata), it pauses when it leaves the window, and when one plays every other one pauses, so no
 * two clips load and play at once. Native controls; the poster is the recording's own first frame, so the box is never
 * black. Nothing autoplays, with or without reduced motion. A video stays recognisable as a recording: no interactivity is
 * pretended beyond play, pause and full screen.
 */
export function MediaVideo({ src, poster, label, className, cues, ...rest }: { src: string; poster: string; label: string; className?: string; cues?: { at: number; label: string }[] } & Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "poster" | "className">) {
  const ref = useRef<HTMLVideoElement>(null);
  // closing order 27.10. §8: the active floor is named OUTSIDE the video (a line under it that follows the playhead)
  const [cue, setCue] = useState<string | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && v.preload === "none") v.preload = "metadata";
        if (!e.isIntersecting && !v.paused) v.pause();
      }
    }, { threshold: 0.15 });
    io?.observe(v);
    const onPlay = () => {
      document.querySelectorAll<HTMLVideoElement>("video[data-media-video]").forEach((o) => { if (o !== v && !o.paused) o.pause(); });
    };
    v.addEventListener("play", onPlay);
    const onTime = () => { if (!cues?.length) return; const t = v.currentTime; let c: string | null = null; for (const x of cues) if (t >= x.at) c = x.label; setCue(c); };
    v.addEventListener("timeupdate", onTime);
    return () => { io?.disconnect(); v.removeEventListener("play", onPlay); v.removeEventListener("timeupdate", onTime); };
  }, [cues]);
  return (
    <>
      <video ref={ref} data-media-video controls muted playsInline preload="none" poster={poster} className={className} aria-label={label} {...rest}>
        <source src={src} type="video/mp4" />
      </video>
      {cues?.length ? <p className="pointer-events-none absolute bottom-14 left-4 rounded-pill bg-ink-950/80 px-3 py-1 text-[0.8125rem] font-medium text-ivory" aria-live="polite" data-media-cue={cue ?? ""} hidden={!cue}>{cue}</p> : null}
    </>
  );
}
