"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Client shell for the header: scroll state, the Platform menu on ≥1280 and the full-screen
 * mobile sheet. Light, translucent surface with a hairline once the page has scrolled. All
 * content is server-rendered and passed in; this component only manages open state.
 *
 * Keyboard (audit Z20): Escape closes the menu and the sheet; while the sheet is open, focus
 * stays inside it (Tab cycles), the rest of the page is inert, and on close focus returns to
 * the button that opened it. The route change closes both.
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
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

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

  // Sheet open: lock the page, make everything outside the header and the sheet inert, move
  // focus in, keep it in, and give it back on close.
  useEffect(() => {
    document.documentElement.style.overflow = sheetOpen ? "hidden" : "";
    const outside = Array.from(document.querySelectorAll<HTMLElement>("main, footer, [data-qa-launcher], [data-qa-fixed], [data-env-marker]"));
    for (const el of outside) {
      if (sheetOpen) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    }
    if (!sheetOpen) {
      document.documentElement.style.overflow = "";
      return;
    }
    const sheet = sheetRef.current;
    const first = sheet?.querySelector<HTMLElement>(FOCUSABLE);
    requestAnimationFrame(() => first?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSheetOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }
      if (e.key !== "Tab" || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      const toggle = toggleRef.current;
      const ring = toggle ? [toggle, ...items] : items;
      if (ring.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      const idx = active ? ring.indexOf(active) : -1;
      if (e.shiftKey && (idx <= 0 || idx === -1)) {
        e.preventDefault();
        ring[ring.length - 1].focus();
      } else if (!e.shiftKey && (idx === ring.length - 1 || idx === -1)) {
        e.preventDefault();
        ring[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      for (const el of outside) el.removeAttribute("inert");
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
      document.removeEventListener("focusin", onFocus);
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
                  ref={menuButtonRef}
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
                  className="absolute inset-x-[var(--gutter)] top-[calc(100%-6px)] mx-auto w-auto max-w-[960px] rounded-xl border border-line-hairline bg-surface-raised p-6 shadow-overlay 2xl:p-8"
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
            ref={toggleRef}
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
        ref={sheetRef}
        hidden={!sheetOpen}
        data-mobile-sheet
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
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
