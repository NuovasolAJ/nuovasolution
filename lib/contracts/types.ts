/**
 * Types transcribed from backend export v2 (§F, §G) and the AF addendum.
 * The website defines no business rule here. It consumes these shapes.
 */

export interface Envelope<T = unknown> {
  ok: boolean;
  code: string;
  message: string;
  details?: T;
  request_id?: string;
  /** Present only on locally stubbed responses. Never sent by a real backend. */
  stub?: true;
}

export type StepKey =
  | "account"
  | "agency"
  | "branding"
  | "team"
  | "communication"
  | "lead_acquisition"
  | "crm"
  | "property_source"
  | "property_experience"
  | "ready";

export type StepStatus = "completed" | "needs_action" | "externally_pending" | "optional" | "locked_by_plan";
export type ConnectorStatus = "connected" | "degraded" | "action_required";
export type Classification = "OWNER_ACTION" | "PROVIDER_ACTION" | "CUSTOMER_ACTION" | "AUTOMATED";

export interface PaidSource {
  connected: boolean;
  ready: boolean;
}

/** Per-step safe detail, exactly as enumerated in v2 §G. Fields not returned are not shown. */
export interface StepDetail {
  active_employees?: number;
  channels?: { email?: boolean; whatsapp?: boolean; whatsapp_pending?: boolean; voice_locked?: boolean; calendar?: boolean };
  paid?: { plan?: { entitled: boolean }; google_lead_forms?: PaidSource; meta_lead_ads?: PaidSource; click_to_whatsapp?: PaidSource };
  external_crm?: boolean;
  connected?: boolean;
  crm_provider?: "hubspot" | "pipedrive" | "zoho" | "salesforce";
  accepts_scraped_owned_inventory?: boolean;
  entry?: { entitled: boolean; state: "available" | "locked_addon"; action?: string; tours?: { used: number; quota: number; remaining: number; entitled: boolean } };
  /** Backend-authored notices for the branding step (seen on staging 2026-09-21). Rendered in the active language. */
  disclosures?: { key: string; title: string; body: string; body_es?: string; applies: boolean; severity?: string; shown_in_customer_emails?: boolean }[];
  readiness?: { activatable: boolean; blocked_mandatory: string[]; blocked_features: string[] };
}

export interface WizardStep extends StepDetail {
  step: number;
  key: StepKey;
  title: string;
  status: StepStatus;
  classification: Classification;
  locked: boolean;
}

export interface OnboardingState {
  client_id: string;
  exists: boolean;
  agency_name: string;
  plan: string | null;
  trial_end: string | null;
  resume_step: StepKey;
  completed_steps: number;
  total_steps: number;
  needs_action_steps: number;
  percent_complete: number;
  activatable: boolean;
  legend: Record<StepStatus, string>;
  steps: WizardStep[];
}

export type TrialStatus = "trialing" | "trial_expired" | "active" | "past_due" | "suspended" | "canceled";

export interface TrialState {
  status: TrialStatus;
  plan: string | null;
  trial_end: string | null;
  days_left: number;
  account_state: string;
}

export interface Plan {
  code: "essential" | "growth" | "scale";
  display_name: string;
  entitlements_summary: string[];
}

export interface EntitlementSnapshot {
  features: Record<string, "enabled" | "deferred" | "denied">;
  account_state: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  language: "en" | "es";
  agency_name: string;
}

export interface SignupResponse {
  ok: true;
  next: "onboarding";
  session?: boolean;
}

/**
 * CRM catalog entry, exactly as crm_provider_catalog() returns it on staging
 * (read 2026-09-21T12:49:30Z). The backend `note` is English only and carries
 * dashes, so it is never rendered: the website renders its own EN/ES line per
 * availability. Contract: governance/CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md.
 */
export type CrmAvailability = "available" | "coming_soon" | "unavailable";
export interface CrmCatalogEntry {
  provider: string;
  display_name: string;
  availability: CrmAvailability;
  selectable: boolean;
  is_default: boolean;
  live_wired: boolean;
  sort: number;
  note?: string;
}

/**
 * What the website can honestly say about the current CRM choice.
 * `source` says where the statement comes from, so the UI never claims more
 * than was actually read back.
 */
export interface CrmSelection {
  /** Provider the tenant is on as CRM of record, when known. */
  of_record: "nuovasolution" | null;
  /** Additional selection known to the website (e.g. google_sheets), or null when it cannot be read back. */
  selected: string | null;
  /** Interest recorded for an external CRM that is not live yet. */
  interest: string | null;
  source: "stub" | "wizard_state" | "select_response" | "crm_current";
  /** True once the agency made a CRM choice itself (crm.current `explicitly_chosen`), including "No external CRM". */
  explicitly_chosen?: boolean;
  /** Google Sheets connection, from tenant-api crm.current `connection.status`. Never inferred from the choice. */
  sheets_connected?: boolean;
  /** True when the backend offers no read of the additional selection (see IMPLEMENTATION record, interface question CRM-READ-1). */
  selection_not_readable: boolean;
}

/** Display names, MF-11 and AF-04. Internal identifiers are never rendered. */
export const providerDisplayNames: Record<string, string> = {
  nuovasolution: "Nuova CRM",
  google_sheets: "Google Sheets",
  hubspot: "HubSpot",
  pipedrive: "Pipedrive",
  zoho: "Zoho CRM",
  salesforce: "Salesforce",
  gohighlevel: "GoHighLevel",
  dynamics: "Microsoft Dynamics",
  airtable: "Airtable",
  google_lead_forms: "Google Lead Forms",
  google_lead_form: "Google Lead Forms",
  meta_lead_ads: "Meta Lead Ads",
  click_to_whatsapp: "Click-to-WhatsApp",
  email: "Gmail",
  whatsapp: "WhatsApp",
  calendar: "Google Calendar",
  // voice stays generic by rule; the carrier is never rendered
  voice: "Voice",
};
