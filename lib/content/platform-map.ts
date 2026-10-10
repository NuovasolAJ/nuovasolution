import type { Locale } from "@/lib/i18n/config";
import { publishedCapability } from "@/lib/content/capabilities";

/**
 * The platform in four tasks (owner follow-up order 2026-10-06 §4; master order 2026-10-10 §10): what an
 * agency does with Nuova, each entry with one benefit line. Every entry is clickable (master order: a menu must
 * show plainly what can be clicked): to its own page where one exists, otherwise to the chapter of the home
 * page story or the section that shows it.
 *
 * The proof state of each entry stays here for Audit (ACCEPTANCE_LIST_1010.md) and is printed only on a
 * preview with NEXT_PUBLIC_PROOF_STATES=1 (lib/content/edition.ts):
 *
 *   available    runs in production today (where production is narrower, the acceptance list says so)
 *   preparing    built, tested or planned, not proven for a customer yet
 *   request      made by hand per order (3D)
 *
 * Texts: WORKING by the implementer until Copy confirms.
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
  /** Where the entry is shown otherwise: a chapter or section of the home page. */
  anchor?: string;
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
    line: { es: "Cada consulta recibe respuesta en su idioma, por el canal por el que llegó.", en: "Every enquiry gets a reply in its language, on the channel it came in on." },
    entries: [
      { key: "whatsapp", name: { es: "WhatsApp", en: "WhatsApp" }, line: { es: "Respuesta en el idioma del cliente, con el nombre de tu agencia.", en: "A reply in the customer's language, under your agency's name." }, state: "available", slug: "ai-sales-agent", anchor: "#story-b" },
      { key: "email", name: { es: "Email", en: "Email" }, line: { es: "La misma respuesta para lo que llega por correo.", en: "The same reply for what arrives by email." }, state: "available", slug: "ai-sales-agent", anchor: "#story-b" },
      { key: "webform", name: { es: "Formularios web", en: "Web forms" }, line: { es: "Lo que entra por tu web se trata como una consulta más.", en: "What comes in through your website is treated as an enquiry." }, state: "preparing", anchor: "#story-b" },
      { key: "phone", name: { es: "Asistente telefónico", en: "Phone assistant" }, line: { es: "Una llamada que no se pierde: lo que pide, anotado, y una tarea.", en: "A call that is not lost: what they want, noted, and a task." }, state: "preparing", anchor: "#story-b" },
      { key: "handover", name: { es: "Paso a una persona", en: "Handover to a person" }, line: { es: "Cuando alguien pide hablar con una persona, la consulta pasa al equipo.", en: "When somebody asks for a person, the enquiry goes to the team." }, state: "available", slug: "ai-sales-agent", anchor: "#story-d" },
    ],
  },
  {
    key: "manage",
    title: { es: "Gestionar oportunidades", en: "Manage opportunities" },
    line: { es: "Lo que pide cada cliente, en un solo sitio y con lo que toca hacer.", en: "What each customer asks for, in one place, with what to do next." },
    entries: [
      { key: "crm", name: { es: "CRM y ficha del cliente", en: "CRM and customer record" }, line: { es: "Una ficha por cliente con lo que pidió y lo que pasó después.", en: "One record per customer, with what they asked for and what happened next." }, state: "available", slug: "crm", anchor: "#story-b" },
      { key: "labels", name: { es: "Etiquetas de email", en: "Email labels" }, line: { es: "Cada correo lleva su etiqueta: visita, valoración, alquiler.", en: "Every email carries its label: viewing, valuation, rental." }, state: "available", slug: "lead-intelligence", anchor: "#story-b" },
      { key: "hot", name: { es: "Avisos de consultas importantes", en: "Alerts for important enquiries" }, line: { es: "Un aviso cuando una consulta trae fecha, inmueble y presupuesto concretos.", en: "An alert when an enquiry names a date, a property and a budget." }, state: "preparing", anchor: "#story-d" },
      { key: "matching", name: { es: "Propuestas de inmuebles", en: "Property suggestions" }, line: { es: "Inmuebles de tu cartera que encajan con lo que busca el cliente.", en: "Listings from your portfolio that fit what the customer wants." }, state: "preparing", anchor: "#story-c" },
      { key: "followups", name: { es: "Seguimientos", en: "Follow-ups" }, line: { es: "Un mensaje útil cuando entra algo que encaja, solo con permiso del cliente.", en: "A useful message when something fitting comes in, only with the customer's permission." }, state: "preparing", anchor: "#story-e" },
    ],
  },
  {
    key: "team",
    title: { es: "Coordinar tu equipo", en: "Coordinate your team" },
    line: { es: "Quién hace qué hoy, y qué ya está hecho.", en: "Who does what today, and what is already done." },
    entries: [
      { key: "daily", name: { es: "Jarvis, el asistente del día", en: "Jarvis, the daily assistant" }, line: { es: "La lista de la mañana con el motivo de cada prioridad y el siguiente paso.", en: "The morning list with the reason behind each priority and the next step." }, state: "preparing", slug: "daily-assistant", anchor: "#story-d" },
      { key: "tasks", name: { es: "Tareas", en: "Tasks" }, line: { es: "Una tarea con dueño por cada visita o llamada pendiente.", en: "One owned task for every viewing or callback." }, state: "available", slug: "daily-assistant", anchor: "#story-d" },
      { key: "calendar", name: { es: "Calendario", en: "Calendar" }, line: { es: "Las visitas confirmadas, en la agenda de la persona que las hace.", en: "Confirmed viewings in the diary of the person who does them." }, state: "preparing", anchor: "#story-d" },
      { key: "reports", name: { es: "Informes", en: "Reports" }, line: { es: "Un resumen semanal por email y el informe completo en tu acceso.", en: "A weekly summary by email and the full report in your login." }, state: "preparing", anchor: "#story-f" },
    ],
  },
  {
    key: "attract",
    title: { es: "Captar y presentar", en: "Attract and present" },
    line: { es: "Más contactos desde lo que ya publicas, y una forma mejor de enseñar un inmueble.", en: "More contacts from what you already publish, and a better way to show a property." },
    entries: [
      { key: "posts", name: { es: "Publicaciones en Instagram", en: "Instagram posts" }, line: { es: "Un texto preparado para cada inmueble; tú lo apruebas antes de que salga.", en: "A prepared text for each listing; you approve it before it goes out." }, state: "preparing", slug: "social-growth", anchor: "/social" },
      { key: "comments", name: { es: "Comentarios y mensajes", en: "Comments and messages" }, line: { es: "Respuestas que tú permitiste, y cada contacto en su ficha.", en: "Replies you allowed, and every contact in a record." }, state: "preparing", slug: "social-growth", anchor: "/social/inbox" },
      { key: "ads", name: { es: "Leads de anuncios", en: "Leads from ads" }, line: { es: "Recogemos los leads que generan tus anuncios. Las campañas siguen siendo tuyas.", en: "We take in the leads your ads produce. The campaigns stay yours." }, state: "preparing", slug: "lead-acquisition", anchor: "#story-b" },
      { key: "model3d", name: { es: "Visualización 3D", en: "3D visualisation" }, line: { es: "Un modelo 3D de tu inmueble, hecho por nosotros a partir de tu plano.", en: "A 3D model of your property, built by us from your plan." }, state: "request", slug: "property-experience", anchor: "#model-3d" },
    ],
  },
];

/** The entry's destination: its page where one exists publicly, otherwise the place on the home page that shows it. */
export function entryHref(e: PlatformEntry): string {
  if (e.slug && publishedCapability(e.slug)) return `/platform/${e.slug}`;
  if (e.anchor?.startsWith("/")) return e.anchor;
  return e.anchor ? `/${e.anchor}` : "/platform";
}

export const stateWords: Record<EntryState, L> = {
  available: { es: "Disponible", en: "Available" },
  preparing: { es: "En preparación", en: "In preparation" },
  request: { es: "Por encargo", en: "Per order" },
};
