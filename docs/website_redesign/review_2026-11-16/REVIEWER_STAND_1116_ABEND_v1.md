# Stand Montagabend 16.11. — gemessen auf Redesigns Korrekturen · Reviewer

**Keine Note.** Der feste Build kommt Mi 18.11. 14:00. Dies ist der Vergleich gegen die
Vergleichsbasis `868602c`, damit am Mittwoch nichts offenbleibt, was heute schon sichtbar ist.

**Wichtig zur Lesart:** Der feste Link (Branch-Alias) hat sich während meiner Messungen **dreimal**
geändert. Jede Zahl unten trägt deshalb den Commit, auf dem ich sie gemessen habe:
`1b35d34` → `06f014d` → **`3c2a413`** (`dpl_D19yEESibmwztT1q8SbZ48FiZj2r`). Wo zwei Commits
dieselbe Zahl ergaben, steht es dabei.

---

## Übersicht

| Prüfpunkt | `868602c` | jetzt | gemessen auf | Urteil |
|---|---|---|---|---|
| **F22(a)** Band im ersten Bildschirm ≥ 120 px | 56 / 0 / 64 / 56 / 8 / 0 px | **128 / 128 / 136 / 128 / 128 / 128 px** | `1b35d34` **und** `06f014d` | **bestanden** |
| **1** „Ver …" → Inhalt ≤ 0,15 Bildschirme | 1,62 / 0,82 / 0,02 | **0,04 / 0,04 / 0,04** (390) · **0,10 / 0,05 / 0,07** (1440) | `1b35d34` | **bestanden** |
| **2** Scrolltiefe Handy ≤ 13 | 25,0 | **19,4** Ziel · 15,3 öffentlich | `3c2a413` | **nicht bestanden** |
| **2** Scrolltiefe Desktop ≤ 13 | 17,5 | **16,1** Ziel · 10,3 öffentlich | `3c2a413` | **nicht bestanden** |
| **3** Inter überall | 10 × Fraunces | **0 × Fraunces**, 26 × Inter | `1b35d34`, `3c2a413` | **bestanden** |
| **4** 3D startet auf 01 | stand auf 02 | **01 „Plano"** (`data-m3d-step = 0`); alle vier Reiter schalten, Medien wechseln mit | `1b35d34` | **bestanden** |
| **6** „Planes" einmal | zweimal | **einmal** (H2), öffentlich keine solche Überschrift | `3c2a413` | **bestanden** |
| **6** kein „Gratis" bei Essential | keiner | **keiner** | `3c2a413` | **bestanden** |
| **PK-0** „pueden empezar" | — | **„Todos los planes pueden empezar …"** / „Every plan can start …", **0 ×** „empiezan" | `3c2a413` | **bestanden** |
| **3D-Chat ohne Lieferzeit** | — | **„Te avisamos cuando esté listo."** vorhanden; „jueves" nur noch der **Besichtigungstag** der Beispielwoche | `3c2a413` | **bestanden** |
| **K2** Titel | — | „Ninguna consulta se queda sin aviso", alter Titel **0 ×** | `3c2a413` | **bestanden** |
| **B** `/platform/*` öffentlich ohne WhatsApp | 6 / 4 / 3 | **0 / 0 / 0** (ES) und **0 / 0 / 0** (EN) | `3c2a413` | **bestanden** |
| **Verbotsliste öffentlich** | sauber | **sauber** — keine Demo, kein Selbst-Start, kein „Recomendado", kein Score-Satz, kein „número de tu agencia", kein Instagram | `3c2a413` | **bestanden** |

**Auf `06f014d` war zwischenzeitlich zweierlei noch offen** und ist auf `3c2a413` erledigt: PK-0
stand dort noch als „Todos los planes **empiezan**", und die 3D-Chatblase sagte noch „Te lo
entregamos **el jueves**." Beides habe ich gemeldet und messe es jetzt als behoben.

---

## Was offen bleibt

### 1 Scrolltiefe — und warum meine Zahl höher ist als Redesigns

