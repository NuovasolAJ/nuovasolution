import type { Locale } from "@/lib/i18n/config";

/**
 * The home page story (master order 2026-10-10 §3; final order 2026-10-12 §1, §4, §5): one example enquiry, carried
 * through six chapters that read in the normal scroll. Roles, names, properties and the clock agree everywhere:
 *
 *   Tuesday 11:00–12:00  Marcos (agent) shows the villa EST-118 in Marbella; nobody is at the desk.
 *   Tuesday 11:20        Laura Serrano (buyer, Manchester) writes on WhatsApp in English about EST-204.
 *   Tuesday 11:24        Peter and Anna Keller (sellers, Elviria) write by email in German for a valuation.
 *   Tuesday 11:31        Sofía Lamas (tenant) sends the web form in Spanish, long-term rental in Fuengirola.
 *   Tuesday 11:37        Álvaro Pons (buyer) calls about the price of EST-118.
 *   Wednesday 08:30      the morning assistant greets Elena with the day's order; she takes Laura's viewing and confirms Thursday 10:00.
 *   Wednesday 17:30      A new listing EST-240 fits Laura; an allowed follow-up goes out by email, before Thursday.
 *   Thursday 10:00       Laura's viewing (confirmed by Elena on Wednesday).
 *   The week             The weekly overview counts what was handled; the details are in the login.
 *
 * Texts: WORKING by the implementer; Copy's deltas D-94…D-104 of CLAIMS_CHECK_1012 are applied where they touch this
 * file and marked. Nothing shown is a real person, a real listing or a real agency. The product states behind each
 * chapter stand in ACCEPTANCE_LIST_1010.md and, in two words, under every chapter (Copy, CLAIMS_CHECK_1012 §1).
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
  caller: { name: "Álvaro Pons", short: "Álvaro", phone: "+34 600 123 456" },
};

/** The listings of the example portfolio. Photos: licensed stock (docs/website_redesign/MEDIA_SOURCES_1010.md), never a real listing. */
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
    photoAlt: { es: "Salón luminoso abierto a una terraza con el mar al fondo", en: "Bright living room opening onto a terrace with the sea behind" },
  },
  est231: {
    ref: REFERENCE_2,
    title: { es: "Ático de 2 dormitorios con vistas", en: "Two bedroom penthouse with views" },
    place: { es: "Estepona · Seghers", en: "Estepona · Seghers" },
    facts: { es: "2 dorm. · 2 baños · 71 m² · terraza 22 m²", en: "2 bed · 2 bath · 71 m² · 22 m² terrace" },
    price: "319.000 €",
    photo: "/media/world/listing-est231.webp",
    photoAlt: { es: "Salón de doble altura con cristalera y vistas al mar", en: "Double-height living room with glass front and sea views" },
  },
  est118: {
    ref: REFERENCE_VIEWING,
    title: { es: "Villa con piscina y vistas al mar", en: "Villa with pool and sea views" },
    place: { es: "Marbella · Elviria", en: "Marbella · Elviria" },
    facts: { es: "4 dorm. · 3 baños · 240 m² · parcela 900 m²", en: "4 bed · 3 bath · 240 m² · 900 m² plot" },
    price: "1.150.000 €",
    photo: "/media/world/listing-est118.webp",
    photoAlt: { es: "Villa moderna blanca con piscina y terraza de piedra", en: "Modern white villa with a pool and a stone terrace" },
  },
  est240: {
    ref: REFERENCE_NEW,
    title: { es: "Piso de 2 dormitorios, primera línea", en: "Two bedroom flat, seafront" },
    place: { es: "Estepona · paseo marítimo", en: "Estepona · seafront promenade" },
    facts: { es: "2 dorm. · 1 baño · 74 m² · terraza 12 m²", en: "2 bed · 1 bath · 74 m² · 12 m² terrace" },
    price: "318.000 €",
    photo: "/media/world/listing-est240.webp",
    photoAlt: { es: "Salón de un piso reformado con balcón", en: "Living room of a renovated flat with a balcony" },
  },
};

/** The four channels, in the order they appear. */
export const channels: { key: ChannelKey; name: L }[] = [
  { key: "whatsapp", name: { es: "WhatsApp", en: "WhatsApp" } },
  { key: "email", name: { es: "Email", en: "Email" } },
  { key: "webform", name: { es: "Formulario web", en: "Web form" } },
  { key: "phone", name: { es: "Teléfono", en: "Phone" } },
];

