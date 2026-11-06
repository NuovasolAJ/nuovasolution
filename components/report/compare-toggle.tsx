"use client";

import { m, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * The switch "Sin / Con NuovaSolution" over the same example week (the owner's point 15 of 06.11.2026): two real buttons in a
 * segmented control, the chosen one carried by a sliding ground (a Motion layout animation; with reduced motion it simply stands
 * on the chosen side). Keyboard: the two buttons are ordinary buttons; the arrow keys move between them. Usable with a thumb: the
 * control is 44 px tall and spans the paper's width on a phone.
 */
export type CompareMode = "with" | "without";

export function CompareToggle({ locale, mode, onChange, label, without, with_, id = "compare" }: { locale: Locale; mode: CompareMode; onChange: (m: CompareMode) => void; label: string; without: string; with_: string; id?: string }) {
  const reduce = useReducedMotion();
  const options: { key: CompareMode; text: string }[] = [{ key: "without", text: without }, { key: "with", text: with_ }];
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); const next = mode === "with" ? "without" : "with"; onChange(next); (e.currentTarget.querySelector<HTMLButtonElement>(`[data-compare-option="${next}"]`))?.focus(); }
  };
  return (
    <div className="cmp" data-compare={mode} lang={locale}>
      <span className="cmp-label" id={`${id}-label`}>{label}</span>
      <div className="cmp-control" role="group" aria-labelledby={`${id}-label`} onKeyDown={onKey}>
        {options.map((o) => (
          <button key={o.key} type="button" className={cn("cmp-option", mode === o.key && "is-on")} aria-pressed={mode === o.key} onClick={() => onChange(o.key)} data-compare-option={o.key}>
            {mode === o.key && <m.span layoutId={`${id}-thumb`} className="cmp-thumb" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} aria-hidden="true" />}
            <span className="cmp-option-text">{o.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
