/**
 * UI-safe onboarding shapes assembled by the BFF from WEBSITE_HANDOFF_v2
 * (tenant-api onboarding.read / readiness / trial.status, branding-assets preview).
 * No client_id and no raw row reaches the browser. One exception is by backend design: a stored
 * logo's public URL carries the tenant prefix in its storage path (bucket agency-branding).
 */

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof DAYS)[number];

export interface OnboardingProfile {
  business: {
    name: string | null;
    timezone: string | null;
    languages: string[];
    default_language: string;
    /** Runtime format read by _within_business_hours: "09:00-18:00" or "closed". Empty = never bookable. */
    business_hours: Partial<Record<Day, string>>;
  };
  legal: {
    /**
     * False when the backend offers no read of the saved legal fields (v2: tenant-api has no legal
     * read; asked of API as WEB-API-1). The form then starts empty and says so; completeness comes
     * from the readiness gate white_label_legal instead.
     */
    readable: boolean;
    legal_name: string | null;
    tax_id: string | null;
    address: { line: string | null; city: string | null; postal_code: string | null; region: string | null; country: string };
    privacy_url: string | null;
    imprint_url: string | null;
    terms_url: string | null;
  };
  branding: {
    /** branding-assets preview `text_fallback`: brand, then legal name, then agency name. */
    display_name: string | null;
    logo: string | null;
    logo_present: boolean;
    /** Optional variant for dark backgrounds (v2 §3 `logo_dark`). */
    logo_dark: string | null;
    /** v2 §3 contrast flag: the logo is placed on a light panel in dark mode. */
    needs_light_background: boolean;
  };
  calendar: {
    connected: boolean;
    appointment_types: { type: string; minutes: number }[];
    no_calendar_fallback: { capture_preferred_time: boolean; create_callback: boolean; inform_customer: boolean };
  };
  /** Which required legal fields are still missing; null when that cannot be read (see legal.readable). */
  legal_missing: string[] | null;
}

export interface ReadinessGate {
  gate_key: string;
  status: "READY" | "BLOCKED" | "OPTIONAL" | "DISABLED" | "UNSUPPORTED_GATE" | string;
  mandatory: boolean;
  classification: string;
}

export interface Readiness {
  gates: ReadinessGate[];
  activatable: boolean;
}

export interface TrialView {
  status: string;
  remaining_days: number | null;
  expires_at: string | null;
}

export const emptyProfile = (): OnboardingProfile => ({
  business: { name: null, timezone: null, languages: ["es"], default_language: "es", business_hours: {} },
  legal: { readable: true, legal_name: null, tax_id: null, address: { line: null, city: null, postal_code: null, region: null, country: "ES" }, privacy_url: null, imprint_url: null, terms_url: null },
  branding: { display_name: null, logo: null, logo_present: false, logo_dark: null, needs_light_background: false },
  calendar: { connected: false, appointment_types: [{ type: "viewing", minutes: 30 }], no_calendar_fallback: { capture_preferred_time: true, create_callback: true, inform_customer: true } },
  legal_missing: ["legal_name", "tax_id", "address", "privacy_url", "terms_url", "logo"],
});
