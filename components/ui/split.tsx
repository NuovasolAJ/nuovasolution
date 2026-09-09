import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Ratio = "7/5" | "5/7" | "8/4" | "4/8";

/**
 * Asymmetric split. Stacks text-first below 1024 px regardless of desktop
 * media side. Media is cropped by the container edge on desktop.
 */
export function Split({ ratio = "7/5", mediaSide = "right", text, media, className }: { ratio?: Ratio; mediaSide?: "left" | "right"; text: ReactNode; media: ReactNode; className?: string }) {
  const [t, m] = ratio.split("/").map(Number);
  const textCols = `xl:col-span-${t}`;
  const mediaCols = `xl:col-span-${m}`;
  return (
    <div className={cn("grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-12 2xl:gap-16 items-center", className)}>
      <div className={cn("order-1", textCols, mediaSide === "left" && "xl:order-2")}>{text}</div>
      <div className={cn("order-2", mediaCols, mediaSide === "left" && "xl:order-1")}>{media}</div>
    </div>
  );
}
