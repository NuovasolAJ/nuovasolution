"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CrmCatalogEntry, CrmSelection, OnboardingState, StepStatus, TrialState, WizardStep } from "@/lib/contracts/types";
import { providerDisplayNames } from "@/lib/contracts/types";
import { Button } from "@/components/ui/button";
import { StatusGlyph, LabelChip, type Glyph } from "@/components/ui/status";
import { CrmChoice } from "@/components/site/crm-choice";

const glyphFor: Record<StepStatus, Glyph> = {
  completed: "check",
  needs_action: "arrow-right",
  externally_pending: "clock",
  locked_by_plan: "lock",
  optional: "rule",
};
const toneFor: Record<StepStatus, string> = {
  completed: "text-signal-positive",
  needs_action: "text-text-primary",
  externally_pending: "text-signal-attention",
  locked_by_plan: "text-text-muted",
  optional: "text-text-muted",
};

/** Derive the party an externally_pending step waits on, from returned detail only. */
function providerFor(step: WizardStep, fallback: string): string {
  if (step.key === "communication" && step.channels?.whatsapp_pending) return providerDisplayNames.whatsapp;
  if (step.key === "lead_acquisition") {
    if (step.paid?.meta_lead_ads?.connected && !step.paid.meta_lead_ads.ready) return providerDisplayNames.meta_lead_ads;
    if (step.paid?.google_lead_forms?.connected && !step.paid.google_lead_forms.ready) return providerDisplayNames.google_lead_forms;
  }
  if (step.key === "crm" && step.crm_provider) return providerDisplayNames[step.crm_provider] ?? fallback;
  return fallback;
}

/**
 * Rendered only from the readiness contract. A field not returned is not
 * shown. A gate not returned is not enforced. Disabled features never block
 * readiness. The browser never grants anything: Go live only sends a request.
 */
