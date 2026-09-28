"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";

/** Query parameters that survive a language switch (audit Z18). Nothing else is carried over. */
const KEEP = ["confirmed", "plan", "ref"];

/**
 * Segmented control. Slugs are identical in both locales, so the switch maps the current path
 * one to one. Legal routes share slugs as well. Harmless query parameters (a confirmed
 * sign-up, a plan interest, a referrer) and the anchor stay on the URL, so switching the
 * language on the login page after e-mail confirmation keeps the confirmation hint.
 */
export function LanguageSwitcher({ locale, labels, className }: { locale: Locale; labels: { en: string; es: string; group: string }; className?: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    const read = () => {
      const src = new URLSearchParams(window.location.search);
      const out = new URLSearchParams();
      for (const k of KEEP) {
        const v = src.get(k);
        if (v !== null && v.length <= 64) out.set(k, v);
      }
      const q = out.toString();
      const hash = /^#[A-Za-z0-9_.~-]{1,64}$/.test(window.location.hash) ? window.location.hash : "";
      setSuffix(`${q ? `?${q}` : ""}${hash}`);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [pathname]);

  const to = (l: Locale) => `/${l}${rest}${suffix}`;

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
