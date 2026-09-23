import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { statusPresentation, type CapabilityStatus } from "@/lib/content/statuses";

/**
 * Status expression law: glyph + text + colour. Colour is never the only
 * differentiator. Eight glyphs, 16 px, 1.5 px stroke, currentColor.
 */
export type Glyph = "check" | "arrow-right" | "clock" | "lock" | "rule" | "link" | "triangle" | "diamond";

export function StatusGlyph({ glyph, size = 16, className }: { glyph: Glyph; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, className };
  switch (glyph) {
    case "check":
      return <svg {...common}><path d="M3 8.5l3 3 7-7" /></svg>;
    case "arrow-right":
      return <svg {...common}><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="8" cy="8" r="6" /><path d="M8 5v3.5l2 1.5" /></svg>;
    case "lock":
      return <svg {...common}><rect x="3.5" y="7" width="9" height="6.5" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" /></svg>;
    case "rule":
      return <svg {...common}><path d="M3 8h10" /></svg>;
    case "link":
      return <svg {...common}><path d="M6.5 9.5l3-3M5 11a2.1 2.1 0 01-3-3l2-2M11 5a2.1 2.1 0 013 3l-2 2" /></svg>;
    case "triangle":
      return <svg {...common}><path d="M8 3l5.5 9.5h-11L8 3z" /></svg>;
    case "diamond":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M8 2l6 6-6 6-6-6 6-6z" /></svg>;
  }
}

const toneCls = {
  positive: "text-signal-positive",
  attention: "text-signal-attention",
  neutral: "text-text-muted",
};
const dotCls = {
  positive: "bg-signal-positive",
  attention: "bg-signal-attention",
  neutral: "bg-ink-350",
};

/**
 * A status chip: a coloured dot plus the short status word by default, the full label with
 * `long`. It wraps onto its own line instead of widening a row (review WR-15) and never
 * overlaps its neighbour (owner finding, design probe 2026-09-23).
 */
export function StatusChip({ status, locale, className, long = false }: { status: CapabilityStatus; locale: Locale; className?: string; long?: boolean }) {
  const p = statusPresentation(status, locale);
  return (
    <span className={cn("inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-pill bg-surface-sunken px-2.5 py-1 t-caption leading-none", toneCls[p.tone], className)}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-pill", dotCls[p.tone])} />
      <span className="text-text-secondary">{long ? p.label : p.short}</span>
    </span>
  );
}

export function StatusNote({ status, locale, className }: { status: CapabilityStatus; locale: Locale; className?: string }) {
  const p = statusPresentation(status, locale);
  return (
    <p className={cn("flex items-start gap-2 t-body-s", toneCls[p.tone], className)}>
      <StatusGlyph glyph={p.glyph} className="mt-1 shrink-0" />
      <span>
        <span className="text-text-primary">{p.label}.</span> <span className="text-text-secondary">{p.sentence}</span>
      </span>
    </p>
  );
}

/** A generic chip for labels such as Illustrative, Example, Placeholder. */
export function LabelChip({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "attention"; className?: string }) {
  return (
    <span className={cn("inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-pill border border-line-hairline bg-surface-raised px-2.5 t-caption", tone === "attention" ? "text-signal-attention" : "text-text-secondary", className)}>
      {children}
    </span>
  );
}
