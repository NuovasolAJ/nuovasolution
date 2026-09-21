/**
 * Video and image slots. Design now, record later.
 *
 * Every entry ships as status "pending": the component renders a designed
 * frame at the exact final aspect ratio with a working fallback action, so a
 * real file is a one-line change here with zero layout shift.
 *
 * File convention (LUXURY_UX_MEDIA_SYSTEM.md §10.3):
 *   /public/media/<slug>/<slug>-16x9-v<N>.{webm,mp4}
 *   /public/media/<slug>/<slug>-4x5-v<N>.{webm,mp4}
 *   /public/media/<slug>/<slug>-16x9-v<N>-poster.{avif,jpg}
 *   /public/media/<slug>/<slug>-4x5-v<N>-poster.{avif,jpg}
 *   /public/media/<slug>/<slug>-captions-{en,es}-v<N>.vtt
 * A new cut is a version bump, never an overwrite.
 */

export type MediaStatus = "pending" | "ready";

export interface VideoSlot {
  id: string;
  slug: string;
  version: number;
  status: MediaStatus;
  /** Page and section the slot belongs to. */
  page: string;
  section: string;
  purpose: { en: string; es: string };
  coreMessage: { en: string; es: string };
  /** Target duration in seconds (min, max). */
  duration: [number, number];
  aspectDesktop: "16:9";
  aspectMobile: "4:5" | "1:1";
  poster: { en: string; es: string };
  scenes: { en: string[]; es: string[] };
  /** What a text-only WhatsApp flow may record today on the accepted text path. */
  recordableToday: boolean;
  notes: { en: string; es: string };
}

