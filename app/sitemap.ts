import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n/config";
import { publishedCapabilities } from "@/lib/content/capabilities";
import { legalSlugs } from "@/lib/content/legal";
import { publicIndexingAllowed } from "@/lib/contracts/mode";

/**
 * The sitemap exists only on a released production deployment (audit Z21); a preview returns an
 * empty list and its robots.txt disallows everything anyway. Legal routes are placeholders until
 * counsel has reviewed them, and linking them publicly is an owner decision
 * (NEXT_PUBLIC_LEGAL_LINKS), so unreviewed legal text is never advertised (review WR-21).
 * Only capabilities that are published (register: live or on_request) appear.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicIndexingAllowed()) return [];
  const legal = process.env.NEXT_PUBLIC_LEGAL_LINKS === "approved" ? legalSlugs.map((s) => `/legal/${s}`) : [];
  const paths = ["", "/platform", ...publishedCapabilities().map((c) => `/platform/${c.slug}`), "/packages", "/trial", "/contact", ...legal];
  const now = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path.startsWith("/legal") ? 0.3 : 0.7,
      alternates: { languages: { en: `${siteUrl}/en${path}`, es: `${siteUrl}/es${path}` } },
    })),
  );
}
