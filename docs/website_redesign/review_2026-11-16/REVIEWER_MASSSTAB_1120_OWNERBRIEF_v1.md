# RV6 · Maßstab nach dem Owner-Brief vom 20.11. · Thema 16 ist wieder offen

**Verbindliche Grundlage:** `docs/website_redesign/OWNER_BRIEF_1120_THEMA16_v1.md` (`6726df1`),
die von Audit übertragene Textfassung von `NuovaSolution_Redesign_Brief.pdf`.
**Ich habe sie selbst gelesen**, nicht aus der Weitergabe übernommen — bei zwei Umkehrungen wollte
ich den Wortlaut des Owners und nicht den Bericht darüber.

**Was mein JA auf `92f873d` noch bedeutet:** Es gilt für den **damaligen** Maßstab — Wortlaut,
Tiefe, Farbe, Marken, Gate — und dort steht es unverändert. Der Brief sagt es selbst (§5 seiner
Kopfzeilen): Thema 16 bleibt offen bis zur ausdrücklichen Owner-Abnahme. **Ich ziehe nichts
zurück und beanspruche nichts.** `92f873d` ist der technische Stand, nicht die Abnahme.

---

## 1. Warum seine 4/10 meiner 9,5 nicht widersprechen — und was das über meinen Maßstab sagt

Ich habe gemessen: ob Aussagen **wahr** sind, ob der Wortlaut **stimmt**, wie **tief** die Seite
ist, ob die **Farbe** hält, ob Marken **richtig gesetzt** sind. Das ist alles richtig gemessen und
bleibt richtig.

**Ich habe nie gemessen, ob eine Maklerin in zehn Sekunden versteht, was das Produkt tut.** Dafür
hatte mein Maßstab **keine Zeile**. Meine „Verkaufsstärke 7" zeigte in diese Richtung, meinte aber
den **Produktstand** — sechs von sieben Karten auf „noch nicht" —, nicht die Überzeugungskraft der
Seite. Der Owner bewertet Verständlichkeit, Premiumgefühl und Kaufinteresse, und das sind andere
Größen als die meinen.

**Also:** Seine 3–5/10 und meine 9,5 messen verschiedene Dinge, und die Lücke dazwischen war eine
**Lücke in meinem Maßstab**, nicht ein Fehler in meiner Messung. Der Brief schließt sie, indem er
mir sechs eigene Zeilen gibt. Das ist eine Verbesserung, und ich sage es, damit niemand die beiden
Zahlenreihen gegeneinander hält.

---

## 2. Zwei Umkehrungen, und was sie an meiner Methode ändern

### (1) Kundenseiten tragen nur fertige Aussagen — kein „Próximamente"

Das kehrt die Kennzeichnungsentscheidung vom 20.11. 09:05 um, gegen die ich heute `D-1` und `D-2`
gemessen habe. **Es ist in sich schlüssig:** Wer erst veröffentlicht, wenn alles fertig ist,
braucht keine Marke. Der Brief sichert das doppelt ab (§2.1 und §4: Start erst mit vollständigen
Funktionsbelegen, A12 und ausdrücklicher Abnahme).

**Was sich für mich ändert, und es ist nicht klein:** Das Gate (`publicGate`) war ein
**mechanischer** Schutz — Code, der eine unbelegte Aussage nicht durchlässt. „Keine
Mischfassungen, keine leeren Reserven" heißt: weder Marke noch stillschweigend geleerter
Abschnitt. Damit fällt die öffentliche Sicht mit der Zielsicht zusammen, und **der Schutz ist
künftig keine Mechanik mehr, sondern eine menschliche Entscheidung.**

**Daraus folgt eine Prüfung, die es vorher nicht brauchte:** Mit dem Gate verliere ich die
Möglichkeit, „nichts Falsches" **am Code** zu prüfen. Ich prüfe es dann gegen **Audits Register je
Versprechen** (§10: Seite, Paket, Umgebung, Weg, Beleg-ID). **Audits Register wird damit
tragend** — es ist die einzige verbleibende Stelle, an der sich eine Kundenaussage gegen einen
Produktionsbeleg halten lässt. Ich melde das als Folge, nicht als Einwand.

### (2) Nur Essential bietet die 14 Tage