/**
 * One enquiry per channel. `text` and `reply` are in the customer's language; `translation` gives the page's reader
 * the same in Spanish and English (shown by default, the original one tap away), so the international customer stays
 * visible and the page stays readable (final order §5).
 */
export interface Enquiry {
  channel: ChannelKey;
  who: string;
  role: L;
  time: L;
  language: L;
  lang: "en" | "es" | "de";
  /** The customer's message, in their language. */
  text: string;
  /** The short form for the chapter that must not repeat the hero's dialogue. */
  textShort: L;
  /** Nuova's reply in the customer's language (phone: what the assistant noted, no transcript is claimed). */
  reply: string;
  translation: { text: L; reply: L };
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
    text: "Hi, I'm Laura Serrano. Could we view the two-bedroom flat in Estepona (EST-204)? We're flying in from Manchester and could come on Thursday morning. Our budget is up to 320,000 €.",
    textShort: { es: "Laura pregunta por el piso EST-204 y propone el jueves por la mañana.", en: "Laura asks about the flat EST-204 and proposes Thursday morning." },
    // D-97: a preference, not two free hours. No slot is promised; a person confirms.
    reply: "Hi Laura, thank you for writing. I've noted your interest in EST-204 and Thursday. Would the morning or the afternoon suit you better? A colleague from the agency will confirm the time with you.",
    translation: {
      text: { es: "Hola, soy Laura Serrano. ¿Podríamos ver el piso de dos dormitorios en Estepona (EST-204)? Venimos desde Manchester y podríamos ir el jueves por la mañana. Nuestro presupuesto llega hasta 320.000 €.", en: "Hi, I'm Laura Serrano. Could we view the two-bedroom flat in Estepona (EST-204)? We're flying in from Manchester and could come on Thursday morning. Our budget is up to 320,000 €." },
      reply: { es: "Hola Laura, gracias por escribir. He anotado tu interés por EST-204 y el jueves. ¿Te viene mejor por la mañana o por la tarde? Una persona de la agencia te confirma la hora.", en: "Hi Laura, thank you for writing. I've noted your interest in EST-204 and Thursday. Would the morning or the afternoon suit you better? A colleague from the agency will confirm the time with you." },
    },
    notice: "I am an AI assistant. I will help you with your property enquiry. If you prefer to speak to a human agent, tell me at any time.",
    noticeIsSample: true,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "2 dormitorios, Estepona · EST-204", en: "2 bedrooms, Estepona · EST-204" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 320.000 €", en: "up to €320,000" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "quiere visitar el jueves", en: "wants to view on Thursday" } },
      { k: { es: "Escribe en", en: "Writes in" }, v: { es: "inglés", en: "English" } },
    ],
    next: { es: "Tarea para el equipo: confirmar la hora del jueves con Laura.", en: "Task for the team: confirm Thursday's time with Laura." },
  },
  {
    channel: "email",
    who: people.sellers.name,
    role: { es: "Propietarios · quieren vender", en: "Owners · want to sell" },
    time: { es: "martes 11:24", en: "Tuesday 11:24" },
    language: { es: "alemán", en: "German" },
    lang: "de",
    text: "Guten Tag, wir möchten unsere Villa in Elviria (Marbella) verkaufen und bitten um eine Bewertung. Wann wäre ein Termin vor Ort möglich?",
    textShort: { es: "Los Keller quieren vender su villa en Elviria y piden una valoración.", en: "The Kellers want to sell their villa in Elviria and ask for a valuation." },
    reply: "Guten Tag Frau und Herr Keller, vielen Dank für Ihre Nachricht. Für die Bewertung Ihrer Villa in Elviria meldet sich ein Kollege unserer Agentur bei Ihnen, um einen Termin vor Ort zu vereinbaren. Passt Ihnen eher ein Vormittag oder ein Nachmittag?",
    translation: {
      text: { es: "Buenos días, queremos vender nuestra villa en Elviria (Marbella) y pedimos una valoración. ¿Cuándo sería posible una visita?", en: "Good morning, we would like to sell our villa in Elviria (Marbella) and ask for a valuation. When would a visit be possible?" },
      reply: { es: "Buenos días, señores Keller, gracias por su mensaje. Para la valoración de su villa en Elviria, una persona de nuestra agencia les contactará para acordar la visita. ¿Les viene mejor por la mañana o por la tarde?", en: "Good morning Mr and Mrs Keller, thank you for your message. For the valuation of your villa in Elviria a colleague from our agency will contact you to arrange the visit. Would a morning or an afternoon suit you better?" },
    },
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
    textShort: { es: "Sofía busca un alquiler de larga temporada en Fuengirola desde enero.", en: "Sofía is looking for a long-term rental in Fuengirola from January." },
    reply: "Hola Sofía, gracias por escribirnos. Una persona de la agencia te envía lo que tenemos en alquiler de larga temporada en Fuengirola. ¿Prefieres que te contestemos por email o por WhatsApp?",
    translation: {
      text: { es: "Busco un piso de dos dormitorios en Fuengirola para alquiler de larga temporada, hasta 1.200 € al mes, a partir de enero. ¿Tenéis algo?", en: "I'm looking for a two-bedroom flat in Fuengirola for a long-term rental, up to €1,200 a month, from January. Do you have anything?" },
      reply: { es: "Hola Sofía, gracias por escribirnos. Una persona de la agencia te envía lo que tenemos en alquiler de larga temporada en Fuengirola. ¿Prefieres que te contestemos por email o por WhatsApp?", en: "Hi Sofía, thank you for writing. A colleague from the agency will send you what we have for long-term rental in Fuengirola. Would you rather hear back by email or on WhatsApp?" },
    },
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
    textShort: { es: "Álvaro llama por la villa EST-118 y pide que le devuelvan la llamada por la tarde.", en: "Álvaro calls about the villa EST-118 and asks for a call back in the afternoon." },
    reply: "El asistente anota el motivo de la llamada, el inmueble y el horario que prefiere. No da precio ni negocia: una persona de la agencia le devuelve la llamada por la tarde.",
    translation: {
      text: { es: "Llamo por la villa de Elviria, la EST-118. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.", en: "I'm calling about the villa in Elviria, EST-118. I'd like to know the price and whether there is room to negotiate. The afternoon suits me better for a call back." },
      reply: { es: "El asistente anota el motivo de la llamada, el inmueble y el horario que prefiere. No da precio ni negocia: una persona de la agencia le devuelve la llamada por la tarde.", en: "The assistant notes the reason for the call, the property and the preferred time. It gives no price and does not negotiate: a colleague from the agency calls back in the afternoon." },
    },
    notice: "Al descolgar, el asistente dice que es un asistente de inteligencia artificial y que se puede pedir hablar con una persona.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Pregunta por", en: "Asks about" }, v: { es: "EST-118 · precio y margen", en: "EST-118 · price and room to negotiate" } },
      { k: { es: "Prefiere", en: "Prefers" }, v: { es: "llamada por la tarde", en: "a call in the afternoon" } },
      { k: { es: "Teléfono", en: "Phone" }, v: { es: people.caller.phone, en: people.caller.phone } },
      { k: { es: "Habla en", en: "Speaks" }, v: { es: "español", en: "Spanish" } },
    ],
    next: { es: "Tarea para el equipo: devolver la llamada por la tarde. Una tarea de rellamada no es una llamada hecha.", en: "Task for the team: call back in the afternoon. A callback task is not a call made." },
  },
];

