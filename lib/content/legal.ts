import type { Locale } from "@/lib/i18n/config";

/**
 * Legal page content. Ported from the previous site where text existed
 * (legal notice, privacy). Terms and data deletion are new routes. Every page
 * is labelled PLACEHOLDER until counsel has reviewed it. Nothing here is a
 * compliance claim.
 */
export type LegalSlug = "privacy" | "terms" | "data-deletion" | "notice";
export const legalSlugs: LegalSlug[] = ["privacy", "terms", "data-deletion", "notice"];

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}
export interface LegalPage {
  title: string;
  updated: string;
  sections: LegalSection[];
}

/**
 * The identity block (LEGAL_PAGES_FINAL_v1 v4, R22; R25C point 8): a natural person trading as NuovaSolution, five fields
 * from the owner's E14 file. The fields reach the build only as Vercel environment values (NUOVA_E14_NAME, _NIF, _ADDRESS,
 * _EMAIL, _PHONE) after API's "E14 complete" signal; nothing of them is written here. Until all five are set, the block
 * carries the lines the previous site has published for months (name, address fragment, e-mail) and the pages keep their
 * provisional label. With all five set the v4 wording renders and the label can go (NUOVA_LEGAL_E14=complete).
 */
const e14 = {
  name: process.env.NUOVA_E14_NAME?.trim() || null,
  nif: process.env.NUOVA_E14_NIF?.trim() || null,
  address: process.env.NUOVA_E14_ADDRESS?.trim() || null,
  email: process.env.NUOVA_E14_EMAIL?.trim() || null,
  phone: process.env.NUOVA_E14_PHONE?.trim() || null,
};
export const e14Complete = Boolean(e14.name && e14.nif && e14.address && e14.email && e14.phone) && process.env.NUOVA_LEGAL_E14 === "complete";
const mail = e14Complete ? (e14.email as string) : "antonio@nuovasolution.com";
const owner = e14Complete
  ? {
      en: [`${e14.name}, a natural person, trading as NuovaSolution.`, `Tax number (NIF): ${e14.nif}. Address: ${e14.address}. E-mail: ${e14.email}. Telephone: ${e14.phone}.`],
      es: [`${e14.name}, persona física, que opera con el nombre comercial NuovaSolution.`, `NIF: ${e14.nif}. Dirección: ${e14.address}. Email: ${e14.email}. Teléfono: ${e14.phone}.`],
    }
  : {
      en: ["Antonio Jesus Diaz Gomez", "Prolongación Hernando de Carabeo, Nerja, Málaga, Spain", "antonio@nuovasolution.com"],
      es: ["Antonio Jesus Diaz Gomez", "Prolongación Hernando de Carabeo, Nerja, Málaga, España", "antonio@nuovasolution.com"],
    };

