import { Bell, Link2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { claimWords, live, type ClaimView } from "@/lib/claims";
import { handoverLive } from "@/lib/content/strengths";
import { Rise } from "@/components/ui/motion";

/**
 * 16.11. 14:00 (the owner's point 6): two more cards in the areas' style — "Lee el anuncio que te envía el cliente" and "Ninguna consulta
 * se queda sin aviso" — each with one sentence, one small product scene and one example line. Public only what is in production
 * (lib/claims.ts `listingLink`, `reminders`; the owner: both since 13.11.). Copy 1120 §5: the 2-hour handover of K-2 is in production only
 * once Daily's E19 v2 is — until then the public view shows its clause as PX-s, its 13:20 step with "Próximamente" and the proof without it.
 */
export function ExtraCards({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.extraCards;
  const items = w.items.filter((it) => live(it.keys, view));
  const hv = handoverLive(view);
  if (items.length === 0) return null;
  return (
    <Rise className="ch-extra" data-chapter-extra={items.length} delay={0.08}>
      <p className="ch-extra-title">{l(w.title)}</p>
      <ul className="ch-extra-row" data-chapter-extra-row>
        {items.map((c) => {
          const hand = "handover" in c && c.handover && !hv; // the handover clause is marked
          return (
            <li key={c.key} className="ch-card ch-card-extra" data-extra-card={c.key} data-extra-handover={"handover" in c && c.handover ? (hv ? "live" : "soon") : undefined}>
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
                      <li key={t.time} className="xc-tl" data-state={t.state} data-tl-soon={"handover" in t && t.handover && !hv ? "true" : undefined}>
                        <span className="xc-tl-time tnum">{t.time}</span>
                        <span className="xc-tl-dot" />
                        <span className="xc-tl-text">{l(t.text)}{"handover" in t && t.handover && !hv && <span className="xc-tl-soon">{claimWords.soon[locale]}</span>}</span>
                        {t.state !== "open" ? <Bell size={13} strokeWidth={2.2} className="xc-tl-bell" /> : <span />}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <h3 className="ch-name">{l(c.name)}</h3>
              <p className="ch-line m-hide">{hand && "linePublic" in c && c.linePublic ? l(c.linePublic) : l(c.line)}</p>
              <ul className="ch-examples m-hide">{c.examples.map((x, i) => <li key={x.es}>{l(x)}{hand && i === c.examples.length - 1 && <span className="xc-tl-soon"> {claimWords.soon[locale]}</span>}</li>)}</ul>
              <p className="ch-mark m-hide">{l(c.mark)}</p>
              <p className="m-only ch-proof" data-phone-core={c.key}>{hand && "proofPublic" in c && c.proofPublic ? l(c.proofPublic) : l(c.proof)}</p>
            </li>
          );
        })}
      </ul>
    </Rise>
  );
}
