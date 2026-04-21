"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  position?: "top" | "bottom";
}

/**
 * SectionDivider — reusable section transition overlay.
 *
 * Place as first/last child inside a `position: relative` section.
 * Creates a dark-to-transparent gradient blend + subtle gold hairline at the seam.
 * Fades in on scroll.
 *
 * Props:
 *   position — "top" (default) or "bottom"
 */
export function SectionDivider({ position = "top" }: SectionDividerProps) {
  const isBottom = position === "bottom";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "absolute",
        ...(isBottom ? { bottom: 0 } : { top: 0 }),
        left: 0,
        right: 0,
        height: 96,
        pointerEvents: "none",
      }}
    >
      {/* Dark fade — blends adjacent section into this one */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isBottom
            ? "linear-gradient(to top, rgba(12,10,8,0.52) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(12,10,8,0.52) 0%, transparent 100%)",
        }}
      />
      {/* Gold hairline — barely-visible warmth at the seam */}
      <div
        style={{
          position: "absolute",
          ...(isBottom ? { bottom: 0 } : { top: 0 }),
          left: "15%",
          right: "15%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(214,180,122,0.13) 28%, rgba(214,180,122,0.13) 72%, transparent 100%)",
          filter: "drop-shadow(0 0 6px rgba(214,180,122,0.18))",
        }}
      />
    </motion.div>
  );
}
