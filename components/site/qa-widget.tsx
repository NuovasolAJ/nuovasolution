"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button, ButtonLink } from "@/components/ui/button";

type Turn = { role: "user" | "nuova"; text: string; cannotConfirm?: boolean };

/**
 * Optional launcher, never auto-opens, never dominates the page. Every failure
 * renders the honest "cannot confirm" state with a human contact path and,
 * when a number is configured, a WhatsApp path.
 */
export function QaWidget({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).qa;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelId = useId();
  const logRef = useRef<HTMLDivElement | null>(null);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [turns, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    const question = q.trim();
    if (question.length < 3 || busy) return;
    if (question.length > 500) {
      setError(d.tooLong);
      return;
    }
    setError(null);
    setTurns((t) => [...t, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch("/api/qa", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, locale }) });
      const json = (await res.json()) as { ok: boolean; code: string; details?: { answer?: string; can_confirm?: boolean } };
      if (json.ok && json.details?.answer) {
        setTurns((t) => [...t, { role: "nuova", text: json.details!.answer!, cannotConfirm: json.details!.can_confirm === false }]);
      } else if (json.code === "too_long") {
        setError(d.tooLong);
      } else if (json.code === "rate_limited" || json.code === "invalid_input") {
        setError(d.error);
      } else {
        setTurns((t) => [...t, { role: "nuova", text: d.cannotConfirm, cannotConfirm: true }]);
      }
    } catch {
      setTurns((t) => [...t, { role: "nuova", text: d.cannotConfirm, cannotConfirm: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-5 z-[80] inline-flex h-12 items-center gap-2 rounded-sm border border-line-interactive bg-ink-900 px-4 t-body-s text-text-primary shadow-overlay transition-colors duration-micro hover:bg-ink-800",
          open && "hidden",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 4h10v7H7l-3 2.5V11H3V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        {d.open}
      </button>

      {open && (
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label={d.title}
        className="fixed bottom-5 right-5 z-[80] flex w-[min(400px,calc(100vw-2.5rem))] max-h-[min(640px,calc(100dvh-2.5rem))] flex-col rounded-md border border-line-strong bg-ink-900 shadow-overlay"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line-hairline p-5">
          <div>
            <p className="t-heading-s text-text-primary">{d.title}</p>
            <p className="mt-1 t-caption text-text-muted">{d.intro}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label={d.close} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line-hairline text-text-secondary hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div ref={logRef} role="log" aria-live="polite" className="min-h-[160px] flex-1 space-y-4 overflow-y-auto p-5">
          {turns.length === 0 && !busy && <p className="t-caption text-text-muted">{d.disclosure}</p>}
          {turns.map((t, i) => (
            <div key={i} className={cn("max-w-[90%] t-body-s", t.role === "user" ? "ml-auto rounded-sm bg-ink-800 px-3 py-2 text-text-primary" : "text-text-secondary")}>
              <p>{t.text}</p>
              {t.cannotConfirm && (
                <div className="mt-3 flex flex-col gap-2">
                  <ButtonLink href={localePath(locale, "/contact")} variant="secondary" size="sm">{d.humanCta}</ButtonLink>
                  {whatsapp && (
                    <ButtonLink href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`} variant="secondary" size="sm" external>
                      {d.whatsappCta}
                    </ButtonLink>
                  )}
                </div>
              )}
            </div>
          ))}
          {busy && (
            <p className="typing t-caption text-text-muted" aria-label={d.thinking}>
              {d.thinking} <i>·</i><i>·</i><i>·</i>
            </p>
          )}
        </div>

        <form
          className="border-t border-line-hairline p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <label htmlFor={`${panelId}-q`} className="sr-only">{d.placeholder}</label>
          <div className="flex gap-2">
            <input
              id={`${panelId}-q`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={d.placeholder}
              maxLength={500}
              className="h-11 min-w-0 flex-1 rounded-sm border border-line-interactive bg-ink-850 px-3 t-body-s text-text-primary placeholder:text-text-muted"
            />
            <Button type="submit" size="sm" busy={busy} disabled={busy || q.trim().length < 3}>
              {busy ? d.sending : d.send}
            </Button>
          </div>
          {error && <p role="alert" className="mt-2 t-caption text-signal-critical">{error}</p>}
        </form>
      </div>
      )}
    </>
  );
}
