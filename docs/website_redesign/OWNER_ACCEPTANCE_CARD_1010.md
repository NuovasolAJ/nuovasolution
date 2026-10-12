# Abnahmekarte 1010 — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-12 · Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und
finale Prüfung.

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

1. **Erster Bildschirm** (Handy und Desktop): Ist in fünf Sekunden klar, für wen, welches Problem, wie das Produkt
   aussieht, was man als Nächstes tun kann? Beim Scrollen tritt das Produktpanel hervor, die beiden Karten (Besichtigung,
   eingehende Anfragen) wandern mit.
2. **„Ver cómo funciona“** drücken und einfach scrollen: A bis F lesen sich ohne Klick. In **B** die vier Kanäle
   durchschalten (WhatsApp Englisch, Email Deutsch, Formular Spanisch, Telefon Spanisch) und einmal „Ver el aviso“
   öffnen. In **D** „Tomar“ und „Marcar como hecha“ drücken.
3. **3D** (Abschnitt „Presentar“): Schieberegler Rohmodell/ambientiert, Kamerafahrt abspielen. Hinweis unten lesen
   (Demohaus, ähnliche Möbel, per Auftrag).
4. **Agenturbereich** über den Testkonto-Link: „Mi agencia“ → „Informe semanal“ → „Ver el email del lunes“. Alle Zahlen
   sind als Demo markiert. Danach „Cerrar sesión“: die Startseite bestätigt die Abmeldung.
5. **Menü „Plataforma“** und **Paketleiter** unten: Jeder Menüeintrag ist klickbar und führt zum passenden Kapitel oder
   zur Modulseite; die Leiter zeigt die Zielversion ohne Zustandswörter (die Nachweise stehen in ACCEPTANCE_LIST_1010).

## Was nicht in dieser Karte steht

Die offenen Produktnachweise (Sprachen, Telefon, Matching, Follow-up-Einwilligung, Meta, 3D-Abnahme, Reporting-Vertrag)
sind in `docs/website_redesign/ACCEPTANCE_LIST_1010.md`; sie gehören zur Veröffentlichungsprüfung, nicht zur
Sichtabnahme.
