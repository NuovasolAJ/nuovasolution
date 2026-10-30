import type { Locale } from "@/lib/i18n/config";

/**
 * The public example report (closing order 27.10. §7): the home page's example week, as one complete report anyone can
 * see without a login. Every figure is an example and says so; nothing here is any agency's data and nothing reads the
 * backend. The weekly figures of story F (23 handled, 6 opportunities, 2 waiting) are week 4; the three weeks before are
 * invented to the same scale so the chart has something to show. WORKING text, for Copy.
 */
export const exampleReport: Record<Locale, {
  label: string; title: string; lead: string;
  figures: { title: string; value: string; line: string }[];
  chart: { title: string; note: string; alt: string; received: string; answered: string };
  weeks: { label: string; received: number; answered: number }[];
  openTitle: string; open: { who: string; what: string }[];
  nextTitle: string; next: string[];
  basis: string; ctaTitle: string; ctaLine: string; realReport: string;
}> = {
  es: {
    label: "Informe de ejemplo · no son datos de ninguna agencia",
    title: "Lo que ve una agencia al final de la semana",
    lead: "Así es el informe semanal de Nuova, con la semana del ejemplo de la página de inicio. El informe real de tu agencia está en tu acceso.",
    figures: [
      { title: "Consultas atendidas", value: "23", line: "respondidas y registradas · WhatsApp 13 · email 10" },
      { title: "Oportunidades", value: "6", line: "visitas pedidas, 4 acordadas por el equipo · 2 valoraciones pedidas" },
      { title: "Esperan a una persona", value: "2", line: "la valoración de los Keller y la respuesta de Sofía" },
    ],
    chart: { title: "Consultas por semana", note: "Cuatro semanas de ejemplo", alt: "Gráfico de barras: consultas recibidas y respondidas en cuatro semanas de ejemplo: 19 y 17, 24 y 22, 21 y 20, 25 y 23.", received: "Recibidas", answered: "Respondidas" },
    weeks: [
      { label: "Semana 1", received: 19, answered: 17 },
      { label: "Semana 2", received: 24, answered: 22 },
      { label: "Semana 3", received: 21, answered: 20 },
      { label: "Semana 4", received: 25, answered: 23 },
    ],
    openTitle: "Sigue abierto",
    open: [
      { who: "Peter y Anna Keller", what: "valoración de una villa en Elviria · falta proponer la visita" },
      { who: "Sofía Lamas", what: "alquiler de larga temporada en Fuengirola · esperando su respuesta" },
    ],
    nextTitle: "Qué toca hacer",
    next: ["Proponer a los Keller una fecha para la visita de valoración.", "Enviar a Sofía lo disponible en alquiler desde enero.", "Confirmar con Laura la visita del jueves a las 10:00."],
    basis: "Base: consultas registradas en Nuova en los canales conectados, de lunes a domingo. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide.",
    ctaTitle: "Pruébalo con tu agencia",
    ctaLine: "14 días gratis · Sin método de pago. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar.",
    realReport: "Ya tengo acceso: ver mi informe",
  },
  en: {
    label: "Example report · not any agency's data",
    title: "What an agency sees at the end of the week",
    lead: "This is Nuova's weekly report, with the home page's example week. Your agency's real report is in your login.",
    figures: [
      { title: "Enquiries handled", value: "23", line: "answered and recorded · WhatsApp 13 · email 10" },
      { title: "Opportunities", value: "6", line: "viewings asked for, 4 agreed by the team · 2 valuations asked for" },
      { title: "Waiting for a person", value: "2", line: "the Kellers' valuation and Sofía's reply" },
    ],
    chart: { title: "Enquiries per week", note: "Four example weeks", alt: "Bar chart: enquiries received and answered in four example weeks: 19 and 17, 24 and 22, 21 and 20, 25 and 23.", received: "Received", answered: "Answered" },
    weeks: [
      { label: "Week 1", received: 19, answered: 17 },
      { label: "Week 2", received: 24, answered: 22 },
      { label: "Week 3", received: 21, answered: 20 },
      { label: "Week 4", received: 25, answered: 23 },
    ],
    openTitle: "Still open",
    open: [
      { who: "Peter and Anna Keller", what: "valuation of a villa in Elviria · the visit still to propose" },
      { who: "Sofía Lamas", what: "long-term rental in Fuengirola · waiting for her reply" },
    ],
    nextTitle: "What to do next",
    next: ["Propose the Kellers a date for the valuation visit.", "Send Sofía what is available to rent from January.", "Confirm Thursday's 10:00 viewing with Laura."],
    basis: "Basis: enquiries recorded in Nuova on the connected channels, Monday to Sunday. Answered is not the same as delivered: what reaches the customer is not measured yet.",
    ctaTitle: "Try it with your agency",
    ctaLine: "14 days free · No payment method. Your agency's report is built from your enquiries; there are no figures to fill in.",
    realReport: "I already have access: see my report",
  },
};
