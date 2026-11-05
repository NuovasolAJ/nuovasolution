import type { Locale } from "@/lib/i18n/config";
import { claim, claimWords, type ClaimKey, type ClaimState } from "@/lib/claims";

/**
 * The words of the home page (the owner's orders of 03.11. and 05.11.2026; one build for the home page and /packages).
 *
 * Sources: Copy's handover `docs/website_redesign/WEBSITE_COPY_HANDOVER_1102_v2.md` where it has a line; the owner's own
 * wording of 05.11. for the hero's benefit line, the three chips, the WhatsApp reply, the flow's last step and the plans'
 * highlight; the lines marked WORKING are the implementer's and stand for Copy's check. Every status word comes from
 * lib/claims.ts (one file; on launch day one commit there turns "Próximamente" into "Incluido" everywhere). The brand is
 * written "NuovaSolution" throughout (05.11., point 1).
 */
export type L = Record<Locale, string>;
export type Status = ClaimState;
export const statusWords = claimWords;

export const home1103 = {
  hero: {
    eyebrow: { es: "Para agencias inmobiliarias en España", en: "For real estate agencies in Spain" },
    h1: { es: "Mientras enseñas, NuovaSolution atiende.", en: "While you show a home, NuovaSolution answers." },
    // the owner's line of 05.11.
    lead: { es: "Responde al momento cada consulta, la guarda en su ficha y le dice a tu equipo qué hacer primero.", en: "Answers every enquiry at once, keeps it on its record and tells your team what to do first." },
    ctaDemo: { es: "Ver la demo", en: "See the demo" },
    ctaContact: { es: "Pedir acceso", en: "Request access" },
    access: { es: "Acceso por invitación mientras preparamos el registro público.", en: "Access by invitation while public registration is being prepared." },
    // the owner's chips of 05.11.: the benefit, not the technique
    benefits: {
      es: ["Respuesta al momento, también fuera de horario", "Cada consulta, en su ficha", "Prioridad con motivo"],
      en: ["An answer at once, also out of hours", "Every enquiry on its record", "Priority with the reason"],
    },
    film: { es: "Vídeo de fondo: un salón amueblado de la casa de ejemplo ficticia de NuovaSolution, 8 segundos en bucle, sin sonido", en: "Background video: a furnished living room of NuovaSolution's fictional example house, 8 seconds on a loop, no sound" },
    pause: { es: "Pausar el vídeo", en: "Pause the video" },
    play: { es: "Reproducir el vídeo", en: "Play the video" },
    scroll: { es: "Ver la demo", en: "See the demo" },
    brandMoment: { es: "NuovaSolution", en: "NuovaSolution" },
  },

  /** The flow (05.11., point 4): NuovaSolution does the work, the team only closes. */
  flow: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    // PLACEHOLDER (the owner's correction of 05.11.): the final wording comes from Copy, WEBSITE_COPY_HANDOVER_1105_v3; human steps remain
    h2: { es: "NuovaSolution hace el trabajo previo. Tu equipo atiende a las personas.", en: "NuovaSolution does the groundwork. Your team looks after the people." },
    nodes: {
      es: [
        { title: "Llega la consulta", line: "WhatsApp, email, formulario o teléfono" },
        { title: "NuovaSolution", line: "Responde, entiende y guarda" },
        { title: "La ficha", line: "Zona, presupuesto, prioridad y siguiente paso" },
        { title: "Tu equipo", line: "Atiende la visita y decide" }, // PLACEHOLDER until Copy 1105 v3
      ],
      en: [
        { title: "The enquiry arrives", line: "WhatsApp, e-mail, web form or phone" },
        { title: "NuovaSolution", line: "Answers, understands and keeps" },
        { title: "The record", line: "Area, budget, priority and next step" },
        { title: "Your team", line: "Attends the viewing and decides" }, // PLACEHOLDER until Copy 1105 v3
      ],
    },
  },

  /** The eight functions (05.11., points 5–7), each with its state from lib/claims.ts. */
  functions: {
    eyebrow: { es: "Lo que tu agencia gana", en: "What your agency gains" },
    h2: { es: "Cada consulta, atendida y en su sitio.", en: "Every enquiry, answered and in its place." },
    progress: { es: "Escena", en: "Scene" },
    next: { es: "Siguiente escena", en: "Next scene" },
    items: [
      { key: "priority", claim: "priorityWithReason" as ClaimKey, title: { es: "Leads importantes, con motivo", en: "Important leads, with the reason" }, line: { es: "La ficha marca la prioridad de cada consulta y por qué.", en: "The record marks each enquiry's priority and why." }, soon: { claim: "alert" as ClaimKey, es: "El aviso a la persona que toca", en: "The alert to the right person" } },
      { key: "reply", claim: "replySpanish" as ClaimKey, title: { es: "Respuesta al momento", en: "An answer at once" }, line: { es: "También fuera de horario, por WhatsApp y email.", en: "Also out of hours, on WhatsApp and e-mail." } },
      { key: "record", claim: "crm" as ClaimKey, title: { es: "Cada consulta, en su ficha", en: "Every enquiry on its record" }, line: { es: "Zona, presupuesto, idioma y lo que pide, en el CRM integrado. Cualquier idioma se reconoce y se anota.", en: "Area, budget, language and the ask, in the built-in CRM. Any language is recognised and noted." }, soon: { claim: "otherLanguages" as ClaimKey, es: "La respuesta en otros idiomas", en: "Replies in other languages" } },
      { key: "inbox", claim: "labels" as ClaimKey, title: { es: "Orden en el buzón", en: "Order in the mailbox" }, line: { es: "Etiquetas automáticas en cada consulta y de dónde viene: portal, anuncio o tu web.", en: "Automatic labels on every enquiry and where it comes from: a portal, an ad or your website." }, soon: { claim: "origin" as ClaimKey, es: "El origen en la ficha", en: "The origin on the record" } },
      { key: "matching", claim: "matching" as ClaimKey, title: { es: "Inmuebles que encajan", en: "Listings that fit" }, line: { es: "NuovaSolution compara lo que busca Laura con tu cartera y propone solo inmuebles tuyos.", en: "NuovaSolution compares what Laura is looking for with your portfolio and proposes only your own listings." } },
      { key: "followup", claim: "followup" as ClaimKey, title: { es: "Seguimiento con permiso", en: "Follow-up with permission" }, line: { es: "Un inmueble nuevo que encaja se propone solo con permiso del cliente.", en: "A new listing that fits is proposed only with the customer's permission." } },
      { key: "team", claim: "taskList" as ClaimKey, title: { es: "El día de tu equipo", en: "Your team's day" }, line: { es: "Cada persona ve sus tareas con el motivo y pregunta en voz alta: «¿Qué tengo hoy?»", en: "Each person sees their tasks with the reason and asks out loud: \"What do I have today?\"" } },
      { key: "social", claim: "instagram" as ClaimKey, title: { es: "Publicar en Instagram", en: "Posting on Instagram" }, line: { es: "NuovaSolution prepara la publicación de un inmueble; tú la apruebas antes de que salga.", en: "NuovaSolution prepares a listing's post; you approve it before it goes out." } },
    ],
    /** WORKING: the words inside the product surfaces. */
    ui: {
      priority: {
        title: { es: "Consultas de hoy", en: "Today's enquiries" },
        rows: {
          es: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "Alta", why: "pide zona, presupuesto y visita" },
            { who: "Carmen Ortega", channel: "Email · 11:24", p: "Alta", why: "propietaria que quiere vender y pide cita" },
            { who: "Sofía Lamas", channel: "Formulario web · 11:31", p: "Media", why: "alquiler con zona y presupuesto, sin fecha" },
          ],
          en: [
            { who: "Laura Serrano", channel: "WhatsApp · 11:20", p: "High", why: "names area, budget and a viewing" },
            { who: "Carmen Ortega", channel: "E-mail · 11:24", p: "High", why: "an owner who wants to sell and asks for a visit" },
            { who: "Sofía Lamas", channel: "Web form · 11:31", p: "Medium", why: "a rental with area and budget, no date" },
          ],
        },
        alert: { es: "Aviso a Elena", en: "Alert to Elena" },
      },
      reply: {
        title: { es: "Respondidas hoy", en: "Answered today" },
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
        foot: { es: "Hora de envío, no de entrega", en: "Time sent, not delivered" },
      },
      record: {
        title: { es: "Ficha de Peter y Anna Keller", en: "Peter and Anna Keller's record" },
        fields: {
          es: [["Intención", "vender"], ["Zona", "Marbella · Elviria"], ["Inmueble", "villa"], ["Presupuesto", "valoración pedida"], ["Idioma", "alemán · reconocido"], ["Visita", "valoración esta semana"]],
          en: [["Intent", "selling"], ["Area", "Marbella · Elviria"], ["Property", "villa"], ["Budget", "valuation asked for"], ["Language", "German · recognised"], ["Visit", "valuation this week"]],
        },
        history: { es: "Historial", en: "History" },
        events: {
          es: [{ t: "mar 11:24", ch: "Email", what: "Consulta en alemán: quieren vender su villa" }, { t: "mar 11:24", ch: "Email", what: "Idioma reconocido: alemán · respuesta para una persona" }],
          en: [{ t: "Tue 11:24", ch: "E-mail", what: "Enquiry in German: they want to sell their villa" }, { t: "Tue 11:24", ch: "E-mail", what: "Language recognised: German · reply left to a person" }],
        },
      },
      inbox: {
        title: { es: "Buzón de la agencia", en: "The agency's mailbox" },
        rows: {
          es: [
            { from: "Laura Serrano", subject: "Piso de 2 dormitorios en Estepona", label: "Compra · Estepona", origin: "Portal", soon: false },
            { from: "Carmen Ortega", subject: "Valoración de mi piso en Fuengirola", label: "Venta · Valoración", origin: "Web", soon: false },
            { from: "Sofía Lamas", subject: "Alquiler de larga temporada", label: "Alquiler · Fuengirola", origin: "Anuncio", soon: false },
          ],
          en: [
            { from: "Laura Serrano", subject: "Two-bedroom flat in Estepona", label: "Buying · Estepona", origin: "Portal", soon: false },
            { from: "Carmen Ortega", subject: "Valuation of my flat in Fuengirola", label: "Selling · Valuation", origin: "Website", soon: false },
            { from: "Sofía Lamas", subject: "Long-term rental", label: "Rental · Fuengirola", origin: "Ad", soon: false },
          ],
        },
        originHead: { es: "Origen", en: "Origin" },
        labelHead: { es: "Etiqueta", en: "Label" },
      },
      matching: {
        title: { es: "Encajan con Laura · de tu cartera", en: "Fit Laura · from your portfolio" },
        because: { es: "Estepona · 2 dormitorios · hasta 320.000 €", en: "Estepona · 2 bedrooms · up to €320,000" },
        rows: {
          es: [{ ref: "EST-204", t: "Piso de 2 dormitorios con terraza", place: "Estepona · zona puerto", price: "315.000 €", fit: "zona, dormitorios, precio", photo: "/media/world/listing-est204.webp", alt: "Salón abierto a una terraza · foto de muestra" }, { ref: "EST-231", t: "Ático de 2 dormitorios con vistas", place: "Estepona · Seghers", price: "319.000 €", fit: "zona, dormitorios, precio", photo: "/media/world/listing-est231.webp", alt: "Edificio blanco con balcones · foto de muestra" }],
          en: [{ ref: "EST-204", t: "Two bedroom flat with terrace", place: "Estepona · marina area", price: "€315,000", fit: "area, bedrooms, price", photo: "/media/world/listing-est204.webp", alt: "Living room opening onto a terrace · sample photo" }, { ref: "EST-231", t: "Two bedroom penthouse with views", place: "Estepona · Seghers", price: "€319,000", fit: "area, bedrooms, price", photo: "/media/world/listing-est231.webp", alt: "White building with balconies · sample photo" }],
        },
        action: { es: "Proponer a Laura", en: "Propose to Laura" },
        photoNote: { es: "Fotos de muestra", en: "Sample photos" },
      },
      followup: {
        title: { es: "Nuevo en tu cartera", en: "New in your portfolio" },
        listing: { es: "EST-240 · Piso de 2 dormitorios · Estepona · 309.000 €", en: "EST-240 · Two bedroom flat · Estepona · €309,000" },
        photo: "/media/world/listing-est240.webp",
        fits: { es: "Encaja con Laura: zona, dormitorios y presupuesto", en: "Fits Laura: area, bedrooms and budget" },
        permission: { es: "Permiso de Laura para avisos: sí · martes 11:23", en: "Laura's permission for updates: yes · Tuesday 11:23" },
        action: { es: "Enviar la propuesta por email", en: "Send the proposal by e-mail" },
        noPermission: { es: "Sin permiso no se envía nada.", en: "Without permission nothing is sent." },
      },
      team: {
        title: { es: "Elena · miércoles", en: "Elena · Wednesday" },
        rows: {
          es: [{ kind: "Visita pedida", who: "Laura Serrano · WhatsApp", why: "nombró inmueble, zona y presupuesto", step: "Proponerle día y hora", state: "Abierta" }, { kind: "Valoración", who: "Carmen Ortega · Email", why: "propietaria que pide cita esta semana", step: "Proponer una fecha", state: "Abierta" }, { kind: "Rellamada", who: "Álvaro Pons · Teléfono", why: "pidió que le llamen por la tarde", step: "Llamar a partir de las 16:00", state: "Tomada · Marcos" }],
          en: [{ kind: "Viewing requested", who: "Laura Serrano · WhatsApp", why: "named a property, an area and a budget", step: "Propose a day and time", state: "Open" }, { kind: "Valuation", who: "Carmen Ortega · E-mail", why: "an owner asking for a visit this week", step: "Propose a date", state: "Open" }, { kind: "Callback", who: "Álvaro Pons · Phone", why: "asked to be called in the afternoon", state: "Taken · Marcos", step: "Call from 16:00" }],
        },
        take: { es: "Tomar", en: "Take" },
        taken: { es: "Tomada · Elena", en: "Taken · Elena" },
        assistant: { es: "Primero Laura: pidió visita y nombró zona y presupuesto.", en: "Laura first: she asked for a viewing and named area and budget." },
        /** The small Daily view (after the team's app, staff-v13): the list with the voice bar. */
        daily: {
          title: { es: "Tareas · Elena", en: "Tasks · Elena" },
          app: { es: "La app del equipo", en: "The team's app" },
          sections: { es: ["Urgentes (1)", "Hoy (2)"], en: ["Urgent (1)", "Today (2)"] },
          question: { es: "¿Qué tengo hoy?", en: "What do I have today?" },
          answer: { es: "Tienes 3 tareas. Primero Laura Serrano: pidió visita y nombró zona y presupuesto. Después la valoración de Carmen Ortega y la llamada a Álvaro Pons a partir de las 16:00.", en: "You have 3 tasks. Laura Serrano first: she asked for a viewing and named area and budget. Then Carmen Ortega's valuation and the call to Álvaro Pons from 16:00." },
          mic: { es: "Pregunta en voz alta", en: "Ask out loud" },
          close: { es: "Cerrar", en: "Close" },
          note: { es: "Vista de ejemplo de la app del equipo", en: "Example view of the team's app" },
        },
      },
      social: {
        title: { es: "Instagram · publicación preparada", en: "Instagram · post prepared" },
        listing: { es: "Villa con piscina y vistas al mar · Marbella · Elviria", en: "Villa with pool and sea views · Marbella · Elviria" },
        photo: "/media/world/listing-est118.webp",
        caption: { es: "Villa con piscina y vistas al mar en Elviria. Tres dormitorios, terraza al sur. Visitas con cita. #Marbella #Elviria", en: "Villa with pool and sea views in Elviria. Three bedrooms, south-facing terrace. Viewings by appointment. #Marbella #Elviria" },
        state: { es: "Pendiente de tu aprobación", en: "Waiting for your approval" },
        approve: { es: "Aprobar y publicar", en: "Approve and publish" },
        edit: { es: "Editar", en: "Edit" },
        rule: { es: "Nada se publica sin tu aprobación.", en: "Nothing is published without your approval." },
      },
    },
  },

  /** Copy §4 and the owner's point 8: the report. */
  report: {
    eyebrow: { es: "Informe", en: "Report" },
    h2: { es: "Tu semana, en un informe", en: "Your week, in one report" },
    lead: { es: "Qué atendió NuovaSolution, qué sigue abierto y qué hacer después.", en: "What NuovaSolution handled, what is still open and what to do next." },
    header: { es: "Agencia de ejemplo · Semana del 26 oct al 1 nov · Demo con datos ficticios", en: "Example agency · Week of 26 Oct to 1 Nov · Demo with fictional data" },
    chartTitle: { es: "Consultas por semana", en: "Enquiries per week" },
    chartNote: { es: "Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado.", en: "Four example weeks. The week-by-week trend is part of the extended report." },
    received: { es: "Recibidas", en: "Received" },
    answered: { es: "Respondidas", en: "Answered" },
    weeks: { es: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], en: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    series: [
      { received: 19, answered: 17 },
      { received: 24, answered: 22 },
      { received: 21, answered: 20 },
      { received: 25, answered: 23 },
    ],
    channelsTitle: { es: "Por canal", en: "By channel" },
    /** 05.11., point 8: every channel, the ones not live marked quietly. */
    channels: {
      es: [{ name: "WhatsApp", v: 13, claim: "replySpanish" as ClaimKey }, { name: "Email", v: 9, claim: "replySpanish" as ClaimKey }, { name: "Formulario web", v: 2, claim: "webform" as ClaimKey }, { name: "Teléfono", v: 1, claim: "phoneAssistant" as ClaimKey }, { name: "Instagram", v: 0, claim: "instagram" as ClaimKey }],
      en: [{ name: "WhatsApp", v: 13, claim: "replySpanish" as ClaimKey }, { name: "E-mail", v: 9, claim: "replySpanish" as ClaimKey }, { name: "Web form", v: 2, claim: "webform" as ClaimKey }, { name: "Phone", v: 1, claim: "phoneAssistant" as ClaimKey }, { name: "Instagram", v: 0, claim: "instagram" as ClaimKey }],
    },
    /** 05.11., point 8: three insights the product can measure (received per channel, the hour of each enquiry, viewings asked for). */
    insights: {
      es: [{ k: "Tu mejor canal", v: "WhatsApp · 13 de 25", claim: "reportInLogin" as ClaimKey }, { k: "Hora punta de consultas", v: "11–13 h", claim: "reportTrend" as ClaimKey }, { k: "De consulta a visita", v: "4 de 25 piden visita", claim: "reportInLogin" as ClaimKey }],
      en: [{ k: "Your best channel", v: "WhatsApp · 13 of 25", claim: "reportInLogin" as ClaimKey }, { k: "Peak hour of enquiries", v: "11–13 h", claim: "reportTrend" as ClaimKey }, { k: "From enquiry to viewing", v: "4 of 25 ask for a viewing", claim: "reportInLogin" as ClaimKey }],
    },
    metrics: {
      es: [
        { k: "Consultas recibidas", d: "Mensajes nuevos registrados en la semana.", v: "25" },
        { k: "Respondidas", d: "Consultas con una respuesta automática enviada.", v: "23" },
        { k: "Esperan a una persona", d: "Consultas abiertas que necesitan a alguien del equipo.", v: "2" },
        { k: "Visitas pedidas", d: "Clientes que pidieron ver un inmueble. Pedida no es acordada.", v: "4" },
        { k: "Entregadas al cliente", d: "Si la respuesta llegó al teléfono o al buzón del cliente.", v: "No medido" },
        { k: "Tiempo de respuesta", d: "Minutos entre la consulta y la respuesta.", v: "No medido" },
      ],
      en: [
        { k: "Enquiries received", d: "New messages recorded in the week.", v: "25" },
        { k: "Answered", d: "Enquiries with an automatic reply sent.", v: "23" },
        { k: "Waiting for a person", d: "Open enquiries that need someone on the team.", v: "2" },
        { k: "Viewings asked for", d: "Customers who asked to see a property. Asked is not agreed.", v: "4" },
        { k: "Delivered to the customer", d: "Whether the reply reached the customer's phone or inbox.", v: "Not measured" },
        { k: "Response time", d: "Minutes between the enquiry and the reply.", v: "Not measured" },
      ],
    },
    openTitle: { es: "Sigue abierto", en: "Still open" },
    open: { es: ["Peter y Anna Keller · valoración de una villa · falta proponer una fecha", "Sofía Lamas · alquiler desde enero · esperando su respuesta"], en: ["Peter and Anna Keller · villa valuation · a date still to propose", "Sofía Lamas · rental from January · waiting for her reply"] },
    nextTitle: { es: "Qué hacer ahora", en: "What to do now" },
    next: { es: ["Proponer a los Keller una fecha para la valoración.", "Recordar a Laura la visita del jueves a las 10:00."], en: ["Propose a date to the Kellers for the valuation.", "Remind Laura of Thursday's 10:00 viewing."] },
    link: { es: "Ver el informe de ejemplo", en: "See the example report" },
    state: { es: "Incluido: el informe en el acceso de tu agencia. Próximamente: el resumen semanal por email.", en: "Included: the report in your agency's login. Coming soon: the weekly e-mail summary." },
    example: { es: "Datos de ejemplo", en: "Example data" },
    soon: { es: "próximamente", en: "coming soon" },
  },

  /** Copy §5 and the owner's point 9: 3D, a separate service. */
  model3d: {
    eyebrow: { es: "Un servicio aparte", en: "A separate service" },
    h2: { es: "Presentar un inmueble en 3D", en: "Present a property in 3D" },
    lead: { es: "Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado.", en: "From the measured plan to a model the client can look around, empty and furnished." },
    steps: { es: ["Plano", "Modelo", "Vacío y amueblado", "Entrega"], en: ["Plan", "Model", "Empty and furnished", "Delivery"] },
    status: { es: "Próximamente · todavía no contratable", en: "Coming soon · not bookable yet" },
    example: { es: "Casa de ejemplo ficticia", en: "Fictional example house" },
    cta: { es: "Pregúntanos por el 3D", en: "Ask us about 3D" },
    /** 05.11., point 9: the broker's simple path. */
    pathTitle: { es: "El camino, en tres pasos", en: "The path, in three steps" },
    path: { es: ["Subes el plano en la app", "Te preguntamos lo que falte", "Recibes el enlace"], en: ["You upload the plan in the app", "We ask what is missing", "You receive the link"] },
    planAlt: { es: "Plano acotado de la planta baja de la casa de ejemplo, dibujado a escala", en: "Dimensioned plan of the example house's ground floor, drawn to scale" },
    modelAlt: { es: "Casa de ejemplo ficticia: la planta baja de cerca, amueblada, vista del visor", en: "Fictional example house: the ground floor up close, furnished, a view from the viewer" },
    modelFilm: { es: "Vídeo: la planta baja de la casa de ejemplo girando en el visor · 13 segundos · sin sonido", en: "Video: the example house's ground floor turning in the viewer · 13 seconds · no sound" },
    modelLine: { es: "La planta baja, girando. Grabado del visor real.", en: "The ground floor, turning. Recorded from the real viewer." },
    emptyAlt: { es: "Casa de ejemplo ficticia: el mismo salón vacío, desde la misma cámara", en: "Fictional example house: the same living room, empty, from the same camera" },
    furnishedAlt: { es: "Casa de ejemplo ficticia: el mismo salón con mobiliario ilustrativo, desde la misma cámara", en: "Fictional example house: the same living room with illustrative furnishing, from the same camera" },
    pairLabel: { es: "Comparar el salón vacío y amueblado desde la misma cámara", en: "Compare the living room empty and furnished from the same camera" },
    empty: { es: "Vacío", en: "Empty" },
    furnished: { es: "Amueblado", en: "Furnished" },
    filmTitle: { es: "La casa entera", en: "The whole house" },
    filmLine: { es: "Las dos plantas, luego cada planta, con y sin muebles. Grabado del visor real, 25 segundos, sin sonido.", en: "Both floors, then each floor, with and without furniture. Recorded from the real viewer, 25 seconds, no sound." },
    film: { es: "Vídeo: la casa de ejemplo entera en el visor · 25 segundos · sin sonido", en: "Video: the whole example house in the viewer · 25 seconds · no sound" },
    playFilm: { es: "Ver la casa entera", en: "Watch the whole house" },
  },

  /** Copy §6.1 and the owner's point 10: the plans. */
  plans: {
    eyebrow: { es: "Planes", en: "Plans" },
    h2: { es: "Planes", en: "Plans" },
    lead: { es: "Hoy, acceso por invitación. Los planes se podrán contratar con el registro público, próximamente.", en: "Today, access by invitation. Plans can be booked once public registration opens, coming soon." },
    names: ["Essential", "Growth", "Enterprise"],
    codes: ["essential", "growth", "enterprise"] as const,
    who: { es: ["Una oficina y un equipo pequeño", "Un equipo que crece", "Varias oficinas"], en: ["One office and a small team", "A growing team", "Several offices"] },
    inherits: { es: "Cada plan incluye todo lo del anterior.", en: "Each plan includes everything in the one before." },
    price: { es: "Te decimos el precio para tu agencia antes de acordar nada.", en: "We tell you the price for your agency before anything is agreed." },
    cta: { es: "Solicita una propuesta", en: "Request a proposal" },
    /** 05.11., point 10, corrected the same day: Growth stands out, but is not called "the most complete" (Enterprise holds more); the line is a PLACEHOLDER until Copy's WEBSITE_COPY_HANDOVER_1105_v3. */
    highlight: { plan: "growth", es: "Plan destacado", en: "Highlighted plan" },
    groups: { es: ["Canales", "CRM", "Equipo", "Informes", "Integraciones", "Servicios"], en: ["Channels", "CRM", "Team", "Reporting", "Integrations", "Services"] },
    rows: [
      { g: 0, icon: "reply", key: "replySpanish" as ClaimKey, name: { es: "Respuestas en español por WhatsApp y email", en: "Replies in Spanish on WhatsApp and e-mail" } },
      { g: 0, icon: "whatsapp", key: "whatsappOwnNumber" as ClaimKey, name: { es: "WhatsApp con el número de tu agencia", en: "WhatsApp with your agency's own number" } },
      { g: 0, icon: "languages", key: "otherLanguages" as ClaimKey, name: { es: "Otros idiomas", en: "Other languages" } },
      { g: 0, icon: "phone", key: "phoneAssistant" as ClaimKey, name: { es: "Asistente telefónico", en: "Phone assistant" } },
      { g: 0, icon: "instagram", key: "instagram" as ClaimKey, name: { es: "Instagram: publicar y comentarios", en: "Instagram: posts and comments" } },
      { g: 1, icon: "crm", key: "crm" as ClaimKey, name: { es: "CRM integrado: fichas e historial", en: "Built-in CRM: records and history" } },
      { g: 1, icon: "person", key: "oneRecordAcrossChannels" as ClaimKey, name: { es: "Una ficha por persona entre WhatsApp y email", en: "One record per person across WhatsApp and e-mail" } },
      { g: 2, icon: "alert", key: "alert" as ClaimKey, name: { es: "Aviso de consultas importantes", en: "Alert for important enquiries" } },
      { g: 2, icon: "tasks", key: "taskList" as ClaimKey, name: { es: "Lista de tareas y asistente de la mañana", en: "Task list and morning assistant" } },
      { g: 2, icon: "matching", key: "matching" as ClaimKey, name: { es: "Propuestas de tu cartera y seguimientos", en: "Proposals from your portfolio and follow-ups" } },
      { g: 3, icon: "report", key: "reportInLogin" as ClaimKey, name: { es: "Informe en el acceso de tu agencia", en: "Report in your agency's login" } },
      { g: 3, icon: "mail", key: "weeklyEmail" as ClaimKey, name: { es: "Resumen semanal por email", en: "Weekly e-mail summary" } },
      { g: 3, icon: "trend", key: "reportTrend" as ClaimKey, name: { es: "Informe con evolución y canales", en: "Report with trend and channels" } },
      { g: 4, icon: "integrations", key: "integrations" as ClaimKey, name: { es: "HubSpot, Pipedrive, Zoho, Salesforce, Outlook", en: "HubSpot, Pipedrive, Zoho, Salesforce, Outlook" } },
      { g: 4, icon: "ads", key: "adsLeads" as ClaimKey, name: { es: "Leads de tus anuncios actuales", en: "Leads from your existing ads" } },
      { g: 5, icon: "model3d", key: "model3d" as ClaimKey, name: { es: "Modelos 3D", en: "3D models" } },
    ],
    legend: { es: "Un ✓ solo donde la función está incluida hoy.", en: "A ✓ only where the function is included today." },
  },

  trust: {
    h2: { es: "Cómo empezar y qué pasa con los datos", en: "How to start and what happens with the data" },
    lines: {
      es: ["Pides acceso, te enseñamos el sistema y conectamos los canales contigo.", "La base de datos está en la Unión Europea (Fráncfort).", "Cada respuesta automática indica que la escribe un asistente."],
      en: ["You request access, we show you the system and connect the channels with you.", "The database is in the European Union (Frankfurt).", "Every automatic reply says that an assistant wrote it."],
    },
  },

  faq: {
    h2: { es: "Preguntas", en: "Questions" },
    all: { es: "Todas las preguntas", en: "All the questions" },
    items: {
      es: [
        { q: "¿Qué hace NuovaSolution?", a: "Responde en español las consultas que llegan por WhatsApp y email y guarda lo importante de cada una en su ficha." },
        { q: "¿En qué idiomas responde?", a: "En español. Cualquier otro idioma se reconoce y se anota en la ficha; la respuesta en otros idiomas llega próximamente." },
        { q: "¿Sabe el cliente que responde un asistente?", a: "Sí. Cada respuesta automática lo indica." },
        { q: "¿Avisa a mi equipo?", a: "Todavía no: el aviso por email a la persona adecuada llega próximamente. Hoy la prioridad y el motivo están en la ficha." },
        { q: "¿Cómo empiezo?", a: "Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días llegan próximamente." },
        { q: "¿Funciona con mi CRM?", a: "Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, próximamente." },
        { q: "¿Cuánto cuesta?", a: "Te decimos el precio para tu agencia antes de acordar nada." },
      ],
      en: [
        { q: "What does NuovaSolution do?", a: "It answers the enquiries that arrive on WhatsApp and e-mail in Spanish and keeps what matters from each one on its record." },
        { q: "Which languages does it answer in?", a: "Spanish. Any other language is recognised and noted on the record; replies in other languages are coming soon." },
        { q: "Does the customer know an assistant is answering?", a: "Yes. Every automatic reply says so." },
        { q: "Does it alert my team?", a: "Not yet: the e-mail alert to the right person is coming soon. Today the priority and its reason are on the record." },
        { q: "How do I start?", a: "By invitation today: request access and we will show you the system. Public registration and the 14-day trial are coming soon." },
        { q: "Does it work with my CRM?", a: "It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce, coming soon." },
        { q: "What does it cost?", a: "We tell you the price for your agency before anything is agreed." },
      ],
    },
  },

  close: {
    h2: { es: "Mira cómo atiende NuovaSolution tus consultas", en: "See how NuovaSolution answers your enquiries" },
    line: { es: "Te enseñamos la demo con tus canales y respondemos tus preguntas.", en: "We show you the demo with your channels and answer your questions." },
    ctaDemo: { es: "Ver la demo", en: "See the demo" },
    ctaContact: { es: "Pedir acceso", en: "Request access" },
  },
};

export type Home1103 = typeof home1103;
export const statusOf = claim;
