import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LabelChip } from "./status";

type Aspect = "16:9" | "16:10" | "4:3" | "4:5" | "1:1" | "3:4";
const aspectCls: Record<Aspect, string> = {
  "16:9": "aspect-[16/9]",
  "16:10": "aspect-[16/10]",
  "4:3": "aspect-[4/3]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
};

/**
 * The R6 firewall. Three states. `pending` is an empty architectural frame at
 * the exact final aspect ratio: no fabricated rows, names, numbers or charts.
 */
export function ProductSurface({
  state,
  aspect,
  aspectMobile,
  label,
  illustrativeLabel = "Illustrative",
  className,
  children,
  frame = "none",
}: {
  state: "pending" | "illustrative" | "capture";
  aspect: Aspect;
  aspectMobile?: Aspect;
  /** Accessible name for the pending frame, e.g. "Product view. Capture pending." */
  label: string;
  illustrativeLabel?: string;
  className?: string;
  children?: ReactNode;
  frame?: "none" | "browser" | "phone";
}) {
  const ratio = aspectMobile ? cn(aspectCls[aspectMobile], `lg:${aspectCls[aspect].replace("aspect-", "aspect-")}`) : aspectCls[aspect];

  return (
    <div
      role={state === "pending" ? "img" : undefined}
      aria-label={state === "pending" ? label : undefined}
      className={cn("relative w-full overflow-hidden border border-line-strong rounded-none bg-surface-raised", ratio, frame === "phone" && "rounded-md", className)}
    >
      {frame === "browser" && (
        <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center border-b border-line-hairline bg-surface-raised px-3">
          <span className="t-caption text-text-muted">app.nuova</span>
        </div>
      )}
      {state === "pending" ? (
        <div className="pending-field absolute inset-0">
          <div className="absolute inset-0 z-[1] flex items-center justify-center p-6">
            <span className="t-caption text-text-muted text-center">{label}</span>
          </div>
        </div>
      ) : (
        <div className={cn("absolute inset-0", frame === "browser" && "top-8")}>{children}</div>
      )}
      {state === "illustrative" && (
        <LabelChip className="absolute left-3 top-3 z-20">{illustrativeLabel}</LabelChip>
      )}
    </div>
  );
}
