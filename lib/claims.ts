import type { Locale } from "@/lib/i18n/config";

/**
 * THE ONE PLACE for every status the public pages show (the owner's order of 05.11.2026, point 7; Copy's handover 1105 v3 §1 is
 * the register of these states): what is included today, what comes next, what a plan leaves out. On launch day one commit here
 * turns a key from "soon" to "included" and every surface (the home page's scenes, the plans table, /packages, the
 * demonstration's marks, the report's foot, the 3D stage, the entry buttons) follows. The ceiling is
 * governance/API_CLAIMS_LINES_1102_v1.md (API, 02.11.): "Disponible" only where production allows it; no prices; no public
 * sign-up promise; WhatsApp only as our own agency's channel.
 *
 * Words (Copy 1105 v3 §1; the owner, 05.11.): "Incluido" clearly, "Próximamente" quietly (it replaces "En preparación",
 * "Prototipo", "Implementado; todavía sin activar"), "No incluido" only in the plans table, "Por encargo" kept for 3D once it is
 * accepted (not used today).
 */
export type ClaimState = "included" | "soon" | "excluded" | "order";
type L = Record<Locale, string>;

export const claimWords: Record<ClaimState, L> = {
  included: { es: "Incluido", en: "Included" },
  soon: { es: "Próximamente", en: "Coming soon" },
  excluded: { es: "No incluido", en: "Not included" },
  order: { es: "Por encargo", en: "To order" },
};

/** The functions, each with its state today (Copy 1105 v3 §1, key in brackets). Keys are stable; surfaces reference them. */
export const claims = {
  replySpanish: "included",        // (replies) replies in Spanish on WhatsApp (our own agency's channel) and Gmail — Channels P
  whatsappOwnNumber: "soon",       // (wa_own_number) multi-agency WhatsApp path not passed
  languageNoted: "included",       // (language_detect) the language recognised and kept; if not Spanish nothing is sent automatically — Q-3
  otherLanguages: "soon",          // (other_languages) SPRACHEN S2 + v3 in prod
  crm: "included",                 // (record) the record in the built-in CRM — CRM P
  priorityWithReason: "included",  // (priority) the priority with its reason on the record — qualification active in prod
  alert: "soon",                   // (alert) held back in production (HA1); V3-DEPLOY + prod probe with a real alert
  origin: "included",              // (origin) the channel of origin on the record: WhatsApp or e-mail — channels P
  adsLeads: "soon",                // (ad_leads) leads from portals and ads — staging, no real delivery
  labels: "included",              // (labels) labels in the mailbox we operate for the agency — Gmail labels P
  oneRecordAcrossChannels: "soon", // (one_record_per_person) Lead's proof on v3 + V3-DEPLOY
  matching: "soon",                // (matching) pm_certified = false
  followup: "soon",                // (followup) prod sender inactive
  taskList: "soon",                // (team_list) Release U after E1
  dailyVoice: "soon",              // (daily_voice) staff app staging (DAILY-A); Release U + owner
  reportInLogin: "included",       // (report_login) report access in prod
  weeklyEmail: "soon",             // (report_mail) W44: own agency only
  reportTrend: "soon",             // (report_extended) extended tier empty in prod
  instagram: "soon",               // (social_posting) staging, never published at Meta
  phoneAssistant: "soon",          // (phone) staging prototype
  webform: "soon",                 // the web form: prototype (the demonstration's third channel)
  integrations: "soon",            // (crm_external) HubSpot, Pipedrive, Zoho, Salesforce, Outlook — not in prod
  model3d: "soon",                 // (model3d) T6 not accepted; "order" once scope and price per order are fixed
  trial: "soon",                   // (signup) the 14-day trial — not before the production onboarding core (E28-Prod P4 + owner)
  publicSignup: "soon",            // (signup) public registration — not released (owner's registration line + new site live)
} as const satisfies Record<string, ClaimState>;

export type ClaimKey = keyof typeof claims;

export const claim = (key: ClaimKey): ClaimState => claims[key];
export const claimWord = (key: ClaimKey, locale: Locale): string => claimWords[claims[key]][locale];
export const isIncluded = (key: ClaimKey): boolean => claims[key] === "included";

/** The plans (Copy 1105 v3 §9): which plan carries which row. A row a plan does not carry is "No incluido"; the others show the row's own state. */
export type PlanCode = "essential" | "growth" | "enterprise";
const ALL: PlanCode[] = ["essential", "growth", "enterprise"];
const GE: PlanCode[] = ["growth", "enterprise"];
const E: PlanCode[] = ["enterprise"];
export const planRows: { key: ClaimKey; plans: PlanCode[] }[] = [
  { key: "replySpanish", plans: ALL },
  { key: "languageNoted", plans: ALL },
  { key: "labels", plans: ALL },
  { key: "whatsappOwnNumber", plans: ALL },
  { key: "otherLanguages", plans: ALL },
  { key: "phoneAssistant", plans: GE },
  { key: "instagram", plans: E },
  { key: "crm", plans: ALL },
  { key: "priorityWithReason", plans: ALL },
  { key: "oneRecordAcrossChannels", plans: ALL },
  { key: "alert", plans: ALL },
  { key: "taskList", plans: GE },
  { key: "matching", plans: GE },
  { key: "followup", plans: GE },
  { key: "reportInLogin", plans: ALL },
  { key: "weeklyEmail", plans: ALL },
  { key: "reportTrend", plans: GE },
  { key: "integrations", plans: ALL },
  { key: "adsLeads", plans: GE },
  { key: "model3d", plans: ALL },
];

export const planCell = (key: ClaimKey, plan: PlanCode): ClaimState => (planRows.find((r) => r.key === key)?.plans.includes(plan) ? claims[key] : "excluded");

/**
 * The entry action of the whole site (Copy 1105 v3 §9, "Pruébalo gratis" as a prepared switch only): the trial once registration
 * and the trial are live in production, access by invitation until then (owner 05.11., point 10).
 */
export const trialCta: { label: L; line: L } = {
  label: { es: "Pruébalo gratis 14 días", en: "Try it free for 14 days" },
  line: { es: "Sin método de pago y sin renovación automática.", en: "No payment method and no automatic renewal." },
};
export const entryAction = (locale: Locale): { label: string; href: string } =>
  isIncluded("trial") && isIncluded("publicSignup")
    ? { label: trialCta.label[locale], href: "/signup" }
    : { label: locale === "es" ? "Pedir acceso" : "Request access", href: "/contact" };
