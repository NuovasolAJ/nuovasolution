"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { useTranslation, Lang } from "@/lib/language-context";
import { SectionDivider } from "@/components/ui/section-divider";

/* ─── Design tokens ─── */
const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

/* ─────────────────────────────────────────────────────────────
   LAYOUT CONSTANTS

   Annotation boxes on the SAME horizontal row:
     ANNOT_CLS_Y   → Classification box  (centered on classify dot)
     ANNOT_SCORE_Y → Scoring box         (centered on score dot, same Y)

   BRANCH geometry:
     BRANCH_TOP = ALERT_Y + R_ALERT + 5  =  46
     BRANCH_H   = MAIN_Y  − R_HOT  − 46 = 154
   ───────────────────────────────────────────────────────────── */
const ALERT_Y       = 28;
const MAIN_Y        = 214;
const ANNOT_CLS_Y   = MAIN_Y + 38;         // 252 — clearance from timeline
const ANNOT_SCORE_Y = ANNOT_CLS_Y;         // 252 — EN default; ES offset computed in render
const FUP_Y         = 428;                 // accommodates ES score box (cls+46+90)+gap
const CRM_Y         = FUP_Y + 30;          // 458
const CONT_H        = 508;

const LINE_L   = 2;
const LINE_W   = 83;
const LINE_DEL = 0.15;
const LINE_DUR = 1.7;

const R_NORMAL = 10;
const R_REPLY  = 11;
const R_HOT    = 14;
const R_ALERT  = 13;

const BRANCH_TOP   = ALERT_Y + R_ALERT + 5;                       // 46
const BRANCH_H     = MAIN_Y - R_HOT - BRANCH_TOP;                 // 154
const CONNECTOR_H  = ANNOT_CLS_Y - (MAIN_Y + R_NORMAL + 1);       // 27

/* ─── Types ─── */
interface DotCfg {
  pct:       number;
  label:     string;
  classify?: boolean;
  score?:    boolean;
  reply?:    boolean;
  branch?:   boolean;
}

interface LeftItem {
  title: string;
  desc1: string;
  desc2?: string;
}

interface FlowProps {
  dots:       DotCfg[];
  lang:       Lang;
  clsLine1:   string;
  clsLine2:   string;
  scoreCold:  string;
  scoreWarm:  string;
  scoreHot:   string;
  alertMain:  string;
  alertSub:   string;
  fup:        string;
  crm:        string;
  leftItems?: LeftItem[];
}

