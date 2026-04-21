"use client";

import React from "react";
import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";

interface DarkModeToggleProps {
  className?: string;
  /** Force white-on-dark styling — used when the toggle sits over the always-dark hero */
  onHero?: boolean;
}

export function DarkModeToggle({ className, onHero }: DarkModeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
        onHero
          ? "text-white/60 hover:text-white hover:bg-white/10"
          : "text-brand-stone hover:text-brand-navy hover:bg-brand-sand dark:text-brand-stoneLight dark:hover:text-white dark:hover:bg-white/10",
        className
      )}
    >
      {isDark ? (
        // Sun icon
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2"  x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.22"  y1="4.22"  x2="7.05"  y2="7.05" />
          <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
          <line x1="2"  y1="12" x2="6"  y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.22"  y1="19.78" x2="7.05"  y2="16.95" />
          <line x1="16.95" y1="7.05"  x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
