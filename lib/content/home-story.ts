import type { Locale } from "@/lib/i18n/config";

/**
 * The home page story (master order 2026-10-10 §3; final order 2026-10-12; R19 closing order 2026-10-19 §2, §6, §9):
 * one example enquiry, carried through six chapters that read in the normal scroll. Roles, names, properties and
 * the clock agree everywhere:
 *
 *   Tuesday 11:00–12:00  Marcos (agent) shows the villa EST-118 in Marbella; nobody is at the desk.
 *   Tuesday 11:20        Laura Serrano (buyer, Madrid) writes on WhatsApp about the flat EST-204: a question and her budget.
 *   Tuesday 11:21        Nuova answers from the listing's own data, asks one question, saves what she wants, updates her
 *                        record and alerts the team: an important enquiry (a property, an area and a budget named).
 *   Tuesday 11:23        Laura answers: to live all year; she would like to see it next week.
 *   Tuesday 11:24        Peter and Anna Keller (sellers, Elviria) write by email in German for a valuation: the reply is
 *                        held as a draft for a person (the AI notice is approved in Spanish only).
 *   Tuesday 11:31        Sofía Lamas (tenant) sends the web form in Spanish, long-term rental in Fuengirola.
 *   Tuesday 11:37        Álvaro Pons (buyer) calls about the price of EST-118.
 *   Wednesday 08:30      the morning assistant tells Elena what comes first and why; she proposes Thursday 10:00 to Laura.
 *   Wednesday 17:30      A new listing EST-240 fits Laura; an allowed follow-up goes out by email.
 *   The week             The weekly overview counts what was handled; the details are in the login.
 *
 * Texts: WORKING by the implementer; the R19 changes are listed for Copy in WEBSITE_R19_RETURN_v1.md §6. Nothing shown
 * is a real person, a real listing or a real agency. The product states behind each chapter stand in
 * ACCEPTANCE_LIST_1010.md and, in a line, under every chapter.
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
  buyer: { name: "Laura Serrano", short: "Laura", city: "Madrid" },
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
  /** What the picture shows, said on the card (R19 §9: a room, the outside or the plan, never "the sea" four times). */
  photoKind: L;
}
export const listings: Record<"est204" | "est231" | "est118" | "est240", Listing> = {
  est204: {
    ref: REFERENCE,
    title: { es: "Piso de 2 dormitorios con terraza", en: "Two bedroom flat with terrace" },
    place: { es: "Estepona · zona puerto", en: "Estepona · marina area" },
    facts: { es: "2 dorm. · 2 baños · 78 m² · terraza 14 m² al sur · garaje", en: "2 bed · 2 bath · 78 m² · 14 m² south-facing terrace · garage" },
    price: "315.000 €",
    photo: "/media/world/listing-est204.webp",
    photoAlt: { es: "Salón abierto a una terraza", en: "Living room opening onto a terrace" },
    photoKind: { es: "Salón", en: "Living room" },
  },
  est231: {
    ref: REFERENCE_2,
    title: { es: "Ático de 2 dormitorios con vistas", en: "Two bedroom penthouse with views" },
    place: { es: "Estepona · Seghers", en: "Estepona · Seghers" },
    facts: { es: "2 dorm. · 2 baños · 71 m² · terraza 22 m²", en: "2 bed · 2 bath · 71 m² · 22 m² terrace" },
    price: "319.000 €",
    photo: "/media/world/listing-est231.webp",
    photoAlt: { es: "Edificio blanco con balcones y un ático arriba", en: "White building with balconies and a penthouse on top" },
    photoKind: { es: "Exterior", en: "Outside" },
  },
  est118: {
    ref: REFERENCE_VIEWING,
    title: { es: "Villa con piscina y vistas al mar", en: "Villa with pool and sea views" },
    place: { es: "Marbella · Elviria", en: "Marbella · Elviria" },
    facts: { es: "4 dorm. · 3 baños · 240 m² · parcela 900 m²", en: "4 bed · 3 bath · 240 m² · 900 m² plot" },
    price: "1.150.000 €",
    photo: "/media/world/listing-est118.webp",
    photoAlt: { es: "Villa blanca con piscina y terraza de piedra", en: "White villa with a pool and a stone terrace" },
    photoKind: { es: "Exterior", en: "Outside" },
  },
  est240: {
    ref: REFERENCE_NEW,
    title: { es: "Piso de 2 dormitorios, primera línea", en: "Two bedroom flat, seafront" },
    place: { es: "Estepona · paseo marítimo", en: "Estepona · seafront promenade" },
    facts: { es: "2 dorm. · 1 baño · 74 m² · terraza 12 m²", en: "2 bed · 1 bath · 74 m² · 12 m² terrace" },
    price: "318.000 €",
    photo: "/media/world/listing-est240.webp",
    photoAlt: { es: "Salón de un piso reformado con balcón", en: "Living room of a renovated flat with a balcony" },
    photoKind: { es: "Salón", en: "Living room" },
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
 * the same in Spanish and English (shown by default, the original one tap away). `held` marks the case where Nuova
 * prepares a draft and sends nothing: the notice is approved in Spanish only, so a German email waits for a person.
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
  /** Nuova's reply (or the draft) in the customer's language; phone: what the assistant noted. */
  reply: string;
  translation: { text: L; reply: L };
  /** The reply is a draft held for a person, not a sent message. */
  held?: boolean;
  notice: string;
  noticeIsSample: boolean;
  recorded: { k: L; v: L }[];
  /** The result of this enquiry, in one line: what stands afterwards. */
  next: L;
}

export const enquiries: Enquiry[] = [
  {
    channel: "whatsapp",
    who: people.buyer.name,
    role: { es: "Compradora · escribe desde Madrid", en: "Buyer · writing from Madrid" },
    time: { es: "martes 11:23", en: "Tuesday 11:23" },
    language: { es: "español", en: "Spanish" },
    lang: "es",
    // Laura's second message: she answers Nuova's one question and says what she wants next.
    text: "Para vivir todo el año. Nos gustaría verlo la semana que viene, si puede ser.",
    textShort: { es: "Laura contesta: lo busca para vivir todo el año y quiere ver el piso la semana que viene.", en: "Laura answers: she is looking for a home for all year round and would like to see the flat next week." },
    reply: "Perfecto, lo anoto: para vivir todo el año, y visita la semana que viene. Una persona de la agencia te propone día y hora.",
    translation: {
      text: { es: "Para vivir todo el año. Nos gustaría verlo la semana que viene, si puede ser.", en: "To live there all year round. We'd like to see it next week, if possible." },
      reply: { es: "Perfecto, lo anoto: para vivir todo el año, y visita la semana que viene. Una persona de la agencia te propone día y hora.", en: "Perfect, noted: a home for all year round, and a viewing next week. A colleague from the agency will propose a day and time." },
    },
    notice: "Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "2 dormitorios con terraza, Estepona", en: "2 bedrooms with a terrace, Estepona" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 320.000 €", en: "up to €320,000" } },
      { k: { es: "Uso", en: "Use" }, v: { es: "vivir todo el año", en: "to live all year round" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "quiere visitar la semana que viene", en: "wants to view next week" } },
    ],
    next: { es: "Resultado: la ficha está al día y la visita es una tarea con fecha para tu equipo.", en: "Result: the record is up to date and the viewing is a dated task for your team." },
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
    // R19 §9: a personal address, not "Señores Keller". The reply is a draft: nothing goes out in German today.
    reply: "Hallo Anna, hallo Peter, vielen Dank für Ihre Nachricht. Für die Bewertung Ihrer Villa in Elviria meldet sich ein Kollege unserer Agentur bei Ihnen und schlägt einen Termin vor Ort vor.",
    translation: {
      text: { es: "Buenos días, queremos vender nuestra villa en Elviria (Marbella) y pedimos una valoración. ¿Cuándo sería posible una visita?", en: "Good morning, we would like to sell our villa in Elviria (Marbella) and ask for a valuation. When would a visit be possible?" },
      reply: { es: "Hola Anna, hola Peter, gracias por vuestro mensaje. Para la valoración de vuestra villa en Elviria, una persona de nuestra agencia os escribe y os propone una visita.", en: "Hi Anna, hi Peter, thank you for your message. For the valuation of your villa in Elviria a colleague from our agency will write to you and propose a visit." },
    },
    held: true,
    notice: "Ich bin ein KI-Assistent und helfe Ihnen bei Ihrer Immobilienanfrage. Wenn Sie lieber mit einer Person sprechen möchten, sagen Sie es mir jederzeit.",
    noticeIsSample: true,
    recorded: [
      { k: { es: "Piden", en: "Ask for" }, v: { es: "valoración de una villa", en: "a villa valuation" } },
      { k: { es: "Zona", en: "Area" }, v: { es: "Marbella · Elviria", en: "Marbella · Elviria" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "visita de valoración esta semana", en: "valuation visit this week" } },
      { k: { es: "Escriben en", en: "Write in" }, v: { es: "alemán", en: "German" } },
    ],
    next: { es: "Resultado: la ficha está abierta y el borrador espera a una persona que lo revise y lo envíe.", en: "Result: the record is open and the draft waits for a person to review and send it." },
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
    reply: "Hola Sofía, gracias por escribirnos. Anoto dos dormitorios en Fuengirola, hasta 1.200 € al mes y desde enero. Una persona de la agencia te envía lo que tenemos en larga temporada. ¿Prefieres que te contestemos por email o por WhatsApp?",
    translation: {
      text: { es: "Busco un piso de dos dormitorios en Fuengirola para alquiler de larga temporada, hasta 1.200 € al mes, a partir de enero. ¿Tenéis algo?", en: "I'm looking for a two-bedroom flat in Fuengirola for a long-term rental, up to €1,200 a month, from January. Do you have anything?" },
      reply: { es: "Hola Sofía, gracias por escribirnos. Anoto dos dormitorios en Fuengirola, hasta 1.200 € al mes y desde enero. Una persona de la agencia te envía lo que tenemos en larga temporada. ¿Prefieres que te contestemos por email o por WhatsApp?", en: "Hi Sofía, thank you for writing. Noted: two bedrooms in Fuengirola, up to €1,200 a month, from January. A colleague from the agency will send you what we have for long-term rental. Would you rather hear back by email or on WhatsApp?" },
    },
    notice: "🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "alquiler, 2 dormitorios, Fuengirola", en: "rental, 2 bedrooms, Fuengirola" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 1.200 € al mes", en: "up to €1,200 a month" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "a partir de enero", en: "from January" } },
      { k: { es: "Escribe en", en: "Writes in" }, v: { es: "español", en: "Spanish" } },
    ],
    next: { es: "Resultado: Sofía tiene respuesta y ficha; enviar lo disponible es una tarea para tu equipo.", en: "Result: Sofía has a reply and a record; sending what is available is a task for your team." },
  },
  {
    channel: "phone",
    who: people.caller.name,
    role: { es: "Comprador · llama por una villa", en: "Buyer · calling about a villa" },
    time: { es: "martes 11:37", en: "Tuesday 11:37" },
    language: { es: "español", en: "Spanish" },
    lang: "es",
    text: "Llamo por la villa de Elviria. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.",
    textShort: { es: "Álvaro llama por la villa de Elviria y pide que le devuelvan la llamada por la tarde.", en: "Álvaro calls about the villa in Elviria and asks for a call back in the afternoon." },
    reply: "El asistente anota el motivo de la llamada, el inmueble y el horario que prefiere. No da precio ni negocia: una persona de la agencia le devuelve la llamada por la tarde.",
    translation: {
      text: { es: "Llamo por la villa de Elviria. Quería saber el precio y si hay margen. Me viene mejor que me llamen por la tarde.", en: "I'm calling about the villa in Elviria. I'd like to know the price and whether there is room to negotiate. The afternoon suits me better for a call back." },
      reply: { es: "El asistente anota el motivo de la llamada, el inmueble y el horario que prefiere. No da precio ni negocia: una persona de la agencia le devuelve la llamada por la tarde.", en: "The assistant notes the reason for the call, the property and the preferred time. It gives no price and does not negotiate: a colleague from the agency calls back in the afternoon." },
    },
    notice: "Al descolgar, el asistente dice que es un asistente de inteligencia artificial y que se puede pedir hablar con una persona.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Pregunta por", en: "Asks about" }, v: { es: "la villa de Elviria · precio y margen", en: "the villa in Elviria · price and room to negotiate" } },
      { k: { es: "Prefiere", en: "Prefers" }, v: { es: "llamada por la tarde", en: "a call in the afternoon" } },
      { k: { es: "Teléfono", en: "Phone" }, v: { es: people.caller.phone, en: people.caller.phone } },
      { k: { es: "Habla en", en: "Speaks" }, v: { es: "español", en: "Spanish" } },
    ],
    next: { es: "Resultado: la llamada deja una nota y una tarea de rellamada; la llamada la hace una persona.", en: "Result: the call leaves a note and a callback task; the call back is made by a person." },
  },
];