export const videoSlots: VideoSlot[] = [
  {
    id: "V-01",
    slug: "nuova-agency-day",
    version: 1,
    status: "pending",
    page: "/[locale]",
    section: "H-04 Sixty seconds",
    purpose: {
      en: "One uninterrupted view of Nuova inside a normal agency day.",
      es: "Una vista continua de Nuova dentro de un día normal de agencia.",
    },
    coreMessage: {
      en: "One enquiry, carried from arrival to a ready agent, without anyone remembering to do it.",
      es: "Una consulta, llevada desde que llega hasta un agente listo, sin que nadie tenga que acordarse.",
    },
    duration: [55, 65],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: {
      en: "The conversation view at rest, one Gmail enquiry open, no cursor.",
      es: "La vista de conversación en reposo, una consulta de Gmail abierta, sin cursor.",
    },
    scenes: {
      en: [
        "00:00 to 00:08. A WhatsApp text enquiry arrives. Held still.",
        "00:08 to 00:20. The reply is composed and sent on the same channel.",
        "00:20 to 00:40. The enquiry becomes one customer record with a qualification and a priority.",
        "00:40 to 00:54. A viewing request in the conversation becomes a task for the team. (WCR-017: the film stops here until matching runs in prod.)",
        "00:54 to 01:00. Closing frame: the wordmark on mineral black, two seconds.",
      ],
      es: [
        "00:00 a 00:08. Llega una consulta de texto por WhatsApp. Plano fijo.",
        "00:08 a 00:20. La respuesta se redacta y se envía por el mismo canal.",
        "00:20 a 00:40. La consulta pasa a ser una ficha de cliente con su cualificación y su prioridad.",
        "00:40 a 00:54. Una petición de visita en la conversación pasa a ser una tarea para el equipo.",
        "00:54 a 01:00. Plano de cierre: la marca sobre negro mineral, dos segundos.",
      ],
    },
    recordableToday: true,
    notes: {
      en: "Text-only WhatsApp and Gmail paths are on the accepted text path and may be recorded now. Demonstration data only. Any speed-up is stated on screen.",
      es: "Los recorridos de texto de WhatsApp y Gmail están en la ruta de texto aceptada y pueden grabarse ya. Solo datos de demostración. Cualquier aceleración se indica en pantalla.",
    },
  },
  {
    id: "V-02",
    slug: "voice",
    version: 1,
    status: "pending",
    page: "/[locale]/platform/voice",
    section: "PD-03 The film",
    purpose: {
      en: "Show a call handled by Voice, and the record it leaves behind.",
      es: "Mostrar una llamada atendida por Voz y la ficha que deja.",
    },
    coreMessage: {
      en: "A call is answered and becomes part of the same customer record.",
      es: "Una llamada se atiende y pasa a formar parte de la misma ficha de cliente.",
    },
    duration: [30, 40],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "The call surface at rest, before the call begins.", es: "La pantalla de llamada en reposo, antes de que empiece." },
    scenes: {
      en: ["A call arriving.", "The conversation as the system represents it.", "The record the call left behind.", "Closing frame."],
      es: ["Llega una llamada.", "La conversación tal como la representa el sistema.", "La ficha que deja la llamada.", "Plano de cierre."],
    },
    recordableToday: false,
    notes: {
      en: "Not recordable until the legal disclosure and provider gates clear. Speech requires EN and ES captions. Starts muted, never autoplays.",
      es: "No se graba hasta que se resuelvan la información legal y las puertas del proveedor. El habla requiere subtítulos en ES y EN. Empieza en silencio, nunca se reproduce sola.",
    },
  },
  {
    id: "V-03",
    slug: "property-matching",
    version: 1,
    status: "pending",
    page: "/[locale]/platform/property-matching",
    section: "PD-03 The film",
    purpose: {
      en: "Show a customer request turned into a short, honest selection.",
      es: "Mostrar cómo una petición de cliente se convierte en una selección corta y honesta.",
    },
    coreMessage: {
      en: "A short, relevant selection, with availability the agency can stand behind.",
      es: "Una selección corta y relevante, con una disponibilidad que la agencia puede defender.",
    },
    duration: [30, 40],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "One customer record with the request visible, matches not yet shown.", es: "Una ficha de cliente con la petición visible, sin coincidencias todavía." },
    scenes: {
      en: ["The request as the customer wrote it.", "What the system understood.", "The selection the customer receives.", "The wider set the agent sees.", "Closing frame."],
      es: ["La petición tal como la escribió el cliente.", "Lo que entendió el sistema.", "La selección que recibe el cliente.", "El conjunto más amplio que ve el agente.", "Plano de cierre."],
    },
    recordableToday: true,
    notes: { en: "Demonstration property set only. No real owner address.", es: "Solo un conjunto de propiedades de demostración. Ninguna dirección real de propietario." },
  },
  {
    id: "V-04",
    slug: "daily-assistant",
    version: 1,
    status: "pending",
    page: "/[locale]/platform/daily-assistant",
    section: "PD-03 The film",
    purpose: { en: "Show the start of a working day with Daily Goals and the assistant.", es: "Mostrar el inicio de una jornada con Daily Goals y la asistente." },
    coreMessage: { en: "What to do first, and why, in one place.", es: "Qué hacer primero, y por qué, en un solo sitio." },
    duration: [25, 35],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "The start of day view at rest.", es: "La vista de inicio de jornada en reposo." },
    scenes: {
      en: ["The start of a working day.", "What is surfaced first, and why.", "One action taken from it.", "The state after that action.", "Closing frame."],
      es: ["El inicio de una jornada.", "Qué aparece primero, y por qué.", "Una acción tomada desde ahí.", "El estado después de esa acción.", "Plano de cierre."],
    },
    recordableToday: false,
    notes: { en: "Records after final acceptance. Every name and number on screen is demonstration data, never a redaction box.", es: "Se graba tras la aceptación final. Todo nombre y número en pantalla es dato de demostración, nunca una caja tapada." },
  },
  {
    id: "V-05",
    slug: "onboarding",
    version: 1,
    status: "pending",
    page: "/[locale]/trial",
    section: "TR-02 The film",
    purpose: { en: "Show what an agency provides and what it sees afterwards.", es: "Mostrar qué aporta una agencia y qué ve después." },
    coreMessage: { en: "You set up your own environment. Your progress is saved.", es: "Configuras tu propio entorno. Tu progreso queda guardado." },
    duration: [45, 60],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "The first onboarding step at rest.", es: "El primer paso de la configuración en reposo." },
    scenes: {
      en: ["What an agency provides.", "What is configured.", "The readiness check.", "What the agency sees afterwards.", "Closing frame."],
      es: ["Qué aporta una agencia.", "Qué se configura.", "La comprobación de preparación.", "Qué ve la agencia después.", "Plano de cierre."],
    },
    recordableToday: false,
    notes: { en: "Records only against the real readiness contract. No compression that implies onboarding is faster than it is.", es: "Se graba solo contra el contrato real de preparación. Sin aceleraciones que sugieran que la configuración es más rápida de lo que es." },
  },
  {
    id: "V-06",
    slug: "reporting",
    version: 1,
    status: "pending",
    page: "reserved",
    section: "reserved",
    purpose: { en: "Reserved. Reporting has no status in the canonical audit, so no page claims it.", es: "Reservado. Reporting no tiene estado en la auditoría canónica, así que ninguna página lo afirma." },
    coreMessage: { en: "Held.", es: "Retenido." },
    duration: [20, 30],
    aspectDesktop: "16:9",
    aspectMobile: "1:1",
    poster: { en: "One report view at rest with a burned-in demonstration data chip.", es: "Una vista de informe en reposo con una etiqueta de datos de demostración grabada en el vídeo." },
    scenes: { en: ["The reporting view opening.", "One dimension changed.", "The result.", "Closing frame."], es: ["Se abre la vista de informes.", "Cambia una dimensión.", "El resultado.", "Plano de cierre."] },
    recordableToday: false,
    notes: { en: "Highest claims risk. Every visible number is a claim. Demonstration data chip burned into the video.", es: "Máximo riesgo de afirmaciones. Cada número visible es una afirmación. Etiqueta de datos de demostración grabada en el vídeo." },
  },
  {
    id: "V-07",
    slug: "follow-up",
    version: 1,
    status: "pending",
    page: "reserved",
    section: "reserved",
    purpose: { en: "Reserved. Follow-up copy is under legal review, so no page claims it.", es: "Reservado. El texto de seguimiento está en revisión legal, así que ninguna página lo afirma." },
    coreMessage: { en: "Held.", es: "Retenido." },
    duration: [30, 40],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "The journey view at rest.", es: "La vista del recorrido en reposo." },
    scenes: { en: ["A conversation that went quiet.", "What happens next, and when.", "The reply coming back.", "Where it lands.", "Closing frame."], es: ["Una conversación que se queda en silencio.", "Qué pasa después, y cuándo.", "La respuesta que vuelve.", "Dónde aterriza.", "Plano de cierre."] },
    recordableToday: false,
    notes: { en: "Time is the subject. Real intervals stated on screen.", es: "El tiempo es el tema. Intervalos reales indicados en pantalla." },
  },
  {
    id: "V-08",
    slug: "property-experience",
    version: 1,
    status: "pending",
    page: "/[locale]/platform/property-experience",
    section: "PD-03 The film",
    purpose: { en: "Show a finished Property Experience as a buyer receives it.", es: "Mostrar una Property Experience terminada tal como la recibe un comprador." },
    coreMessage: { en: "The finished result, created by Nuova and checked by a person.", es: "El resultado terminado, creado por Nuova y revisado por una persona." },
    duration: [30, 40],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "One room at rest, the floor plan alongside.", es: "Una habitación en reposo, con el plano al lado." },
    scenes: { en: ["An enquiry about a property.", "What the buyer is shown.", "Moving room to room through real doorways.", "What the agent receives.", "Closing frame."], es: ["Una consulta sobre una propiedad.", "Lo que se le muestra al comprador.", "Pasar de habitación en habitación por puertas reales.", "Lo que recibe el agente.", "Plano de cierre."] },
    recordableToday: false,
    notes: { en: "Focus on the finished result. Production tooling never appears on screen or in copy.", es: "El foco es el resultado terminado. Las herramientas de producción nunca aparecen en pantalla ni en el texto." },
  },
  {
    id: "V-09",
    slug: "social-growth",
    version: 1,
    status: "pending",
    page: "/[locale]/platform/social-growth",
    section: "PD-03 The film",
    purpose: { en: "Show a public comment becoming a private conversation.", es: "Mostrar cómo un comentario público se convierte en una conversación privada." },
    coreMessage: { en: "Genuine interest in public becomes a tracked conversation, where the platform permits it.", es: "El interés real en público se convierte en una conversación registrada, donde la plataforma lo permita." },
    duration: [25, 35],
    aspectDesktop: "16:9",
    aspectMobile: "4:5",
    poster: { en: "The public surface before the move to a private conversation.", es: "La superficie pública antes de pasar a una conversación privada." },
    scenes: { en: ["A public interaction.", "The move to a private conversation.", "The conversation continuing.", "Where it lands in the system.", "Closing frame."], es: ["Una interacción pública.", "El paso a una conversación privada.", "La conversación continúa.", "Dónde aterriza en el sistema.", "Plano de cierre."] },
    recordableToday: false,
    notes: { en: "Waits on the Meta review. Third-party platform UI reduced to a neutral surface unless brand usage is cleared.", es: "Espera la revisión de Meta. La interfaz de plataformas de terceros se reduce a una superficie neutra salvo autorización de marca." },
  },
];

