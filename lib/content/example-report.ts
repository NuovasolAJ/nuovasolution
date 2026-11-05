import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey } from "@/lib/claims";

/**
 * The public example report (closing order 27.10. §7; the owner's order of 05.11. F3 and the correction of the audit's three
 * faults; the text and figures are Copy's WEBSITE_COPY_HANDOVER_1105_v3.md §6 and §7, one set of example figures, the same on the
 * home page): the home page's example week as one complete report anyone can see without a login. Every figure is an example and
 * says so; nothing here is any agency's data and nothing reads the backend. Week 4 = 25 received (WhatsApp 14 · Email 11), 23
 * answered (the other 2 arrived in another language), 6 viewings asked for of which 4 agreed by the team, 2 waiting for a
 * person. The channels are the two in production; further channels appear only marked "Próximamente", with no figure invented.
 * No trial line (claims lines 02.11.): the way on is access by invitation.
 */
export const exampleReport: Record<Locale, {
  label: string; title: string; lead: string; example: string;
  figures: { title: string; value: string; line: string }[];
  trend: { title: string; note: string; alt: string; received: string; answered: string; axisY: string; axisX: string };
  weeks: { label: string; received: number; answered: number }[];
  channels: { title: string; note: string; basis: string; rows: { name: string; v: number | null; claim: ClaimKey }[] };
  funnel: { title: string; note: string; steps: { name: string; v: number; d: string }[] };
  hours: { title: string; note: string; peak: string; rows: { h: string; v: number }[] };
  insights: { k: string; v: string; d: string; claim: ClaimKey }[];
  insightsState: string;
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
      { title: "Consultas recibidas", value: "25", line: "mensajes nuevos por WhatsApp y email registrados en la semana · WhatsApp 14 · Email 11" },
      { title: "Respondidas", value: "23", line: "con una respuesta automática enviada · las otras 2 llegaron en otro idioma: no se envía nada automáticamente" },
      { title: "Visitas pedidas", value: "6", line: "clientes que pidieron ver un inmueble · 4 acordadas por el equipo · pedida no es acordada" },
      { title: "Esperan a una persona", value: "2", line: "consultas abiertas que necesitan a alguien del equipo" },
    ],
    trend: { title: "Consultas por semana", note: "Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado: próximamente.", alt: "Gráfico de líneas: consultas recibidas y respondidas en cuatro semanas de ejemplo: 19 y 17, 24 y 22, 21 y 20, 25 y 23.", received: "Recibidas", answered: "Respondidas", axisY: "Consultas", axisX: "Semana" },
    weeks: [
      { label: "Semana 1", received: 19, answered: 17 },
      { label: "Semana 2", received: 24, answered: 22 },
      { label: "Semana 3", received: 21, answered: 20 },
      { label: "Semana 4", received: 25, answered: 23 },
    ],
    channels: {
      title: "Por canal", note: "Semana 4 · las 25 consultas recibidas", basis: "Las mismas 25, según el canal de llegada. Los canales marcados como próximamente no tienen cifras: no están en producción.",
      rows: [{ name: "WhatsApp", v: 14, claim: "replySpanish" }, { name: "Email", v: 11, claim: "replySpanish" }, { name: "Formulario web", v: null, claim: "webform" }, { name: "Teléfono", v: null, claim: "phoneAssistant" }, { name: "Portales y anuncios", v: null, claim: "adsLeads" }],
    },
    funnel: {
      title: "De consulta a visita", note: "Semana 4",
      steps: [{ name: "Consultas", v: 25, d: "recibidas" }, { name: "Respondidas", v: 23, d: "respuesta automática enviada" }, { name: "Visitas pedidas", v: 6, d: "el cliente pidió ver un inmueble" }, { name: "Acordadas", v: 4, d: "día y hora fijados por una persona del equipo" }],
    },
    hours: {
      title: "Hora punta", note: "Semana 4 · por hora de llegada", peak: "11:00–12:00 · 6 consultas",
      rows: [{ h: "7", v: 1 }, { h: "8", v: 1 }, { h: "9", v: 2 }, { h: "10", v: 3 }, { h: "11", v: 6 }, { h: "12", v: 3 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 2 }, { h: "17", v: 1 }, { h: "18", v: 1 }, { h: "19", v: 1 }, { h: "21", v: 1 }],
    },
    insights: [
      { k: "Tu mejor canal", v: "WhatsApp · 14 de 25 consultas", d: "El canal por el que llegaron más consultas en la semana.", claim: "reportTrend" },
      { k: "Hora punta", v: "11:00–12:00 · 6 consultas", d: "La franja de una hora en la que llegaron más consultas.", claim: "reportTrend" },
      { k: "De consulta a visita", v: "24 % · 6 de 25", d: "Visitas pedidas sobre consultas recibidas. No es una tasa de venta.", claim: "reportTrend" },
    ],
    insightsState: "Estas conclusiones forman parte del informe ampliado: próximamente.",
    openTitle: "Casos abiertos",
    openHead: { who: "Quién", what: "Qué pide", channel: "Canal", prio: "Prioridad", next: "Siguiente paso", state: "Estado" },
    open: [
      { who: "Peter y Anna Keller", what: "valoración de una villa en Elviria", channel: "Email", prio: "Alta", next: "Proponer una fecha para la valoración", state: "Espera a una persona" },
      { who: "Sofía Lamas", what: "alquiler de larga temporada en Fuengirola desde enero", channel: "Email", prio: "Media", next: "Enviar lo disponible", state: "Esperando su respuesta" },
      { who: "Laura Serrano", what: "piso de 2 dormitorios en Estepona, hasta 320.000 €", channel: "WhatsApp", prio: "Alta", next: "Visita del jueves a las 10:00", state: "Visita acordada" },
      { who: "Carmen Ortega", what: "valoración de su piso en Fuengirola", channel: "Email", prio: "Alta", next: "Proponer una fecha", state: "Abierta" },
    ],
    nextTitle: "Qué toca hacer",
    next: ["Proponer a los Keller una fecha para la valoración.", "Enviar a Sofía lo disponible en alquiler desde enero.", "Recordar a Laura la visita del jueves a las 10:00."],
    basis: "Base: consultas registradas en NuovaSolution en los canales conectados, de lunes a domingo. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide.",
    ctaTitle: "Míralo con los datos de tu agencia",
    ctaLine: "Acceso por invitación mientras preparamos el registro público. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar.",
    realReport: "Ya tengo acceso: ver mi informe",
  },
  en: {
    label: "Example report · not any agency's data",
    title: "What an agency sees at the end of the week",
    lead: "This is NuovaSolution's weekly report, with the home page's example week. Your agency's real report is in your login.",
    example: "Example data",
    figures: [
      { title: "Enquiries received", value: "25", line: "new WhatsApp and e-mail messages recorded in the week · WhatsApp 14 · E-mail 11" },
      { title: "Answered", value: "23", line: "with an automatic reply sent · the other 2 arrived in another language: nothing is sent automatically" },
      { title: "Viewings asked for", value: "6", line: "customers who asked to see a property · 4 agreed by the team · asked is not agreed" },
      { title: "Waiting for a person", value: "2", line: "open enquiries that need someone on the team" },
    ],
    trend: { title: "Enquiries per week", note: "Four example weeks. The week-by-week trend is part of the extended report: coming soon.", alt: "Line chart: enquiries received and answered in four example weeks: 19 and 17, 24 and 22, 21 and 20, 25 and 23.", received: "Received", answered: "Answered", axisY: "Enquiries", axisX: "Week" },
    weeks: [
      { label: "Week 1", received: 19, answered: 17 },
      { label: "Week 2", received: 24, answered: 22 },
      { label: "Week 3", received: 21, answered: 20 },
      { label: "Week 4", received: 25, answered: 23 },
    ],
    channels: {
      title: "By channel", note: "Week 4 · the 25 enquiries received", basis: "The same 25, by the channel they arrived on. Channels marked coming soon carry no figure: they are not in production.",
      rows: [{ name: "WhatsApp", v: 14, claim: "replySpanish" }, { name: "E-mail", v: 11, claim: "replySpanish" }, { name: "Web form", v: null, claim: "webform" }, { name: "Phone", v: null, claim: "phoneAssistant" }, { name: "Portals and ads", v: null, claim: "adsLeads" }],
    },
    funnel: {
      title: "From enquiry to viewing", note: "Week 4",
      steps: [{ name: "Enquiries", v: 25, d: "received" }, { name: "Answered", v: 23, d: "automatic reply sent" }, { name: "Viewings asked for", v: 6, d: "the customer asked to see a property" }, { name: "Agreed", v: 4, d: "day and time fixed by someone on the team" }],
    },
    hours: {
      title: "Peak hour", note: "Week 4 · by hour of arrival", peak: "11:00–12:00 · 6 enquiries",
      rows: [{ h: "7", v: 1 }, { h: "8", v: 1 }, { h: "9", v: 2 }, { h: "10", v: 3 }, { h: "11", v: 6 }, { h: "12", v: 3 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 2 }, { h: "17", v: 1 }, { h: "18", v: 1 }, { h: "19", v: 1 }, { h: "21", v: 1 }],
    },
    insights: [
      { k: "Your top channel", v: "WhatsApp · 14 of 25 enquiries", d: "The channel that brought the most enquiries in the week.", claim: "reportTrend" },
      { k: "Peak hour", v: "11:00–12:00 · 6 enquiries", d: "The one-hour slot in which most enquiries arrived.", claim: "reportTrend" },
      { k: "Enquiry to viewing", v: "24% · 6 of 25", d: "Viewings asked for out of enquiries received. Not a sales rate.", claim: "reportTrend" },
    ],
    insightsState: "These insights are part of the extended report: coming soon.",
    openTitle: "Open cases",
    openHead: { who: "Who", what: "What they ask", channel: "Channel", prio: "Priority", next: "Next step", state: "State" },
    open: [
      { who: "Peter and Anna Keller", what: "valuation of a villa in Elviria", channel: "E-mail", prio: "High", next: "Propose a date for the valuation", state: "Waiting for a person" },
      { who: "Sofía Lamas", what: "long-term rental in Fuengirola from January", channel: "E-mail", prio: "Medium", next: "Send what is available", state: "Waiting for her reply" },
      { who: "Laura Serrano", what: "two-bedroom flat in Estepona, up to €320,000", channel: "WhatsApp", prio: "High", next: "Thursday's 10:00 viewing", state: "Viewing agreed" },
      { who: "Carmen Ortega", what: "valuation of her flat in Fuengirola", channel: "E-mail", prio: "High", next: "Propose a date", state: "Open" },
    ],
    nextTitle: "What to do next",
    next: ["Propose the Kellers a date for the valuation.", "Send Sofía what is available to rent from January.", "Remind Laura of Thursday's 10:00 viewing."],
    basis: "Basis: enquiries recorded in NuovaSolution on the connected channels, Monday to Sunday. Answered is not the same as delivered: what reaches the customer is not measured yet.",
    ctaTitle: "See it with your agency's data",
    ctaLine: "Access by invitation while public registration is being prepared. Your agency's report is built from your enquiries; there are no figures to fill in.",
    realReport: "I already have access: see my report",
  },
};
