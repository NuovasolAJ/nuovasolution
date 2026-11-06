import type { ChannelKey, L } from "./home-story";
import { people } from "./home-story";
import type { ClaimKey } from "@/lib/claims";

/**
 * The product demonstration under the hero (the owner's order of 03.11.2026, points 2 and 3; Copy's handover 1105 v3 §3 for the
 * WhatsApp channel): four channels, each on a surface that looks like its channel. WhatsApp is a chat; the e-mail is a mailbox
 * with sender and subject; the web form is a real form whose fields fill in and which is sent; the phone is a call view with a
 * waveform, a live transcript and the call's duration. Beside every surface the customer record fills field by field.
 *
 * Every item carries the phase (`at`) in which it appears; `timings` is the pause before each phase in milliseconds, so one run
 * takes 6–9 s and the end state stays. Nothing shown is a real person, listing or agency ("Demo con datos ficticios"). The WhatsApp
 * dialogue and record are Copy's (1105 v3 §3); the other three channels are the implementer's WORKING lines on the same rules.
 *
 * Claims (governance/API_CLAIMS_LINES_1102_v1.md; Copy §3): WhatsApp and Gmail reply in Spanish today; the web form and the phone
 * carry their claim key, so the public view leaves them out and the target view shows them without any mark (owner 06.11.: no
 * status words); the priority stands on the record with its reason and no score; no
 * alert is claimed; no availability promise, no contact promise ("te llamamos", "se pondrá en contacto"); one question back in the
 * agency's voice; no ticks, no "enviado"/"entregado" on the messages; a viewing request is not an appointment.
 */
export type DemoChannelKey = ChannelKey;
export type DemoKind = "chat" | "mail" | "form" | "call";

export interface DemoField {
  k: L;
  v: L;
  at: number;
}

export interface DemoChannel {
  key: DemoChannelKey;
  kind: DemoKind;
  name: L;
  /** The claim key of the channel (lib/claims.ts): the public view shows only channels that are included; no mark, no status word on any surface (owner 06.11.). */
  claim: ClaimKey;
  who: string;
  role: L;
  chat?: {
    status: L;
    time: string;
    message: L;
    typingAt: number;
    replyAt: number;
    reply: L;
    replyTime: string;
  };
  mail?: {
    folder: L;
    inbox: { from: string; subject: L; time: string; selected?: boolean; unread?: boolean }[];
    from: string;
    fromLine: L;
    to: L;
    subject: L;
    time: L;
    body: L;
    replyAt: number;
    replyTime: L;
    reply: L;
  };
  form?: {
    title: L;
    fields: { label: L; value: L; at: number; kind?: "select" | "textarea" }[];
    submitAt: number;
    submit: L;
    sentAt: number;
    sent: L;
  };
  call?: {
    incoming: L;
    answeredAt: number;
    seconds: number;
    endedAt: number;
    transcript: { speaker: "customer" | "assistant"; text: L; at: number }[];
    assistantLabel: L;
    ended: L;
  };
  record: {
    title?: L;
    updated: L;
    fields: DemoField[];
    state: { v: L; at: number };
    priority: { v: L; why: L; at: number };
    next: { v: L; sub: L; at: number };
  };
  /** The pause before each phase (index = the phase reached), in milliseconds. */
  timings: number[];
}

export const demoWords = {
  pick: { es: "Elige un canal", en: "Choose a channel" },
  /** Copy 1105 v3 §16: the invitation over the channel tabs (replaces "Elige un canal"; no tabs and no invitation with one channel). */
  invite: { es: "Elige un canal y mira cómo responde.", en: "Choose a channel and see how it replies." },
  /** The tabs change on their own until the first click (owner point 4); the bar on the active tab shows the time to the next one. */
  autoLabel: { es: "Siguiente canal en unos segundos; un clic lo detiene", en: "Next channel in a few seconds; one click stops it" },
  replay: { es: "Repetir demo", en: "Replay demo" },
  fictional: { es: "Demo con datos ficticios", en: "Demo with fictional data" },
  /** The one automation mark (Copy 1105 v3 §3): on the reply, nowhere else, small. */
  assistant: { es: "Asistente automático de la agencia", en: "The agency's automated assistant" },
  record: { es: "Ficha de cliente", en: "Customer record" },
  state: { es: "Estado", en: "State" },
  priority: { es: "Prioridad", en: "Priority" },
  next: { es: "Siguiente paso", en: "Next step" },
  sent: { es: "enviado", en: "sent" },
  toRecord: { es: "a la ficha", en: "to the record" },
  surfaceLabel: { es: "Demostración: una consulta, la respuesta y lo que queda en la ficha de cliente", en: "Demonstration: an enquiry, the reply and what stays on the customer record" },
  translation: { es: "Traducción", en: "Translation" },
  online: { es: "en línea", en: "online" },
};