/* ─── Database icon (CRM bar) ─── */
function DbIcon() {
  return (
    <svg
      width="9" height="10" viewBox="0 0 9 10" fill="none"
      style={{
        display: "inline-block", marginRight: 6, flexShrink: 0,
        opacity: 0.50, verticalAlign: "middle",
      }}
      aria-hidden="true"
    >
      <ellipse cx="4.5" cy="2.2" rx="3.8" ry="1.7" stroke="currentColor" strokeWidth="0.9" />
      <path d="M0.7 2.2v5.6c0 .94 1.70 1.7 3.8 1.7s3.8-.76 3.8-1.7V2.2" stroke="currentColor" strokeWidth="0.9" />
      <path d="M0.7 5c0 .94 1.70 1.7 3.8 1.7S8.3 5.94 8.3 5" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANNOTATION BOX

   Behavior:
   - Hidden (opacity 0) until section enters viewport + animDelay passes
   - "ready" state gates the entry to avoid any pre-scroll flash
   - dimOpacity controls resting state:
       0      → completely hidden when not active (scoring box)
       0.40   → softly visible at rest (classification box)
   - isActive → fully visible + gold highlight overlay
   - y slides on appear/disappear for dimOpacity=0 boxes (premium feel)
   ───────────────────────────────────────────────────────────── */
interface AnnotBoxProps {
  top:         number;
  xPct:        number;
  isActive:    boolean;
  inView:      boolean;
  children:    React.ReactNode;
  animDelay:   number;
  dimOpacity?: number;
}

function AnnotBox({
  top, xPct, isActive, inView, children, animDelay, dimOpacity = 0.35,
}: AnnotBoxProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setReady(true), animDelay * 1000);
    return () => clearTimeout(id);
  }, [inView, animDelay]);

  /* For near-invisible resting boxes (scoring), add a y-slide on appear/disappear */
  const restY = dimOpacity < 0.2 ? 4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{
        opacity: !ready ? 0 : isActive ? 1 : dimOpacity,
        y:       !ready ? 6 : isActive ? 0 : restY,
      }}
      transition={{
        opacity: { duration: 0.40, ease: "easeInOut" },
        y:       { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        position: "absolute",
        top,
        left: `${xPct}%`,
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.052)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderTop: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 8,
        overflow: "hidden",
        zIndex: 4,
      }}
    >
      {/* Active highlight overlay */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          background: "rgba(214,180,122,0.06)",
          border: `1px solid ${g(0.20)}`,
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   DESKTOP FLOW
   ══════════════════════════════════════════════════════════ */
function DesktopFlow({
  dots, lang, clsLine1, clsLine2,
  scoreCold, scoreWarm, scoreHot,
  alertMain, alertSub, fup, crm,
}: FlowProps) {

  /* ── Viewport gate ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.35 });

  /* ── Sweep motion values ── */
  const sweepPos   = useMotionValue(0);
  const sweepAlpha = useMotionValue(0);

  /*
   * Single source of truth — every visual state derives from activeNode only.
   * -1 = nothing active (between steps or between cycles).
   */
  const [activeNode, setActiveNode] = useState(-1);

  const sweepLeft = useTransform(sweepPos, v => `${LINE_L + (v / 100) * LINE_W}%`);

  /* ── Looping sweep sequence ── */
  useEffect(() => {
    if (!inView) return;

    const DOT_PCTS = dots.map(d => d.pct);
    let stopped = false;

    const pause = (ms: number) =>
      new Promise<void>(r => { const t = setTimeout(r, ms); if (stopped) clearTimeout(t); });

    async function runCycle() {
      if (stopped) return;

      sweepPos.set(0);
      await animate(sweepAlpha, 0, { duration: 0 });
      setActiveNode(-1);

      await pause(1400);
      if (stopped) return;

      await animate(sweepAlpha, 1, { duration: 0.35 });
      if (stopped) return;

      for (let i = 0; i < DOT_PCTS.length; i++) {
        if (stopped) return;

        /* Sweep travels — nothing is active during travel */
        await animate(sweepPos, DOT_PCTS[i], {
          duration: i === 0 ? 0.05 : 1.0,
          ease:     i === 0 ? "linear" : [0.4, 0, 0.2, 1],
        });
        if (stopped) return;

        /* Step activates exactly when sweep arrives */
        setActiveNode(i);

        /* Hold — final step (Hot/branch) holds longer */
        await pause(dots[i].branch ? 1800 : 800);
        if (stopped) return;

        /* Deactivate immediately — sweep will be empty while traveling to next */
        setActiveNode(-1);
      }

      await animate(sweepAlpha, 0, { duration: 0.50 });
      await pause(2200);
      if (!stopped) runCycle();
    }

    const t = setTimeout(() => runCycle(), 800);
    return () => {
      stopped = true;
      clearTimeout(t);
    };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Render ── */
  return (
    <div ref={containerRef} style={{ position: "relative", height: CONT_H }}>

      {/* ── CRM: always-running background line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.2 }}
        style={{
          position: "absolute",
          top: CRM_Y, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${g(0.28)} 5%, ${g(0.28)} 95%, transparent 100%)`,
          filter: "drop-shadow(0 0 4px rgba(214,180,122,0.14))",
        }}
      />

      {/* CRM shimmer */}
      {inView && (
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: 5.8, repeat: Infinity, repeatDelay: 4.2,
            ease: [0.4, 0, 0.6, 1], delay: 1.2,
          }}
          style={{
            position: "absolute",
            top: CRM_Y - 1, left: 0,
            width: "28%", height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${g(0.32)} 50%, transparent 100%)`,
            pointerEvents: "none", zIndex: 1,
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        style={{
          position: "absolute",
          top: CRM_Y + 12, left: "5%",
          display: "flex", alignItems: "center",
          color: w(0.54),
        }}
      >
        <DbIcon />
        <span style={{
          fontSize: 11, letterSpacing: "0.042em", whiteSpace: "nowrap",
          textShadow: "0 0 18px rgba(214,180,122,0.15)",
        }}>
          {crm}
        </span>
      </motion.div>

      {/* ── Follow-up line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          scaleX:  { duration: 1.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.35, delay: 0.9 },
        }}
        style={{
          position: "absolute",
          top: FUP_Y, left: "38%", width: "56%",
          height: 2, borderRadius: 999,
          background: `linear-gradient(90deg, ${g(0.50)} 0%, ${g(0.22)} 76%, transparent 100%)`,
          transformOrigin: "left center",
        }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.15 }}
        style={{
          position: "absolute",
          top: FUP_Y + 13, left: "38%",
          fontSize: 11, letterSpacing: "0.030em",
          color: w(0.42), whiteSpace: "nowrap",
        }}
      >
        {fup}
      </motion.span>

      {/* ── Main flow line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          scaleX:  { duration: LINE_DUR, delay: LINE_DEL, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.22, delay: LINE_DEL },
        }}
        style={{
          position: "absolute",
          top: MAIN_Y - 1.25,
          left: `${LINE_L}%`, width: `${LINE_W}%`,
          height: 2.5, borderRadius: 999,
          zIndex: 1,
          background: `linear-gradient(90deg, ${g(0.52)} 0%, ${g(0.78)} 50%, ${g(0.50)} 100%)`,
          transformOrigin: "left center",
          filter: "drop-shadow(0 0 6px rgba(214,180,122,0.22))",
        }}
      />

      {/* ── Sweep glow — travels along the timeline ── */}
      <motion.div
        style={{
          position: "absolute",
          top: MAIN_Y - 18,
          left: sweepLeft,
          translateX: "-50%",
          opacity: sweepAlpha,
          width: 42, height: 34,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(214,180,122,0.62) 0%, rgba(214,180,122,0.20) 45%, transparent 70%)",
          filter: "blur(5px)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* ── Dots ── */}
      {dots.map((dot, dotIndex) => {
        const xPct     = LINE_L + (dot.pct / 100) * LINE_W;
        const delay    = LINE_DEL + LINE_DUR * (dot.pct / 100);
        const r        = dot.branch ? R_HOT : dot.reply ? R_REPLY : R_NORMAL;
        const isActive = activeNode === dotIndex; /* only ONE dot has isActive=true */
        /* Score box coordinates — explicit, derived from this dot's position only.
           EN: same Y as classify (27px connector). ES: longer connector (90px) clears classify box.
           ES also shifts box 2% right to create horizontal breathing room. */
        const scoreConnH    = dot.score ? (lang === "es" ? 90 : CONNECTOR_H) : 0;
        const scoreBoxTop   = MAIN_Y + R_NORMAL + 1 + scoreConnH;
        /* EN: connector at dot center (classify box is 15% to the left — ≥14px gap at all lg+ widths).
           ES: connector at xPct+2 matching scoreBoxXPct, adding extra clearance from classify box. */
        const scoreBoxXPct  = dot.score && lang === "es" ? xPct + 2 : xPct;

        /* Resting dot colors — dim; sweep glow + active state makes them pop */
        const dotBg     = dot.branch ? g(0.36) : dot.reply ? g(0.28) : g(0.20);
        const activeBg  = dot.branch ? g(0.90) : dot.reply ? g(0.72) : g(0.58);
        const dotShadow = "none";
        const dotBorder = dot.branch ? "none"
          : dot.reply ? `1.5px solid ${g(0.28)}` : `1px solid ${g(0.18)}`;

        /* Labels — consistent opacity tier. Branch uses gold; all others use same white. */
        const labelSz        = dot.branch ? 17 : dot.reply ? 15.5 : 13;
        const labelWt        = dot.branch ? 700 : dot.reply ? 600 : 500;
        const labelClr       = dot.branch ? g(0.60) : w(0.62);
        const labelLeft      = dot.branch ? `calc(${xPct}% + ${r + 10}px)`
          : dot.reply ? `calc(${xPct}% - 10px)`
          : `${xPct}%`;
        const labelTransform = dot.branch ? "none" : "translateX(-50%)";

        return (
          <React.Fragment key={dot.pct}>

            {/* ── Active radial glow — behind dot, fades in when sweep arrives ── */}
            <motion.div
              animate={{
                opacity: isActive ? 1 : 0,
                scale:   isActive ? 1 : 0.65,
              }}
              transition={{ duration: 0.40, ease: "easeOut" }}
              style={{
                position: "absolute",
                top:  MAIN_Y - r - 12,
                left: `calc(${xPct}% - ${r + 12}px)`,
                width:  (r + 12) * 2,
                height: (r + 12) * 2,
                borderRadius: "50%",
                background: `radial-gradient(ellipse at center, ${
                  dot.branch ? g(0.75) : dot.reply ? g(0.55) : g(0.44)
                } 0%, transparent 60%)`,
                filter: `blur(${dot.branch ? 5 : 4}px)`,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* ── Sweep-activated glow ring ── */}
            <motion.div
              animate={{
                opacity: isActive ? 1 : 0,
                scale:   isActive ? 1 : 0.55,
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                position: "absolute",
                top:  MAIN_Y - r - 10,
                left: `calc(${xPct}% - ${r + 10}px)`,
                width:  (r + 10) * 2,
                height: (r + 10) * 2,
                borderRadius: "50%",
                border: `1px solid ${dot.branch ? g(0.60) : g(0.38)}`,
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* ── Dot — motion.div fires pop-in once; inner div uses CSS for state ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.30, delay, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: "absolute",
                top:  MAIN_Y - r,
                left: `calc(${xPct}% - ${r}px)`,
                width: r * 2, height: r * 2,
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: "100%", height: "100%",
                  borderRadius: "50%",
                  background: isActive ? activeBg : dotBg,
                  boxShadow: dotShadow,
                  border: dotBorder,
                  opacity: isActive ? 1 : 0.68,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transition: "background 0.28s ease, opacity 0.28s ease, transform 0.28s ease",
                }}
              />
            </motion.div>

            {/* ── Label — whileInView fires pop-in once; color driven by CSS transition only ── */}
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, delay: delay + 0.13 }}
              style={{
                position: "absolute",
                top: MAIN_Y - r - 34,
                left: labelLeft,
                transform: labelTransform,
                fontSize: labelSz,
                fontWeight: labelWt,
                letterSpacing: "0.008em",
                whiteSpace: "nowrap",
                zIndex: 5,
                color: isActive
                  ? (dot.branch ? g(0.96) : w(0.94))
                  : (activeNode !== -1 ? (dot.branch ? g(0.44) : w(0.34)) : labelClr),
                transition: "color 0.22s ease",
              }}
            >
              {dot.label}
            </motion.span>

            {/* ── Classification box — row 1 (ANNOT_CLS_Y = 236) ── */}
            {dot.classify && (
              <>
                {/* Connector stub */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18, delay: delay + 0.22 }}
                  style={{
                    position: "absolute",
                    left: `${xPct}%`, transform: "translateX(-50%)",
                    top: MAIN_Y + R_NORMAL + 1,
                    height: CONNECTOR_H, width: 1,
                    background: "rgba(255,255,255,0.11)",
                    transformOrigin: "top center",
                    zIndex: 2,
                  }}
                />
                <AnnotBox
                  top={ANNOT_CLS_Y}
                  xPct={xPct}
                  isActive={isActive}
                  inView={inView}
                  animDelay={delay + 0.28}
                  dimOpacity={1}
                >
                  <div style={{
                    padding: "9px 15px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 5,
                    position: "relative", zIndex: 1,
                  }}>
                    <span style={{
                      fontSize: 10.5, fontWeight: 500, color: w(0.80),
                      letterSpacing: "0.018em", whiteSpace: "nowrap",
                    }}>
                      {clsLine1}
                    </span>
                    <span style={{
                      fontSize: 10.5, fontWeight: 400, color: w(0.64),
                      letterSpacing: "0.015em", whiteSpace: "nowrap",
                    }}>
                      {clsLine2}
                    </span>
                  </div>
                </AnnotBox>
              </>
            )}

            {/* ── Scoring box — explicit coordinates derived from the score dot's position.
                Connector at dot X; box centered at scoreBoxXPct (ES: +2% right for breathing room).
                EN: same Y as classify. ES: 90px below dot bottom edge clears classify box.
            ── */}
            {dot.score && (
              <>
                {/* ES: L-shaped elbow — horizontal stub routes right of classify box, then drops to score box.
                    EN: single straight line, classify box is 15%+ to the left at all lg+ widths. */}
                {lang === "es" ? (
                  <>
                    <div style={{
                      position: "absolute",
                      left: `${xPct}%`,
                      top: MAIN_Y + R_NORMAL + 1,
                      width: "5%", height: 1,
                      background: "rgba(255,255,255,0.11)",
                      zIndex: 2,
                    }} />
                    <div style={{
                      position: "absolute",
                      left: `${xPct + 5}%`, transform: "translateX(-50%)",
                      top: MAIN_Y + R_NORMAL + 1,
                      height: scoreConnH, width: 1,
                      background: "rgba(255,255,255,0.11)",
                      zIndex: 2,
                    }} />
                  </>
                ) : (
                  <div style={{
                    position: "absolute",
                    left: `${scoreBoxXPct}%`, transform: "translateX(-50%)",
                    top: MAIN_Y + R_NORMAL + 1,
                    height: scoreConnH, width: 1,
                    background: "rgba(255,255,255,0.11)",
                    zIndex: 2,
                  }} />
                )}
                {/* Score annotation box */}
                <AnnotBox
                  top={scoreBoxTop}
                  xPct={scoreBoxXPct}
                  isActive={isActive}
                  inView={inView}
                  animDelay={delay + 0.28}
                  dimOpacity={1}
                >
                  {lang === "es" ? (
                    /* Spanish — vertical stack */
                    <div style={{
                      padding: "10px 16px",
                      display: "flex", flexDirection: "column",
                      alignItems: "flex-start", gap: 6,
                      position: "relative", zIndex: 1,
                    }}>
                      <span style={{
                        fontSize: 10.5, fontWeight: 400, color: w(0.50),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreCold}
                      </span>
                      <div style={{ height: 1, width: "100%", background: w(0.10), flexShrink: 0 }} />
                      <span style={{
                        fontSize: 10.5, fontWeight: 500, color: w(0.68),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreWarm}
                      </span>
                      <div style={{ height: 1, width: "100%", background: w(0.10), flexShrink: 0 }} />
                      <span style={{
                        fontSize: 10.5, fontWeight: 600, color: w(0.88),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreHot}
                      </span>
                    </div>
                  ) : (
                    /* English — horizontal row with separator lines */
                    <div style={{
                      padding: "10px 18px",
                      display: "flex", alignItems: "center", gap: 12,
                      position: "relative", zIndex: 1,
                    }}>
                      <span style={{
                        fontSize: 10.5, fontWeight: 400, color: w(0.50),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreCold}
                      </span>
                      <div style={{ width: 1, height: 10, background: w(0.12), flexShrink: 0 }} />
                      <span style={{
                        fontSize: 10.5, fontWeight: 500, color: w(0.68),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreWarm}
                      </span>
                      <div style={{ width: 1, height: 10, background: w(0.12), flexShrink: 0 }} />
                      <span style={{
                        fontSize: 10.5, fontWeight: 600, color: w(0.88),
                        letterSpacing: "0.018em", whiteSpace: "nowrap",
                      }}>
                        {scoreHot}
                      </span>
                    </div>
                  )}
                </AnnotBox>
              </>
            )}

            {/* ── Branch → Alert (Hot dot only) ── */}
            {dot.branch && (
              <>
                {/* Vertical branch — grows upward from Hot dot */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    scaleY:  { duration: 0.44, delay: delay + 0.30, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.22, delay: delay + 0.30 },
                  }}
                  style={{
                    position: "absolute",
                    left: `calc(${xPct}% - 1.25px)`,
                    top: BRANCH_TOP, height: BRANCH_H,
                    width: 2.5, borderRadius: 999,
                    background: `linear-gradient(180deg, ${g(0.44)} 0%, ${g(0.26)} 100%)`,
                    transformOrigin: "bottom center",
                    zIndex: 2,
                  }}
                />

                {/* Alert dot — dim resting glow; active glow via overlay below */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.36, delay: delay + 0.68, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    position: "absolute",
                    top:  ALERT_Y - R_ALERT,
                    left: `calc(${xPct}% - ${R_ALERT}px)`,
                    width: R_ALERT * 2, height: R_ALERT * 2,
                    borderRadius: "50%",
                    background: g(0.62),
                    boxShadow: `0 0 3px ${g(0.20)}`,
                    zIndex: 6,
                  }}
                />

                {/* Alert dot active glow — brightens when Hot step is active */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.40, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top:  ALERT_Y - R_ALERT - 10,
                    left: `calc(${xPct}% - ${R_ALERT + 10}px)`,
                    width:  (R_ALERT + 10) * 2,
                    height: (R_ALERT + 10) * 2,
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse at center, ${g(0.82)} 0%, transparent 60%)`,
                    filter: "blur(6px)",
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                />

                {/* Alert pulse ring — fires once when Hot step activates */}
                <motion.div
                  animate={isActive
                    ? { opacity: [0, 0.52, 0], scale: [1, 1.68, 2.20] }
                    : { opacity: 0, scale: 1 }
                  }
                  transition={{ duration: isActive ? 1.1 : 0.25, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top:  ALERT_Y - R_ALERT,
                    left: `calc(${xPct}% - ${R_ALERT}px)`,
                    width: R_ALERT * 2, height: R_ALERT * 2,
                    borderRadius: "50%",
                    border: `1px solid ${g(0.76)}`,
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                />

                {/* Alert label — to the right of alert dot */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.36, delay: delay + 0.84 }}
                  style={{
                    position: "absolute",
                    top:  ALERT_Y - 14,
                    left: `calc(${xPct}% + ${R_ALERT + 10}px)`,
                    zIndex: 6,
                  }}
                >
                  <span style={{
                    fontSize: 13, fontWeight: 700, letterSpacing: "0.006em",
                    color: g(0.96), display: "block", whiteSpace: "nowrap", lineHeight: 1.3,
                  }}>
                    {alertMain}
                  </span>
                  <span style={{
                    fontSize: 9.5, fontWeight: 500, letterSpacing: "0.10em",
                    textTransform: "uppercase", color: g(0.46),
                    display: "block", marginTop: 5, whiteSpace: "nowrap",
                  }}>
                    {alertSub}
                  </span>
                </motion.div>
              </>
            )}

          </React.Fragment>
        );
      })}

    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MOBILE FLOW  — smooth vertical step progression
   ══════════════════════════════════════════════════════════ */
function MobileFlow({
  dots, clsLine1, clsLine2,
  scoreCold, scoreWarm, scoreHot,
  alertMain, alertSub, fup, crm,
  leftItems = [],
}: FlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(-1);

  const TOTAL_STEPS = 7;

  useEffect(() => {
    if (!inView) return;
    let stopped = false;

    async function runCycle() {
      if (stopped) return;
      setActiveStep(-1);
      await new Promise<void>(r => setTimeout(r, 1200));

      for (let i = 0; i < TOTAL_STEPS; i++) {
        if (stopped) return;
        setActiveStep(i);
        const hold = i === TOTAL_STEPS - 1 ? 2600 : 950;
        await new Promise<void>(r => setTimeout(r, hold));
      }

      if (stopped) return;
      setActiveStep(-1);
      await new Promise<void>(r => setTimeout(r, 2000));
      if (!stopped) runCycle();
    }

    const t = setTimeout(() => runCycle(), 900);
    return () => { stopped = true; clearTimeout(t); };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  type StepVariant = "normal" | "classify" | "score" | "reply" | "hot" | "fup" | "crm";
  const STEPS: { label: string; variant: StepVariant }[] = [
    { label: leftItems[0]?.title ?? dots[0]?.label ?? "", variant: "normal"   },
    { label: leftItems[1]?.title ?? dots[2]?.label ?? "", variant: "classify" },
    { label: leftItems[2]?.title ?? dots[3]?.label ?? "", variant: "score"    },
    { label: dots[4]?.label ?? "",                        variant: "reply"    },
    { label: dots[5]?.label ?? "",                        variant: "hot"      },
    { label: fup,                                         variant: "fup"      },
    { label: crm,                                         variant: "crm"      },
  ];

  const pillStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.052)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderTop: "1px solid rgba(255,255,255,0.13)",
    borderRadius: 7,
    padding: "8px 13px",
  };

  return (
    <div ref={containerRef} style={{ position: "relative", paddingLeft: 32 }}>

      {/* Vertical timeline line */}
      <div style={{
        position: "absolute",
        left: 9, top: 12, bottom: 8, width: 1.5,
        background: `linear-gradient(180deg, ${g(0.50)} 0%, ${g(0.14)} 100%)`,
      }} />

      {STEPS.map((step, i) => {
        const isActive = activeStep === i;
        const isPast   = activeStep > i;
        const isIdling = activeStep === -1;

        /* Previous steps stay visible at 0.52 — no more flash-to-zero between steps */
        const opacity = isActive ? 1 : isPast ? 0.52 : isIdling ? 0.68 : 0.34;

        const isHot    = step.variant === "hot";
        const isReply  = step.variant === "reply";
        const isSubtle = step.variant === "fup" || step.variant === "crm";

        const dotSize = isHot ? 12 : isReply ? 11 : isSubtle ? 6 : 10;
        /* left is relative to the step div; container paddingLeft=32 offsets step divs
           from the container border. Line sits at left:9 from container border.
           So: 32 + dotLeft + dotSize/2 = 9  →  dotLeft = -32 + 9 - dotSize/2        */
        const dotLeft = -32 + 9 - dotSize / 2;

        const dotBg = isActive
          ? (isHot ? g(1) : isReply ? g(0.88) : isSubtle ? g(0.38) : g(0.70))
          : isPast
            ? (isHot ? g(0.52) : isReply ? g(0.40) : isSubtle ? g(0.24) : g(0.32))
            : (isHot ? g(0.40) : isReply ? g(0.28) : isSubtle ? g(0.18) : g(0.20));

        return (
          <div key={i} style={{ position: "relative", marginBottom: i < STEPS.length - 1 ? 26 : 0 }}>

            {/* Timeline dot */}
            <motion.div
              animate={{
                background: dotBg,
                scale: isActive ? (isSubtle ? 1.1 : 1.15) : 1,
                boxShadow: isActive && !isSubtle
                  ? (isHot   ? `0 0 10px ${g(0.54)}`
                    : isReply ? `0 0 7px ${g(0.42)}`
                    :           `0 0 5px ${g(0.28)}`)
                  : `0 0 0px ${g(0)}`,
              }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: dotLeft,
                top: isSubtle ? 6 : 5,
                width: dotSize, height: dotSize,
                borderRadius: "50%",
                border: isHot || isSubtle ? "none"
                  : isReply ? `1.5px solid ${g(0.50)}` : `1px solid ${g(0.34)}`,
              }}
            />

            {/* Content */}
            <motion.div
              animate={{ opacity }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
            >
              {/* CRM row — icon + text */}
              {step.variant === "crm" ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DbIcon />
                  <span style={{ fontSize: 11, fontWeight: 400, color: w(0.44), letterSpacing: "0.022em" }}>
                    {step.label}
                  </span>
                </div>
              ) : (
                <span style={{
                  display: "block",
                  fontSize:   isHot ? 14.5 : isReply ? 14 : step.variant === "fup" ? 11 : 13.5,
                  fontWeight: isHot ? 700   : isReply ? 600  : step.variant === "fup" ? 400  : 500,
                  color:      isHot ? g(0.80) : step.variant === "fup" ? w(0.42) : w(isReply ? 0.72 : 0.64),
                  lineHeight: 1.4,
                  letterSpacing: step.variant === "fup" ? "0.022em" : "0.005em",
                  marginBottom: ["classify","score","hot"].includes(step.variant) ? 8 : 0,
                  overflowWrap: "break-word", wordBreak: "break-word",
                }}>
                  {step.label}
                </span>
              )}

              {/* Classify sub-box */}
              {step.variant === "classify" && (
                <div style={{ ...pillStyle, display: "inline-flex", flexDirection: "column", gap: 5, maxWidth: "100%" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: w(0.80), letterSpacing: "0.015em", overflowWrap: "break-word" }}>{clsLine1}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 400, color: w(0.64), letterSpacing: "0.015em", overflowWrap: "break-word" }}>{clsLine2}</span>
                </div>
              )}

              {/* Score sub-box */}
              {step.variant === "score" && (
                <div style={{ ...pillStyle, display: "inline-flex", flexDirection: "column", gap: 5, alignItems: "flex-start", maxWidth: "100%" }}>
                  <span style={{ fontSize: 11, fontWeight: 400, color: w(0.50), overflowWrap: "break-word" }}>{scoreCold}</span>
                  <div style={{ height: 1, width: "100%", background: w(0.10) }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: w(0.68), overflowWrap: "break-word" }}>{scoreWarm}</span>
                  <div style={{ height: 1, width: "100%", background: w(0.10) }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: w(0.88), overflowWrap: "break-word" }}>{scoreHot}</span>
                </div>
              )}

              {/* Hot alert sub */}
              {step.variant === "hot" && (
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: g(0.90), display: "block" }}>{alertMain}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 500, color: g(0.44), display: "block",
                    marginTop: 3, letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>{alertSub}</span>
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════ */
export function AlwaysOn() {
  const { t, lang } = useTranslation();

  const dots: DotCfg[] = [
    { pct: 6,  label: t("always.step.1") },
    { pct: 21, label: t("always.step.2") },
    { pct: 37, label: t("always.step.3"), classify: true },
    { pct: 55, label: t("always.step.4"), score:    true },
    { pct: 72, label: t("always.step.5"), reply:    true },
    { pct: 86, label: t("always.step.6"), branch:   true },
  ];

  const leftItems: LeftItem[] = [
    { title: t("always.left.1.title"), desc1: t("always.left.1.desc") },
    { title: t("always.left.2.title"), desc1: t("always.left.2.desc1"), desc2: t("always.left.2.desc2") },
    { title: t("always.left.3.title"), desc1: t("always.left.3.desc1"), desc2: t("always.left.3.desc2") || undefined },
    { title: t("always.left.4.title"), desc1: t("always.left.4.desc") },
  ];

  const flowProps: FlowProps = {
    dots,
    lang,
    clsLine1:  t("always.cls.1"),
    clsLine2:  t("always.cls.2"),
    scoreCold: t("always.score.cold"),
    scoreWarm: t("always.score.warm"),
    scoreHot:  t("always.score.hot"),
    alertMain: t("always.alert.main"),
    alertSub:  t("always.alert.sub"),
    fup:       t("always.fup"),
    crm:       t("always.crm"),
    leftItems,
  };

  return (
    <section
      id="how-it-works"
      style={{
        position:      "relative",
        background:    "#0C0B09",
        paddingTop:    "clamp(36px, 4.5vw, 52px)",
        paddingBottom: "clamp(44px, 5.5vw, 68px)",
      }}
    >
      {/* Top transition — blends from Hero */}
      <SectionDivider />
      {/* Bottom transition — blends into next section */}
      <SectionDivider position="bottom" />

      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20"
        style={{ position: "relative", zIndex: 1 }}
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(36px, 5vw, 60px)" }}
        >
          <p style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: g(0.56), marginBottom: 12,
          }}>
            {t("always.label")}
          </p>
          <h2 style={{
            fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
            fontWeight: 700, lineHeight: 1.13,
            letterSpacing: "-0.022em",
            color: w(0.90), maxWidth: "22ch", marginBottom: 10,
          }}>
            {t("always.headline")}
          </h2>
          <p style={{
            fontSize: "clamp(0.9375rem, 1.3vw, 1rem)",
            lineHeight: 1.70, color: w(0.62), maxWidth: "50ch",
          }}>
            {t("always.sub")}
          </p>
        </motion.div>

        {/* ════════════
            DESKTOP
            ════════════ */}
        <div className="hidden lg:flex" style={{ gap: 60, alignItems: "center" }}>

          {/* LEFT — explanation */}
          <div style={{ flexShrink: 0, width: 252 }}>
            {leftItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  paddingLeft: 16,
                  marginBottom: i < leftItems.length - 1 ? 36 : 0,
                  borderLeft: `2px solid ${g(0.50)}`,
                }}
              >
                <p style={{
                  fontSize: "1rem", fontWeight: 600,
                  letterSpacing: "0.004em",
                  color: w(0.80), marginBottom: 5,
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontSize: "0.875rem", lineHeight: 1.60,
                  color: w(0.66), letterSpacing: "0.002em",
                }}>
                  {item.desc1}
                </p>
                {item.desc2 && (
                  <p style={{
                    fontSize: "0.875rem", lineHeight: 1.60,
                    color: w(0.54), letterSpacing: "0.002em",
                    marginTop: 1,
                  }}>
                    {item.desc2}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT — flow visualization */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <DesktopFlow {...flowProps} />
          </div>
        </div>

        {/* ════════════
            MOBILE
            ════════════ */}
        <div className="block lg:hidden">
          <MobileFlow {...flowProps} />
        </div>

      </div>
    </section>
  );
}
