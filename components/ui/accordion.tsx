"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Questions that open one at a time.
 * Source: Accordion by motion-primitives (Julien Thibeaut), https://21st.dev/@ibelick/components/accordion (MIT):
 * one expanded value, a trigger with aria-expanded, the content animated from height 0 to auto with
 * AnimatePresence. Adapted: `m` through LazyMotion, a native button with aria-controls and a region, the
 * chevron of the shadcn trigger, and all items closed at the start so the page is short; with reduced
 * motion the content simply appears. Without JavaScript every answer is open (the page is still complete).
 */
export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("divide-y divide-line-hairline border-y border-line-hairline", className)} data-accordion>
          {items.map((it) => {
            const expanded = open === it.id;
            const panel = `${base}-${it.id}`;
            return (
              <div key={it.id} data-accordion-item={expanded ? "open" : "closed"}>
                <h3>
                  <button type="button" onClick={() => setOpen(expanded ? null : it.id)} aria-expanded={expanded} aria-controls={panel} className="flex w-full items-center justify-between gap-4 py-4 text-left md:py-5">
                    <span className="t-heading-s text-text-primary">{it.question}</span>
                    <ChevronDown size={18} aria-hidden="true" className={cn("shrink-0 text-text-muted transition-transform duration-control", expanded && "rotate-180")} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <m.div id={panel} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="pb-5 t-body-m text-text-secondary measure-body">{it.answer}</div>
                    </m.div>
                  )}
                </AnimatePresence>
                {/* Without JavaScript the answer stands open (noscript cannot be nested here, so the stylesheet shows it). */}
                <noscript><div className="pb-5 t-body-m text-text-secondary measure-body">{it.answer}</div></noscript>
              </div>
            );
          })}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
