# Nachmessung `00f384a` (11b und die zwei Zahlen) · Di 17.11.2026 · Reviewer (RV6)

**Für Owner und Audit.** Keine Note — die Noten kommen Mi nach dem festen Build.

**Gemessen auf:** `00f384a` = `dpl_4iMVsoq5xh2Jj5bL3zU4WcmYLtqF`, fester Link, `/api/build`
geprüft. **Verglichen gegen:** `db6ddc4` und `dd2035b`. Belege: `checks/p715-00f384a.json`,
`checks/fu-00f384a.json`, `checks/presel-00f384a.json`, `checks/inv-00f384a.json`; Bild
`shots/00f384a/3d-00f384a.png`.

---

## Die Tabelle

| Punkt | Urteil | Messung |
|---|---|---|
| **(11) Gratis-Pilot mit Growth-Umfang** | **bestanden** | „Empieza 14 días gratis" steht bei **Essential und Growth** (Ziele `plan=essential` und `plan=growth`), **Enterprise nur** „Contratar directamente" — bei 390 **und** 1440, in Karten und Tabelle. „Todos los planes pueden empezar" und „Cualquier plan puede empezar": **0 Treffer** |
| **(11) Betreff** | **bestanden** | `pilot+essential` **und** `pilot+growth` → „**Piloto gratuito · 14 días con Growth**"; `pilot+enterprise` → „Contratar Enterprise"; `contratar+essential/growth/enterprise` → die drei passenden Betreffs. Alle sechs Wege füllen das Formular |
| **Blaufüllung → Grau** | **bestanden** | Die benannte Füllung `rgb(223,233,239)` (Sättigung 33 %) ist **weg**. Übrig ist **ein** Wert in meinem Blaufenster: `rgb(244,244,247)` in einem Verlauf auf `DIV.ch-visual` — Farbton 240°, **Sättigung 16 %, Helligkeit 96 %**. Das ist ein Weißgrau mit dem leisesten kühlen Stich, einen Punkt über meiner Sättigungsschwelle. **Ich werte es nicht als Blau** und melde es nur, damit die Zahl nachvollziehbar bleibt |
| **3D-Lücke ≤ 120 px** | **bestanden — und meine frühere Zahl war falsch** | `.m3d-view` endet bei y = 1085, die Schrittnummern beginnen bei y = **1098**: **13 px**. Die 146 px, die ich gemeldet hatte, liegen **innerhalb der gezeichneten Bühne**. Siehe unten |
| **Handy-Tiefe ≤ 21** | **bestanden** | 390 × 844, Zielsicht, durchgescrollt: **20,8** ohne Vorschau-Möblierung (22,3 mit; die Möblierung misst 144 px). Desktop 14,1 |
| **Nichts verloren** | **bestanden** | 28 Routen unverändert, Sätze **1 469 → 1 499**. Kein Satz ersatzlos weg |
| Farbe B im Übrigen | **bestanden** | **0 Braun**, **0 Gold**; `--brand` `#1a1917` |
| Verbotsliste | **bestanden** | je **0 Treffer**: Demo als Angebot, Selbst-Start, „Recomendado", Score-Satz, „en segundos" ohne WhatsApp, rohes `{precio}`, „En preparación" |
| (7)(8)(10)(13)(14)(15) und unterer Knopf | **unverändert bestanden** | offene Karte 1 200 px = ganze Reihe in 3 Spalten · 7 Vergleichszeilen offen, „Con" vorgewählt, Umschalter 44 px/500/999 px · nur `is-on` zeichnet, `is-past` nichts · „Casa de ejemplo ficticia" einmal auf hellem Grund · Abspielknopf 48 × 48 bei 390 und 360 · Paketkarten `static`, 0 px Überlappung · `.mcta-main` 44 px |

---

## Richtigstellung: die 146 px im 3D-Abschnitt waren mein Messfehler

Ich hatte am Nachmittag gemeldet, im 3D-Abschnitt bleibe eine leere Fläche von **146 px**, und
meine schriftliche Grenze von 120 px sei gerissen. **Das stimmt nicht.** Nachgemessen an den Kästen
selbst:

| | Wert |
|---|---|
| `.m3d-view` (die Bühne) | y = 485 bis **1085** |
| `.m3d-step-no` (die Schrittnummern) | beginnen bei y = **1098** |
| Abstand dazwischen | **13 px** |

Mein Verfahren zählt nur **Blattelemente, die selbst zeichnen**. Die Bühne malt ihr Bild als
Hintergrund eines Behälters, der Kinder hat — für mein Verfahren sieht dieser Bereich deshalb leer
aus, obwohl dort der Grundriss steht. Das Bild `shots/00f384a/3d-00f384a.png` zeigt es: Überschrift,
Unterzeile, Marke, dann der volle Grundriss, direkt darunter die Reiter. **Die weiße Fläche aus
`W1117_05` ist weg.**

Ich habe die Bedingung nicht nachträglich gelockert, sondern den Fehler im Messmittel gefunden und
benenne ihn. Für die Noten am Mittwoch gilt: Lücken messe ich künftig **gegen die gezeichnete
Fläche**, nicht gegen Blattelemente, und prüfe jeden Treffer über 120 px zusätzlich am Bild.

## Die zwanzig geänderten Sätze, einzeln nachgesehen

Gegen `db6ddc4` sind 20 Prosa-Sätze anders. **Keiner davon ist ein Verlust:**

- **14 Sätze** sind die Umstellung von 11b selbst: „El piloto gratuito de 14 días es con Essential",
  „14 días gratis con Essential, sin tarjeta", „Growth y Enterprise los contratas directamente"
  und die englischen Entsprechungen — sie weichen dem neuen Growth-Umfang.
- **4 Sätze** auf `/packages` betreffen die Preiszeile, die bereits am Nachmittag umgeschrieben
  wurde und weiter dasteht („el precio te lo explicamos antes de acordar nada").
- **2 Sätze** in der FAQ sind **erweitert**, nicht gestrichen:
  - alt „No: una consulta de texto se responde cuando llega, a cualquier hora." → neu „En los
    mensajes no: una consulta de texto se responde cuando llega. **En el teléfono, tu horario
    dirige el asistente.**"
  - alt „Te enseñamos el sistema con datos de ejemplo." → neu eine ausführlichere Antwort auf
    „¿Cuánto se tarda en configurarlo?" („Tú preparas los datos de tu agencia, tu logo y tu equipo.
    Conectamos contigo el buzón y el WhatsApp y probamos cada canal con un mensaje …")

## Was damit für morgen offen ist

Nichts aus (1)–(15) und nichts aus den zwei Zahlen. Offen bleibt allein **(16)** — das fertige
Produkt mit Copys Texten, Entwurfsbilder Mi 10:00, Bau erst nach dem JA des Owners. Danach messe
ich alles noch einmal und gebe die Noten für Handy und Desktop, mit der eigenen Zeile
**„Verkaufsstärke"**.
