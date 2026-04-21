"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/language-context";

/* ─── Conversation data ─────────────────────────────────── */
type Role = "client" | "agent";

const MESSAGES: { role: Role; key: string }[] = [
  { role: "client", key: "chat.conv.m1" },
  { role: "agent",  key: "chat.conv.m2" },
  { role: "agent",  key: "chat.conv.m3" },
  { role: "client", key: "chat.conv.m4" },
  { role: "agent",  key: "chat.conv.m5" },
];

/* ─── Framer variants — stagger on scroll entry ─────────── */
const listV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.08 },
  },
};

const itemV = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Bubble ─────────────────────────────────────────────── */
function Bubble({ role, text }: { role: Role; text: string }) {
  const isClient = role === "client";
  return (
    <motion.div
      variants={itemV}
      className={`flex ${isClient ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={
          isClient
            ? {
                backgroundColor: "var(--ns-navy)",
                color: "#ffffff",
                borderRadius: "16px 16px 4px 16px",
              }
            : {
                backgroundColor: "var(--ns-bg-surface)",
                color: "var(--ns-text-body)",
                borderRadius: "16px 16px 16px 4px",
                border: "1px solid var(--ns-border)",
              }
        }
      >
        {text}
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export function ChatDemo() {
  const { t } = useTranslation();

  return (
    <section
      className="py-24 px-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--ns-bg-surface)" }}
      id="chat-demo"
    >
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label">{t("chat.label")}</span>
          <h2 className="mt-3 section-heading">{t("chat.heading")}</h2>
          <p className="mt-4 section-sub max-w-sm mx-auto">{t("chat.sub")}</p>
        </motion.div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.60, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{
            backgroundColor: "var(--ns-bg-card)",
            border: "1px solid var(--ns-border)",
          }}
        >
          {/* Panel header */}
          <div className="bg-brand-navy px-5 py-3.5 flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full bg-[#28C840]"
              style={{ boxShadow: "0 0 6px rgba(40,200,64,0.60)" }}
            />
            <span className="text-sm text-white/75 font-medium tracking-wide">
              {t("chat.live")}
            </span>
          </div>

          {/* Conversation */}
          <motion.div
            className="px-5 py-6 flex flex-col gap-3"
            variants={listV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {MESSAGES.map((msg, i) => (
              <Bubble key={i} role={msg.role} text={t(msg.key)} />
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
