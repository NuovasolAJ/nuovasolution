# RV6 — der kurze Nachlauf auf `43d9cce` · 27.11.2026

Der Nachlauf zu `REVIEWER_DURCHGANG_dbd14d8_E2_v1.md` (`5ce3d84`, Nachtrag 1 in `8e55895`). Gemessen wurden die sechs vereinbarten Punkte und die Bedingung, die der Owner mit der Freigabe gestellt hat.

| | |
|---|---|
| Commit | `43d9cce57cb3c4ba0f7626f73f3fb22e27a5b095` |
| Deployment | `dpl_B4BAFStBAfPBKVujC1gniS55JoAX` |
| `/api/build` | `env: preview`, `mode: stub` |
| Bau-Bindung | bei jeder Sonde am Anfang und am Ende geprüft, in allen Läufen identisch |

Der Rundgang-Prototyp auf derselben Kennung (`/es/rundgang`, `/en/rundgang`) ist **nicht** gemessen worden. Er gehört laut Redesign nicht zum E2-Umfang, und ich erweitere meinen Umfang nicht ohne Wort des Owners.

---

## 1. Die Bedingung des Owners — erfüllt

> „Die 0 px Reserve bei 360 × 640 ES akzeptiere ich, wenn der Button vollständig sichtbar und bedienbar ist."

Genau so gemessen, bei 360 × 640 ES, ohne Vorschau-Möblierung:

**Vollständig sichtbar.** Der Knopf „Ver cómo queda la tarea" liegt bei x 16–344, y 584–640, ist 328 × 56 px groß, und sein **ganzes Rechteck liegt im Fenster** (unten bündig bei 640 von 640, Reserve 0). 56 px hoch, also deutlich über der 44-px-Schwelle. Nichts Fremdes liegt darüber.

**Bedienbar.** Eine **echte Berührung** (kein synthetischer Klick) in der Mitte landet auf dem Knopf und führt aus, was er verspricht: `#demo`, `data-demo-entered="end"`, Phase 12, `done=true`. Eine zweite echte Berührung **2 px über der Unterkante** — also genau an dem Pixel, um den es bei „0 px Reserve" geht — tut dasselbe.

*Eigene Einschränkung, damit die Zahl richtig gelesen wird:* vier meiner fünf Prüfpunkte lagen an den Ecken des Rechtecks und liefern dort nicht den Knopf, sondern seinen eigenen Elternknoten `hf-ctas`. Das ist die Pillenform: Punkte 2 px innerhalb der Rechteckecke liegen **außerhalb der Rundung**. Das ist meine Prüfgeometrie, kein Mangel — die beiden Punkte, die zählen (Mitte und Unterkante), treffen beide den Knopf.

**Damit ist die Bedingung erfüllt.** Die 0 px Reserve bei 360 ES steht, und der Knopf ist dort vollständig sichtbar und bedienbar.

---

## 2. Die gemeldeten Korrekturen — fünf von sechs tragen

| Befund | Stand auf `dbd14d8` | Stand auf `43d9cce` | |
|---|---|---|---|
| **E-2** h1 Kontrast 1366 | schlechtester Pixel 2,29 | **4,65**, Median 11,02 | behoben |
| **E-3** `.hf-scene-mark` 1366 | 3,86, 15–20 % unter 4,5 | **5,01**, **0 %** unter 4,5 | behoben |
| **E-4** dritter WhatsApp-Kopf | `rgb(18,140,126)` teal, weiße Schrift | **`rgb(240,242,245)`**, Marke `rgb(37,211,102)` — in allen drei Stellen | behoben |
| **E-5** Hinweis 44 px | 40 × 40 auf 360 und 375 | **44 × 44 überall, wo er erscheint** | behoben |
| **E-6** Hinweis unter der Falz bei 360 | 46 px darunter | erscheint dort gar nicht mehr | behoben (die offene Frage dazu steht in Nachtrag 1) |
| **E-1** Bildunterschrift | 1,31 (1366) / 1,00 (Telefon) | behoben bei 1280/1366/1440, 390, 414 — **nicht bei 375** | **offen**, siehe N-1 |

