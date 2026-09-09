import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Rhythm = "compact" | "default" | "feature" | "opening" | "flush";
type Surface = "canvas" | "raised" | "deep" | "ivory";

/**
 * A section is padding-top + content + padding-bottom, nothing else.
 * Surface steps are the S1 seam; a hairline is S2; an ivory or media band is S3.
 */
export function Section({
  rhythm = "default",
  surface = "canvas",
  hairline = false,
  id,
  className,
  labelledBy,
  children,
}: {
  rhythm?: Rhythm;
  surface?: Surface;
  hairline?: boolean;
  id?: string;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  const rhythmCls = rhythm === "flush" ? "" : `section-${rhythm}`;
  const surfaceCls =
    surface === "raised" ? "bg-surface-raised" : surface === "deep" ? "" : surface === "ivory" ? "" : "";
  const canvasAttr = surface === "ivory" ? "ivory" : surface === "deep" ? "deep" : undefined;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-canvas={canvasAttr}
      className={cn("relative", rhythmCls, surfaceCls, hairline && "hairline-top", className)}
    >
      {children}
    </section>
  );
}
