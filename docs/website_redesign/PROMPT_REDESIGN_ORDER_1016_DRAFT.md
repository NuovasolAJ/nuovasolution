# REDESIGN-AUFTRAG — ENTWURF der Mega-Prompt (2026-10-16)

Entwurf. Wird nach dem Bericht des Redesign-Chats mit dessen Konzept (C), Inhaltsmodell (D, E), Paketlogik (F) und
Design-System (G) zusammengeführt. Die mit ⟦…⟧ markierten Stellen kommen aus diesem Bericht oder vom Owner.

---

# NUOVASOLUTION — VERBINDLICHER REDESIGN-AUFTRAG (eine Runde, keine Schleife)

## 0. Ergebnis, das abgenommen wird

Eine Website, die in jedem der vier Ziele 10 von 10 erreicht, geprüft mit den Messungen in §9:
1 verständlich auf einen Blick · 2 modern und wertig mit Bewegung, die erklärt · 3 roter Faden Schmerz → Verlust →
Lösung → Beweis → Test · 4 Conversion in den 14-Tage-Test.

Geliefert werden: ein fester Commit und ein Deployment, eine `DESIGN.md`, ein Inhaltsmodell `CONTENT_MODEL.md`, der
Scrollfilm (Hero, Übergang, jede Szene, Handy), die Messtabelle aus §9, die Liste „behoben / externe Abhängigkeit /
Owner-Handlung“. Kein „10/10“ als Behauptung; die Messung entscheidet.

## 1. Reihenfolge der Arbeit (verbindlich)

1. `CONTENT_MODEL.md` schreiben: jede Route, ihre eine Aussage, ihr Knopf, ihre Wortgrenze. Startseite ≤ 900 Wörter
   (ES und EN je). Owner-Freigabe des Modells, bevor eine Seite gebaut wird.
2. `DESIGN.md` schreiben (§6) und vier Referenzbilder ablegen. Keine Seite ohne diese Datei.
3. **Hero-Prototyp** allein liefern (§3), Desktop 1440×900 und Handy 390×844, als Deployment. Owner-Verdikt.
4. Startseite in ⟦4–6⟧ Momenten (§4), dann Menü und Unterseiten (§5), dann Pakete (§7), dann 3D und Social (§8).
5. Prüfung §9, Rückgabe.

## 2. Nicht verhandelbar

- Keine erfundenen Beweise (Kunden, Logos, Zahlen, Zitate). Demo-Daten erkennbar: **ein** Hinweis pro Seite, nicht pro
  Szene.
- Die Produktwahrheit steht an **einem** Ort: Seite `/es/hoy` („Qué está disponible hoy“), verlinkt aus Fußzeile, Paketen
  und Test. Auf der Startseite keine Zustandszeilen. ⟦Owner-Freigabe mit Copy und Audit liegt vor: JA/NEIN⟧
- Sprachen und Kanäle nur wie belegt (Copy TEXTS_1013 L-1…L-3, M-1…M-8): heute Spanisch auf WhatsApp und Email; andere
  Sprachen: Funktion ja, Freigabe fehlt; Telefon und Webformular: ⟦Owner-Entscheidung: verkauft / Prototyp / weg⟧.
- Interne Namen nie öffentlich. „Jarvis“ wird überall ⟦öffentlicher Name⟧. Keine Dateinamen, Run-IDs, „stub“, „(stub)“,
  „REF-DEMO“ in Bildern oder Texten.
- Palette: Elfenbein, Sand, Stein, Anthrazit, ein gedämpfter Akzent (⟦Hex⟧). Hero in Abendstimmung erlaubt. Kein Neon,
  kein Dashboard-Dunkel, kein Lila-Gradient.
- Keine zweite Animationsbibliothek neben motion. Scroll-gebundene Szenen mit `useScroll`/`useTransform` (oder CSS
  scroll-timeline), Reduced Motion zeigt Endzustände.
- Stack bleibt: Next.js 14 App Router, Tailwind auf CSS-Tokens, motion. Keine neuen Backend-Pfade; der Stub-Build bleibt
  Stub; Staging bleibt gehalten.
- Farbsystem: zwei Flächen (dunkle Abendszene nur im Hero, Elfenbein überall sonst), eine Linienfarbe, ein Text-Grau,
  **ein** Akzent. Keine Pastellfelder pro Abschnitt, keine Kanalfarbe als Fläche, kein beiger CTA-Block.
- Hero-Text: beide Headline-Zeilen weiß, Kontrast ≥ 7:1 gemessen; der Himmel unter dem Text abgedunkelt. Der Hero läuft
  in die Seite aus (Fora), keine Kante von Schwarz zu Weiß.
