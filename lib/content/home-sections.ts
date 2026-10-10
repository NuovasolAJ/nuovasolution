import type { Locale } from "@/lib/i18n/config";

/**
 * Words of the home page sections around the story (master order 2026-10-10 §3, §7, §9). WORKING text by the
 * implementer; Copy confirms after the implementation. The 3D section shows the living room delivered by the
 * 3D lane on 2026-10-05 (docs/website_redesign/MEDIA_SOURCES_1010.md) as the quality reference; new pictures
 * and films replace them when the 3D lane hands them over.
 */
type L = Record<Locale, string>;

export const homeWords = {
  story: {
    eyebrow: { es: "Así trabaja Nuova", en: "How Nuova works" },
    h2: { es: "Una consulta, de principio a fin", en: "One enquiry, from start to finish" },
    lead: { es: "Sigue a Laura Serrano desde su primer mensaje hasta el informe de la semana. Los mismos nombres, el mismo inmueble, el mismo reloj.", en: "Follow Laura Serrano from her first message to the week's report. The same names, the same property, the same clock." },
  },
  model3d: {
    eyebrow: { es: "Presentar", en: "Present" },
    h2: { es: "De tu plano a una vivienda que el cliente puede recorrer con la mirada", en: "From your plan to a home the customer can look around" },
    lead: { es: "Nos envías el plano acotado y, si las tienes, fotos. Construimos el modelo, lo amueblamos con una ambientación parecida y lo comprobamos contra tu plano. El cliente lo gira, elige planta y apaga el mobiliario.", en: "You send us the dimensioned plan and photos if you have them. We build the model, furnish it in a similar style and check it against your plan. The customer turns it, picks a floor and switches the furniture off." },
    steps: {
      es: [
        { title: "Plano", line: "Tu plano acotado es la base: cada muro a escala." },
        { title: "Ambientación", line: "Muebles parecidos a tus fotos o a tu referencia; no una reconstrucción exacta." },
        { title: "Rendering", line: "Imágenes calculadas con luz real para la ficha y las redes." },
        { title: "Vista giratoria", line: "El modelo en el navegador: girar, acercar, planta por planta, muebles sí o no." },
      ],
      en: [
        { title: "Plan", line: "Your dimensioned plan is the base: every wall to scale." },
        { title: "Furnishing", line: "Furniture similar to your photos or your reference; not an exact reconstruction." },
        { title: "Rendering", line: "Images computed with real light for the listing and social media." },
        { title: "Rotatable view", line: "The model in the browser: turn, zoom, floor by floor, furniture on or off." },
      ],
    },
    compareLabel: { es: "Comparar el modelo antes y después de la ambientación", en: "Compare the model before and after furnishing" },
    before: { es: "Modelo en bruto", en: "Raw model" },
    after: { es: "Ambientado", en: "Furnished" },
    clay: { es: "Mobiliario colocado, sin materiales", en: "Furniture placed, no materials" },
    render: { es: "Rendering con materiales y luz", en: "Render with materials and light" },
    viewer: { es: "La vista giratoria en el navegador", en: "The rotatable view in the browser" },
    viewerLine: { es: "Sin tejado, para ver dentro. Planta baja o alta. Sin paseo a ojo de persona.", en: "No roof, so you see inside. Ground or upper floor. No eye-level walkthrough." },
    film: { es: "Recorrido de cámara por el salón · 8 segundos · sin sonido", en: "Camera ride through the living room · 8 seconds · no sound" },
    play: { es: "Ver el recorrido", en: "Watch the ride" },
    demoNote: { es: "Vivienda de demostración de dos plantas, dibujada por NuovaSolution. No es una vivienda real. Cada modelo se hace por encargo a partir de tus planos.", en: "Two-storey demonstration home drawn by NuovaSolution. Not a real home. Each model is made to order from your plans." },
    cta: { es: "Pide un modelo", en: "Ask for a model" },
  },
  trust: {
    eyebrow: { es: "Cómo empiezas", en: "How you start" },
    h2: { es: "Lo que hace falta de verdad para ponerlo en marcha", en: "What it really takes to get it running" },
    lead: { es: "Sin llamada comercial. Creas la cuenta, configuras tu agencia y conectamos los canales contigo. Lo que cuesta y lo que pasa con los datos está escrito aquí, no en una llamada.", en: "No sales call. You create the account, set up your agency and we connect the channels with you. What it costs and what happens with the data is written here, not said on a call." },
    stepsTitle: { es: "El camino, en orden", en: "The path, in order" },
    steps: {
      es: [
        { title: "Crea tu cuenta", line: "Tu nombre, tu email de trabajo, una contraseña. Confirmas el email." },
        { title: "Pon nombre a tu agencia y configúrala", line: "Tus datos, tus datos legales, tu logo, tu equipo y sus roles. El progreso se guarda." },
        { title: "Conecta los canales con nosotros", line: "WhatsApp, email, formulario web y teléfono se conectan junto con nosotros, canal por canal. Es un paso aparte y lo hacemos contigo." },
        { title: "Elige dónde viven tus leads", line: "En el CRM incluido, sin nada externo, o conectado a tu CRM actual." },
      ],
      en: [
        { title: "Create your account", line: "Your name, your work email, a password. You confirm the email." },
        { title: "Name your agency and set it up", line: "Your details, your legal details, your logo, your team and their roles. Progress is saved." },
        { title: "Connect the channels with us", line: "WhatsApp, email, web form and phone are connected together with us, channel by channel. It is a separate step and we do it with you." },
        { title: "Choose where your leads live", line: "In the included CRM, with nothing external, or connected to your current CRM." },
      ],
    },
    crmTitle: { es: "Con tu CRM o sin CRM externo", en: "With your CRM or without an external one" },
    crmBuiltIn: { title: { es: "Sin CRM externo", en: "No external CRM" }, line: { es: "Usas el CRM incluido en Nuova. Es la opción recomendada para empezar: no hay nada que conectar.", en: "You use the CRM included in Nuova. The recommended way to start: there is nothing to connect." } },
    crmExternal: { title: { es: "Con tu CRM actual", en: "With your current CRM" }, line: { es: "HubSpot, Pipedrive, Zoho, Salesforce o Google Sheets. Tus leads se sincronizan con lo que ya usas; la conexión la hacemos contigo.", en: "HubSpot, Pipedrive, Zoho, Salesforce or Google Sheets. Your leads sync with what you already use; we make the connection with you." } },
    supportTitle: { es: "Qué hacemos nosotros al conectar", en: "What we do when connecting" },
    support: {
      es: ["Preparamos la cuenta de WhatsApp Business y el buzón de email con tu nombre.", "Añadimos el formulario a tu web o conectamos el que ya tienes.", "Configuramos el número del asistente telefónico y tu horario.", "Probamos cada canal con un mensaje real antes de darlo por conectado."],
      en: ["We prepare the WhatsApp Business account and the email mailbox under your name.", "We add the form to your website or connect the one you have.", "We set up the phone assistant's number and your hours.", "We test each channel with a real message before calling it connected."],
    },
    questionsTitle: { es: "Lo que preguntan antes de empezar", en: "What people ask before starting" },
    /** The questions answered here, by their row in Copy's FAQ (lib/content/faq.ts). */
    questions: ["Q-11", "Q-13", "Q-14", "Q-21", "Q-12", "Q-32", "Q-33", "Q-16"],
    allQuestions: { es: "Todas las preguntas", en: "All the questions" },
    ctaLine: { es: "14 días gratis · Sin tarjeta · Sin llamada comercial", en: "14 days free · No card · No sales call" },
  },
} satisfies Record<string, Record<string, unknown>>;

export type HomeWords = typeof homeWords;
export type { L };
