import type { Locale } from "@/lib/i18n/config";

/**
 * The home page story (master order 2026-10-10 §3): one example enquiry, carried visibly through six
 * chapters that read in the normal scroll. Roles, names, properties and the clock agree everywhere:
 *
 *   Tuesday 11:00–12:00  Marcos (agent) shows the villa EST-118 in Marbella; nobody is at the desk.
 *   Tuesday 11:20        Laura Serrano (buyer, Manchester) writes on WhatsApp in English about EST-204.
 *   Tuesday 11:24        Peter and Anna Keller (sellers, Elviria) write by email in German for a valuation.
 *   Tuesday 11:31        Sofía Lamas (tenant) sends the web form in Spanish, long-term rental in Fuengirola.
 *   Tuesday 11:37        Álvaro Pons (buyer) calls about the price of EST-118.
 *   Wednesday 08:30      Jarvis orders the day; Elena takes Laura's viewing and confirms Thursday 10:00.
 *   Friday 09:10         A new listing EST-240 fits Laura; an allowed follow-up goes out by email.
 *   The week             The weekly overview counts what was handled; the details are in the login.
 *
 * Every text here is WORKING text by the implementer (Copy confirms after the implementation). Nothing
 * shown is a real person, a real listing or a real agency. The product states behind each chapter are in
 * docs/website_redesign/ACCEPTANCE_LIST_1010.md; the page itself is the unpublished target version
 * (master order §11), so it carries no "in preparation" labels.
 */
export type L = Record<Locale, string>;
export type ChannelKey = "whatsapp" | "email" | "webform" | "phone";
export type ChapterKey = "situation" | "reply" | "match" | "task" | "followup" | "result";

export const REFERENCE = "EST-204";
export const REFERENCE_2 = "EST-231";
export const REFERENCE_VIEWING = "EST-118";
export const REFERENCE_NEW = "EST-240";

/** The people of the story. */
export const people = {
  agent: { name: "Marcos Vidal", short: "Marcos" },
  colleague: { name: "Elena Ruiz", short: "Elena" },
  buyer: { name: "Laura Serrano", short: "Laura", city: "Manchester" },
  sellers: { name: "Peter y Anna Keller", nameEn: "Peter and Anna Keller", short: "Keller" },
  tenant: { name: "Sofía Lamas", short: "Sofía" },
  caller: { name: "Álvaro Pons", short: "Álvaro" },
};

/** The listings of the example portfolio. Photos: licensed stock (see docs/website_redesign/MEDIA_SOURCES_1010.md), never a real listing. */
export interface Listing {
  ref: string;
  title: L;
  place: L;
  facts: L;
  price: string;
  photo: string;
  photoAlt: L;
}
export const listings: Record<"est204" | "est231" | "est118" | "est240", Listing> = {
  est204: {
    ref: REFERENCE,
    title: { es: "Piso de 2 dormitorios con terraza", en: "Two bedroom flat with terrace" },
    place: { es: "Estepona · zona puerto", en: "Estepona · marina area" },
    facts: { es: "2 dorm. · 2 baños · 78 m² · terraza 14 m²", en: "2 bed · 2 bath · 78 m² · 14 m² terrace" },
    price: "315.000 €",
    photo: "/media/world/listing-est204.webp",
    photoAlt: { es: "Vista al mar entre palmeras desde una terraza", en: "Sea view between palm trees from a terrace" },
  },
  est231: {
    ref: REFERENCE_2,
    title: { es: "Ático de 2 dormitorios con vistas", en: "Two bedroom penthouse with views" },
    place: { es: "Estepona · Seghers", en: "Estepona · Seghers" },
    facts: { es: "2 dorm. · 2 baños · 71 m² · terraza 22 m²", en: "2 bed · 2 bath · 71 m² · 22 m² terrace" },
    price: "319.000 €",
    photo: "/media/world/listing-est231.webp",
    photoAlt: { es: "El mar visto entre buganvillas", en: "The sea seen between bougainvillea" },
  },
  est118: {
    ref: REFERENCE_VIEWING,
    title: { es: "Villa con piscina y vistas al mar", en: "Villa with pool and sea views" },
    place: { es: "Marbella · Elviria", en: "Marbella · Elviria" },
    facts: { es: "4 dorm. · 3 baños · 240 m² · parcela 900 m²", en: "4 bed · 3 bath · 240 m² · 900 m² plot" },
    price: "1.150.000 €",
    photo: "/media/world/listing-est118.webp",
    photoAlt: { es: "Piscina de una villa al atardecer con el mar al fondo", en: "A villa's pool at sunset with the sea behind" },
  },
  est240: {
    ref: REFERENCE_NEW,
    title: { es: "Piso de 2 dormitorios, primera línea", en: "Two bedroom flat, seafront" },
    place: { es: "Estepona · paseo marítimo", en: "Estepona · seafront promenade" },
    facts: { es: "2 dorm. · 1 baño · 74 m² · terraza 12 m²", en: "2 bed · 1 bath · 74 m² · 12 m² terrace" },
    price: "318.000 €",
    photo: "/media/world/listing-est240.webp",
    photoAlt: { es: "Terraza de madera junto al mar al atardecer", en: "A wooden terrace by the sea at dusk" },
  },
};

