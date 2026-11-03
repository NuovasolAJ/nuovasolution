import type { ChannelKey, L } from "./home-story";
import { people } from "./home-story";

/**
 * The hero's product demonstration (the owner's review of 02.11.2026, §3 and §8; work package 1): one conversation and three
 * visible consequences, per channel.
 *
 *   state 1  the enquiry arrives (a realistic messenger surface, two readable messages)
 *   state 2  three typing dots once, a short reply; the record fills beside it, grouped (name, intent, language · area, budget)
 *   state 3  the team knows what is next: the record's state, a priority as a category with its reason (no number), the next step
 *
 * Every item carries the phase (`at`) in which it appears; `timings` is the pause before each phase in milliseconds, so the whole run
 * takes 6–9 s and the end state stays. Nothing shown is a real person, listing or agency ("Demo con datos ficticios"). The WhatsApp
 * channel carries Copy's final lines (WEBSITE_COPY_HANDOVER_1102_v2.md §1.2; Laura's message in two bubbles at its sentence end, report §3);
 * the e-mail, web-form and phone channels are the implementer's WORKING lines on the same pattern, for Copy.
 *
 * Claims (governance/API_CLAIMS_LINES_1102_v1.md, 02.11.): WhatsApp and Gmail stand as channels of today; the web form and the phone
 * are marked as prototypes; the priority is shown on the record with its reason and no alert is claimed as available; a reply is a
 * sent text, never a proven delivery; a request is not a confirmed viewing.
 */
export type DemoChannelKey = ChannelKey;

export interface DemoMessage {
  /** The customer's words in their language. */
  text: string;
  lang: "es" | "de";
  /** The page's reading of a message in another language. */
  translation?: L;
  at: number;
}

export interface DemoField {
  k: L;
  v: L;
  at: number;
}

export interface DemoChannel {
  key: DemoChannelKey;
  name: L;
  /** A short mark beside the channel's name, where the function is a prototype. */
  mark?: L;
  who: string;
  role: L;
  /** The channel and the clock, as the surface's second line. */
  meta: L;
  /** For a form or a call: the surface's title instead of a chat header. */
  surfaceTitle?: L;
  inbound: DemoMessage[];
  typingAt?: number;
  reply?: { text: string; lang: "es" | "de"; translation?: L; at: number; meta: L };
  /** The case with no automatic reply: what Nuova did instead, said as such. */
  held?: { title: L; line: L; at: number };
  /** A call: what the assistant did on the line. */
  call?: { title: L; line: L; at: number };
  record: {
    /** The record's title where Copy names it ("Ficha de Laura"); otherwise the generic one. */
    title?: L;
    updated: L;
    fields: DemoField[];
    state: { v: L; at: number };
    priority: { v: L; why: L; at: number };
    next: { v: L; sub: L; at: number };
  };
  /** The state lines of the end phase (Copy's handover 1102 v2 §1.2): what runs today, what is in preparation. */
  states: { v: L; kind: "available" | "preparing" | "prototype"; at: number }[];
  /** The pause before each phase (index = the phase reached), in milliseconds. */
  timings: number[];
}

export const demoWords = {
  pick: { es: "Elige un canal", en: "Choose a channel" },
  replay: { es: "Repetir demo", en: "Replay demo" },
  fictional: { es: "Demo con datos ficticios", en: "Demo with fictional data" },
  /** The one automation mark (Copy 1102 v2 §1.2): on the reply bubble, nowhere else. */
  assistant: { es: "Asistente automático de la agencia", en: "The agency's automated assistant" },
  record: { es: "Ficha de cliente", en: "Customer record" },
  state: { es: "Estado", en: "State" },
  priority: { es: "Prioridad", en: "Priority" },
  next: { es: "Siguiente paso", en: "Next step" },
  writtenIn: { es: "escrito en {lang}", en: "written in {lang}" },
  translationOf: { es: "Traducción", en: "Translation" },
  toRecord: { es: "a la ficha", en: "to the record" },
  surfaceLabel: { es: "Demostración: una consulta, la respuesta y lo que queda en la ficha de cliente", en: "Demonstration: an enquiry, the reply and what stays on the customer record" },
  langs: { es: { es: "español", en: "Spanish" }, de: { es: "alemán", en: "German" } } as Record<"es" | "de", L>,
};

