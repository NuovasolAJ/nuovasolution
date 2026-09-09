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
  entry?: { entitled: boolean; state: "available" | "locked_addon"; action?: string };
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

/** Display names, MF-11 and AF-04. Internal identifiers are never rendered. */
export const providerDisplayNames: Record<string, string> = {
  hubspot: "HubSpot",
  pipedrive: "Pipedrive",
  zoho: "Zoho CRM",
  salesforce: "Salesforce",
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
