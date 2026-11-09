import type { Locale } from "@/lib/i18n/config";
import { live, withChannels, type ClaimKey, type ClaimView } from "@/lib/claims";

/**
 * The static FAQ (COPY_DELTAS_0930 §3, FAQ_PAGE_COPY; Copy 1105 v3 §21 of 06.11.: every answer written for the target state,
 * bound to its keys in lib/claims.ts, with the public wording where Copy gives one; a question whose key is off is left out in
 * public, and a group with no question left is hidden; no status word, no "hoy"/"todavía" that promises something later). Every
 * answer is Copy's text, traced to its row in PRODUCT_FAQ_KB_v1.md by `kb`. ⟦canales⟧ is filled from the keys at render.
 * Nothing here promises a reply: the contact line offers an address and no more.
 */
type L = Record<Locale, string>;
export interface FaqItem {
  kb: string;
  q: L;
  /** The target answer. */
  a: L;
  /** The keys the target answer needs; with one off, `pub` stands in public, or the question is left out when there is no `pub`. */
  keys?: ClaimKey[];
  pub?: L;
  /** Copy 1107 D-21: the question's public wording while `qKeys` are off (the answer stays). */
  qPub?: L;
  qKeys?: ClaimKey[];
}
export interface FaqGroup {
  id: string;
  title: L;
  /** Copy 1107 D-20: the group's public title while `titleKeys` are off. */
  titlePub?: L;
  titleKeys?: ClaimKey[];
  items: FaqItem[];
}

export const faqFrame = {
  eyebrow: { en: "Questions", es: "Preguntas" },
  h1: { en: "Straight answers about what NuovaSolution does", es: "Respuestas claras sobre lo que hace NuovaSolution" },
  lead: {
    en: "This is what the product does, with no promises beyond that.",
    es: "Aquí está lo que hace el producto, sin promesas de más.",
  },
  contact: { en: "Not answered here? Write to antonio@nuovasolution.com.", es: "¿No está aquí la respuesta? Escribe a antonio@nuovasolution.com." },
} satisfies Record<string, L>;