Zur Kapsel im Einzelnen: bei 1366 liegt der Median der Textfläche jetzt bei **8,24** und nur **0,09 %** darunter; von 172 Pixeln unter 4,5 liegen **153 außerhalb der Kapselrundung**, wo nie ein Buchstabe steht, und 19 sind der Antialiasing-Saum an der Kapselkante. Bei 390 ist es 9,49 / Median 14,45 / 0 % darunter. Das ist sauber.

**Die Sichtbarkeitsregel des Hinweises, gemessen über sieben Fenster:** 360 aus · 375 an, 44 × 44 · 390 aus · 414 aus · 1280/1366/1440 an, 44 × 44. Genau wie angekündigt.

---

## 3. Was auf `43d9cce` offen ist — und es sitzt alles auf 375 × 667

Das ist das eine Fenster, auf dem die neue Regel den Hinweis behält. Alle drei Punkte stehen dort zusammen.

### N-1 · Bei 375 ist die Bildunterschrift unlesbar
**schwer.** Die Kapsel ist da (`rgba(12,12,14,0.7)`), aber sie trägt dort nicht: der gemessene Grund hinter der Schrift ist **`[176,176,177]`**, also hellgrau. Über die Textfläche: schlechtester Pixel **1,01**, Median **1,99**, **99,98 % unter 4,5**. Zum Vergleich dasselbe Element bei 390: 9,49 / 14,45 / 0 %.

Der Grund ist die Stelle: bei 375 sitzt die Unterschrift mitten in der Auflösekante, mit der der Hero nach unten ins Weiß übergeht. Dort ist der Untergrund schon fast weiß, und eine Kapsel bei 0,7 bringt ihn nicht mehr weit genug herunter. Im Bild `shots/43d9cce/kapsel-375-mit-schrift.png` sieht man es unmittelbar: hellgraue Schrift auf hellgrauem Grund. Bei 390 (`kapsel-390-…`) steht dieselbe Zeile auf einer klar dunklen Pille.

**E-1 ist also an fünf von sechs Fenstern behoben und an genau dem einen nicht, an dem zugleich der Hinweis steht.**

### N-2 · Bei 375 liegt der Hinweis auf der Hauptaktion — und gewinnt dort die Berührung
**mittel, aber an der empfindlichsten Stelle.** In ES und EN gleichermaßen:

| | |
|---|---|
| Überlappung Hinweis × Hauptaktion | **44 × 8 px** an der Unterkante des Knopfes, 1,8 % seiner Fläche |
| Wer gewinnt dort die Berührung? | **`hf-edge`** — der Hinweis, nicht der Knopf |
| Überlappung Hinweis × Unterschrift | 27–29 × 28 px — das erste Wort („Es" von „Estás") |

1,8 % klingt klein. Es ist aber die **Unterkante der Mitte des Hauptknopfes**, also genau dort, wo ein Daumen landet — und wer dorthin tippt, bekommt nicht „Ver cómo queda la tarea", sondern einen Sprung in den Schmerzabschnitt. Das ist ein Fehlgriff auf der wichtigsten Umwandlungsaktion der Seite. Im Bild `shots/43d9cce/ersterschirm-375.png` sitzt der weiße Kreis sichtbar auf dem schwarzen Knopf.

### N-3 · Bei 375 **EN** liegt der Hinweis selbst unter der Falz
**mittel.** Unterkante 683 gegen 667 — darunter. Die Unterschrift ebenfalls (675 gegen 667).

Der Grund ist strukturell und deshalb nennenswert: die Regel lautet „erscheint nur, wo der Hero noch im Fenster endet", aber eine Medienabfrage **kann die Sprache nicht sehen**. Auf Englisch ist der Hero höher (die Übersetzungszeile unter Milas Nachricht), also endet er bei 375 EN außerhalb des Fensters — und der Hinweis erscheint trotzdem. Gemessen wurde die Regel offenbar in ES; in ES stimmt sie auch (663 von 667).

