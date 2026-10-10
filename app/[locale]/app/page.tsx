import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getOnboardingBundle } from "@/lib/contracts/server";
import { loginHref, requireSession } from "@/lib/contracts/app-page";
import { BackendRefusal } from "@/lib/contracts/supabase";
import { integrationMode } from "@/lib/contracts/mode";
import { appWords } from "@/lib/content/app-words";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { LabelChip, StatusGlyph } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: appWords.home.h1[params.locale], robots: { index: false, follow: false } };
}

/**
 * The agency home after login (master order 2026-10-10 §8, §10; INTEGRATION_CONTRACT §B: /{locale}/app as the
 * provisional destination). Server-rendered from what the verified session can read: the trial, the links to
 * the setup, the weekly report and the social screens. The operative view of the day waits for the daily
 * assistant's data contract and says so; it shows no zeros.
 */
export default async function AppHomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  requireSession(locale, "/app");
  const d = getDictionary(locale);
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.home;
  const p = (path: string) => localePath(locale, path);

  let trialLine: string | null = null;
  let agencyName: string | null = null;
  try {
    const bundle = await getOnboardingBundle();
    if (bundle.kind === "register") redirect(p("/onboarding"));
    agencyName = bundle.profile.business.name ?? bundle.profile.branding.display_name ?? null;
    if (bundle.trial?.status === "active") trialLine = bundle.trial.remaining_days === null ? l(w.trialNoDays) : l(w.trial).replace("{days}", String(bundle.trial.remaining_days));
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(loginHref(locale, "/app", { state: "expired" }));
  }
  const stub = integrationMode() === "stub";

  const cards = [
    { key: "reports", href: p("/app/reports"), ...w.cards.reports },
    { key: "setup", href: p("/onboarding"), ...w.cards.setup },
    { key: "social", href: p("/social"), ...w.cards.social },
  ];

  return (
    <>
      <EnvironmentRibbon locale={locale} scope="form" />
      <Section rhythm="opening" labelledBy="app-h1" className="!pb-8">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{agencyName ? `${l(w.eyebrow)} · ${agencyName}` : l(w.eyebrow)}</Eyebrow>
            <Display size="l" as="h1" id="app-h1">{l(w.h1)}</Display>
            <Lead className="mt-4">{l(w.lead)}</Lead>
            {trialLine && <p className="mt-4 inline-flex items-center gap-2 rounded-pill bg-sage-100 px-3 py-1.5 t-caption font-medium text-text-primary" data-app-trial>{trialLine}</p>}
          </div>
        </div>
      </Section>
      <div className="band band-sand band-shoulders">
        <div className="container-default pb-24 pt-8 md:pt-10">
          <ul className="grid gap-4 md:grid-cols-3" data-app-cards>
            {cards.map((c) => (
              <li key={c.key}>
                <Link href={c.href} className="stage group flex h-full flex-col p-6 transition-shadow duration-control hover:shadow-overlay" data-app-card={c.key}>
                  <span className="t-heading-s text-text-primary">{l(c.title)}</span>
                  <span className="mt-2 t-body-s text-text-secondary">{l(c.line)}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 t-body-s font-medium text-text-primary">{l(c.cta)}<ArrowRight size={14} aria-hidden="true" className="transition-transform duration-micro group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <section aria-labelledby="app-today" className="stage mt-8 p-6" data-app-today={stub ? "stub" : "awaiting"}>
            <h2 id="app-today" className="t-heading-s text-text-primary">{l(w.todayTitle)}</h2>
            <p className="mt-2 flex items-start gap-2 t-body-s text-text-secondary">
              <StatusGlyph glyph="rule" className="mt-1 shrink-0 text-text-muted" />
              <span>{stub ? l(w.todayStub) : l(w.todayAwaiting)}</span>
            </p>
            {stub && <p className="mt-3"><LabelChip tone="attention">{d.common.stubData}</LabelChip></p>}
          </section>
        </div>
      </div>
    </>
  );
}
