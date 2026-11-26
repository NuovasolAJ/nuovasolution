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

### R-13-Nachtrag: das Umbauen ist gemessen — und Redesign meldet dabei etwas gegen die eigene Arbeit

Redesign hat den Umbau bei Fokus selbst gemessen (`194c6ec`, Belege in
`docs/website_redesign/evidence/`): 1366 × 768 kein senkrechtes Rücken, der Verweis steht neben der
Hauptaktion (644–688). 390 × 844 rollt der Browser 11 px, Aufgabenkarte (581–692) und Hauptaktion
(734–790) bleiben im ersten Bildschirm. **Mein Punkt 1 ist damit beantwortet**, bestätigt wird er
am Deployment. Die Entscheidung, beim Umbauen statt beim Überlagern zu bleiben, ist Redesigns
Gestaltungsentscheidung und begründet (die überlagernde Hälfte läge auf der Kante des
Vorschaustreifens) — ich widerspreche nicht.

**Wichtiger ist, was Redesign unaufgefordert dazu meldet:**

> „at 375 × 667 the main action ends at **799 of 667** even unfocused, i.e. below the fold on that
> small phone, unchanged since `0c3a57d` (390 × 844 ends at **836 of 844**)."

Das gehört nicht zu R-13, und streng genommen auch nicht zu F22a — F22a wurde bei 1366 × 768
erhoben. Es ist aber **dieselbe Klasse**: der erste Bildschirm trägt nicht, was er tragen soll.
Zwei Zahlen daran:

- **375 × 667** (iPhone SE und ältere kleine Geräte): die Hauptaktion endet **132 px unter** der
  Kante. Auf dem Telefon wiegt das weniger als am Schreibtisch, weil gerollt wird — aber 375 ist
  die Breite, auf die der vereinbarte Maßstab die Tippziele festlegt, also eine gemessene Größe in
  diesem Vorhaben und kein Randfall.
- **390 × 844: 836 von 844 — acht Pixel Luft.** Das ist kein Bestehen, das ist eine Punktlandung.
  Eine längere Übersetzung, ein anderer Schriftrückfall oder ein um zehn Pixel höherer
  Vorschaustreifen schiebt die Aktion hinaus. **Englisch ist in diesen Texten durchweg länger**,
  und Redesigns Zahl ist eine ES-Messung.

**Was ich daraus messe, und was nicht.** Ich melde hier noch keinen Befund. Das Kriterium der Note
„Kaufinteresse" lautet „die fertige **Aufgabe** im ersten Bildschirm", nicht „die Aktion" — und wo
die **Aufgabenkarte** bei 375 × 667 **unfokussiert** steht, sagt Redesigns Nachricht nicht. Genau
das messe ich:

| zu messen | Breite × Höhe | Sprache |
|---|---|---|
| Aufgabenkarte im ersten Bildschirm, unfokussiert | 375 × 667, 390 × 844, 1366 × 768, 1280 × 720, 1440 × 900 | ES **und** EN |
| Hauptaktion über der Kante, unfokussiert, mit Vorschaustreifen | dieselben | ES und EN |
| Aufgabenkarte und Hauptaktion, **während** der Tastaturverweis den Fokus hat | 375 × 667, 390 × 844 | ES und EN |
| Restluft in px, nicht nur „drinnen/draußen" | alle | beide |

Die Restluft nenne ich in Pixeln, weil „drinnen" bei acht Pixeln eine andere Aussage ist als
„drinnen" bei hundert.

---

## Nachtrag 26.11. abends — Redesign hat EN gemessen, nachgebessert (`00b488e`) und legt 375 × 667 dem Owner vor

Meine Frage nach dem **englischen** Wert war die richtige: Englisch schob die Hauptaktion bei
**390 × 844 (−46)** und **1280 × 720 (−22)** unter die Kante. Nachgebessert in `00b488e`, **nur CSS**
(enge Szene jetzt auf allen Breiten, Augenbrauen-Abstand der Überschrift weg, Luft über der
Überschrift am Telefon weg, Vorspann am Telefon 15 px, Mindesthöhe rechnet den Streifen mit,
Vorspann im kurzen Fenster bis 68ch).

**Restluft unter dem Element, unfokussiert, mit Vorschaustreifen — Angaben des Erbauers, lokaler
Bau, von mir nicht gemessen** (`docs/website_redesign/evidence/fold-es-en-local-194c6ec-plus.json`):

| Größe | Aufgabenkarte ES | Aufgabenkarte EN | Hauptaktion ES | Hauptaktion EN |
|---|---|---|---|---|
| 375 × 667 | **+19** | **−64** | **−73** | **−156** |
| 390 × 844 | +132 | +132 | +40 | +40 |
| 1280 × 720 | +160 | +117 | +66 | **+23** |
| 1366 × 768 | +168 | +165 | +74 | +71 |
| 1440 × 900 | +168 | +150 | +74 | +56 |

