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
  caller: { name: "Álvaro Pons", short: "Álvaro", phone: "+34600123456" },
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
  /** What the enquiry is about, in a few words: with the name the main line of the arrivals (closing order 26.10. §3). */
  concern: L;
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
    concern: { es: "Pregunta por el piso con terraza de Estepona · hasta 320.000 €", en: "Asks about the flat with a terrace in Estepona · up to €320,000" },
    time: { es: "martes 11:23", en: "Tuesday 11:23" },
    language: { es: "español", en: "Spanish" },
    lang: "es",
    // Laura's second message: she answers Nuova's one question and says what she wants next.
    text: "Vivienda habitual. Nos gustaría verlo la semana que viene, si puede ser.",
    textShort: { es: "Laura contesta: vivienda habitual, y quiere ver el piso la semana que viene.", en: "Laura answers: a main home, and she would like to see the flat next week." },
    reply: "Perfecto, Laura, lo anoto. Una compañera de la agencia te escribe con día y hora para la visita.",
    translation: {
      text: { es: "Vivienda habitual. Nos gustaría verlo la semana que viene, si puede ser.", en: "A main home. We'd like to see it next week, if possible." },
      reply: { es: "Perfecto, Laura, lo anoto. Una compañera de la agencia te escribe con día y hora para la visita.", en: "Perfect, Laura, noted. A colleague from the agency will write to you with a day and time for the viewing." },
    },
    notice: "Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento.",
    noticeIsSample: false,
    recorded: [
      { k: { es: "Busca", en: "Looking for" }, v: { es: "2 dormitorios con terraza, Estepona", en: "2 bedrooms with a terrace, Estepona" } },
      { k: { es: "Presupuesto", en: "Budget" }, v: { es: "hasta 320.000 €", en: "up to €320,000" } },
      { k: { es: "Uso", en: "Use" }, v: { es: "vivienda habitual", en: "main home" } },
      { k: { es: "Plazo", en: "Timing" }, v: { es: "quiere visitar la semana que viene", en: "wants to view next week" } },
    ],
    next: { es: "Resultado: la ficha está al día y la visita es una tarea con fecha para tu equipo.", en: "Result: the record is up to date and the viewing is a dated task for your team." },
  },
  {
    channel: "email",
    who: people.sellers.name,
    role: { es: "Propietarios · quieren vender", en: "Owners · want to sell" },
    concern: { es: "Piden una valoración de su villa en Elviria", en: "Ask for a valuation of their villa in Elviria" },
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
    next: { es: "Resultado: la consulta está en la ficha, sin respuesta automática; la contesta una persona de tu equipo.", en: "Result: the enquiry is on the record, without an automatic reply; a person on your team answers it." },
  },
  {
    channel: "webform",
    who: people.tenant.name,
    role: { es: "Inquilina · alquiler de larga temporada", en: "Tenant · long-term rental" },
    concern: { es: "Busca un alquiler de larga temporada en Fuengirola", en: "Looking for a long-term rental in Fuengirola" },
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
    concern: { es: "Llama por el precio de la villa de Elviria", en: "Calls about the price of the villa in Elviria" },
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
  lead: { es: "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente y avisa por email a tu equipo cuando una consulta importa.", en: "Answers what arrives on WhatsApp and email, keeps what each customer is looking for and alerts your team by e-mail when an enquiry matters." }, // COPY_SYNC_1024 Q-1 fallback (no answer from API by the final build)
  ctaStory: { es: "Ver cómo funciona", en: "See how it works" },
  trialLine: { es: "14 días gratis · Sin método de pago", en: "14 days free · No payment method" },
  labels: { enquiry: { es: "Llega por WhatsApp", en: "Arrives on WhatsApp" }, reply: { es: "Nuova responde", en: "Nuova replies" }, done: { es: "Su ficha, ya al día", en: "Her record, already up to date" } },
  /**
   * R24 (owner 24.10.): the customer record instead of three general checks. Closing order 26.10. §6: name and role, what she
   * looks for, her budget, her language, the priority with its reason (the e-mail alert, proven end to end), the next step (a
   * person's). Nothing invented: no score, no cross-channel merge.
   */
  record: {
    title: { es: "Ficha de cliente", en: "Customer record" },
    who: { es: "Laura Serrano · compradora", en: "Laura Serrano · buyer" },
    updated: { es: "Actualizada · WhatsApp · martes 11:21", en: "Updated · WhatsApp · Tuesday 11:21" },
    fields: {
      es: [
        { k: "Busca", v: "2 dormitorios con terraza · Estepona" },
        { k: "Presupuesto", v: "hasta 320.000 €" },
        { k: "Escribe en", v: "español" },
      ],
      en: [
        { k: "Looking for", v: "2 bedrooms with a terrace · Estepona" },
        { k: "Budget", v: "up to €320,000" },
        { k: "Writes in", v: "Spanish" },
      ],
    },
    priority: { es: "Prioridad", en: "Priority" },
    alert: { es: "Consulta importante · aviso por email a tu equipo", en: "Important enquiry · e-mail alert to your team" }, // COPY_SYNC_1023 W-5
    alertWhy: { es: "Motivo: nombró inmueble, zona y presupuesto", en: "Reason: she named a property, an area and a budget" },
    nextLabel: { es: "Siguiente paso", en: "Next step" },
    next: { es: "una persona de tu equipo le confirma los datos del piso y le propone la visita", en: "a person on your team confirms the flat's details and proposes the viewing" },
  },
  replay: { es: "Reproducir otra vez", en: "Play again" },
  /**
   * The hero's exchange: the question, the reply, one question back. Laura writes in Spanish. Closing order 26.10. §7: the reply
   * confirms no listing fact and announces no file (replies with the listing's data are in preparation, Copy's Q-1 fallback); it
   * notes what she asks for, says who answers the facts, and asks one question back, the way the proven replies of story B do.
   * WORKING, for Copy.
   */
  heroEnquiry: "Hola, he visto el piso de dos dormitorios con terraza en Estepona. ¿La terraza da al sur? ¿Tiene garaje? Nuestro presupuesto llega hasta 320.000 €.",
  heroEnquiryTranslated: { es: "Hola, he visto el piso de dos dormitorios con terraza en Estepona. ¿La terraza da al sur? ¿Tiene garaje? Nuestro presupuesto llega hasta 320.000 €.", en: "Hi, I've seen the two-bedroom flat with a terrace in Estepona. Is the terrace south-facing? Is there a garage? Our budget goes up to €320,000." },
  heroReply: "¡Hola, Laura! Anoto dos dormitorios con terraza en Estepona y hasta 320.000 €. Una persona de la agencia te confirma lo de la terraza y el garaje. ¿Buscáis vivienda habitual o segunda residencia?",
  heroReplyTranslated: { es: "¡Hola, Laura! Anoto dos dormitorios con terraza en Estepona y hasta 320.000 €. Una persona de la agencia te confirma lo de la terraza y el garaje. ¿Buscáis vivienda habitual o segunda residencia?", en: "Hi Laura! Noted: two bedrooms with a terrace in Estepona, up to €320,000. A person from the agency will confirm the terrace and the garage. Are you looking for a main home or a second home?" },
  heroWho: { es: "Laura Serrano · compradora", en: "Laura Serrano · buyer" },
  heroTime: { es: "martes 11:20", en: "Tuesday 11:20" },
  heroReplyTime: { es: "martes 11:21", en: "Tuesday 11:21" },
  /** The situation, as one line inside the panel. */
  situationLine: { es: "Martes 11:20 · Marcos está en una visita hasta las 12:00 · Nuova atiende lo que llega", en: "Tuesday 11:20 · Marcos is at a viewing until 12:00 · Nuova handles what arrives" },
  /** The limit, with the claim (R19 §7): what runs today, said inside the product. Copy checks the wording (C1). */
  stateToday: { es: "Hoy respondemos en español. En otro idioma no se envía nada automáticamente. Respuestas con datos del inmueble: en preparación.", en: "Today we answer in Spanish. In another language nothing is sent automatically. Replies with the listing's data: in preparation." }, // WEBSITE_COPY_HANDOVER_1021 §E + COPY_SYNC_1024 Q-1 fallback
  surfaceLabel: { es: "Ejemplo: una consulta por WhatsApp, la respuesta, lo que queda guardado en la ficha, el aviso al equipo y el siguiente paso", en: "Example: a WhatsApp enquiry, the reply, what is saved on the record, the alert to the team and the next step" },
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
    did: { es: "Las atiende por el canal por el que llegaron y abre una ficha por consulta.", en: "Handles each on the channel it arrived on and opens a record per enquiry." }, // COPY_1019 R-11
    // Closing order 26.10. §3: the count matches the states shown (two written replies, one call answered by the assistant, the German
    // e-mail waiting for a person); "noted" is not a reply. WORKING, for Copy.
    result: { es: "Cuando Marcos termina, las cuatro tienen ficha: dos con respuesta escrita, una llamada atendida, y el email en alemán espera a una persona.", en: "When Marcos finishes, all four have a record: two with a written reply, one call answered, and the German e-mail waits for a person." },
    state: { es: "Disponible hoy: WhatsApp y email, en español. Prototipo: el formulario web y la llamada (el asistente telefónico, solo en español).", en: "Available today: WhatsApp and email, in Spanish. Prototype: the web form and the phone call (the phone assistant, Spanish only)." },
  },
  {
    key: "reply",
    eyebrow: { es: "Nuova responde y actualiza la ficha", en: "Nuova answers and updates the record" },
    title: { es: "El cliente recibe una respuesta concreta, y lo que pide queda en su ficha.", en: "The customer gets a concrete reply, and what they ask for goes on their record." }, // COPY_1019 R-4
    line: { es: "Zona, presupuesto, uso y plazo quedan claros desde la primera respuesta. Nada se compromete: ni precio, ni fecha, ni disponibilidad.", en: "Area, budget, use and timing are clear from the first reply. Nothing is committed: no price, no date, no availability." }, // COPY_1019 R-5: the customer-code sentence removed (not present in production)
    inbound: { es: "Una pregunta por WhatsApp, un email en alemán, un formulario, una llamada.", en: "A WhatsApp question, a German email, a web form, a call." },
    did: { es: "Responde en español y guarda lo que pide cada cliente; en otro idioma no envía nada.", en: "Replies in Spanish and keeps what each customer asks for; in another language it sends nothing." }, // COPY_SYNC_1023 W-9; COPY_SYNC_1024 Q-1 fallback
    result: { es: "Una ficha al día por consulta y, donde hace falta, una tarea con fecha.", en: "An up-to-date record per enquiry and, where needed, a dated task." }, // HANDOVER_1021 A-5
    state: { es: "Disponible hoy: respuestas en español por WhatsApp y email, y la ficha. En otro idioma no se envía nada automáticamente.", en: "Available today: replies in Spanish on WhatsApp and e-mail, and the record. In another language nothing is sent automatically." }, // HANDOVER_1021 A-3
  },
  {
    key: "match",
    eyebrow: { es: "El inmueble que encaja", en: "The property that fits" },
    title: { es: "De lo que busca Laura salen dos propuestas de tu cartera.", en: "What Laura is looking for becomes two proposals from your portfolio." },
    line: { es: "Dos dormitorios en Estepona, terraza, hasta 320.000 €, vivienda habitual. Solo inmuebles tuyos, con tus fotos y tus datos, y solo lo que tu fuente marca como publicable y actual.", en: "Two bedrooms in Estepona, a terrace, up to €320,000, to live all year round. Only your own listings, with your photos and your data, and only what your source marks as publishable and current." },
    inbound: { es: "Lo que Laura dejó claro en dos mensajes.", en: "What Laura made clear in two messages." },
    did: { es: "Compara con tu cartera y prepara una propuesta con dos inmuebles.", en: "Compares it with your portfolio and prepares a proposal with two listings." },
    result: { es: "Laura tiene dos fichas concretas; la visita sigue siendo una tarea de tu equipo.", en: "Laura has two concrete listings; the viewing is still your team's task." },
    state: { es: "Implementado; todavía sin activar para ninguna agencia.", en: "Implemented; not yet switched on for any agency." },
  },
  {
    key: "task",
    eyebrow: { es: "El aviso y la mañana siguiente", en: "The alert and the next morning" },
    title: { es: "Cuando una consulta importa, tu equipo recibe un aviso por email. A la mañana siguiente sabe qué va primero y por qué.", en: "When an enquiry matters, your team gets an e-mail alert. The next morning it knows what comes first and why." }, // COPY_1019 R-7
    line: { es: "El aviso llega por email a la persona que toca, con el motivo, todavía sin horario de oficina. El asistente de la mañana ordena el día: la consulta importante, por qué, y el siguiente paso. Elena la toma, propone la hora a Laura y la cierra: tres pasos, cada uno visible.", en: "The alert reaches the right person by e-mail, with the reason, without office hours yet. The morning assistant orders the day: the important enquiry, why, and the next step. Elena takes it, proposes the time to Laura and closes it: three steps, each one visible." }, // COPY_SYNC_1024 X-12
    inbound: { es: "La consulta de Laura, con inmueble, zona y presupuesto concretos.", en: "Laura's enquiry, with a property, an area and a budget named." },
    did: { es: "Avisa a Elena por email y, a la mañana siguiente, le dice qué va primero y por qué.", en: "Alerts Elena by e-mail and, the next morning, tells her what comes first and why." }, // HANDOVER_1021 A-15
    result: { es: "Elena propone el jueves a las 10:00; Laura acepta; queda en la ficha.", en: "Elena proposes Thursday at 10:00; Laura accepts; it goes on the record." },
    state: { es: "Disponible hoy: el aviso por email. El aviso llega cuando entra la consulta, todavía sin horario de oficina. En preparación: la lista de tareas para tomarlas y cerrarlas, y el asistente que explica el orden.", en: "Available today: the alert by e-mail. The alert arrives when the enquiry does, without office hours yet. In preparation: the task list to take and close tasks, and the assistant that explains the order." }, // COPY_SYNC_1024 X-3 (Copy's correction of R-8: the staff surface reaches production with Release U)
  },
  {
    key: "followup",
    eyebrow: { es: "Un seguimiento con sentido", en: "A follow-up that makes sense" },
    title: { es: "Entra un piso que encaja con Laura. Ella recibe un mensaje útil antes de su visita.", en: "A flat comes in that fits Laura. She gets a useful message before her viewing." },
    // Closing order 26.10. §7: the follow-up goes out on WhatsApp, the channel Laura wrote on and gave her consent for (E-FU3: the owner's
    // phone receives it), not by e-mail; no frequency figure until API's written rule. WORKING, for Copy and API.
    line: { es: "Un inmueble nuevo no basta por sí solo. El seguimiento sale solo si Laura aceptó recibir propuestas y tú activaste los seguimientos, y va por WhatsApp, el canal en el que escribió. El mensaje es concreto: el piso, los datos y una sola pregunta.", en: "A new listing is not enough on its own. The follow-up goes out only if Laura agreed to receive proposals and you switched follow-ups on, and it goes on WhatsApp, the channel she wrote on. The message is concrete: the flat, the facts and one question." },
    inbound: { es: "Un inmueble nuevo en tu cartera que encaja con lo que busca Laura.", en: "A new listing in your portfolio that fits what Laura is looking for." },
    did: { es: "Comprueba las tres condiciones y envía un WhatsApp con el piso y una sola pregunta.", en: "Checks the three conditions and sends a WhatsApp message with the flat and one question." },
    result: { es: "Si Laura responde, su respuesta llega a Elena como petición; una petición no es una cita.", en: "If Laura answers, her reply reaches Elena as a request; a request is not an appointment." },
    state: { es: "Prototipo · todavía no disponible.", en: "Prototype · not available yet." },
  },
  {
    key: "result",
    eyebrow: { es: "La semana, en cifras", en: "The week, in figures" },
    title: { es: "Al final de la semana sabes qué atendió Nuova, qué oportunidades hay y qué toca hacer.", en: "At the end of the week you know what Nuova handled, which opportunities there are and what to do next." },
    line: { es: "El informe completo, con el periodo, la base de datos y las acciones pendientes, está en tu acceso de agencia. Un resumen por email está en preparación. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide.", en: "The full report, with the period, the data behind it and the open actions, is in your agency login. An e-mail summary is being prepared. Answered is not the same as delivered: what reaches the customer is not measured yet." }, // HANDOVER_1021 A-11
    inbound: { es: "Todo lo registrado en la semana en los canales conectados.", en: "Everything recorded in the week on the connected channels." },
    did: { es: "Cuenta lo atendido, las oportunidades y lo que espera a una persona.", en: "Counts what was handled, the opportunities and what waits for a person." },
    result: { es: "Tres cifras y el informe completo en tu acceso; el email del lunes, en preparación.", en: "Three figures and the full report in your login; Monday's e-mail, in preparation." },
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
    arrivedMark: { es: "Llega", en: "Arrives" },
    answered: { es: "Respondida", en: "Replied" },
    drafted: { es: "Espera a una persona", en: "Waits for a person" },
    noted: { es: "Llamada atendida", en: "Call answered" },
    after: { es: "Cuando Marcos termina la visita, las cuatro consultas tienen ficha: dos con respuesta escrita, una llamada atendida con nota y tarea, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español.", en: "When Marcos finishes the viewing, all four enquiries have a record: two with a written reply, one call answered with a note and a task, and the one in German without an automatic reply, because today we only answer in Spanish." }, // HANDOVER_1021 A-6; closing order 26.10. §3 (the count matches the states)
  },
  reply: {
    pick: { es: "Elige el canal", en: "Pick the channel" },
    incoming: { es: "Lo que escribe el cliente", en: "What the customer writes" },
    incomingPhone: { es: "Lo que dice al llamar", en: "What they say on the call" },
    replied: { es: "Lo que responde Nuova", en: "What Nuova replies" },
    repliedPhone: { es: "Lo que hace el asistente", en: "What the assistant does" },
    noted: { es: "Ficha actualizada", en: "Record updated" },
    notedAt: { es: "martes 11:23", en: "Tuesday 11:23" },
    formTitle: { es: "Formulario de tu web", en: "Your website's form" },
    formReply: { es: "Respuesta por email", en: "Reply by email" },
    emailSubject: { es: "Asunto", en: "Subject" },
    emailSubjectKeller: "Re: Bewertung unserer Villa in Elviria",
    emailSubjectKellerTranslated: { es: "Re: Valoración de nuestra villa en Elviria", en: "Re: Valuation of our villa in Elviria" },
    /** The held reply (R19 §2, §7): a draft is a draft, never shown as sent. */
    heldTitle: { es: "Sin respuesta automática", en: "No automatic reply" },
    heldLine: { es: "El email llegó en alemán y hoy solo respondemos en español: Nuova no envía nada. La consulta queda registrada en la ficha y la contesta una persona de tu equipo.", en: "The e-mail arrived in German and today we only answer in Spanish: Nuova sends nothing. The enquiry is recorded and a person on your team answers it." }, // HANDOVER_1021 §E
    earlier: { es: "Antes, a las 11:20: la pregunta de Laura y la respuesta con los datos del piso (la del primer bloque de la página).", en: "Earlier, at 11:20: Laura's question and the reply with the flat's data (the one in the first block of the page)." },
    callIncoming: { es: "Llamada entrante", en: "Incoming call" },
    callAnswered: { es: "Atendida por el asistente · solo en español", en: "Answered by the assistant · Spanish only" },
    phoneCaveat: { es: "El asistente telefónico habla solo español. Una llamada atendida deja una nota y una tarea; no confirma citas ni da precios.", en: "The phone assistant speaks Spanish only. An answered call leaves a note and a task; it confirms no appointments and gives no prices." },
    languages: { es: "La web está en español o inglés. Cada ejemplo se muestra traducido; el original está a un toque.", en: "The website is in Spanish or English. Each example is shown translated; the original is one tap away." },
  },
  match: {
    wants: { es: "Lo que busca Laura", en: "What Laura wants" },
    criteria: { es: ["Estepona", "2 dormitorios", "Terraza", "Hasta 320.000 €", "Vivienda habitual"], en: ["Estepona", "2 bedrooms", "Terrace", "Up to €320,000", "Main home"] },
    fits: { es: "Dos inmuebles de tu cartera encajan", en: "Two listings from your portfolio fit" },
    yours: { es: "Tu cartera", en: "Your portfolio" },
    rights: { es: "Se muestra solo lo que tu fuente marca como publicable y actual. Sin disponibilidad confirmada no se afirma disponibilidad.", en: "Only what your source marks as publishable and current is shown. Without confirmed availability, no availability is claimed." },
    sent: { es: "Propuesta enviada a Laura por WhatsApp · martes 11:25", en: "Proposal sent to Laura on WhatsApp · Tuesday 11:25" },
    proposal: "Laura, tenemos dos pisos que encajan con lo que buscas: el de la terraza al sur, por 315.000 €, y un ático con terraza de 22 m² en Seghers, por 319.000 €. Te paso las dos fichas.",
    proposalTranslated: { es: "Laura, tenemos dos pisos que encajan con lo que buscas: el de la terraza al sur, por 315.000 €, y un ático con terraza de 22 m² en Seghers, por 319.000 €. Te paso las dos fichas.", en: "Laura, we have two flats that fit what you are looking for: the one with the south-facing terrace at €315,000, and a penthouse with a 22 m² terrace in Seghers at €319,000. Here are both listings." },
    details: { es: "Ver ficha", en: "See details" },
  },
  task: {
    /** The alert (Gate §18: the hot-lead mail to the right person is proven end to end in production). */
    alert: {
      label: { es: "Aviso de consulta importante · por email · martes 11:21", en: "Important-enquiry alert · by e-mail · Tuesday 11:21" },
      to: { es: "Para Elena Ruiz", en: "To Elena Ruiz" },
      subject: { es: "Consulta importante: Laura Serrano · piso de Estepona", en: "Important enquiry: Laura Serrano · flat in Estepona" },
      why: { es: "Motivo: nombró inmueble, zona y presupuesto (hasta 320.000 €).", en: "Reason: she named a property, an area and a budget (up to €320,000)." },
      open: { es: "Abrir la ficha", en: "Open the record" },
    },
    greeting: { es: "Buenos días, Elena.", en: "Good morning, Elena." },
    greetingLine: { es: "Desde ayer han llegado cuatro consultas. Esta es la que más importa hoy, y por qué.", en: "Four enquiries came in since yesterday. This is the one that matters most today, and why." },
    morning: { es: "Miércoles · 08:30 · el asistente de la mañana para Elena", en: "Wednesday · 08:30 · the morning assistant for Elena" },
    important: { es: "Consulta importante · aviso enviado", en: "Important enquiry · alert sent" },
    importantWhy: { es: "inmueble, zona y presupuesto concretos", en: "a property, an area and a budget named" },
    why: { es: "Por qué", en: "Why" },
    nextStep: { es: "Siguiente paso", en: "Next step" },
    items: {
      es: [
        { who: "Laura Serrano", what: "Quiere ver el piso de Estepona la semana que viene · vivienda habitual", why: "Nombró inmueble, zona y presupuesto", next: "Proponerle día y hora por WhatsApp" },
        { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria · email en alemán, sin respuesta automática", why: "Propietarios que quieren vender; piden cita esta semana", next: "Contestar al cliente y proponer una fecha para la visita" },
        { who: "Álvaro Pons", what: "Rellamada por la villa de Elviria · precio y margen", why: "Pidió que le llamen por la tarde (+34600123456)", next: "Llamar a partir de las 16:00" },
        { who: "Sofía Lamas", what: "Alquiler de larga temporada en Fuengirola", why: "Sin fecha; a partir de enero", next: "Enviar lo disponible en alquiler" },
      ],
      en: [
        { who: "Laura Serrano", what: "Wants to see the flat in Estepona next week · main home", why: "She named a property, an area and a budget", next: "Propose a day and time on WhatsApp" },
        { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria · e-mail in German, no automatic reply", why: "Owners who want to sell; they ask for an appointment this week", next: "Answer the customer and propose a date for the viewing" },
        { who: "Álvaro Pons", what: "Callback about the villa in Elviria · price and room to negotiate", why: "He asked to be called in the afternoon (+34600123456)", next: "Call from 16:00" },
        { who: "Sofía Lamas", what: "Long-term rental in Fuengirola", why: "No date; from January", next: "Send what is available to rent" },
      ],
    },
    listTitle: { es: "Las tareas de tu equipo", en: "Your team's tasks" }, // COPY_SYNC_1024 X-8
    listSubtitle: { es: "Esta semana", en: "This week" },
    take: { es: "Tomar", en: "Take" },
    taken: { es: "Tomada por Elena", en: "Taken by Elena" },
    confirm: { es: "Proponer la hora a Laura", en: "Propose the time to Laura" },
    confirmed: { es: "Hora propuesta a Laura · miércoles 08:58", en: "Time proposed to Laura · Wednesday 08:58" },
    complete: { es: "Marcar como hecha", en: "Mark as done" },
    done: { es: "Hecha · miércoles 09:02 · Elena", en: "Done · Wednesday 09:02 · Elena" },
    doneLine: { es: "Laura acepta: jueves a las 10:00. Queda en la ficha y en la lista de Elena.", en: "Laura accepts: Thursday at 10:00. It is on the record and on Elena's list." },
    open: { es: "Abierta · nadie la ha tomado", en: "Open · nobody has taken it" },
    again: { es: "Volver a empezar", en: "Start again" },
    othersSee: { es: "En la lista de los demás ya no aparece; el asistente de la mañana dice quién la ha tomado.", en: "It no longer appears in the others' lists; the morning assistant says who took it." }, // COPY_SYNC_1024 X-10 (Q-4 proposal until Daily confirms)
    /**
     * The appointment, step by step (closing order 26.10. §7: a request, a proposal, a person's confirmation and a booking are four
     * different things). The first three are what the story shows; the fourth is the calendar, in preparation (KALENDER decision).
     */
    agenda: {
      title: { es: "La cita, paso a paso", en: "The appointment, step by step" },
      steps: {
        es: [
          { k: "Petición", v: "Laura quiere verlo la semana que viene (martes 11:23)" },
          { k: "Propuesta", v: "Elena propone el jueves a las 10:00 (miércoles 08:58)" },
          { k: "Confirmación", v: "Laura acepta; Elena la marca como hecha (09:02)" },
          { k: "En la agenda", v: "la cita en el calendario de Elena · en preparación" },
        ],
        en: [
          { k: "Request", v: "Laura wants to see it next week (Tuesday 11:23)" },
          { k: "Proposal", v: "Elena proposes Thursday at 10:00 (Wednesday 08:58)" },
          { k: "Confirmation", v: "Laura accepts; Elena marks it done (09:02)" },
          { k: "In the diary", v: "the appointment in Elena's calendar · in preparation" },
        ],
      },
    },
    chatConfirm: "Hola, Laura, soy Elena, de la agencia. ¿Te viene bien el jueves a las 10:00 para ver el piso de Estepona? Te paso la dirección y mi número.",
    chatConfirmTranslated: { es: "Hola, Laura, soy Elena, de la agencia. ¿Te viene bien el jueves a las 10:00 para ver el piso de Estepona? Te paso la dirección y mi número.", en: "Hi Laura, it's Elena from the agency. Does Thursday at 10:00 work for you to see the flat in Estepona? I'll send you the address and my number." },
  },
  followup: {
    trigger: { es: "Miércoles · 17:30 · entra en tu cartera", en: "Wednesday · 17:30 · enters your portfolio" },
    matches: { es: "Encaja con lo que busca Laura", en: "Fits what Laura is looking for" },
    conditions: { es: "Condiciones para enviarlo", en: "Conditions for sending it" },
    conditionList: {
      es: ["Laura aceptó recibir propuestas por WhatsApp (martes 11:25)", "Tienes los seguimientos activados", "El inmueble está marcado como publicable y actual"],
      en: ["Laura agreed to receive proposals on WhatsApp (Tuesday 11:25)", "You have follow-ups switched on", "The listing is marked publishable and current"],
    },
    email: { es: "El WhatsApp que recibe Laura", en: "The WhatsApp message Laura receives" },
    from: { es: "De: tu agencia · miércoles 17:32", en: "From: your agency · Wednesday 17:32" },
    subject: "Un piso nuevo en Estepona que encaja con lo que buscas",
    subjectTranslated: { es: "Un piso nuevo en Estepona que encaja con lo que buscas", en: "A new flat in Estepona that fits what you're looking for" },
    body: "Hola Laura, antes de la visita del jueves: acaba de entrar un piso de dos dormitorios en primera línea en Estepona, dentro de tu presupuesto. Te paso su ficha y, al lado, el ático de Seghers que ya tienes. ¿Quieres verlo el jueves también?",
    bodyTranslated: { es: "Hola Laura, antes de la visita del jueves: acaba de entrar un piso de dos dormitorios en primera línea en Estepona, dentro de tu presupuesto. Te paso su ficha y, al lado, el ático de Seghers que ya tienes. ¿Quieres verlo el jueves también?", en: "Hi Laura, before Thursday's viewing: a two-bedroom flat on the seafront in Estepona has just come in, within your budget. Here is its listing and, next to it, the penthouse in Seghers you already have. Would you like to see it on Thursday as well?" },
    cta: { es: "Responder: sí, el jueves también", en: "Reply: yes, on Thursday too" },
    ctaDemo: { es: "Demo: pulsa para ver qué pasa con la respuesta de Laura", en: "Demo: press to see what happens with Laura's reply" },
    replyText: { es: "Sí, el jueves también.", en: "Yes, on Thursday too." },
    requested: { es: "Petición recibida en tu agencia · nadie ha confirmado todavía", en: "Request received by your agency · nobody has confirmed yet" },
    requestedLine: { es: "Una petición no es una cita. Elena la ve en su lista y confirma la hora con Laura.", en: "A request is not an appointment. Elena sees it on her list and confirms the time with Laura." },
    footer: { es: "Un seguimiento por inmueble nuevo, nunca repetido, dentro del horario de contacto de tu agencia y siempre con la opción de dejar de recibirlos.", en: "One follow-up per new listing, never repeated, within your agency's contact hours and always with the option to stop receiving them." },
  },
  result: {
    weekly: { es: "Resumen semanal · tu agencia", en: "Weekly summary · your agency" },
    period: { es: "Semana del lunes al domingo", en: "Monday to Sunday" },
    basis: { es: "Base: consultas registradas en Nuova en los canales conectados", en: "Basis: enquiries recorded in Nuova on the connected channels" },
    demo: { es: "Cifras de ejemplo · no son datos de ninguna agencia", en: "Example figures · not any agency's data" },
    handled: { title: { es: "Lo que atendió Nuova", en: "What Nuova handled" }, value: "23", line: { es: "consultas respondidas y registradas · WhatsApp 13 · email 10 · la entrega al cliente no se mide", en: "enquiries answered and recorded · WhatsApp 13 · email 10 · delivery to the customer is not measured" } /* COPY_1019 R-10 */ },
    chances: { title: { es: "Oportunidades que han surgido", en: "Opportunities that came up" }, value: "6", line: { es: "visitas pedidas, 4 acordadas por el equipo (la de Laura entre ellas) · 2 valoraciones pedidas", en: "viewings asked for, 4 agreed by the team (Laura's among them) · 2 valuations asked for" } /* HANDOVER_1021 A-13 */ },
    next: { title: { es: "Lo que toca hacer", en: "What to do next" }, value: "2", line: { es: "cosas esperan a una persona: la valoración de los Keller y la respuesta de Sofía", en: "things wait for a person: the Kellers' valuation and Sofía's reply" } },
    openTitle: { es: "Sigue abierto", en: "Still open" },
    open: {
      es: ["Valoración Keller · falta proponer la visita", "Sofía Lamas · esperando su respuesta"],
      en: ["Keller valuation · the visit still to propose", "Sofía Lamas · waiting for her reply"],
    },
    emailTitle: { es: "El email del lunes · en preparación", en: "Monday's email · in preparation" },
    emailLine: { es: "Lo esencial en tres cifras y un botón, cuando el envío semanal esté activo.", en: "The essentials in three figures and one button, once the weekly send is active." },
    button: { es: "Ver el informe completo", en: "See the full report" },
    inLogin: { es: "En tu acceso de agencia: periodo, base de datos, evolución y acciones pendientes.", en: "In your agency login: the period, the data behind it, the trend and the open actions." },
  },
  /** Social (R19 §8): listing → post with picture and text → approval → published → a prospect's question → the allowed reply, the next step. */
  social: {
    eyebrow: { es: "Captar desde lo que ya publicas", en: "Attract from what you already publish" },
    title: { es: "Una publicación de tu inmueble, aprobada por ti, y cada comentario en su ficha.", en: "A post of your listing, approved by you, and every comment in a record." },
    // Closing order 26.10. §6: a comment lands on the commenter's record (the one they already have, or a new one); repeated comments are
    // not shown as ever new leads. WORKING, for Copy.
    line: { es: "Nuova prepara el texto con la foto y los datos del inmueble, tú lo apruebas, se publica en tu cuenta. Un comentario público con una pregunta queda en la ficha de quien lo escribe, con el inmueble; la respuesta la escribe una persona de tu equipo.", en: "Nuova prepares the text with the listing's photo and data, you approve it, it is published on your account. A public comment with a question lands on the commenter's record, with the listing; a person on your team writes the reply." },
    inbound: { es: "Un inmueble de tu cartera con sus fotos y datos.", en: "A listing from your portfolio with its photos and data." },
    did: { es: "Prepara la publicación, espera tu aprobación, la publica y lleva cada pregunta pública a la ficha de quien la hace.", en: "Prepares the post, waits for your approval, publishes it and takes each public question to the record of the person asking." },
    result: { es: "Un contacto con el inmueble y su pregunta en la ficha. No es una consulta atendida: es una consulta nueva para una persona.", en: "A contact with the listing and the question on a record. Not an enquiry handled: a new enquiry for a person." },
    state: { es: "Prototipo · depende de la aprobación de la plataforma.", en: "Prototype · depends on the platform's approval." },
    post: {
      account: "@tu_agencia",
      caption: { es: "Dos dormitorios, terraza al sur y garaje en la zona del puerto de Estepona. 78 m², a dos calles del paseo. ¿Quieres verlo? Escríbenos.", en: "Two bedrooms, a south-facing terrace and a garage in Estepona's marina area. 78 m², two streets from the promenade. Want to see it? Write to us." },
      exampleCaption: { es: "Ejemplo: así funcionará cuando la plataforma lo apruebe.", en: "Example: how it will work once the platform approves it." }, // COPY_SYNC_1024 X-13
      draftLabel: { es: "Borrador preparado por Nuova · miércoles 11:40", en: "Draft prepared by Nuova · Wednesday 11:40" },
      approved: { es: "Aprobada por ti · miércoles 12:10", en: "Approved by you · Wednesday 12:10" },
      published: { es: "Publicada en tu cuenta · jueves 09:00", en: "Published on your account · Thursday 09:00" },
      nextTitle: { es: "Siguiente paso", en: "Next step" },
      next: { es: "Marta queda en su ficha, con el inmueble y su pregunta; si vuelve a comentar, se añade a la misma ficha. Una persona del equipo le escribe por privado; nada se responde en público sin una persona.", en: "Marta is on a record, with the listing and her question; if she comments again, it goes on the same record. A person from the team writes to her privately; nothing is answered in public without a person." },
    },
    example: { es: "Ejemplo · prototipo", en: "Example · prototype" }, // R24 picture 04 (4): the published post is an example of a prototype
    photoSource: { es: "Foto de muestra con licencia (Pexels 12715501), no es un inmueble real.", en: "Licensed sample photo (Pexels 12715501), not a real listing." },
    commentLabel: { es: "Comentario público", en: "Public comment" },
    comment: "¿Sigue disponible? Me interesa.",
    commenter: "Marta G.",
    replyLabel: { es: "Respuesta pública · la escribe una persona de tu equipo", en: "Public reply · written by a person on your team" },
    reply: "Gracias por tu interés, Marta. Te escribimos por privado.",
    noAvailability: { es: "Nuova no responde en público por sí sola; deja el comentario como contacto nuevo en su ficha. La respuesta no afirma disponibilidad.", en: "Nuova does not reply in public on its own; it leaves the comment as a new contact on a record. The reply claims no availability." },
    noAds: { es: "No se crea ninguna campaña ni se gasta nada: solo lo que ya publicas. Los comentarios y las cifras son de ejemplo.", en: "No campaign is created and nothing is spent: only what you already publish. The comments and the figures are examples." },
  },
};
