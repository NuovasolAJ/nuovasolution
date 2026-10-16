import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { startLabel } from "@/lib/content/plans";
import { cn } from "@/lib/utils";
import { Display } from "@/components/ui/type";
import { ButtonLink, CtaRow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * The closing of every sales page: one panel on its own ground (layer 1), the sentence and the two
 * calls to action in their fixed order: the primary one to the trial, the secondary one to a person.
 */
export function ClosingBand({
  locale,
  id,
  tone = "sand",
  secondary = "demo",
  caption,
}: {
  locale: Locale;
  id: string;
  tone?: "sand" | "stone" | "sage";
  secondary?: "demo" | "platform";
  caption?: string;
}) {
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  return (
    <section aria-labelledby={id} className="pb-[var(--section-default)] pt-[var(--section-compact)]">
      <div className="container-wide">
        <div className={cn("band band-panel px-6 py-14 text-center md:px-12 md:py-20", `band-${tone}`)}>
          <Reveal mode="opacity">
            <Display size="l" id={id} className="mx-auto max-w-[20ch]">{d.home.closing.h2}</Display>
            <CtaRow align="center" className="mt-10">
              <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
              {secondary === "demo" ? (
                <ButtonLink href={p("/contact")} size="lg" variant="secondary">{d.common.bookDemo}</ButtonLink>
              ) : (
                <ButtonLink href={p("/platform")} size="lg" variant="secondary">{d.common.explorePlatform}</ButtonLink>
              )}
            </CtaRow>
            {caption && <p className="mt-4 t-caption text-text-muted">{caption}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
