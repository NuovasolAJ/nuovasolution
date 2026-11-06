import { ArrowRight, Bell, Box, Check, ClipboardList, Database, Flag, Globe, Instagram, Languages, Mail, MessageCircle, Minus, Phone, Plug, Reply, TrendingUp, UserRound, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { claimWords, entryAction, planCell, planRowShown, plansTableShown, type ClaimView, type PlanCode } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The plans (Copy 1105 v3 §9 and §20 P-1 … P-8; the owner's orders of 03.11. point 7, 05.11. point 10 and 06.11. "no status word"):
 * three plans in the same row order, every row with a function icon and, per plan, a ✓ where the plan carries the function and a
 * dash where it leaves it out; no word in any cell (the word stays as an aria label). The target view shows every row of the
 * register; the public view only the rows whose function is included. Essential's action is the trial in the target state; Growth
 * and Enterprise ask for a proposal. Every plan carries its positioning line, naming only the parts that are on (P-6/P-7); no badge.
 * Growth's column stands lifted. Type from 14 px up. No price, no "Disponible". While `plans` is off in the view (P-5) there are no
 * plan names and no table: one block "Qué incluye" with the rows that are on as a list, the price line and the entry action. The
 * same component serves the home page and /packages.
 */
const ICONS: Record<string, LucideIcon> = {
  reply: Reply, whatsapp: MessageCircle, languages: Languages, phone: Phone, instagram: Instagram, crm: Database, person: UserRound, priority: Flag,
  alert: Bell, tasks: ClipboardList, matching: Globe, report: TrendingUp, mail: Mail, trend: TrendingUp, integrations: Plug, ads: Globe, model3d: Box,
};

function Cell({ status, locale, compact }: { status: "included" | "excluded" | "soon" | "order"; locale: Locale; compact?: boolean }) {
  const on = status === "included";
  return (
    <span className={cn("plan-cell", compact && "plan-cell-compact", on ? "is-on" : "is-off")} data-plan-cell={status} role="img" aria-label={claimWords[on ? "included" : "excluded"][locale]}>
      {on ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : <Minus size={14} strokeWidth={2} aria-hidden="true" />}
    </span>
  );
}

export function PlansTable({ locale, view, headed = true }: { locale: Locale; view: ClaimView; headed?: boolean }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.plans;
  const names = w.names;
  const codes = w.codes as unknown as PlanCode[];
  const who = w.lines(locale, view);
  const groups = l(w.groups);
  const contact = localePath(locale, "/contact");
  const entry = entryAction(locale, view);
  const hi = (code: PlanCode) => code === w.highlight.plan;
  const rows = w.rows.filter((r) => planRowShown(r.key, view));
  const groupRows = (gi: number) => rows.filter((r) => r.g === gi);
  const name = (r: (typeof w.rows)[number]) => w.rowName(r.name, locale, view);
  const table = plansTableShown(view);
  const action = (code: PlanCode) => (code === "essential" && entry.kind === "trial" ? { href: localePath(locale, entry.href), label: entry.label, main: true } : { href: contact, label: l(w.ctaProposal), main: hi(code) });

  if (!table) {
    // P-5: no plan names, no table — one block "Qué incluye"
    return (
      <section id="plans" aria-labelledby="plans-h" className="plans" data-plans data-plans-view={view} data-plans-table-shown="false">
        <div className="container-default">
          <Rise className="plans-head">
            {headed && <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>}
            <h2 id="plans-h" className="t-display-m mt-3 text-text-primary">{l(w.included.h2)}</h2>
          </Rise>
          <Rise className="plans-included" y={24} delay={0.08}>
            <ul className="plans-included-list" data-plans-included>
              {rows.map((r) => {
                const Icon = ICONS[r.icon] ?? Box;
                return <li key={r.key} className="plans-included-row" data-plan-row={r.key}><span className="plans-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.9} /></span><span>{name(r)}</span><Check size={16} strokeWidth={3} aria-hidden="true" className="plans-included-check" /></li>;
              })}
            </ul>
            <p className="plans-included-foot">
              <span className="t-body-m text-text-secondary">{l(w.price)}</span>
              <a href={localePath(locale, entry.href)} className="plans-cta plans-cta-main" data-plan-cta="included">{entry.label}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
            </p>
          </Rise>
        </div>
      </section>
    );
  }

  return (
    <section id="plans" aria-labelledby="plans-h" className="plans" data-plans data-plans-view={view} data-plans-table-shown="true">
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
                  <span className="plans-name">{n}</span>
                  <span className="plans-who">{who[i]}</span>
                </div>
              ))}
            </div>
            {groups.map((g, gi) => groupRows(gi).length === 0 ? null : (
              <div key={g} className="plans-group" role="rowgroup" data-plan-group={gi + 1}>
                <div className="plans-row plans-row-group" role="row"><div className="plans-cell plans-cell-group" role="rowheader">{g}</div><div className="plans-cell" /><div className="plans-cell" /><div className="plans-cell" /></div>
                {groupRows(gi).map((r) => {
                  const Icon = ICONS[r.icon] ?? Box;
                  return (
                    <div key={r.key} className="plans-row" role="row" data-plan-row={r.key}>
                      <div className="plans-cell plans-cell-name" role="rowheader"><span className="plans-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.9} /></span><span>{name(r)}</span></div>
                      {codes.map((code) => (
                        <div key={code} className={cn("plans-cell plans-cell-status", hi(code) && "is-highlight")} role="cell" data-plan-col={code}><Cell status={planCell(r.key, code, view)} locale={locale} /></div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="plans-row plans-row-foot" role="row">
              <div className="plans-cell plans-cell-name" role="cell"><p className="t-body-s text-text-muted">{l(w.inherits)} {l(w.price)}</p></div>
              {codes.map((code) => {
                const a = action(code);
                return (
                  <div key={code} className={cn("plans-cell plans-cell-cta", hi(code) && "is-highlight")} role="cell">
                    <a href={a.href} className={cn("plans-cta", a.main && "plans-cta-main")} data-plan-cta={code}>{a.label}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
                  </div>
                );
              })}
            </div>
          </div>

          <ol className="plans-cards" data-plans-cards>
            {names.map((n, pi) => {
              const a = action(codes[pi]);
              return (
                <li key={n} className={cn("plans-card", hi(codes[pi]) && "is-highlight")} data-plan-card={codes[pi]}>
                  <p className="plans-name">{n}</p>
                  <p className="plans-who">{who[pi]}</p>
                  {groups.map((g, gi) => groupRows(gi).length === 0 ? null : (
                    <div key={g} className="plans-card-group">
                      <p className="plans-cell-group">{g}</p>
                      <ul>
                        {groupRows(gi).map((r) => {
                          const Icon = ICONS[r.icon] ?? Box;
                          const s = planCell(r.key, codes[pi], view);
                          return (
                            <li key={r.key} className="plans-card-row" data-state={s}>
                              <span className="plans-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.9} /></span>
                              <span className="plans-card-row-name">{name(r)}</span>
                              <Cell status={s} locale={locale} compact />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                  <a href={a.href} className={cn("plans-cta", a.main && "plans-cta-main")}>{a.label}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
                </li>
              );
            })}
          </ol>
          <p className="plans-legend t-body-s text-text-muted"><span className="plan-cell is-on" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>{l(w.legend)}</p>
        </Rise>
      </div>
    </section>
  );
}
