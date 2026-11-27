import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { agencyTasks, type AgencyTask, type TaskProof } from "@/lib/content/agency-tasks";
import { live, type ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { WhatsAppMark } from "@/components/ui/whatsapp-mark";

/**
 * The agency tasks (the owner's E2 order of 24.11., point 5; his brief of 20.11. p. 4): four stacked cards instead of seven text cards.
 * Each card = one task, one line, ONE proof as a small product view, ONE action; the day story as a strip of six moments. The cards
 * stack on scroll (position: sticky, CSS only — nothing loops, nothing moves by itself); each card rises once into view (Rise, off with
 * reduced motion). No arrows anywhere (the owner, 24.11.). Texts: lib/content/agency-tasks.ts (Copy's short lines, WORKING cuts marked).
 */
function Proof({ p, locale, mark }: { p: TaskProof; locale: Locale; mark: string }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  if (p.kind === "chat") {
    return (
      <div className="at-proof at-proof-chat" data-task-proof="chat" aria-label={mark}>
        <p className="at-chat-head"><WhatsAppMark size={14} />WhatsApp · {p.time}</p>
        <p className="at-chat-in">{l(p.text)}</p>
        <p className="at-chat-out">{l(p.reply)}</p>
        <p className="at-proof-mark">{mark}</p>
      </div>
    );
  }
  if (p.kind === "record") {
    return (
      <div className="at-proof at-proof-record" data-task-proof="record">
        <p className="at-proof-source">{l(p.source)}</p>
        <ul className="at-record">{p.fields.map((f) => <li key={f.es}>{l(f)}</li>)}</ul>
        <p className="at-proof-mark">{mark}</p>
      </div>
    );
  }
  if (p.kind === "match") {
    return (
      <div className="at-proof at-proof-match" data-task-proof="match">
        {/* the owner's E2 point 6: a licensed photo ("¿por qué encaja este piso?") comes here once he has chosen one — no empty slot until then (the owner: no empty areas) */}
        <p className="at-match-listing">{l(p.listing)}</p>
        <p className="at-match-contact">{l(p.contact)}</p>
        <p className="at-match-answer">{l(p.answer)}</p>
        <p className="at-proof-mark">{mark}</p>
      </div>
    );
  }
  return (
    <div className="at-proof at-proof-day" data-task-proof="day">
      <p className="at-day-head">{l(p.head)}</p>
      <ol className="at-day-items">{p.items.map((it) => <li key={it.es}>{l(it)}</li>)}</ol>
      <p className="at-day-foot tnum">{l(p.foot)}</p>
      <p className="at-proof-mark">{mark}</p>
    </div>
  );
}

function Card({ t, i, locale, mark }: { t: AgencyTask; i: number; locale: Locale; mark: string }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const href = t.action.href.startsWith("#") ? t.action.href : localePath(locale, t.action.href);
  return (
    <Rise as="li" className="at-card" style={{ ["--i" as string]: i }} data-task={t.key} delay={0}>
      <div className="at-words">
        <p className="at-no tnum" aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>
        <h3 className="at-title">{l(t.title)}</h3>
        <p className="at-line">{l(t.line)}</p>
        <a href={href} className="at-action" data-task-action={t.key} data-demo-open={t.action.open} data-chapter-jump={t.action.jump}>{l(t.action.label)}</a>
      </div>
      <Proof p={t.proof} locale={locale} mark={mark} />
    </Rise>
  );
}

export function AgencyTasks({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = agencyTasks;
  const tasks = w.tasks.filter((t) => live(t.keys, view));
  const moments = w.day.moments.filter((m) => live(m.keys, view));
  const mark = l(w.mark);
  return (
    <section id="strengths" aria-labelledby="at-h" className="at" data-agency-tasks data-tasks={tasks.length}>
      <div className="container-default">
        <Rise className="at-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="at-h" className="at-h2">{l(w.h2)}</h2>
        </Rise>
        <ul className="at-stack">
          {tasks.map((t, i) => <Card key={t.key} t={t} i={i} locale={locale} mark={mark} />)}
        </ul>
        {live(["model3d"], view) && (
          <p className="at-3d" data-task-3d>{l(w.model3d.line)} <a href={w.model3d.href} className="at-3d-link">{l(w.model3d.label)}</a></p>
        )}
        {/* §C the day as a strip: six moments, scrollable on the phone, no text block */}
        <Rise className="at-day" data-task-day>
          <p className="at-day-title">{l(w.day.title)}</p>
          <ol className="at-strip">
            {moments.map((m) => (
              <li key={m.time} className="at-moment" data-day-moment={m.time}>
                <span className="at-moment-time tnum">{m.time}</span>
                <span className="at-moment-text">{l(m.text)}</span>
              </li>
            ))}
          </ol>
          <p className="at-proof-mark">{l(w.day.mark)}</p>
        </Rise>
      </div>
    </section>
  );
}
