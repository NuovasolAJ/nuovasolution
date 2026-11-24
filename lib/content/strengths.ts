import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey } from "@/lib/claims";

/**
 * "Todo lo que hace por tu agencia" — the owner's point 16 of 17.11., released for the build 19.11. evening: the finished product with
 * every strength, ONE new section from the existing card parts (the owner's protective rule). Texts: Copy
 * COPY_TO_REDESIGN_1117_TARGET_PRODUCT_TEXTS_v2.md (d34212b + 1b8ec12 + fe8100b + e851e72, the owner's three decisions of 17.11.:
 * Instagram stays on Enterprise, G-1 shows a seller, T-4 stays and G-d is short) §A (the hero), §B (the growth block G-1 … G-3 with
 * G-h/G-d, then the cards T-2, T-4, T-8, T-6) and §C (the day story D-1 … D-6); the fold and form A from Copy 8cbe48c.
 * The owner's brief of 20.11. (clarification 16:18; 23.11.): customer pages carry the finished product — the gate, the marks and the
 * partial states of 20.11. are gone; every card stands as written, its proof an open launch point in Audit's register. §D (the
 * profitability line with {precio}) is not rendered until the owner sets the price. The hero's own lines live in lib/content/brief-1120.ts.
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

export type StrengthCard = { key: string; keys: ClaimKey[]; title: L; line: L; phone: L; chip: L; examples: [L, L, L] };
export type DayStation = { time: string; keys: ClaimKey[]; short: L; text: L };

export const strengths = {
  eyebrow: T("Todo lo que hace por tu agencia", "Everything it does for your agency"),
  h2: T("Nuevos clientes. Contactos que vuelven. Más oportunidades para tu agencia.", "New clients. Contacts who come back. More opportunities for your agency."), // G-h
  mark: T("Ejemplo · datos ficticios", "Example · fictional data"), // G-m
  afterGrowth: T("Cada mañana, qué oportunidades piden tu atención.", "Every morning, which opportunities need your attention."), // G-d (shortened, owner 17.11., Copy e851e72)
  afterGrowthKeys: ["taskList", "dailyVoice"] as ClaimKey[],
  growth: [
    { key: "g1", keys: ["adsLeads", "instagram"], title: T("Gana nuevos clientes", "Win new clients"), line: T("Tus publicaciones, anuncios y formularios atraen a compradores y a propietarios que quieren vender. Cada comentario o mensaje directo se convierte en una consulta con su ficha.", "Your posts, ads and lead forms draw in buyers and owners who want to sell. Every comment or direct message becomes an enquiry with its own record."), phone: T("De un comentario a una consulta.", "From a comment to an enquiry."), chip: T("Desde Growth · redes sociales en Enterprise", "From Growth · social media on Enterprise"),
      // G-1 shows a SELLER (owner 17.11., Copy e851e72): Isabel is new and fictional; Carmen stays the demo's e-mail seller
      examples: [T("Formulario de tu anuncio «¿Cuánto vale tu casa?»: Isabel, casa en Mijas", "The form on your ad \"What is your home worth?\": Isabel, house in Mijas"), T("Respuesta al momento y una pregunta: «¿Cuántos metros tiene, más o menos?»", "An instant reply and one question: \"Roughly how many square metres is it?\""), T("Ficha nueva: propietaria · Mijas · quiere vender · pide valoración", "New record: owner · Mijas · wants to sell · asks for a valuation")] },
    { key: "g2", keys: ["matching", "followup"], title: T("Reactiva tus contactos", "Bring contacts back"), line: T("Cuando entra un inmueble que encaja o hay un motivo nuevo, volvemos a escribir a tus antiguos interesados y clientes, con su permiso.", "When a listing that fits comes in, or there is a new reason to get in touch, we write again to your past enquirers and clients, with their permission."), phone: T("Tus contactos de siempre, otra vez activos.", "Your past contacts, active again."), chip: T("Desde Growth", "From Growth"),
      examples: [T("Javier escribió en marzo: ático en Benalmádena, hasta 280.000 €", "Javier wrote in March: penthouse in Benalmádena, up to €280,000"), T("Hoy entra un ático en Benalmádena, 275.000 €", "Today a penthouse in Benalmádena comes in, €275,000"), T("Le escribimos, con su permiso: «¿Sigues buscando?» · Javier: «Sí, ¿cuándo puedo verlo?»", "We write to him, with his permission: \"Still looking?\" · Javier: \"Yes, when can I see it?\"")] },
    { key: "g3", keys: ["replyWhatsapp", "crm", "priorityWithReason", "matching", "followup"], title: T("Del interés a la oportunidad", "From interest to opportunity"), line: T("Responde, aclara qué busca cada cliente, le propone inmuebles que encajan y, con su permiso, hace seguimiento.", "It replies, finds out what each client is looking for, suggests listings that fit and, with their permission, follows up."), phone: T("Cada interesado, con su siguiente paso.", "Every lead, with its next step."), chip: T("Desde Growth", "From Growth"),
      examples: [T("Laura pregunta por un piso en Estepona · respuesta al momento y una pregunta", "Laura asks about a flat in Estepona · an instant reply and one question"), T("Le proponemos 2 pisos que encajan: 2 dormitorios, hasta 320.000 €", "We suggest 2 flats that fit: 2 bedrooms, up to €320,000"), T("No contesta en dos días · seguimiento con su permiso · pide visita", "No reply in two days · a follow-up with her permission · she asks for a viewing")] },
  ] satisfies StrengthCard[],
  cards: [
    { key: "t2", keys: ["phoneAssistant"], title: T("Atiende el teléfono por ti", "Answers the phone for you"), line: T("Cuando estás en una visita, el asistente coge la llamada, anota qué busca y te deja la tarea.", "When you're at a viewing, the assistant takes the call, notes what they want and leaves you the task."), phone: T("Coge la llamada cuando tú no puedes.", "Takes the call when you can't."), chip: T("Desde Growth", "From Growth"), // Copy 6beb985 E-0b
      examples: [T("11:39 · Álvaro llama · estás en una visita", "11:39 · Álvaro calls · you're at a viewing"), T("Atendida · la villa de Elviria; precio y margen, para ti", "Answered · the villa in Elviria; price and room to negotiate, for you"), T("Tarea: devolver la llamada a partir de las 16:00", "Task: call back from 16:00")] },
    { key: "t4", keys: ["taskList", "dailyVoice"], title: T("Cada mañana, el día claro", "Every morning, a clear day"), line: T("Cada mañana, cada persona del equipo sabe qué tiene que hacer hoy y con quién.", "Every morning, everyone on the team knows what to do today and with whom."), phone: T("Tu día, ordenado a las 8:30.", "Your day, sorted by 8:30."), chip: T("Desde Growth", "From Growth"),
      examples: [T("08:30 · Buenos días, Marta. Hoy, 3 cosas:", "08:30 · Good morning, Marta. Today, 3 things:"), T("Proponer fecha a los Keller · Devolver la llamada a Álvaro, desde las 16:00", "Propose a date to the Kellers · Call Álvaro back, from 16:00"), T("Enviar a Sofía lo disponible en alquiler", "Send Sofía what's available to rent")] },
    // T-8 hangs on reportInLogin only (Copy 1120 §2.2): the sentence names no e-mail
    { key: "t8", keys: ["reportInLogin"], title: T("Tu semana, en un informe", "Your week, in one report"), line: T("Cada lunes ves qué entró, qué sigue abierto y qué hacer esta semana.", "Every Monday you see what came in, what is still open and what to do this week."), phone: T("Qué entró y qué hacer.", "What came in and what to do."), chip: T("Todos los planes", "Every plan"),
      examples: [T("Lunes 08:00 · 25 consultas, 25 respondidas", "Monday 08:00 · 25 enquiries, 25 answered"), T("9 con la oficina cerrada · 4 visitas acordadas", "9 with the office closed · 4 viewings agreed"), T("Esta semana: proponer fecha a las 2 visitas pendientes", "This week: propose a date for the 2 open viewings")] },
    { key: "t6", keys: ["model3d"], title: T("Tu plano, en 3D", "Your floor plan, in 3D"), line: T("Convertimos tu plano en un modelo 3D, vacío y amueblado, con imágenes para tus anuncios.", "We turn your floor plan into a 3D model, empty and furnished, with images for your listings."), phone: T("Del plano a imágenes de anuncio.", "From floor plan to listing images."), chip: T("Opcional, con cualquier plan", "Optional, with any plan"),
      examples: [T("Plano: plano-estepona.pdf", "Plan: plano-estepona.pdf"), T("Modelo vacío y amueblado", "Model, empty and furnished"), T("Imágenes para anuncios y redes · marcadas como visualización", "Images for listings and social media · marked as a visualisation")] },
  ] satisfies StrengthCard[],
  /**
   * §C "Un día con NuovaSolution": the six stations. Form A (the owner, 19.11.): the phone shows the compact line D-c from the `short`
   * parts; the desktop shows the stations. The 8:30 summary's time and delivery are Daily's open proof (the brief p. 5); the 13:20
   * handover is Daily's observed run (Copy 1120 §5) — both in Audit's register, not marks on the page.
   */
  day: {
    title: T("Un día con NuovaSolution", "A day with NuovaSolution"),
    line: T("Mientras enseñas, NuovaSolution atiende.", "While you show a home, NuovaSolution answers."), // D-s: the hero's former h1, kept
    mark: T("Ejemplo · nombres ficticios", "Example · fictional names"),
    stations: [
      { time: "08:30", keys: ["taskList", "dailyVoice"], short: T("08:30 tu día", "08:30 your day"), text: T("Marta abre su resumen: sabe qué toca hoy y con quién.", "Marta opens her summary: she knows what's on today and with whom.") },
      { time: "11:39", keys: ["phoneAssistant"], short: T("11:39 llamada atendida", "11:39 call answered"), text: T("Marta está en una visita; el asistente atiende la llamada de Álvaro y le deja la tarea.", "Marta is at a viewing; the assistant takes Álvaro's call and leaves her the task.") },
      // Copy 1120 §5 (the owner's F1: no mail at two hours, the task passes to the next person)
      { time: "13:20", keys: ["reminders"], short: T("13:20 pasa a Carlos", "13:20 passed to Carlos"), text: T("Nadie ha cogido la visita de Laura: pasa a Carlos y él la coge.", "Nobody has taken Laura's viewing: it passes to Carlos, and he takes it.") },
      { time: "16:00", keys: ["matching", "instagram"], short: T("16:00 piso que encaja", "16:00 a listing that fits"), text: T("Entra un piso nuevo en Estepona: encaja con Laura y su publicación para redes espera tu visto bueno.", "A new flat comes in in Estepona: it fits Laura, and its social media post waits for your OK.") },
      { time: "18:00", keys: ["followup"], short: T("18:00 seguimiento", "18:00 follow-up"), text: T("Sofía no ha contestado: recibe un seguimiento, con su permiso.", "Sofía hasn't replied: she gets a follow-up, with her permission.") },
      { time: "23:40", keys: ["replyOutOfHours"], short: T("23:40 respuesta de noche", "23:40 a night-time reply"), text: T("Llega una consulta con la oficina cerrada: respuesta al momento, y mañana a las 8:30 está en tu resumen.", "An enquiry arrives with the office closed: an instant reply, and tomorrow at 8:30 it's in your summary.") },
    ] satisfies DayStation[],
  },
};
