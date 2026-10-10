import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getEntitlements, getOnboardingBundle } from "@/lib/contracts/server";
import { getWeeklyReport, type WeeklyReportResult } from "@/lib/contracts/reports";
import { loginHref, requireSession } from "@/lib/contracts/app-page";
import { BackendRefusal } from "@/lib/contracts/supabase";
import { appWords } from "@/lib/content/app-words";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { StatusGlyph } from "@/components/ui/status";
import { ButtonLink } from "@/components/ui/button";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";
import { WeeklyReportView } from "@/components/app/weekly-report";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: appWords.report.h1[params.locale], robots: { index: false, follow: false } };
}

/**
 * The weekly report in the agency login (master order 2026-10-10 §8). Guarded on the server, in this order:
 * session (else login, and back here afterwards) → membership (a login without an agency goes to the
 * registration step) → package (the entitlement `reporting.basic`; a denied flag shows the one sentence) →
 * the report itself, which the backend scopes to the tenant of the session. A hidden button is never the guard.
 */
export default async function ReportsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  requireSession(locale, "/app/reports");
  const d = getDictionary(locale);
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.report;
  const p = (path: string) => localePath(locale, path);

  let result: WeeklyReportResult | null = null;
  let problem: string | null = null;
  try {
    const bundle = await getOnboardingBundle();
    if (bundle.kind === "register") redirect(p("/onboarding"));
    const ent = await getEntitlements().catch(() => null);
    if (ent && ent.data.features["reporting.basic"] === "denied") result = { kind: "not_entitled" };
    else result = await getWeeklyReport();
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(loginHref(locale, "/app/reports", { state: "expired" }));
    problem = code;
  }

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="rep-h1" className="!pb-8">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{l(w.eyebrow)}</Eyebrow>
            <Display size="l" as="h1" id="rep-h1">{l(w.h1)}</Display>
            <Lead className="mt-4">{l(w.lead)}</Lead>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 t-body-s">
            <Link href={p("/app")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(w.back)}</Link>
            {result?.kind === "report" && <Link href={p("/app/reports/email")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-report-email-link>{l(w.emailPreview)}</Link>}
          </p>
        </div>
      </Section>
      <div className="band band-sand band-shoulders">
        <div className="container-default pb-24 pt-8 md:pt-10" data-reports-state={result?.kind ?? "problem"}>
          {result?.kind === "report" && <WeeklyReportView locale={locale} report={result.report} />}
          {result?.kind === "awaiting_contract" && (
            <p role="status" className="stage flex items-start gap-2 p-6 t-body-m text-text-secondary" data-report-awaiting>
              <StatusGlyph glyph="rule" className="mt-1 shrink-0 text-text-muted" />
              <span>{l(w.awaiting)}</span>
            </p>
          )}
          {result?.kind === "not_entitled" && (
            <div className="stage p-6" data-report-not-entitled>
              <p className="t-body-m text-text-primary">{l(w.notEntitled)}</p>
              <div className="mt-5"><ButtonLink href={p("/packages")} variant="secondary" size="sm">{d.nav.packages}</ButtonLink></div>
            </div>
          )}
          {problem && (
            <p role="alert" className="stage flex items-start gap-2 p-5 t-body-m text-text-secondary" data-report-problem={problem}>
              <StatusGlyph glyph="triangle" className="mt-1 shrink-0 text-signal-attention" />
              {(d.common.errors as Record<string, string>)[problem] ?? d.common.errors.generic}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
