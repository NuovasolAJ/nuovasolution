import type { Locale } from "@/lib/i18n/config";

/**
 * Words of the agency login area (master order 2026-10-10 §8): the agency home and the weekly report.
 * WORKING text by the implementer; Copy confirms after the implementation.
 */
type L = Record<Locale, string>;

export const appWords = {
  home: {
    eyebrow: { es: "Tu agencia", en: "Your agency" },
    h1: { es: "Hola. Esto es lo que tienes hoy.", en: "Hello. This is what you have today." },
    lead: { es: "Tu configuración, tus informes y las conexiones de tu agencia, en un solo sitio.", en: "Your setup, your reports and your agency's connections, in one place." },
    trial: { es: "Prueba activa · quedan {days} días", en: "Trial active · {days} days left" },
    trialNoDays: { es: "Prueba activa", en: "Trial active" },
    cards: {
      reports: { title: { es: "Informe semanal", en: "Weekly report" }, line: { es: "Consultas atendidas, visitas pedidas, tareas cerradas y lo que sigue abierto.", en: "Enquiries handled, viewings asked for, tasks closed and what is still open." }, cta: { es: "Ver el informe", en: "See the report" } },
      setup: { title: { es: "Configuración de la agencia", en: "Agency setup" }, line: { es: "Datos, equipo, canales y CRM. El progreso se guarda.", en: "Details, team, channels and CRM. Progress is saved." }, cta: { es: "Abrir la configuración", en: "Open the setup" } },
      social: { title: { es: "Instagram", en: "Instagram" }, line: { es: "Publicaciones, comentarios y mensajes de tu cuenta conectada.", en: "Posts, comments and messages of your connected account." }, cta: { es: "Abrir", en: "Open" } },
    },
    todayTitle: { es: "Hoy en tu equipo", en: "Today in your team" },
    todayAwaiting: { es: "La vista operativa del día (tareas abiertas, quién ha tomado cuál) se muestra aquí en cuanto el contrato de datos del asistente del día esté entregado. No se muestran ceros mientras falte la fuente.", en: "The day's operative view (open tasks, who took which) appears here as soon as the daily assistant's data contract is delivered. No zeros are shown while the source is missing." },
    todayStub: { es: "Vista operativa de demostración: en una cuenta real aquí aparecen las tareas abiertas de hoy.", en: "Demonstration operative view: in a real account today's open tasks appear here." },
  },
  report: {
    eyebrow: { es: "Informe semanal", en: "Weekly report" },
    h1: { es: "Lo que pasó esta semana en tu agencia", en: "What happened in your agency this week" },
    lead: { es: "Cuentas de los registros que Nuova guarda en los canales conectados. Nada aquí es una estimación.", en: "Counts of the records Nuova keeps on the connected channels. Nothing here is an estimate." },
    period: { es: "Periodo", en: "Period" },
    generated: { es: "Generado", en: "Generated" },
    basis: { es: "Base de datos", en: "Data basis" },
    basisLine: { es: "Consultas registradas en Nuova en los canales conectados: {channels}.", en: "Enquiries recorded in Nuova on the connected channels: {channels}." },
    channels: { whatsapp: { es: "WhatsApp", en: "WhatsApp" }, email: { es: "email", en: "email" }, webform: { es: "formulario web", en: "web form" }, phone: { es: "teléfono", en: "phone" } },
    counts: {
      received: { es: "Consultas recibidas", en: "Enquiries received" },
      answered: { es: "Respondidas", en: "Answered" },
      viewings_requested: { es: "Visitas pedidas", en: "Viewings asked for" },
      viewings_confirmed: { es: "Visitas confirmadas por el equipo", en: "Viewings confirmed by the team" },
      valuations_requested: { es: "Valoraciones pedidas", en: "Valuations asked for" },
      tasks_closed: { es: "Tareas cerradas", en: "Tasks closed" },
      tasks_open: { es: "Tareas abiertas", en: "Tasks open" },
      proposals_sent: { es: "Propuestas enviadas", en: "Proposals sent" },
    },
    byChannel: { es: "Por canal", en: "By channel" },
    trend: { es: "Frente a la semana anterior", en: "Against the previous week" },
    trendLine: { es: "{received} consultas (antes {prevReceived}) · {answered} respondidas (antes {prevAnswered})", en: "{received} enquiries (before {prevReceived}) · {answered} answered (before {prevAnswered})" },
    openTitle: { es: "Acciones pendientes", en: "Open actions" },
    openEmpty: { es: "Nada pendiente al cierre de la semana.", en: "Nothing open at the end of the week." },
    since: { es: "desde", en: "since" },
    notMeasured: { es: "No medido", en: "Not measured" },
    scope: { es: "Este informe muestra solo lo que tu paquete produce. Las funciones que no están en tu paquete no aparecen.", en: "This report shows only what your package produces. Functions not in your package do not appear." },
    trialScope: { es: "Durante la prueba, el informe muestra las funciones del paquete de prueba y los datos realmente registrados.", en: "During the trial, the report shows the trial package's functions and the data really recorded." },
    awaiting: { es: "El informe se muestra en cuanto Reporting y API entreguen el contrato de datos (reports.weekly). Hasta entonces no se muestra ninguna cifra, tampoco un cero.", en: "The report appears as soon as Reporting and API deliver the data contract (reports.weekly). Until then no figure is shown, not even a zero." },
    notEntitled: { es: "Los informes no forman parte de tu paquete actual.", en: "Reports are not part of your current package." },
    stub: { es: "Datos de demostración: la semana del ejemplo de la página de inicio.", en: "Demonstration data: the week of the home page example." },
    emailPreview: { es: "Ver el email del lunes", en: "See Monday's email" },
    back: { es: "Volver a tu agencia", en: "Back to your agency" },
  },
  email: {
    eyebrow: { es: "El email del lunes", en: "Monday's email" },
    h1: { es: "Así llega el resumen semanal", en: "How the weekly summary arrives" },
    lead: { es: "Un email corto con las cifras principales y un botón al informe completo. Lo que ves es la plantilla que recibe tu agencia.", en: "A short email with the main figures and one button to the full report. What you see is the template your agency receives." },
    subject: { es: "Tu semana en Nuova: {received} consultas atendidas", en: "Your week in Nuova: {received} enquiries handled" },
    greeting: { es: "Hola,", en: "Hello," },
    intro: { es: "Esto es lo que pasó en tu agencia la semana pasada.", en: "This is what happened in your agency last week." },
    button: { es: "Ver el informe completo", en: "See the full report" },
    footer: { es: "Recibes este email porque eres administrador de tu agencia en Nuova. Las cifras son recuentos de los registros de Nuova en tus canales conectados.", en: "You receive this email because you are an administrator of your agency in Nuova. The figures are counts of Nuova's records on your connected channels." },
    openLine: { es: "Sigue abierto: {open}", en: "Still open: {open}" },
  },
} as const satisfies Record<string, Record<string, unknown>>;

export type { L };
