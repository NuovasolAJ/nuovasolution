"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, type ClaimView } from "@/lib/claims";
import { CompareToggle, type CompareMode } from "@/components/report/compare-toggle";
import { cn } from "@/lib/utils";

/**
 * The block "Sin / Con NuovaSolution" (the owner's point 15 of 06.11.2026; Copy 1105 v3 §19): one fictional week, the same as the
 * report's, told twice. The switch chooses the state; the rows keep both figures in sight (the chosen one lifted) and the close
 * of the state crossfades. No €, no %, no revenue line, no change to the 6 viewings. With reduced motion the values simply
 * change. The block hangs on the keys of §19 (replySpanish, crm, replyOutOfHours): if any of them is off it is not rendered.
 */
export function CompareBlock({ locale, view, id = "cmp" }: { locale: Locale; view: ClaimView; id?: string }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.compare;
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<CompareMode>("with");
  if (!live(w.keys, view) || !(live("replyWhatsapp", view) || live("replyEmail", view))) return null;
  const rows = w.rows(locale, view);
  const close = mode === "with" ? l(w.closeWith(view)) : l(w.closeWithout);

  return (
    <section className="cmpb" aria-label={`${l(w.without)} · ${l(w.with)}`} data-compare-block data-compare-mode={mode}>
      <div className="cmpb-head">
        <CompareToggle locale={locale} mode={mode} onChange={setMode} label={l(w.mark)} without={l(w.without)} with_={l(w.with)} id={id} />
        <p className="cmpb-lead">{l(w.lead)}</p>
      </div>
      {/* one header row names the two columns; the cells carry only the figures */}
      <div className="cmpb-row cmpb-row-head" aria-hidden="true">
        <span className="cmpb-k" />
        <span className={cn("cmpb-h cmpb-v-without", mode === "without" && "is-on")}>{l(w.without)}</span>
        <span className={cn("cmpb-h cmpb-v-with", mode === "with" && "is-on")}>{l(w.with)}</span>
        <span className="cmpb-d" />
      </div>
      <dl className="cmpb-rows">
        {rows.map((r, i) => (
          <div key={r.k} className="cmpb-row" data-compare-row={i + 1}>
            <dt className="cmpb-k">{r.k}</dt>
            <dd className={cn("cmpb-v cmpb-v-without", mode === "without" && "is-on")} data-compare-without={r.without}><span className="sr-only">{l(w.without)}: </span><span className="cmpb-v-figure tnum">{r.without}</span></dd>
            <dd className={cn("cmpb-v cmpb-v-with", mode === "with" && "is-on")} data-compare-with={r.with}><span className="sr-only">{l(w.with)}: </span><span className="cmpb-v-figure tnum">{r.with}</span></dd>
            <dd className="cmpb-d">{r.d}</dd>
          </div>
        ))}
      </dl>
      <div className="cmpb-close" aria-live="polite">
        <AnimatePresence mode="sync" initial={false}>
          <m.p key={mode} className="cmpb-close-text" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.16 } }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }} data-compare-close={mode}>{close}</m.p>
        </AnimatePresence>
      </div>
      <p className="cmpb-assumption">{l(w.assumption)}</p>
    </section>
  );
}
