# F22 — Vormessung vor der Zwischenschau 3 · Mo 16.11.2026, vormittags · Reviewer

**Auftrag:** Owner-Zeile vom 16.11.: F22 zusätzlich prüfen und benoten — (a) erster Bildschirm bei
1366 × 768 und 1440 × 900, (b) Planes-Zeile „teléfono" mit Haken, (c) Kontrast der Hero-Unterzeile
am Handy 390, (d) Regler 0 px bei 360/390/414/1366/1440 auf `18812cc`. Grundlage
`governance/FEHLERLISTE_PROD_1113_v1.md` (`9f7f2b19`), Abschlussregel je Zeile.

**Wichtig zur Einordnung:** `18812cc` ist **nicht erreichbar**. Die einzige Vorschau, die ich mit
dem Bypass-Header öffnen kann, liefert `/api/build` → `cdc8d04fdaf19ab234dff6e5185e8690f293956c`,
`dpl_Azqb5v4zQpsCJpLP3cvQeAWZ797Z`. Das ist der Stand **vor** dem Regler-Fix. Alles unten ist
deshalb **Vormessung auf `cdc8d04`**, nicht die Note. Die Note folgt auf dem benannten Build, den
Redesign um 14:15 nennt. Ich habe Redesign um die Adresse gebeten.

**Methode:** Edge headless über CDP, Bypass-Header aus `.nuova-secrets` (steht in keinem Bericht
und in keinem Log), Sicht `target`, jede Seite vor dem Messen durchgescrollt und zurück
(`content-visibility`). Belege in `checks/`, Bilder in `shots/`.

---

## (a) Erster Bildschirm — die Beanstandung stimmt, die Ursache ist eine andere

**Mit Vorschau-Möblierung** (Hinweisband + Schalterleiste, wie der Owner es sieht), Sicht `target`:

| Fenster | Knopf | Pilot-Zeile | Glas-Karte (Hero-Bubble) | Anschnitt Demo |
|---|---|---|---|---|
| 1366 × 768 | ganz sichtbar | **34 px abgeschnitten** | 34 px abgeschnitten | 0 px |
| 1366 × 625 (echter Laptop mit Browserleiste) | **13 px abgeschnitten** | **74 px abgeschnitten** | 74 px | 0 px |
| 1440 × 900 | ganz sichtbar | **4 px abgeschnitten** | 4 px | 0 px |
| 1440 × 757 | ganz sichtbar | **34 px abgeschnitten** | 34 px | 0 px |

**Ohne Vorschau-Möblierung** — dieselbe Seite, Hinweisband und Schalterleiste ausgeblendet. Das ist
der erste Bildschirm, den der öffentliche Build zeigt, und nach meiner Regel D-1 zählt die
Möblierung nicht mit:

| Fenster | Möblierung | h1 beginnt bei | Knopf | Pilot-Zeile | Anschnitt Demo |
|---|---|---|---|---|---|
| 1366 × 768 | 82 px | y = 305 | ganz | ganz | **24 px** |
| 1366 × 625 | 82 px | y = 203 | ganz | ganz | **0 px** |
| 1440 × 900 | 82 px | y = 349 | ganz | ganz | **24 px** |
| 1440 × 757 | 82 px | y = 294 | ganz | ganz | **24 px** |
| 390 × 844 | 144 px | y = 221 | ganz | ganz | **118 px** |
| 390 × 664 (Safari mit Leisten) | 144 px | y = 211 | ganz | ganz | **0 px** |

**Ergebnis (a), zwei getrennte Sachen:**

1. **Nichts am Layout ist abgeschnitten.** Knopf und Pilot-Zeile stehen bei jeder der sechs Größen
   vollständig. Was der Owner gesehen hat, schneidet die **Vorschau-Möblierung** ab: 82 px am
   Desktop, 144 px am Handy. Das ist echt für den, der die Vorschau ansieht, aber es ist **kein
   Baufehler der Seite**. Der Fix gehört an die Möblierung (niedriger, oder die Schalterleiste
   eingeklappt), nicht an den Hero. Bilder: `shots/F22a-preview-1366x768-pilotline-cut.png` gegen
   `shots/F22a-without-preview-furniture-1366x768.png`.
2. **Der Anschnitt der Demo reißt die Bedingung.** D-1 verlangt **≥ 120 px** der nächsten Sektion
   im ersten Bildschirm. Gemessen: 24 px am Desktop, 118 px bei 390 × 844, **0 px** bei 1366 × 625
   und bei 390 × 664. Das ist ein echter Befund und gilt auch ohne Möblierung.
3. Nebenbefund, positiv: h1 beginnt bei 1366 bei **y = 305** gegen **409** auf `fdffcf4`. Die
   Regression-Zeile „nicht tiefer als 409" ist eingehalten.

---

## (b) „teléfono" mit Haken — es gibt keine solche Zeile, und trotzdem stimmt die Beobachtung

Gemessen auf `/es/packages` und `/es`, beide Sichten, über die Marker `data-plan-row` und
`data-plan-cell`:

