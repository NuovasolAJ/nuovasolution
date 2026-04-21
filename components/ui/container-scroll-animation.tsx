"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Height multiplier — how many vh to make the scroll container.
   *  Default 400 means 400vh of scroll space for 4 steps. */
  scrollHeight?: number;
}

/**
 * Sticky scroll container.
 * The outer div is tall (scrollHeight vh) so the inner content stays
 * pinned while the user scrolls through the steps.
 */
export function ContainerScrollAnimation({
  children,
  className,
  scrollHeight = 400,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

interface ScrollStepProps {
  children: React.ReactNode;
  /** Scroll progress [0–1] at which this step is fully visible */
  activeAt: number;
  /** Width of the active band — default 0.2 (20% of total scroll) */
  bandwidth?: number;
  className?: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

/**
 * Individual step inside a ContainerScrollAnimation.
 * Fades in when scrollYProgress is within [activeAt, activeAt+bandwidth]
 * and fades out after.
 */
export function ScrollStep({
  children,
  activeAt,
  bandwidth = 0.22,
  className,
  scrollYProgress,
}: ScrollStepProps) {
  const fadeIn  = activeAt;
  const peak    = activeAt + bandwidth * 0.3;
  const fadeOut = activeAt + bandwidth;

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, peak, fadeOut],
    [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeIn, peak],
    [28, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn("absolute inset-0 flex items-center justify-center p-6 md:p-12", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hook — exposes scrollYProgress for the nearest ContainerScrollAnimation.
 * Pass the ref you created and attach to the container.
 */
export function useContainerScroll(ref: React.RefObject<HTMLDivElement>) {
  return useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
}
