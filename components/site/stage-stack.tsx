import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapability } from "@/lib/content/capabilities";
import { cn } from "@/lib/utils";
import { StatusGlyph } from "@/components/ui/status";
import { AssistantView, BoardView, ConversationView } from "./product-views";

/**
 * What Nuova does, as three stacked cards along one continuous example (PRODUCT_TEXTS_C3_v1
 * §2 H3 to H5): the enquiry answered, the lead recorded and prioritised, the task for the team.
 * Each card: the step, a short title, one or two sentences, the capabilities behind it as plain
 * links, and a real product view with synthetic data. No status chip and no gate sentence
 * (audit R27, Z12). On a desktop viewport with enough height the cards stick and slide over each
 * other (position: sticky only); elsewhere they simply follow one another (Z17).
 */
const cards = [
  { key: "answer", field: "field-sage", slugs: ["ai-sales-agent"] },
  { key: "organise", field: "field-sand", slugs: ["lead-intelligence", "crm"] },
  { key: "team", field: "field-sky", slugs: ["daily-assistant"] },
] as const;

function View({ k, locale }: { k: (typeof cards)[number]["key"]; locale: Locale }) {
  switch (k) {
    case "answer":
      return <ConversationView locale={locale} />;
    case "organise":
      return <BoardView locale={locale} />;
    default:
      return <AssistantView locale={locale} />;
  }
}

export function StageStack({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const f = d.home.flow;
  const texts = f.cards as Record<string, { step: string; title: string; line: string; qualifier?: string }>;

  return (
    <ol className="space-y-6" data-stage-stack>
      {cards.map((c, i) => {
        const t = texts[c.key];
        const caps = c.slugs.map(publishedCapability).filter((x): x is NonNullable<typeof x> => Boolean(x));
        return (
          <li key={c.key} className="stack-card" style={{ ["--stack-offset" as string]: `${i * 12}px` }}>
            <article className="card overflow-hidden rounded-xl" aria-labelledby={`stack-${c.key}`}>
              <div className="grid xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="p-6 md:p-8 xl:p-10">
                  <p className="t-eyebrow text-text-muted">
                    <span className="tnum">0{i + 1}</span> · {t.step}
                  </p>
                  <h3 id={`stack-${c.key}`} className="mt-3 t-heading-l text-text-primary">{t.title}</h3>
                  <p className="mt-3 t-body-m text-text-secondary measure-body">{t.line}</p>
                  {t.qualifier && <p className="mt-2 t-caption text-text-muted">{t.qualifier}</p>}
                  {c.key === "answer" && <p className="mt-3 t-caption text-text-muted measure-body">{f.stepsDetail}</p>}
                  {caps.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {caps.map((cap) => (
                        <li key={cap.slug}>
                          <Link href={localePath(locale, `/platform/${cap.slug}`)} className="inline-flex min-h-[32px] items-center gap-1.5 t-body-s font-medium text-text-primary underline-offset-4 hover:underline">
                            {cap.name[locale]}
                            <StatusGlyph glyph="arrow-right" size={12} className="text-text-muted" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={cn("flex items-center p-6 md:p-8 xl:p-10", c.field)}>
                  <View k={c.key} locale={locale} />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/** The same example as four compact cards in a row (platform overview), no sticky behaviour. */
export function FlowRow({ locale }: { locale: Locale }) {
  const f = getDictionary(locale).home.flow;
  const texts = f.cards as Record<string, { step: string; title: string }>;
  return (
    <ol className="grid gap-5 md:grid-cols-3" data-flow-row>
      {cards.map((c, i) => (
        <li key={c.key} className={cn("rounded-xl p-5 md:p-6", c.field)}>
          <p className="t-eyebrow text-text-muted"><span className="tnum">0{i + 1}</span> · {texts[c.key].step}</p>
          <p className="mt-2 t-heading-s text-text-primary">{texts[c.key].title}</p>
          <div className="mt-5">
            {c.key === "answer" ? <ConversationView locale={locale} /> : c.key === "organise" ? <BoardView locale={locale} compact /> : <AssistantView locale={locale} />}
          </div>
        </li>
      ))}
    </ol>
  );
}
