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
 * alert is claimed; no promise of a time, no availability, one question back; a person takes over price, availability and the date
 * (Copy 1117 §1, production proof of 13.11.); no ticks, no "enviado"/"entregado" on the messages; a viewing request is not an appointment.
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
    /**
     * Copy batch 1 §2 (c0975ad) / phone preview 1-B (11cf7a2): the whole conversation W-1 … W-4 when it has more than one exchange.
     * A bubble stays Spanish on the EN page (automatic replies are Spanish only, `otherLanguages` hidden), with the EN translation small
     * under it: `text.es` is what the surface shows, `text.en` the translation line. `message`/`reply` stay the first exchange (the hero
     * and the flow story read them).
     */
    turns?: { who: "customer" | "assistant"; text: L; time: string; at: number; typingAt?: number }[];
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
    /** Copy 1117 §1.2: the reply by e-mail after "Enviado" (the e-mail tab's style, the same label) */
    replyAt: number;
    replyHead: L;
    reply: L;
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
    /** Copy phone preview 1-C: the task's head ("Tarea para Marta") and the reminder line under it (`reminders`). */
    taskHead?: L;
    note?: L;
  };
  /** The pause before each phase (index = the phase reached), in milliseconds. */
  timings: number[];
}

export const demoWords = {
  pick: { es: "Elige un canal", en: "Choose a channel" },
  /** Copy 1105 v3 §16: the invitation over the channel tabs (replaces "Elige un canal"; no tabs and no invitation with one channel). */
  invite: { es: "Pulsa un canal y mira cómo responde.", en: "Tap a channel and see how it replies." }, // Copy 1113 §7 D-p (16.11.)
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
    // The owner's brief of 20.11. (p. 3, WhatsApp first) with Copy batch 1 §2 (c0975ad) and the phone preview 1-B/1-C (11cf7a2): a fictional
    // buyer, Mila, three bedrooms in Nerja up to 350.000 €, asks whether ref. 9895153 is available and for a call back; W-1 … W-4; the
    // finished task "Llamar a Mila hoy a partir de las 17:00 · Comprobar disponibilidad de la ref. 9895153"; the availability stays OPEN.
    // The bubbles stay Spanish on the EN page (the translation under them); the UI words follow the locale. Laura stays the buyer of the later story.
    who: "Mila",
    role: T("compradora", "buyer"),
    chat: {
      status: T("en línea", "online"),
      time: "11:42",
      message: T("Hola, busco un piso de 3 dormitorios en Nerja, hasta 350.000 €. ¿Sigue disponible la ref. 9895153? ¿Me podéis llamar?", "Hi, I'm looking for a 3-bedroom flat in Nerja, up to €350,000. Is ref. 9895153 still available? Could you call me?"),
      typingAt: 1,
      replyAt: 2,
      reply: T("Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame?", "Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call?"),
      replyTime: "11:42",
      turns: [
        { who: "customer", text: T("Hola, busco un piso de 3 dormitorios en Nerja, hasta 350.000 €. ¿Sigue disponible la ref. 9895153? ¿Me podéis llamar?", "Hi, I'm looking for a 3-bedroom flat in Nerja, up to €350,000. Is ref. 9895153 still available? Could you call me?"), time: "11:42", at: 0 },
        { who: "assistant", text: T("Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame?", "Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call?"), time: "11:42", at: 2, typingAt: 1 },
        { who: "customer", text: T("Mejor esta tarde, a partir de las 17:00.", "Better this afternoon, from 5 pm."), time: "11:44", at: 3 },
        { who: "assistant", text: T("Gracias, Mila. Se lo paso a Marta con tu horario.", "Thank you, Mila. I'm passing it to Marta with your time."), time: "11:44", at: 5, typingAt: 4 },
      ],
    },
    record: {
      title: T("Ficha de Mila", "Mila's record"),
      updated: T("WhatsApp · 11:44", "WhatsApp · 11:44"),
      fields: [
        { k: T("Busca", "Looking for"), v: T("3 dormitorios en Nerja, hasta 350.000 €", "3 bedrooms in Nerja, up to €350,000"), at: 6 },
        { k: T("Pide", "Asks for"), v: T("Que la llamen, hoy a partir de las 17:00", "A call, today from 5 pm"), at: 7 },
        { k: T("Abierto", "Open"), v: T("Disponibilidad de la ref. 9895153, sin confirmar", "Availability of ref. 9895153, not confirmed"), at: 8 },
        { k: T("Llegó", "Arrived"), v: T("WhatsApp · 11:42", "WhatsApp · 11:42"), at: 9 },
      ],
      state: { v: T("Respondida automáticamente · Llamada pendiente", "Answered automatically · Call still to make"), at: 10 },
      priority: { v: T("Alta", "High"), why: T("nombró un inmueble y pide llamada", "named a property and asks for a call"), at: 11 },
      // Copy c683f2f §2: the sub line tells an answered enquiry from personal attention
      next: { v: T("Llamar a Mila hoy a partir de las 17:00 · Comprobar disponibilidad de la ref. 9895153", "Call Mila today from 5 pm · Check whether ref. 9895153 is available"), sub: T("Mila ya tiene respuesta. La llamada sigue esperando a Marta.", "Mila already has her answer. The call is still waiting for Marta."), at: 12 },
      taskHead: T("Tarea para Marta", "Task for Marta"),
      note: T("Si nadie coge la tarea en una hora, se lo recordamos a Marta.", "If nobody takes the task within an hour, we remind Marta."),
    },
    timings: [0, 700, 2300, 1600, 600, 1800, 500, 400, 400, 400, 600, 500, 600],
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
        { from: "Peter Keller", subject: T("Valoración de nuestra villa en Elviria", "Valoración de nuestra villa en Elviria"), time: "10:52", unread: true }, // Copy 88143c1 §2.2: the client's own text, Spanish
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
      // Copy 1117 §1.2: the wish restated, one useful question, what a person takes over
      reply: T("¡Hola, Carmen! Gracias por escribirnos. Quieres vender tu piso de 3 dormitorios en Fuengirola, cerca del paseo marítimo, y te gustaría una valoración esta semana. Para prepararla, ¿cuántos metros tiene el piso, más o menos? Una persona del equipo te propone día y hora para la visita de valoración.", "Hi Carmen, thanks for writing to us. You want to sell your 3-bedroom flat in Fuengirola, near the seafront, and you'd like a valuation this week. To prepare it, roughly how many square metres is the flat? Someone on the team will propose a day and time for the valuation visit."),
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
      // Copy 1117 §1.2: the reply by e-mail about two minutes later (the owner's measurement of 13.11.)
      replyAt: 9,
      replyHead: T("Respuesta por email · martes 11:33", "Reply by e-mail · Tuesday 11:33"),
      reply: T("Hola, Sofía. Gracias por tu mensaje. Buscas un piso de 2 dormitorios en Fuengirola, de alquiler de larga temporada, hasta 1.200 € al mes y a partir de enero. ¿Lo buscas amueblado o sin amueblar? Una persona del equipo te envía lo disponible que encaje.", "Hi Sofía, thanks for your message. You're looking for a 2-bedroom flat to rent long term in Fuengirola, up to €1,200 a month, from January. Would you like it furnished or unfurnished? Someone on the team will send you what is available and fits."),
    },
    record: {
      title: T("Ficha de Sofía", "Sofía's record"),
      updated: T("Formulario web · martes 11:31", "Web form · Tuesday 11:31"),
      fields: [
        { k: T("Intención", "Intent"), v: T("alquilar · larga temporada", "renting · long term"), at: 10 },
        { k: T("Zona", "Area"), v: T("Fuengirola", "Fuengirola"), at: 11 },
        { k: T("Dormitorios", "Bedrooms"), v: T("2", "2"), at: 12 },
        { k: T("Presupuesto", "Budget"), v: T("hasta 1.200 € al mes · desde enero", "up to €1,200 a month · from January"), at: 13 },
        { k: T("Idioma", "Language"), v: T("español", "Spanish"), at: 14 },
      ],
      state: { v: T("Consulta registrada", "Enquiry recorded"), at: 15 },
      priority: { v: T("Media", "Medium"), why: T("alquiler con zona y presupuesto, sin fecha de visita", "a rental with an area and a budget, no viewing date"), at: 16 },
      next: { v: T("Enviar a Sofía lo disponible en alquiler.", "Send Sofía what is available to rent."), sub: T("Tarea para tu equipo · lo envía una persona.", "A task for your team · a person sends it."), at: 17 },
    },
    timings: [0, 500, 450, 450, 450, 450, 600, 500, 500, 1400, 500, 350, 350, 350, 350, 600, 500, 600], // phase 9 = the e-mail reply (Copy 1117 §1.2)
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
        // Copy 1117 §1.2: the assistant confirms what it did (the call-back wish with its time goes to the responsible person) — it promises no time; the price is a person's part
        { speaker: "assistant", text: T("Perfecto, Álvaro. He pedido que te llamen esta tarde, a partir de las 16:00, a este número. El precio y el margen de la villa de Elviria te los explica una persona del equipo.", "Great, Álvaro. I've asked for you to be called back this afternoon, from 16:00, on this number. The price and the room to negotiate on the villa in Elviria will be explained by someone on the team."), at: 5 },
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
