"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { qaSurface } from "@/lib/contracts/surface";
import { Button, ButtonLink } from "@/components/ui/button";
import { LabelChip } from "@/components/ui/status";

type Turn = { role: "user" | "nuova"; text: string; human?: boolean };
type Outcome = { status: "answered" | "pending" | "handoff" | "failed" | "unknown" | "cannot_confirm"; text?: string; retry_after_ms?: number; message_id?: string };

/** WEBSITE_QA_RESPONSE_CONTRACT_v1: at most 60 s on the website side, counted from the send, requests included (audit Z10). */
const BUDGET_MS = 60_000;
const SLOW_AFTER_MS = 10_000;

/**
 * One conversation per visitor, shared by the inline window and the floating one (audit Z10):
 * a small external store instead of per-panel state. The running request is held here too, so
 * closing the floating window or leaving the page aborts it.
 */
type State = { turns: Turn[]; busy: boolean; slow: boolean; error: string | null; received: boolean };
let state: State = { turns: [], busy: false, slow: false, error: null, received: false };
const listeners = new Set<() => void>();
let controller: AbortController | null = null;
let budgetTimer: ReturnType<typeof setTimeout> | null = null;
let mounted = 0;

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function useQaState(): State {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

/** Abort the running request, if any. Called on close and when the last panel unmounts. */
export function cancelQa() {
  controller?.abort();
  controller = null;
  if (budgetTimer) clearTimeout(budgetTimer);
  budgetTimer = null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
/** Empty, an email address or a phone number (audit Z10). Anything else is refused before sending. */
export function contactValid(v: string): boolean {
  const c = v.trim();
  return c === "" || EMAIL_RE.test(c) || PHONE_RE.test(c);
}

async function send(locale: Locale, question: string, contact: string) {
  const d = getDictionary(locale).qa;
  const q = question.trim();
  if (!q || state.busy) return;
  if (q.length > 4000) return set({ error: d.tooLong });
  if (!contactValid(contact)) return set({ error: d.contactInvalid });

  cancelQa();
  const ac = new AbortController();
  controller = ac;
  const started = Date.now();
  budgetTimer = setTimeout(() => ac.abort(), BUDGET_MS);
  set({ error: null, busy: true, slow: false, turns: [...state.turns, { role: "user", text: q }] });

  const finish = (o: Outcome) => {
    if (controller !== ac) return; // superseded or cancelled
    const t = state.turns;
    if (o.status === "answered" && o.text) set({ turns: [...t, { role: "nuova", text: o.text }] });
    else if (o.status === "handoff") set({ turns: [...t, { role: "nuova", text: d.handoff, human: true }] });
    else if (o.status === "failed") set({ turns: [...t, { role: "nuova", text: d.failed, human: true }] });
    else set({ turns: [...t, { role: "nuova", text: d.cannotConfirm, human: true }] });
  };

  try {
    const res = await fetch("/api/qa", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q, locale, contact: contact.trim() }), signal: ac.signal });
    const json = (await res.json()) as { ok: boolean; code: string; message?: string; details?: Outcome };
    if (!json.ok) {
      set({ error: json.code === "rate_limited" ? d.rateLimited : json.code === "too_long" ? d.tooLong : d.error });
      return;
    }
    const o = json.details ?? { status: "cannot_confirm" };
    // The storage sentence is shown only once a real intake accepted the question (audit Z10).
    if (json.message !== "not_configured" && (o.status === "pending" || o.status === "answered" || o.status === "handoff")) set({ received: true });
    if (o.status === "pending" && o.message_id) {
      let wait = o.retry_after_ms ?? 1500;
      while (Date.now() - started + wait < BUDGET_MS && !ac.signal.aborted) {
        await new Promise((r) => setTimeout(r, wait));
        if (ac.signal.aborted) return;
        if (Date.now() - started > SLOW_AFTER_MS) set({ slow: true });
        let r: Outcome;
        try {
          const rr = await fetch(`/api/qa/result?message_id=${encodeURIComponent(o.message_id)}`, { cache: "no-store", signal: ac.signal });
          const rj = (await rr.json()) as { ok: boolean; details?: Outcome };
          r = rj.ok && rj.details ? rj.details : { status: "cannot_confirm" };
        } catch {
          if (ac.signal.aborted) return;
          r = { status: "cannot_confirm" };
        }
        if (r.status !== "pending") return finish(r);
        wait = r.retry_after_ms ?? 1500;
      }
      if (!ac.signal.aborted) finish({ status: "cannot_confirm" });
    } else {
      finish(o);
    }
  } catch {
    if (!ac.signal.aborted) finish({ status: "cannot_confirm" });
  } finally {
    if (controller === ac) {
      controller = null;
      if (budgetTimer) clearTimeout(budgetTimer);
      budgetTimer = null;
      set({ busy: false, slow: false });
    }
  }
}

