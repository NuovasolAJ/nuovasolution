import type { Locale } from "@/lib/i18n/config";

/**
 * THE ONE PLACE for every status the public pages follow (the owner's order of 05.11.2026, point 7; Copy's handover 1105 v3 §1 and
 * §15 are the register of these states): what is included today, what comes next, what a plan leaves out. On launch day one commit
 * here turns a key from "soon" to "included" and every surface (the home page's scenes, the plans, /packages, the demonstration's
 * channels, the report's blocks, the 3D stage, the entry buttons, the FAQ, the platform rows) follows. The ceiling is
 * governance/API_CLAIMS_LINES_1102_v1.md (API, 02.11.): "Disponible" only where production allows it; no prices; no public
 * sign-up promise; WhatsApp only as our own agency's channel.
 *
 * The owner's verdict of 06.11.2026 and Copy's addendum §14: no status word stands on the page any more. Two views, one switch
 * (`ClaimView`, resolved per request in lib/view.ts; a live build is always "public"):
 *   "target"  the preview's target state: every sentence as if the function were live;
 *   "public"  the public build: strictly this file — what is not "included" is not shown at all (scene, row, chip, sentence,
 *             channel, block, section), with the public wording Copy gives for the keys that are off.
 * `claimWords` stay for the audit and for aria labels; none of them is rendered as visible text.
 */
export type ClaimState = "included" | "soon" | "excluded" | "order";
export type ClaimView = "target" | "public";
type L = Record<Locale, string>;

export const claimWords: Record<ClaimState, L> = {
  included: { es: "Incluido", en: "Included" },
  soon: { es: "Próximamente", en: "Coming soon" },
  excluded: { es: "No incluido", en: "Not included" },
  order: { es: "Por encargo", en: "To order" },
};
/** The plans table's cell words for screen readers (Copy 1107 D-2: no status word, not even in an aria-label). */
export const planCellWords: Record<"in" | "out", L> = {
  in: { es: "En este plan", en: "In this plan" },
  out: { es: "No en este plan", en: "Not in this plan" },
};

/** The functions, each with its state today (Copy 1105 v3 §1 and §15, key in brackets). Keys are stable; surfaces reference them. */
export const claims = {
  replyWhatsapp: "included",       // (replies, §15) replies in Spanish on WhatsApp (our own agency's channel) — Channels P
  replyEmail: "included",          // (replies, §15) replies in Spanish by e-mail (Gmail) — Channels P
  replyOutOfHours: "included",     // (§15) the reply goes out when the message arrives; the public claim needs its own evidence (§1b)
  whatsappOwnNumber: "soon",       // (wa_own_number) multi-agency WhatsApp path not passed
  languageNoted: "included",       // (language_detect) the language recognised and kept; if not Spanish nothing is sent automatically — Q-3
  otherLanguages: "soon",          // (other_languages) SPRACHEN-NEU: ES + EN + DE, each with its evidence; not shown in either view until then (§14)
  mailboxConnection: "soon",       // (§15) connecting the agency's mailbox with the agency (D5-DIREKT)
  crm: "included",                 // (record) the record in the built-in CRM — CRM P
  priorityWithReason: "included",  // (priority) the priority with its reason on the record — qualification active in prod
  alert: "soon",                   // (alert) held back in production (HA1); V3-DEPLOY + prod probe with a real alert
  origin: "included",              // (origin) the channel of origin on the record: WhatsApp or e-mail — channels P
  adsLeads: "soon",                // (ad_leads) leads from portals and ads — staging, no real delivery
  labels: "included",              // (labels) labels in the agency's mailbox — Gmail labels P
  oneRecordAcrossChannels: "soon", // (one_record_per_person) Lead's proof on v3 + V3-DEPLOY
  matching: "soon",                // (matching) pm_certified = false
  followup: "soon",                // (followup) prod sender inactive
  taskList: "soon",                // (team_list) Release U after E1
  dailyVoice: "soon",              // (daily_voice) staff app staging (DAILY-A); Release U + owner
  reportInLogin: "included",       // (report_login) report access in prod
  weeklyEmail: "soon",             // (report_mail) W44: own agency only
  reportTrend: "soon",             // (report_extended) extended tier empty in prod: the trend, the channels and the insights
  instagram: "soon",               // (social_posting) staging, never published at Meta
  phoneAssistant: "soon",          // (phone) staging prototype
  webform: "soon",                 // the web form: prototype (the demonstration's third channel)
  integrations: "soon",            // (crm_external) HubSpot, Pipedrive, Zoho, Salesforce — not in prod
  outlook: "soon",                 // (§15) Outlook, split from integrations: its own path (O4, MM)
  model3d: "soon",                 // (model3d) T6 not accepted; "order" once scope and price per order are fixed
  plans: "soon",                   // (§15) plan names and the comparison table: production has no package system yet (E28-Prod P4)
  trial: "soon",                   // (signup) the 14-day trial — not before the production onboarding core (E28-Prod P4 + owner)
  publicSignup: "soon",            // (signup) public registration — not released (owner's registration line + new site live)
} as const satisfies Record<string, ClaimState>;

