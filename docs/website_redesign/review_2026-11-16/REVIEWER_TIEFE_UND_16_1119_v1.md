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
