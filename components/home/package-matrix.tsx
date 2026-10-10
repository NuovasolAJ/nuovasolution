import { Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { matrix, matrixWords, processingLimit } from "@/lib/content/package-matrix";
import { proofStatesShown } from "@/lib/content/edition";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The package comparison (owner follow-up order 2026-10-06 §6; master order 2026-10-10 §10, §11): three cards
 * side by side, each on top of the one before, 3D also on its own. The target version: every line of a package
 * carries a check; the proof state of a line is printed only on a preview with NEXT_PUBLIC_PROOF_STATES=1.
 * No prices, no quotas, no promised leads; the monthly figure is labelled as the processing limit it is.
 * Structure after Pricing by Meschac Irung (tailark, MIT): joined cards with hairlines, a short list per card, one button.
 */
export function PackageMatrix({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const w = matrixWords;
  const t = d.home.v3.packages;
  const proof = proofStatesShown();
  return (
    <div data-package-matrix data-proof-states={proof ? "shown" : "hidden"}>
      <div className="grid gap-px overflow-hidden rounded-[20px] border border-line-contour bg-[color:var(--border-hairline)] lg:grid-cols-3">
        {matrix.map((pk, i) => {
          const limit = processingLimit(pk.code);
          return (
            <section key={pk.code} aria-labelledby={`pkg-${pk.code}`} className={cn("flex flex-col bg-surface-raised p-6 md:p-8", i === 0 && "bg-[#fbfaf7]")} data-package={pk.code}>
              <h3 id={`pkg-${pk.code}`} className="t-heading-l text-text-primary">{pk.name}</h3>
              <p className="mt-1 t-body-m text-text-secondary">{pk.line[locale]}</p>
              {i === 0 && <p className="mt-3 inline-flex w-fit rounded-pill bg-ink-950 px-3 py-1 t-caption font-medium text-ivory">{w.trial[locale]}</p>}
              <p className="mt-6 t-caption font-medium text-text-muted">{pk.plus ? pk.plus[locale] : t.includes}</p>
              <ul className="mt-2 divide-y divide-line-hairline border-y border-line-hairline">
                {pk.lines.map((l) => (
                  <li key={l.key} className="flex items-start gap-3 py-3" data-line={l.key} data-state={l.state}>
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-signal-positive text-ivory"><Check size={12} strokeWidth={3} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block t-body-m text-text-primary">{l.name[locale]}{l.note && <span className="text-text-muted"> · {l.note[locale]}</span>}</span>
                      {proof && <span className="block t-caption text-text-muted" data-proof-state>{w.states[l.state][locale]}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              {pk.code === "growth" && <p className="mt-3 t-caption text-text-muted">{w.adsNote[locale]}</p>}
              {pk.code === "essential" && <p className="mt-3 t-caption text-text-muted">{proof ? w.crmNoteProof[locale] : w.crmNote[locale]}</p>}
              <p className="mt-4 t-caption text-text-muted">
                <span className="font-medium text-text-secondary">{w.limit[locale]}:</span> <span className="tnum">{limit === null ? w.noCap[locale] : limit.toLocaleString(locale === "es" ? "es-ES" : "en-GB")}</span> · {w.limitNote[locale]}
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href={localePath(locale, pk.href)} variant={i === 0 ? "primary" : "secondary"} full>{pk.cta[locale]}</ButtonLink>
              </div>
            </section>
          );
        })}
      </div>
      {/* 3D on its own: one narrow strip */}
      <div className="mt-4 flex flex-col gap-4 rounded-[20px] border border-line-contour bg-surface-raised px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8" data-package="model3d">
        <div>
          <p className="t-body-m font-medium text-text-primary">{w.strip.line[locale]}</p>
          <p className="mt-1 t-body-s text-text-secondary">{w.strip.detail[locale]}</p>
        </div>
        <ButtonLink href={localePath(locale, "/contact")} variant="secondary" className="shrink-0">{w.strip.cta[locale]}</ButtonLink>
      </div>
      <p className="mt-4 t-caption text-text-muted">{w.noPrice[locale]}</p>
    </div>
  );
}
