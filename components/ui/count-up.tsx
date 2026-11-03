"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * A figure that counts up to its value once it is in view. After Number Ticker by Magic UI (MIT; research 1103 §3): a motion
 * value on a spring, written into the element's text. Adapted: locale-aware formatting, the final figure stands from the first
 * paint for anyone without JavaScript or with reduced motion (the server renders the value; the count only runs over it).
 */
export function CountUp({ value, locale, className, delay = 0 }: { value: number; locale: "es" | "en"; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 42, stiffness: 90 });
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const fmt = (n: number) => new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB", { maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setTimeout(() => mv.set(value), delay);
    return () => window.clearTimeout(t);
  }, [inView, reduce, mv, value, delay]);

  useEffect(() => {
    if (reduce) return;
    return spring.on("change", (v) => { if (ref.current) ref.current.textContent = fmt(Math.round(v)); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spring, reduce, locale]);

  return <span ref={ref} className={className} data-count-up={value}>{fmt(value)}</span>;
}
