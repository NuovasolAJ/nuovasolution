import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey } from "@/lib/claims";

/**
 * "Todo lo que hace por tu agencia" as AGENCY TASKS (the owner's E2 order of 24.11., point 5, and his brief of 20.11. p. 4): the seven
 * cards of lib/content/strengths.ts bundled into four tasks, each with ONE proof (a product view) and ONE action; the details stay on
 * the function pages. Every line here is Copy's own short line from strengths.ts (the phone lines and the examples) or a WORKING cut of
 * it, marked, until Copy's stage 2 file; nothing new is promised.
 * Copy 4fa1412 (24.11.) checked every line: A-1, A-2, A-4, A-5, A-6, A-7 final as set here; the rest confirmed as written. The day story (§C) is the strip of six moments, not a text block.
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

export type TaskProof =
  | { kind: "chat"; from: string; text: L; reply: L; time: string }
  | { kind: "record"; source: L; fields: [L, L, L] }
  | { kind: "match"; listing: L; contact: L; answer: L }
  | { kind: "day"; head: L; items: [L, L, L]; foot: L };

/** `open`: the demonstration's channel the action opens at its finished picture; `jump`: the area ("functions" chapter) the action opens — the
 *  owner, 27.11.: every detail button leads straight to the promised example, not to the overview page */
export type AgencyTask = { key: string; keys: ClaimKey[]; title: L; line: L; proof: TaskProof; action: { label: L; href: string; open?: "whatsapp" | "email" | "webform" | "phone"; jump?: "attend" | "organise" | "grow" } };

export const agencyTasks = {
  eyebrow: T("Todo lo que hace por tu agencia", "Everything it does for your agency"),
  // G-h shortened (WORKING for Copy): the three outcomes, without the fourth clause
  h2: T("Nuevos clientes. Contactos que vuelven. Más oportunidades.", "New clients. Contacts who come back. More opportunities."),
  mark: T("Ejemplo · datos ficticios", "Example · fictional data"),
  tasks: [
    {
      key: "atender", keys: ["replyWhatsapp", "replyEmail", "phoneAssistant", "crm"],
      title: T("Atiende por ti", "Answers for you"), // WORKING: from Copy's "Atiende el teléfono por ti" widened to the three channels
      line: T("WhatsApp, email y teléfono: cada consulta recibe respuesta y queda en su ficha.", "WhatsApp, email and phone: every enquiry gets a reply and lands on its record."), // Copy 4fa1412 A-2
      // Copy 4fa1412 A-1: the reply is W-2 word for word (an assistant writes, no call time promised)
      proof: { kind: "chat", from: "Mila", text: T("¿Sigue disponible la ref. 9895153? ¿Me podéis llamar?", "Is ref. 9895153 still available? Can you call me?"), reply: T("Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame?", "Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call?"), time: "11:42" },
      action: { label: T("Ver cómo responde", "See how it replies"), href: "#demo" }, // Copy 4fa1412 A-4
    },
    {
      key: "captar", keys: ["adsLeads", "webform", "instagram"],
      title: T("Gana nuevos clientes", "Win new clients"), // Copy G-1
      line: T("De un comentario, un anuncio o un formulario a una consulta con su ficha.", "From a comment, an ad or a form to an enquiry with its own record."), // WORKING cut of Copy G-1
      proof: { kind: "record", source: T("Formulario «¿Cuánto vale tu casa?»", "Form \"What is your home worth?\""), fields: [T("Isabel · casa en Mijas", "Isabel · house in Mijas"), T("Propietaria · quiere vender", "Owner · wants to sell"), T("Pide valoración · respondida", "Asks for a valuation · answered")] }, // Copy 4fa1412 A-5
      action: { label: T("Cómo capta clientes", "How it wins clients"), href: "#demo", open: "webform" }, // the owner, 27.11.: straight to the form example in the demonstration (was /platform)
    },
    {
      key: "reactivar", keys: ["matching", "followup"],
      title: T("Reactiva tus contactos", "Bring contacts back"), // Copy G-2
      line: T("Entra un inmueble que encaja y volvemos a escribir a quien buscaba algo así, con su permiso.", "A listing that fits comes in, and we write again to whoever was looking for something like it, with their permission."), // Copy 4fa1412 A-6
      proof: { kind: "match", listing: T("Entra: ático en Benalmádena, 275.000 €", "New: penthouse in Benalmádena, €275,000"), contact: T("Javier buscaba en marzo: ático, hasta 280.000 €", "Javier was looking in March: penthouse, up to €280,000"), answer: T("«¿Sigues buscando?» · «Sí, ¿cuándo puedo verlo?»", "\"Still looking?\" · \"Yes, when can I see it?\"") },
      action: { label: T("Cómo propone inmuebles", "How it suggests listings"), href: "#functions", jump: "grow" }, // the owner, 27.11.: straight to "Crece" with "Inmuebles que encajan" opened (was /platform)
    },
    {
      key: "dia", keys: ["taskList", "reportInLogin"],
      title: T("Cada mañana, el día claro", "Every morning, a clear day"), // Copy T-4
      line: T("Cada persona sabe qué toca hoy, y el lunes ves la semana en un informe.", "Everyone knows what is on today, and on Monday you see the week in one report."), // WORKING: Copy T-4 + T-8 in one line
      proof: { kind: "day", head: T("08:30 · Buenos días, Marta. Hoy, 3 cosas:", "08:30 · Good morning, Marta. Today, 3 things:"), items: [T("Proponer fecha a los Keller", "Propose a date to the Kellers"), T("Devolver la llamada a Álvaro, desde las 16:00", "Call Álvaro back, from 16:00"), T("Enviar a Sofía lo disponible en alquiler", "Send Sofía what's available to rent")], foot: T("Lunes · llega el informe de tu semana", "Monday · your weekly report arrives") }, // Copy 4fa1412 A-7
      action: { label: T("Ver el informe de ejemplo", "See the example report"), href: "/example-report" },
    },
  ] satisfies AgencyTask[],
  /** T-6 as one quiet line under the tasks (3D is optional with any plan) */
  model3d: { line: T("Opcional con cualquier plan: tu plano en 3D, vacío y amueblado, con imágenes para tus anuncios.", "Optional with any plan: your floor plan in 3D, empty and furnished, with images for your listings."), label: T("Ver el 3D", "See the 3D"), href: "#model-3d" },
  /** §C "Un día con NuovaSolution" as a strip of six moments (Copy's `short` parts) */
  day: {
    title: T("Un día con NuovaSolution", "A day with NuovaSolution"),
    moments: [
      { time: "08:30", keys: ["taskList"] as ClaimKey[], text: T("tu día", "your day") },
      { time: "11:39", keys: ["phoneAssistant"] as ClaimKey[], text: T("llamada atendida", "call answered") },
      { time: "13:20", keys: ["reminders"] as ClaimKey[], text: T("pasa a Carlos", "passed to Carlos") },
      { time: "16:00", keys: ["matching"] as ClaimKey[], text: T("piso que encaja", "a listing that fits") },
      { time: "18:00", keys: ["followup"] as ClaimKey[], text: T("seguimiento", "follow-up") },
      { time: "23:40", keys: ["replyOutOfHours"] as ClaimKey[], text: T("respuesta de noche", "a night-time reply") },
    ],
    mark: T("Ejemplo · nombres ficticios", "Example · fictional names"),
  },
};
