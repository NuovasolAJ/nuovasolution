import type { Locale } from "@/lib/i18n/config";

/**
 * The home page in eight moments (CONTENT_MODEL_1016.md, DESIGN.md). Pain first, then the loss, then Nuova, then the
 * way in. Every text is WORKING by the implementer until Copy confirms; nothing claims a language, a channel or a figure
 * beyond Copy's TEXTS_1013 lines (today: Spanish on WhatsApp and email). People and listings are invented and the page
 * says so once (`demo`). The product truth stands on /hoy, not here.
 */
type L = Record<Locale, string>;

export const homeV4 = {
  hero: {
    eyebrow: { es: "Para agencias inmobiliarias en España", en: "For real estate agencies in Spain" } as L,
    h1Soft: { es: "Mientras enseñas una vivienda,", en: "While you show a home," } as L,
    h1: { es: "tus consultas no esperan.", en: "your enquiries don't wait." } as L,
    lead: { es: "Nuova responde en segundos por WhatsApp y email, guarda lo que pide cada cliente y deja la tarea lista para tu equipo.", en: "Nuova answers in seconds on WhatsApp and email, keeps what each customer wants and leaves the task ready for your team." } as L,
    cta: { es: "Probar 14 días gratis", en: "Try 14 days free" } as L,
    ctaSecond: { es: "Ver cómo funciona", en: "See how it works" } as L,
    trialLine: { es: "Sin tarjeta · Sin llamada comercial", en: "No card · No sales call" } as L,
    /** The panel: one excerpt of the product, not the whole surface. */
    panel: {
      label: { es: "Ejemplo: una consulta por WhatsApp y lo que Nuova deja listo", en: "Example: a WhatsApp enquiry and what Nuova leaves ready" } as L,
      situation: { es: "Marcos está en una visita hasta las 12:00", en: "Marcos is at a viewing until 12:00" } as L,
      channel: { es: "WhatsApp · martes 11:20", en: "WhatsApp · Tuesday 11:20" } as L,
      enquiry: "Hi, could we view the two-bedroom flat in Estepona on Thursday morning? We're coming from Manchester.",
      who: { es: "Laura Serrano · compradora", en: "Laura Serrano · buyer" } as L,
      replyLabel: { es: "Nuova responde · 11:20", en: "Nuova replies · 11:20" } as L,
      reply: "Hi Laura, noted: Estepona, Thursday. Would the morning or the afternoon suit you better? A colleague will confirm the time.",
      recordLabel: { es: "Guardado en la ficha", en: "Kept on the record" } as L,
      record: { es: "2 dormitorios · Estepona · hasta 320.000 € · jueves", en: "2 bedrooms · Estepona · up to €320,000 · Thursday" } as L,
      taskLabel: { es: "Tarea para Marcos", en: "Task for Marcos" } as L,
      task: { es: "Confirmar la hora del jueves · después de la visita", en: "Confirm Thursday's time · after the viewing" } as L,
      replay: { es: "Reproducir otra vez", en: "Play again" } as L,
    },
  },

  loss: {
    eyebrow: { es: "Lo que pasa cuando nadie contesta", en: "What happens when nobody answers" } as L,
    /** The sentence that lights up word by word while the page scrolls. */
    statement: { es: "Cada consulta que espera es un cliente que ya está escribiendo a la siguiente agencia.", en: "Every enquiry that waits is a customer already writing to the next agency." } as L,
    card: { who: { es: "Laura Serrano", en: "Laura Serrano" } as L, line: { es: "Quiere ver un piso en Estepona el jueves", en: "Wants to view a flat in Estepona on Thursday" } as L, lost: { es: "Perdida", en: "Lost" } as L },
    steps: [
      { t: { es: "11:20", en: "11:20" } as L, text: { es: "Llega la consulta.", en: "The enquiry arrives." } as L },
      { t: { es: "+5 min", en: "+5 min" } as L, text: { es: "Nadie contesta: Marcos está en la visita.", en: "Nobody answers: Marcos is at the viewing." } as L },
      { t: { es: "+30 min", en: "+30 min" } as L, text: { es: "Laura escribe a otra agencia.", en: "Laura writes to another agency." } as L },
      { t: { es: "+2 h", en: "+2 h" } as L, text: { es: "«Gracias, ya lo hemos resuelto.»", en: "“Thanks, we've already sorted it.”" } as L },
    ],
    caption: { es: "Así se pierde una consulta. No hace falta que pase.", en: "That is how an enquiry is lost. It doesn't have to happen." } as L,
  },

  compare: {
    eyebrow: { es: "La misma consulta, con Nuova", en: "The same enquiry, with Nuova" } as L,
    title: { es: "Responder en segundos cambia el final.", en: "Answering in seconds changes the ending." } as L,
    without: { es: "Sin Nuova", en: "Without Nuova" } as L,
    with: { es: "Con Nuova", en: "With Nuova" } as L,
    rowsWithout: [
      { t: "11:20", text: { es: "Llega la consulta de Laura.", en: "Laura's enquiry arrives." } as L },
      { t: "17:40", text: { es: "Marcos la ve al volver a la oficina.", en: "Marcos sees it back at the office." } as L },
      { t: "17:52", text: { es: "Responde. Laura: «Gracias, ya cerramos con otra agencia.»", en: "He replies. Laura: “Thanks, we've gone with another agency.”" } as L, lost: true },
    ],
    rowsWith: [
      { t: "11:20", text: { es: "Llega la consulta de Laura.", en: "Laura's enquiry arrives." } as L },
      { t: "11:20", text: { es: "Nuova responde y pregunta: ¿mañana o tarde?", en: "Nuova replies and asks: morning or afternoon?" } as L },
      { t: "11:21", text: { es: "Zona, presupuesto y fecha quedan en la ficha. Tarea para Marcos.", en: "Area, budget and date go on the record. Task for Marcos." } as L },
      { t: "12:05", text: { es: "Marcos confirma la visita del jueves.", en: "Marcos confirms Thursday's viewing." } as L, won: true },
    ],
  },

  what: {
    eyebrow: { es: "Lo que hace Nuova, cada día", en: "What Nuova does, every day" } as L,
    title: { es: "Responde, guarda, avisa y resume.", en: "It answers, keeps, alerts and sums up." } as L,
    rows: [
      { key: "answer", title: { es: "Responde", en: "Answers" } as L, line: { es: "Por WhatsApp y email, en segundos, con el nombre de tu agencia.", en: "On WhatsApp and email, in seconds, under your agency's name." } as L },
      { key: "keep", title: { es: "Guarda", en: "Keeps" } as L, line: { es: "Lo que pide cada cliente: zona, presupuesto, plazo. En una ficha.", en: "What each customer wants: area, budget, timing. On one record." } as L },
      { key: "alert", title: { es: "Avisa", en: "Alerts" } as L, line: { es: "Una consulta con fecha, inmueble y presupuesto llega a tu equipo como tarea.", en: "An enquiry with a date, a property and a budget reaches your team as a task." } as L },
      { key: "report", title: { es: "Resume", en: "Sums up" } as L, line: { es: "El lunes sabes qué pasó: consultas, visitas pedidas, lo que sigue abierto.", en: "On Monday you know what happened: enquiries, viewings asked for, what is still open." } as L },
    ],
    excerpts: {
      answer: { in: { es: "Hola, ¿se puede visitar el ático de Marbella este sábado?", en: "Hi, can the Marbella penthouse be viewed this Saturday?" } as L, out: { es: "Hola Carlos, gracias por escribir. Anotado el ático y el sábado. ¿Te viene mejor por la mañana o por la tarde?", en: "Hi Carlos, thanks for writing. Noted the penthouse and Saturday. Morning or afternoon?" } as L, meta: { es: "WhatsApp · 09:14 · respondida en 20 s", en: "WhatsApp · 09:14 · answered in 20 s" } as L },
      keep: { name: "Carlos Ruiz", rows: [{ k: { es: "Busca", en: "Wants" } as L, v: { es: "ático, Marbella", en: "penthouse, Marbella" } as L }, { k: { es: "Presupuesto", en: "Budget" } as L, v: { es: "hasta 650.000 €", en: "up to €650,000" } as L }, { k: { es: "Plazo", en: "Timing" } as L, v: { es: "este sábado", en: "this Saturday" } as L }] },
      alert: { title: { es: "Consulta importante · Carlos Ruiz", en: "Important enquiry · Carlos Ruiz" } as L, line: { es: "Fecha, inmueble y presupuesto concretos. Tarea: confirmar la visita del sábado.", en: "A concrete date, property and budget. Task: confirm Saturday's viewing." } as L, action: { es: "Tomar", en: "Take" } as L },
      report: { title: { es: "Tu semana en Nuova", en: "Your week in Nuova" } as L, figures: [{ n: "23", k: { es: "consultas atendidas", en: "enquiries handled" } as L }, { n: "6", k: { es: "visitas pedidas", en: "viewings asked for" } as L }, { n: "2", k: { es: "cosas abiertas", en: "things open" } as L }] },
    },
  },

  morning: {
    eyebrow: { es: "Tu equipo por la mañana", en: "Your team in the morning" } as L,
    title: { es: "El día empieza sabiendo qué va primero.", en: "The day starts knowing what comes first." } as L,
    line: { es: "La lista de la mañana trae cada tarea con su motivo. Se toma, se cierra, y los demás lo ven.", en: "The morning list brings every task with its reason. It is taken, closed, and the others see it." } as L,
    greeting: { es: "Buenos días, Elena", en: "Good morning, Elena" } as L,
    when: { es: "miércoles · 08:30", en: "Wednesday · 08:30" } as L,
    items: [
      { who: "Laura Serrano", what: { es: "Confirmar la hora del jueves", en: "Confirm Thursday's time" } as L, why: { es: "Pidió visita con fecha. Va primero.", en: "Asked for a viewing with a date. Goes first." } as L, hot: true },
      { who: "Peter y Anna Keller", what: { es: "Proponer día para la valoración", en: "Propose a day for the valuation" } as L, why: { es: "Quieren vender esta semana.", en: "They want to sell this week." } as L },
      { who: "Álvaro Pons", what: { es: "Devolver la llamada", en: "Return the call" } as L, why: { es: "Llamó ayer a las 11:37.", en: "Called yesterday at 11:37." } as L },
    ],
    take: { es: "Tomar", en: "Take" } as L,
    tryIt: { es: "Pruébalo en la plataforma", en: "Try it on the platform" } as L,
  },

  start: {
    eyebrow: { es: "Cómo empiezas", en: "How you start" } as L,
    title: { es: "Hoy. Sin llamada comercial.", en: "Today. No sales call." } as L,
    steps: [
      { es: "Creas tu cuenta", en: "Create your account" } as L,
      { es: "Configuras tu agencia a tu ritmo", en: "Set up your agency at your pace" } as L,
      { es: "Conectamos WhatsApp y email contigo", en: "We connect WhatsApp and email with you" } as L,
    ],
    crm: { es: "Tus leads viven en el CRM incluido. Si ya usas HubSpot, Pipedrive, Zoho o Salesforce, lo preparamos contigo cuando esté listo.", en: "Your leads live in the included CRM. If you already use HubSpot, Pipedrive, Zoho or Salesforce, we prepare it with you when it is ready." } as L,
    trial: { es: "14 días gratis · Sin tarjeta", en: "14 days free · No card" } as L,
  },

  packages: {
    eyebrow: { es: "Paquetes", en: "Packages" } as L,
    title: { es: "Tres paquetes. Uno crece sobre el otro.", en: "Three packages. Each grows on the last." } as L,
    all: { es: "Ver los paquetes en detalle", en: "See the packages in detail" } as L,
  },

  questions: {
    title: { es: "Tres preguntas antes de empezar", en: "Three questions before you start" } as L,
    /** Copy's FAQ rows (lib/content/faq.ts). */
    kb: ["Q-11", "Q-14", "Q-16"],
    all: { es: "Todas las preguntas", en: "All the questions" } as L,
  },

  closing: {
    title: { es: "Tu próxima consulta ya está en camino.", en: "Your next enquiry is already on its way." } as L,
    cta: { es: "Probar 14 días gratis", en: "Try 14 days free" } as L,
    second: { es: "Hablar con una persona", en: "Talk to a person" } as L,
  },

  /** The one demonstration line of the page, with the link to the product truth. */
  demo: { es: "Ejemplo con personas e inmuebles inventados.", en: "Example with invented people and listings." } as L,
  today: { es: "Qué está disponible hoy", en: "What is available today" } as L,
};