/** The first screen (final order §3): for whom, which problem, how the product looks, what to do next. */
export const heroWords = {
  h1Soft: { es: "Mientras enseñas una vivienda,", en: "While you show a home," },
  h1: { es: "Nuova atiende tus consultas.", en: "Nuova answers your enquiries." },
  // D-94 applied in spirit: no language is promised in the lead; the state line under the panel says what runs today.
  lead: { es: "Responde a lo que llega por WhatsApp, email, formulario web y teléfono, guarda lo que pide cada cliente y deja a tu equipo el siguiente paso.", en: "It answers what arrives on WhatsApp, email, web form and phone, keeps what each customer asks for and leaves your team the next step." },
  ctaStory: { es: "Ver cómo funciona", en: "See how it works" },
  trialLine: { es: "14 días gratis · Sin tarjeta", en: "14 days free · No card" },
  labels: { enquiry: { es: "Llega por WhatsApp", en: "Arrives on WhatsApp" }, reply: { es: "Nuova responde en", en: "Nuova replies in" }, crm: { es: "Ficha del cliente", en: "Customer record" }, next: { es: "Siguiente paso", en: "Next step" } },
  taskTitle: { es: "Confirmar con Laura Serrano la hora del jueves", en: "Confirm Thursday's time with Laura Serrano" },
  taskFor: { es: "Para el equipo · cuando termine la visita", en: "For the team · once the viewing ends" },
  taskAction: { es: "Tomar", en: "Take" },
  replay: { es: "Reproducir otra vez", en: "Play again" },
  /** The two foreground cards (final order §3): the situation, not a product name. */
  cardViewing: { title: { es: "Estás en una visita", en: "You are at a viewing" }, line: { es: "Marcos enseña una villa en Marbella de 11:00 a 12:00.", en: "Marcos is showing a villa in Marbella from 11:00 to 12:00." }, ref: { es: "Referencia EST-118", en: "Reference EST-118" } },
  cardArrivals: { title: { es: "Mientras tanto, Nuova atiende lo que llega", en: "Meanwhile, Nuova handles what arrives" }, line: { es: "Cuatro consultas en una hora, por cuatro canales.", en: "Four enquiries in one hour, on four channels." } },
  /** The hero's short exchange (owner 2026-10-12: far less of Laura's text in the first screen). */
  heroEnquiry: "Hi, could we view the two-bedroom flat in Estepona (EST-204) on Thursday morning? We're coming from Manchester.",
  heroReply: "Hi Laura, thanks for writing. I've noted EST-204 and Thursday. Would the morning or the afternoon suit you better? A colleague will confirm the time with you.",
  /** The situation, as one line inside the panel (owner 2026-10-12: no cards under the panel). */
  situationLine: { es: "Martes 11:20 · Marcos está en una visita hasta las 12:00 · Nuova atiende lo que llega", en: "Tuesday 11:20 · Marcos is at a viewing until 12:00 · Nuova handles what arrives" },
  /** The state line of the hero example (Copy, CLAIMS_CHECK_1012 §1 B): what runs today, what the example shows. */
  /** TEXTS_1013 §4 L-1 + L-2 (Copy, for this build): the channel, the version and the evidence behind the line. */
  stateToday: { es: "Hoy respondemos en español. El sistema responde en el idioma del cliente; lo que falta en otros idiomas es la aprobación legal del aviso, no la función.", en: "Today we answer in Spanish. The system replies in the customer's language; what is missing for other languages is the legal approval of the notice, not the capability." },
  surfaceLabel: { es: "Ejemplo: una consulta por WhatsApp en inglés, la respuesta, la ficha del cliente y el siguiente paso para el equipo", en: "Example: a WhatsApp enquiry in English, the reply, the customer record and the next step for the team" },
};

