import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { legalPage, type LegalSlug } from "@/lib/content/legal";
import { LabelChip } from "@/components/ui/status";

/**
 * Only the address itself is the link, and the address never includes the sentence's full stop
 * (external finding 14: the old pattern linked the whole paragraph to "…@nuovasolution.com.").
 */
const MAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/;
export function WithMail({ text }: { text: string }) {
  const m = text.match(MAIL);
  if (!m || m.index === undefined) return <>{text}</>;
  const address = m[0];
  return (
    <>
      {text.slice(0, m.index)}
      <a href={`mailto:${address}`} className="text-text-accent underline underline-offset-4">{address}</a>
      {text.slice(m.index + address.length)}
    </>
  );
}

/**
 * Legal page in the accepted direction (owner 2026-09-30): the title and the placeholder label on the
 * canvas, the text as one white stage on the stone ground, 720 px measure. The PLACEHOLDER label stays
 * until LEGAL_PAGES_FINAL carries no mark (no page with a mark is published).
 */
export function LegalPageView({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const d = getDictionary(locale);
  const page = legalPage(locale, slug);
  return (
    <>
      <section aria-labelledby="lg-h1" className="pb-[var(--section-compact)] pt-[var(--section-compact)] xl:pt-[var(--section-default)]">
        <div className="container-text">
          <h1 id="lg-h1" className="t-display-m text-text-primary">{page.title}</h1>
          <p className="mt-4 t-caption text-text-muted">
            {d.legal.updated}: <time dateTime={page.updated}>{page.updated}</time>
          </p>
          <div role="note" className="mt-8 flex items-start gap-3 rounded-xl border border-line-strong bg-surface-raised p-4">
            <LabelChip tone="attention">{d.common.placeholder}</LabelChip>
            <p className="t-body-s text-text-secondary">{d.legal.placeholderBanner}</p>
          </div>
        </div>
      </section>
      <div className="band band-stone band-shoulders">
        <div className="container-text pb-[var(--section-default)] pt-[var(--section-compact)]">
          <div className="stage p-6 md:p-10">
            {page.sections.map((s) => (
              <section key={s.heading} className="mt-10 border-t border-line-hairline pt-6 first:mt-0 first:border-t-0 first:pt-0">
                <h2 className="t-heading-m text-text-primary">{s.heading}</h2>
                <div className="mt-4 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="t-body-m text-text-secondary measure-text" style={{ lineHeight: 1.7 }}>
                      <WithMail text={p} />
                    </p>
                  ))}
                </div>
              </section>
            ))}
            {slug === "data-deletion" && (
              <p className="mt-10">
                <a href="mailto:antonio@nuovasolution.com?subject=Data%20deletion" className="inline-flex min-h-[48px] items-center rounded-pill bg-ink-950 px-6 t-body-m font-medium text-ivory hover:bg-ink-800">
                  {d.legal.dataDeletion.cta}
                </a>
              </p>
            )}
          </div>
          <p className="mt-8 t-caption text-text-muted">{d.legal.contactLine}</p>
        </div>
      </div>
    </>
  );
}
