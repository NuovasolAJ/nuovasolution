import type { Locale } from "@/lib/i18n/config";

/**
 * The pilot request on /contact (the owner's correction order of 16.11.2026, point 1: pilot offer → short request → clear confirmation
 * → what happens next). Copy 1113 §0 gives the card (C-0 … C-4) and the one button (B-1). The form's own labels, the confirmation and
 * the error line are WORKING until Copy confirms them (listed in the return); no line promises a reply time or a contact channel that
 * does not exist. The preview sends nothing to anybody (the route answers "simulated" until API/Hosting name an intake).
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

export type PilotInterest = "pilot" | "contract" | "model3d" | "other";

export const pilotRequest = {
  // Copy 1113 §0 C-0 … C-4
  eyebrow: T("Piloto gratuito · 14 días", "Free pilot · 14 days"), // Copy 1116 §1.2
  h: T("Solicita tu piloto gratuito", "Request your free pilot"),
  body: T("Hablamos contigo, te enseñamos el sistema con un ejemplo y vemos si encaja. Si encaja, empiezas 14 días de piloto con nosotros al lado; con tu opinión al final, 7 días más.", "We talk with you, show you the system with an example and see whether it fits. If it does, you start a 14-day pilot with us alongside; with your feedback at the end, 7 more days."), // Copy 1116 §1.2
  lead: T("Contacto humano directo, en español o en inglés. Te enseñamos el sistema y te explicamos el piloto y el precio.", "Direct human contact, in Spanish or English. We show you the system and explain the pilot and the price."),
  // Copy 1113 §0: the label of the company number
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
    interests: {
      pilot: T("Piloto gratuito", "Free pilot"),
      contract: T("Contratar un plan", "Hire a plan"), // Copy 441ba1c DC-o
      model3d: T("Modelo 3D de un inmueble", "3D model of a property"),
      other: T("Otra consulta", "Something else"),
    } satisfies Record<PilotInterest, L>,
    message: T("Mensaje (opcional)", "Message (optional)"),
    contractNote: T("Te enviamos el precio y el contrato por escrito. Firmas solo si te encaja.", "We send you the price and the contract in writing. You sign only if it suits you."), // Copy 441ba1c DC-h
    // Copy 441ba1c FM-pv (16.11. 14:00, the owner's point 4): a notice with the link, no required box — counsel Q-8
    consent: T("Usamos tus datos solo para contestar a esta solicitud. Más información en la ", "We use your details only to answer this request. More in the "),
    consentAfter: T(".", "."),
    direct: T("Contratar directamente", "Go straight to a plan"), // DC-l
    consentLink: T("política de privacidad", "privacy policy"),
    submit: T("Solicita tu piloto gratuito", "Request your free pilot"), // = B-1
    submitContract: T("Enviar solicitud", "Send request"), // Copy 441ba1c DC-btn
    sending: T("Enviando…", "Sending…"),
    required: T("Rellena los campos marcados.", "Fill in the marked fields."),
    error: T("No se ha podido enviar. Escríbenos por email.", "It could not be sent. Write to us by e-mail."),
  },

  // WORKING (Copy): the confirmation and what happens next (the three steps are Copy 1113 §6, reused from the home page)
  done: {
    eyebrow: T("Solicitud recibida", "Request received"),
    h: T("Gracias. Te contestará una persona del equipo, en español o en inglés.", "Thank you. A person from our team will answer, in Spanish or English."), // Copy fb1a56a §11
    next: T("Qué pasa ahora", "What happens now"),
    simulated: T("Vista previa: esta solicitud no se ha enviado a nadie.", "Preview: this request was not sent to anybody."),
    back: T("Volver al inicio", "Back to the start"),
    /** Copy 441ba1c §7 CF-1 … CF-3: the first step takes the channel the person gave; steps 2 and 3 follow the option; "Otra consulta" has only CF-1. */
    steps: (interest: PilotInterest, phone: boolean, locale: Locale): { b: string; t: string }[] => {
      const first = phone ? T("Te llamamos en 24 h laborables.", "We call you within 24 working hours.") : T("Te escribimos en 24 h laborables.", "We write to you within 24 working hours.");
      const rest: Record<PilotInterest, L[]> = {
        pilot: [T("Te enseñamos el sistema con un ejemplo y vemos si encaja con tu agencia.", "We show you the system with an example and see whether it fits your agency."), T("Si encaja, lo preparamos contigo y empiezan tus 14 días. Las condiciones, por escrito.", "If it fits, we set it up with you and your 14 days begin. The terms in writing.")],
        contract: [T("Te enviamos el precio y el contrato por escrito.", "We send you the price and the contract in writing."), T("Si firmas, preparamos contigo tu agencia.", "If you sign, we set up your agency with you.")],
        model3d: [T("Nos envías el plano y nos cuentas qué quieres enseñar.", "You send us the plan and tell us what you want to show."), T("Te confirmamos por escrito qué incluye el modelo, el precio y cuándo te lo entregamos.", "We confirm in writing what the model includes, the price and when we deliver it.")],
        other: [],
      };
      return [first, ...rest[interest]].map((x) => ({ b: x[locale], t: "" }));
    },
  },
};

export const interestFromQuery = (v: string | undefined): PilotInterest => (v === "3d" || v === "model3d" ? "model3d" : v === "contratar" || v === "contract" ? "contract" : v === "otro" || v === "other" ? "other" : "pilot");
