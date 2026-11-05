import type { Locale } from "@/lib/i18n/config";

/**
 * THE ONE PLACE for every status the public pages show (the owner's order of 05.11.2026, point 7): what is included today, what
 * comes next, what a plan leaves out. On launch day one commit here turns a key from "soon" to "included" and every surface
 * (the home page's functions, the plans table, /packages, the demonstration's state lines, the report's foot, the 3D stage,
 * the entry buttons) follows. The ceiling is governance/API_CLAIMS_LINES_1102_v1.md (API, 02.11.): "Disponible" only where
 * production allows it; no prices; no public sign-up promise; WhatsApp only as our own agency's channel.
 *
 * Words (the owner, 05.11.): "Incluido" clearly, "Próximamente" quietly, "No incluido" where a plan leaves a function out,
 * "Por encargo" kept for 3D once it is accepted (not used today).
 */
export type ClaimState = "included" | "soon" | "excluded" | "order";
type L = Record<Locale, string>;

export const claimWords: Record<ClaimState, L> = {
  included: { es: "Incluido", en: "Included" },
  soon: { es: "Próximamente", en: "Coming soon" },
  excluded: { es: "No incluido", en: "Not included" },
  order: { es: "Por encargo", en: "To order" },
};

/** The functions, each with its state today. Keys are stable; surfaces reference them. */
export const claims = {
  replySpanish: "included",        // replies in Spanish on WhatsApp (our own agency's channel) and Gmail — register, Channels (P)
  whatsappOwnNumber: "soon",       // WhatsApp with the agency's own number — multi-agency path not passed
  otherLanguages: "soon",          // replies in other languages — SPRACHEN S2 + v3
  languageNoted: "included",       // the customer's language recognised and kept on the record (the held case of a German e-mail)
  phoneAssistant: "soon",          // prototype (S)
  webform: "soon",                 // prototype
  instagram: "soon",               // depends on the platform's approval
  crm: "included",                 // built-in CRM: records and history — register, CRM (P)
  oneRecordAcrossChannels: "soon", // one record per person across WhatsApp and e-mail — Lead's proof on v3
  priorityWithReason: "included",  // the priority as a category with its reason, on the record (shown in every demonstration)
  alert: "soon",                   // the alert to the right person — held back in production (HA1, fix in v3)
  taskList: "soon",                // the task list and the morning assistant — Release U after E1
  matching: "soon",                // proposals from the agency's own portfolio — implemented, not switched on for any agency
  followup: "soon",                // follow-ups with the customer's permission
  labels: "included",              // automatic labels in the mailbox — Gmail labels (register, Channels)
  origin: "soon",                  // the enquiry's origin (portal, ad, website) on the record — lead intake after the launch
  reportInLogin: "included",       // the report in the agency's login — register, Packages / reporting.basic
  weeklyEmail: "soon",             // the weekly e-mail summary — proven for our own agency only (W44)
  reportTrend: "soon",             // the report with trend and channels — reporting.advanced
  integrations: "soon",            // HubSpot, Pipedrive, Zoho, Salesforce, Outlook — certified on staging, no production connection
  adsLeads: "soon",                // leads from the agency's existing ads — after the launch
  model3d: "soon",                 // 3D models — until T6 is accepted and scope and price per order are fixed ("order" then)
  trial: "soon",                   // the 14-day trial — not before the production onboarding core (E28-Prod P4 + owner)
  publicSignup: "soon",            // public registration — not released (owner's registration line + new site live)
} as const satisfies Record<string, ClaimState>;

export type ClaimKey = keyof typeof claims;

export const claim = (key: ClaimKey): ClaimState => claims[key];
export const claimWord = (key: ClaimKey, locale: Locale): string => claimWords[claims[key]][locale];
export const isIncluded = (key: ClaimKey): boolean => claims[key] === "included";

/** The plans (Copy 1102 v2 §6.1): which plan carries which function. A function a plan does not carry is "No incluido"; the others show the function's own state. */
export type PlanCode = "essential" | "growth" | "enterprise";
export const planRows: { key: ClaimKey; plans: PlanCode[] }[] = [
  { key: "replySpanish", plans: ["essential", "growth", "enterprise"] },
  { key: "whatsappOwnNumber", plans: ["essential", "growth", "enterprise"] },
  { key: "otherLanguages", plans: ["essential", "growth", "enterprise"] },
  { key: "phoneAssistant", plans: ["growth", "enterprise"] },
  { key: "instagram", plans: ["enterprise"] },
  { key: "crm", plans: ["essential", "growth", "enterprise"] },
  { key: "oneRecordAcrossChannels", plans: ["essential", "growth", "enterprise"] },
  { key: "alert", plans: ["essential", "growth", "enterprise"] },
  { key: "taskList", plans: ["growth", "enterprise"] },
  { key: "matching", plans: ["growth", "enterprise"] },
  { key: "reportInLogin", plans: ["essential", "growth", "enterprise"] },
  { key: "weeklyEmail", plans: ["essential", "growth", "enterprise"] },
  { key: "reportTrend", plans: ["growth", "enterprise"] },
  { key: "integrations", plans: ["essential", "growth", "enterprise"] },
  { key: "adsLeads", plans: ["growth", "enterprise"] },
  { key: "model3d", plans: ["essential", "growth", "enterprise"] },
];

export const planCell = (key: ClaimKey, plan: PlanCode): ClaimState => (planRows.find((r) => r.key === key)?.plans.includes(plan) ? claims[key] : "excluded");

/** The entry action of the whole site: the trial once it is live in production, access by invitation until then (owner 05.11., point 10). */
export const entryAction = (locale: Locale): { label: string; href: string } =>
  isIncluded("trial") && isIncluded("publicSignup")
    ? { label: locale === "es" ? "Pruébalo gratis" : "Try it free", href: "/signup" }
    : { label: locale === "es" ? "Pedir acceso" : "Request access", href: "/contact" };
