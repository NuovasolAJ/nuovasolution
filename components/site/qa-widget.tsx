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
 * Accept then poll (WEBSITE_QA_RESPONSE_CONTRACT_v1): a question is accepted, then its result
 * is read until answered, handoff, failed, unknown or the time limit. Every non-answer renders
 * an honest line and a human contact path. Strings: PRODUCT_TEXTS_C2_v1 §5.
 */
function useQa(locale: Locale) {
  const d = getDictionary(locale).qa;
  const [q, setQ] = useState("");
  const [contact, setContact] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const alive = useRef(true);
  useEffect(() => () => void (alive.current = false), []);

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

  async function send(text?: string) {
    const question = (text ?? q).trim();
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

  return { d, q, setQ, contact, setContact, turns, busy, slow, error, send };
}

/**
 * The Q&A window itself: a clear heading, short helps, suggested questions, and every real
 * state (reading, still working, answered, a person will answer, could not send, cannot
 * confirm). Used fixed (launcher) and inline (embedded in a page section).
 */
export function QaPanel({ locale, inline = false, onClose, closeLabel }: { locale: Locale; inline?: boolean; onClose?: () => void; closeLabel?: string }) {
  const { d, q, setQ, contact, setContact, turns, busy, slow, error, send } = useQa(locale);
  const panelId = useId();
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [turns, busy, slow]);

  useEffect(() => {
    if (!inline) inputRef.current?.focus();
  }, [inline]);

  return (
    <div
      role={inline ? undefined : "dialog"}
      aria-modal={inline ? undefined : "false"}
      aria-label={inline ? undefined : d.title}
      data-qa-panel={inline ? "inline" : "fixed"}
      className={cn("flex flex-col overflow-hidden rounded-xl border border-line-hairline bg-surface-raised", inline ? "shadow-card" : "shadow-overlay")}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line-hairline px-5 py-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-ink-950 t-caption font-semibold text-ivory">N</span>
          <div>
            <p className="t-heading-s text-text-primary">{d.title}</p>
            <p className="mt-0.5 t-caption text-text-muted">{d.intro}</p>
          </div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} aria-label={closeLabel ?? d.close} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-text-secondary hover:bg-surface-sunken hover:text-text-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        )}
      </div>

      <div ref={logRef} role="log" aria-live="polite" className={cn("flex-1 space-y-4 overflow-y-auto px-5 py-4", inline ? "min-h-[240px] max-h-[440px]" : "min-h-[180px]")}>
        {turns.length === 0 && !busy && (
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-sunken px-4 py-3 t-body-s text-text-secondary">
              <p>{d.boundaries}</p>
              <p className="mt-2 t-caption text-text-muted">{d.ai}</p>
            </div>
            <div>
              <p className="t-caption text-text-muted">{d.suggestionsLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {d.suggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => void send(s)} className="inline-flex min-h-[40px] items-center rounded-pill border border-line-strong bg-surface-raised px-3.5 py-1.5 t-body-s text-text-primary transition-colors duration-micro hover:bg-surface-sunken">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {turns.map((t, i) => (
          <div key={i} className={cn("flex", t.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[88%] rounded-lg px-3.5 py-2.5 t-body-s", t.role === "user" ? "rounded-br-sm bg-ink-950 text-ivory" : "rounded-bl-sm bg-surface-sunken text-text-primary")}>
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
          </div>
        ))}
        {busy && (
          <p className="typing inline-flex items-center gap-1 rounded-lg bg-surface-sunken px-3.5 py-2.5 t-caption text-text-muted" aria-label={slow ? d.slow : d.thinking}>
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
          className="block w-full resize-none rounded-md border border-line-strong bg-surface-raised px-3.5 py-2.5 t-body-s text-text-primary placeholder:text-text-muted"
        />
        <label htmlFor={`${panelId}-c`} className="block t-caption text-text-muted">{d.contactOptional}</label>
        <input
          id={`${panelId}-c`}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={200}
          autoComplete="email"
          className="h-11 w-full rounded-md border border-line-strong bg-surface-raised px-3.5 t-body-s text-text-primary"
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
  );
}

/** Optional launcher, bottom right. Never auto-opens, never dominates the page. */
export function QaWidget({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).qa;
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    // Return focus to the control that opened the panel (review WR-17).
    requestAnimationFrame(() => launcherRef.current?.focus());
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        data-qa-launcher
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-[80] inline-flex h-12 items-center gap-2 rounded-pill bg-ink-950 px-4 t-body-s text-ivory shadow-soft transition-colors duration-micro hover:bg-ink-800",
          open && "hidden",
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 4h10v7H7l-3 2.5V11H3V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        {d.open}
      </button>

      {open && (
        <div className="fixed bottom-5 right-5 z-[80] w-[min(400px,calc(100vw-2.5rem))] max-h-[min(680px,calc(100dvh-2.5rem))] [&>div]:max-h-[min(680px,calc(100dvh-2.5rem))]">
          <QaPanel locale={locale} onClose={close} closeLabel={d.close} />
        </div>
      )}
    </>
  );
}
