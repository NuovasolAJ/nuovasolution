import type { Locale } from "@/lib/i18n/config";

/**
 * Capability statuses. Wording corrected per docs/website_redesign/WEBSITE_CLAIM_REGISTER_v1.md
 * (state 2026-09-21_SYNC_1215Z), which supersedes the 2026-09-08 audit for status. The website
 * renders these as content. It never upgrades a status on its own.
 */
export type CapabilityStatus =
  | "live"
  | "final_acceptance"
  | "in_implementation"
  | "certified_gate_pending"
  | "premium_on_request"
  | "not_available";

export interface StatusPresentation {
  /** Short label shown on chips and index rows. */
  label: string;
  /** One honest sentence, used wherever the label alone would over-promise. */
  sentence: string;
  /** Whether the public site may describe the capability in the present tense as usable. */
  publiclyAvailable: boolean;
  glyph: "check" | "clock" | "rule" | "diamond" | "lock" | "triangle";
  tone: "positive" | "attention" | "neutral";
}

const EN: Record<CapabilityStatus, StatusPresentation> = {
  live: {
    label: "In use today",
    sentence: "In use today on real WhatsApp and email traffic, in our own agency environment.", // WCR-003
    publiclyAvailable: true,
    glyph: "check",
    tone: "positive",
  },
  final_acceptance: {
    label: "Built, final acceptance pending",
    sentence: "Built. The final owner test is still pending, so it is not offered yet.",
    publiclyAvailable: false,
    glyph: "clock",
    tone: "attention",
  },
  in_implementation: {
    label: "In development",
    sentence: "Being built. Not available yet.",
    publiclyAvailable: false,
    glyph: "rule",
    tone: "neutral",
  },
  certified_gate_pending: {
    label: "Certified internally, external approval pending",
    sentence: "Certified in our own testing. Waiting on an external approval before it is offered.",
    publiclyAvailable: false,
    glyph: "triangle",
    tone: "attention",
  },
  premium_on_request: {
    label: "Premium, on request",
    sentence: "A premium service we prepare for you on request. The first deliveries are in preparation.", // WCR-004
    publiclyAvailable: true,
    glyph: "diamond",
    tone: "neutral",
  },
  not_available: {
    label: "Not available",
    sentence: "Not offered.",
    publiclyAvailable: false,
    glyph: "lock",
    tone: "neutral",
  },
};

const ES: Record<CapabilityStatus, StatusPresentation> = {
  live: {
    label: "En uso hoy",
    sentence: "En uso hoy con tráfico real de WhatsApp y email, en nuestro propio entorno de agencia.", // WCR-003
    publiclyAvailable: true,
    glyph: "check",
    tone: "positive",
  },
  final_acceptance: {
    label: "Construido, aceptación final pendiente",
    sentence: "Construido. La prueba final del propietario sigue pendiente, así que todavía no se ofrece.",
    publiclyAvailable: false,
    glyph: "clock",
    tone: "attention",
  },
  in_implementation: {
    label: "En desarrollo",
    sentence: "En construcción. Todavía no está disponible.",
    publiclyAvailable: false,
    glyph: "rule",
    tone: "neutral",
  },
  certified_gate_pending: {
    label: "Certificado internamente, aprobación externa pendiente",
    sentence: "Certificado en nuestras propias pruebas. A la espera de una aprobación externa antes de ofrecerlo.",
    publiclyAvailable: false,
    glyph: "triangle",
    tone: "attention",
  },
  premium_on_request: {
    label: "Premium, bajo petición",
    sentence: "Un servicio premium que preparamos para ti bajo petición. Las primeras entregas están en preparación.", // WCR-004
    publiclyAvailable: true,
    glyph: "diamond",
    tone: "neutral",
  },
  not_available: {
    label: "No disponible",
    sentence: "No se ofrece.",
    publiclyAvailable: false,
    glyph: "lock",
    tone: "neutral",
  },
};

export function statusPresentation(status: CapabilityStatus, locale: Locale): StatusPresentation {
  return (locale === "es" ? ES : EN)[status];
}
