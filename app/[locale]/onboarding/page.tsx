import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { crmSelectionFromState, getCrmCatalog, getOnboardingState, getTrialState, hasSession, stubCrmSelection } from "@/lib/contracts/server";
import { BackendRefusal } from "@/lib/contracts/supabase";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { StatusGlyph } from "@/components/ui/status";
import { OnboardingWizard } from "@/components/site/onboarding-wizard";
import type { CrmCatalogEntry, CrmSelection, OnboardingState, TrialState } from "@/lib/contracts/types";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.onboarding.h1, robots: { index: false, follow: false } };
}

/** Authenticated surface. Rendered only from the readiness contract. */
export default async function OnboardingPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  if (!hasSession()) redirect(localePath(locale, "/login"));
  const d = getDictionary(locale);
  const caseParam = searchParams.case ? Number(searchParams.case) : undefined;

  let state: OnboardingState | null = null;
  let stub = false;
  let problem: string | null = null;
  try {
    const r = await getOnboardingState(Number.isFinite(caseParam) ? caseParam : undefined);
    state = r.data;
    stub = r.stub;
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(localePath(locale, "/login"));
    problem = code;
  }

  let trial: TrialState | null = null;
  let crm: { catalog: CrmCatalogEntry[]; selection: CrmSelection } | undefined;
  if (state) {
    trial = (await getTrialState())?.data ?? null;
    try {
      const catalog = (await getCrmCatalog()).data;
      crm = { catalog, selection: stub ? stubCrmSelection() : crmSelectionFromState(state) };
    } catch {
      crm = undefined; // the CRM step still renders its status; the choice appears when the catalog can be read
    }
  }

  return (
    <Section rhythm="opening" labelledBy="ob-h1">
        <EnvironmentRibbon locale={locale} scope="form" />
      <div className="container-default">
        <div className="xl:max-w-[62%]">
          <Eyebrow className="mb-4">{d.onboarding.eyebrow}</Eyebrow>
          <Display size="l" as="h1" id="ob-h1">{d.onboarding.h1}</Display>
          <Lead className="mt-4">{d.onboarding.lead}</Lead>
        </div>
        <div className="mt-12">
          {state ? (
            <OnboardingWizard locale={locale} state={state} trial={trial} stub={stub} crm={crm} />
          ) : (
            <p role="alert" data-onboarding-problem={problem ?? ""} className="flex items-start gap-2 border border-line-strong bg-surface-raised p-5 t-body-m text-text-secondary">
              <StatusGlyph glyph="triangle" className="mt-1 shrink-0 text-signal-attention" />
              {(d.common.errors as Record<string, string>)[problem ?? "generic"] ?? d.common.errors.generic}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