Redesign misst **ohne Durchscrollen** 16,3 (Handy) und 13,1 (Desktop). Ich messe **nach dem
Durchscrollen** 19,4 und 16,1. Beide Zahlen stimmen; sie messen nur Verschiedenes:

- Ohne Durchscrollen sind die unteren Abschnitte durch `content-visibility` noch
  zusammengeklappt, die Seite meldet eine zu kleine Höhe.
- Nach dem Durchscrollen steht die **wirkliche** Länge da — und die bekommt der Besucher zu sehen,
  sobald er unten ankommt.

**Für die Note gilt meine Bedingung**, weil sie das misst, was der Besucher durchscrollt: Handy
390 × 844, Zielsicht, Seite vorher einmal ganz durchgescrollt. Danach fehlen heute **6,4
Bildschirme** zum Ziel. Redesign hält 13 ohne inhaltliche Kürzung für nicht erreichbar; das ist
die Entscheidung des Owners (Redesigns D11), keine Messfrage. Ich melde am Mittwoch den Wert.

### 2 Formular: drei Pflichtfelder — gemessen, aber nicht abgeschickt

`/es/contact`, Zielsicht, `3c2a413`/`1b35d34`: **7 Felder**, davon als Pflicht ausgezeichnet
**zwei** (`agency`, `name`). `email` und `phone` tragen **kein** `required` — die Regel „E-Mail
**oder** Telefon" wird offenbar erst beim Absenden geprüft. Das Einwilligungs-Häkchen ist weg und
durch eine Zeile mit Link ersetzt, wie Copys FM-pv es vorsieht.

**Ich habe das Formular nicht abgeschickt.** Ein Absenden erzeugt eine Anfrage, und dafür habe ich
keinen Auftrag. Am Mittwoch melde ich daher: die Feldstruktur (drei Angaben: Agentur, Name, E-Mail
oder Telefon) und ausdrücklich, dass der Weg bis zur Bestätigung **nicht** durchlaufen wurde. Will
der Owner das geprüft haben, sage er es; dann brauche ich eine Freigabe, an welche Adresse die
Testanfrage gehen darf.

### 3 „Contratar directamente" — anders gebaut als die Bedingung lautet

