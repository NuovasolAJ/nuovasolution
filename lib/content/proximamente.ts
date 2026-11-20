import type { Locale } from "@/lib/i18n/config";
import type { ClaimKey } from "@/lib/claims";

/**
 * "Próximamente" — the sentence form PX-s per function (Copy COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md §1.1–1.2 and
 * COPY_TO_REDESIGN_1120_PROXIMAMENTE_v1.md §4, 176e050). The owner, 20.11. 09:05 (1): the public page shows as available only what is
 * proven in production; everything else shows "Próximamente" — a line that names a switched-off function takes its PX-s instead of
 * being left out (the one exception: `otherLanguages`, hidden in both views). PX-b (the badge) is `claimWords.soon` in lib/claims.ts.
 */
type L = Record<Locale, string>;
const T = (es: string, en: string): L => ({ es, en });

export const pxSentence: Partial<Record<ClaimKey, L>> = {
  phoneAssistant: T("Llamadas: próximamente.", "Calls: coming soon."),
  instagram: T("Instagram: próximamente.", "Instagram: coming soon."),
  adsLeads: T("Contactos de portales y anuncios: próximamente.", "Contacts from portals and ads: coming soon."),
  matching: T("Inmuebles que encajan con cada cliente: próximamente.", "Listings that fit each client: coming soon."),
  followup: T("Seguimiento automático: próximamente.", "Automatic follow-up: coming soon."),
  whatsappOwnNumber: T("WhatsApp con el número de tu agencia: próximamente.", "WhatsApp on your agency's own number: coming soon."),
  alert: T("Aviso por email a la persona adecuada: próximamente.", "Email alert to the right person: coming soon."),
  taskList: T("Lista de tareas: próximamente.", "Task list: coming soon."),
  dailyVoice: T("Resumen de la mañana: próximamente.", "Morning summary: coming soon."),
  model3d: T("Visualización 3D: próximamente.", "3D visualisation: coming soon."),
  weeklyEmail: T("El resumen de la semana por email: próximamente.", "The weekly summary by e-mail: coming soon."),
  reportTrend: T("La tendencia y los canales del informe: próximamente.", "The report's trend and channels: coming soon."),
  webform: T("Formulario web: próximamente.", "Web form: coming soon."),
  oneRecordAcrossChannels: T("Una sola ficha por cliente en todos los canales: próximamente.", "One record per client across every channel: coming soon."),
  integrations: T("Conexión con tu CRM: próximamente.", "Connection to your CRM: coming soon."),
  outlook: T("Outlook: próximamente.", "Outlook: coming soon."),
  mailboxConnection: T("Conexión con el buzón de tu agencia: próximamente.", "Connection to your agency's mailbox: coming soon."), // Copy 1120 §4.3: until the owner's (a)/(b)
};

/** The PX-s of the first switched-off key among `keys` (`off` says which are off); null when every key is live or none has a line. */
export function pxFor(keys: ClaimKey[], off: (k: ClaimKey) => boolean, locale: Locale): string | null {
  const k = keys.find((x) => off(x) && pxSentence[x]);
  return k ? (pxSentence[k] as L)[locale] : null;
}