Das kehrt die Entscheidung vom 13.11. um — **und diese Umkehrung steht als Regel im Quellcode**:

> `lib/claims.ts:224` (Stand `92f873d`): *„ONE offer everywhere … ‚Solicitar una demo',
> ‚Reservar una demo' and ‚14 días' leave the site"*

Der Brief verlangt in §8 für Growth ausdrücklich eine **„zum Vertrieb passende Anfrage oder
Demo"** — „Demo" kommt also zurück — und „14 días" bleibt, aber **nur bei Essential**.
**Copys Texte und die gebaute Mechanik stehen auf der alten Regel.** Gemessen am Commit:

```
entryAction(locale)  →  EIN Label, href "/contact", kind "pilot"       (claims.ts:241)
pilotCta.line        →  „Piloto gratuito de 14 días …"  global         (claims.ts:232)
```

verwendet in **12 Dateien**, darunter Kopfzeile, Fußzeile, Abschlussband, Pakettabelle,
`/packages`, `/faq`, Plattformseiten, `/trial`, Beispielbericht.

**Das ist dieselbe Lage wie §4.3 heute Morgen:** zwei schriftliche Festlegungen des Owners, die
sich widersprechen, und ein Lane, der dazwischen steht. Ich melde es **vor** dem Build, nicht
danach. Die Entscheidung gehört dem Owner, der Wortlaut Copy, die Mechanik Redesign.

---

## 3. Der Fund, der die Startliste verändert

Bisher stand **A12** als die eine Bedingung für den öffentlichen Start. **Der Brief macht aus
seinen eigenen zwei Entscheidungen vier weitere.** Denn §2.1 verlangt fertige Aussagen ohne Marke,
und §8 verspricht konkret:

| Versprechen im Brief | gebrauchter Schlüssel | Registerstand `92f873d` |
|---|---|---|
| „Prueba Essential gratis durante 14 días" + „Direkter Abschluss nur, wo er angeboten wird" | `trial` | **soon** — „not before the production onboarding core (E28-Prod P4)" |
| derselbe direkte Abschluss setzt Selbstanmeldung voraus | `publicSignup` | **soon** — „not released" |
| drei Pakete „direkt vergleichbar", 2–3 bestätigte Unterschiede | `plans` | **soon** — „production has no package system yet" |
| „Tagesgeschichte verspricht eine Zusammenfassung um 8:30: **Daily belegt Zeitpunkt und Zustellung**" | `dailyVoice` | **soon** — „dg_jarvis_action_log has 0 rows" |

**Ohne Marken gibt es für diese vier keinen Mittelweg mehr.** Vorher konnte die Seite sie als
„Próximamente" zeigen und trotzdem online gehen. Jetzt gilt: entweder in Produktion belegt, oder
die Aussage darf nicht auf der Kundenseite stehen, oder der Start wartet.

**Die Startliste ist damit A12 *und mindestens diese vier*, nicht A12 allein.** Das ist kein
Widerspruch im Brief — §4 sagt genau das. Aber die Liste war nirgends aufgeschrieben, und ohne sie
sieht der Start näher aus, als er ist.