### N-4 · Beobachtung: bei 360 ist die Unterschrift nicht mehr im ersten Bildschirm
In beiden Sprachen liegt `.hf-mark` bei 360 × 640 unterhalb der Falz (Unterkante 668 gegen 640). Zusammen mit dem dort entfernten Hinweis heißt das: der erste Bildschirm bei 360 trägt Bild, Überschrift, Satz, Milas Nachricht, die Aufgabe und den Knopf — **keine Unterschrift und keinen Hinweis**. Kein Mangel, den ich benennen kann; eine Folge zweier Entscheidungen, die zusammenwirken, und sie gehört zu der Frage aus Nachtrag 1, die beim Owner liegt.

---

## 4. Rückfallprobe — sie hat sich gelohnt

Ich hatte geschrieben, der Hinweis sei absolut positioniert und *sollte* die Falz-Zahlen nicht bewegen, und dass „sollte nicht" keine Messung ist. Er hat sie bewegt:

| Fenster | Aufgabe | Aktion |
|---|---|---|
| 375 × 667 ES | 142 → **130** (−12) | 52 → **40** (−12) |
| 390 × 844 ES/EN | 284 → **292** (+8) | 192 → **200** (+8) |
| 414 × 896 ES/EN | 284 → **292** (+8) | 192 → **200** (+8) |
| 360, 375 EN, 1280, 1366, 1440 | unverändert | unverändert |

Kein Schaden — alle Werte bleiben klar positiv, und die 0 bei 360 ES und die −26 bei 360 EN haben sich **nicht** bewegt. Aber die Änderung war nicht layoutneutral, und ohne die Probe hätte ich das behauptet.

---

## 5. Urteil

**Die Bedingung des Owners bei 360 × 640 ES ist erfüllt** — der Knopf ist vollständig sichtbar und mit einer echten Berührung bedienbar, bis an den letzten Pixel.

**Fünf der sechs Punkte tragen.** E-2, E-3, E-4, E-5 und E-6 sind behoben, und E-1 ist an fünf von sechs Fenstern behoben.

**Was bleibt, sitzt gebündelt auf 375 × 667:** dort ist die Unterschrift unlesbar (N-1), der Hinweis liegt auf dem Hauptknopf und gewinnt dort die Berührung (N-2), und auf Englisch liegt er selbst unter der Falz (N-3). Das ist kein Zufall: 375 ist das Fenster, das die neue Regel als einziges Telefon behält, und die Auflösekante, der Knopf, die Unterschrift und der Hinweis drängen sich dort auf denselben 50 Pixeln.

**Mein Vorschlag:** 375 × 667 ist eine sehr verbreitete Breite (iPhone SE 2/3, iPhone 6/7/8). Die drei Punkte hängen zusammen und lassen sich zusammen lösen — entweder der Hinweis verschwindet auch bei 375 (dann ist die Seite dort so ruhig wie bei 390 und N-2/N-3 entfallen), oder er bekommt dort seinen eigenen Platz außerhalb von Knopf und Unterschrift, und die Unterschrift kommt aus der Auflösekante heraus. Welche der beiden Wege richtig ist, ist eine Gestaltungsfrage und gehört Redesign und dem Owner, nicht mir.

Nach der Korrektur messe ich **nur noch 375 × 667 in beiden Sprachen**: die drei Punkte plus die Falz-Zeile. Das ist ein Lauf von wenigen Minuten.

**V-1 bleibt offen und gehört Audit und dem Owner.** Es hat sich auf `43d9cce` nichts daran geändert: an den Worten wurde nichts angefasst.

---

## Nachtrag 1 (27.11.) — Redesign nimmt den ersten Weg; mein Nachmessbereich wird größer, nicht kleiner

Redesign hat N-1 bis N-3 als ein Problem genommen und meinen ersten Vorschlag gewählt: Hinweis **und** Auflösekante leben jetzt nur noch auf dem Desktop. Lokal als `272aee8` festgehalten, noch nicht benannt, Deployment noch auf `43d9cce` — gemessen wird also erst nach der nächsten Zeile des Owners.

