"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

/**
 * Client shell for the header: scroll state, the Platform mega menu on ≥1024,
 * and the full-screen mobile sheet. Solid ink surface, no blur. All content
 * is server-rendered and passed in; this component only manages open state.
 */
export function HeaderShell({
  logo,
  platformLabel,
  platformMenu,
  nav,
  utilities,
  login,
  primary,
  labels,
}: {
  logo: ReactNode;
  platformLabel: string;
  platformMenu: ReactNode;
  nav: { href: string; label: string }[];
  utilities: ReactNode;
  login: { href: string; label: string };
  primary: { href: string; label: string };
  labels: { menu: string; close: string };
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const menuId = useId();
  const sheetId = useId();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  return (
    // One header on every page: a solid mineral-black band with a hairline, identical over
    // dark and ivory openings. It never goes transparent, so it can never disappear into a canvas.
    <header className="fixed inset-x-0 top-0 z-[100] h-[var(--header-h)] bg-ink-950 border-b border-line-hairline">
      <div className="container-wide flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          {logo}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-7">
            <div ref={menuRef} className="relative">
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((v) => !v)}
                className={cn("inline-flex h-10 items-center gap-1.5 t-body-s text-text-primary hover:text-champagne-400 transition-colors duration-micro", menuOpen && "text-champagne-400")}
              >
                {platformLabel}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={cn("transition-transform duration-control", menuOpen && "rotate-180")}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={menuId}
                hidden={!menuOpen}
                className="absolute left-0 top-[calc(100%+12px)] w-[min(880px,calc(100vw-2*var(--gutter)))] rounded-md border border-line-strong bg-ink-900 p-8 shadow-overlay"
              >
                {platformMenu}
              </div>
            </div>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined} className="inline-flex min-h-[44px] items-center t-body-s text-text-primary hover:text-champagne-400 transition-colors duration-micro">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden xl:flex items-center gap-5">
          {utilities}
          <Link href={login.href} className="inline-flex min-h-[44px] items-center t-body-s text-text-primary hover:text-champagne-400 transition-colors duration-micro">
            {login.label}
          </Link>
          <ButtonLink href={primary.href} size="sm">
            {primary.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line-interactive text-text-primary"
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          aria-label={sheetOpen ? labels.close : labels.menu}
          onClick={() => setSheetOpen((v) => !v)}
        >
          {sheetOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>

      {/* Mobile sheet: primary CTA first, then Platform expanded, then the rest, language at the bottom. */}
      <div
        id={sheetId}
        hidden={!sheetOpen}
        className="xl:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 z-[90] overflow-y-auto bg-ink-950 border-t border-line-hairline"
      >
        <div className="container-default flex min-h-full flex-col gap-8 py-6">
          <div className="flex flex-col gap-3">
            <ButtonLink href={primary.href} size="lg" full>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={login.href} variant="secondary" size="md" full>
              {login.label}
            </ButtonLink>
          </div>
          <div>
            <p className="t-eyebrow text-text-accent mb-4">{platformLabel}</p>
            {platformMenu}
          </div>
          <ul className="hairline-list border-t border-line-hairline">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="flex h-14 items-center t-heading-s text-text-primary">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4">{utilities}</div>
        </div>
      </div>
    </header>
  );
}
