import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { Motion } from "@/components/ui/motion";
import { Hero } from "@/components/home/hero";
import { FlowRibbon } from "@/components/home/flow-ribbon";
import { Functions } from "@/components/home/functions";
import { ReportStage } from "@/components/home/report-stage";
import { Stage3d } from "@/components/home/stage-3d";
import { PlansTable } from "@/components/home/plans-table";
import { TrustFaqClose } from "@/components/home/trust-faq";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home (the owner's order of 03.11.2026: one build for the whole page; the report of 02.11. §4 for the order of the sections;
 * research in docs/website_redesign/RESEARCH_1103.md):
 *
 *   1 Hero       the film of the furnished living room behind one sentence and the main action; three benefits while it runs
 *   2 Demo       one conversation, four channels on their own surfaces, the record filling field by field
 *   3 Flow       Consulta → Nuova → Ficha → Tu equipo, drawn on scroll
 *   4 Functions  six core functions as product surfaces (priority with reason, reply at any hour, the record, matching,
 *                follow-up with permission, the team's day), the stage sticky beside the list
 *   5 Report     the week as the agency reads it: trend, channels, figures with definitions, what is open
 *   6 3D         one stage: plan → model → empty/furnished; the whole house on request
 *   7 Plans      three plans, the same rows, one status word per cell
 *   8 Trust, FAQ, close
 *
 * The style foundation v3 (tokens in globals.css) applies to every document that contains [data-style="v3"].
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined} data-home="1103">
      <Motion>
        <Hero locale={locale} />
        <FlowRibbon locale={locale} />
        <Functions locale={locale} />
        <ReportStage locale={locale} />
        <Stage3d locale={locale} />
        <PlansTable locale={locale} />
        <TrustFaqClose locale={locale} />
      </Motion>
    </div>
  );
}
