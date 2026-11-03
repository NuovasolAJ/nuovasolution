import type { Locale } from "@/lib/i18n/config";

/**
 * The words of the home page in the direction of the owner's order of 03.11.2026 (one build for the whole page and /packages).
 *
 * Source of every line: Copy's handover `docs/website_redesign/WEBSITE_COPY_HANDOVER_1102_v2.md` (§1 hero, §2 three results,
 * §3 scenes, §4 reporting, §5 3D, §6 plans / trust / FAQ / close) where it has one; the lines marked WORKING are the
 * implementer's and stand for Copy's check (the owner's order of 03.11.: the demo dialogues may be written here, Copy checks
 * afterwards). Claims follow governance/API_CLAIMS_LINES_1102_v1.md: no prices, no "Disponible" on a package, no alert as
 * available, no public sign-up promise, WhatsApp only as our own agency's channel, no score.
 */
export type L = Record<Locale, string>;
export type Status = "included" | "preparing" | "excluded" | "order";

export const statusWords: Record<Status, L> = {
  included: { es: "Incluido", en: "Included" },
  excluded: { es: "No incluido", en: "Not included" },
  preparing: { es: "En preparación", en: "In preparation" },
  order: { es: "Por encargo", en: "To order" },
};

export const home1103 = {
  hero: {
    eyebrow: { es: "Para agencias inmobiliarias en España", en: "For real estate agencies in Spain" },
    h1: { es: "Mientras enseñas, Nuova atiende.", en: "While you show a home, Nuova answers." },
    lead: { es: "Responde consultas por WhatsApp y email y guarda lo importante en una ficha.", en: "Answers enquiries on WhatsApp and e-mail and keeps what matters on a record." },
    ctaDemo: { es: "Ver la demo", en: "See the demo" },
    ctaContact: { es: "Pedir acceso", en: "Request access" },
    access: { es: "Acceso por invitación mientras preparamos el registro público.", en: "Access by invitation while public registration is being prepared." },
    /** WORKING: the three benefits that appear one after another while the film runs (owner 03.11., point 1). */
    benefits: {
      es: ["Responde en español, también fuera de horario", "Guarda zona, presupuesto e intención en la ficha", "Tu equipo ve la prioridad y el siguiente paso"],
      en: ["Answers in Spanish, also out of hours", "Keeps area, budget and intent on the record", "Your team sees the priority and the next step"],
    },
    /** WORKING: the film's description for assistive technology and the pause control. */
    film: { es: "Vídeo de fondo: un salón amueblado de la casa de ejemplo ficticia de NuovaSolution, 8 segundos en bucle, sin sonido", en: "Background video: a furnished living room of NuovaSolution's fictional example house, 8 seconds on a loop, no sound" },
    pause: { es: "Pausar el vídeo", en: "Pause the video" },
    play: { es: "Reproducir el vídeo", en: "Play the video" },
    scroll: { es: "Ver la demo", en: "See the demo" },
  },

  /** WORKING: the flow in four words (owner 03.11., point 4: "Anfrage → Nuova → Akte → dein Team", understood in five seconds). */
  flow: {
    eyebrow: { es: "Cómo funciona", en: "How it works" },
    h2: { es: "De la consulta a tu equipo, sin que nadie esté pendiente.", en: "From the enquiry to your team, with nobody watching the inbox." },
    nodes: {
      es: [
        { title: "Consulta", line: "WhatsApp, email, formulario o teléfono" },
        { title: "Nuova", line: "Responde en español" },
        { title: "Ficha", line: "Zona, presupuesto, idioma" },
        { title: "Tu equipo", line: "Prioridad y siguiente paso" },
      ],
      en: [
        { title: "Enquiry", line: "WhatsApp, e-mail, web form or phone" },
        { title: "Nuova", line: "Answers in Spanish" },
        { title: "Record", line: "Area, budget, language" },
        { title: "Your team", line: "Priority and next step" },
      ],
    },
  },

  /** Copy §2 as the three results, now carried inside the functions section (one story, no repetition). */
  functions: {
    eyebrow: { es: "Lo que tu agencia gana", en: "What your agency gains" },
    h2: { es: "Cada consulta, atendida y en su sitio.", en: "Every enquiry, answered and in its place." }, // WORKING
    lead: { es: "", en: "" },
    items: [
      {
        key: "priority",
        title: { es: "Leads importantes, con motivo", en: "Important leads, with the reason" },
        line: { es: "La ficha marca la prioridad y por qué. El aviso a la persona que toca está en preparación.", en: "The record marks the priority and why. The alert to the right person is in preparation." },
        status: "preparing" as Status,
      },
      {
        key: "reply",
        title: { es: "Consultas respondidas", en: "Enquiries answered" },
        line: { es: "En español, por WhatsApp y email, también fuera de horario.", en: "In Spanish, on WhatsApp and e-mail, also out of hours." },
        status: "included" as Status,
      },
      {
        key: "record",
        title: { es: "Lo importante, guardado", en: "What matters, kept" },
        line: { es: "Zona, presupuesto, idioma y lo que pide quedan en su ficha, en el CRM integrado.", en: "Area, budget, language and what they ask for stay on their record, in the built-in CRM." },
        status: "included" as Status,
      },
      {
        key: "matching",
        title: { es: "Inmuebles que encajan", en: "Listings that fit" },
        line: { es: "Nuova compara lo que busca Laura con tu cartera y propone solo inmuebles tuyos.", en: "Nuova compares what Laura is looking for with your portfolio and proposes only your own listings." },
        status: "preparing" as Status,
        statusLine: { es: "Implementado; todavía sin activar para ninguna agencia", en: "Implemented; not yet switched on for any agency" },
      },
      {
        key: "followup",
        title: { es: "Seguimiento con permiso", en: "Follow-up with permission" },
        line: { es: "Un inmueble nuevo que encaja se propone solo con permiso del cliente.", en: "A new listing that fits is proposed only with the customer's permission." }, // WORKING
        status: "preparing" as Status,
      },
      {
        key: "team",
        title: { es: "El día de tu equipo", en: "Your team's day" },
        line: { es: "Cada persona ve sus tareas, por qué va primero cada una y el siguiente paso.", en: "Each person sees their tasks, why each one comes first and the next step." },
        status: "preparing" as Status,
      },
    ],
    /** WORKING: the words inside the product surfaces of the functions section. */
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
        alert: { es: "Aviso a Elena · en preparación", en: "Alert to Elena · in preparation" },
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
        title: { es: "Ficha de Laura", en: "Laura's record" },
        fields: {
          es: [["Intención", "compra"], ["Zona", "Estepona"], ["Dormitorios", "2"], ["Presupuesto", "hasta 320.000 €"], ["Idioma", "español"], ["Visita", "la pide para la semana que viene"]],
          en: [["Intent", "buying"], ["Area", "Estepona"], ["Bedrooms", "2"], ["Budget", "up to €320,000"], ["Language", "Spanish"], ["Viewing", "asked for next week"]],
        },
        history: { es: "Historial", en: "History" },
        events: {
          es: [{ t: "mar 11:20", ch: "WhatsApp", what: "Consulta: 2 dormitorios en Estepona" }, { t: "mar 11:21", ch: "WhatsApp", what: "Respuesta del asistente" }, { t: "mar 11:23", ch: "WhatsApp", what: "Laura: vivienda habitual, ver la semana que viene" }],
          en: [{ t: "Tue 11:20", ch: "WhatsApp", what: "Enquiry: 2 bedrooms in Estepona" }, { t: "Tue 11:21", ch: "WhatsApp", what: "The assistant's reply" }, { t: "Tue 11:23", ch: "WhatsApp", what: "Laura: main home, viewing next week" }],
        },
      },
      matching: {
        title: { es: "Encajan con Laura · de tu cartera", en: "Fit Laura · from your portfolio" },
        because: { es: "Estepona · 2 dormitorios · hasta 320.000 €", en: "Estepona · 2 bedrooms · up to €320,000" },
        rows: {
          es: [{ ref: "EST-204", t: "Piso de 2 dormitorios con terraza", place: "Estepona · zona puerto", price: "315.000 €", fit: "zona, dormitorios, precio" }, { ref: "EST-231", t: "Ático de 2 dormitorios con vistas", place: "Estepona · Seghers", price: "319.000 €", fit: "zona, dormitorios, precio" }],
          en: [{ ref: "EST-204", t: "Two bedroom flat with terrace", place: "Estepona · marina area", price: "€315,000", fit: "area, bedrooms, price" }, { ref: "EST-231", t: "Two bedroom penthouse with views", place: "Estepona · Seghers", price: "€319,000", fit: "area, bedrooms, price" }],
        },
        action: { es: "Proponer a Laura", en: "Propose to Laura" },
      },
      followup: {
        title: { es: "Nuevo en tu cartera", en: "New in your portfolio" },
        listing: { es: "EST-240 · Piso de 2 dormitorios · Estepona · 309.000 €", en: "EST-240 · Two bedroom flat · Estepona · €309,000" },
        fits: { es: "Encaja con Laura: zona, dormitorios y presupuesto", en: "Fits Laura: area, bedrooms and budget" },
        permission: { es: "Permiso de Laura para avisos: sí · martes 11:23", en: "Laura's permission for updates: yes · Tuesday 11:23" },
        action: { es: "Enviar la propuesta por email", en: "Send the proposal by e-mail" },
        noPermission: { es: "Sin permiso no se envía nada.", en: "Without permission nothing is sent." },
      },
      team: {
        title: { es: "Elena · miércoles", en: "Elena · Wednesday" },
        rows: {
          es: [{ kind: "Visita pedida", who: "Laura Serrano · WhatsApp", why: "nombró inmueble, zona y presupuesto", step: "Proponerle día y hora", state: "Abierta" }, { kind: "Valoración", who: "Carmen Ortega · Email", why: "propietaria que pide cita esta semana", step: "Proponer una fecha", state: "Abierta" }, { kind: "Rellamada", who: "Álvaro Pons · Teléfono", why: "pidió que le llamen por la tarde", step: "Llamar a partir de las 16:00", state: "Tomada · Marcos" }],
          en: [{ kind: "Viewing requested", who: "Laura Serrano · WhatsApp", why: "named a property, an area and a budget", step: "Propose a day and time", state: "Open" }, { kind: "Valuation", who: "Carmen Ortega · E-mail", why: "an owner asking for a visit this week", step: "Propose a date", state: "Open" }, { kind: "Callback", who: "Álvaro Pons · Phone", why: "asked to be called in the afternoon", step: "Call from 16:00", state: "Taken · Marcos" }],
        },
        take: { es: "Tomar", en: "Take" },
        assistant: { es: "Primero Laura: pidió visita y nombró zona y presupuesto.", en: "Laura first: she asked for a viewing and named area and budget." },
      },
    },
  },

  /** Copy §4: the report. */
  report: {
    eyebrow: { es: "Informe", en: "Report" }, // WORKING
    h2: { es: "Tu semana, en un informe", en: "Your week, in one report" },
    lead: { es: "Qué atendió Nuova, qué sigue abierto y qué hacer después.", en: "What Nuova handled, what is still open and what to do next." },
    header: { es: "Agencia de ejemplo · Semana del 26 oct al 1 nov · WhatsApp y email · Demo con datos ficticios", en: "Example agency · Week of 26 Oct to 1 Nov · WhatsApp and e-mail · Demo with fictional data" },
    chartTitle: { es: "Consultas por semana", en: "Enquiries per week" },
    chartNote: { es: "Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación.", en: "Four example weeks. The week-by-week trend is part of the extended report, in preparation." },
    received: { es: "Recibidas", en: "Received" },
    answered: { es: "Respondidas", en: "Answered" },
    weeks: { es: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"], en: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    series: [
      { received: 19, answered: 17 },
      { received: 24, answered: 22 },
      { received: 21, answered: 20 },
      { received: 25, answered: 23 },
    ],
    channelsTitle: { es: "Por canal", en: "By channel" }, // WORKING
    channels: { es: [{ name: "WhatsApp", v: 13 }, { name: "Email", v: 10 }], en: [{ name: "WhatsApp", v: 13 }, { name: "E-mail", v: 10 }] },
    metrics: {
      es: [
        { k: "Consultas recibidas", d: "Mensajes nuevos por WhatsApp y email registrados en la semana.", v: "25" },
        { k: "Respondidas", d: "Consultas con una respuesta automática enviada.", v: "23" },
        { k: "Esperan a una persona", d: "Consultas abiertas que necesitan a alguien del equipo.", v: "2" },
        { k: "Visitas pedidas", d: "Clientes que pidieron ver un inmueble. Pedida no es acordada.", v: "4" },
        { k: "Entregadas al cliente", d: "Si la respuesta llegó al teléfono o al buzón del cliente.", v: "No medido" },
        { k: "Tiempo de respuesta", d: "Minutos entre la consulta y la respuesta.", v: "No medido" },
      ],
      en: [
        { k: "Enquiries received", d: "New WhatsApp and e-mail messages recorded in the week.", v: "25" },
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
    state: { es: "Incluido: el informe en el acceso de tu agencia. En preparación: el resumen semanal por email.", en: "Included: the report in your agency's login. In preparation: the weekly e-mail summary." },
    example: { es: "Datos de ejemplo", en: "Example data" },
  },

  /** Copy §5: 3D, a separate service. */
  model3d: {
    eyebrow: { es: "Un servicio aparte", en: "A separate service" }, // WORKING
    h2: { es: "Presentar un inmueble en 3D", en: "Present a property in 3D" },
    lead: { es: "Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado.", en: "From the measured plan to a model the client can look around, empty and furnished." },
    steps: { es: ["Plano", "Modelo", "Vacío y amueblado", "Entrega"], en: ["Plan", "Model", "Empty and furnished", "Delivery"] },
    status: { es: "En preparación · todavía no contratable", en: "In preparation · not bookable yet" },
    example: { es: "Casa de ejemplo ficticia", en: "Fictional example house" },
    cta: { es: "Pregúntanos por el 3D", en: "Ask us about 3D" },
    /** WORKING: the words of the stage's media (the 3D lane's mandatory marks, handoff_2026-10-30 README). */
    planAlt: { es: "Plano acotado de la planta baja de la casa de ejemplo, dibujado a escala", en: "Dimensioned plan of the example house's ground floor, drawn to scale" },
    modelAlt: { es: "Casa de ejemplo ficticia: las dos plantas sin tejado, vista del visor", en: "Fictional example house: both floors without a roof, a view from the viewer" },
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

  /** Copy §6.1: the plans. */
  plans: {
    eyebrow: { es: "Planes", en: "Plans" },
    h2: { es: "Planes", en: "Plans" },
    lead: { es: "Hoy, acceso por invitación. Los planes se podrán contratar con el registro público, en preparación.", en: "Today, access by invitation. Plans can be booked once public registration opens, in preparation." },
    names: ["Essential", "Growth", "Enterprise"],
    who: { es: ["Una oficina y un equipo pequeño", "Un equipo que crece", "Varias oficinas"], en: ["One office and a small team", "A growing team", "Several offices"] },
    inherits: { es: "Cada plan incluye todo lo del anterior.", en: "Each plan includes everything in the one before." },
    price: { es: "Te decimos el precio para tu agencia antes de acordar nada.", en: "We tell you the price for your agency before anything is agreed." },
    cta: { es: "Solicita una propuesta", en: "Request a proposal" },
    recommended: { es: "Recomendado para empezar", en: "Recommended to start" }, // WORKING (owner 03.11. point 7: the recommended plan stands out; it is the one whose rows are included today)
    groups: {
      es: ["Canales", "CRM", "Equipo", "Informes", "Integraciones", "Servicios"],
      en: ["Channels", "CRM", "Team", "Reporting", "Integrations", "Services"],
    },
    /** rows: group index, the row's name, the state per plan (Essential, Growth, Enterprise), the icon key */
    rows: [
      { g: 0, icon: "reply", name: { es: "Respuestas en español por WhatsApp y email", en: "Replies in Spanish on WhatsApp and e-mail" }, s: ["included", "included", "included"] },
      { g: 0, icon: "whatsapp", name: { es: "WhatsApp con el número de tu agencia", en: "WhatsApp with your agency's own number" }, s: ["preparing", "preparing", "preparing"] },
      { g: 0, icon: "languages", name: { es: "Otros idiomas", en: "Other languages" }, s: ["preparing", "preparing", "preparing"] },
      { g: 0, icon: "phone", name: { es: "Asistente telefónico", en: "Phone assistant" }, s: ["excluded", "preparing", "preparing"] },
      { g: 0, icon: "instagram", name: { es: "Instagram: publicar y comentarios", en: "Instagram: posts and comments" }, s: ["excluded", "excluded", "preparing"] },
      { g: 1, icon: "crm", name: { es: "CRM integrado: fichas e historial", en: "Built-in CRM: records and history" }, s: ["included", "included", "included"] },
      { g: 1, icon: "person", name: { es: "Una ficha por persona entre WhatsApp y email", en: "One record per person across WhatsApp and e-mail" }, s: ["preparing", "preparing", "preparing"] },
      { g: 2, icon: "alert", name: { es: "Aviso de consultas importantes", en: "Alert for important enquiries" }, s: ["preparing", "preparing", "preparing"] },
      { g: 2, icon: "tasks", name: { es: "Lista de tareas y asistente de la mañana", en: "Task list and morning assistant" }, s: ["excluded", "preparing", "preparing"] },
      { g: 2, icon: "matching", name: { es: "Propuestas de tu cartera y seguimientos", en: "Proposals from your portfolio and follow-ups" }, s: ["excluded", "preparing", "preparing"] },
      { g: 3, icon: "report", name: { es: "Informe en el acceso de tu agencia", en: "Report in your agency's login" }, s: ["included", "included", "included"] },
      { g: 3, icon: "mail", name: { es: "Resumen semanal por email", en: "Weekly e-mail summary" }, s: ["preparing", "preparing", "preparing"] },
      { g: 3, icon: "trend", name: { es: "Informe con evolución y canales", en: "Report with trend and channels" }, s: ["excluded", "preparing", "preparing"] },
      { g: 4, icon: "integrations", name: { es: "HubSpot, Pipedrive, Zoho, Salesforce, Outlook", en: "HubSpot, Pipedrive, Zoho, Salesforce, Outlook" }, s: ["preparing", "preparing", "preparing"] },
      { g: 4, icon: "ads", name: { es: "Leads de tus anuncios actuales", en: "Leads from your existing ads" }, s: ["excluded", "preparing", "preparing"] },
      { g: 5, icon: "model3d", name: { es: "Modelos 3D", en: "3D models" }, s: ["preparing", "preparing", "preparing"] },
    ] as { g: number; icon: string; name: L; s: Status[] }[],
    legend: { es: "Un ✓ solo donde la función está incluida hoy.", en: "A ✓ only where the function is included today." }, // WORKING
  },

  /** Copy §6.2: trust, short. */
  trust: {
    h2: { es: "Cómo empezar y qué pasa con los datos", en: "How to start and what happens with the data" },
    lines: {
      es: ["Pides acceso, te enseñamos el sistema y conectamos los canales contigo.", "La base de datos está en la Unión Europea (Fráncfort).", "Cada respuesta automática indica que la escribe un asistente."],
      en: ["You request access, we show you the system and connect the channels with you.", "The database is in the European Union (Frankfurt).", "Every automatic reply says that an assistant wrote it."],
    },
  },

  /** Copy §6.3: the short FAQ. */
  faq: {
    h2: { es: "Preguntas", en: "Questions" }, // WORKING
    all: { es: "Todas las preguntas", en: "All the questions" },
    items: {
      es: [
        { q: "¿Qué hace Nuova?", a: "Responde en español las consultas que llegan por WhatsApp y email y guarda lo importante de cada una en su ficha." },
        { q: "¿En qué idiomas responde?", a: "En español. En otro idioma no se envía nada automáticamente." },
        { q: "¿Sabe el cliente que responde un asistente?", a: "Sí. Cada respuesta automática lo indica." },
        { q: "¿Avisa a mi equipo?", a: "Todavía no: el aviso por email a la persona adecuada está en preparación." },
        { q: "¿Cómo empiezo?", a: "Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días están en preparación." },
        { q: "¿Funciona con mi CRM?", a: "Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, cuando esté listo." },
        { q: "¿Cuánto cuesta?", a: "Te decimos el precio para tu agencia antes de acordar nada." },
      ],
      en: [
        { q: "What does Nuova do?", a: "It answers the enquiries that arrive on WhatsApp and e-mail in Spanish and keeps what matters from each one on its record." },
        { q: "Which languages does it answer in?", a: "Spanish. In another language nothing is sent automatically." },
        { q: "Does the customer know an assistant is answering?", a: "Yes. Every automatic reply says so." },
        { q: "Does it alert my team?", a: "Not yet: the e-mail alert to the right person is in preparation." },
        { q: "How do I start?", a: "By invitation today: request access and we will show you the system. Public registration and the 14-day trial are in preparation." },
        { q: "Does it work with my CRM?", a: "It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce when ready." },
        { q: "What does it cost?", a: "We tell you the price for your agency before anything is agreed." },
      ],
    },
  },

  /** Copy §6.4: the close. */
  close: {
    h2: { es: "Mira cómo atiende Nuova tus consultas", en: "See how Nuova answers your enquiries" },
    line: { es: "Te enseñamos la demo con tus canales y respondemos tus preguntas.", en: "We show you the demo with your channels and answer your questions." },
    ctaDemo: { es: "Ver la demo", en: "See the demo" },
    ctaContact: { es: "Pedir acceso", en: "Request access" },
  },
};

export type Home1103 = typeof home1103;