/**
 * The Q&A window itself: a clear heading, short helps, suggested questions, and every real
 * state (reading, still working, answered, a person will answer, could not send, cannot
 * confirm). Used fixed (launcher) and inline (embedded in a page section); both show the same
 * conversation. In a review preview it carries a visible Demo label (audit R25).
 */
export function QaPanel({ locale, inline = false, onClose, closeLabel }: { locale: Locale; inline?: boolean; onClose?: () => void; closeLabel?: string }) {
  const d = getDictionary(locale).qa;
  const s = useQaState();
  const [q, setQ] = useState("");
  const [contact, setContact] = useState("");
  const panelId = useId();
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const surface = qaSurface();

  useEffect(() => {
    mounted += 1;
    return () => {
      mounted -= 1;
      if (mounted === 0) cancelQa();
    };
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [s.turns, s.busy, s.slow]);

  useEffect(() => {
    if (!inline) inputRef.current?.focus();
  }, [inline]);

  if (surface === "hidden") return null;

  const submit = (text?: string) => {
    const question = text ?? q;
    if (!question.trim()) return;
    setQ("");
    void send(locale, question, contact);
  };

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
            <p className="flex flex-wrap items-center gap-2 t-heading-s text-text-primary">
              {d.title}
              {surface === "demo" && <LabelChip tone="attention">{d.demo}</LabelChip>}
            </p>
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
        {s.turns.length === 0 && !s.busy && (
          <div className="space-y-4">
            <div className="rounded-lg bg-surface-sunken px-4 py-3 t-body-s text-text-secondary">
              <p>{d.boundaries}</p>
              <p className="mt-2 t-caption text-text-muted">{d.ai}</p>
              {surface === "demo" && <p className="mt-2 t-caption text-signal-attention">{d.demoNote}</p>}
            </div>
            <div>
              <p className="t-caption text-text-muted">{d.suggestionsLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {d.suggestions.map((sg) => (
                  <li key={sg}>
                    <button type="button" onClick={() => submit(sg)} className="inline-flex min-h-[40px] items-center rounded-pill border border-line-strong bg-surface-raised px-3.5 py-1.5 t-body-s text-text-primary transition-colors duration-micro hover:bg-surface-sunken">
                      {sg}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {s.turns.map((t, i) => (
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
        {s.busy && (
          <p className="typing inline-flex items-center gap-1 rounded-lg bg-surface-sunken px-3.5 py-2.5 t-caption text-text-muted" aria-label={s.slow ? d.slow : d.thinking}>
            {s.slow ? d.slow : d.thinking} <i>·</i><i>·</i><i>·</i>
          </p>
        )}
        {s.received && <p className="t-caption text-text-muted">{d.received}</p>}
      </div>

      <form
        className="space-y-2 border-t border-line-hairline p-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
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
              submit();
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
          inputMode="email"
          autoComplete="email"
          aria-invalid={contactValid(contact) ? undefined : true}
          className={cn("h-11 w-full rounded-md border bg-surface-raised px-3.5 t-body-s text-text-primary", contactValid(contact) ? "border-line-strong" : "border-signal-critical")}
        />
        <div className="flex items-start justify-between gap-3">
          <p className="t-caption text-text-muted">
            <Link href={localePath(locale, "/legal/privacy")} className="underline underline-offset-4">{locale === "es" ? "Aviso de privacidad" : "Privacy notice"}</Link>
          </p>
          <Button type="submit" size="sm" busy={s.busy} disabled={s.busy || !q.trim() || !contactValid(contact)}>
            {s.busy ? d.sending : d.send}
          </Button>
        </div>
        {s.error && <p role="alert" className="t-caption text-signal-critical">{s.error}</p>}
      </form>
    </div>
  );
}

/** Optional launcher, bottom right. Never auto-opens, never dominates the page. Hidden entirely when the surface is hidden. */
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

  if (qaSurface() === "hidden") return null;

  function close() {
    setOpen(false);
    cancelQa();
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
        <div data-qa-fixed className="fixed bottom-5 right-5 z-[80] w-[min(400px,calc(100vw-2.5rem))] max-h-[min(680px,calc(100dvh-2.5rem))] [&>div]:max-h-[min(680px,calc(100dvh-2.5rem))]">
          <QaPanel locale={locale} onClose={close} closeLabel={d.close} />
        </div>
      )}
    </>
  );
}
