"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/language-context";
import { SectionDivider } from "@/components/ui/section-divider";

/* ─── Design tokens ─── */
const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

/* ─── Icons ─── */
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M11 2L4 11h6l-1 7 7-9h-6l1-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
      <line x1="10" y1="3" x2="10" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3" y1="10" x2="6" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconIntegration() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="6" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.5" y="13" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8.5h6M10 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2 4v5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 16v-5h-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.5A7 7 0 0 0 4.5 5.5L2 9M18 11l-2.5 3.5a7 7 0 0 1-12-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Animation variants ─── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.10 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ══════════════════════════════════════════════════════════
   TRUST SECTION — 2×2 dark card grid
   ══════════════════════════════════════════════════════════ */
export function TrustStrip() {
  const { t } = useTranslation();

  const cards = [
    { Icon: IconBolt,        labelKey: "strip.item1.label", descKey: "strip.item1.desc" },
    { Icon: IconTarget,      labelKey: "strip.item2.label", descKey: "strip.item2.desc" },
    { Icon: IconIntegration, labelKey: "strip.item3.label", descKey: "strip.item3.desc" },
    { Icon: IconRefresh,     labelKey: "strip.item4.label", descKey: "strip.item4.desc" },
  ] as const;

  return (
    <section
      aria-labelledby="trust-heading"
      style={{
        position:      "relative",
        background:    "#0C0B09",
        paddingTop:    "clamp(52px, 6.5vw, 80px)",
        paddingBottom: "clamp(52px, 6.5vw, 80px)",
        overflow:      "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top: "50%", left: "50%",
          transform:  "translate(-50%, -50%)",
          width:      "70vw",
          height:     "70vw",
          maxWidth:   900,
          maxHeight:  900,
          background: `radial-gradient(ellipse at center, ${g(0.045)} 0%, transparent 62%)`,
          pointerEvents: "none",
        }}
      />

      <SectionDivider />
      <SectionDivider position="bottom" />

      <div
        className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16"
        style={{ position: "relative", zIndex: 1 }}
      >

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(40px, 5vw, 60px)" }}
        >
          <p style={{
            fontSize:      10,
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         g(0.56),
            marginBottom:  12,
          }}>
            {t("strip.label")}
          </p>

          <h2
            id="trust-heading"
            style={{
              fontSize:      "clamp(1.75rem, 3vw, 2.375rem)",
              fontWeight:    700,
              lineHeight:    1.14,
              letterSpacing: "-0.020em",
              color:         w(0.90),
              maxWidth:      "24ch",
              marginBottom:  14,
            }}
          >
            {t("strip.headline")}
          </h2>

          <p style={{
            fontSize:   "clamp(0.9375rem, 1.2vw, 1rem)",
            lineHeight: 1.72,
            color:      w(0.46),
            maxWidth:   "52ch",
          }}>
            {t("strip.sub")}
          </p>
        </motion.div>

        {/* ── 2×2 card grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-24px" }}
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(2, 1fr)",
            gap:                   "clamp(10px, 1.4vw, 18px)",
            maxWidth:              800,
            margin:                "0 auto",
          }}
        >
          {cards.map(({ Icon, labelKey, descKey }) => (
            <motion.div
              key={labelKey}
              variants={cardVariant}
              whileHover={{
                y:           -4,
                borderColor: g(0.22),
                boxShadow:   `0 22px 52px rgba(0,0,0,0.32), 0 0 0 1px ${g(0.10)}`,
                transition:  { duration: 0.22 },
              }}
              style={{
                background:   "rgba(255,255,255,0.038)",
                border:       `1px solid ${w(0.08)}`,
                borderRadius: 20,
                padding:      "clamp(22px, 3vw, 34px)",
                position:     "relative",
                overflow:     "hidden",
                cursor:       "default",
              }}
            >
              {/* Hairline gold shimmer on top edge */}
              <div
                aria-hidden="true"
                style={{
                  position:   "absolute",
                  top: 0, left: "12%", right: "12%",
                  height:     1,
                  background: `linear-gradient(90deg, transparent, ${g(0.26)}, transparent)`,
                }}
              />

              {/* Icon container */}
              <div style={{
                width:           44,
                height:          44,
                borderRadius:    12,
                background:      g(0.11),
                border:          `1px solid ${g(0.20)}`,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                marginBottom:    18,
                color:           g(0.92),
                flexShrink:      0,
              }}>
                <Icon />
              </div>

              {/* Title */}
              <p style={{
                fontSize:      "1rem",
                fontWeight:    600,
                letterSpacing: "-0.010em",
                color:         w(0.88),
                marginBottom:  8,
                lineHeight:    1.3,
              }}>
                {t(labelKey)}
              </p>

              {/* Description */}
              <p style={{
                fontSize:   "0.875rem",
                lineHeight: 1.70,
                color:      w(0.48),
              }}>
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
