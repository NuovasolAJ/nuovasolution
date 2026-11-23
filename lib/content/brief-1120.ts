import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey, PlanCode } from "@/lib/claims";
import { catalogPlans } from "@/lib/content/plans";

/** Copy 31d749b §6.1: Enterprise's seats come from the plan row (code "scale" in the catalogue), never typed by hand. */
const ENTERPRISE_SEATS = catalogPlans.find((p) => p.code === "scale")?.limits.seats ?? 50;

/**
 * The owner's brief of 20.11.2026 ("Die Website für den Makleralltag", OWNER_BRIEF_1120_THEMA16_v1.md, topic 16): one viewing as the
 * red thread, WhatsApp first, the finished task visible at once, ONLY Essential with the free 14-day trial. Texts: Copy's batch 1
 * (COPY_TO_REDESIGN_1120_BRIEF_MAKLERALLTAG_BATCH1_v1.md, c0975ad) §1–§2 for the hero scene and the WhatsApp moment, and Copy's stage 1
 * (COPY_TO_REDESIGN_1120_ETAPPE1_OFFER_v1.md, d8ebc77) for the offer from the first button to the confirmation — its rules: T-1 every
 * free-14-days sentence names Essential; T-2 "sin tarjeta" / "no card"; T-3 no "piloto"/"pilot" on customer pages; T-4 the trial is
 * activated ON REQUEST (the owner's Q-1 decided 23.11.: on request; the sign-up stays one line away, `href.essential`). The lines marked WORKING are
 * Redesign's until Copy's stage 2. The brief's two reversals: customer pages carry finished statements (lib/view-query.ts VIEW_DEFAULT)
 * and the trial belongs to Essential alone (13.11.'s one offer "Solicita tu piloto gratuito" everywhere is retired).
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

/** Copy batch 1 §1.1 / §2: a bubble stays Spanish on the EN page (automatic replies are Spanish only, `otherLanguages` hidden), with the EN translation small under it. */
export type Bubble = { time: string; who: "customer" | "assistant"; es: string; en: string };

/** Copy stage 1 §1: the plan differences come from API; without API's confirmation none goes into the fixed build (a tier shows its audience and its action). ONE line. */
export const DIFFERENCES_CONFIRMED_BY_API = false;

