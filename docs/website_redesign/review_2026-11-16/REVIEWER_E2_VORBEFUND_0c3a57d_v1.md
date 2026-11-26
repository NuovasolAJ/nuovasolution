# RV6 — Vorbefund am E2-Kandidaten, an der Quelle, **vor** der Benennung

**Stand** 26.11. · Kandidat **lokal** `0c3a57d` (+ Dokumentcommit `9208dea`), **nicht** gepusht.
Der Alias liefert weiter `bea7d19` / `dpl_H6WfQ1GK…`. **Gemessen ist hier nichts** — das hier ist
Quelllesung, damit ein Einzeiler vor der Benennung behoben werden kann statt danach.

---

## R-13 — die Testaktion im ersten Bildschirm ist unsichtbar, aber ansteuerbar

`components/home/hero.tsx:68` (E2, **neu**; `bea7d19` hat in dieser Datei **kein** `sr-only`):

```jsx
<a href={p(brief1120.href.essential)} className="sr-only" data-hero-cta="trial" data-pilot-cta="hero">{l(b.ctaTrial)}</a>
```

Und `app/globals.css:539`:

```css
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
           overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
```

**Kein `:focus`-Ausstieg.** Ein `<a href>` ohne `tabindex="-1"` und ohne `aria-hidden` bleibt
ansteuerbar. Wer sich mit der Tabulatortaste durch den ersten Bildschirm bewegt und **sieht**,
landet damit auf einem 1 × 1 px großen, abgeschnittenen Element: der Fokus verschwindet, ohne dass
irgendetwas auf dem Schirm darauf hinweist. Für Tastaturnutzer mit Augenlicht ist das ein Loch im
Weg; für Vorlesesoftware ist der Verweis in Ordnung.

**Die richtige Form steht neun Zeilen darunter in derselben Datei** (`globals.css:543-548`):

```css
.skip-link { position: absolute; left: var(--gutter); top: -100px; … }
.skip-link:focus { top: 12px; }
```

Also: beim Fokus sichtbar werden. Dasselbe für diesen Verweis — oder, wenn er wirklich nur
Vorlesesoftware dienen soll, zusätzlich aus der Tabulatorfolge nehmen; dann aber nützt er niemandem,
der tastaturgebunden ist.

**Warum es gerade jetzt zählt:** nach dem Dokument des Owners (§4, Fußnote) hat die Testaktion den
ersten Bildschirm auf seine Anordnung hin **verlassen**; dieser Verweis ist das, was von ihr dort
übrig ist. Er ist damit der einzige Weg zum freien Test im ersten Bildschirm — und er ist der
einzige, den man nicht sehen kann.

### Wie sicher das ist

**Quelllesung, nicht Messung.** Dass ein `<a href>` ohne `tabindex="-1"` fokussierbar ist, ist
sicher; **ob** der Browser ihn in dieser Anordnung wirklich als Stopp führt, sage ich erst nach
echten Tabulatordrücken am Deployment. Das ist genau die Trennung, die ich bei R-8 falsch gemacht
habe — dort schloss ich vom Element auf die Eltern, ohne den Browser zu fragen. Hier also:
**Vorbefund, zu bestätigen.**

Zwei Dinge, die ich ausdrücklich **nicht** melde:

- `components/site/onboarding-setup.tsx:357` trägt ebenfalls `sr-only`, auf einem
  `<input type="file">` mit `id="setup-file-…"`. Das ist das übliche Muster „verstecktes Dateifeld
  mit gestalteter Beschriftung" und richtig so.
- Der Verweis selbst ist **kein** Verstoß gegen die 44-px-Regel. Er wird in meiner Tippziel-Messung
  wahrscheinlich als Treffer unter 44 px auftauchen wie die Spam-Falle — anders als diese ist er
  aber **erreichbar**, und das ist der Punkt, nicht seine Größe.

---

## Was E2 für meinen Durchgang ändert

- **Die Lückenliste `de152f8` gilt nur für `bea7d19`.** E2 ändert `home-1103.ts`, `brief-1120.ts`,
  `faq.ts`, `strengths.ts` und kürzt die Berichtsbühne stark; der Register-Abgleich läuft neu.
- **Die Aufgabenkarte bleibt im Hero** (`hf-scene-task`, `b.task.title`, `b.task.line`) — die
  Grundlage der Note „Kaufinteresse" besteht also weiter, ihre Lage im ersten Bildschirm messe ich
  bei 375 und 390 neu.
- **Die Seite ist deutlich kürzer** (390: 18153 → 15198 px; Bericht 3128 → 927). Wege werden damit
  kürzer, was die Note „Modernität/Bewegung" betrifft — und die Vorher-Zahlen stehen auf `92f873d`,
  nicht auf `bea7d19`.
- **Die Eigenbenotung des Erbauers ist durchgehend 9** (vier Abschnitte × sechs Kriterien). Eine
  gleichförmige Selbstnote trägt wenig Auskunft; meine Noten entstehen unabhängig, wie bisher.
