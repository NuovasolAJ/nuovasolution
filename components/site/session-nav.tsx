"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * The account corner of the header (audit order 2026-10-08b, points 2 and 3): the public pages are static, so
 * the header cannot read the session cookie while rendering. This client component asks the server once per
 * page whether a session exists and swaps "Log in · Try free" for "My agency · Log out". Until the answer
 * arrives the public pair is shown, so nothing jumps for a visitor without a session.
 *
 * Log out posts to /api/bff/auth/logout (which revokes the token and clears every cookie) and then loads the
 * public root with ?signedout=1, where a status line confirms it (AUTHENTICATED_SURFACE_SYSTEM §5.3).
 */
type Session = { signedIn: boolean; name?: string | null };
let shared: Promise<Session> | null = null;
function readSession(): Promise<Session> {
  if (!shared) {
    shared = fetch("/api/bff/auth/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { ok?: boolean; details?: Session }) => (j.ok && j.details ? j.details : { signedIn: false }))
      .catch(() => ({ signedIn: false }));
  }
  return shared;
}

export function SessionNav({ variant, login, primary, account, logout, home, linkCls }: { variant: "bar" | "sheet"; login: { href: string; label: string }; primary: { href: string; label: string }; account: { href: string; label: string }; logout: { label: string; busy: string }; home: string; linkCls?: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let on = true;
    void readSession().then((s) => { if (on) setSession(s); });
    return () => { on = false; };
  }, []);

  async function signOut() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch("/api/bff/auth/logout", { method: "POST" });
    } catch {
      /* the cookies are cleared server side; the root reloads either way */
    }
    shared = null;
    window.location.assign(`${home}?signedout=1`);
  }

  const signedIn = session?.signedIn === true;
  if (variant === "sheet") {
    return (
      <div className="flex flex-col gap-3" data-session-nav={signedIn ? "in" : "out"}>
        {signedIn ? (
          <>
            <ButtonLink href={account.href} size="lg" full>{account.label}</ButtonLink>
            <Button type="button" variant="secondary" size="md" full onClick={() => void signOut()} busy={busy} disabled={busy} data-logout>{busy ? logout.busy : logout.label}</Button>
          </>
        ) : (
          <>
            <ButtonLink href={primary.href} size="lg" full>{primary.label}</ButtonLink>
            <ButtonLink href={login.href} variant="secondary" size="md" full>{login.label}</ButtonLink>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="contents" data-session-nav={signedIn ? "in" : "out"}>
      {signedIn ? (
        <>
          <Link href={account.href} className={cn(linkCls)} data-account-link>{account.label}</Link>
          <Button type="button" size="sm" variant="secondary" onClick={() => void signOut()} busy={busy} disabled={busy} data-logout>{busy ? logout.busy : logout.label}</Button>
        </>
      ) : (
        <>
          <Link href={login.href} className={cn(linkCls)}>{login.label}</Link>
          <ButtonLink href={primary.href} size="sm" className="header-cta">{primary.label}</ButtonLink>
        </>
      )}
    </div>
  );
}
