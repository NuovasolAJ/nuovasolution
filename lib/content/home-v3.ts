import { publishedCapability } from "@/lib/content/capabilities";

/**
 * Home v3 (owner direction 2026-10-03, audit order R10b): what the page is made of, apart from the words
 * (those are in the dictionaries under home.v3).
 *
 * WORKING_TEXT: true while the wording under home.v3 is the implementer's working text. The page then marks
 * itself (data-working-text on the page root and a small note in the preview), and the full preview is not
 * reported. It becomes false with Copy's COPY_DELTAS_1003.
 */
export const HOME_V3_WORKING_TEXT = true;

/** A function's honest state: what can be ordered today and what cannot (package matrix of 2026-10-03). */
export type FeatureState = "available" | "partial" | "preparing" | "request";

export type ModuleKey = "reply" | "daily" | "voice" | "social" | "model3d";

/** The five demonstrations, in page order, each with its state and the module page it may link to. */
export const homeModules: { key: ModuleKey; state: FeatureState; slug: string }[] = [
  { key: "reply", state: "available", slug: "ai-sales-agent" },
  { key: "daily", state: "partial", slug: "daily-assistant" },
  { key: "voice", state: "preparing", slug: "voice" },
  { key: "social", state: "preparing", slug: "social-growth" },
  { key: "model3d", state: "request", slug: "property-experience" },
];

/** The module page is linked only where the route exists publicly (hidden capabilities answer 404). */
export function moduleHref(slug: string): string | null {
  return publishedCapability(slug) ? `/platform/${slug}` : null;
}

/**
 * The FAQ on the home page: rows of PRODUCT_FAQ_KB_v1 (lib/content/faq.ts), nothing new. Interim selection by
 * the implementer until Copy names its six to eight: what it does, nights and weekends, the notice, no
 * commitment, the trial, after the trial, the price.
 */
export const HOME_FAQ_KB = ["Q-01", "Q-03", "Q-05", "Q-07", "Q-11", "Q-12", "Q-13"];
