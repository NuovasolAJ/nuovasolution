import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "quiet" | "pending";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap select-none transition-[background-color,color,border-color,transform] duration-micro ease-standard focus-visible:outline-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-champagne-400 text-ink-950 hover:bg-champagne-300 hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-line-interactive text-text-primary bg-transparent hover:bg-surface-raised",
  tertiary:
    "text-text-primary underline underline-offset-4 decoration-line-hairline hover:decoration-champagne-400 px-0",
  quiet: "text-text-accent hover:underline underline-offset-4 px-0 h-auto",
  pending:
    "border border-dashed border-line-interactive text-text-secondary bg-transparent hover:bg-surface-raised",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 t-body-s",
  md: "h-12 px-6 t-body-m",
  lg: "h-14 px-8 t-body-l",
};

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
  const cls = cn(base, variants[variant], variant === "tertiary" || variant === "quiet" ? "" : sizes[size], full && "w-full", className);
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
      className={cn(base, variants[variant], variant === "tertiary" || variant === "quiet" ? "" : sizes[size], full && "w-full", className)}
      aria-busy={busy || undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Primary + Secondary at most, stacked full-width on mobile. */
export function CtaRow({ children, className, align = "left" }: { children: ReactNode; className?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-center md:gap-4 [&>*]:w-full md:[&>*]:w-auto", align === "center" && "md:justify-center", className)}>
      {children}
    </div>
  );
}
