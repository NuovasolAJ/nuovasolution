"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Items that arrive one after another, the newest on top.
 * Source: Animated List by Magic UI (Dillion Verma), https://21st.dev/@dillionverma/components/animated-list (MIT).
 * Adapted: the items appear once, in order, and stay (the original cycles for ever); `m` from
 * framer-motion's LazyMotion instead of `motion`; no layout animation (the list is short); with reduced
 * motion the whole list stands at once (`MotionConfig reducedMotion="user"` above).
 */
export function AnimatedList({ children, className, delay = 900, startDelay = 300 }: { children: ReactNode; className?: string; delay?: number; startDelay?: number }) {
  const items = Children.toArray(children);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= items.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? startDelay : delay);
    return () => window.clearTimeout(id);
  }, [shown, items.length, delay, startDelay]);
  const visible = items.slice(0, shown).reverse();
  return (
    <div className={cn("flex flex-col gap-3", className)} aria-live="polite">
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
