import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilities } from "@/lib/content/capabilities";
import { Logo } from "@/components/ui/logo";

/**
 * Identical on every page: the one dark surface of the light system, the foundation band.
 * Only pages that exist appear. No newsletter, no social icons, no badges.
 */
export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  const cols: { heading: string; items: { href: string; label: string; note?: string }[] }[] = [
    {
      heading: d.footer.platform,
      items: [{ href: p("/platform"), label: d.nav.overview }, ...capabilities.map((c) => ({ href: p(`/platform/${c.slug}`), label: c.name[locale] }))],
    },
    {
      heading: d.footer.getStarted,
      items: [
        { href: p("/signup"), label: d.common.startFree },
        { href: p("/trial"), label: d.nav.trial },
        { href: p("/packages"), label: d.nav.packages },
        { href: p("/login"), label: d.nav.login },
      ],
    },
    {
      heading: d.footer.company,
      items: [
        { href: p("/contact"), label: d.nav.contact },
        { href: "mailto:antonio@nuovasolution.com", label: "antonio@nuovasolution.com" },
      ],
    },
  ];

  // The legal routes always exist and carry a PLACEHOLDER label. Linking them from the
  // public footer is a separate owner decision, recorded by NEXT_PUBLIC_LEGAL_LINKS=approved.
  const legalLinksApproved = process.env.NEXT_PUBLIC_LEGAL_LINKS === "approved";
  if (legalLinksApproved) {
    cols.push({
      heading: d.footer.legal,
      items: [
        { href: p("/legal/privacy"), label: d.footer.privacy },
        { href: p("/legal/terms"), label: d.footer.terms },
        { href: p("/legal/data-deletion"), label: d.footer.dataDeletion },
        { href: p("/legal/notice"), label: d.footer.notice },
      ],
    });
  }

  return (
    <footer data-canvas="deep" className="mt-8 rounded-t-[28px]">
      <div className="container-default section-default">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] xl:gap-8">
          <div>
            <Logo />
            <p className="mt-6 t-body-s text-text-secondary max-w-[36ch]">{d.footer.brandLine}</p>
          </div>
          {cols.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="t-eyebrow text-text-muted mb-4">{col.heading}</p>
              <ul>
                {col.items.map((it) => (
                  <li key={it.href + it.label}>
                    <Link href={it.href} className="inline-flex min-h-[44px] items-center t-body-s text-text-secondary hover:text-text-primary transition-colors duration-micro">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="t-caption text-text-muted">{d.footer.copyright}</p>
          <p className="t-caption text-text-muted">{d.footer.placeholderNote}</p>
        </div>
      </div>
    </footer>
  );
}
