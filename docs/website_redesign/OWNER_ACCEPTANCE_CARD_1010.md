# Abnahmekarte 1010 — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-16 (Abschlussauftrag 2026-10-12, Build `3fae766`) · Website-Implementierer → Owner. Status:
implementiert, wartet auf unabhängige technische und finale Prüfung.

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en

## Testkonto

Keines nötig. Die Vorschau ist ein Stub-Build: ein Klick auf diesen Link setzt eine Demo-Sitzung und landet direkt im
Agenturbereich (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión“.

## Fünf Schritte

1. **Erster Bildschirm** (Handy und Desktop): Überschrift, zwei Knöpfe, darunter das Panel mit einer Zeile Situation
   („Martes 11:20 · Marcos está en una visita …“), einer kurzen Anfrage, einer kurzen Antwort, der Kundenkarte und dem
   nächsten Schritt. Keine Karten mehr unter dem Panel, kein heller Streifen; das Panel steht auf dem dunklen Land,
   dann beginnt die helle Seite. Beim Scrollen richtet sich das Panel auf und wird etwas größer; Sterne, Küste und
   Hügel bewegen sich verschieden schnell.
2. **„Ver cómo funciona“** drücken und einfach scrollen: A bis F lesen sich ohne Klick, jedes Kapitel mit einer
   Zustandszeile darunter. In **B** die vier Kanäle durchschalten; bei **Email** „Ver el original“ drücken (die
   deutsche Mail erscheint im Original, dann wieder übersetzt) und einmal „Ver el aviso“ öffnen. In **D** „Tomar“ und
   „Marcar como hecha“ drücken. In **E** den Knopf in der Mail drücken: die Bitte landet beim Team, nichts wird
   gebucht. Nach **F** der kurze Social-Pfad (Objekt → Entwurf → Freigabe → Veröffentlichung → Kommentar).
3. **3D** (Abschnitt „Presentar“): Schieberegler „Primera versión / Diseño revisado“ (die Beschriftung ist jetzt
   ehrlich: ein unmöbliertes Paar aus derselben Kamera gibt es noch nicht), Kamerafahrt abspielen („Vídeo“), die
   vierte Stufe heißt „Captura del visor“. Hinweis unten lesen (Demohaus, ähnliche Möbel, per Auftrag).
4. **Agenturbereich** über den Testkonto-Link: „Mi agencia“ (Paketname in der Testzeile) → „Informe semanal“: zuerst
   steht „Cifras de ejemplo“, dann drei Antworten (was Nuova erledigt hat, welche Chancen, was als Nächstes), dann
   die Zahlen → „Ver el email del lunes“ (Logo, eine Farbe, ein Knopf). Danach „Cerrar sesión“.
5. **Menü „Plataforma“**, **Paketleiter** unten und die Seite **„Paquetes“**: überall dieselben drei Pakete
   (Essential, Growth, Enterprise), dieselbe Zeile „Consultas procesadas al mes“, gestaffelte Funktionen; im
   Abschnitt „Empezar“ die drei Schritte und die zwei CRM-Zustände.

## Was nicht in dieser Karte steht

Die offenen Produktnachweise (Sprachen, Telefon, Matching, Follow-up-Einwilligung, Meta, 3D-Abnahme, Reporting-Vertrag,
Hörprobe am Telefon, unmöbliertes 3D-Paar) sind in `docs/website_redesign/ACCEPTANCE_LIST_1010.md` §A–§F2; sie gehören
zur Veröffentlichungsprüfung, nicht zur Sichtabnahme. Die Listen „behoben / externe Abhängigkeit / Owner-Handlung“
stehen in `WEBSITE_REDESIGN_FINAL_1012_RETURN_v1.md` §5.
