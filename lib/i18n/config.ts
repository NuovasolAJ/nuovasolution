export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "es";
}

/**
 * Site origin used for canonicals, hreflang and the sitemap. Explicit NEXT_PUBLIC_SITE_URL first;
 * on Vercel the deployment's own host (stable project URL, else the deployment URL), so a review
 * preview never points canonicals or the sitemap at the public domain (audit Z21); the public
 * domain only as the last fallback for a local build.
 */
function deploymentOrigin(): string | null {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return host ? `https://${host.replace(/^https?:\/\//, "").replace(/\/$/, "")}` : null;
}
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || deploymentOrigin() || "https://nuovasolution.com";

export function localePath(locale: Locale, path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
