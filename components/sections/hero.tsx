"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

/* ─────────────────────────────────────────────────────────────
   Live moment — three distinct message surfaces
   ───────────────────────────────────────────────────────────── */
function LiveMoment({ t }: { t: (key: string) => string }) {
  return (
    <div className="relative">

      {/* Ambient warmth */}
      <div
        style={{
          position: "absolute",
          inset: "-100px -60px",
          background:
            "radial-gradient(ellipse at 46% 44%, rgba(201,169,110,0.18) 0%, transparent 64%)",
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* ── 1. Client message — already visible on load ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.062)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          {/* Sender */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>D</span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.10em",
                color: "rgba(255,255,255,0.44)",
                textTransform: "uppercase",
              }}
            >
              Daniel M.
            </span>
          </div>

          {/* Message */}
          <p
            style={{
              fontSize: "clamp(0.9375rem, 1.4vw, 1.0rem)",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.88)",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.010em",
              textAlign: "left",
            }}
          >
            &ldquo;{t("hero.chat.msg.1")}
            <br /><br />
            {t("hero.chat.msg.2")}
            <br /><br />
            {t("hero.chat.msg.3")}&rdquo;
          </p>
        </div>

        {/* ── Spacer rule ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            margin: "12px 0",
            transformOrigin: "left center",
          }}
        />

        {/* ── 2. Reply ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "rgba(201,169,110,0.075)",
            border: "1px solid rgba(201,169,110,0.18)",
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          {/* Sender label */}
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(201,169,110,1.0)",
                textTransform: "uppercase",
                textShadow: "0 0 14px rgba(201,169,110,0.55)",
              }}
            >
              {t("hero.chat.replied")}
            </span>
          </div>

          {/* Reply message */}
          <p
            style={{
              fontSize: "clamp(0.9375rem, 1.4vw, 1.0rem)",
              lineHeight: 1.84,
              color: "rgba(255,255,255,0.72)",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.006em",
            }}
          >
            &ldquo;{t("hero.chat.reply.1")}
            <br /><br />
            {t("hero.chat.reply.2")}
            <br /><br />
            {t("hero.chat.reply.3")}&rdquo;
          </p>
        </motion.div>

        {/* ── Spacer rule ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            margin: "12px 0 20px",
            transformOrigin: "left center",
          }}
        />

        {/* ── 3. Agent notification ── */}
        <div style={{ marginBottom: 10 }}>
          <p
            style={{
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              marginBottom: 2,
            }}
          >
            {t("hero.chat.sent")}
          </p>
          <p
            style={{
              fontSize: 8.5,
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.38)",
              margin: 0,
            }}
          >
            WhatsApp · Email
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.22)",
            borderRadius: 10,
            padding: "20px 22px 20px 18px",
            boxShadow: "0 0 32px rgba(201,169,110,0.12)",
          }}
        >
          {/* Gold accent bar — subtle breathing glow */}
          <motion.div
            animate={{ opacity: [0.65, 0.95, 0.65] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 2,
              alignSelf: "stretch",
              minHeight: 60,
              background: "rgba(201,169,110,0.80)",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />

          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.90)",
                marginBottom: 10,
              }}
            >
              {t("hero.chat.alert.title")}
            </p>
            <p
              style={{
                fontSize: "clamp(0.875rem, 1.25vw, 0.9375rem)",
                lineHeight: 1.68,
                color: "rgba(255,255,255,0.82)",
                fontWeight: 400,
                letterSpacing: "0.005em",
              }}
            >
              {t("hero.chat.alert.line1")}
            </p>
            <p
              style={{
                fontSize: "clamp(0.875rem, 1.25vw, 0.9375rem)",
                lineHeight: 1.68,
                color: "rgba(255,255,255,0.52)",
                fontWeight: 300,
                letterSpacing: "0.004em",
              }}
            >
              {t("hero.chat.alert.line2")}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────────── */