- Breiten: 1440 und 1920 px gestaltet (Szene, Panel und Typo skalieren bis 1600 px mit), 1024, 768, 390.
- Objektreferenzen („EST-204“) höchstens 2× pro Seite; in Dialogen „el piso de Estepona“.
- Keine gequetschten Werte: Tabellen und Karten mit Werten ≥ 320 px breit, Zahlen brechen nie um, sonst Zeile unter
  Zeile.

## 3. Der erste Bildschirm

**Aussage in 5 Sekunden:** ⟦Schmerz-Satz ES/EN aus Bericht C⟧ (Richtung: „Una consulta sin respuesta en 30 minutos ya
está en otra agencia.“ / „An enquiry unanswered for 30 minutes is already with another agency.“).

**Vier Ebenen** (Fora-Prinzip, für die Costa del Sol):
1. Himmel mit Sternen, fast still (⟦px/100 px Scroll⟧).
2. Ferne Küste/Meer, langsam.
3. Dunkles Land mit der Szene: ⟦aus C⟧ (Richtung: das Licht eines Agenturbüros am Abend, drei Anfragen als Lichtpunkte,
   die nach und nach erlöschen = der Verlust).
4. Die Produktfläche, die aus dem Boden aufsteht: Neigung ⟦≥ 18⟧° → 0°, Skalierung 0,9 → 1,0, **gescrubbt** am Scroll.
   Inhalt ≤ 25 Wörter: eine Anfrage, die Antwort von Nuova mit Uhrzeit, die Aufgabe für Marcos. Nicht die ganze UI.

**Knöpfe:** primär „Probar 14 días gratis“ (ohne Karte), sekundär als Textlink „Ver cómo funciona“. Darunter nichts.

**Übergang:** die Produktfläche ragt über die Kante in die helle Seite; kein Band, keine Kante, keine Karten.

**Handy:** Satz, Knopf, dann die Szene kompakt; nichts überlappt; ≤ 2 Bildschirme bis zum Produkt.

## 4. Die Startseite in Momenten (jeder ein Bildschirm, Form wechselt)

| # | Moment | Form | Bewegung | Wörter |
|---|---|---|---|---|
| 1 | Hero (§3) | Szene + Fläche | gescrubbt | ≤ 60 |
| 2 | Der Verlust | **ein** großer Satz, der sich beim Scrollen aufhellt (fora-Statement) + darunter die Uhr: 5 min · 30 min · 2 h · „se fue“ | gescrubbt | ≤ 40 |
| 3 | Langsam vs. Nuova | Vorher/Nachher nebeneinander (Glaido-Moment): links die Anfrage ohne Antwort bis 17:40, rechts die Antwort 11:20 | eine Bewegung beim Eintritt | ≤ 60 |
| 4 | Was Nuova tut | ⟦3–4⟧ Zeilen in einem Linienraster (keine Karten): antwortet · hält fest · macht die Aufgabe · meldet die wichtige Anfrage; je ein Produktausschnitt | keine | ≤ 120 |
| 5 | Dein Team am Morgen | eine gepinnte Szene: die Liste des Morgens, eine Aufgabe wird genommen | gescrubbt | ≤ 60 |
| 6 | Beweis | ⟦echte spanische Antwort als Bild (anonymisiert)⟧ oder, bis er existiert, der Wochenbericht als ein Satz + eine Zahl | keine | ≤ 50 |
| 7 | So fängst du an | drei Schritte à ≤ 8 Wörter, ein Satz zum CRM, Knopf | keine | ≤ 70 |
| 8 | Pakete | drei Spalten, Linienraster, ⟦Preis/Preisrahmen⟧ | keine | ≤ 150 |
| 9 | Drei Fragen + Schluss-CTA | Akkordeon, Satz, Knopf | keine | ≤ 120 |

Gesamt ≤ 900 Wörter. 3D und Social sind **nicht** auf der Startseite; sie bekommen ihre Seiten (§8) und einen Eintrag im
Menü.

## 5. Menü und Unterseiten (ein Wortschatz)

- Menü: ⟦4⟧ Einträge, ein Wort + ein Icon, ohne Erklärtexte: Plataforma · Paquetes · Prueba · Contacto. Unter Plataforma
  höchstens vier Zielseiten mit je einem Wort: Atender · Gestionar · Coordinar · Captar.
- Die vier Produktseiten tragen **dieselben Namen** wie Menü und Startseite. Keine englischen Modulnamen mehr („AI Sales
  Agent“, „Lead Intelligence“) auf spanischen Seiten; Fußzeile angepasst.
