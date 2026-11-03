"use client";

import { LazyMotion, MotionConfig, domAnimation, m, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * The one animation provider of the home page (research 1103 §3: Motion's React API through the `framer-motion` package the
 * repo already ships; features loaded lazily, reduced motion honoured by `MotionConfig`). Every animated piece below the hero
 * uses `m` so one bundle serves the page.
 */
export function Motion({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/**
 * A block that rises into place once, when it enters the window (owner review 02.11. §8: small position changes and clear state
 * changes instead of transparent fades only). Content is in the document and readable from the first paint: the block starts at
 * 0 opacity only when JavaScript runs and reduced motion is off; the `html:not(.js)` rule in globals.css keeps it visible otherwise.
 */
export function Rise({ children, className, delay = 0, as = "div", y = 18, once = true, amount = 0.12, ...rest }: { children: ReactNode; className?: string; delay?: number; as?: ElementType; y?: number; once?: boolean; amount?: number } & Record<string, unknown>) {
  const reduce = useReducedMotion();
  const Tag = m[as as keyof typeof m] as typeof m.div;
  return (
    <Tag
      className={cn("mrise", className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Tells a child whether its box is in view (once), for animations that run on their own timers. */
export function useSeen(amount = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount });
  return { ref, seen };
}
