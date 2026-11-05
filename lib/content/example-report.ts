import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey } from "@/lib/claims";

/**
 * The public example report (closing order 27.10. §7; the owner's orders of 05.11.: F3 and the correction of the audit's three
 * faults): the home page's example week as one complete report anyone can see without a login. Every figure is an example
 * and says so; nothing here is any agency's data and nothing reads the backend. The basis of every figure is the 25 enquiries
 * received in week 4 (the home page's report): 23 answered, 4 viewings asked for (not 6), 3 of them agreed by the team, 2
 * waiting for a person; the channel values add up to the 25 received (13 + 9 + 2 + 1 + 0). No trial line (claims lines
 * 02.11.: no sign-up promise): the way on is access by invitation. WORKING text, for Copy (WEBSITE_COPY_HANDOVER_1105_v3).
 */
export const exampleReport: Record<Locale, {
  label: string; title: string; lead: string; example: string;
  figures: { title: string; value: string; line: string }[];
  trend: { title: string; note: string; alt: string; received: string; answered: string };
  weeks: { label: string; received: number; answered: number }[];
  channels: { title: string; note: string; basis: string; soon: string; rows: { name: string; v: number; claim: ClaimKey }[] };
  funnel: { title: string; note: string; steps: { name: string; v: number; d: string }[] };
  hours: { title: string; note: string; peak: string; rows: { h: string; v: number }[] };
  insights: { k: string; v: string; claim: ClaimKey }[];
  openTitle: string; openHead: { who: string; what: string; channel: string; prio: string; next: string; state: string };
  open: { who: string; what: string; channel: string; prio: string; next: string; state: string }[];
  nextTitle: string; next: string[];
  basis: string; ctaTitle: string; ctaLine: string; realReport: string;
}> = {
  es: {
    label: "Informe de ejemplo · no son datos de ninguna agencia",
    title: "Lo que ve una agencia al final de la semana",
    lead: "Así es el informe semanal de NuovaSolution, con la semana del ejemplo de la página de inicio. El informe real de tu agencia está en tu acceso.",
    example: "Datos de ejemplo",
    figures: [
      { title: "Consultas recibidas", value: "25", line: "mensajes nuevos registrados en la semana" },
      { title: "Respondidas", value: "23", line: "con una respuesta automática enviada" },
      { title: "Visitas pedidas", value: "4", line: "clientes que pidieron ver un inmueble · 3 acordadas por el equipo" },
      { title: "Esperan a una persona", value: "2", line: "la valoración de los Keller y la respuesta de Sofía" },
    ],
    trend: { title: "Consultas por semana", note: "Cuatro semanas de ejemplo", alt: "Gráfico de líneas: consultas recibidas y respondidas en cuatro semanas de ejemplo: 19 y 17, 24 y 22, 21 y 20, 25 y 23.", received: "Recibidas", answered: "Respondidas" },
    weeks: [
      { label: "Semana 1", received: 19, answered: 17 },
      { label: "Semana 2", received: 24, answered: 22 },
      { label: "Semana 3", received: 21, answered: 20 },
      { label: "Semana 4", received: 25, answered: 23 },
    ],
    channels: {
      title: "Por canal", note: "Semana 4 · las 25 consultas recibidas", basis: "Base: consultas recibidas, no respondidas.", soon: "próximamente",
      rows: [{ name: "WhatsApp", v: 13, claim: "replySpanish" }, { name: "Email", v: 9, claim: "replySpanish" }, { name: "Formulario web", v: 2, claim: "webform" }, { name: "Teléfono", v: 1, claim: "phoneAssistant" }, { name: "Instagram", v: 0, claim: "instagram" }],
    },
    funnel: {
      title: "De consulta a visita", note: "Semana 4",
      steps: [{ name: "Consultas", v: 25, d: "recibidas" }, { name: "Respondidas", v: 23, d: "respuesta automática enviada" }, { name: "Visitas pedidas", v: 4, d: "el cliente pidió ver un inmueble" }, { name: "Acordadas", v: 3, d: "día y hora fijados por el equipo" }],
    },
    hours: {
      title: "Hora punta de consultas", note: "Semana 4 · por hora de llegada", peak: "11–13 h",
      rows: [{ h: "7", v: 1 }, { h: "8", v: 1 }, { h: "9", v: 2 }, { h: "10", v: 3 }, { h: "11", v: 4 }, { h: "12", v: 4 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 2 }, { h: "17", v: 1 }, { h: "18", v: 1 }, { h: "19", v: 1 }, { h: "21", v: 1 }, { h: "23", v: 1 }],
    },
    insights: [{ k: "Tu mejor canal", v: "WhatsApp · 13 de 25", claim: "reportInLogin" }, { k: "Hora punta de consultas", v: "11–13 h", claim: "reportTrend" }, { k: "De consulta a visita", v: "4 de 25 piden visita", claim: "reportInLogin" }],
    openTitle: "Casos abiertos",
    openHead: { who: "Quién", what: "Qué pide", channel: "Canal", prio: "Prioridad", next: "Siguiente paso", state: "Estado" },
    open: [
      { who: "Peter y Anna Keller", what: "valoración de una villa en Elviria", channel: "Email", prio: "Alta", next: "Proponer fecha de valoración", state: "Espera a una persona" },
      { who: "Sofía Lamas", what: "alquiler de larga temporada en Fuengirola desde enero", channel: "Formulario web", prio: "Media", next: "Enviar lo disponible", state: "Esperando su respuesta" },
      { who: "Laura Serrano", what: "piso de 2 dormitorios en Estepona, hasta 320.000 €", channel: "WhatsApp", prio: "Alta", next: "Visita del jueves a las 10:00", state: "Visita acordada" },
      { who: "Carmen Ortega", what: "valoración de su piso en Fuengirola", channel: "Email", prio: "Alta", next: "Proponer una fecha", state: "Abierta" },
    ],
    nextTitle: "Qué toca hacer",
    next: ["Proponer a los Keller una fecha para la visita de valoración.", "Enviar a Sofía lo disponible en alquiler desde enero.", "Recordar a Laura la visita del jueves a las 10:00."],
    basis: "Base: consultas registradas en NuovaSolution en los canales conectados, de lunes a domingo. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide. Los canales marcados como próximamente son datos de ejemplo.",
    ctaTitle: "Tu informe, con tus consultas",
    ctaLine: "Hoy, acceso por invitación. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar.",
    realReport: "Ya tengo acceso: ver mi informe",
  },
  en: {
    label: "Example report · not any agency's data",
    title: "What an agency sees at the end of the week",
    lead: "This is NuovaSolution's weekly report, with the home page's example week. Your agency's real report is in your login.",
    example: "Example data",
    figures: [
      { title: "Enquiries received", value: "25", line: "new messages recorded in the week" },
      { title: "Answered", value: "23", line: "with an automatic reply sent" },
      { title: "Viewings asked for", value: "4", line: "customers who asked to see a property · 3 agreed by the team" },
      { title: "Waiting for a person", value: "2", line: "the Kellers' valuation and Sofía's reply" },
    ],
    trend: { title: "Enquiries per week", note: "Four example weeks", alt: "Line chart: enquiries received and answered in four example weeks: 19 and 17, 24 and 22, 21 and 20, 25 and 23.", received: "Received", answered: "Answered" },
    weeks: [
      { label: "Week 1", received: 19, answered: 17 },
      { label: "Week 2", received: 24, answered: 22 },
      { label: "Week 3", received: 21, answered: 20 },
      { label: "Week 4", received: 25, answered: 23 },
    ],
    channels: {
      title: "By channel", note: "Week 4 · the 25 enquiries received", basis: "Basis: enquiries received, not answered.", soon: "coming soon",
      rows: [{ name: "WhatsApp", v: 13, claim: "replySpanish" }, { name: "E-mail", v: 9, claim: "replySpanish" }, { name: "Web form", v: 2, claim: "webform" }, { name: "Phone", v: 1, claim: "phoneAssistant" }, { name: "Instagram", v: 0, claim: "instagram" }],
    },
    funnel: {
      title: "From enquiry to viewing", note: "Week 4",
      steps: [{ name: "Enquiries", v: 25, d: "received" }, { name: "Answered", v: 23, d: "automatic reply sent" }, { name: "Viewings asked for", v: 4, d: "the customer asked to see a property" }, { name: "Agreed", v: 3, d: "day and time fixed by the team" }],
    },
    hours: {
      title: "Peak hour of enquiries", note: "Week 4 · by hour of arrival", peak: "11–13 h",
      rows: [{ h: "7", v: 1 }, { h: "8", v: 1 }, { h: "9", v: 2 }, { h: "10", v: 3 }, { h: "11", v: 4 }, { h: "12", v: 4 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 2 }, { h: "17", v: 1 }, { h: "18", v: 1 }, { h: "19", v: 1 }, { h: "21", v: 1 }, { h: "23", v: 1 }],
    },
    insights: [{ k: "Your best channel", v: "WhatsApp · 13 of 25", claim: "reportInLogin" }, { k: "Peak hour of enquiries", v: "11–13 h", claim: "reportTrend" }, { k: "From enquiry to viewing", v: "4 of 25 ask for a viewing", claim: "reportInLogin" }],
    openTitle: "Open cases",
    openHead: { who: "Who", what: "What they ask", channel: "Channel", prio: "Priority", next: "Next step", state: "State" },
    open: [
      { who: "Peter and Anna Keller", what: "valuation of a villa in Elviria", channel: "E-mail", prio: "High", next: "Propose a valuation date", state: "Waiting for a person" },
      { who: "Sofía Lamas", what: "long-term rental in Fuengirola from January", channel: "Web form", prio: "Medium", next: "Send what is available", state: "Waiting for her reply" },
      { who: "Laura Serrano", what: "two-bedroom flat in Estepona, up to €320,000", channel: "WhatsApp", prio: "High", next: "Thursday's 10:00 viewing", state: "Viewing agreed" },
      { who: "Carmen Ortega", what: "valuation of her flat in Fuengirola", channel: "E-mail", prio: "High", next: "Propose a date", state: "Open" },
    ],
    nextTitle: "What to do next",
    next: ["Propose the Kellers a date for the valuation visit.", "Send Sofía what is available to rent from January.", "Remind Laura of Thursday's 10:00 viewing."],
    basis: "Basis: enquiries recorded in NuovaSolution on the connected channels, Monday to Sunday. Answered is not the same as delivered: what reaches the customer is not measured yet. Channels marked coming soon are example data.",
    ctaTitle: "Your report, with your enquiries",
    ctaLine: "Today, access by invitation. Your agency's report is built from your enquiries; there are no figures to fill in.",
    realReport: "I already have access: see my report",
  },
};
