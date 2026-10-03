import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * A quiet dot ground behind a product surface.
 * Source: Dot Pattern by Magic UI, https://21st.dev/@magicui/components/dot-pattern (MIT).
 * Adapted: typed props instead of `any`, the dot colour comes from the ink scale through `currentColor`
 * (no neutral-400 utility), and a radial mask fades the pattern out towards the edges so it stays a hint.
 */
export function DotPattern({
  size = 18,
  radius = 1,
  className,
}: {
  size?: number;
  radius?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-ink-350 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]", className)}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle cx={radius} cy={radius} r={radius} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
