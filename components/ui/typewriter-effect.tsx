"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  speed?: number;       // ms per character
  delay?: number;       // initial delay ms
  cursor?: boolean;
  onComplete?: () => void;
}

export function TypewriterEffect({
  text,
  className,
  speed = 35,
  delay = 0,
  cursor = true,
  onComplete,
}: TypewriterEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t0);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {cursor && !done && (
        <span
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle animate-pulse"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
