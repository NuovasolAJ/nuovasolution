"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

/* ── SVG arc gauge constants ── */
const R    = 54;
const CIRC = 2 * Math.PI * R;
const ARC  = CIRC * 0.75;
const arcOffset = (score: number) => ARC * (1 - score / 100);

/* ══════════════════════════════════════════════════════════
   Score Visual — arc gauge counting 30 → 84 over ~1.8 s
   ══════════════════════════════════════════════════════════ */
function ScoreVisual({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [score, setScore] = useState(30);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!active || hasStarted.current) return;
    hasStarted.current = true;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    // Run once: 30 → 84, then stay at 84. No loop, no reset.
    T.push(setTimeout(() => {
      if (!alive) return;
      let cur = 30;
      function tick() {
        if (!alive) return;
        if (cur >= 84) { setScore(84); return; }
        cur++;
        setScore(cur);
        T.push(setTimeout(tick, 28));
      }
      tick();
    }, 600));

    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  const isHot  = score >= 80;
  const isWarm = score >= 50 && score < 80;

  const RANGES = [
    { key: "intel.score.cold", range: "0–50",   zone: "cold" },
    { key: "intel.score.warm", range: "50–80",  zone: "warm" },
    { key: "intel.score.hot",  range: "80–100", zone: "hot"  },
  ] as const;
  type Zone = (typeof RANGES)[number]["zone"];
  const activeZone: Zone = isHot ? "hot" : isWarm ? "warm" : "cold";
  const arcStroke = isHot ? g(0.88) : isWarm ? g(0.50) : w(0.22);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "clamp(32px, 5vw, 48px) 24px 28px",
      gap: 20,
    }}>

      {/* Gauge */}
      <div style={{ position: "relative", width: 160, height: 160 }}>
        <motion.div
          animate={isHot
            ? { opacity: [0.16, 0.42, 0.18], scale: [1, 1.08, 1] }
            : { opacity: 0, scale: 1 }}
          transition={isHot
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.55 }}
          style={{
            position: "absolute", inset: -20, borderRadius: "50%",
            background: `radial-gradient(circle, ${g(0.36)} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <svg
          width="160" height="160" viewBox="0 0 120 120"
          style={{ transform: "rotate(135deg)" }}
          aria-hidden="true"
        >
          <circle
            cx="60" cy="60" r={R} fill="none" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={`${ARC} ${CIRC}`}
            style={{ stroke: w(0.07) }}
          />
          <circle
            cx="60" cy="60" r={R} fill="none" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={`${ARC} ${CIRC}`}
            style={{
              stroke: arcStroke,
              strokeDashoffset: arcOffset(score),
              transition: "stroke-dashoffset 0.10s linear, stroke 0.40s ease",
            }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontSize: 48, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1,
            color: isHot ? g(0.96) : isWarm ? g(0.66) : w(0.36),
            transition: "color 0.35s ease",
          }}>
            {score}
          </span>
          <span style={{ fontSize: 10, color: w(0.22), letterSpacing: "0.07em", marginTop: 2 }}>
            / 100
          </span>
        </div>
      </div>

      {/* Zone label — CSS-only transitions, no key remounting */}
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "block", marginBottom: 12,
            fontSize: "0.8125rem", fontWeight: 700,
            letterSpacing: "0.10em", textTransform: "uppercase",
            color: isHot ? g(0.92) : isWarm ? g(0.58) : w(0.28),
            transition: "color 0.50s ease",
          }}
        >
          {isHot ? t("intel.score.hot") : isWarm ? t("intel.score.warm") : t("intel.score.cold")}
        </span>

        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {RANGES.map((r) => {
            const on      = activeZone === r.zone;
            const hotPill = r.zone === "hot";
            return (
              <span
                key={r.zone}
                style={{
                  display: "inline-block",
                  padding: "3px 9px", borderRadius: 999,
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  background: on ? (hotPill ? g(0.14) : "rgba(255,255,255,0.07)") : "rgba(255,255,255,0.03)",
                  border: `1px solid ${on ? (hotPill ? g(0.42) : w(0.15)) : w(0.06)}`,
                  color: on ? (hotPill ? g(0.92) : w(0.58)) : w(0.20),
                  opacity: on ? 1 : 0.24,
                  transition: "all 0.50s ease",
                }}
              >
                {t(r.key)} {r.range}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Build Rows — 3 qualification steps appearing one by one
   ══════════════════════════════════════════════════════════ */
function BuildRows({ active, t }: { active: boolean; t: (k: string) => string }) {
  const [visible, setVisible] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!active || hasStarted.current) return;
    hasStarted.current = true;
    let alive = true;
    const T: ReturnType<typeof setTimeout>[] = [];

    function run() {
      if (!alive) return;
      setVisible(0);
      T.push(setTimeout(() => { if (alive) setVisible(1); }, 600));
      T.push(setTimeout(() => { if (alive) setVisible(2); }, 1600));
      T.push(setTimeout(() => { if (alive) setVisible(3); }, 2600));
      T.push(setTimeout(() => {
        if (!alive) return;
        setVisible(0);
        T.push(setTimeout(run, 700));
      }, 5600));
    }

    run();
    return () => { alive = false; T.forEach(clearTimeout); };
  }, [active]);

  const rows = [t("intel.build.r1"), t("intel.build.r2"), t("intel.build.r3")];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "22px 0" }}>
      {rows.map((label, i) => {
        const vis = i < visible;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: vis ? 1 : 0, x: vis ? 0 : -10 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", borderRadius: 10,
              background: vis
                ? `linear-gradient(90deg, ${g(0.08)} 0%, transparent 100%)`
                : "rgba(255,255,255,0.02)",
              border: `1px solid ${vis ? g(0.22) : w(0.06)}`,
              transition: "background 0.35s ease, border-color 0.35s ease",
            }}
          >
            <motion.div
              animate={{ opacity: vis ? 1 : 0, scale: vis ? 1 : 0.55 }}
              transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                background: g(0.16), border: `1px solid ${g(0.38)}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l2 2 3-3" stroke={g(0.92) as string}
                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <span style={{
              fontSize: 13, fontWeight: vis ? 500 : 400,
              color: vis ? w(0.80) : w(0.24),
              transition: "color 0.30s ease",
            }}>
              {label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════ */
export function LeadIntelligence() {
  const { t } = useTranslation();

  const panelsRef    = useRef<HTMLDivElement>(null);
  const panelsInView = useInView(panelsRef, { once: true, margin: "-60px" });

  return (
    <section
      style={{
        background: "#0C0B09",
        paddingTop: "clamp(44px, 5.5vw, 68px)",
        paddingBottom: "clamp(44px, 5.5vw, 68px)",
        borderTop: `1px solid ${w(0.05)}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: "clamp(32px, 4vw, 48px)", textAlign: "center" }}
        >
          <p style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: g(0.56), marginBottom: 14,
          }}>
            {t("intel.label")}
          </p>
          <h2 style={{
            fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
            fontWeight: 700, lineHeight: 1.13, letterSpacing: "-0.022em",
            color: w(0.90), marginBottom: 14,
          }}>
            {t("intel.headline")}
          </h2>
          <p style={{
            fontSize: "clamp(0.9375rem, 1.3vw, 1rem)",
            lineHeight: 1.70, color: w(0.40),
            maxWidth: "46ch", margin: "0 auto",
          }}>
            {t("intel.sub")}
          </p>
        </motion.div>

        {/* ── Two-column: Score + Explanation ── */}
        <div
          ref={panelsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          style={{ marginBottom: "clamp(20px, 2.5vw, 24px)" }}
        >

          {/* Left — Score panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: "rgba(255,255,255,0.028)",
              border: `1px solid ${w(0.08)}`,
              borderRadius: 16, overflow: "hidden",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{
              flex: 1,
              background: "rgba(0,0,0,0.16)",
              borderBottom: `1px solid ${w(0.05)}`,
            }}>
              <ScoreVisual active={panelsInView} t={t} />
            </div>
            <div style={{ padding: "16px 24px 22px", textAlign: "center" }}>
              <p style={{
                fontSize: "0.8125rem", lineHeight: 1.68,
                color: w(0.36), margin: 0,
              }}>
                {t("intel.score.note")}
              </p>
            </div>
          </motion.div>

          {/* Right — Explanation panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.10, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: "rgba(255,255,255,0.028)",
              border: `1px solid ${w(0.08)}`,
              borderRadius: 16, overflow: "hidden",
              padding: "clamp(24px, 3.5vw, 36px) clamp(20px, 3vw, 32px)",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}
          >
            <h3 style={{
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              fontWeight: 700, letterSpacing: "-0.018em",
              color: w(0.88), lineHeight: 1.25,
              marginBottom: 0,
            }}>
              {t("intel.build.title")}
            </h3>

            <BuildRows active={panelsInView} t={t} />

            <p style={{
              fontSize: "0.875rem", lineHeight: 1.72,
              color: w(0.38), margin: 0,
            }}>
              {t("intel.build.text")}
            </p>
          </motion.div>

        </div>

        {/* ── Outcome block (full width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.20, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: `linear-gradient(135deg, rgba(214,180,122,0.05) 0%, rgba(255,255,255,0.022) 100%)`,
            border: `1px solid ${g(0.18)}`,
            borderRadius: 16,
            padding: "clamp(28px, 4vw, 44px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

            {/* Left text */}
            <div>
              <h3 style={{
                fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)",
                fontWeight: 700, letterSpacing: "-0.018em",
                color: w(0.90), lineHeight: 1.25,
                marginBottom: 12,
              }}>
                {t("intel.outcome.title")}
              </h3>
              <p style={{
                fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                lineHeight: 1.75, color: w(0.44), margin: 0,
              }}>
                {t("intel.outcome.text")}
              </p>
            </div>

            {/* Right: CRM note + highlight */}
            <div style={{
              display: "flex", flexDirection: "column",
              justifyContent: "flex-start", gap: 20,
              minWidth: 0,
            }}>
              <p style={{
                fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                lineHeight: 1.72, color: w(0.44), margin: 0,
              }}>
                {t("intel.outcome.crm")}
              </p>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "10px 18px", borderRadius: 16,
                background: g(0.10),
                border: `1px solid ${g(0.32)}`,
                alignSelf: "flex-start",
                maxWidth: "100%",
                boxSizing: "border-box",
                width: "fit-content",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: g(0.90), flexShrink: 0,
                  marginTop: 3,
                }} />
                <span style={{
                  fontSize: "0.8125rem", fontWeight: 600,
                  color: g(0.88), letterSpacing: "0.01em",
                  flexShrink: 1,
                  minWidth: 0,
                  wordBreak: "break-word",
                  lineHeight: 1.5,
                }}>
                  {t("intel.outcome.highlight")}
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
