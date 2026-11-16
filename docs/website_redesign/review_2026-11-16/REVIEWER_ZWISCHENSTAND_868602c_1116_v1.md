# Zwischenstand `868602c` gemessen · Mo 16.11.2026 · Reviewer

**Kein benannter Build, keine Note.** Redesign hat diesen Stand als Zwischenstand genannt; der
benannte Build kommt Mi 18.11. 14:00. Ich messe trotzdem jetzt, damit die offenen Punkte vor
Mittwoch bekannt sind.

**Adresse:** `https://nuovasolution-design-preview-g6ca6dngo-nuovasolajs-projects.vercel.app`,
`/api/build` → **`868602c407f1a49b55bf5637f6089f7ff7275d71`**, `dpl_5tcEAmVNJrhG3haJ9Fo3NiC7etcs`,
ohne Zugangscode erreichbar. Belege in `checks/`, Bilder in `shots/`.

**Neu in der Methode (nach meinem Fehler von heute Vormittag):** gesperrte Routen werden **nicht**
blind weiterverfolgt. Jede Weiterleitung wird von Hand verfolgt und die Sicht (`?view=…`) am Ziel
**neu gesetzt**. Sonst fällt die Vorschau auf die Zielsicht zurück und eine öffentliche Prüfung
misst das Falsche. Skript `checks/gate.mjs`.

---

## 1 F22 (a) bis (d)

| | Bedingung | Messung auf `868602c` | Urteil |
|---|---|---|---|
| **(a)** | Vom nächsten Abschnitt sind im ersten Bildschirm **≥ 120 px** sichtbar (ohne Vorschau-Möblierung) | Das Schmerz-Band (`section.pain`) steht jetzt direkt unter dem Hero, sichtbar sind aber **56 px** (1366 × 768), **64 px** (1440 × 900), **56 px** (1440 × 757), **8 px** (390 × 844), **0 px** (1366 × 625 und 390 × 664) | **nicht bestanden** |
| **(b)** | Kein Kanal mit Haken, dessen Schlüssel aus ist | Zielsicht: „Respuestas en español **por WhatsApp y email**" — „teléfono", „formulario web" und „portales y anuncios" sind raus. Öffentlich: „Respuestas en español **por email**. WhatsApp con el número de tu agencia: **en preparación**." | **bestanden** |
| **(c)** | Hero-Unterzeile bei 390 über die **ganze** Fläche ≥ 4,5 : 1 | **0,0 %** der Fläche unter AA, über vier Videobilder; schlechtester Punkt **4,97 : 1**; alle acht Spaltenbänder ohne einen einzigen Fehlpunkt (Median 8,3 bis 14,9). Schrift jetzt `rgb(255,255,255)`, 16 px, mit zweifachem `text-shadow` | **bestanden** |
| **(d)** | Regler Δ Höhe = 0 und Δ Breite = 0 bei 360/390/414/1366/1440 | **0 px bei allen fünf Breiten**, gleicher oberer und linker Rand | **bestanden** |

Dazu: h1 beginnt bei 1366 bei **y = 224** (Referenz `fdffcf4`: 409) — Regression eingehalten.
Knopf und Pilot-Zeile stehen bei allen sechs Fenstergrößen vollständig. Bewegung läuft (3 bis 4
Animationen).

**Zu (a):** Das Band ist gebaut, es ist nur zu tief. Am 1366er Laptop mit Browserleiste und am
Handy mit Safari-Leisten ist davon **nichts** zu sehen. Es fehlen je nach Größe 56 bis 120 px.

---

## 2 Die Angebotsregel des Owners vom 16.11. — in **beiden** Sichten eingehalten

Durchlauf über alle erreichbaren Seiten: **22 öffentlich**, **26 in der Zielsicht**, beide Sprachen.

