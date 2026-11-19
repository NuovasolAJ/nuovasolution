# Die Tiefe und der neue Abschnitt: eine Rechnung, eine Entscheidung · Do 19.11.2026

**Für Owner und Audit.** Reviewer (RV6).

Redesign meldet, dass **≤ 21 Bildschirme und der neue Abschnitt „fertiges Produkt" am Handy
einander ausschließen**. Ich habe die Grundlage dieser Rechnung selbst nachgemessen und dabei
zugleich eine **Ungenauigkeit in meinem eigenen Verfahren** gefunden und behoben.

## 1 Erst die Messweise: die Seite wird beim zweiten Durchgang kürzer

Gemessen auf dem ausgelieferten Stand (`630bf25`, Code gleich `00f384a`), 390 × 844, Zielsicht:

| Durchgang | Höhe | Bildschirme |
|---|---|---|
| **1.** Durchscrollen | 18 845 px | **22,3** |
| **2.** Durchscrollen | 17 732 px | **21,0** |
| 3. und 4. | 17 732 px | 21,0 — **eingeschwungen** |
| davon Vorschau-Möblierung | 144 px | 0,2 |

**Die Seite meldet sich beim ersten Durchgang 1,3 Bildschirme länger, als sie am Ende ist.** Erst
beim zweiten Durchgang steht die Höhe fest und ändert sich danach nicht mehr. Ursache ist das
verzögerte Laden: Abschnitte werden zunächst mit Platzhaltermaßen gerechnet und erst nach dem
Durchlauf auf ihre wirkliche Höhe gesetzt.

**Folge für meine Zahlen:** Die Tiefe gilt bei mir ab sofort als **die eingeschwungene Höhe** —
gemessen, bis zwei Durchgänge denselben Wert liefern. Das ist der Wert, den ich bisher gemeldet
habe (mein Skript scrollte zufällig zweimal), er ist also **nicht** rückwirkend falsch; er hat nur
bisher keinen Namen gehabt. Ich schreibe ihn jetzt fest, damit niemand mit einem Durchgang misst
und auf 22,3 kommt.

**Unsere Zahlen stimmen damit überein:** Redesign nennt 21,0 mit Möblierung und 20,8 ohne — ich
messe 21,0 und 20,8. Auch die Abschnitte decken sich auf zwei Stellen: hf 0,85 · pain 0,32 ·
flow 2,08 · functions 2,40 · report 3,71 · model-3d 1,91 · plans 3,67 · start 1,04 · behind 0,77 ·
faq 0,50 · closing 0,45.

## 2 Die Rechnung zum neuen Abschnitt

| | Bildschirme | von mir geprüft? |
|---|---|---|
| Seite **ohne** den neuen Abschnitt (heute) | **20,8** | **ja**, unabhängig nachgemessen |
| Entwurf voll (D-1 … D-6 überall) | 23,2 | nein — liegt ungebaut bei Redesign |
| Fassung **A** (Kompaktzeile nur am Handy) | 22,9 | nein |
| A plus Karten 2 × 2 | 22,6 | nein |
| kleinste sinnvolle Form des Abschnitts | über **1,4** | nein |

**Die Rechnung geht auf:** 20,8 + 1,4 = **22,2** — selbst die kleinste Form liegt über 21. Die
Grenze und der Abschnitt schließen einander am Handy wirklich aus, solange nichts Bestehendes
kürzer wird. Dass Redesign nichts Bestehendes kürzt, ist richtig: das verlangt die Schutzregel.

**Was ich nicht geprüft habe:** die drei Entwurfszahlen selbst. Sie stammen aus Redesigns lokalem
Bau; ausgeliefert ist nichts. Ich melde sie als **Redesigns Messung**, nicht als meine.

## 3 Die Entscheidung liegt beim Owner — vier Wege, ohne Empfehlung

1. **Die Grenze für (16) anheben**, etwa auf ≈ 23. Dann bleibt alles andere, wie es ist, und ich
   messe gegen die neue Zahl.
2. **Den Abschnitt kleiner machen.** Nach Redesigns Messung kostet die kleinste sinnvolle Form über
   1,4 Bildschirme — das reicht nicht, um unter 21 zu kommen, aber es verkleinert den Überschuss.
3. **Die Schutzregel für einen benannten Abschnitt lockern**, damit dort gekürzt werden darf. Das
   wäre eine ausdrückliche Ausnahme von „alles bleibt" und sollte den Abschnitt beim Namen nennen.