/** The four channels, in the order they appear. */
export const channels: { key: ChannelKey; name: L }[] = [
  { key: "whatsapp", name: { es: "WhatsApp", en: "WhatsApp" } },
  { key: "email", name: { es: "Email", en: "Email" } },
  { key: "webform", name: { es: "Formulario web", en: "Web form" } },
  { key: "phone", name: { es: "Teléfono", en: "Phone" } },
];

/** One enquiry per channel: who, when, in which language, what they wrote, what Nuova answered, what was recorded. */
export interface Enquiry {
  channel: ChannelKey;
  who: string;
  role: L;
  time: L;
  /** The language the customer writes in, as a word the agency reads. */
  language: L;
  /** BCP-47 tag of the customer's text (for lang attributes). */
  lang: "en" | "es" | "de";
  text: string;
  /** Phone: what the caller said, as the assistant noted it (no transcript is claimed). */
  reply: string;
  /** The notice the reply carries. The Spanish one is the approved wording; the others are sample translations. */
  notice: string;
  noticeIsSample: boolean;
  recorded: { k: L; v: L }[];
  next: L;
}

export const enquiries: Enquiry[] = [
  {
    channel: "whatsapp",
    who: people.buyer.name,
    role: { es: "Compradora · escribe desde Manchester", en: "Buyer · writing from Manchester" },
    time: { es: "martes 11:20", en: "Tuesday 11:20" },
    language: { es: "inglés", en: "English" },
    lang: "en",
    text: "Hi, I'm Laura Serrano. Is the two-bedroom flat in Estepona (EST-204) still available to view? We're flying in from Manchester and could come on Thursday morning. Our budget is up to 320,000 €.",
    reply: "Hi Laura, thank you for writing. I've noted your interest in EST-204 in Estepona, Thursday morning and a budget of up to 320,000 €. Would 10:00 or 12:00 suit you better? A colleague from the agency will confirm the time with you.",
    notice: "I am an AI assistant. I will help you with your property enquiry. If you prefer to speak to a human agent, tell me at any time.",
    noticeIsSample: true,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "2 dormitorios, Estepona · EST-204", en: "2 bedrooms, Estepona · EST-204" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 320.000 €", en: "up to €320,000" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "visita el jueves por la mañana", en: "viewing on Thursday morning" } },
      { k: { es: "Escribe en", en: "Writes in" }, v: { es: "inglés", en: "English" } },
    ],
    next: { es: "Tarea para el equipo: confirmar la hora del jueves.", en: "Task for the team: confirm Thursday's time." },
  },
  {
    channel: "email",
    who: people.sellers.name,
    role: { es: "Propietarios · quieren vender", en: "Owners · want to sell" },
    time: { es: "martes 11:24", en: "Tuesday 11:24" },
    language: { es: "alemán", en: "German" },
    lang: "de",
    text: "Guten Tag, wir möchten unsere Villa in Elviria (Marbella) verkaufen und bitten um eine Bewertung. Wann wäre ein Termin vor Ort möglich?",
    reply: "Guten Tag Frau und Herr Keller, vielen Dank für Ihre Nachricht. Für die Bewertung Ihrer Villa in Elviria vereinbart ein Kollege unserer Agentur einen Termin vor Ort mit Ihnen. Passt Ihnen eher ein Vormittag oder ein Nachmittag in dieser Woche?",
    notice: "Ich bin ein KI-Assistent und helfe Ihnen bei Ihrer Immobilienanfrage. Wenn Sie lieber mit einer Person sprechen möchten, sagen Sie es mir jederzeit.",
    noticeIsSample: true,
    recorded: [
      { k: { es: "Pide", en: "Asks for" }, v: { es: "valoración de una villa", en: "a villa valuation" } },
      { k: { es: "Zona", en: "Area" }, v: { es: "Marbella · Elviria", en: "Marbella · Elviria" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "visita de valoración esta semana", en: "valuation visit this week" } },
      { k: { es: "Escriben en", en: "Write in" }, v: { es: "alemán", en: "German" } },
    ],
    next: { es: "Tarea para el equipo: proponer día y hora para la valoración.", en: "Task for the team: propose a day and time for the valuation." },
  },
  {
    channel: "webform",
    who: people.tenant.name,
    role: { es: "Inquilina · alquiler de larga temporada", en: "Tenant · long-term rental" },
    time: { es: "martes 11:31", en: "Tuesday 11:31" },
    language: { es: "español", en: "Spanish" },
    lang: "es",
    text: "Busco un piso de dos dormitorios en Fuengirola para alquiler de larga temporada, hasta 1.200 € al mes, a partir de enero. ¿Tenéis algo?",
    reply: "Hola Sofía, gracias por escribirnos. He anotado que buscas dos dormitorios en Fuengirola, hasta 1.200 € al mes y a partir de enero. Una persona de la agencia te escribe con lo que tenemos en alquiler de larga temporada. ¿Prefieres que te contestemos por email o por WhatsApp?",
    notice: "🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "alquiler, 2 dormitorios, Fuengirola", en: "rental, 2 bedrooms, Fuengirola" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 1.200 € al mes", en: "up to €1,200 a month" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "a partir de enero", en: "from January" } },
      { k: { es: "Escribe en", en: "Writes in" }, v: { es: "español", en: "Spanish" } },
    ],
    next: { es: "Tarea para el equipo: enviar lo disponible en alquiler.", en: "Task for the team: send what is available to rent." },
  },
  {
    channel: "phone",
    who: people.caller.name,
    role: { es: "Comprador · llama por una villa", en: "Buyer · calling about a villa" },
    time: { es: "martes 11:37", en: "Tuesday 11:37" },
    language: { es: "español", en: "Spanish" },
    lang: "es",
    text: "Llamo por la villa de Elviria, la EST-118. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.",
    reply: "El asistente ha anotado el motivo de la llamada, el inmueble y la preferencia de horario. No ha dado precio ni ha negociado: una persona de la agencia le devuelve la llamada por la tarde.",
    notice: "Al descolgar, el asistente dice que es un asistente de inteligencia artificial y que se puede pedir hablar con una persona.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Pregunta por", en: "Asks about" }, v: { es: "EST-118 · precio y margen", en: "EST-118 · price and room to negotiate" } },
      { k: { es: "Prefiere", en: "Prefers" }, v: { es: "llamada por la tarde", en: "a call in the afternoon" } },
      { k: { es: "Habla en", en: "Speaks" }, v: { es: "español", en: "Spanish" } },
      { k: { es: "Canal", en: "Channel" }, v: { es: "teléfono", en: "phone" } },
    ],
    next: { es: "Tarea para el equipo: devolver la llamada por la tarde. Una tarea de rellamada no es una llamada hecha.", en: "Task for the team: call back in the afternoon. A callback task is not a call made." },
  },
];

