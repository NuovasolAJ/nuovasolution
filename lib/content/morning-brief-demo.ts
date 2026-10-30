import type { Locale } from "@/lib/i18n/config";
import type { MailTask } from "@/components/app/mail-shell";

/**
 * The morning brief, as a design preview with demonstration data (R19 closing order 2026-10-19 §11; Daily's request
 * of 2026-10-19 for a TASK block in the shell). The people and tasks are the home page's example (lib/content/home-story.ts),
 * never an agency's data. Daily's renderer fills the same slots from its read model; Copy owns the wording (R16-K K1,
 * R19 C2); this file only shows the design of the Spanish version and its English mirror.
 */
type L = Record<Locale, string>;

export const briefWords = {
  eyebrow: { es: "Tu mañana", en: "Your morning" },
  h1: { es: "Así llega el resumen de la mañana", en: "How the morning brief arrives" },
  lead: { es: "Un email corto a cada persona del equipo: la consulta que más importa hoy, por qué, y las tareas con su siguiente paso. Con el mismo diseño que el resumen semanal y otro contenido. Todavía no se envía de forma regular. Datos de demostración.", en: "A short email to each person on the team: the enquiry that matters most today, why, and the tasks with their next step. Same design as the weekly summary, other contents. Not yet sent on a regular basis. Demonstration data." }, // COPY_SYNC_1024 X-2 (owner 25.10.: no German word)
  subject: { es: "Buenos días, Elena: una consulta importante para hoy", en: "Good morning, Elena: one important enquiry for today" },
  greeting: { es: "Hola Elena,", en: "Hello Elena," },
  summary: { es: "Desde ayer han llegado cuatro consultas. La que más importa hoy: Laura Serrano quiere ver el piso de Estepona la semana que viene y nombró inmueble, zona y presupuesto.", en: "Four enquiries came in since yesterday. The one that matters most today: Laura Serrano wants to see the flat in Estepona next week and named a property, an area and a budget." },
  nextAction: { es: "Toma la tarea de Laura en tu lista y proponle día y hora por WhatsApp.", en: "Take Laura's task on your list and propose a day and time on WhatsApp." },
  button: { es: "Abrir mi lista", en: "Open my list" },
  underButton: { es: "Entras con tu cuenta de agencia.", en: "You sign in with your agency account." },
  footer: { es: "Recibes este email porque formas parte del equipo de tu agencia en Nuova. Si algo no cuadra, respóndenos a este correo.", en: "You receive this email because you are part of your agency's team in Nuova. If something does not add up, reply to this mail." },
  open: { es: "Abrir", en: "Open" },
  demo: { es: "Vista previa con datos de demostración: nadie recibe este correo.", en: "Preview with demonstration data: nobody receives this mail." },
  logoAlt: "NuovaSolution",
} satisfies Record<string, L | string>;

export function briefTasks(locale: Locale, listHref: string): MailTask[] {
  const es = locale === "es";
  const open = briefWords.open[locale];
  return [
    {
      kind: es ? "Visita pedida" : "Viewing requested",
      who: "Laura Serrano · WhatsApp",
      lines: es ? ["Quiere ver el piso de Estepona la semana que viene · vivienda habitual.", "Presupuesto hasta 320.000 €."] : ["Wants to see the flat in Estepona next week · main home.", "Budget up to €320,000."],
      priority: es ? "Prioridad alta · nombró inmueble, zona y presupuesto" : "High priority · she named a property, an area and a budget",
      state: es ? "Abierta · nadie la ha tomado" : "Open · nobody has taken it",
      step: es ? "Proponerle día y hora por WhatsApp" : "Propose a day and time on WhatsApp",
      href: listHref,
      open,
    },
    {
      kind: es ? "Sin respuesta automática" : "No automatic reply",
      who: es ? "Peter y Anna Keller · Email" : "Peter and Anna Keller · Email",
      lines: es ? ["Quieren vender su villa en Elviria y piden una valoración esta semana.", "Escriben en alemán: hoy solo respondemos en español, así que Nuova no ha enviado nada."] : ["They want to sell their villa in Elviria and ask for a valuation this week.", "They write in German: today we only answer in Spanish, so Nuova has sent nothing."],
      state: es ? "Abierta · desde ayer 11:24" : "Open · since yesterday 11:24",
      step: es ? "Contestar al cliente y proponer una fecha para la visita" : "Answer the customer and propose a date for the viewing", // HANDOVER_1021 A-8
      href: listHref,
      open,
    },
    {
      kind: es ? "Rellamada" : "Callback",
      who: es ? "Álvaro Pons · Teléfono" : "Álvaro Pons · Phone",
      lines: es ? ["Llamó por la villa de Elviria: precio y margen.", "Pidió que le llamen por la tarde · +34 XXX XXX XXX."] : ["Called about the villa in Elviria: price and room to negotiate.", "Asked to be called in the afternoon · +34 XXX XXX XXX."],
      state: es ? "Abierta · recordatorio a las 16:00" : "Open · reminder at 16:00",
      step: es ? "Llamar a partir de las 16:00" : "Call from 16:00",
      href: listHref,
      open,
    },
  ];
}
