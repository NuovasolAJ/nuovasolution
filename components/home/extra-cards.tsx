import { Bell, Link2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, type ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";

/**
 * 16.11. 14:00 (the owner's point 6): two more cards in the areas' style — "Lee el anuncio que te envía el cliente" and "Ninguna consulta
 * se queda sin aviso" — each with one sentence, one small product scene and one example line (lib/claims.ts `listingLink`, `reminders`;
 * the owner: both since 13.11.). The owner's brief of 20.11. (23.11.): the finished product, no marks — the 2-hour handover of K-2 stands
 * as written; its observed run in production is Daily's open proof for Audit's register, not a line on the page.
 */
export function ExtraCards({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.extraCards;
  const items = w.items.filter((it) => live(it.keys, view));
  if (items.length === 0) return null;
  return (
    <Rise className="ch-extra" data-chapter-extra={items.length} delay={0.08}>
      <p className="ch-extra-title">{l(w.title)}</p>
      <ul className="ch-extra-row" data-chapter-extra-row>
        {items.map((c) => (
          <li key={c.key} className="ch-card ch-card-extra" data-extra-card={c.key}>
            <div className="ch-visual ch-visual-extra" aria-hidden="true">
              {"scene" in c && c.scene && (
                <div className="xc-scene">
                  <p className="demo-msg demo-msg-in xc-msg"><span>{l(c.scene.message)}<span className="xc-link"><Link2 size={12} strokeWidth={2.2} />{l(c.scene.link)}</span></span></p>
                  <div className="xc-record">
                    <span className="xc-record-k">{l(c.scene.recordLabel)}</span>
                    <span className="xc-record-v tnum">{l(c.scene.record)}</span>
                  </div>
                </div>
              )}
              {"timeline" in c && c.timeline && (
                <ol className="xc-timeline">
                  {c.timeline.map((t) => (
                    <li key={t.time} className="xc-tl" data-state={t.state}>
                      <span className="xc-tl-time tnum">{t.time}</span>
                      <span className="xc-tl-dot" />
                      <span className="xc-tl-text">{l(t.text)}</span>
                      {t.state !== "open" ? <Bell size={13} strokeWidth={2.2} className="xc-tl-bell" /> : <span />}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <h3 className="ch-name">{l(c.name)}</h3>
            <p className="ch-line m-hide">{l(c.line)}</p>
            {c.examples.length > 0 && <ul className="ch-examples m-hide">{c.examples.map((x) => <li key={x.es}>{l(x)}</li>)}</ul>}{/* Copy 88b2d1a: the reminders card's timeline IS the example */}
            <p className="ch-mark m-hide">{l(c.mark)}</p>
            <p className="m-only ch-proof" data-phone-core={c.key}>{l(c.proof)}</p>
          </li>
        ))}
      </ul>
    </Rise>
  );
}
