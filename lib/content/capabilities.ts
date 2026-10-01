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

/**
 * Publication register (audit R27, 2026-09-24). The public site renders only entries marked
 * `live` (proven in production) or `on_request` (a premium service, deliverable on request).
 * `hidden` entries keep their data here but have no page, no menu entry, no footer link and no
 * sitemap entry, so no internal status formula reaches a visitor. The values below are the
 * implementer's provisional register from the evidence index; Copy's LAUNCH_COPY_v1 register
 * replaces them when it arrives, and a flip here changes every surface at once.
 */
export type PublishState = "live" | "on_request" | "hidden";

export interface CapabilityPoint {
  text: L;
  status: CapabilityStatus;
}

export interface Capability {
  slug: string;
  stage: Stage;
  /** Publication state (R27). Only live and on_request render publicly. */
  publish: PublishState;
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
  /** A material limit the buyer needs for the decision, said on the page (COPY_DELTAS_0929 D-39). */
  note?: L;
  video?: string;
  related: string[];
}

export const capabilities: Capability[] = [
  {
    slug: "ai-sales-agent",
    stage: "answer",
    publish: "live",
    status: "live",
    name: { en: "AI Sales Agent", es: "AI Sales Agent" },
    navLine: { en: "Answers text enquiries, day or night", es: "Responde consultas de texto, de día o de noche" }, // C3 §1.3
    h1: { en: "Your text enquiries are answered on the channels you connect.", es: "Tus consultas de texto se responden en los canales que conectes." }, // LAUNCH_COPY_v1 §6.1
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
      // WCR-041/056 (branded replies) is not listed until BRANDING_CHAIN_MATRIX_v1 proves it (audit Z08).
    ],
    notAvailable: [],
    video: "V-01",
    related: ["lead-intelligence", "crm", "voice"],
  },
  {
    slug: "lead-intelligence",
    stage: "understand",
    publish: "live",
    status: "live",
    name: { en: "Lead Intelligence", es: "Lead Intelligence" },
    // COPY_DELTAS_0929 L-03, D-38: qualification and priority are not in production, so they are not claimed.
    // The h1 is the D-38 line; scenario and lead are limited to the proven same-channel identity (interim implementer wording).
    navLine: { en: "Keeps what each customer told you", es: "Guarda lo que te ha contado cada cliente" },
    h1: { en: "Keeps what each customer told you.", es: "Guarda lo que te ha contado cada cliente." },
    lead: {
      // WCR-062 = WCR-020, first sentence; the cross-channel sentence is a status formula (R27)
      en: "A client who writes twice on the same channel stays one person in Nuova, with what they asked for kept on their record.",
      es: "Un cliente que escribe dos veces por el mismo canal sigue siendo una sola persona en Nuova, con lo que ha pedido guardado en su ficha.",
    },
    points: [
      { text: { en: "One canonical customer identity across channels.", es: "Una identidad de cliente única en todos los canales." }, status: "in_implementation" }, // WCR-063
      { text: { en: "What the customer asked for, kept on their record.", es: "Lo que ha pedido el cliente, guardado en su ficha." }, status: "live" }, // D-26
      { text: { en: "Qualification on every answered enquiry.", es: "Cualificación en cada consulta respondida." }, status: "in_implementation" }, // WCR-064; staging only (LEAD_TRUTH_INPUT_v1 §1)
      // WCR-065 removed rather than retensed: CLAIMS_MATRIX D-10 forbids every hot lead wording.
      { text: { en: "A priority signal so your team knows where to start.", es: "Una señal de prioridad para que tu equipo sepa por dónde empezar." }, status: "in_implementation" }, // not asserted in production (COPY_DELTAS_0929 L-03)
    ],
    scenario: {
      en: "The buyer from Sunday writes again on WhatsApp on Tuesday. Her message lands on the same record, next to what she asked for before.",
      es: "La compradora del domingo vuelve a escribir por WhatsApp el martes. Su mensaje llega a la misma ficha, junto a lo que había pedido antes.",
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
    publish: "live",
    status: "live",
    name: { en: "CRM", es: "CRM" }, // "Universal" dropped: unproven universality (LAUNCH_COPY_v1 S-14)
    navLine: { en: "Leads, conversations and tasks in one place", es: "Leads, conversaciones y tareas en un solo lugar" }, // COPY_DELTAS_0929 D-38
    // D-39: the material limit is said on the page (LEAD_TRUTH_INPUT_v1 §3: no automatic person merge across channels).
    note: { en: "A customer who writes by e-mail and later on WhatsApp starts as two records until you link them. We would rather tell you that here than let you find it.", es: "Un cliente que escribe por email y después por WhatsApp empieza como dos fichas hasta que las unes. Preferimos decírtelo aquí y no que lo descubras tú." },
    // Public H1 and lead limited to what is proven (audit Z07, R27, LAUNCH_COPY_v1 §6.1): the connected channels on one record, included
    // from the start. Cross-channel identity, the team's CRM view, Google Sheets and external CRMs are
    // tracked in the launch blocker register, not stated on the page.
    h1: { en: "The messages from your connected channels, on one record.", es: "Los mensajes de tus canales conectados, en una sola ficha." }, // LAUNCH_COPY_v1 §6.1
    lead: {
      // WCR-070, first sentence
      // Interim wording 2026-10-01: qualification is not in production (LEAD_TRUTH_INPUT_v1 §1); Copy's D-12 / D-26 formula.
      en: "A CRM is included from the start: every enquiry is recorded as a lead with what the customer asked for and the conversation so far.",
      es: "Hay un CRM incluido desde el principio: cada consulta queda registrada como lead con lo que ha pedido el cliente y la conversación hasta ahora.",
    },
    points: [
      { text: { en: "Leads recorded with what each customer asked for, included.", es: "Leads registrados con lo que ha pedido cada cliente, incluido." }, status: "live" }, // WCR-071, interim wording 2026-10-01 (no qualification claim)
      { text: { en: "Google Sheets.", es: "Google Sheets." }, status: "in_implementation" }, // WCR-072
      { text: { en: "The conversation history on the customer record.", es: "El historial de conversación en la ficha del cliente." }, status: "live" }, // WCR-073
      { text: { en: "HubSpot, Pipedrive, Zoho CRM and Salesforce.", es: "HubSpot, Pipedrive, Zoho CRM y Salesforce." }, status: "certified_gate_pending" },
    ],
    scenario: {
      // WCR-075
      en: "The office manager opens one record and sees the email from last week, what the customer asked for and the viewing request that became a task. Nothing has to be reconstructed.",
      es: "La responsable de oficina abre una ficha y ve el email de la semana pasada, lo que pidió el cliente y la petición de visita que pasó a ser una tarea. No hay que reconstruir nada.",
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
    publish: "hidden", // in development: not published until it is proven (R27)
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
    // Built and shown as a product surface (owner criteria 2026-09-28: Daily tasks are one of the real
    // surfaces on the sales page); the final owner test is tracked in the launch blocker register, not on the page.
    publish: "live",
    status: "final_acceptance",
    // COPY_DELTAS_0929 D-34 to D-37 and DAILY_FEATURE_TRUTH: the task surface, not a chat assistant. The slug stays, so links keep working.
    name: { en: "Daily Tasks", es: "Tareas diarias" },
    navLine: { en: "The tasks your team takes and closes", es: "Las tareas que tu equipo toma y cierra" },
    h1: { en: "The request becomes a task somebody owns.", es: "La petición pasa a ser una tarea con dueño." },
    lead: {
      // WCR-090, first sentence; the final owner test is tracked in the launch blocker register (R27)
      en: "Every viewing request and every callback becomes a task with the customer, the property and the time they asked for.",
      es: "Cada petición de visita y cada llamada pendiente pasa a ser una tarea con el cliente, el inmueble y la hora que ha pedido.",
    },
    points: [
      { text: { en: "Whoever takes a task owns it. The others can see that it is taken and by whom.", es: "Quien toma una tarea se hace cargo de ella. Los demás ven que está tomada y por quién." }, status: "live" }, // DAILY_FEATURE_TRUTH §2
      { text: { en: "One tap takes it, one tap completes it.", es: "Un toque la toma, un toque la completa." }, status: "live" },
      { text: { en: "Nobody can take the same task twice, and only the person who took it can close it.", es: "Nadie puede tomar la misma tarea dos veces, y solo quien la tomó puede cerrarla." }, status: "live" },
      { text: { en: "In Spanish or in English, chosen in the app.", es: "En español o en inglés, elegido en la aplicación." }, status: "live" },
      { text: { en: "Daily Goals for each agent.", es: "Daily Goals para cada agente." }, status: "final_acceptance" },
      { text: { en: "An assistant that answers questions about your own leads, viewings and priorities.", es: "Una asistente que responde preguntas sobre tus propios leads, visitas y prioridades." }, status: "final_acceptance" },
      { text: { en: "Branded email, so what the assistant sends goes out under your agency's brand.", es: "Email con tu marca, para que lo que envíe la asistente salga con la marca de tu agencia." }, status: "final_acceptance" },
      { text: { en: "An employee assistant for internal tasks.", es: "Una asistente para los empleados y sus tareas internas." }, status: "in_implementation" },
    ],
    scenario: {
      en: "An agent opens the list, takes Laura Serrano's viewing task, and completes it once a person has agreed the time with her. The others see that it is taken, and by whom.",
      es: "Un agente abre la lista, toma la tarea de la visita de Laura Serrano y la completa cuando una persona ha acordado la hora con ella. Los demás ven que está tomada y quién la ha tomado.",
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
    publish: "hidden", // waits on the legal disclosure and the provider gates (R27)
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
    publish: "hidden", // waits on the Meta review (R27)
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
    publish: "hidden", // waits on the provider test (R27)
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
    // Premium on request, but the copy below still describes the retired room panorama product
    // (audit Z15). Hidden until the 3D lane's feature truth and the owner's visual acceptance
    // (3D_FEATURE_TRUTH, 3D_WEBSITE_ASSETS); then on_request.
    publish: "hidden",
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

/** Every entry, including hidden ones. Public surfaces use `publishedCapability` / `publishedCapabilities`. */
export function capability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

export function isPublished(c: Capability): boolean {
  return c.publish === "live" || c.publish === "on_request";
}

/** The entries the public site may render (R27). */
export function publishedCapabilities(): Capability[] {
  return capabilities.filter(isPublished);
}

/** A published entry by slug; undefined for unknown and for hidden slugs alike (the route answers 404). */
export function publishedCapability(slug: string): Capability | undefined {
  const c = capability(slug);
  return c && isPublished(c) ? c : undefined;
}

/** The points of a published capability that may be described in the present tense. */
export function publicPoints(c: Capability): CapabilityPoint[] {
  return c.points.filter((p) => p.status === "live" || p.status === "premium_on_request");
}

export function t(l: L, locale: Locale): string {
  return l[locale];
}

export const stageOrder: Stage[] = ["attract", "answer", "understand", "advance", "handover"];

/** Published capabilities grouped by stage; stages without a published entry are empty and are not rendered. */
export function capabilitiesByStage(): Record<Stage, Capability[]> {
  const out = { attract: [], answer: [], understand: [], advance: [], handover: [] } as Record<Stage, Capability[]>;
  for (const c of publishedCapabilities()) out[c.stage].push(c);
  return out;
}
