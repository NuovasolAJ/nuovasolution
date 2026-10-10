import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isLocale, localePath, siteUrl, type Locale } from "@/lib/i18n/config";
import { getOnboardingBundle } from "@/lib/contracts/server";
import { getWeeklyReport } from "@/lib/contracts/reports";
import { loginHref, requireSession } from "@/lib/contracts/app-page";
import { BackendRefusal } from "@/lib/contracts/supabase";
import { appWords } from "@/lib/content/app-words";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";
import { WeeklyEmail } from "@/components/app/weekly-email";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: appWords.email.h1[params.locale], robots: { index: false, follow: false } };
}

/** The Monday email, previewed inside the login with the agency's own report (same guards as the report). */
export default async function ReportEmailPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  requireSession(locale, "/app/reports/email");
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.email;
  const p = (path: string) => localePath(locale, path);
  let agencyName: string | null = null;
  let report = null;
  try {
    const bundle = await getOnboardingBundle();
    if (bundle.kind === "register") redirect(p("/onboarding"));
    agencyName = bundle.profile.business.name ?? null;
    const r = await getWeeklyReport();
    if (r.kind !== "report") redirect(p("/app/reports"));
    report = r.report;
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(loginHref(locale, "/app/reports/email", { state: "expired" }));
    redirect(p("/app/reports"));
  }
  const host = headers().get("host");
  const origin = host ? `${host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https"}://${host}` : siteUrl;

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="em-h1" className="!pb-8">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{l(w.eyebrow)}</Eyebrow>
            <Display size="l" as="h1" id="em-h1">{l(w.h1)}</Display>
            <Lead className="mt-4">{l(w.lead)}</Lead>
          </div>
          <p className="mt-6 t-body-s"><Link href={p("/app/reports")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(appWords.report.eyebrow)}</Link></p>
        </div>
      </Section>
      <div className="band band-sand band-shoulders">
        <div className="container-default pb-24 pt-8 md:pt-10">
          <div className="stage mx-auto max-w-[640px] overflow-hidden">
            <WeeklyEmail locale={locale} report={report!} reportUrl={`${origin}${p("/app/reports")}`} agencyName={agencyName} />
          </div>
        </div>
      </div>
    </>
  );
}
