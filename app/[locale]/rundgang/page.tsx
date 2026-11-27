import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HOME_V3_WORKING_TEXT } from "@/lib/content/home-v3";
import { ESSENTIAL_HREF, withChannels } from "@/lib/claims";
import { resolveSwitches } from "@/lib/view";
import { Motion } from "@/components/ui/motion";
import { PreviewSwitch } from "@/components/site/preview-switch";
import { Hero } from "@/components/home/hero";
import { FlowStory } from "@/components/home/flow-story";
import { Chapters } from "@/components/home/chapters";
import { AgencyTasks } from "@/components/home/agency-tasks";
import { ReportStage } from "@/components/home/report-stage";
import { Stage3d } from "@/components/home/stage-3d";
import { PlansTable } from "@/components/home/plans-table";
import { TrustFaqClose } from "@/components/home/trust-faq";
import { MobileCta } from "@/components/site/mobile-cta";
import { TourStage } from "@/components/home/tour-stage";
import { home1103 } from "@/lib/content/home-1103";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  // a local prototype route: never indexed, not in the sitemap, same title as the home
  return { title: { absolute: d.meta.title }, description: withChannels(d.meta.description, params.locale as Locale, resolveSwitches().view), robots: { index: false, follow: false } };
}

/**
 * The "Luxus-Rundgang" prototype (the owner's order of 27.11.2026; docs/website_redesign/RUNDGANG_1127_OWNER_ORDER_AND_PLAN_v1.md):
 * the SAME eight sections as the home — content, hero wording, languages, plans and actions from E2 unchanged — over one fixed stage
 * that carries the fictional villa (stills now, the film later). Its own route so the E2 home stays as it is while the owner looks at
 * both; once he takes it, the stage moves to the home.
 */
export default function RundgangPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const s = resolveSwitches();
  return (
    <div data-style="v3" data-working-text={HOME_V3_WORKING_TEXT ? "true" : undefined} data-home="1103" data-tour="1127" data-view={s.view} data-display={s.display}>
      {!s.live && <PreviewSwitch locale={locale} switches={s} />}
      <TourStage />
      <div className="tour-page">
        <Motion>
          <Hero locale={locale} view={s.view} stage />
          <FlowStory locale={locale} view={s.view} />
          <Chapters locale={locale} view={s.view} />
          <AgencyTasks locale={locale} view={s.view} />
          <ReportStage locale={locale} view={s.view} />
          <Stage3d locale={locale} />
          <PlansTable locale={locale} view={s.view} />
          <TrustFaqClose locale={locale} view={s.view} />
        </Motion>
      </div>
      <MobileCta href={localePath(locale, ESSENTIAL_HREF)} label={home1103.hero.ctaDemo[locale]} />
    </div>
  );
}
