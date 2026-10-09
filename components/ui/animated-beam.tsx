"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A short travelling light along a curve from one element to another: the connection channel → record.
 * Source: Animated Beam by Magic UI, registry/magicui/animated-beam.tsx (MIT).
 * Adapted: `m` from framer-motion's LazyMotion instead of `motion/react`; the path is measured once and on
 * resize (ResizeObserver as in the source); the gradient runs in the brand gold on a hairline, three times
 * and then rests, so the line stays as a drawn connection; `aria-hidden` (the words beside it explain).
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 2.2,
  delay = 0,
  repeat = 3,
  className,
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  repeat?: number;
  className?: string;
}) {
  const id = useId();
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      const c = containerRef.current, a = fromRef.current, b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect(), ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
      setSize({ w: cr.width, h: cr.height });
      const sx = ar.left - cr.left + ar.width, sy = ar.top - cr.top + ar.height / 2;
      const ex = br.left - cr.left, ey = br.top - cr.top + br.height / 2;
      setD(`M ${sx},${sy} C ${sx + (ex - sx) * 0.5},${sy - curvature} ${sx + (ex - sx) * 0.5},${ey + curvature} ${ex},${ey}`);
    };
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    update();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg aria-hidden="true" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={cn("pointer-events-none absolute left-0 top-0", className)}>
      <path d={d} stroke="var(--ink-200)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d={d} stroke={`url(#${id})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <defs>
        <m.linearGradient id={id} gradientUnits="userSpaceOnUse" initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }} animate={{ x1: ["10%", "110%"], x2: ["0%", "100%"] }} transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat, repeatDelay: 0.6 }}>
          <stop stopColor="var(--champagne-400)" stopOpacity="0" />
          <stop stopColor="var(--champagne-400)" />
          <stop offset="32.5%" stopColor="var(--champagne-700)" />
          <stop offset="100%" stopColor="var(--champagne-700)" stopOpacity="0" />
        </m.linearGradient>
      </defs>
    </svg>
  );
}
