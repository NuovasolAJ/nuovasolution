"use client";

import React from "react";
import { useTranslation, type Lang } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface LangToggleProps {
  className?: string;
  /** Force white-on-dark styling — used when the toggle sits over the always-dark hero */
  onHero?: boolean;
}

export function LangToggle({ className, onHero }: LangToggleProps) {
  const { lang, setLang } = useTranslation();

  return (
    <div
      className={cn("flex items-center gap-0.5 rounded-full p-0.5", className)}
      style={{ backgroundColor: onHero ? "rgba(255,255,255,0.08)" : "var(--ns-bg-surface)" }}
      role="group"
      aria-label="Language switcher"
    >
      {(["en", "es"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === "en" ? "Switch to English" : "Cambiar a Español"}
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200",
            lang !== l && (onHero
              ? "text-white/40 hover:text-white/70"
              : "text-brand-stoneLight hover:text-brand-stone")
          )}
          style={
            lang === l
              ? onHero
                ? { backgroundColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.90)" }
                : { backgroundColor: "var(--ns-bg-card)", color: "var(--ns-text-body)", boxShadow: "0 1px 3px rgba(0,0,0,0.10)" }
              : {}
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
