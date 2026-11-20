# RV6 · Urteil Punkt 16 · fester Build `92f873d` · 20.11.2026

**Gemessener Stand:** Commit `92f873d`, Deployment `dpl_7j8zGi1u9Hua49DAX6jjmV88zFHH`.
**Ein Durchgang**, wie angeordnet. Gemessen über die **direkte** Deployment-Adresse, nicht über den
Alias, und `/api/build` am Anfang und am Ende jedes Laufs geprüft: bei allen Läufen
„BUILD STABLE: 92f873d". Grundstand für den Vergleich: `2342537` /
`dpl_8yQJingyCMd7xVqmQdBGt92r3Nrs`, **im selben Lauf** gemessen.

---

## URTEIL: **JA**

Punkt 16 ist auf dem festen Build bestanden. **Keine der acht Prüfungen hat einen Mangel ergeben.**
Die einzige echte Abweichung gegenüber `2342537` sind **vier Breiten unter 4,7 px**, und zwar nur
in einem Zustand, den ein Besucher nur im Moment des Schriftwechsels sieht.

---

## 1. Die Zahlen

| Prüfung | Ergebnis | Maßstab |
|---|---|---|
| **Wortlaut** | **428 Prüfungen, 0 Abweichungen** | Copys Vorgaben ✓ |
| **Handy-Tiefe Zielsicht** | **20,52** Bildschirme (17 323 px), ohne Möblierung 20,35 | ≤ 21 ✓ |
| **Handy-Tiefe Gate** | **19,70** (16 627 px), ohne Möblierung 19,58 | ≤ 21 ✓ |
| Desktop-Tiefe | 15,85 / 15,19 | — |
| **Eingeschwungen** | beide Durchgänge **zahlengleich** (29/29, 28/28, 24/24, 23/23) | ✓ |
| **Pixelgleich zu `2342537`** | 17 323 und 16 627 — **auf das Pixel** | ✓ |
| **Farbe B** | **0 Blau, 0 Braun, 0 Gold** in 744 Farbwerten; `--brand #1a1917` | ✓ |
| **D-1 Kanalliste** | „**email**" / „**e-mail**"; **0 Löcher**, Platzhalter nirgends sichtbar | ✓ |
| **D-2 Copys §7** | **keiner** der 8 verbotenen Wortlaute; Q-22-Gate-Zeile in ES **und** EN vorhanden | ✓ |
| **D-3 Pakettabellen-Zeile** | Name und drei Zellen in beiden Sichten unverändert | ✓ |
| **D-4 Schrift** | 260 Werte, **4 echte Abweichungen** (s. §3) | ✓ mit Befund |
| **§5a + Regel 1** | über **alle 35 FAQ-Antworten**: 0 × „más idiomas", 0 × „en preparación" | ✓ |
| **Zeichen** | **kein** Zeichen außerhalb der Latin-Scheibe wird irgendwo **gerendert** | ✓ |

---

## 2. D-1 bis D-3: was unter (a) tatsächlich auf der Seite steht

| | Zielsicht | Gate-Sicht |
|---|---|---|
| Kanalliste ES | „WhatsApp y email" | „**email**" |
| Kanalliste EN | „WhatsApp and e-mail" | „**e-mail**" |
| Pakettabellen-Zeile ES | „Respuestas en español por WhatsApp y email" | „Respuestas en español por email." |
| Pakettabellen-Zeile EN | „Replies in Spanish on WhatsApp and e-mail" | „Replies in Spanish by email." |
| Zellen der Zeile | included · included · included | included · included · included |
| Q-22 ES | „Sí. Invitas a tu equipo…" | „**Equipo y roles: próximamente.**" |
| Q-22 EN | „Yes. You invite your team…" | „**Team and roles: coming soon.**" |

**Kein leerer Einsatz, kein Satz mit Leerzeichen vor Satzzeichen, kein sichtbarer Platzhalter.**
Die (b)-Fassung, die in einem Arbeitsbaum gelebt hat, ist **nicht** in den Build gelangt — genau
dafür war D-1 da.