Das ist die Zahl, die ich angekündigt hatte: **Bei 375 × 667 fällt in Englisch die Aufgabenkarte
selbst unter die Kante (−64).** Damit ist dort das Kriterium der Note „Kaufinteresse" — *die fertige
Aufgabe im ersten Bildschirm* — **nicht erfüllt**; in Spanisch ist es mit **+19 px** erfüllt, aber
wieder als Punktlandung. Bei 390 × 844 ist der Mangel behoben (ES und EN +40 / +132).

### Der eigentliche Befund: die 92 px, mit denen gerechnet wird, gehören nicht zum Produkt

Redesign schreibt, 375 × 667 sei **„with the band"** nicht zu halten — „92 px of band, 515 px left
for headline, sentence, message, task, action" — und legt dem Owner die Entscheidung vor, *einen
Teil des ersten Bildschirms zu entfernen*.

**Diese 92 px sind Vorschau-Möblierung und auf der freigegebenen Seite 0 px.** Zwei Streifen stehen
über dem Hero, beide nur im Vorschau- und Testbau:

| Streifen | Quelle | wird gezeigt, wenn |
|---|---|---|
| „Vista previa. …" (Hinweiszeile) | `components/site/environment-ribbon.tsx:28` | **nicht**, wenn `mode === "live"` **und** Freigabe-Marke gesetzt |
| Schalterzeile „Solo en la vista previa +" | `components/site/preview-switch.tsx` über `{!s.live && …}` in `app/[locale]/page.tsx:49` | **nicht** auf einem Live-Bau |

`lib/contracts/mode.ts:131` — `publicIndexingAllowed()` verlangt `integrationMode() === "live"` **und**
`NUOVA_LIVE_RELEASE`. Der lokale Bau und die Vorschau laufen in `stub`; **jede** hier genannte Zahl
trägt die Möblierung mit.

Damit steht die Frage anders, als sie dem Owner vorliegt: **eine dauerhafte Kürzung des ersten
Bildschirms, um vorübergehende Möblierung unterzubringen.** Zieht man die 92 px ab, kommt man
rechnerisch auf Aufgabenkarte ES +111 / EN +28 und Hauptaktion ES +19 / EN −64 — das Kriterium der
Note wäre dann **in beiden Sprachen erfüllt**, und offen bliebe allein, ob bei 375 in **Englisch**
für die Aktion gerollt werden muss. Das ist eine viel kleinere Entscheidung.

**Ich rechne diese Zahlen aber nicht als Messung an.** Die Mindesthöhe des Heros hängt an
`min(calc(100svh - 160px), 820px)`, und die `160px` sind nach Redesigns eigener Beschreibung *auf den
Streifen hin* gewählt. Ohne Streifen kann der Hero also höher bleiben, als er sein müsste —
Abziehen ist eine Schätzung, nicht ein Maß. **Gemessen werden muss ohne Streifen.**

### Was ich von Redesign erbitte, bevor der Commit benannt wird

1. **Dieselbe Tabelle auf einem Bau ohne Möblierung** (`NUOVA_INTEGRATION_MODE=live` mit
   Freigabe-Marke, oder ersatzweise beide Streifen aus dem DOM entfernt). Nur diese Zahlen gehören
   in die Frage an den Owner, weil nur sie das Produkt beschreiben.
2. **Bei 390 ES und EN gleich auf das Pixel** (712 / 804 in beiden Sprachen). Das ist plausibel,
   seit die Mindesthöhe die Höhe bestimmt — heißt aber: die Lage hängt **nicht mehr an der
   Textlänge**. Dann ist die Frage, ob der längere englische Text **innerhalb** der Szene noch
   hineingeht. Bitte bei 390 EN `scrollHeight` gegen `clientHeight` für die Szene und die
   Nachrichtenkachel melden — ein Abschneiden innerhalb der Kachel wäre durch eine Kantenmessung
   nicht zu sehen.
3. **1280 × 720 EN steht bei +23 px.** Dieselbe Punktlandung wie 390 vorher, nur auf dem
   Schreibtisch. Ich melde sie als Zahl, nicht als Mangel.

**Eine Kleinigkeit am Beleg, derselben Klasse wie meine eigenen Fehler:** `fold-es-en.mjs` liest
`band: !!document.querySelector("[data-preview-band], .preview-band")` — und legt den Wert dann nicht
in die Zeile. Beide Namen kommen in der Quelle außerdem nicht vor; der Streifen heißt `[data-env]`
bzw. `[data-preview-switches]`. Die Angabe „mit Vorschaustreifen" ist damit **behauptet, nicht
belegt**. Das ändert an den Zahlen vermutlich nichts — der Streifen steht auf einem `stub`-Bau immer
—, aber geprüft ist er nicht.

### Stand der Messbarkeit

Unverändert: nichts davon ist von mir gemessen. `/api/build` am Alias steht auf `bea7d19` /
`dpl_H6WfQ1GK…`; gemessen wird erst nach der Freigabe des Owners, am benannten Commit, anhand der
Deployment-Kennung. Die Tabelle oben sind **Angaben des Erbauers** und bleiben es, bis ich sie
nachfahre.
