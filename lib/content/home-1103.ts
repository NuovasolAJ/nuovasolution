import { claim, claimWords, live, withChannels, type ClaimKey, type ClaimState, type ClaimView } from "@/lib/claims";
import type { Locale } from "@/lib/i18n/config";

/**
 * The words of the home page of 03.11.2026 after Copy's addendum of 06.11. (WEBSITE_COPY_HANDOVER_1105_v3.md §14–§23, e072d18 +
 * c257602; the owner's round on 2dfa67d): the hero, the flow, the eleven scenes in three chapters, the report with the switch, 3D,
 * the plans, the way in, trust, the short FAQ and the close. Every sentence is written for the target state; where Copy gives a
 * public wording for a key that is off, both stand here and the component picks by view (`V`). ⟦canales⟧ is filled from the keys
 * at render (lib/claims.ts `withChannels`). The words inside the product surfaces (`ui`) are the lines Copy accepted in §22.
 * Claims: governance/API_CLAIMS_LINES_1102_v1.md (no "Disponible", no price, no public sign-up on the public view, WhatsApp as
 * our own agency's channel, no contact promise). No status word anywhere (§14).
 */
type L = Record<"es" | "en", string>;
const T = (es: string, en: string): L => ({ es, en });
/** A text pair per view: the target state (the preview) and the public state (strictly what is included). */
export type V = Record<ClaimView, L>;
const V = (target: L, pub: L): V => ({ target, public: pub });
const same = (l: L): V => ({ target: l, public: l });

export type Status = ClaimState;
export const statusWords = claimWords;
export type ChapterKey = "attend" | "organise" | "grow";

/** Picks a sentence by a key: Copy's target wording while the key is live in the view, the public wording otherwise. */
export const byKey = (keys: ClaimKey | ClaimKey[], view: ClaimView, target: L, pub: L): L => (live(keys, view) ? target : pub);

