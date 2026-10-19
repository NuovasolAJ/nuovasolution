import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { isLocale, localePath, siteUrl, type Locale } from "@/lib/i18n/config";
import { requireSession } from "@/lib/contracts/app-page";
import { appWords } from "@/lib/content/app-words";
import { briefTasks, briefWords } from "@/lib/content/morning-brief-demo";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";
import { MailShell } from "@/components/app/mail-shell";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: briefWords.h1[params.locale], robots: { index: false, follow: false } };
}

/**
 * The morning brief, previewed inside the login with demonstration data (R19 closing order §11): the design of the
 * shell's TASK block, Spanish first. Daily's renderer sends the real brief from its read model; this page sends nothing.
 */
export default function BriefPreviewPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  requireSession(locale, "/app/brief");
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = briefWords;
  const p = (path: string) => localePath(locale, path);
  const host = headers().get("host");
  const origin = host ? `${host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https"}://${host}` : siteUrl;
  const listHref = `${origin}${p("/app")}`;

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="br-h1" className="!pb-8">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{l(w.eyebrow)}</Eyebrow>
            <Display size="l" as="h1" id="br-h1">{l(w.h1)}</Display>
            <Lead className="mt-4">{l(w.lead)}</Lead>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 t-body-s">
            <Link href={p("/app/reports/email")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(appWords.email.eyebrow)}</Link>
            <Link href={p("/app")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(appWords.report.back)}</Link>
          </p>
        </div>
      </Section>
      <div className="band band-sand band-shoulders">
        <div className="container-default pb-24 pt-8 md:pt-10">
          <div className="mx-auto max-w-[640px]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-pill bg-[color:var(--accent-wash)] px-3 py-1 t-caption font-medium text-[color:var(--accent-ink)]" data-brief-demo>{l(w.demo)}</p>
            <div className="stage overflow-hidden" data-brief-email data-email-subject-text={l(w.subject)}>
              <MailShell
                logoUrl={`${origin}/images/logo-icon.png`}
                logoAlt={w.logoAlt}
                eyebrow={`${l(w.eyebrow)} · Demo Agency`}
                subject={l(w.subject)}
                greeting={l(w.greeting)}
                summary={<p style={{ margin: 0 }}>{l(w.summary)}</p>}
                tasks={briefTasks(locale, listHref)}
                nextAction={<p style={{ margin: 0 }}>{l(w.nextAction)}</p>}
                button={{ href: listHref, label: l(w.button), under: l(w.underButton) }}
                footer={l(w.footer)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
