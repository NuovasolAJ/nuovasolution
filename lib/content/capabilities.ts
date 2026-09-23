import type { Locale } from "@/lib/i18n/config";
import type { CapabilityStatus } from "./statuses";

/**
 * The capability registry. Every product page renders from one entry here.
 * Statuses and wording follow docs/website_redesign/WEBSITE_CLAIM_REGISTER_v1.md
 * (state 2026-09-21_SYNC_1215Z; WCR row ids noted inline). Statuses are content,
 * not code: changing a status changes every page that shows it.
 * Hot lead alerting is not mentioned anywhere: CLAIMS_MATRIX D-10 forbids every
 * wording and export v2 puts it out of scope for the website.
 *
 * House rules for every string: no dashes, no invented numbers, no guaranteed
 * outcomes, present tense only where the canonical status permits it.
 */

type L = { en: string; es: string };
type Stage = "attract" | "answer" | "understand" | "advance" | "handover";

export interface CapabilityPoint {
  text: L;
  status: CapabilityStatus;
}

export interface Capability {
  slug: string;
  stage: Stage;
  /** Overall status shown on index rows and chips. The most honest single value. */
  status: CapabilityStatus;
  name: L;
  navLine: L;
  h1: L;
  lead: L;
  points: CapabilityPoint[];
  /** Illustrative scenario. Always labelled. */
  scenario: L;
  /** Channels and systems it works with. Text only, never logos. */
  fits: L[];
  /** Both halves, where a capability is certified internally and gated externally. */
  bothHalves?: { certified: L; pending: L };
  /** Explicitly not available. Stated so nobody infers it. */
  notAvailable?: L[];
  /** Extra honest paragraph, used by premium services. */
  honesty?: L;
  video?: string;
  related: string[];
}

