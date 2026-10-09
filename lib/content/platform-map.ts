import type { Locale } from "@/lib/i18n/config";
import { publishedCapability } from "@/lib/content/capabilities";

/**
 * The platform in four tasks (owner follow-up order 2026-10-06 §4): what an agency does with Nuova, each
 * entry with one benefit line and its honest state. The target structure is complete here; an entry that is
 * not proven is neither dropped nor offered as available. States follow the package matrix of 2026-10-03
 * (backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md) and the lane truth sheets:
 *
 *   available    runs in production today (where production is narrower, the line says so)
 *   preparing    built, tested or planned, not something an agency can order today
 *   request      made by hand per order (3D)
 *
 * Proof still needed for its own entry (each needs its own evidence before it is called available):
 * cross-channel identity, more languages than Spanish, external CRM connections, calendar booking.
 * Links go only to pages that exist publicly. Texts: WORKING by the implementer until Copy confirms.
 */
type L = Record<Locale, string>;
export type EntryState = "available" | "preparing" | "request";

export interface PlatformEntry {
  key: string;
  name: L;
  line: L;
  state: EntryState;
  /** Where the entry is explained today, if a public page exists. */
  slug?: string;
}

export interface PlatformTask {
  key: "answer" | "manage" | "team" | "attract";
  title: L;
  line: L;
  entries: PlatformEntry[];
}

export const platformTasks: PlatformTask[] = [
  {
    key: "answer",
    title: { es: "Atender consultas", en: "Answer enquiries" },
    line: { es: "Cada consulta recibe respuesta, en el canal por el que llegó.", en: "Every enquiry gets a reply, on the channel it came in on." },
    entries: [
      { key: "whatsapp", name: { es: "WhatsApp", en: "WhatsApp" }, line: { es: "Respuesta en español, con el nombre de tu agencia.", en: "A reply in Spanish, under your agency's name." }, state: "available", slug: "ai-sales-agent" },
      { key: "email", name: { es: "Email", en: "Email" }, line: { es: "La misma respuesta para lo que llega por correo (Gmail).", en: "The same reply for what arrives by email (Gmail)." }, state: "available", slug: "ai-sales-agent" },
      { key: "webform", name: { es: "Formularios web", en: "Web forms" }, line: { es: "Lo que entra por tu web se trata como una consulta más.", en: "What comes in through your website is treated as an enquiry." }, state: "preparing" },
      { key: "phone", name: { es: "Asistente telefónico", en: "Phone assistant" }, line: { es: "Una llamada que no se pierde: lo que pide, anotado.", en: "A call that is not lost: what they want, noted." }, state: "preparing" },
      { key: "handover", name: { es: "Paso a una persona", en: "Handover to a person" }, line: { es: "Cuando alguien pide hablar con una persona, la consulta pasa al equipo.", en: "When somebody asks for a person, the enquiry goes to the team." }, state: "available", slug: "ai-sales-agent" },
    ],
  },
  {
    key: "manage",
    title: { es: "Gestionar oportunidades", en: "Manage opportunities" },
    line: { es: "Lo que pide cada cliente, en un solo sitio y con lo que toca hacer.", en: "What each customer asks for, in one place, with what to do next." },
    entries: [
      { key: "crm", name: { es: "CRM y ficha del cliente", en: "CRM and customer record" }, line: { es: "Una ficha por cliente con lo que pidió y lo que pasó después.", en: "One record per customer, with what they asked for and what happened next." }, state: "available", slug: "crm" },
      { key: "labels", name: { es: "Etiquetas de email", en: "Email labels" }, line: { es: "Cada correo lleva su etiqueta: visita, valoración, alquiler.", en: "Every email carries its label: viewing, valuation, rental." }, state: "available", slug: "lead-intelligence" },
      { key: "hot", name: { es: "Avisos de lead caliente", en: "Hot lead alerts" }, line: { es: "Un aviso cuando una consulta trae fecha e inmueble concretos.", en: "An alert when an enquiry names a date and a property." }, state: "preparing" },
      { key: "matching", name: { es: "Property matching", en: "Property matching" }, line: { es: "Inmuebles de tu cartera que encajan con lo que busca el cliente.", en: "Listings from your portfolio that fit what the customer wants." }, state: "preparing" },
      { key: "followups", name: { es: "Seguimientos", en: "Follow-ups" }, line: { es: "Un recordatorio al cliente que no ha contestado, cuando tú lo decides.", en: "A reminder to a customer who has not replied, when you decide." }, state: "preparing" },
    ],
  },
  {
    key: "team",
    title: { es: "Coordinar tu equipo", en: "Coordinate your team" },
    line: { es: "Quién hace qué hoy, y qué ya está hecho.", en: "Who does what today, and what is already done." },
    entries: [
      { key: "daily", name: { es: "Asistente del día", en: "Daily assistant" }, line: { es: "La lista de la mañana con el motivo de cada prioridad.", en: "The morning list with the reason behind each priority." }, state: "preparing", slug: "daily-assistant" },
      { key: "tasks", name: { es: "Tareas", en: "Tasks" }, line: { es: "Una tarea con dueño por cada visita o llamada pendiente.", en: "One owned task for every viewing or callback." }, state: "available", slug: "daily-assistant" },
      { key: "calendar", name: { es: "Calendario", en: "Calendar" }, line: { es: "Las visitas acordadas, en la agenda de la persona que las hace.", en: "Agreed viewings in the diary of the person who does them." }, state: "preparing" },
      { key: "reports", name: { es: "Informes", en: "Reports" }, line: { es: "Cuántas consultas llegaron, cuántas se respondieron, qué queda abierto.", en: "How many enquiries came in, how many were answered, what is still open." }, state: "preparing" },
    ],
  },
  {
    key: "attract",
    title: { es: "Captar y presentar", en: "Attract and present" },
    line: { es: "Más contactos desde lo que ya publicas, y una forma mejor de enseñar un inmueble.", en: "More contacts from what you already publish, and a better way to show a property." },
    entries: [
      { key: "posts", name: { es: "Publicaciones", en: "Posts" }, line: { es: "Un texto preparado para cada inmueble; tú lo apruebas.", en: "A prepared text for each listing; you approve it." }, state: "preparing", slug: "social-growth" },
      { key: "comments", name: { es: "Comentarios y mensajes", en: "Comments and messages" }, line: { es: "Respuestas que tú permitiste, y cada contacto en su ficha.", en: "Replies you allowed, and every contact in a record." }, state: "preparing", slug: "social-growth" },
      { key: "ads", name: { es: "Leads de anuncios", en: "Leads from ads" }, line: { es: "Recogemos los leads que generan tus anuncios. Las campañas siguen siendo tuyas.", en: "We take in the leads your ads produce. The campaigns stay yours." }, state: "preparing", slug: "lead-acquisition" },
      { key: "model3d", name: { es: "Visualización 3D", en: "3D visualisation" }, line: { es: "Un modelo 3D de tu inmueble, hecho por nosotros a partir de tu plano.", en: "A 3D model of your property, built by us from your plan." }, state: "request", slug: "property-experience" },
    ],
  },
];

/** The entry's page, only where it exists publicly today. */
export function entryHref(e: PlatformEntry): string | null {
  return e.slug && publishedCapability(e.slug) ? `/platform/${e.slug}` : null;
}

export const stateWords: Record<EntryState, L> = {
  available: { es: "Disponible", en: "Available" },
  preparing: { es: "En preparación", en: "In preparation" },
  request: { es: "Por encargo", en: "Per order" },
};