Die Bedingung des Owners lautet „kleiner als der Pilot-Knopf". Auf dem Build ist der direkte Weg
**kein eigener Knopf**, sondern eine **Auswahl im Formular** („¿Qué te interesa? · Piloto gratuito ·
Contratar un plan"). Ein Flächenvergleich mit dem Pilot-Knopf (308 × 56 px, 17 248 px²) geht damit
ins Leere.

**Mein Vorschlag für die Bedingung, falls der Owner nichts anderes sagt:** der direkte Weg ist
nicht als Hauptknopf gestaltet (kein schwarzer Grund, keine Knopfform) und steht **unter** dem
Pilot-Knopf. Beides prüfe ich dann messbar.

---

## Für Mittwoch bleibt meine Liste

Lighthouse nach D-4 (3 Läufe, Median, allein auf der Maschine, Bypass-Header, Gewichtsbudget), CLS,
LCP, Tippziele ≥ 44 px bei 360/390/414, `reduced-motion`, der Lauf ohne JavaScript, Copys
Textzeilen, und die **neun Zeilen der Notentabelle B-1** mit je einem Bild, **getrennt für Handy
und Desktop**.

---

## Nachtrag: die zwei offenen Fragen sind beantwortet — beide bestanden

Redesign hat die Selektoren genannt; gemessen auf `b207efa` / `fbe4a4a` (Code unverändert seit
`3c2a413`), Beleg `checks/form-rules-b207efa.json` und `checks/direct-b207efa.json`.

### Formular: drei Pflichtangaben, ohne eine einzige echte Anfrage

Ich habe die Regel **an der Route selbst** geprüft, nicht durch ein normales Absenden. Zuerst habe
ich `app/api/pilot-request/route.ts` gelesen: Fehlende Pflichtangaben werden in Zeile 25/26 mit
**422** abgewiesen — also **vor** der Stelle, an der überhaupt etwas weitergereicht würde; und ohne
gesetzte Umgebungswerte antwortet die Route mit `delivery: "simulated"`, speichert nichts, sendet
nichts, schreibt nichts ins Protokoll. Meine vier Proben lagen deshalb alle in Zweigen, aus denen
nichts hinausgehen kann:

| Probe | Antwort |
|---|---|
| nur Agentur + Name | **422** `fields: ["reach"]` |
| Name + Telefon, ohne Agentur | **422** `fields: ["agency"]` |
| Agentur + Name + unsinnige E-Mail | **422** `fields: ["email"]` |
| Agentur + Name + Telefon, **mit gesetzter Honigtopf-Falle** | 200 `delivery: "simulated"` |

Dazu im Browser: Agentur und Name ausgefüllt, E-Mail und Telefon leer, Absenden gedrückt → die
Seite zeigt **„Déjanos un email o un teléfono para contestarte."**, unter den Feldern steht
dauerhaft „Email o teléfono, como prefieras."

**Ergebnis: genau drei Pflichtangaben — Agentur, Name, und E-Mail *oder* Telefon.** Das
Einwilligungs-Häkchen ist weg. **Bestanden.** Eine echte Anfrage ist dabei nicht entstanden.

### „Contratar directamente": deutlich kleiner, kein Hauptknopf, darunter

Auf `/contact`, beide Breiten:

| | direkter Weg | Pilot-Knopf | Verhältnis |
|---|---|---|---|
| 390 | `button.prq-direct`, **167 × 23 px = 3 748 px²**, 15 px, Gewicht 500, **ohne Grund**, unterstrichen, eckig | 308 × 56 px = 17 248 px², 17 px, Gewicht 600, schwarz, Pillenform | **4,6-mal kleiner** |
| 1440 | dasselbe, 3 748 px² | 494 × 56 px = 27 664 px² | **7,4-mal kleiner** |

Er steht **unter** dem Pilot-Knopf (oben 2023 gegen 1955 bei 390). **Bestanden.**

In der Paket-Übersicht liegen zusätzlich **sechs** `a.plans-direct` mit den richtigen Zielen
(`/es/contact?interes=contratar&plan=essential|growth|enterprise`), gleiche Gestalt (14 px,
unterstrichen, ohne Grund, eckig). **Ihre gerenderte Größe konnte ich nicht messen** — sie melden
0 × 0 px, liegen also im Moment der Messung in einem nicht ausgeklappten Behälter. Die Gestalt ist
damit belegt, die Größe nicht; am Mittwoch messe ich sie an der Stelle, die Redesign mir nennt.

### Nachtrag: die sechs Links in der Paket-Übersicht sind jetzt gemessen

Redesigns Erklärung stimmt: es sind **zwei Sätze zu je drei**, die sich nach Breite abwechseln.
Unter 1024 px stehen die Karten (`card-*`), ab 1024 px die Vergleichstabelle (ohne Präfix); der
jeweils andere Satz ist `display: none`. Gemessen wird deshalb je Breite nur der gerenderte Satz:

| Breite | gerendert | Größe | Pilot-Knopf daneben | Verhältnis |
|---|---|---|---|---|
| **390** | `card-essential`, `card-growth`, `card-enterprise` | je **316 × 21 px = 6 636 px²** | 316 × 48 px = 15 168 px² | **2,3-mal kleiner** |
| **1440** | `essential`, `growth`, `enterprise` | je **88 × 42 px = 3 711 px²** | 132 × 90 px = 11 821 px² | **3,2-mal kleiner** |

Beide Sätze: 14 px, unterstrichen, ohne Grund, eckig, Ziel
`/es/contact?interes=contratar&plan=…`. **Damit ist „kleiner als der Pilot-Knopf" an allen vier
Stellen belegt** — auf `/contact` 4,6- und 7,4-mal, in der Paket-Übersicht 2,3- und 3,2-mal. Der
Punkt ist geschlossen; meine Einschränkung von vorhin entfällt.
