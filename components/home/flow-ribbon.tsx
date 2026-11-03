"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ClipboardList, Inbox, Sparkles, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { Rise } from "@/components/ui/motion";

/**
 * The flow in four words (the owner's order of 03.11.2026, point 4; research 1103 S2 Glaido): Consulta → Nuova → Ficha → Tu
 * equipo. The line between the nodes draws itself as the ribbon scrolls through the window (scroll-linked `pathLength`), and a
 * light travels along it once it is drawn. With reduced motion and without JavaScript the line stands drawn.
 */
const ICONS = [Inbox, Sparkles, ClipboardList, Users];

export function FlowRibbon({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.flow;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const drawn = useTransform(smooth, [0, 1], [0, 1]);
  const nodes = l(w.nodes);

  return (
    <section aria-labelledby="flow-h" className="flow" data-flow>
      <div className="container-default">
        <Rise className="flow-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="flow-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <div ref={ref} className="flow-ribbon" data-flow-ribbon>
          <svg className="flow-line" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0 40 H 1200" className="flow-line-base" />
            <m.path d="M 0 40 H 1200" className="flow-line-draw" style={{ pathLength: reduce ? 1 : drawn }} data-flow-line />
          </svg>
          <ol className="flow-nodes">
            {nodes.map((n, i) => {
              const Icon = ICONS[i];
              return (
                <Rise as="li" key={n.title} delay={i * 0.12} y={14} className="flow-node" data-flow-node={i + 1}>
                  <span className="flow-node-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                  <span className="flow-node-title">{n.title}</span>
                  <span className="flow-node-line">{n.line}</span>
                </Rise>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
