"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CrmCatalogEntry, CrmSelection, OnboardingState, StepKey, StepStatus, WizardStep } from "@/lib/contracts/types";
import type { OnboardingProfile, Readiness, TrialView } from "@/lib/contracts/types-onboarding";
import { providerDisplayNames } from "@/lib/contracts/types";
import { Button } from "@/components/ui/button";
import { StatusGlyph, type Glyph } from "@/components/ui/status";
import { CrmChoice } from "@/components/site/crm-choice";
import { BrandingSection, BusinessSection, CalendarSection, HoursSection, LegalSection, ReadinessSection, useSetupSave } from "@/components/site/onboarding-setup";

/**
 * The onboarding in five areas (owner order 2026-10-01 §7): agency data and brand · connections and
 * channels · CRM and property sources · team and working hours · summary and activation. Each area
 * shows the backend's steps that belong to it, with one of the four state words (COPY_DELTAS_1001
 * §1.1) and, for a step that is still required, the action that can be taken here: the form below
 * it, or the plain sentence that there is no form on the site for it yet.
 *
 * The progress travels with the page (a rail from 1024 px, a slim strip on the phone) and counts
 * only the steps that are really needed: optional steps and steps a plan does not include are
 * neither counted nor "done". Rendered only from the readiness contract: a field not returned is not
 * shown, a gate not returned is not enforced. The browser grants nothing: "Go live" sends a request.
 */
type AreaKey = "agency" | "channels" | "crm" | "team" | "summary";
const AREA_STEPS: Record<AreaKey, StepKey[]> = {
  agency: ["account", "agency", "branding"],
  channels: ["communication", "lead_acquisition"],
  crm: ["crm", "property_source", "property_experience"],
  team: ["team"],
  summary: ["ready"],
};
const AREAS = Object.keys(AREA_STEPS) as AreaKey[];
/** Where a required step can be worked on here: the section with its form. */
const STEP_FORM: Partial<Record<StepKey, string>> = { agency: "setup-business", branding: "setup-branding", crm: "crm-choice", ready: "setup-readiness" };

const glyphFor: Record<StepStatus, Glyph> = { completed: "check", needs_action: "arrow-right", externally_pending: "clock", locked_by_plan: "lock", optional: "rule" };
const toneFor: Record<StepStatus, string> = { completed: "text-signal-positive", needs_action: "text-text-primary", externally_pending: "text-signal-attention", locked_by_plan: "text-text-muted", optional: "text-text-muted" };
const counted = (s: WizardStep) => s.status !== "optional" && s.status !== "locked_by_plan";

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

