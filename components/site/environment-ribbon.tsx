import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { integrationMode, publicIndexingAllowed } from "@/lib/contracts/mode";
import { StatusGlyph } from "@/components/ui/status";

/**
 * Environment marking, per PRODUCT_TEXTS_C3_v1 §5 and the review preview rule (audit R24):
 * - scope "site" (root layout), in the document flow directly under the header, so it can never
 *   cover a heading (owner finding, design probe 2026-09-23), plus a fixed marker bottom-left
 *   while scrolling (the Q&A launcher owns bottom-right):
 *     stub build     → "Preview": demonstration data, nothing you enter goes anywhere.
 *     staging build  → "Test environment": real test accounts, may be reset.
 *     released live  → nothing. A live build that is not released shows the preview band too.
 * - scope "form": nothing any more; the site band already says it on every page.
 * The mode is the build-time constant from next.config.js, so what this says is exactly what
 * the server does.
 */
export function EnvironmentRibbon({ locale, scope }: { locale: Locale; scope: "site" | "form" }) {
  if (scope !== "site") return null;
  const mode = integrationMode();
  if (mode === "live" && publicIndexingAllowed()) return null;
  const kind = mode === "staging" ? "staging" : "preview";
  const e = getDictionary(locale).common.env[kind];
  return (
    <>
      <div data-env={kind} className="border-b border-line-hairline bg-sand-100">
        <p className="container-default flex items-start gap-2 py-2 t-caption text-signal-attention">
          <StatusGlyph glyph="triangle" size={14} className="mt-[3px] shrink-0" />
          <span>
            <strong className="font-medium">{e.label}.</strong> <span className="text-text-secondary">{e.line}</span>
          </span>
        </p>
      </div>
      <div
        role="note"
        aria-label={`${e.label}. ${e.line}`}
        data-env-marker={kind}
        // Upright along the left edge, inside the page gutter, so it never lies over content (review 2026-10-01).
        className="pointer-events-none fixed bottom-6 left-1.5 z-[85] hidden md:inline-flex w-7 items-center justify-center gap-1.5 rounded-pill border border-signal-attention bg-surface-raised py-3 t-caption text-signal-attention shadow-card [writing-mode:vertical-rl] rotate-180"
      >
        <StatusGlyph glyph="triangle" size={12} className="shrink-0 rotate-90" />
        <span className="whitespace-nowrap">{e.label}</span>
      </div>
    </>
  );
}
