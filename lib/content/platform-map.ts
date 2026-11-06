import type { Locale } from "@/lib/i18n/config";
import { publishedCapability } from "@/lib/content/capabilities";
import { live, withChannels, type ClaimKey, type ClaimView } from "@/lib/claims";

/**
 * The platform in four tasks (owner follow-up order 2026-10-06 §4; master order 2026-10-10 §10; Copy 1105 v3 §21 of 06.11.): what
 * an agency does with NuovaSolution, each entry with one benefit line written for the target state and bound to its keys in
 * lib/claims.ts. No state chip in either view (§21): a row whose key is off is hidden in public, and so is a group with no row
 * left; where Copy gives a public wording, it stands instead. Every entry is clickable (master order: a menu must show plainly what
 * can be clicked): to its own page where one exists, otherwise to the chapter of the home page story or the section that shows it.
 */
type L = Record<Locale, string>;

export interface PlatformEntry {
  key: string;
  name: L;
  /** The target line. */
  line: L;
  /** The keys the line needs; with one off the entry is hidden in public, unless `pub` gives the public line. */
  keys?: ClaimKey[];
  pub?: L;
  /** Where the entry is explained today, if a public page exists. */
  slug?: string;
  /** Where the entry is shown otherwise: a chapter or section of the home page. */
  anchor?: string;
}

export interface PlatformTask {
  key: "answer" | "manage" | "team" | "attract";
  title: L;
  /** One word for the menu (owner 2026-10-16: the menu must not explain, the platform page does). */
  short: L;
  /** The section of the platform page that explains the task. */
  href: string;
  line: L;
  entries: PlatformEntry[];
}

