import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { integrationMode } from "@/lib/contracts/mode";
import { StatusGlyph } from "@/components/ui/status";

/**
 * Environment marking, per PRODUCT_TEXTS_C2_v1 §7 ("a label only where it helps
 * the person using the page"):
 * - scope "site" (root layout): sandbox builds only. A band directly under the header on
 *   every page, in the document flow (it can never cover a heading: owner finding, design
 *   probe 2026-09-23), plus a fixed marker bottom-left while scrolling (the Q&A launcher
 *   owns bottom-right). Testers must never mistake staging for the real product.
 * - scope "form" (signup, login, onboarding, packages): stub builds only, also in the flow.
 *   Without it a visitor could believe they signed up.
 * - live builds render nothing: no internal technical label reaches customers.
 * The mode is the build-time constant from next.config.js, so what this says is
 * exactly what the server does.
 */
export function EnvironmentRibbon({ locale, scope }: { locale: Locale; scope: "site" | "form" }) {
  const mode = integrationMode();
  if (mode === "live") return null;
  const show = (scope === "site" && mode === "staging") || (scope === "form" && mode === "stub");
  if (!show) return null;
  const e = getDictionary(locale).common.env[mode];
  return (
    <>
      <div data-env={mode} className="border-b border-line-hairline bg-sand-100">
        <p className="container-default flex items-start gap-2 py-2 t-caption text-signal-attention">
          <StatusGlyph glyph="triangle" size={14} className="mt-[3px] shrink-0" />
          <span>
            <strong className="font-medium">{e.label}.</strong> <span className="text-text-secondary">{e.line}</span>
          </span>
        </p>
      </div>
      {scope === "site" && (
        <div
          role="note"
          aria-label={`${e.label}. ${e.line}`}
          data-env-marker={mode}
          className="pointer-events-none fixed bottom-5 left-5 z-[85] inline-flex h-8 max-w-[45vw] items-center gap-1.5 rounded-pill border border-signal-attention bg-surface-raised px-3 t-caption text-signal-attention shadow-card"
        >
          <StatusGlyph glyph="triangle" size={12} className="shrink-0" />
          <span className="truncate">{e.label}</span>
        </div>
      )}
    </>
  );
}
