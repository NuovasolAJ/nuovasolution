"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. Opacity + 12/16 px translate, once, threshold 0.2.
 * Content is visible without JS (html.js gating in globals.css) and under
 * reduced motion. Stagger is capped at 5 items by the caller.
 */
export function Reveal({
  children,
  delay = 0,
  mode = "slide",
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  mode?: "slide" | "opacity";
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)} data-reveal={mode} style={{ ["--reveal-delay" as string]: `${Math.min(delay, 300)}ms` }}>
      {children}
    </Tag>
  );
}

/** A vertical hairline that draws from top to bottom once, on entry. */
export function DrawRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} aria-hidden="true" className={cn("rule-vertical draw-rule", className)} />;
}
