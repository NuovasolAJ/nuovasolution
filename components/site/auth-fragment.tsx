"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Invite, recovery and sign-up confirmation e-mails return with the session in the URL fragment:
 * `#access_token=…&type=invite|recovery|signup`, or `#error=…&error_code=otp_expired` when the link is spent.
 * The fragment is removed from the address bar immediately (so it never lands in history, a
 * screenshot or a shared link), and the token is handed to the BFF once, which verifies it
 * server-side. Nothing here trusts the fragment for anything else.
 */
export function AuthFragment({ locale }: { locale: Locale }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || (!hash.includes("access_token=") && !hash.includes("error_code="))) return;
    const p = new URLSearchParams(hash.slice(1));
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    const go = (path: string) => window.location.replace(`/${locale}/${path}`);
    const token = p.get("access_token");
    const type = p.get("type");
    // A spent or expired confirmation link: the address may well be confirmed already (the
    // first click did that), so the welcome page points to the login, which continues from there.
    if (!token || (type !== "invite" && type !== "recovery" && type !== "signup")) return go("welcome?state=expired");
    fetch("/api/bff/auth/invite", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_token: token, type }) })
      .then((r) => r.json())
      .then((j: { ok?: boolean; details?: { next?: string } }) => go(j.ok ? (j.details?.next === "onboarding" ? "onboarding" : "welcome") : "welcome?state=expired"))
      .catch(() => go("welcome?state=expired"));
  }, [locale]);
  return null;
}
