# RV6 — Durchgang auf `bea7d19`, die sechs Noten einzeln

**Gemessen** 23.11., ein Durchgang, Vorher-Basis `92f873d`.
**Kandidat** Commit `bea7d19` · Deployment `dpl_H6WfQ1GKkjwRtP8F5wq2ZH3SKjUK` · `env=preview`, `mode=stub`.
**Vorher** `92f873d` · `dpl_7j8zGi1u9Hua49DAX6jjmV88zFHH`.
Build bei **jeder** Sonde am Anfang und am Ende gelesen: **in allen Läufen STABIL**, kein Lauf VOID.

Seiteninhalt des Kandidaten = `2024697` wie festgelegt:
`git diff --name-only bd21830 bea7d19 -- lib components app` ist leer, `bea7d19` fügt nur zwei
Dokumentdateien hinzu (APIs Beleg und meinen §11). `/api/build` meldet `bea7d19`.

---

## 1. Die sechs Noten

| Note | Ergebnis | Begründung in Zahlen |
|---|---|---|
| **Verständlichkeit** | **10** | alle drei Erstbesucher-Aufgaben ohne Anleitung beantwortbar; der 10-Sekunden-Satz steht im ersten Bildschirm |
| **Modernität/Bewegung** | **9** | Wege kürzer als vorher, Bewegung abschaltbar ohne Verlust — aber **R-12** (die fertige Aufgabe steht 4,1 s) und die 3D-Zeilen habe ich in diesem Durchgang **nicht** gemessen |
| **Premiumgefühl** | **9** | **0** Tippziele unter 44 px bei 375, ES und EN; feste Leiste verdeckt nichts — Fotografieanteil und schwarze Statusetiketten (D2) in diesem Durchgang **nicht** gemessen |
| **Texte** | **10** | **0** Marken-Sätze auf `/`, `/faq`, `/contact`, `/trial` in beiden Sprachen; Beispieldaten gekennzeichnet; konkrete Verben |
| **Verkaufswirkung** | **10** | **8 von 8** Wegen (4 je Sprache) enden an der passenden Bestätigung; Button, Linkziel, vorgewähltes Formular und Bestätigung stimmen überein |
| **Kaufinteresse** | **10** | die fertige Aufgabe steht **im ersten Bildschirm** bei 375 in ES und EN; vorher stand sie dort **nicht**; Paketfrage richtig beantwortbar |

**Keine Zeile unter 9.** Nach dem vereinbarten Maßstab erzwingt damit keine Zeile eine
Nachbesserung. Zwei Zeilen stehen auf 9, und ich sage bei beiden ausdrücklich, dass ein Teil ihrer
Kriterien in diesem Durchgang **nicht gemessen** ist — eine 10 wäre dort eine Behauptung.

---

## 2. Vorher / Nachher, dieselbe Messung auf beiden Deployments

| Messung | Vorher `92f873d` | Kandidat `bea7d19` |
|---|---|---|
| Marken-Sätze `/` | ES **17** / EN **18** | **0 / 0** |
| Marken-Sätze `/faq` | je **10** | **0 / 0** |
| Marken-Sätze `/contact`, `/trial` | je **1** | **0 / 0** |
| Tippziele unter 44 px bei 375 | `/` **7**, `/packages` **4**, `/faq` **4** | **0** auf allen fünf Seiten **und** im offenen Menü |
| Rückrufaufgabe im ersten Bildschirm (375) | **nein** (kein „Llamar a Mila", keine Ref., kein „TAREA") | **ja**, ES und EN, mit Ref. 9895153 |
| Feste Elemente auf dem Schirm in Ruhe (375) | **60 px von 812 = 7,4 %** | **60 px von 812 = 7,4 %** |
| Gratis-Angebot | `/packages` zeigt **vier** Gratis-Buttons | Gratis-Wendung an Growth: **nein**, an Enterprise: **nein**; 3 Sätze mit „14 Tage", **alle** nennen Essential |

**Zur festen Leiste:** beide Builds haben zwei `position:fixed`-Elemente — den Kopf 375×60 und die
Handyleiste 375×65, die in Ruhe bei `top=819` **außerhalb** des 812 px hohen Schirms liegt. Das
bestätigt noch einmal, dass meine frühere Zahl „299 px = 37 %" falsch war; sie war es für **beide**
Builds. Die Zeile in meinem Protokoll §2.1 ist damit endgültig erledigt.

---

## 3. Die zwei Handywege

### W-1 Milas Anfrage → ihre Rückrufaufgabe

