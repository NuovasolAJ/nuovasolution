"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/**
 * A video that behaves on a long page (closing order 26.10. §5): it loads nothing but its poster until it comes near the
 * window (preload none → metadata), it pauses when it leaves the window, and when one plays every other one pauses, so no
 * two clips load and play at once. Native controls; the poster is the recording's own first frame, so the box is never
 * black. Nothing autoplays, with or without reduced motion. A video stays recognisable as a recording: no interactivity is
 * pretended beyond play, pause and full screen.
 */
export function MediaVideo({ src, poster, label, className, ...rest }: { src: string; poster: string; label: string; className?: string } & Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "poster" | "className">) {
  const ref = useRef<HTMLVideoElement>(null);
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
    return () => { io?.disconnect(); v.removeEventListener("play", onPlay); };
  }, []);
  return (
    <video ref={ref} data-media-video controls muted playsInline preload="none" poster={poster} className={className} aria-label={label} {...rest}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
