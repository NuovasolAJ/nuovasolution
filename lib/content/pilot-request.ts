import type { Locale } from "@/lib/i18n/config";
import { brief1120 } from "@/lib/content/brief-1120";

/**
 * The request form on /contact. The owner's brief of 20.11.2026 + Copy stage 1 §3.3 (d8ebc77): ONE request form with the plan's
 * interest preselected from the link — Essential's free trial (activated on request, T-4), Growth's demo, Enterprise's conversation
 * ("talk"), the direct contract, the 3D model, anything else — each with its own card (eyebrow, h, body, submit) and its own
 * confirmation with the next steps. The form's labels and the error lines are WORKING until Copy confirms them; no line promises a
 * reply channel that does not exist. The preview sends nothing to anybody (the route answers "simulated" until API/Hosting name an intake).
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

export type PilotInterest = "trial" | "demo" | "talk" | "contract" | "model3d" | "other";

export const pilotRequest = {
  /** The card per interest (Copy stage 1 §3.3); the contract card names the plan. */
  card: (interest: PilotInterest, planName?: string): { eyebrow: L; h: L; body: L; submit: L } => {
    const c = brief1120.contact[interest];
    if (interest === "contract") return { ...c, h: { es: c.h.es.replace("{plan}", planName ?? "un plan"), en: c.h.en.replace("{plan}", planName ?? "a plan") } };
    return c;
  },
  lead: brief1120.contact.lead,
  phoneLabel: T("Teléfono", "Phone"),
  emailLabel: T("Email", "Email"),

  // WORKING (Copy): the form
  form: {
    agency: T("Nombre de la agencia", "Agency name"),
    name: T("Tu nombre", "Your name"),
    // 16.11. 14:00 (the owner's point 4): required are the agency, the name and e-mail OR phone; everything else is optional
    email: T("Email de trabajo", "Work e-mail"),
    phone: T("Teléfono", "Phone"),
    reach: T("Email o teléfono, como prefieras.", "E-mail or phone, whichever you prefer."),
    reachMissing: T("Déjanos un email o un teléfono para contestarte.", "Leave us an email or a phone number so we can reply."), // Copy 441ba1c FM-err
    interest: T("¿Qué te interesa?", "What are you interested in?"),
    interests: brief1120.contact.interests satisfies Record<PilotInterest, L>, // Copy stage 1 §3.3
    message: T("Mensaje (opcional)", "Message (optional)"),
    contractNote: T("Te enviamos el precio y el contrato por escrito. Firmas solo si te encaja.", "We send you the price and the contract in writing. You sign only if it suits you."), // Copy 441ba1c DC-h
    // Copy 441ba1c FM-pv (16.11. 14:00, the owner's point 4): a notice with the link, no required box — counsel Q-8
    consent: T("Usamos tus datos solo para contestar a esta solicitud. Más información en la ", "We use your details only to answer this request. More in the "),
    consentAfter: T(".", "."),
    consentLink: T("política de privacidad", "privacy policy"),
    sending: T("Enviando…", "Sending…"),
    required: T("Rellena los campos marcados.", "Fill in the marked fields."),
    error: T("No se ha podido enviar. Escríbenos por email.", "It could not be sent. Write to us by e-mail."),
  },

  done: {
    eyebrow: T("Solicitud recibida", "Request received"),
    next: T("Qué pasa ahora", "What happens now"),
    simulated: T("Vista previa: esta solicitud no se ha enviado a nadie.", "Preview: this request was not sent to anybody."),
    back: T("Volver al inicio", "Back to the start"),
    /** Copy stage 1 §3.3: the confirmation per interest — its heading and the next steps. */
    confirmation: (interest: PilotInterest, locale: Locale): { h: string; steps: string[] } => {
      const d = brief1120.contact.done;
      const x = interest === "model3d" ? d.other : d[interest];
      return { h: x.h[locale], steps: x.next.map((s) => s[locale]) };
    },
  },
};

/** The interest from the link (`?interes=`); the older values of the one-offer era map onto the plan's way. */
export const interestFromQuery = (v: string | undefined, plan?: string): PilotInterest => {
  if (v === "trial" || v === "prueba") return "trial";
  if (v === "demo") return "demo";
  if (v === "talk" || v === "enterprise" || v === "conversacion") return "talk";
  if (v === "contratar" || v === "contract") return "contract";
  if (v === "3d" || v === "model3d") return "model3d";
  if (v === "otro" || v === "other") return "other";
  // "pilot" from older links: the plan decides
  if (plan === "essential") return "trial";
  if (plan === "growth") return "demo";
  if (plan === "enterprise") return "talk";
  return "other";
};
