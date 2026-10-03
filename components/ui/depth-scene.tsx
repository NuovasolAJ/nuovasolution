"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A scene with three layers that move at slightly different speeds while the page scrolls (owner
 * order 2026-10-01 §2). This component only measures: it writes `--depth`, 0 where the scene stands with
 * the page at its top (or enters at the bottom of the window) and growing to 1 as it leaves at the top, and the CSS in
 * globals.css ("Depth") moves the layers marked `data-depth-layer="back"` and `"front"` by their own
 * distance. Own means, no library: one scroll listener with requestAnimationFrame is all this effect needs.
 *
 * - Without JavaScript and with reduced motion the layers stand still; the picture is complete.
 * - The still picture carries the depth on its own (size, overlap, shadows); the motion only confirms it.
 */
const MEDIA = "(prefers-reduced-motion: no-preference)";

export function DepthScene({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(MEDIA);
    let frame = 0;

    function measure() {
      frame = 0;
      if (!mq.matches) {
        el!.style.removeProperty("--depth");
        return;
      }
      const r = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 at the bottom edge of the window, 1 once the scene has scrolled out at the top.
      const travel = vh + r.height;
      const at = (top: number) => Math.min(1, Math.max(0, (vh - top) / travel));
      // Measured from where the scene stands when the page is at its top: a scene in the first screen is
      // then exactly as it was laid out (no layer shifted before anyone has scrolled), and moves only from there.
      const seen = at(r.top) - at(r.top + window.scrollY);
      el!.style.setProperty("--depth", Math.max(0, seen).toFixed(4));
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener?.("change", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener?.("change", onScroll);
    };
  }, []);

  return (
    <Tag ref={ref} data-depth="" className={cn("relative", className)}>
      {children}
    </Tag>
  );
}
