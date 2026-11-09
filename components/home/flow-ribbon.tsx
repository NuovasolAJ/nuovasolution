"use client";

import { useRef, useState } from "react";
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ClipboardList, Inbox, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import type { ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { Mark } from "@/components/ui/mark";
import { cn } from "@/lib/utils";

/**
 * The flow (the owner's P1/P2 of 09.11.2026; Copy 1105 v3 §17 and 1108 V-1/V-2): no boxes, no frames. One line draws itself from
 * station to station as the page scrolls (an SVG path whose drawn length follows the scroll position; on the narrow window a vertical
 * line), and each station appears when the line reaches it: the icon rises in its thin ring, the title and the line below. Every
 * icon shares one style — a line icon in a ring; the second station carries the NuovaSolution mark in the same ring (no black
 * square). The small arrowheads at each station's entry appear with the station. With reduced motion and without JavaScript the
 * line stands drawn and every station stands.
 */
const PATH = "M 150 70 C 260 70, 300 40, 450 40 C 600 40, 620 100, 750 100 C 880 100, 930 70, 1050 70";
const STATION_X = [150, 450, 750, 1050];
const STATION_Y = [70, 40, 100, 70];

export function FlowRibbon({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.flow;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const drawn = useTransform(smooth, [0, 1], [0.001, 1]);
  const [lit, setLit] = useState(0);
  // a station lights when the drawn line has reached it (the first at the start, the last at the end)
  useMotionValueEvent(smooth, "change", (v) => setLit(Math.min(4, Math.max(0, Math.floor(v * 3 + 1.0001)))));
  const nodes = w.nodes(locale, view);
  const icons = [Inbox, null, ClipboardList, Users];

  return (
    <section aria-labelledby="flow-h" className="flow" data-flow>
      <div className="container-default">
        <Rise className="flow-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="flow-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <div ref={ref} className="fl" data-flow-ribbon data-flow-lit={lit}>
          {/* the line on the wide window: one path through the four stations, drawn by the scroll; the arrowheads appear per station */}
          <svg className="fl-svg" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d={PATH} className="fl-line-base" pathLength={1} />
            <m.path d={PATH} className="fl-line" pathLength={1} style={{ pathLength: drawn }} data-flow-fill />
            {STATION_X.slice(1).map((x, i) => (
              <g key={x} className={cn("fl-arrow", i + 2 <= lit && "is-on")} transform={`translate(${x - 46} ${STATION_Y[i + 1]})`} data-flow-arrow={i + 2}>
                <path d="M -8 -7 L 2 0 L -8 7" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </svg>
          {/* the line on the narrow window: vertical, drawn the same way (CSS scaleY from the spring) */}
          <div className="fl-vline" aria-hidden="true"><m.span className="fl-vline-fill" style={{ scaleY: drawn }} /></div>
          <ol className="fl-steps">
            {nodes.map((n, i) => {
              const Icon = icons[i];
              const on = i < lit;
              return (
                <li key={n.title} className={cn("fl-step", on && "is-lit")} style={{ ["--fy" as string]: `${STATION_Y[i] - 70}px` }} data-flow-node={i + 1} data-lit={on ? "true" : "false"}>
                  <span className="fl-ring" aria-hidden="true">{Icon ? <Icon size={24} strokeWidth={1.8} /> : <Mark size={26} className="fl-mark" />}</span>
                  <span className="fl-title">{n.title}</span>
                  <span className="fl-line-text m-hide">{n.line}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
