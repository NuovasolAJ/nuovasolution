import "server-only";
import { redirect } from "next/navigation";
import { localePath, type Locale } from "@/lib/i18n/config";
import { hasSession } from "./server";

/**
 * The one rule of every authenticated page (AUTHENTICATED_SURFACE_SYSTEM §5.4): without a session, go to the
 * login and remember where we were, so the login brings the person back to the surface they wanted, not to the
 * wizard. `path` is the page's own locale-free path ("/app/reports"); the login accepts only same-origin
 * locale paths (lib/contracts/bff.ts safeNextPath), so nothing else can be smuggled in.
 */
export function loginHref(locale: Locale, path: string, extra?: Record<string, string>): string {
  const q = new URLSearchParams({ next: localePath(locale, path), ...(extra ?? {}) });
  return `${localePath(locale, "/login")}?${q.toString()}`;
}

export function requireSession(locale: Locale, path: string): void {
  if (!hasSession()) redirect(loginHref(locale, path));
}
