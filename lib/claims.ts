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
export const planCellWords: Record<"in" | "out" | "optional", L> = {
  in: { es: "En este plan", en: "In this plan" },
  out: { es: "No en este plan", en: "Not in this plan" },
  optional: { es: "Opcional", en: "Optional" }, // the owner's word of 16.11. for the separately bookable 3D service (WORKING until Copy confirms)
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
  listingLink: "included",         // (owner 16.11. 14:00, "Prod 13.11.") the assistant reads the listing link a customer sends; API's claims line pending (D10)
  reminders: "included",           // (owner 16.11. 14:00, "Prod 13.11.") reminder after 1 h, escalation after 2 h when nobody answers; API's claims line pending (D10)
  webform: "soon",                 // the web form: prototype (the demonstration's third channel)
  integrations: "soon",            // (crm_external) HubSpot, Pipedrive, Zoho, Salesforce — not in prod
  outlook: "soon",                 // (§15) Outlook, split from integrations: its own path (O4, MM)
  model3d: "soon",                 // (model3d) T6 not accepted; "order" once scope and price per order are fixed
  plans: "soon",                   // (§15) plan names and the comparison table: production has no package system yet (E28-Prod P4)
  trial: "soon",                   // (signup) the 14-day trial — not before the production onboarding core (E28-Prod P4 + owner)
  publicSignup: "soon",            // (signup) public registration — not released (owner's registration line + new site live)
} as const satisfies Record<string, ClaimState>;

export type ClaimKey = keyof typeof claims;

/**
 * The owner's rule of 16.11.2026 (evening, verdict on 3c2a413): the preview shows EVERYTHING in both views — all four demonstration
 * channels, the 3D section, every graphic, both extra cards; no "Próximamente", nothing left out. ONE switch per function:
 *   "live"  shown without a sign (today: every function);
 *   "soon"  the public view treats the function as not live — hidden, or Copy's public wording where one exists.
 * On the day before go-live RV6 and the owner flip only the functions that are not in production then; nothing else has to be rebuilt.
 * The `claims` register above stays API's record of what is in production (the audit's ceiling); this map is the public view's gate.
 *
 * The owner, 20.11.: what is not live today gets a visible mark — the phone assistant, social posts, clients from ads and forms,
 * bringing contacts back, listing proposals — with Copy's wording (COPY_TO_REDESIGN_1120_HERO_PROXIMAMENTE_PLANFOLD_v1.md, 8cbe48c +
 * 19b5523) and the register's state of today: those five keys stand on "soon". The public (gate) view is the preview's default
 * since then (VIEW_DEFAULT in lib/view-query.ts); `?view=target` still shows the finished product.
 */
export const publicGate: Record<ClaimKey, "live" | "soon"> = {
  replyWhatsapp: "live",
  replyEmail: "live",
  replyOutOfHours: "live",
  whatsappOwnNumber: "soon", // the owner, 20.11. 09:05 (3): until he releases it
  languageNoted: "live",
  otherLanguages: "live", // the owner, 20.11. 09:05 (4): hidden in BOTH views (HIDDEN_BOTH below), so the gate word does not matter
  mailboxConnection: "soon", // API cee6992 (20.11.): no mailbox register in prod, a pilot agency's mailbox comes with A12 (Tue 24.11. at the earliest)
  crm: "live",
  priorityWithReason: "live",
  alert: "soon", // the owner, 20.11. 09:05 (3): until he releases it (HA1)
  origin: "live",
  adsLeads: "soon", // the owner, 20.11. (clients from ads and forms)
  labels: "live",
  oneRecordAcrossChannels: "soon", // API cee6992: in prod only for nuovasolution, pilot_test_a has no channel
  matching: "soon", // the owner, 20.11. (listing proposals)
  followup: "soon", // the owner, 20.11. (bringing contacts back / follow-up)
  taskList: "soon", // API cee6992: 0 tasks for pilot_test_a, none without a connected mailbox
  dailyVoice: "soon", // API cee6992: dg_jarvis_action_log has 0 rows
  reportInLogin: "live",
  weeklyEmail: "soon", // API cee6992: weekly reports only to the own agency (15 delivered)
  reportTrend: "soon", // API cee6992: the delivered report has no trend, channel comparison or insights
  instagram: "soon", // the owner, 20.11. (social posts)
  phoneAssistant: "soon", // the owner, 20.11. (the phone assistant)
  listingLink: "live",
  reminders: "live",
  webform: "soon", // API cee6992: the web form as a third channel is not connected in prod
  integrations: "soon", // API cee6992: no provider with a prod sync (Google Sheets connected, never synced; the others revoked/pending)
  outlook: "soon", // API cee6992: prod reads no agency's Outlook mailbox (proven on staging only, A12 line 4)
  model3d: "soon", // API cee6992: no 3D order and no table in prod; T6 not accepted
  plans: "live",
  trial: "live",
  publicSignup: "live",
};
/** True while every gate is "live": the public view is the target view. */
export const publicShowsAll = (): boolean => (Object.keys(publicGate) as ClaimKey[]).every((k) => publicGate[k] === "live");

export const claim = (key: ClaimKey): ClaimState => claims[key];
export const claimWord = (key: ClaimKey, locale: Locale): string => claimWords[claims[key]][locale];
export const isIncluded = (key: ClaimKey): boolean => claims[key] === "included";
/** Copy §15: `replySpanish` means either of the two reply channels. */
export const replySpanish = (): boolean => isIncluded("replyWhatsapp") || isIncluded("replyEmail");

