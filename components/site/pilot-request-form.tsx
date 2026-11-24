"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { pilotRequest, type PilotInterest } from "@/lib/content/pilot-request";
import { cn } from "@/lib/utils";

/**
 * The request form (the owner's order of 16.11.2026, point 1; the brief of 20.11. + Copy stage 1 §3.3): few fields, one black button whose
 * label follows the way chosen (Pedir la prueba / Pedir la demo / Enviar / Enviar solicitud), a clear confirmation whose heading and
 * next steps follow the same way (Copy screen 2-C: the visitor said before the click what happens next, and the confirmation names
 * exactly that), and — on a preview — the note that nothing was sent. Labels are WORKING for Copy (lib/content/pilot-request.ts).
 * Native validation first (`required`), the route's answer second. No personal data is kept in the browser beyond the form itself and,
 * for this tab only, its typed fields (RV6 R-9, 23.11.: a language switch mid-form is a page change, so what the visitor typed is kept in
 * sessionStorage and put back on the other language's form; the message is put back only when the visitor typed in that field
 * (RV6's edge case: a prefilled subject of one way must never travel to another way, and the new language keeps its own translated
 * subject). Cleared when the request is sent; gone when the tab closes.
 */
const KEEP_KEY = "nuova.prq";
const KEPT = ["agency", "name", "email", "phone", "message"] as const;
type Kept = { v: Partial<Record<(typeof KEPT)[number], string>>; messageTyped?: boolean; subject?: string };
const readKept = (): Kept | null => { try { const s = sessionStorage.getItem(KEEP_KEY); return s ? (JSON.parse(s) as Kept) : null; } catch { return null; } };
const writeKept = (k: Kept | null) => { try { if (k) sessionStorage.setItem(KEEP_KEY, JSON.stringify(k)); else sessionStorage.removeItem(KEEP_KEY); } catch { /* storage blocked: the form still works, nothing is kept */ } };

