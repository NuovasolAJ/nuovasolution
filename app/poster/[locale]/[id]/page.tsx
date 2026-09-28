import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publicIndexingAllowed } from "@/lib/contracts/mode";
import { BoardView, ConversationView, ReadinessView, RecordView } from "@/components/site/product-views";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Poster frames for the prepared media places (audit Z14): the real product views composed at
 * the film's aspect ratio, rendered by scripts/design/poster-capture.mjs into
 * /public/media/<slug>/… Route /poster/<locale>/<id>, outside the site layout (no header, band or
 * launcher in the frame). Not linked anywhere; answers 404 on the released production site.
 * ?size=4x5 composes the phone frame.
 */
export const dynamic = "force-dynamic";
export default function PosterPage({ params, searchParams }: { params: { locale: string; id: string }; searchParams?: { size?: string } }) {
  if (publicIndexingAllowed() || !isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const tall = searchParams?.size === "4x5";
  const size = tall ? { width: 1080, height: 1350 } : { width: 1600, height: 900 };

  let scene: React.ReactNode;
  switch (params.id) {
    case "V-01":
      scene = (
        <div className={tall ? "flex flex-col gap-10" : "grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center gap-12"}>
          <ConversationView locale={locale} className="max-w-[520px]" />
          <div className={tall ? "" : "space-y-6"}>
            <RecordView locale={locale} className="max-w-[520px]" />
            {!tall && <BoardView locale={locale} compact className="max-w-[520px]" />}
          </div>
        </div>
      );
      break;
    case "V-05":
      scene = (
        <div className={tall ? "flex flex-col gap-10" : "grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center gap-12"}>
          <div>
            <p className="t-eyebrow text-text-muted">{d.home.access.eyebrow}</p>
            <h1 className="mt-4 t-display-m text-text-primary">{d.home.access.h2}</h1>
            <ol className="mt-8 hairline-list border-y border-line-hairline">
              {d.home.access.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                  <span className="t-caption tnum text-text-muted pt-1">0{i + 1}</span>
                  <span>
                    <span className="block t-heading-s text-text-primary">{s.title}</span>
                    <span className="block mt-1 t-body-s text-text-secondary">{s.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <ReadinessView locale={locale} className="max-w-[560px]" />
        </div>
      );
      break;
    default:
      notFound();
  }

  return (
    <div data-poster={params.id} className={tall ? "field-sky p-12" : "field-sky p-16"} style={{ ...size, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div className="w-full">{scene}</div>
    </div>
  );
}
