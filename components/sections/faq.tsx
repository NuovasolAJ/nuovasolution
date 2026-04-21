"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

const FAQ_KEYS = [
  "faq.q1",
  "faq.q2",
  "faq.q3",
  "faq.q4",
  "faq.q5",
  "faq.q6",
  "faq.q7",
] as const;

export function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      style={{
        background: "#0C0B09",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingTop: "clamp(44px, 5.5vw, 72px)",
        paddingBottom: "clamp(44px, 5.5vw, 72px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: 560, marginBottom: "clamp(36px, 4.5vw, 56px)" }}
        >
          <p style={{
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: g(0.56), marginBottom: 16,
          }}>
            {t("faq.label")}
          </p>
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.024em",
            color: w(0.90),
          }}>
            {t("faq.headline")}
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.50, delay: 0.12 }}
          style={{ maxWidth: 760 }}
        >
          {FAQ_KEYS.map((key, i) => {
            const isOpen = open === i;
            return (
              <div
                key={key}
                style={{
                  borderBottom: `1px solid ${w(isOpen ? 0.08 : 0.05)}`,
                  transition: "border-color 0.20s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "22px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => {
                    const q = (e.currentTarget as HTMLButtonElement).querySelector(".faq-q") as HTMLElement | null;
                    if (q) q.style.color = w(0.90).toString();
                  }}
                  onMouseLeave={e => {
                    const q = (e.currentTarget as HTMLButtonElement).querySelector(".faq-q") as HTMLElement | null;
                    if (q) q.style.color = isOpen ? w(0.88).toString() : w(0.62).toString();
                  }}
                >
                  <span
                    className="faq-q"
                    style={{
                      fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                      fontWeight: 500,
                      lineHeight: 1.45,
                      color: isOpen ? w(0.88) : w(0.62),
                      transition: "color 0.18s ease",
                    }}
                  >
                    {t(`${key}.q`)}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: 18, height: 18,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isOpen ? g(0.80) : w(0.30),
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.22s ease, color 0.18s ease",
                      fontSize: 20, lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)",
                        lineHeight: 1.70,
                        color: w(0.42),
                        paddingBottom: 20,
                        maxWidth: "56ch",
                      }}>
                        {t(`${key}.a`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
