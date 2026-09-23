import type { Locale } from "@/lib/i18n/config";

/**
 * Capability statuses. Wording per docs/website_redesign/PRODUCT_TEXTS_C3_v1.md §1.2
 * (redesign copy, 2026-09-23), which supersedes the register's long internal formulas on
 * chips. The website renders these as content. It never upgrades a status on its own.
 *
 * `short` is the chip (navigation, cards, index rows). `sentence` is the detail line that sits
 * next to the capability on its page. `label` equals the chip: no internal audit or gate
 * sentence appears in a label any more.
 */
export type CapabilityStatus =
  | "live"
  | "final_acceptance"
  | "in_implementation"
  | "certified_gate_pending"
  | "premium_on_request"
  | "not_available";

export interface StatusPresentation {
  /** Chip text. */
  label: string;
  /** Same as label; kept as its own field so callers can ask for the chip form explicitly. */
  short: string;
  /** One honest sentence, used wherever the chip alone would over-promise. */
  sentence: string;
  /** Whether the public site may describe the capability in the present tense as usable. */
  publiclyAvailable: boolean;
  glyph: "check" | "clock" | "rule" | "diamond" | "lock" | "triangle";
  tone: "positive" | "attention" | "neutral";
}

const EN: Record<CapabilityStatus, StatusPresentation> = {
  live: {
    label: "In use today",
    short: "In use today",
    sentence: "Running on real WhatsApp and email traffic in our own agency environment.", // WCR-003
    publiclyAvailable: true,
    glyph: "check",
    tone: "positive",
  },
  final_acceptance: {
    label: "In final testing",
    short: "In final testing",
    sentence: "Built. We are finishing the last test before we offer it.",
    publiclyAvailable: false,
    glyph: "clock",
    tone: "attention",
  },
  in_implementation: {
    label: "In development",
    short: "In development",
    sentence: "Being built. Not available yet.",
    publiclyAvailable: false,
    glyph: "rule",
    tone: "neutral",
  },
  certified_gate_pending: {
    label: "Not offered yet",
    short: "Not offered yet",
    sentence: "Built and tested on our side. We are waiting on an approval from outside.",
    publiclyAvailable: false,
    glyph: "triangle",
    tone: "attention",
  },
  premium_on_request: {
    label: "On request",
    short: "On request",
    sentence: "A service we prepare for you. The first deliveries are in preparation.", // WCR-004
    publiclyAvailable: true,
    glyph: "diamond",
    tone: "neutral",
  },
  not_available: {
    label: "Not offered",
    short: "Not offered",
    sentence: "Not offered.",
    publiclyAvailable: false,
    glyph: "lock",
    tone: "neutral",
  },
};

const ES: Record<CapabilityStatus, StatusPresentation> = {
  live: {
    label: "En uso hoy",
    short: "En uso hoy",
    sentence: "Funcionando con tráfico real de WhatsApp y email en nuestro propio entorno de agencia.", // WCR-003
    publiclyAvailable: true,
    glyph: "check",
    tone: "positive",
  },
  final_acceptance: {
    label: "En prueba final",
    short: "En prueba final",
    sentence: "Construido. Estamos terminando la última prueba antes de ofrecerlo.",
    publiclyAvailable: false,
    glyph: "clock",
    tone: "attention",
  },
  in_implementation: {
    label: "En desarrollo",
    short: "En desarrollo",
    sentence: "En construcción. Todavía no está disponible.",
    publiclyAvailable: false,
    glyph: "rule",
    tone: "neutral",
  },
  certified_gate_pending: {
    label: "Todavía no se ofrece",
    short: "Todavía no se ofrece",
    sentence: "Construido y probado por nuestra parte. Esperamos una aprobación externa.",
    publiclyAvailable: false,
    glyph: "triangle",
    tone: "attention",
  },
  premium_on_request: {
    label: "Bajo petición",
    short: "Bajo petición",
    sentence: "Un servicio que preparamos para ti. Las primeras entregas están en preparación.", // WCR-004
    publiclyAvailable: true,
    glyph: "diamond",
    tone: "neutral",
  },
  not_available: {
    label: "No se ofrece",
    short: "No se ofrece",
    sentence: "No se ofrece.",
    publiclyAvailable: false,
    glyph: "lock",
    tone: "neutral",
  },
};

export function statusPresentation(status: CapabilityStatus, locale: Locale): StatusPresentation {
  return (locale === "es" ? ES : EN)[status];
}
