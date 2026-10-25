import { cn } from "@/lib/utils";

/**
 * The NuovaSolution lockup, the official artwork itself (public/images/logo-tight.png, black on transparent, 1600 × 320),
 * as a plain image (R24, owner 24.10.: the actual logo; the earlier CSS mask did not show in the owner's browser). On a
 * dark surface the page inverts it to ivory with a filter (globals.css `.site-logo`), the mark itself is never redrawn.
 * Height 28 px below 640, 32 px above.
 */
export function Logo({ className, label = "NuovaSolution" }: { className?: string; label?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/logo-tight.png" alt={label} width={1600} height={320} decoding="async" fetchPriority="high" className={cn("site-logo h-7 w-auto md:h-8", className)} data-site-logo />;
}
