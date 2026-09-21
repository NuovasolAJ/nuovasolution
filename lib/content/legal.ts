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

const owner = {
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
        { heading: "Activity", paragraphs: ["NuovaSolution provides an operating layer for real estate agencies: enquiries are answered, understood and carried forward in one system with one memory of the customer."] },
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
      title: "Your data, and how to ask about it",
      updated: "2026-09-21",
      sections: [
        { heading: "Who to write to", paragraphs: ["Write to antonio@nuovasolution.com from the address you used with us. Say what you are asking for: a copy of your data, a correction, or deletion."] },
        { heading: "If you dealt with an agency", paragraphs: ["If you contacted an estate agency that uses Nuova, that agency decides about your data. We pass your request to them and help them answer it."] },
        { heading: "Checking it is you", paragraphs: ["We may ask you to confirm the request from the same email address or phone number, so nobody else can ask for your data."] },
        { heading: "What happens", paragraphs: ["A person handles every request. We confirm receipt, then tell you the outcome, including anything we have to keep by law and why."] },
        { heading: "Timing", paragraphs: ["We answer within the period the law sets, which is normally one month."] },
        { heading: "This page", paragraphs: ["This page does not delete anything itself."] },
        { heading: "Complaint", paragraphs: ["You can also complain to the Spanish data protection authority (AEPD)."] },
      ],
    },
  },
  es: {
    notice: {
      title: "Aviso legal",
      updated: "2026-09-08",
      sections: [
        { heading: "Titular", paragraphs: owner.es },
        { heading: "Actividad", paragraphs: ["NuovaSolution ofrece una capa operativa para agencias inmobiliarias: las consultas se responden, se entienden y se llevan hacia adelante en un solo sistema con una sola memoria del cliente."] },
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
        { heading: "La prueba", paragraphs: ["La prueba es gratuita durante catorce días y no requiere ningún método de pago."] },
        { heading: "Lo que el navegador nunca hace", paragraphs: ["Este sitio web no concede ninguna prueba, permiso, rol, estado de preparación ni ampliación. Todo eso lo decide el propio servicio."] },
        { heading: "Uso aceptable", paragraphs: ["Te comprometes a no usar el servicio para enviar comunicaciones no solicitadas ni en contra de la normativa de comunicación aplicable."] },
        { heading: "Cambios", paragraphs: ["Estos términos se sustituirán por una versión revisada. La fecha de arriba indica el texto actual."] },
      ],
    },
    "data-deletion": {
      title: "Tus datos, y cómo preguntar por ellos",
      updated: "2026-09-21",
      sections: [
        { heading: "A quién escribir", paragraphs: ["Escribe a antonio@nuovasolution.com desde la dirección que usaste con nosotros. Indica qué pides: una copia de tus datos, una corrección o la eliminación."] },
        { heading: "Si contactaste con una agencia", paragraphs: ["Si contactaste con una inmobiliaria que usa Nuova, es esa agencia quien decide sobre tus datos. Le pasamos tu solicitud y le ayudamos a responderla."] },
        { heading: "Comprobar que eres tú", paragraphs: ["Podemos pedirte que confirmes la solicitud desde el mismo email o teléfono, para que nadie más pueda pedir tus datos."] },
        { heading: "Qué pasa", paragraphs: ["Una persona gestiona cada solicitud. Confirmamos la recepción y después te comunicamos el resultado, incluido lo que tengamos que conservar por ley y por qué."] },
        { heading: "Plazo", paragraphs: ["Respondemos dentro del plazo que marca la ley, que normalmente es de un mes."] },
        { heading: "Esta página", paragraphs: ["Esta página no elimina nada por sí misma."] },
        { heading: "Reclamación", paragraphs: ["También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD)."] },
      ],
    },
  },
};

export function legalPage(locale: Locale, slug: LegalSlug): LegalPage {
  return pages[locale][slug];
}
