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

---

## Nachtrag 2 (26.11., spät) — mit und ohne Möblierung gemessen (`89a7511`). Meine Schätzung war um 92 px falsch

Redesign hat alle drei Punkte beantwortet. Ich habe die Zahlen **gegen den Beleg nachgerechnet**
(`docs/website_redesign/evidence/fold-es-en-local-00b488e-with-without.json`), nicht gegen die
Nachricht:

| Größe | Möbl. | Aufgabe mit | Aktion mit | Aufgabe ohne | Aktion ohne | Versatz |
|---|---|---|---|---|---|---|
| 375 × 667 ES | 152 | +19 | −73 | **+171** | **+79** | 152 |
| 375 × 667 **EN** | 152 | −64 | −156 | **+88** | **−4** | 152 |
| 390 × 844 ES/EN | 152 | +132 | +40 | +284 | +192 | 152 |
| 1280 × 720 ES | 94 | +160 | +66 | +254 | +160 | 94 |
| 1280 × 720 EN | 94 | +117 | +23 | +211 | +117 | 94 |
| 1366 × 768 ES / EN | 94 | +168 / +165 | +74 / +71 | +262 / +259 | +168 / +165 | 94 |
| 1440 × 900 ES / EN | 94 | +168 / +150 | +74 / +56 | +262 / +243 | +168 / +149 | 94 / 93 |

**Der Versatz ist überall genau die Möblierungshöhe.** Das Verfahren (beide Streifen aus dem DOM
nehmen und neu messen) ist damit tragfähig: `100svh` ändert sich beim Entfernen nicht, die
Mindesthöhe des Heros also auch nicht — der Inhalt rückt nur hoch. Ein freigegebener Bau, der die
Streifen nie darstellt, ist layoutgleich. Dass Redesign den Modus nicht umstellen konnte (keine
Freigabe-Marke in seiner Hand), ist hier **kein** Mangel am Beleg.

### Mein eigener Fehler: die Schätzung war um 92 px zu pessimistisch

