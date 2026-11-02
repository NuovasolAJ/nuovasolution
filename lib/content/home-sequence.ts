import type { Locale } from "@/lib/i18n/config";

/**
 * The central product sequence (the owner's order of 30.10., point 2): one enquiry, six steps, one clock. Each step says
 * who acts (Nuova automatically, a person at the agency, the customer), what happens, and what it means for the agency.
 * The people, the listing and the times are those of lib/content/home-story.ts (Laura Serrano · EST-204 · Tuesday 11:20
 * → Wednesday 09:02); nothing here contradicts the chapters below or the example report. WORKING text by the implementer,
 * for Copy; the states follow the chapters' state lines (ACCEPTANCE_LIST_1010.md) and change only with a lane's evidence.
 */
export type L = Record<Locale, string>;
export type Actor = "nuova" | "agency" | "customer";
export type StateKind = "available" | "partial" | "preparing";

export interface SequenceStep {
  key: "enquiry" | "reply" | "record" | "match" | "task" | "confirm";
  time: L;
  actors: Actor[];
  title: L;
  line: L;
  benefit: L;
  state: L;
  stateKind: StateKind;
}

export const sequenceWords = {
  eyebrow: { es: "La consulta de Laura, paso a paso", en: "Laura's enquiry, step by step" },
  h2: { es: "Qué pasa con una consulta, de principio a fin", en: "What happens to an enquiry, from start to finish" },
  lead: { es: "Seis pasos y un solo reloj. En cada paso se ve quién actúa: Nuova de forma automática, una persona de tu agencia o el propio cliente.", en: "Six steps and one clock. Each step shows who acts: Nuova automatically, a person at your agency, or the customer." },
  legendTitle: { es: "Quién actúa", en: "Who acts" },
  actors: {
    nuova: { es: "Automático · lo hace Nuova", en: "Automatic · Nuova does it" },
    agency: { es: "Lo confirma una persona de tu agencia", en: "Confirmed by a person at your agency" },
    customer: { es: "Lo confirma el cliente", en: "Confirmed by the customer" },
  } satisfies Record<Actor, L>,
  actorShort: {
    nuova: { es: "Nuova · automático", en: "Nuova · automatic" },
    agency: { es: "Elena · tu agencia", en: "Elena · your agency" },
    customer: { es: "Laura · clienta", en: "Laura · customer" },
  } satisfies Record<Actor, L>,
  benefitLabel: { es: "Para tu agencia", en: "For your agency" },
  stateLabel: { es: "Estado", en: "State" },
  example: { es: "Ejemplo con personas e inmuebles inventados", en: "Example with invented people and listings" },
  tryDemo: { es: "Prueba la demo: toma la tarea tú mismo", en: "Try the demo: take the task yourself" },
  closing: { es: "Así queda una consulta: respondida, en su ficha, con una persona a cargo y un siguiente paso con fecha.", en: "This is how an enquiry ends up: answered, on its record, with a person in charge and a dated next step." },
  /** step 1 */
  enquiryWho: { es: "Laura Serrano · compradora · WhatsApp", en: "Laura Serrano · buyer · WhatsApp" },
  /** step 2 */
  replyNote: { es: "Nuova no confirma datos del inmueble: eso lo hace una persona. Hace una pregunta de vuelta.", en: "Nuova confirms no listing facts: a person does. It asks one question back." },
  /** step 4 */
  wants: { es: "Lo que busca Laura", en: "What Laura is looking for" },
  fits: { es: "Dos inmuebles de tu cartera encajan", en: "Two listings from your portfolio fit" },
  proposalMeta: { es: "Propuesta a Laura por WhatsApp · martes 11:25", en: "Proposal to Laura on WhatsApp · Tuesday 11:25" },
  /** step 5 */
  alertMeta: { es: "Aviso por email a Elena Ruiz · martes 11:21", en: "E-mail alert to Elena Ruiz · Tuesday 11:21" },
  listMeta: { es: "La lista de Elena · miércoles 08:30", en: "Elena's list · Wednesday 08:30" },
  taskTaken: { es: "Tomada por Elena · miércoles 08:55", en: "Taken by Elena · Wednesday 08:55" },
  taskNext: { es: "Siguiente paso", en: "Next step" },
  taskNextValue: { es: "proponerle día y hora por WhatsApp", en: "propose a day and time on WhatsApp" },
  taskWhy: { es: "Por qué va primero", en: "Why it comes first" },
  taskWhyValue: { es: "nombró inmueble, zona y presupuesto", en: "she named a property, an area and a budget" },
  /** step 6 */
  elenaMeta: { es: "Elena Ruiz · tu agencia · miércoles 08:58", en: "Elena Ruiz · your agency · Wednesday 08:58" },
  lauraMeta: { es: "Laura · miércoles 09:01", en: "Laura · Wednesday 09:01" },
  lauraAccepts: { es: "Sí, el jueves a las 10:00 me viene bien.", en: "Yes, Thursday at 10:00 works for me." },
  lauraAcceptsOriginal: "Sí, el jueves a las 10:00 me viene bien.",
  booked: { es: "Visita · jueves 10:00 · en la ficha de Laura y en la lista de Elena", en: "Viewing · Thursday 10:00 · on Laura's record and on Elena's list" },
  done: { es: "Marcada como hecha por Elena · miércoles 09:02", en: "Marked done by Elena · Wednesday 09:02" },
};

