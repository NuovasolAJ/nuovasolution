import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { live } from "@/lib/claims";
import { resolveSwitches } from "@/lib/view";
import { Motion } from "@/components/ui/motion";
import { PreviewSwitch } from "@/components/site/preview-switch";
import { Hero } from "@/components/home/hero";
import { FlowRibbon } from "@/components/home/flow-ribbon";
import { Chapters } from "@/components/home/chapters";
import { ReportStage } from "@/components/home/report-stage";
import { Stage3d } from "@/components/home/stage-3d";
import { PlansTable } from "@/components/home/plans-table";
import { TrustFaqClose } from "@/components/home/trust-faq";
import { MobileCta } from "@/components/site/mobile-cta";
import { home1103 } from "@/lib/content/home-1103";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: { absolute: d.meta.title }, description: d.meta.description, alternates: { canonical: `/${params.locale}`, languages: { en: "/en", es: "/es" } } };
}

/**
 * Home (the owner's order of 03.11.2026: one build for the whole page; the verdict of 06.11.: the design stays, colour and the
 * fifteen points change; Copy 1105 v3 §14–§23 for every sentence; research in docs/website_redesign/RESEARCH_1103.md):
 *
 *   1 Hero       the 3D lane's picture behind one sentence and the main action; the brand moment travels into the header's logo
 *   2 Demo       one conversation, the channels of the view on their own surfaces, the record filling field by field
 *   3 Flow       Consulta → NuovaSolution → Ficha → Tu equipo, four connected fields that fill on scroll
 *   4 Functions  the scenes in three chapters on a pinned stage, one connected rail as the progress
 *   5 Report     the week as the agency reads it, with the block "Sin / Con NuovaSolution"
 *   6 3D         one stage, the steps by scroll; only while 3D is live in the view
 *   7 Plans      three plans, the rows of the view, ✓ / — per cell; "Qué incluye" while the plans are off
 *   8 The way in, trust, FAQ, close
 *
 * The preview's switches (lib/view.ts) are resolved once here from the request's headers (set by middleware.ts from the search
 * parameters and the cookies): the claims view (target state or strictly what is included), the palette and the headline face; a
 * live build ignores them. The style foundation v3 (tokens in globals.css) applies to every document that contains
 * [data-style="v3"]; the palette and the face follow [data-palette] and [data-display] the same way.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const s = resolveSwitches();
  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined} data-home="1103" data-view={s.view} data-palette={s.palette} data-display={s.display}>
      {!s.live && <PreviewSwitch locale={locale} switches={s} />}
      <Motion>
        <Hero locale={locale} view={s.view} />
        <FlowRibbon locale={locale} view={s.view} />
        <Chapters locale={locale} view={s.view} />
        <ReportStage locale={locale} view={s.view} />
        {live("model3d", s.view) && <Stage3d locale={locale} />}
        <PlansTable locale={locale} view={s.view} />
        <TrustFaqClose locale={locale} view={s.view} />
      </Motion>
      {/* A3 (07.11.): the phone's fixed bar with the main action (the hero's label and target) */}
      <MobileCta href="#demo" label={home1103.hero.ctaDemo[locale]} />
    </div>
  );
}