Ich hatte „92 px abziehen" gerechnet und für **375 × 667 EN** eine Aktion bei **−64** vorhergesagt.
Gemessen: **−4**. Die Möblierung ist **152 px**, nicht 92 — die 92 px waren die **Hinweiszeile
allein**, die Schalterzeile kommt mit 60 px dazu. Ich habe Redesigns „92 px of band" für die ganze
Möblierung genommen, ohne es nachzusehen, obwohl ich beide Streifen eine Stunde vorher selbst in der
Quelle gefunden hatte. Der Warnhinweis („Schätzung, nicht Maß") hat gehalten, die Zahl nicht.
Richtung: **zu schwarz gemalt** — diesmal die harmlose Richtung, aber derselbe Fehler wie ein zu
enges Suchmuster.

### Was aus den 4 px folgt — und was nicht

Auf der freigegebenen Seite steht bei **375 × 667** die **Aufgabenkarte in beiden Sprachen im ersten
Bildschirm** (ES +171, EN +88). Das Kriterium der Note „Kaufinteresse" ist damit auf allen fünf
Größen und in beiden Sprachen erfüllt. Offen bleibt allein die **Hauptaktion bei 375 × 667 in
Englisch: −4 px.**

**Diese 4 px gehören nicht vor den Owner.** Redesign hat die Frage ehrlich neu gestellt („ein
4-px-Rollen statt eines Schnitts") — aber vier Pixel in einer Sprache auf einer Größe sind in CSS
erreichbar und keine Produktentscheidung. Die Gefahr ist nicht der Pixel, sondern der **Beschluss**:
Wer „ein Rollen bei 375" grundsätzlich genehmigt, genehmigt mehr, als hier zu entscheiden ist.
Mein Rat: in CSS auffangen, ohne Vorlage. Bleibt es stehen, melde ich es am Deployment als Zahl mit
Bild, nicht als Mangel.

### Punkt 2 ist beantwortet, und sauber

`scrollHeight / clientHeight` bei 390 EN: Szene 318/318, Nachrichtenkachel 183/183, Textblase 75/75,
Übersetzung 53/53, Aufgabe 105/105, Vorspann 68/68. **Kein Behälter schneidet Text ab** — mein
Verdacht, die festgesetzte Höhe könne das Längere innen abschneiden, ist widerlegt. Die Erklärung
(Inhalt kürzer als die Mindesthöhe, der Rest ist Luft am unteren Rand) passt zu den identischen
ES/EN-Zahlen bei 390.

**Eine Notiz, kein Befund:** die h1 meldet 106/103, bei 375 EN 103/101 — rund 3 px Zeichenüberhang
unter `line-height: 1.06`. Redesign hat gegengeprüft (gleich in ES, gleich am Alias-Bau), also keine
Verschlechterung. Ich schreibe es nur auf, weil ein 3-px-Überhang an einer Überschrift genau dann
zum Abschneiden führt, wenn irgendwann über dieser Kette ein `overflow: hidden` landet.

### Der Punkt, der dadurch erst sichtbar wird: diese Ansicht hat **niemand** gesehen

Ohne Streifen endet der Hero bei 390 nach Redesigns Angabe **etwa 100 px über der Bildschirmkante**,
und der nächste Abschnitt schaut hinein — weil die Mindesthöhe `min(calc(100svh - 160px), 820px)`
die **160 px auf die Möblierung hin** abzieht, die dann nicht mehr da ist.

Das heißt: **der erste Bildschirm der freigegebenen Seite ist eine andere Komposition als der, der
begutachtet wurde.** Und das ist nicht hypothetisch — ich habe es geprüft:

| Abruf 26.11. | Ergebnis |
|---|---|
| `https://nuovasolution.com/` | **200**, Titel „NuovaSolution — Never Miss a Lead Again" — die **alte** Seite |
| `https://nuovasolution.com/es` | **404** |

Die Neugestaltung war **nie** öffentlich. Jeder Bau, den jemals jemand angesehen, gefilmt oder
benotet hat, trug die 152 px (Telefon) bzw. 94 px (Schreibtisch) Möblierung — meine sechs Noten auf
`bea7d19`, die 26 Vorher/Nachher-Paare und die drei Filme eingeschlossen. Der erste Bildschirm ohne
Streifen existiert heute **nur als Rechnung**.

**Daraus folgt für meinen Durchgang:** ich benote den ersten Bildschirm am Deployment **mit** der
Möblierung — so, wie der Owner ihn sieht — und nenne die Zahl ohne sie **daneben**. Und ich erbitte
von Redesign **Bilder** des ersten Bildschirms ohne Streifen, mindestens 390 und 1366, ES und EN,
damit der Hero, der 100 px über der Kante endet, als **Bild** beurteilt wird und nicht als Zahl.
Ein Hero, der absichtlich einen Streifen des nächsten Abschnitts zeigt, ist eine verbreitete und
gute Form; einer, der zufällig 100 px zu kurz ist, ist es nicht. Den Unterschied sieht man nicht in
einer Tabelle.

---

## Nachtrag 3 (26.11., Bilder angesehen) — `b8bb2bc` nachgerechnet, und zwei Dinge, die nur das Bild zeigt

Die 4 px sind aufgefangen (`b8bb2bc`, enger nur auf dem kurzen Telefon: `max-width: 639px` **und**
`max-height: 720px`). Gegen den Beleg nachgerechnet
(`fold-es-en-local-00b488e-plus-short-phone.json`): **375 × 667 ohne Streifen** jetzt Aufgabenkarte
ES +181 / EN +100, Hauptaktion ES +91 / **EN +10**. Alle übrigen Zeilen unverändert — die Abfrage
greift wegen `max-height: 720px` nicht bei 390 × 844. Stimmt.

Dann habe ich die sechs Bilder **angesehen**, und genau dafür hatte ich sie erbeten.

### B-1 — die Bilder „ohne Streifen" tragen auf dem Schreibtisch noch Vorschau-Möblierung

Auf `ohne-streifen-1366x768-es.png` und `…-en.png` steht am **linken Rand**, hochkant, weiterhin
**„⚠ Vista previa, no pública"** bzw. „⚠ Preview, not public".

Das ist der zweite Teil desselben Bauteils: `components/site/environment-ribbon.tsx:39`,
`data-env-marker`, `fixed bottom-6 left-1.5 … hidden md:inline-flex` — also **nur ab 768 px**,
deshalb auf dem Telefon nicht zu sehen. Redesigns Sonde entfernt `[data-env]` und
`[data-preview-switches]`, **nicht** `[data-env-marker]`.

**Für die Zahlen ist das gleichgültig** — das Teil ist `fixed` und nimmt keinen Platz im Fluss. Für
das **Bild** ist es nicht gleichgültig: wer diese Aufnahme als „die freigegebene Seite" ansieht,
sieht eine Marke, die dort nie stehen wird. Bitte beim nächsten Satz Bilder mitentfernen.

### B-2 — der Blick auf den nächsten Abschnitt liest sich am Telefon als Absicht, am Schreibtisch als Unfall

Das ist der Unterschied, den ich meinte, und er fällt **anders aus, als Redesign ihn beschreibt**
(„at 1366 the same with ~130 px … headline fully readable"):

| Größe | was unter der Kante steht | Eindruck |
|---|---|---|
| **390 × 844 ES** | die Schmerzzeile **ganz**: „7 de 25 consultas llegaron con la oficina cerrada. ¿Quién les contestó?" **plus** „Semana de ejemplo · datos ficticios" | **Absicht.** Eine vollständige, lesbare Einheit; der Blick zieht nach unten |
| **1366 × 768 ES** | „7 de 25 consultas llegaron con la" ganz — die **zweite Zeile** („oficina cerrada. ¿Quién les contestó?") ist **waagerecht durchgeschnitten** | **Unfall.** Halbe Buchstaben an der Kante |
| **1366 × 768 EN** | ebenso: „was closed. Who answered them?" durchgeschnitten | **Unfall** |

Eine angeschnittene Zeile Schrift ist etwas anderes als ein angeschnittener Abschnitt. Am Telefon
ist der Blick vollständig und wirkt gewollt; am Schreibtisch steht eine halbierte Großschrift auf
der Kante, und das ist keine Form, die zu „premium" gehört. **Beide Sprachen betroffen.**

Ich melde das als **Gestaltungsbefund zur Entscheidung**, nicht als technischen Mangel: entweder
der nächste Abschnitt beginnt so weit unten, dass gar nichts hineinschaut, oder so weit oben, dass
die **ganze** Zeile steht — wie am Telefon. Dazwischen sieht es nach Versehen aus. Die Regel vom
16.11. („der nächste Abschnitt zeigt sich im ersten Bildschirm") ist in beiden Lösungen erfüllt.

**Am Deployment prüfe ich das am Bild, nicht an der Zahl** — `130 px Blick` ist genau dieselbe Zahl
für „ganze Zeile" und für „halbe Zeile".

### B-3 — zwei Stellen zum Nachmessen, über dem Foto

Auf allen sechs Bildern stehen zwei kleine Texte **auf dem Lichtbild**, nicht auf einer Fläche:
„Ejemplo · datos ficticios" (grau, unter der Aufgabenkarte) und „Estás en una visita · 11:40"
(weiß, unten rechts). Kontrast über einem **Foto** ist der Fall, in dem ein einzelner gerechneter
Wert nichts aussagt — der Untergrund wechselt unter dem Wort. Ich setze beide auf die Messliste für
den Durchgang und rechne sie **über mehrere Punkte**, nicht über einen. Noch kein Befund.

### B-4 — das kurze Telefon ist jetzt dicht, und das ist eine Note, keine Zahl

Auf `ohne-streifen-375x667-en.png` beginnt die Überschrift unmittelbar unter der Kopfzeile
(`padding-top: calc(var(--header-h) + 10px)`), und Überschrift, Vorspann, Nachricht mit
Übersetzungszeile, Aufgabe und Aktion stehen ohne Luft untereinander. Die 4 px sind damit bezahlt —
**mit dem Abstand.** Der Maßstab dieses Vorhabens verlangt „großzügige Abstände" und „am Telefon
muss die Typografie weiterhin hochwertig wirken". Ich melde hier **keinen** Mangel: es ist eng, nicht
falsch, und 375 × 667 ist das kleinste Gerät im Satz. Ich schreibe nur vorher auf, dass das kurze
Telefon in meinen Noten **„Modernität/Premium" und „wenig Text"** anders abschneiden kann als 390,
und dass die Ursache dann diese Kürzung ist — nicht die Gestaltung an sich.

### B-5 — zwei Gerätebreiten aus dem vereinbarten Satz fehlen in der ganzen Tabelle

Der Maßstab (Masterprompt `01270bc`) benennt für das Telefon **390 / 360 / 414**, für den
Schreibtisch **1440 / 1366**. Gemessen wurde bisher bei **375, 390, 1280, 1366, 1440**.

- **360** ist nicht gemessen und ist **schmaler** als 375 — mehr Umbruch, also der härteste Fall.
  Typische Höhe 640, damit **unter** `max-height: 720px`, die Kürzung von `b8bb2bc` greift dort
  also. Ob sie reicht, weiß niemand.
- **414** ist nicht gemessen (typisch 414 × 896, breit und hoch, vermutlich unkritisch).
- **375** steht umgekehrt **nicht** im vereinbarten Satz — es ist über den Tippziel-Maßstab
  hereingekommen und wurde dadurch zur meistbesprochenen Größe des Tages.

Das ist kein Vorwurf: 375 zu messen war richtig. Aber **die Größe, die der Maßstab als Telefon
nennt und die am ehesten durchfällt, ist nicht dabei.** Ich messe 360 × 640 und 414 × 896 im
Durchgang in beiden Sprachen, mit und ohne Streifen. Wenn Redesign sie vor der Benennung mitnimmt,
ist eine etwaige Kürzung eine Zeile statt ein zweiter Durchlauf.

---

## Nachtrag 4 (26.11., spät) — `49410c1` nachgerechnet: die angeschnittene Zeile ist weg, und an ihrer Stelle steht ein leeres Band

Alle vier Punkte sind erledigt und gegen die Belege geprüft (`peek-local-b8bb2bc-plus.json`,
`fold-es-en-local-b8bb2bc-plus-7-windows.json`, der neue Bildersatz):

- **Die angeschnittene Zeile ist auf allen sieben Fenstern fort.** Redesign hat meinen Befund in
  eine Regel überführt — „die Schmerzzeile steht ganz oder unter der Kante, nie angeschnitten" —
  und eine Sonde gebaut, die pro Fenster *whole / under the fold / SLICED* meldet. Das ist die
  richtige Antwort auf einen Befund: nicht der eine Fall behoben, sondern der Fehler unmöglich
  gemacht.
- **Die Vorschau-Marke ist aus den Bildern verschwunden** (`ohne-streifen-1366x768-es.png` geprüft).
- **360 und 414 sind gemessen.** 414 × 896 ist auf das Pixel 390. 

### Die Zahlen, geprüft

| Größe | ohne Streifen: Aufgabe · Aktion | Schmerzzeile |
|---|---|---|
| 360 × 640 ES | +135 · **+45** | unter der Kante |
| **360 × 640 EN** | **+54 · −36** | unter der Kante |
| 375 × 667 ES / EN | +170 · +80 / +100 · +10 | unter der Kante |
| 390 × 844 ES / EN | +284 · +192 | **ganz** |
| 414 × 896 ES / EN | +284 · +192 | **ganz** |
| 1280 / 1366 / 1440 | +117…+168 · +117…+168 | unter der Kante |

**Das Notenkriterium („die fertige Aufgabe im ersten Bildschirm") ist auf allen sieben Fenstern und
in beiden Sprachen erfüllt**, auch bei 360 × 640 EN (+54). Dort bleibt allein die Aktion 36 px
darunter. Redesign hat dafür bewusst **nicht** weiter gekürzt, mit Verweis auf meine eigene
Dichte-Notiz — das ist folgerichtig, und ich widerspreche nicht. Ich melde es am Deployment als Zahl
mit Bild.

### B-6 — die angeschnittene Zeile ist durch ein **leeres Band** ersetzt, und das steht auf Redesigns eigener Mängelliste

So endet der erste Bildschirm jetzt — **drei verschiedene Arten je nach Gerät**:

| Gerät | was unten steht |
|---|---|
| 390 · 414 | die Schmerzzeile **ganz**, mit Unterzeile — der Blick wird nach unten gezogen |
| 1280 · 1366 · 1440 | **117–128 px helles Sandband, leer** — kein Wort darin |
| 360 · 375 | nichts; der Hero reicht bis an die Kante (bei 360 ES 7 px darüber hinaus) |

Auf `ohne-streifen-1366x768-es.png` ist es deutlich: unter der sauber endenden Hero-Kante liegt ein
breiter heller Streifen ohne Inhalt. Die Regel vom 16.11. („der nächste Abschnitt zeigt sich im
ersten Bildschirm") ist damit **dem Wortlaut nach** erfüllt und **der Sache nach** nicht — sichtbar
ist der Hintergrund des Abschnitts, nicht der Abschnitt.

**Und es ist derselbe Mangel, den dieselbe Bahn in diesem Bau behoben hat.** Im E2-Dokument,
Abschnitt 2, Zeile „Cómo funciona": *„no blank band after it"* — Begründung: *„duplicate product
views, **a blank band on the desktop**"*. Ein leeres Band auf dem Schreibtisch war dort ein Grund
zum Umbauen; hier entsteht es neu.

**Ich melde das als Gestaltungsbefund zur Entscheidung, nicht als technischen Mangel** — und
ausdrücklich nicht als Rückschritt: die angeschnittene Zeile war schlechter. Aber die beste der drei
Formen steht bereits im Bau, nämlich die am Telefon. Platz dafür ist auf dem Schreibtisch
rechnerisch da: bei 1366 ES endet der Hero bei 640, die Zeile braucht 86 px, die Kante liegt bei
768 — es sind 128 px Bandluft, die sie hinausschieben, nicht der Platz. Bei 1280 ebenso; bei 1440 EN
(Hero 783) wird es eng. **Die Form entscheidet der Owner am Bild, nicht ich an der Zahl.**

### Eine Verschiebung, die nicht genannt wurde

**375 × 667 ES** ist von +181 · +91 auf **+170 · +80** gefallen (11 px), als Nebenwirkung der
Hero-Änderung auf dem kurzen Telefon. Harmlos — 80 px Luft sind reichlich —, aber die Zahl hat sich
bewegt und stand nicht in der Nachricht. Die Änderung bei 1440 × 900 ES (74 → 66 mit Streifen) hatte
Redesign von sich aus gemeldet.

### Stand

Weiterhin **nichts davon von mir gemessen**. Sieben Fenster, zwei Sprachen, mit und ohne Möblierung,
plus die Schmerzzeilen-Regel gehen in meinen Durchgang ein, sobald der Owner freigibt und Redesign
genau einen Commit benennt. Der Alias liefert `bea7d19` / `dpl_H6WfQ1GK…`.