export function PilotRequestForm({ locale, interest: initial = "other", live, planName, subject }: { locale: Locale; interest?: PilotInterest; live: boolean; planName?: string; subject?: string }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = pilotRequest.form;
  const d = pilotRequest.done;
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "missing" | "reach">("idle");
  const [delivery, setDelivery] = useState<"sent" | "simulated" | null>(null);
  const [interest, setInterest] = useState<PilotInterest>(initial);
  const formRef = useRef<HTMLFormElement | null>(null);

  // RV6 R-9: put the typed fields back after a language switch (the message only when the visitor typed in it)
  useEffect(() => {
    const k = readKept();
    const f = formRef.current;
    if (!k || !f) return;
    for (const name of KEPT) {
      const el = f.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
      const v = k.v[name];
      if (!el || typeof v !== "string" || !v) continue;
      if (name === "message") {
        if (!k.messageTyped) continue;
        // the visitor's note comes back; the prefilled subject it was typed around is swapped for THIS form's subject wherever it sits in the
        // text (RV6 R-9b: a note typed in front of the prefill too), so no other way's or language's subject rides along
        el.value = k.subject && v.includes(k.subject) ? v.replace(k.subject, subject ?? "") : v;
        continue;
      }
      el.value = v;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount; `subject` is the server-rendered prefill of this page
  }, []);
  const keep = (e: FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const v: Kept["v"] = {};
    for (const name of KEPT) { const x = String(fd.get(name) ?? ""); if (x) v[name] = x; }
    const typedInMessage = (e.target as HTMLElement | null)?.getAttribute("name") === "message";
    writeKept({ v, messageTyped: typedInMessage || readKept()?.messageTyped === true, subject });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.reportValidity()) { setState("missing"); return; }
    const fd = new FormData(f);
    // 16.11. 14:00 (the owner's point 4): e-mail OR phone
    if (!String(fd.get("email") ?? "").trim() && !String(fd.get("phone") ?? "").trim()) { setState("reach"); return; }
    setState("sending");
    try {
      const r = await fetch("/api/pilot-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          agency: fd.get("agency"), name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"), interest: fd.get("interest"),
          message: planName ? `${planName}${fd.get("message") ? " · " : ""}${fd.get("message") ?? ""}` : fd.get("message"),
          consent: true, locale, web: fd.get("web"),
        }),
      });
      const j = (await r.json()) as { ok: boolean; delivery?: "sent" | "simulated"; error?: string };
      if (!r.ok || !j.ok) { setState(j.error === "missing" ? "missing" : "error"); return; }
      setDelivery(j.delivery ?? "simulated");
      writeKept(null); // sent: nothing stays in the browser
      setState("done");
    } catch {
      setState("error");
    }
  };

  const submitLabel = pilotRequest.card(interest, planName).submit;

  if (state === "done") {
    const c = d.confirmation(interest, locale, planName);
    return (
      <div className="prq-done" data-pilot-request="done" data-pilot-delivery={delivery ?? "unknown"} data-request-done={interest} role="status" aria-live="polite">
        <span className="prq-done-mark" aria-hidden="true"><Check size={22} strokeWidth={2.6} /></span>
        <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(d.eyebrow)}</p>
        <h2 className="prq-done-h">{c.h}</h2>
        {c.steps.length > 0 && (
          <>
            <p className="prq-done-next">{l(d.next)}</p>
            <ol className="prq-steps" data-pilot-steps={c.steps.length}>
              {c.steps.map((s, i) => (
                <li key={i} className="prq-step"><span className="prq-step-no tnum" aria-hidden="true">{i + 1}</span><span><strong>{s}</strong></span></li>
              ))}
            </ol>
          </>
        )}
        {(!live || delivery === "simulated") && <p className="prq-simulated" data-pilot-simulated>{l(d.simulated)}</p>}
        <a href={localePath(locale)} className="prq-back">{l(d.back)}</a>
      </div>
    );
  }

  const field = "prq-field";
  return (
    <form ref={formRef} className="prq" onSubmit={onSubmit} onInput={keep} noValidate={false} data-pilot-request="form" data-pilot-interest={interest}>
      <div className="prq-grid">
        <label className={field}><span className="prq-label">{l(w.agency)}</span><input name="agency" required autoComplete="organization" maxLength={120} className="prq-input" data-prq="agency" /></label>
        <label className={field}><span className="prq-label">{l(w.name)}</span><input name="name" required autoComplete="name" maxLength={120} className="prq-input" data-prq="name" /></label>
        <label className={field}><span className="prq-label">{l(w.email)}</span><input name="email" type="email" autoComplete="email" maxLength={160} className="prq-input" data-prq="email" /></label>
        <label className={field}><span className="prq-label">{l(w.phone)}</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} className="prq-input" data-prq="phone" /></label>
        <p className="prq-hint prq-field-wide" data-prq-reach>{l(w.reach)}</p>
        <label className={cn(field, "prq-field-wide")}>
          <span className="prq-label">{l(w.interest)}</span>
          <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value as PilotInterest)} className="prq-input prq-select" data-prq="interest">
            {(Object.keys(w.interests) as PilotInterest[]).map((k) => <option key={k} value={k}>{l(w.interests[k])}</option>)}
          </select>
          {interest === "contract" && <span className="prq-hint" data-prq-contract-note>{l(w.contractNote)}</span>}
        </label>
        <label className={cn(field, "prq-field-wide")}><span className="prq-label">{l(w.message)}</span><textarea name="message" rows={3} maxLength={2000} className="prq-input prq-area" data-prq="message" defaultValue={subject} /></label>
        {/* the honeypot: hidden from people, filled by bots (RV6 on bea7d19: unreachable by tap and Tab; aria-hidden on the wrapper AND the field so no screen reader announces an unnamed field) */}
        <label className="prq-web" aria-hidden="true"><input name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" /></label>
      </div>
      {/* 16.11. 14:00 (the owner's point 4): no required box — the privacy line with its link (lawyer Q-4) */}
      <p className="prq-consent" data-prq="consent-line">{l(w.consent)}<a href={localePath(locale, "/legal/privacy")} className="prq-link" target="_blank" rel="noreferrer">{l(w.consentLink)}</a>{l(w.consentAfter)}</p>
      <div className="prq-foot">
        <button type="submit" className="prq-submit lift" disabled={state === "sending"} data-pilot-cta="form" data-request-submit={interest} id={`${id}-submit`}>
          {state === "sending" ? l(w.sending) : l(submitLabel)}
        </button>
        {state === "reach" && <p className="prq-note prq-note-error" role="alert">{l(w.reachMissing)}</p>}
        {state === "missing" && <p className="prq-note prq-note-error" role="alert">{l(w.required)}</p>}
        {state === "error" && <p className="prq-note prq-note-error" role="alert">{l(w.error)}</p>}
      </div>
    </form>
  );
}