export function videoSlot(id: string): VideoSlot | undefined {
  return videoSlots.find((v) => v.id === id || v.slug === id);
}

/** Photography and product-capture slots. All pending; each renders a labelled frame. */
export interface ImageSlot {
  id: string;
  aspect: "3:4" | "4:5" | "16:10" | "4:3" | "16:9";
  subject: { en: string; es: string };
  kind: "photograph" | "capture";
}

export const imageSlots: Record<string, ImageSlot> = {
  "IMG-01": {
    id: "IMG-01",
    aspect: "3:4",
    kind: "photograph",
    subject: { en: "Andalusian architecture in late light, no people.", es: "Arquitectura andaluza a última hora de la tarde, sin personas." },
  },
  "PS-01": { id: "PS-01", aspect: "16:10", kind: "capture", subject: { en: "The conversation view.", es: "La vista de conversación." } },
  "PS-02": { id: "PS-02", aspect: "4:3", kind: "capture", subject: { en: "A Gmail enquiry answered.", es: "Una consulta de Gmail respondida." } },
  "PS-03": { id: "PS-03", aspect: "4:3", kind: "capture", subject: { en: "One customer record with its priority.", es: "Una ficha de cliente con su prioridad." } },
  "PS-04": { id: "PS-04", aspect: "4:3", kind: "capture", subject: { en: "A property match with honest availability.", es: "Una coincidencia de propiedad con disponibilidad honesta." } },
};
