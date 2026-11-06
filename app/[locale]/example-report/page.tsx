import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { entryAction } from "@/lib/claims";
import { resolveSwitches } from "@/lib/view";
import { exampleReport } from "@/lib/content/example-report";
import { publicIndexingAllowed } from "@/lib/contracts/mode";
import { ButtonLink } from "@/components/ui/button";
import { ExampleReportCharts } from "@/components/report/example-report-charts";
import { Motion } from "@/components/ui/motion";
import { PreviewSwitch } from "@/components/site/preview-switch";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const w = exampleReport[params.locale];
  return {
    title: w.title,
    description: w.lead,
    alternates: { canonical: `/${params.locale}/example-report`, languages: { en: "/en/example-report", es: "/es/example-report" } },
    robots: publicIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
  };
}


/**
 * The public example report (the owner's closing order of 27.10. §7, the order of 05.11. F3 and the verdict of 06.11. point 15):
 * "Ver el informe completo" never leads a prospect to a login. One complete example week, free to see on every build: the switch
 * with and without NuovaSolution, the figures, the trend as lines, the channels as a donut, the funnel from enquiry to agreed
 * viewing, the hour of arrival, the table of open cases, the next steps; all labelled as an example
 * (components/report/example-report-charts.tsx). The way on follows the view (lib/claims.ts): the trial in the target state, access by
 * invitation on the public view. The real reports of an agency stay behind the login (/app/reports); this page reads nothing.
 */
export default function ExampleReportPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const s = resolveSwitches();
  const w = exampleReport[locale];
  const p = (path: string) => localePath(locale, path);
  const entry = entryAction(locale, s.view);

  return (
    <div data-style="v3" data-view={s.view} data-palette={s.palette} data-display={s.display}>
      {!s.live && <PreviewSwitch locale={locale} switches={s} />}
      <main className="container-default pb-[var(--section-feature)] pt-[var(--section-compact)]" data-example-report>
        <div className="max-w-[760px]">
          <p className="inline-flex items-center gap-2 rounded-pill bg-[color:var(--accent-wash)] px-3 py-1 t-caption font-medium text-[color:var(--accent-ink)]" data-example-label>{w.label}</p>
          <h1 className="mt-4 t-display-l text-text-primary">{w.title}</h1>
          <p className="mt-4 t-body-l text-text-secondary">{w.lead}</p>
        </div>

        <Motion><ExampleReportCharts locale={locale} view={s.view} /></Motion>

        {/* the next steps */}
        <section className="xr-panel mt-6" data-example-next>
          <h2 className="xr-panel-title">{w.nextTitle}</h2>
          <ol className="mt-3 space-y-2">
            {w.next.map((n, i) => (
              <li key={n} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="tnum mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-[0.8125rem] font-semibold text-ivory">{i + 1}</span>{n}</li>
            ))}
          </ol>
        </section>

        <p className="mt-6 t-caption text-text-muted">{w.basis}</p>

        {/* the way on: the entry action of the view; the real report lives in the agency login */}
        <div className="mt-10 flex flex-col gap-4 rounded-lg border border-line-contour bg-surface-sunken p-6 md:flex-row md:items-center md:justify-between" data-example-cta>
          <div>
            <p className="t-heading-s text-text-primary">{w.ctaTitle}</p>
            <p className="mt-1 t-body-s text-text-secondary">{entry.kind === "trial" ? w.ctaLine : w.ctaLinePublic}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={p(entry.href)} size="lg">{entry.label}</ButtonLink>
            <Link href={p("/login")} className="inline-flex min-h-[44px] items-center gap-1.5 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4" data-example-login>{w.realReport}<ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
        <p className="mt-3 inline-flex items-center gap-2 t-caption text-text-muted"><Check size={13} aria-hidden="true" />{w.example}</p>
      </main>
    </div>
  );
}
