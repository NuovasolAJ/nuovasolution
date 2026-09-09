import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { legalPage, type LegalSlug } from "@/lib/content/legal";
import { Section } from "@/components/ui/section";
import { LabelChip } from "@/components/ui/status";

/** Ivory canvas, 720 px measure, centred title (permitted case), PLACEHOLDER banner. */
export function LegalPageView({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const d = getDictionary(locale);
  const page = legalPage(locale, slug);
  return (
    <Section surface="ivory" rhythm="opening">
      <div className="container-text">
        <div className="text-center">
          <h1 className="t-display-m text-text-primary">{page.title}</h1>
          <p className="mt-4 t-caption text-text-muted">
            {d.legal.updated}: <time dateTime={page.updated}>{page.updated}</time>
          </p>
        </div>
        <div role="note" className="mt-10 flex items-start gap-3 border border-line-strong bg-surface-raised p-4">
          <LabelChip tone="attention">{d.common.placeholder}</LabelChip>
          <p className="t-body-s text-text-secondary">{d.legal.placeholderBanner}</p>
        </div>
        <div className="mt-12">
          {page.sections.map((s) => (
            <section key={s.heading} className="hairline-top pt-6 mt-12 first:mt-0">
              <h2 className="t-heading-m text-text-primary">{s.heading}</h2>
              <div className="mt-4 space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="t-body-m text-text-secondary measure-text" style={{ lineHeight: 1.7 }}>
                    {p.includes("@") ? (
                      <a href={`mailto:${p.match(/[^\s]+@[^\s.]+\.[^\s]+/)?.[0] ?? ""}`} className="text-text-accent underline underline-offset-4">
                        {p}
                      </a>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
        {slug === "data-deletion" && (
          <p className="mt-12">
            <a href="mailto:antonio@nuovasolution.com?subject=Data%20deletion" className="inline-flex h-12 items-center rounded-sm bg-champagne-400 px-6 t-body-m font-medium text-ink-950 hover:bg-champagne-300">
              {d.legal.dataDeletion.cta}
            </a>
          </p>
        )}
        <p className="mt-16 t-caption text-text-muted">{d.legal.contactLine}</p>
      </div>
    </Section>
  );
}
