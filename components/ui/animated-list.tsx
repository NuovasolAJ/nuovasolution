"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Items that arrive one after another, the newest on top (or in order, `keepOrder`).
 * Source: Animated List by Magic UI (Dillion Verma), https://21st.dev/@dillionverma/components/animated-list (MIT).
 * Adapted: the items appear once, in order, and stay (the original cycles for ever); `m` from framer-motion's
 * LazyMotion instead of `motion`; no layout animation. The run starts when the list enters the window
 * (`startOnView`), runs once, and can be restarted through `replayKey`; with reduced motion every item stands at
 * once (final order 2026-10-12 §4: animation once on entry, understandable end states without motion).
 */
export function AnimatedList({ children, className, delay = 900, startDelay = 300, startOnView = true, keepOrder = false, replayKey = 0 }: { children: ReactNode; className?: string; delay?: number; startDelay?: number; startOnView?: boolean; keepOrder?: boolean; replayKey?: number }) {
  const items = Children.toArray(children);
  const [shown, setShown] = useState(0);
  const [armed, setArmed] = useState(!startOnView);
  const root = useRef<HTMLDivElement>(null);

  // Reduced motion: no staggering, the end state at once.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(items.length); setArmed(true); }
  }, [items.length]);

  useEffect(() => {
    if (!startOnView || armed) return;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") { setArmed(true); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setArmed(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView, armed]);

  // A replay starts the run again from nothing.
  useEffect(() => { if (replayKey > 0) setShown(0); }, [replayKey]);

  useEffect(() => {
    if (!armed || shown >= items.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? startDelay : delay);
    return () => window.clearTimeout(id);
  }, [armed, shown, items.length, delay, startDelay]);

  const visible = keepOrder ? items.slice(0, shown) : items.slice(0, shown).reverse();
  return (
    <div ref={root} className={cn("flex flex-col gap-3", className)} aria-live="polite" data-animated-list={shown >= items.length ? "done" : armed ? "running" : "waiting"}>
      <AnimatePresence initial={false}>
        {visible.map((item, i) => (
          <m.div key={(item as { key?: string | null }).key ?? i} initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 350, damping: 40 }}>
            {item}
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