| Verboten | Treffer |
|---|---|
| „Solicitar una demo" / „Request a demo" | **keiner**, in keiner Sicht |
| Selbst-Start („Prueba gratis", „14 días de Essential", „Try it free") | **keiner** |
| „Recomendado" / „Recommended" | **keiner** |
| „no calcula una puntuación" / „computes no score" | **keiner** — Ö-1 ist erledigt |
| „en segundos" ohne „por WhatsApp" | **keiner** (siehe unten) |

**Zwei Treffer meiner Suchmuster habe ich im Zusammenhang gelesen und als korrekt verworfen** —
beide sagen genau das Richtige:

- `/es/faq`, `/en/faq`: „Hoy el asistente responde **por WhatsApp** en nuestro propio número: ahí
  medimos que contesta **en segundos**." Die Bedingung „nur mit WhatsApp" ist erfüllt; mein Muster
  hatte nur ein zu kurzes Fenster.
- `/es`, `/en`, `/packages`, `/faq`: „WhatsApp **con el número de tu agencia: en preparación**" und
  „¿Responde desde el WhatsApp de mi agencia? **Todavía no.** … ese paso está en preparación."
  Das ist kein Versprechen, sondern dessen Gegenteil.

**Erlaubter Wortlaut, gefunden und vollständig:**

- „Solicita tu piloto gratuito" / „Request your free pilot" — auf **allen** 22 öffentlichen Seiten.
- „Piloto gratuito de 14 días, con nuestro acompañamiento. **Si nos das tu opinión, 7 días más.**"
  — Startseite und Pakete; englisch „A free 14-day pilot, with our support. Give us your feedback
  and get 7 more days."
- Dazu durchgehend derselbe Inhalt in eigenen Worten auf `/contact` („con tu opinión al final, 7
  días más") und in der FAQ („si nos la das, el piloto sigue 7 días más").
- „Sin método de pago. Las condiciones, por escrito." auf der Startseite in beiden Sprachen.

---

## 3 Verspricht die öffentliche Sicht etwas, das nicht in Prod ist? — Nein

| Prüfpunkt des Owners | Öffentlich gefunden | Urteil |
|---|---|---|
| WhatsApp über die **eigene Nummer** der Agentur (Thema 20) | nur „con el número de tu agencia: **en preparación**" und die FAQ-Antwort „Todavía no" | **sauber** |
| **Telefon** | keine Zusage; der Telefon-Reiter der Demo ist öffentlich nicht vorhanden, die Kanalzeile nennt ihn nicht | **sauber** |
| **Mehrsprachigkeit** | keine Zusage. Die Zielsicht trägt Copys Zeile „Responde en español. Otros idiomas, a tu equipo." | **sauber** |
| **WhatsApp-Medien** (Foto, PDF, Audio, Grundriss) | keine Zusage auf keiner öffentlichen Seite | **sauber** |
| **Instagram** | öffentlich **gar nicht** genannt | siehe unten |
| **3D in den Paketen** | öffentlich **gar nicht**; in der Zielsicht „Visualización 3D · Opcional · Opcional · Opcional" | **entspricht Q-6** |

### Eine Rückfrage zu Instagram

Die Owner-Zeile lautet „öffentlich nur ‚Instagram (En preparación)'". Gemessen: öffentlich steht
Instagram **nirgends** — die Enterprise-Zeile lautet dort ohne Zusatz „Todo lo de Growth, para
varias oficinas." In der Zielsicht steht „… con **Instagram**", ohne Einschränkung.

Beides ist nach der Regel vertretbar, aber es sind zwei verschiedene Dinge:

- Liest man die Zeile als **Obergrenze** („höchstens"), ist der heutige Stand in Ordnung:
  weglassen ist weniger als „(En preparación)".
- Liest man sie als **Anweisung**, wie die Zeile zu lauten hat, dann fehlt öffentlich
  „Instagram (En preparación)" in der Enterprise-Zeile.

**Ich prüfe gegen die erste Lesart und melde den Unterschied.** Sagt der Owner, er will es sehen,
ist es ein Befund gegen Redesign — eine Zeile in `lib/content/home-1103.ts:422`.

---

## 4 Was damit vor Mittwoch offen ist

1. **(a)** Anschnitt ≥ 120 px bei allen sechs Fenstergrößen, **einschließlich** 1366 × 625 und
   390 × 664. Heute 0 bis 64 px.
2. **Instagram**: Entscheidung des Owners, ob „(En preparación)" öffentlich stehen soll.
3. Für die Note am benannten Build kommt der Rest meiner Liste dazu: Lighthouse nach D-4, CLS,
   LCP, Tippziele ≥ 44 px bei 360/390/414, `reduced-motion`, der Lauf ohne JavaScript, und die
   neun Zeilen der Notentabelle B-1 mit je einem Bild.

**Erledigt und nicht mehr offen:** Ö-1 (Score-Satz), Ö-2 („Solicitar una demo"), `/trial` → `/contact`,
die Kanalzeile, der Kontrast am Handy, der Regler.
