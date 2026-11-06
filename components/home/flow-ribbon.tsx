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
 * The flow (the owner's point 6 of 06.11.2026; Copy 1105 v3 §17 F-1 … F-5): four connected fields on one track. As the page
 * scrolls the track fills in the accent colour and each field lights up when the fill reaches it; the NuovaSolution mark (a vector,
 * exactly centred) sits in the second field; the four stations stand on one line (the icon row has a fixed height, titles align
 * whatever the line's length). No thin lines, no arrowheads. The lines follow the view's keys and the channel list. With reduced
 * motion and without JavaScript every field stands lit and the track stands filled.
 */
export function FlowRibbon({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.flow;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 86%", "end 52%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fill = useTransform(smooth, [0, 1], [0, 1]);
  const [lit, setLit] = useState(0);
  // a station lights when the fill has passed its centre (the first at 0, the last at 1)
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
        <div ref={ref} className="flow-ribbon" data-flow-ribbon data-flow-lit={lit}>
          {/* the track between the stations and its fill (scaleX on the wide window, scaleY on the narrow one) */}
          <div className="flow-track" aria-hidden="true"><m.span className="flow-track-fill" style={{ scaleX: fill, scaleY: fill }} data-flow-fill /></div>
          <ol className="flow-nodes">
            {nodes.map((n, i) => {
              const Icon = icons[i];
              const on = i < lit;
              return (
                <li key={n.title} className={cn("flow-node", i === 1 && "flow-node-brand", on && "is-lit")} data-flow-node={i + 1} data-lit={on ? "true" : "false"}>
                  <span className="flow-node-icon" aria-hidden="true">
                    {Icon ? <Icon size={22} strokeWidth={1.9} /> : <Mark size={34} className="flow-node-logo" />}
                  </span>
                  <span className="flow-node-no tnum" aria-hidden="true">0{i + 1}</span>
                  <span className="flow-node-title">{n.title}</span>
                  <span className="flow-node-line">{n.line}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
