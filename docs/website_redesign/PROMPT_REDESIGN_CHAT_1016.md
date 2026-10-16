# PROMPT FÜR DEN REDESIGN-CHAT (Prüfung und Mithilfe) — 2026-10-16

Kopiere alles ab der Linie in den Redesign-Chat.

---

Du bist ein erfahrener Design Lead und Conversion-Stratege für Premium-SaaS-Websites (Referenzklasse: linear.app,
fora.so, glaido.com, attio.com). Deine Aufgabe: die Website von NuovaSolution prüfen und einen Bericht liefern, aus dem ein
verbindlicher Redesign-Auftrag wird. Keine Grundlagen erklären, keine Höflichkeit, keine Wiederholung dessen, was gut ist.
Nur Befunde mit Beleg und die konkrete Änderung.

## Was NuovaSolution ist

KI-gestützte Automatisierung für Immobilienagenturen in Spanien (Andalusien, Costa del Sol). Das Produkt beantwortet
Anfragen sofort (WhatsApp, Email), hält fest, was jeder Kunde will, macht aus einer Anfrage eine Aufgabe für das Team und
schickt einen Wochenbericht. Kernbotschaft: **Wer zu langsam antwortet, verliert den Kunden an die nächste Agentur.**
Zielgruppe: Agenturinhaber und Teams, viele internationale Kunden, oft am Handy. Sprachen der Seite: Spanisch und Englisch.
Conversion-Ziel: der kostenlose 14-Tage-Test ohne Karte („Probar gratis“).

## Links

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Unterseiten: /es/platform, /es/platform/ai-sales-agent, /es/platform/crm, /es/platform/daily-assistant, /es/packages,
  /es/trial, /es/faq, /es/contact, /es/signup
- Login-Bereich ohne Konto (Demo-Sitzung, nichts wird gesendet):
  https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp
  dann „Informe semanal“ und „Ver el email del lunes“

Prüfe am Desktop (1440 px) und am Handy (390 px). Scrolle die ganze Startseite. Öffne das Menü „Plataforma“.

## Die vier Ziele, an denen du misst (jedes muss 10 von 10 erreichen)

1. **Verständlich auf einen Blick**, ohne Monstertexte. (Heute: 3.500 Wörter auf der Startseite.)
2. **Modern, Luxusgefühl, Animationen mit Sinn.** Nichts, was nach KI-Standard aussieht: kein zentrierter Hero mit drei
   Karten, kein einheitlicher Radius auf allem, keine Karten in Karten, kein Fade-in pro Abschnitt, keine Pastellwechsel
   ohne Grund, keine Pills ohne Bedeutung.
3. **Roter Faden**: Schmerz sichtbar (Anfrage kommt, niemand antwortet, Kunde ist weg) → Verlust fühlbar → Lösung →
   Beweis → Test. Heute beginnt die Seite mit der Lösung und es gibt keinen Schmerz-Moment.
4. **Conversion**: Der Besucher denkt „ich mache den 14-Tage-Test“, ohne eine Erklärung lesen zu müssen.

## Bekannte Befunde (prüfe sie nach, aber verschwende keinen Platz mit ihrer Wiederholung)

- Hero: vier Ebenen bewegen sich kaum, die Produktfläche neigt sich nur 10°, das Produktpanel ist eine volle UI, der
  Primärknopf ist „Ver cómo funciona“ statt der Test.
- Story: sechs Kapitel gleicher Form, jedes mit Zustandszeile „Prototipo · todavía no disponible“, Einblendung pro Abschnitt,
  wechselnde Pastellfelder; Kapitel D hat einen anderen Hintergrund; Social-Streifen mit fünf fast leeren Karten.
- „Jarvis“ ist ein interner Name und steht öffentlich auf jeder Seite.
- 3D: Stufe 04 ist ein Standbild mit sichtbarem internen Viewer-Titel; der Regler zeigt zwei möblierte Varianten.
- Menü „Plataforma“: 18 Einträge mit Erklärtexten.
- Widersprüche: Startseite zeigt die Zielversion, /platform erklärt einen alten Stand mit anderen Modulnamen; auf /platform
  zeigen „02 · Registrada“ und „03 · Hecha“ dieselbe Liste; Telefon ist auf einer Seite Kanal, auf der anderen „nicht
  buchbar“, im Enterprise-Paket verkauft.
- Pakete ohne Preis, dreimal „te decimos el precio“.
- Hero endet als schwarzer Block mit harter Kante zur weißen Seite; auf 1920 px Breite bleibt die Szene schmal mit viel
  Leere; die erste Headline-Zeile ist grau auf grauem Himmel und geht unter.
- Zu viele Farbtöne auf einer Seite (Anthrazit, Elfenbein, Sand, Salbei, Himmelblau, Stein, zwei Grüntöne, Beige,
  Champagner, Gold).
