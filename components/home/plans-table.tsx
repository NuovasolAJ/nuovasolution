import { ArrowRight, Bell, Box, Check, ClipboardList, Database, Globe, Instagram, Languages, Mail, MessageCircle, Phone, Plug, Reply, TrendingUp, UserRound, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103, statusWords, type Status } from "@/lib/content/home-1103";
import { planCell, type PlanCode } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The plans (Copy 1102 v2 §6.1; the owner's orders of 03.11. point 7 and 05.11. point 10): three plans in the same row order,
 * every row with a function icon and, per plan, one status word from lib/claims.ts: Incluido with a check, No incluido where
 * the plan leaves the function out, Próximamente quietly. Growth stands out with a true line ("the most complete for one
 * office": Enterprise adds several offices on top). Nothing is called recommended or popular. Type from 14 px up. No price,
 * no "Disponible". The same component serves the home page and /packages.
 */
const ICONS: Record<string, LucideIcon> = {
  reply: Reply, whatsapp: MessageCircle, languages: Languages, phone: Phone, instagram: Instagram, crm: Database, person: UserRound,
  alert: Bell, tasks: ClipboardList, matching: Globe, report: TrendingUp, mail: Mail, trend: TrendingUp, integrations: Plug, ads: Globe, model3d: Box,
};

function Cell({ status, locale, compact }: { status: Status; locale: Locale; compact?: boolean }) {
  return (
    <span className={cn("status-pill", compact && "status-pill-compact")} data-status={status} data-plan-cell={status}>
      {status === "included" && <Check size={13} strokeWidth={3} aria-hidden="true" />}
      {statusWords[status][locale]}
    </span>
  );
}

export function PlansTable({ locale, headed = true }: { locale: Locale; headed?: boolean }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.plans;
  const names = w.names;
  const codes = w.codes as unknown as PlanCode[];
  const who = l(w.who);
  const groups = l(w.groups);
  const contact = localePath(locale, "/contact");
  const hi = (code: PlanCode) => code === w.highlight.plan;

  return (
    <section id="plans" aria-labelledby="plans-h" className="plans" data-plans>
      <div className="container-default">
        {headed && (
          <Rise className="plans-head">
            <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
            <h2 id="plans-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
            <p className="mt-4 t-body-l text-text-secondary max-w-[52ch]">{l(w.lead)}</p>
          </Rise>
        )}

        <Rise className="plans-table-wrap" y={24} delay={0.08}>
          <div className="plans-table" role="table" aria-label={l(w.h2)} data-plans-table>
            <div className="plans-row plans-row-head" role="row">
              <div className="plans-cell plans-cell-name" role="columnheader" />
              {names.map((n, i) => (
                <div key={n} className={cn("plans-cell plans-cell-plan", hi(codes[i]) && "is-highlight")} role="columnheader" data-plan={codes[i]}>
                  {hi(codes[i]) && <span className="plans-reco" data-plan-highlight>{l(w.highlight)}</span>}
                  <span className="plans-name">{n}</span>
                  <span className="plans-who">{who[i]}</span>
                </div>
              ))}
            </div>
            {groups.map((g, gi) => (
              <div key={g} className="plans-group" role="rowgroup" data-plan-group={gi + 1}>
                <div className="plans-row plans-row-group" role="row"><div className="plans-cell plans-cell-group" role="rowheader">{g}</div><div className="plans-cell" /><div className="plans-cell" /><div className="plans-cell" /></div>
                {w.rows.filter((r) => r.g === gi).map((r) => {
                  const Icon = ICONS[r.icon] ?? Box;
                  return (
                    <div key={r.key} className="plans-row" role="row" data-plan-row={r.key}>
                      <div className="plans-cell plans-cell-name" role="rowheader"><span className="plans-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.9} /></span><span>{l(r.name)}</span></div>
                      {codes.map((code) => (
                        <div key={code} className={cn("plans-cell plans-cell-status", hi(code) && "is-highlight")} role="cell" data-plan-col={code}><Cell status={planCell(r.key, code)} locale={locale} /></div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="plans-row plans-row-foot" role="row">
              <div className="plans-cell plans-cell-name" role="cell"><p className="t-body-s text-text-muted">{l(w.inherits)} {l(w.price)}</p></div>
              {names.map((n, i) => (
                <div key={n} className={cn("plans-cell plans-cell-cta", hi(codes[i]) && "is-highlight")} role="cell">
                  <a href={contact} className={cn("plans-cta", hi(codes[i]) && "plans-cta-main")} data-plan-cta={codes[i]}>{l(w.cta)}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
                </div>
              ))}
            </div>
          </div>

          <ol className="plans-cards" data-plans-cards>
            {names.map((n, pi) => (
              <li key={n} className={cn("plans-card", hi(codes[pi]) && "is-highlight")} data-plan-card={codes[pi]}>
                {hi(codes[pi]) && <span className="plans-reco">{l(w.highlight)}</span>}
                <p className="plans-name">{n}</p>
                <p className="plans-who">{who[pi]}</p>
                {groups.map((g, gi) => (
                  <div key={g} className="plans-card-group">
                    <p className="plans-cell-group">{g}</p>
                    <ul>
                      {w.rows.filter((r) => r.g === gi).map((r) => {
                        const Icon = ICONS[r.icon] ?? Box;
                        const s = planCell(r.key, codes[pi]);
                        return (
                          <li key={r.key} className="plans-card-row" data-state={s}>
                            <span className="plans-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.9} /></span>
                            <span className="plans-card-row-name">{l(r.name)}</span>
                            <Cell status={s} locale={locale} compact />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                <a href={contact} className={cn("plans-cta", hi(codes[pi]) && "plans-cta-main")}>{l(w.cta)}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
              </li>
            ))}
          </ol>
          <p className="plans-legend t-body-s text-text-muted"><span className="status-pill status-pill-compact" data-status="included" aria-hidden="true"><Check size={12} strokeWidth={3} />{statusWords.included[locale]}</span>{l(w.legend)}</p>
        </Rise>
      </div>
    </section>
  );
}
