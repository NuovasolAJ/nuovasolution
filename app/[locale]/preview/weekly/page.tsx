import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { isLocale, localePath, siteUrl, type Locale } from "@/lib/i18n/config";
import { getWeeklyReport } from "@/lib/contracts/reports";
import { stubSurfacesAllowed } from "@/lib/contracts/mode";
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

/**
 * The weekly report's mail, previewed WITHOUT a login (R23 point 2: the owner's picture 14 showed only "Iniciar sesión").
 * Only on a stub build (the design preview): the report is the demonstration week of the home page, labelled so; on a
 * staging or live build this route does not exist. Not linked from the site; noindex.
 */
export default async function WeeklyPreviewPage({ params }: { params: { locale: string } }) {
  if (!stubSurfacesAllowed()) notFound();
  const locale = params.locale as Locale;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.email;
  const p = (path: string) => localePath(locale, path);
  const r = await getWeeklyReport();
  if (r.kind !== "report") notFound();
  const host = headers().get("host");
  const origin = host ? `${host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https"}://${host}` : siteUrl;
  const demo = locale === "es" ? "Vista previa sin login, con datos de demostración: la semana del ejemplo de la página de inicio. Nadie recibe este correo." : "Preview without a login, with demonstration data: the home page's example week. Nobody receives this mail.";

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="pw-h1" className="!pb-8">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{l(w.eyebrow)}</Eyebrow>
            <Display size="l" as="h1" id="pw-h1">{l(w.h1)}</Display>
            <Lead className="mt-4">{l(w.lead)}</Lead>
          </div>
          <p className="mt-6 t-body-s"><Link href={p("/preview/brief")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{locale === "es" ? "Ver también el resumen de la mañana" : "See the morning brief as well"}</Link></p>
        </div>
      </Section>
      <div className="band band-sand band-shoulders">
        <div className="container-default pb-24 pt-8 md:pt-10">
          <div className="mx-auto max-w-[640px]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-pill bg-[color:var(--accent-wash)] px-3 py-1 t-caption font-medium text-[color:var(--accent-ink)]" data-preview-demo>{demo}</p>
            <div className="stage overflow-hidden" data-preview-weekly>
              <WeeklyEmail locale={locale} report={r.report} reportUrl={`${origin}${p("/app/reports")}`} agencyName="Demo Agency" logoUrl={`${origin}/images/logo-icon.png`} personName="Elena" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
