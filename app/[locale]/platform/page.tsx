import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SocialStrip, Story } from "@/components/home/story";
import { Model3dSection } from "@/components/home/model-3d";
import { ClosingMoment, HomeDemoLine } from "@/components/home/moments";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.nav.overview, description: d.platform.lead, alternates: { canonical: `/${params.locale}/platform`, languages: { en: "/en/platform", es: "/es/platform" } } };
}

/**
 * The platform page is the product story (CONTENT_MODEL_1016): the six interactive scenes of one enquiry, the social
 * path, the 3D model. One vocabulary with the menu and the home page; no module index, no state boxes (the product
 * truth is /hoy). The old "02 Registrada / 03 Hecha" demonstration with its duplicated list is gone.
 */
export default function PlatformPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);

  return (
    <div data-style="v3" data-page="platform">
      <section id="story" aria-labelledby="po-h1" className="scroll-mt-[var(--header-h)] pt-[var(--section-compact)]">
        <div className="container-default">
          <div className="max-w-[760px]">
            <p className="t-eyebrow text-text-accent">{d.platform.eyebrow}</p>
            <h1 id="po-h1" className="mt-4 t-display-l text-text-primary">{d.platform.h1}</h1>
            <p className="mt-5 t-body-l text-text-secondary">{d.platform.lead}</p>
          </div>
          <div className="mt-6 xl:mt-8">
            <Story locale={locale} />
            <SocialStrip locale={locale} />
          </div>
        </div>
      </section>
      <div className="mt-6"><HomeDemoLine locale={locale} /></div>
      <Model3dSection locale={locale} />
      <ClosingMoment locale={locale} />
    </div>
  );
}
