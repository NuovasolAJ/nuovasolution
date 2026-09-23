/**
 * Plan catalog as it exists on the staging billing plane (system repo
 * build/billing_wave1/BILLING_WAVE1_STAGING.sql, table billing_plan, version 1, status
 * "sellable"): codes, included capabilities and limits. Transcribed 2026-09-23.
 *
 * What is NOT here, on purpose:
 * - amounts: the staging prices are seeded as SYNTHETIC ("not final prices"); there is no price
 *   authority, so the site shows none;
 * - the plan vocabulary decision (essential/growth/scale vs starter/professional/enterprise) is an
 *   open owner/Billing item (WEBSITE_HANDOFF_v2 §5); the codes below are the billing design's;
 * - "lead.hot_alert": the flag exists in the catalog, but CLAIMS_MATRIX D-10 forbids every hot lead
 *   wording on the website, so it is not rendered;
 * - online checkout: not built (Billing Model A; invoice by the provider, payment confirmed by a
 *   verified event). The page describes that honestly.
 */
export type PlanCode = "essential" | "growth" | "scale";

export interface PlanLimits {
  offices: number;
  seats: number;
  crm_connections: number;
  voice_minutes: number;
  /** null = no monthly cap in the catalog */
  leads_month: number | null;
}

export interface CatalogPlan {
  code: PlanCode;
  display_name: string;
  /** Entitlement flags that are true in the catalog, in display order. */
  features: string[];
  limits: PlanLimits;
}

export const CATALOG_SOURCE = "billing_plan v1, staging, read 2026-09-23";

export const catalogPlans: CatalogPlan[] = [
  {
    code: "essential",
    display_name: "Essential",
    features: ["cx.baseline", "channel.email", "channel.whatsapp", "lead.qualify", "crm.core", "followup.basic", "consent.handling", "reporting.basic"],
    limits: { offices: 1, seats: 3, crm_connections: 1, voice_minutes: 0, leads_month: 750 },
  },
  {
    code: "growth",
    display_name: "Growth",
    features: ["cx.baseline", "channel.email", "channel.whatsapp", "lead.qualify", "crm.core", "followup.basic", "consent.handling", "reporting.basic", "property.matching", "lead.engine.orchestrate", "reporting.advanced"],
    limits: { offices: 1, seats: 8, crm_connections: 3, voice_minutes: 0, leads_month: 3000 },
  },
  {
    code: "scale",
    display_name: "Scale",
    features: ["cx.baseline", "channel.email", "channel.whatsapp", "lead.qualify", "crm.core", "followup.basic", "consent.handling", "reporting.basic", "property.matching", "lead.engine.orchestrate", "reporting.advanced", "channel.voice", "feed.structured"],
    limits: { offices: 5, seats: 50, crm_connections: 10, voice_minutes: 1000, leads_month: null },
  },
];

/** Flags whose capability is not offered publicly today (status from lib/content/capabilities.ts). */
export const gatedFeatures: Record<string, "in_implementation" | "certified_gate_pending" | "final_acceptance"> = {
  "property.matching": "in_implementation",
  "channel.voice": "certified_gate_pending",
  "feed.structured": "in_implementation",
  "lead.engine.orchestrate": "certified_gate_pending",
  "reporting.advanced": "final_acceptance",
};
