# Farb-Musterblatt (P4, 09.11.2026) · zwei Vorschläge, der Owner wählt

**Geschrieben für:** den Owner. Beide Vorschläge liegen live auf dem Zwischenstand: `?palette=d` und `?palette=e` (Cookie, gilt dann auf jeder Seite).
Regel aus dem Masterprompt: Beige nur noch als ruhiger Hintergrund unter **Bericht** und **Planes**; alles andere Weiß; **eine** Akzentfarbe für
Hauptknopf-Hover, aktive Zustände, Schlüsselwörter, Zahlen, die gezeichnete Linie und die Häkchen. Schwarz bleibt für den Hauptknopf.

| | **D · Mittelmeerblau + Bronze** | **E · Smaragd + Sand** | (heute A · Bronze) |
|---|---|---|---|
| Akzent `--brand` | `#1f4e8c` | `#1b6b4a` | `#8a5a16` |
| Akzent-Tinte `--brand-ink` (Überschriften-Akzent, Links) | `#173a68` | `#134d35` | `#5e400f` |
| Wash `--brand-wash` (Häkchen-Hintergrund, Hover) | `#e9eff8` | `#e7f1ec` | `#f6f0e4` |
| Zweite Farbe | Bronze `#c9a86a` nur auf dunklem Grund (Hero-Häkchen) | Sand `#f3efe6` als Grund unter Bericht und Planes | — |
| **Kontrast Akzent auf Weiß** | **8,31 : 1** (AAA) | **6,46 : 1** (AA, auch für Kleintext) | 5,91 : 1 |
| Akzent auf Elfenbein `#f8f6f1` | 7,70 : 1 | 5,99 : 1 | 5,47 : 1 |
| Weiß auf Akzent (Knopf-Text) | 8,31 : 1 | 6,46 : 1 | 5,91 : 1 |
| Akzent-Tinte auf Weiß | 11,40 : 1 | 9,81 : 1 | 9,48 : 1 |
| Akzent auf seinem Wash | 7,19 : 1 | 5,60 : 1 | 5,21 : 1 |
| Akzent-Tinte auf Sand `#f3efe6` | 9,94 : 1 | 8,55 : 1 | 8,26 : 1 |

Alle Werte über 4,5 : 1 (AA für Fließtext) — berechnet aus den Hex-Werten (WCAG 2.x); die Suite `scripts/design/contrast-check.mjs` misst sie im
Fertigbau noch einmal auf der gerenderten Seite.

## Bilder (Hero · Bereiche · Bericht), Desktop 1440

| Vorschlag | Hero | Bereiche | Bericht |
|---|---|---|---|
| D | `preview_2026-11-09_interim2/farben/d-hero.png` | `farben/d-chapters.png` | `farben/d-report.png` |
| E | `preview_2026-11-09_interim2/farben/e-hero.png` | `farben/e-chapters.png` | `farben/e-report.png` |

## Was ich empfehle

**D.** Das tiefe Blau trägt Vertrauen und hebt sich vom Bronze der Hero-Häkchen klar ab; es ist weit weg vom alten „KI-Blau“ (kein
Neon, kein Verlauf) und liest sich auf Weiß am besten (8,3 : 1). E ist wärmer und ruhiger, aber Grün steht schon für WhatsApp in der
Demo, was den Akzent dort verwässert. Deine Wahl; danach entferne ich den Paleta-Schalter und setze die gewählte Palette als einzige.