- **Eine eigene Zeile „teléfono" existiert nicht.** `planRowShown` in `lib/claims.ts` blendet
  `phoneAssistant` in **beiden** Sichten aus, solange der Schlüssel nicht `included` ist. Die
  E2-Entscheidung des Owners vom 07.11. wirkt also.
- **Der Haken, den der Owner gesehen hat, steht in der ersten Zeile.** In der Zielsicht lautet ihr
  Text: „Respuestas en español por WhatsApp, email, formulario web, **teléfono** y portales y
  anuncios" — mit drei Haken („En este plan") in allen drei Plänen. In der öffentlichen Sicht
  heißt dieselbe Zeile korrekt „… por WhatsApp y email".
- Zielsicht 15 Zeilen, öffentliche Sicht 6 Zeilen. Beleg `checks/f22-cdc8d04.json`, Abschnitt
  `plans`.

**Antwort auf die Frage „zählt das nach deinen Regeln?" — ja, es zählt, und zwar als Befund:**

- Nach D-5 darf die **Zielsicht** den Zielzustand zeigen, und die Seite trägt den Hinweis oben.
  Formal ist die Zeile dort also erlaubt.
- **Aber** die Kanalliste schmuggelt genau die Zusage zurück, die E2 aus der Tabelle verbannt hat:
  Ein Haken in einer Planspalte liest sich als „Telefon ist in diesem Plan enthalten". Ein
  ausgeblendeter Zeilenkopf nützt nichts, wenn dasselbe Wort mit demselben Haken eine Zeile höher
  steht. Für die Benotung (Seriosität, Produktdarstellung) kostet das Punkte, weil der Besucher
  eine Leistung angehakt sieht, die F24 gerade als durchgefallen führt (Voice EN/DE 2/5 und 1/5).
- **Was ich verlange:** In der Planstabelle nennt die Kanalzeile nur die Kanäle, deren Schlüssel in
  der jeweiligen Sicht lebt — in der Zielsicht mit sichtbarer Kennzeichnung, dass Telefon noch
  nicht angeboten wird, oder ohne Telefon. Ein Haken ohne Einschränkung geht nicht.
- **Öffentlich ist nichts Falsches.** Die Zeile nennt dort nur WhatsApp und email.

### Dazu gefunden, derselbe Punkt an anderer Stelle

