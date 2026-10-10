import type { Locale } from "@/lib/i18n/config";
import { catalogPlans, type PlanCode } from "@/lib/content/plans";

/**
 * The package comparison as the owner wants it (follow-up order 2026-10-06 §6; master order 2026-10-10 §10): a
 * feature ladder, three packages, each building on the one before, 3D also on its own.
 *
 *   1  replies, labels, CRM, alerts for important enquiries
 *   2  1 + follow-ups, property suggestions, Jarvis, lead intake, calendar
 *   3  2 + Instagram, phone, a 3D allowance
 *
 * The page is the target version (master order §11): every line stands as part of its package, with no state
 * label. The proof state of each line stays here for Audit and is printed only with NEXT_PUBLIC_PROOF_STATES=1;
 * what does not agree with the billing catalogue (lib/content/plans.ts, entitlement flags read 2026-09-23) is
 * listed for Audit and API in docs/website_redesign/PACKAGE_MATRIX_CHECK_1006.md and ACCEPTANCE_LIST_1010.md.
 * Nothing here switches a function on; the website only shows. No prices, no quotas, no promised leads.
 * The display names Essential, Growth and Enterprise are a proposal; the plan ids stay essential, growth, scale.
 */
type L = Record<Locale, string>;
export type LineState = "available" | "partial" | "preparing" | "request";

export interface MatrixLine {
  key: string;
  name: L;
  state: LineState;
  /** The scope, where a word of explanation helps the buyer. */
  note?: L;
  /** The catalogue flag that carries this line, if any. */
  flag?: string;
}

export interface MatrixPackage {
  /** The plan id in the catalogue (unchanged). */
  code: PlanCode;
  /** The proposed display name. */
  name: string;
  line: L;
  /** "Everything in … plus" for the second and third package. */
  plus?: L;
  lines: MatrixLine[];
  cta: L;
  href: string;
}

export const matrix: MatrixPackage[] = [
  {
    code: "essential",
    name: "Essential",
    line: { es: "Responder y ordenar lo que llega.", en: "Answering and ordering what arrives." }, // COPY_DELTAS_1003 §2.1
    lines: [
      { key: "replies", name: { es: "Respuestas automáticas", en: "Automatic replies" }, state: "available", note: { es: "en el idioma del cliente", en: "in the customer's language" }, flag: "cx.baseline" },
      { key: "channels", name: { es: "WhatsApp, email y formulario web", en: "WhatsApp, email and web form" }, state: "partial", flag: "channel.whatsapp" },
      { key: "labels", name: { es: "Etiquetas de email", en: "Email labels" }, state: "available", flag: "channel.email" },
      { key: "crm", name: { es: "Fichas de cliente (CRM)", en: "Customer records (CRM)" }, state: "available", flag: "crm.core" },
      { key: "hot", name: { es: "Avisos de consultas importantes", en: "Alerts for important enquiries" }, state: "preparing", flag: "lead.hot_alert" },
      { key: "reports", name: { es: "Informe semanal", en: "Weekly report" }, state: "preparing", flag: "reporting.basic" },
    ],
    cta: { es: "Probar gratis", en: "Try free" },
    href: "/signup",
  },
  {
    code: "growth",
    name: "Growth",
    line: { es: "Seguir, proponer y coordinar.", en: "Follow up, propose and coordinate." },
    plus: { es: "Todo lo de Essential, y además:", en: "Everything in Essential, plus:" },
    lines: [
      { key: "followups", name: { es: "Seguimientos con permiso del cliente", en: "Follow-ups with the customer's permission" }, state: "preparing", flag: "followup.basic" },
      { key: "matching", name: { es: "Propuestas de inmuebles de tu cartera", en: "Property suggestions from your portfolio" }, state: "preparing", flag: "property.matching" },
      { key: "daily", name: { es: "Jarvis: la lista del día con prioridades", en: "Jarvis: the day's list with priorities" }, state: "partial", note: { es: "ver, tomar, completar", en: "see, take, complete" } },
      { key: "ads", name: { es: "Recogida de leads de anuncios", en: "Intake of leads from ads" }, state: "preparing", flag: "lead.engine.orchestrate" },
      { key: "calendar", name: { es: "Agenda y citas", en: "Calendar and appointments" }, state: "preparing" },
      { key: "reportsAdv", name: { es: "Informe con evolución y canales", en: "Report with trend and channels" }, state: "preparing", flag: "reporting.advanced" },
    ],
    cta: { es: "Solicita una propuesta", en: "Request a proposal" },
    href: "/contact",
  },
  {
    code: "scale",
    name: "Enterprise",
    line: { es: "Captar, atender llamadas y presentar en 3D.", en: "Attract, take calls and present in 3D." },
    plus: { es: "Todo lo de Growth, y además:", en: "Everything in Growth, plus:" },
    lines: [
      { key: "social", name: { es: "Instagram desde el mismo sitio", en: "Instagram from the same place" }, state: "preparing" },
      { key: "phone", name: { es: "Asistente telefónico", en: "Phone assistant" }, state: "preparing", note: { es: "hoy en español", en: "today in Spanish" }, flag: "channel.voice" },
      { key: "model3d", name: { es: "Modelos 3D incluidos por encargo", en: "3D models included, per order" }, state: "request" },
    ],
    cta: { es: "Solicita una propuesta", en: "Request a proposal" },
    href: "/contact",
  },
];