**Die Zeile ist bei 1440 gemalt:** 1198 × 59 px (Gate) und 1198 × 73 px (Zielsicht), die drei
Zellen je 28 × 28 px, `aria-label` „En este plan". **Bei 390 ist die Tabelle `display: none`** —
dort tragen die **drei Karten mit Faltung** die Pakete (je 332 × 44 px, gemalt, Abschnitt 1 103 px
hoch mit 31 gemalten Elementen). Das ist ein **komplementäres Layout, kein Mangel**; ich habe es
nachgemessen, statt aus „0 × 0" einen Fehler zu machen.

---

## 3. D-4: der eine echte Befund, und seine Größe

**260 Werte verglichen, 32 Abweichungen — davon 28 keine.** Die 28 sind der von Next **gehashte
CSS-Klassenname** der Schrift (`__inter_5bda0f` gegen `__Inter_65423c`): dieselben Bytes, ein
anderer interner Name, weil `next/font/local` ihn anders bildet als der Google-Lader.

**Vier echte Abweichungen, alle in derselben Lage:**

| Element | fester Build | `2342537` | Differenz |
|---|---|---|---|
| Vorzeile | 529,06 px | 525,09 px | **+3,97** |
| CTA | 279,92 px | 278,44 px | **+1,48** |
| Pilotzeile | 575,91 px | 571,27 px | **+4,64** |
| Navigation | 394,94 px | 392,91 px | **+2,03** |

**Alle vier nur mit gesperrter Schrift und nur bei 1440.** Bei 390 keine einzige.

**Mit geladener Schrift ist jeder Kasten identisch** — h1 680 × 208,08; Vorzeile 556,41 × 63;
CTA 283,84 × 56; Pilotzeile 605,63 × 45; Navigation 388,98 × 44; Legende 1 200 × 28 —
**auf beiden Ständen gleich.** **CLS 0** in allen acht Läufen. Vorschubbreite des ✓ 11,24 px
überall gleich.

**Wie ich das gemessen habe und warum es nicht Leerlauf ist:** Ich habe die Schriftdateien
tatsächlich gesperrt (`*.woff2`, `*.woff`, `*.ttf`) und nachgewiesen, dass die Sperre greift — im
gesperrten Lauf stehen alle Inter-Schnitte auf `error`, im offenen drei auf `loaded`. Sonst hätte
ich „gleich" aus einem Lauf gemeldet, der nichts gesperrt hat.

**Meine Einordnung:** Die angepasste Ersatzmetrik von `next/font/local` weicht minimal von der des
Google-Laders ab. Sichtbar ist das **nur im Fenster des Schriftwechsels**, und Inter ist auf dem
festen Build **vorgeladen**, also ist dieses Fenster kurz. Der eingeschwungene Zustand ist
**pixelgleich**. **Das ist ein Nebenbefund, kein Mangel**, und es ist dieselbe ≤ 6-px-Klasse, die
Redesign mit ihrer ersten Teilmenge selbst gemessen und dann abgestellt hat.

**Die Byte-Gleichheit ist das stärkere Argument als jede Zeichenzählung** — meine wie ihre. Die
ausgelieferte woff2-Datei trägt auf beiden Ständen denselben gehashten Namen, weil Next die Bytes
hasht, und es geht **kein** Abruf an Google.

---

## 4. Vier Fehler in meiner eigenen Arbeit, heute gefunden

Ich führe sie auf, weil drei davon ein Urteil hätten verfälschen können.

**(a) Eine Behauptung aus einem abgestürzten Befehl.** Ich hatte gemeldet, im Quellcode stehe kein
Zeichen außerhalb von Latin. Der `grep` dahinter brach mit „character value in `\x{}` is too
large" ab, und ich hatte den Fehlerkanal unterdrückt. **Zurückgezogen.** Richtig gezählt: neun
Zeichen. Richtig **gemessen**, und das ist die Aussage, die zählt: **keines davon wird gerendert.**

**(b) Der falsche h1.** Mein Treffer zeigte auf den Wrapper (680 × 476) statt auf das h1
(680 × 208). Gefunden, **weil ich die Sonde vorher gegen den Grundstand laufen ließ** und Redesigns
unabhängige Zahl nicht traf. Berichtigt; danach treffen Vorzeile, CTA, Pilotzeile und Navigation
ihre Zahlen exakt.

