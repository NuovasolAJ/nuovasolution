# RV6 — der kurze Nachlauf auf `7a46a59` · 27.11.2026

Der vereinbarte kurze Nachlauf: N-1 bis N-5, die Zeilen bei 360 und 375 in beiden Sprachen, der Fuß des ersten Bildschirms, der Höhenfeger mit den drei Ergänzungen, die Trägheit des Messelements — dazu die zwei Punkte, die der Owner mit der Freigabe gestellt hat. **Nicht der ganze Durchgang noch einmal**; alles andere steht in `REVIEWER_DURCHGANG_dbd14d8_E2_v1.md` und `REVIEWER_NACHLAUF_43d9cce_v1.md`.

| | |
|---|---|
| Commit | `7a46a59f6733bd4df211d03facf3afc4a8eacb3a` |
| Deployment | `dpl_G44cWgQV64jgPcivJtD2Yix2KJhD` |
| `/api/build` | `env: preview`, `mode: stub` |
| Bau-Bindung | bei jeder Sonde am Anfang und am Ende geprüft, in allen Läufen identisch |

Die Rundgang-Route auf derselben Kennung ist **nicht** gemessen — sie gehört nicht zu meinem Auftrag, und ich erweitere ihn nicht ohne Wort des Owners.

---

## 1. Die Bedingung des Owners — erneut erfüllt, auf diesem Commit gemessen

Nicht von `43d9cce` übernommen, sondern neu gemessen. Bei 360 × 640 ES, ohne Vorschau-Möblierung:

Der Knopf „Ver cómo queda la tarea" liegt bei x 16–344, y 584–640, ist **328 × 56 px**, sein ganzes Rechteck liegt im Fenster, Reserve **0**. Diesmal mit Prüfpunkten **innerhalb** der Pillenform (Mitte, dicht über der Unterkante, dicht unter der Oberkante, links und rechts mittig) statt an den Rechteckecken — der Fehler aus dem letzten Lauf: **alle fünf treffen den Knopf.** Eine echte Fingerberührung in der Mitte und eine 2 px über der Unterkante führen beide zu `#demo`, `entered="end"`, Phase 12, `done=true`.

**Vollständig sichtbar und bedienbar. Die 0 px stehen.**

---

## 2. Die zwei Punkte des Owners

### Der Fuß bei 360 (beide Sprachen) und 375 EN — Redesigns Empfehlung, von mir mitgemessen

Die Empfehlung war: dort nichts hinzufügen und nichts verstecken; wo der Inhalt des Hero höher ist als das Fenster, ist der angeschnittene Inhalt der Hinweis. So verhält es sich auch:

| Fenster | Zustand | Fuß | Streifen | Aufgabe | Aktion | Unterschrift |
|---|---|---|---|---|---|---|
| 360 × 640 ES | edge | 680 | −40 (Inhalt läuft über) | +90 | **0** | unter der Falz (668) |
| 360 × 640 EN | edge | 706 | −66 | +64 | −26 | unter der Falz (694) |
| 375 × 667 ES | edge | 639 | **28** | +158 | +68 | **drin**, bei 627 |
| 375 × 667 EN | edge | 687 | −20 | +110 | +20 | 8 px darunter (675) |
| 390 × 844 | peek | 684 | 160 | +292 | +200 | drin |
| 414 × 896 | peek | 736 | 160 | +292 | +200 | drin |
| 1366 × 768 | — | 768 | 0 | +273 | +179 | drin |

Die Aufgabe steht in **allen** Zeilen im ersten Bildschirm, kleinster Wert +64. Die Aktion in allen außer 360 EN (−26), der vom Owner angenommenen englischen Kante.

### Die englische Aufgabenzeile

Sie steht: „Call Mila about the flat in Nerja", und sie bleibt **einzeilig bis hinunter auf 360** — dort, wo die spanische Zeile zwei Zeilen braucht. Das war die Absicht.