Im **ersten Bildschirm**, ohne eine einzige Rollbewegung, bei 375×812:

    y=236  PARA AGENCIAS INMOBILIARIAS EN ESPAÑA
    y=280  Mientras enseñas un piso, ¿quién atiende a Mila?
    y=397  NuovaSolution le contesta por WhatsApp al momento … y te deja la tarea lista
    y=495  CONSULTA POR WHATSAPP · 11:42
    y=517  Hola, busco un piso de 3 dormitorios en Nerja, hasta 350.000 € …
    y=610  TAREA PARA MARTA
    y=632  Llamar a Mila · Comprobar disponibilidad de la ref. 9895153
    y=679  Pide que la llamen · Disponibilidad sin confirmar
    y=715  Ejemplo · datos ficticios
    y=749  Ver cómo queda la tarea   (56 px hoch)

**Redesigns Prüfpunkt bestätigt:** „Ver cómo queda la tarea" (358×56, Tippen landet, `crowd=1`)
führt auf `#demo` mit `data-demo-channel="whatsapp"` und der Aufgabenkarte „Llamar a Mila hoy a
partir de las 17:00 · Comprobar disponibilidad de la ref. 9895153", Zustand „Respondida
automáticamente · Llamada pendiente". EN gleichwertig, dort hält der Verlauf die spanische
Kundennachricht mit einer Übersetzungszeile darunter — das ist die Mehrsprachigkeit an der Stelle,
an der sie etwas beweist.

### W-2 Paketwahl → richtiges Formular → Bestätigung

**8 von 8** (vier Wege, zwei Sprachen). Je Weg stimmen Linkziel, Vorauswahl, Betreff, Absendeknopf
und Bestätigung überein:

| Weg | Linkziel | `interest` | Betreff | Knopf | Bestätigung |
|---|---|---|---|---|---|
| Essential Prueba | `interes=trial&plan=essential` | `trial` | „Prueba gratuita · 14 días con Essential" | „Pedir la prueba" | eigener Text + 3 Schritte |
| Growth Demo | `interes=demo&plan=growth` | `demo` | „Demo · plan Growth" | „Pedir la demo" | eigener Text + 3 Schritte |
| Enterprise Gespräch | `interes=talk&plan=enterprise` | `talk` | „Conversación · plan Enterprise" | „Enviar" | eigener Text + 3 Schritte |
| Essential contratar (R-4) | `interes=contratar&plan=essential` | `contract` | „Contratar Essential" | „Enviar solicitud" | eigener Text, **ohne** Schritte |

Jede Bestätigung trägt die Vorschau-Wahrheit „esta solicitud no se ha enviado a nadie" und die
Paketzeile „Plan que te interesa: …". **Kein „24 h"** in irgendeiner Bestätigung.

---

## 4. Der Sprachwechsel mitten im Formular (Owner-Punkt 4) und R-9/R-9b

**6 von 6** geraden Läufen: drei Wege × beide Richtungen. URL behält `interes` **und** `plan`, das
lebende Formular behält den Weg, getippte Felder (Agentur, Name, E-Mail, Telefon) kommen zurück,
und der Betreff wird der **eigene** der neuen Sprache.

**R-9b, meine eigene Gegenprobe: 8 von 8.** Notiz **vor** der Vorbelegung und Notiz **dahinter**,
je mit Sprachwechsel und mit Wegwechsel, ES und EN. In **keinem** Lauf reist der Betreff des
verlassenen Weges oder der verlassenen Sprache mit:

    ES, Notiz davor, Sprachwechsel:  "nota R9 arriba Free trial · 14 days on Essential"
    ES, Notiz davor, Wegwechsel:     "nota R9 arriba Demo · plan Growth"
    EN, Notiz dahinter, Wechsel:     "Prueba gratuita · 14 días con Essential nota R9 arriba"

Die Läufe mit der Notiz dahinter sind die **Gegenkontrolle** und bleiben sauber — die Sonde taugt
also für den Fall, den sie prüfen soll. **R-9b ist behoben.**

---

## 5. Tastatur, Zurück, reduzierte Bewegung, Tippziele

| | Ergebnis |
|---|---|
| Tab-Schritte bis zur Hauptaktion | **6**, ES und EN; **0** Stopps auf Elementen ohne Fläche; Fokusring `solid 2px` |
| Zurück-Taste | landet auf der richtigen Seite, Rollposition **0 px** Abweichung (zweimal geprüft) |
| Sprachwechsel | Verweis im Menü **44×44**; die zwei `0×0`-Kopien im eingeklappten Kopf sind nicht erreichbar und auch kein Fokusstopp |
| `prefers-reduced-motion: reduce` | Medienabfrage greift **in** der Seite; **0** laufende Bewegungen; die fertige Aufgabe wird sofort gezeigt (`auto=false`, `phase=12`, `done=true`) — dasselbe Ergebnis ohne Bewegung |
| Tippziele unter 44 px, 375 **und** 390, ES und EN | **0** auf `/`, `/packages`, `/contact`, `/platform`, `/faq` und im offenen Menü |
| Menü | Schaltfläche 44×44, 17 Einträge, „Prueba Essential" führt auf `/…/contact?interes=trial&plan=essential` (R-1/R-2 am Deployment bestätigt) |