export const capabilities: Capability[] = [
  {
    slug: "ai-sales-agent",
    stage: "answer",
    status: "live",
    name: { en: "AI Sales Agent", es: "AI Sales Agent" },
    navLine: { en: "Answers text enquiries, day or night", es: "Responde consultas de texto, de día o de noche" }, // C3 §1.3
    h1: { en: "Every enquiry gets an answer, and the conversation carries on.", es: "Cada consulta recibe respuesta, y la conversación sigue." },
    lead: {
      en: "Text enquiries on Gmail and WhatsApp are answered and carried forward on the same channel, without anyone in the office having to be free at that moment.",
      es: "Las consultas de texto por Gmail y WhatsApp se responden y se llevan hacia adelante por el mismo canal, sin que nadie de la oficina tenga que estar libre en ese momento.",
    },
    points: [
      { text: { en: "Gmail text intake and reply.", es: "Recepción y respuesta de texto por Gmail." }, status: "live" },
      { text: { en: "WhatsApp text intake and reply.", es: "Recepción y respuesta de texto por WhatsApp." }, status: "live" },
      { text: { en: "Each conversation is recorded against the customer.", es: "Cada conversación queda registrada en la ficha del cliente." }, status: "live" }, // WCR-053
      { text: { en: "Email attachments.", es: "Adjuntos de email." }, status: "in_implementation" },
      { text: { en: "WhatsApp media understanding.", es: "Comprensión de archivos de WhatsApp." }, status: "in_implementation" },
      { text: { en: "Outlook and Microsoft 365.", es: "Outlook y Microsoft 365." }, status: "in_implementation" },
    ],
    scenario: {
      en: "A buyer writes on WhatsApp on a Sunday evening asking whether the apartment in Estepona is still available. The message is answered on WhatsApp, and the conversation is recorded against the buyer for the agent on Monday.", // WCR-055
      es: "Un comprador escribe por WhatsApp un domingo por la tarde para preguntar si el piso de Estepona sigue disponible. El mensaje se responde por WhatsApp, y la conversación queda registrada en la ficha del comprador para el agente el lunes.",
    },
    fits: [
      { en: "Gmail", es: "Gmail" },
      { en: "WhatsApp", es: "WhatsApp" },
      { en: "Your customers hear from your agency, under your brand (in development).", es: "Tus clientes reciben la respuesta de tu agencia, con tu marca (en desarrollo)." }, // WCR-041, WCR-056
    ],
    notAvailable: [],
    video: "V-01",
    related: ["lead-intelligence", "crm", "voice"],
  },
  {
    slug: "lead-intelligence",
    stage: "understand",
    status: "live",
    name: { en: "Lead Intelligence", es: "Lead Intelligence" },
    navLine: { en: "Qualifies and prioritises each enquiry", es: "Cualifica y prioriza cada consulta" }, // WCR-060, C3 §1.3
    h1: { en: "One customer, one record, and a clear priority on every enquiry.", es: "Un cliente, una ficha, y una prioridad clara en cada consulta." }, // WCR-061
    lead: {
      // WCR-062 = WCR-020
      en: "A client who writes twice on the same channel stays one person in Nuova, and every enquiry is qualified and prioritised. Recognising the same client across email and WhatsApp is being built.",
      es: "Un cliente que escribe dos veces por el mismo canal sigue siendo una sola persona en Nuova, y cada consulta se cualifica y se prioriza. Reconocer al mismo cliente entre email y WhatsApp se está construyendo.",
    },
    points: [
      { text: { en: "One canonical customer identity across channels.", es: "Una identidad de cliente única en todos los canales." }, status: "in_implementation" }, // WCR-063
      { text: { en: "Qualification on every answered enquiry.", es: "Cualificación en cada consulta respondida." }, status: "live" }, // WCR-064
      // WCR-065 removed rather than retensed: CLAIMS_MATRIX D-10 forbids every hot lead wording.
      { text: { en: "A priority signal so your team knows where to start.", es: "Una señal de prioridad para que tu equipo sepa por dónde empezar." }, status: "live" },
    ],
    scenario: {
      en: "The buyer from Sunday confirms a budget and asks for a viewing this week. The record is qualified and its priority rises, so the agent responsible starts there.", // WCR-067
      es: "El comprador del domingo confirma un presupuesto y pide una visita esta semana. La ficha se cualifica y su prioridad sube, así que el agente responsable empieza por ahí.",
    },
    fits: [
      { en: "Gmail and WhatsApp conversations", es: "Conversaciones de Gmail y WhatsApp" },
      { en: "The native CRM", es: "El CRM propio" },
    ],
    related: ["ai-sales-agent", "crm", "daily-assistant"],
  },
  {
    slug: "crm",
    stage: "understand",
    status: "live",
    name: { en: "Universal CRM", es: "CRM universal" },
    navLine: { en: "One record per customer", es: "Una ficha por cliente" }, // C3 §1.3
    h1: { en: "Every message, from every channel, on one record.", es: "Cada mensaje, de cada canal, en una sola ficha." },
    lead: {
      // WCR-070
      en: "A CRM is included from the start: every enquiry is recorded as a lead with its qualification and history. The CRM view for your team and Google Sheets per agency are being built. Connecting HubSpot, Pipedrive, Zoho or Salesforce is not offered yet.",
      es: "Hay un CRM incluido desde el principio: cada consulta queda registrada como lead con su cualificación y su historial. La vista de CRM para tu equipo y Google Sheets por agencia se están construyendo. La conexión con HubSpot, Pipedrive, Zoho o Salesforce todavía no se ofrece.",
    },
    points: [
      { text: { en: "Leads recorded with their qualification, included.", es: "Leads registrados con su cualificación, incluido." }, status: "live" }, // WCR-071
      { text: { en: "Google Sheets.", es: "Google Sheets." }, status: "in_implementation" }, // WCR-072
      { text: { en: "The conversation history on the customer record.", es: "El historial de conversación en la ficha del cliente." }, status: "live" }, // WCR-073
      { text: { en: "HubSpot, Pipedrive, Zoho CRM and Salesforce.", es: "HubSpot, Pipedrive, Zoho CRM y Salesforce." }, status: "certified_gate_pending" },
    ],
    scenario: {
      // WCR-075
      en: "The office manager opens one record and sees the email from last week, the qualification and the viewing request that became a task. Nothing has to be reconstructed.",
      es: "La responsable de oficina abre una ficha y ve el email de la semana pasada, la cualificación y la petición de visita que pasó a ser una tarea. No hay que reconstruir nada.",
    },
    fits: [
      { en: "Native CRM", es: "CRM propio" },
      { en: "Google Sheets", es: "Google Sheets" },
    ],
    bothHalves: {
      // WCR-076, WCR-077
      certified: { en: "External CRM connections for HubSpot, Pipedrive, Zoho CRM and Salesforce were connected with real authorisation in our staging tests in August.", es: "Las conexiones con CRM externos para HubSpot, Pipedrive, Zoho CRM y Salesforce se conectaron con autorización real en nuestras pruebas de agosto." },
      pending: { en: "Not offered yet. Each provider is released on its own after a final check. Until then you stay on the built in CRM, and choosing one during setup only records your interest.", es: "Todavía no se ofrece. Cada proveedor se activa por separado tras una comprobación final. Hasta entonces sigues con el CRM incluido, y elegir uno durante la configuración solo registra tu interés." },
    },
    related: ["lead-intelligence", "ai-sales-agent", "property-matching"],
  },
  {
    slug: "property-matching",
    stage: "advance",
    status: "in_implementation", // WCR-080
    name: { en: "Property Matching", es: "Property Matching" },
    navLine: { en: "A short, honest selection. In development", es: "Una selección corta y honesta. En desarrollo" }, // C3 §1.3
    h1: { en: "A short, relevant selection, with availability the agency can stand behind.", es: "Una selección corta y relevante, con una disponibilidad que la agencia puede defender." },
    lead: {
      // WCR-081
      en: "Being built. Not offered yet. Nuova understands what the customer is looking for and matches it against your own authorised inventory. The customer receives a short selection. Your agent sees the wider set.",
      es: "En construcción. Todavía no se ofrece. Nuova entiende qué busca el cliente y lo cruza con tu propio inventario autorizado. El cliente recibe una selección corta. Tu agente ve el conjunto completo.",
    },
    points: [
      { text: { en: "Understands what the customer is actually looking for.", es: "Entiende qué busca realmente el cliente." }, status: "in_implementation" }, // WCR-080
      { text: { en: "Matches against your own or agency authorised property sources.", es: "Cruza con tus propias fuentes de propiedades o fuentes autorizadas por la agencia." }, status: "in_implementation" },
      { text: { en: "Honest availability. Nothing is shown as available that the agency cannot stand behind.", es: "Disponibilidad honesta. No se muestra como disponible nada que la agencia no pueda defender." }, status: "in_implementation" },
      { text: { en: "A viewing request becomes a staff task.", es: "Una petición de visita pasa a ser una tarea del equipo." }, status: "final_acceptance" },
    ],
    scenario: {
      // WCR-083 (F-03: no fixed count)
      en: "A buyer asks for a two bedroom apartment near the beach with a terrace. Nuova sends a short selection from the agency's own inventory that matches, marks the one whose availability could not be confirmed, and the viewing request lands with the agent as a task.",
      es: "Un comprador pide un piso de dos dormitorios cerca de la playa con terraza. Nuova envía una selección corta del inventario propio de la agencia que encaja, marca la que no pudo confirmar como disponible y la petición de visita llega al agente como una tarea.",
    },
    fits: [
      { en: "Your agency website as a property source", es: "La web de tu agencia como fuente de propiedades" },
      { en: "A supported feed", es: "Un feed compatible" },
      { en: "Your CRM inventory", es: "El inventario de tu CRM" },
    ],
    video: "V-03",
    related: ["property-experience", "crm", "daily-assistant"],
  },
  {
    slug: "daily-assistant",
    stage: "handover",
    status: "final_acceptance",
    name: { en: "Daily Assistant", es: "Daily Assistant" },
    navLine: { en: "What to do first, and why", es: "Qué hacer primero, y por qué" }, // C3 §1.3
    h1: { en: "Your agents stop administering the pipeline.", es: "Tus agentes dejan de administrar el pipeline." },
    lead: {
      en: "Daily Goals and the assistant tell your team what to do first, and why. Built, with the final owner test still pending before it is offered.",
      es: "Daily Goals y la asistente le dicen a tu equipo qué hacer primero, y por qué. Construido, con la prueba final del propietario todavía pendiente antes de ofrecerlo.", // WCR-090
    },
    points: [
      { text: { en: "Daily Goals for each agent.", es: "Daily Goals para cada agente." }, status: "final_acceptance" },
      { text: { en: "An assistant that answers questions about your own leads, viewings and priorities.", es: "Una asistente que responde preguntas sobre tus propios leads, visitas y prioridades." }, status: "final_acceptance" },
      { text: { en: "Branded email, so what the assistant sends goes out under your agency's brand.", es: "Email con tu marca, para que lo que envíe la asistente salga con la marca de tu agencia." }, status: "final_acceptance" },
      { text: { en: "An employee assistant for internal tasks.", es: "Una asistente para los empleados y sus tareas internas." }, status: "in_implementation" },
    ],
    scenario: {
      en: "An agent starts the day and asks who to call first. The assistant lists the leads whose priority rose overnight and explains, for each one, what changed.",
      es: "Un agente empieza el día y pregunta a quién llamar primero. La asistente enumera los leads cuya prioridad subió durante la noche y explica, para cada uno, qué cambió.",
    },
    fits: [
      { en: "Desktop and mobile", es: "Escritorio y móvil" },
      { en: "Your team and roles", es: "Tu equipo y sus roles" },
    ],
    video: "V-04",
    related: ["lead-intelligence", "property-matching", "crm"],
  },
  {
    slug: "voice",
    stage: "answer",
    status: "certified_gate_pending",
    name: { en: "Voice", es: "Voz" },
    navLine: { en: "Phone calls. Not offered yet", es: "Llamadas. Todavía no se ofrece" }, // C3 §1.3
    h1: { en: "Voice: certified on our side, waiting on the gates.", es: "Voz: certificado por nuestra parte, a la espera de las puertas." },
    lead: {
      // WCR-100 (V-07: no language count)
      en: "Voice handling is certified in our own testing. It is not offered until the legal disclosure and the provider gates clear.",
      es: "La atención por voz está certificada en nuestras propias pruebas. No se ofrece hasta que se resuelvan la información legal y las puertas del proveedor.",
    },
    points: [
      { text: { en: "Answers a call and speaks with the caller.", es: "Atiende una llamada y habla con quien llama." }, status: "certified_gate_pending" },
      { text: { en: "Multilingual calls, certified internally.", es: "Llamadas en varios idiomas, certificadas internamente." }, status: "certified_gate_pending" }, // WCR-100
      { text: { en: "What the call produced lands on the same customer record.", es: "Lo que produjo la llamada aterriza en la misma ficha de cliente." }, status: "certified_gate_pending" },
    ],
    scenario: {
      en: "A caller asks about a villa in Benahavís. The call is handled in the caller's language and the summary reaches the customer record. This is the certified behaviour, not an offer.",
      es: "Alguien llama para preguntar por una villa en Benahavís. La llamada se atiende en el idioma de quien llama y el resumen llega a la ficha de cliente. Este es el comportamiento certificado, no una oferta.",
    },
    fits: [{ en: "Phone", es: "Teléfono" }],
    bothHalves: {
      certified: { en: "Certified internally.", es: "Certificado internamente." }, // WCR-100
      pending: { en: "The legal disclosure and the provider gates are pending. Until both clear, Voice is not offered to any agency.", es: "La información legal y las puertas del proveedor están pendientes. Hasta que ambas se resuelvan, Voz no se ofrece a ninguna agencia." },
    },
    video: "V-02",
    related: ["ai-sales-agent", "lead-intelligence"],
  },
  {
    slug: "social-growth",
    stage: "attract",
    status: "certified_gate_pending",
    name: { en: "Social Growth", es: "Social Growth" },
    navLine: { en: "Comments and posts. Not offered yet", es: "Comentarios y publicaciones. Todavía no se ofrece" }, // WCR-110, C3 §1.3
    h1: { en: "Present in public, restrained by design.", es: "Presente en público, contenido por diseño." },
    lead: {
      // WCR-110
      en: "Built and tested internally. The Meta review has not been submitted yet. Until it clears, Social Growth is not offered.",
      es: "Construido y probado internamente. La revisión de Meta todavía no se ha solicitado. Hasta que se resuelva, Social Growth no se ofrece.",
    },
    points: [
      { text: { en: "Content help for property and social posts in your brand voice.", es: "Ayuda con el contenido de propiedades y publicaciones en la voz de tu marca." }, status: "certified_gate_pending" },
      { text: { en: "A genuine comment becomes a private conversation, where the platform permits it.", es: "Un comentario real se convierte en una conversación privada, donde la plataforma lo permita." }, status: "certified_gate_pending" },
      { text: { en: "Deliberately restrained. Built to protect your accounts, not to farm engagement.", es: "Deliberadamente contenido. Hecho para proteger tus cuentas, no para acumular interacciones." }, status: "certified_gate_pending" },
    ],
    scenario: {
      en: "Someone comments on a listing asking about the price. The reply moves the conversation into a private channel and, if the person chooses, onward to WhatsApp, where it becomes one customer record.",
      es: "Alguien comenta en un anuncio preguntando por el precio. La respuesta lleva la conversación a un canal privado y, si la persona quiere, a WhatsApp, donde pasa a ser una ficha de cliente.",
    },
    fits: [{ en: "WhatsApp, as the continuation channel", es: "WhatsApp, como canal de continuación" }],
    bothHalves: {
      // WCR-110
      certified: { en: "Built and tested internally.", es: "Construido y probado internamente." },
      pending: { en: "The Meta review has not been submitted yet. Until it clears, nothing is offered.", es: "La revisión de Meta todavía no se ha solicitado. Hasta que se resuelva, no se ofrece nada." },
    },
    notAvailable: [
      { en: "TikTok.", es: "TikTok." },
      { en: "Facebook Groups.", es: "Grupos de Facebook." },
    ],
    video: "V-09",
    related: ["lead-acquisition", "ai-sales-agent"],
  },
  {
    slug: "lead-acquisition",
    stage: "attract",
    status: "certified_gate_pending",
    name: { en: "Lead Acquisition", es: "Captación de leads" },
    navLine: { en: "Leads from your campaigns. Not offered yet", es: "Leads de tus campañas. Todavía no se ofrece" }, // C3 §1.3
    h1: { en: "Leads from your campaigns, carrying the source they came from.", es: "Leads de tus campañas, con la fuente de la que vienen." },
    lead: {
      en: "Meta Lead Ads and Google Lead Forms are certified on our internal harness. The provider test is pending. Until it clears, paid acquisition is not offered.",
      es: "Meta Lead Ads y Google Lead Forms están certificados en nuestro entorno interno de pruebas. La prueba del proveedor está pendiente. Hasta que se resuelva, la captación de pago no se ofrece.",
    },
    points: [
      { text: { en: "Meta Lead Ads intake.", es: "Recepción de Meta Lead Ads." }, status: "certified_gate_pending" },
      { text: { en: "Google Lead Forms intake.", es: "Recepción de Google Lead Forms." }, status: "certified_gate_pending" },
      { text: { en: "Each lead carries the campaign and source it came from.", es: "Cada lead lleva la campaña y la fuente de la que viene." }, status: "certified_gate_pending" },
    ],
    scenario: {
      en: "A lead form on a Meta campaign is submitted. It arrives in Nuova with its campaign attached and is answered like any other enquiry. This is the certified behaviour, not an offer.",
      es: "Se envía un formulario de una campaña de Meta. Llega a Nuova con su campaña adjunta y se responde como cualquier otra consulta. Este es el comportamiento certificado, no una oferta.",
    },
    fits: [
      { en: "Meta Lead Ads", es: "Meta Lead Ads" },
      { en: "Google Lead Forms", es: "Google Lead Forms" },
    ],
    bothHalves: {
      certified: { en: "Certified on our internal test harness.", es: "Certificado en nuestro entorno interno de pruebas." },
      pending: { en: "The provider test is pending. Nuova never runs, manages or optimises your advertising. It receives and attributes leads.", es: "La prueba del proveedor está pendiente. Nuova nunca gestiona ni optimiza tu publicidad. Recibe y atribuye leads." },
    },
    related: ["social-growth", "lead-intelligence"],
  },
  {
    slug: "property-experience",
    stage: "advance",
    status: "premium_on_request",
    name: { en: "Property Experience 3D", es: "Property Experience 3D" },
    navLine: { en: "Room by room, on request", es: "Habitación por habitación, bajo petición" }, // C3 §1.3
    h1: { en: "Room by room, through the real doorways.", es: "Habitación por habitación, por las puertas reales." },
    lead: {
      en: "A finished property experience, created by Nuova and checked by a person before it reaches a buyer. A premium service, on request, in preparation.",
      es: "Una experiencia de la propiedad terminada, creada por Nuova y revisada por una persona antes de llegar a un comprador. Un servicio premium, bajo petición, en preparación.",
    },
    points: [
      { text: { en: "A real panorama for every room, floor to ceiling.", es: "Un panorama real de cada habitación, del suelo al techo." }, status: "premium_on_request" },
      { text: { en: "Movement between rooms through the real doorways. Structured by design. No joystick, no getting lost.", es: "Movimiento entre habitaciones por las puertas reales. Estructurado por diseño. Sin joystick, sin perderse." }, status: "premium_on_request" },
      { text: { en: "The real floor plan alongside, with the current room and the direction you are facing.", es: "El plano real al lado, con la habitación actual y hacia dónde miras." }, status: "premium_on_request" },
      { text: { en: "Created by Nuova and quality checked by a person.", es: "Creado por Nuova y revisado en calidad por una persona." }, status: "premium_on_request" },
    ],
    scenario: {
      en: "An agency requests an experience for a villa. Nuova creates it, a person checks it, and the accepted delivery reaches the agency. The buyer walks through it room by room before booking a flight.",
      es: "Una agencia solicita una experiencia para una villa. Nuova la crea, una persona la revisa y la entrega aceptada llega a la agencia. El comprador la recorre habitación por habitación antes de reservar un vuelo.",
    },
    fits: [{ en: "Property Matching, which links the finished experience to the customer", es: "Property Matching, que enlaza la experiencia terminada con el cliente" }],
    honesty: {
      en: "This is a service we prepare, not a tool you operate. There is no automatic floor plan generation and no self-service creation. A request is a request, and a delivery is an accepted delivery. Upload and delivery access follows your package. If it is not enabled, it never blocks your agency from going live.",
      es: "Es un servicio que preparamos, no una herramienta que manejas tú. No hay generación automática de planos ni creación en autoservicio. Una petición es una petición, y una entrega es una entrega aceptada. El acceso a subida y entrega depende de tu paquete. Si no está activado, nunca impide que tu agencia salga en vivo.",
    },
    video: "V-08",
    related: ["property-matching", "crm"],
  },
];

export function capability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

export function t(l: L, locale: Locale): string {
  return l[locale];
}

export const stageOrder: Stage[] = ["attract", "answer", "understand", "advance", "handover"];

export function capabilitiesByStage(): Record<Stage, Capability[]> {
  const out = { attract: [], answer: [], understand: [], advance: [], handover: [] } as Record<Stage, Capability[]>;
  for (const c of capabilities) out[c.stage].push(c);
  return out;
}