/** The first screen (master order §4): for whom, which problem, how the product looks, what to do next. */
export const heroWords = {
  h1Soft: { es: "Mientras enseñas una vivienda,", en: "While you show a home," }, // owner's working line, master order §4
  h1: { es: "Nuova atiende tus consultas.", en: "Nuova answers your enquiries." },
  lead: { es: "Por WhatsApp, email, formulario web y teléfono, en el idioma de cada cliente. Lo que pide queda guardado y tu equipo sabe cuál es el siguiente paso.", en: "On WhatsApp, email, web form and phone, in each customer's language. What they ask for is kept, and your team knows the next step." },
  ctaStory: { es: "Ver cómo funciona", en: "See how it works" },
  trialLine: { es: "14 días gratis · Sin tarjeta", en: "14 days free · No card" },
  labels: { enquiry: { es: "Llega por WhatsApp", en: "Arrives on WhatsApp" }, reply: { es: "Nuova responde en", en: "Nuova replies in" }, crm: { es: "Ficha del cliente", en: "Customer record" }, next: { es: "Siguiente paso", en: "Next step" } },
  taskTitle: { es: "Confirmar con Laura Serrano la hora del jueves", en: "Confirm Thursday's time with Laura Serrano" },
  taskFor: { es: "Para el equipo · cuando termine la visita", en: "For the team · once the viewing ends" },
  taskAction: { es: "Tomar", en: "Take" },
  replay: { es: "Reproducir otra vez", en: "Play again" },
  surfaceLabel: { es: "Ejemplo: una consulta por WhatsApp en inglés, la respuesta en inglés, la ficha del cliente y el siguiente paso para el equipo", en: "Example: a WhatsApp enquiry in English, the reply in English, the customer record and the next step for the team" },
};

