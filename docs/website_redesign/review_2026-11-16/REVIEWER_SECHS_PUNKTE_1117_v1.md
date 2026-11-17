# Die sechs neuen Prüfpunkte des Owners (16.11. abends) — messbar gemacht · Di 17.11.2026

**Für:** Audit, Owner, Redesign. **Reviewer (RV6).**
**Anlass:** Owner-Urteil „fast perfekt". Redesign baut bis Mi 14:00, Zwischenstand Di 17:00. Diese
sechs Punkte prüfe ich **ab dem Zwischenstand**; die Notenzeilen folgen Mi nach dem Build.

**Vergleichsstand („Vorher") ist festgehalten:** `b81b486` — seither nur Doku-Commits, der
ausgelieferte Code ist unverändert (`git diff b81b486 29d20cdc -- app lib components public` ist
leer). Ich habe den Inhalt dieses Standes vollständig aufgenommen: **28 Routen, 1 423 Sätze in der
Zielsicht**, dazu je Route die Bauteil-Zahlen (Demo-Reiter, 3D-Schritte, Planzeilen, Planzellen,
direkte Wege, Bilder, Videos, Überschriften, Knöpfe, Links). Datei
`checks/inv-ref-b81b486.json`. Ohne diese Aufnahme wäre „alles ist noch da" am Mittwoch nicht
prüfbar, weil der ausgelieferte Stand bis dahin mehrfach wechselt.

---

## 1 „Ver"-Inhalt im Rahmen der Karte und ohne Scrollen im Bild

| | Bedingung |
|---|---|
| **Rahmen** | Die geöffnete Fläche liegt waagerecht **innerhalb** der Karte: linke Kante ≥ Kartenkante − 1 px, rechte Kante ≤ Kartenkante + 1 px. Gemessen an der Karte, zu der der Knopf gehört (`aria-controls` → `ch-detail-…`) |
| **Im Bild** | Direkt nach dem Tippen, **ohne dass ich scrolle**, sind **≥ 120 px** der neuen Fläche im Fenster |
| **Zusatzangabe** | Ich melde, ob die Seite **selbst** gescrollt hat (Vergleich `scrollY` vor und nach dem Tippen). Das werte ich nicht als Verstoß, aber es gehört in den Bericht |
| **Breiten** | 390 × 844 und 1440 × 900, Zielsicht; jeder Knopf aus **frischem Seitenaufruf** (sonst verschiebt eine offene Karte die anderen — das war mein eigener Messfehler vom 16.11.) |

Stand `b81b486`: Abstand Knopf → Inhalt 0,04 Bildschirme bei 390 und 0,05 bis 0,10 bei 1440; die
Lage **im Rahmen der Karte** war bisher nicht Bedingung und ist noch nicht gemessen.

## 2 Null Wisch-Reihen am Handy

Bei **390 × 844** darf keiner dieser vier Blöcke waagerecht scrollbar sein: **„Y además"**,
**Informe-Karten**, **Vertrauenskarten**, **Pakete**.

**Messung je Block:** `scrollWidth ≤ clientWidth + 1` **und** `overflow-x` ist weder `auto` noch
`scroll`. **Bestanden: 0 Treffer.** Ich melde je Block beide Werte, damit ein Befund sofort
zuzuordnen ist.

## 3 Paketknöpfe

| | Bedingung |
|---|---|
| **Höhe** | Höhe jedes Paketknopfes = Höhe des Knopfes im Seitenkopf, **± 1 px** |
| **Eine Zeile** | Die Beschriftung bricht nicht um: gemessene Höhe ≤ 1,4 × Zeilenhöhe, und `scrollWidth ≤ clientWidth + 1` |
| **Beide Wege** | Je Paket **beides** vorhanden: der Pilot-Knopf **und** der direkte Weg (`[data-plan-direct]`) |
| **Vorauswahl** | Dem direkten Weg folgen (`/contact?interes=contratar&plan=X`) und prüfen, dass das Formular **X** vorgewählt zeigt — der Wert des gewählten Feldes muss `X` sein, für **essential, growth, enterprise** einzeln |

Geprüft bei 390 und 1440, Zielsicht und öffentlich (seit 16.11. abends zeigen beide dasselbe).

## 4 Null Braunwerte

**Messung:** Ich sammle über die ganze Seite jede gesetzte Farbe (Schrift, Hintergrund, Rahmen,
Verläufe), rechne sie nach HSL um und zähle die **braunen**: Farbton **15°–45°**, Sättigung
**≥ 15 %**, Helligkeit **15 %–55 %**. **Bestanden: 0.** Ich melde die gefundenen Farben mit der
Stelle, an der sie stehen, damit nichts geraten werden muss.

**Was mir fehlt:** die Owner-Wahl **FARBE = A oder B**. Ohne sie kann ich „Farben nach der
Owner-Wahl" nicht prüfen, sondern nur die Braunwerte zählen. Bitte den Buchstaben nennen und, wenn
vorhanden, die Farbwerte dazu; sonst prüfe ich gegen die Werte, die Redesign im Zwischenstand als
die gewählten benennt, und sage im Bericht ausdrücklich, dass die Vorlage von Redesign kam.

## 5 Demo-Antworten wortgleich mit Copys Datei

**Messung:** Zeichen für Zeichen, ohne Rücksicht auf Groß- und Kleinschreibung nur dort, wo Copy es
selbst so schreibt; Leerzeichenfolgen werden vereinheitlicht, sonst nichts. Je Kanal und je
Sprache. **Bestanden: jede Antwort auf der Seite steht wörtlich in Copys Datei.**

**Was mir fehlt:** Copys Datei vom Dienstag. Sobald sie da ist, nenne ich Datei und Commit im
Bericht und prüfe dagegen.

## 6 Handy-Tiefe und „nichts verloren"

| | Bedingung | Stand `b81b486` |
|---|---|---|
| **Tiefe** | 390 × 844, Zielsicht, Seite vorher einmal durchgescrollt: **≤ 21 Bildschirme** | **19,1** — damit heute schon erfüllt |
| **Nichts verloren** | Jeder der **1 423 Sätze** der Aufnahme steht noch auf derselben Route; keine Bauteil-Zahl je Route ist kleiner als vorher | Aufnahme liegt vor |

Ich melde am Mittwoch **jeden** verschwundenen Satz einzeln mit seiner Route. Sätze, die sich nur
ändern (neue Beispielwoche, neue Zahlen), melde ich getrennt von solchen, die **ersatzlos**
wegfallen — nur Letztere sind ein Verlust.

**Zur Tiefe, damit die Zahl richtig gelesen wird:** Seit die öffentliche Sicht alles zeigt, ist die
Tiefe in beiden Sichten gleich (19,1 am Handy, 15,7 am Desktop). Vorher war die öffentliche Sicht
mit 15,3 kürzer, weil sie weniger zeigte. Die Grenze von 21 gilt also jetzt für **jeden** Besucher.

---

## Was ich bis zum Zwischenstand brauche

1. **FARBE = A oder B** (Owner), mit den Farbwerten, falls es welche gibt.
2. **Copys Demo-Datei vom Dienstag** mit Commit (Copy).
3. **Commit und Deployment** des Zwischenstands um 17:00 (Redesign).

Ohne 1 und 2 prüfe ich die Punkte 4 und 5 nur zur Hälfte und sage das im Ergebnis dazu.

---

## Nachtrag Di 17.11. vormittags: Redesigns Bauplan präzisiert vier der sechs Punkte

Redesign hat den Bauplan genannt. Was sich an meinen Bedingungen dadurch **ändert**:

| Punkt | Präzisierung | Meine Bedingung danach |
|---|---|---|
| **1** | „Ver" öffnet **in derselben Karte**, der Rahmen wächst, kein loser Text unter den Karten — auch am Desktop nicht | zusätzlich: die geöffnete Fläche hat **denselben Vorfahren** wie der Knopf (die Karte), und **unterhalb** der Kartenreihe entsteht kein neuer Textblock. Dazu wie bisher: waagerecht im Rahmen, ≥ 120 px ohne mein Zutun im Bild |
| **2** | Wisch-Reihen werden durch **Stapelkarten** ersetzt | die Prüfung entfällt **nicht** — sie ist die Art, wie ich „0 Wisch-Reihen" nachweise: `scrollWidth ≤ clientWidth + 1` und kein `overflow-x: auto/scroll` in den vier Blöcken bei 390. Dass dort Stapelkarten stehen, prüfe ich zusätzlich, ersetzt aber die Zahl nicht |
| **3** | Je Paket **zwei gleich sichtbare Wege**: schwarz „Empieza 14 días gratis" → Pilotformular mit Paket; Rahmen „Contratar directamente" → Kontaktformular mit Paket und Betreff | zusätzlich: **gleich breit** (Breitenunterschied ≤ 1 px) und **gleich sichtbar** — beide ohne Scrollen im selben Ausschnitt, keiner kleiner als 44 px hoch. Die Vorauswahl prüfe ich für **beide** Wege, nicht nur für den direkten |
| **4** | Braun ist `--signal-attention`; A = heutiges Blau, B = ohne Blau; Entscheidung bis Di 15:00 | **Wichtig:** `--signal-attention` ist heute `#8a5a12` (Farbton 36°, Sättigung 77 %, Helligkeit 31 % — braun) und wird an zwei Stellen gebraucht, die zur **Vorschau-Möblierung** gehören (`.pv-hint`, `.pv-toggle`), dazu an `.rep-dot` im Bericht. **Ich zähle die Möblierung nicht mit**, sonst melde ich Braun, das gar nicht zur Seite gehört. Gezählt wird, was die Seite selbst zeichnet |
| **6** | D11 ist entschieden: 13 entfällt, **≤ 21** nach meinem Verfahren | unverändert; `b81b486` liegt bei **19,1** und erfüllt es |

**Zu Punkt 4 nenne ich die Zahlen offen**, damit niemand im Dunkeln sucht: Ich melde jede Farbe mit
Farbton, Sättigung, Helligkeit und der Stelle. Grenzwerte: Farbton 15°–45° und Sättigung ≥ 15 %
gelten als Treffer; nach Helligkeit trenne ich „braun" (15–55 %) von „sandfarben/gold" (> 55 %),
damit eine Schwelle nichts verschluckt. Der zweite Wert im Blatt, `#dcb063` (Farbton 38 °,
Sättigung 63 %, Helligkeit 62 %), fiele nach dieser Trennung unter „sandfarben" — ob er auch weg
soll, entscheidet der Owner mit FARBE.

---

## Nachtrag: Copys Vorlagen liegen vor — Punkt 5 ist damit mechanisch prüfbar

`COPY_TO_REDESIGN_1117_DEMO_REPLIES_PLAN_BUTTONS_v1.md`, Commit **`5445214`**, von mir im Repo
gelesen. Ich habe die Soll-Texte **maschinell herausgezogen** und abgelegt
(`checks/expected-demo-replies-5445214.json`), damit am Mittwoch nichts von Hand verglichen wird:

| Reiter | Stelle | Soll |
|---|---|---|
| WhatsApp · Laura | `home-demo.ts:127` | eine Antwort, ES + EN |
| Email · Carmen | `home-demo.ts:171` | eine Antwort, ES + EN |
| Formulario web · Sofía | `home-demo.ts:197–211` | **neu**: Kopf „Respuesta por email · martes 11:33" und eine Antwort, ES + EN |
| Teléfono · Álvaro | `home-demo.ts:245` | eine Antwort, ES + EN |
| Story · Laura | `home-story.ts:150/:153` | eine Antwort, ES + EN |

**Absichtlich gestrichen — das zählt am Mittwoch nicht als Verlust**, und ich führe es getrennt auf:
„Queda para el equipo: …" (Teléfono), „Queda en tu ficha." (Story), „¿Te viene mejor por la mañana
o por la tarde …" (WhatsApp, Email, Story), die „¿verdad?"-Rückfragen (WhatsApp, Email). **Erlaubt,
falls am Handy nötig:** „Gracias por escribirnos." in WhatsApp und Email weglassen — sonst nichts.
Dazu aus der Beispielwoche (`88143c1`, `006bad9`): die deutsche Keller-Szene samt Übersetzung und
„gehaltener Antwort" sowie „2 de 25 en otro idioma".

**Paketknöpfe, beide Sprachen** (Punkt 3): ES „Empieza 14 días gratis" · „14 días gratis, sin
tarjeta" · „Contratar directamente" · Betreff „Contratar {Plan}"; EN „Start 14 days free" · „14
days free, no card" · „Go straight to a plan" · „We reply within 24 working hours, with the terms
in writing." · Betreff „Request the {Plan} plan".

**Damit fehlt von meinen zwei offenen Dingen nur noch eines: FARBE = A oder B vom Owner.**
