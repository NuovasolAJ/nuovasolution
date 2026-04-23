"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

/* ─── Design tokens ─── */
const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

/* ══════════════════════════════════════════════════════════
   CARD 1 — Conversation loop
   Messages appear one by one, hold, then fade out and repeat.
   ══════════════════════════════════════════════════════════ */

type Role = "client" | "agent";

const CONV: { role: Role; key: string }[] = [
  { role: "client", key: "scenarios.s1.loop.c1" },
  { role: "agent",  key: "scenarios.s1.loop.a1" },
  { role: "client", key: "scenarios.s1.loop.c2" },
  { role: "agent",  key: "scenarios.s1.loop.a2" },
];

/* Conversation timing (ms from loop start):
   80  → c1 appears
   950 → agent typing indicator on
   2450→ a1 appears, typing off
   4050→ c2 appears
   4950→ agent typing indicator on
   6500→ a2 appears, typing off
   9200→ reset                          */

function SpeedVisual({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [count,  setCount]  = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    function run() {
      if (!alive) return;
      setCount(0);
      setTyping(false);

      // c1
      T.push(setTimeout(() => { if (alive) setCount(1); }, 80));
      // agent starts typing
      T.push(setTimeout(() => { if (alive) setTyping(true); }, 950));
      // a1 appears, typing off
      T.push(setTimeout(() => { if (alive) { setTyping(false); setCount(2); } }, 2450));
      // c2
      T.push(setTimeout(() => { if (alive) setCount(3); }, 4050));
      // agent starts typing again
      T.push(setTimeout(() => { if (alive) setTyping(true); }, 4950));
      // a2 appears, typing off
      T.push(setTimeout(() => { if (alive) { setTyping(false); setCount(4); } }, 6500));
      // hold full conversation, then reset
      T.push(setTimeout(() => {
        if (!alive) return;
        setCount(0);
        setTyping(false);
        T.push(setTimeout(run, 700));
      }, 9200));
    }

    run();
    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  const clientLabel = t("scenarios.s1.label.client");

  return (
    <div style={{
      padding: "16px 16px 14px",
      display: "flex", flexDirection: "column", gap: 9,
      minHeight: 258, overflow: "hidden",
    }}>
      {/* Message bubbles */}
      {CONV.map((msg, i) => {
        const isClient = msg.role === "client";
        const vis = i < count;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: isClient ? "flex-end" : "flex-start" }}
          >
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isClient ? w(0.26) : g(0.42),
              marginBottom: 3,
            }}>
              {isClient ? clientLabel : "NuovaSolution"}
            </span>
            <div style={{
              maxWidth: "82%",
              padding: "7px 11px",
              fontSize: 11,
              lineHeight: 1.55,
              borderRadius: isClient ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
              background: isClient
                ? `linear-gradient(135deg, ${g(0.22)} 0%, ${g(0.13)} 100%)`
                : "rgba(255,255,255,0.07)",
              border: isClient ? `1px solid ${g(0.30)}` : `1px solid ${w(0.09)}`,
              color: isClient ? g(0.92) : w(0.72),
            }}>
              {t(msg.key)}
            </div>
          </motion.div>
        );
      })}

      {/* Typing indicator — always rendered, animated in/out so height stays stable */}
      <motion.div
        animate={{ opacity: typing ? 1 : 0, y: typing ? 0 : 6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
      >
        <span style={{
          fontSize: 9, fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase", color: g(0.42), marginBottom: 3,
        }}>
          NuovaSolution
        </span>
        <div style={{
          padding: "7px 13px",
          borderRadius: "10px 10px 10px 2px",
          background: "rgba(255,255,255,0.07)",
          border: `1px solid ${w(0.09)}`,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          {[0, 1, 2].map((d) => (
            <motion.div
              key={d}
              animate={typing
                ? { opacity: [0.30, 0.85, 0.30], y: [0, -2.5, 0] }
                : { opacity: 0.30, y: 0 }
              }
              transition={typing
                ? { duration: 0.90, repeat: Infinity, delay: d * 0.22, ease: "easeInOut" }
                : { duration: 0.20 }
              }
              style={{ width: 4, height: 4, borderRadius: "50%", background: w(0.40) }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CARD 2 — Filtering loop
   All leads equal → one rises, rest fade → reset.
   ══════════════════════════════════════════════════════════ */

const LEADS = [
  { name: "Rafael D.",    tagKey: "scenarios.filter.cold", hot: false },
  { name: "Alejandro J.", tagKey: "scenarios.filter.warm", hot: false },
  { name: "Carina D.",    tagKey: "scenarios.filter.hot",  hot: true  },
  { name: "Maria G.",     tagKey: "scenarios.filter.cold", hot: false },
] as const;

/* phase 0 = all equal, scanning (~2000ms) | phase 1 = Carina D. surfaces (~2000ms) */
function FilterVisual({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    function run() {
      if (!alive) return;
      setPhase(0);
      T.push(setTimeout(() => { if (alive) setPhase(1); }, 2000)); // all leads readable for 2s
      T.push(setTimeout(() => {
        if (!alive) return;
        setPhase(0);
        T.push(setTimeout(run, 600));
      }, 4000)); // HOT held for 2s, then reset
    }

    run();
    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  return (
    <div style={{ padding: "18px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      {LEADS.map((lead) => {
        const highlighted = phase === 1 && lead.hot;
        const rowOpacity  = phase === 0 ? 0.88 : lead.hot ? 1 : 0.13;
        return (
          <motion.div
            key={lead.name}
            animate={{ opacity: rowOpacity }}
            transition={{ duration: 0.70, ease: "easeInOut" }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "7px 11px", borderRadius: 9,
              border: lead.hot ? `1px solid ${g(0.34)}` : `1px solid ${w(0.07)}`,
              background: lead.hot
                ? `linear-gradient(90deg, ${g(0.10)} 0%, transparent 100%)`
                : "rgba(255,255,255,0.022)",
              boxShadow: highlighted ? `0 0 18px ${g(0.09)}` : "none",
              transition: "box-shadow 0.55s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 25, height: 25, borderRadius: "50%", flexShrink: 0,
                background: lead.hot
                  ? `linear-gradient(135deg, ${g(0.26)} 0%, ${g(0.14)} 100%)`
                  : w(0.06),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                color: lead.hot ? g(0.90) : w(0.25),
              }}>
                {lead.name[0]}
              </div>
              <span style={{
                fontSize: 12,
                color: lead.hot ? w(0.86) : w(0.30),
                fontWeight: lead.hot ? 600 : 400,
              }}>
                {lead.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {/* Glowing dot — only appears during phase 1 on hot lead */}
              <motion.div
                animate={{
                  opacity: highlighted ? 1 : 0,
                  scale:   highlighted ? 1 : 0,
                }}
                transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: g(0.92),
                  boxShadow: `0 0 8px ${g(0.80)}`,
                }}
              />
              <span style={{
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: lead.hot ? g(0.88) : w(0.20),
              }}>
                {t(lead.tagKey)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CARD 3 — Scoring (plays once on viewport entry)
   Warm → detail reveals → HOT transformation moment.
   No loop — stays at final state. This is a decision moment.
   ══════════════════════════════════════════════════════════ */

type TempKey = "cold" | "warm" | "hot";

const CHIPS: { key: TempKey; labelKey: string }[] = [
  { key: "cold", labelKey: "scenarios.filter.cold" },
  { key: "warm", labelKey: "scenarios.filter.warm" },
  { key: "hot",  labelKey: "scenarios.filter.hot"  },
];

/* Loop: phase 0 → WARM visible ~1200ms → phase 1 → message fades in →
         readable for ~1000ms → phase 2 → HOT activates → held ~1200ms → reset  */
function ScoreVisual({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    function run() {
      if (!alive) return;
      setPhase(0);
      T.push(setTimeout(() => { if (alive) setPhase(1); }, 1200)); // WARM held 1.2s
      T.push(setTimeout(() => { if (alive) setPhase(2); }, 2200)); // message readable 1.0s before HOT
      T.push(setTimeout(() => {
        if (!alive) return;
        setPhase(0);
        T.push(setTimeout(run, 400));
      }, 3400)); // HOT held 1.2s (2200 + 1200)
    }

    run();
    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  const highlighted: TempKey = phase <= 1 ? "warm" : "hot";

  return (
    <div style={{ padding: "18px 16px 16px" }}>

      {/* Lead card */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${w(0.08)}`,
        borderRadius: 10,
        padding: "12px 13px",
        marginBottom: 12,
      }}>
        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: g(0.16),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: g(0.86),
          }}>T</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: w(0.82) }}>Thomas K.</div>
            <div style={{ fontSize: 10, color: w(0.34), marginTop: 1 }}>Villa · Marbella</div>
          </div>
        </div>

        {/* Temperature chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, position: "relative" }}>

          {/* Subtle ambient glow on HOT activate — no flash, no burst */}
          <motion.div
            animate={phase >= 2
              ? { opacity: [0, 0.10, 0.06] }
              : { opacity: 0 }
            }
            transition={{ duration: 0.80, ease: "easeOut" }}
            style={{
              position: "absolute", inset: "-6px -4px",
              borderRadius: 14,
              background: `radial-gradient(ellipse at 72% 60%, ${g(0.55)} 0%, transparent 60%)`,
              pointerEvents: "none",
            }}
          />

          {CHIPS.map((chip) => {
            const isOn  = highlighted === chip.key;
            const isHot = chip.key === "hot";
            return (
              <div key={chip.key} style={{ position: "relative" }}>

                {/* Soft settled glow behind HOT chip — no burst, just calm emphasis */}
                {isHot && (
                  <motion.div
                    animate={phase >= 2
                      ? { opacity: [0, 0.28, 0.18] }
                      : { opacity: 0 }
                    }
                    transition={{ duration: 0.80, ease: "easeOut" }}
                    style={{
                      position: "absolute", inset: -8,
                      borderRadius: "50%",
                      background: g(0.55),
                      filter: "blur(10px)",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Very subtle scale lift — premium, not bouncy */}
                <motion.div
                  animate={{ scale: isHot && phase >= 2 ? [1, 1.035, 1.02] : 1 }}
                  transition={isHot && phase >= 2
                    ? { duration: 0.55, times: [0, 0.50, 1], ease: "easeOut" }
                    : { duration: 0.35 }
                  }
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {/* Inner plain div — CSS handles background/color/border transitions */}
                  <div style={{
                    padding: "4px 10px", borderRadius: 999,
                    fontSize: 9.5, fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "background 0.55s ease, border-color 0.55s ease, color 0.55s ease, box-shadow 0.55s ease",
                    background: isOn
                      ? (isHot ? g(0.22) : "rgba(255,255,255,0.10)")
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isOn ? (isHot ? g(0.54) : w(0.22)) : w(0.06)}`,
                    color: isOn ? (isHot ? g(0.92) : w(0.62)) : w(0.22),
                    boxShadow: isOn && isHot
                      ? `0 0 18px ${g(0.36)}, 0 2px 8px rgba(0,0,0,0.22)`
                      : "none",
                  }}>
                    {t(chip.labelKey)}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Detail badge — fades in at phase 1, stays readable */}
        <motion.div
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 10px", borderRadius: 7,
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${w(0.07)}`,
          }}
        >
          {/* Dot — settles to a quiet alive glow, slow pulse after HOT activates */}
          <motion.div
            animate={phase >= 2
              ? { boxShadow: [`0 0 4px ${g(0.30)}`, `0 0 8px ${g(0.55)}`, `0 0 5px ${g(0.38)}`, `0 0 4px ${g(0.30)}`] }
              : { boxShadow: `0 0 4px ${g(0.30)}` }
            }
            transition={phase >= 2
              ? { duration: 2.60, times: [0, 0.18, 0.55, 1], ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
              : { duration: 0.50 }
            }
            style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: g(0.76) }}
          />
          <motion.span
            animate={{ opacity: phase >= 2 ? 0.80 : 1 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ fontSize: 11, color: w(0.78), lineHeight: 1.3 }}
          >
            {t("scenarios.s3.detail")}
          </motion.span>
        </motion.div>
      </div>

      {/* Static note */}
      <p style={{ fontSize: 10.5, color: w(0.30), letterSpacing: "0.018em", margin: 0 }}>
        {t("scenarios.s3.visual.note")}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CARD 4 — Follow-up loop
   Steps appear one by one; last step gets gold emphasis; reset.
   ══════════════════════════════════════════════════════════ */

const TIMELINE = [
  { timeKey: "scenarios.fup.t1", labelKey: "scenarios.fup.l1", active: true  },
  { timeKey: "scenarios.fup.t2", labelKey: "scenarios.fup.l2", active: false },
  { timeKey: "scenarios.fup.t3", labelKey: "scenarios.fup.l3", active: true  },
] as const;

const STEP_TIMINGS = [80, 1550, 3100]; // ms when each step becomes visible
const FUP_HOLD     = 2400;             // hold after last step appears
const FUP_RESET    = 520;

function FollowUpVisual({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    function run() {
      if (!alive) return;
      setSteps(0);
      STEP_TIMINGS.forEach((ms, i) => {
        T.push(setTimeout(() => { if (alive) setSteps(i + 1); }, ms));
      });
      const cycleEnd = STEP_TIMINGS[STEP_TIMINGS.length - 1] + FUP_HOLD;
      T.push(setTimeout(() => {
        if (!alive) return;
        setSteps(0);
        T.push(setTimeout(run, FUP_RESET));
      }, cycleEnd));
    }

    run();
    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  const allVisible = steps === TIMELINE.length;

  return (
    <div style={{ padding: "18px 16px 18px", position: "relative" }}>

      {/* Static connector line — always present, subtle */}
      <div style={{
        position: "absolute",
        left: 22, top: 34, bottom: 50,
        width: 1.5,
        background: `linear-gradient(180deg, ${g(0.28)} 0%, ${g(0.06)} 100%)`,
      }} />

      {TIMELINE.map((step, i) => {
        const vis      = i < steps;
        const isLast   = i === TIMELINE.length - 1;
        /* Extra glow on last dot when all steps are showing */
        const dotGlow  = step.active && vis
          ? (isLast && allVisible
              ? `0 0 14px ${g(0.80)}, 0 0 30px ${g(0.38)}`
              : `0 0 10px ${g(0.52)}, 0 0 20px ${g(0.22)}`)
          : "none";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 8 }}
            transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: i < TIMELINE.length - 1 ? 22 : 0,
              position: "relative",
            }}
          >
            {/* Dot */}
            <div style={{
              width:  step.active ? 11 : 8,
              height: step.active ? 11 : 8,
              borderRadius: "50%", flexShrink: 0,
              background: step.active ? g(0.92) : w(0.18),
              border: step.active ? "none" : `1px solid ${w(0.14)}`,
              boxShadow: dotGlow,
              marginTop: step.active ? 2 : 4,
              position: "relative", zIndex: 2,
              transition: "box-shadow 0.45s ease",
            }} />

            {/* Label + text */}
            <div>
              <span style={{
                fontSize: 9, fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: step.active ? g(0.56) : w(0.22),
                display: "block", marginBottom: 2,
              }}>
                {t(step.timeKey)}
              </span>
              <span style={{
                fontSize: 12, lineHeight: 1.4, fontWeight: step.active ? 500 : 400,
                /* Last step text warms to gold when fully visible */
                color: isLast && allVisible ? g(0.82) : step.active ? w(0.82) : w(0.34),
                transition: "color 0.45s ease",
              }}>
                {t(step.labelKey)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CARD WRAPPER
   ══════════════════════════════════════════════════════════ */
interface CardProps {
  delay:        number;
  title:        string;
  text:         string;
  visual:       (inView: boolean) => React.ReactNode;
  visualHeight?: number;
}

function ScenarioCard({ delay, title, text, visual, visualHeight = 196 }: CardProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.70, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.028)",
        border: `1px solid ${w(0.08)}`,
        borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Visual area */}
      <div style={{
        minHeight: visualHeight,
        borderBottom: `1px solid ${w(0.05)}`,
        background: "rgba(0,0,0,0.16)",
        overflow: "hidden",
      }}>
        {visual(inView)}
      </div>

      {/* Text area */}
      <div style={{ padding: "20px 22px 26px", flex: 1 }}>
        <h3 style={{
          fontSize: "clamp(0.9375rem, 1.35vw, 1.0625rem)",
          fontWeight: 700, letterSpacing: "-0.018em",
          color: w(0.90), lineHeight: 1.25, marginBottom: 9,
        }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.8125rem", lineHeight: 1.72, color: w(0.40), margin: 0 }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════ */
export function RealScenarios() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background:    "#0C0B09",
        paddingTop:    "clamp(44px, 5.5vw, 68px)",
        paddingBottom: "clamp(44px, 5.5vw, 68px)",
        borderTop:     `1px solid ${w(0.05)}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.90, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}
        >
          <p style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: g(0.56), marginBottom: 14,
          }}>
            {t("scenarios.label")}
          </p>
          <h2 style={{
            fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
            fontWeight: 700, lineHeight: 1.13, letterSpacing: "-0.022em",
            color: w(0.90), marginBottom: 14,
          }}>
            {t("scenarios.headline")}
          </h2>
          <p style={{
            fontSize: "clamp(0.9375rem, 1.3vw, 1rem)",
            lineHeight: 1.70, color: w(0.40),
            maxWidth: "42ch",
          }}>
            {t("scenarios.sub")}
          </p>
        </motion.div>

        {/* ── 2×2 card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">

          <ScenarioCard
            delay={0}
            title={t("scenarios.s1.title")}
            text={t("scenarios.s1.text")}
            visualHeight={276}
            visual={(inView) => <SpeedVisual active={inView} t={t} />}
          />

          <ScenarioCard
            delay={0.08}
            title={t("scenarios.s2.title")}
            text={t("scenarios.s2.text")}
            visual={(inView) => <FilterVisual active={inView} t={t} />}
          />

          <ScenarioCard
            delay={0}
            title={t("scenarios.s3.title")}
            text={t("scenarios.s3.text")}
            visual={(inView) => <ScoreVisual active={inView} t={t} />}
          />

          <ScenarioCard
            delay={0.08}
            title={t("scenarios.s4.title")}
            text={t("scenarios.s4.text")}
            visual={(inView) => <FollowUpVisual active={inView} t={t} />}
          />

        </div>

        {/* ── Premium section divider ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "clamp(44px, 5.5vw, 64px)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Warm ambient radial behind the line */}
          <div style={{
            position: "absolute",
            width: "46%",
            height: 72,
            background: `radial-gradient(ellipse at center, ${g(0.08)} 0%, transparent 70%)`,
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />

          {/* Gradient line with shimmer */}
          <div style={{
            width: "65%",
            height: 1,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(90deg, transparent 0%, ${g(0.34)} 28%, ${g(0.54)} 50%, ${g(0.34)} 72%, transparent 100%)`,
            boxShadow: `0 0 10px ${g(0.16)}, 0 0 24px ${g(0.07)}`,
          }}>
            {/* Slow shimmer pass — repeats every ~9.5s */}
            <motion.div
              animate={{ x: ["-130%", "230%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
              style={{
                position: "absolute",
                top: 0, bottom: 0,
                width: "35%",
                background: `linear-gradient(90deg, transparent, ${g(0.28)}, transparent)`,
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