### Die eine Fundstelle unter 44 px ist **kein** Mangel

Meine Zählung fand genau ein Element unter 44 px: ein unbeschriftetes Eingabefeld 215×24 auf dem
Formular. Das ist die **Spam-Falle**, und sie ist richtig gebaut. Gemessen:

    left = -9958        (Umhüllung `label.prq-web`: position:absolute, height:1px, overflow:hidden)
    tabindex = "-1"     und im echten Tab-Lauf kein Fokusstopp: name→email→phone→interest→message→…
    autocomplete = "off"
    elementFromPoint in ihrer Mitte: "none"   — ein Tippen dort trifft nichts

Eine Falle **soll** klein sein; gefährlich wäre nur eine, die ein Mensch sehen, tippen oder
antabben kann, denn ein gefülltes Fallenfeld lässt die Anfrage verwerfen. Beides ist hier
ausgeschlossen. **Redesigns Angabe „0 unter 44 px" ist damit richtig**, und meine 1 ist eine
Fundstelle, kein Befund.

*Kleine Randnotiz, kein Mangel:* das Feld liegt in einem `<label>` ohne zugänglichen Namen und ohne
`aria-hidden`. Außerhalb des Tab-Laufs könnte eine Vorlesesoftware es im Stöbermodus als
unbeschriftetes Feld ansagen. Ein `aria-hidden="true"` auf der Umhüllung wäre der saubere Abschluss.

---

## 6. R-12 — neu, und **keine** Regression

**Der Vorführteil läuft von selbst an**, wie vom Owner am 13.11. entschieden. Sobald der Abschnitt
den Schirm füllt: `entered=run`, Lauf 1, Phase 1→2→4→5→10→12, fertig nach rund 10 s. Mit
`prefers-reduced-motion` zeigt er stattdessen sofort den Endzustand und bewegt nichts. **Beides ist
richtig.**

**Aber er läuft in einer Schleife, und der Endzustand ist der Lohn des ganzen Wegs.** Gemessen bei
400 ms Auflösung:

| | ES | EN |
|---|---|---|
| Endzustand erreicht | +10 641 ms | +10 331 ms |
| Schleife startet neu | +14 741 ms | +14 872 ms |
| **die fertige Aufgabe steht** | **4 100 ms** | **4 541 ms** |
| Wörter auf der Aufgabenkarte | **91** | **90** |

