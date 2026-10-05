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
 * Formats (daily_clip_v3/MANIFEST.md, 2026-10-03): desktop 16:9 and mobile 4:5 as MP4; one WebP
 * poster per format and language, which is the film's opening frame; subtitles as WebVTT per format
 * and language. v3 has no text in the picture at all, so the browser's control bar covers nothing
 * (owner finding on v2). The caption line under the frame is fed by the VTT track itself: the track is
 * loaded hidden and its active cue is shown, so each format keeps its own timing (the Spanish phone
 * cut is four seconds longer than the others) and the words exist in one place only. Before play the
 * line is the first subtitle, which describes the poster.
 *
 * Nothing is laid over the picture: the label sits above the frame and the play control below
 * it, so no interface text of the capture is covered (the whole poster is clickable as well).
 */
type Fmt = "desktop" | "mobile";

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
  const poster = (f: Fmt) => `${base}-${locale}-${f}-poster.webp`;
  // The line under the frame while the film runs: the text of the VTT track's active cue.
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    const v = video.current;
    if (!fmt || !v) return;
    v.focus({ preventScroll: true });
    // The subtitle track drives the caption line: hidden (nothing is drawn over the picture), but its cues fire.
    const track = v.textTracks[0];
    const onCue = () => {
      const active = track?.activeCues?.[0] as VTTCue | undefined;
      if (!active) return;
      const n = Number(active.id);
      setCue(Number.isFinite(n) && n >= 1 ? n - 1 : 0);
      setLine(active.text);
    };
    if (track) {
      track.mode = "hidden";
      track.addEventListener("cuechange", onCue);
    }
    void v.play().catch(() => {
      /* the visitor can still press the native play control */
    });
    return () => track?.removeEventListener("cuechange", onCue);
  }, [fmt]);

  function start() {
    setFailed(false);
    setLine(null);
    setFmt(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  }

  // The film did not load (network, or a missing file): back to the poster, and say so. Never an empty player.
  function onError() {
    setFmt(null);
    setCue(0);
    setLine(null);
    setFailed(true);
  }

  const src = fmt ? `${base}-${locale}-${fmt}` : null;

  return (
    <div className={className} data-clip-component>
      {posterLabel && (
        <p className="mb-3 inline-flex items-center gap-2 t-body-s font-medium text-text-primary">
          <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-champagne-400" />
          {posterLabel}
        </p>
      )}
      <div className={cn("relative overflow-hidden rounded-xl border border-line-hairline bg-[#f3f1ec] shadow-card aspect-[840/1052] lg:aspect-[1640/924]")} data-product-clip={src ? "playing" : "poster"}>
        {src ? (
          <video ref={video} controls muted playsInline preload="metadata" onError={onError} className="absolute inset-0 h-full w-full" aria-label={alt} crossOrigin="anonymous">
            {/* MP4 for both formats (v3 ships MP4 only). */}
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
            {src ? line ?? cues[cue] : cues[0]}
          </p>
        )}
      </div>
    </div>
  );
}