/** The chapters: a short benefit headline, one paragraph, and the two-word state line (CLAIMS_CHECK_1012 §1). */
export interface Chapter {
  key: ChapterKey;
  eyebrow: L;
  title: L;
  line: L;
  state: L;
}

export const chapters: Chapter[] = [
  {
    key: "situation",
    eyebrow: { es: "Llegan consultas", en: "Enquiries arrive" },
    title: { es: "Cuatro consultas en una hora, mientras estás con un cliente.", en: "Four enquiries in one hour, while you are with a customer." },
    line: { es: "Marcos enseña la villa de Elviria de 11:00 a 12:00. En ese rato escriben una compradora por WhatsApp, unos propietarios por email, una inquilina por el formulario web y llama un comprador.", en: "Marcos is showing the villa in Elviria from 11:00 to 12:00. In that hour a buyer writes on WhatsApp, two owners by email, a tenant through the web form, and a buyer calls." },
    state: { es: "Disponible hoy: WhatsApp y email. Prototipo: el formulario web y la llamada.", en: "Available today: WhatsApp and email. Prototype: the web form and the phone call." },
  },
  {
    key: "reply",
    eyebrow: { es: "Nuova responde y registra", en: "Nuova answers and records" },
    // D-95: the language is not claimed in the title; the example keeps the international customer visible.
    title: { es: "Cada cliente recibe una respuesta concreta, y lo que pide queda guardado.", en: "Every customer gets a concrete reply, and what they ask for is kept." },
    line: { es: "Zona, presupuesto y plazo quedan claros en la primera respuesta. Nada se compromete: ni precio, ni fecha, ni disponibilidad. Cada cliente sabe que responde un asistente.", en: "Area, budget and timing are clear from the first reply. Nothing is committed: no price, no date, no availability. Every customer is told an assistant is replying." },
    // TEXTS_1013 §4 L-1, L-2, L-3 (email and WhatsApp; no line about the phone or the web form, L-4/L-5).
    state: { es: "Hoy respondemos en español. El sistema responde en el idioma del cliente; lo que falta en otros idiomas es la aprobación legal del aviso, no la función. Si alguien escribe en un idioma sin aviso aprobado, no enviamos nada y queda una tarea para tu equipo.", en: "Today we answer in Spanish. The system replies in the customer's language; what is missing for other languages is the legal approval of the notice, not the capability. If somebody writes in a language without an approved notice, we send nothing and your team gets a task." },
  },
  {
    key: "match",
    eyebrow: { es: "El inmueble que encaja", en: "The property that fits" },
    title: { es: "De lo que pide Laura salen dos propuestas de tu cartera.", en: "What Laura asked for becomes two proposals from your portfolio." },
    line: { es: "Dos dormitorios en Estepona, terraza, hasta 320.000 €. Solo inmuebles tuyos, con tus fotos y tus datos, y solo lo que tu fuente marca como publicable y actual.", en: "Two bedrooms in Estepona, a terrace, up to €320,000. Only your own listings, with your photos and your data, and only what your source marks as publishable and current." },
    state: { es: "Prototipo · todavía no disponible.", en: "Prototype · not available yet." },
  },
  {
    key: "task",
    eyebrow: { es: "La chance importante y el siguiente paso", en: "The important chance and the next step" },
    // D-96: no "priority"; the reason and the next step carry the order.
    title: { es: "A la mañana siguiente, Elena sabe qué va primero y por qué.", en: "The next morning, Elena knows what comes first and why." },
    line: { es: "Una consulta importante se convierte en una tarea con motivo y siguiente paso. Elena la toma, confirma la hora con Laura y la cierra. Queda documentado quién hizo qué. Nuova prepara y organiza; tu equipo asesora y cierra.", en: "An important enquiry becomes a task with a reason and a next step. Elena takes it, confirms the time with Laura and closes it. Who did what is on record. Nuova prepares and organises; your team advises and closes." },
    state: { es: "Disponible hoy: la tarea, tomarla y cerrarla. Prototipo: el asistente que explica el orden y el aviso de consulta importante.", en: "Available today: the task, taking it and closing it. Prototype: the assistant that explains the order and the important-enquiry alert." },
  },
  {
    key: "followup",
    eyebrow: { es: "Un seguimiento con sentido", en: "A follow-up that makes sense" },
    title: { es: "Entra un piso que encaja con Laura. Ella recibe un mensaje útil antes de su visita.", en: "A flat comes in that fits Laura. She gets a useful message before her viewing." },
    line: { es: "Un inmueble nuevo no basta por sí solo. El seguimiento sale solo si Laura aceptó recibir propuestas y tú activaste los seguimientos. El mensaje es concreto: el piso, los datos y una sola acción.", en: "A new listing is not enough on its own. The follow-up goes out only if Laura agreed to receive proposals and you switched follow-ups on. The message is concrete: the flat, the facts and one action." },
    state: { es: "Prototipo · todavía no disponible.", en: "Prototype · not available yet." },
  },
  {
    key: "result",
    eyebrow: { es: "La semana, en cifras", en: "The week, in figures" },
    title: { es: "Al final de la semana sabes qué atendió Nuova, qué chances hay y qué toca hacer.", en: "At the end of the week you know what Nuova handled, which chances there are and what to do next." },
    line: { es: "Un resumen corto llega el lunes por email. El informe completo, con el periodo, la base de datos y las acciones pendientes, está en tu acceso de agencia.", en: "A short summary arrives on Monday by email. The full report, with the period, the data behind it and the open actions, is in your agency login." },
    state: { es: "Prototipo · todavía no disponible.", en: "Prototype · not available yet." },
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
    showNotice: { es: "Ver el aviso de IA", en: "Show the AI notice" },
    hideNotice: { es: "Ocultar el aviso", en: "Hide the notice" },
    channelLabel: { es: "Canal", en: "Channel" },
    language: { es: "Idioma", en: "Language" },
    showOriginal: { es: "Ver el original en {lang}", en: "See the original in {lang}" },
    showTranslation: { es: "Ver la traducción", en: "See the translation" },
    translated: { es: "Traducido del {lang}", en: "Translated from {lang}" },
    original: { es: "Original en {lang}", en: "Original in {lang}" },
    replay: { es: "Reproducir otra vez", en: "Play again" },
    stateLabel: { es: "Estado", en: "State" },
  },
  situation: {
    now: { es: "Martes · 11:20", en: "Tuesday · 11:20" },
    viewing: { es: "Visita en curso", en: "Viewing in progress" },
    viewingWho: { es: "Marcos · 11:00 a 12:00", en: "Marcos · 11:00 to 12:00" },
    desk: { es: "Nadie en la oficina", en: "Nobody at the desk" },
    arriving: { es: "Mientras tanto, llega", en: "Meanwhile, arriving" },
    answered: { es: "Atendida", en: "Handled" },
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
    formReply: { es: "Respuesta por email", en: "Reply by email" },
    emailSubject: { es: "Asunto", en: "Subject" },
    emailSubjectKeller: "Re: Bewertung unserer Villa in Elviria",
    callIncoming: { es: "Llamada entrante", en: "Incoming call" },
    callAnswered: { es: "Atendida por el asistente · en español", en: "Answered by the assistant · in Spanish" },
    phoneCaveat: { es: "Una llamada atendida deja una nota y una tarea. No confirma citas ni da precios.", en: "An answered call leaves a note and a task. It confirms no appointments and gives no prices." },
    languages: { es: "La web está en español o inglés. Cada ejemplo se muestra traducido; el original está a un toque.", en: "The website is in Spanish or English. Each example is shown translated; the original is one tap away." },
  },
  match: {
    wants: { es: "Lo que busca Laura", en: "What Laura wants" },
    criteria: { es: ["Estepona", "2 dormitorios", "Terraza", "Hasta 320.000 €"], en: ["Estepona", "2 bedrooms", "Terrace", "Up to €320,000"] },
    fits: { es: "Dos inmuebles de tu cartera encajan", en: "Two listings from your portfolio fit" },
    yours: { es: "Tu cartera", en: "Your portfolio" },
    rights: { es: "Se muestra solo lo que tu fuente marca como publicable y actual. Sin disponibilidad confirmada no se afirma disponibilidad.", en: "Only what your source marks as publishable and current is shown. Without confirmed availability, no availability is claimed." },
    sent: { es: "Propuesta enviada a Laura por WhatsApp · martes 11:22", en: "Proposal sent to Laura on WhatsApp · Tuesday 11:22" },
    proposal: "Laura, two flats in Estepona fit what you described: EST-204 (2 bedrooms, terrace, 315,000 €) and EST-231 (2 bedroom penthouse with views, 319,000 €). Here are the details. Shall we look at both on Thursday?",
    proposalTranslated: { es: "Laura, dos pisos en Estepona encajan con lo que describes: EST-204 (2 dormitorios, terraza, 315.000 €) y EST-231 (ático de 2 dormitorios con vistas, 319.000 €). Te paso las fichas. ¿Vemos los dos el jueves?", en: "Laura, two flats in Estepona fit what you described: EST-204 (2 bedrooms, terrace, 315,000 €) and EST-231 (2 bedroom penthouse with views, 319,000 €). Here are the details. Shall we look at both on Thursday?" },
    details: { es: "Ver ficha", en: "See details" },
  },
  task: {
    greeting: { es: "Buenos días, Elena.", en: "Good morning, Elena." },
    greetingLine: { es: "Desde ayer han llegado cuatro consultas. Esta es la que más importa hoy, y por qué.", en: "Four enquiries came in since yesterday. This is the one that matters most today, and why." },
    morning: { es: "Miércoles · 08:30 · la lista de la mañana de Elena", en: "Wednesday · 08:30 · Elena's morning list" },
    important: { es: "Consulta importante", en: "Important enquiry" },
    importantWhy: { es: "Fecha, inmueble y presupuesto concretos", en: "A date, a property and a budget named" },
    why: { es: "Por qué", en: "Why" },
    nextStep: { es: "Siguiente paso", en: "Next step" },
    items: {
      es: [
        { who: "Laura Serrano", what: "Visita pedida el jueves · EST-204", why: "Nombró fecha, inmueble y presupuesto, y viene desde Manchester", next: "Confirmar mañana o tarde del jueves por WhatsApp" },
        { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria", why: "Propietarios que quieren vender; piden cita esta semana", next: "Proponer día y hora para la visita de valoración" },
        { who: "Álvaro Pons", what: "Rellamada por EST-118 · precio y margen", why: "Pidió que le llamen por la tarde (+34 600 123 456)", next: "Llamar a partir de las 16:00" },
        { who: "Sofía Lamas", what: "Alquiler de larga temporada en Fuengirola", why: "Sin fecha; a partir de enero", next: "Enviar lo disponible en alquiler" },
      ],
      en: [
        { who: "Laura Serrano", what: "Viewing asked for Thursday · EST-204", why: "She named a date, a property and a budget, and is coming from Manchester", next: "Confirm Thursday morning or afternoon on WhatsApp" },
        { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria", why: "Owners who want to sell; they ask for an appointment this week", next: "Propose a day and time for the valuation visit" },
        { who: "Álvaro Pons", what: "Callback about EST-118 · price and room to negotiate", why: "He asked to be called in the afternoon (+34 600 123 456)", next: "Call from 16:00" },
        { who: "Sofía Lamas", what: "Long-term rental in Fuengirola", why: "No date; from January", next: "Send what is available to rent" },
      ],
    },
    take: { es: "Tomar", en: "Take" },
    taken: { es: "Tomada por Elena", en: "Taken by Elena" },
    complete: { es: "Marcar como hecha", en: "Mark as done" },
    done: { es: "Hecha · miércoles 09:02 · Elena", en: "Done · Wednesday 09:02 · Elena" },
    doneLine: { es: "Visita confirmada con Laura para el jueves a las 10:00. Queda en la ficha y en la agenda de Elena.", en: "Viewing confirmed with Laura for Thursday at 10:00. It is on the record and in Elena's diary." },
    open: { es: "Abierta · nadie la ha tomado", en: "Open · nobody has taken it" },
    again: { es: "Volver a empezar", en: "Start again" },
    othersSee: { es: "Los demás ven que está tomada y por quién.", en: "The others see that it is taken and by whom." },
    chatConfirm: "Hi Laura, Elena from the agency here. Thursday at 10:00 is confirmed for EST-204. I'll send you the address and my number now. See you then!",
    chatConfirmTranslated: { es: "Hola Laura, soy Elena, de la agencia. El jueves a las 10:00 queda confirmado para EST-204. Ahora te envío la dirección y mi número. ¡Hasta el jueves!", en: "Hi Laura, Elena from the agency here. Thursday at 10:00 is confirmed for EST-204. I'll send you the address and my number now. See you then!" },
  },
  followup: {
    trigger: { es: "Miércoles · 17:30 · entra en tu cartera", en: "Wednesday · 17:30 · enters your portfolio" },
    matches: { es: "Encaja con lo que busca Laura", en: "Fits what Laura is looking for" },
    conditions: { es: "Condiciones para enviarlo", en: "Conditions for sending it" },
    conditionList: {
      es: ["Laura aceptó recibir propuestas (martes 11:22)", "Tienes los seguimientos activados", "El inmueble está marcado como publicable y actual"],
      en: ["Laura agreed to receive proposals (Tuesday 11:22)", "You have follow-ups switched on", "The listing is marked publishable and current"],
    },
    email: { es: "El email que recibe Laura", en: "The email Laura receives" },
    from: { es: "De: tu agencia", en: "From: your agency" },
    subject: "A new flat in Estepona that fits what you're looking for",
    subjectTranslated: { es: "Un piso nuevo en Estepona que encaja con lo que buscas", en: "A new flat in Estepona that fits what you're looking for" },
    body: "Hi Laura, before tomorrow's viewing: a two-bedroom flat on the seafront in Estepona has just come in, within your budget. Next to it, the penthouse EST-231 you already have. If you'd like to see it tomorrow as well, one tap is enough.",
    bodyTranslated: { es: "Hola Laura, antes de la visita de mañana: acaba de entrar un piso de dos dormitorios en primera línea en Estepona, dentro de tu presupuesto. Al lado, el ático EST-231 que ya tienes. Si quieres verlo mañana también, basta un toque.", en: "Hi Laura, before tomorrow's viewing: a two-bedroom flat on the seafront in Estepona has just come in, within your budget. Next to it, the penthouse EST-231 you already have. If you'd like to see it tomorrow as well, one tap is enough." },
    cta: { es: "Pedir ver este piso mañana", en: "Ask to see this flat tomorrow" },
    ctaDemo: { es: "Demo: pulsa para ver qué pasa", en: "Demo: press to see what happens" },
    requested: { es: "Solicitud enviada a tu agencia · nadie ha confirmado todavía", en: "Request sent to your agency · nobody has confirmed yet" },
    requestedLine: { es: "Una petición no es una cita. Elena la ve en su lista y confirma la hora con Laura.", en: "A request is not an appointment. Elena sees it on her list and confirms the time with Laura." },
    footer: { es: "Un seguimiento por inmueble nuevo, nunca más de uno por semana por cliente, y siempre con un enlace para dejar de recibirlos.", en: "One follow-up per new listing, never more than one a week per customer, and always with a link to stop receiving them." },
  },
  result: {
    weekly: { es: "Resumen semanal · tu agencia", en: "Weekly summary · your agency" },
    period: { es: "Semana del lunes al domingo", en: "Monday to Sunday" },
    basis: { es: "Base: consultas registradas en Nuova en los canales conectados", en: "Basis: enquiries recorded in Nuova on the connected channels" },
    demo: { es: "Cifras de ejemplo · no son datos de ninguna agencia", en: "Example figures · not any agency's data" },
    /** The three questions of the week (final order §8): what Nuova handled, which chances, what to do next. */
    handled: { title: { es: "Lo que atendió Nuova", en: "What Nuova handled" }, value: "23", line: { es: "consultas respondidas y registradas · WhatsApp 11 · email 7 · web 3 · teléfono 2", en: "enquiries answered and recorded · WhatsApp 11 · email 7 · web 3 · phone 2" } },
    chances: { title: { es: "Chances que han surgido", en: "Chances that came up" }, value: "6", line: { es: "visitas pedidas, 4 confirmadas por el equipo (la de Laura entre ellas) · 2 valoraciones pedidas · 4 propuestas enviadas", en: "viewings asked for, 4 confirmed by the team (Laura's among them) · 2 valuations asked for · 4 proposals sent" } },
    next: { title: { es: "Lo que toca hacer", en: "What to do next" }, value: "2", line: { es: "cosas esperan a una persona: la cita de los Keller y la respuesta de Sofía", en: "things wait for a person: the Kellers' appointment and Sofía's reply" } },
    openTitle: { es: "Sigue abierto", en: "Still open" },
    open: {
      es: ["Valoración Keller · falta fijar la cita", "Sofía Lamas · esperando su respuesta"],
      en: ["Keller valuation · appointment still to fix", "Sofía Lamas · waiting for her reply"],
    },
    emailTitle: { es: "El email del lunes", en: "Monday's email" },
    emailLine: { es: "Lo esencial en tres cifras y un botón.", en: "The essentials in three figures and one button." },
    button: { es: "Ver el informe completo", en: "See the full report" },
    inLogin: { es: "En tu acceso de agencia: periodo, base de datos, evolución y acciones pendientes.", en: "In your agency login: the period, the data behind it, the trend and the open actions." },
  },
  /** The compact social strip (final order §6): listing → draft → approval → published → a comment. */
  social: {
    eyebrow: { es: "Captar desde lo que ya publicas", en: "Attract from what you already publish" },
    title: { es: "Una publicación de tu inmueble, aprobada por ti, y cada comentario en su ficha.", en: "A post of your listing, approved by you, and every comment in a record." },
    line: { es: "Nuova prepara el texto, tú lo apruebas, se publica en tu cuenta. Un comentario público recibe una respuesta que tú permitiste y acaba como contacto.", en: "Nuova prepares the text, you approve it, it is published on your account. A public comment gets a reply you allowed and ends up as a contact." },
    state: { es: "Prototipo · depende de la aprobación de la plataforma.", en: "Prototype · depends on the platform's approval." },
    steps: {
      es: [
        { title: "Inmueble", line: "EST-204 · tus fotos, tus datos" },
        { title: "Borrador", line: "Dos dormitorios, terraza y luz de mañana en Estepona." },
        { title: "Aprobación", line: "Aprobada por ti · miércoles 12:10" },
        { title: "Publicación", line: "Publicada en tu cuenta · jueves 09:00" },
        { title: "Comentario", line: "Un comentario público, una respuesta permitida, un contacto en su ficha" },
      ],
      en: [
        { title: "Listing", line: "EST-204 · your photos, your data" },
        { title: "Draft", line: "Two bedrooms, a terrace and morning light in Estepona." },
        { title: "Approval", line: "Approved by you · Wednesday 12:10" },
        { title: "Published", line: "Published on your account · Thursday 09:00" },
        { title: "Comment", line: "A public comment, an allowed reply, a contact in a record" },
      ],
    },
    commentLabel: { es: "Comentario público", en: "Public comment" },
    comment: "¿Sigue disponible? Me interesa.",
    commenter: "Marta G.",
    replyLabel: { es: "Respuesta de tu agencia · permitida por ti", en: "Your agency's reply · allowed by you" },
    reply: "Gracias por preguntar, Marta. Te escribimos por privado con los detalles.",
    noAvailability: { es: "La respuesta no afirma disponibilidad.", en: "The reply claims no availability." },
    noAds: { es: "No se crea ninguna campaña ni se gasta nada: solo lo que ya publicas.", en: "No campaign is created and nothing is spent: only what you already publish." },
  },
};