/** The first screen (R19 §2): one short product case, the work Nuova did, no appointment as the main case. */
export const heroWords = {
  h1Soft: { es: "Mientras enseñas una vivienda,", en: "While you show a home," },
  h1: { es: "Nuova atiende tus consultas.", en: "Nuova answers your enquiries." },
  lead: { es: "Responde a lo que llega por WhatsApp y email con los datos de tu cartera, guarda lo que busca cada cliente y avisa a tu equipo cuando una consulta importa.", en: "Answers what arrives on WhatsApp and email with your portfolio's data, keeps what each customer is looking for and alerts your team when an enquiry matters." },
  ctaStory: { es: "Ver cómo funciona", en: "See how it works" },
  trialLine: { es: "14 días gratis · Sin tarjeta", en: "14 days free · No card" },
  labels: { enquiry: { es: "Llega por WhatsApp", en: "Arrives on WhatsApp" }, reply: { es: "Nuova responde", en: "Nuova replies" }, done: { es: "Lo que ya está hecho", en: "What is already done" } },
  replay: { es: "Reproducir otra vez", en: "Play again" },
  /** The hero's exchange: the question, the answer from the listing's data, one question back. Laura writes in Spanish. */
  heroEnquiry: "Hola, he visto el piso de dos dormitorios con terraza en Estepona. ¿La terraza da al sur y tiene garaje? Buscamos hasta 320.000 €.",
  heroEnquiryTranslated: { es: "Hola, he visto el piso de dos dormitorios con terraza en Estepona. ¿La terraza da al sur y tiene garaje? Buscamos hasta 320.000 €.", en: "Hi, I've seen the two-bedroom flat with a terrace in Estepona. Is the terrace south-facing, and is there a garage? We're looking up to €320,000." },
  heroReply: "Hola Laura, gracias por escribir. Sí: la terraza da al sur y el piso tiene plaza de garaje. Te paso la ficha con fotos y plano. ¿Lo buscáis para vivir todo el año o como segunda residencia?",
  heroReplyTranslated: { es: "Hola Laura, gracias por escribir. Sí: la terraza da al sur y el piso tiene plaza de garaje. Te paso la ficha con fotos y plano. ¿Lo buscáis para vivir todo el año o como segunda residencia?", en: "Hi Laura, thanks for writing. Yes: the terrace faces south and the flat has a garage space. Here is the listing with photos and the plan. Are you looking for a home for all year round or a second home?" },
  heroWho: { es: "Laura Serrano · compradora", en: "Laura Serrano · buyer" },
  heroTime: { es: "martes 11:20", en: "Tuesday 11:20" },
  heroReplyTime: { es: "martes 11:21", en: "Tuesday 11:21" },
  /** The results of the processing (R19 §2): few, visible, each one true to the released function. */
  results: {
    es: [
      { k: "Lo que busca, guardado", v: "2 dormitorios con terraza · Estepona · hasta 320.000 €" },
      { k: "Ficha de cliente actualizada", v: "Laura Serrano · WhatsApp · martes 11:21" },
      { k: "Aviso a tu equipo", v: "Consulta importante: inmueble, zona y presupuesto concretos" },
    ],
    en: [
      { k: "What she wants, saved", v: "2 bedrooms with a terrace · Estepona · up to €320,000" },
      { k: "Customer record updated", v: "Laura Serrano · WhatsApp · Tuesday 11:21" },
      { k: "Alert to your team", v: "Important enquiry: a property, an area and a budget named" },
    ],
  },
  /** The situation, as one line inside the panel. */
  situationLine: { es: "Martes 11:20 · Marcos está en una visita hasta las 12:00 · Nuova atiende lo que llega", en: "Tuesday 11:20 · Marcos is at a viewing until 12:00 · Nuova handles what arrives" },
  /** The limit, with the claim (R19 §7): what runs today, said inside the product. Copy checks the wording (C1). */
  stateToday: { es: "Hoy: WhatsApp y email, respuestas en español. En otro idioma no se envía nada automáticamente.", en: "Today: WhatsApp and email, replies in Spanish. In another language nothing is sent automatically." },
  surfaceLabel: { es: "Ejemplo: una consulta por WhatsApp, la respuesta con los datos del inmueble, lo que queda guardado y el aviso al equipo", en: "Example: a WhatsApp enquiry, the reply with the listing's data, what is saved and the alert to the team" },
};

