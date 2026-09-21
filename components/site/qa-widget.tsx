"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button, ButtonLink } from "@/components/ui/button";

type Turn = { role: "user" | "nuova"; text: string; human?: boolean };
type Outcome = { status: "answered" | "pending" | "handoff" | "failed" | "unknown" | "cannot_confirm"; text?: string; retry_after_ms?: number; message_id?: string };

const POLL_LIMIT_MS = 60_000; // WEBSITE_QA_RESPONSE_CONTRACT_v1: max 60 s total on the website side
const SLOW_AFTER_MS = 10_000;

/**
 * Optional launcher. Never auto-opens, never dominates the page.
 * Accept then poll (WEBSITE_QA_RESPONSE_CONTRACT_v1): a question is accepted, then
 * its result is read until answered, handoff, failed, unknown or the time limit.
 * Every non-answer renders an honest line and a human contact path. Strings:
 * PRODUCT_TEXTS_C2_v1 §5. A WhatsApp path appears only with a configured number.
 */
export function QaWidget({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).qa;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [contact, setContact] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelId = useId();
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const alive = useRef(true);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => () => void (alive.current = false), []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [turns, busy, slow]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    // Return focus to the control that opened the panel (review WR-17).
    requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function finish(o: Outcome) {
    if (o.status === "answered" && o.text) setTurns((t) => [...t, { role: "nuova", text: o.text! }]);
    else if (o.status === "handoff") setTurns((t) => [...t, { role: "nuova", text: d.handoff, human: true }]);
    else if (o.status === "failed") setTurns((t) => [...t, { role: "nuova", text: d.failed, human: true }]);
    else setTurns((t) => [...t, { role: "nuova", text: d.cannotConfirm, human: true }]);
  }

  async function poll(messageId: string, firstWait: number) {
    const started = Date.now();
    let wait = firstWait;
    while (alive.current && Date.now() - started < POLL_LIMIT_MS) {
      await new Promise((r) => setTimeout(r, wait));
      if (Date.now() - started > SLOW_AFTER_MS) setSlow(true);
      let o: Outcome;
      try {
        const res = await fetch(`/api/qa/result?message_id=${encodeURIComponent(messageId)}`, { cache: "no-store" });
        const json = (await res.json()) as { ok: boolean; details?: Outcome };
        o = json.ok && json.details ? json.details : { status: "cannot_confirm" };
      } catch {
        o = { status: "cannot_confirm" };
      }
      if (o.status !== "pending") return finish(o);
      wait = o.retry_after_ms ?? 1500;
    }
    finish({ status: "cannot_confirm" });
  }

  async function send() {
    const question = q.trim();
    if (!question || busy) return;
    if (question.length > 4000) {
      setError(d.tooLong);
      return;
    }
    setError(null);
    setTurns((t) => [...t, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    setSlow(false);
    try {
      const res = await fetch("/api/qa", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, locale, contact }) });
      const json = (await res.json()) as { ok: boolean; code: string; details?: Outcome };
      if (!json.ok) {
        setError(json.code === "rate_limited" ? d.rateLimited : json.code === "too_long" ? d.tooLong : d.error);
        return;
      }
      const o = json.details ?? { status: "cannot_confirm" };
      if (o.status === "pending" && o.message_id) await poll(o.message_id, o.retry_after_ms ?? 1500);
      else finish(o);
    } catch {
      finish({ status: "cannot_confirm" });
    } finally {
      setBusy(false);
      setSlow(false);
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        data-qa-launcher
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
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
          className="fixed bottom-5 right-5 z-[80] flex w-[min(400px,calc(100vw-2.5rem))] max-h-[min(680px,calc(100dvh-2.5rem))] flex-col rounded-md border border-line-strong bg-ink-900 shadow-overlay"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line-hairline p-5">
            <div>
              <p className="t-heading-s text-text-primary">{d.title}</p>
              <p className="mt-1 t-caption text-text-muted">{d.intro}</p>
            </div>
            <button type="button" onClick={close} aria-label={d.close} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line-hairline text-text-secondary hover:text-text-primary">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div ref={logRef} role="log" aria-live="polite" className="min-h-[160px] flex-1 space-y-4 overflow-y-auto p-5">
            {turns.length === 0 && !busy && (
              <div className="space-y-2 t-caption text-text-muted">
                <p>{d.boundaries}</p>
                <p>{d.ai}</p>
              </div>
            )}
            {turns.map((t, i) => (
              <div key={i} className={cn("max-w-[90%] t-body-s", t.role === "user" ? "ml-auto rounded-sm bg-ink-800 px-3 py-2 text-text-primary" : "text-text-secondary")}>
                <p className="whitespace-pre-line">{t.text}</p>
                {t.human && (
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
              <p className="typing t-caption text-text-muted" aria-label={slow ? d.slow : d.thinking}>
                {slow ? d.slow : d.thinking} <i>·</i><i>·</i><i>·</i>
              </p>
            )}
          </div>

          <form
            className="space-y-2 border-t border-line-hairline p-4"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label htmlFor={`${panelId}-q`} className="sr-only">{d.placeholder}</label>
            <textarea
              ref={inputRef}
              id={`${panelId}-q`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={d.placeholder}
              maxLength={4000}
              rows={2}
              className="block w-full resize-none rounded-sm border border-line-interactive bg-ink-850 px-3 py-2 t-body-s text-text-primary placeholder:text-text-muted"
            />
            <label htmlFor={`${panelId}-c`} className="block t-caption text-text-muted">{d.contactOptional}</label>
            <input
              id={`${panelId}-c`}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              maxLength={200}
              autoComplete="email"
              className="h-11 w-full rounded-sm border border-line-interactive bg-ink-850 px-3 t-body-s text-text-primary"
            />
            <div className="flex items-start justify-between gap-3">
              <p className="t-caption text-text-muted">
                {d.disclosure.replace(/ ?(Read the privacy notice|Lee el aviso de privacidad)\.$/, "")}{" "}
                <Link href={localePath(locale, "/legal/privacy")} className="underline underline-offset-4">{locale === "es" ? "Aviso de privacidad" : "Privacy notice"}</Link>
              </p>
              <Button type="submit" size="sm" busy={busy} disabled={busy || !q.trim()}>
                {busy ? d.sending : d.send}
              </Button>
            </div>
            {error && <p role="alert" className="t-caption text-signal-critical">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
}