export function Hero() {
  const { t } = useTranslation();

  const features = [
    { title: t("hero.feature.1.title"), desc: t("hero.feature.1.desc") },
    { title: t("hero.feature.2.title"), desc: t("hero.feature.2.desc") },
    { title: t("hero.feature.3.title"), desc: t("hero.feature.3.desc") },
    { title: t("hero.feature.4.title"), desc: t("hero.feature.4.desc") },
  ];

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #100F0C 0%, #0C0B09 55%, #0E0D0B 100%)",
        minHeight: "100vh",
      }}
    >

      {/* ── Ambient ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            width: "55vw",
            height: "55vw",
            maxWidth: 760,
            maxHeight: 760,
            top: "-20%",
            left: "-18%",
            background:
              "radial-gradient(ellipse, rgba(201,169,110,0.055) 0%, transparent 62%)",
            filter: "blur(140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "36vw",
            height: "36vw",
            maxWidth: 500,
            maxHeight: 500,
            top: "10%",
            right: "-5%",
            background:
              "radial-gradient(ellipse, rgba(180,140,80,0.03) 0%, transparent 65%)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
            background: "linear-gradient(to bottom, transparent, rgba(12,11,9,0.94))",
          }}
        />
      </div>

      {/* Nav spacer */}
      <div className="pt-16 md:pt-[72px]" />

      {/* ── Main grid ── */}
      <div className="flex-1 flex items-start relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-2 pb-10 md:pt-3 md:pb-14 lg:pt-4 lg:pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 lg:gap-24 items-start">

            {/* ─── LEFT ─── */}
            <div className="order-1" style={{ maxWidth: 540 }}>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(2.625rem, 4.9vw, 4.375rem)",
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: "-0.030em",
                  marginBottom: 20,
                }}
              >
                <span style={{ display: "block", color: "#ffffff" }}>
                  {t("hero.headline.line1")}
                </span>
                <span style={{ display: "block", color: "rgba(255,255,255,0.52)", marginTop: 5 }}>
                  {t("hero.headline.line2")}
                </span>
              </motion.h1>

              {/* Pain line */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(0.8125rem, 1.05vw, 0.875rem)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(201,169,110,0.72)",
                  letterSpacing: "0.014em",
                  marginTop: 8,
                  marginBottom: 36,
                }}
              >
                {t("hero.pain.line1")}<br />{t("hero.pain.line2")}
              </motion.p>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(0.9375rem, 1.35vw, 1.0rem)",
                  lineHeight: 1.80,
                  color: "rgba(255,255,255,0.70)",
                  marginBottom: 34,
                  maxWidth: "29ch",
                }}
              >
                {t("hero.sub")}
              </motion.p>

              {/* Feature grid — 2×2 modules */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-4"
                style={{ marginBottom: 40 }}
              >
                {features.map((f, i) => (
                  <div key={i} className="hero-card">
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.76)",
                        marginBottom: 6,
                        letterSpacing: "0.003em",
                        lineHeight: 1.4,
                      }}
                    >
                      {f.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        lineHeight: 1.64,
                        color: "rgba(255,255,255,0.56)",
                        letterSpacing: "0.002em",
                        fontWeight: 400,
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 36,
                  flexWrap: "wrap",
                }}
              >
                <motion.a
                  href="https://cal.com/nuovasolution/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    letterSpacing: "0.015em",
                    padding: "14px 32px",
                    display: "inline-block",
                  }}
                >
                  {t("hero.cta.primary")}
                </motion.a>

                <a
                  href="#how-it-works"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.50)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    letterSpacing: "0.01em",
                    transition: "color 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.70)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.50)";
                  }}
                >
                  {t("hero.cta.secondary")}
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>

              {/* CTA note + trust lines */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                style={{ marginTop: 20 }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.42)",
                    letterSpacing: "0.01em",
                    marginBottom: 16,
                  }}
                >
                  {t("hero.cta.note")}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.48)",
                    letterSpacing: "0.02em",
                    marginBottom: 4,
                  }}
                >
                  {t("hero.trust.line1")}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.40)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t("hero.trust.line2")}
                </p>
              </motion.div>

            </div>

            {/* ─── RIGHT: Live moment ─── */}
            <div className="order-2 flex justify-center lg:justify-end">
              <div className="relative w-full" style={{ maxWidth: 460 }}>
                <LiveMoment t={t} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Section transition: warm gradient fade + inset rule ── */}
      <div className="relative pointer-events-none select-none" aria-hidden="true">
        {/* Gradient: transparent → subtle warm tone */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.028) 60%, rgba(201,169,110,0.048) 100%)",
          }}
        />
        {/* Inset divider line — 78% width, centred, very low opacity */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "78%",
            height: 1,
            background:
              "linear-gradient(to right, transparent 0%, rgba(201,169,110,0.22) 20%, rgba(201,169,110,0.32) 50%, rgba(201,169,110,0.22) 80%, transparent 100%)",
          }}
        />
      </div>

    </section>
  );
}
