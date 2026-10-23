import type { Locale } from "@/lib/i18n/config";

/**
 * Words of the agency login area (master order 2026-10-10 §8; final order 2026-10-12 §8): the agency home and the
 * weekly report. The report answers three questions first (what Nuova handled, which chances came up, what to do
 * next) and keeps the details under them. WORKING text by the implementer; the mail wording follows Copy's
 * WEEKLY_REPORT_MAIL_v1.md.
 */
type L = Record<Locale, string>;

export const appWords = {
  home: {
    eyebrow: { es: "Tu agencia", en: "Your agency" },
    h1: { es: "Hola. Esto es lo que tienes hoy.", en: "Hello. This is what you have today." },
    lead: { es: "Tu configuración, tus informes y las conexiones de tu agencia, en un solo sitio.", en: "Your setup, your reports and your agency's connections, in one place." },
    trial: { es: "Prueba activa · paquete {plan} · quedan {days} días", en: "Trial active · {plan} package · {days} days left" },
    trialNoDays: { es: "Prueba activa · paquete {plan}", en: "Trial active · {plan} package" },
    cards: {
      reports: { title: { es: "Informe semanal", en: "Weekly report" }, line: { es: "Qué atendió Nuova, qué chances hay abiertas y qué toca hacer.", en: "What Nuova handled, which chances are open and what to do next." }, cta: { es: "Ver el informe", en: "See the report" } },
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
    lead: { es: "Recuentos de los registros que Nuova guarda en los canales conectados. Lo que no se mide no aparece como cero.", en: "Counts of the records Nuova keeps on the connected channels. What is not measured never appears as zero." },
    demo: { es: "Datos de demostración: la semana del ejemplo de la página de inicio. No son datos de ninguna agencia.", en: "Demonstration data: the week of the home page example. Not any agency's data." },
    /** The three questions (final order §8). */
    handled: { title: { es: "Lo que atendió Nuova", en: "What Nuova handled" }, line: { es: "{answered} consultas respondidas y registradas de {received} recibidas", en: "{answered} enquiries answered and recorded out of {received} received" } },
    chances: { title: { es: "Chances que han surgido", en: "Chances that came up" }, line: { es: "{viewings} visitas pedidas, {confirmed} acordadas por el equipo · {valuations} valoraciones pedidas", en: "{viewings} viewings asked for, {confirmed} agreed by the team · {valuations} valuations asked for" } /* HANDOVER_1021 A-16 */ },
    next: { title: { es: "Lo que toca hacer", en: "What to do next" }, line: { es: "{open} cosas esperan a una persona de tu equipo", en: "{open} things wait for a person in your team" } },
    detailsTitle: { es: "Los detalles", en: "The details" },
    period: { es: "Periodo", en: "Period" },
    generated: { es: "Generado", en: "Generated" },
    basis: { es: "Base de datos", en: "Data basis" },
    basisLine: { es: "Consultas registradas en Nuova en los canales conectados: {channels}.", en: "Enquiries recorded in Nuova on the connected channels: {channels}." },
    channels: { whatsapp: { es: "WhatsApp", en: "WhatsApp" }, email: { es: "email", en: "email" }, webform: { es: "formulario web", en: "web form" }, phone: { es: "teléfono", en: "phone" } },
    counts: {
      received: { es: "Consultas recibidas", en: "Enquiries received" },
      answered: { es: "Respondidas", en: "Answered" },
      viewings_requested: { es: "Visitas pedidas", en: "Viewings asked for" },
      viewings_confirmed: { es: "Visitas acordadas por el equipo", en: "Viewings agreed by the team" }, // COPY_1019 R-10
      valuations_requested: { es: "Valoraciones pedidas", en: "Valuations asked for" },
      tasks_closed: { es: "Tareas cerradas por el equipo", en: "Tasks closed by the team" },
      tasks_open: { es: "Tareas abiertas", en: "Tasks open" },
      proposals_sent: { es: "Propuestas enviadas", en: "Proposals sent" },
    },
    byChannel: { es: "Por canal", en: "By channel" },
    trend: { es: "Frente a la semana anterior", en: "Against the previous week" },
    trendLine: { es: "{received} consultas (antes {prevReceived}) · {answered} respondidas (antes {prevAnswered})", en: "{received} enquiries (before {prevReceived}) · {answered} answered (before {prevAnswered})" },
    trendThin: { es: "Semana pasada: {prevReceived} consultas. Son pocas para sacar una tendencia.", en: "Last week: {prevReceived} enquiries. Too few to read a trend into." },
    openTitle: { es: "Acciones pendientes", en: "Open actions" },
    openEmpty: { es: "Nada pendiente al cierre de la semana.", en: "Nothing open at the end of the week." },
    since: { es: "desde", en: "since" },
    notMeasured: { es: "No medido", en: "Not measured" },
    notMeasuredLine: { es: "Esto no lo medimos todavía: {list}. Cuando lo hagamos, aparecerá aquí.", en: "We do not measure these yet: {list}. When we do, they will appear here." },
    scope: { es: "Este informe muestra solo lo que tu paquete produce. Las funciones que no están en tu paquete no aparecen.", en: "This report shows only what your package produces. Functions not in your package do not appear." },
    trialScope: { es: "Durante la prueba, el informe muestra lo que incluye Essential.", en: "During the trial the report shows what Essential includes." },
    awaiting: { es: "El informe se muestra en cuanto Reporting y API entreguen el contrato de datos (reports.weekly). Hasta entonces no se muestra ninguna cifra, tampoco un cero.", en: "The report appears as soon as Reporting and API deliver the data contract (reports.weekly). Until then no figure is shown, not even a zero." },
    notEntitled: { es: "Los informes no forman parte de tu paquete actual.", en: "Reports are not part of your current package." },
    emailPreview: { es: "Ver el email del lunes", en: "See Monday's email" },
    back: { es: "Volver a tu agencia", en: "Back to your agency" },
  },
  /** The Monday email (Copy, WEEKLY_REPORT_MAIL_v1.md §2–§6). */
  email: {
    eyebrow: { es: "El email del lunes", en: "Monday's email" },
    h1: { es: "Así llega el resumen semanal", en: "How the weekly summary arrives" },
    lead: { es: "Un email corto con las cifras principales y un botón al informe completo. Lo que ves es la plantilla que recibe tu agencia, en la hülle común de todos los correos de Nuova.", en: "A short email with the main figures and one button to the full report. What you see is the template your agency receives, in the shared shell of every Nuova mail." },
    subjectAnswered: { es: "Tu semana en Nuova: {answered} consultas atendidas", en: "Your week in Nuova: {answered} enquiries answered" },
    subjectReceived: { es: "Tu semana en Nuova: {received} consultas recibidas", en: "Your week in Nuova: {received} enquiries received" },
    subjectNone: { es: "Tu semana en Nuova", en: "Your week in Nuova" },
    subjectZero: { es: "Tu semana en Nuova: ninguna consulta esta semana", en: "Your week in Nuova: no enquiries this week" },
    eyebrowMail: { es: "Resumen semanal", en: "Weekly summary" },
    greeting: { es: "Hola {name},", en: "Hello {name}," },
    opening: { es: "Esto es lo que pasó en {agency} del {from} al {to}.", en: "Here is what happened at {agency} from {from} to {to}." },
    basis: { es: "Cuentan los canales conectados: {channels}.", en: "The connected channels count towards this: {channels}." },
    lineReceived: { es: "Llegaron {received} consultas y se atendieron {answered}.", en: "{received} enquiries arrived and {answered} were answered." },
    lineChannels: { es: "Por canal: {list}.", en: "By channel: {list}." },
    lineViewings: { es: "Se pidieron {viewings} visitas.", en: "{viewings} viewings were requested." },
    lineValuations: { es: "Se pidieron {valuations} valoraciones.", en: "{valuations} valuations were requested." },
    lineTasks: { es: "Tu equipo cerró {tasks} tareas.", en: "Your team closed {tasks} tasks." },
    lineProposals: { es: "Se enviaron {proposals} propuestas de inmuebles.", en: "{proposals} property proposals were sent." },
    linePrevious: { es: "La semana pasada fueron {prev}.", en: "Last week it was {prev}." },
    linePreviousThin: { es: "Semana pasada: {prev}. Son pocas para sacar una tendencia.", en: "Last week: {prev}. Too few to read a trend into." },
    lineOpen: { es: "Siguen abiertas {open} cosas que esperan a una persona.", en: "{open} things are still waiting for a person." },
    zeroOpening: { es: "Esta semana no llegó ninguna consulta por los canales conectados ({channels}).", en: "No enquiries arrived this week through the connected channels ({channels})." },
    zeroNext: { es: "Si esperabas consultas esta semana, dinos por qué canal y lo revisamos contigo.", en: "If you expected enquiries this week, tell us which channel and we will look at it with you." },
    notMeasured: { es: "Esto no lo medimos todavía: {list}. Cuando lo hagamos, aparecerá aquí.", en: "We do not measure these yet: {list}. When we do, they will appear here." },
    trial: { es: "Durante la prueba, el informe muestra lo que incluye Essential.", en: "During the trial the report shows what Essential includes." },
    button: { es: "Ver el informe completo", en: "See the full report" },
    underButton: { es: "Entras con tu cuenta de agencia.", en: "You sign in with your agency account." },
    close: { es: "Si algo no cuadra, respóndenos a este correo.", en: "If something does not add up, reply to this mail." },
    footer: { es: "Recibes este email porque eres administrador de tu agencia en Nuova. Las cifras son recuentos de los registros de Nuova en tus canales conectados.", en: "You receive this email because you are an administrator of your agency in Nuova. The figures are counts of Nuova's records on your connected channels." },
    logoAlt: "NuovaSolution",
  },
} as const satisfies Record<string, Record<string, unknown>>;

export type { L };
