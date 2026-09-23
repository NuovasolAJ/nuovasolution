import type { Locale } from "@/lib/i18n/config";

/**
 * Pre-connection notice, Google Sheets variant. Text from docs/website_redesign/CONNECT_NOTICE_DRAFT_v1.md
 * (§A.2 short layer, §A.3 detail layer, §A.4 rules). DRAFT – not legally reviewed.
 *
 * Rules applied here:
 * - A row whose draft text still carries an open slot (⟦…⟧) is not rendered as text. It is listed with
 *   `pending: true` and the page says "awaiting legal review" instead (§A.4 rule 1).
 * - Acknowledgement, not consent (§A.4 rule 3). The control label is the draft's, pending counsel C-Q2.
 * - Shown only on test surfaces (stub and staging builds). A live build does not render it.
 */

export const CONNECT_NOTICE_VERSION = "connect-notice-v1-draft";

type T = Record<Locale, string>;

export const connectNoticeSheets: {
  heading: T;
  short: T[];
  more: T;
  rows: { heading: T; text?: T; pending?: true }[];
  ack: T;
  draftMark: T;
  pendingText: T;
  logged: T;
} = {
  heading: { en: "Before you connect Google Sheets", es: "Antes de conectar Google Sheets" },
  short: [
    {
      // COUNSEL_PACKAGE_v2 §D7.1: direction of the data flow corrected (the sheet receives a copy).
      en: "Connecting Google Sheets gives your team a copy of your leads in a spreadsheet you control. Nuova answers and qualifies the enquiries it receives, and writes each lead to your sheet. To do that, Nuova processes the messages and the details people send you, including with AI services that understand the message and draft the reply.",
      es: "Al conectar Google Sheets, tu equipo tiene una copia de tus leads en una hoja que controlas tú. Nuova responde y cualifica las consultas que recibe, y escribe cada lead en tu hoja. Para ello, Nuova trata los mensajes y los datos que te envían las personas, también con servicios de inteligencia artificial que entienden el mensaje y redactan la respuesta.",
    },
    {
      en: "Nuova uses this data to provide the service to your agency, not to sell it or to advertise to anyone. You can disconnect at any time.",
      es: "Nuova usa estos datos para prestar el servicio a tu agencia, no para venderlos ni para hacer publicidad a nadie. Puedes desconectar en cualquier momento.",
    },
  ],
  more: { en: "What is shared, who processes it and how long it is kept", es: "Qué se comparte, quién lo trata y cuánto tiempo se guarda" },
  rows: [
    {
      heading: { en: "What is shared", es: "Qué se comparte" },
      text: {
        // COUNSEL_PACKAGE_v2 §D7.1: the sheet is a copy sink; leads flow TO it.
        en: "To Google Sheets: a copy of each lead: contact details, what they are looking for, qualification and status. What Nuova keeps: the same lead, its qualification and priority, the conversation history, and tasks such as a viewing request.",
        es: "A Google Sheets: una copia de cada lead: datos de contacto, lo que busca, cualificación y estado. Lo que Nuova conserva: el mismo lead, su cualificación y prioridad, el historial de conversación y tareas como una petición de visita.",
      },
    },
    {
      heading: { en: "What it is used for", es: "Para qué se usa" },
      text: {
        en: "Answering enquiries on your agency's behalf, qualifying and prioritising them, keeping each customer as one record, and creating tasks for your team. Follow up messages are sent only where the person has given permission for that channel.",
        es: "Para responder a las consultas en nombre de tu agencia, cualificarlas y priorizarlas, mantener a cada cliente como una sola ficha y crear tareas para tu equipo. Los mensajes de seguimiento solo se envían cuando la persona ha dado su permiso para ese canal.",
      },
    },
    { heading: { en: "AI", es: "IA" }, pending: true },
    { heading: { en: "Who processes it", es: "Quién lo trata" }, pending: true },
    { heading: { en: "How long it is kept", es: "Cuánto tiempo se guarda" }, pending: true },
    {
      heading: { en: "Disconnecting", es: "Desconectar" },
      text: {
        en: "New leads stop going to the sheet. Everything stays in Nuova, and the sheet keeps what it already has.",
        es: "Los nuevos leads dejan de llegar a la hoja. Todo sigue en Nuova y la hoja conserva lo que ya tiene.",
      },
    },
    {
      heading: { en: "Your customers' rights", es: "Derechos de tus clientes" },
      text: {
        en: "People whose enquiries you receive can ask for a copy of their data, a correction or deletion. Nuova helps your agency answer those requests.",
        es: "Las personas cuyas consultas recibes pueden pedir una copia de sus datos, una corrección o su eliminación. Nuova ayuda a tu agencia a responder a esas solicitudes.",
      },
    },
  ],
  ack: { en: "I have read what is shared and why.", es: "He leído qué se comparte y para qué." },
  draftMark: { en: "DRAFT – not legally reviewed", es: "BORRADOR – sin revisión legal" },
  pendingText: { en: "Awaiting legal review. Not stated until it is confirmed.", es: "Pendiente de revisión legal. No se indica hasta que esté confirmado." },
  logged: {
    en: "Your acknowledgement was recorded with the time and your user. It confirms you read a draft; it is not a legal approval.",
    es: "Tu confirmación se ha registrado con la hora y tu usuario. Confirma que has leído un borrador; no es una aprobación legal.",
  },
};