**(c) Ein falscher Erwartungswert in meiner eigenen Vorgabe.** Englisch „on e-mail" statt „by
email" — mein D-3 hätte die englische Zeile grundlos als Mangel gemeldet. Vor dem Lauf berichtigt.

**(d) Die FAQ-Seite ist ein Akkordeon, und ich habe gegen leeren Text geprüft.** Zu 2 678 Zeichen,
nach Öffnen aller 35 Fragen ~107 000. Jede frühere „auf /faq nicht vorhanden"-Aussage von mir —
§5a, Regel 1 — war **gegen Text geprüft, der nicht im DOM stand**. Das war der gefährlichste der
vier, weil Abwesenheit sich nicht von Nichtmessung unterscheidet. **Nachgemessen mit jedem
einzelnen geöffneten Eintrag: die Aussagen stimmen** — 0 × „más idiomas", 0 × „en preparación" in
allen vier Läufen. **Die Schlussfolgerung stand, der Beleg war schwach und ist jetzt belastbar.**

Ein Zähler in meiner Sonde war zusätzlich groß-/kleinschreibungsempfindlich und las 0 Marken, wo
Marken standen. In `faq16.mjs` berichtigt, mit einer Warnung zum Akkordeon im Code.

**Was ich Redesigns Zahl „20 PX-s Antworten" entgegenhalte:** Ich habe sie **nicht reproduziert**,
weil meine Vereinigungsmethode Mehrfachzählungen enthält. Für Punkt 16 ist das ohne Belang — dort
zählen die **Nullen**, und eine Null über die Vereinigung aller 35 Einträge ist eine echte Null.
Ich melde es als nicht nachgerechnet, nicht als bestätigt.

---

## 5. Noten

| Zeile | Handy | Desktop |
|---|---|---|
| Technik, Zielsicht | **9,5** | **9,5** |
| Technik, Gate-Sicht | **9,5** | **9,5** |
| **Verkaufsstärke, Zielsicht** | **9** | **9** |
| **Verkaufsstärke, Gate-Sicht** | **7** | **7** |

**Unverändert gegenüber `7fbb662`, und das ist der Punkt:** Dieser Build ändert Schriftherkunft und
eine Tabellenmechanik, **nicht die Seite**. Die 7 misst weiterhin nicht die Arbeit, sondern den
**Produktstand** — öffentlich stehen sechs von sieben Karten auf „noch nicht". Der Weg nach oben
führt über **Prod-Belege von API**, nicht über Wortlaut oder Gate.

---

## 6. Was weiterhin nicht bei mir liegt

1. **A12** — ohne Prod-Beleg kein öffentlicher Start. Das ist APIs Beleg, **nicht meine Messung**,
   und es ist die Bedingung, die der Owner selbst gesetzt hat. Mein JA gilt dem **Build**.
2. **Gruppe B** (`whatsappOwnNumber`, `alert`) freigeben, wenn sie so weit sind.
3. **K-2** — „desde el 20.11." erst nach einer **beobachteten** Übergabe.
4. **Schalttag:** Fällt eines Tages jeder Antwortkanal aus, wird aus der Zellenmechanik „soon",
   und dann muss der **konstante** öffentliche Zeilenname mitgehen. Heute nicht erreichbar,
   festgehalten für den Tag, an dem es zählt.
5. **Kleinigkeit für Copy:** Englisch „e-mail" in den gerechneten Sätzen, „email" in der Konstante.
   Steht so schon auf `2342537` — keine Regression.

---

## 7. Belege

`checks/d123-92f873d.json` (D-1/D-2/D-3), `checks/d4-92f873d.json` (D-4, beide Stände),
`checks/depth16-92f873d.json` (Tiefe, zwei Durchgänge), `checks/p16a-92f873d.json` (428 Prüfungen),
`checks/faq16-92f873d.json`, `checks/expected-16-optiona-1120.json` (der **vor** dem Build
geschriebene Maßstab), `checks/gate-channels-1120-option-a.json`.
Sonden: `d123.mjs`, `d4.mjs`, `depth16.mjs`, `p16a.mjs`, `cmp16.mjs`, `colour16.mjs`, `faq16.mjs`,
`faqdeep.mjs` (öffnet jeden FAQ-Eintrag — die Behebung von Fehler (d)).
