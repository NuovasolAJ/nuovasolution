import type { Locale } from "@/lib/i18n/config";

/**
 * The static FAQ (COPY_DELTAS_0930 §3, FAQ_PAGE_COPY). It replaces the question box until Hosting reports
 * `WEBQA_MODEL_ROUTE`, the Reviewer's browser end to end has passed and the backend answers from
 * `faq-kb-v1.2`. Every answer is Copy's text, traced to its row in PRODUCT_FAQ_KB_v1.md (v1.2) by `kb`.
 * Nothing here promises a reply: the contact line offers an address and no more.
 * The Spanish group titles are the implementer's interim wording (Copy gave the groups in English).
 */
type L = Record<Locale, string>;
export interface FaqItem {
  kb: string;
  q: L;
  a: L;
}
export interface FaqGroup {
  id: string;
  title: L;
  items: FaqItem[];
}

export const faqFrame = {
  eyebrow: { en: "Questions", es: "Preguntas" },
  h1: { en: "Straight answers about what Nuova does today", es: "Respuestas claras sobre lo que hace Nuova hoy" },
  lead: {
    en: "If something is not part of the product yet, this page says so. Nothing here is a plan for later.",
    es: "Si algo todavía no forma parte del producto, esta página lo dice. Nada de lo que hay aquí es un plan para más adelante.",
  },
  contact: { en: "Not answered here? Write to antonio@nuovasolution.com.", es: "¿No está aquí la respuesta? Escribe a antonio@nuovasolution.com." },
} satisfies Record<string, L>;

