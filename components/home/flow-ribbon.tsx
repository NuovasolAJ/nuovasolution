"use client";

import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { ClipboardList, Inbox, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { Rise } from "@/components/ui/motion";

/**
 * The flow (the owner's order of 05.11.2026, point 4): one animated path with arrows that runs as the page scrolls, the
 * NuovaSolution logo in the middle, no grey line. The message: NuovaSolution does the work, the team only attends the viewing.
 * The path is drawn scroll-linked (`pathLength`), the arrowheads follow it; with reduced motion (a CSS override of the inline
 * dash) and without JavaScript the path stands drawn.
 */
export function FlowRibbon({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.flow;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 45%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const drawn = useTransform(smooth, [0, 1], [0, 1]);
  const d2 = useTransform(drawn, [0.33, 0.66], [0, 1]);
  const d3 = useTransform(drawn, [0.66, 1], [0, 1]);
  const a1 = useTransform(smooth, [0.25, 0.4], [0, 1]);
  const a2 = useTransform(smooth, [0.55, 0.7], [0, 1]);
  const a3 = useTransform(smooth, [0.85, 1], [0, 1]);
  const nodes = l(w.nodes);
  const icons = [Inbox, null, ClipboardList, Users];

  return (
    <section aria-labelledby="flow-h" className="flow" data-flow>
      <div className="container-default">
        <Rise className="flow-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="flow-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <div ref={ref} className="flow-ribbon" data-flow-ribbon>
          {/* the path: three arcs between the four stations, drawn on scroll; the arrowheads appear as the path reaches them */}
          <svg className="flow-path" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="flow-grad" x1="0" x2="1"><stop offset="0" stopColor="var(--brand)" stopOpacity="0.35" /><stop offset="1" stopColor="var(--brand)" /></linearGradient>
            </defs>
            <m.path d="M 150 80 C 260 20, 340 20, 450 80" className="flow-path-draw" style={{ pathLength: drawn }} data-flow-line />
            <m.path d="M 450 80 C 560 140, 640 140, 750 80" className="flow-path-draw" style={{ pathLength: d2 }} />
            <m.path d="M 750 80 C 860 20, 940 20, 1050 80" className="flow-path-draw" style={{ pathLength: d3 }} />
            {/* the arrowheads end at the left edge of the next station's mark (its halo lets the path pass behind it) */}
            <m.path d="M 384 67 L 404 80 L 384 93" className="flow-arrow" style={{ opacity: a1 }} />
            <m.path d="M 684 67 L 704 80 L 684 93" className="flow-arrow" style={{ opacity: a2 }} />
            <m.path d="M 984 67 L 1004 80 L 984 93" className="flow-arrow" style={{ opacity: a3 }} />
          </svg>
          <ol className="flow-nodes">
            {nodes.map((n, i) => {
              const Icon = icons[i];
              return (
                <Rise as="li" key={n.title} delay={i * 0.12} y={14} className={i === 1 ? "flow-node flow-node-brand" : "flow-node"} data-flow-node={i + 1}>
                  <span className="flow-node-icon" aria-hidden="true">
                    {Icon ? <Icon size={22} strokeWidth={1.9} /> : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/images/nuova-icon.png" alt="" width={200} height={200} className="flow-node-logo" data-flow-logo />
                    )}
                  </span>
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