4. **Den Abschnitt am Handy hinter einen Tipp legen** und am Desktop offen zeigen. Das war schon
   einmal Ihr Gedanke (D11, „welche Abschnitte dürfen am Handy hinter einen Tipp"). Die Tiefe zählt
   dann nur das, was offen steht.

**Für die Note heißt das:** Sagen Sie nichts, messe ich gegen die geltenden 21 — und die Zeile
„Tiefe" fällt durch, obwohl der Abschnitt genau das ist, was Sie bestellt haben. Ein Satz von Ihnen
verhindert, dass eine bestellte Erweiterung als Mangel in der Note steht.

---

## Nachtrag: beide Spuren messen jetzt dasselbe

Redesign hat die eingeschwungene Höhe übernommen und schreibt die **Zahl der Durchgänge** mit.
Nachgemessen auf demselben Stand (`630bf25`, Code `00f384a`, 390 × 844, Zielsicht):

| | Redesign | RV6 |
|---|---|---|
| Durchgänge | 2 · [17 732, 17 732] | 2 · [17 732, 17 732] |
| mit Möblierung | **21,0** | **21,0** |
| ohne Möblierung | **20,8** | **20,8** |

**Damit gibt es keine zwei Wahrheiten mehr.** Redesigns früherer Wert war bereits eingeschwungen,
weil sein Werkzeug vor dem Auslesen drei Sekunden wartet — die Zahl war richtig, nur ihr Zustandekommen
war nicht benannt. Jetzt ist es auf beiden Seiten benannt.

**Noch offen und ausdrücklich Redesigns Messung:** die Entwurfszahlen. 23,2 ist inzwischen
eingeschwungen gemessen (2 Durchgänge), die Formen **A = 22,9** und **A + Karten 2 × 2 = 22,6**
stammen aus **einem** Durchgang und werden beim Bau der gewählten Form eingeschwungen nachgemessen.
Ich führe sie bis dahin als vorläufig.

**Bei der Lieferung bekomme ich** je Abschnitt Bildschirme, die Summe, die Möblierung **getrennt**
und die Zahl der Durchgänge. Damit lässt sich jede Abweichung sofort zuordnen.

---

## Nachtrag 2: Warten hilft nicht, nur ein zweiter Durchgang — und was das für die Entwurfszahlen heißt

Redesign hält dagegen, die Abweichung von 1,3 Bildschirmen entstehe **nur ohne Wartezeit** vor dem
ersten Durchgang; mit drei Sekunden Warten stehe die Höhe schon beim ersten Durchgang fest. **Das
habe ich geprüft, und so ist es bei mir nicht.** Ein Durchgang, danach viermal gemessen:

| gelesen nach | Höhe | Bildschirme |
|---|---|---|
| 0,5 s | 18 845 px | 22,3 |
| 2,5 s | 18 845 px | 22,3 |
| 5 s | 18 845 px | 22,3 |
| 8 s | 18 845 px | 22,3 |
| **zweiter Durchgang** | 17 743 px | **21,0** |
| zweiter Durchgang + 5 s | 17 743 px | 21,0 |

**Warten allein ändert nichts** — auch nach acht Sekunden steht 22,3. Erst das **zweite
Durchscrollen** bringt die Höhe auf 21,0, und dort bleibt sie. Die Regel „bis zwei Durchgänge
denselben Wert liefern" ist also richtig; die Begründung über die Wartezeit trägt nicht.

**Was das für Redesigns Entwurfszahlen heißt — und damit auch für meine eigene Einschätzung von
vorhin:** Ich hatte dem Owner geschrieben, A und A + 2 × 2 dürften eingeschwungen „etwas niedriger
liegen". **Diese Vermutung stütze ich nicht mehr auf meine Analogie**, denn sie beruhte auf der
Annahme, ein Durchgang messe generell zu hoch. Entscheidend ist Redesigns eigene Gegenprobe: Beim
**vollen** Entwurf ergaben ein Durchgang und zwei Durchgänge **denselben** Wert (23,2). Wenn das
für den Entwurf gilt, schrumpft dort nichts, und dann sind auch **A ≈ 22,9** und **A + 2 × 2 ≈
22,6** belastbar.

**Sicher wissen wir es erst am gebauten Stand.** Bis dahin gilt: Redesigns Zahlen sind seine, meine
Vermutung eines Abschlags ist zurückgezogen, und **an der Entscheidung des Owners ändert sich
nichts** — jede Form liegt über 21.

---

## Nachtrag 3: Redesign hatte recht, und der Fehler lag in meinem Durchgang

Redesign hat seine Schleife offengelegt: Schritte von **600 px** mit **120 ms**, und das **Ende
wird in jedem Schritt neu gelesen**. Meine Schleife las das Ende **einmal** zu Beginn und lief nur
bis dorthin. Ich habe beide Arten auf demselben Stand gegeneinander laufen lassen:

| Art | 1. Durchgang | 2. Durchgang |
|---|---|---|
| **Redesigns** (600 px, Ende je Schritt neu) | 30 Schritte → **21,0** | 30 Schritte → 21,0 |
| **meine bisherige** (Ende einmal gelesen) | 21 Schritte → **22,3** | 28 Schritte → 21,0 |

**Das erklärt alles.** Mein erster Durchgang endete nach 21 Schritten — bei 14 175 px, also weit
oberhalb des wirklichen Seitenendes. Der untere Teil der Seite wurde nie angefahren und konnte
deshalb nicht einschwingen. Redesigns Schleife führt das Ende nach und fährt die ganze Seite ab;
sie ist **schon beim ersten Durchgang** eingeschwungen.

**Folgen, die ich sofort gezogen habe:**

1. **Meine Skripte messen ab jetzt wie Redesigns** — 600-px-Schritte, Ende in jedem Schritt neu
   gelesen (29 Dateien angepasst, die geprüften liegen aktualisiert in `checks/`).
2. Die Regel „**bis zwei Durchgänge denselben Wert liefern**" behalte ich als billige Gegenprobe;
   sie kostet nichts und fängt genau solche Fälle.
3. **Redesigns Entwurfszahlen stehen damit ohne Vorbehalt:** 23,2 · A 22,9 · A + 2 × 2 22,6.
   Mein zurückgezogener Abschlag bleibt zurückgezogen.
4. Die bisher gemeldeten Tiefen bleiben richtig — sie waren die eingeschwungenen Werte, weil mein
   Skript zweimal lief. **Falsch war nie eine Zahl, sondern meine Erklärung dafür**, und einmal
   beinahe eine Zahl: hätte ich je nur einen Durchgang gemessen, hätte ich 22,3 statt 20,8
   gemeldet.