**Eine Entscheidung steckt darin, die nur der Owner treffen kann:** Soll Essentials „prueba gratis"
ein **Selbststart** sein (dann braucht es `trial` + `publicSignup` in Prod) oder eine **angefragte**
Testphase (dann ist es kein „direkter Abschluss" im Sinne von §8)? Beides ist vertretbar; der
Unterschied entscheidet, ob zwei Register-Schlüssel den Start blockieren oder nicht.

---

## 4. Meine sechs Zeilen, messbar gemacht, bevor es etwas zu messen gibt

Der Brief verlangt (§10/§51) **Verständlichkeit, Modernität/Bewegung, Premiumgefühl, Texte,
Verkaufswirkung, Kaufinteresse** einzeln. Damit eine Note nicht Geschmack ist, hänge ich jede an
etwas Nachzählbares:

| Zeile | woran ich sie festmache |
|---|---|
| **Verständlichkeit** | Erstbesucher-Aufgaben aus §12 ohne Einweisung: (1) Objektfoto → Anfrage → Rückrufaufgabe, **und die offene Verfügbarkeitsprüfung richtig benannt**; (2) nach der Beispielwoche auf die zwei Kontakte mit Handlungsbedarf zeigen und „Software hat geantwortet" von „Rückruf steht aus" unterscheiden; (3) am Handy das passende Paket wählen und **vor dem Klick sagen, was passiert**. Gemessen: geschafft / gestockt / falsch, mit der Stelle des Stockens. Dazu der 10-Sekunden-Test am ersten Bildschirm: was übernimmt NuovaSolution, in einem Satz |
| **Modernität/Bewegung** | Weg bis zur fertigen Rückrufaufgabe, bis zum Paketunterschied, bis zum Formular — in Pixeln und Bildschirmen, auf **identischer** Handybreite, Vorher/Nachher; jede Szene überspringbar; `prefers-reduced-motion` erreicht dieselben Ergebnisse; 3D: Titel bleibt sichtbar, „Paso 2 de 4", alle vier Schritte direkt anwählbar, dieselbe Bildfläche |
| **Premiumgefühl** | Anteil echter Objektfotografie gegen gleichförmige weiße Karten gezählt; Rundungen und Innenabstände gemessen; schwarze Statusetiketten gezählt (D2); Touchflächen ≥ 44 px bei **375**; feste Fußleiste auf iPhone-Höhe geprüft und dort ausgeblendet, wo ein lokaler CTA sichtbar ist |
| **Texte** | konkrete Verben (anrufen, Termin bestätigen, Objekt vorschlagen, Eigentümer zurückrufen) gegen allgemeine Wachstumsversprechen gezählt; **kein** Zukunftshinweis auf Kundenseiten (§2.1); Mock-Daten einmal gekennzeichnet; Vorher/Nachher beschreibt denselben Fall |
| **Verkaufswirkung** | Zwischenschritte aus §9 erreichbar und zählbar: Demo-Öffnung, Ergebnisansicht, Paketwahl, Formularstart; je Paket **eine** Hauptaktion; Linkziel, vorgewähltes Formular und Bestätigung stimmen mit dem Button überein |
| **Kaufinteresse** | die sofort nutzbare Aufgabe nach einer Besichtigung: auf welchem Bildschirm sie erscheint; ob ein Erstbesucher sie ohne Hilfe findet; ob er sagen kann, welches Paket 14 Tage bietet |

**Prüffeld:** ES und EN bei **375, 390, 430** und Desktop, **auf demselben Build**.

---

## 5. Eine Grenze, die ich jetzt nenne und nicht bei der Lieferung

**Reales iPhone/Safari und reales Android/Chrome kann ich nicht prüfen.** Ich messe mit
kopflosem Edge auf Windows. Ich kann Breiten, Touchflächen, reduzierte Bewegung, Tastatur und
Fokusreihenfolge **emulieren** — ich kann **nicht** die Safari-Leiste, das Verhalten der festen
Fußleiste auf einem echten iPhone oder iOS-Schrifteigenheiten prüfen. Genau diese drei nennt der
Brief (§7, §10).

**Das muss jemand anders tun, oder der Owner nimmt Emulation mit dieser Einschränkung an.** Ich
werde keine Gerätezeile als geprüft ausgeben, die ich emuliert habe. Lieber eine Lücke, die
benannt ist, als eine Note, die mehr behauptet als sie trägt.

**Zweitens:** Die Bilder M1–M6 und D1–D4 liegen **nur im PDF**. Die Textfassung beschreibt sie,
aber ich prüfe zehn Gestaltungsbefunde gegen Beschreibungen statt gegen die Aufnahmen. Ich bitte
um das PDF; bis dahin prüfe ich diese zehn gegen den Text und schreibe dazu, dass die Vorlage
fehlte.

---

## 6. Was ich jetzt nicht tue

**Ich messe nicht.** Es gibt keinen Build nach dem Brief. Redesigns erste Lieferung ist eine
zusammenhängende Handy-Vorschau WhatsApp-Anfrage → fertige Aufgabe → Paketwahl → richtiges
Formular, mit Commit und Deployment-ID. Dann messe ich in **einem** Durchgang, mit demselben
Verfahren wie heute: Build am Anfang und am Ende festgenagelt, jede Seite als geladen
nachgewiesen, und kein Urteil aus einem Lauf, der nichts angesehen hat.
