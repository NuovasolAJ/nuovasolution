import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "quiet" | "pending";
type Size = "sm" | "md" | "lg";

/**
 * Buttons of the light system: pill shaped, ink primary, quiet outline secondary.
 * The brand gold is not a button colour; it stays an accent.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap select-none transition-[background-color,color,border-color,transform,box-shadow] duration-micro ease-standard focus-visible:outline-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink-950 text-ivory hover:bg-ink-800 hover:-translate-y-px active:translate-y-0 shadow-card",
  secondary: "border border-line-strong text-text-primary bg-surface-raised hover:border-line-interactive hover:bg-surface-hover",
  tertiary: "text-text-primary underline underline-offset-4 decoration-line-strong hover:decoration-ink-950 px-0 min-h-[44px]",
  quiet: "text-text-accent hover:underline underline-offset-4 px-0 h-auto min-h-[44px]",
  pending: "border border-dashed border-line-interactive text-text-secondary bg-transparent hover:bg-surface-hover",
};

// A minimum height, not a fixed one: one line keeps the 44 / 48 / 56 px of the touch floor (review WR-18); a
// full-width button in a narrow column may wrap its label instead of cutting it (review 2026-10-01, F2).
const sizes: Record<Size, string> = {
  sm: "min-h-[44px] px-5 py-2 t-body-s",
  md: "min-h-[48px] px-6 py-2.5 t-body-m",
  lg: "min-h-[56px] px-8 py-3 t-body-l",
};
const fullCls = "w-full whitespace-normal text-center";

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ariaLabel,
  full = false,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  full?: boolean;
}) {
  const cls = cn(base, variants[variant], variant === "tertiary" || variant === "quiet" ? "" : sizes[size], full && fullCls, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
        <ExternalIcon />
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

/**
 * `busy`: the request is running. The button is marked, shows a quiet ring (static with reduced
 * motion) and should be disabled by the caller; the caller keeps it busy until the next page has
 * replaced this one (owner finding 2026-10-01: the login button must not become clickable again
 * while the redirect is still on its way).
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  full = false,
  busy = false,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; full?: boolean; busy?: boolean }) {
  return (
    <button
      className={cn(base, variants[variant], variant === "tertiary" || variant === "quiet" ? "" : sizes[size], full && fullCls, busy && "disabled:opacity-90", className)}
      aria-busy={busy || undefined}
      data-busy={busy ? "true" : undefined}
      {...rest}
    >
      {busy && <span aria-hidden="true" className="busy-ring" data-busy-ring />}
      {children}
    </button>
  );
}

/** Primary + Secondary at most, stacked full-width on mobile. */
export function CtaRow({ children, className, align = "left" }: { children: ReactNode; className?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4 [&>*]:w-full md:[&>*]:w-auto", align === "center" && "md:justify-center", className)}>
      {children}
    </div>
  );
}
