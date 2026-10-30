import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { startLabel } from "@/lib/content/plans";
import { storyWords } from "@/lib/content/home-story";
import { exampleReport } from "@/lib/content/example-report";
import { publicIndexingAllowed } from "@/lib/contracts/mode";
import { ButtonLink } from "@/components/ui/button";

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
 * The public example report (the owner's binding closing order of 27.10. §7): "Ver el informe completo" in the public
 * demonstration never leads a prospect to a login. This page shows one complete example week, free to see on every build:
 * a few figures, one chart with traceable example values, the open cases, the next steps, labelled as an example, then the
 * way to the free trial. The real reports of an agency stay behind the login (/app/reports) and read the backend; this page
 * reads nothing and carries the home page's example week (lib/content/example-report.ts).
 */
export default function ExampleReportPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const w = exampleReport[locale];
  const p = (path: string) => localePath(locale, path);
  const max = Math.max(...w.weeks.map((x) => x.received));
  const W = 560, H = 200, pad = 28, gap = 18;
  const bw = (W - pad * 2 - gap * (w.weeks.length - 1)) / w.weeks.length;
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);

  return (
    <main className="container-default pb-[var(--section-feature)] pt-[var(--section-compact)]" data-example-report>
      <div className="max-w-[760px]">
        <p className="inline-flex items-center gap-2 rounded-pill bg-[color:var(--accent-wash)] px-3 py-1 t-caption font-medium text-[color:var(--accent-ink)]" data-example-label>{w.label}</p>
        <h1 className="mt-4 t-display-l text-text-primary">{w.title}</h1>
        <p className="mt-4 t-body-l text-text-secondary">{w.lead}</p>
      </div>

      {/* the figures of the week */}
      <dl className="mt-10 grid gap-4 md:grid-cols-3" data-example-figures>
        {w.figures.map((f) => (
          <div key={f.title} className="rounded-lg border border-line-contour bg-surface-raised p-5">
            <dt className="t-caption font-medium text-text-secondary">{f.title}</dt>
            <dd className="mt-1 tnum text-[2.25rem] font-semibold leading-none tracking-[-0.02em] text-ink-950">{f.value}</dd>
            <dd className="mt-2 t-caption text-text-secondary">{f.line}</dd>
          </div>
        ))}
      </dl>

      {/* the chart: enquiries received and answered per week, four example weeks */}
      <figure className="mt-6 rounded-lg border border-line-contour bg-surface-raised p-5 md:p-6" data-example-chart>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="t-heading-s text-text-primary">{w.chart.title}</span>
          <span className="t-caption text-text-muted">{w.chart.note}</span>
        </figcaption>
        <svg viewBox={`0 0 ${W} ${H + 24}`} role="img" aria-label={w.chart.alt} className="mt-4 h-auto w-full max-w-[640px]">
          {[0, 0.5, 1].map((t) => <line key={t} x1={pad} x2={W - pad} y1={y(max * t)} y2={y(max * t)} stroke="#ebe8e1" strokeWidth="1" />)}
          {w.weeks.map((wk, i) => {
            const x = pad + i * (bw + gap);
            return (
              <g key={wk.label}>
                <rect x={x} y={y(wk.received)} width={bw} height={H - pad - y(wk.received)} fill="#dedad2" rx="3" />
                <rect x={x + bw * 0.18} y={y(wk.answered)} width={bw * 0.64} height={H - pad - y(wk.answered)} fill="#3a634b" rx="3" />
                <text x={x + bw / 2} y={y(wk.received) - 6} textAnchor="middle" fontSize="11" fill="#5d5952" className="tnum">{wk.received} · {wk.answered}</text>
                <text x={x + bw / 2} y={H + 12} textAnchor="middle" fontSize="12" fill="#635f58">{wk.label}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 t-caption text-text-secondary">
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[#dedad2]" />{w.chart.received}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[#3a634b]" />{w.chart.answered}</span>
        </p>
      </figure>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* what is still open */}
        <section className="rounded-lg border border-line-contour bg-surface-raised p-5 md:p-6" data-example-open>
          <h2 className="t-heading-s text-text-primary">{w.openTitle}</h2>
          <ul className="mt-3 space-y-2">
            {w.open.map((o) => (
              <li key={o.who} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" /><span><span className="font-medium">{o.who}</span> · {o.what}</span></li>
            ))}
          </ul>
        </section>
        {/* the next steps */}
        <section className="rounded-lg border border-line-contour bg-surface-raised p-5 md:p-6" data-example-next>
          <h2 className="t-heading-s text-text-primary">{w.nextTitle}</h2>
          <ol className="mt-3 space-y-2">
            {w.next.map((n, i) => (
              <li key={n} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="tnum mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-[0.6875rem] font-semibold text-ivory">{i + 1}</span>{n}</li>
            ))}
          </ol>
        </section>
      </div>

      <p className="mt-6 t-caption text-text-muted">{w.basis}</p>

      {/* the way on: the free trial; the real report lives in the agency login */}
      <div className="mt-10 flex flex-col gap-4 rounded-lg border border-line-contour bg-surface-sunken p-6 md:flex-row md:items-center md:justify-between" data-example-cta>
        <div>
          <p className="t-heading-s text-text-primary">{w.ctaTitle}</p>
          <p className="mt-1 t-body-s text-text-secondary">{w.ctaLine}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
          <Link href={p("/login")} className="inline-flex min-h-[44px] items-center gap-1.5 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4" data-example-login>{w.realReport}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
      <p className="mt-3 inline-flex items-center gap-2 t-caption text-text-muted"><Check size={13} aria-hidden="true" />{storyWords.common.example[locale]}</p>
    </main>
  );
}