Vier Sekunden für 91 Wörter. Eine Leserin mit 200 Wörtern je Minute bräuchte etwa **27 Sekunden**.
Selbst wer **nur** die Aufgabenzeile liest („Llamar a Mila hoy a partir de las 17:00 · Comprobar
disponibilidad de la ref. 9895153", 14 Wörter ≈ 4,2 s) kommt gerade nicht durch — und das unter der
Annahme, dass ihr Blick im Moment des Fertigwerdens schon auf der Karte liegt. Zustand, „BUSCA" und
„PIDE" liest in diesen vier Sekunden niemand.

**Es ist keine Regression:** auf `92f873d` steht der Endzustand **4 134 ms**, also praktisch
gleich lang. Der Punkt ist alt und wird erst jetzt wichtig, weil der Owner diesen Weg zum
Hauptweg gemacht hat und der Vorführteil von selbst anläuft.

**Vorschlag, und die Entscheidung liegt beim Owner:** nach dem ersten Lauf **stehen bleiben** statt
neu zu starten. Der Knopf „Repetir demo" (44×44) ist schon da — die Schleife macht ihn überflüssig
und löscht gleichzeitig den Lohn. Einmal laufen, dann halten, Wiederholung auf Wunsch.

---

## 7. Eine kleine Beobachtung für Copy

Die Bestätigung des Weges `contratar` ist die einzige **ohne** „Qué pasa ahora"-Schritte — die
anderen drei haben je drei. Gemessen in **beiden** Sprachen, also kein Übersetzungsversehen. Es ist
der Weg mit der höchsten Kaufabsicht und der mit der geringsten Führung danach. Kein Mangel, aber
auffällig.

Zum Kriterium **„je Paket eine Hauptaktion"**: Essential und Growth tragen **zwei** Aktionen
(Hauptaktion und „Solicitar contratación"). Das ist **R-4**, die ausdrückliche Gestaltungs­ent­schei­dung
des Owners vom 23.11., und damit jünger als das Kriterium. Ich ziehe dafür nichts ab und melde nur,
dass die beiden Festlegungen einander widersprechen; auflösen kann das nur der Owner.

---

## 8. Was dieser Durchgang **nicht** gemessen hat

Ich nenne es, damit die zwei Neunen nicht wie ein Geschmacksurteil aussehen:

- **3D-Zeilen** der Note Modernität (Titel bleibt, „Paso 2 de 4", vier Schritte direkt anwählbar,
  **eine** Bildfläche) — nicht gemessen.
- **Fotografieanteil** und die **schwarzen Statusetiketten (D2)** der Note Premiumgefühl — nicht
  gemessen.
- **Echtes Gerät.** Hier läuft Edge im Kopflosbetrieb mit Gerätemaßen. iPhone/Safari und
  Android/Chrome sind **nicht** geprüft. Simulation und echtes Gerät bleiben getrennte Spalten, und
  die zweite ist leer, bis ein Mensch sie füllt.
- **Bestätigungsmail Growth/Enterprise** — auf der Vorschau gilt `mode=stub`, es wird nichts
  verschickt. Bleibt **Lücke**, kein Mangel, bis APIs Staging-Beleg vorliegt.
- **Register-Abgleich** Seite für Seite gegen `704960b6` für die Lückenliste zum 04.12. — steht noch
  aus und ist der nächste Schritt.

---

## 9. Eigene Fehler in diesem Durchgang, benannt

Vier Stück, alle **vor** der Benotung gefunden, drei davon hätten falsche Befunde ergeben:

1. **sessionStorage lief zwischen den Läufen über.** R-9 hält die getippten Felder für den Tab —
   also starteten meine Läufe 2 bis 4 auf dem Text des Vorlaufs, und `wege` las meine eigenen Werte
   als „Vorbelegung der Seite". Behoben: Speicher leeren, neu laden, prüfen, dass er leer ist. Danach
   alles neu gefahren; die Zahlen oben sind die saubere Messung.
2. **Zum Selbstanlauf zweimal falsch gemessen.** Erst sprang mein `scrollIntoView` den Abschnitt an,
   worauf er sofort auf `entered=end` stand — ein Artefakt des Sprungs. Dann rollte ich zu kurz, der
   Abschnitt blieb auf `not-yet`, und ich hätte „läuft nicht von selbst" gemeldet. Erst progressives
   Rollen, bis der Abschnitt wirklich steht, zeigt die Wahrheit: **er läuft von selbst.**
3. **Mein Sprachwechsel-Kriterium verglich die Abfragezeichenfolge als Text.** `?plan=…&interes=…`
   gegen `?interes=…&plan=…` meldete „NOT the same page" — dieselben Parameter, andere Reihenfolge.
   Falschmeldung meiner Prüfung, nicht der Seite.
4. **Überflüssige Maskierung** in der neuen Tippziel-Sonde (`\\\\s` statt `\\s`) hätte die
   Beschriftungen zerlegt. Vor dem Lauf gefunden und **belegt** behoben: die Zeichenkette, die der
   Browser bekommt, ist jetzt `/[\s ]+/`, und „Gestionar" bleibt „Gestionar".

Dazu die Einordnung von Redesigns 14/14: das war und bleibt die **Angabe des Erbauers**. Meine
Zahlen oben sind unabhängig erhoben und **bestätigen sie**.

---

## 10. Stand der Befunde

| | |
|---|---|
| Am Deployment bestätigt behoben | R-1, R-2, R-3, R-7, R-9, **R-9b**, R-10, R-11 |
| Zurückgezogen, meine eigenen Messfehler | R-6, R-8 |
| Gestaltungsentscheidung des Owners | R-4 (zwei Aktionen auf Essential und Growth) |
| Geprüft, kein Mangel | R-5, die Spam-Falle unter 44 px, das Meta-Nachrichtenfenster „24 h" |
| **Neu, offen** | **R-12** — die fertige Aufgabe steht 4,1 s, bevor die Schleife sie löscht; **keine** Regression |
| Lücke, kein Mangel | Bestätigungsmail Growth/Enterprise bis APIs Staging-Beleg; WhatsApp über die Agenturnummer (Meta-Verifizierung) |

Ich habe in diesem Durchgang **keine Zeile Anwendungscode** angefasst.

5. **Zwei Belegdateien überschrieben sich.** In meiner Schleife stand `$L375` statt `${L}375`, also
   schrieben der ES- und der EN-Lauf in **dieselbe** Datei — der englische überschrieb den spanischen.
   Die Zahlen standen in der Laufausgabe und waren gleich, aber ein Beleg, den es nicht gibt, ist
   kein Beleg. Beide Läufe neu gefahren, richtig benannt, Ergebnis identisch. Dabei fiel auf, dass
   ich die Tippziele bei **390 in EN** noch gar nicht gefahren hatte, während mein Satz oben beide
   Breiten in beiden Sprachen behauptete — nachgeholt statt den Satz abzuschwächen. Alle vier
   Kombinationen (375/390 × ES/EN): **0** echte Tippziele unter 44 px.