const pages: Record<Locale, Record<LegalSlug, LegalPage>> = {
  en: {
    notice: {
      title: "Legal notice",
      updated: "2026-09-08",
      sections: [
        { heading: "Owner", paragraphs: owner.en },
        { heading: "Activity", paragraphs: ["NuovaSolution provides real estate agencies with a system that answers their enquiries, records each one, and creates tasks for the agency's team."] }, // HANDOVER_1021 D-1
        { heading: "Acceptance of terms", paragraphs: ["By using this website you agree to the terms in this notice. If you do not agree, please do not use the site."] },
        { heading: "Liability", paragraphs: ["We do our best to keep information accurate, but we cannot guarantee it. We are not responsible for any issues arising from use of this website."] },
        { heading: "Intellectual property", paragraphs: ["All content on this site, including text, visuals and code, belongs to NuovaSolution. Please do not reproduce it without written permission."] },
      ],
    },
    privacy: {
      title: "Privacy notice",
      updated: "2026-09-08",
      sections: [
        { heading: "Data controller", paragraphs: owner.en },
        { heading: "What this notice covers", paragraphs: ["This website, the questions you send through the question box, the contact channels listed on the contact page, and the creation of an agency account for the trial.", "The processing carried out inside an agency's own Nuova environment is described in the agreement with that agency. This notice does not yet describe it in full and will be extended after legal review."] },
        { heading: "Purpose", paragraphs: ["We use your data to reply to your enquiry, to create and operate your agency account when you ask for one, and to provide the service you asked about."] },
        { heading: "Legal basis", paragraphs: ["Your consent when you contact us, and the performance of the agreement when you create an account. Where a legal obligation applies, that obligation."] },
        { heading: "Data retention", paragraphs: ["We keep your data for as long as needed to handle your request or to operate your account. You can ask us to delete it at any time. Specific retention periods will be stated here after legal review."] },
        { heading: "Your rights", paragraphs: ["You can ask to see, correct or delete your data at any time. Send an email to antonio@nuovasolution.com. You may also lodge a complaint with the Spanish data protection authority."] },
        { heading: "Third parties", paragraphs: ["We do not sell your data. Service providers that process data on our behalf will be listed here after legal review."] },
        { heading: "Analytics", paragraphs: ["This site uses cookieless page view analytics. No advertising tracking is used."] },
      ],
    },
    terms: {
      title: "Terms of service",
      updated: "2026-09-08",
      sections: [
        { heading: "Scope", paragraphs: ["These terms govern the use of this website and the trial of the NuovaSolution service. The full terms for a paid package are agreed directly with the agency."] },
        { heading: "The trial", paragraphs: ["The trial is free for fourteen days and requires no payment method."] },
        { heading: "What the browser never does", paragraphs: ["No trial, entitlement, role, readiness state or extension is granted by this website. Every one of those is decided by the service itself."] },
        { heading: "Acceptable use", paragraphs: ["You agree not to use the service to send unsolicited communications or in breach of applicable communication rules."] },
        { heading: "Changes", paragraphs: ["These terms will be replaced by a reviewed version. The date above shows the current text."] },
      ],
    },
    "data-deletion": {
      title: "How to ask us to delete your data",
      updated: "2026-10-23",
      sections: [
        { heading: "If you wrote to an estate agency", paragraphs: [`That agency decides about your data and we act on its instructions. Write to ${mail} from the e-mail address or phone number you used, and say that you want your data deleted. We pass your request to the agency, help it answer, and tell you the outcome.`] },
        { heading: "If you are an agency using Nuova", paragraphs: [`Write to ${mail} from your account address, or ask us inside your account. We confirm what will be deleted, what we have to keep by law, and when it is done.`] },
        { heading: "If your agency connected Instagram", paragraphs: [`Open NuovaSolution, go to Social and choose Disconnect. The access token is deleted immediately and we stop reading and publishing. Removing the app in your Instagram settings also ends our access. Neither of those deletes the data already stored: for that, write to ${mail} from the address of your account and name your agency. We then delete the posts, comments, messages and the leads created from them for that connection.`] }, // META_LEGAL_TEXT_FINAL §3 (R26-j)
        { heading: "If you commented on or wrote to an agency on Instagram", paragraphs: [`Write to ${mail} and name the agency and the approximate date of your message. We do not store your Instagram username or your original Instagram identifier, so the agency and the time frame are what let us find your data.`] },
        { heading: "What we need from you", paragraphs: ["The address or number you used with us, and what you want: a copy of your data, a correction, or deletion. We may ask you to confirm the request from that same address or number, so that nobody else can ask for your data."] },
        { heading: "What happens then", paragraphs: ["A person handles every request. We confirm that we received it, then tell you the outcome, including anything we must keep by law and why. We answer within the period the law sets, which is normally one month."] },
        { heading: "What this page does not do", paragraphs: ["This page does not delete anything by itself. It tells you how to ask."] },
        { heading: "If you are not satisfied", paragraphs: ["You can complain to the Spanish data protection authority, the AEPD."] },
      ],
    },
  },
  es: {
    notice: {
      title: "Aviso legal",
      updated: "2026-09-08",
      sections: [
        { heading: "Titular", paragraphs: owner.es },
        { heading: "Actividad", paragraphs: ["NuovaSolution ofrece a las agencias inmobiliarias un sistema que responde a sus consultas, registra cada una en una ficha y crea tareas para el equipo de la agencia."] }, // HANDOVER_1021 D-1
        { heading: "Aceptación de condiciones", paragraphs: ["Al usar este sitio web aceptas las condiciones recogidas en este aviso. Si no estás de acuerdo, te pedimos que no lo utilices."] },
        { heading: "Responsabilidad", paragraphs: ["Intentamos mantener la información actualizada y correcta, pero no podemos garantizarlo. No nos hacemos responsables de los problemas que puedan surgir del uso de este sitio."] },
        { heading: "Propiedad intelectual", paragraphs: ["Todo el contenido de este sitio, incluyendo textos, imágenes y código, pertenece a NuovaSolution. No puede reproducirse sin permiso por escrito."] },
      ],
    },
    privacy: {
      title: "Aviso de privacidad",
      updated: "2026-09-08",
      sections: [
        { heading: "Responsable del tratamiento", paragraphs: owner.es },
        { heading: "Qué cubre este aviso", paragraphs: ["Este sitio web, las preguntas que envías por el cuadro de preguntas, los canales de contacto de la página de contacto y la creación de una cuenta de agencia para la prueba.", "El tratamiento que se realiza dentro del entorno Nuova de una agencia se describe en el acuerdo con esa agencia. Este aviso todavía no lo describe por completo y se ampliará tras la revisión legal."] },
        { heading: "Finalidad", paragraphs: ["Usamos tus datos para responder a tu consulta, para crear y operar la cuenta de tu agencia cuando la solicitas y para prestarte el servicio que has pedido."] },
        { heading: "Base legal", paragraphs: ["Tu consentimiento al ponerte en contacto con nosotros, y la ejecución del acuerdo cuando creas una cuenta. Cuando aplique una obligación legal, esa obligación."] },
        { heading: "Conservación de datos", paragraphs: ["Guardamos tus datos el tiempo necesario para gestionar tu solicitud u operar tu cuenta. Puedes pedirnos que los eliminemos en cualquier momento. Los plazos concretos se indicarán aquí tras la revisión legal."] },
        { heading: "Tus derechos", paragraphs: ["Puedes consultar, corregir o eliminar tus datos cuando quieras. Escríbenos a antonio@nuovasolution.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos."] },
        { heading: "Terceros", paragraphs: ["No vendemos tus datos. Los proveedores que tratan datos por nuestra cuenta se enumerarán aquí tras la revisión legal."] },
        { heading: "Analítica", paragraphs: ["Este sitio usa una analítica de visitas sin cookies. No se usa seguimiento publicitario."] },
      ],
    },
    terms: {
      title: "Términos del servicio",
      updated: "2026-09-08",
      sections: [
        { heading: "Alcance", paragraphs: ["Estos términos regulan el uso de este sitio web y la prueba del servicio NuovaSolution. Los términos completos de un paquete de pago se acuerdan directamente con la agencia."] },
        { heading: "La prueba", paragraphs: ["La prueba es gratuita durante 14 días y no requiere ningún método de pago."] },
        { heading: "Lo que el navegador nunca hace", paragraphs: ["Este sitio web no concede ninguna prueba, permiso, rol, estado de preparación ni ampliación. Todo eso lo decide el propio servicio."] },
        { heading: "Uso aceptable", paragraphs: ["Te comprometes a no usar el servicio para enviar comunicaciones no solicitadas ni en contra de la normativa de comunicación aplicable."] },
        { heading: "Cambios", paragraphs: ["Estos términos se sustituirán por una versión revisada. La fecha de arriba indica el texto actual."] },
      ],
    },
    "data-deletion": {
      title: "Cómo pedirnos que eliminemos tus datos",
      updated: "2026-10-23",
      sections: [
        { heading: "Si escribiste a una inmobiliaria", paragraphs: [`Esa agencia decide sobre tus datos y nosotros actuamos según sus instrucciones. Escribe a ${mail} desde el email o el teléfono que usaste e indica que quieres que se eliminen tus datos. Trasladamos tu solicitud a la agencia, la ayudamos a responderla y te comunicamos el resultado.`] },
        { heading: "Si eres una agencia que usa Nuova", paragraphs: [`Escribe a ${mail} desde la dirección de tu cuenta, o pídenoslo dentro de tu cuenta. Confirmamos qué se va a eliminar, qué tenemos que conservar por ley y cuándo está hecho.`] },
        { heading: "Si tu agencia conectó Instagram", paragraphs: [`Abre NuovaSolution, entra en Social y pulsa Desconectar. El token se elimina de inmediato y dejamos de leer y de publicar. Eliminar la app en los ajustes de Instagram también termina nuestro acceso. Ninguna de las dos cosas suprime los datos ya guardados: para eso, escribe a ${mail} desde la dirección de tu cuenta e indica el nombre de la agencia. Entonces suprimimos las publicaciones, los comentarios, los mensajes y las oportunidades creadas a partir de ellos para esa conexión.`] }, // META_LEGAL_TEXT_FINAL §3 (R26-j)
        { heading: "Si has comentado o escrito por Instagram a una agencia", paragraphs: [`Escribe a ${mail} e indica la agencia y la fecha aproximada de tu mensaje. No guardamos tu nombre de usuario ni tu identificador original de Instagram, así que la agencia y el periodo son lo que nos permite encontrar tus datos.`] },
        { heading: "Qué necesitamos de ti", paragraphs: ["La dirección o el número que usaste con nosotros y qué pides: una copia de tus datos, una corrección o la eliminación. Podemos pedirte que confirmes la solicitud desde esa misma dirección o número, para que nadie más pueda pedir tus datos."] },
        { heading: "Qué pasa después", paragraphs: ["Una persona gestiona cada solicitud. Confirmamos que la hemos recibido y después te comunicamos el resultado, incluido lo que tengamos que conservar por ley y por qué. Respondemos dentro del plazo que marca la ley, que normalmente es de un mes."] },
        { heading: "Qué no hace esta página", paragraphs: ["Esta página no elimina nada por sí misma. Te indica cómo pedirlo."] },
        { heading: "Si no estás conforme", paragraphs: ["Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD)."] },
      ],
    },
  },
};

export function legalPage(locale: Locale, slug: LegalSlug): LegalPage {
  return pages[locale][slug];
}
