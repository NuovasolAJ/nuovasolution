import type { Locale } from "@/lib/i18n/config";

/**
 * The five product demonstrations of the home page (owner follow-up order 2026-10-06 §5): one case each,
 * chosen in the same page context. Every scene says what kind of picture it is:
 *
 *   real       a product path that exists in production, shown with invented people and data
 *   prototype  a design prototype of something that is not available yet; it waits for the product proof
 *
 * Texts: WORKING by the implementer unless a Copy source is named; Copy confirms after the implementation.
 * The example reference is EST-204 everywhere (owner 2026-10-06; COPY_DELTAS_1003 §7).
 */
export type L = Record<Locale, string>;
export type SceneKind = "real" | "prototype";
export type SceneKey = "reply" | "match" | "team" | "social" | "model";

export interface SceneStep {
  title: L;
  line: L;
}

export interface Scene {
  key: SceneKey;
  /** The short word on the selector. */
  tab: L;
  /** The benefit headline. */
  title: L;
  /** One short sentence. */
  line: L;
  kind: SceneKind;
  /** The honest state line under the stage. */
  state: L;
  steps: SceneStep[];
}

export const REFERENCE = "EST-204";
export const REFERENCE_2 = "EST-231";

export const scenes: Scene[] = [
  {
    key: "reply",
    tab: { es: "Responder", en: "Answer" },
    title: { es: "Cada consulta recibe respuesta y queda registrada", en: "Every enquiry is answered and recorded" },
    line: { es: "Un mensaje entra, la respuesta sale en español y la ficha del cliente queda hecha.", en: "A message comes in, the reply goes out in Spanish and the customer record is made." },
    kind: "real",
    state: { es: "Disponible: respuesta en español, ficha del cliente y tarea para el equipo. El teléfono como entrada está en preparación.", en: "Available: the reply in Spanish, the customer record and the task for the team. The phone as a way in is in preparation." },
    steps: [
      { title: { es: "Llega una consulta por WhatsApp", en: "An enquiry arrives on WhatsApp" }, line: { es: "Laura pregunta por un piso en Estepona un domingo por la noche.", en: "Laura asks about a flat in Estepona on a Sunday night." } }, // title: COPY_DELTAS_1003 §1.1
      { title: { es: "Nuova responde en español", en: "Nuova replies in Spanish" }, line: { es: "Tus clientes saben que responde un asistente, y nada queda comprometido: ni precio, ni fecha, ni condición.", en: "Your customers are told an assistant is replying, and nothing is committed: no price, no date, no condition." } }, // D-93 without the trust clause (owner 2026-10-06)
      { title: { es: "Se crea la ficha del cliente", en: "The customer record is created" }, line: { es: "Lo que ha pedido queda guardado: el inmueble, la visita y su idioma.", en: "What she asked for is kept: the property, the viewing and her language." } },
      { title: { es: "Tu equipo toma la visita", en: "Your team takes the viewing" }, line: { es: "Una persona de tu equipo confirma la visita. Nuova no acuerda fechas.", en: "One of your people confirms the viewing. Nuova agrees no dates." } }, // W-8, W-7
    ],
  },
  {
    key: "match",
    tab: { es: "Encontrar", en: "Find" },
    title: { es: "El cliente dice qué busca y recibe inmuebles que encajan", en: "The customer says what they want and gets properties that fit" },
    line: { es: "Zona, presupuesto y dormitorios; dos propuestas de tu cartera; el envío por WhatsApp o email.", en: "Area, budget and bedrooms; two proposals from your portfolio; sent on WhatsApp or by email." },
    kind: "prototype",
    state: { es: "Prototipo de diseño. Property matching está en preparación y todavía no se puede contratar. La disponibilidad no se consulta en ninguna fuente, por eso aquí no se afirma.", en: "Design prototype. Property matching is in preparation and cannot be ordered yet. Availability is not looked up anywhere, so it is not claimed here." },
    steps: [
      { title: { es: "El cliente dice qué busca", en: "The customer says what they want" }, line: { es: "Dos dormitorios en Estepona, un presupuesto y una terraza.", en: "Two bedrooms in Estepona, a budget and a terrace." } },
      { title: { es: "Dos inmuebles de tu cartera encajan", en: "Two properties from your portfolio fit" }, line: { es: "Solo inmuebles tuyos, con tus fotos y tus textos.", en: "Only your own listings, with your photos and your texts." } },
      { title: { es: "La propuesta sale por el mismo canal", en: "The proposal goes out on the same channel" }, line: { es: "Por WhatsApp o por email, con el nombre de tu agencia.", en: "On WhatsApp or by email, under your agency's name." } },
    ],
  },
  {
    key: "team",
    tab: { es: "Coordinar", en: "Coordinate" },
    title: { es: "Cada mañana, tu equipo sabe qué va primero", en: "Every morning, your team knows what comes first" },
    line: { es: "La lista del día, el motivo de cada prioridad, y una persona que toma y cierra la tarea.", en: "The day's list, the reason behind each priority, and one person who takes and closes the task." },
    kind: "prototype",
    state: { es: "Disponible: la lista de tareas, tomar y completar. Prototipo de diseño: la vista de la mañana con sus motivos y el aviso por WhatsApp, pendientes de un envío real de extremo a extremo.", en: "Available: the task list, take and complete. Design prototype: the morning view with its reasons and the WhatsApp notice, pending one real end to end send." },
    steps: [
      { title: { es: "La mañana empieza con la lista", en: "The morning starts with the list" }, line: { es: "Lo que ha llegado desde ayer, en un solo sitio.", en: "What came in since yesterday, in one place." } },
      { title: { es: "Cada prioridad tiene su motivo", en: "Each priority has its reason" }, line: { es: "Primero lo que tiene fecha o lleva más tiempo esperando. Un presupuesto alto no es urgencia.", en: "First what has a date or has waited longest. A high budget is not urgency." } },
      { title: { es: "Una persona la toma", en: "One person takes it" }, line: { es: "Queda a su nombre; nadie más puede tomarla.", en: "It is theirs; nobody else can take it." } },
      { title: { es: "Hecha, fuera de la lista", en: "Done, off the list" }, line: { es: "Lo cerrado desaparece; lo abierto sigue a la vista.", en: "What is closed disappears; what is open stays in view." } },
    ],
  },
  {
    key: "social",
    tab: { es: "Captar", en: "Attract" },
    title: { es: "Una publicación trae comentarios, y los comentarios traen contactos", en: "A post brings comments, and comments bring contacts" },
    line: { es: "Eliges un inmueble, se prepara el texto, y cada comentario o mensaje acaba en una ficha.", en: "You pick a listing, the text is prepared, and every comment or message ends in a record." },
    kind: "prototype",
    state: { es: "Prototipo de diseño. Social Growth está en preparación, depende de la aprobación de la plataforma y todavía no se puede contratar.", en: "Design prototype. Social Growth is in preparation, depends on the platform's approval and cannot be ordered yet." },
    steps: [
      { title: { es: "Eliges un inmueble tuyo", en: "You pick one of your listings" }, line: { es: "Con tus fotos y la referencia de tu cartera.", en: "With your photos and your portfolio's reference." } }, // titles 1 to 3: COPY_DELTAS_1003 §1.4
      { title: { es: "Se prepara la publicación", en: "The post is prepared" }, line: { es: "Tú la apruebas antes de que salga.", en: "You approve it before it goes out." } },
      { title: { es: "Llega un comentario o mensaje", en: "A comment or message arrives" }, line: { es: "La respuesta es una que tú permitiste, y nunca afirma disponibilidad.", en: "The reply is one you allowed, and it never claims availability." } },
      { title: { es: "El contacto queda en su ficha", en: "The contact lands in a record" }, line: { es: "Con el inmueble por el que preguntó y el canal por el que llegó.", en: "With the property they asked about and the channel they came from." } },
    ],
  },
  {
    key: "model",
    tab: { es: "Presentar", en: "Present" },
    title: { es: "Del plano al modelo 3D del mismo inmueble", en: "From the floor plan to a 3D model of the same property" },
    line: { es: "Nos envías el plano acotado; lo construimos y comprobamos; el cliente lo recorre planta por planta.", en: "You send us the dimensioned plan; we build and check it; the customer looks at it floor by floor." },
    kind: "prototype",
    state: { es: "Disponible por encargo: cada modelo lo hacemos nosotros a partir de tus planos. No es automático y no hay cupo. Estas vistas son ilustraciones; el visor real se incorpora tras la aceptación visual.", en: "Available per order: we build each model from your plans. It is not automatic and there is no quota. These views are illustrations; the real viewer follows the visual acceptance." },
    steps: [
      { title: { es: "Nos envías el plano acotado", en: "You send us the dimensioned plan" }, line: { es: "Y fotos, si las tienes: nos ayudan a elegir una ambientación parecida.", en: "And photos, if you have them: they help us choose a similar furnishing." } }, // COPY_DELTAS_1003 §1.5
      { title: { es: "Construimos y comprobamos el modelo", en: "We build and check the model" }, line: { es: "A escala según tu plano. Mueve el control para comparar plano y modelo.", en: "To scale from your plan. Move the control to compare plan and model." } },
      { title: { es: "El cliente elige planta y mobiliario", en: "The customer chooses floor and furnishing" }, line: { es: "Planta baja o alta, muebles sí o no. Sin tejado, sin paseo a ojo de persona.", en: "Ground or upper floor, furniture on or off. No roof, no eye-level walkthrough." } },
    ],
  },
];

