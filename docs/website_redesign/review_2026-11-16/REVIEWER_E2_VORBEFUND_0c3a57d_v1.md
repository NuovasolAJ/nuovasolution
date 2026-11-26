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

---

## R-13 — behoben an der Quelle (26.11., `6ca52cd`), mit zwei Punkten für die Messung

Redesign nimmt R-13 an und baut das Sprungverweis-Muster richtig ein:

```css
.hf-cta-trial-kbd { position: absolute; width: 1px; height: 1px; … clip: rect(0,0,0,0); }
.hf-cta-trial-kbd:focus-visible { position: static; width: auto; height: auto; … display: inline-flex; }
@media (max-width: 639px) { .hf-cta-trial-kbd:focus-visible { width: 100%; } }
```

Unfokussiert bleibt alles wie vom Owner verlangt — **eine** sichtbare Aktion im ersten Bildschirm.
Bei Tastaturfokus wird aus dem Verweis ein echter zweiter Knopf. Der Fokus verschwindet nicht mehr.
**Der Befund ist damit an der Quelle erledigt**; bestätigt wird er mit echten Tabulatordrücken am
Deployment, nicht vorher.

### Zwei Punkte, die ich deshalb mitmesse

1. **Das Muster baut um, statt zu überlagern.** Der übliche Sprungverweis bleibt `position:
   absolute` und fährt nur ein; hier wird er bei Fokus `position: static` und tritt damit in den
   Textfluss. Unter 640 px wird er zusätzlich `width: 100%`, also ein zweiter Knopf **unter** dem
   Hauptknopf. Solange er den Fokus hat, rückt alles darunter nach unten. Das ist kein Mangel —
   es ist eine verbreitete Form und betrifft nur den Augenblick des Fokus. Aber ich messe bei 375
   und 390, **ob die Aufgabenkarte und die Hauptaktion im ersten Bildschirm bleiben, während der
   Verweis den Fokus hat.** Bei 1366 × 768 steht er nach Redesigns Messung **neben** der
   Hauptaktion, dort ist kein senkrechtes Rücken zu erwarten.
2. **Er wird in meiner Tippziel-Messung als Treffer unter 44 px auftauchen** (1 × 1, solange er
   nicht fokussiert ist) — wie die Spam-Falle, aber aus einem anderen Grund: abgeschnitten, also
   für den Finger nicht treffbar, und für die Tastatur jetzt sichtbar und 44 px hoch. Ich werde ihn
   einordnen und **nicht** als Verstoß melden. Ich schreibe es vorher auf, damit die Zahl „1 unter
   44 px" später niemanden erschreckt.

Redesigns Zahlen (1366 × 768: 13 Tabulatordrücke, dann 198 × 44 bei y 644 über der Kante; 390:
6 Drücke, dann 358 × 44) sind **Angaben des Erbauers** und werden von mir am Deployment geprüft.

**Der Kandidat heißt damit nicht mehr `0c3a57d`.** Redesign benennt genau einen Commit, sobald die
Freigabe des Owners vorliegt; bis dahin bleibt der Alias auf `bea7d19`.