/** Whether the keys read as live in a view: everything in the target view, only what is included in the public one. */
/** The owner, 20.11. 09:05 (4): `otherLanguages` stays hidden in BOTH views (the register's note of §14: ES + EN + DE each with its evidence first). */
export const HIDDEN_BOTH: ClaimKey[] = ["otherLanguages"];
export const live = (keys: ClaimKey | ClaimKey[], view: ClaimView): boolean => { const ks = Array.isArray(keys) ? keys : [keys]; if (ks.some((k) => HIDDEN_BOTH.includes(k))) return false; return view === "target" || ks.every((k) => publicGate[k] === "live"); }; // 16.11. evening: the public view follows the gate, not the register
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
/** The owner's E2 of 07.11., extended 16.11. (RV6 F22 b): a held-back function is not promised in either view — not in the plans, not in the channel list, not in the FAQ. */
export const offered = (keys: ClaimKey | ClaimKey[], view: ClaimView): boolean => live(keys, view) && (Array.isArray(keys) ? keys : [keys]).every((k) => !HELD_BACK.includes(k) || isIncluded(k));
/** The owner, 17.11.: the site shows the finished product — Instagram, the phone assistant and the agency's own number included; E2's list is empty, the gate (`publicGate`) decides on the switch day. */
const HELD_BACK: ClaimKey[] = [];
/**
 * Copy 1116 (RV6 F22 b): the channel list ⟦canales⟧ names only the channels that are included today ("por WhatsApp y email" in the target
 * view). Copy 1116 §10 W-1 (the owner's point 6): WhatsApp replies run on NuovaSolution's own number until the agency's number is
 * registered with Meta (topic 20), so the PUBLIC view names email only while `whatsappOwnNumber` is off.
 */
const channelOn = (key: ClaimKey, view: ClaimView): boolean => isIncluded(key) && (view === "target" || key !== "replyWhatsapp" || publicGate.whatsappOwnNumber === "live");
export const channelKeys = (view: ClaimView): ClaimKey[] => CHANNELS.filter((c) => channelOn(c.key, view)).map((c) => c.key);
export const channelList = (locale: Locale, view: ClaimView): string => {
  const names = CHANNELS.filter((c) => channelOn(c.key, view)).map((c) => c[locale]);
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
  // the owner's decision of 16.11.: 3D is a separately bookable service — "Opcional" in all three columns, never a tick
  if (key === "model3d") return "order";
  const carried = planRows.find((r) => r.key === key)?.plans.includes(plan) ?? false;
  if (!carried) return "excluded";
  return live(key, view) ? "included" : claims[key];
};
/**
 * Every row of the register stands in both views (the owner, 20.11.: what is not live gets a VISIBLE mark — Copy 1116 §1 point 4: the
 * cell of a switched-off function shows "Próximamente", not a tick and not a dash, and the legend gains "Próximamente: aún no activo").
 * Until 20.11. an off row was hidden in the public view (E2 of 07.11.); `planCell` still never gives a tick for an off function.
 */
export const planRowShown = (key: ClaimKey, _view: ClaimView): boolean => !HIDDEN_BOTH.includes(key);
/** Copy §20 P-5: the comparison table stands only with `plans` on; otherwise one block "Qué incluye" with the rows that are on. */
export const plansTableShown = (view: ClaimView): boolean => live("plans", view);

/**
 * The entry action of the whole site. The owner's decision of 13.11.2026 (Copy's COPY_TO_REDESIGN_1113_TEXTS_10V10 §0 and §6): ONE offer
 * everywhere, in both views — the free pilot, agreed with a person. One black main button (B-1), its short form where a line is narrow
 * (B-1s), the pilot line under it (B-2). "Solicitar una demo", "Reservar una demo" and "14 días" leave the site; /signup and /trial lead
 * to /contact. The keys `trial` and `publicSignup` stay in the register (the app's own account state follows them), but no public
 * surface hangs an offer on them any more. WORKING: Copy's working title until Copy confirms the final wording (Mon 16.11. 12:00).
 */
export const pilotCta: { label: L; short: L; line: L; line2: L; nav: L } = {
  label: { es: "Solicita tu piloto gratuito", en: "Request your free pilot" },
  short: { es: "Piloto gratuito", en: "Free pilot" },
  // Copy 1116 §1.1 B-2 (the owner's sentence) and B-2b
  line: { es: "Piloto gratuito de 14 días, con nuestro acompañamiento. Si nos das tu opinión, 7 días más.", en: "A free 14-day pilot, with our support. Give us your feedback and get 7 more days." },
  line2: { es: "Sin método de pago. Las condiciones, por escrito.", en: "No payment method. The terms in writing." },
  nav: { es: "Piloto", en: "Pilot" },
};
/** Kept for the pages that still read it (the app's words); no offer hangs on it any more. */
export const trialCta: { label: L; line: L } = { label: pilotCta.label, line: pilotCta.line };
export const accessWords: { label: L; line: L; nav: L } = { label: pilotCta.label, line: pilotCta.line, nav: pilotCta.nav };
export const trialLive = (view: ClaimView): boolean => live(["trial", "publicSignup"], view);
export type EntryKind = "pilot";
export const entryAction = (locale: Locale, _view: ClaimView = "public"): { label: string; short: string; href: string; line: string; nav: string; kind: EntryKind } =>
  ({ label: pilotCta.label[locale], short: pilotCta.short[locale], href: "/contact", line: pilotCta.line[locale], nav: pilotCta.nav[locale], kind: "pilot" });
