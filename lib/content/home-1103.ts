import { claim, claimWords, type ClaimKey, type ClaimState } from "@/lib/claims";

/**
 * The words of the home page of 03.11.2026 in the round of 05.11. (the owner's verdict and correction of 05.11.; the text source
 * is Copy's WEBSITE_COPY_HANDOVER_1105_v3.md, §2–§10, the only one after the owner's verdict on faf2dbb): the hero, the flow, the
 * ten scenes with their product surfaces, the report, 3D, the plans, trust, the short FAQ and the close. Every status word comes
 * from lib/claims.ts (§1 of the handover). The words inside the product surfaces (`ui`) are the implementer's WORKING lines on the
 * handover's facts. Claims: governance/API_CLAIMS_LINES_1102_v1.md (no "Disponible", no price, no public sign-up, WhatsApp as
 * our own agency's channel, no alert claimed, no contact promise).
 */
type L = Record<"es" | "en", string>;
const T = (es: string, en: string): L => ({ es, en });

export type Status = ClaimState;
export const statusWords = claimWords;

export const home1103 = {
  hero: {
    eyebrow: T("Para agencias inmobiliarias en España", "For real estate agencies in Spain"),
    h1: T("Mientras enseñas, NuovaSolution atiende.", "While you show a home, NuovaSolution answers."),
    // Copy 1105 v3 §2 (the benefit line)
    lead: T("Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha.", "Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record."),
    ctaDemo: T("Ver la demo", "See the demo"),
    ctaContact: T("Pedir acceso", "Request access"),
    access: T("Acceso por invitación mientras preparamos el registro público.", "Access by invitation while public registration is being prepared."),
    // Copy 1105 v3 §2, the three chips (chip 3 replaces "Tu equipo ve la prioridad…": the staff surface is not in production)
    benefits: {
      es: ["Responde en español, también fuera de horario", "Guarda zona, presupuesto e intención", "Marca la prioridad y su motivo"],
      en: ["Replies in Spanish, also out of hours", "Keeps area, budget and intent", "Marks the priority and its reason"],
    },
    /** The hero picture (owner 05.11.: HERO = A; the 3D lane's hero_A of handoff_2026-11-05, with the lane's mandatory mark and alt). */
    image: T("Casa de ejemplo ficticia: salón amueblado, ilustrativo", "Fictional demo house: furnished living room, illustrative"),
    imageMark: T("Casa de ejemplo ficticia, visualización", "Fictional demo house, visualisation"),
    scroll: T("Ver la demo", "See the demo"),
    brandMoment: T("NuovaSolution", "NuovaSolution"),
  },

  /** Copy 1105 v3 §4: the work done, and the human step that remains. */
  flow: {
    eyebrow: T("Cómo funciona", "How it works"),
    h2: T("De la consulta a tu equipo, con el trabajo previo hecho.", "From the enquiry to your team, with the groundwork done."),
    nodes: {
      es: [
        { title: "Llega la consulta", line: "Por WhatsApp o email, a cualquier hora." },
        { title: "NuovaSolution responde", line: "En español, con una pregunta útil de vuelta." },
        { title: "La ficha se completa", line: "Zona, presupuesto, idioma, prioridad y su motivo." },
        { title: "Tu equipo continúa", line: "Llamar, acordar la cita y enseñar el inmueble: eso lo hace una persona." },
      ],
      en: [
        { title: "The enquiry arrives", line: "On WhatsApp or e-mail, at any hour." },
        { title: "NuovaSolution replies", line: "In Spanish, with one useful question back." },
        { title: "The record fills in", line: "Area, budget, language, priority and its reason." },
        { title: "Your team takes over", line: "Calling, agreeing the appointment and showing the property: a person does that." },
      ],
    },
  },

  /** Copy 1105 v3 §5: the ten scenes, each with its state from lib/claims.ts (and the quiet part that comes later). */
  functions: {
    eyebrow: T("Lo que tu agencia gana", "What your agency gains"),
    h2: T("Cada consulta, atendida y en su sitio.", "Every enquiry, answered and in its place."),
    hint: T("Elige una escena", "Choose a scene"),
    progress: T("Escena", "Scene"),
    next: T("Siguiente escena", "Next scene"),
    items: [
      { key: "priority", claim: "priorityWithReason" as ClaimKey, title: T("Leads importantes, con motivo", "Important leads, with a reason"), line: T("La ficha marca la prioridad y por qué. El aviso a la persona que toca llega próximamente.", "The record marks the priority and why. The alert to the right person is coming soon."), soon: { claim: "alert" as ClaimKey, es: "El aviso a la persona que toca", en: "The alert to the right person" } },
      { key: "reply", claim: "replySpanish" as ClaimKey, title: T("Consultas respondidas", "Enquiries answered"), line: T("En español, por WhatsApp y email, también fuera de horario.", "In Spanish, on WhatsApp and e-mail, also out of hours.") },
      { key: "record", claim: "crm" as ClaimKey, title: T("Lo importante, guardado", "What matters, kept"), line: T("Zona, presupuesto, idioma y lo que pide quedan en su ficha, en el CRM integrado.", "Area, budget, language and what they ask for stay on their record, in the built-in CRM.") },
      { key: "origin", claim: "origin" as ClaimKey, title: T("De dónde llega cada consulta", "Where each enquiry comes from"), line: T("La ficha guarda el canal de origen. Portales y anuncios, próximamente.", "The record keeps the channel of origin. Portals and ads, coming soon."), soon: { claim: "adsLeads" as ClaimKey, es: "Portales y anuncios", en: "Portals and ads" } },
      { key: "language", claim: "languageNoted" as ClaimKey, title: T("El idioma de cada cliente", "Each client's language"), line: T("NuovaSolution detecta el idioma y lo guarda. Hoy responde en español; en otro idioma no se envía nada automáticamente.", "NuovaSolution detects the language and keeps it. Today it replies in Spanish; in another language nothing is sent automatically."), soon: { claim: "otherLanguages" as ClaimKey, es: "Respuestas en otros idiomas", en: "Replies in other languages" } },
      { key: "inbox", claim: "labels" as ClaimKey, title: T("Tu buzón, ordenado", "Your inbox, sorted"), line: T("Cada correo llega con su etiqueta: visita, valoración, alquiler.", "Every e-mail arrives with its label: viewing, valuation, rental.") },
      { key: "matching", claim: "matching" as ClaimKey, title: T("Inmuebles que encajan", "Listings that fit"), line: T("NuovaSolution compara lo que busca el cliente con tu cartera y propone solo inmuebles tuyos.", "NuovaSolution compares what the client is looking for with your portfolio and proposes only your own listings.") },
      { key: "followup", claim: "followup" as ClaimKey, title: T("Seguimiento con permiso", "Follow-up with permission"), line: T("Cuando entra un inmueble que encaja, se propone solo si el cliente lo permitió.", "When a listing that fits comes in, it is proposed only if the client allowed it.") },
      { key: "social", claim: "instagram" as ClaimKey, title: T("Publicar en Instagram", "Posting on Instagram"), line: T("Preparas la publicación con los datos del inmueble y sale cuando tú la apruebas.", "You prepare the post with the listing's details and it goes out when you approve it.") },
      { key: "team", claim: "taskList" as ClaimKey, title: T("El día de tu equipo", "Your team's day"), line: T("Cada persona ve sus tareas y por qué va primero cada una, y puede preguntar «¿Qué tengo hoy?».", "Each person sees their tasks and why each comes first, and can ask \"What do I have today?\"."), soon: { claim: "dailyVoice" as ClaimKey, es: "«¿Qué tengo hoy?»", en: "\"What do I have today?\"" } },
    ],
    /** WORKING: the words inside the product surfaces. */
    ui: {
      priority: {
        title: T("Consultas de hoy", "Today's enquiries"),
        rows: {
          es: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "Alta", why: "pide zona, presupuesto y visita" },
            { who: "Carmen Ortega", channel: "Email · 11:24", p: "Alta", why: "propietaria que quiere vender y pide cita" },
            { who: "Sofía Lamas", channel: "Email · 11:31", p: "Media", why: "alquiler con zona y presupuesto, sin fecha" },
          ],
          en: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "High", why: "names area, budget and a viewing" },
            { who: "Carmen Ortega", channel: "E-mail · 11:24", p: "High", why: "an owner who wants to sell and asks for a visit" },
            { who: "Sofía Lamas", channel: "E-mail · 11:31", p: "Medium", why: "a rental with area and budget, no date" },
          ],
        },
        alert: T("Aviso a la persona que toca", "Alert to the right person"),
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
        foot: T("Hora de envío, no de entrega", "Time sent, not delivered"),
      },
      /** Scene 3: Laura's record (the demonstration's fields, Copy §3). */
      record: {
        title: T("Ficha de Laura", "Laura's record"),
        fields: {
          es: [["Intención", "compra"], ["Zona", "Estepona"], ["Dormitorios", "2"], ["Presupuesto", "hasta 320.000 €"], ["Idioma", "español"], ["Canal", "WhatsApp"], ["Visita", "la pide para la semana que viene"]],
          en: [["Intent", "buying"], ["Area", "Estepona"], ["Bedrooms", "2"], ["Budget", "up to €320,000"], ["Language", "Spanish"], ["Channel", "WhatsApp"], ["Viewing", "asked for next week"]],
        },
        priority: T("Prioridad alta · pide zona, presupuesto y visita", "High priority · names area, budget and a viewing"),
        next: T("Siguiente paso: una persona de tu equipo le propone día y hora.", "Next step: someone on your team proposes a day and time."),
      },
      /** Scene 4: the channel of origin on every record. */
      origin: {
        title: T("Canal de origen", "Channel of origin"),
        rows: {
          es: [{ who: "Laura Serrano", what: "Piso de 2 dormitorios en Estepona", origin: "WhatsApp" }, { who: "Carmen Ortega", what: "Valoración de su piso en Fuengirola", origin: "Email" }, { who: "Peter y Anna Keller", what: "Valoración de una villa en Elviria", origin: "Email" }],
          en: [{ who: "Laura Serrano", what: "Two-bedroom flat in Estepona", origin: "WhatsApp" }, { who: "Carmen Ortega", what: "Valuation of her flat in Fuengirola", origin: "E-mail" }, { who: "Peter and Anna Keller", what: "Valuation of a villa in Elviria", origin: "E-mail" }],
        },
        soonRows: { es: ["Portal", "Anuncio"], en: ["Portal", "Ad"] },
      },
      /** Scene 5: the Kellers' record, the language recognised, nothing sent automatically. */
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
        note: T("En el buzón que operamos para ti", "In the mailbox we operate for you"),
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
        /** The small Daily view (after the team's app, staff-v13): the list with the voice bar. */
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
    },
  },

  /** Copy 1105 v3 §6: the report on the home page; one set of example figures, the same on /example-report. */
  report: {
    eyebrow: T("Informe", "Report"),
    h2: T("Tu semana, en un informe", "Your week, in one report"),
    lead: T("Qué atendió NuovaSolution, qué sigue abierto y qué hacer después.", "What NuovaSolution handled, what is still open and what to do next."),
    header: T("Agencia de ejemplo · Semana del 26 oct al 1 nov · WhatsApp y email · Demo con datos ficticios", "Example agency · Week of 26 Oct to 1 Nov · WhatsApp and e-mail · Demo with fictional data"),
    chartTitle: T("Consultas por semana", "Enquiries per week"),
    chartNote: T("Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado: próximamente.", "Four example weeks. The week-by-week trend is part of the extended report: coming soon."),
    received: T("Recibidas", "Received"),
    answered: T("Respondidas", "Answered"),
    weeks: { es: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], en: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    series: [
      { received: 19, answered: 17 },
      { received: 24, answered: 22 },
      { received: 21, answered: 20 },
      { received: 25, answered: 23 },
    ],
    channelsTitle: T("Por canal", "By channel"),
    channelsNote: T("Las mismas 25, según el canal de llegada", "The same 25, by the channel they arrived on"),
    /** §6 "Por canal": WhatsApp and e-mail with their figures (the channels in production); the others only as "Próximamente", no figure invented. */
    channels: {
      es: [{ name: "WhatsApp", v: 14, claim: "replySpanish" as ClaimKey }, { name: "Email", v: 11, claim: "replySpanish" as ClaimKey }, { name: "Formulario web", v: null, claim: "webform" as ClaimKey }, { name: "Teléfono", v: null, claim: "phoneAssistant" as ClaimKey }, { name: "Portales y anuncios", v: null, claim: "adsLeads" as ClaimKey }],
      en: [{ name: "WhatsApp", v: 14, claim: "replySpanish" as ClaimKey }, { name: "E-mail", v: 11, claim: "replySpanish" as ClaimKey }, { name: "Web form", v: null, claim: "webform" as ClaimKey }, { name: "Phone", v: null, claim: "phoneAssistant" as ClaimKey }, { name: "Portals and ads", v: null, claim: "adsLeads" as ClaimKey }],
    },
    /** §7: the insight lines, computed from the figures above; in the agency's report "Próximamente" (report_extended). */
    insights: {
      es: [{ k: "Tu mejor canal", v: "WhatsApp · 14 de 25 consultas", d: "El canal por el que llegaron más consultas en la semana.", claim: "reportTrend" as ClaimKey }, { k: "Hora punta", v: "11:00–12:00 · 6 consultas", d: "La franja de una hora en la que llegaron más consultas.", claim: "reportTrend" as ClaimKey }, { k: "De consulta a visita", v: "24 % · 6 de 25", d: "Visitas pedidas sobre consultas recibidas. No es una tasa de venta.", claim: "reportTrend" as ClaimKey }],
      en: [{ k: "Your top channel", v: "WhatsApp · 14 of 25 enquiries", d: "The channel that brought the most enquiries in the week.", claim: "reportTrend" as ClaimKey }, { k: "Peak hour", v: "11:00–12:00 · 6 enquiries", d: "The one-hour slot in which most enquiries arrived.", claim: "reportTrend" as ClaimKey }, { k: "Enquiry to viewing", v: "24% · 6 of 25", d: "Viewings asked for out of enquiries received. Not a sales rate.", claim: "reportTrend" as ClaimKey }],
    },
    insightsState: T("Estas conclusiones forman parte del informe ampliado: próximamente.", "These insights are part of the extended report: coming soon."),
    metrics: {
      es: [
        { k: "Consultas recibidas", d: "Mensajes nuevos por WhatsApp y email registrados en la semana.", v: "25" },
        { k: "Respondidas", d: "Consultas con una respuesta automática enviada. Las otras 2 llegaron en otro idioma: no se envía nada automáticamente.", v: "23" },
        { k: "Esperan a una persona", d: "Consultas abiertas que necesitan a alguien del equipo.", v: "2" },
        { k: "Visitas pedidas", d: "Clientes que pidieron ver un inmueble; 4 ya acordadas por el equipo. Pedida no es acordada.", v: "6" },
        { k: "Entregadas al cliente", d: "Si la respuesta llegó al teléfono o al buzón del cliente.", v: "No medido" },
        { k: "Tiempo de respuesta", d: "Minutos entre la consulta y la respuesta.", v: "No medido" },
      ],
      en: [
        { k: "Enquiries received", d: "New WhatsApp and e-mail messages recorded in the week.", v: "25" },
        { k: "Answered", d: "Enquiries with an automatic reply sent. The other 2 arrived in another language: nothing is sent automatically.", v: "23" },
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
    state: T("Incluido: el informe en el acceso de tu agencia. Próximamente: el resumen semanal por email y el informe ampliado.", "Included: the report in your agency's login. Coming soon: the weekly e-mail summary and the extended report."),
    example: T("Datos de ejemplo", "Example data"),
    soon: T("próximamente", "coming soon"),
  },

  /** Copy 1105 v3 §8 and the owner's point 9: 3D, a separate service. */
  model3d: {
    eyebrow: T("Un servicio aparte", "A separate service"),
    h2: T("Presentar un inmueble en 3D", "Present a property in 3D"),
    lead: T("Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado.", "From the measured plan to a model the client can look around, empty and furnished."),
    steps: { es: ["Plano", "Modelo", "Vacío y amueblado", "Entrega"], en: ["Plan", "Model", "Empty and furnished", "Delivery"] },
    example: T("Casa de ejemplo ficticia", "Fictional example house"),
    cta: T("Pregúntanos por el 3D", "Ask us about 3D"),
    /** §8: the agent's path (D10), one line; drawn as three stations. */
    pathTitle: T("Tu camino", "Your path"),
    pathLine: T("Tú envías el plano; nosotros construimos el modelo y te entregamos el enlace.", "You send the plan; we build the model and send you the link."),
    path: { es: ["Tú envías el plano", "Nosotros construimos el modelo", "Te entregamos el enlace"], en: ["You send the plan", "We build the model", "We send you the link"] },
    planAlt: T("Plano acotado de la planta baja de la casa de ejemplo, dibujado a escala", "Dimensioned plan of the example house's ground floor, drawn to scale"),
    modelAlt: T("Casa de ejemplo ficticia: la planta baja de cerca, amueblada, vista del visor", "Fictional example house: the ground floor up close, furnished, a view from the viewer"),
    modelFilm: T("Vídeo: la planta baja de la casa de ejemplo dando una vuelta completa · 10 segundos en bucle · sin sonido", "Video: the example house's ground floor in one full turn · 10 seconds on a loop · no sound"),
    modelLine: T("La planta baja, girando.", "The ground floor, turning."),
    /** The 3D lane's mandatory mark on every medium (handoff_2026-11-05). */
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
  },

  /** Copy 1105 v3 §9 and the owner's point 10 (corrected): the plans. */
  plans: {
    eyebrow: T("Planes", "Plans"),
    h2: T("Planes", "Plans"),
    lead: T("Hoy, acceso por invitación. Los planes se podrán contratar con el registro público.", "Today, access by invitation. Plans can be booked once public registration opens."),
    names: ["Essential", "Growth", "Enterprise"],
    codes: ["essential", "growth", "enterprise"] as const,
    /** §9: the positioning, checkable against the table; no badge, no popularity claim. */
    lines: {
      es: ["Respuestas, fichas e informe para una oficina.", "Todo lo de Essential, más el trabajo del equipo: tareas, propuestas y seguimientos.", "Todo lo de Growth, para varias oficinas, con Instagram y 3D."],
      en: ["Replies, records and report for one office.", "Everything in Essential, plus the team's work: tasks, proposals and follow-ups.", "Everything in Growth, for several offices, with Instagram and 3D."],
    },
    inherits: T("Cada plan incluye todo lo del anterior.", "Each plan includes everything in the one before."),
    price: T("Te decimos el precio para tu agencia antes de acordar nada.", "We tell you the price for your agency before anything is agreed."),
    cta: T("Solicita una propuesta", "Request a proposal"),
    /** The owner's point 10: Growth stands out (its column), without a badge (Copy §9). */
    highlight: { plan: "growth" },
    groups: { es: ["Canales", "CRM", "Equipo", "Informes", "Integraciones", "Servicios"], en: ["Channels", "CRM", "Team", "Reporting", "Integrations", "Services"] },
    rows: [
      { g: 0, icon: "reply", key: "replySpanish" as ClaimKey, name: T("Respuestas en español por WhatsApp y email", "Replies in Spanish on WhatsApp and e-mail") },
      { g: 0, icon: "languages", key: "languageNoted" as ClaimKey, name: T("Detección del idioma", "Language detection") },
      { g: 0, icon: "mail", key: "labels" as ClaimKey, name: T("Etiquetas en el buzón", "Labels in the mailbox") },
      { g: 0, icon: "whatsapp", key: "whatsappOwnNumber" as ClaimKey, name: T("WhatsApp con el número de tu agencia", "WhatsApp with your agency's own number") },
      { g: 0, icon: "languages", key: "otherLanguages" as ClaimKey, name: T("Respuestas en otros idiomas", "Replies in other languages") },
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
      { g: 4, icon: "integrations", key: "integrations" as ClaimKey, name: T("HubSpot, Pipedrive, Zoho, Salesforce, Outlook", "HubSpot, Pipedrive, Zoho, Salesforce, Outlook") },
      { g: 4, icon: "ads", key: "adsLeads" as ClaimKey, name: T("Leads de portales y anuncios", "Leads from portals and ads") },
      { g: 5, icon: "model3d", key: "model3d" as ClaimKey, name: T("Modelos 3D", "3D models") },
    ],
    legend: T("Un ✓ solo donde la función está incluida hoy.", "A ✓ only where the function is included today."),
  },

  /** Copy 1105 v3 §10.1 with the addition 702a11d §13 N-1 (no promise of a connection while D5 is not built). */
  trust: {
    h2: T("Cómo empezar y qué pasa con los datos", "How to start and what happens with the data"),
    lines: {
      es: ["Pides acceso y te enseñamos el sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente.", "La base de datos está en la Unión Europea (Fráncfort).", "Cada respuesta automática indica que la escribe un asistente."],
      en: ["You request access and we show you the system. Connecting your agency's mailbox and WhatsApp is coming soon.", "The database is in the European Union (Frankfurt).", "Every automatic reply says that an assistant wrote it."],
    },
  },

  /** Copy 1105 v3 §10.2. */
  faq: {
    h2: T("Preguntas", "Questions"),
    all: T("Todas las preguntas", "All the questions"),
    items: {
      es: [
        { q: "¿Qué hace NuovaSolution?", a: "Responde en español las consultas que llegan por WhatsApp y email y guarda lo importante de cada una en su ficha, con su prioridad y su motivo." },
        { q: "¿En qué idiomas responde?", a: "En español. Detecta el idioma de cada consulta; en otro idioma no se envía nada automáticamente." },
        { q: "¿Sabe el cliente que responde un asistente?", a: "Sí. Cada respuesta automática lo indica." },
        { q: "¿Avisa a mi equipo?", a: "Próximamente. Hoy la prioridad y su motivo quedan en la ficha." },
        { q: "¿Cómo empiezo?", a: "Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días llegan próximamente." },
        { q: "¿Funciona con mi CRM?", a: "Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, próximamente." },
        { q: "¿Cuánto cuesta?", a: "Te decimos el precio para tu agencia antes de acordar nada." },
      ],
      en: [
        { q: "What does NuovaSolution do?", a: "It answers the enquiries that arrive on WhatsApp and e-mail in Spanish and keeps what matters from each one on its record, with its priority and reason." },
        { q: "Which languages does it answer in?", a: "Spanish. It detects each enquiry's language; in another language nothing is sent automatically." },
        { q: "Does the customer know an assistant is answering?", a: "Yes. Every automatic reply says so." },
        { q: "Does it alert my team?", a: "Coming soon. Today the priority and its reason stay on the record." },
        { q: "How do I start?", a: "By invitation today: request access and we will show you the system. Public registration and the 14-day trial are coming soon." },
        { q: "Does it work with my CRM?", a: "It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce, coming soon." },
        { q: "What does it cost?", a: "We tell you the price for your agency before anything is agreed." },
      ],
    },
  },

  /** Copy 1105 v3 §10.3. */
  close: {
    h2: T("Mira cómo NuovaSolution atiende tus consultas", "See how NuovaSolution answers your enquiries"),
    line: T("Te enseñamos la demo con tus canales y respondemos tus preguntas.", "We show you the demo with your channels and answer your questions."),
    ctaDemo: T("Ver la demo", "See the demo"),
    ctaContact: T("Pedir acceso", "Request access"),
  },
};

export type Home1103 = typeof home1103;
export const statusOf = claim;