export const platformTasks: PlatformTask[] = [
  {
    key: "answer",
    title: { es: "Atender consultas", en: "Answer enquiries" },
    short: { es: "Atender", en: "Answer" },
    href: "/platform#answer",
    line: { es: "Las consultas por ⟦canales⟧ se responden en español. Una consulta en otro idioma no recibe respuesta automática.", en: "Enquiries on ⟦canales⟧ are answered in Spanish. An enquiry in another language gets no automatic reply." },
    entries: [
      { key: "whatsapp", name: { es: "WhatsApp", en: "WhatsApp" }, line: { es: "Respuesta por WhatsApp, con el número de tu agencia.", en: "Replies on WhatsApp, on your agency's own number." }, keys: ["replyWhatsapp", "whatsappOwnNumber"], slug: "ai-sales-agent", anchor: "#functions" },
      { key: "email", name: { es: "Email", en: "Email" }, line: { es: "La misma respuesta para lo que llega al buzón de tu agencia.", en: "The same reply for what arrives in your agency's mailbox." }, keys: ["replyEmail"], slug: "ai-sales-agent", anchor: "#functions" },
      { key: "webform", name: { es: "Formularios web", en: "Web forms" }, line: { es: "Lo que entra por tu web se trata como una consulta más.", en: "What comes in through your website is treated as an enquiry." }, keys: ["webform"], anchor: "#demo" },
      { key: "phone", name: { es: "Asistente telefónico", en: "Phone assistant" }, line: { es: "Una llamada que no se pierde: lo que pide, anotado, y una tarea.", en: "A call that is not lost: what they want, noted, and a task." }, keys: ["phoneAssistant"], anchor: "#demo" },
      { key: "handover", name: { es: "Paso a una persona", en: "Handover to a person" }, line: { es: "Cuando alguien pide hablar con una persona, queda registrada como petición de llamada para tu equipo. La petición queda registrada, aparece en la lista de tareas y avisa en cada traspaso.", en: "When someone asks to speak to a person, it is recorded as a callback request for your team. The request is recorded, appears in the task list and alerts at each handover." }, keys: ["crm", "taskList", "alert"], pub: { es: "Cuando alguien pide hablar con una persona, queda registrada como petición de llamada para tu equipo. La petición queda registrada.", en: "When someone asks to speak to a person, it is recorded as a callback request for your team. The request is recorded." }, slug: "ai-sales-agent", anchor: "#functions" },
    ],
  },
  {
    key: "manage",
    title: { es: "Gestionar oportunidades", en: "Manage opportunities" },
    short: { es: "Gestionar", en: "Manage" },
    href: "/platform#manage",
    line: { es: "Lo que pide cada cliente, en un solo sitio y con lo que toca hacer.", en: "What each customer asks for, in one place, with what to do next." },
    entries: [
      { key: "crm", name: { es: "CRM y ficha del cliente", en: "CRM and customer record" }, line: { es: "Una ficha por consulta, con lo que pidió y lo que pasó después.", en: "One record per enquiry, with what was asked for and what happened next." }, keys: ["crm"], slug: "crm", anchor: "#functions" },
      { key: "labels", name: { es: "Etiquetas de email", en: "Email labels" }, line: { es: "Los correos llevan su etiqueta: visita, valoración, alquiler.", en: "E-mails carry their label: viewing, valuation, rental." }, keys: ["labels"], slug: "lead-intelligence", anchor: "#functions" },
      { key: "hot", name: { es: "Avisos de consultas importantes", en: "Alerts for important enquiries" }, line: { es: "Un email a la persona adecuada de tu equipo cuando entra una consulta importante.", en: "An e-mail to the right person on your team when an important enquiry comes in." }, keys: ["alert"], anchor: "#functions" },
      { key: "matching", name: { es: "Propuestas de inmuebles", en: "Property suggestions" }, line: { es: "Inmuebles de tu cartera que encajan con lo que busca el cliente.", en: "Listings from your portfolio that fit what the customer wants." }, keys: ["matching"], anchor: "#functions" },
      { key: "followups", name: { es: "Seguimientos", en: "Follow-ups" }, line: { es: "Un mensaje útil cuando entra algo que encaja, solo con permiso del cliente.", en: "A useful message when something fitting comes in, only with the customer's permission." }, keys: ["followup"], anchor: "#functions" },
    ],
  },
  {
    key: "team",
    title: { es: "Coordinar tu equipo", en: "Coordinate your team" },
    short: { es: "Coordinar", en: "Coordinate" },
    href: "/platform#team",
    line: { es: "Quién hace qué hoy, y qué ya está hecho.", en: "Who does what today, and what is already done." },
    entries: [
      { key: "daily", name: { es: "El asistente de la mañana", en: "The morning assistant" }, line: { es: "Cada mañana te explica qué va primero, por qué, y el siguiente paso.", en: "Every morning it explains what comes first, why, and the next step." }, keys: ["dailyVoice"], slug: "daily-assistant", anchor: "#functions" },
      { key: "tasks", name: { es: "Tareas", en: "Tasks" }, line: { es: "Una tarea con dueño por cada visita o llamada pendiente.", en: "One task with an owner for each viewing or callback." }, keys: ["taskList"], slug: "daily-assistant", anchor: "#functions" },
      // the calendar row: not shown in either view (§14; KALENDER undecided)
      { key: "reports", name: { es: "Informes", en: "Reports" }, line: { es: "El informe completo en tu acceso de agencia y un resumen semanal por email. Lo que llega al cliente no se mide.", en: "The full report in your agency login and a weekly e-mail summary. What reaches the customer is not measured." }, keys: ["reportInLogin", "weeklyEmail"], pub: { es: "El informe completo en tu acceso de agencia. Lo que llega al cliente no se mide.", en: "The full report in your agency login. What reaches the customer is not measured." }, anchor: "#report" },
    ],
  },
  {
    key: "attract",
    title: { es: "Captar y presentar", en: "Attract and present" },
    short: { es: "Captar", en: "Attract" },
    href: "/platform#attract",
    line: { es: "Más contactos desde lo que ya publicas, y una forma mejor de enseñar un inmueble.", en: "More contacts from what you already publish, and a better way to show a property." },
    entries: [
      { key: "posts", name: { es: "Publicaciones en Instagram", en: "Instagram posts" }, line: { es: "Un texto preparado para cada inmueble; tú lo apruebas antes de que salga.", en: "A prepared text for each listing; you approve it before it goes out." }, keys: ["instagram"], slug: "social-growth", anchor: "#functions" },
      { key: "comments", name: { es: "Comentarios y mensajes", en: "Comments and messages" }, line: { es: "Respuestas que tú permitiste, y cada contacto en su ficha.", en: "Replies you allowed, and every contact in a record." }, keys: ["instagram"], slug: "social-growth", anchor: "#functions" },
      { key: "ads", name: { es: "Leads de anuncios", en: "Leads from ads" }, line: { es: "Recoge los leads de los anuncios que ya tienes. Las campañas siguen siendo tuyas.", en: "It takes in the leads from the ads you already run. The campaigns stay yours." }, keys: ["adsLeads"], slug: "lead-acquisition", anchor: "#functions" },
      { key: "model3d", name: { es: "Visualización 3D", en: "3D visualisation" }, line: { es: "Un modelo 3D de tu inmueble, hecho por nosotros a partir de tu plano.", en: "A 3D model of your property, built by us from your plan." }, keys: ["model3d"], slug: "property-experience", anchor: "#model-3d" },
    ],
  },
];

/** The tasks of a view: every entry resolved to its line (the public line where Copy gives one, else hidden when a key is off); tasks with no entry left are hidden. */
export function platformTasksFor(locale: Locale, view: ClaimView): { key: PlatformTask["key"]; title: string; short: string; href: string; line: string; entries: { key: string; name: string; line: string; href: string }[] }[] {
  return platformTasks
    .map((t) => ({
      key: t.key,
      title: t.title[locale],
      short: t.short[locale],
      href: t.href,
      line: withChannels(t.line[locale], locale, view),
      entries: t.entries
        .map((e) => {
          const on = !e.keys || live(e.keys, view);
          const line = on ? e.line : e.pub ?? null;
          return line ? { key: e.key, name: e.name[locale], line: withChannels(line[locale], locale, view), href: entryHref(e) } : null;
        })
        .filter((e): e is { key: string; name: string; line: string; href: string } => e !== null),
    }))
    .filter((t) => t.entries.length > 0);
}

/** The entry's destination: its page where one exists publicly, otherwise the place on the home page that shows it. */
export function entryHref(e: PlatformEntry): string {
  if (e.slug && publishedCapability(e.slug)) return `/platform/${e.slug}`;
  if (e.anchor?.startsWith("/")) return e.anchor;
  return e.anchor ? `/${e.anchor}` : "/platform";
}