export function OnboardingWizard({ locale, state, trial, stub, crm }: { locale: Locale; state: OnboardingState; trial: TrialState | null; stub: boolean; crm?: { catalog: CrmCatalogEntry[]; selection: CrmSelection } }) {
  const dict = getDictionary(locale);
  const d = dict.onboarding;
  const errorText = (code: string) => (dict.common.errors as Record<string, string>)[code] ?? dict.common.errors.generic;
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function selectCase(n: number) {
    setBusy("case");
    await fetch("/api/bff/onboarding/case", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ case: n }) });
    setBusy(null);
    router.refresh();
  }
  async function touch(step: string, action: "visit" | "skip") {
    setBusy(step);
    setNote(null);
    try {
      const res = await fetch("/api/bff/onboarding/touch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ step, action }) });
      const json = (await res.json().catch(() => ({ ok: false, code: "generic" }))) as { ok: boolean; code: string };
      if (!json.ok) setNote(errorText(json.code));
    } catch {
      setNote(dict.common.errors.generic);
    } finally {
      setBusy(null);
    }
  }
  async function goLive() {
    setBusy("activate");
    try {
      const res = await fetch("/api/bff/tenant/activate", { method: "POST" });
      const json = (await res.json().catch(() => ({ ok: false, code: "generic" }))) as { ok: boolean; code: string; stub?: true };
      setNote(json.stub ? d.goLiveNote : json.ok ? d.activatable : errorText(json.code));
      if (json.ok && !json.stub) router.refresh();
    } catch {
      setNote(dict.common.errors.generic);
    } finally {
      setBusy(null);
    }
  }

  const ready = state.steps.find((s) => s.key === "ready");
  // Redaction boundary: a server key reaches the page only through this label map. Unknown keys render nothing.
  const gateLabel = (k: string): string | null => {
    const stepTitle = (d.steps as Record<string, string>)[k];
    return (d.gates as Record<string, string>)[k] ?? stepTitle ?? null;
  };
  const labels = (keys: string[] | undefined) => Array.from(new Set((keys ?? []).map(gateLabel).filter((x): x is string => Boolean(x))));
  const blockedMandatory = labels(ready?.readiness?.blocked_mandatory);
  const blockedFeatures = labels(ready?.readiness?.blocked_features);
  const trialLine = trial
    ? trial.status === "trialing"
      ? trial.days_left <= 1
        ? d.trial.lastDay
        : d.trial.trialing.replace("{days}", String(trial.days_left))
      : d.trial[trial.status]
    : state.trial_end
      ? d.trialEnd.replace("{date}", new Date(state.trial_end).toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" }))
      : null;

  return (
    <div className="space-y-10">
      {stub && (
        <div className="border border-line-strong bg-surface-raised p-4">
          <p className="t-body-s text-text-secondary">{d.stubNotice}</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={d.stubCases}>
            {d.caseLabels.map((label, i) => (
              <Button key={label} type="button" size="sm" variant="secondary" disabled={busy === "case"} onClick={() => selectCase(i + 1)}>
                {i + 1}. {label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <p className="t-caption text-text-muted">{state.agency_name}</p>
          <p className="mt-1 t-heading-l text-text-primary tnum">{d.progressSteps.replace("{done}", String(state.completed_steps)).replace("{total}", String(state.total_steps))}</p>
          {trialLine && <p className="mt-2 t-body-s text-text-secondary">{trialLine}</p>}
          {trial?.status === "trial_expired" && <p className="mt-1 t-body-s text-text-secondary">{d.trial.expiredBody}</p>}
        </div>
        <a href={`#step-${state.resume_step}`} className="inline-flex h-12 items-center rounded-sm border border-line-interactive px-6 t-body-m text-text-primary hover:bg-surface-raised">{d.resume}</a>
      </div>

      <ol className="hairline-list border-y border-line-hairline">
        {state.steps.map((s) => {
          const prov = providerFor(s, d.providerFallback);
          const st = d.stepStatus[s.status];
          const label = st.label.replace("{provider}", prov);
          const line = st.line.replaceAll("{provider}", prov);
          const isResume = s.key === state.resume_step;
          return (
            <li key={s.key} id={`step-${s.key}`} className={cn("grid grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_1fr_auto] gap-x-4 gap-y-2 py-5 min-h-[72px] items-start -mx-4 px-4 transition-colors duration-micro", isResume && "border-l border-line-interactive")}>
              <span className="t-caption tnum text-text-muted pt-1">{String(s.step).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className={cn("t-heading-s", s.status === "locked_by_plan" ? "text-text-secondary" : "text-text-primary")}>{(d.steps as Record<string, string>)[s.key] ?? s.title}</p>
                <p className="mt-1 t-body-s text-text-muted">{line}</p>
                <Detail step={s} locale={locale} />
                {s.key === "crm" && crm && <CrmChoice locale={locale} catalog={crm.catalog} selection={crm.selection} />}
              </div>
              <div className="col-start-2 md:col-start-3 flex flex-wrap items-center gap-3 md:justify-end">
                <span className={cn("inline-flex items-center gap-1.5 t-caption", toneFor[s.status])}>
                  <StatusGlyph glyph={glyphFor[s.status]} size={14} />
                  {label}
                </span>
                {s.status === "optional" && (
                  <Button type="button" size="sm" variant="tertiary" busy={busy === s.key} disabled={busy === s.key} onClick={() => touch(s.key, "skip")}>{d.skip}</Button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="border border-line-strong bg-surface-raised p-6">
        <p className={cn("t-heading-m", state.activatable ? "text-signal-positive" : "text-text-primary")}>{state.activatable ? d.activatable : d.notActivatable}</p>
        {blockedMandatory.length > 0 && (
          <div className="mt-2">
            <p className="t-body-s text-text-secondary">{d.blockedMandatory}: {blockedMandatory.join(", ")}</p>
            {ready?.readiness?.blocked_mandatory.includes("white_label_legal") && <p className="mt-1 t-caption text-text-muted">{d.gateDetail.white_label_legal}</p>}
            {ready?.readiness?.blocked_mandatory.includes("ai_disclosure") && <p className="mt-1 t-caption text-text-muted">{d.aiDisclosurePending}</p>}
          </div>
        )}
        {blockedFeatures.length > 0 && <p className="mt-2 t-caption text-text-muted">{d.blockedFeatures}: {blockedFeatures.join(", ")}</p>}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <Button type="button" onClick={() => (state.activatable ? goLive() : setNote(d.notActivatable))} disabled={busy === "activate"} busy={busy === "activate"} aria-disabled={!state.activatable} aria-describedby="go-live-note">{d.goLive}</Button>
          <p id="go-live-note" className="t-caption text-text-muted">{d.goLiveNote}</p>
        </div>
        {note && <p role="status" className="mt-4 t-body-s text-text-secondary">{note}</p>}
      </div>
    </div>
  );
}

/** Only fields the contract returned. Nothing invented. */
function Detail({ step, locale }: { step: WizardStep; locale: Locale }) {
  const d = getDictionary(locale).onboarding;
  const items: string[] = [];
  if (typeof step.active_employees === "number") items.push(`${step.active_employees} ${locale === "es" ? "en el equipo" : "on the team"}`);
  if (step.channels) {
    if (step.channels.email) items.push(providerDisplayNames.email);
    if (step.channels.whatsapp) items.push(providerDisplayNames.whatsapp);
    if (step.channels.voice_locked) items.push(`${providerDisplayNames.voice}: ${d.stepStatus.locked_by_plan.label}`);
  }
  if (step.paid) {
    for (const [k, v] of Object.entries(step.paid)) {
      if (k === "plan") continue;
      const src = v as { connected: boolean; ready: boolean } | undefined;
      if (src?.connected) items.push(`${providerDisplayNames[k] ?? k}: ${src.ready ? d.connector.connected.label : d.stepStatus.externally_pending.label.replace("{provider}", providerDisplayNames[k] ?? k)}`);
    }
  }
  if (step.key === "crm" && step.external_crm === false) items.push(locale === "es" ? "CRM propio" : "Native CRM");
  if (step.key === "crm" && step.crm_provider) items.push(providerDisplayNames[step.crm_provider]);
  if (step.accepts_scraped_owned_inventory) items.push(locale === "es" ? "Tu propia web es una fuente válida" : "Your own website is a valid source");
  if (step.entry) items.push(step.entry.entitled ? (locale === "es" ? "Disponible" : "Available") : d.stepStatus.locked_by_plan.line);
  const notices = (step.disclosures ?? []).filter((n) => n.applies);
  if (!items.length && !notices.length) return null;
  return (
    <>
      {items.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {items.map((it) => (
            <li key={it} className="t-caption text-text-secondary">{it}</li>
          ))}
        </ul>
      )}
      {notices.map((n) => (
        <div key={n.key} className="mt-3 border-l border-line-interactive pl-3" data-disclosure={n.key}>
          <p className="t-caption text-text-muted">{d.notice}</p>
          {/* Backend-authored notice. Spanish body when the backend provides one; otherwise the English body, never an invented translation. */}
          <p className="mt-1 t-body-s text-text-secondary">{locale === "es" && n.body_es ? n.body_es : n.body}</p>
        </div>
      ))}
    </>
  );
}