- Jede Produktseite: Headline + ein Satz + ein Produktausschnitt + 3 Zeilen + Knopf. ≤ 250 Wörter.
- `/platform` wird die Produktgeschichte (heute A–F), gekürzt auf vier Szenen, mit der Doppel-Liste (02/03) behoben.
- `/es/hoy`: der eine Wahrheitsort (Kanäle, Sprachen, was Prototyp ist), aus Copys Zeilen.

## 6. DESIGN.md (Pflichtinhalt)

- Typo: Display ⟦Font⟧ in drei Größen (72/48/32), Body in zwei (18/16), Caption 13. Zeilenlänge ≤ 65 Zeichen.
- Abstände: 8er-Skala; Abschnittsabstand 120/96/64 (Desktop/Tablet/Handy).
- Radien: zwei (Fläche 24, Element 10). Keine Karte in einer Karte. Linien statt Schatten für Raster.
- Farben: ⟦Hex-Liste⟧; der Akzent nur auf Knopf und der wichtigen Anfrage.
- Bewegung: erlaubt sind gescrubbte Szenen (Hero, Verlust, Team) und **eine** Eintrittsbewegung pro Seite; verboten:
  Fade-in pro Abschnitt, Listen, die nacheinander aufspringen, Pastellwechsel, Endlosschleifen. Reduced Motion: Endzustände.
- Verbote: zentrierter Hero + drei Karten, Pills ohne Bedeutung, Icons als Schmuck, „Prototipo“-Zeilen auf Verkaufsseiten,
  interne Namen.
- Vier Referenzbilder im Ordner `docs/design/references/` (Fora-Hero, Fora-Statement, Glaido-Raster, Linear-Feature).

## 7. Pakete

Pro Paket: **für wen** (Agenturgröße in einer Zeile), **was sich im Alltag ändert** (ein Satz), **was dazukommt**
(3 Zeilen), **Zahlen** (Oficinas, Puestos, Consultas al mes). Preis: ⟦Owner: Preise / „desde … €/mes“ / Anfrage, aber
dann nur einmal gesagt⟧. Ein Satz zur Zahlung. Dieselben drei Pakete mit denselben Namen auf Startseite, Paketseite,
Prueba, Login. Nichts im Paket, was `/es/hoy` als nicht verfügbar führt, ohne den Hinweis „en preparación“ am Eintrag.

## 8. 3D und Social (eigene Seiten)

- 3D (`/es/3d`): ein Satz, ein **Turntable-Video** des Hauses ohne Dach und ohne UI (vom 3D-Lane: ⟦Datei⟧), ein
  Umschalter **leer → möbliert** aus derselben Kamera (⟦Dateien⟧), „Plano → modelo → render → gira“ als eine Zeile,
  Knopf „Pide un modelo“. Keine Standbilder mit Viewer-Chrome oder Run-Namen.
- Social (`/es/social`): ein echtes Post-Mockup (Bild, Text, Kommentar, erlaubte Antwort), ein Satz, der Freigabe-Schritt
  als ein Bild. Keine fünf Karten.

## 9. Prüfung, die die Abnahme entscheidet

| Messung | Grenze |
|---|---|
| Wörter je Route (Skript) | Startseite ≤ 900, Produktseiten ≤ 250, Pakete ≤ 400 |
| Bewegungen beim Scrollen der Startseite (Skript zählt Elemente, deren Opacity/Transform sich beim Eintritt ändert) | ≤ 1 Eintrittsbewegung + die gescrubbten Szenen |
| Hero: Neigung von → bis, Bewegung je Ebene in px/100 px, Produktfläche sichtbar bei 1440×900 ohne Scroll | wie §3 |
| Grep über alle Routen | 0× Jarvis, stub, run-, REF-DEMO, .env, Dateinamen; 0× „Prototipo“ außerhalb `/es/hoy` |
| Widerspruchs-Skript: Kanal- und Paketbegriffe je Route gegeneinander | 0 Widersprüche |
| Handy 390: kein Element breiter als der Viewport, Produkt ≤ 2 Bildschirme vom Anfang | ja |
| Kontrast, Routen, Links, Reduced Motion, ohne JS | wie bisherige Suiten, grün |
| Fünf Personen-Test (Owner + 4): „Was macht Nuova?“ nach 10 Sekunden auf dem Handy | 5 von 5 richtig |

## 10. Offene Owner-Entscheidungen vor Start

⟦Wahrheitsort-Freigabe⟧ · ⟦öffentlicher Name des Assistenten⟧ · ⟦Preise⟧ · ⟦Telefon/Webformular⟧ · ⟦3D-Material⟧ ·
⟦ein echter Beweis⟧ · ⟦Display-Font⟧.
