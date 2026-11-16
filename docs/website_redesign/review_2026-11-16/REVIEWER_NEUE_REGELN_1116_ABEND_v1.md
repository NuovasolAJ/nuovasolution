# Neue Prüfregeln nach der Owner-Entscheidung vom 16.11. abends · Reviewer

**Die Entscheidung:** Die Vorschau zeigt **alles wie die Zielsicht, ohne Schilder** — auch unter
`?view=public`. Je Funktion gibt es **einen Schalter** („live / próximamente"), der **erst am Tag
vor dem Livegang** gestellt wird: Was dann nicht in Produktion ist, bekommt „Próximamente".

Redesign hat mir dieselbe Entscheidung gemeldet und nennt die Technik: ein `publicGate` je Funktion
in `lib/claims.ts`, heute alle auf „live"; das `claims`-Register (Prod-Stand) bleibt als
Dokumentation unverändert.

---

## 1 Was damit bei mir wegfällt

| Bisherige Bedingung | Stand |
|---|---|
| „Öffentlich nur, was `claims.ts` als `included` führt" (RV6 §D-3, P-1…P-5, Q-1…Q-6) | **aufgehoben** |
| „`/platform/*` öffentlich 0 × WhatsApp" (mein Punkt B von heute Mittag) | **gestrichen**, auf Anweisung des Owners |
| „3D erscheint öffentlich erst nach Thema 17" (Q-6) | **aufgehoben** |
| „Instagram öffentlich weglassen" | **aufgehoben** |
| „Öffentlich: nichts Falsches, kein Loch" als laufende Bedingung | **verschoben** auf den Tag vor dem Livegang |

## 2 Was bleibt

- **E2 des Owners vom 07.11.** — kein Haken und keine Zusage für die **eigene Nummer der Agentur**,
  den **Telefon-Assistenten** und **Instagram**, und zwar **in beiden Sichten**. Das gilt schon für
  die Zielsicht und wird von der neuen Entscheidung nicht berührt. *(Meine Lesart; widerspricht der
  Owner, gilt seine.)*
- Die **Angebotsregel** vom 16.11. (Piloto gratuito, kein „Solicitar una demo", kein Selbst-Start,
  kein „Recomendado", „en segundos" nur mit „por WhatsApp", kein „no calcula una puntuación").
- Alle **Gestaltungs- und Messbedingungen** (erster Bildschirm, Regler, Kontrast, Tippziele,
  Lighthouse, Regression gegen `fdffcf4`).

**Ein Satz zur Folge, damit sie niemanden überrascht:** Bis zum Schaltertag zeigt die **offen
erreichbare** Vorschau alles so, als wäre es live. Der Link ist nicht auffindbar (`noindex`) und
der Owner hat die offene Vorschau bewusst entschieden — die Wahrheitsprüfung findet damit **an
einem Tag** statt statt laufend. Fällt dieser Tag aus, geht die Seite mit ungeprüften Zusagen live.
Deshalb ist Punkt (c) unten kein Anhang, sondern die Stelle, an der die ganze Wahrheitsprüfung
hängt.

---

## 3 Die drei neuen Prüfpunkte, mit heutigem Stand

### (a) Vorschau öffentlich = Zielsicht, nichts fehlt

Gemessen auf `de08edc` (Satz für Satz verglichen, Weiterleitungen von Hand verfolgt):

| Route | öffentlich / Ziel (Zeichen) | fehlende Sätze |
|---|---|---|
| `/es` | 14 927 / 22 394 = **67 %** | **101** |
| `/en` | 14 649 / 22 039 = 66 % | 99 |
| `/es/packages` | 1 852 / 5 639 = **33 %** | 32 |
| `/es/platform` | 2 133 / 3 734 = 57 % | 27 |
| `/es/platform/daily-assistant` | 2 133 / 3 227 = 66 % | 27 |
| `/es/faq` | 5 269 / 6 728 = 78 % | 34 |
| `/es/example-report` | 3 939 / 4 948 = 80 % | 23 |
| `/es/platform/ai-sales-agent` | 2 573 / 2 838 = 91 % | 12 |
| `/es/platform/lead-intelligence` | 2 691 / 2 925 = 92 % | 8 |
| `/es/platform/crm` | 2 734 / 3 164 = 86 % | 11 |
| `/es/contact` | 2 004 / 2 178 = 92 % | 5 |

**Bestanden ist der neue Build, wenn je Route und Sprache die Satzmenge der öffentlichen Sicht mit
der der Zielsicht übereinstimmt — 0 fehlende Sätze.** Einzige erlaubte Abweichung ist die
Vorschau-Möblierung selbst (Hinweisband, Schalterleiste), weil der Owner „ohne Schilder" verlangt
und beide Sichten dieselbe Seite zeigen sollen. Beleg `checks/same-de08edc.json`.

### (b) „Ver"-Knöpfe auf einer Linie, keine leere Fläche bei „Y además"

**Knöpfe, Zielsicht, `de08edc`:**

| | Ver Atiende | Ver Organiza | Ver Crece | Abweichung |
|---|---|---|---|---|
| **1440** | oben 3609, links 140 | oben **3654**, links 548 | oben **3631**, links 956 | **45 px** |
| 390 | oben 4756 | oben 5170 | oben 5584 | untereinander, je unter seiner Karte |

**Bestanden: Abweichung der Oberkanten ≤ 4 px bei 1024 px und darüber.** Am Handy stehen die drei
untereinander, jeder unter seiner Karte — das werte ich **nicht** als Verstoß, weil „auf einer
Linie" dort keinen Sinn ergibt; sagt der Owner etwas anderes, nehme ich es auf.

**„Y además" (`.ch-extra`):**

| | Blockhöhe | gefüllt | größte Lücke im Block |
|---|---|---|---|
| **1440** | 533 px | **58 %** | **89 px** (dahinter 80 px) |
| **390** | 358 px | 59 % | 64 px |

**Bestanden, mein Vorschlag mangels Vorgabe: größte Lücke ≤ 48 px und Füllung ≥ 70 %**, bei 390 und
1440. Beleg `checks/gap-de08edc.json`.

### (c) Livegang-Prüfung — am Tag vor dem Livegang

So führe ich sie, damit sie an einem Tag zu schaffen ist:

1. **Jede Aussage der Seite** wird aus den Seiten selbst gezogen (beide Sprachen, alle Routen), nicht
   aus dem Code — gleiche Technik wie meine heutigen Textläufe.
2. Jede Aussage wird **einem Schalter** zugeordnet (`publicGate`-Schlüssel) und gegen den
   **Prod-Stand** geprüft: `claims.ts` als Register, dazu die Belege der Fachspuren — API, MM
   (Dateien/Medien), Lead (Absicht, Score), Voice (Telefon), 3D (`model3d`), Social (Instagram).
3. Ergebnis ist **eine Tabelle**: Schlüssel · Aussage auf der Seite · Beleg aus Prod · **live** oder
   **próximamente**. Alles ohne Prod-Beleg kommt auf „próximamente".
4. Dazu zwei Gegenproben: **E2** (eigene Nummer, Telefon, Instagram nie als Zusage) und die
   **Angebotsregel**.
5. Ich lege die Liste **vor**; gestellt werden die Schalter vom Owner mit Redesign.

**Was ich dafür brauche, und zwar vor dem Tag:** die Liste der `publicGate`-Schlüssel mit der
Zuordnung, welche Textstellen an welchem Schlüssel hängen. Ohne diese Zuordnung kann ich eine
Aussage keinem Schalter zuordnen und die Liste wäre geraten. Das geht an Redesign.

---

## 4 Was vom Montag unverändert gilt

Bestanden: erster Bildschirm mit ≥ 120 px des Schmerz-Bands, „Ver"-Inhalt ≤ 0,15 Bildschirme unter
dem Knopf, Inter überall, 3D startet auf 01, „Planes" einmal, PK-0 „pueden empezar", 3D-Chat ohne
Lieferzeit, K2-Titel, Formular mit drei Pflichtangaben, „Contratar directamente" 2,3- bis 7,4-mal
kleiner als der Pilot-Knopf, Regler 0 px, Kontrast am Handy 0 % unter AA.

Offen: **Scrolltiefe** (Handy 19,4, Desktop 16,1 nach meinem Verfahren) als D11 beim Owner.

---

## 5 Nachtrag: die Zuordnung ist da — und eine Kopplung, die am Schaltertag beißt

**Die Zuordnung liegt vor.** `docs/website_redesign/REDESIGN_PUBLIC_GATE_MAP_1116_v1.md` (noch
nicht eingecheckt, 68 KB): je `publicGate`-Schlüssel alle Stellen `file:line`, 637 Stellen, 32
Schlüssel. **Ich habe die Schlüsselliste gegen den Code geprüft** — `publicGate` in `lib/claims.ts`
führt 32 Schlüssel, die Karte führt dieselben 32. **Keine Lücke.** Damit kann ich die
Livegang-Prüfung (c) führen, ohne etwas zu raten. Copys „Próximamente"-Fassungen je Schlüssel
liegen in `COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1.2 (`88143c1`).

**Gefunden beim Gegenlesen — eine Kopplung, die heute nicht auffällt und am Schaltertag zuschlägt:**

`lib/claims.ts:148`

```
const channelOn = (key, view) => isIncluded(key)
  && (view === "target" || key !== "replyWhatsapp" || publicGate.whatsappOwnNumber === "live");
```

Die öffentliche Kanalliste nennt **WhatsApp nur dann, wenn `whatsappOwnNumber` auf „live" steht** —
nicht, wenn `replyWhatsapp` auf „live" steht. Das stammt aus der alten Regel W-1 (Punkt 6 des
Owners) und ist dort ausdrücklich so gewollt gewesen.

| | `whatsappOwnNumber` | öffentliche Kanalliste |
|---|---|---|
| **heute** | „live" (alle Schlüssel live) | nennt WhatsApp — entspricht der neuen Entscheidung |
| **am Schaltertag** | geht auf „soon" (Thema 20, nicht in Prod) | **WhatsApp verschwindet ganz**, obwohl `replyWhatsapp` in Produktion ist |

Die Seite würde dann öffentlich „por email" sagen und damit **weniger** behaupten, als das Produkt
kann. Das ist kein Fehler im Bau, sondern eine Regel aus der alten Welt, die in der neuen Mechanik
weiterlebt. **Zu entscheiden ist, welche der beiden Aussagen am Schaltertag gilt:**

1. WhatsApp bleibt öffentlich genannt (es läuft in Prod, über **unsere** Nummer), und nur die
   Zusage „mit der Nummer **deiner Agentur**" bekommt „Próximamente" — dann muss die Kopplung weg;
2. oder WhatsApp verschwindet öffentlich ganz, solange die Nummer der Agentur nicht angemeldet ist
   — dann bleibt die Kopplung, und die Seite sagt öffentlich weniger, als sie könnte.

Ich lege das dem Owner vor und prüfe nach seiner Antwort. Bis dahin werte ich die Stelle nicht.