export const faqGroups: FaqGroup[] = [
  {
    id: "what",
    title: { en: "What NuovaSolution does", es: "Qué hace NuovaSolution" },
    items: [
      {
        kb: "Q-01",
        q: { en: "What does NuovaSolution actually do?", es: "¿Qué hace NuovaSolution exactamente?" },
        // Copy 1108 V-4 (the voice "en nombre de tu agencia" once a reply leaves the agency's own channel); the public answer stays
        a: {
          en: "It replies on behalf of your agency, in Spanish, to the enquiries that arrive on ⟦canales⟧, and keeps what matters from each one on its record, with its priority and reason.",
          es: "Responde en nombre de tu agencia, en español, a las consultas que llegan por ⟦canales⟧, y guarda lo importante de cada una en su ficha, con su prioridad y su motivo.",
        },
        keys: ["mailboxConnection", "priorityWithReason"],
        pub: { en: "It answers the enquiries your agency receives and records each one with what the customer asked for.", es: "Responde a las consultas que recibe tu agencia y registra cada una con lo que ha pedido el cliente." },
      },
      {
        kb: "Q-02",
        q: { en: "Which channels are answered?", es: "¿Qué canales se responden?" },
        a: { en: "Enquiries on ⟦canales⟧.", es: "Consultas por ⟦canales⟧." },
      },
      {
        kb: "Q-03",
        q: { en: "Does it answer at night and at weekends?", es: "¿Responde de noche y los fines de semana?" },
        a: {
          en: "Yes. The reply is written when the message arrives rather than when somebody is free. We do not promise a number of minutes, because we do not measure one.",
          es: "Sí. La respuesta se escribe cuando llega el mensaje, no cuando alguien tiene tiempo. No prometemos un número de minutos porque no lo medimos.",
        },
        keys: ["replyOutOfHours"],
      },
      {
        kb: "Q-05",
        q: { en: "Does the customer know they are talking to an assistant?", es: "¿Sabe el cliente que habla con un asistente?" },
        a: {
          en: "Yes. Every reply the assistant writes carries a notice that says so. It is a legal duty, not an option, and it does not depend on your plan.",
          es: "Sí. Cada respuesta que redacta el asistente lleva un aviso que lo indica. Es una obligación legal, no una opción, y no depende de tu plan.",
        },
      },
      {
        kb: "Q-06",
        q: { en: "In which language does it answer my customers?", es: "¿En qué idioma responde a mis clientes?" },
        a: {
          en: "In Spanish. In another language nothing is sent automatically.", // COPY_SYNC_1023 W-1
          es: "En español. En otro idioma no se envía nada automáticamente.",
        },
      },
      {
        kb: "Q-07",
        q: { en: "Does it commit my agency to anything?", es: "¿Compromete a mi agencia a algo?" },
        a: {
          en: "No. The reply agrees no price, no date and no condition. A viewing request is recorded as a request, and a person confirms it.",
          es: "No. La respuesta no acuerda ningún precio, ni fecha, ni condición. Una petición de visita se registra como petición y una persona la confirma.",
        },
      },
      {
        kb: "Q-09",
        q: { en: "Does it replace my team?", es: "¿Sustituye a mi equipo?" },
        a: {
          en: "No. It answers first and organises the enquiry. The viewing, the negotiation and the relationship stay with your people, and the task tells them where to start.",
          es: "No. Responde primero y organiza la consulta. La visita, la negociación y la relación siguen siendo de tu gente, y la tarea les dice por dónde empezar.",
        },
        keys: ["taskList"],
        pub: { en: "No. It answers first and organises the enquiry. The viewing, the negotiation and the relationship stay with your people.", es: "No. Responde primero y organiza la consulta. La visita, la negociación y la relación siguen siendo de tu gente." },
      },
      {
        kb: "Q-08",
        q: { en: "Will it invent details about a property?", es: "¿Se inventa datos de una propiedad?" },
        a: {
          en: "No. What it answers comes from what the customer wrote and what your agency has confirmed. It proposes only listings from your portfolio.",
          es: "No. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado. Solo propone inmuebles de tu cartera.",
        },
        keys: ["matching"],
        pub: { en: "No. What it answers comes from what the customer wrote and what your agency has confirmed.", es: "No. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado." },
      },
    ],
  },
  {
    id: "record",
    title: { en: "The record and your team", es: "La ficha y tu equipo" },
    items: [
      {
        kb: "Q-10",
        q: { en: "Can my team see what the assistant said?", es: "¿Puede mi equipo ver lo que dijo el asistente?" },
        a: {
          en: "Yes. The conversation sits on the customer record, so anyone with the right role reads the same history.",
          es: "Sí. La conversación está en la ficha del cliente, así que cualquier persona con el rol adecuado lee el mismo historial.",
        },
      },
      {
        kb: "Q-43",
        q: { en: "If the same person writes by e-mail and then by WhatsApp, is that one record?", es: "Si la misma persona escribe por email y luego por WhatsApp, ¿es una sola ficha?" },
        a: {
          en: "One. If the same person writes on both channels, everything stays on one record.",
          es: "Una. Si la misma persona escribe por los dos canales, todo queda en una sola ficha.",
        },
        keys: ["oneRecordAcrossChannels"],
        // the limit stays (API's register requires it, §14)
        pub: { en: "Two, until something ties them together. We would rather tell you now than let you find it in your second week.", es: "Dos, hasta que algo las una. Preferimos decírtelo ahora y no que lo descubras en tu segunda semana." },
      },
      {
        kb: "Q-31",
        q: { en: "Does it tell me which leads are hot?", es: "¿Me dice qué leads están calientes?" },
        a: {
          en: "Yes, by e-mail. When an enquiry looks important, the right person on your team gets an alert with the reason.",
          es: "Sí, por email. Cuando una consulta parece importante, la persona adecuada de tu equipo recibe un aviso con el motivo.",
        },
        keys: ["alert"],
      },
      {
        kb: "Q-41",
        q: { en: "Where does my team work the tasks?", es: "¿Dónde trabaja mi equipo las tareas?" },
        a: {
          en: "In their own list, each person signed in as themselves.",
          es: "En su propia lista, cada persona entrando como ella misma.",
        },
        keys: ["taskList"],
      },
      {
        kb: "Q-42",
        q: { en: "Can my team ask the assistant what to do today?", es: "¿Puede mi equipo preguntarle al asistente qué hacer hoy?" },
        a: {
          en: "Yes. Each person can ask \"What do I have today?\" and the assistant explains what comes first and why.",
          es: "Sí. Cada persona puede preguntar «¿Qué tengo hoy?» y el asistente le explica qué va primero y por qué.",
        },
        keys: ["dailyVoice"],
      },
      {
        kb: "Q-22",
        q: { en: "Can I add my team and give them different roles?", es: "¿Puedo añadir a mi equipo y darles roles distintos?" },
        a: {
          en: "Yes. You invite your team and set a role for each person, and the roles decide what they see and do.",
          es: "Sí. Invitas a tu equipo y defines un rol para cada persona, y los roles deciden qué ven y qué hacen.",
        },
        keys: ["taskList"],
      },
    ],
  },
  {
    id: "trial",
    title: { en: "Trial, plans and paying", es: "Prueba, planes y pago" },
    titlePub: { en: "Price and how to start", es: "Precio y cómo empezar" }, // Copy 1107 D-20
    titleKeys: ["plans"],
    items: [
      {
        kb: "Q-11",
        q: { en: "How long is the trial and what does it cost?", es: "¿Cuánto dura la prueba y qué cuesta?" },
        a: {
          en: "14 days of Essential, free and with no payment method. You create the account yourself.",
          es: "14 días de Essential, gratis y sin método de pago. Creas la cuenta tú mismo.",
        },
        keys: ["trial", "publicSignup"],
      },
      {
        kb: "Q-12",
        q: { en: "What happens after the 14 days?", es: "¿Qué pasa después de los 14 días?" },
        a: {
          en: "Your account and your data stay. The paid parts pause until you choose a plan, and you can still log in.",
          es: "Tu cuenta y tus datos se quedan. Las partes de pago se pausan hasta que elijas un plan, y puedes seguir entrando.",
        },
        keys: ["trial", "publicSignup"],
      },
      {
        kb: "Q-13",
        // Copy 1108 P-3/P-4: the question and the answer in both views
        q: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
        a: {
          en: "The pilot is free. We explain the price for after the pilot in the demo, before anything is agreed.",
          es: "El piloto es gratuito. El precio para después del piloto te lo explicamos en la demo, antes de acordar nada.",
        },
      },
      {
        kb: "Q-14",
        q: { en: "Can I pay by card on the website?", es: "¿Puedo pagar con tarjeta en la web?" },
        a: {
          en: "No. We issue an invoice and you pay it by bank transfer. There is no card payment and no automatic renewal.",
          es: "No. Emitimos una factura y la pagas por transferencia. No hay pago con tarjeta ni renovación automática.",
        },
        keys: ["plans"], // Copy 1107 D-20: production has no billing part
      },
      {
        kb: "Q-15",
        q: { en: "When is my plan active?", es: "¿Cuándo está activo mi plan?" },
        a: { en: "When the payment is confirmed. An issued invoice does not activate anything on its own.", es: "Cuando el pago está confirmado. Una factura emitida no activa nada por sí sola." },
        keys: ["plans"], // Copy 1107 D-20
      },
      {
        kb: "Q-16",
        q: { en: "Do I have to talk to a salesperson first?", es: "¿Tengo que hablar antes con un comercial?" },
        a: { en: "No. You can start on your own.", es: "No. Puedes empezar por tu cuenta." },
        keys: ["trial", "publicSignup"],
        pub: { en: "No sales call is needed: write to us and we will show you the system.", es: "No hace falta una llamada comercial: escríbenos y te enseñamos el sistema." },
      },
      {
        kb: "Q-21",
        q: { en: "How long does setting up take?", es: "¿Cuánto se tarda en configurarlo?" },
        a: {
          en: "You prepare your agency's details, your logo and your team. We connect the mailbox and WhatsApp with you and test each channel with a real message before calling it connected.",
          es: "Tú preparas los datos de tu agencia, tu logo y tu equipo. Conectamos contigo el buzón y el WhatsApp y probamos cada canal con un mensaje real antes de darlo por conectado.",
        },
        keys: ["mailboxConnection", "whatsappOwnNumber"],
        pub: { en: "We show you the system with example data.", es: "Te enseñamos el sistema con datos de ejemplo." },
      },
    ],
  },
  {
    id: "data",
    title: { en: "Your data", es: "Tus datos" },
    items: [
      {
        kb: "Q-32",
        q: { en: "What happens to the data of the people who write to me?", es: "¿Qué pasa con los datos de las personas que me escriben?" },
        a: {
          en: "It is processed to answer and to organise the enquiry for your agency. It is not sold and not used to advertise to anyone. The privacy notice states the detail.",
          es: "Se tratan para responder y organizar la consulta para tu agencia. No se venden y no se usan para hacer publicidad a nadie. El aviso de privacidad indica el detalle.",
        },
      },
      {
        kb: "Q-33",
        q: { en: "Where is the data stored?", es: "¿Dónde se guardan los datos?" },
        a: {
          en: "In the European Union. The database and the files sit with our infrastructure provider in Frankfurt, and the servers that run the automation are in Germany. Customer files have no public link, and every time a person opens one it is logged.",
          es: "En la Unión Europea. La base de datos y los archivos están con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. Los archivos de clientes no tienen enlace público, y cada vez que una persona abre uno queda registrado.",
        },
      },
      {
        kb: "Q-34",
        q: { en: "Can a customer ask for their data to be deleted?", es: "¿Puede un cliente pedir que se eliminen sus datos?" },
        a: {
          en: "Yes. The data deletion page explains how to ask, and we help your agency answer such a request.",
          es: "Sí. La página de eliminación de datos explica cómo pedirlo, y ayudamos a tu agencia a responder a esa solicitud.",
        },
      },
      {
        kb: "Q-44",
        q: { en: "How long do you keep the data, and do you keep backups?", es: "¿Cuánto tiempo guardáis los datos y hacéis copias de seguridad?" },
        a: {
          // unchanged until counsel has answered (§14, §21)
          en: "We do not publish a retention period yet, and we will not print one we do not keep to. Ask us and you get the answer that applies to your agency in writing.",
          es: "Todavía no publicamos un plazo de conservación y no vamos a imprimir uno que no cumplamos. Pregúntanos y recibes por escrito la respuesta que se aplica a tu agencia.",
        },
      },
      {
        kb: "Q-45",
        q: { en: "Which services process our messages, and where?", es: "¿Qué servicios tratan nuestros mensajes y dónde?" },
        a: {
          en: "The privacy notice names each one and what it is for. The servers that run the automation are in Germany and the database and files are in the European Union. For the message channels and the AI provider we state what each provider declares, because we have not verified those regions ourselves.",
          es: "El aviso de privacidad nombra cada uno y para qué sirve. Los servidores que ejecutan la automatización están en Alemania y la base de datos y los archivos en la Unión Europea. Para los canales de mensajes y el proveedor de IA indicamos lo que declara cada proveedor, porque esas regiones no las hemos verificado nosotros.",
        },
      },
      {
        kb: "Q-46",
        q: { en: "If I enter my opening hours, does the assistant respect them?", es: "Si indico mi horario, ¿lo respeta el asistente?" },
        a: {
          en: "In messages, no: a text enquiry is answered whenever it arrives. On the phone, your hours steer the assistant.",
          es: "En los mensajes no: una consulta de texto se responde cuando llega. En el teléfono, tu horario dirige el asistente.",
        },
        keys: ["phoneAssistant"],
        pub: { en: "No: a text enquiry is answered whenever it arrives, at any hour.", es: "No: una consulta de texto se responde cuando llega, a cualquier hora." },
      },
    ],
  },
  {
    id: "other",
    title: { en: "Other questions", es: "Otras preguntas" },
    items: [
      {
        kb: "Q-18 / Q-19",
        q: { en: "Do you work with HubSpot, Salesforce, Pipedrive or Zoho?", es: "¿Funciona con HubSpot, Salesforce, Pipedrive o Zoho?" },
        a: {
          en: "Yes. A CRM is included and, if you already use one of these, we connect it with you.",
          es: "Sí. Se incluye un CRM y, si ya usas uno de estos, lo conectamos contigo.",
        },
        keys: ["integrations"],
      },
      {
        kb: "Q-20",
        q: { en: "Does it work with Outlook or Microsoft 365?", es: "¿Funciona con Outlook o Microsoft 365?" },
        a: { en: "Yes, with your agency's mailbox, together with us.", es: "Sí, con el buzón de tu agencia, junto con nosotros." },
        keys: ["outlook"],
      },
      {
        kb: "Q-27",
        q: { en: "Does it take phone calls?", es: "¿Atiende llamadas de teléfono?" },
        a: {
          en: "Yes. The phone assistant answers the call, leaves what the customer asks for on their record and a task for your team. A person gives the price.",
          es: "Sí. El asistente telefónico atiende la llamada, deja lo que pide el cliente en su ficha y una tarea a tu equipo. El precio lo da una persona.",
        },
        keys: ["phoneAssistant"],
      },
      {
        kb: "Q-28",
        q: { en: "Does it manage my Instagram?", es: "¿Gestiona mi Instagram?" },
        a: {
          en: "Not on its own: you prepare the post with the listing's details and it goes out on your account when you approve it.",
          es: "No lo gestiona solo: preparas la publicación con los datos del inmueble y sale en tu cuenta cuando tú la apruebas.",
        },
        keys: ["instagram"],
      },
      {
        kb: "Q-29",
        q: { en: "What is Property Experience?", es: "¿Qué es Property Experience?" },
        a: {
          en: "An interactive 3D model of a property in the browser, as a service we build on request from your dimensioned plans.",
          es: "Un modelo 3D interactivo de un inmueble en el navegador, como servicio que construimos a petición a partir de tus planos con medidas.",
        },
        keys: ["model3d"],
      },
      {
        kb: "Q-30",
        q: { en: "Do you bring me leads from advertising?", es: "¿Me traéis leads de publicidad?" },
        a: { en: "We do not run campaigns or buy leads. We take in the leads from the ads you already run.", es: "No hacemos campañas ni compramos leads. Recogemos los leads de los anuncios que ya tienes." },
        keys: ["adsLeads"],
        pub: { en: "No. We do not run campaigns or buy leads.", es: "No. No hacemos campañas ni compramos leads." },
      },
    ],
  },
];

/** The groups of a view, with every answer resolved to its text: the target answer while its keys are live, the public wording otherwise, or the question left out; groups with no question left are hidden. */
export function faqGroupsFor(locale: Locale, view: ClaimView): { id: string; title: string; items: { kb: string; q: string; a: string }[] }[] {
  return faqGroups
    .map((g) => ({
      id: g.id,
      title: (g.titlePub && g.titleKeys && !live(g.titleKeys, view) ? g.titlePub : g.title)[locale],
      items: g.items
        .map((it) => {
          const on = !it.keys || live(it.keys, view);
          const a = on ? it.a : it.pub ?? null;
          const q = it.qPub && it.qKeys && !live(it.qKeys, view) ? it.qPub : it.q;
          return a ? { kb: it.kb, q: q[locale], a: withChannels(a[locale], locale, view) } : null;
        })
        .filter((it): it is { kb: string; q: string; a: string } => it !== null),
    }))
    .filter((g) => g.items.length > 0);
}

/** All questions, counted (the target state: twenty-six in five groups). */
export const faqCount = faqGroups.reduce((n, g) => n + g.items.length, 0);
