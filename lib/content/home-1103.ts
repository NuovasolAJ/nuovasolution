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
    // Copy stage 1 §3.1 (d8ebc77): only Essential has the free 14 days; T-2 "sin tarjeta"
    ctaDemo: T("Prueba Essential gratis", "Try Essential free"),
    pilotLine: T("14 días gratis, sin tarjeta.", "14 days free, no card."),
    pilotLine2: T("Las condiciones, por escrito.", "The terms in writing."), // WORKING (Redesign) for Copy
    /** Copy 1113 §1 S-1: the pain line under the hero, with its mark (S-1m); the figures are the example report's (9 = 2 + 2 + 5 of 25). */
    // 16.11. 14:00 (the owner's point 5): the line stands on its own, the example mark small under it — WORKING for Copy
    pain: { before: T("", ""), figure: T("9 de 25", "9 of 25"), after: T(" consultas llegaron con la oficina cerrada. ¿Quién les contestó?", " enquiries arrived while the office was closed. Who answered them?"), mark: T("Semana de ejemplo · datos ficticios", "Sample week · fictional data") }, // Copy 441ba1c §1 P-h / P-m
    /** §16 H-1 … H-3: the chips per view (chip 1 stays word for word, FRAGE B). */
    chips: (view: ClaimView): L[] => [
      // Copy 1116 §2 L-2 in the target view; the proven line in public until Lead confirms "a tu equipo" (Q-2)
      T("Responde en español. Otros idiomas, a tu equipo.", "Replies in Spanish. Other languages go to your team."), // Copy 441ba1c (owner 16.11.): L-2 in both views; the public fallback is retired
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
      /** The Kellers' record (Copy 88143c1 §2.3, the owner's week of 16.11.: all 25 in Spanish): they write in Spanish and get the automatic reply; the language rule stays on the page through L-1/L-2; a German example may return as its own scene when `otherLanguages` goes live. */
      language: {
        title: T("Ficha de Peter y Anna Keller", "Peter and Anna Keller's record"),
        fields: {
          es: [["Intención", "vender"], ["Zona", "Marbella · Elviria"], ["Inmueble", "villa"], ["Idioma", "español"], ["Respuesta", "automática, en español"]],
          en: [["Intent", "selling"], ["Area", "Marbella · Elviria"], ["Property", "villa"], ["Language", "Spanish"], ["Reply", "automatic, in Spanish"]],
        },
        history: T("Historial", "History"),
        events: {
          es: [{ t: "mar 11:24", ch: "Email", what: "Consulta: quieren vender su villa y piden una valoración" }, { t: "mar 11:25", ch: "Email", what: "Respondida en español · falta proponer una fecha" }],
          en: [{ t: "Tue 11:24", ch: "E-mail", what: "Enquiry: they want to sell their villa and ask for a valuation" }, { t: "Tue 11:25", ch: "E-mail", what: "Answered in Spanish · a date still to propose" }],
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
        figures: { es: [["Consultas recibidas", "25"], ["Respondidas", "25"], ["Visitas pedidas", "6"]], en: [["Enquiries received", "25"], ["Answered", "25"], ["Viewings asked for", "6"]] }, // 16.11. evening (owner): all 25 in Spanish — WORKING, Copy's figures
        nextTitle: T("Qué hacer ahora", "What to do now"),
        next: T("Proponer a los Keller una fecha para la valoración.", "Propose a date to the Kellers for the valuation."),
        link: T("Ver el informe completo", "See the full report"),
      },
    },
  },

  /** §19: the report; one example week, the same on /example-report; every block bound to its keys. */
  report: {
    eyebrow: T("Informe", "Report"),
    // Copy 1113 §4 R-1/R-2 (16.11.): the report shows where the potential is
    h2: T("Dónde está tu potencial", "Where your potential is"),
    lead: T("Cada semana, el informe te enseña qué se atendió, qué sigue abierto y dónde puedes crecer.", "Every week, the report shows you what was handled, what is still open and where you can grow."),
    /** Copy 1113 §4 K-1 … K-3: figure · insight · next step, per view (the target cards hang on reportTrend / adsLeads); the ad-budget limit under K-3 in the target view only. */
    cards: (locale: Locale, view: ClaimView): { figure: string; insight: string; next: string; note?: string }[] => {
      const k1 = { figure: T("9 de 25", "9 of 25"), insight: T("llegaron con la oficina cerrada. Las 9 recibieron respuesta al llegar.", "arrived while the office was closed. All 9 got a reply when they arrived."), next: T("2 pedían visita: proponles una fecha a primera hora.", "2 asked for a viewing: offer them a date first thing.") };
      const target = [
        k1,
        { figure: T("WhatsApp · 10 de 25", "WhatsApp · 10 of 25"), insight: T("es tu canal más fuerte.", "is your strongest channel."), next: T("Pon tu WhatsApp donde te buscan: anuncios, web y escaparate.", "Put your WhatsApp where people look for you: ads, website and shop window.") },
        { figure: T("Portales y anuncios · 4 de 25", "Portals and ads · 4 of 25"), insight: T("Compara antes de invertir más.", "Compare before you spend more."), next: T("Pon al lado lo que pagas por portales y anuncios: el informe cuenta las consultas, el gasto lo sabes tú.", "Set what you pay for portals and ads beside it: the report counts the enquiries, you know the spend."), note: T("El informe te dice de dónde llega cada consulta. Con eso decides dónde invertir; lo que gastas en anuncios no lo mide.", "The report tells you where each enquiry comes from. That helps you decide where to invest; it does not measure what you spend on ads.") },
      ];
      const pub = [
        k1,
        { figure: T("6 de 25", "6 of 25"), insight: T("pidieron visita; 4 ya están acordadas.", "asked for a viewing; 4 are already agreed."), next: T("Propón fecha a las 2 que faltan.", "Offer a date to the 2 still open.") },
        { figure: T("3 de 25", "3 of 25"), insight: T("tienen prioridad alta, cada una con su motivo.", "have high priority, each with its reason."), next: T("Empieza hoy por esas 3.", "Start with those 3 today.") }, // Copy 88143c1 §2.2 (Laura, Carmen, the Kellers)
      ];
      const list = live(["reportTrend", "adsLeads"], view) ? target : pub;
      return list.map((c) => ({ figure: c.figure[locale], insight: c.insight[locale], next: c.next[locale], note: "note" in c && c.note ? c.note[locale] : undefined }));
    },
    cardsNext: T("Qué hacer", "What to do"),
    header: T("Agencia de ejemplo · Semana del 26 oct al 1 nov · Demo con datos ficticios", "Example agency · Week of 26 Oct to 1 Nov · Demo with fictional data"),
    chartTitle: T("Consultas por semana", "Enquiries per week"),
    // Copy 88143c1 §2.4: with 25 of 25 answered the second line shows the enquiries that arrived with the office closed (all answered on arrival)
    chartNote: T("Cuatro semanas de ejemplo. Todas recibieron respuesta al llegar.", "Four example weeks. All got a reply on arrival."),
    received: T("Recibidas", "Received"),
    answered: T("Con la oficina cerrada", "Office closed"),
    weeks: { es: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], en: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    series: [{ received: 19, answered: 7 }, { received: 24, answered: 10 }, { received: 21, answered: 8 }, { received: 25, answered: 9 }], // Copy 88143c1 §2.4: `answered` carries the "office closed" line (7 · 10 · 8 · 9)
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
        { k: "Respondidas", d: "Consultas con una respuesta automática en español, al llegar.", v: "25" }, // Copy 88143c1 §2.2 (the owner's week: all 25 in Spanish)
        { k: "Esperan a una persona", d: "Consultas que todavía no han recibido ninguna respuesta. Esta semana, ninguna.", v: "0" },
        { k: "Visitas pedidas", d: "Clientes que pidieron ver un inmueble; 4 ya acordadas por el equipo. Pedida no es acordada.", v: "6" },
      ],
      en: [
        { k: "Enquiries received", d: "New enquiries recorded in the week.", v: "25" },
        { k: "Answered", d: "Enquiries with an automatic reply in Spanish, on arrival.", v: "25" },
        { k: "Waiting for a person", d: "Enquiries that have not had any reply yet. This week, none.", v: "0" },
        { k: "Viewings asked for", d: "Customers who asked to see a property; 4 already agreed by the team. Asked is not agreed.", v: "6" },
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
    more: T("Ver la semana completa", "See the full week"), // Copy 1113 §4
    less: T("Ver menos", "See less"), // WORKING (Copy): the control's second state
    rows: (locale: Locale, view: ClaimView): { k: string; without: string; with: string; d: string; tone?: "neutral" }[] => [
      { k: T("Consultas de la semana", "Enquiries in the week")[locale], without: "25", with: "25", d: T("Las mismas en los dos casos.", "The same in both cases.")[locale] },
      { k: T("Llegaron con la oficina cerrada", "Arrived while the office was closed")[locale], without: "9", with: "9", d: T("Antes de abrir 2, a mediodía 2, después de cerrar 5.", "Before opening 2, at midday 2, after closing 5.")[locale] },
      { k: T("De ellas, pedían visita", "Of those, asking for a viewing")[locale], without: "2", with: "2", d: T("Dos de las 6 visitas pedidas de la semana.", "Two of the week's 6 viewings asked for.")[locale] },
      { k: T("Sin respuesta hasta que abre la oficina", "No reply until the office opens")[locale], without: "9", with: "0", d: T("Con NuovaSolution, esas 9 reciben la respuesta automática al llegar.", "With NuovaSolution, those 9 get the automatic reply when they arrive.")[locale] },
      { k: T("Esperan al día siguiente", "Waiting until the next day")[locale], without: "5", with: "0", d: T("Las que llegaron después de las 20:00.", "Those that arrived after 20:00.")[locale] },
      { k: T("Esperan a una persona para la primera respuesta", "Waiting for a person for the first reply")[locale], without: "25", with: "0", d: T("Con NuovaSolution, las 25 reciben la primera respuesta en español al llegar.", "With NuovaSolution, all 25 get their first reply in Spanish on arrival.")[locale] }, // Copy 88143c1 §2.2 (the owner's week: all 25 in Spanish; tone normal)
      { k: byKey("priorityWithReason", view, T("En su ficha, con prioridad y motivo", "On their record, with priority and reason"), T("En su ficha", "On their record"))[locale], without: T("lo que alguien anote", "whatever someone notes down")[locale], with: "25", d: T("Las 25, sin copiar nada a mano.", "All 25, with nothing copied by hand.")[locale] },
    ],
    closeWithout: T("9 consultas esperan a que abra la oficina; 5 de ellas, hasta el día siguiente. 2 de esas 9 pedían visita.", "9 enquiries wait for the office to open; 5 of them until the next day. 2 of those 9 were asking for a viewing."),
    closeWith: (view: ClaimView): L => {
      const first = T("Ninguna consulta se pierde de vista: las 25 respondidas al llegar y las 25 en su ficha.", "No enquiry slips out of sight: all 25 answered on arrival and all 25 on their record."); // Copy 88143c1 §2.2
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
    pathMark: T("Ejemplo de conversación", "Example conversation"), // Copy 441ba1c §3 (Q-10 "el jueves" open with 3D)
    /** 16.11. 14:00 (the owner's point 1; D6 decided): the four steps as a short order chat — the agency sends the plan and its wish, we confirm,
     *  the model is ready, the pictures go to listings and social media; supervised, never instant. WORKING for Copy (the step names are Copy 1116 §7.2). */
    pathChat: (locale: Locale): { name: string; from: "agency" | "us"; who: string; text: string; time: string; attach?: string; thumb?: "model" | "pictures" }[] => [
      { name: T("Plano y deseos", "Plan and wishes")[locale], from: "agency", who: T("Tu agencia", "Your agency")[locale], text: T("Os envío el plano. Quiero enseñar el salón y la terraza.", "Here's the floor plan. I want to show the living room and the terrace.")[locale], time: "", attach: "plano-estepona.pdf" },
      { name: T("Confirmamos", "We confirm")[locale], from: "us", who: "NuovaSolution", text: T("Recibido. Te preparamos el modelo de la vivienda, vacío y amueblado. Te avisamos cuando esté listo.", "Got it. We'll build the model of the home, empty and furnished. We'll let you know when it's ready.")[locale], time: "" },
      { name: T("Construimos el modelo", "We build the model")[locale], from: "us", who: "NuovaSolution", text: T("Tu modelo está listo. Entra con tu acceso y míralo.", "Your model is ready. Log in and take a look.")[locale], time: "", thumb: "model" },
      { name: T("Lo ves y compartes las imágenes", "You view it and share the images")[locale], from: "us", who: "NuovaSolution", text: T("Aquí tienes las imágenes para tus anuncios y redes. Van marcadas como visualización.", "Here are the images for your listings and social media. They are marked as a visualisation.")[locale], time: "", thumb: "pictures" },
    ],
    // Copy 1116 §7.2: a guided process in four steps, each with its line, and the note that nothing is created automatically or instantly
    pathLine: T("Cada modelo lo preparamos nosotros. No se crea solo ni al instante.", "Every model is prepared by us. It is not created automatically or instantly."),
    path: { es: ["Plano y deseos", "Confirmamos", "Construimos el modelo", "Lo ves y compartes las imágenes"], en: ["Plan and wishes", "We confirm", "We build the model", "You view it and share the images"] },
    pathLines: {
      es: ["Nos envías el plano y nos cuentas qué quieres enseñar.", "Confirmamos contigo qué incluye el modelo y cuándo te lo entregamos.", "Lo construimos a partir de tu plano y lo revisamos.", "Ves el modelo con tu acceso y usas sus imágenes en tus anuncios y redes."],
      en: ["You send us the plan and tell us what you want to show.", "We confirm with you what the model includes and when we deliver it.", "We build it from your plan and check it.", "You view the model with your login and use its images in your listings and social media."],
    },
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

  /** 16.11. 14:00 (the owner's point 6): two more cards in the areas' style, each with one sentence and one example; public only what is in
   *  production (the owner: both since 13.11.; the keys hang on lib/claims.ts, API's claims line pending — D10). The morning letter
   *  "¿Qué tengo hoy?" waits for Daily's production proof. WORKING for Copy. */
  extraCards: {
    title: T("Y además", "And also"),
    mark: T("Ejemplo · datos ficticios", "Example · fictional data"), // K1-m
    items: [
      { key: "listingLink", keys: ["listingLink"] as ClaimKey[], name: T("Lee el anuncio que te envía el cliente", "It reads the listing the client sends you"), line: T("Si el cliente te manda el enlace de un anuncio, la ficha recoge el precio, los dormitorios y los metros.", "If the client sends you a link to a listing, the record picks up the price, the bedrooms and the square metres."),
        examples: [T("Laura: «Me interesa este piso» + enlace del anuncio", "Laura: \"I'm interested in this flat\" + link to the listing"), T("Ficha: 320.000 € · 2 dormitorios · 85 m²", "Record: €320,000 · 2 bedrooms · 85 m²"), T("Si está disponible, lo confirmas tú.", "Whether it is available, you confirm.")],
        mark: T("Ejemplo · datos ficticios", "Example · fictional data"),
        proof: T("Ficha: 320.000 € · 2 dormitorios · 85 m² · Ejemplo · datos ficticios", "Record: €320,000 · 2 bedrooms · 85 m² · Example · fictional data"), // phone (Copy §10)
        scene: { message: T("Me interesa este piso ", "I'm interested in this flat "), link: T("enlace del anuncio", "link to the listing"), recordLabel: T("Ficha", "Record"), record: T("320.000 € · 2 dormitorios · 85 m²", "€320,000 · 2 bedrooms · 85 m²") } },
      // Copy 1120 §5 (20.11.): K-2 hangs on `reminders` only (the 13:20 step is the chain, not `alert`); under the owner's F1 no mail goes
      // out at two hours — the enquiry passes to the next person. The handover is in production only once Daily's E19 v2 is
      // (HANDOVER_IN_PROD in lib/content/strengths.ts): until then the public view shows the clause as PX-s, the 13:20 step with PX-b
      // and the proof without the handover.
      { key: "reminders", keys: ["reminders"] as ClaimKey[], handover: true, name: T("Ninguna consulta se queda sin aviso", "No enquiry goes unflagged"), line: T("Si nadie del equipo se ocupa de una consulta, al cabo de una hora se lo recordamos a la persona responsable. A las dos horas, la consulta pasa a la siguiente persona.", "If nobody on the team takes an enquiry, after one hour we remind the person responsible. After two hours, the enquiry passes to the next person."),
        examples: [T("11:20 · Laura pide una visita", "11:20 · Laura asks for a viewing"), T("12:20 · Recordatorio a Marta", "12:20 · Reminder to Marta"), T("13:20 · Pasa a Carlos", "13:20 · Passed to Carlos")],
        mark: T("Ejemplo · nombres ficticios", "Example · fictional names"),
        // Copy f13e4b6: E19 v2 runs in production since 20.11. 08:23Z, no real handover observed yet (Daily reports by 18:00) — the target proof names the 20.11., the public proof only the reminder until then
        proof: T("Recordatorio a la hora, en producción desde el 13.11.; el paso a la siguiente persona, desde el 20.11.", "A reminder after one hour, in production since 13.11.; passing it to the next person, since 20.11."), // phone (Copy §10); the handover's observed run is Daily's open proof for Audit
        timeline: [
          { time: "11:20", text: T("Laura pide una visita", "Laura asks for a viewing"), state: "open" as const },
          { time: "12:20", text: T("Recordatorio a Marta", "Reminder to Marta"), state: "remind" as const },
          { time: "13:20", text: T("Pasa a Carlos", "Passed to Carlos"), state: "escalate" as const, handover: true },
        ] },
    ],
  },

  /** Copy 441ba1c §10 (16.11. 14:00): the phone's one core line (≤ 12 words) and one proof line per section; the long paragraphs stay on the desktop. */
  phoneCore: {
    flow: { core: T("Cada consulta recibe respuesta, ficha y siguiente paso.", "Every enquiry gets a reply, a record and a next step."), proof: T("Probado en producción el 13.11.", "Tested in production on 13.11.") },
    areas: (view: ClaimView): Record<"attend" | "organise" | "grow", { core: L; proof: L }> => ({
      attend: !live("whatsappOwnNumber", view)
        ? { core: T("Contesta en minutos por email, también con la oficina cerrada.", "Replies in minutes by email, even with the office closed."), proof: T("Medido en producción: respuesta por email en unos 2 minutos.", "Measured in production: email reply in about 2 minutes.") }
        : { core: T("Contesta en segundos por WhatsApp y en minutos por email.", "Replies in seconds on WhatsApp and in minutes by email."), proof: T("Medido en producción: email en unos 2 minutos, WhatsApp en el mismo minuto.", "Measured in production: email in about 2 minutes, WhatsApp within the same minute.") },
      organise: { core: T("Cada consulta, en su ficha: qué busca, zona y presupuesto.", "Every enquiry on its record: what they want, area and budget."), proof: T("Con su prioridad y el motivo, por ejemplo: «nombró inmueble, zona y presupuesto».", "With its priority and the reason, e.g. \"named a property, an area and a budget\".") },
      grow: { core: T("Ves dónde se te escapa negocio y qué hacer esta semana.", "You see where business slips away and what to do this week."), proof: T("Del informe: consultas con la oficina cerrada, canales y visitas acordadas.", "From the report: enquiries with the office closed, channels and agreed viewings.") },
    }),
    report: { core: T("Tres cosas que mirar esta semana, cada una con su paso.", "Three things to look at this week, each with its step."), proof: T("Informe de ejemplo · datos ficticios", "Example report · fictional data") },
    model3d: { core: T("Tu plano, convertido en un modelo 3D e imágenes para anuncios.", "Your floor plan, turned into a 3D model and listing images."), proof: T("Lo preparamos nosotros. No se crea solo ni al instante.", "Prepared by us. Not created automatically or instantly.") },
    plans: { proof: T("Sin método de pago. Las condiciones, por escrito.", "No payment method. The terms in writing.") },
    entry: { core: T("Prueba Essential gratis durante 14 días.", "Try Essential free for 14 days."), proof: T("Te escribimos para activarla.", "We write to you to set it up.") }, // Copy stage 1 §3.1; the owner ec4181ed: no "24 h"
    close: { proof: T("Sin método de pago. Con tu opinión al final, 7 días más.", "No payment method. With your feedback at the end, 7 more days.") },
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
      const entParts: string[] = []; // 16.11. 14:00 (the owner's point 2): Enterprise's line names no Instagram and no 3D; the Instagram row of the register stays where the view shows it
      const join = (p: string[]) => (p.length <= 1 ? p.join("") : `${p.slice(0, -1).join(", ")} ${locale === "es" ? "y" : "and"} ${p[p.length - 1]}`);
      return [
        T("Respuestas, fichas e informe para una oficina.", "Replies, records and report for one office.")[locale],
        growthParts.length ? (locale === "es" ? `Todo lo de Essential, más el trabajo del equipo: ${join(growthParts)}.` : `Everything in Essential, plus the team's work: ${join(growthParts)}.`) : T("Todo lo de Essential, para un equipo más grande.", "Everything in Essential, for a larger team.")[locale],
        // Copy 31d749b §6.1 (register line 42): offices are no function, the audience is "agencias grandes"
        entParts.length ? (locale === "es" ? `Todo lo de Growth, para agencias grandes, con ${join(entParts)}.` : `Everything in Growth, for larger agencies, with ${join(entParts)}.`) : T("Todo lo de Growth, para agencias grandes.", "Everything in Growth, for larger agencies.")[locale],
      ];
    },
    inherits: T("Cada plan incluye todo lo del anterior.", "Each plan includes everything in the one before."),
    /** 16.11. 14:00 (the owner's point 2, his own words): the line above the table. EN WORKING for Copy. */
    // Copy stage 1 §1/§2 (d8ebc77): the line above the plans; one offer per plan (lib/content/brief-1120.ts `plans.action`); "Empieza 14 días gratis" under Growth is gone
    pilotLine: T("Essential se prueba gratis 14 días, sin tarjeta. Growth empieza con una demo y Enterprise, con una conversación.", "You can try Essential free for 14 days, no card. Growth starts with a demo, Enterprise with a conversation."),
    pilotLinePhone: T("14 días gratis con Essential, sin tarjeta.", "14 days free on Essential, no card."),
    direct: T("Solicitar contratación", "Request this plan"), // the owner's R-4 line (23.11.): the link opens a request form, so it says so; EN per Copy
    wayDirectAria: T("Solicitar la contratación de {plan}", "Request the {plan} plan"),
    price: T("Te decimos el precio para tu agencia antes de acordar nada.", "We tell you the price for your agency before anything is agreed."),
    /** P-2/P-3: the actions. */
    ctaProposal: T("Solicita una propuesta", "Request a proposal"),
    highlight: { plan: "growth" },
    /** Copy 1116 §7.1: the note of the legend for the separately booked 3D service. */
    optionalNote: T("se contrata aparte", "booked separately"),
    // 19.11. (the owner: details by a tap on the phone): the plan card's fold button, Copy 1120 §3 (8cbe48c) with the aria labels per plan
    foldOpen: T("Ver todo lo que incluye", "See everything included"),
    foldClose: T("Ocultar", "Hide"),
    foldOpenAria: T("Ver todo lo que incluye {plan}", "See everything {plan} includes"),
    foldCloseAria: T("Ocultar lo que incluye {plan}", "Hide what {plan} includes"),
    optionalLine: T("La visualización 3D se contrata aparte, con cualquier paquete.", "3D visualisation is booked separately, with any plan."),
    groups: { es: ["Canales", "CRM", "Equipo", "Informes", "Integraciones", "Servicios"], en: ["Channels", "CRM", "Team", "Reporting", "Integrations", "Services"] },
    rows: [
      { g: 0, icon: "reply", key: "replyWhatsapp" as ClaimKey, name: T("Respuestas en español por ⟦canales⟧", "Replies in Spanish on ⟦canales⟧") },
      { g: 0, icon: "languages", key: "languageNoted" as ClaimKey, name: T("Detección del idioma", "Language detection") },
      { g: 0, icon: "mail", key: "mailboxConnection" as ClaimKey, name: T("Tu correo de Gmail o de Outlook", "Your Gmail or Outlook mailbox") }, // Copy 018ba6c §6.4: Outlook is a mailbox, not a CRM
      { g: 0, icon: "mail", key: "labels" as ClaimKey, name: T("Etiquetas en tu bandeja de Gmail", "Labels in your Gmail inbox") }, // Copy 31d749b D-8 (register line 14: Outlook has no labels)
      { g: 0, icon: "whatsapp", key: "whatsappOwnNumber" as ClaimKey, name: T("WhatsApp, con el número de tu agencia o con el nuestro", "WhatsApp, on your agency's number or on ours") }, // Copy 018ba6c §6.4 (register line 3)
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
      // Copy 31d749b D-7 (the owner, 23.11.): no CRM names shown as available; "Conexión con tu CRM" until Copy has the Spanish list
      { g: 4, icon: "integrations", key: "integrations" as ClaimKey, name: T("Conexión con tu CRM", "Connection to your CRM") }, // Copy 018ba6c §6.4: Outlook sits in the mailbox row
      { g: 4, icon: "ads", key: "adsLeads" as ClaimKey, name: T("Leads de portales y anuncios", "Leads from portals and ads") },
      { g: 5, icon: "model3d", key: "model3d" as ClaimKey, name: T("Visualización 3D", "3D visualisation") }, // Copy 1116 §7.1
    ],
    /** P-8: Outlook stands in the integrations row only while `outlook` is live. */
    // RV6 04ea648 (C-4): the replies row fills ⟦canales⟧ from the reply channels only (`only`), the same list its cell reads
    rowName: (name: L, locale: Locale, view: ClaimView, only?: ClaimKey[]): string => withChannels(name[locale].replace("⟦outlook⟧", live("outlook", view) ? (locale === "es" ? " y con Outlook" : " and to Outlook") : ""), locale, view, only),
    /** Copy 1116 §10 W-1: the public wording of the replies row while the agency's own WhatsApp number is not registered (topic 20). */
    // 16.11. 14:00 (the owner's point 8): the public view never mentions the agency's WhatsApp before topic 20 — Copy's W-1 second sentence leaves
    repliesRowPublic: T("Respuestas en español por email.", "Replies in Spanish by email."),
    legend: T("Un ✓ donde el plan incluye la función.", "A ✓ where the plan includes the function."),
    /** P-5: the block in public while `plans` is off. */
    included: { h2: T("Qué incluye", "What's included"), h2Page: T("Qué incluye NuovaSolution", "What NuovaSolution includes"), leadPage: T("Acceso por invitación. Te decimos el precio para tu agencia antes de acordar nada.", "Access by invitation. We tell you the price for your agency before anything is agreed.") },
  },

  /** Copy 1113 §6: the way in — the free pilot in 3 steps, both views (step 3 follows `mailboxConnection`); §10.1 + §13 N-1: the trust lines. */
  entry: {
    // Copy 1116 §4: three steps, each with its result; step 3 in the target view starts with the mailbox line
    // Copy stage 1 §3.1a (d8ebc77): "Cómo empezar con Essential" — the trial activated on request (T-4); the internal gate view keeps the mailbox PX-s in step 2
    title: T("Cómo empezar con Essential: 14 días gratis", "How to start with Essential: 14 days free"),
    titlePublic: T("Cómo empezar con Essential: 14 días gratis", "How to start with Essential: 14 days free"),
    steps: (locale: Locale, view: ClaimView): { b: string; t: string }[] => {
      void view; // the finished product on every customer page (the owner's brief 20.11.); the mailbox connection (A12) is an open launch point for Audit, not a line
      return {
        es: [
          { b: "Pide tu prueba.", t: "Te escribimos y la activamos contigo." },
          { b: "Conecta tu buzón y tu WhatsApp.", t: "Lo probamos con un mensaje real." },
          { b: "Empiezan tus 14 días.", t: "Cada consulta recibe respuesta en español y queda en su ficha, con su prioridad y su motivo." },
        ],
        en: [
          { b: "Request your trial.", t: "We write to you and set it up with you." },
          { b: "Connect your mailbox and your WhatsApp.", t: "We test it with a real message." },
          { b: "Your 14 days begin.", t: "Every enquiry gets a reply in Spanish and lands on its record, with its priority and reason." },
        ],
      }[locale];
    },
    line: T("¿Growth o Enterprise? Te los enseñamos en una demo o en una conversación.", "Growth or Enterprise? We show you in a demo or a conversation."), // Copy stage 1 §3.1a: the line under the steps
    small: T("Te decimos antes de empezar si tu buzón ya se puede conectar.", "We tell you before you start whether your mailbox can be connected yet."),
  },
  trust: {
    h2: T("Cómo empezar y qué pasa con los datos", "How to start and what happens with the data"),
    /** Copy 441ba1c §8 TR-1 … TR-4 (16.11. 14:00): four points, no quotes, no logos, no figures; "Lo cancelas cuando quieras" stays out (Q-11c). */
    points: [
      { t: T("Detrás hay personas", "People behind it"), l: T("Te acompaña una persona del equipo durante la prueba y después, en español o en inglés.", "A person from our team is with you during the trial and after it, in Spanish or English.") }, // Copy stage 1 §3.1
      { t: T("Sin tarjeta", "No card"), l: T("La prueba de Essential es gratuita. No te pedimos tarjeta ni cuenta bancaria.", "The Essential trial is free. We ask for no card and no bank account.") }, // Copy stage 1 §3.1
      { t: T("Tus datos, guardados en la UE", "Your data, stored in the EU"), l: T("La base de datos está en Frankfurt y los servidores, en Alemania. El resto de servicios, en la política de privacidad.", "The database is in Frankfurt and the servers in Germany. The other services are listed in the privacy policy.") },
      { t: T("Las condiciones, por escrito", "The terms in writing"), l: T("Antes de empezar te confirmamos por escrito qué está activo.", "Before you start we confirm in writing what is active.") },
    ],
    /** N-1 per the keys mailboxConnection and whatsappOwnNumber (no longer rendered since 441ba1c §8). */
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
    all: T("Más preguntas", "More questions"), // 16.11. evening (the owner's point 4): four questions on the home page, this link to the rest — WORKING for Copy
    items: (locale: Locale, view: ClaimView): { q: string; a: string }[] => {
      const items: { q: L; a: L | null }[] = [
        // Copy 1108 V-4: the voice "en nombre de tu agencia" once a reply leaves the agency's own channel; the earlier answers until then
        { q: T("¿Qué hace NuovaSolution?", "What does NuovaSolution do?"), a: live("mailboxConnection", view) || live("whatsappOwnNumber", view) ? T("Responde en nombre de tu agencia, en español, a las consultas que llegan por ⟦canales⟧, y guarda lo importante de cada una en su ficha, con su prioridad y su motivo.", "It replies on behalf of your agency, in Spanish, to the enquiries that arrive on ⟦canales⟧, and keeps what matters from each one on its record, with its priority and reason.") : byKey("priorityWithReason", view, T("Responde en español las consultas que llegan por ⟦canales⟧ y guarda lo importante de cada una en su ficha, con su prioridad y su motivo.", "It answers the enquiries that arrive on ⟦canales⟧ in Spanish and keeps what matters from each one on its record, with its priority and reason."), T("Responde en español las consultas que llegan por ⟦canales⟧ y guarda lo importante de cada una en su ficha.", "It answers the enquiries that arrive on ⟦canales⟧ in Spanish and keeps what matters from each one on its record.")) },
        // 16.11. (the owner's line 5, final wording by Copy): replies in Spanish, every language recognised, another language goes to the team
        // Copy 441ba1c L-1; Copy 1120 §5a (c9121b5, the owner's point 4 of 09:05: otherLanguages hidden in BOTH views): no sentence announces more languages — the answer ends after the second sentence in both views
        { q: T("¿En qué idiomas responde?", "Which languages does it reply in?"), a: T("Hoy responde automáticamente solo en español. Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo.", "Today it replies automatically in Spanish only. It recognises the language of every enquiry and, if it is not Spanish, passes it to your team.") },
        { q: T("¿Sabe el cliente que responde un asistente?", "Does the customer know an assistant is answering?"), a: T("Sí. Cada respuesta automática lo indica.", "Yes. Every automatic reply says so.") },
        // the owner, 20.11. 09:05 (1): with `alert` off the question stays with its PX-s as the answer
        { q: T("¿Avisa a mi equipo?", "Does it alert my team?"), a: T("Sí. Cuando una consulta es importante, avisa por email a la persona que toca, con el motivo.", "Yes. When an enquiry is important, it alerts the right person by e-mail, with the reason.") },
        // Copy 1113 §6: the free pilot, both views
        // Copy stage 1 §3.1 (d8ebc77): only Essential has the free 14 days
        { q: T("¿Cómo empiezo?", "How do I start?"), a: T("Con Essential: pides la prueba gratuita de 14 días y te escribimos para activarla. ¿Un equipo más grande? Pide una demo de Growth o habla con nosotros sobre Enterprise.", "With Essential: you request the free 14-day trial and we write to you to set it up. A larger team? Book a Growth demo or talk to us about Enterprise.") }, // Copy 31d749b §6.1
        // Copy 018ba6c §6.4 (D-7): CRMs relevant in Spain, built on request — no automatic "se conecta"
        { q: T("¿Funciona con mi CRM?", "Does it work with my CRM?"), a: byKey("integrations", view, T("Incluye su propio CRM. Si ya trabajas con otro, vemos contigo cómo conectarlo.", "It includes its own CRM. If you already work with another one, we look at connecting it with you."), T("Incluye su propio CRM.", "It includes its own CRM.")) },
        // Copy 018ba6c §6.4 (register line 3): WhatsApp on our number until the agency has its own
        { q: T("¿Necesito un número de WhatsApp Business?", "Do I need a WhatsApp Business number?"), a: T("No. Puedes empezar con el número de WhatsApp de NuovaSolution y pasar al de tu agencia cuando lo tengas.", "No. You can start on NuovaSolution's WhatsApp number and move to your agency's own number when you have one.") },
        { q: T("¿Cuánto cuesta?", "What does it cost?"), a: T("La prueba de Essential es gratuita. El precio de cada plan te lo decimos antes de acordar nada.", "The Essential trial is free. We tell you the price of each plan before anything is agreed.") },
      ];
      return items.filter((it): it is { q: L; a: L } => it.a !== null).map((it) => ({ q: it.q[locale], a: withChannels(it.a[locale], locale, view) }));
    },
  },

  /** §10.3 and §20: the close; the line follows `mailboxConnection`. */
  close: {
    // Copy 1116 §5: the close matches the pilot
    h2: T("14 días con Essential para ver qué consultas se te escapan.", "14 days on Essential to see which enquiries slip away."), // Copy stage 1 §3.1
    line: (_view: ClaimView): L => T("Te enseñamos el sistema, lo preparamos contigo y lo usas en tu agencia con nosotros al lado. Todo por escrito.", "We show you the system, set it up with you, and you use it in your agency with us alongside. All of it in writing."),
    small: T("Sin tarjeta. Las condiciones, por escrito.", "No card. The terms in writing."), // Copy stage 1 T-2; the +7 days on no customer page until the owner's Q-2
    ctaDemo: T("Prueba Essential gratis", "Try Essential free"), // Copy stage 1 §3.1
  },

  /** Copy 1108 §3: the block "Quién está detrás" — the same text in both views; the holder's name is filled from the environment at build time, never committed. */
  behind: {
    eyebrow: T("Quién está detrás", "Who is behind it"),
    h2: T("Detrás hay una persona a la que puedes escribir.", "Behind it is a person you can write to."),
    /** {name} = the holder; the sentence is left out when the environment has no name (Copy: no visible placeholder). */
    brand: T("NuovaSolution es una marca de {name}. La hemos hecho para agencias inmobiliarias en España.", "NuovaSolution is a brand of {name}. We built it for real estate agencies in Spain."),
    brandNoName: T("La hemos hecho para agencias inmobiliarias en España.", "We built it for real estate agencies in Spain."),
    pilot: T("Empezamos con pocas agencias. Por eso aquí no verás logotipos de clientes, testimonios ni cifras de resultados: los mostraremos cuando sean reales y tengamos permiso para hacerlo.", "We are starting with a few agencies. That is why you will not see client logos, testimonials or result figures here: we will show them when they are real and we have permission."), // Copy stage 1 §3.1 (T-3)
    // 16.11.: the address left the sentence for its own row under the lines (the phone's narrow column, the owner's point 2)
    emailLabel: T("Email", "Email"),
    phoneLabel: T("Teléfono", "Phone"), // Copy 1113 §0
    lines: [
      T("Te contesta una persona, en español o en inglés.", "A person answers, in Spanish or English."),
      T("La base de datos está en la Unión Europea (Fráncfort).", "The database is in the European Union (Frankfurt)."),
      T("Cada respuesta automática indica que la escribe un asistente.", "Every automatic reply says that an assistant wrote it."),
    ],
    cta: T("Prueba Essential gratis", "Try Essential free"), // Copy stage 1 §3.1
  },

  /**
   * Copy 1113 §2 (16.11.): every area the same way — one sentence and up to four points; a point whose proof is open shows its public
   * wording or is left out of the public view ("hide"). A-1 is proven by the owner's measurement of 13.11. (Copy a3aa997).
   */
  chapterCopy: {
    attend: {
      line: T("Contesta en cuanto llega la consulta, también de noche y en fin de semana.", "It replies as soon as the enquiry arrives, also at night and at weekends."),
      points: [
        { t: T("Responde en segundos por WhatsApp y en minutos por email.", "Replies within seconds on WhatsApp and within minutes by email."), pub: "text" as const, pubText: T("Responde en minutos por email.", "Replies within minutes by email."), keys: ["whatsappOwnNumber"] as ClaimKey[] }, // Copy 1116 §10 W-2
        { t: T("Entiende qué busca: comprar o alquilar.", "Understands what they want: to buy or rent."), pub: "same" as const }, // the owner 16.11.: "vender" not promised until Lead confirms the intent values (Q-A2)
        { t: T("Todo entra en el CRM: zona, presupuesto, intención y canal, sin copiar nada.", "Everything goes into the CRM: area, budget, intent and channel, with nothing copied by hand."), pub: "same" as const },
        { t: T("Prioridad con su motivo, en cada ficha.", "Priority with its reason, on every record."), pub: "same" as const },
      ],
    },
    organise: {
      line: T("Cada consulta en su ficha, con lo que toca hacer hoy.", "Every enquiry on its record, with what needs doing today."),
      linePublic: T("Cada consulta en su ficha, en orden.", "Every enquiry on its record, in order."),
      points: [
        { t: T("La persona que toca recibe el aviso.", "The right person gets the alert."), pub: "hide" as const, keys: ["alert"] as ClaimKey[] },
        { t: T("Tareas del día: tu equipo sabe qué hacer hoy.", "Today's tasks: your team knows what to do today."), pub: "hide" as const, keys: ["taskList"] as ClaimKey[] },
        { t: T("El canal de origen en cada ficha.", "The channel of origin on every record."), pub: "same" as const },
        { t: T("Hoy responde automáticamente solo en español. Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo.", "Today it replies automatically in Spanish only. It recognises the language of every enquiry and, if it is not Spanish, passes it to your team."), pub: "same" as const }, // Copy 441ba1c: L-1 in both views
      ],
    },
    grow: {
      // Copy 1116 §3: a concrete benefit from the example report, both views
      line: T("Ves dónde se te escapa negocio y qué hacer esta semana.", "You see where business slips away and what to do this week."),
      points: [
        { t: T("Qué entró, qué se contestó y qué sigue esperando a una persona.", "What came in, what was answered and what is still waiting for a person."), pub: "same" as const },
        { t: T("Qué canal te trae más consultas.", "Which channel brings you the most enquiries."), pub: "same" as const },
        { t: T("Cuántas consultas llegaron con la oficina cerrada y quedaron contestadas.", "How many enquiries arrived with the office closed and were answered."), pub: "same" as const },
        { t: T("Cuántas visitas se pidieron y cuántas se acordaron.", "How many viewings were asked for and how many were agreed."), pub: "same" as const },
      ],
    },
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