export const brief1120 = {
  hero: {
    h1: T("Mientras enseñas un piso, ¿quién atiende a Mila?", "While you're showing a flat, who's looking after Mila?"),
    sub: T("NuovaSolution le contesta por WhatsApp al momento, entiende qué busca y te deja la tarea lista: a quién llamar y qué comprobar.", "NuovaSolution answers her on WhatsApp straight away, works out what she's looking for and leaves you the task ready: who to call and what to check."),
    caption: T("Estás en una visita · 11:40", "You're at a viewing · 11:40"),
    cta: T("Ver cómo queda la tarea", "See the finished task"),
    ctaTrial: T("Prueba Essential gratis", "Try Essential free"),
    trialLine: T("14 días gratis, sin tarjeta.", "14 days free, no card."),
    translation: T("Traducción", "Translation"),
    scene: { enquiry: T("Consulta por WhatsApp", "Enquiry on WhatsApp"), task: T("Tarea para Marta", "Task for Marta"), mark: T("Ejemplo · datos ficticios", "Example · fictional data") },
    /** Copy batch 1 §1.1 W-1 and W-2 (the first screen). */
    bubbles: [
      { time: "11:42", who: "customer", es: "Hola, busco un piso de 3 dormitorios en Nerja, hasta 350.000 €. ¿Sigue disponible la ref. 9895153? ¿Me podéis llamar?", en: "Hi, I'm looking for a 3-bedroom flat in Nerja, up to €350,000. Is ref. 9895153 still available? Could you call me?" },
      { time: "11:42", who: "assistant", es: "Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame?", en: "Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call?" },
    ] satisfies Bubble[],
    /** Copy batch 1 §1.2 + phone preview 1-A (11cf7a2): the task beside or below it — on the phone the title and ONE line. */
    task: {
      title: T("Llamar a Mila · Comprobar disponibilidad de la ref. 9895153", "Call Mila · Check whether ref. 9895153 is available"),
      line: T("Pide que la llamen · Disponibilidad sin confirmar", "Asks for a call back · Availability not confirmed"),
      fields: [
        { k: T("Busca", "Looking for"), v: T("3 dormitorios en Nerja, hasta 350.000 €", "3 bedrooms in Nerja, up to €350,000") },
        { k: T("Pide", "Asks for"), v: T("Que la llamen", "A call back") },
        { k: T("Abierto", "Open"), v: T("Disponibilidad de la ref. 9895153, sin confirmar", "Availability of ref. 9895153, not confirmed") },
        { k: T("Prioridad", "Priority"), v: T("Alta · nombró un inmueble y pide llamada", "High · named a property and asks for a call") },
        { k: T("Llegó", "Arrived"), v: T("WhatsApp · 11:42", "WhatsApp · 11:42") },
      ],
    },
  },
  demo: {
    tabs: { whatsapp: T("WhatsApp", "WhatsApp"), email: T("Email", "Email"), webform: T("Formulario", "Form"), phone: T("Teléfono", "Phone") },
    invite: T("Elige por dónde te escribe el cliente.", "Pick the channel your client writes on."),
    taskLabel: T("Tarea", "Task"),
    /** Copy phone preview 1-C (11cf7a2): the finished task's caption and the one link out of path 1 into path 2. */
    caption: T("Mila ya tiene respuesta. La llamada sigue esperando a Marta.", "Mila already has her answer. The call is still waiting for Marta."),
    toPlans: T("Ver qué plan te encaja", "See which plan fits you"),
  },
  plans: {
    /** Copy phone preview 2-A (11cf7a2). */
    h2: T("Elige tu plan", "Choose your plan"),
    price: T("Te decimos el precio para tu agencia antes de acordar nada.", "We tell you the price for your agency before anything is agreed."),
    who: { essential: T("Para un equipo pequeño", "For a small team") /* Copy 21830f8 §6.5 (RV6 R-11): team size, never offices */, growth: T("Para equipos que se reparten el trabajo", "For teams that share the work"), enterprise: T("Para agencias grandes", "For larger agencies") } satisfies Record<PlanCode, L>, // Copy 31d749b §6.1: offices are no function (API bd7a685, register line 42)
    adds: { essential: null, growth: T("Todo lo de Essential, y además:", "Everything in Essential, plus:"), enterprise: T("Todo lo de Growth, y además:", "Everything in Growth, plus:") } satisfies Record<PlanCode, L | null>,
    /** Copy batch 1 §3.1 with their register keys — shown only once API confirms them (DIFFERENCES_CONFIRMED_BY_API); `phoneAssistant` on no card until A-2. */
    differences: {
      essential: [
        { text: T("Responde por WhatsApp y email, también de noche.", "Replies on WhatsApp and email, also at night."), keys: ["replyWhatsapp", "replyEmail", "replyOutOfHours"] },
        { text: T("Cada consulta en su ficha, con su prioridad y su motivo.", "Every enquiry on its record, with its priority and reason."), keys: ["crm", "priorityWithReason"] },
        { text: T("Cada semana, un informe con lo que pide tu atención.", "Every week, a report on what needs your attention."), keys: ["reportInLogin", "weeklyEmail"] },
      ],
      growth: [
        { text: T("Cada persona, su lista de tareas del día.", "Everyone gets their task list for the day."), keys: ["taskList"] },
        { text: T("Propone inmuebles que encajan con cada cliente.", "Suggests listings that fit each client."), keys: ["matching"] },
        { text: T("Seguimiento de tus contactos, con su permiso.", "Follow-up with your contacts, with their permission."), keys: ["followup"] },
      ],
      enterprise: [
        // Copy 31d749b §6.1: {n} read from the plan row's seats (API bd7a685 §3), never typed by hand
        { text: T(`Hasta ${ENTERPRISE_SEATS} personas en la cuenta.`, `Up to ${ENTERPRISE_SEATS} people on the account.`), keys: ["teamRoles"] },
        { text: T("Clientes nuevos desde tus redes sociales.", "New clients from your social media."), keys: ["instagram"] },
      ],
    } satisfies Record<PlanCode, { text: L; keys: ClaimKey[] }[]>,
    action: { essential: T("Prueba Essential gratis durante 14 días", "Try Essential free for 14 days"), growth: T("Pide una demo de Growth", "Book a Growth demo"), enterprise: T("Habla con nosotros sobre Enterprise", "Talk to us about Enterprise") } satisfies Record<PlanCode, L>,
    actionLine: {
      // the owner ec4181ed (23.11.): no "24 h" on the screen — WORKING cuts of Copy's lines until Copy confirms
      essential: T("Sin tarjeta. Te escribimos para activarla.", "No card. We write to you to set it up."),
      growth: T("Te escribimos para acordar el día de la demo.", "We write to you to agree the day of the demo."), // Copy 4a549bd §4a (final)
      enterprise: T("Te escribimos para acordar la conversación.", "We write to you to arrange the conversation."), // Copy 4a549bd §4a (final)
    } satisfies Record<PlanCode, L>,
    actionNext: {
      essential: T("Abre la solicitud de la prueba, con Essential ya elegido.", "Opens the trial request with Essential already selected."),
      growth: T("Abre la solicitud de demo, con Growth ya elegido.", "Opens the demo request with Growth already selected."),
      enterprise: T("Abre el formulario de contacto, con Enterprise ya elegido.", "Opens the contact form with Enterprise already selected."),
    } satisfies Record<PlanCode, L>,
    // the owner's R-4 line (23.11.): the quiet link opens a request form, so it says so; the chosen plan travels in the href and stays in the form
    direct: T("Solicitar contratación", "Request this plan"), // EN per Copy 23.11.: the link names the plan, not a legal document
    line: T("Essential se prueba gratis 14 días, sin tarjeta. Growth empieza con una demo y Enterprise, con una conversación.", "You can try Essential free for 14 days, no card. Growth starts with a demo, Enterprise with a conversation."),
    linePhone: T("14 días gratis con Essential, sin tarjeta.", "14 days free on Essential, no card."),
    more: T("y {n} más", "and {n} more"),
    compare: T("Ver las diferencias", "See the differences"),
    compareClose: T("Ocultar las diferencias", "Hide the differences"),
    all: T("Ver todo lo que incluye", "See everything included"),
    allClose: T("Ocultar", "Hide"),
  },
  /** Copy stage 1 §0: the global button (header, menu, closing band, the sticky bar). */
  global: { label: T("Prueba Essential gratis", "Try Essential free"), line: T("14 días gratis, sin tarjeta.", "14 days free, no card."), nav: T("Prueba Essential", "Try Essential") /* Copy c683f2f §3 (T-1) */ },
  /** The targets: ONE line per plan (Q-1: Essential's sign-up replaces the request once the owner says self-start); the direct contract keeps the plan. */
  href: { essential: "/contact?interes=trial&plan=essential", growth: "/contact?interes=demo&plan=growth", enterprise: "/contact?interes=talk&plan=enterprise" } satisfies Record<PlanCode, string>,
  hrefDirect: (plan: PlanCode) => `/contact?interes=contratar&plan=${plan}`,
  /** Copy stage 1 §3.3: the request form per interest and its confirmation. */
  contact: {
    trial: { eyebrow: T("Prueba gratuita · 14 días con Essential", "Free trial · 14 days on Essential"), h: T("Prueba Essential gratis durante 14 días", "Try Essential free for 14 days"), body: T("Preparamos Essential contigo y empiezan tus 14 días. Sin tarjeta; las condiciones, por escrito.", "We set up Essential with you and your 14 days begin. No card; the terms in writing."), submit: T("Pedir la prueba", "Request the trial") },
    demo: { eyebrow: T("Demo · Growth", "Demo · Growth"), h: T("Pide una demo de Growth", "Book a Growth demo"), body: T("Te enseñamos Growth con un caso como el tuyo y te decimos el precio antes de acordar nada.", "We show you Growth on a case like yours and tell you the price before anything is agreed."), submit: T("Pedir la demo", "Book the demo") },
    talk: { eyebrow: T("Enterprise", "Enterprise"), h: T("Hablemos de Enterprise", "Let's talk about Enterprise"), body: T("Cuéntanos cómo es tu agencia y cómo trabajáis. Te proponemos una conversación y después una propuesta por escrito.", "Tell us about your agency and how you work. We suggest a conversation, then a proposal in writing."), submit: T("Enviar", "Send") }, // the owner ec4181ed: offices appear nowhere (WORKING cut)
    contract: { eyebrow: T("Contratar", "Hire a plan"), h: T("Contratar {plan}", "Hire {plan}"), body: T("Te enviamos el precio y el contrato por escrito. Firmas solo si te encaja.", "We send you the price and the contract in writing. You sign only if it suits you."), submit: T("Enviar solicitud", "Send request") }, // Copy 441ba1c
    model3d: { eyebrow: T("Modelo 3D", "3D model"), h: T("Pide un modelo 3D de un inmueble", "Ask for a 3D model of a property"), body: T("Nos envías el plano y nos cuentas qué quieres enseñar. Te confirmamos por escrito qué incluye el modelo, el precio y cuándo te lo entregamos.", "You send us the plan and tell us what you want to show. We confirm in writing what the model includes, the price and when we deliver it."), submit: T("Enviar", "Send") }, // WORKING (Redesign)
    other: { eyebrow: T("Contacto", "Contact"), h: T("Escríbenos", "Write to us"), body: T("Te contesta una persona del equipo, en español o en inglés.", "A person from our team answers, in Spanish or English."), submit: T("Enviar", "Send") },
    lead: T("Contacto humano directo, en español o en inglés. Te explicamos el plan que te encaja y su precio.", "Direct human contact, in Spanish or English. We explain the plan that fits you and its price."),
    interests: { trial: T("Prueba gratuita de Essential", "Free Essential trial"), demo: T("Demo de Growth", "Growth demo"), talk: T("Enterprise", "Enterprise"), contract: T("Contratar un plan", "Hire a plan"), model3d: T("Modelo 3D de un inmueble", "3D model of a property"), other: T("Otra consulta", "Something else") },
    subject: { trial: T("Prueba gratuita · 14 días con Essential", "Free trial · 14 days on Essential"), demo: T("Demo · plan Growth", "Demo · Growth plan"), talk: T("Conversación · plan Enterprise", "Conversation · Enterprise plan"), contract: T("Contratar {plan}", "Request the {plan} plan") },
    done: {
      // the owner ec4181ed (23.11.): no "24 h" in any confirmation — WORKING cuts of Copy's lines
      trial: { h: T("Gracias. Una persona del equipo te escribe para activar tu prueba de Essential.", "Thank you. A person from our team will write to you to set up your Essential trial."), next: [T("Te escribimos y acordamos el día.", "We write to you and agree a day."), T("Conectamos tu buzón y tu WhatsApp contigo.", "We connect your mailbox and your WhatsApp with you."), T("Empiezan tus 14 días.", "Your 14 days begin.")] },
      demo: { h: T("Gracias. Una persona del equipo te escribe para acordar el día de la demo.", "Thank you. A person from our team will write to you to agree the day of the demo."), /* Copy 4a549bd §4a (final) */ next: [T("Acordamos el día.", "We agree a day."), T("En la demo vemos un caso como los tuyos.", "In the demo we go through a case like yours."), T("Te enviamos las condiciones por escrito.", "We send you the terms in writing.")] },
      talk: { h: T("Gracias. Una persona del equipo te escribe para acordar la conversación.", "Thank you. A person from our team will write to you to arrange the conversation."), next: [T("Acordamos el día.", "We agree a day."), T("Hablamos de tu equipo y de cómo trabajáis.", "We talk about your team and how you work."), /* Copy 4a549bd §4a (final) */ T("Te enviamos una propuesta por escrito.", "We send you a proposal in writing.")] },
      // Copy 91b9915 §4b (RV6 on bea7d19: the only confirmation without steps); {plan} comes from the link, as in contact.contract.h
      contract: { h: T("Gracias. Una persona del equipo te escribe con el precio y el contrato por escrito.", "Thank you. A person from our team will write to you with the price and the contract in writing."), next: [T("Te enviamos el precio y el contrato por escrito.", "We send you the price and the contract in writing."), T("Lo revisas con calma y vemos contigo cualquier duda.", "You read it at your own pace, and we go through any questions with you."), T("Firmas solo si te encaja, y preparamos {plan} contigo.", "You sign only if it suits you, and we set up {plan} with you.")] },
      other: { h: T("Gracias. Una persona del equipo te contesta en español o en inglés.", "Thank you. A person from our team will answer in Spanish or English."), next: [] as L[] },
    },
  },
  /** Copy stage 1 §3.1a: "Cómo empezar". */
  entry: {
    title: T("Cómo empezar con Essential: 14 días gratis", "How to start with Essential: 14 days free"),
    steps: [
      { b: T("Pide tu prueba.", "Request your trial."), t: T("Te escribimos y la activamos contigo.", "We write to you and set it up with you.") }, // the owner ec4181ed: no "24 h"
      { b: T("Conecta tu buzón y tu WhatsApp.", "Connect your mailbox and your WhatsApp."), t: T("Lo probamos con un mensaje real.", "We test it with a real message.") },
      { b: T("Empiezan tus 14 días.", "Your 14 days begin."), t: T("Cada consulta recibe respuesta en español y queda en su ficha, con su prioridad y su motivo.", "Every enquiry gets a reply in Spanish and lands on its record, with its priority and reason.") },
    ],
    line: T("¿Growth o Enterprise? Te los enseñamos en una demo o en una conversación.", "Growth or Enterprise? We show you in a demo or a conversation."),
  },
};
