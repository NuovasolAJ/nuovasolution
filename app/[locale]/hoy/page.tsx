import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { entriesByState, todayWords } from "@/lib/content/today";
import { ClosingMoment } from "@/components/home/moments";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: todayWords.h1[params.locale], description: todayWords.lead[params.locale], alternates: { canonical: `/${params.locale}/hoy`, languages: { en: "/en/hoy", es: "/es/hoy" } } };
}

/**
 * /hoy: the one place of product truth (DESIGN.md). Three lists from the platform map and Copy's lines on languages,
 * email and CRM. Nothing here is a sales text; everything on the sales pages points here.
 */
export default function TodayPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = todayWords;
  const groups = entriesByState();
  const order = ["available", "preparing", "request"] as const;

  return (
    <div data-style="v3" data-page="today">
      <section aria-labelledby="today-h1" className="moment pt-[var(--section-compact)]">
        <div className="container-default">
          <div className="max-w-[720px]">
            <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
            <h1 id="today-h1" className="mt-4 t-display-l text-text-primary">{l(w.h1)}</h1>
            <p className="mt-5 t-body-l text-text-secondary">{l(w.lead)}</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12" data-today-states>
            {order.map((state) => (
              <div key={state} data-today-state={state}>
                <h2 className="state-line t-heading-s" data-state={state}>{l(w.states[state])}</h2>
                <ul className="mt-4 divide-y divide-line-hairline border-y border-line-hairline">
                  {groups[state].map((e) => (
                    <li key={e.key} className="py-3">
                      <p className="t-body-m font-medium text-text-primary">{l(e.name)}</p>
                      <p className="mt-0.5 t-body-s text-text-secondary">{l(e.line)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {[w.languages, w.email].map((block) => (
              <div key={l(block.title)}>
                <h2 className="t-heading-m text-text-primary">{l(block.title)}</h2>
                <ul className="mt-4 divide-y divide-line-hairline border-y border-line-hairline">
                  {block.lines.map((line) => (
                    <li key={l(line)} className="py-3 t-body-m text-text-secondary">{l(line)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 t-caption text-text-muted">{l(w.demo)}</p>
        </div>
      </section>
      <ClosingMoment locale={locale} />
    </div>
  );
}
