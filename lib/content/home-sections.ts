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
    steps: {
      es: [
        { title: "Plano", line: "Tu plano acotado es la base: cada muro a escala." },
        { title: "Modelo", line: "Muros, huecos y muebles colocados, todavía sin materiales." },
        { title: "Vacío y amueblado", line: "El mismo salón, la misma cámara: una vez sin muebles y otra con ellos." },
        { title: "Vista giratoria", line: "El modelo gira en el navegador: girar, acercar, planta por planta." },
      ],
      en: [
        { title: "Plan", line: "Your dimensioned plan is the base: every wall to scale." },
        { title: "Model", line: "Walls, openings and furniture placed, no materials yet." },
        { title: "Empty and furnished", line: "The same living room, the same camera: once without furniture, once with it." },
        { title: "Rotatable view", line: "The model turns in the browser: turn, zoom, floor by floor." },
      ],
    },
    /** What stands in a slot while the 3D lane's material is missing (3D_ASSETS_REQUEST_1017 A-1, A-2): said plainly, never a stand-in. */
    pairPending: { es: "Pendiente del equipo 3D: el par vacío / amueblado desde la misma cámara. Aquí, el salón amueblado (render final).", en: "Pending from the 3D team: the empty / furnished pair from the same camera. Here, the furnished living room (final render)." },
    turnPending: { es: "Pendiente del equipo 3D: la vuelta completa o el visor. Aquí, un recorrido de cámara de 8 segundos por el salón.", en: "Pending from the 3D team: the full turn or the viewer. Here, an 8-second camera ride through the living room." },
    // Final order §7: the pair on the slider is the first version and the revised design of the same room from the
    // same camera, not an unfurnished and a furnished state. It is labelled as what it is.
    compareLabel: { es: "Comparar la primera versión y el diseño revisado del mismo salón, misma cámara", en: "Compare the first version and the revised design of the same living room, same camera" },
    before: { es: "Primera versión", en: "First version" },
    after: { es: "Diseño revisado", en: "Revised design" },
    compareNote: { es: "Las dos imágenes muestran el mismo salón desde la misma cámara: a la izquierda la primera versión, a la derecha el diseño revisado con otros muebles, techo y luz. Una comparación sin muebles y con muebles del mismo encuadre se añade cuando el equipo 3D la entregue.", en: "Both pictures show the same living room from the same camera: on the left the first version, on the right the revised design with other furniture, a ceiling and light. An unfurnished-to-furnished pair from the same frame is added when the 3D team delivers it." },
    clay: { es: "Mobiliario colocado, sin materiales", en: "Furniture placed, no materials" },
    render: { es: "Rendering con materiales y luz", en: "Render with materials and light" },
    viewer: { es: "Captura del visor giratorio en el navegador", en: "Capture of the rotatable browser viewer" },
    pairMissing: { es: "El salón amueblado, render final. La comparación sin muebles / con muebles desde la misma cámara se añade cuando el equipo 3D la entregue; no se muestran dos variantes de diseño como si fueran esa comparación.", en: "The furnished living room, final render. The unfurnished / furnished comparison from the same camera is added when the 3D team delivers it; two design variants are not shown as if they were that comparison." },
    viewerLine: { es: "Sin tejado, para ver dentro. Planta baja o alta. Sin paseo a ojo de persona. Modelos 3D también por separado, sin ningún paquete: nos envías los planos, lo construimos y lo comprobamos.", en: "No roof, so you see inside. Ground or upper floor. No eye-level walkthrough. 3D models also on their own, without a package: you send the plans, we build it and we check it." },
    film: { es: "Vídeo: recorrido de cámara por el salón · 8 segundos · sin sonido", en: "Video: camera ride through the living room · 8 seconds · no sound" },
    play: { es: "Ver el recorrido", en: "Watch the ride" },
    demoNote: { es: "Vivienda de demostración de dos plantas, dibujada por NuovaSolution. No es una vivienda real. Cada modelo se hace por encargo a partir de tus planos.", en: "Two-storey demonstration home drawn by NuovaSolution. Not a real home. Each model is made to order from your plans." },
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
      es: ["Preparamos la cuenta de WhatsApp Business con tu nombre. Hoy las consultas por email llegan a un buzón que operamos nosotros para ti (Gmail: recibimos y respondemos); conectar el buzón propio de tu agencia está en construcción.", "Probamos cada canal con un mensaje real antes de darlo por conectado.", "Configuramos contigo el aviso de IA que lleva cada respuesta y el idioma por defecto. Para una agencia piloto falta todavía la versión del aviso que la nombra."],
      en: ["We prepare the WhatsApp Business account under your name. Today email enquiries arrive at a mailbox we operate for you (Gmail: we receive and we reply); connecting your agency's own mailbox is being built.", "We test each channel with a real message before calling it connected.", "We set up with you the AI notice every reply carries and the default language. For a pilot agency the version of the notice that names the agency is still outstanding."],
    },
    questionsTitle: { es: "Lo que preguntan antes de empezar", en: "What people ask before starting" },
    /** The questions answered here, by their row in Copy's FAQ (lib/content/faq.ts). Q-21 is replaced by step 2 above. */
    questions: ["Q-11", "Q-13", "Q-14", "Q-12", "Q-32", "Q-33", "Q-16"],
    allQuestions: { es: "Todas las preguntas", en: "All the questions" },
    ctaLine: { es: "14 días gratis · Sin tarjeta · Sin llamada comercial", en: "14 days free · No card · No sales call" },
  },
} satisfies Record<string, Record<string, unknown>>;

export type HomeWords = typeof homeWords;
export type { L };
