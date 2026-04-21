"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/language-context";

/* ------------------------------------------------------------------ */
/* Scoring signals — exact logic from brief                            */
/* ------------------------------------------------------------------ */
const SCORE_SIGNALS = [
  { labelKey: "demo.signal.1", points: 25 },
  { labelKey: "demo.signal.2", points: 10 },
  { labelKey: "demo.signal.3", points: 10 },
  { labelKey: "demo.signal.4", points: 8  },
  { labelKey: "demo.signal.5", points: 8  },
  { labelKey: "demo.signal.6", points: 8  },
] as const;

const SIGNAL_LABELS: Record<string, { en: string; es: string }> = {
  "demo.signal.1": { en: "Availability request",  es: "Solicitud de disponibilidad" },
  "demo.signal.2": { en: "Location (Nerja)",       es: "Ubicación (Nerja)" },
  "demo.signal.3": { en: "Budget (€900–1,200)",    es: "Presupuesto (€900–1.200)" },
  "demo.signal.4": { en: "People (2)",             es: "Personas (2)" },
  "demo.signal.5": { en: "Move-in date (June)",    es: "Fecha entrada (Junio)" },
  "demo.signal.6": { en: "Duration context",       es: "Contexto de duración" },
};

const TARGET_SCORE = 85;

/* ------------------------------------------------------------------ */
/* Animated score counter                                              */
/* ------------------------------------------------------------------ */
function AnimatedScore({ isVisible, t }: { isVisible: boolean; t: (k: string) => string }) {
  const [score, setScore] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [showTemp, setShowTemp] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const controls = animate(0, TARGET_SCORE, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { setScore(Math.round(v)); setBarWidth(v); },
      onComplete: () => setTimeout(() => setShowTemp(true), 180),
    });
    return () => controls.stop();
  }, [isVisible]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-end justify-between mb-3">
        <span className="text-6xl font-bold text-brand-navy dark:text-white tabular-nums leading-none">
          {score}
        </span>
        <span className="text-sm text-brand-stoneLight mb-1">/ 100</span>
      </div>

      {/* Bar */}
      <div className="h-2.5 bg-brand-sand dark:bg-white/10 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-brand-gold to-brand-terra rounded-full score-bar-fill"
          style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Temperature badge */}
      {showTemp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hot/8 border border-hot/20 text-hot text-sm font-semibold mb-6"
        >
          🔥 {t("demo.score.temp")}
        </motion.div>
      )}

      {/* Signal breakdown */}
      <div className="space-y-2">
        {SCORE_SIGNALS.map((s, i) => (
          <motion.div
            key={s.labelKey}
            initial={{ opacity: 0, x: -8 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 + i * 0.08, duration: 0.35 }}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-brand-stone dark:text-brand-stoneLight">
              <span className="text-brand-olive font-semibold text-xs">✓</span>
              {SIGNAL_LABELS[s.labelKey]?.[
                (typeof window !== "undefined" &&
                  document.documentElement.lang === "es") ? "es" : "en"
              ] ?? SIGNAL_LABELS[s.labelKey]?.en}
            </span>
            <span className="text-brand-gold font-semibold">+{s.points}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WhatsApp alert phone mockup                                          */
/* ------------------------------------------------------------------ */
function WhatsAppAlert({ t }: { t: (k: string) => string }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-[#1a1a2e] rounded-[2.5rem] p-3 shadow-2xl ring-1 ring-white/10">
        <div className="bg-[#ECE5DD] rounded-[2rem] overflow-hidden">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold shrink-0">
              N
            </div>
            <div>
              <div className="text-white text-sm font-semibold leading-tight">{t("demo.alert.label")}</div>
              <div className="text-[#B2DFDB] text-xs">{t("demo.alert.online")}</div>
            </div>
          </div>

          {/* Chat */}
          <div className="px-3 py-4 min-h-[240px] flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl rounded-bl-sm p-3.5 shadow-sm max-w-[92%]"
            >
              <div className="text-xs font-bold text-hot mb-2">{t("demo.alert.hot")}</div>
              <div className="text-xs text-brand-navy leading-relaxed space-y-1">
                <div className="font-semibold">{t("demo.alert.buyer")}</div>
                <div>{t("demo.alert.budget")}</div>
                <div>{t("demo.alert.people")}</div>
                <div>{t("demo.alert.movein")}</div>
                <div className="pt-1">
                  {t("demo.alert.viewing")}{" "}
                  <span className="font-semibold text-brand-olive">{t("demo.alert.yes")}</span>
                </div>
              </div>
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#075E54] hover:opacity-80 transition-opacity"
              >
                {t("demo.alert.cta")}
              </motion.a>
              <div className="text-[10px] text-brand-stoneLight mt-1.5 text-right">Now</div>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-brand-stoneLight mt-3">{t("demo.alert.title")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step card wrapper                                                    */
/* ------------------------------------------------------------------ */
function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-7 rounded-full bg-brand-navy dark:bg-brand-darkCard text-white text-xs font-bold flex items-center justify-center shrink-0 ring-1 ring-white/10">
        {n}
      </span>
      <span className="section-label">{title}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Incoming message                                           */
/* ------------------------------------------------------------------ */
function StepMessage({ t }: { t: (k: string) => string }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <StepLabel n={1} title={t("demo.step1.label")} />
      <div className="card p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-sandDark dark:border-white/8 mb-4">
          <div className="w-9 h-9 rounded-full bg-brand-sand dark:bg-white/10 flex items-center justify-center text-brand-stone dark:text-white/60 font-bold text-sm shrink-0">
            K
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-brand-navy dark:text-white/90">{t("demo.msg.from")}</div>
            <div className="text-xs text-brand-stoneLight">{t("demo.msg.channel")}</div>
          </div>
          <div className="text-xs text-brand-stoneLight shrink-0">Just now</div>
        </div>
        <div className="bg-brand-sand dark:bg-white/8 rounded-xl rounded-tl-sm p-4 text-sm text-brand-navy dark:text-white/85 leading-relaxed">
          {t("demo.msg.text")}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-brand-stoneLight">
          <span className="w-1.5 h-1.5 rounded-full bg-warm animate-pulse" aria-hidden="true" />
          {t("demo.msg.waiting")}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Instant reply                                              */
/* ------------------------------------------------------------------ */
function StepReply({ t }: { t: (k: string) => string }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <StepLabel n={2} title={t("demo.step2.label")} />
      <div className="card p-6 shadow-md">
        <div className="flex items-center gap-3 pb-4 border-b border-brand-sandDark dark:border-white/8 mb-4">
          <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">NS</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-brand-navy dark:text-white/90">{t("demo.reply.from")}</div>
            <div className="text-xs text-brand-olive">{t("demo.reply.speed")}</div>
          </div>
          <div className="text-xs text-brand-stoneLight shrink-0">Now</div>
        </div>
        <div className="bg-brand-sand dark:bg-white/8 rounded-lg p-3 text-xs text-brand-stoneLight mb-3 italic">
          {t("demo.msg.text")}
        </div>
        <div className="bg-brand-navy/5 dark:bg-white/6 border border-brand-sandDark dark:border-white/10 rounded-xl p-4 text-sm text-brand-navy dark:text-white/85 leading-relaxed">
          {t("demo.reply.text")}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-brand-olive font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" aria-hidden="true" />
          {t("demo.reply.status")}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Scoring                                                    */
/* ------------------------------------------------------------------ */
function StepScore({ isVisible, t }: { isVisible: boolean; t: (k: string) => string }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <StepLabel n={3} title={t("demo.step3.label")} />
      <div className="card p-6 shadow-md">
        <div className="section-label mb-5">{t("demo.score.title")}</div>
        <AnimatedScore isVisible={isVisible} t={t} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */
const TABS = [
  { id: 1, tabKey: "demo.step1.tab" },
  { id: 2, tabKey: "demo.step2.tab" },
  { id: 3, tabKey: "demo.step3.tab" },
  { id: 4, tabKey: "demo.step4.tab" },
] as const;

export function DemoFlow() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(1);
  const [score3Visible, setScore3Visible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if      (v < 0.22) { setActiveStep(1); setScore3Visible(false); }
      else if (v < 0.46) { setActiveStep(2); setScore3Visible(false); }
      else if (v < 0.72) { setActiveStep(3); setScore3Visible(true); }
      else               { setActiveStep(4); }
    });
  }, [scrollYProgress]);

  const step1O = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0, 0.22, 0.28], [0, 0, -32]);

  const step2O = useTransform(scrollYProgress, [0.20, 0.26, 0.44, 0.50], [0, 1, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.20, 0.26, 0.44, 0.50], [32, 0, 0, -32]);

  const step3O = useTransform(scrollYProgress, [0.44, 0.50, 0.68, 0.74], [0, 1, 1, 0]);
  const step3Y = useTransform(scrollYProgress, [0.44, 0.50, 0.68, 0.74], [32, 0, 0, -32]);

  const step4O = useTransform(scrollYProgress, [0.68, 0.74, 1.0], [0, 1, 1]);
  const step4Y = useTransform(scrollYProgress, [0.68, 0.74], [32, 0]);

  return (
    <section id="demo-flow" className="relative transition-colors duration-300" style={{ backgroundColor: "var(--ns-bg)" }}>

      {/* Header — above the sticky zone */}
      <div className="text-center pt-24 pb-6 px-6">
        <span className="section-label">{t("demo.label")}</span>
        <div className="w-8 h-px bg-brand-gold mx-auto mt-3 mb-5" aria-hidden="true" />
        <h2 className="section-heading">{t("demo.heading")}</h2>
        <p className="section-sub mt-4 max-w-md mx-auto">{t("demo.sub")}</p>
      </div>

      {/* Scroll container — 400vh */}
      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10">

          {/* Step tab indicators */}
          <div className="flex gap-2 mb-8">
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                  activeStep === tab.id ? "text-white shadow-sm" : "text-brand-stoneLight"
                )}
                style={{
                  backgroundColor: activeStep === tab.id
                    ? "var(--ns-navy)"
                    : "var(--ns-bg-surface)",
                }}
              >
                <span>{tab.id}</span>
                <span className="hidden sm:inline">{t(tab.tabKey)}</span>
              </div>
            ))}
          </div>

          {/* Step panels — scroll-driven */}
          <div className="relative w-full max-w-xl" style={{ height: 480 }}>

            <motion.div style={{ opacity: step1O, y: step1Y }}
              className="absolute inset-0 flex items-center justify-center">
              <StepMessage t={t} />
            </motion.div>

            <motion.div style={{ opacity: step2O, y: step2Y }}
              className="absolute inset-0 flex items-center justify-center">
              <StepReply t={t} />
            </motion.div>

            <motion.div style={{ opacity: step3O, y: step3Y }}
              className="absolute inset-0 flex items-center justify-center">
              <StepScore isVisible={score3Visible} t={t} />
            </motion.div>

            <motion.div style={{ opacity: step4O, y: step4Y }}
              className="absolute inset-0 flex items-center justify-center">
              <WhatsAppAlert t={t} />
            </motion.div>

          </div>

          {/* Scroll hint */}
          <motion.p
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="mt-8 text-xs text-brand-stoneLight"
            aria-hidden="true"
          >
            {t("demo.scroll.hint")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
