import { ArrowRight, Bell, Box, Check, ClipboardList, Database, Flag, Globe, Instagram, Languages, Mail, MessageCircle, Minus, Phone, Plug, Reply, TrendingUp, UserRound, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { brief1120, DIFFERENCES_CONFIRMED_BY_API } from "@/lib/content/brief-1120";
import { claimWords, entryAction, live, planCell, planCellWords, planRowShown, plansTableShown, REPLY_CHANNELS, type ClaimView, type PlanCode } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { PlanCardFold } from "@/components/home/plan-card-fold";
import { cn } from "@/lib/utils";

/**
 * The plans. The owner's brief of 20.11.2026 (p. 5) with Copy's stage 1 (d8ebc77) and screen 2-A (11cf7a2): three tiers, each with its
 * audience, its 2–3 differences (API confirms them — until then Copy's draft, marked `data-plan-diffs="api-pending"`), ONE main
 * action — Essential the free 14-day trial (activated on request), Growth a demo, Enterprise a conversation — with the line under it
 * and, small, what happens after the click; "Ver todo lo que incluye" and "Solicitar contratación" (the owner's R-4 line, 23.11.: it opens
 * the contract request with the plan kept, only under Essential and Growth where that request is handled) are quiet text links, not buttons
 * (the owner's M6: three wide elements looked like three main actions). The desktop keeps the comparison matrix (a ✓ where the plan
 * includes the function, "—" where not, "Opcional" for the separately booked 3D service); its foot carries the same one action per
 * plan. Every card's main action carries `data-pilot-cta`, so the phone's fixed bar hides while a card's own button is on screen
 * (brief p. 4). The rows stay the register's (lib/claims.ts planRows); the internal gate view still marks a switched-off row.
 * What stays from before: the register rows with their icons, the fold on the phone, the legend, the price line, no "Recomendado".
 */
const ICONS: Record<string, LucideIcon> = {
  reply: Reply, whatsapp: MessageCircle, languages: Languages, phone: Phone, instagram: Instagram, crm: Database, person: UserRound, priority: Flag,
  alert: Bell, tasks: ClipboardList, matching: Globe, report: TrendingUp, mail: Mail, trend: TrendingUp, integrations: Plug, ads: Globe, model3d: Box,
};

function Cell({ status, locale, compact }: { status: "included" | "excluded" | "soon" | "order"; locale: Locale; compact?: boolean }) {
  const on = status === "included";
  // 16.11. (the owner's decision 2, Copy 1116 §7.1): a separately booked service shows the word "Opcional" in every column
  if (status === "order") return <span className={cn("plan-cell plan-cell-word", compact && "plan-cell-compact")} data-plan-cell={status}>{planCellWords.optional[locale]}</span>;
  return (
    <span className={cn("plan-cell", compact && "plan-cell-compact", on ? "is-on" : "is-off")} data-plan-cell={status} role="img" aria-label={planCellWords[on ? "in" : "out"][locale]}>
      {on ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : <Minus size={14} strokeWidth={2} aria-hidden="true" />}
    </span>
  );
}

/** The one action per plan (Copy stage 1 §0/§1): the button, the line under it, what happens next, and the quiet direct way where it is offered. */
function PlanAction({ code, name, locale, where }: { code: PlanCode; name: string; locale: Locale; where: "table" | "card" }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const b = brief1120.plans;
  return (
    <div className="plans-ways plans-ways-1120" data-plan-ways={where === "table" ? code : `card-${code}`} data-plan-offer={code === "essential" ? "trial" : code === "growth" ? "demo" : "talk"}>
      <a href={localePath(locale, brief1120.href[code])} className="plans-cta plans-cta-main" title={l(b.actionNext[code])} aria-label={`${l(b.action[code])} · ${l(b.actionNext[code])}`} data-plan-cta={where === "table" ? code : `card-${code}`} data-pilot-cta={`plan-${where}`}>{l(b.action[code])}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></a>
      <p className="plans-way-line">{l(b.actionLine[code])}</p>
      <p className="plans-way-next" data-plan-next={code}>{l(b.actionNext[code])}</p>
      {code !== "enterprise" && <a href={localePath(locale, brief1120.hrefDirect(code))} className="plans-way-link" aria-label={l(home1103.plans.wayDirectAria).replace("{plan}", name)} data-plan-direct={where === "table" ? code : `card-${code}`}>{l(b.direct)}</a>}
    </div>
  );
}

export function PlansTable({ locale, view, headed = true }: { locale: Locale; view: ClaimView; headed?: boolean }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.plans;
  const b = brief1120.plans;
  const names = w.names;
  const codes = w.codes as unknown as PlanCode[];
  const groups = l(w.groups);
  const entry = entryAction(locale, view);
  // 16.11. (the owner's point 11): no lifted column, no wash, no "Recomendado" until the owner names for whom Growth is recommended
  const hi = (_code: PlanCode) => false;
  const rows = w.rows.filter((r) => planRowShown(r.key, view));
  const groupRows = (gi: number) => rows.filter((r) => r.g === gi);
  // RV6 04ea648 (C-4): the replies row's name and its cell both read the reply channels only (REPLY_CHANNELS)
  const name = (r: (typeof w.rows)[number]) => (r.key === "replyWhatsapp" && view === "public" && !live("whatsappOwnNumber", view) ? l(w.repliesRowPublic) : w.rowName(r.name, locale, view, r.key === "replyWhatsapp" ? REPLY_CHANNELS : undefined));
  const table = plansTableShown(view);
  // Copy stage 1 §1: the differences come from API; until then Copy's draft (batch 1 §3.1), marked internally as pending
  const diffs = (code: PlanCode) => b.differences[code].filter((d) => d.keys.every((k) => live(k, view)));
  const diffState = DIFFERENCES_CONFIRMED_BY_API ? "api-confirmed" : "api-pending";

  if (!table) {
    // P-5 (the internal gate view with `plans` off): no plan names, no table — one block "Qué incluye"
    return (
      <section id="plans" aria-labelledby="plans-h" className="plans" data-plans data-plans-view={view} data-plans-table-shown="false">
        <div className="container-default">
          <Rise className="plans-head">
            <h2 id="plans-h" className="t-display-m text-text-primary">{l(w.included.h2)}</h2>
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
    <section id="plans" aria-labelledby="plans-h" className="plans plans-1120" data-plans data-plans-brief="1120" data-plans-view={view} data-plans-table-shown="true" data-plan-diffs={diffState}>
      <div className="container-default">
        {headed && (
          <Rise className="plans-head">
            {/* Copy 2-A: "Elige tu plan"; the desktop keeps its lead */}
            <h2 id="plans-h" className="t-display-m text-text-primary">{l(b.h2)}</h2>
            <p className="mt-4 t-body-l text-text-secondary max-w-[52ch] m-hide">{l(w.lead)}</p>
          </Rise>
        )}

        <Rise className="plans-table-wrap" y={24} delay={0.08}>
          {/* Copy stage 1 §1 `plans.line` above the matrix; the phone's short form */}
          <p className="plans-pilot-line m-hide" data-plans-pilot-line>{l(b.line)}</p>
          <p className="plans-pilot-line m-only" data-plans-pilot-line-phone>{l(b.linePhone)}</p>
          <div className="plans-table" role="table" aria-label={l(b.h2)} data-plans-table>
            <div className="plans-row plans-row-head" role="row">
              <div className="plans-cell plans-cell-name" role="columnheader" />
              {names.map((n, i) => (
                <div key={n} className={cn("plans-cell plans-cell-plan", hi(codes[i]) && "is-highlight")} role="columnheader" data-plan={codes[i]}>
                  <span className="plans-name">{n}</span>
                  <span className="plans-who">{l(b.who[codes[i]])}</span>
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
              <div className="plans-cell plans-cell-name" role="cell"><p className="t-body-s text-text-muted">{l(w.inherits)} {l(b.price)}</p></div>
              {codes.map((code, i) => (
                <div key={code} className={cn("plans-cell plans-cell-cta", hi(code) && "is-highlight")} role="cell">
                  <PlanAction code={code} name={names[i]} locale={locale} where="table" />
                </div>
              ))}
            </div>
          </div>

          {/* the phone: three cards in the same order (Copy 2-A) */}
          <ol className="plans-cards" data-plans-cards>
            {names.map((n, pi) => {
              const code = codes[pi];
              const ds = diffs(code);
              return (
                <li key={n} className={cn("plans-card", hi(code) && "is-highlight")} data-plan-card={code}>
                  <p className="plans-name">{n}</p>
                  <p className="plans-who">{l(b.who[code])}</p>
                  {ds.length > 0 && (
                    <div className="plans-diffs" data-plan-diffs-list={code}>
                      {b.adds[code] && <p className="plans-diffs-lead">{l(b.adds[code]!)}</p>}
                      <ul className="plans-diffs-list">
                        {ds.map((d, i) => <li key={i} className="plans-diff"><Check size={14} strokeWidth={3} aria-hidden="true" />{l(d.text)}</li>)}
                      </ul>
                    </div>
                  )}
                  <PlanAction code={code} name={n} locale={locale} where="card" />
                  {/* 19.11. (the owner: details by a tap on the phone): the full list behind one quiet text link at ≤ 639 px, open from 640 px */}
                  <PlanCardFold plan={code} labelOpen={l(b.all)} labelClose={l(b.allClose)} ariaOpen={`${l(b.all)} · ${n}`} ariaClose={`${l(b.allClose)} · ${n}`}>
                    {groups.map((g, gi) => groupRows(gi).length === 0 ? null : (
                      <div key={g} className="plans-card-group">
                        <p className="plans-cell-group">{g}</p>
                        <ul>
                          {groupRows(gi).map((r) => {
                            const Icon = ICONS[r.icon] ?? Box;
                            const s = planCell(r.key, code, view);
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
                  </PlanCardFold>
                </li>
              );
            })}
          </ol>
          {/* under the cards (Copy 2-A): the differences together, on demand, and the price line */}
          <details className="plans-compare m-only" data-plans-compare>
            <summary className="plans-compare-summary"><span className="plans-compare-open">{l(b.compare)}</span><span className="plans-compare-close">{l(b.compareClose)}</span></summary>
            <div className="plans-compare-grid">
              {codes.map((code, i) => (
                <div key={code} className="plans-compare-col" data-plans-compare-col={code}>
                  <p className="plans-compare-name">{names[i]}</p>
                  <p className="plans-compare-who">{l(b.who[code])}</p>
                  {b.adds[code] && <p className="plans-compare-lead">{l(b.adds[code]!)}</p>}
                  <ul>{diffs(code).map((d, j) => <li key={j}><Check size={13} strokeWidth={3} aria-hidden="true" />{l(d.text)}</li>)}</ul>
                </div>
              ))}
            </div>
          </details>
          <p className="plans-price-line t-body-m text-text-secondary m-only" data-plans-price>{l(b.price)}</p>
          {/* 16.11. (the owner's point 11): a short legend from the register's own words */}
          <p className="plans-legend t-body-s text-text-muted" data-plans-legend><span className="plans-legend-item"><span className="plan-cell is-on" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>{claimWords.included[locale]}</span><span className="plans-legend-sep" aria-hidden="true">·</span><span className="plans-legend-item"><span className="plan-cell is-off" aria-hidden="true"><Minus size={14} strokeWidth={2} /></span>{claimWords.excluded[locale]}</span>{rows.some((r) => r.key === "model3d") && <><span className="plans-legend-sep" aria-hidden="true">·</span><span className="plans-legend-item"><span className="plan-cell plan-cell-word" aria-hidden="true">{planCellWords.optional[locale]}</span>{l(w.optionalNote)}</span></>}</p>
        </Rise>
      </div>
    </section>
  );
}