const T = (es: string, en: string): L => ({ es, en });

export const demoChannels: DemoChannel[] = [
  {
    key: "whatsapp",
    kind: "chat",
    claim: "replyWhatsapp",
    name: T("WhatsApp", "WhatsApp"),
    who: "Laura",
    role: T("compradora", "buyer"),
    chat: {
      status: T("en línea", "online"),
      time: "11:20",
      message: T("Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €. ¿Podría ver alguno la semana que viene?", "Hi, I'm Laura. I'm looking for a 2-bedroom flat in Estepona, up to €320,000. Could I see one next week?"),
      typingAt: 1,
      replyAt: 2,
      // Copy 1105 v3 §16, Question A (the owner, 06.11.): no contact promise, no availability promise, a wish asked
      reply: T("¡Hola, Laura! Gracias por escribirnos. Buscas en Estepona, 2 dormitorios y hasta 320.000 €, ¿verdad? ¿Te viene mejor por la mañana o por la tarde para una visita?", "Hi Laura, thanks for writing to us. You're looking in Estepona, 2 bedrooms, up to €320,000, is that right? Would the morning or the afternoon suit you better for a viewing?"),
      replyTime: "11:21",
    },
    record: {
      title: T("Ficha de Laura", "Laura's record"),
      updated: T("WhatsApp · 11:21", "WhatsApp · 11:21"),
      fields: [
        { k: T("Intención", "Intent"), v: T("compra", "buying"), at: 3 },
        { k: T("Zona", "Area"), v: T("Estepona", "Estepona"), at: 4 },
        { k: T("Dormitorios", "Bedrooms"), v: T("2", "2"), at: 5 },
        { k: T("Presupuesto", "Budget"), v: T("hasta 320.000 €", "up to €320,000"), at: 6 },
        { k: T("Idioma", "Language"), v: T("español", "Spanish"), at: 7 },
        { k: T("Canal", "Channel"), v: T("WhatsApp", "WhatsApp"), at: 8 },
        { k: T("Visita", "Viewing"), v: T("la pide para la semana que viene", "asked for next week"), at: 9 },
      ],
      state: { v: T("Consulta registrada", "Enquiry recorded"), at: 10 },
      priority: { v: T("Alta", "High"), why: T("pide zona, presupuesto y visita", "names area, budget and a viewing"), at: 11 },
      next: { v: T("Una persona de tu equipo le propone día y hora.", "Someone on your team proposes a day and time."), sub: T("Una petición de visita no es una cita: la confirma una persona.", "A viewing request is not an appointment: a person confirms it."), at: 12 },
    },
    timings: [0, 700, 2300, 500, 350, 350, 350, 350, 350, 350, 600, 500, 600],
  },
  {
    key: "email",
    kind: "mail",
    claim: "replyEmail",
    name: T("Email", "E-mail"),
    who: "Carmen Ortega",
    role: T("propietaria", "owner"),
    mail: {
      folder: T("Bandeja de entrada", "Inbox"),
      inbox: [
        { from: "Carmen Ortega", subject: T("Valoración de mi piso en Fuengirola", "Valuation of my flat in Fuengirola"), time: "11:24", selected: true, unread: true },
        { from: "Peter Keller", subject: T("Bewertung unserer Villa in Elviria", "Bewertung unserer Villa in Elviria"), time: "10:52", unread: true },
        { from: "Portal · consulta", subject: T("EST-204 · piso con terraza en Estepona", "EST-204 · flat with terrace in Estepona"), time: "ayer" },
      ],
      from: "Carmen Ortega",
      fromLine: T("carmen.ortega@ejemplo.es", "carmen.ortega@example.es"),
      to: T("Para: tu agencia", "To: your agency"),
      subject: T("Valoración de mi piso en Fuengirola", "Valuation of my flat in Fuengirola"),
      time: T("martes 11:24", "Tuesday 11:24"),
      body: T("Buenos días, quiero vender mi piso en Fuengirola, 3 dormitorios cerca del paseo marítimo, y me gustaría una valoración. ¿Podrían venir esta semana?", "Good morning, I want to sell my flat in Fuengirola, 3 bedrooms near the seafront, and I would like a valuation. Could you come this week?"),
      replyAt: 2,
      replyTime: T("martes 11:25", "Tuesday 11:25"),
      // Copy 1105 v3 §22 ("Apunto" struck, as in Question A)
      reply: T("¡Hola, Carmen! Gracias por escribirnos. Quieres vender tu piso de 3 dormitorios en Fuengirola, cerca del paseo marítimo, y te gustaría una valoración esta semana, ¿verdad? ¿Te viene mejor por la mañana o por la tarde?", "Hi Carmen, thanks for writing to us. You want to sell your 3-bedroom flat in Fuengirola, near the seafront, and you'd like a valuation this week, is that right? Would the morning or the afternoon suit you better?"),
    },
    record: {
      title: T("Ficha de Carmen", "Carmen's record"),
      updated: T("Email · martes 11:25", "E-mail · Tuesday 11:25"),
      fields: [
        { k: T("Intención", "Intent"), v: T("vender", "selling"), at: 3 },
        { k: T("Zona", "Area"), v: T("Fuengirola · paseo marítimo", "Fuengirola · seafront"), at: 4 },
        { k: T("Inmueble", "Property"), v: T("piso de 3 dormitorios", "3-bedroom flat"), at: 5 },
        { k: T("Idioma", "Language"), v: T("español", "Spanish"), at: 6 },
        { k: T("Canal", "Channel"), v: T("Email", "E-mail"), at: 7 },
        { k: T("Visita", "Visit"), v: T("valoración esta semana", "valuation this week"), at: 8 },
      ],
      state: { v: T("Consulta registrada", "Enquiry recorded"), at: 9 },
      priority: { v: T("Alta", "High"), why: T("propietaria que quiere vender y pide cita", "an owner who wants to sell and asks for a visit"), at: 10 },
      next: { v: T("Una persona de tu equipo le propone día y hora para la valoración.", "Someone on your team proposes a day and time for the valuation."), sub: T("Una petición de visita no es una cita: la confirma una persona.", "A visit request is not an appointment: a person confirms it."), at: 11 },
    },
    timings: [0, 800, 2200, 500, 350, 350, 350, 350, 350, 600, 500, 600],
  },
  {
    key: "webform",
    kind: "form",
    name: T("Formulario web", "Web form"),
    claim: "webform",
    who: people.tenant.name,
    role: T("inquilina", "tenant"),
    form: {
      title: T("Formulario de contacto · tu web", "Contact form · your website"),
      fields: [
        { label: T("Nombre", "Name"), value: T("Sofía Lamas", "Sofía Lamas"), at: 1 },
        { label: T("Email", "E-mail"), value: T("sofia.lamas@ejemplo.es", "sofia.lamas@example.es"), at: 2 },
        { label: T("Busco", "I am looking to"), value: T("Alquilar", "Rent"), at: 3, kind: "select" },
        { label: T("Zona", "Area"), value: T("Fuengirola", "Fuengirola"), at: 4 },
        { label: T("Presupuesto", "Budget"), value: T("hasta 1.200 € al mes", "up to €1,200 a month"), at: 5 },
        { label: T("Mensaje", "Message"), value: T("Dos dormitorios, larga temporada, a partir de enero. ¿Tenéis algo?", "Two bedrooms, long term, from January. Do you have anything?"), at: 6, kind: "textarea" },
      ],
      submitAt: 7,
      submit: T("Enviar", "Send"),
      sentAt: 8,
      sent: T("Enviado · martes 11:31", "Sent · Tuesday 11:31"),
    },
    record: {
      title: T("Ficha de Sofía", "Sofía's record"),
      updated: T("Formulario web · martes 11:31", "Web form · Tuesday 11:31"),
      fields: [
        { k: T("Intención", "Intent"), v: T("alquilar · larga temporada", "renting · long term"), at: 9 },
        { k: T("Zona", "Area"), v: T("Fuengirola", "Fuengirola"), at: 10 },
        { k: T("Dormitorios", "Bedrooms"), v: T("2", "2"), at: 11 },
        { k: T("Presupuesto", "Budget"), v: T("hasta 1.200 € al mes · desde enero", "up to €1,200 a month · from January"), at: 12 },
        { k: T("Idioma", "Language"), v: T("español", "Spanish"), at: 13 },
      ],
      state: { v: T("Consulta registrada", "Enquiry recorded"), at: 14 },
      priority: { v: T("Media", "Medium"), why: T("alquiler con zona y presupuesto, sin fecha de visita", "a rental with an area and a budget, no viewing date"), at: 15 },
      next: { v: T("Enviar a Sofía lo disponible en alquiler.", "Send Sofía what is available to rent."), sub: T("Tarea para tu equipo · lo envía una persona.", "A task for your team · a person sends it."), at: 16 },
    },
    timings: [0, 500, 450, 450, 450, 450, 600, 500, 500, 500, 350, 350, 350, 350, 600, 500, 600],
  },
  {
    key: "phone",
    kind: "call",
    name: T("Teléfono", "Phone"),
    claim: "phoneAssistant",
    who: people.caller.name,
    role: T("comprador", "buyer"),
    call: {
      incoming: T("Llamada entrante", "Incoming call"),
      answeredAt: 1,
      seconds: 38,
      endedAt: 6,
      transcript: [
        { speaker: "customer", text: T("Hola, llamo por la villa de Elviria.", "Hello, I'm calling about the villa in Elviria."), at: 2 },
        { speaker: "customer", text: T("Quería saber el precio y si hay margen.", "I'd like to know the price and whether there is room to negotiate."), at: 3 },
        { speaker: "customer", text: T("Me viene mejor que me llamen por la tarde.", "The afternoon suits me better for a call back."), at: 4 },
        // Copy 1105 v3 §22: no contact promise; "lo anoto" struck
        { speaker: "assistant", text: T("Gracias, Álvaro. Queda para el equipo: la villa de Elviria, el precio y el margen, y que prefieres que te llamen por la tarde.", "Thank you, Álvaro. It's with the team now: the villa in Elviria, the price and the room to negotiate, and that you'd prefer a call in the afternoon."), at: 5 },
      ],
      assistantLabel: T("Asistente automático de la agencia", "The agency's automated assistant"),
      ended: T("Llamada atendida", "Call answered"),
    },
    record: {
      title: T("Ficha de Álvaro", "Álvaro's record"),
      updated: T("Teléfono · martes 11:39", "Phone · Tuesday 11:39"),
      fields: [
        { k: T("Intención", "Intent"), v: T("compra · la villa de Elviria", "buying · the villa in Elviria"), at: 7 },
        { k: T("Pregunta", "Asks"), v: T("precio y margen", "price and room to negotiate"), at: 8 },
        { k: T("Idioma", "Language"), v: T("español", "Spanish"), at: 9 },
        { k: T("Prefiere", "Prefers"), v: T("llamada a partir de las 16:00", "a call from 16:00"), at: 10 },
        { k: T("Teléfono", "Phone"), v: T("+34 ··· ··· ···", "+34 ··· ··· ···"), at: 11 },
      ],
      state: { v: T("Llamada atendida · nota en la ficha", "Call answered · note on the record"), at: 12 },
      priority: { v: T("Alta", "High"), why: T("pregunta por un inmueble concreto y pide que le llamen", "asks about a specific property and asks for a call back"), at: 13 },
      next: { v: T("Devolver la llamada a partir de las 16:00.", "Return the call from 16:00."), sub: T("Tarea para tu equipo · el precio lo da una persona.", "A task for your team · a person gives the price."), at: 14 },
    },
    timings: [0, 900, 700, 900, 900, 1100, 900, 450, 350, 350, 350, 350, 600, 500, 600],
  },
];

export const endPhase = (c: DemoChannel) => c.timings.length - 1;
export const recordStart = (c: DemoChannel) => c.record.fields[0].at;
/** The length of one run in milliseconds (the sum of the pauses). */
export const runLength = (c: DemoChannel) => c.timings.reduce((a, b) => a + b, 0);
