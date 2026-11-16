"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { demoChannels, demoWords } from "@/lib/content/home-demo";
import type { ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * "Cómo funciona" as the product's own story (the owner's correction order of 16.11.2026, point 5; REFERENZEN §6 "scroll story"):
 * the four steps of Copy's flow (lib/content/home-1103.ts) on the left, and on the right ONE product frame in which the pieces of
 * Laura's WhatsApp enquiry accumulate as the reader scrolls — the message arrives, the reply appears, the record fills, the priority
 * and the next task stand. The pieces are the demonstration's own data (lib/content/home-demo.ts), so the story and the demo never
 * disagree. On a narrow window every step carries its piece under it (no sticky frame). With reduced motion and without JavaScript
 * everything stands at once, and no step is ever so pale that it looks switched off.
 */
export function FlowStory({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.flow;
  const nodes = w.nodes(locale, view);
  const c = demoChannels.find((x) => x.key === "whatsapp")!;
  const chat = c.chat!;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? 4 : 1);
  const stepsRef = useRef<HTMLOListElement>(null);

  // the step at the middle of the window is the active one; a step never goes back below what was already shown
  useEffect(() => {
    const root = stepsRef.current;
    if (!root || reduce) { setActive(4); return; }
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-flow-step]"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive((a) => Math.max(a, Number((e.target as HTMLElement).dataset.flowStep)));
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    for (const it of items) io.observe(it);
    return () => io.disconnect();
  }, [reduce]);

  const piece = (n: number): ReactNode => {
    if (n === 1) return (
      <div className="fs-chat" data-fs-piece="message">
        <p className="demo-msg demo-msg-in"><span>{l(chat.message)}</span><span className="demo-msg-time tnum">{chat.time}</span></p>
      </div>
    );
    if (n === 2) return (
      <div className="fs-chat" data-fs-piece="reply">
        <p className="demo-msg demo-msg-out"><span className="demo-msg-label">{l(demoWords.assistant)}</span><span>{l(chat.reply)}</span><span className="demo-msg-time tnum">{chat.replyTime}</span></p>
      </div>
    );
    if (n === 3) return (
      <div className="fs-record demo-record" data-fs-piece="record">
        <div className="demo-record-head"><p className="demo-key">{l(c.record.title!)}</p><p className="demo-record-updated tnum">{l(c.record.updated)}</p></div>
        <dl className="demo-fields">
          {c.record.fields.slice(0, 5).map((f, i) => (
            <div key={i} className="demo-field" style={{ ["--i" as string]: i }}><dt className="demo-key">{l(f.k)}</dt><dd className="demo-value">{l(f.v)}</dd></div>
          ))}
        </dl>
      </div>
    );
    return (
      <div className="fs-record demo-record" data-fs-piece="priority">
        <div className="demo-outcome">
          <div className="demo-outcome-row"><span className="demo-key">{l(demoWords.priority)}</span><span className="demo-value"><span className="demo-priority">{l(c.record.priority.v)}</span> · {l(c.record.priority.why)}</span></div>
          <div className="demo-next"><span className="demo-key">{l(demoWords.next)}</span><span className="demo-next-value">{l(c.record.next.v)}</span><span className="demo-next-sub">{l(c.record.next.sub)}</span></div>
        </div>
      </div>
    );
  };

  return (
    <section aria-labelledby="flow-h" className="flow fs" data-flow data-flow-story data-flow-active={active}>
      <div className="container-default">
        <Rise className="flow-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="flow-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <div className="fs-grid">
          <ol ref={stepsRef} className="fs-steps">
            {nodes.map((n, i) => {
              const k = i + 1;
              const on = k <= active;
              return (
                <li key={n.title} className={cn("fs-step", on && "is-on", k === active && "is-current")} data-flow-step={k} data-flow-node={k}>
                  <span className="fs-no" aria-hidden="true">{on ? <Check size={14} strokeWidth={3} /> : <span className="tnum">{k}</span>}</span>
                  <div className="fs-words">
                    <h3 className="fs-title">{n.title}</h3>
                    <p className="fs-line">{n.line}</p>
                  </div>
                  {/* the narrow window: the step's piece under its words */}
                  <div className="fs-piece-inline" aria-hidden="true">{piece(k)}</div>
                </li>
              );
            })}
          </ol>
          {/* the wide window: one frame in which the pieces accumulate */}
          <div className="fs-stage" aria-hidden="true" data-flow-stage>
            <div className="fs-frame">
              {[1, 2, 3, 4].map((k) => (
                <div key={k} className={cn("fs-piece", k <= active && "is-on")} data-fs-at={k}>{piece(k)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