**Eine Tatsache dazu, die ich nicht unerwähnt lasse, weil sie eine Entscheidung ist und keine Messung:** die englische Zeile ist jetzt **zeichengleich mit dem Schlusstitel der Demonstration** („Call Mila about the flat in Nerja" an beiden Stellen), während die beiden im Spanischen verschieden bleiben („Devolver la llamada por el piso de Nerja" im Hero, „Llamar a Mila por el piso de Nerja" am Demo-Ende). Redesign benennt das im Commit, es ist also gewollt. Gemessen: ES verschieden, EN identisch. **Die zwei Sprachen folgen an derselben Stelle jetzt verschiedenen Grundsätzen** — das kann man gut finden (der Hero verspricht im Englischen genau das, was die Demonstration liefert) oder nicht. Es gehört Copy und dem Owner, nicht mir.

---

## 3. N-1 bis N-5

| | Stand auf `43d9cce` | Stand auf `7a46a59` | |
|---|---|---|---|
| **N-1** Unterschrift bei 375 | 1,01 / Median 1,99 / **99,98 %** unter 4,5 | **9,49 / Median 14,45 / 0 %** | behoben |
| **N-2** Hinweis über der Hauptaktion | 44 × 8 px, der Hinweis gewinnt die Berührung | **kein Hinweis auf irgendeinem Telefon, Überlappung 0** an allen fünf Fenstern | behoben |
| **N-3** Hinweis bei 375 EN unter der Falz | Unterkante 683 von 667 | gegenstandslos, kein Hinweis auf dem Telefon | behoben |
| **N-4** Unterschrift unter der Falz | 360 beide, 375 EN | unverändert: 360 ES 668, 360 EN 694, 375 EN 675 | **offen beim Owner** |
| **N-5** Falz schneidet durch Schrift | **33 von 124** Fenstern | **0 von 248** im Raster, **0 von 104** in 2-px-Schritten | behoben |

Die Unterschrift im Einzelnen: 375 jetzt 9,49 / 14,45 / 0 % (war 1,01 / 1,99 / 99,98 %), 390 9,49 / 14,46 / 0 %, Desktop Textfläche Median 8,24 bei 0,09 % darunter — das sind 19 Pixel Antialiasing-Saum an der Kapselkante, dazu 153 Pixel außerhalb der Rundung, wo nie ein Buchstabe steht. Bei 360 liegt die Unterschrift unter der Falz und ist dort nicht messbar; das ist N-4.

**Zu N-5 im Einzelnen:** 4 Breiten × 2 Sprachen × 31 Höhen von 600 bis 900 = 248 Fenster, **keines** mit einer durchschnittenen Textzeile. Dazu 104 Fenster in **2-px-Schritten** um jeden Zustandswechsel — genau die schmalen Bänder, über die ein Zehnerraster hinwegspringt. Auch dort keines.

---

## 4. Die drei Ergänzungen und die Trägheit des Messelements

| Prüfung | Ergebnis |
|---|---|
| **Umspringen nach dem ersten Bild** | **0 von 32** geprüften Fenstern. Das Nachmessen nach Schriften und `load` ändert den Zustand nirgends, der Fuß bleibt stehen. |
| **Ohne JavaScript** | Die **Inhaltshöhe ist mit und ohne JavaScript identisch** (680 / 706 / 639 / 687 / 653 / 680 / 657 / 682). Verschieden ist allein die Mindesthöhe des Hero: ohne das Attribut greift die CSS-Vorgabe mit dem 28-px-Streifen statt des 160er. Folge: bei 390 und 414 steht die Aktion bei **+68 statt +200** — **sichtbar bleibt sie überall**, die Aufgabe bei +160. 360 und 375 sind in beiden Fällen gleich. Keine geschnittene Zeile. |
| **Trägheit des Messelements** | Kein Tippziel, in 22 Tabulatoranschlägen **nie fokussiert**, **0** Halte auf Elementen ohne Größe, keine waagerechte Überlauf­breite an irgendeinem Fenster. Die 5–6 px abgeschnittener Überlauf im Hero kommen **nicht** von ihm: nimmt man es heraus, bleibt es bei 375 bei 5 und steigt bei 1366 von 5 auf 6. |
| **Falz-Rückfallprobe gegen `43d9cce`** | Nur 375 ES hat sich bewegt: 130 / 40 → 158 / 68, die beabsichtigte Wirkung des 28-px-Streifens. 360, 390, 414 und der Desktop **unverändert**. |

Das Messelement selbst: 0 px breit, unsichtbar, `pointer-events: none`, `aria-hidden`, und es liefert in jedem Fenster genau die Fensterhöhe.

---

## 5. Mein eigener Fehler in diesem Lauf

**Der Durchgang ohne JavaScript in meinem Höhenfeger hat die Vorschau-Möblierung nicht entfernt.** Dadurch kam dort ein Streifen von **−124** heraus, und ich hielt das kurz für einen Befund. Es sind 28 − 152: die Möblierung, nicht die Seite. Genau der Denkfehler, den ich diese Woche an anderen korrigiert habe, von mir selbst wieder eingebaut. Aufgefallen ist er mir an der unmöglichen Zahl, und ich habe den Fall danach sauber nachgemessen — das sind die acht Zeilen in §4.

**Folge für die Belege:** die 48 Fenster des Möblierungs-Durchgangs ohne JavaScript im Höhenfeger sind unter **Vorschau-Geometrie** gemessen. Ihre Aussage „keine geschnittene Zeile" gilt also für die Vorschau. Die Aussage für den **freigegebenen** Zustand stützt sich auf die acht getrennt gemessenen Zeilen in §4, und die sind sauber.

---

## 6. Urteil

**Alles, was in diesem Nachlauf zu prüfen war, ist behoben oder bestätigt.**

- Die Bedingung des Owners bei 360 × 640 ES ist auf diesem Commit erneut erfüllt.
- N-1, N-2, N-3 und N-5 sind behoben. N-5 ist von 33 geschnittenen Fenstern auf **0 von 352 geprüften** gegangen.
- Der Fuß verhält sich wie von Redesign empfohlen und vom Owner mitzumessen aufgetragen.
- Die englische Aufgabenzeile steht und bleibt einzeilig; dass sie jetzt zeichengleich mit dem Demo-Schluss ist, während die spanische es nicht ist, ist eine Entscheidung und liegt bei Copy und beim Owner.
- Ohne JavaScript bleibt die Hauptaktion auf jedem Fenster im ersten Bildschirm.
- Das Messelement ist nachweislich folgenlos.

**Was offen bleibt, gehört nicht mir:**

- **N-4** — die Unterschrift liegt bei 360 (beide Sprachen) und bei 375 EN unter der Falz. Keine Messung entscheidet, ob das in Ordnung ist. Es ist die Frage, die seit Nachtrag 1 beim Owner liegt: **wie der erste Bildschirm auf dem Telefon unten endet.**
- **V-1** — der Hero-Satz als öffentliches Versprechen. An den Worten hat sich auf diesem Commit nichts geändert; die Lage ist unverändert die aus §5 des großen Durchgangs. **Bei Audit und beim Owner.** Die Zeile des Owners vom 27.11. hält die öffentliche Freigabe ausdrücklich zu, bis die Hero-Aussagen live sind — das deckt sich mit meinem Befund.

Aus technischer Sicht steht diesem Kandidaten **für die geschützte Vorschau** nichts mehr im Weg.

---

*Belege, alle auf `7a46a59` / `dpl_G44cWgQV64jgPcivJtD2Yix2KJhD`: `checks/kurzlauf-7a46a59-1127.json` (Zeilen, Fuß, Hinweis, Titel, Trägheit) · `checks/hoehen-7a46a59-1127.json` (248 Raster- + 104 Feinschritt- + 48 Ohne-JavaScript-Fenster, 32 Umspringproben) · `checks/kontrast-c-7a46a59-1127.json` und `checks/e1-kapsel-7a46a59.json` (N-1 über sechs Fenster, vier Driftphasen). Sonden: `checks/kurzlauf1127.mjs`, `checks/hoehenfeger1127.mjs`, `checks/kontrast1127c.mjs`.*