export const sequenceSteps: SequenceStep[] = [
  {
    key: "enquiry",
    time: { es: "martes 11:20", en: "Tuesday 11:20" },
    actors: ["customer"],
    title: { es: "Laura pregunta por un piso mientras Marcos está en una visita.", en: "Laura asks about a flat while Marcos is at a viewing." },
    line: { es: "Escribe por WhatsApp: el piso, dos preguntas y su presupuesto. En la oficina no hay nadie hasta las 12:00.", en: "She writes on WhatsApp: the flat, two questions and her budget. Nobody is at the office until 12:00." },
    benefit: { es: "La consulta queda registrada en el momento en que llega, también fuera de horario y sin nadie en la oficina.", en: "The enquiry is recorded the moment it arrives, outside office hours too and with nobody at the desk." },
    state: { es: "Disponible hoy: WhatsApp y email.", en: "Available today: WhatsApp and email." },
    stateKind: "available",
  },
  {
    key: "reply",
    time: { es: "martes 11:21", en: "Tuesday 11:21" },
    actors: ["nuova"],
    title: { es: "Laura recibe una respuesta mientras Marcos sigue en la visita.", en: "Laura gets a reply while Marcos is still at the viewing." },
    line: { es: "Nuova anota lo que pide, dice quién le confirma los datos del piso y hace una sola pregunta de vuelta.", en: "Nuova notes what she asks for, says who will confirm the flat's details and asks one question back." },
    benefit: { es: "Menos consultas que se quedan sin atender: la primera respuesta no espera a que alguien vuelva a la oficina.", en: "Fewer enquiries left unattended: the first reply does not wait for someone to be back at the desk." },
    state: { es: "Disponible hoy, en español. En otro idioma no se envía nada automáticamente.", en: "Available today, in Spanish. In another language nothing is sent automatically." },
    stateKind: "available",
  },
  {
    key: "record",
    time: { es: "martes 11:21", en: "Tuesday 11:21" },
    actors: ["nuova"],
    title: { es: "Lo que pide queda en su ficha.", en: "What she asks for goes on her record." },
    line: { es: "Zona, presupuesto e idioma, tal como los dijo. La ficha se actualiza con cada mensaje, y la prioridad lleva su motivo.", en: "Area, budget and language, as she said them. The record updates with every message, and the priority carries its reason." },
    benefit: { es: "Los leads que ya tienes se trabajan mejor: nada se queda en un chat ni en la memoria de nadie.", en: "The leads you already have are worked better: nothing stays in a chat or in someone's memory." },
    state: { es: "Disponible hoy: una ficha por consulta.", en: "Available today: one record per enquiry." },
    stateKind: "available",
  },
  {
    key: "match",
    time: { es: "martes 11:25", en: "Tuesday 11:25" },
    actors: ["nuova"],
    title: { es: "De tu cartera salen dos pisos que encajan.", en: "Two flats from your portfolio fit." },
    line: { es: "Nuova compara lo que busca Laura con tus inmuebles y le propone los que encajan, solo con tus fotos y tus datos.", en: "Nuova compares what Laura is looking for with your listings and proposes the ones that fit, only with your photos and your data." },
    benefit: { es: "Propuestas solo de tu cartera. Sin disponibilidad confirmada por tu fuente no se afirma disponibilidad.", en: "Proposals only from your portfolio. Without availability confirmed by your source, no availability is claimed." },
    state: { es: "Implementado; todavía sin activar para ninguna agencia.", en: "Implemented; not yet switched on for any agency." },
    stateKind: "preparing",
  },
  {
    key: "task",
    time: { es: "miércoles 08:30", en: "Wednesday 08:30" },
    actors: ["nuova", "agency"],
    title: { es: "Elena sabe qué atender primero y por qué.", en: "Elena knows what to handle first and why." },
    line: { es: "El martes a las 11:21 salió un aviso por email a Elena con el motivo. El miércoles a primera hora su lista pone a Laura en primer lugar, y Elena la toma.", en: "On Tuesday at 11:21 an e-mail alert with the reason went to Elena. First thing on Wednesday her list puts Laura first, and Elena takes it." },
    benefit: { es: "Una tarea, una persona, un motivo: nadie tiene que preguntar quién se encarga.", en: "One task, one person, one reason: nobody has to ask who is in charge." },
    state: { es: "Disponible hoy: el aviso por email, todavía sin horario de oficina. En preparación: la lista de tareas.", en: "Available today: the e-mail alert, without office hours yet. In preparation: the task list." },
    stateKind: "partial",
  },
  {
    key: "confirm",
    time: { es: "miércoles 08:58 → 09:02", en: "Wednesday 08:58 → 09:02" },
    actors: ["agency", "customer"],
    title: { es: "La visita queda acordada y anotada.", en: "The viewing is agreed and written down." },
    line: { es: "Elena propone el jueves a las 10:00 por WhatsApp; Laura acepta. La hora queda en la ficha de Laura y en la lista de Elena.", en: "Elena proposes Thursday at 10:00 on WhatsApp; Laura accepts. The time goes on Laura's record and on Elena's list." },
    benefit: { es: "Un siguiente paso con fecha y motivo, escrito donde todo el equipo lo ve.", en: "A next step with a date and a reason, written where the whole team sees it." },
    state: { es: "La propuesta y la confirmación las hace una persona. En preparación: la lista de tareas y la agenda.", en: "The proposal and the confirmation are a person's. In preparation: the task list and the diary." },
    stateKind: "preparing",
  },
];
