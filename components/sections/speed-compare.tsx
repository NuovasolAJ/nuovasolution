"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/language-context";

/* ─────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────── */
interface TimelineRow {
  timeKey: string;
  labelKey: string;
  tone: "neutral" | "warn" | "dead" | "go" | "win";
}

/* ─────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────── */
const SLOW_ROWS: TimelineRow[] = [
  { timeKey: "speed.slow.t1", labelKey: "speed.slow.l1", tone: "neutral" },
  { timeKey: "speed.slow.t2", labelKey: "speed.slow.l2", tone: "warn" },
  { timeKey: "speed.slow.t3", labelKey: "speed.slow.l3", tone: "warn" },
  { timeKey: "speed.slow.t4", labelKey: "speed.slow.l4", tone: "dead" },
];

const FAST_ROWS: TimelineRow[] = [
  { timeKey: "speed.fast.t1", labelKey: "speed.fast.l1", tone: "neutral" },
  { timeKey: "speed.fast.t2", labelKey: "speed.fast.l2", tone: "go" },
  { timeKey: "speed.fast.t3", labelKey: "speed.fast.l3", tone: "go" },
  { timeKey: "speed.fast.t4", labelKey: "speed.fast.l4", tone: "win" },
];

/* ─────────────────────────────────────────────────────────
   Tone token maps
   ───────────────────────────────────────────────────────── */
const TONE_DOT: Record<TimelineRow["tone"], string> = {
  neutral: "bg-brand-stone/40",
  warn:    "bg-brand-gold/60",
  dead:    "bg-hot/70",
  go:      "bg-brand-olive/70",
  win:     "bg-brand-olive",
};

const TONE_TIME: Record<TimelineRow["tone"], React.CSSProperties> = {
  neutral: { color: "var(--ns-text-faint)" },
  warn:    { color: "#B8903A" },
  dead:    { color: "#DC2626", fontWeight: 600 },
  go:      { color: "var(--ns-text-muted)" },
  win:     { color: "#4A7C59", fontWeight: 700 },
};

const TONE_LABEL: Record<TimelineRow["tone"], React.CSSProperties> = {
  neutral: { color: "var(--ns-text-body)" },
  warn:    { color: "var(--ns-text-body)" },
  dead:    { color: "#DC2626", fontWeight: 600 },
  go:      { color: "var(--ns-text-body)" },
  win:     { color: "#3A6B4A", fontWeight: 700 },
};

/* ─────────────────────────────────────────────────────────
   Single timeline row
   ───────────────────────────────────────────────────────── */
function Row({
  row,
  delay,
  isInView,
  t,
}: {
  row: TimelineRow;
  delay: number;
  isInView: boolean;
  t: (k: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-start gap-3"
    >
      {/* Dot */}
      <span
        className={cn(
          "mt-1.5 w-2 h-2 rounded-full shrink-0",
          TONE_DOT[row.tone]
        )}
        aria-hidden="true"
      />
      {/* Time badge + label */}
      <div className="flex-1 min-w-0">
        <span
          className="text-xs font-semibold tabular-nums"
          style={TONE_TIME[row.tone]}
        >
          {t(row.timeKey)}
        </span>
        <p className="text-sm mt-0.5 leading-snug" style={TONE_LABEL[row.tone]}>
          {t(row.labelKey)}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Panel component (one column)
   ───────────────────────────────────────────────────────── */
interface PanelProps {
  titleKey: string;
  rows: TimelineRow[];
  variant: "slow" | "fast";
  baseDelay: number;
  isInView: boolean;
  t: (k: string) => string;
  outcomeKey: string;
  outcomeVariant: "lost" | "won";
}

function Panel({
  titleKey,
  rows,
  variant,
  baseDelay,
  isInView,
  t,
  outcomeKey,
  outcomeVariant,
}: PanelProps) {
  const isSlow = variant === "slow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: baseDelay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative rounded-2xl border overflow-hidden",
        isSlow ? "opacity-75" : ""
      )}
      style={{
        backgroundColor: "var(--ns-bg-card)",
        borderColor: isSlow
          ? "var(--ns-border)"
          : "rgba(74,124,89,0.25)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: isSlow
            ? "linear-gradient(90deg, #9A9589 0%, transparent 100%)"
            : "linear-gradient(90deg, #4A7C59 0%, #C9A96E 100%)",
        }}
      />

      {/* Header */}
      <div
        className="px-6 pt-5 pb-4 border-b"
        style={{ borderColor: "var(--ns-border)" }}
      >
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-widest",
            isSlow ? "text-brand-stoneLight" : "text-brand-olive"
          )}
        >
          {t(titleKey)}
        </span>
      </div>

      {/* Timeline rows */}
      <div className="px-6 py-5 space-y-4">
        {/* Connector line behind dots */}
        <div className="relative">
          <div
            className="absolute left-[7px] top-3 bottom-3 w-px"
            style={{ backgroundColor: "var(--ns-border)" }}
            aria-hidden="true"
          />
          <div className="space-y-5">
            {rows.map((row, i) => (
              <Row
                key={row.labelKey}
                row={row}
                delay={baseDelay + 0.1 + i * 0.12}
                isInView={isInView}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Outcome badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay + 0.65, duration: 0.4 }}
        className="mx-6 mb-6"
      >
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm font-semibold text-center",
            outcomeVariant === "lost"
              ? "bg-hot/6 border border-hot/15 text-hot"
              : "border"
          )}
          style={
            outcomeVariant === "won"
              ? {
                  backgroundColor: "rgba(74,124,89,0.07)",
                  borderColor: "rgba(74,124,89,0.25)",
                  color: "#3A6B4A",
                }
              : undefined
          }
        >
          {t(outcomeKey)}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main section
   ───────────────────────────────────────────────────────── */
export function SpeedCompare() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--ns-bg)" }}
      id="speed"
    >
      <div className="max-w-4xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">{t("speed.label")}</span>
          <div className="w-8 h-px bg-brand-gold mx-auto mt-3 mb-5" aria-hidden="true" />
          <h2 className="section-heading">{t("speed.heading")}</h2>
          <p className="section-sub mt-4 max-w-sm mx-auto">{t("speed.sub")}</p>
        </motion.div>

        {/* "vs" comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Panel
            titleKey="speed.slow.title"
            rows={SLOW_ROWS}
            variant="slow"
            baseDelay={0.1}
            isInView={isInView}
            t={t}
            outcomeKey="speed.slow.outcome"
            outcomeVariant="lost"
          />

          <Panel
            titleKey="speed.fast.title"
            rows={FAST_ROWS}
            variant="fast"
            baseDelay={0.25}
            isInView={isInView}
            t={t}
            outcomeKey="speed.fast.outcome"
            outcomeVariant="won"
          />
        </div>

        {/* Bottom callout */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.55 }}
          className="text-center text-sm mt-10"
          style={{ color: "var(--ns-text-muted)" }}
        >
          {t("speed.note")}
        </motion.p>

      </div>
    </section>
  );
}
