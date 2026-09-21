import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n/config";
import { capabilities } from "@/lib/content/capabilities";
import { legalSlugs } from "@/lib/content/legal";

/**
 * Legal routes are placeholders until counsel has reviewed them, and linking them
 * publicly is an owner decision (NEXT_PUBLIC_LEGAL_LINKS). The sitemap follows the
 * same gate, so unreviewed legal text is never advertised for indexing (review WR-21).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const legal = process.env.NEXT_PUBLIC_LEGAL_LINKS === "approved" ? legalSlugs.map((s) => `/legal/${s}`) : [];
  const paths = ["", "/platform", ...capabilities.map((c) => `/platform/${c.slug}`), "/packages", "/trial", "/contact", ...legal];
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
