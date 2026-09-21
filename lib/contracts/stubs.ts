import type { CrmCatalogEntry, EntitlementSnapshot, OnboardingState, Plan, StepStatus, TrialState, WizardStep } from "./types";

/**
 * CRM catalog stub: a copy of what crm_provider_catalog() returned on staging at
 * 2026-09-21T12:49:30Z, without the backend's English note (never rendered).
 * Kept identical in shape so stub and sandbox exercise the same UI.
 */
export const crmCatalogStub: CrmCatalogEntry[] = [
  { sort: 1, provider: "nuovasolution", display_name: "Nuova CRM (built-in)", availability: "available", selectable: true, is_default: true, live_wired: true },
  { sort: 2, provider: "google_sheets", display_name: "Google Sheets", availability: "available", selectable: true, is_default: false, live_wired: true },
  { sort: 3, provider: "hubspot", display_name: "HubSpot", availability: "coming_soon", selectable: false, is_default: false, live_wired: false },
  { sort: 4, provider: "pipedrive", display_name: "Pipedrive", availability: "coming_soon", selectable: false, is_default: false, live_wired: false },
  { sort: 5, provider: "zoho", display_name: "Zoho CRM", availability: "coming_soon", selectable: false, is_default: false, live_wired: false },
  { sort: 6, provider: "salesforce", display_name: "Salesforce", availability: "coming_soon", selectable: false, is_default: false, live_wired: false },
  { sort: 7, provider: "gohighlevel", display_name: "GoHighLevel", availability: "unavailable", selectable: false, is_default: false, live_wired: false },
  { sort: 8, provider: "dynamics", display_name: "Microsoft Dynamics", availability: "unavailable", selectable: false, is_default: false, live_wired: false },
  { sort: 9, provider: "airtable", display_name: "Airtable", availability: "unavailable", selectable: false, is_default: false, live_wired: false },
];

/**
 * LOCAL STUBS. Clearly labelled, never a backend response.
 * Shapes follow backend export v2 §G exactly. Values are demonstration data
 * chosen to exercise every rendering state. Nothing here is an offer, a
 * price, a real agency or a real customer.
 */

const legend: Record<StepStatus, string> = {
  completed: "Done and verified server-side.",
  needs_action: "The agency must do something.",
  externally_pending: "Accepted; waiting on an external provider or approval.",
  locked_by_plan: "Requires a higher plan or add-on entitlement.",
  optional: "Not required to launch.",
};

const titles: Record<WizardStep["key"], string> = {
  account: "Account",
  agency: "Agency",
  branding: "Branding",
  team: "Team",
  communication: "Communication",
  lead_acquisition: "Lead acquisition",
  crm: "CRM",
  property_source: "Property source",
  property_experience: "Property Experience",
  ready: "Ready",
};

type Partial9 = Partial<Record<WizardStep["key"], Partial<WizardStep>>>;

function build(overrides: Partial9, meta: Partial<OnboardingState> = {}): OnboardingState {
  const keys = Object.keys(titles) as WizardStep["key"][];
  const steps: WizardStep[] = keys.map((key, i) => ({
    step: i + 1,
    key,
    title: titles[key],
    status: "needs_action",
    classification: "OWNER_ACTION",
    locked: false,
    ...overrides[key],
  }));
  const completed = steps.filter((s) => s.status === "completed").length;
  const needs = steps.filter((s) => s.status === "needs_action").length;
  const ready = steps.find((s) => s.key === "ready");
  const activatable = ready?.readiness?.activatable ?? false;
  const resume = steps.find((s) => s.status === "needs_action")?.key ?? "ready";
  return {
    client_id: "stub-client",
    exists: true,
    agency_name: "Demo Agency (stub)",
    plan: "growth",
    trial_end: new Date(Date.now() + 9 * 86400000).toISOString(),
    resume_step: resume,
    completed_steps: completed,
    total_steps: steps.length,
    needs_action_steps: needs,
    percent_complete: Math.round((completed / steps.length) * 100),
    activatable,
    legend,
    steps,
    ...meta,
  };
}

