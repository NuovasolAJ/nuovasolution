import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n/config";
import { capabilities } from "@/lib/content/capabilities";
import { legalSlugs } from "@/lib/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/platform", ...capabilities.map((c) => `/platform/${c.slug}`), "/packages", "/trial", "/contact", ...legalSlugs.map((s) => `/legal/${s}`)];
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