/** Words inside the stages (synthetic people and properties; the same case everywhere). */
export const sceneWords = {
  kindReal: { es: "Recorrido real del producto. Ejemplo ilustrativo con personas y datos inventados.", en: "A real product path. Illustrative example with invented people and data." },
  kindPrototype: { es: "Prototipo de diseño. Todavía no disponible. Ejemplo ilustrativo.", en: "Design prototype. Not available yet. Illustrative example." },
  illustrative: { es: "Ejemplo ilustrativo", en: "Illustrative example" },
  entry: { whatsapp: { es: "Por WhatsApp", en: "On WhatsApp" }, phone: { es: "Por teléfono", en: "By phone" }, label: { es: "Canal de entrada", en: "Way in" } },
  phone: {
    incoming: { es: "Llamada entrante", en: "Incoming call" },
    caller: { es: "Número desconocido · domingo 21:40", en: "Unknown number · Sunday 21:40" },
    noted: { es: "Lo que pide, anotado", en: "What they want, noted" },
    wish: { es: ["Quiere ver un piso de 2 dormitorios en Estepona", "El jueves por la mañana", "Se llama Laura Serrano"], en: ["Wants to view a 2 bedroom flat in Estepona", "Thursday morning", "Her name is Laura Serrano"] },
    state: { es: "Asistente telefónico en preparación", en: "Phone assistant in preparation" },
  },
  match: {
    wish: { es: "Busco un piso de dos dormitorios en Estepona, con terraza, hasta 320.000 €. ¿Tenéis algo?", en: "Busco un piso de dos dormitorios en Estepona, con terraza, hasta 320.000 €. ¿Tenéis algo?" },
    from: { es: "Carlos R. · WhatsApp · lunes 09:12", en: "Carlos R. · WhatsApp · Monday 09:12" },
    criteria: { es: ["Estepona", "2 dormitorios", "Terraza", "Hasta 320.000 €"], en: ["Estepona", "2 bedrooms", "Terrace", "Up to €320,000"] },
    cards: {
      es: [
        { ref: REFERENCE, title: "Piso en Estepona, 2 dormitorios", meta: "Terraza · 78 m² · tu cartera" },
        { ref: REFERENCE_2, title: "Ático en Estepona, 2 dormitorios", meta: "Terraza con vistas · 71 m² · tu cartera" },
      ],
      en: [
        { ref: REFERENCE, title: "Flat in Estepona, 2 bedrooms", meta: "Terrace · 78 m² · your portfolio" },
        { ref: REFERENCE_2, title: "Penthouse in Estepona, 2 bedrooms", meta: "Terrace with views · 71 m² · your portfolio" },
      ],
    },
    reply: { es: "Hola Carlos, gracias por escribir. En Estepona tenemos dos pisos de dos dormitorios con terraza dentro de lo que buscas: EST-204 y EST-231. Te paso las fichas. ¿Quieres verlos esta semana?", en: "Hola Carlos, gracias por escribir. En Estepona tenemos dos pisos de dos dormitorios con terraza dentro de lo que buscas: EST-204 y EST-231. Te paso las fichas. ¿Quieres verlos esta semana?" },
    channel: { es: "Enviado por WhatsApp · también posible por email", en: "Sent on WhatsApp · also possible by email" },
    photo: { es: "Tus fotos del inmueble", en: "Your photos of the property" },
  },
  team: {
    morning: { es: "Lunes · 08:30 · tu lista", en: "Monday · 08:30 · your list" },
    arrived: { es: "Desde ayer han llegado", en: "Since yesterday" },
    items: {
      es: [
        { who: "Laura Serrano", what: "Visita pedida: jueves por la mañana · EST-204", when: "domingo 21:40", reason: "Pidió una fecha concreta" },
        { who: "Álvaro Pons", what: "Preguntó el precio por teléfono", when: "domingo 18:05", reason: "Lleva más tiempo esperando" },
        { who: "Sofía L.", what: "Alquiler de larga temporada en Fuengirola", when: "lunes 07:50", reason: "Sin fecha; puede esperar al mediodía" },
      ],
      en: [
        { who: "Laura Serrano", what: "Viewing asked for: Thursday morning · EST-204", when: "Sunday 21:40", reason: "She named a date" },
        { who: "Álvaro Pons", what: "Asked for the price by phone", when: "Sunday 18:05", reason: "Has waited longest" },
        { who: "Sofía L.", what: "Long-term rental in Fuengirola", when: "Monday 07:50", reason: "No date; can wait until noon" },
      ],
    },
    priority: { es: "Prioridad", en: "Priority" },
    why: { es: "Motivo", en: "Reason" },
    take: { es: "Tomar", en: "Take" },
    taken: { es: "Tomada por ti", en: "Taken by you" },
    complete: { es: "Marcar como hecha", en: "Mark as done" },
    done: { es: "Hecha. Sale de la lista.", en: "Done. It leaves the list." },
    open: { es: "Abierta · nadie la ha tomado todavía", en: "Open · nobody has taken it yet" },
    again: { es: "Volver a empezar", en: "Start again" },
    whatsappNote: { es: "El aviso de la mañana por WhatsApp es un prototipo: falta un envío real.", en: "The morning notice on WhatsApp is a prototype: one real send is missing." },
  },
  social: {
    listing: { es: "Piso en Estepona · EST-204", en: "Flat in Estepona · EST-204" },
    listingMeta: { es: "2 dormitorios · terraza · tus fotos", en: "2 bedrooms · terrace · your photos" },
    draft: { es: "Borrador de publicación", en: "Draft post" },
    caption: { es: "Dos dormitorios, terraza y luz de mañana en Estepona. Ref. EST-204.", en: "Dos dormitorios, terraza y luz de mañana en Estepona. Ref. EST-204." },
    approve: { es: "Aprobar", en: "Approve" },
    approved: { es: "Aprobada por ti", en: "Approved by you" },
    comment: { es: "¿Sigue disponible? Me interesa.", en: "¿Sigue disponible? Me interesa." },
    commenter: { es: "Marta G. · comentario", en: "Marta G. · comment" },
    reply: { es: "Gracias por preguntar, Marta. Te escribimos por privado con los detalles.", en: "Gracias por preguntar, Marta. Te escribimos por privado con los detalles." },
    replyMeta: { es: "Una respuesta que tú permitiste · no afirma disponibilidad", en: "A reply you allowed · claims no availability" },
    record: { es: "Marta G.", en: "Marta G." },
    recordLines: { es: ["Pregunta por: EST-204", "Llegó por: comentario en una publicación", "Siguiente: contacto por privado"], en: ["Asks about: EST-204", "Came in by: a comment on a post", "Next: a private message"] },
  },
  model: {
    plan: { es: "Plano acotado", en: "Dimensioned plan" },
    model: { es: "Modelo 3D", en: "3D model" },
    compare: { es: "Comparar plano y modelo", en: "Compare plan and model" },
    floors: { es: ["Planta baja", "Planta alta"], en: ["Ground floor", "Upper floor"] },
    furniture: { es: "Mobiliario", en: "Furniture" },
    on: { es: "Sí", en: "On" },
    off: { es: "No", en: "Off" },
    rooms: { es: ["Salón", "Cocina", "Dormitorio", "Baño", "Terraza"], en: ["Living room", "Kitchen", "Bedroom", "Bathroom", "Terrace"] },
    note: { es: "Ilustración. En el modelo real el mobiliario es ilustrativo y se puede apagar.", en: "Illustration. In the real model the furnishing is illustrative and can be switched off." },
    sent: { es: "Plano recibido · EST-204", en: "Plan received · EST-204" },
  },
} satisfies Record<string, unknown>;
