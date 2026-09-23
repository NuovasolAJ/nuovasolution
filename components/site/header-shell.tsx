"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

/**
 * Client shell for the header: scroll state, the Platform menu on ≥1024 and the
 * full-screen mobile sheet. Light, translucent surface with a hairline once the page
 * has scrolled. All content is server-rendered and passed in; this component only
 * manages open state. Escape and an outside click close the menu; the route change closes both.
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
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const sheetId = useId();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const linkCls = "inline-flex min-h-[44px] items-center rounded-pill px-3.5 t-body-s text-text-secondary transition-colors duration-micro hover:bg-surface-sunken hover:text-text-primary";

  return (
    <>
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] h-[var(--header-h)] bg-[color:rgba(251,250,247,0.86)] backdrop-blur-md transition-[box-shadow,border-color] duration-control",
        scrolled || menuOpen || sheetOpen ? "border-b border-line-hairline" : "border-b border-transparent",
      )}
    >
      <div className="container-wide relative flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          {logo}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
            {/* The menu panel is positioned against the header container (not the button), so it never leaves the viewport. */}
            <div ref={menuRef} className="static">
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((v) => !v)}
                className={cn(linkCls, "gap-1.5", menuOpen && "bg-surface-sunken text-text-primary")}
              >
                {platformLabel}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={cn("transition-transform duration-control", menuOpen && "rotate-180")}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={menuId}
                hidden={!menuOpen}
                data-platform-menu
                className="absolute inset-x-[var(--gutter)] top-[calc(100%-6px)] mx-auto w-auto max-w-[1040px] rounded-xl border border-line-hairline bg-surface-raised p-6 shadow-overlay 2xl:p-8"
              >
                {platformMenu}
              </div>
            </div>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined} className={cn(linkCls, pathname === n.href && "text-text-primary")}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden xl:flex items-center gap-3">
          {utilities}
          <Link href={login.href} className={linkCls}>
            {login.label}
          </Link>
          <ButtonLink href={primary.href} size="sm">
            {primary.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line-strong bg-surface-raised text-text-primary"
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

    </header>
      {/* Mobile sheet: a sibling of the header (its backdrop blur would otherwise become the containing
          block of a fixed child). Primary CTA first, then Platform expanded, then the rest, language at the bottom. */}
      <div
        id={sheetId}
        hidden={!sheetOpen}
        data-mobile-sheet
        className="xl:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 z-[90] overflow-y-auto bg-surface-canvas border-t border-line-hairline"
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
            <p className="t-eyebrow text-text-muted mb-4">{platformLabel}</p>
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
    </>
  );
}
