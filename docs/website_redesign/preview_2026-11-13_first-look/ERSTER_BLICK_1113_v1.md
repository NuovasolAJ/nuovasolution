# Erster Blick · Fr 13.11.2026 14:00 · Richtung nach den Owner-Entscheidungen vom Vormittag

**Geschrieben für:** den Owner (bis 15:00 am PC: Richtung bestätigen oder heute noch korrigieren), cc Audit, Reviewer.
**Stand:** `cdc8d04` auf dem Design-Preview, hinter dem Vorschau-Schutz. **Kein benannter Build, nichts veröffentlicht, keine Note.**
Zwischenschau 3 kommt Mo 16.11. 14:00 (dann mit Schmerz-Zeile, Scroll-Erzählung, Stapelkarten, Potencial, 3D, Planes-Umbau, Cómo empezar).

```
Erster Blick = cdc8d04   dpl_Azqb5v4zQpsCJpLP3cvQeAWZ797Z   https://nuovasolution-design-preview-1uah9hjsc-nuovasolajs-projects.vercel.app/es   (Code wie am Telefon · ?view=target / ?view=public · Titulares ?display=fraunces)
Staging-Zwilling = cdc8d04   dpl_2fHhkLxdShfKy8VEjdKuXtmQbZss   https://nuovasolution-staging-preview-8q0zh79sm-nuovasolajs-projects.vercel.app/es
Hinweis      = der erste Design-Build von cdc8d04 (dpl_HP1v5hd3bYgM56kXcEne9pvEgZJb) lieferte aus dem Vercel-Build-Cache eine Schrift-CSS mit fremdem Inter-Hash (Times als Ersatz); seit VERCEL_FORCE_NO_BUILD_CACHE=1 im Design-Projekt baut es ohne Cache. Die Bilder stammen vom Staging-Zwilling (gleicher Code, korrekte Schrift).
Nachtrag     = 18812cc (Regler: beide Bildhälften gleich groß, RV6 D-3) ist gepusht und baut gerade; der Montag-Stand baut darauf auf.
Bilder       = docs/website_redesign/preview_2026-11-13_first-look/bilder/
Bildpaar     = docs/website_redesign/preview_2026-11-13_first-look/check/ (Overlay, Differenzbild, Messung)
```

## Was heute drin ist (deine Entscheidungen vom Vormittag)

| Entscheidung | Gebaut | Bild |
|---|---|---|
| **Ein Angebot, ein schwarzer Knopf** „Solicita tu piloto gratuito" (Copy 90ceca0 B-1), darunter die Pilot-Zeile B-2 | Hero, Kopfzeile (auch über dem Bild, mit hellem Rand), feste Handy-Leiste (jetzt → /contact), jede Planes-Spalte, Cómo empezar, Quién está detrás, Abschluss, /faq, Schlussband der Modulseiten. „Solicitar una demo", „precio en la demo", „14 días gratis" und „Pruébalo gratis 14 días" sind von der Startseite, aus den gemeinsamen Knöpfen und von /trial (→ /contact) weg. Cómo empezar heißt „Piloto gratuito, en 3 pasos" mit Copys drei Schritten. Growth trägt „Recomendado". | `desk-1440-hero.png`, `phone-390-hero.png`, `desk-1440-plans.png` |
| **Hero-Häkchen bleiben, als Glas-Karte** | Die drei Sätze auf einer Glas-Karte (Bild dahinter weichgezeichnet, dünner heller Rand, Haken in D-Tönung), rechts unten am Desktop, unter der Pilot-Zeile am Handy (dort waren sie seit 09.11. weg — jetzt wieder da). | `desk-1440-hero.png`, `phone-390-hero.png` |
| **Bewegung + Fallback im Hero** | Das 3D-Video läuft (Desktop 1080p, Handy die 960-px-Fassung von 3D, heute geliefert, Prüfsumme geprüft). Lehnt der Browser das Abspielen ab (iPhone-Stromsparmodus, Datensparen), trägt das Standbild die Bewegung: langsamer Ken-Burns-Drift. Läuft das Video, ruht das Bild darunter. | Video im Link; Zustand steht im Bild-Attribut `data-hero-video-state` |
| **Demo-Auto-Lauf** | Nach einem Durchlauf und einer Lesepause (2,8 s) wechselt die Demo zum nächsten Kanal der Sicht; eine schmale Leiste in D-Tönung auf dem aktiven Reiter zeigt, wie weit der Lauf ist. Klick oder Taste stoppt den Lauf endgültig; außerhalb des Bildes wird nicht weitergeschaltet; bei reduzierter Bewegung kein Lauf (RV6-Bedingungen A-6). | `desk-1440-demo-autorun.png` (zweiter Kanal „Email" von selbst erreicht), `phone-390-demo-autorun.png` |
| **Farbe D fest** | D (#1f4e8c) ist jetzt die eine Akzentfarbe im Code; Paleta A/B/C/E und der Schalter sind entfernt. Sichtbar an: Kicker, Haken in Planes, „Recomendado", Story-Leiste, Glas-Karten-Haken, Links. Knöpfe schwarz/weiß. Bronze nur noch als Ton-Variable, auf keinem Knopf. | alle Bilder |
| **P-11 Fraunces** | Dieselbe Hero-Ansicht mit Fraunces-Titel als ein Bild; du entscheidest. Im Link: `?display=fraunces`. | `desk-1440-hero-fraunces.png` |
| **Bildpaar** | 3D hat bestätigt: gleiche Kamera, rechts gehört `pair/living_furnished.jpg` hin. Das ist im Code schon so (die rechte Datei weicht vom 3D-Original im Mittel 1,25/255 ab, Versatz 0/0). Overlay und Differenzbild liegen bei. Die 15 px Höhenunterschied, die RV6 am Handy gemessen hat, sind ein Maß des Reglers, nicht der Kamera — messe ich vor Montag nach. | `check/pair-overlay-1113.png`, `check/pair-diff-1113.png` |
| **Umgebungswert** | `NUOVA_E14_NAME` steht per Vercel-CLI in beiden Vorschau-Projekten (nur Umgebung, nicht im Repo); „Quién está detrás" zeigt den Namen ab diesem Build. | im Link, Abschnitt „Quién está detrás" |

## Was ich von dir bis 15:00 brauche

1. **Richtung passt?** Glas-Karte, schwarzer Knopf auf dem Bild, Auto-Lauf-Tempo (2,8 s Pause) — oder eine konkrete Korrektur.
2. **P-11:** Inter oder Fraunces (Bild `desk-1440-hero-fraunces.png` gegen `desk-1440-hero.png`).

## Nicht heute (kommt Montag)

Schmerz-Zeile als eigenes Band (Copy S-1 liegt vor), Hero-Bubble (Copy H-b1…H-b3), „Pulsa un canal", Lauras Datei-Moment (Zielsicht), Scroll-Erzählung, Stapelkarten, „Dónde está tu potencial", 3D-Nutzen + Etagenmarke + Arrastra, Planes-Kreise, Cómo empezar zweispaltig mit Telefonnummer, Handy-Band/-Leiste, Copys Retire-Liste in den Wörterbüchern (es.ts/en.ts/faq.ts), die Pilot-Karte auf /contact, Lighthouse/CLS/LCP-Messung mit Bypass-Header, Regression gegen fdffcf4.
