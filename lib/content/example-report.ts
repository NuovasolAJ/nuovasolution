import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, type ClaimView } from "@/lib/claims";

/**
 * The public example report (closing order 27.10. §7; the owner's order of 05.11. F3 and the verdict of 06.11.; Copy's handover
 * 1105 v3 §6, §7 and §19): the home page's example week as one complete report anyone can see without a login. Every figure is an
 * example and says so; nothing here is any agency's data and nothing reads the backend. Week 4 = 25 received · 23 answered (the
 * other 2 arrived in another language) · 2 waiting for a person · 6 viewings asked for, 4 agreed. The channels, the trend, the
 * insights, the hours and the funnel's rates belong to the extended report (`reportTrend`); the figures, the funnel's steps, the
 * open cases and the next steps stand on every view. The channel figures and the insights are the home page's (lib/content/home-1103.ts),
 * so both add up to the same 25. No status word.
 */
export const exampleReport: Record<Locale, {
  label: string; title: string; lead: string; example: string;
  figures: { title: string; value: string; line: string }[];
  trend: { title: string; note: string; alt: string; received: string; answered: string; axisY: string; axisX: string };
  weeks: { label: string; received: number; answered: number }[];
  channels: { title: string; note: string; basis: string };
  funnel: { title: string; note: string; ratesNote: string; steps: { name: string; v: number; d: string }[] };
  hours: { title: string; note: string; peak: string; office: string; rows: { h: string; v: number }[] };
  openTitle: string; openHead: { who: string; what: string; channel: string; prio: string; next: string; state: string };
  open: { who: string; what: string; channel: string; prio: string; next: string; state: string }[];
  nextTitle: string; next: string[];
  basis: string; ctaTitle: string; ctaLine: string; ctaLinePublic: string; realReport: string;
}> = {
  es: {
    label: "Informe de ejemplo · no son datos de ninguna agencia",
    title: "Lo que ve una agencia al final de la semana",
    lead: "Así es el informe semanal de NuovaSolution, con la semana del ejemplo de la página de inicio. El informe real de tu agencia está en tu acceso.",
    example: "Datos de ejemplo",
    figures: [
      { title: "Consultas recibidas", value: "25", line: "consultas nuevas registradas en la semana" },
      { title: "Respondidas", value: "23", line: "con una respuesta automática · las otras 2 llegaron en otro idioma: no se envía nada automáticamente" },
      { title: "Visitas pedidas", value: "6", line: "clientes que pidieron ver un inmueble · 4 acordadas por el equipo · pedida no es acordada" },
      { title: "Esperan a una persona", value: "2", line: "consultas abiertas que necesitan a alguien del equipo" },
    ],
    trend: { title: "Consultas por semana", note: "Cuatro semanas de ejemplo.", alt: "Gráfico de líneas: consultas recibidas y respondidas en cuatro semanas de ejemplo: 19 y 17, 24 y 22, 21 y 20, 25 y 23.", received: "Recibidas", answered: "Respondidas", axisY: "Consultas", axisX: "Semana" },
    weeks: [
      { label: "Semana 1", received: 19, answered: 17 },
      { label: "Semana 2", received: 24, answered: 22 },
      { label: "Semana 3", received: 21, answered: 20 },
      { label: "Semana 4", received: 25, answered: 23 },
    ],
    channels: { title: "Por canal", note: "Semana 4 · las 25 consultas recibidas", basis: "Las mismas 25, según el canal de llegada." },
    funnel: {
      title: "De consulta a visita", note: "Semana 4", ratesNote: "Porcentajes sobre las 25 consultas recibidas.",
      steps: [{ name: "Consultas", v: 25, d: "recibidas" }, { name: "Respondidas", v: 23, d: "respuesta automática" }, { name: "Visitas pedidas", v: 6, d: "el cliente pidió ver un inmueble" }, { name: "Acordadas", v: 4, d: "día y hora fijados por una persona del equipo" }],
    },
    hours: {
      title: "Hora punta", note: "Semana 4 · por hora de llegada", peak: "11:00–12:00 · 6 consultas", office: "Horario de la agencia de ejemplo: de 10:00 a 14:00 y de 17:00 a 20:00.",
      rows: [{ h: "7", v: 1 }, { h: "9", v: 1 }, { h: "10", v: 2 }, { h: "11", v: 6 }, { h: "12", v: 3 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 1 }, { h: "18", v: 2 }, { h: "19", v: 1 }, { h: "20", v: 2 }, { h: "21", v: 2 }, { h: "23", v: 1 }],
    },
    openTitle: "Casos abiertos",
    openHead: { who: "Quién", what: "Qué pide", channel: "Canal", prio: "Prioridad", next: "Siguiente paso", state: "Estado" },
    open: [
      { who: "Peter y Anna Keller", what: "valoración de una villa en Elviria", channel: "Email", prio: "Alta", next: "Proponer una fecha para la valoración", state: "Espera a una persona" },
      { who: "Sofía Lamas", what: "alquiler de larga temporada en Fuengirola desde enero", channel: "⟦sofia⟧", prio: "Media", next: "Enviar lo disponible", state: "Esperando su respuesta" },
      { who: "Laura Serrano", what: "piso de 2 dormitorios en Estepona, hasta 320.000 €", channel: "WhatsApp", prio: "Alta", next: "Visita del jueves a las 10:00", state: "Visita acordada" },
      { who: "Carmen Ortega", what: "valoración de su piso en Fuengirola", channel: "Email", prio: "Alta", next: "Proponer una fecha", state: "Abierta" },
    ],
    nextTitle: "Qué toca hacer",
    next: ["Proponer a los Keller una fecha para la valoración.", "Enviar a Sofía lo disponible en alquiler desde enero.", "Recordar a Laura la visita del jueves a las 10:00."],
    basis: "Base: consultas registradas en NuovaSolution, de lunes a domingo. Respondida no es lo mismo que entregada: el informe no mide lo que llega al cliente.",
    ctaTitle: "Míralo con los datos de tu agencia",
    ctaLine: "El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar.",
    ctaLinePublic: "Acceso por invitación. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar.",
    realReport: "Ya tengo acceso: ver mi informe",
  },
  en: {
    label: "Example report · not any agency's data",
    title: "What an agency sees at the end of the week",
    lead: "This is NuovaSolution's weekly report, with the home page's example week. Your agency's real report is in your login.",
    example: "Example data",
    figures: [
      { title: "Enquiries received", value: "25", line: "new enquiries recorded in the week" },
      { title: "Answered", value: "23", line: "with an automatic reply · the other 2 arrived in another language: nothing is sent automatically" },
      { title: "Viewings asked for", value: "6", line: "customers who asked to see a property · 4 agreed by the team · asked is not agreed" },
      { title: "Waiting for a person", value: "2", line: "open enquiries that need someone on the team" },
    ],
    trend: { title: "Enquiries per week", note: "Four example weeks.", alt: "Line chart: enquiries received and answered in four example weeks: 19 and 17, 24 and 22, 21 and 20, 25 and 23.", received: "Received", answered: "Answered", axisY: "Enquiries", axisX: "Week" },
    weeks: [
      { label: "Week 1", received: 19, answered: 17 },
      { label: "Week 2", received: 24, answered: 22 },
      { label: "Week 3", received: 21, answered: 20 },
      { label: "Week 4", received: 25, answered: 23 },
    ],
    channels: { title: "By channel", note: "Week 4 · the 25 enquiries received", basis: "The same 25, by the channel they arrived on." },
    funnel: {
      title: "From enquiry to viewing", note: "Week 4", ratesNote: "Percentages of the 25 enquiries received.",
      steps: [{ name: "Enquiries", v: 25, d: "received" }, { name: "Answered", v: 23, d: "automatic reply" }, { name: "Viewings asked for", v: 6, d: "the customer asked to see a property" }, { name: "Agreed", v: 4, d: "day and time fixed by someone on the team" }],
    },
    hours: {
      title: "Peak hour", note: "Week 4 · by hour of arrival", peak: "11:00–12:00 · 6 enquiries", office: "Hours of the example agency: 10:00 to 14:00 and 17:00 to 20:00.",
      rows: [{ h: "7", v: 1 }, { h: "9", v: 1 }, { h: "10", v: 2 }, { h: "11", v: 6 }, { h: "12", v: 3 }, { h: "13", v: 2 }, { h: "14", v: 1 }, { h: "16", v: 1 }, { h: "18", v: 2 }, { h: "19", v: 1 }, { h: "20", v: 2 }, { h: "21", v: 2 }, { h: "23", v: 1 }],
    },
    openTitle: "Open cases",
    openHead: { who: "Who", what: "What they ask", channel: "Channel", prio: "Priority", next: "Next step", state: "State" },
    open: [
      { who: "Peter and Anna Keller", what: "valuation of a villa in Elviria", channel: "E-mail", prio: "High", next: "Propose a date for the valuation", state: "Waiting for a person" },
      { who: "Sofía Lamas", what: "long-term rental in Fuengirola from January", channel: "⟦sofia⟧", prio: "Medium", next: "Send what is available", state: "Waiting for her reply" },
      { who: "Laura Serrano", what: "two-bedroom flat in Estepona, up to €320,000", channel: "WhatsApp", prio: "High", next: "Thursday's 10:00 viewing", state: "Viewing agreed" },
      { who: "Carmen Ortega", what: "valuation of her flat in Fuengirola", channel: "E-mail", prio: "High", next: "Propose a date", state: "Open" },
    ],
    nextTitle: "What to do next",
    next: ["Propose the Kellers a date for the valuation.", "Send Sofía what is available to rent from January.", "Remind Laura of Thursday's 10:00 viewing."],
    basis: "Basis: enquiries recorded in NuovaSolution, Monday to Sunday. Answered is not the same as delivered: the report does not measure what reaches the customer.",
    ctaTitle: "See it with your agency's data",
    ctaLine: "Your agency's report is built from your enquiries; there are no figures to fill in.",
    ctaLinePublic: "Access by invitation. Your agency's report is built from your enquiries; there are no figures to fill in.",
    realReport: "I already have access: see my report",
  },
};

/** The channel rows of the view (the home page's figures: 10 · 6 · 3 · 2 · 4 in the target state, the channels that run in public; always 25). */
export const exampleChannels = (locale: Locale, view: ClaimView) => home1103.report.channels(locale, view);
/** The three insights of the view (the home page's). */
export const exampleInsights = (locale: Locale, view: ClaimView) => home1103.report.insights(locale, view);
/** Sofía's channel in the open cases follows `webform` (Copy §22). */
export const sofiaChannel = (locale: Locale, view: ClaimView): string => (live("webform", view) ? (locale === "es" ? "Formulario web" : "Web form") : locale === "es" ? "Email" : "E-mail");