export function OnboardingAreas({
  locale,
  state,
  trial,
  readiness,
  stub,
  crm,
  noticeAllowed,
  profile: initial,
  role,
}: {
  locale: Locale;
  state: OnboardingState;
  trial: TrialView | null;
  readiness: Readiness | null;
  stub: boolean;
  crm?: { catalog: CrmCatalogEntry[]; selection: CrmSelection };
  noticeAllowed: boolean;
  profile: OnboardingProfile;
  role: string;
}) {
  const dict = getDictionary(locale);
  const d = dict.onboarding;
  const errorText = (code: string) => (dict.common.errors as Record<string, string>)[code] ?? dict.common.errors.generic;
  const router = useRouter();
  const setup = useSetupSave(locale, initial, role);
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

  const byKey = Object.fromEntries(state.steps.map((s) => [s.key, s])) as Partial<Record<StepKey, WizardStep>>;
  const ready = byKey.ready;
  // Redaction boundary: a server key reaches the page only through this label map. Unknown keys render nothing.
  const gateLabel = (k: string): string | null => (d.gates as Record<string, string>)[k] ?? (d.steps as Record<string, string>)[k] ?? null;
  const labels = (keys: string[] | undefined) => (keys ?? []).map(gateLabel).filter((x, i, arr): x is string => Boolean(x) && arr.indexOf(x) === i);
  const blockedMandatory = readiness ? [] : labels(ready?.readiness?.blocked_mandatory);
  const blockedFeatures = readiness ? [] : labels(ready?.readiness?.blocked_features);
  const activatable = readiness ? readiness.activatable : state.activatable;

  // The count the progress shows: required steps only.
  const required = state.steps.filter(counted);
  const done = required.filter((s) => s.status === "completed").length;
  const resume = byKey[state.resume_step];
  const resumeArea = AREAS.find((a) => AREA_STEPS[a].includes(state.resume_step)) ?? "summary";
  const areaState = (a: AreaKey): StepStatus => {
    const steps = AREA_STEPS[a].map((k) => byKey[k]).filter((s): s is WizardStep => Boolean(s));
    if (steps.some((s) => s.status === "needs_action")) return "needs_action";
    if (steps.some((s) => s.status === "externally_pending")) return "externally_pending";
    if (steps.length && steps.every((s) => s.status === "completed" || !counted(s))) return "completed";
    return "optional";
  };

  // trial_status (trial_lifecycle): active | expired | converted. Nothing else is interpreted, and no payment is inferred.
  const trialLine = trial
    ? trial.status === "active" && trial.remaining_days !== null
      ? trial.remaining_days <= 1
        ? d.trial.lastDay
        : d.trial.trialing.replace("{days}", String(trial.remaining_days))
      : trial.status === "expired"
        ? d.trial.trial_expired
        : null
    : state.trial_end
      ? d.trialEnd.replace("{date}", new Date(state.trial_end).toLocaleDateString(locale === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" }))
      : null;

  const progress = (
    <>
      <p className="t-caption text-text-muted">{state.agency_name}</p>
      <p className="mt-1 t-heading-m tnum text-text-primary" data-progress-required>{d.progressRequired.replace("{done}", String(done)).replace("{total}", String(required.length))}</p>
      {trialLine && <p className="mt-2 t-body-s text-text-secondary" data-trial-line>{trialLine}</p>}
      {trial?.status === "expired" && <p className="mt-1 t-body-s text-text-secondary">{d.trial.expiredBody}</p>}
    </>
  );
  const resumeLink = resume && (
    <a href={`#step-${state.resume_step}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-line-strong bg-surface-raised px-5 t-body-s font-medium text-text-primary hover:border-line-interactive" data-resume-link>
      <StatusGlyph glyph="arrow-right" size={14} className="text-text-accent" />
      {d.resume}
      <span className="t-caption text-text-muted">· {(d.steps as Record<string, string>)[resume.key] ?? resume.title}</span>
    </a>
  );

  return (
    <div className="space-y-8" data-onboarding-setup>
      {stub && (
        <div className="card-quiet p-4">
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

      {/* The phone: a slim strip that travels with the page and never covers a field for long. */}
      <div className="sticky top-[var(--header-h)] z-[20] -mx-[var(--gutter)] border-b border-line-hairline bg-[color:rgba(251,250,247,0.94)] px-[var(--gutter)] py-2.5 backdrop-blur-md xl:hidden" data-progress-strip>
        <div className="flex items-center justify-between gap-3">
          <p className="truncate t-body-s font-medium tnum text-text-primary">{d.progressRequired.replace("{done}", String(done)).replace("{total}", String(required.length))}</p>
          {resume && (
            <a href={`#step-${state.resume_step}`} className="inline-flex min-h-[36px] shrink-0 items-center gap-1 t-caption font-medium text-text-accent underline underline-offset-4">
              {d.nextUp}: {(d.steps as Record<string, string>)[resume.key] ?? resume.title}
            </a>
          )}
        </div>
      </div>

      <div className="xl:grid xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-12">
        {/* The rail from 1024 px: progress, the next step, and the five areas with their state. */}
        <aside className="hidden xl:block" aria-label={d.progressLabel}>
          <div className="sticky top-[calc(var(--header-h)+24px)] space-y-6" data-progress-rail>
            <div>{progress}</div>
            {resumeLink}
            <ol className="flow-rail border-l-0" data-area-nav>
              {AREAS.map((a, i) => {
                const st = areaState(a);
                return (
                  <li key={a}>
                    <a href={`#area-${a}`} aria-current={a === resumeArea ? "step" : undefined}>
                      <span className="tnum t-caption">0{i + 1}</span>
                      <span className="flex min-w-0 flex-1 items-center justify-between gap-2 t-body-s">
                        <span>{d.areas[a].title}</span>
                        <StatusGlyph glyph={glyphFor[st]} size={14} className={cn("shrink-0", toneFor[st])} />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="xl:hidden">{progress}</div>

          {/* 1 Agency data and brand */}
          <Area id="agency" n="01" d={d}>
            <StepRows locale={locale} steps={[byKey.account, byKey.agency, byKey.branding]} state={state} busy={busy} touch={touch} />
            <BusinessSection locale={locale} profile={setup.profile} disabled={!setup.canManage} save={setup.save} />
            <LegalSection locale={locale} profile={setup.profile} readiness={readiness} disabled={!setup.canManage} save={setup.save} />
            <BrandingSection locale={locale} profile={setup.profile} disabled={!setup.canManage} stub={stub} setProfile={setup.setProfile} errorText={setup.errorText} />
          </Area>

          {/* 2 Connections and channels */}
          <Area id="channels" n="02" d={d}>
            <StepRows locale={locale} steps={[byKey.communication, byKey.lead_acquisition]} state={state} busy={busy} touch={touch} />
            <CalendarSection locale={locale} profile={setup.profile} disabled={!setup.canManage} save={setup.save} />
          </Area>

          {/* 3 CRM and property sources */}
          <Area id="crm" n="03" d={d}>
            <StepRows locale={locale} steps={[byKey.crm, byKey.property_source, byKey.property_experience]} state={state} busy={busy} touch={touch} crm={crm} noticeAllowed={noticeAllowed} />
          </Area>

          {/* 4 Team and working hours */}
          <Area id="team" n="04" d={d}>
            <StepRows locale={locale} steps={[byKey.team]} state={state} busy={busy} touch={touch} />
            <HoursSection locale={locale} profile={setup.profile} disabled={!setup.canManage} save={setup.save} />
          </Area>

          {/* 5 Summary and activation */}
          <Area id="summary" n="05" d={d}>
            <StepRows locale={locale} steps={[byKey.ready]} state={state} busy={busy} touch={touch} />
            <ReadinessSection locale={locale} readiness={readiness} />
            <div className="mt-6 rounded-lg border border-line-strong bg-surface-sunken p-5 md:p-6" data-go-live>
              <p className={cn("t-heading-m", activatable ? "text-signal-positive" : "text-text-primary")}>{activatable ? d.activatable : d.notActivatable}</p>
              {blockedMandatory.length > 0 && (
                <div className="mt-2">
                  <p className="t-body-s text-text-secondary">{d.blockedMandatory}: {blockedMandatory.join(", ")}</p>
                  {ready?.readiness?.blocked_mandatory.includes("white_label_legal") && <p className="mt-1 t-caption text-text-muted">{d.gateDetail.white_label_legal}</p>}
                  {ready?.readiness?.blocked_mandatory.includes("ai_disclosure") && <p className="mt-1 t-caption text-text-muted">{d.aiDisclosurePending}</p>}
                </div>
              )}
              {blockedFeatures.length > 0 && <p className="mt-2 t-caption text-text-muted">{d.blockedFeatures}: {blockedFeatures.join(", ")}</p>}
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
                <Button type="button" onClick={() => (activatable ? goLive() : setNote(d.notActivatable))} disabled={busy === "activate"} busy={busy === "activate"} aria-disabled={!activatable} aria-describedby="go-live-note">{d.goLive}</Button>
                <p id="go-live-note" className="t-caption text-text-muted">{d.goLiveNote}</p>
              </div>
              {note && <p role="status" className="mt-4 t-body-s text-text-secondary">{note}</p>}
            </div>
          </Area>
        </div>
      </div>
    </div>
  );
}

type Dict = ReturnType<typeof getDictionary>["onboarding"];

function Area({ id, n, d, children }: { id: AreaKey; n: string; d: Dict; children: ReactNode }) {
  return (
    <section id={`area-${id}`} aria-labelledby={`area-${id}-h`} className="stage scroll-mt-[calc(var(--header-h)+72px)] p-5 md:p-8 xl:scroll-mt-[calc(var(--header-h)+24px)]" data-area={id}>
      <p className="t-eyebrow text-text-muted"><span className="tnum text-text-accent">{n}</span> · {d.areas[id].line}</p>
      <h3 id={`area-${id}-h`} className="mt-2 t-heading-l text-text-primary">{d.areas[id].title}</h3>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  );
}

/** The backend's steps of one area, each with its state word, its line, its returned detail and, when required, where to act. */
function StepRows({ locale, steps, state, busy, touch, crm, noticeAllowed }: { locale: Locale; steps: (WizardStep | undefined)[]; state: OnboardingState; busy: string | null; touch: (step: string, action: "visit" | "skip") => void; crm?: { catalog: CrmCatalogEntry[]; selection: CrmSelection }; noticeAllowed?: boolean }) {
  const d = getDictionary(locale).onboarding;
  const rows = steps.filter((s): s is WizardStep => Boolean(s));
  if (!rows.length) return null;
  return (
    <ol className="hairline-list border-y border-line-hairline" data-step-rows>
      {rows.map((s) => {
        const prov = providerFor(s, d.providerFallback);
        const st = d.stepStatus[s.status];
        const label = st.label.replace("{provider}", prov);
        const line = st.line.replaceAll("{provider}", prov);
        const isResume = s.key === state.resume_step;
        const form = s.status === "needs_action" ? STEP_FORM[s.key] : undefined;
        return (
          <li key={s.key} id={`step-${s.key}`} data-wizard-step={s.key} data-step-status={s.status} className={cn("scroll-mt-[calc(var(--header-h)+88px)] py-5 xl:scroll-mt-[calc(var(--header-h)+24px)]", isResume && "-mx-4 rounded-md bg-surface-sunken px-4")}>
            <div className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-2 md:grid-cols-[2rem_1fr_auto]">
              <span className="pt-1 t-caption tnum text-text-muted">{String(s.step).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className={cn("t-heading-s", s.status === "locked_by_plan" ? "text-text-secondary" : "text-text-primary")}>{(d.steps as Record<string, string>)[s.key] ?? s.title}</p>
                <p className="mt-1 t-body-s text-text-muted">{line}</p>
                <Detail step={s} locale={locale} />
                {s.status === "needs_action" && !form && s.key !== "ready" && <p className="mt-2 t-caption text-text-muted" data-no-form>{d.noFormHere}</p>}
                {form && (
                  <a href={`#${form}`} className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 t-body-s font-medium text-text-accent underline underline-offset-4" data-step-action={form}>
                    {d.goToStep}
                    <StatusGlyph glyph="arrow-right" size={12} />
                  </a>
                )}
              </div>
              <div className="col-start-2 flex flex-wrap items-center gap-3 md:col-start-3 md:justify-end">
                <span className={cn("inline-flex items-center gap-1.5 t-caption", toneFor[s.status])} data-step-word>
                  <StatusGlyph glyph={glyphFor[s.status]} size={14} />
                  {label}
                </span>
                {s.status === "optional" && (
                  <Button type="button" size="sm" variant="tertiary" busy={busy === s.key} disabled={busy === s.key} onClick={() => touch(s.key, "skip")}>{d.skip}</Button>
                )}
              </div>
            </div>
            {s.key === "crm" && crm && (
              <div id="crm-choice" className="scroll-mt-[calc(var(--header-h)+88px)] xl:scroll-mt-[calc(var(--header-h)+24px)]">
                <CrmChoice locale={locale} catalog={crm.catalog} selection={crm.selection} noticeAllowed={Boolean(noticeAllowed)} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Only fields the contract returned. Nothing invented. The two sentences of this round (D-66, D-71) belong to their step. */
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
  if (step.entry) items.push(step.entry.entitled ? (locale === "es" ? "Disponible" : "Available") : d.stepStatus.locked_by_plan.line);
  const notices = (step.disclosures ?? []).filter((n) => n.applies);
  const voice = step.key === "communication" && step.channels ? d.voiceLine : null;
  // D-71: the website address is a stored source, nothing is read from it today (and it is not a scraping consent).
  const source = step.key === "property_source" ? d.propertySourceHelp : null;
  if (!items.length && !notices.length && !voice && !source) return null;
  return (
    <>
      {items.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {items.map((it) => (
            <li key={it} className="t-caption text-text-secondary">{it}</li>
          ))}
        </ul>
      )}
      {voice && <p className="mt-2 t-caption text-text-muted" data-voice-line>{voice}</p>}
      {source && <p className="mt-2 t-caption text-text-muted" data-property-source-help>{source}</p>}
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