**Ich hatte geschrieben, ich messe danach „nur noch 375 × 667". Das war zu eng, und ich korrigiere es, bevor jemand mit dieser Zusage plant.** Der Änderung nachgesehen (`git diff 43d9cce..272aee8 -- app/globals.css`), betrifft sie zwei Regeln:

| Regel | vorher | nachher | betrifft von meinen Fenstern |
|---|---|---|---|
| Hinweis `.hf-edge` | `min-width:1024` **oder** `max-width:639 und min-height:650 und max-height:720` | nur `min-width:1024` | **375** |
| Auflösekante `.hf::after` | `min-width:1024` **oder** `max-width:639 und max-height:720` | nur `min-width:1024` | **360 und 375** |

Meine erste Sorge war, das treffe alle Telefone. Es trifft sie nicht: bei 390 × 844 und 414 × 896 war die Auflösekante **nie** an (844 und 896 liegen über 720). Nachgesehen statt behauptet. **Der Nachmessbereich ist damit 360 und 375, beide Sprachen — vier Zeilen statt einer**, und immer noch ein kurzer Lauf.

**Eine Annahme in der Begründung, die ich nachmessen werde, nicht übernehme.** Der Code sagt jetzt: „on the phones the picture cut by the window is the cue". Nach meiner eigenen Messung auf `43d9cce`:

- bei **360 × 640** endet der Hero bei 680 gegen 640 Fensterhöhe — das Bild wird vom Fenster **wirklich angeschnitten**, die Begründung trägt dort;
- bei **375 × 667** endete der Hero bei **667 von 667**, also **bündig**. Dort wird nichts angeschnitten. Ohne Auflösekante und ohne Hinweis kann der erste Bildschirm bei 375 wie ein fertiges Ende aussehen statt wie eine Fortsetzung.

Das ist eine Messung von `43d9cce`, keine von `272aee8` — die Kante ist nur ein dekoratives Overlay und sollte die Höhe nicht ändern, aber „sollte" ist nach der Erfahrung aus §4 kein Wort, auf das ich etwas setze. Es gehört zu der Frage, die ohnehin beim Owner liegt: **wie der erste Bildschirm auf dem Telefon unten endet.** Diese Frage betrifft jetzt 360 **und** 375.

Redesigns eigene Zahlen zur Unterschrift bei 375 (16,1 / 15,3 ES, 15,8 / 9,2 EN gegen vorher 1,0 / 2,0) lösen N-1 deutlich, wenn sie sich bestätigen. Dass er die beiden Reste — Unterschrift unter der Falz bei 360 in beiden Sprachen und bei 375 EN um 8 px — selbst meldet statt sie wegzulassen, halte ich fest.

---

## Nachtrag 2 (27.11.) — N-5: auf 33 von 124 durchgemessenen Telefonhöhen schneidet die Falz mitten durch eine Textzeile

Redesign hat nachgelegt (lokal `e2dfdb9`): auf dem kurzen Telefon ist die Mindesthöhe des Hero jetzt `calc(100svh - 28px)`, damit vom nächsten Abschnitt ein 28-px-Streifen zu sehen ist — der Hinweis darauf, dass die Seite weitergeht. Die Begründung dazu habe ich an der Quelle geprüft und sie **trägt**: `.pain-inner` bekommt auf dem Telefon `padding-top: 32px` (`globals.css:1858` schlägt `:697`), der Streifen ist 28 px, also zeigt er Grund und die Haarlinie und **keine Schrift**, mit 4 px Luft.

**Aber genau diese Rechnung hängt an der Fensterhöhe — und vier benannte Fenster können nicht zeigen, dass sie überall aufgeht.** Deshalb durchgemessen statt geglaubt: Breiten 360 und 375, Höhen 600 bis 900 in 10-px-Schritten, beide Sprachen, 124 Fenster. Gemessen wurde nicht, ob sich Kästen überlappen, sondern ob die Falz **durch das Rechteck eines Textknotens** läuft — also ob eine Zeile Schrift waagerecht durchgeschnitten wird.

