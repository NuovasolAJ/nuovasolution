import type { Locale } from "@/lib/i18n/config";
import { catalogPlans, type PlanCode } from "@/lib/content/plans";

/**
 * The package comparison as the owner wants it (follow-up order 2026-10-06 §6; master order 2026-10-10 §10): a
 * feature ladder, three packages, each building on the one before, 3D also on its own.
 *
 *   1  replies, labels, CRM, alerts for important enquiries
 *   2  1 + follow-ups, property suggestions, the morning assistant, lead intake, calendar
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
  /** For whom (the size of the agency) and what changes in the day, in one line each (owner 2026-10-16: the packages must explain). */
  who: L;
  change: L;
  /** The confirmed limits of the package, said with the package (final order §8). */
  limits: L;
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
    who: { es: "Para una oficina y un equipo pequeño", en: "For one office and a small team" }, // HANDOVER_1021 C-1 (owner: no limits until set)
    // R20 (owner on deb9b66): no "ninguna … sin respuesta" while other languages are held; the claim names the channels and the language.
    change: { es: "Las consultas en español por WhatsApp y email se responden mientras estás fuera.", en: "Enquiries in Spanish on WhatsApp and e-mail are answered while you are away." }, // HANDOVER_1021 C-7
    // R19 §11: no monthly figure until API confirms what the catalogue's number counts (ACCEPTANCE_LIST_1010 E-4).
    limits: { es: "Hoy: WhatsApp y email, respuestas en español.", en: "Today: WhatsApp and e-mail, replies in Spanish." }, // HANDOVER_1021 C-4
    lines: [
      { key: "replies", name: { es: "Respuestas automáticas", en: "Automatic replies" }, state: "available", note: { es: "Disponible · en español", en: "Available · in Spanish" }, flag: "cx.baseline" },
      { key: "channels", name: { es: "WhatsApp y email", en: "WhatsApp and email" }, state: "available", note: { es: "Disponible · el buzón lo operamos nosotros para ti", en: "Available · we operate the mailbox for you" }, flag: "channel.whatsapp" },
      { key: "labels", name: { es: "Etiquetas de email", en: "Email labels" }, state: "available", note: { es: "Disponible · con Gmail", en: "Available · with Gmail" }, flag: "channel.email" },
      { key: "crm", name: { es: "Fichas de cliente (CRM)", en: "Customer records (CRM)" }, state: "available", note: { es: "Disponible · una ficha por consulta", en: "Available · one record per enquiry" }, flag: "crm.core" },
      // COPY_1019 R-16: the alert by e-mail is proven in production (H1); its limit stands with it.
      { key: "hot", name: { es: "Avisos de consultas importantes", en: "Alerts for important enquiries" }, state: "available", note: { es: "Disponible · por email, todavía sin horario de oficina", en: "Available · by e-mail, no office hours yet" }, flag: "lead.hot_alert" },
      // COPY_1019 R-18: the report in the login is available; the weekly e-mail is being prepared.
      { key: "reports", name: { es: "Informe semanal", en: "Weekly report" }, state: "available", note: { es: "Disponible: el informe en tu acceso · En preparación: el resumen semanal por email", en: "Available: the report in your login · In preparation: the weekly e-mail summary" }, flag: "reporting.basic" },
    ],
    cta: { es: "Probar gratis", en: "Try free" },
    href: "/signup",
  },
  {
    code: "growth",
    name: "Growth",
    line: { es: "Seguir, proponer y coordinar.", en: "Follow up, propose and coordinate." },
    who: { es: "Para un equipo que crece", en: "For a growing team" }, // HANDOVER_1021 C-2
    change: { es: "Cada mañana tu equipo ve sus tareas con el motivo de cada una.", en: "Every morning your team sees its tasks with the reason for each." }, // HANDOVER_1021 C-8
    limits: { es: "Seguimientos solo con permiso del cliente; propuestas solo de tu propia cartera.", en: "Follow-ups only with the customer's permission; proposals only from your own portfolio." },
    plus: { es: "Todo lo de Essential, y además:", en: "Everything in Essential, plus:" },
    lines: [
      // R20 (owner on deb9b66): the availability stands with the line, not only in a hidden proof state.
      { key: "followups", name: { es: "Seguimientos con permiso del cliente", en: "Follow-ups with the customer's permission" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" }, flag: "followup.basic" },
      { key: "matching", name: { es: "Propuestas de inmuebles de tu cartera", en: "Property suggestions from your portfolio" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" }, flag: "property.matching" },
      { key: "daily", name: { es: "Tareas del equipo y el asistente de la mañana", en: "Team tasks and the morning assistant" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" } }, // COPY_SYNC_1024 X-4 (the staff surface reaches production with Release U)
      { key: "ads", name: { es: "Recogida de leads de tus anuncios actuales", en: "Intake of leads from your existing ads" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" }, flag: "lead.engine.orchestrate" }, // HANDOVER_1021 C.3 (owner: ads after the launch)
      { key: "calendar", name: { es: "Agenda y citas", en: "Calendar and appointments" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" } },
      { key: "reportsAdv", name: { es: "Informe con evolución y canales", en: "Report with trend and channels" }, state: "preparing", note: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" }, flag: "reporting.advanced" },
    ],
    cta: { es: "Solicita una propuesta", en: "Request a proposal" },
    href: "/contact",
  },
  {
    code: "scale",
    name: "Enterprise",
    line: { es: "Captar y presentar en 3D.", en: "Attract and present in 3D." },
    who: { es: "Para varias oficinas", en: "For several offices" }, // HANDOVER_1021 C-3
    change: { es: "Modelos 3D por encargo, y más adelante Instagram desde el mismo sitio.", en: "3D models to order, and later Instagram from the same place." }, // HANDOVER_1021 C-9
    limits: { es: "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma.", en: "Today it is an offer on request: the 3D models are made now from your plans; Instagram depends on the platform's approval." }, // Reviewer R24 picture 07: the card says plainly what it is
    plus: { es: "Todo lo de Growth, y además:", en: "Everything in Growth, plus:" },
    lines: [
      { key: "social", name: { es: "Instagram desde el mismo sitio", en: "Instagram from the same place" }, state: "preparing", note: { es: "En preparación · depende de la aprobación de la plataforma", en: "In preparation · depends on the platform's approval" } },
      { key: "model3d", name: { es: "Modelos 3D incluidos por encargo", en: "3D models included, per order" }, state: "request", note: { es: "Por encargo · a partir de tus planos", en: "To order · from your plans" } },
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
  // R19 §11: the monthly figure is not shown until API confirms the package assignment and what it counts (E-4);
  // the words stay for the day it is.
  limit: { es: "Capacidad: consultas al mes", en: "Capacity: enquiries a month" },
  limitNote: { es: "", en: "" },
  noCap: { es: "sin límite", en: "unlimited" },
  /** Whether the monthly figure may be printed: only once API has confirmed it (ACCEPTANCE_LIST_1010 E-4). */
  limitConfirmed: false,
  strip: {
    line: { es: "Modelos 3D también por separado, sin ningún paquete.", en: "3D models can also be ordered on their own, without a package." }, // COPY_DELTAS_1003 §2.4
    detail: { es: "Cada modelo es un encargo: nos envías los planos, lo construimos y lo comprobamos.", en: "Each model is an order: you send the plans, we build it and we check it." },
    cta: { es: "Pide un modelo", en: "Ask for a model" },
  },
  adsNote: { es: "Más adelante recogeremos los leads de los anuncios que ya tienes. Las campañas y el presupuesto publicitario siguen siendo tuyos.", en: "Later we will take in the leads from the ads you already run. The campaigns and the advertising budget stay yours." }, // HANDOVER_1021 C-10
  // TEXTS_1013 §6b M-4, M-5, M-6: the included CRM; the four CRMs certified on staging with no production connection; no Google Sheets line.
  crmNote: { es: "Tus leads viven en el CRM incluido. Si ya usas HubSpot, Pipedrive, Zoho o Salesforce, lo preparamos contigo cuando esté listo.", en: "Your leads live in the included CRM. If you already use HubSpot, Pipedrive, Zoho or Salesforce, we prepare it with you when it is ready." },
  crmNoteProof: { es: "HubSpot, Pipedrive, Zoho y Salesforce están certificados en nuestro entorno de pruebas; en producción no hay ninguna conexión.", en: "HubSpot, Pipedrive, Zoho and Salesforce are certified in our test environment; in production there is no connection." },
  noPrice: { es: "Sin precios en esta página. Te decimos el precio para tu agencia antes de acordar nada.", en: "No prices on this page. We tell you the price for your agency before anything is agreed." },
  trial: { es: "14 días · Sin método de pago", en: "14 days · No payment method" },
};

/** The catalogue's monthly processing limit per plan, for the honest "per month" line. */
export function processingLimit(code: PlanCode): number | null {
  const plan = catalogPlans.find((p) => p.code === code);
  return plan ? plan.limits.leads_month : null;
}
