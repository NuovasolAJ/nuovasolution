"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/language-context";

/* Steps are defined inside the component to pick up translations */
type StepStyle = "neutral" | "warning" | "danger" | "critical";

interface TimelineStep {
  timeKey:  string;
  labelKey: string;
  descKey:  string;
  icon:     string;
  style:    StepStyle;
}

const STEPS: TimelineStep[] = [
  { timeKey: "lost.step1.time", labelKey: "lost.step1.label", descKey: "lost.step1.desc", icon: "✉", style: "neutral"  },
  { timeKey: "lost.step2.time", labelKey: "lost.step2.label", descKey: "lost.step2.desc", icon: "⏳", style: "warning"  },
  { timeKey: "lost.step3.time", labelKey: "lost.step3.label", descKey: "lost.step3.desc", icon: "⚠", style: "danger"   },
  { timeKey: "lost.step4.time", labelKey: "lost.step4.label", descKey: "lost.step4.desc", icon: "✕", style: "critical" },
];

const STYLE_MAP: Record<StepStyle, {
  dot:    string;
  card:   string;
  badge:  string;
  label:  string;
  time:   string;
}> = {
  neutral: {
    dot:   "bg-brand-navy text-white",
    card:  "bg-brand-sand border-brand-sandDark dark:bg-brand-darkCard dark:border-white/10",
    badge: "bg-brand-sandDark text-brand-stone dark:bg-white/10 dark:text-brand-stoneLight",
    label: "text-brand-navy dark:text-white/90",
    time:  "text-brand-stoneLight",
  },
  warning: {
    dot:   "bg-brand-gold/20 text-brand-goldDark",
    card:  "bg-brand-gold/6 border-brand-gold/20 dark:bg-brand-gold/8 dark:border-brand-gold/20",
    badge: "bg-brand-gold/15 text-brand-goldDark dark:bg-brand-gold/20 dark:text-brand-goldLight",
    label: "text-brand-navy dark:text-white/90",
    time:  "text-brand-goldDark",
  },
  danger: {
    dot:   "bg-brand-terra/15 text-brand-terra",
    card:  "bg-brand-terra/6 border-brand-terra/20 dark:bg-brand-terra/8 dark:border-brand-terra/20",
    badge: "bg-brand-terra/12 text-brand-terra dark:bg-brand-terra/20 dark:text-brand-terraLight",
    label: "text-brand-navy dark:text-white/90",
    time:  "text-brand-terra",
  },
  critical: {
    dot:   "bg-hot/12 text-hot",
    card:  "bg-hot/5 border-hot/15 dark:bg-hot/8 dark:border-hot/20",
    badge: "bg-hot/10 text-hot dark:bg-hot/20",
    label: "text-hot",
    time:  "text-hot font-semibold",
  },
};

export function LeadLost() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--ns-bg-card)" }}
      id="lead-lost"
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">{t("lost.label")}</span>
          <div className="w-8 h-px bg-brand-gold mx-auto mt-3 mb-5" aria-hidden="true" />
          <h2 className="section-heading">{t("lost.heading")}</h2>
          <p className="section-sub mt-4 max-w-md mx-auto">{t("lost.sub")}</p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ backgroundColor: "var(--ns-border)" }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {STEPS.map((step, i) => {
              const s = STYLE_MAP[step.style];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.18, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    "relative flex gap-6 md:gap-0 md:w-1/2",
                    i % 2 === 0 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right md:flex-row-reverse"
                  )}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-[13px] md:left-auto w-5 h-5 rounded-full border-2 border-white dark:border-brand-darkSurface shadow-sm",
                      "flex items-center justify-center text-[10px] shrink-0 z-10",
                      i % 2 === 0 ? "md:-left-[11px]" : "md:-right-[11px]",
                      s.dot
                    )}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>

                  {/* Card */}
                  <div className={cn("ml-10 md:ml-0 flex-1 rounded-xl p-5 border transition-colors duration-300", s.card)}>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", s.badge)}>
                        {t(step.timeKey)}
                      </span>
                    </div>
                    <div className={cn("text-base font-semibold mb-0.5", s.label)}>
                      {t(step.labelKey)}
                    </div>
                    <div className="text-sm" style={{ color: "var(--ns-text-muted)" }}>
                      {t(step.descKey)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block text-white rounded-2xl px-8 py-6 shadow-xl border border-white/5" style={{ backgroundColor: "var(--ns-navy)" }}>
            <div className="text-xl md:text-2xl font-semibold mb-1">{t("lost.conclusion")}</div>
            <div className="text-sm text-white/50">{t("lost.conclusion.sub")}</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