export const home1103 = {
  hero: {
    eyebrow: T("Para agencias inmobiliarias en España", "For real estate agencies in Spain"),
    h1: T("Mientras enseñas, NuovaSolution atiende.", "While you show a home, NuovaSolution answers."),
    // §2 H-4 (the benefit line), unchanged
    lead: T("Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha.", "Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record."),
    // The owner's decision of 13.11. + Copy 1113 §0 B-1: the one main button of the whole site (WORKING until Copy confirms the wording)
    ctaDemo: T("Solicita tu piloto gratuito", "Request your free pilot"),
    /** Copy 1113 §0 B-2: the pilot line under the hero's button, both views. */
    pilotLine: T("Tu agencia usa NuovaSolution sin pagar, con nuestro acompañamiento. Las condiciones, por escrito.", "Your agency uses NuovaSolution free of charge, with our support. The terms in writing."),
    /** Copy 1113 §1 S-1: the pain line under the hero, with its mark (S-1m); the figures are the example report's (9 = 2 + 2 + 5 of 25). */
    pain: { before: T("En una semana de ejemplo, ", "In an example week, "), figure: T("9 de 25", "9 of 25"), after: T(" consultas llegaron con la oficina cerrada. ¿Quién les contestó?", " enquiries arrived while the office was closed. Who answered them?"), mark: T("Ejemplo con datos ficticios", "Example with fictional data") },
    /** §16 H-1 … H-3: the chips per view (chip 1 stays word for word, FRAGE B). */
    chips: (view: ClaimView): L[] => [
      byKey("replyOutOfHours", view, T("Responde en español, también fuera de horario", "Replies in Spanish, also out of hours"), T("Responde en español", "Replies in Spanish")),
      T("Guarda zona, presupuesto e intención", "Keeps area, budget and intent"),
      byKey("alert", view, T("Marca la prioridad y avisa a tu equipo", "Marks the priority and alerts your team"), T("Marca la prioridad y su motivo", "Marks the priority and its reason")),
    ],
    /** The hero picture (owner 05.11.: HERO = A; the 3D lane's hero_A of handoff_2026-11-06 with the wall painting Van Gogh, Cypresses, Met 49.30, CC0). */
    image: T("Casa de ejemplo ficticia: salón amueblado, ilustrativo", "Fictional demo house: furnished living room, illustrative"),
    imageMark: T("Casa de ejemplo ficticia, visualización", "Fictional demo house, visualisation"),
    artCredit: T("Cuadro: Vincent van Gogh, Cypresses (1889), The Metropolitan Museum of Art, dominio público", "Wall painting: Vincent van Gogh, Cypresses (1889), The Metropolitan Museum of Art, public domain"),
    scroll: T("Ver cómo responde", "See how it replies"), // Copy 1108 H-4
    brandMoment: T("NuovaSolution", "NuovaSolution"),
  },

  /** §17: the flow; F-1 and F-3/F-5 follow their keys; ⟦canales⟧ from the keys. */
  flow: {
    eyebrow: T("Cómo funciona", "How it works"),
    h2: T("De la consulta a tu equipo, con el trabajo previo hecho.", "From the enquiry to your team, with the groundwork done."),
    nodes: (locale: Locale, view: ClaimView): { title: string; line: string }[] => {
      const f1 = byKey("replyOutOfHours", view, T("Por ⟦canales⟧, a cualquier hora.", "On ⟦canales⟧, at any hour."), T("Por ⟦canales⟧.", "On ⟦canales⟧."));
      const f3 = byKey("priorityWithReason", view, T("Zona, presupuesto, idioma, prioridad y su motivo.", "Area, budget, language, priority and its reason."), T("Zona, presupuesto e idioma.", "Area, budget and language."));
      const f5 = byKey("priorityWithReason", view, T("Abre la ficha y ya sabe quién es, qué busca y qué prioridad tiene. La cita la acuerda una persona.", "They open the record and already know who it is, what they want and what priority it has. A person agrees the appointment."), T("Abre la ficha y ya sabe quién es y qué busca. La cita la acuerda una persona.", "They open the record and already know who it is and what they want. A person agrees the appointment."));
      return [
        { title: T("Llega la consulta", "The enquiry arrives")[locale], line: withChannels(f1[locale], locale, view) },
        // Copy 1108 V-1/V-2: the voice "en nombre de tu agencia" once a reply leaves the agency's own channel (mailbox or number); the line in both views
        { title: (live("mailboxConnection", view) || live("whatsappOwnNumber", view) ? T("Responde en nombre de tu agencia", "It replies on behalf of your agency") : T("NuovaSolution responde", "NuovaSolution replies"))[locale], line: T("En español, con una pregunta útil de vuelta, y dice que es un asistente.", "In Spanish, with one useful question back, and it says it is an assistant.")[locale] },
        { title: T("La ficha se completa", "The record fills in")[locale], line: f3[locale] },
        { title: T("Tu equipo llega preparado", "Your team arrives prepared")[locale], line: f5[locale] },
      ];
    },
  },

  /** §18: the scenes in three chapters; every scene bound to its keys; the chapter lines composed from the keys. */
  functions: {
    eyebrow: T("Lo que tu agencia gana", "What your agency gains"),
    h2: T("Cada consulta, atendida y en su sitio.", "Every enquiry, answered and in its place."),
    hint: T("Elige una escena.", "Choose a scene."),
    progress: T("Escena", "Scene"),
    next: T("Siguiente escena", "Next scene"),
    // WORKING · Copy T-8 (REDESIGN_TO_COPY_1107_TEXTSTELLEN_BUILD_1108_v1): the fold control's label; {n} = the scenes still folded
    fold: T("Ver las {n} escenas restantes", "See the {n} remaining scenes"),
    chapters: [
      { key: "attend" as ChapterKey, name: T("Atiende", "Answer"), line: (view: ClaimView): L => byKey("replyOutOfHours", view, T("Responde cuando tú no puedes: en una visita, de noche o el fin de semana.", "It replies when you can't: during a viewing, at night or at the weekend."), T("Responde cuando tú no puedes, también durante una visita.", "It replies when you can't, also during a viewing.")) },
      { key: "organise" as ChapterKey, name: T("Organiza", "Organise"), line: (view: ClaimView): L => byKey("priorityWithReason", view, T("Lo que pide cada cliente queda en su ficha, con su prioridad y su motivo, y tu equipo sabe por dónde empezar.", "What each client asks for stays on their record, with its priority and reason, and your team knows where to start."), T("Lo que pide cada cliente queda en su ficha.", "What each client asks for stays on their record.")) },
      {
        key: "grow" as ChapterKey, name: T("Crece", "Grow"), line: (view: ClaimView): L => {
          const first = T("No es solo responder antes.", "It's not just replying sooner.");
          const o = live("origin", view), f = live("followup", view), m = live("matching", view), i = live("instagram", view);
          const second = o && f && i ? T("Sabes de dónde llegan tus clientes, vuelves a ellos cuando entra un inmueble que encaja y das a conocer tu cartera.", "You know where your clients come from, you go back to them when a listing that fits comes in, and you get your portfolio seen.")
            : o && f ? T("Sabes de dónde llegan tus clientes y vuelves a ellos cuando entra un inmueble que encaja.", "You know where your clients come from and you go back to them when a listing that fits comes in.")
            : o && m ? T("Sabes de dónde llegan tus clientes y les propones inmuebles que encajan.", "You know where your clients come from and you propose listings that fit.")
            : T("Sabes de dónde llegan tus clientes y qué sigue abierto cada semana.", "You know where your clients come from and what is still open each week.");
          return T(`${first.es} ${second.es}`, `${first.en} ${second.en}`);
        },
      },
    ],
    items: [
      { key: "reply", chapter: "attend" as ChapterKey, keys: ["replyWhatsapp"] as ClaimKey[], title: T("Consultas respondidas", "Enquiries answered"), line: (view: ClaimView): L => byKey("replyOutOfHours", view, T("En español, por ⟦canales⟧, también fuera de horario.", "In Spanish, on ⟦canales⟧, also out of hours."), T("En español, por ⟦canales⟧.", "In Spanish, on ⟦canales⟧.")) },
      { key: "language", chapter: "attend" as ChapterKey, keys: ["languageNoted"] as ClaimKey[], title: T("El idioma de cada cliente", "Each client's language"), line: (): L => T("NuovaSolution detecta el idioma de cada cliente y lo guarda en su ficha. Si no es español, no se envía nada automáticamente: lo escribe una persona.", "NuovaSolution detects each client's language and keeps it on their record. If it is not Spanish, nothing is sent automatically: a person writes it.") },
      { key: "record", chapter: "organise" as ChapterKey, keys: ["crm"] as ClaimKey[], title: T("Lo importante, guardado", "What matters, kept"), line: (): L => T("Zona, presupuesto, idioma y lo que pide quedan en su ficha, en el CRM integrado.", "Area, budget, language and what they ask for stay on their record, in the built-in CRM.") },
      { key: "priority", chapter: "organise" as ChapterKey, keys: ["priorityWithReason"] as ClaimKey[], title: T("Leads importantes, con motivo", "Important leads, with a reason"), line: (view: ClaimView): L => byKey("alert", view, T("La ficha marca la prioridad y por qué, y avisa a la persona que toca.", "The record marks the priority and why, and alerts the right person."), T("La ficha marca la prioridad y por qué.", "The record marks the priority and why.")) },
      { key: "inbox", chapter: "organise" as ChapterKey, keys: ["labels"] as ClaimKey[], title: T("Tu buzón, ordenado", "Your inbox, sorted"), line: (): L => T("Cada correo llega con su etiqueta: visita, valoración, alquiler.", "Every e-mail arrives with its label: viewing, valuation, rental.") },
      { key: "team", chapter: "organise" as ChapterKey, keys: ["taskList"] as ClaimKey[], title: T("El día de tu equipo", "Your team's day"), line: (view: ClaimView): L => byKey("dailyVoice", view, T("Cada persona ve sus tareas y por qué va primero cada una, y puede preguntar «¿Qué tengo hoy?».", "Each person sees their tasks and why each comes first, and can ask \"What do I have today?\"."), T("Cada persona ve sus tareas y por qué va primero cada una.", "Each person sees their tasks and why each comes first.")) },
      { key: "origin", chapter: "grow" as ChapterKey, keys: ["origin"] as ClaimKey[], title: T("De dónde llega cada consulta", "Where each enquiry comes from"), line: (): L => T("La ficha guarda de dónde llega cada consulta: ⟦canales⟧. Así ves qué canal te trae clientes.", "The record keeps where each enquiry comes from: ⟦canales⟧. So you see which channel brings you clients.") },
      { key: "matching", chapter: "grow" as ChapterKey, keys: ["matching"] as ClaimKey[], title: T("Inmuebles que encajan", "Listings that fit"), line: (): L => T("NuovaSolution compara lo que busca el cliente con tu cartera y propone solo inmuebles tuyos.", "NuovaSolution compares what the client is looking for with your portfolio and proposes only your own listings.") },
      { key: "followup", chapter: "grow" as ChapterKey, keys: ["followup"] as ClaimKey[], title: T("Seguimiento con permiso", "Follow-up with permission"), line: (): L => T("Cuando entra un inmueble que encaja, se propone solo si el cliente lo permitió.", "When a listing that fits comes in, it is proposed only if the client allowed it.") },
      { key: "social", chapter: "grow" as ChapterKey, keys: ["instagram"] as ClaimKey[], title: T("Publicar en Instagram", "Posting on Instagram"), line: (): L => T("Preparas la publicación con los datos del inmueble y sale cuando tú la apruebas.", "You prepare the post with the listing's details and it goes out when you approve it.") },
      { key: "report", chapter: "grow" as ChapterKey, keys: ["reportInLogin"] as ClaimKey[], title: T("Tu semana, en un informe", "Your week, in one report"), line: (view: ClaimView): L => byKey("reportTrend", view, T("Qué entró, de dónde llegó y qué sigue abierto, para decidir dónde poner tu tiempo.", "What came in, where it came from and what is still open, so you can decide where to put your time."), T("Qué entró y qué sigue abierto, para decidir dónde poner tu tiempo.", "What came in and what is still open, so you can decide where to put your time.")) },
    ],
    /** The words inside the product surfaces (Copy §22: accepted). */
    ui: {
      priority: {
        title: T("Consultas de hoy", "Today's enquiries"),
        rows: {
          es: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "Alta", why: "pide zona, presupuesto y visita" },
            { who: "Carmen Ortega", channel: "Email · 11:24", p: "Alta", why: "propietaria que quiere vender y pide cita" },
            { who: "Sofía Lamas", channel: "⟦sofia⟧ · 11:31", p: "Media", why: "alquiler con zona y presupuesto, sin fecha" },
          ],
          en: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "High", why: "names area, budget and a viewing" },
            { who: "Carmen Ortega", channel: "E-mail · 11:24", p: "High", why: "an owner who wants to sell and asks for a visit" },
            { who: "Sofía Lamas", channel: "⟦sofia⟧ · 11:31", p: "Medium", why: "a rental with area and budget, no date" },
          ],
        },
        /** Sofía's channel follows `webform` (Copy §22): the form sends her enquiry at 11:31. */
        sofia: (locale: Locale, view: ClaimView): string => (live("webform", view) ? (locale === "es" ? "Formulario web" : "Web form") : locale === "es" ? "Email" : "E-mail"),
        /** The alert row (only while `alert` is live in the view; §18 S-4). */
        alert: T("Aviso enviado a Elena · 11:21 · Laura Serrano, prioridad alta", "Alert sent to Elena · 11:21 · Laura Serrano, high priority"),
      },
      reply: {
        title: T("Respondidas hoy", "Answered today"),
        rows: {
          es: [
            { t: "23:40", ch: "WhatsApp", who: "Marta R.", what: "Ático en Benalmádena, hasta 280.000 €", s: "Respondida 23:41" },
            { t: "07:15", ch: "Email", who: "Tomás V.", what: "Vender piso en Mijas, pide valoración", s: "Respondida 07:16" },
            { t: "11:20", ch: "WhatsApp", who: "Laura S.", what: "2 dormitorios en Estepona, hasta 320.000 €", s: "Respondida 11:21" },
          ],
          en: [
            { t: "23:40", ch: "WhatsApp", who: "Marta R.", what: "Penthouse in Benalmádena, up to €280,000", s: "Answered 23:41" },
            { t: "07:15", ch: "E-mail", who: "Tomás V.", what: "Selling a flat in Mijas, asks for a valuation", s: "Answered 07:16" },
            { t: "11:20", ch: "WhatsApp", who: "Laura S.", what: "2 bedrooms in Estepona, up to €320,000", s: "Answered 11:21" },
          ],
        },
        foot: T("Hora en que salió cada respuesta", "Time each reply was sent"), // Copy 1108 §5 T-1
      },
      record: {
        title: T("Ficha de Laura", "Laura's record"),
        fields: {
          es: [["Intención", "compra"], ["Zona", "Estepona"], ["Dormitorios", "2"], ["Presupuesto", "hasta 320.000 €"], ["Idioma", "español"], ["Canal", "WhatsApp"], ["Visita", "la pide para la semana que viene"]],
          en: [["Intent", "buying"], ["Area", "Estepona"], ["Bedrooms", "2"], ["Budget", "up to €320,000"], ["Language", "Spanish"], ["Channel", "WhatsApp"], ["Viewing", "asked for next week"]],
        },
        priority: T("Prioridad alta · pide zona, presupuesto y visita", "High priority · names area, budget and a viewing"),
        next: T("Siguiente paso: una persona de tu equipo le propone día y hora.", "Next step: someone on your team proposes a day and time."),
      },
      /** The channel of origin on every record; the two rows of §22 stand only while `adsLeads` is live in the view. */
      origin: {
        title: T("Canal de origen", "Channel of origin"),
        rows: {
          es: [{ who: "Laura Serrano", what: "Piso de 2 dormitorios en Estepona", origin: "WhatsApp" }, { who: "Carmen Ortega", what: "Valoración de su piso en Fuengirola", origin: "Email" }, { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria", origin: "Email" }],
          en: [{ who: "Laura Serrano", what: "Two-bedroom flat in Estepona", origin: "WhatsApp" }, { who: "Carmen Ortega", what: "Valuation of her flat in Fuengirola", origin: "E-mail" }, { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria", origin: "E-mail" }],
        },
        adsRows: {
          es: [{ who: "Inés Navarro", what: "Piso con terraza en Estepona · EST-204", origin: "Portal" }, { who: "Daniel Ruiz", what: "Adosado en Mijas", origin: "Anuncio" }],
          en: [{ who: "Inés Navarro", what: "Flat with terrace in Estepona · EST-204", origin: "Portal" }, { who: "Daniel Ruiz", what: "Townhouse in Mijas", origin: "Ad" }],
        },
      },
      /** The Kellers' record, the language recognised, nothing sent automatically (S-2; the example stays German while `otherLanguages` is off, §15). */
      language: {
        title: T("Ficha de Peter y Anna Keller", "Peter and Anna Keller's record"),
        fields: {
          es: [["Intención", "vender"], ["Zona", "Marbella · Elviria"], ["Inmueble", "villa"], ["Idioma", "alemán · reconocido"], ["Respuesta", "ninguna automática · la escribe una persona"]],
          en: [["Intent", "selling"], ["Area", "Marbella · Elviria"], ["Property", "villa"], ["Language", "German · recognised"], ["Reply", "none automatic · a person writes it"]],
        },
        history: T("Historial", "History"),
        events: {
          es: [{ t: "mar 11:24", ch: "Email", what: "Consulta en alemán: quieren vender su villa" }, { t: "mar 11:24", ch: "Email", what: "Idioma reconocido: alemán · no se envía nada automáticamente" }],
          en: [{ t: "Tue 11:24", ch: "E-mail", what: "Enquiry in German: they want to sell their villa" }, { t: "Tue 11:24", ch: "E-mail", what: "Language recognised: German · nothing sent automatically" }],
        },
      },
      inbox: {
        title: T("Buzón de la agencia", "The agency's mailbox"),
        note: T("En el buzón de tu agencia", "In your agency's mailbox"),
        rows: {
          es: [
            { from: "Laura Serrano", subject: "Piso de 2 dormitorios en Estepona", label: "Visita" },
            { from: "Carmen Ortega", subject: "Valoración de mi piso en Fuengirola", label: "Valoración" },
            { from: "Sofía Lamas", subject: "Alquiler de larga temporada", label: "Alquiler" },
          ],
          en: [
            { from: "Laura Serrano", subject: "Two-bedroom flat in Estepona", label: "Viewing" },
            { from: "Carmen Ortega", subject: "Valuation of my flat in Fuengirola", label: "Valuation" },
            { from: "Sofía Lamas", subject: "Long-term rental", label: "Rental" },
          ],
        },
      },
      matching: {
        title: T("Encajan con Laura · de tu cartera", "Fit Laura · from your portfolio"),
        because: T("Estepona · 2 dormitorios · hasta 320.000 €", "Estepona · 2 bedrooms · up to €320,000"),
        rows: {
          es: [{ ref: "EST-204", t: "Piso de 2 dormitorios con terraza", place: "Estepona · zona puerto", price: "315.000 €", fit: "zona, dormitorios, precio", photo: "/media/world/listing-est204.webp", alt: "Salón abierto a una terraza · foto de muestra" }, { ref: "EST-231", t: "Ático de 2 dormitorios con vistas", place: "Estepona · Seghers", price: "319.000 €", fit: "zona, dormitorios, precio", photo: "/media/world/listing-est231.webp", alt: "Edificio blanco con balcones · foto de muestra" }],
          en: [{ ref: "EST-204", t: "Two bedroom flat with terrace", place: "Estepona · marina area", price: "€315,000", fit: "area, bedrooms, price", photo: "/media/world/listing-est204.webp", alt: "Living room opening onto a terrace · sample photo" }, { ref: "EST-231", t: "Two bedroom penthouse with views", place: "Estepona · Seghers", price: "€319,000", fit: "area, bedrooms, price", photo: "/media/world/listing-est231.webp", alt: "White building with balconies · sample photo" }],
        },
        action: T("Proponer a Laura", "Propose to Laura"),
        photoNote: T("Fotos de muestra", "Sample photos"),
      },
      followup: {
        title: T("Nuevo en tu cartera", "New in your portfolio"),
        listing: T("EST-240 · Piso de 2 dormitorios · Estepona · 309.000 €", "EST-240 · Two bedroom flat · Estepona · €309,000"),
        photo: "/media/world/listing-est240.webp",
        fits: T("Encaja con Laura: zona, dormitorios y presupuesto", "Fits Laura: area, bedrooms and budget"),
        permission: T("Permiso de Laura para avisos: sí · martes 11:23", "Laura's permission for updates: yes · Tuesday 11:23"),
        action: T("Enviar la propuesta por email", "Send the proposal by e-mail"),
        noPermission: T("Sin permiso no se envía nada.", "Without permission nothing is sent."),
      },
      team: {
        title: T("Elena · miércoles", "Elena · Wednesday"),
        rows: {
          es: [{ kind: "Visita pedida", who: "Laura Serrano · WhatsApp", why: "nombró inmueble, zona y presupuesto", step: "Proponerle día y hora", state: "Abierta" }, { kind: "Valoración", who: "Carmen Ortega · Email", why: "propietaria que pide cita esta semana", step: "Proponer una fecha", state: "Abierta" }, { kind: "Rellamada", who: "Álvaro Pons · Teléfono", why: "pidió que le llamen por la tarde", step: "Llamar a partir de las 16:00", state: "Tomada · Marcos" }],
          en: [{ kind: "Viewing requested", who: "Laura Serrano · WhatsApp", why: "named a property, an area and a budget", step: "Propose a day and time", state: "Open" }, { kind: "Valuation", who: "Carmen Ortega · E-mail", why: "an owner asking for a visit this week", step: "Propose a date", state: "Open" }, { kind: "Callback", who: "Álvaro Pons · Phone", why: "asked to be called in the afternoon", state: "Taken · Marcos", step: "Call from 16:00" }],
        },
        take: T("Tomar", "Take"),
        demo: T("Demo", "Demo"),
        taken: T("Tomada · Elena", "Taken · Elena"),
        assistant: T("Primero Laura: pidió visita y nombró zona y presupuesto.", "Laura first: she asked for a viewing and named area and budget."),
        /** The small Daily view (after the team's app, staff-v13): the list; the voice bar only while `dailyVoice` is live (§18 S-6). */
        daily: {
          title: T("Tareas · Elena", "Tasks · Elena"),
          app: T("La app del equipo", "The team's app"),
          sections: { es: ["Urgentes (1)", "Hoy (2)"], en: ["Urgent (1)", "Today (2)"] },
          question: T("¿Qué tengo hoy?", "What do I have today?"),
          answer: T("Tienes 3 tareas. Primero Laura Serrano: pidió visita y nombró zona y presupuesto. Después la valoración de Carmen Ortega y la llamada a Álvaro Pons a partir de las 16:00.", "You have 3 tasks. Laura Serrano first: she asked for a viewing and named area and budget. Then Carmen Ortega's valuation and the call to Álvaro Pons from 16:00."),
          mic: T("Pregunta en voz alta", "Ask out loud"),
          close: T("Cerrar", "Close"),
          note: T("Vista de ejemplo de la app del equipo", "Example view of the team's app"),
        },
      },
      social: {
        title: T("Instagram · publicación preparada", "Instagram · post prepared"),
        listing: T("Villa con piscina y vistas al mar · Marbella · Elviria", "Villa with pool and sea views · Marbella · Elviria"),
        photo: "/media/world/listing-est118.webp",
        caption: T("Villa con piscina y vistas al mar en Elviria. Tres dormitorios, terraza al sur. Visitas con cita. #Marbella #Elviria", "Villa with pool and sea views in Elviria. Three bedrooms, south-facing terrace. Viewings by appointment. #Marbella #Elviria"),
        state: T("Pendiente de tu aprobación", "Waiting for your approval"),
        approve: T("Aprobar y publicar", "Approve and publish"),
        edit: T("Editar", "Edit"),
        rule: T("Nada se publica sin tu aprobación.", "Nothing is published without your approval."),
      },
      /** The report scene: the week's figures of §6 and the first thing to do. */
      reportScene: {
        title: T("Semana del 26 oct al 1 nov", "Week of 26 Oct to 1 Nov"),
        figures: { es: [["Consultas recibidas", "25"], ["Respondidas", "23"], ["Visitas pedidas", "6"]], en: [["Enquiries received", "25"], ["Answered", "23"], ["Viewings asked for", "6"]] },
        nextTitle: T("Qué hacer ahora", "What to do now"),
        next: T("Proponer a los Keller una fecha para la valoración.", "Propose a date to the Kellers for the valuation."),
        link: T("Ver el informe completo", "See the full report"),
      },
    },
  },

  /** §19: the report; one example week, the same on /example-report; every block bound to its keys. */
  report: {
    eyebrow: T("Informe", "Report"),
    h2: T("Tu semana, en un informe", "Your week, in one report"),
    lead: T("Qué atendió NuovaSolution, qué sigue abierto y qué hacer después.", "What NuovaSolution handled, what is still open and what to do next."),
    header: T("Agencia de ejemplo · Semana del 26 oct al 1 nov · Demo con datos ficticios", "Example agency · Week of 26 Oct to 1 Nov · Demo with fictional data"),
    chartTitle: T("Consultas por semana", "Enquiries per week"),
    chartNote: T("Cuatro semanas de ejemplo.", "Four example weeks."),
    received: T("Recibidas", "Received"),
    answered: T("Respondidas", "Answered"),
    weeks: { es: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], en: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    series: [{ received: 19, answered: 17 }, { received: 24, answered: 22 }, { received: 21, answered: 20 }, { received: 25, answered: 23 }],
    channelsTitle: T("Por canal", "By channel"),
    channelsNote: T("Las mismas 25, según el canal de llegada.", "The same 25, by the channel they arrived on."),
    /** §19 "Por canal": the target figures (10 · 6 · 3 · 2 · 4 = 25); in public the figures of the channels that are off are added to Email (to WhatsApp if Email is off). */
    channels: (locale: Locale, view: ClaimView): { name: string; v: number; key: ClaimKey }[] => {
      const all: { name: L; v: number; key: ClaimKey }[] = [
        { name: T("WhatsApp", "WhatsApp"), v: 10, key: "replyWhatsapp" },
        { name: T("Email", "E-mail"), v: 6, key: "replyEmail" },
        { name: T("Formulario web", "Web form"), v: 3, key: "webform" },
        { name: T("Teléfono", "Phone"), v: 2, key: "phoneAssistant" },
        { name: T("Portales y anuncios", "Portals and ads"), v: 4, key: "adsLeads" },
      ];
      if (view === "target") return all.map((c) => ({ name: c.name[locale], v: c.v, key: c.key }));
      const on = all.filter((c) => live(c.key, view));
      if (on.length <= 1) return [];
      const onKeys = on.map((c) => c.key);
      // §19: WhatsApp and Email only → 14 · 11 (§6); any other set: the off figures go to Email, else to WhatsApp
      if (onKeys.join() === "replyWhatsapp,replyEmail") return [{ name: all[0].name[locale], v: 14, key: "replyWhatsapp" }, { name: all[1].name[locale], v: 11, key: "replyEmail" }];
      const off = all.filter((c) => !live(c.key, view)).reduce((a, c) => a + c.v, 0);
      const sink = onKeys.includes("replyEmail") ? "replyEmail" : "replyWhatsapp";
      return on.map((c) => ({ name: c.name[locale], v: c.v + (c.key === sink ? off : 0), key: c.key }));
    },
    /** §7 and §19 R-7: the insights (all three hang on `reportTrend`); the top channel's figure follows the channel set of the view. */
    insights: (locale: Locale, view: ClaimView): { k: string; v: string; d: string }[] => {
      const ch = home1103.report.channels(locale, view);
      const top = ch.reduce((a, c) => (c.v > a.v ? c : a), ch[0] ?? { name: "WhatsApp", v: 0, key: "replyWhatsapp" as ClaimKey });
      return [
        { k: T("Tu mejor canal", "Your top channel")[locale], v: locale === "es" ? `${top.name} · ${top.v} de 25 consultas` : `${top.name} · ${top.v} of 25 enquiries`, d: T("El canal por el que llegaron más consultas en la semana.", "The channel that brought the most enquiries in the week.")[locale] },
        { k: T("Hora punta", "Peak hour")[locale], v: T("11:00–12:00 · 6 consultas", "11:00–12:00 · 6 enquiries")[locale], d: T("La franja de una hora en la que llegaron más consultas.", "The one-hour slot in which most enquiries arrived.")[locale] },
        { k: T("De consulta a visita", "Enquiry to viewing")[locale], v: T("24 % · 6 de 25", "24% · 6 of 25")[locale], d: T("Visitas pedidas sobre consultas recibidas. No es una tasa de venta.", "Viewings asked for out of enquiries received. Not a sales rate.")[locale] },
      ];
    },
    /** §6 and §19 R-3/R-4: the figures with their definitions. */
    metrics: {
      es: [
        { k: "Consultas recibidas", d: "Consultas nuevas registradas en la semana.", v: "25" },
        { k: "Respondidas", d: "Consultas con una respuesta automática. Las otras 2 llegaron en otro idioma: no se envía nada automáticamente.", v: "23" },
        { k: "Esperan a una persona", d: "Consultas abiertas que necesitan a alguien del equipo.", v: "2" },
        { k: "Visitas pedidas", d: "Clientes que pidieron ver un inmueble; 4 ya acordadas por el equipo. Pedida no es acordada.", v: "6" },
        { k: "Entregadas al cliente", d: "Si la respuesta llegó al teléfono o al buzón del cliente.", v: "No medido" },
        { k: "Tiempo de respuesta", d: "Minutos entre la consulta y la respuesta.", v: "No medido" },
      ],
      en: [
        { k: "Enquiries received", d: "New enquiries recorded in the week.", v: "25" },
        { k: "Answered", d: "Enquiries with an automatic reply. The other 2 arrived in another language: nothing is sent automatically.", v: "23" },
        { k: "Waiting for a person", d: "Open enquiries that need someone on the team.", v: "2" },
        { k: "Viewings asked for", d: "Customers who asked to see a property; 4 already agreed by the team. Asked is not agreed.", v: "6" },
        { k: "Delivered to the customer", d: "Whether the reply reached the customer's phone or inbox.", v: "Not measured" },
        { k: "Response time", d: "Minutes between the enquiry and the reply.", v: "Not measured" },
      ],
    },
    openTitle: T("Sigue abierto", "Still open"),
    open: { es: ["Peter y Anna Keller · valoración de una villa · falta proponer una fecha", "Sofía Lamas · alquiler desde enero · esperando su respuesta"], en: ["Peter and Anna Keller · villa valuation · a date still to propose", "Sofía Lamas · rental from January · waiting for her reply"] },
    nextTitle: T("Qué hacer ahora", "What to do now"),
    next: { es: ["Proponer a los Keller una fecha para la valoración.", "Recordar a Laura la visita del jueves a las 10:00."], en: ["Propose a date to the Kellers for the valuation.", "Remind Laura of Thursday's 10:00 viewing."] },
    link: T("Ver el informe de ejemplo", "See the example report"),
    example: T("Datos de ejemplo", "Example data"),
  },

  /** §19: the switch "Sin / Con NuovaSolution": one fictional week, the same as above; no €, no %, no revenue line (owner). Keys: replyWhatsapp|replyEmail, crm, replyOutOfHours. */
  compare: {
    keys: ["crm", "replyOutOfHours"] as ClaimKey[],
    without: T("Sin NuovaSolution", "Without NuovaSolution"),
    with: T("Con NuovaSolution", "With NuovaSolution"),
    mark: T("Ejemplo con datos ficticios · la misma semana", "Example with fictional data · the same week"),
    lead: T("25 consultas de la agencia de ejemplo, que abre de 10:00 a 14:00 y de 17:00 a 20:00.", "25 enquiries to the example agency, which is open 10:00 to 14:00 and 17:00 to 20:00."),
    assumption: T("En este ejemplo nadie contesta con la oficina cerrada. Tu agencia puede trabajar de otra forma.", "In this example nobody answers while the office is closed. Your agency may work differently."),
    rows: (locale: Locale, view: ClaimView): { k: string; without: string; with: string; d: string }[] => [
      { k: T("Consultas de la semana", "Enquiries in the week")[locale], without: "25", with: "25", d: T("Las mismas en los dos casos.", "The same in both cases.")[locale] },
      { k: T("Llegaron con la oficina cerrada", "Arrived while the office was closed")[locale], without: "9", with: "9", d: T("Antes de abrir 2, a mediodía 2, después de cerrar 5.", "Before opening 2, at midday 2, after closing 5.")[locale] },
      { k: T("De ellas, pedían visita", "Of those, asking for a viewing")[locale], without: "2", with: "2", d: T("Dos de las 6 visitas pedidas de la semana.", "Two of the week's 6 viewings asked for.")[locale] },
      { k: T("Sin respuesta hasta que abre la oficina", "No reply until the office opens")[locale], without: "9", with: "0", d: T("Con NuovaSolution, esas 9 reciben la respuesta automática al llegar.", "With NuovaSolution, those 9 get the automatic reply when they arrive.")[locale] },
      { k: T("Esperan al día siguiente", "Waiting until the next day")[locale], without: "5", with: "0", d: T("Las que llegaron después de las 20:00.", "Those that arrived after 20:00.")[locale] },
      { k: T("Esperan a una persona para la primera respuesta", "Waiting for a person for the first reply")[locale], without: "25", with: "2", d: T("Con NuovaSolution, las 2 que llegaron en otro idioma.", "With NuovaSolution, the 2 that arrived in another language.")[locale] },
      { k: byKey("priorityWithReason", view, T("En su ficha, con prioridad y motivo", "On their record, with priority and reason"), T("En su ficha", "On their record"))[locale], without: T("lo que alguien anote", "whatever someone notes down")[locale], with: "25", d: T("Las 25, sin copiar nada a mano.", "All 25, with nothing copied by hand.")[locale] },
    ],
    closeWithout: T("9 consultas esperan a que abra la oficina; 5 de ellas, hasta el día siguiente. 2 de esas 9 pedían visita.", "9 enquiries wait for the office to open; 5 of them until the next day. 2 of those 9 were asking for a viewing."),
    closeWith: (view: ClaimView): L => {
      const first = T("Ninguna consulta se pierde de vista: 23 respondidas, 2 esperando a una persona y las 25 en su ficha.", "No enquiry slips out of sight: 23 answered, 2 waiting for a person and all 25 on their record.");
      const second = byKey("reportTrend", view, T("Y cada semana ves de dónde llegan tus clientes, para decidir dónde crecer.", "And each week you see where your clients come from, so you can decide where to grow."), T("Y cada semana ves qué sigue abierto.", "And each week you see what is still open."));
      return T(`${first.es} ${second.es}`, `${first.en} ${second.en}`);
    },
  },

  /** §8, §20: 3D, a separate service; the whole section hangs on `model3d`. */
  model3d: {
    eyebrow: T("Un servicio aparte", "A separate service"),
    h2: T("Presentar un inmueble en 3D", "Present a property in 3D"),
    lead: T("Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado.", "From the measured plan to a model the client can look around, empty and furnished."),
    steps: { es: ["Plano", "Modelo", "Vacío y amueblado", "Entrega"], en: ["Plan", "Model", "Empty and furnished", "Delivery"] },
    example: T("Casa de ejemplo ficticia", "Fictional example house"),
    cta: T("Pregúntanos por el 3D", "Ask us about 3D"),
    pathTitle: T("Tu camino", "Your path"),
    pathLine: T("Tú envías el plano; nosotros construimos el modelo y te entregamos el enlace.", "You send the plan; we build the model and send you the link."),
    path: { es: ["Tú envías el plano", "Nosotros construimos el modelo", "Te entregamos el enlace"], en: ["You send the plan", "We build the model", "We send you the link"] },
    planAlt: T("Plano acotado de la planta baja de la casa de ejemplo, dibujado a escala", "Dimensioned plan of the example house's ground floor, drawn to scale"),
    modelAlt: T("Casa de ejemplo ficticia: la planta baja de cerca, amueblada, vista del visor", "Fictional example house: the ground floor up close, furnished, a view from the viewer"),
    modelFilm: T("Vídeo: la planta baja de la casa de ejemplo dando una vuelta completa · 10 segundos en bucle · sin sonido", "Video: the example house's ground floor in one full turn · 10 seconds on a loop · no sound"),
    modelLine: T("La planta baja, girando.", "The ground floor, turning."),
    mark: T("Casa de ejemplo ficticia, visualización", "Fictional demo house, visualisation"),
    emptyAlt: T("Casa de ejemplo ficticia: el mismo salón vacío, desde la misma cámara", "Fictional example house: the same living room, empty, from the same camera"),
    furnishedAlt: T("Casa de ejemplo ficticia: el mismo salón con mobiliario ilustrativo, desde la misma cámara", "Fictional example house: the same living room with illustrative furnishing, from the same camera"),
    pairLabel: T("Comparar el salón vacío y amueblado desde la misma cámara", "Compare the living room empty and furnished from the same camera"),
    empty: T("Vacío", "Empty"),
    furnished: T("Amueblado", "Furnished"),
    filmTitle: T("La casa entera", "The whole house"),
    filmLine: T("La casa, la planta baja sola, sin muebles y con muebles, cada una girando despacio. 18 segundos, sin sonido.", "The house, the ground floor alone, without and with furniture, each turning slowly. 18 seconds, no sound."),
    film: T("Vídeo: la casa de ejemplo entera · 18 segundos · sin sonido", "Video: the whole example house · 18 seconds · no sound"),
    playFilm: T("Ver la casa entera", "Watch the whole house"),
    loading: T("Cargando el vídeo", "Loading the video"),
  },

  /** §9 and §20 P-1 … P-8: the plans. */
  plans: {
    eyebrow: T("Planes", "Plans"),
    h2: T("Planes", "Plans"),
    /** P-1: the intro (target); the public wording with `plans` off is the block "Qué incluye" (P-5). */
    // Copy 1108 P-2 (target: the table shows; public: the short line alone)
    // 13.11.: "precio en la demo" leaves with the demo offer (Copy 1113 §0); the rest of Copy's P-2 sentence stays
    lead: T("Te explicamos qué plan encaja con tu agencia y su precio antes de acordar nada.", "We explain which plan fits your agency, and its price, before anything is agreed."),
    leadPublic: T("Te decimos el precio para tu agencia antes de acordar nada.", "We tell you the price for your agency before anything is agreed."),
    names: ["Essential", "Growth", "Enterprise"],
    codes: ["essential", "growth", "enterprise"] as const,
    /** §9 the positioning lines; P-6/P-7: Growth and Enterprise name only the parts that are on. */
    lines: (locale: Locale, view: ClaimView): string[] => {
      const growthParts = [live("taskList", view) ? T("tareas", "tasks") : null, live("matching", view) ? T("propuestas", "proposals") : null, live("followup", view) ? T("seguimientos", "follow-ups") : null].filter((x): x is L => !!x).map((x) => x[locale]);
      const entParts = [live("instagram", view) ? "Instagram" : null, live("model3d", view) ? "3D" : null].filter((x): x is string => !!x);
      const join = (p: string[]) => (p.length <= 1 ? p.join("") : `${p.slice(0, -1).join(", ")} ${locale === "es" ? "y" : "and"} ${p[p.length - 1]}`);
      return [
        T("Respuestas, fichas e informe para una oficina.", "Replies, records and report for one office.")[locale],
        growthParts.length ? (locale === "es" ? `Todo lo de Essential, más el trabajo del equipo: ${join(growthParts)}.` : `Everything in Essential, plus the team's work: ${join(growthParts)}.`) : T("Todo lo de Essential, para un equipo más grande.", "Everything in Essential, for a larger team.")[locale],
        entParts.length ? (locale === "es" ? `Todo lo de Growth, para varias oficinas, con ${join(entParts)}.` : `Everything in Growth, for several offices, with ${join(entParts)}.`) : T("Todo lo de Growth, para varias oficinas.", "Everything in Growth, for several offices.")[locale],
      ];
    },
    inherits: T("Cada plan incluye todo lo del anterior.", "Each plan includes everything in the one before."),
    price: T("Te decimos el precio para tu agencia antes de acordar nada.", "We tell you the price for your agency before anything is agreed."),
    /** P-2/P-3: the actions. */
    ctaProposal: T("Solicita una propuesta", "Request a proposal"),
    highlight: { plan: "growth" },
    /** Copy 1113 §6: the badge on the lifted plan. */
    recommended: T("Recomendado", "Recommended"),
    groups: { es: ["Canales", "CRM", "Equipo", "Informes", "Integraciones", "Servicios"], en: ["Channels", "CRM", "Team", "Reporting", "Integrations", "Services"] },
    rows: [
      { g: 0, icon: "reply", key: "replyWhatsapp" as ClaimKey, name: T("Respuestas en español por ⟦canales⟧", "Replies in Spanish on ⟦canales⟧") },
      { g: 0, icon: "languages", key: "languageNoted" as ClaimKey, name: T("Detección del idioma", "Language detection") },
      { g: 0, icon: "mail", key: "labels" as ClaimKey, name: T("Etiquetas en el buzón", "Labels in the mailbox") },
      { g: 0, icon: "whatsapp", key: "whatsappOwnNumber" as ClaimKey, name: T("WhatsApp con el número de tu agencia", "WhatsApp with your agency's own number") },
      { g: 0, icon: "phone", key: "phoneAssistant" as ClaimKey, name: T("Asistente telefónico", "Phone assistant") },
      { g: 0, icon: "instagram", key: "instagram" as ClaimKey, name: T("Publicar en Instagram", "Posting on Instagram") },
      { g: 1, icon: "crm", key: "crm" as ClaimKey, name: T("Ficha en el CRM integrado, con canal de origen", "Record in the built-in CRM, with channel of origin") },
      { g: 1, icon: "priority", key: "priorityWithReason" as ClaimKey, name: T("Prioridad con motivo", "Priority with its reason") },
      { g: 1, icon: "person", key: "oneRecordAcrossChannels" as ClaimKey, name: T("Una ficha por persona entre canales", "One record per person across channels") },
      { g: 2, icon: "alert", key: "alert" as ClaimKey, name: T("Aviso a la persona que toca", "Alert to the right person") },
      { g: 2, icon: "tasks", key: "taskList" as ClaimKey, name: T("Lista de tareas y «¿Qué tengo hoy?»", "Task list and \"What do I have today?\"") },
      { g: 2, icon: "matching", key: "matching" as ClaimKey, name: T("Inmuebles que encajan y seguimiento con permiso", "Listings that fit and follow-up with permission") },
      { g: 3, icon: "report", key: "reportInLogin" as ClaimKey, name: T("Informe en el acceso de tu agencia", "Report in your agency's login") },
      { g: 3, icon: "mail", key: "weeklyEmail" as ClaimKey, name: T("Resumen semanal por email", "Weekly e-mail summary") },
      { g: 3, icon: "trend", key: "reportTrend" as ClaimKey, name: T("Informe ampliado: evolución, canales y conclusiones", "Extended report: trend, channels and insights") },
      { g: 4, icon: "integrations", key: "integrations" as ClaimKey, name: T("HubSpot, Pipedrive, Zoho, Salesforce⟦outlook⟧", "HubSpot, Pipedrive, Zoho, Salesforce⟦outlook⟧") },
      { g: 4, icon: "ads", key: "adsLeads" as ClaimKey, name: T("Leads de portales y anuncios", "Leads from portals and ads") },
      { g: 5, icon: "model3d", key: "model3d" as ClaimKey, name: T("Modelos 3D", "3D models") },
    ],
    /** P-8: Outlook stands in the integrations row only while `outlook` is live. */
    rowName: (name: L, locale: Locale, view: ClaimView): string => withChannels(name[locale].replace("⟦outlook⟧", live("outlook", view) ? ", Outlook" : ""), locale, view),
    legend: T("Un ✓ donde el plan incluye la función.", "A ✓ where the plan includes the function."),
    /** P-5: the block in public while `plans` is off. */
    included: { h2: T("Qué incluye", "What's included"), h2Page: T("Qué incluye NuovaSolution", "What NuovaSolution includes"), leadPage: T("Acceso por invitación. Te decimos el precio para tu agencia antes de acordar nada.", "Access by invitation. We tell you the price for your agency before anything is agreed.") },
  },

  /** Copy 1113 §6: the way in — the free pilot in 3 steps, both views (step 3 follows `mailboxConnection`); §10.1 + §13 N-1: the trust lines. */
  entry: {
    title: T("Piloto gratuito, en 3 pasos", "Free pilot, in 3 steps"),
    titlePublic: T("Piloto gratuito, en 3 pasos", "Free pilot, in 3 steps"),
    steps: (locale: Locale, view: ClaimView): { b: string; t: string }[] => {
      const s = {
        es: [{ b: "Solicita tu piloto.", t: "Hablamos contigo, te enseñamos el sistema y vemos si encaja." }, { b: "Preparamos tu agencia contigo.", t: "Tus datos y tu equipo." }],
        en: [{ b: "Request your pilot.", t: "We talk with you, show you the system and see whether it fits." }, { b: "We set up your agency with you.", t: "Your details and your team." }],
      }[locale];
      const third = live("mailboxConnection", view)
        ? { es: { b: "Conectamos tu buzón contigo.", t: "Lo hacemos juntos y lo probamos con un mensaje real." }, en: { b: "We connect your mailbox with you.", t: "We do it together and test it with a real message." } }
        : { es: { b: "Empiezas el piloto.", t: "Antes, te confirmamos por escrito qué está activo." }, en: { b: "You start the pilot.", t: "Before that, we confirm in writing what is active." } };
      return [...s, third[locale]];
    },
    line: T("Sin método de pago. Las condiciones del piloto, por escrito.", "No payment method. The pilot's terms in writing."),
    small: T("Te decimos antes de empezar si tu buzón ya se puede conectar.", "We tell you before you start whether your mailbox can be connected yet."),
  },
  trust: {
    h2: T("Cómo empezar y qué pasa con los datos", "How to start and what happens with the data"),
    /** N-1 per the keys mailboxConnection and whatsappOwnNumber. */
    line1: (view: ClaimView): L => {
      const m = live("mailboxConnection", view), w = live("whatsappOwnNumber", view);
      if (m && w) return T("Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real.", "We connect your agency's mailbox and WhatsApp with you and test each channel with a real message.");
      if (m) return T("Conectamos contigo el buzón de tu agencia y lo probamos con un mensaje real.", "We connect your agency's mailbox with you and test it with a real message.");
      if (w) return T("Conectamos contigo el WhatsApp de tu agencia y lo probamos con un mensaje real.", "We connect your agency's WhatsApp with you and test it with a real message.");
      return T("Pides acceso y te enseñamos el sistema.", "You request access and we show you the system.");
    },
    lines: {
      es: ["La base de datos está en la Unión Europea (Fráncfort).", "Cada respuesta automática indica que la escribe un asistente."],
      en: ["The database is in the European Union (Frankfurt).", "Every automatic reply says that an assistant wrote it."],
    },
  },

  /** §20: the FAQ of the home page; a question whose key is off is left out; ⟦canales⟧ filled at render. */
  faq: {
    h2: T("Preguntas", "Questions"),
    all: T("Todas las preguntas", "All the questions"),
    items: (locale: Locale, view: ClaimView): { q: string; a: string }[] => {
      const items: { q: L; a: L | null }[] = [
        // Copy 1108 V-4: the voice "en nombre de tu agencia" once a reply leaves the agency's own channel; the earlier answers until then
        { q: T("¿Qué hace NuovaSolution?", "What does NuovaSolution do?"), a: live("mailboxConnection", view) || live("whatsappOwnNumber", view) ? T("Responde en nombre de tu agencia, en español, a las consultas que llegan por ⟦canales⟧, y guarda lo importante de cada una en su ficha, con su prioridad y su motivo.", "It replies on behalf of your agency, in Spanish, to the enquiries that arrive on ⟦canales⟧, and keeps what matters from each one on its record, with its priority and reason.") : byKey("priorityWithReason", view, T("Responde en español las consultas que llegan por ⟦canales⟧ y guarda lo importante de cada una en su ficha, con su prioridad y su motivo.", "It answers the enquiries that arrive on ⟦canales⟧ in Spanish and keeps what matters from each one on its record, with its priority and reason."), T("Responde en español las consultas que llegan por ⟦canales⟧ y guarda lo importante de cada una en su ficha.", "It answers the enquiries that arrive on ⟦canales⟧ in Spanish and keeps what matters from each one on its record.")) },
        { q: T("¿En qué idiomas responde?", "Which languages does it answer in?"), a: byKey("languageNoted", view, T("En español. Detecta el idioma de cada consulta; en otro idioma no se envía nada automáticamente.", "Spanish. It detects each enquiry's language; in another language nothing is sent automatically."), T("En español.", "Spanish.")) },
        { q: T("¿Sabe el cliente que responde un asistente?", "Does the customer know an assistant is answering?"), a: T("Sí. Cada respuesta automática lo indica.", "Yes. Every automatic reply says so.") },
        { q: T("¿Avisa a mi equipo?", "Does it alert my team?"), a: live("alert", view) ? T("Sí. Cuando una consulta es importante, avisa por email a la persona que toca, con el motivo.", "Yes. When an enquiry is important, it alerts the right person by e-mail, with the reason.") : null },
        // Copy 1113 §6: the free pilot, both views
        { q: T("¿Cómo empiezo?", "How do I start?"), a: T("Solicita tu piloto gratuito. Hablamos contigo, te enseñamos el sistema y, si encaja, preparamos tu agencia contigo.", "Request your free pilot. We talk with you, show you the system and, if it fits, set up your agency with you.") },
        { q: T("¿Funciona con mi CRM?", "Does it work with my CRM?"), a: byKey("integrations", view, T("Incluye un CRM. También se conecta con HubSpot, Pipedrive, Zoho y Salesforce.", "It includes a CRM. It also connects to HubSpot, Pipedrive, Zoho and Salesforce."), T("Incluye un CRM.", "It includes a CRM.")) },
        // Copy 1108 P-4
        { q: T("¿Cuánto cuesta?", "What does it cost?"), a: T("El piloto es gratuito. El precio para después del piloto te lo explicamos en la demo, antes de acordar nada.", "The pilot is free. We explain the price for after the pilot in the demo, before anything is agreed.") },
      ];
      return items.filter((it): it is { q: L; a: L } => it.a !== null).map((it) => ({ q: it.q[locale], a: withChannels(it.a[locale], locale, view) }));
    },
  },

  /** §10.3 and §20: the close; the line follows `mailboxConnection`. */
  close: {
    h2: T("Mira cómo NuovaSolution atiende tus consultas", "See how NuovaSolution answers your enquiries"),
    line: (view: ClaimView): L => byKey("mailboxConnection", view, T("Te enseñamos la demo con tus canales y respondemos tus preguntas.", "We show you the demo with your channels and answer your questions."), T("Te enseñamos la demo y respondemos tus preguntas.", "We show you the demo and answer your questions.")),
    ctaDemo: T("Solicita tu piloto gratuito", "Request your free pilot"), // Copy 1113 §0 B-1 (13.11.)
  },

  /** Copy 1108 §3: the block "Quién está detrás" — the same text in both views; the holder's name is filled from the environment at build time, never committed. */
  behind: {
    eyebrow: T("Quién está detrás", "Who is behind it"),
    h2: T("Detrás hay una persona a la que puedes escribir.", "Behind it is a person you can write to."),
    /** {name} = the holder; the sentence is left out when the environment has no name (Copy: no visible placeholder). */
    brand: T("NuovaSolution es una marca de {name}. La hemos hecho para agencias inmobiliarias en España.", "NuovaSolution is a brand of {name}. We built it for real estate agencies in Spain."),
    brandNoName: T("La hemos hecho para agencias inmobiliarias en España.", "We built it for real estate agencies in Spain."),
    pilot: T("Empezamos con un piloto con pocas agencias. Por eso aquí no verás logotipos de clientes, testimonios ni cifras de resultados: los mostraremos cuando sean reales y tengamos permiso para hacerlo.", "We are starting with a pilot with a few agencies. That is why you will not find client logos, testimonials or results figures here: we will show them once they are real and we have permission to."),
    lines: [
      T("Te contesta una persona, en español o en inglés: antonio@nuovasolution.com", "A person answers, in Spanish or English: antonio@nuovasolution.com"),
      T("La base de datos está en la Unión Europea (Fráncfort).", "The database is in the European Union (Frankfurt)."),
      T("Cada respuesta automática indica que la escribe un asistente.", "Every automatic reply says that an assistant wrote it."),
    ],
    cta: T("Solicita tu piloto gratuito", "Request your free pilot"), // Copy 1113 §0 B-1 (13.11.)
  },

  /** The three areas (the owner's P3 of 09.11.): the chapters side by side; the control words are WORKING for Copy (T-13). */
  chapterUi: {
    more: T("Ver {name}", "See {name}"),
    less: T("Cerrar", "Close"),
  },
};

export type Home1103 = typeof home1103;
export const statusOf = claim;
export { V as viewPair, same as sameInBothViews };