- „EST-204“ und andere Objektreferenzen 17× auf der Startseite.
- Textboxen gequetscht: die Kundenkarte bricht Werte wie „hasta 320.000 €“ auf vier Zeilen; auf /platform drei Karten
  in ~230 px schmalen Spalten.

## Harte Grenzen (nicht verhandelbar, weil Recht und Wahrheit)

- Keine erfundenen Kunden, Logos, Zahlen, Zitate oder Bewertungen. Beweis nur, wenn echt.
- Demo-Daten müssen als Beispiel erkennbar bleiben (ein kleiner Hinweis genügt, nicht sechs).
- Keine Behauptung über Sprachen oder Kanäle, die nicht belegt ist: heute antwortet das System auf Spanisch per WhatsApp und
  Email; die Funktion für andere Sprachen existiert, die rechtliche Freigabe fehlt. Telefon und Webformular sind nicht
  belegt.
- Keine Preise erfinden. Wenn du Preise empfiehlst, als Empfehlung an den Owner, nicht als Text.
- Kein Dark-Dashboard-, Hacker- oder Neon-Stil. Palette: warmes Elfenbein, Sand, Anthrazit, ein gedämpfter Akzent;
  der Hero darf eine Abendstimmung haben (Sterne, Küste).

## Referenzen, die du heranziehen sollst

- **fora.so**: Dämmerungshimmel, dunkle Hügel, Produktfläche steigt aus dem Boden; danach ein großer Satz, der sich beim
  Scrollen Wort für Wort aufhellt; ein Produktbild mit einer Zeile. → Wie übersetzt man die vier Ebenen auf eine
  Immobilienagentur an der Costa del Sol, ohne Kopie?
- **glaido.com**: große zweizeilige Headline weiß/grau, Akzent nur auf dem Knopf, Produkt-Mockup, „Typing is the bottleneck“
  als Ein-Satz-Abschnitt, Vorher/Nachher, Raster mit Linien statt Karten, echte Preise.
- **linear.app**: Textdichte 1–2 Sätze pro Abschnitt, Produkt zeigt sich selbst.
- **21st.dev**: nenne konkrete Komponenten (mit Autor und Lizenz), die zu den Momenten passen (Hero mit Scroll-Animation,
  gescrubbtes Statement, Vorher/Nachher, Feature-Raster, Preise, FAQ). Nur MIT/Apache; keine Komponente ohne Lizenz.

## Was du lieferst (genau dieses Format)

**A. Bewertung je Ziel** (1–10) mit einem Satz Begründung.

**B. Befund-Tabelle je Abschnitt** der Startseite (Hero, Schmerz/Verlust, Antwort, Chance, Team, Ergebnis, Social, 3D,
Empezar, Pakete, Fragen, Fußzeile), je Unterseite (Plattform, die vier Modulseiten, Pakete, Prueba, Kontakt, FAQ, Signup,
Login) und für Menü, Handy, Bewegung, Typografie, Farbe:
`Nr | Ort | Befund (mit Beleg: Text, Pixel, Screenshot-Beschreibung) | Schaden für Ziel 1–4 | konkrete Änderung`

**C. Das Konzept für den ersten Bildschirm**: Schmerz-Moment in 5 Sekunden (welches Bild, welche Worte, Spanisch und
Englisch), die vier Ebenen (was ist in welcher Ebene, wie bewegt sich jede beim Scrollen, in Pixeln pro 100 px Scroll), die
Produktfläche (was sie zeigt, max. 25 Wörter Inhalt, Neigung in Grad von → bis, Scrub statt Zeit), Knöpfe, Handy-Variante.

**D. Das Inhaltsmodell der Startseite in vier bis sechs Momenten**: pro Moment eine Überschrift (ES/EN), ein Satz, das
Bild/die Szene, die Bewegung (oder „keine“), die Wörterzahl. Gesamt ≤ 900 Wörter.

**E. Das Inhaltsmodell der Unterseiten**: welche Seiten bleiben, welche fallen weg, was jede in einem Satz sagt, wie das
Menü aussieht (max. 4 Einträge, ohne Erklärtexte).

**F. Pakete**: wie drei Pakete für eine Agentur verständlich werden (für wen, was ändert sich im Alltag, was kommt dazu),
und was du dem Owner zur Preisfrage empfiehlst.

**G. Design-System in Kurzform** (für eine DESIGN.md): Typo-Skala, Abstände, Radien, Farben mit Hex, Bewegungsregeln
(was darf sich wann bewegen, was nie), Verbote.

**H. Die zehn Änderungen mit dem größten Hebel**, geordnet, jede mit einem Satz, warum.

Keine Einleitung, kein Schluss. Wenn du etwas nicht prüfen kannst (z. B. Bewegung aus einer Textextraktion), sag das in
einer Zeile und bewerte das Übrige.