`/es/faq` **Zielsicht**: „¿Atiende llamadas de teléfono? — **Sí.** El asistente telefónico atiende
la llamada …" und „En el teléfono, tu horario dirige el asistente." Das steht gegen
`lib/content/capabilities.ts` („Llamadas. Todavía no se ofrece", „Voz: … a la espera de las
puertas") und gegen F24. Innerhalb **einer** Sicht sagen zwei Seiten das Gegenteil. Öffentlich ist
die Frage korrekt ausgeblendet (Schlüssel `phoneAssistant`).

---

## (c) Kontrast der Hero-Unterzeile am Handy 390 — fällt durch, mit klarer Ursache

**Messweise:** zwei Aufnahmen derselben Stelle, eine mit und eine ohne die Zeile; der Grund wird aus
der Aufnahme **ohne** Text gelesen, die Eigen-Deckkraft der Schrift (0,9) wird über jeden
Grundpixel gerechnet, dann WCAG 2.1 je Pixel der Zeilenfläche.

- Schrift: `rgba(248, 246, 241, 0.9)`, **17,8 px**, Gewicht 400, **kein** `text-shadow` → AA
  verlangt **4,5 : 1**.
- Hinter der Zeile liegt **keine Karte**: `.hf-words` hat `background: rgba(0,0,0,0)`, kein
  `backdrop-filter`, kein `::before`, keinen Schatten — bei 390 **und** bei 1366. Die einzige
  Abdunklung ist der Verlauf `.hf-shade` über dem ganzen Hero.

| Fläche der Zeile | Wert |
|---|---|
| schlechtester Punkt | **2,37 : 1** |
| 5 % der Fläche schlechter als | 2,98 : 1 |
| Mittelwert (Median) | 6,21 : 1 |
| **Fläche unter AA 4,5** | **16,3 %** |
| Fläche unter 3,0 | 5,3 % |

Über vier Einzelbilder des laufenden Videos: 15,4 % bis 16,4 % unter AA. Es ist also kein
Zufallsbild.

**Ursache, gemessen in acht Spalten über die Zeile (links → rechts):**

| Spalte (CSS-px) | 16–61 | 61–106 | 106–150 | 150–195 | 195–240 | 240–284 | **284–329** | 329–374 |
|---|---|---|---|---|---|---|---|---|
| Median | 9,50 | 7,69 | 6,64 | 6,04 | 5,02 | 5,36 | **3,20** | 6,74 |
| unter AA | 0 % | 0 % | 0 % | 0 % | 18,4 % | 4,6 % | **88,6 %** | 18,7 % |

`.hf-shade` läuft waagerecht von 0,7 Deckkraft links auf **0,12 rechts**. Am Desktop stehen die
Worte in den linken 680 px und bleiben im dunklen Teil — am Handy ist die Zeile 358 px breit und
läuft in den hellen Teil hinein. Deshalb trifft es nur das Handy.

**Der Kommentar im CSS („the words keep AA on the left") ist für 390 falsch.** Fix-Richtung: der
waagerechte Verlauf darf innerhalb der Textspalte nicht aufhellen, oder `.hf-words` bekommt einen
eigenen Grund. Bild `shots/F22c-hero-lead-390.png`, Zahlen `checks/f22-cdc8d04-contrast*.json`.

---

## (d) Regler 0 px — auf `18812cc` **nicht geprüft**, auf `cdc8d04` durchgefallen

`18812cc` ist nicht erreichbar (siehe oben). Stand `cdc8d04`, beide Bilder intrinsisch 1200 × 800,
gleicher oberer und linker Rand, Unterschied nur in der Höhe:

| Breite | Δ Breite | **Δ Höhe** | 0 px erreicht? |
|---|---|---|---|
| 360 | 0 px | **13,7 px** | nein |
| 390 | 0 px | **14,9 px** | nein |
| 414 | 0 px | **15,5 px** | nein |
| 1366 | 0 px | **200,0 px** | nein |
| 1440 | 0 px | **200,0 px** | nein |

Am Desktop ist der Unterschied **200 px**, dreizehnmal so groß wie die 15 px, die ich am 13.11. bei
390 gefunden hatte. Wer am Rechner vergleicht, vergleicht zwei verschieden hohe Ausschnitte. Die
Bedingung aus D-3 bleibt: **Δ Höhe = 0 px und Δ Breite = 0 px bei allen fünf Breiten.** Das messe
ich auf dem benannten Build nach, mit demselben Skript.

---

## Nicht beanstandet, aber beim Messen gefunden — die Ein-Angebot-Regel ist nicht fertig

Die Entscheidung des Owners vom 13.11. (nur „Piloto gratuito"; „Solicitar una demo" und „14 días"
verlassen die Seite) ist auf der Startseite umgesetzt, auf **zwei weiteren Seiten aber nicht**.
Wortlaut aus der ausgelieferten Seite, Beleg `checks/f22d-cdc8d04.json`:

| Ort | Sicht | Was dort steht |
|---|---|---|
| `/es/contact` | **öffentlich** | „La demo es opcional." · „Opcional **Solicitar una demo**" · „Sin presentación. **Solicitar una demo**" |
| `/es/contact` | Ziel | dazu „O simplemente empieza **Prueba gratis durante 14 días.** Sin método de pago, sin llamada comercial." |
| `/en/contact` | **öffentlich** | „A demo is optional." · „**Request a demo**" (zweimal) |
| `/en/contact` | Ziel | dazu „Try it free for **14 days**." |
| `/es/faq` | Ziel | „¿Cuánto dura la prueba y qué cuesta? **14 días** de Essential …" · „¿Qué pasa después de los **14 días**?" |
| `/en/faq` | Ziel | dieselben zwei Stellen auf Englisch |

Das steht so auch im Quelltext auf HEAD: `lib/i18n/dictionaries/es.ts:490` und `:492`
(`demoH2`/`demoCta` = „Solicitar una demo"), `en.ts:529`/`:531`/`:533`, `lib/content/faq.ts:190`
und `:197`. In der **öffentlichen** Sicht steht damit ein **zweites Angebot** neben dem Piloten —
genau das, was die Entscheidung „ein Angebot" ausschließt. Das gehört vor die Note erledigt; der
Wortlaut kommt von Copy, der Einbau von Redesign.

**Was MM ausschließt, ist sauber:** auf keiner der sieben geprüften Routen steht „describe planos",
„responde a lo que envías por foto, PDF o audio", „Responde a cualquier foto" oder eine Sprach­zusage
für Notizen über Spanisch hinaus. Das Register aus `1c680755` ist insoweit eingehalten.

**„Kicker doppelt" aus F22:** bei 1440 in der Zielsicht **nicht reproduziert**. Doppelt erscheinen
nur „Plataforma" (Navigation und Fußzeile) und die Gruppenköpfe der Planstabelle
(„Canales/Equipo/Informes/Integraciones/Servicios", je einmal pro Plan-Spalte, am Desktop
0 × 0 px groß, also unsichtbar). Beleg `checks/kick.json`. Ich brauche vom Owner die Breite oder
das Bild, auf dem der doppelte Kicker steht, sonst kann ich die Zeile nicht schließen.

---

## Was ich um 14:15 brauche

1. Die **Adresse der Vorschau mit `18812cc` oder neuer**, mit `dpl_…`. Ohne sie gibt es für (d)
   keine Messung und damit keine Note.
2. Ob der Anschnitt der Demo (D-1, ≥ 120 px) in diesem Build nachgezogen wird oder bewusst offen
   bleibt — dann halte ich die Zeile als Befund fest.
3. Wer die Kanalzeile der Planstabelle anfasst (Wortlaut Copy, Einbau Redesign) und wer die
   Demo-/14-Tage-Stellen auf `/contact` und `/faq` schließt.

**Stand der Zeile F22 nach der Abschlussregel der Fehlerliste: OFFEN.** Erledigt ist nichts davon,
und die Note kommt erst auf dem benannten Build.
