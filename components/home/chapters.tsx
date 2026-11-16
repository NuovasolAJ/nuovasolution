"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, withChannels, type ClaimView } from "@/lib/claims";
import { Surface, type SceneKey } from "./functions";
import { Rise } from "@/components/ui/motion";
import { ExtraCards } from "./extra-cards";
import { cn } from "@/lib/utils";

/**
 * The three areas Atiende · Organiza · Crece at one glance (the owner's P3 of 09.11.2026; Copy 1105 v3 §18 for the names, the
 * chapter lines and the scenes): three cards side by side (on the phone one row to swipe through), each with one picture — the
 * chapter's first product surface — its chapter line and at most two key points (the first two scenes' titles). One click opens
 * the chapter's scenes under the row, each with its title, its line and its surface; a second click closes it. No counters, no
 * numbers, no fold text. Every scene hangs on its keys (lib/claims.ts): the public view shows what is included; a chapter with no
 * scene left is hidden. Reduced motion: the panel appears at once. Without JavaScript every chapter's scenes stand open in the
 * document (the CSS net keeps them visible).
 */
type Chapter = (typeof home1103.functions.chapters)[number];

export function Chapters({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.functions;
  const ui = home1103.chapterUi;
  const items = w.items.filter((it) => live(it.keys, view));
  const chapters = w.chapters.filter((c) => items.some((it) => it.chapter === c.key));
  const [open, setOpen] = useState<Chapter["key"] | null>(null);
  const reduce = useReducedMotion();
  /** 16.11. 14:00 (Audit): the detail opens directly under the clicked card (the slot sits in the row) and the window moves softly to it; one open at a time. */
  const toggle = (key: Chapter["key"]) => {
    const opening = open !== key;
    setOpen(opening ? key : null);
    if (!opening) return;
    window.setTimeout(() => document.getElementById(`ch-detail-${key}`)?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" }), 40);
  };
  const scenesOf = (c: Chapter) => items.filter((it) => it.chapter === c.key);
  const line = (it: (typeof items)[number]) => withChannels(l(it.line(view)), locale, view);
  // Copy 1113 §2 (16.11.): one sentence and up to four points per area; a point with an open proof leaves the public view
  const copy = home1103.chapterCopy;
  const core = home1103.phoneCore.areas(view); // Copy 441ba1c §10: the phone's core and proof line per area
  const cardLine = (c: Chapter) => { const k = copy[c.key]; return view === "public" && "linePublic" in k && k.linePublic ? l(k.linePublic) : l(k.line); };
  type Pt = { t: Record<Locale, string>; pub: "same" | "hide" | "text"; keys?: Parameters<typeof live>[0]; pubText?: Record<Locale, string> };
  const cardPoints = (c: Chapter) => (copy[c.key].points as Pt[]).filter((pt) => view === "target" || pt.pub !== "hide" || (pt.keys && live(pt.keys, view))).map((pt) => (view === "public" && pt.pub === "text" && pt.pubText && !(pt.keys && live(pt.keys, view)) ? l(pt.pubText) : l(pt.t)));

  return (
    <section id="functions" aria-labelledby="fn-h" className="ch" data-functions data-chapters data-fn-count={items.length} data-fn-view={view} data-chapter-open={open ?? "none"}>
      <div className="container-default">
        <Rise className="ch-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="fn-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>

        {/* the three areas: a grid on the wide window, one swipeable row on the phone (the row rises as one, so a card off to the side is never pale) */}
        <Rise className="ch-row" data-chapter-row delay={0.06}>
          {chapters.map((c) => {
            const scenes = scenesOf(c);
            const isOpen = open === c.key;
            return (
              <Fragment key={c.key}>
              <article className={cn("ch-card", isOpen && "is-open")} data-chapter={c.key} aria-labelledby={`ch-${c.key}`}>
                <div className="ch-visual" aria-hidden="true"><div className="ch-visual-inner"><Surface k={scenes[0].key as SceneKey} locale={locale} view={view} /></div></div>
                <h3 id={`ch-${c.key}`} className="ch-name">{l(c.name)}</h3>
                <p className="ch-line m-hide">{cardLine(c)}</p>
                <p className="m-only ch-core" data-phone-core={c.key}>{l(core[c.key].core)}</p>
                <p className="m-only ch-proof">{l(core[c.key].proof)}</p>
                <ul className="ch-points m-hide" data-chapter-points={cardPoints(c).length}>
                  {cardPoints(c).map((pt) => (
                    <li key={pt} className="ch-point"><span className="ch-point-mark" aria-hidden="true"><Check size={13} strokeWidth={2.8} /></span><span>{pt}</span></li>
                  ))}
                </ul>
                <button type="button" className="ch-more" aria-expanded={isOpen} aria-controls={`ch-detail-${c.key}`} onClick={() => toggle(c.key)} data-chapter-open-button={c.key}>
                  {isOpen ? l(ui.less) : l(ui.more).replace("{name}", l(c.name))}
                  <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" className={cn("ch-more-icon", isOpen && "is-open")} />
                </button>
              </article>
              {/* the open chapter's scenes, directly under its card (16.11. 14:00, Audit): title, line and surface each; without JavaScript every chapter stands open (CSS) */}
              <div id={`ch-detail-${c.key}`} className="ch-detail-slot" data-chapter-detail={c.key} data-open={isOpen ? "true" : "false"}>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div className="ch-detail" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduce ? undefined : { opacity: 0, height: 0, transition: { duration: 0.22 } }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="ch-detail-line">{l(c.line(view))}</p>
                    <ol className="ch-scenes">
                      {scenes.map((s) => (
                        <li key={s.key} className="ch-scene" data-fn={s.key}>
                          <div className="ch-scene-words">
                            <h4 className="ch-scene-title">{l(s.title)}</h4>
                            <p className="ch-scene-line">{line(s)}</p>
                          </div>
                          <div className="ch-scene-surface" data-fn-surface-inline={s.key}><Surface k={s.key as SceneKey} locale={locale} view={view} /></div>
                        </li>
                      ))}
                    </ol>
                  </m.div>
                )}
              </AnimatePresence>
              {/* the no-JavaScript copy of the chapter's scenes (hidden while JavaScript runs) */}
              <noscript>
                <ol className="ch-scenes ch-scenes-static">
                  {scenes.map((s) => (
                    <li key={s.key} className="ch-scene">
                      <div className="ch-scene-words"><h4 className="ch-scene-title">{l(s.title)}</h4><p className="ch-scene-line">{line(s)}</p></div>
                      <div className="ch-scene-surface"><Surface k={s.key as SceneKey} locale={locale} view={view} /></div>
                    </li>
                  ))}
                </ol>
              </noscript>
              </div>
              </Fragment>
            );
          })}
        </Rise>

        {/* 16.11. 14:00 (the owner's point 6): two more cards under the areas */}
        <ExtraCards locale={locale} view={view} />
      </div>
    </section>
  );
}
