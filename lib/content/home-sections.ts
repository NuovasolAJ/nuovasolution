import type { Locale } from "@/lib/i18n/config";

/**
 * Words of the home page sections around the story (master order 2026-10-10 §3, §7, §9; final order 2026-10-12
 * §5, §7, §9). WORKING text by the implementer with Copy's deltas D-98…D-103 (CLAIMS_CHECK_1012) applied and
 * marked. The 3D section shows the living room delivered by the 3D lane on 2026-10-05 as the quality reference; new
 * pictures and films replace them when the 3D lane hands them over through docs/website_redesign/media_in_3d/.
 */
type L = Record<Locale, string>;

export const homeWords = {
  story: {
    eyebrow: { es: "Así trabaja Nuova", en: "How Nuova works" },
    h2: { es: "Una consulta, de principio a fin", en: "One enquiry, from start to finish" },
    // D-103: the promise at the top lands on the proven part; the story still ends at the week with its state line.
    lead: { es: "Sigue a Laura Serrano desde su primer mensaje hasta la tarea que cierra tu equipo. Los mismos nombres, el mismo inmueble, el mismo reloj.", en: "Follow Laura Serrano from her first message to the task your team closes. The same names, the same property, the same clock." },
    demo: { es: "Demostración con personas e inmuebles inventados. Bajo cada paso: qué está disponible hoy.", en: "Demonstration with invented people and listings. Under each step: what is available today." },
  },
  model3d: {
    eyebrow: { es: "Un servicio aparte: presentar en 3D", en: "A separate service: presenting in 3D" },
    h2: { es: "De tu plano a una vivienda que el cliente puede recorrer con la mirada", en: "From your plan to a home the customer can look around" },
    lead: { es: "Nos envías el plano acotado y, si las tienes, fotos. Construimos el modelo, lo mostramos vacío y amueblado desde la misma cámara y lo comprobamos contra tu plano. Cada modelo es un encargo, con o sin paquete.", en: "You send us the dimensioned plan and photos if you have them. We build the model, show it empty and furnished from the same camera and check it against your plan. Each model is an order, with or without a package." },
    // R19 §10: the four steps as the order names them: plan → model → the same room empty and furnished → the real turn.
    // R24 (24.10.): every step shows the 3D lane's one demonstration house (handoff_2026-10-23); the lines say what each picture is.
    steps: {
      es: [
        { title: "Plano", line: "Tu plano acotado es la base: cada muro a escala. Aquí, la planta baja de la casa de ejemplo." },
        { title: "Modelo", line: "Muros, huecos, escalera y muebles, sin tejado para ver dentro: las dos plantas de la misma casa." },
        { title: "Vacío y amueblado", line: "El mismo salón, la misma cámara: una vez sin muebles y otra con ellos. Mueve el tirador." },
        { title: "Vista giratoria", line: "El modelo gira en el navegador: las dos plantas, cada planta por separado, muebles fuera y dentro." },
      ],
      en: [
        { title: "Plan", line: "Your dimensioned plan is the base: every wall to scale. Here, the ground floor of the example house." },
        { title: "Model", line: "Walls, openings, the stair and furniture, no roof so you see inside: both floors of the same house." },
        { title: "Empty and furnished", line: "The same living room, the same camera: once without furniture, once with it. Move the handle." },
        { title: "Rotatable view", line: "The model turns in the browser: both floors, each floor on its own, furniture off and on." },
      ],
    },
    /** The 3D lane's mandatory marks under each picture (handoff README 2026-10-23): a fictional house, a visualisation, the real viewer. */
    planCaption: { es: "Plano de ejemplo ficticio · dibujado a escala a partir de la especificación del modelo", en: "Fictional example plan · drawn to scale from the model's specification" },
    modelCaption: { es: "Casa de ejemplo ficticia · captura del visor real", en: "Fictional example house · a frame from the real viewer" },
    pairCaption: { es: "Casa de ejemplo ficticia · visualización: el mismo salón vacío y con mobiliario ilustrativo, desde la misma cámara", en: "Fictional example house · visualisation: the same living room empty and with illustrative furnishing, from the same camera" },
    turnCaption: { es: "Casa de ejemplo ficticia · grabado del visor real · menos de un minuto · sin sonido", en: "Fictional example house · recorded from the real viewer · under a minute · no sound" },
    modelAlt: { es: "Casa de ejemplo ficticia de dos plantas sin tejado, vista desde arriba en el visor, con los nombres de las estancias", en: "Fictional two-storey example house without a roof, seen from above in the viewer, with the room names" },
    pairAlt: { es: "Casa de ejemplo ficticia: el mismo salón vacío y con mobiliario ilustrativo", en: "Fictional example house: the same living room empty and with illustrative furnishing" },
    pairLabel: { es: "Comparar el salón vacío y amueblado desde la misma cámara", en: "Compare the living room empty and furnished from the same camera" },
    empty: { es: "Vacío", en: "Empty" },
    furnished: { es: "Amueblado", en: "Furnished" },
    viewerLine: { es: "Sin tejado, para ver dentro. Planta baja o alta, muebles fuera o dentro. Sin paseo a ojo de persona. Modelos 3D también por separado, sin ningún paquete: nos envías los planos, lo construimos y lo comprobamos.", en: "No roof, so you see inside. Ground or upper floor, furniture off or on. No eye-level walkthrough. 3D models also on their own, without a package: you send the plans, we build it and we check it." },
    film: { es: "Vídeo: el modelo girando en el visor · menos de un minuto · sin sonido", en: "Video: the model turning in the viewer · under a minute · no sound" },
    demoNote: { es: "Casa de ejemplo de dos plantas sobre un plano ficticio propio. No es una vivienda real. Cada modelo se hace por encargo a partir de tus planos.", en: "A two-storey example house on a fictional plan of our own. Not a real home. Each model is made to order from your plans." },
    cta: { es: "Pide un modelo", en: "Ask for a model" },
  },
  trust: {
    eyebrow: { es: "Cómo empiezas", en: "How you start" },
    h2: { es: "Lo que hace falta de verdad para ponerlo en marcha", en: "What it really takes to get it running" },
    lead: { es: "Sin llamada comercial. Creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. Lo que cuesta y lo que pasa con los datos está escrito aquí, no en una llamada.", en: "No sales call. You create the account, set up your agency at your own pace and we connect the channels with you. What it costs and what happens with the data is written here, not said on a call." },
    stepsTitle: { es: "El camino, en orden", en: "The path, in order" },
    // Final order §9: calm and concrete; what the customer provides, what Nuova does, saved progress, the next step.
    steps: {
      es: [
        { title: "Crea tu cuenta", line: "Tu nombre, tu email de trabajo, una contraseña. Confirmas el email y entras." },
        { title: "Pon nombre a tu agencia y configúrala", line: "Tus datos, tus datos legales, tu logo, tu equipo y sus roles. Cada paso se guarda; puedes parar y seguir otro día." }, // replaces the "we do not give a duration" sentence
        { title: "Conecta WhatsApp y email con nosotros", line: "Es un paso aparte y lo hacemos contigo, canal por canal, con un mensaje real de prueba antes de darlo por conectado." }, // D-98: no phone, no web form
        { title: "Decide dónde viven tus leads", line: "En el CRM incluido, sin nada externo. Si ya usas otro, nos lo dices y lo preparamos contigo cuando esté listo." },
      ],
      en: [
        { title: "Create your account", line: "Your name, your work email, a password. You confirm the email and sign in." },
        { title: "Name your agency and set it up", line: "Your details, your legal details, your logo, your team and their roles. Every step is saved; you can stop and continue another day." },
        { title: "Connect WhatsApp and email with us", line: "It is a separate step and we do it with you, channel by channel, with one real test message before calling it connected." },
        { title: "Decide where your leads live", line: "In the included CRM, with nothing external. If you already use another one, tell us and we prepare it with you when it is ready." },
      ],
    },
    // D-102: the included CRM is the way in today; the agency's own CRM when it is ready.
    crmTitle: { es: "Con el CRM incluido, y con tu CRM cuando esté listo", en: "With the included CRM, and with your CRM when it is ready" },
    // TEXTS_1013 §6b M-4: the included CRM.
    crmBuiltIn: { title: { es: "Sin CRM externo", en: "No external CRM" }, line: { es: "Tus leads viven en el CRM incluido. Es la opción recomendada para empezar: no hay nada que conectar.", en: "Your leads live in the included CRM. The recommended way to start: there is nothing to connect." } },
    // TEXTS_1013 §6b M-5 (the four CRMs, certified on staging, no production connection) and M-6 (no line about Google Sheets as a CRM).
    crmExternal: { title: { es: "Con tu CRM actual", en: "With your current CRM" }, line: { es: "HubSpot, Pipedrive, Zoho y Salesforce están certificados en nuestro entorno de pruebas; en producción no hay ninguna conexión. Dinos cuál usas y lo preparamos contigo cuando esté listo.", en: "HubSpot, Pipedrive, Zoho and Salesforce are certified in our test environment; in production there is no connection. Tell us which you use and we prepare it with you when it is ready." } },
    supportTitle: { es: "Qué hacemos nosotros al conectar", en: "What we do when connecting" },
    // D-99, D-100: no phone number to set up, no web form to add. TEXTS_1013 §6b M-1 (the mailbox we operate; the agency's own is being
    // built), M-2 (Gmail: receive and reply, nothing about the thread), M-3 (no line about Outlook), M-8 (the pilot notice still outstanding).
    support: {
      es: ["Preparamos la cuenta de WhatsApp Business con tu nombre. Hoy las consultas por email llegan a un buzón que operamos nosotros para ti (Gmail: recibimos y respondemos); conectar el buzón propio de tu agencia está en construcción.", "Probamos cada canal con un mensaje real antes de darlo por conectado.", "Configuramos contigo el aviso de IA que lleva cada respuesta. Para una agencia piloto falta todavía la versión del aviso que la nombra."],
      en: ["We prepare the WhatsApp Business account under your name. Today email enquiries arrive at a mailbox we operate for you (Gmail: we receive and we reply); connecting your agency's own mailbox is being built.", "We test each channel with a real message before calling it connected.", "We set up with you the AI notice every reply carries. For a pilot agency the version of the notice that names the agency is still outstanding."],
    },
    questionsTitle: { es: "Lo que preguntan antes de empezar", en: "What people ask before starting" },
    /** The questions answered here, by their row in Copy's FAQ (lib/content/faq.ts). Q-21 is replaced by step 2 above. */
    questions: ["Q-11", "Q-13", "Q-14", "Q-12", "Q-32", "Q-33", "Q-16"],
    allQuestions: { es: "Todas las preguntas", en: "All the questions" },
    ctaLine: { es: "14 días gratis · Sin método de pago · Sin llamada comercial", en: "14 days free · No payment method · No sales call" },
  },
} satisfies Record<string, Record<string, unknown>>;

export type HomeWords = typeof homeWords;
export type { L };