/** The chapters A to F: eyebrow letter, headline, one paragraph, and the words inside the stage. */
export interface Chapter {
  key: ChapterKey;
  letter: string;
  eyebrow: L;
  title: L;
  line: L;
}

export const chapters: Chapter[] = [
  {
    key: "situation",
    letter: "A",
    eyebrow: { es: "La situación", en: "The situation" },
    title: { es: "Estás enseñando una vivienda. Mientras tanto, llegan cuatro consultas.", en: "You are showing a home. Meanwhile, four enquiries arrive." },
    line: { es: "Marcos enseña la villa EST-118 en Marbella de 11:00 a 12:00. En ese rato entran una compradora por WhatsApp, unos propietarios por email, una inquilina por el formulario web y una llamada.", en: "Marcos is showing the villa EST-118 in Marbella from 11:00 to 12:00. In that hour a buyer writes on WhatsApp, two owners by email, a tenant through the web form, and the phone rings." },
  },
  {
    key: "reply",
    letter: "B",
    eyebrow: { es: "La respuesta", en: "The reply" },
    title: { es: "Nuova responde a cada cliente en su idioma y aclara lo que busca.", en: "Nuova replies to each customer in their language and clarifies what they want." },
    line: { es: "Zona, presupuesto y plazo quedan claros en la primera respuesta. Nada se compromete: ni precio, ni fecha, ni disponibilidad. Cada cliente sabe que responde un asistente.", en: "Area, budget and timing are clear from the first reply. Nothing is committed: no price, no date, no availability. Every customer is told an assistant is replying." },
  },
  {
    key: "match",
    letter: "C",
    eyebrow: { es: "El inmueble que encaja", en: "The property that fits" },
    title: { es: "De lo que pide Laura salen dos propuestas de tu cartera.", en: "What Laura asked for becomes two proposals from your portfolio." },
    line: { es: "Dos dormitorios en Estepona, terraza, hasta 320.000 €. Solo se muestran inmuebles tuyos, con tus fotos y tus datos, y solo lo que tu fuente marca como publicable y actual.", en: "Two bedrooms in Estepona, a terrace, up to €320,000. Only your own listings are shown, with your photos and your data, and only what your source marks as publishable and current." },
  },
  {
    key: "task",
    letter: "D",
    eyebrow: { es: "La siguiente acción", en: "The next action" },
    title: { es: "A la mañana siguiente, Jarvis dice qué va primero y por qué.", en: "The next morning, Jarvis says what comes first and why." },
    line: { es: "Una consulta importante se convierte en una tarea con prioridad, motivo y siguiente paso. Elena la toma, confirma la hora con Laura y la cierra. Queda documentado quién hizo qué.", en: "An important enquiry becomes a task with a priority, a reason and a next step. Elena takes it, confirms the time with Laura and closes it. Who did what is on record." },
  },
  {
    key: "followup",
    letter: "E",
    eyebrow: { es: "Seguir en contacto", en: "Staying in touch" },
    title: { es: "El viernes entra un piso nuevo que encaja con Laura. Ella recibe un mensaje útil.", en: "On Friday a new flat comes in that fits Laura. She receives a useful message." },
    line: { es: "Un inmueble nuevo no basta por sí solo. El seguimiento sale solo si Laura aceptó recibir propuestas y tú activaste los seguimientos. El mensaje es concreto: el piso, los datos y una sola acción.", en: "A new listing is not enough on its own. The follow-up goes out only if Laura agreed to receive proposals and you switched follow-ups on. The message is concrete: the flat, the facts and one action." },
  },
  {
    key: "result",
    letter: "F",
    eyebrow: { es: "El resultado", en: "The result" },
    title: { es: "Al final de la semana sabes qué se atendió, qué sigue abierto y qué salió de ello.", en: "At the end of the week you know what was handled, what is still open and what came of it." },
    line: { es: "Un resumen semanal corto llega por email. El informe completo, con el periodo, la base de datos y las acciones pendientes, está en tu acceso de agencia.", en: "A short weekly summary arrives by email. The full report, with the period, the data behind it and the open actions, is in your agency login." },
  },
];