export const faqGroups: FaqGroup[] = [
  {
    id: "what",
    title: { en: "What Nuova does", es: "Qué hace Nuova" },
    items: [
      {
        kb: "Q-01",
        q: { en: "What does Nuova actually do?", es: "¿Qué hace Nuova exactamente?" },
        a: {
          en: "It answers the enquiries your agency receives, records each one with what the customer asked for, and turns a viewing request into a task your team takes and closes.",
          es: "Responde a las consultas que recibe tu agencia, registra cada una con lo que ha pedido el cliente y convierte una petición de visita en una tarea que tu equipo toma y cierra.",
        },
      },
      {
        kb: "Q-02",
        q: { en: "Which channels are answered?", es: "¿Qué canales se responden?" },
        a: { en: "Text enquiries on WhatsApp and by e-mail. Other channels are not part of the offer today.", es: "Consultas de texto por WhatsApp y por email. Otros canales no forman parte de la oferta hoy." },
      },
      {
        kb: "Q-03",
        q: { en: "Does it answer at night and at weekends?", es: "¿Responde de noche y los fines de semana?" },
        a: {
          en: "Yes. The reply is written when the message arrives rather than when somebody is free. We do not promise a number of minutes, because we do not measure one.",
          es: "Sí. La respuesta se escribe cuando llega el mensaje, no cuando alguien tiene tiempo. No prometemos un número de minutos porque no lo medimos.",
        },
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
          en: "In the language the customer wrote in. You set a default for the cases where that cannot be determined.",
          es: "En el idioma en el que escribió el cliente. Tú defines un idioma por defecto para los casos en que no se pueda determinar.",
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
      },
      {
        kb: "Q-08",
        q: { en: "Will it invent details about a property?", es: "¿Se inventa datos de una propiedad?" },
        a: {
          en: "It does not put property suggestions in replies today; that part is switched off until it passes our own tests. What it answers comes from what the customer wrote and what your agency has confirmed.",
          es: "Hoy no incluye propuestas de propiedades en las respuestas; esa parte está desactivada hasta que supere nuestras propias pruebas. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado.",
        },
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
          en: "Two, until something ties them together. There is no automatic merge across channels today, and we would rather tell you now than let you find it in your second week.",
          es: "Dos, hasta que algo las una. Hoy no hay una unión automática entre canales, y preferimos decírtelo ahora y no que lo descubras en tu segunda semana.",
        },
      },
      {
        kb: "Q-31",
        q: { en: "Does it tell me which leads are hot?", es: "¿Me dice qué leads están calientes?" },
        a: {
          en: "Not as a score or a label, and we will not invent one. What your team gets is the task: the customer, the property and the time they asked for. No alert message is sent to you.",
          es: "No como una puntuación ni una etiqueta, y no la vamos a inventar. Lo que recibe tu equipo es la tarea: el cliente, el inmueble y la hora que ha pedido. No se te envía ningún mensaje de alerta.",
        },
      },
      {
        kb: "Q-41",
        q: { en: "Where does my team work the tasks?", es: "¿Dónde trabaja mi equipo las tareas?" },
        a: {
          en: "In Spanish or English, each person with their own list, signed in as themselves. There is no public address for it yet, so setting that up is part of what we do with you.",
          es: "En español o en inglés, cada persona con su propia lista y entrando como ella misma. Todavía no hay una dirección pública para eso, así que prepararlo es parte de lo que hacemos contigo.",
        },
      },
      {
        kb: "Q-42",
        q: { en: "Can my team ask the assistant what to do today?", es: "¿Puede mi equipo preguntarle al asistente qué hacer hoy?" },
        a: {
          en: "Not today. What your team gets is the task list: take a task, close it, and see who took the others.",
          es: "Hoy no. Lo que recibe tu equipo es la lista de tareas: tomar una tarea, cerrarla y ver quién ha tomado las demás.",
        },
      },
      {
        kb: "Q-22",
        q: { en: "Can I add my team and give them different roles?", es: "¿Puedo añadir a mi equipo y darles roles distintos?" },
        a: {
          en: "Yes. You invite your team and set a role for each person, and the roles decide what they see and do.",
          es: "Sí. Invitas a tu equipo y defines un rol para cada persona, y los roles deciden qué ven y qué hacen.",
        },
      },
    ],
  },
  {
    id: "trial",
    title: { en: "Trial, plans and paying", es: "Prueba, planes y pago" },
    items: [
      {
        kb: "Q-11",
        q: { en: "How long is the trial and what does it cost?", es: "¿Cuánto dura la prueba y qué cuesta?" },
        a: { en: "14 days of Essential, free, with no payment method and no card. You create the account yourself.", es: "14 días de Essential, gratis, sin método de pago y sin tarjeta. Creas la cuenta tú mismo." },
      },
      {
        kb: "Q-12",
        q: { en: "What happens after the 14 days?", es: "¿Qué pasa después de los 14 días?" },
        a: {
          en: "Your account and your data stay. The paid parts pause until you choose a plan, and you can still log in.",
          es: "Tu cuenta y tus datos se quedan. Las partes de pago se pausan hasta que elijas un plan, y puedes seguir entrando.",
        },
      },
      {
        kb: "Q-13",
        q: { en: "What does it cost after that?", es: "¿Cuánto cuesta después?" },
        a: {
          en: "We tell you the price and the billing period for your agency before anything is agreed. There is no price on this site yet.",
          es: "Te decimos el precio y el periodo de facturación para tu agencia antes de acordar nada. Todavía no hay ningún precio en este sitio.",
        },
      },
      {
        kb: "Q-14",
        q: { en: "Can I pay by card on the website?", es: "¿Puedo pagar con tarjeta en la web?" },
        a: {
          en: "No. We issue an invoice and you pay it by bank transfer. There is no card payment and no automatic renewal.",
          es: "No. Emitimos una factura y la pagas por transferencia. No hay pago con tarjeta ni renovación automática.",
        },
      },
      {
        kb: "Q-15",
        q: { en: "When is my plan active?", es: "¿Cuándo está activo mi plan?" },
        a: { en: "When the payment is confirmed. An issued invoice does not activate anything on its own.", es: "Cuando el pago está confirmado. Una factura emitida no activa nada por sí sola." },
      },
      {
        kb: "Q-16",
        q: { en: "Do I have to talk to a salesperson first?", es: "¿Tengo que hablar antes con un comercial?" },
        a: { en: "No. You can start on your own. A demo is optional and never a condition.", es: "No. Puedes empezar por tu cuenta. La demo es opcional y nunca una condición." },
      },
      {
        kb: "Q-21",
        q: { en: "How long does setting up take?", es: "¿Cuánto se tarda en configurarlo?" },
        a: {
          en: "We do not give a duration. You do it yourself in steps, your progress is saved, and you can stop and come back.",
          es: "No damos una duración. Lo haces tú mismo por pasos, tu progreso se guarda y puedes parar y volver.",
        },
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
          en: "Not today. A text enquiry is answered whenever it arrives. Your hours will steer the phone assistant, which is still being built.",
          es: "Hoy no. Una consulta de texto se responde cuando llega. Tu horario dirigirá el asistente telefónico, que todavía está en construcción.",
        },
      },
    ],
  },
  {
    id: "not-today",
    title: { en: "What is not part of the offer today", es: "Lo que hoy no forma parte de la oferta" },
    items: [
      {
        kb: "Q-18 / Q-19",
        q: { en: "Do you work with HubSpot, Salesforce, Pipedrive or Zoho?", es: "¿Funciona con HubSpot, Salesforce, Pipedrive o Zoho?" },
        a: {
          en: "Not today. A CRM is included and your leads live there from the start. The field mappings for those four exist on our side, and each still needs one real connection and one real sync for an agency before we would promise it.",
          es: "Hoy no. Se incluye un CRM y tus leads viven ahí desde el principio. Las correspondencias de campos de esos cuatro existen por nuestra parte, y cada una necesita todavía una conexión real y una sincronización real en una agencia antes de que lo prometamos.",
        },
      },
      {
        kb: "Q-20",
        q: { en: "Does it work with Outlook or Microsoft 365?", es: "¿Funciona con Outlook o Microsoft 365?" },
        a: {
          en: "Not today. We can read a mailbox in our test environment; replying inside an Outlook thread does not exist yet. Receiving a mail from an Outlook account is not an Outlook integration.",
          es: "Hoy no. En nuestro entorno de pruebas podemos leer un buzón; responder dentro de un hilo de Outlook todavía no existe. Recibir un correo desde una cuenta de Outlook no es una integración con Outlook.",
        },
      },
      {
        kb: "Q-26",
        q: { en: "Can it read photos or PDFs a customer sends?", es: "¿Puede leer fotos o PDF que envía un cliente?" },
        a: {
          en: "Not as part of the offer today. It is built and we are still testing it, including what happens with a file that cannot be read.",
          es: "Hoy no como parte de la oferta. Está construido y seguimos probándolo, incluido qué pasa con un archivo que no se puede leer.",
        },
      },
      {
        kb: "Q-27",
        q: { en: "Does it take phone calls?", es: "¿Atiende llamadas de teléfono?" },
        a: {
          en: "No. A phone assistant is being built and it is not part of what you can order today.",
          es: "No. Un asistente telefónico está en construcción y hoy no forma parte de lo que se puede contratar.",
        },
      },
      {
        kb: "Q-28",
        q: { en: "Does it manage my Instagram?", es: "¿Gestiona mi Instagram?" },
        a: {
          en: "Not today. It depends on an approval from the platform that we do not have yet, and we will not give you a date for someone else's decision.",
          es: "Hoy no. Depende de una aprobación de la plataforma que todavía no tenemos, y no vamos a dar una fecha para la decisión de otro.",
        },
      },
      {
        kb: "Q-29",
        q: { en: "What is Property Experience?", es: "¿Qué es Property Experience?" },
        a: {
          en: "An interactive 3D model of a property in the browser, as a service we build on request from your dimensioned plans.",
          es: "Un modelo 3D interactivo de un inmueble en el navegador, como servicio que construimos a petición a partir de tus planos con medidas.",
        },
      },
      {
        kb: "Q-30",
        q: { en: "Do you bring me leads from advertising?", es: "¿Me traéis leads de publicidad?" },
        a: { en: "No. Nuova works on the enquiries that reach your agency.", es: "No. Nuova trabaja sobre las consultas que llegan a tu agencia." },
      },
    ],
  },
];

/** All questions, counted (Copy: twenty-six in five groups). */
export const faqCount = faqGroups.reduce((n, g) => n + g.items.length, 0);
