"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: "var(--ns-bg)" }}
    >
      {/* Blob 1 — warm gold, anchored top-left behind the text column */}
      <div
        className="aurora-blob animate-aurora-1"
        style={{
          width: "50vw", height: "50vw",
          maxWidth: 640, maxHeight: 640,
          top: "-10%", left: "-8%",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.14) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Blob 2 — sand, anchored top-right behind the visual column */}
      <div
        className="aurora-blob animate-aurora-2"
        style={{
          width: "50vw", height: "50vw",
          maxWidth: 600, maxHeight: 600,
          top: "0%", right: "-12%",
          background: "radial-gradient(ellipse, rgba(242,237,229,0.20) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Blob 3 — very subtle terracotta, bottom centre */}
      <div
        className="aurora-blob animate-aurora-3"
        style={{
          width: "40vw", height: "40vw",
          maxWidth: 480, maxHeight: 480,
          bottom: "-8%", left: "30%",
          background: "radial-gradient(ellipse, rgba(196,112,91,0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
