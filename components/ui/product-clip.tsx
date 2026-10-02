"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The one video component of the product sections (owner order 2026-10-01 §5): a short product
 * clip behind its poster. Nothing of the film is requested until the visitor presses play: the
 * page loads only the poster, lazily, in the frame's own aspect ratio (16:9 from 768 px, 4:5
 * below), so the clip never competes with the first paint and never shifts the layout. The clips
 * have no sound track; playback starts muted, only on the visitor's action, with the browser's own
 * play, pause and seek controls.
 *
 * Formats (daily_clip_v2/MANIFEST.md): desktop 16:9 and mobile 4:5, both as MP4 (the delivered WebM
 * has no duration header and cannot be seeked, so it is not offered); one poster per format and
 * language; subtitles as WebVTT per format and language. The
 * caption line under the frame follows the playback time with the same five lines, so the clip
 * is understood without sound and without the browser's subtitle menu; the VTT track is offered
 * but off by default, so nothing covers the recording.
 *
 * Nothing is laid over the picture: the label sits above the frame and the play control below
 * it, so no interface text of the capture is covered (the whole poster is clickable as well).
 */
type Fmt = "desktop" | "mobile";

/** Cue start times in seconds, read from Daily's VTT files (the five subtitles, per language). */
const CUE_STARTS: Record<"en" | "es", readonly number[]> = {
  en: [0.2, 5.574, 10.377, 12.549, 17.617],
  es: [0.2, 5.758, 10.561, 12.74, 17.801],
};

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
  /** Path prefix without language and format, e.g. "/media/daily/daily-laura". */
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
  const [fmt, setFmt] = useState<Fmt | null>(null);
  const [cue, setCue] = useState(0);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);
  const poster = (f: Fmt) => `${base}-${locale}-${f}-poster.png`;
  const starts = CUE_STARTS[locale];

  useEffect(() => {
    if (!fmt || !video.current) return;
    video.current.focus({ preventScroll: true });
    void video.current.play().catch(() => {
      /* the visitor can still press the native play control */
    });
  }, [fmt]);

  function start() {
    setFailed(false);
    setFmt(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  }

  // The film did not load (network, or a missing file): back to the poster, and say so. Never an empty player.
  function onError() {
    setFmt(null);
    setCue(0);
    setFailed(true);
  }

  function onTime() {
    const t = video.current?.currentTime ?? 0;
    let i = 0;
    for (let k = 0; k < starts.length; k++) if (t >= starts[k]) i = k;
    setCue(Math.min(i, cues.length - 1));
  }

  const src = fmt ? `${base}-${locale}-${fmt}` : null;

  return (
    <div className={className} data-clip-component>
      <p className="mb-3 inline-flex items-center gap-2 t-body-s font-medium text-text-primary">
        <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-champagne-400" />
        {posterLabel}
      </p>
      <div className={cn("relative overflow-hidden rounded-xl border border-line-hairline bg-[#f3f1ec] shadow-card aspect-[840/1052] lg:aspect-[1640/924]")} data-product-clip={src ? "playing" : "poster"}>
        {src ? (
          <video ref={video} controls muted playsInline preload="metadata" onTimeUpdate={onTime} onError={onError} className="absolute inset-0 h-full w-full" aria-label={alt} crossOrigin="anonymous">
            {/* MP4 for both formats. Daily's WebM cut carries no duration header (recorder output), so a browser
                cannot show a seek bar for it; it is kept in the handoff until a cut with cues arrives. */}
            <source src={`${src}.mp4`} type="video/mp4" onError={onError} />
            <track kind="captions" src={`${src}.vtt`} srcLang={locale} label={locale === "es" ? "Español" : "English"} />
          </video>
        ) : (
          <button type="button" onClick={start} className="group absolute inset-0 block" aria-label={`${playLabel}. ${meta}`} tabIndex={-1}>
            <picture>
              <source media="(max-width: 767px)" srcSet={poster("mobile")} width={840} height={1052} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster("desktop")} width={1640} height={924} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
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
