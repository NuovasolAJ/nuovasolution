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

/**
 * Flags the public page may list (audit R27): only those whose capability is published today.
 * Not listed: property.matching, channel.voice, feed.structured, lead.engine.orchestrate (hidden
 * capabilities), followup.basic (follow-up copy is legally held, C3 §7) and reporting.* (no status
 * in the canonical audit). They come back one by one as the register changes.
 */
export const PUBLIC_FEATURES: string[] = ["cx.baseline", "channel.email", "channel.whatsapp", "lead.qualify", "crm.core", "consent.handling"];

/**
 * R26: the trial equals Essential for 14 days. API reported TRIAL_PLAN_ALIGNED (staging 10/10,
 * reconciliation 2026-09-29 §B 4), and the staging catalog read on 2026-09-29 shows the trial plan
 * with Essential's scope and limits (seats 3, offices 1, 750 enquiries a month, trial_days 14).
 * So the Essential wording is the default. NEXT_PUBLIC_TRIAL_PLAN=unaligned on a deployment
 * switches back to the neutral wording, should the contract change.
 */
export function trialPlanAligned(): boolean {
  return process.env.NEXT_PUBLIC_TRIAL_PLAN !== "unaligned";
}

export function isPlanCode(v: string | undefined): v is PlanCode {
  return v === "essential" || v === "growth" || v === "scale";
}