/** Words inside the stages, by chapter. */
export const storyWords = {
  common: {
    example: { es: "Ejemplo con personas e inmuebles inventados", en: "Example with invented people and listings" },
    photo: { es: "Foto de muestra", en: "Sample photo" },
    assistant: { es: "Nuova · asistente de IA", en: "Nuova · AI assistant" },
    record: { es: "Ficha del cliente", en: "Customer record" },
    noticeTitle: { es: "El aviso que lleva la respuesta", en: "The notice the reply carries" },
    noticeSample: { es: "Traducción de muestra; el aviso aprobado es el español.", en: "Sample translation; the approved notice is the Spanish one." },
    showNotice: { es: "Ver el aviso", en: "Show the notice" },
    hideNotice: { es: "Ocultar el aviso", en: "Hide the notice" },
    channelLabel: { es: "Canal", en: "Channel" },
    language: { es: "Idioma", en: "Language" },
    siteLanguage: { es: "Idioma de la web", en: "Website language" },
    replyLanguage: { es: "Idioma de la respuesta", en: "Reply language" },
  },
  situation: {
    now: { es: "Martes · 11:20", en: "Tuesday · 11:20" },
    viewing: { es: "Visita en curso", en: "Viewing in progress" },
    viewingWho: { es: "Marcos · 11:00 a 12:00", en: "Marcos · 11:00 to 12:00" },
    desk: { es: "Nadie en la oficina", en: "Nobody at the desk" },
    arriving: { es: "Mientras tanto, llega", en: "Meanwhile, arriving" },
    answered: { es: "Atendida por Nuova", en: "Handled by Nuova" },
    after: { es: "Cuando Marcos termina la visita, las cuatro consultas tienen respuesta y ficha.", en: "When Marcos finishes the viewing, all four enquiries have a reply and a record." },
  },
  reply: {
    pick: { es: "Elige el canal", en: "Pick the channel" },
    incoming: { es: "Lo que escribe el cliente", en: "What the customer writes" },
    incomingPhone: { es: "Lo que dice al llamar", en: "What they say on the call" },
    replied: { es: "Lo que responde Nuova", en: "What Nuova replies" },
    repliedPhone: { es: "Lo que hace el asistente", en: "What the assistant does" },
    noted: { es: "Lo que queda claro", en: "What is now clear" },
    formTitle: { es: "Formulario de tu web", en: "Your website's form" },
    formReply: { es: "Respuesta por email, en el idioma del formulario", en: "Reply by email, in the form's language" },
    emailSubject: { es: "Asunto", en: "Subject" },
    emailSubjectKeller: "Re: Bewertung unserer Villa in Elviria",
    callIncoming: { es: "Llamada entrante", en: "Incoming call" },
    callAnswered: { es: "Atendida por el asistente · en español", en: "Answered by the assistant · in Spanish" },
    callNoteTitle: { es: "Nota de la llamada", en: "Call note" },
    phoneCaveat: { es: "Una llamada atendida deja una nota y una tarea. No confirma citas ni da precios.", en: "An answered call leaves a note and a task. It confirms no appointments and gives no prices." },
    languages: { es: "La web está en español o inglés; la respuesta va en el idioma del cliente.", en: "The website is in Spanish or English; the reply goes in the customer's language." },
  },
  match: {
    wants: { es: "Lo que busca Laura", en: "What Laura wants" },
    criteria: { es: ["Estepona", "2 dormitorios", "Terraza", "Hasta 320.000 €"], en: ["Estepona", "2 bedrooms", "Terrace", "Up to €320,000"] },
    fits: { es: "Dos inmuebles de tu cartera encajan", en: "Two listings from your portfolio fit" },
    yours: { es: "Tu cartera", en: "Your portfolio" },
    rights: { es: "Se muestra solo lo que tu fuente marca como publicable y actual. Sin disponibilidad confirmada no se afirma disponibilidad.", en: "Only what your source marks as publishable and current is shown. Without confirmed availability, no availability is claimed." },
    sent: { es: "Propuesta enviada a Laura por WhatsApp · martes 11:22", en: "Proposal sent to Laura on WhatsApp · Tuesday 11:22" },
    proposal: "Laura, two flats in Estepona fit what you described: EST-204 (2 bedrooms, terrace, 315,000 €) and EST-231 (2 bedroom penthouse with views, 319,000 €). Here are the details. Shall we look at both on Thursday?",
    details: { es: "Ver ficha", en: "See details" },
  },
  task: {
    morning: { es: "Miércoles · 08:30 · lista de Elena", en: "Wednesday · 08:30 · Elena's list" },
    priority: { es: "Prioridad", en: "Priority" },
    why: { es: "Por qué", en: "Why" },
    nextStep: { es: "Siguiente paso", en: "Next step" },
    items: {
      es: [
        { who: "Laura Serrano", what: "Visita pedida el jueves por la mañana · EST-204", why: "Pidió una fecha concreta, viene desde Manchester y tiene presupuesto definido", next: "Confirmar 10:00 o 12:00 por WhatsApp" },
        { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria", why: "Propietarios que quieren vender; piden cita esta semana", next: "Proponer día y hora para la visita de valoración" },
        { who: "Álvaro Pons", what: "Rellamada por EST-118 · precio y margen", why: "Pidió que le llamen por la tarde", next: "Llamar a partir de las 16:00" },
        { who: "Sofía Lamas", what: "Alquiler de larga temporada en Fuengirola", why: "Sin fecha; a partir de enero", next: "Enviar lo disponible en alquiler" },
      ],
      en: [
        { who: "Laura Serrano", what: "Viewing asked for Thursday morning · EST-204", why: "She named a date, is coming from Manchester and has a defined budget", next: "Confirm 10:00 or 12:00 on WhatsApp" },
        { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria", why: "Owners who want to sell; they ask for an appointment this week", next: "Propose a day and time for the valuation visit" },
        { who: "Álvaro Pons", what: "Callback about EST-118 · price and room to negotiate", why: "He asked to be called in the afternoon", next: "Call from 16:00" },
        { who: "Sofía Lamas", what: "Long-term rental in Fuengirola", why: "No date; from January", next: "Send what is available to rent" },
      ],
    },
    take: { es: "Tomar", en: "Take" },
    taken: { es: "Tomada por Elena", en: "Taken by Elena" },
    confirm: { es: "Confirmada: jueves 10:00", en: "Confirmed: Thursday 10:00" },
    complete: { es: "Marcar como hecha", en: "Mark as done" },
    done: { es: "Hecha · miércoles 09:02 · Elena", en: "Done · Wednesday 09:02 · Elena" },
    doneLine: { es: "Visita confirmada con Laura para el jueves a las 10:00. Queda en la ficha y en la agenda de Elena.", en: "Viewing confirmed with Laura for Thursday at 10:00. It is on the record and in Elena's diary." },
    open: { es: "Abierta · nadie la ha tomado", en: "Open · nobody has taken it" },
    again: { es: "Volver a empezar", en: "Start again" },
    othersSee: { es: "Los demás ven que está tomada y por quién.", en: "The others see that it is taken and by whom." },
    chatConfirm: "Hi Laura, Elena from the agency here. Thursday at 10:00 is confirmed for EST-204. I'll send you the address and my number now. See you then!",
  },
  followup: {
    trigger: { es: "Viernes · 09:10 · entra en tu cartera", en: "Friday · 09:10 · enters your portfolio" },
    matches: { es: "Encaja con lo que busca Laura", en: "Fits what Laura is looking for" },
    conditions: { es: "Condiciones para enviarlo", en: "Conditions for sending it" },
    conditionList: {
      es: ["Laura aceptó recibir propuestas (martes 11:22)", "Tienes los seguimientos activados", "El inmueble está marcado como publicable y actual"],
      en: ["Laura agreed to receive proposals (Tuesday 11:22)", "You have follow-ups switched on", "The listing is marked publishable and current"],
    },
    email: { es: "El email que recibe Laura", en: "The email Laura receives" },
    from: { es: "De: tu agencia", en: "From: your agency" },
    subject: "A new flat in Estepona that fits what you're looking for",
    body: "Hi Laura, before Thursday: a two-bedroom flat on the seafront in Estepona has just come in, within your budget. Next to it, the penthouse EST-231 you already have. If you'd like to see it on Thursday as well, one tap is enough.",
    cta: "Ask to view it on Thursday",
    footer: { es: "Un seguimiento por inmueble nuevo, nunca más de uno por semana por cliente, y siempre con un enlace para dejar de recibirlos.", en: "One follow-up per new listing, never more than one a week per customer, and always with a link to stop receiving them." },
  },
  result: {
    weekly: { es: "Resumen semanal · tu agencia", en: "Weekly summary · your agency" },
    period: { es: "Semana del lunes al domingo", en: "Monday to Sunday" },
    basis: { es: "Base: consultas registradas en Nuova en los canales conectados", en: "Basis: enquiries recorded in Nuova on the connected channels" },
    numbers: {
      es: [
        { k: "Consultas recibidas", v: "23", d: "WhatsApp 11 · email 7 · web 3 · teléfono 2" },
        { k: "Respondidas", v: "23", d: "en el idioma del cliente" },
        { k: "Visitas pedidas", v: "6", d: "4 confirmadas por el equipo, entre ellas la de Laura Serrano" },
        { k: "Valoraciones pedidas", v: "2", d: "propietarios que quieren vender" },
        { k: "Tareas cerradas", v: "11", d: "2 siguen abiertas" },
        { k: "Propuestas enviadas", v: "4", d: "a clientes que las aceptaron" },
      ],
      en: [
        { k: "Enquiries received", v: "23", d: "WhatsApp 11 · email 7 · web 3 · phone 2" },
        { k: "Answered", v: "23", d: "in the customer's language" },
        { k: "Viewings asked for", v: "6", d: "4 confirmed by the team, Laura Serrano's among them" },
        { k: "Valuations asked for", v: "2", d: "owners who want to sell" },
        { k: "Tasks closed", v: "11", d: "2 still open" },
        { k: "Proposals sent", v: "4", d: "to customers who agreed to them" },
      ],
    },
    openTitle: { es: "Sigue abierto", en: "Still open" },
    open: {
      es: ["Valoración Keller · falta fijar la cita", "Sofía Lamas · esperando su respuesta"],
      en: ["Keller valuation · appointment still to fix", "Sofía Lamas · waiting for her reply"],
    },
    emailTitle: { es: "El email del lunes", en: "Monday's email" },
    emailLine: { es: "Lo más importante en seis cifras y un botón.", en: "The essentials in six figures and one button." },
    button: { es: "Ver el informe completo", en: "See the full report" },
    inLogin: { es: "En tu acceso de agencia: periodo, base de datos, evolución y acciones pendientes.", en: "In your agency login: the period, the data behind it, the trend and the open actions." },
    illustrative: { es: "Cifras de ejemplo", en: "Example figures" },
  },
};
