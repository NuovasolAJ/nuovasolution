# RV6 — der eine vollständige Durchgang auf dem benannten Kandidaten · 27.11.2026

**Gemessen wurde erst nach der Preview-Freigabe des Owners, genau der Kandidaten-Commit, den Redesign benannt hat, anhand der Deployment-Kennung.** Diese Bedingung war erfüllt: Owner-Zeile „E2-VORSCHAU = JA" (27.11.), ein Push, ein benannter Commit.

## Bau-Bindung

| | |
|---|---|
| Commit | `dbd14d8178dcf67a8a86f2e293b790fcad2f1fdc` |
| Deployment | `dpl_Aap3q2WQn2tDU84Rq5xFQuHoZSY1` |
| `/api/build` | `env: preview`, `mode: stub` |
| Erreichbarkeit | 200 ohne SSO-Schranke |
| Bau-Bindung | **bei jeder einzelnen Sonde am Anfang UND am Ende geprüft, in allen Läufen identisch.** Keine Zahl ist VOID. |

Inhalt des Kandidaten: der Website-Stand liegt in `54775b8` auf `4e2aed5`; `dbd14d8` fügt nur Abschnitt 8 des Kandidaten-Dokuments hinzu.

**Verfahrensnotiz.** Das Deployment hat sich während meines Durchgangs nicht bewegt — das Repository schon: `52ed2a0`, `f8d39dc`, `f85fdd0` (ein neuer, ausdrücklich nicht gepushter „Luxus-Rundgang"-Prototyp) sind nach dem Kandidaten entstanden. Redesigns Wort „Nothing changes on the build until you have measured" ist damit gehalten. Aber **jede Quellzeile unten ist aus `dbd14d8` zitiert, nicht aus dem Arbeitsbaum** — ich habe das zunächst verwechselt und korrigiert, siehe §6.

---

## 1. Erster Bildschirm — das Notenkriterium des Owners

Restluft in Pixeln bis zur Falz. Positiv = die Unterkante liegt über der Falz. **Die Note fällt auf die Zahl OHNE die Vorschau-Möblierung** (ein freigegebener Bau liefert davon 0 px); die Zahl MIT ihr steht an jedem Fenster daneben, weil der Owner das in der Vorschau sieht.

### Ohne Möblierung — das, was öffentlich ausgeliefert wird

| Fenster | Aufgabe ES | Aktion ES | Aufgabe EN | Aktion EN |
|---|---|---|---|---|
| 360 × 640 | +90 | **0** | +64 | **−26** |
| 375 × 667 | +142 | +52 | +110 | +20 |
| 390 × 844 | +284 | +192 | +284 | +192 |
| 414 × 896 | +284 | +192 | +284 | +192 |
| 1280 × 720 | +225 | +131 | +182 | +88 |
| 1366 × 768 | +273 | +179 | +230 | +136 |
| 1440 × 900 | +255 | +161 | +250 | +156 |

### Mit Möblierung — die Vorschau, die der Owner sieht

| Fenster | Möbel | Aufgabe ES | Aktion ES | Aufgabe EN | Aktion EN |
|---|---|---|---|---|---|
| 360 × 640 | 152 px | −62 | −152 | −88 | −178 |
| 375 × 667 | 152 px | −10 | −100 | −42 | −132 |
| 390 × 844 | 152 px | +132 | +40 | +132 | +40 |
| 414 × 896 | 152 px | +132 | +40 | +132 | +40 |
| 1280 × 720 | 93,5 px | +132 | +38 | +89 | **−5** |
| 1366 × 768 | 93,5 px | +180 | +86 | +137 | +43 |
| 1440 × 900 | 93,5 px | +161 | +67 | +156 | +62 |

**Ergebnis: die fertige Aufgabe steht auf allen sieben Fenstern und in beiden Sprachen im ersten Bildschirm, kleinste Restluft +64 px (360 EN). Das Notenkriterium des Owners ist erfüllt.**

Zur Hauptaktion: unter die Falz geht sie nur bei 360 EN (−26). Die englischen Kleintelefon-Kanten hat der Owner für E2 angenommen. **Ich benenne trotzdem 360 ES mit genau 0:** die Unterkante liegt exakt auf der Falz, ohne einen Pixel Reserve — und das ist keine englische Kante, das ist die Hauptmarktsprache.

Alle 14 Zeilen sind sauber: die Verschiebung beim Entfernen der beiden Vorschau-Streifen beträgt in **jeder** Zeile genau die gemessene Möbelhöhe (93,5 px unverrundet auf dem Desktop, 152 px auf dem Telefon). Meine Zahlen reproduzieren Redesigns Zahlen in allen 14 Zeilen exakt.

---

## 2. Die sechs Punkte des Owners vom 27.11.

| # | Punkt | Befund |
|---|---|---|
| 1 | Hero-Text vom 17.11. unverändert | **erfüllt.** h1 und Unterzeile Zeichen für Zeichen in ES und EN; „re-engages **past** contacts" steht. |
| 2 | Scroll-Hinweis, 44 px, tastaturerreichbar, zu `#pain` | **teilweise.** Siehe E-5 und E-6. |
| 3 | Foto C, Drift bleibt, kein Film, Schatten nur hinter den Worten | **erfüllt.** `data-hf-photo="pexels-35419464"`, vier WebP-Breiten (960/1280/1920/2560), `fetchPriority=high`, **keine Video-Ebene**, `hf-drift 24s`, Schatten als 90°-Verlauf bis `0` bei 84 %. |
| 4 | Beide WhatsApp-Köpfe neutral, Marke im Kanalgrün | **teilweise.** Zwei von drei Stellen neutral. Siehe E-4. |
| 5 | Die Titel, keine Uhrzeit in einem Titel | **erfüllt.** Siehe unten. |
| 6 | Gestapelte Aufgaben, kompakter Bericht unverändert | **erfüllt.** Vier gestapelte Karten (`position: sticky`), je ein Nachweis (chat/record/match/day); Bericht drei Karten, `data-report-cards="3"` = gezählt 3. |

**Zu Punkt 4, gemessen:** erster Schirm `.hf-scene-label` → `rgb(240,242,245)` / Schrift `rgb(14,14,15)` / Marke `rgb(37,211,102)` ✓ · Demo `.demo-chat-head` → `rgb(240,242,245)` / `rgb(14,14,15)` / `rgb(37,211,102)` ✓ · Agentur-Nachweis `.at-chat-head` → **`rgb(18,140,126)`, Schrift weiß** ✗.

**Zu Punkt 5, gemessen:** Hero-Karte „TAREA PARA MARTA / Devolver la llamada por el piso de Nerja" bzw. „TASK FOR MARTA / Return the call about the flat in Nerja" ✓ · Demo-Ende „Llamar a Mila por el piso de Nerja" / „Call Mila about the flat in Nerja" ✓ · **keine Uhrzeit in irgendeinem Titel**, in beiden Sprachen ✓ · die 17:00 steht da, wo sie hingehört: in Milas Zug 3 („Mejor esta tarde, a partir de las 17:00") und auf ihrer Ficha unter PIDE / ASKS FOR („Que la llamen, hoy a partir de las 17:00" / „A call, today from 5 pm") ✓.

---

## 3. Befunde

### E-1 · Die Bildunterschrift ist auf dem Desktop praktisch unlesbar, auf dem Telefon steht sie unter der Kopfleiste
**schwer.** `.hf-mark` „Estás en una visita · 11:40" ist in `dbd14d8` `rgba(248,246,241,0.72)` **ohne jeden eigenen Hintergrund** (`globals.css:680`; eine Kapsel gibt es im Kandidaten nicht).

Gemessen auf echten zusammengesetzten Pixeln, Möblierung entfernt, vier Phasen der 24-s-Drift:

| Fenster | Hintergrund hinter der Schrift | schlechtester Pixel | Median | Anteil unter 4,5:1 |
|---|---|---|---|---|
| 1366 × 768 | `[203,192,177]` — der helle Boden des Fotos | **1,31** | 1,43 | **100 %** |
| 390 × 844 | `[234,234,235]` — die **feste Kopfleiste** | **1,00** | 1,09 | 98 % |
| 360 × 640 | `[234,234,235]` — die feste Kopfleiste | **1,00** | 1,09 | 98 % |

Auf dem Telefon setzt `globals.css:1688` die Unterschrift auf `top: 14px`, also direkt unter die mitlaufende Kopfleiste; `elementsFromPoint` zeigt die Leiste über ihr. Ein Verhältnis von 1,0 heißt: nicht vom Untergrund zu unterscheiden.

### E-2 · Die Überschrift hat auf dem Desktop Stellen unter 3:1
**mittel.** h1 bei 1366: schlechtester Pixel **2,29**, Median 7,67. Große Schrift braucht nach AA 3,0. Die rechte Hälfte der Zeile läuft über die helle Wand. Auf den Telefonen ist h1 unauffällig (schlechtester Pixel 5,57–5,81).

### E-3 · Die Beispiel-Marke im Hero ist auf dem Desktop grenzwertig
**leicht.** `.hf-scene-mark` „Ejemplo · datos ficticios", `rgba(248,246,241,0.62)`, 12 px: bei 1366 schlechtester Pixel **3,86**, 15–20 % der Fläche unter 4,5:1. Auf 390/360 sauber (0 % unter 4,5). 12-px-Schrift braucht nach AA 4,5.

### E-4 · Der dritte WhatsApp-Kopf ist nicht neutral geworden
**mittel.** `.at-chat-head` bleibt `rgb(18,140,126)` mit weißer Schrift. Die neutrale Regel in `globals.css:2206` **nennt den Selektor ausdrücklich** — aber `globals.css:2248` setzt 42 Zeilen später bei gleicher Spezifität wieder `background: var(--channel-whatsapp-chrome); color: #fff`, und die spätere Regel gewinnt. Die Absicht war also da, sie ist nicht angekommen. Nebeneffekt: `:2207` (`.at-chat-head svg`) hat höhere Spezifität und bleibt grün — **grüne Marke auf teal**, genau die Kombination, die Punkt 4 wegnehmen sollte.

### E-5 · Der neue Scroll-Hinweis ist 40 × 40 — und zwar auf genau den Telefonen, auf denen er überhaupt erscheint
**mittel.** `globals.css:2217` zeigt den Hinweis nur bei `min-width: 1024px` **oder** `(max-width: 639px) and (max-height: 720px)`; `:2218` setzt ihn in diesem zweiten Fall auf `width: 40px; height: 40px`.

| Fenster | gezeigt | Größe |
|---|---|---|
| 360 × 640 | ja | **40 × 40** |
| 375 × 667 | ja | **40 × 40** |
| 390 × 844 | nein | — |
| 414 × 896 | nein | — |
| 1280 / 1366 / 1440 | ja | 44 × 44 |

Die Logik „nur da, wo der Hero in die Falz läuft" stimmt und deckt sich mit der Falz-Tabelle. Aber **jedes Telefon, das den Hinweis sieht, sieht einen zu kleinen** — unter der 44-px-Schwelle des Owners. Meine Tippziel-Sonde findet ihn unabhängig an denselben zwei Breiten wieder.

### E-6 · Bei 360 liegt der Hinweis selbst unter der Falz
**mittel.** Unterkante 686 px gegen 640 px Fenster — **46 px unter der Falz, auch ohne Möblierung**, also auch im freigegebenen Bau. Das eine Telefon, auf dem der erste Bildschirm am engsten ist, ist damit das eine, auf dem der Hinweis nicht zu sehen ist. (Bei 375: Unterkante 661 gegen 667, 6 px Luft — drin.)

### E-7 · Beobachtung, kein Mangel
Bei 390 und 414 ist der Hinweis bewusst aus — dort hat der erste Bildschirm also gar keinen Hinweis auf das Weiterlesen. Das folgt der Entscheidung des Owners („gezeigt, wo der Hero in die Falz läuft") und ist seine Entscheidung, nicht mein Befund. Ich nenne es, weil 390 die häufigste Telefonbreite ist.

### Zum Stand dieser Befunde
**E-1, E-2, E-3 und E-4 sind im nicht gepushten `52ed2a0` / `f8d39dc` bereits behoben** — Redesign hat sie am Rundgang-Prototyp unabhängig selbst gefunden (Commit-Text: „the caption gets a dark capsule (contrast measured on photo C), the agency-task WhatsApp head is neutral too (its own rule came later in the file)", „the caption capsule at 0.7 (6.9:1 over a white pixel)"). **Im benannten Kandidaten sind sie nicht.** Wer `dbd14d8` annimmt, nimmt sie mit an.

---

## 4. Was geprüft ist und hält

| Prüfung | Ergebnis |
|---|---|
| **R-12, Erwartung umgedreht** | **erfüllt.** Ohne jede Berührung: beim Hereinscrollen springt `run` 0 → 1, die Phase läuft auf 12, `done=true` bei +10 s und **hält** bis +14 s — kein zweiter Lauf. Die Schleife von `bea7d19` ist weg. In ES und EN identisch. |
| R-12, vorbeigescrollt | **erfüllt.** Wer in einem Sprung vorbeiscrollt, löst keinen halben Lauf aus (`run=0`, `entered=not-yet`); kommt er zurück, steht der **Endzustand** (`entered=end`, Phase 12). Über den Hero-Knopf und über `/es/#demo` direkt steht das Ende sofort. |
| R-12, reduzierte Bewegung | **erfüllt.** `auto=false`, Phase 12, Endzustand sofort, nichts bewegt sich, nichts läuft. |
| **`{plan}`-Matrix** | **erfüllt, 10 von 10.** `contratar` × {essential, growth, enterprise, ohne Plan, **ungültiger Plan**} × ES/EN. Nirgends ein wörtliches `{plan}`. Überschrift „Contratar Growth" / „Contratar un plan" / „Hire a plan"; Betreff „Contratar Essential" / „Request the Growth plan"; **Schritt 3** „…preparamos Growth contigo" / „…preparamos tu plan contigo" / „…we set up your plan with you". Ein ungültiger Plan verhält sich genau wie kein Plan — sauberer Rückfall, kein Leck. |
| **Die vier Bestätigungen** | **erfüllt.** Alle vier Wege (trial, demo, talk, contratar) bis zur Bestätigung gegangen, je drei Schritte, jede Bestätigung passt zu ihrem Weg. In jeder steht „Vista previa: esta solicitud no se ha enviado a nadie." Testadressen nur zustellbar, Honeypot leer geprüft. |
| **Sprachwechsel mitten im Formular** | **erfüllt, 3 von 3.** Weg, Plan und das vom Besucher Getippte überleben; der Betreff wechselt in die neue Sprache. |
| **R-9 Restkante** | **geschlossen, 4 von 4.** Notiz **über** und **unter** dem Vorbefüllten, Sprachwechsel und Wegwechsel: die Notiz überlebt immer, ein fremder Betreff reist nie mit. |
| **Echte Tabulatorfolge / R-13** | **erfüllt.** 390: Sprunglink zuerst, **0 Halte auf Elementen ohne Größe**, die freie Probe nach 6 Anschlägen. 1366: der Hinweis nach 14 Anschlägen, `:focus-visible` sichtbar, Enter landet auf `#pain` (`painTop=96`, Abschnitt im Bild). |
| **Tippziele 360 / 375 / 390** | **ein echter Befund** (E-5). Zwei weitere Treffer sind Fehlalarme meiner eigenen Sonde, siehe §6. |
| Tastatur-Probe-Link | korrekt gebaut: 1 × 1 und abgeschnitten im Ruhezustand, **328 × 44 bei Fokus**, danach wieder 1 × 1. |

---

## 5. Register — der Hero-Satz als öffentliches Versprechen (V-1)

Neu aufgebaut, weil die Lückenliste `de152f8` an `bea7d19` hängt und sich E2 samt Hero-Text darunter bewegt hat. Die neun Schlüssel des Hero (`brief-1120.ts:36`, `satisfies ClaimKey[]`) gegen Audits Register:

| Schlüssel | Zeile | Klasse |
|---|---|---|
| `replyEmail` | 1 | **belegt** (eigene Agentur) |
| `priorityWithReason` | 12 | **belegt** (eigene Agentur) |
| `replyWhatsapp` | 3 | Bau — nur für `nuovasolution`s eigene Nummer, nicht für eine Kundenagentur |
| `whatsappOwnNumber` | 4 | Bau oder externe Freigabe · Owner-Ausnahme |
| `adsLeads` | 10 | Bau · Meta-Teil Ausnahme Meta |
| `matching` | 26 | Bau — `pm_certified = false` |
| `followup` | 27 | Bau · Ausnahme Anwalt — Prod-Sender inaktiv |
| `reportTrend` | 30 | Bau — erweiterte Stufe leer |
| `instagram` | 33 | externe Freigabe · Ausnahme Meta — nie bei Meta veröffentlicht |

**Zwei von neun belegt, sechs Bau, einer externe Freigabe.** Auf die sechs Aussagen des Satzes gelegt:

- „**capta clientes**" — `adsLeads` (Bau) + `instagram` (externe Meta-Freigabe, nie veröffentlicht). **Nichts belegt.**
- „responde consultas" — `replyEmail` belegt, aber nur für die eigene Agentur; für die Nummer einer Kundenagentur Bau.
- „hace seguimiento" — Bau, Prod-Sender inaktiv, hängt am Anwalt.
- „Reactiva contactos" — `matching` + `followup`, beide Bau.
- „propone inmuebles" — Bau, `pm_certified = false`.
- „te muestra qué merece tu atención" — `reportTrend` Bau, `priorityWithReason` belegt.

**Und der Satz ist öffentlich derselbe.** `lib/claims.ts:91` im Kandidaten: `live()` wertet die Ansicht gar nicht aus — „no gate — every function is shown as the finished product". Auf dem Deployment gemessen: `/es/` und `/es/?view=public` liefern die Unterzeile zeichengleich, und nirgends steht ein „Próximamente". Nach Audits Regel vom 23.11. — „Jede gerenderte Aussage ist damit ein öffentliches Versprechen" — trägt die öffentliche Seite damit sechs Aussagen, von denen das Register eineinhalb deckt.

**V-1 bleibt offen und liegt bei Audit und beim Owner.** Es ist keine Messung, die ich entscheiden kann, und ich entscheide sie nicht. Der Bericht selbst ist sauber deklariert („Agencia de ejemplo · Demo con datos ficticios", „Datos de ejemplo"), und Karte 3 sagt ausdrücklich, dass der Bericht die Anzeigenkosten **nicht** misst — das ist eine ehrliche Einschränkung, keine Lücke.

---

## 6. Meine eigenen Fehler in diesem Durchgang

Vollständig, weil ein Prüfer, der seine Irrtümer verschweigt, nicht prüfbar ist.

1. **Die 1-px-Plausibilitätsregel war zu streng.** Vier Desktop-Zeilen fielen auf „unplausibel", weil die Verschiebung 93 und die Möbelhöhe 94 ergab. Unverrundet: beides **exakt 93,5**. Rundung, kein Mangel.
2. **Mein erstes Kontrast-Instrument war falsch.** Ein zugeschnittener `Page.captureScreenshot` über einem Element mit `backdrop-filter` gab eine fast weiße Fläche zurück → Verhältnis 1,06 für eine Unterschrift, die man sieht. Eine unmögliche Zahl heißt: das Instrument ist kaputt, nicht die Seite. Neu gebaut (ganzer Bildschirm, Zuschnitt in der Seite) und mit Kontrollen belegt (Fließtext 17,88).
3. **Meine zweite „Kontrolle" war keine.** Ich hatte `.hf-lead` als Weiß-auf-Fläche-Kontrolle gesetzt — die Zeile steht selbst auf dem Foto. Meine Schwelle ≥ 7 war mein Fehler, nicht der der Seite.
4. **Ich habe die Quelle mit dem Arbeitsbaum verwechselt.** Ich hätte um ein Haar Regeln aus `52ed2a0` als Beleg gegen `dbd14d8` zitiert. Jede Zeile in diesem Bericht ist jetzt aus `git show dbd14d8:` geholt.
5. **`bodyKeeps1700` hat nichts verglichen.** Mein Suchmuster fand die Öffnungszeiten der Beispielagentur („17:00 a 20:00"), nicht Milas Ficha — und auf Englisch heißt es ohnehin „from 5 pm". Eine Prüfung, die nichts verglichen hat, ist nie ein Bestanden; neu gemessen an der richtigen Stelle.
6. **„Tarea para Marta nicht gefunden" war ein Groß-/Kleinschreibungsfehler meines Vergleichs** — die Zeile steht da, CSS setzt sie in Versalien.
7. **„328 × 44 im Ruhezustand" war falsch abgelesen** — ich hatte das Element gemessen, während es noch Fokus hatte. Sauber getrennt: 1 × 1 → 328 × 44 bei Fokus → 1 × 1.
8. **Zwei meiner drei Tippziel-Treffer sind Fehlalarme meiner Sonde:** der abgeschnittene Tastaturlink (kein Zeigerziel, bei Fokus 44 px) und das Honeypot-Feld `name="web"` (`tabindex="-1"`, `aria-hidden="true"`). Ich zähle sie nicht als Befunde.
9. **Die Register-Suche mit „erster Treffer" hat wieder zugeschlagen** — bei `instagram`, `followup` und `matching` landete ich zuerst auf den W-Fragen zur Paketzuordnung statt auf den Anspruchszeilen. Derselbe Fehlertyp wie „telefónico" und „reactiv". Alle Zeilen pro Schlüssel nachgezogen.

---

## 7. Was ich nicht gemessen habe

- **Lighthouse** auf dieser Kennung — steht noch aus.
- Die Kontrast-Kontrolle lag bei 1366 und 360 nicht vollständig im Bild; das Verfahren ist bei 390 belegt (17,88), die Werte der drei Fenster sind untereinander stimmig. Für 1366 und 360 stützt sich die Gültigkeit auf diese Belegung, nicht auf eine eigene Kontrolle im selben Bild.
- Die drei Berichtskarten habe ich auf Inhalt und Zahl geprüft, nicht gegen eine Datenquelle — sie sind als Beispieldaten deklariert.

---

## Urteil

**Das Notenkriterium des Owners ist erfüllt:** die fertige Aufgabe steht auf allen sieben Fenstern und in beiden Sprachen im ersten Bildschirm.

Von den sechs Punkten des Owners sind **vier vollständig erfüllt** (1, 3, 5, 6), **zwei nur teilweise**: Punkt 2 (der Hinweis ist auf den Telefonen 40 statt 44 px und bei 360 selbst unter der Falz) und Punkt 4 (der dritte WhatsApp-Kopf ist teal geblieben).

Die Funktionsprüfungen sind durchweg sauber: R-12 vollständig, die `{plan}`-Matrix in allen zehn Zuständen, die vier Bestätigungen, der Sprachwechsel mitten im Formular, R-9 geschlossen, die Tabulatorfolge ohne einen einzigen Halt auf Nichts.

**Was einer Freigabe im Weg steht, ist der Kontrast.** E-1 ist kein Schönheitsfehler: die Bildunterschrift steht auf dem Desktop bei 1,31:1 auf dem hellen Boden und auf dem Telefon bei 1,0:1 unter der Kopfleiste — sie ist dort nicht lesbar. Dazu E-2 (Überschrift 2,29:1 bei 1366) und E-3. Für eine Seite, die „premium, ruhig, vertrauenswürdig" sein soll, ist unlesbare Schrift auf dem ersten Bildschirm der teuerste Fehler von allen.

**Diese vier Befunde sind bereits behoben — nur nicht in diesem Commit.** Mein Vorschlag an den Owner: nicht `dbd14d8` abnehmen, sondern Redesign einen Commit benennen lassen, der E-1 bis E-4 mitbringt, plus die 44 px aus E-5. Dann messe ich genau diese fünf Punkte nach — das ist ein kurzer Lauf, kein zweiter Durchgang; alles andere oben steht.

**V-1 bleibt offen und gehört Audit und dem Owner.**

---

*Belege, alle auf `dbd14d8` / `dpl_Aap3q2WQn2tDU84Rq5xFQuHoZSY1`, Bau-Bindung am Anfang und am Ende jeder Datei:*

*Erster Bildschirm `checks/falz-dbd14d8-1127.json` · die sechs Punkte `checks/sechs-dbd14d8-1127.json` · Nachzug `checks/nach-dbd14d8-1127.json` · Bericht und Ficha `checks/rest-dbd14d8-1127.json` · Matrix und Bestätigungen `checks/matrix-dbd14d8-1127.json` · Kontrast `checks/kontrast-c-dbd14d8-1127.json` (gültig), daneben `kontrast-dbd14d8-1127.json` und `kontrast-b-dbd14d8-1127.json` (meine beiden fehlerhaften Instrumente, absichtlich aufbewahrt) · Tippziele `checks/tippziele-dbd14d8-es-{360,375,390}.json` · Wege und Formulare `checks/wege-dbd14d8-es-390.json` · Sprachwechsel `checks/sprach-dbd14d8-es.json` · R-9 `checks/r9kante-es-390.json` · R-12 `checks/autorun-es-390.json`, `checks/autorun-en-390.json` · Tabulatorfolge `checks/tabreal-es-390.json`.*

*Neue Sonden: `checks/falz1127.mjs`, `sechs1127.mjs`, `nach1127.mjs`, `rest1127.mjs`, `matrix1127.mjs`, `kontrast1127{,b,c}.mjs` — die ersten beiden Kontrast-Sonden bleiben liegen, damit der Instrumentenfehler nachvollziehbar ist. Wiederverwendet: `autorun1123.mjs`, `tippziele1123.mjs`, `tabreal1123.mjs`, `wege1123.mjs`, `sprachmitten1123.mjs`, `r9kante1123.mjs`.*
