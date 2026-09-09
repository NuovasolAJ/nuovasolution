import { cn } from "@/lib/utils";

/**
 * The NuovaSolution lockup, preserved exactly. The official artwork is a
 * black-on-transparent PNG (1600 × 320). It is rendered through a CSS alpha
 * mask filled with currentColor, so it takes the ivory of a dark surface or
 * the ink of an ivory surface without any invert filter and without
 * re-drawing the mark. Height 28 px below 640, 32 px above.
 *
 * Open item: an SVG lockup from the owner would replace this mask.
 */
export function Logo({ className, label = "NuovaSolution" }: { className?: string; label?: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("inline-block h-7 md:h-8 aspect-[5/1] bg-current text-text-primary", className)}
      style={{
        WebkitMaskImage: "url(/images/logo-tight.png)",
        maskImage: "url(/images/logo-tight.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
