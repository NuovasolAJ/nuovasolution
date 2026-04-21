"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

export function FinalCTA() {
  const { t } = useTranslation();

  const CONTACT = "https://cal.com/nuovasolution/demo";

  return (
    <section
      id="contact"
      style={{
        background: "#0C0B09",
        borderTop: `1px solid ${w(0.05)}`,
        paddingTop: "clamp(52px, 6vw, 80px)",
        paddingBottom: "clamp(44px, 5.5vw, 72px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.60, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}
        >

          {/* Eyebrow */}
          <p style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: g(0.56), marginBottom: 18,
          }}>
            {t("cta.label")}
          </p>

          {/* Headline */}
          <h2 style={{
            fontSize: "clamp(2rem, 3.6vw, 2.875rem)",
            fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.026em",
            color: w(0.92), marginBottom: 18,
          }}>
            {t("cta.heading")}
          </h2>

          {/* Supporting text */}
          <p style={{
            fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
            lineHeight: 1.72, color: w(0.44),
            maxWidth: "42ch", margin: "0 auto 28px",
          }}>
            {t("cta.sub")}
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex", flexDirection: "row", flexWrap: "wrap",
            gap: 12, justifyContent: "center", marginBottom: 18,
          }}>
            <a
              href={CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
              style={{ fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "0.01em" }}
            >
              {t("cta.primary")}
            </a>
            <a
              href={CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "13px 28px", borderRadius: 9999,
                background: "transparent",
                border: `1px solid ${w(0.14)}`,
                fontSize: "0.9375rem", fontWeight: 500,
                color: w(0.60), letterSpacing: "-0.01em",
                textDecoration: "none", whiteSpace: "nowrap",
                transition: "border-color 0.20s ease, color 0.20s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = w(0.28);
                (e.currentTarget as HTMLAnchorElement).style.color = w(0.80);
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = w(0.14);
                (e.currentTarget as HTMLAnchorElement).style.color = w(0.60);
              }}
            >
              {t("cta.secondary")}
            </a>
          </div>

          {/* Microcopy — friction reducer */}
          <p style={{
            fontSize: "0.875rem",
            color: w(0.62),
            letterSpacing: "0.005em",
            marginBottom: 24,
          }}>
            {t("cta.microcopy")}
          </p>

          {/* Reassurance microcopy */}
          <p style={{
            fontSize: "0.6875rem", lineHeight: 1.7,
            color: w(0.52), marginBottom: 5,
            letterSpacing: "0.005em",
          }}>
            {t("cta.compat")}
          </p>
          <p style={{ fontSize: "0.6875rem", color: w(0.42), letterSpacing: "0.005em", marginBottom: 28 }}>
            {t("cta.compat2")}
          </p>

          {/* Process steps */}
          <div style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 6,
            textAlign: "left",
          }}>
            {(["cta.process.1", "cta.process.2", "cta.process.3"] as const).map((key, i) => (
              <div key={key} style={{
                display: "flex",
                alignItems: "baseline",
                gap: 0,
              }}>
                <span style={{
                  minWidth: "1.5em",
                  flexShrink: 0,
                  fontSize: "0.6875rem",
                  lineHeight: 1.6,
                  color: g(0.28),
                  letterSpacing: "0.005em",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {i + 1}.
                </span>
                <span style={{
                  fontSize: "0.6875rem",
                  lineHeight: 1.6,
                  color: w(0.18),
                  letterSpacing: "0.005em",
                }}>
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
