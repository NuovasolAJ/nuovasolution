import type { Locale } from "@/lib/i18n/config";
import { platformTasks, type EntryState } from "@/lib/content/platform-map";

/**
 * /hoy: the one place of product truth (DESIGN.md "Words"; CONTENT_MODEL_1016). What runs today, what is in
 * preparation, what is per order, in Copy's own lines (TEXTS_1013 §4 L-1…L-3, §6b M-1…M-8). The home page carries
 * none of this; it links here. The states come from the platform map (one source), so nothing is said twice.
 */
type L = Record<Locale, string>;

export const todayWords = {
  eyebrow: { es: "Transparencia", en: "Transparency" } as L,
  h1: { es: "Qué está disponible hoy", en: "What is available today" } as L,
  lead: { es: "Lo que funciona hoy, lo que está en preparación y lo que se hace por encargo. Esta página es la referencia; el resto del sitio muestra la versión objetivo del producto.", en: "What works today, what is in preparation and what is made to order. This page is the reference; the rest of the site shows the target version of the product." } as L,
  languages: {
    title: { es: "Idiomas", en: "Languages" } as L,
    lines: [
      { es: "Hoy respondemos en español.", en: "Today we answer in Spanish." } as L,
      { es: "El sistema responde en el idioma del cliente; lo que falta en otros idiomas es la aprobación legal del aviso, no la función.", en: "The system replies in the customer's language; what is missing for other languages is the legal approval of the notice, not the capability." } as L,
      { es: "Si alguien escribe en un idioma sin aviso aprobado, no enviamos nada y queda una tarea para tu equipo.", en: "If somebody writes in a language without an approved notice, we send nothing and your team gets a task." } as L,
    ],
  },
  email: {
    title: { es: "Email y CRM", en: "Email and CRM" } as L,
    lines: [
      { es: "Hoy las consultas llegan a un buzón que operamos nosotros para ti. Conectar el buzón propio de tu agencia está en construcción.", en: "Today enquiries arrive at a mailbox we operate for you. Connecting your agency's own mailbox is being built." } as L,
      { es: "Gmail: recibimos y respondemos.", en: "Gmail: we receive and we reply." } as L,
      { es: "Tus leads viven en el CRM incluido.", en: "Your leads live in the included CRM." } as L,
      { es: "HubSpot, Pipedrive, Zoho y Salesforce están certificados en nuestro entorno de pruebas; en producción no hay ninguna conexión.", en: "HubSpot, Pipedrive, Zoho and Salesforce are certified in our test environment; in production there is no connection." } as L,
      { es: "Un cliente que escribe por email y luego por WhatsApp son hoy dos fichas.", en: "A customer who writes by email and later by WhatsApp is two records today." } as L,
      { es: "Para una agencia piloto falta todavía la versión del aviso que la nombra.", en: "For a pilot agency the version of the notice that names the agency is still outstanding." } as L,
    ],
  },
  states: {
    available: { es: "Disponible hoy", en: "Available today" } as L,
    preparing: { es: "En preparación", en: "In preparation" } as L,
    request: { es: "Por encargo", en: "Per order" } as L,
  } as Record<EntryState, L>,
  demo: { es: "Todos los ejemplos del sitio usan personas e inmuebles inventados.", en: "Every example on the site uses invented people and listings." } as L,
};

/** The entries of the platform map grouped by state, for the three lists. */
export function entriesByState() {
  const all = platformTasks.flatMap((t) => t.entries.map((e) => ({ ...e, task: t.title })));
  return {
    available: all.filter((e) => e.state === "available"),
    preparing: all.filter((e) => e.state === "preparing"),
    request: all.filter((e) => e.state === "request"),
  };
}