/**
 * The chapters (R19 §6): a short benefit headline, one paragraph, the three answers every chapter gives (what came
 * in, what Nuova did, the result) and the state line.
 */
export interface Chapter {
  key: ChapterKey;
  eyebrow: L;
  title: L;
  line: L;
  inbound: L;
  did: L;
  result: L;
  state: L;
}

export const chapters: Chapter[] = [
  {
    key: "situation",
    eyebrow: { es: "Llegan consultas", en: "Enquiries arrive" },
    title: { es: "Cuatro consultas en una hora, mientras estás con un cliente.", en: "Four enquiries in one hour, while you are with a customer." },
    line: { es: "Marcos enseña la villa de Elviria de 11:00 a 12:00. En ese rato escriben una compradora por WhatsApp, unos propietarios por email, una inquilina por el formulario web y llama un comprador.", en: "Marcos is showing the villa in Elviria from 11:00 to 12:00. In that hour a buyer writes on WhatsApp, two owners by email, a tenant through the web form, and a buyer calls." },
    inbound: { es: "Cuatro consultas por cuatro canales, con nadie en la oficina.", en: "Four enquiries on four channels, with nobody at the desk." },
    did: { es: "Las atiende por el canal por el que llegaron y abre una ficha por cliente.", en: "Handles each on the channel it arrived on and opens a record per customer." },
    result: { es: "Cuando Marcos termina, las cuatro tienen respuesta o borrador, y ficha.", en: "When Marcos finishes, all four have a reply or a draft, and a record." },
    state: { es: "Disponible hoy: WhatsApp y email. Prototipo: el formulario web y la llamada.", en: "Available today: WhatsApp and email. Prototype: the web form and the phone call." },
  },
  {
    key: "reply",
    eyebrow: { es: "Nuova responde y actualiza la ficha", en: "Nuova answers and updates the record" },
    title: { es: "Cada cliente recibe una respuesta concreta, y lo que pide queda en su ficha.", en: "Every customer gets a concrete reply, and what they ask for goes on their record." },
    line: { es: "Zona, presupuesto, uso y plazo quedan claros desde la primera respuesta. Nada se compromete: ni precio, ni fecha, ni disponibilidad. Si el cliente escribe más tarde por otro canal, con su código queda en la misma ficha.", en: "Area, budget, use and timing are clear from the first reply. Nothing is committed: no price, no date, no availability. If the customer writes later on another channel, their code keeps them on the same record." },
    inbound: { es: "Una pregunta por WhatsApp, un email en alemán, un formulario, una llamada.", en: "A WhatsApp question, a German email, a web form, a call." },
    did: { es: "Responde con los datos de tu cartera o prepara el borrador, y guarda lo que pide cada cliente.", en: "Replies with your portfolio's data or prepares the draft, and keeps what each customer asks for." },
    result: { es: "Una ficha al día por cliente y, donde hace falta, una tarea con fecha.", en: "An up-to-date record per customer and, where needed, a dated task." },
    state: { es: "Disponible hoy: respuestas en español por WhatsApp y email, y la ficha. En otro idioma no se envía nada automáticamente; el borrador y la tarea están en pruebas. El código de cliente entre canales está implementado y pendiente de aceptación.", en: "Available today: replies in Spanish on WhatsApp and email, and the record. In another language nothing is sent automatically; the draft and the task are in testing. The customer code across channels is implemented and awaiting acceptance." },
  },
  {
    key: "match",
    eyebrow: { es: "El inmueble que encaja", en: "The property that fits" },
    title: { es: "De lo que busca Laura salen dos propuestas de tu cartera.", en: "What Laura is looking for becomes two proposals from your portfolio." },
    line: { es: "Dos dormitorios en Estepona, terraza, hasta 320.000 €, para vivir todo el año. Solo inmuebles tuyos, con tus fotos y tus datos, y solo lo que tu fuente marca como publicable y actual.", en: "Two bedrooms in Estepona, a terrace, up to €320,000, to live all year round. Only your own listings, with your photos and your data, and only what your source marks as publishable and current." },
    inbound: { es: "Lo que Laura dejó claro en dos mensajes.", en: "What Laura made clear in two messages." },
    did: { es: "Compara con tu cartera y prepara una propuesta con dos inmuebles.", en: "Compares it with your portfolio and prepares a proposal with two listings." },
    result: { es: "Laura tiene dos fichas concretas; la visita sigue siendo una tarea de tu equipo.", en: "Laura has two concrete listings; the viewing is still your team's task." },
    state: { es: "Implementado; todavía sin activar para ninguna agencia.", en: "Implemented; not yet switched on for any agency." },
  },
  {
    key: "task",
    eyebrow: { es: "El aviso y la mañana siguiente", en: "The alert and the next morning" },
    title: { es: "Cuando una consulta importa, tu equipo lo sabe al momento. A la mañana siguiente sabe qué va primero y por qué.", en: "When an enquiry matters, your team knows at once. The next morning it knows what comes first and why." },
    line: { es: "El aviso llega por email a la persona que toca, con el motivo. El asistente de la mañana ordena el día: la consulta importante, por qué, y el siguiente paso. Elena la toma, propone la hora a Laura y la cierra: tres pasos, cada uno visible.", en: "The alert reaches the right person by email, with the reason. The morning assistant orders the day: the important enquiry, why, and the next step. Elena takes it, proposes the time to Laura and closes it: three steps, each one visible." },
    inbound: { es: "La consulta de Laura, con inmueble, zona y presupuesto concretos.", en: "Laura's enquiry, with a property, an area and a budget named." },
    did: { es: "Avisa a Elena al momento y, a la mañana siguiente, le dice qué va primero y por qué.", en: "Alerts Elena at once and, the next morning, tells her what comes first and why." },
    result: { es: "Elena propone el jueves a las 10:00; Laura acepta; queda en la ficha.", en: "Elena proposes Thursday at 10:00; Laura accepts; it goes on the record." },
    state: { es: "Disponible hoy: el aviso por email y la tarea (tomar, cerrar). En pruebas: el asistente que explica el orden.", en: "Available today: the alert by email and the task (take, close). In testing: the assistant that explains the order." },
  },
  {
    key: "followup",
    eyebrow: { es: "Un seguimiento con sentido", en: "A follow-up that makes sense" },
    title: { es: "Entra un piso que encaja con Laura. Ella recibe un mensaje útil antes de su visita.", en: "A flat comes in that fits Laura. She gets a useful message before her viewing." },
    line: { es: "Un inmueble nuevo no basta por sí solo. El seguimiento sale solo si Laura aceptó recibir propuestas y tú activaste los seguimientos. El mensaje es concreto: el piso, los datos y una sola acción.", en: "A new listing is not enough on its own. The follow-up goes out only if Laura agreed to receive proposals and you switched follow-ups on. The message is concrete: the flat, the facts and one action." },
    inbound: { es: "Un inmueble nuevo en tu cartera que encaja con lo que busca Laura.", en: "A new listing in your portfolio that fits what Laura is looking for." },
    did: { es: "Comprueba las tres condiciones y envía un email con el piso y una sola acción.", en: "Checks the three conditions and sends an email with the flat and one action." },
    result: { es: "Si Laura responde, su petición llega a Elena; una petición no es una cita.", en: "If Laura answers, her request reaches Elena; a request is not an appointment." },
    state: { es: "Prototipo · todavía no disponible.", en: "Prototype · not available yet." },
  },
  {
    key: "result",
    eyebrow: { es: "La semana, en cifras", en: "The week, in figures" },
    title: { es: "Al final de la semana sabes qué atendió Nuova, qué oportunidades hay y qué toca hacer.", en: "At the end of the week you know what Nuova handled, which opportunities there are and what to do next." },
    line: { es: "Un resumen corto llega el lunes por email. El informe completo, con el periodo, la base de datos y las acciones pendientes, está en tu acceso de agencia. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide.", en: "A short summary arrives on Monday by email. The full report, with the period, the data behind it and the open actions, is in your agency login. Answered is not delivered: what reaches the customer is not measured yet." },
    inbound: { es: "Todo lo registrado en la semana en los canales conectados.", en: "Everything recorded in the week on the connected channels." },
    did: { es: "Cuenta lo atendido, las oportunidades y lo que espera a una persona.", en: "Counts what was handled, the opportunities and what waits for a person." },
    result: { es: "Tres cifras el lunes y el informe completo en tu acceso.", en: "Three figures on Monday and the full report in your login." },
    state: { es: "El informe en el acceso está disponible; el email del lunes se ha enviado una vez y aún no es un envío regular.", en: "The report in the login is available; Monday's email has been sent once and is not a regular send yet." },
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
    inbound: { es: "Qué llega", en: "What comes in" },
    did: { es: "Qué hace Nuova", en: "What Nuova does" },
    result: { es: "Resultado", en: "Result" },
  },
  situation: {
    now: { es: "Martes · 11:20", en: "Tuesday · 11:20" },
    viewing: { es: "Visita en curso", en: "Viewing in progress" },
    viewingWho: { es: "Marcos · 11:00 a 12:00", en: "Marcos · 11:00 to 12:00" },
    desk: { es: "Nadie en la oficina", en: "Nobody at the desk" },
    arriving: { es: "Mientras tanto, llega", en: "Meanwhile, arriving" },
    answered: { es: "Respondida", en: "Replied" },
    drafted: { es: "Borrador", en: "Draft" },
    noted: { es: "Anotada", en: "Noted" },
    after: { es: "Cuando Marcos termina la visita, las cuatro consultas tienen ficha: tres con respuesta, una con borrador.", en: "When Marcos finishes the viewing, all four enquiries have a record: three with a reply, one with a draft." },
  },
  reply: {
    pick: { es: "Elige el canal", en: "Pick the channel" },
    incoming: { es: "Lo que escribe el cliente", en: "What the customer writes" },
    incomingPhone: { es: "Lo que dice al llamar", en: "What they say on the call" },
    replied: { es: "Lo que responde Nuova", en: "What Nuova replies" },
    repliedPhone: { es: "Lo que hace el asistente", en: "What the assistant does" },
    noted: { es: "Ficha actualizada", en: "Record updated" },
    notedAt: { es: "martes 11:23", en: "Tuesday 11:23" },
    continuity: { es: "Si Laura escribe después por email, su código de cliente la deja en esta misma ficha.", en: "If Laura writes later by email, her customer code keeps her on this same record." },
    formTitle: { es: "Formulario de tu web", en: "Your website's form" },
    formReply: { es: "Respuesta por email", en: "Reply by email" },
    emailSubject: { es: "Asunto", en: "Subject" },
    emailSubjectKeller: "Re: Bewertung unserer Villa in Elviria",
    emailSubjectKellerTranslated: { es: "Re: Valoración de nuestra villa en Elviria", en: "Re: Valuation of our villa in Elviria" },
    /** The held reply (R19 §2, §7): a draft is a draft, never shown as sent. */
    heldTitle: { es: "Borrador preparado · no enviado", en: "Draft prepared · not sent" },
    heldLine: { es: "El aviso de IA solo está aprobado en español, así que Nuova no envía nada en alemán: deja el borrador y una tarea para una persona.", en: "The AI notice is approved in Spanish only, so Nuova sends nothing in German: it leaves the draft and a task for a person." },
    earlier: { es: "Antes, a las 11:20: la pregunta de Laura y la respuesta con los datos del piso (la del primer bloque de la página).", en: "Earlier, at 11:20: Laura's question and the reply with the flat's data (the one in the first block of the page)." },
    callIncoming: { es: "Llamada entrante", en: "Incoming call" },
    callAnswered: { es: "Atendida por el asistente · en español", en: "Answered by the assistant · in Spanish" },
    phoneCaveat: { es: "Una llamada atendida deja una nota y una tarea. No confirma citas ni da precios.", en: "An answered call leaves a note and a task. It confirms no appointments and gives no prices." },
    languages: { es: "La web está en español o inglés. Cada ejemplo se muestra traducido; el original está a un toque.", en: "The website is in Spanish or English. Each example is shown translated; the original is one tap away." },
  },
  match: {
    wants: { es: "Lo que busca Laura", en: "What Laura wants" },
    criteria: { es: ["Estepona", "2 dormitorios", "Terraza", "Hasta 320.000 €", "Para vivir"], en: ["Estepona", "2 bedrooms", "Terrace", "Up to €320,000", "To live in"] },
    fits: { es: "Dos inmuebles de tu cartera encajan", en: "Two listings from your portfolio fit" },
    yours: { es: "Tu cartera", en: "Your portfolio" },
    rights: { es: "Se muestra solo lo que tu fuente marca como publicable y actual. Sin disponibilidad confirmada no se afirma disponibilidad.", en: "Only what your source marks as publishable and current is shown. Without confirmed availability, no availability is claimed." },
    sent: { es: "Propuesta enviada a Laura por WhatsApp · martes 11:25", en: "Proposal sent to Laura on WhatsApp · Tuesday 11:25" },
    proposal: "Laura, dos pisos de la cartera encajan con lo que describes: el de la terraza al sur, por 315.000 €, y un ático con terraza de 22 m² en Seghers, por 319.000 €. Te paso las dos fichas.",
    proposalTranslated: { es: "Laura, dos pisos de la cartera encajan con lo que describes: el de la terraza al sur, por 315.000 €, y un ático con terraza de 22 m² en Seghers, por 319.000 €. Te paso las dos fichas.", en: "Laura, two flats from the portfolio fit what you describe: the one with the south-facing terrace at €315,000, and a penthouse with a 22 m² terrace in Seghers at €319,000. Here are both listings." },
    details: { es: "Ver ficha", en: "See details" },
  },
  task: {
    /** The alert (Gate §18: the hot-lead mail to the right person is proven end to end in production). */
    alert: {
      label: { es: "Aviso por email · martes 11:21", en: "Alert by email · Tuesday 11:21" },
      to: { es: "Para Elena Ruiz", en: "To Elena Ruiz" },
      subject: { es: "Consulta importante: Laura Serrano · piso de Estepona", en: "Important enquiry: Laura Serrano · flat in Estepona" },
      why: { es: "Motivo: nombró inmueble, zona y presupuesto (hasta 320.000 €).", en: "Reason: she named a property, an area and a budget (up to €320,000)." },
      open: { es: "Abrir la ficha", en: "Open the record" },
    },
    greeting: { es: "Buenos días, Elena.", en: "Good morning, Elena." },
    greetingLine: { es: "Desde ayer han llegado cuatro consultas. Esta es la que más importa hoy, y por qué.", en: "Four enquiries came in since yesterday. This is the one that matters most today, and why." },
    morning: { es: "Miércoles · 08:30 · el asistente de la mañana para Elena", en: "Wednesday · 08:30 · the morning assistant for Elena" },
    important: { es: "Consulta importante", en: "Important enquiry" },
    importantWhy: { es: "inmueble, zona y presupuesto concretos", en: "a property, an area and a budget named" },
    why: { es: "Por qué", en: "Why" },
    nextStep: { es: "Siguiente paso", en: "Next step" },
    items: {
      es: [
        { who: "Laura Serrano", what: "Quiere ver el piso de Estepona la semana que viene · para vivir todo el año", why: "Nombró inmueble, zona y presupuesto", next: "Proponerle día y hora por WhatsApp" },
        { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria · borrador en alemán pendiente", why: "Propietarios que quieren vender; piden cita esta semana", next: "Revisar el borrador, enviarlo y proponer la visita" },
        { who: "Álvaro Pons", what: "Rellamada por la villa de Elviria · precio y margen", why: "Pidió que le llamen por la tarde (+34 600 123 456)", next: "Llamar a partir de las 16:00" },
        { who: "Sofía Lamas", what: "Alquiler de larga temporada en Fuengirola", why: "Sin fecha; a partir de enero", next: "Enviar lo disponible en alquiler" },
      ],
      en: [
        { who: "Laura Serrano", what: "Wants to see the flat in Estepona next week · to live all year round", why: "She named a property, an area and a budget", next: "Propose a day and time on WhatsApp" },
        { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria · German draft pending", why: "Owners who want to sell; they ask for an appointment this week", next: "Review the draft, send it and propose the visit" },
        { who: "Álvaro Pons", what: "Callback about the villa in Elviria · price and room to negotiate", why: "He asked to be called in the afternoon (+34 600 123 456)", next: "Call from 16:00" },
        { who: "Sofía Lamas", what: "Long-term rental in Fuengirola", why: "No date; from January", next: "Send what is available to rent" },
      ],
    },
    take: { es: "Tomar", en: "Take" },
    taken: { es: "Tomada por Elena", en: "Taken by Elena" },
    confirm: { es: "Proponer la hora a Laura", en: "Propose the time to Laura" },
    confirmed: { es: "Hora propuesta a Laura · miércoles 08:58", en: "Time proposed to Laura · Wednesday 08:58" },
    complete: { es: "Marcar como hecha", en: "Mark as done" },
    done: { es: "Hecha · miércoles 09:02 · Elena", en: "Done · Wednesday 09:02 · Elena" },
    doneLine: { es: "Laura acepta: jueves a las 10:00. Queda en la ficha y en la lista de Elena.", en: "Laura accepts: Thursday at 10:00. It is on the record and on Elena's list." },
    open: { es: "Abierta · nadie la ha tomado", en: "Open · nobody has taken it" },
    again: { es: "Volver a empezar", en: "Start again" },
    othersSee: { es: "Los demás ven que está tomada y por quién.", en: "The others see that it is taken and by whom." },
    chatConfirm: "Hola Laura, soy Elena, de la agencia. ¿Te vendría bien ver el piso de Estepona el jueves a las 10:00? Te mando la dirección y mi número.",
    chatConfirmTranslated: { es: "Hola Laura, soy Elena, de la agencia. ¿Te vendría bien ver el piso de Estepona el jueves a las 10:00? Te mando la dirección y mi número.", en: "Hi Laura, Elena from the agency here. Would Thursday at 10:00 suit you to see the flat in Estepona? I'll send you the address and my number." },
  },
  followup: {
    trigger: { es: "Miércoles · 17:30 · entra en tu cartera", en: "Wednesday · 17:30 · enters your portfolio" },
    matches: { es: "Encaja con lo que busca Laura", en: "Fits what Laura is looking for" },
    conditions: { es: "Condiciones para enviarlo", en: "Conditions for sending it" },
    conditionList: {
      es: ["Laura aceptó recibir propuestas (martes 11:25)", "Tienes los seguimientos activados", "El inmueble está marcado como publicable y actual"],
      en: ["Laura agreed to receive proposals (Tuesday 11:25)", "You have follow-ups switched on", "The listing is marked publishable and current"],
    },
    email: { es: "El email que recibe Laura", en: "The email Laura receives" },
    from: { es: "De: tu agencia", en: "From: your agency" },
    subject: "Un piso nuevo en Estepona que encaja con lo que buscas",
    subjectTranslated: { es: "Un piso nuevo en Estepona que encaja con lo que buscas", en: "A new flat in Estepona that fits what you're looking for" },
    body: "Hola Laura, antes de la visita del jueves: acaba de entrar un piso de dos dormitorios en primera línea en Estepona, dentro de tu presupuesto. Al lado, el ático de Seghers que ya tienes. Si quieres verlo el jueves también, basta un toque.",
    bodyTranslated: { es: "Hola Laura, antes de la visita del jueves: acaba de entrar un piso de dos dormitorios en primera línea en Estepona, dentro de tu presupuesto. Al lado, el ático de Seghers que ya tienes. Si quieres verlo el jueves también, basta un toque.", en: "Hi Laura, before Thursday's viewing: a two-bedroom flat on the seafront in Estepona has just come in, within your budget. Next to it, the penthouse in Seghers you already have. If you'd like to see it on Thursday as well, one tap is enough." },
    cta: { es: "Pedir ver este piso el jueves", en: "Ask to see this flat on Thursday" },
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
    handled: { title: { es: "Lo que atendió Nuova", en: "What Nuova handled" }, value: "23", line: { es: "consultas respondidas y registradas · WhatsApp 11 · email 7 · web 3 · teléfono 2 · la entrega al cliente no se mide", en: "enquiries answered and recorded · WhatsApp 11 · email 7 · web 3 · phone 2 · delivery to the customer is not measured" } },
    chances: { title: { es: "Oportunidades que han surgido", en: "Opportunities that came up" }, value: "6", line: { es: "visitas pedidas, 4 confirmadas por el equipo (la de Laura entre ellas) · 2 valoraciones pedidas · 4 propuestas enviadas", en: "viewings asked for, 4 confirmed by the team (Laura's among them) · 2 valuations asked for · 4 proposals sent" } },
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
  /** Social (R19 §8): listing → post with picture and text → approval → published → a prospect's question → the allowed reply, the next step. */
  social: {
    eyebrow: { es: "Captar desde lo que ya publicas", en: "Attract from what you already publish" },
    title: { es: "Una publicación de tu inmueble, aprobada por ti, y cada comentario en su ficha.", en: "A post of your listing, approved by you, and every comment in a record." },
    line: { es: "Nuova prepara el texto con la foto y los datos del inmueble, tú lo apruebas, se publica en tu cuenta. Un comentario público recibe una respuesta que tú permitiste y acaba como contacto nuevo en su ficha.", en: "Nuova prepares the text with the listing's photo and data, you approve it, it is published on your account. A public comment gets a reply you allowed and ends up as a new contact on a record." },
    inbound: { es: "Un inmueble de tu cartera con sus fotos y datos.", en: "A listing from your portfolio with its photos and data." },
    did: { es: "Prepara la publicación, espera tu aprobación, la publica y responde al comentario como tú permitiste.", en: "Prepares the post, waits for your approval, publishes it and answers the comment as you allowed." },
    result: { es: "Un contacto nuevo con el inmueble y su pregunta en la ficha. No es una consulta atendida: es una consulta nueva.", en: "A new contact with the listing and the question on a record. Not an enquiry handled: a new enquiry." },
    state: { es: "Prototipo · depende de la aprobación de la plataforma.", en: "Prototype · depends on the platform's approval." },
    post: {
      account: "@tu_agencia",
      caption: { es: "Dos dormitorios, terraza al sur y garaje en la zona del puerto de Estepona. 78 m², a dos calles del paseo. ¿Quieres verlo? Escríbenos.", en: "Two bedrooms, a south-facing terrace and a garage in Estepona's marina area. 78 m², two streets from the promenade. Want to see it? Write to us." },
      draftLabel: { es: "Borrador preparado por Nuova · miércoles 11:40", en: "Draft prepared by Nuova · Wednesday 11:40" },
      approved: { es: "Aprobada por ti · miércoles 12:10", en: "Approved by you · Wednesday 12:10" },
      published: { es: "Publicada en tu cuenta · jueves 09:00", en: "Published on your account · Thursday 09:00" },
      nextTitle: { es: "Siguiente paso", en: "Next step" },
      next: { es: "Marta queda en su ficha con el inmueble y su pregunta. Una persona del equipo le escribe por privado.", en: "Marta is on a record with the listing and her question. A person from the team writes to her privately." },
    },
    commentLabel: { es: "Comentario público", en: "Public comment" },
    comment: "¿Sigue disponible? Me interesa.",
    commenter: "Marta G.",
    replyLabel: { es: "Respuesta de tu agencia · permitida por ti", en: "Your agency's reply · allowed by you" },
    reply: "Gracias por preguntar, Marta. Te escribimos por privado con los detalles.",
    noAvailability: { es: "La respuesta no afirma disponibilidad.", en: "The reply claims no availability." },
    noAds: { es: "No se crea ninguna campaña ni se gasta nada: solo lo que ya publicas. Los comentarios y las cifras son de ejemplo.", en: "No campaign is created and nothing is spent: only what you already publish. The comments and the figures are examples." },
  },
};
