"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { pilotRequest, type PilotInterest } from "@/lib/content/pilot-request";
import { cn } from "@/lib/utils";

/**
 * The pilot request form (the owner's order of 16.11.2026, point 1): few fields, one black button, a clear confirmation with the
 * three steps of the pilot under it, and — on a preview — the note that nothing was sent. Labels are WORKING for Copy
 * (lib/content/pilot-request.ts). Native validation first (`required`), the route's answer second. No personal data is kept in the
 * browser beyond the form itself.
 */
export function PilotRequestForm({ locale, interest: initial = "pilot", live, planName }: { locale: Locale; interest?: PilotInterest; live: boolean; planName?: string }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = pilotRequest.form;
  const d = pilotRequest.done;
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "missing" | "reach">("idle");
  const [delivery, setDelivery] = useState<"sent" | "simulated" | null>(null);
  const [interest, setInterest] = useState<PilotInterest>(initial);
  const [hadPhone, setHadPhone] = useState(false); // Copy 441ba1c §7: the first step takes the channel the person gave

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.reportValidity()) { setState("missing"); return; }
    const fd = new FormData(f);
    // 16.11. 14:00 (the owner's point 4): e-mail OR phone
    if (!String(fd.get("email") ?? "").trim() && !String(fd.get("phone") ?? "").trim()) { setState("reach"); return; }
    setHadPhone(!!String(fd.get("phone") ?? "").trim());
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
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    const steps = d.steps(interest, hadPhone, locale);
    return (
      <div className="prq-done" data-pilot-request="done" data-pilot-delivery={delivery ?? "unknown"} role="status" aria-live="polite">
        <span className="prq-done-mark" aria-hidden="true"><Check size={22} strokeWidth={2.6} /></span>
        <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(d.eyebrow)}</p>
        <h2 className="prq-done-h">{l(d.h)}</h2>
        <p className="prq-done-next">{l(d.next)}</p>
        <ol className="prq-steps" data-pilot-steps={steps.length}>
          {steps.map((s, i) => (
            <li key={i} className="prq-step"><span className="prq-step-no tnum" aria-hidden="true">{i + 1}</span><span><strong>{s.b}</strong>{s.t ? ` ${s.t}` : ""}</span></li>
          ))}
        </ol>
        {(!live || delivery === "simulated") && <p className="prq-simulated" data-pilot-simulated>{l(d.simulated)}</p>}
        <a href={localePath(locale)} className="prq-back">{l(d.back)}</a>
      </div>
    );
  }

  const field = "prq-field";
  return (
    <form className="prq" onSubmit={onSubmit} noValidate={false} data-pilot-request="form" data-pilot-interest={interest}>
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
        <label className={cn(field, "prq-field-wide")}><span className="prq-label">{l(w.message)}</span><textarea name="message" rows={3} maxLength={2000} className="prq-input prq-area" data-prq="message" /></label>
        {/* the honeypot: hidden from people, filled by bots */}
        <label className="prq-web" aria-hidden="true"><input name="web" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {/* 16.11. 14:00 (the owner's point 4): no required box — the privacy line with its link (lawyer Q-4) */}
      <p className="prq-consent" data-prq="consent-line">{l(w.consent)}<a href={localePath(locale, "/legal/privacy")} className="prq-link" target="_blank" rel="noreferrer">{l(w.consentLink)}</a>{l(w.consentAfter)}</p>
      <div className="prq-foot">
        <button type="submit" className="prq-submit lift" disabled={state === "sending"} data-pilot-cta="form" id={`${id}-submit`}>
          {state === "sending" ? l(w.sending) : interest === "contract" ? l(w.submitContract) : l(w.submit)}<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        {/* 16.11. 14:00 (the owner's point 3): the second, clearly smaller way under the pilot button */}
        {interest !== "contract" && <button type="button" className="prq-direct" onClick={() => setInterest("contract")} data-prq-direct>{l(w.direct)}</button>}
        {state === "reach" && <p className="prq-note prq-note-error" role="alert">{l(w.reachMissing)}</p>}
        {state === "missing" && <p className="prq-note prq-note-error" role="alert">{l(w.required)}</p>}
        {state === "error" && <p className="prq-note prq-note-error" role="alert">{l(w.error)}</p>}
      </div>
    </form>
  );
}
