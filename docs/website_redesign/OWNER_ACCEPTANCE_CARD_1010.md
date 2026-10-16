# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-16 (Redesign v4 nach deinem Urteil vom 16.10., Build `d5c6990`) · Website-Implementierer → Owner.
Status: implementiert, wartet auf unabhängige technische und finale Prüfung.

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en

## Testkonto

Keines nötig. Demo-Sitzung (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión“.

## Fünf Schritte

1. **Erster Bildschirm** (Desktop 1440 und 1920, Handy): ein Satz („Mientras enseñas una vivienda, tus consultas no
   esperan.“), ein Knopf (Probar 14 días gratis), darunter steigt das Produktpanel aus dem Land auf. Langsam scrollen:
   Sterne, Küste und Hügel laufen verschieden schnell, das Panel richtet sich von 18° auf, hängt über die Kante in die
   helle Seite. Kein Streifen, keine Kante.
2. **Weiter scrollen, ohne Klick**: der Satz „Cada consulta que espera …“ leuchtet Wort für Wort auf, darunter die Uhr
   11:20 · +5 min · +30 min · +2 h, die Anfrage verblasst und wird „Perdida“. Dann „Sin Nuova / Con Nuova“, dann
   „Responde · Guarda · Avisa · Resume“ mit je einem Produktausschnitt, dann der Morgen des Teams, drei Schritte,
   Pakete, drei Fragen, Schluss. Nichts blendet ein; Bewegung nur, wo sie erklärt.
3. **Menü „Plataforma“**: vier Worte (Atender · Gestionar · Coordinar · Captar), darunter „Visión general“ und „Qué está
   disponible hoy“. „Visión general“ = die sechs interaktiven Szenen (Kanäle, Übersetzung, Tomar/Hecha, der Knopf in
   der Mail), der Social-Pfad, 3D. „Qué está disponible hoy“ = die eine Wahrheitsseite.
4. **Paquetes** (Startseite und Seite): je Paket „für wen“, „was ändert sich“, „was kommt dazu“, die Zahlen; der
   Preissatz einmal.
5. **Agenturbereich** über den Testkonto-Link (unverändert gegenüber dem 12.10.): „Informe semanal“, „Ver el email del
   lunes“, „Cerrar sesión“.

## Was nur du entscheiden kannst

Öffentlicher Name des Morgen-Assistenten (jetzt „la lista de la mañana“) · Preise oder Preisrahmen · Telefon und
Webformular (jetzt „en preparación“ auf /hoy, nirgends verkauft) · 3D-Material (Drehvideo, Paar leer/möbliert) · ein
echter Beweis. Alles Weitere steht in `WEBSITE_V4_1016_RETURN_v1.md` §5.
