import type { Locale } from "@/lib/i18n/config";
import { storyWords } from "@/lib/content/home-story";
import { cn } from "@/lib/utils";

/** The three answers every chapter gives (R19 closing order §6): what came in, what Nuova did, the result. */
export function ThreeAnswers({ locale, inbound, did, result, className }: { locale: Locale; inbound: string; did: string; result: string; className?: string }) {
  const W = storyWords.common;
  return (
    <dl className={cn("grid gap-2 border-t border-line-hairline pt-4", className)} data-chapter-answers>
      {[[W.inbound[locale], inbound], [W.did[locale], did], [W.result[locale], result]].map(([k, v]) => (
        <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3">
          <dt className="t-caption font-medium uppercase tracking-[0.04em] text-text-muted">{k}</dt>
          <dd className="t-body-s text-text-primary">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