export const matrixWords = {
  states: {
    available: { es: "Disponible", en: "Available" },
    partial: { es: "Disponible en parte", en: "Partly available" },
    preparing: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" },
    request: { es: "Disponible por encargo · sin cupo", en: "Available per order · no quota" },
  } as Record<LineState, L>,
  limit: { es: "Consultas procesadas al mes", en: "Enquiries processed per month" },
  limitNote: { es: "Es un límite de procesamiento, no leads generados.", en: "A processing limit, not generated leads." },
  noCap: { es: "sin tope mensual", en: "no monthly cap" },
  strip: {
    line: { es: "Modelos 3D también por separado, sin ningún paquete.", en: "3D models can also be ordered on their own, without a package." }, // COPY_DELTAS_1003 §2.4
    detail: { es: "Cada modelo es un encargo: nos envías los planos, lo construimos y lo comprobamos.", en: "Each model is an order: you send the plans, we build it and we check it." },
    cta: { es: "Pide un modelo", en: "Ask for a model" },
  },
  adsNote: { es: "Recogemos los leads que generan tus anuncios. Las campañas y el presupuesto publicitario siguen siendo tuyos.", en: "We take in the leads your ads produce. The campaigns and the advertising budget stay yours." },
  crmNote: { es: "El CRM está incluido. Si ya usas HubSpot, Pipedrive, Zoho, Salesforce o Google Sheets, conectamos tus leads con él.", en: "The CRM is included. If you already use HubSpot, Pipedrive, Zoho, Salesforce or Google Sheets, we connect your leads to it." },
  crmNoteProof: { es: "HubSpot, Pipedrive, Zoho y Salesforce están certificados en nuestro entorno de pruebas. Todavía no hay ninguna conexión en producción.", en: "HubSpot, Pipedrive, Zoho and Salesforce are certified in our test environment. There is no production connection yet." },
  noPrice: { es: "Sin precios en esta página. Te decimos el precio para tu agencia antes de acordar nada.", en: "No prices on this page. We tell you the price for your agency before anything is agreed." },
  trial: { es: "14 días · Sin tarjeta", en: "14 days · No card" },
};

/** The catalogue's monthly processing limit per plan, for the honest "per month" line. */
export function processingLimit(code: PlanCode): number | null {
  const plan = catalogPlans.find((p) => p.code === code);
  return plan ? plan.limits.leads_month : null;
}
