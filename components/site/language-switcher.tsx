"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/**
 * Segmented control. Slugs are identical in both locales, so the switch maps
 * the current path one to one. Legal routes share slugs as well.
 */
export function LanguageSwitcher({ locale, labels, className }: { locale: Locale; labels: { en: string; es: string; group: string }; className?: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  const to = (l: Locale) => `/${l}${rest}`;

  return (
    <div role="group" aria-label={labels.group} className={cn("inline-flex h-10 items-center rounded-pill border border-line-hairline p-0.5", className)}>
      {(["en", "es"] as Locale[]).map((l) => (
        <Link
          key={l}
          href={to(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "inline-flex h-full items-center rounded-pill px-3 t-caption uppercase tracking-[0.08em] transition-colors duration-micro",
            l === locale ? "bg-surface-raised text-text-primary" : "text-text-muted hover:text-text-primary",
          )}
        >
          {l === "en" ? "EN" : "ES"}
          <span className="sr-only">{l === "en" ? labels.en : labels.es}</span>
        </Link>
      ))}
    </div>
  );
}
