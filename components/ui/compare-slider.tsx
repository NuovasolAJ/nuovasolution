"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Two views of the same thing, one revealed over the other by a handle: the floor plan and the model of
 * the same property. The visible purpose is that of Image Compare by kuratlielia,
 * https://21st.dev/@kuratlielia/components/image-compare (MIT, but the source is served only with a 21st
 * API key), so this is our own implementation: a native range input drives the split, which makes it
 * keyboard-operable (arrow keys) and screen-reader-labelled without extra code; no pointer tracking of our own.
 */
export function CompareSlider({ before, after, label, beforeLabel, afterLabel, className, initial = 50, sweepFrom }: { before: ReactNode; after: ReactNode; label: string; beforeLabel: string; afterLabel: string; className?: string; initial?: number; /** the handle sweeps from here to `initial` once on mount (the owner's order of 03.11., point 6: empty → furnished as a movement); not with reduced motion */ sweepFrom?: number }) {
  const [pos, setPos] = useState(sweepFrom ?? initial);
  const id = useId();
  useEffect(() => {
    if (sweepFrom === undefined || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPos(initial); return; }
    let raf = 0; const t0 = performance.now(); const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = () => { const p = Math.min(1, (performance.now() - t0) / 1400); setPos(sweepFrom + (initial - sweepFrom) * ease(p)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cn("relative select-none overflow-hidden rounded-lg", className)} data-compare={Math.round(pos)}>
      {/* 13.11. (RV6 D-3/D-8): both pictures take the slider's own box, so the before and the after view are the same size at every width */}
      <div className="relative h-full">{before}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>{after}</div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="h-full w-0.5 bg-ink-950" />
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-ink-950 text-ivory shadow-overlay">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3L1 7l3 4M10 3l3 4-3 4" /></svg>
        </div>
      </div>
      <span aria-hidden="true" className="absolute left-3 top-3 rounded-pill bg-ink-950/85 px-2.5 py-1 text-[0.75rem] font-medium text-ivory">{beforeLabel}</span>
      <span aria-hidden="true" className="absolute right-3 top-3 rounded-pill bg-ink-950/85 px-2.5 py-1 text-[0.75rem] font-medium text-ivory">{afterLabel}</span>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="compare-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0" aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`} data-compare-range />
    </div>
  );
}
