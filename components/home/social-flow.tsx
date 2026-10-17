import { Check, Heart, MessageCircle, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { listings, storyWords } from "@/lib/content/home-story";
import { Reveal } from "@/components/ui/reveal";

/**
 * Social as a product experience (final order 2026-10-17 §6): the same listing photo and data become a finished post
 * draft, the approval is visible, the post goes out, a prospect asks, and the next step is plain. One composition instead of
 * five boxes: the post preview on the left, the comment and the next step on the right. Nothing is published by the
 * website; no reach, no leads and no availability are claimed.
 */
export function SocialFlow({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const S = storyWords.social;
  const P = S.post;
  const li = listings.est204;
  return (
    <section id="story-social" aria-labelledby="social-h" className="story-chapter story-chapter-wide" data-chapter="story-social">
      <Reveal className="max-w-[760px]">
        <p className="t-eyebrow text-text-accent">{l(S.eyebrow)}</p>
        <h3 id="social-h" className="mt-3 t-display-m text-text-primary">{l(S.title)}</h3>
        <p className="mt-4 t-body-m text-text-secondary">{l(S.line)}</p>
        <p className="state-line mt-5" data-state="preparing" data-chapter-state>{storyWords.common.stateLabel[locale]}: {l(S.state)}</p>
      </Reveal>
      <Reveal mode="opacity" delay={100} className="mt-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10" data-social-strip>
          {/* The post: the listing's own photo and data as a finished draft, approved, published */}
          <article className="overflow-hidden rounded-lg border border-line-contour bg-surface-raised" data-social-post>
            <div className="flex items-center gap-3 px-4 py-3">
              <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 text-[0.75rem] font-semibold text-ivory">N</span>
              <p className="t-body-s font-semibold text-ink-950">{P.account}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={li.photo} alt={l(li.photoAlt)} width={800} height={533} loading="eager" decoding="async" className="aspect-[4/3] w-full bg-[#ece9e2] object-cover" />
            <div className="px-4 pb-4 pt-3">
              <p className="flex items-center gap-4 text-text-muted" aria-hidden="true"><Heart size={18} /><MessageCircle size={18} /><Send size={18} /></p>
              <p className="mt-3 t-body-s text-ink-950"><span className="font-semibold">{P.account}</span> {l(P.caption)}</p>
              <p className="mt-2 t-caption text-text-muted">{li.price} · {l(li.place)}</p>
              <ol className="mt-4 space-y-1.5 border-t border-line-hairline pt-3" data-social-states>
                <li className="t-caption text-text-secondary" data-social-step="1">{l(P.draftLabel)}</li>
                <li className="flex items-center gap-1.5 t-caption text-signal-positive" data-social-step="2"><Check size={13} strokeWidth={2.5} aria-hidden="true" />{l(P.approved)}</li>
                <li className="flex items-center gap-1.5 t-caption text-signal-positive" data-social-step="3"><Check size={13} strokeWidth={2.5} aria-hidden="true" />{l(P.published)}</li>
              </ol>
            </div>
          </article>

          {/* The comment, the allowed reply, the next step */}
          <div className="min-w-0 space-y-4" data-social-comment>
            <div className="rounded-lg border border-line-contour bg-surface-raised p-4">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-ink-100 text-[0.75rem] font-semibold text-ink-700">M</span>
                <div className="min-w-0">
                  <p className="t-body-s"><span className="font-semibold text-ink-950">{S.commenter}</span> <span className="text-text-muted">· {l(S.commentLabel)} · {locale === "es" ? "jueves 10:14" : "Thursday 10:14"}</span></p>
                  <p lang="es" className="mt-1 t-body-m text-text-primary">{S.comment}</p>
                </div>
              </div>
              <div className="ml-11 mt-3 border-l-2 border-ink-200 pl-3">
                <p className="t-caption text-text-muted">{l(S.replyLabel)}</p>
                <p lang="es" className="mt-0.5 t-body-s text-text-primary">{S.reply}</p>
                <p className="mt-1 t-caption text-text-muted">{l(S.noAvailability)}</p>
              </div>
            </div>
            <div className="hero-next" data-social-next>
              <p className="t-caption font-medium text-text-muted">{l(P.nextTitle)}</p>
              <p className="mt-1 t-body-m text-ink-950">{l(P.next)}</p>
            </div>
            <p className="t-caption text-text-muted">{l(S.noAds)}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
