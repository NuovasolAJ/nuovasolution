# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-19 (R19-Abschlussauftrag auf `4110566`; Build `deb9b66`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-7p2xkf9hm-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit.

## Testkonto

Keines nötig. Demo-Sitzung (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión“.

## Fünf Schritte

1. **Erster Bildschirm** (Desktop und Handy): das Panel zeigt erledigte Arbeit: Lauras Frage, die Antwort mit den Daten
   des Inmuebles und einer Rückfrage, rechts drei Ergebnisse (gespeichert, Ficha aktualisiert, Aviso ans Team mit
   Grund). Langsam scrollen: Fernkette mit Lichtkante, Küste mit Baumreihe, das Panel richtet sich aus der Neigung auf
   und kommt näher, der Vordergrund sinkt weg, unter dem Panel liegt der helle Boden der Seite. Kein Streifen, keine Kante.
2. **Story ohne Klick** lesen: unter jeder Überschrift drei Zeilen „Qué llega · Qué hace Nuova · Resultado“. In **B**
   Email: der deutsche Brief der Kellers ist ein Entwurf („Borrador preparado · no enviado“), nicht versendet; WhatsApp:
   Lauras zweite Nachricht und die aktualisierte Ficha. In **D** oben der Aviso per Email mit Grund, darunter der Morgen:
   Tomar → Proponer la hora a Laura → Hecha.
3. **Social**: Beitrag mit Foto und Daten des Inmuebles, Entwurf → Freigabe → Veröffentlichung, Martas Frage, erlaubte
   Antwort, nächster Schritt; „Qué llega · Qué hace Nuova · Resultado“ auch hier.
4. **3D**: vier Stufen Plano → Modelo → Vacío y amueblado → Vista giratoria; Stufe 3 und 4 tragen sichtbar „Pendiente del
   equipo 3D“ (Paar und Drehaufnahme fehlen, angefordert in `3D_ASSETS_REQUEST_1017.md`). Kein Standbild als Drehansicht.
5. **Mail-Vorschauen** in der Demo-Sitzung: `/es/app/brief` (Morgenbrief mit Aufgaben-Baustein) und
   `/es/app/reports/email` (Wochenbericht), auf Desktop und Handy; **Paquetes** ohne Monatszahl; **Plataforma** nach Aufgaben.

## Was nur du entscheiden kannst

Öffentlicher Name des Morgen-Assistenten (jetzt „el asistente de la mañana“) · Preise oder Preisrahmen · Firmenangaben
für das Impressum (E14; `/legal/imprint` führt bis dahin auf die als vorläufig markierte Seite). Alles Weitere:
`WEBSITE_R19_RETURN_v1.md` §2.