| Breite / Sprache | geschnitten bei (von 31 Höhen) |
|---|---|
| 360 ES | **10** — 730, 740, 750, 760, 770, 780, 790, 800, 810, 830 |
| 360 EN | **9** — 760, 770, 780, 790, 800, 810, 820, 830, 860 |
| 375 ES | **5** — 730, 740, 750, 760, 790 |
| 375 EN | **9** — 740, 750, 760, 770, 780, 790, 800, 810, 840 |

**33 von 124 Fenstern, also 27 %.** Beispiele: bei 375 × 740 EN steht „0 of 25" mit 7 von 29 px über der Falz, der Rest ist abgeschnitten; bei 360 × 790 ES liegt die Schmerzzeile mit 28 von 29 px darüber, also fehlt genau die Unterkante der Buchstaben; bei 375 × 790 ES wird die Marke „Semana de ejemplo · datos ficticios" mit 8 von 16 px halbiert.

**Woran es liegt.** Der Streifen des nächsten Abschnitts ist entweder kleiner als dessen Kopfluft (32 px) — dann zeigt er nur Grund, wie es die neue 28-px-Regel absichtlich macht — oder er ist größer, und dann wandert die Falz durch die Schmerzzeile (29 px) und weiter unten durch die Marke (16 px). Heil ist er erst wieder, wenn er alles überspringt. Bei 390 × 844 ist der Streifen 160 px und alles steht ganz; bei Höhen bis 720 macht die neue Regel ihn 28 px. **Dazwischen, zwischen rund 38 und 140 px, liegt die Zone, und dort liegen die üblichen Android-Fenster.**

**Das ist nicht neu und nicht von der Hinweis-Arbeit verursacht** — es steht so auf dem benannten Commit `43d9cce` und hat mit Hinweis und Auflösekante nichts zu tun. Die neue 28-px-Regel hat genau den richtigen Instinkt, deckt aber nur `max-height: 720px`; oberhalb davon entscheidet die andere Regel oder die Inhaltshöhe, und dort sitzen die 33 Fälle. Dass meine vier benannten Fenster alle sauber sind, ist der Grund, warum es bisher niemandem aufgefallen ist: 360 × 640, 375 × 667, 390 × 844 und 414 × 896 liegen alle außerhalb der Zone.

**Richtung, nicht Lösung** (die gehört Redesign): derselbe Gedanke, der die 28 px ergeben hat, muss über den ganzen Höhenbereich halten — der Streifen ist entweder immer kleiner als die Kopfluft, oder immer so groß, dass Zeile, Abstand und Marke vollständig darin stehen. Was dazwischen liegt, schneidet.

Ich nehme N-5 in den kurzen Nachlauf auf. Der Lauf bleibt kurz, weil der Höhenfeger automatisch läuft (`checks/hoehenfeger1127.mjs`, ein Laden je Breite und Sprache, danach nur die Fensterhöhe).

*Eigener Hinweis zur Sorgfalt: in meiner Zusammenfassungszeile im Protokoll stand als Fensterhöhe versehentlich die Zeilenhöhe (29). Die Tabelle oben und die Rohdaten sind richtig; nur jene eine Ausgabezeile war falsch beschriftet.*

---

*Belege, alle auf `43d9cce` / `dpl_B4BAFStBAfPBKVujC1gniS55JoAX`: `checks/nachlauf-43d9cce-1127.json` (Bedingung des Owners, Köpfe, Hinweis und Falz über sieben Fenster, beide Sprachen) · `checks/kontrast-c-43d9cce-1127.json` (E-1/E-2/E-3, vier Driftphasen) · `checks/e1-kapsel-43d9cce.json` (die Kapsel über sechs Fenster, getrennt nach Textfläche und Rundung). Bilder: `shots/43d9cce/ersterschirm-{360,375,390,1366}.png`, `shots/43d9cce/kapsel-375-mit-schrift.png`, `shots/43d9cce/kapsel-390-mit-schrift.png` und die zwei gemessenen Gründe. Sonde: `checks/nachlauf1127.mjs`.*