/** The six rendering cases proven against the stub before staging. */
export const onboardingCases: OnboardingState[] = [
  // 1. Fresh account: only the account step is done.
  build({
    account: { status: "completed" },
    property_experience: { status: "locked_by_plan", locked: true, entry: { entitled: false, state: "locked_addon" }, classification: "AUTOMATED" },
    ready: { readiness: { activatable: false, blocked_mandatory: ["agency", "team", "communication", "property_source"], blocked_features: ["property_experience"] } },
  }),
  // 2. Partly complete, several needs_action remain.
  build({
    account: { status: "completed" },
    agency: { status: "completed" },
    branding: { status: "completed" },
    team: { status: "needs_action", active_employees: 0 },
    communication: { status: "needs_action", channels: { email: true, whatsapp: false, whatsapp_pending: false, voice_locked: true } },
    lead_acquisition: { status: "optional", classification: "PROVIDER_ACTION", paid: { plan: { entitled: false } } },
    crm: { status: "completed", external_crm: false, connected: true, classification: "AUTOMATED" },
    property_source: { status: "needs_action", accepts_scraped_owned_inventory: true },
    property_experience: { status: "locked_by_plan", locked: true, entry: { entitled: false, state: "locked_addon" }, classification: "AUTOMATED" },
    ready: { readiness: { activatable: false, blocked_mandatory: ["team", "communication", "property_source"], blocked_features: ["property_experience"] } },
  }),
  // 3. Waiting on a provider: WhatsApp verification and Meta approval in flight.
  build({
    account: { status: "completed" },
    agency: { status: "completed" },
    branding: {
      status: "completed",
      // Same notice the staging backend returns for trial tenants (read 2026-09-21).
      disclosures: [
        {
          key: "trial_email_branding",
          title: 'Emails on the trial plan show "Powered by NuovaSolution"',
          body: 'While your account is on the trial plan, every customer email the assistant sends carries a small "Powered by NuovaSolution" line in the footer. It is shown to your customers. Moving to a paid plan removes the line and hands this setting to you.',
          body_es: 'Mientras su cuenta esté en el plan trial, todos los correos que el asistente envía a sus clientes incluyen una línea "Powered by NuovaSolution" en el pie. Sus clientes la ven. Al pasar a un plan de pago la línea desaparece y usted controla este ajuste.',
          applies: true,
          severity: "info",
          shown_in_customer_emails: true,
        },
      ],
    },
    team: { status: "completed", active_employees: 3 },
    communication: { status: "externally_pending", classification: "PROVIDER_ACTION", channels: { email: true, whatsapp: false, whatsapp_pending: true, voice_locked: true } },
    lead_acquisition: { status: "externally_pending", classification: "PROVIDER_ACTION", paid: { plan: { entitled: true }, meta_lead_ads: { connected: true, ready: false }, google_lead_forms: { connected: false, ready: false } } },
    // External CRMs are fenced (coming_soon) on the backend, so an external CRM can never be
    // "waiting on a provider" today. The built-in CRM stays of record. See CRM contract §1.
    crm: { status: "completed", classification: "PROVIDER_ACTION", external_crm: false, connected: false },
    property_source: { status: "completed", accepts_scraped_owned_inventory: true },
    property_experience: { status: "locked_by_plan", locked: true, entry: { entitled: false, state: "locked_addon" }, classification: "AUTOMATED" },
    ready: { readiness: { activatable: false, blocked_mandatory: ["communication"], blocked_features: ["property_experience"] } },
  }),
  // 4. Locked by plan: voice, social and property experience not entitled; everything else done.
  build({
    account: { status: "completed" },
    agency: { status: "completed" },
    branding: { status: "completed" },
    team: { status: "completed", active_employees: 2 },
    communication: { status: "completed", channels: { email: true, whatsapp: true, whatsapp_pending: false, voice_locked: true } },
    lead_acquisition: { status: "locked_by_plan", locked: true, classification: "AUTOMATED", paid: { plan: { entitled: false } } },
    crm: { status: "completed", external_crm: false, connected: true, classification: "AUTOMATED" },
    property_source: { status: "completed", accepts_scraped_owned_inventory: true },
    property_experience: { status: "locked_by_plan", locked: true, entry: { entitled: false, state: "locked_addon" }, classification: "AUTOMATED" },
    ready: { status: "completed", readiness: { activatable: true, blocked_mandatory: [], blocked_features: ["lead_acquisition", "property_experience"] } },
  }, { plan: "essential" }),
  // 5. Optional steps skipped: lead acquisition and property experience optional; ready pending one item.
  build({
    account: { status: "completed" },
    agency: { status: "completed" },
    branding: { status: "needs_action" },
    team: { status: "completed", active_employees: 1 },
    communication: { status: "completed", channels: { email: true, whatsapp: true, whatsapp_pending: false, voice_locked: false } },
    lead_acquisition: { status: "optional", classification: "PROVIDER_ACTION", paid: { plan: { entitled: true } } },
    crm: { status: "completed", external_crm: false, connected: true, classification: "AUTOMATED" },
    property_source: { status: "completed", accepts_scraped_owned_inventory: true },
    property_experience: { status: "optional", entry: { entitled: true, state: "available", action: "create" }, classification: "CUSTOMER_ACTION" },
    ready: { readiness: { activatable: false, blocked_mandatory: ["branding"], blocked_features: [] } },
  }, { plan: "scale" }),
  // 6. Ready to go live.
  build({
    account: { status: "completed" },
    agency: { status: "completed" },
    branding: { status: "completed" },
    team: { status: "completed", active_employees: 4 },
    communication: { status: "completed", channels: { email: true, whatsapp: true, whatsapp_pending: false, voice_locked: false } },
    lead_acquisition: { status: "completed", classification: "PROVIDER_ACTION", paid: { plan: { entitled: true }, meta_lead_ads: { connected: true, ready: true }, google_lead_forms: { connected: true, ready: true } } },
    crm: { status: "completed", external_crm: false, connected: true, classification: "AUTOMATED" },
    property_source: { status: "completed", accepts_scraped_owned_inventory: true },
    property_experience: { status: "completed", entry: { entitled: true, state: "available" }, classification: "CUSTOMER_ACTION" },
    ready: { status: "completed", readiness: { activatable: true, blocked_mandatory: [], blocked_features: [] } },
  }, { plan: "scale" }),
];

export function onboardingCase(n: number): OnboardingState {
  const i = Math.min(Math.max(n, 1), onboardingCases.length) - 1;
  return onboardingCases[i];
}

export const trialStub: TrialState = {
  status: "trialing",
  plan: "growth",
  trial_end: new Date(Date.now() + 9 * 86400000).toISOString(),
  days_left: 9,
  account_state: "trialing",
};

/** Plans: code, display_name, entitlements_summary only. No price exists anywhere. */
export const plansStub: Plan[] = [
  { code: "essential", display_name: "Essential (stub)", entitlements_summary: ["CRM", "Lead Engine", "Automatic replies", "Basic follow up", "Property matching", "Core reporting"] },
  { code: "growth", display_name: "Growth (stub)", entitlements_summary: ["Everything in Essential", "Daily Assistant", "Advanced reporting"] },
  { code: "scale", display_name: "Scale (stub)", entitlements_summary: ["Everything in Growth", "Higher limits", "Property Experience quota", "Larger agency capacity"] },
];

export const entitlementsStub: EntitlementSnapshot = {
  features: { "px.experience": "denied", "social.publish": "denied", assistant: "enabled" },
  account_state: "trialing",
};
