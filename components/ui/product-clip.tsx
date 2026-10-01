"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A short product clip behind a poster (owner order 2026-09-29 C). Nothing of the film is
 * requested until the visitor presses play: the page loads only the poster, lazily, in the
 * frame's own aspect ratio (16:9 from 768 px, 4:5 below), so the clip never competes with the
 * first paint and never shifts the layout. The clips have no sound track; playback starts
 * muted, only on the visitor's action, with the browser's own play, pause and seek controls.
 *
 * Nothing is laid over the picture: the label sits above the frame and the play control below
 * it, so no interface text of the capture is covered (the whole poster is clickable as well).
 * The three cues (COPY_DELTAS_0929 §5.1) are a caption line under the frame, matched to the
 * visible action by the playback time, so the clip is understood without sound and without the
 * browser's subtitle menu. The same three lines are also a subtitle track (WebVTT, COPY_DELTAS_0930 §4), off by
 * default so nothing covers the recording; the player's captions control switches it on.
 */
// Seconds, measured on the four clips with scripts/design/clip-cues.mjs (largest picture changes at 7.0 s and
// 13.5 s in every cut): the list at rest · the agent takes the task · the task is completed and leaves the list.
const CUE_STARTS = [0, 7, 13.5];

export function ProductClip({
  base,
  locale,
  playLabel,
  meta,
  alt,
  posterLabel,
  cues,
  errorLabel,
  className,
}: {
  /** Path prefix without language and format, e.g. "/media/daily/daily-claim-flow". */
  base: string;
  locale: "en" | "es";
  playLabel: string;
  meta: string;
  alt: string;
  posterLabel: string;
  cues: readonly string[];
  /** Shown in place of the caption when the film cannot be loaded; the poster comes back. */
  errorLabel: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [cue, setCue] = useState(0);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);
  const posterBase = base.replace("claim-flow", "clip-poster");
  const posterDesktop = `${posterBase}-${locale}-desktop.png`;
  const posterMobile = `${posterBase}-${locale}-mobile.png`;

  useEffect(() => {
    if (!src || !video.current) return;
    video.current.focus({ preventScroll: true });
    void video.current.play().catch(() => {
      /* the visitor can still press the native play control */
    });
  }, [src]);

  function start() {
    setFailed(false);
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(`${base}-${locale}-${mobile ? "mobile" : "desktop"}.mp4`);
  }

  // The film did not load (network, or a missing file): back to the poster, and say so. Never an empty player.
  function onError() {
    setSrc(null);
    setCue(0);
    setFailed(true);
  }

  function onTime() {
    const t = video.current?.currentTime ?? 0;
    let i = 0;
    for (let k = 0; k < CUE_STARTS.length; k++) if (t >= CUE_STARTS[k]) i = k;
    setCue(i);
  }

  return (
    <div className={className}>
      <p className="mb-3 inline-flex items-center gap-2 t-body-s font-medium text-text-primary">
        <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-sky-700" />
        {posterLabel}
      </p>
      <div className={cn("relative overflow-hidden rounded-xl border border-line-hairline bg-[#f5f6f8] shadow-card aspect-[840/1052] lg:aspect-[1756/988]")} data-product-clip={src ? "playing" : "poster"}>
        {src ? (
          <video ref={video} src={src} controls muted playsInline preload="metadata" onTimeUpdate={onTime} onError={onError} className="absolute inset-0 h-full w-full" aria-label={alt}>
            <track kind="captions" src={`${base}-${locale}.vtt`} srcLang={locale} label={locale === "es" ? "Español" : "English"} />
          </video>
        ) : (
          <button type="button" onClick={start} className="group absolute inset-0 block" aria-label={`${playLabel}. ${meta}`} tabIndex={-1}>
            <picture>
              <source media="(max-width: 767px)" srcSet={posterMobile} width={840} height={1052} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posterDesktop} width={1756} height={988} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        {!src && (
          <button type="button" onClick={start} data-clip-play className="inline-flex shrink-0 items-center gap-3 self-start rounded-pill bg-ink-950 py-2 pl-2 pr-5 text-ivory shadow-card transition-transform duration-control hover:-translate-y-0.5">
            <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-ivory text-ink-950">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3.5 1.8v10.4a.6.6 0 00.92.5l8.1-5.2a.6.6 0 000-1L4.42 1.3a.6.6 0 00-.92.5z" /></svg>
            </span>
            <span className="text-left">
              <span className="block t-body-s font-medium leading-tight">{playLabel}</span>
              <span className="block t-caption text-ink-300">{meta}</span>
            </span>
          </button>
        )}
        {/* The caption line: always present, so starting the clip moves nothing above it. */}
        {failed ? (
          <p role="status" className="t-body-s font-medium text-signal-attention" data-clip-error>{errorLabel}</p>
        ) : (
          <p className="t-body-s font-medium text-text-primary" data-clip-cue={cue}>
            {cues[src ? cue : 0]}
          </p>
        )}
      </div>
    </div>
  );
}