export type ClaimKey = keyof typeof claims;

export const claim = (key: ClaimKey): ClaimState => claims[key];
export const claimWord = (key: ClaimKey, locale: Locale): string => claimWords[claims[key]][locale];
export const isIncluded = (key: ClaimKey): boolean => claims[key] === "included";
/** Copy §15: `replySpanish` means either of the two reply channels. */
export const replySpanish = (): boolean => isIncluded("replyWhatsapp") || isIncluded("replyEmail");

/** Whether the keys read as live in a view: everything in the target view, only what is included in the public one. */
export const live = (keys: ClaimKey | ClaimKey[], view: ClaimView): boolean => view === "target" || (Array.isArray(keys) ? keys : [keys]).every(isIncluded);
/** Whether a surface bound to its keys is shown in a view. */
export const shows = live;

/**
 * The channel list ⟦canales⟧ of Copy §15: every sentence that names channels builds them from the keys, in this order, with "y" / "and"
 * before the last. In the target view every channel; in the public view the channels that are included.
 */
const CHANNELS: { key: ClaimKey; es: string; en: string }[] = [
  { key: "replyWhatsapp", es: "WhatsApp", en: "WhatsApp" },
  { key: "replyEmail", es: "email", en: "e-mail" },
  { key: "webform", es: "formulario web", en: "web form" },
  { key: "phoneAssistant", es: "teléfono", en: "phone" },
  { key: "adsLeads", es: "portales y anuncios", en: "portals and ads" },
];
export const channelKeys = (view: ClaimView): ClaimKey[] => CHANNELS.filter((c) => live(c.key, view)).map((c) => c.key);
export const channelList = (locale: Locale, view: ClaimView): string => {
  const names = CHANNELS.filter((c) => live(c.key, view)).map((c) => c[locale]);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} ${locale === "es" ? "y" : "and"} ${names[names.length - 1]}`;
};
/** Fills ⟦canales⟧ in a Copy sentence. */
export const withChannels = (text: string, locale: Locale, view: ClaimView): string => text.replace(/⟦canales⟧/g, channelList(locale, view));

/** The plans (Copy 1105 v3 §9): which plan carries which row. A row a plan does not carry is "excluded"; the others show the row's own state. */
export type PlanCode = "essential" | "growth" | "enterprise";
const ALL: PlanCode[] = ["essential", "growth", "enterprise"];
const GE: PlanCode[] = ["growth", "enterprise"];
const E: PlanCode[] = ["enterprise"];
export const planRows: { key: ClaimKey; plans: PlanCode[] }[] = [
  { key: "replyWhatsapp", plans: ALL },
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

/** One cell of the plans table in a view: "included" where the plan carries the row (the target view treats every row as live), "excluded" where it does not. */
export const planCell = (key: ClaimKey, plan: PlanCode, view: ClaimView = "target"): ClaimState => {
  const carried = planRows.find((r) => r.key === key)?.plans.includes(plan) ?? false;
  if (!carried) return "excluded";
  return view === "target" ? "included" : claims[key];
};
export const planRowShown = (key: ClaimKey, view: ClaimView): boolean => live(key, view);
/** Copy §20 P-5: the comparison table stands only with `plans` on; otherwise one block "Qué incluye" with the rows that are on. */
export const plansTableShown = (view: ClaimView): boolean => live("plans", view);

/**
 * The entry action of the whole site (Copy 1105 v3 §9 and §16 H-5/H-6, §20; the owner's point 14 of 06.11.): the trial in the target view
 * and once registration and the trial are live in production, access by invitation until then.
 */
export const trialCta: { label: L; line: L } = {
  label: { es: "Pruébalo gratis 14 días", en: "Try it free for 14 days" },
  line: { es: "Sin método de pago y sin renovación automática.", en: "No payment method and no automatic renewal." },
};
export const accessWords: { label: L; line: L; nav: L } = {
  label: { es: "Pedir acceso", en: "Request access" },
  line: { es: "Acceso por invitación.", en: "Access by invitation." },
  nav: { es: "Acceso", en: "Access" },
};
export const trialLive = (view: ClaimView): boolean => live(["trial", "publicSignup"], view);
export const entryAction = (locale: Locale, view: ClaimView = "public"): { label: string; href: string; line: string; nav: string; kind: "trial" | "access" } =>
  trialLive(view)
    ? { label: trialCta.label[locale], href: "/signup", line: trialCta.line[locale], nav: locale === "es" ? "Prueba" : "Trial", kind: "trial" }
    : { label: accessWords.label[locale], href: "/contact", line: accessWords.line[locale], nav: accessWords.nav[locale], kind: "access" };