export const demoChannels: DemoChannel[] = [
  {
    key: "whatsapp",
    name: { es: "WhatsApp", en: "WhatsApp" },
    who: "Laura",
    role: { es: "compradora", en: "buyer" },
    meta: { es: "WhatsApp · 11:20", en: "WhatsApp · 11:20" },
    inbound: [
      { text: "Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €.", lang: "es", translation: { es: "Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €.", en: "Hi, I'm Laura. I'm looking for a 2-bedroom flat in Estepona, up to €320,000." }, at: 0 },
      { text: "¿Podría ver alguno la semana que viene?", lang: "es", translation: { es: "¿Podría ver alguno la semana que viene?", en: "Could I see one next week?" }, at: 1 },
    ],
    typingAt: 2,
    reply: {
      text: "Hola, Laura. Anoto Estepona, 2 dormitorios y hasta 320.000 €, y que quieres ver pisos la semana que viene. ¿Buscas vivienda habitual o segunda residencia?",
      lang: "es",
      translation: { es: "Hola, Laura. Anoto Estepona, 2 dormitorios y hasta 320.000 €, y que quieres ver pisos la semana que viene. ¿Buscas vivienda habitual o segunda residencia?", en: "Hi Laura. I've noted Estepona, 2 bedrooms, up to €320,000, and that you'd like to see flats next week. Is it for living in or a second home?" },
      at: 3,
      meta: { es: "11:21", en: "11:21" },
    },
    record: {
      title: { es: "Ficha de Laura", en: "Laura's record" },
      updated: { es: "WhatsApp · 11:21", en: "WhatsApp · 11:21" },
      fields: [
        { k: { es: "Intención", en: "Intent" }, v: { es: "compra", en: "buying" }, at: 3 },
        { k: { es: "Zona", en: "Area" }, v: { es: "Estepona", en: "Estepona" }, at: 4 },
        { k: { es: "Dormitorios", en: "Bedrooms" }, v: { es: "2", en: "2" }, at: 4 },
        { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 320.000 €", en: "up to €320,000" }, at: 4 },
        { k: { es: "Idioma", en: "Language" }, v: { es: "español", en: "Spanish" }, at: 5 },
        { k: { es: "Visita", en: "Viewing" }, v: { es: "la pide para la semana que viene", en: "asked for next week" }, at: 5 },
      ],
      state: { v: { es: "Consulta registrada", en: "Enquiry recorded" }, at: 6 },
      priority: { v: { es: "Alta", en: "High" }, why: { es: "pide zona, presupuesto y visita", en: "names area, budget and a viewing" }, at: 6 },
      next: { v: { es: "Elena le propone día y hora para la visita.", en: "Elena proposes a day and time for the viewing." }, sub: { es: "Una petición de visita no es una cita: la confirma una persona.", en: "A viewing request is not an appointment: a person confirms it." }, at: 6 },
    },
    states: [
      { v: { es: "Hoy: respuesta en español y ficha guardada.", en: "Today: a reply in Spanish and the record saved." }, kind: "available", at: 6 },
      { v: { es: "En preparación: el aviso a Elena y su lista de tareas.", en: "In preparation: the alert to Elena and her task list." }, kind: "preparing", at: 6 },
    ],
    timings: [0, 900, 900, 1400, 750, 750, 900],
  },
  {
    key: "email",
    name: { es: "Email", en: "Email" },
    who: people.sellers.name,
    role: { es: "propietarios", en: "owners" },
    meta: { es: "Email · martes 11:24", en: "Email · Tuesday 11:24" },
    inbound: [
      {
        text: "Guten Tag, wir möchten unsere Villa in Elviria (Marbella) verkaufen und bitten um eine Bewertung. Wann wäre ein Termin vor Ort möglich?",
        lang: "de",
        translation: { es: "Buenos días, queremos vender nuestra villa en Elviria (Marbella) y pedimos una valoración. ¿Cuándo sería posible una visita?", en: "Good morning, we would like to sell our villa in Elviria (Marbella) and ask for a valuation. When would a visit be possible?" },
        at: 0,
      },
    ],
    held: {
      title: { es: "Sin respuesta automática", en: "No automatic reply" },
      line: { es: "El email llegó en alemán y hoy Nuova responde en español: no envía nada. La consulta queda en la ficha y la contesta una persona de tu equipo.", en: "The email arrived in German and today Nuova answers in Spanish: it sends nothing. The enquiry goes on the record and a person on your team answers it." },
      at: 2,
    },
    record: {
      updated: { es: "Nueva · Email · martes 11:24", en: "New · Email · Tuesday 11:24" },
      fields: [
        { k: { es: "Nombre", en: "Name" }, v: { es: "Peter y Anna Keller", en: "Peter and Anna Keller" }, at: 2 },
        { k: { es: "Piden", en: "Ask for" }, v: { es: "vender · valoración de una villa", en: "to sell · a villa valuation" }, at: 3 },
        { k: { es: "Idioma", en: "Language" }, v: { es: "alemán", en: "German" }, at: 3 },
        { k: { es: "Zona", en: "Area" }, v: { es: "Marbella · Elviria", en: "Marbella · Elviria" }, at: 4 },
        { k: { es: "Plazo", en: "Timing" }, v: { es: "visita de valoración esta semana", en: "valuation visit this week" }, at: 4 },
      ],
      state: { v: { es: "Registrada · espera a una persona", en: "Recorded · waiting for a person" }, at: 5 },
      priority: { v: { es: "Alta", en: "High" }, why: { es: "propietarios que quieren vender y piden cita", en: "owners who want to sell and ask for an appointment" }, at: 5 },
      next: { v: { es: "Contestar y proponer la visita", en: "Answer and propose the visit" }, sub: { es: "Tarea para tu equipo · la respuesta la escribe una persona", en: "A task for your team · a person writes the reply" }, at: 5 },
    },
    states: [
      { v: { es: "Hoy: en otro idioma no se envía nada automáticamente; la consulta queda en la ficha.", en: "Today: in another language nothing is sent automatically; the enquiry stays on the record." }, kind: "available", at: 5 },
      { v: { es: "En preparación: el aviso a Elena y su lista de tareas.", en: "In preparation: the alert to Elena and her task list." }, kind: "preparing", at: 5 },
    ],
    timings: [0, 900, 1000, 750, 750, 900],
  },
  {
    key: "webform",
    name: { es: "Formulario web", en: "Web form" },
    mark: { es: "Prototipo", en: "Prototype" },
    who: people.tenant.name,
    role: { es: "inquilina", en: "tenant" },
    meta: { es: "Formulario de tu web · martes 11:31", en: "Your website's form · Tuesday 11:31" },
    surfaceTitle: { es: "Formulario de tu web", en: "Your website's form" },
    inbound: [
      { text: "Busco un piso de dos dormitorios en Fuengirola para alquiler de larga temporada, hasta 1.200 € al mes, a partir de enero. ¿Tenéis algo?", lang: "es", translation: { es: "Busco un piso de dos dormitorios en Fuengirola para alquiler de larga temporada, hasta 1.200 € al mes, a partir de enero. ¿Tenéis algo?", en: "I'm looking for a two-bedroom flat in Fuengirola for a long-term rental, up to €1,200 a month, from January. Do you have anything?" }, at: 0 },
    ],
    typingAt: 1,
    reply: {
      text: "Hola, Sofía. Anoto dos dormitorios en Fuengirola, hasta 1.200 € al mes y desde enero. Una persona de la agencia te envía lo que tenemos en larga temporada.",
      lang: "es",
      translation: { es: "Hola, Sofía. Anoto dos dormitorios en Fuengirola, hasta 1.200 € al mes y desde enero. Una persona de la agencia te envía lo que tenemos en larga temporada.", en: "Hi Sofía. Noted: two bedrooms in Fuengirola, up to €1,200 a month, from January. A person from the agency will send you what we have for long-term rental." },
      at: 2,
      meta: { es: "respuesta por email · martes 11:32", en: "reply by email · Tuesday 11:32" },
    },
    record: {
      updated: { es: "Nueva · Formulario web · martes 11:32", en: "New · Web form · Tuesday 11:32" },
      fields: [
        { k: { es: "Nombre", en: "Name" }, v: { es: "Sofía Lamas", en: "Sofía Lamas" }, at: 2 },
        { k: { es: "Busca", en: "Looking for" }, v: { es: "alquilar · 2 dormitorios", en: "to rent · 2 bedrooms" }, at: 3 },
        { k: { es: "Idioma", en: "Language" }, v: { es: "español", en: "Spanish" }, at: 3 },
        { k: { es: "Zona", en: "Area" }, v: { es: "Fuengirola", en: "Fuengirola" }, at: 4 },
        { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 1.200 € al mes · desde enero", en: "up to €1,200 a month · from January" }, at: 4 },
      ],
      state: { v: { es: "Consulta registrada", en: "Enquiry recorded" }, at: 5 },
      priority: { v: { es: "Media", en: "Medium" }, why: { es: "alquiler con zona y presupuesto, sin fecha de visita", en: "a rental with an area and a budget, no viewing date" }, at: 5 },
      next: { v: { es: "Enviar lo disponible en alquiler", en: "Send what is available to rent" }, sub: { es: "Tarea para tu equipo · lo envía una persona", en: "A task for your team · a person sends it" }, at: 5 },
    },
    states: [
      { v: { es: "Prototipo: el formulario web todavía no está disponible.", en: "Prototype: the web form is not available yet." }, kind: "prototype", at: 5 },
    ],
    timings: [0, 900, 1400, 750, 750, 900],
  },
  {
    key: "phone",
    name: { es: "Teléfono", en: "Phone" },
    mark: { es: "Prototipo", en: "Prototype" },
    who: people.caller.name,
    role: { es: "comprador", en: "buyer" },
    meta: { es: "Llamada · martes 11:37 · solo en español", en: "Call · Tuesday 11:37 · Spanish only" },
    surfaceTitle: { es: "Llamada entrante", en: "Incoming call" },
    inbound: [
      { text: "Llamo por la villa de Elviria. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.", lang: "es", translation: { es: "Llamo por la villa de Elviria. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.", en: "I'm calling about the villa in Elviria. I'd like to know the price and whether there is room to negotiate. The afternoon suits me better for a call back." }, at: 0 },
    ],
    call: {
      title: { es: "Atendida por el asistente", en: "Answered by the assistant" },
      line: { es: "Dice que es un asistente automático, anota el motivo, el inmueble y la hora que prefiere. No da precio ni negocia: le devuelve la llamada una persona.", en: "It says it is an automated assistant, notes the reason, the property and the preferred time. It gives no price and does not negotiate: a person calls back." },
      at: 2,
    },
    record: {
      updated: { es: "Nueva · Teléfono · martes 11:39", en: "New · Phone · Tuesday 11:39" },
      fields: [
        { k: { es: "Nombre", en: "Name" }, v: { es: "Álvaro Pons", en: "Álvaro Pons" }, at: 2 },
        { k: { es: "Pregunta por", en: "Asks about" }, v: { es: "comprar · la villa de Elviria", en: "to buy · the villa in Elviria" }, at: 3 },
        { k: { es: "Idioma", en: "Language" }, v: { es: "español", en: "Spanish" }, at: 3 },
        { k: { es: "Quiere saber", en: "Wants to know" }, v: { es: "precio y margen", en: "price and room to negotiate" }, at: 4 },
        { k: { es: "Prefiere", en: "Prefers" }, v: { es: "llamada a partir de las 16:00", en: "a call from 16:00" }, at: 4 },
      ],
      state: { v: { es: "Llamada atendida · nota en la ficha", en: "Call answered · note on the record" }, at: 5 },
      priority: { v: { es: "Alta", en: "High" }, why: { es: "pregunta por un inmueble concreto y pide que le llamen", en: "he asks about a specific property and asks for a call back" }, at: 5 },
      next: { v: { es: "Devolver la llamada", en: "Return the call" }, sub: { es: "Tarea para tu equipo · a partir de las 16:00", en: "A task for your team · from 16:00" }, at: 5 },
    },
    states: [
      { v: { es: "Prototipo: el asistente telefónico todavía no está disponible; solo en español.", en: "Prototype: the phone assistant is not available yet; Spanish only." }, kind: "prototype", at: 5 },
    ],
    timings: [0, 1100, 1000, 750, 750, 900],
  },
];

export const endPhase = (c: DemoChannel) => c.timings.length - 1;
