import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n/config";
import { homeV4 } from "@/lib/content/home-v4";
import { DepthScene } from "@/components/ui/depth-scene";

/**
 * Moment 2 (CONTENT_MODEL_1016): the loss. One sentence lights up word by word while the page scrolls (the principle of
 * fora.so's statement), then the clock of an unanswered enquiry: the enquiry card fades, four beats light up, the card
 * is marked "lost". Everything is driven by the scene's own --depth (components/ui/depth-scene.tsx) through CSS calc():
 * no timers, no entry animation. Reduced motion and no JavaScript: the end state (the --depth fallback is 1).
 */
export function LossScene({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeV4.loss;
  const words = l(w.statement).split(" ");

  return (
    <DepthScene as="section" className="loss" >
      <div id="loss" className="loss-sticky scroll-mt-[var(--header-h)]" aria-labelledby="loss-h">
        <div className="container-default">
          <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="loss-h" className="loss-statement" style={{ ["--n" as string]: words.length } as CSSProperties} data-loss-statement>
            {words.map((word, i) => (
              <span key={i} className="loss-word" style={{ ["--i" as string]: i } as CSSProperties}>{word}{i < words.length - 1 ? " " : ""}</span>
            ))}
          </h2>

          <div className="loss-clock" data-loss-clock>
            <div className="loss-card" data-loss-card>
              <p className="loss-card-who">{l(w.card.who)}</p>
              <p className="loss-card-line">{l(w.card.line)}</p>
              <p className="loss-lost" data-loss-lost>{l(w.card.lost)}</p>
            </div>
            <ol className="loss-steps">
              {w.steps.map((s, k) => (
                <li key={k} className="loss-step" style={{ ["--k" as string]: k } as CSSProperties}>
                  <span className="loss-step-t tnum">{l(s.t)}</span>
                  <span className="loss-step-text">{l(s.text)}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="loss-caption">{l(w.caption)}</p>
        </div>
      </div>
    </DepthScene>
  );
}
