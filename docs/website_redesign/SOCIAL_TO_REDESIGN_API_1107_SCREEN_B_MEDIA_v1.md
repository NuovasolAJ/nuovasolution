# Social → Redesign + API: Bildschirm B, Bilder und Freigabe (E-3, E-4) · 07.11.2026

**Geschrieben für:** Redesign (Bildschirm) und API (eine Zeile). Wortlaut: Copy. **Das ist die Anforderung, keine Bau- oder Veröffentlichungsfreigabe.** Der laufende Build für RV6 geht vor.
**Grundlage:** Owner-Zeile `SOCIAL E-1 BIS E-6 = JA`, Thema 25 (`governance/SOCIAL_THEMA_25_POSTING_PROD_PLAN_1107_v1.md`, System-Repo). Heute kann `components/site/social-actions.tsx` nur Entwurf und Freigabe, keine Bilder.

## Was schon läuft (Staging, belegt mit echter Sitzung, 13/13)

| Aktion in `social.action` | Eingabe | Antwort |
|---|---|---|
| `media` | `variant_id` | je Bild `position`, `cover`, `resolvable`, `reason`, signierte `url` (15 Min.), `url_expires_at`; dazu `approval_status` |
| `media_order` | `variant_id`, `positions[]` (die jetzigen Positionen in der gewünschten Reihenfolge; die erste wird Titelbild, nicht genannte fallen aus dem Beitrag, nie aus dem Objekt) | `ok`, `reason`, `approvals_reset`, neue Liste |
| `approve` | `variant_id` | `ok`, `reason`, `export_id`, `state` |

Ablehnungen: `unknown_position`, `position_repeated`, `at_least_one_image`, `max_10_images`, `already_published`, `variant_not_in_tenant`, `invalid_input`.

## An API: eine Zeile

`sg_ui_post_media` liefert seit 07.11. je Bild `check` (`null` = nicht geprüft; sonst `blur`: `sharp` | `review` | `blurry` | `unreadable`, `suggested`, `near_duplicate_of_position`, `version`). Die Antwort von `media` und `media_order` lässt es heute weg.
- **Bitte in `shape` ergänzen:** `check: m.check ?? null`.
- Keine Prüfsumme und kein Dateipfad gehen an den Browser. Termin nennt API. **Bis dahin zeigt der Bildschirm keine Hinweise.**

## An Redesign: Bildschirm B, Entwurfsansicht (`/es/social/post`, `/en/social/post`)

| # | Element | Verhalten |
|---|---|---|
| B1 | Bildleiste aller Bilder, in Reihenfolge, Titelbild markiert | aus `media`. Signierte URL läuft nach 15 Min. ab: dann neu laden, kein kaputtes Bild |
| B2 | Ziehen zum Umordnen; „Als Titelbild"; „Aus Beitrag entfernen" | Speichern ruft `media_order`. Auf dem Telefon auch ohne Ziehen bedienbar |
| B3 | Freigabe wurde aufgehoben | „Reihenfolge geändert, bitte erneut freigeben", Knopf wieder aktiv |
| B4 | Bild nicht sendbar (`resolvable = false`) | ausgegraut mit Grund; kann nicht Titelbild werden |
| B5 | Freigabe | zeigt **dieselbe** Leiste mit Text, Preis und Zielkonto. Freigegeben wird genau das Gezeigte |
| B6 | Englische Oberfläche vollständig | Metas Aufnahmen sind englisch |
| B7 | Hinweis je Bild aus `check` | „unscharf", „bitte prüfen", „fast gleich wie Bild n"; `suggested = false` dezent markiert. **Nur Hinweis, nichts wird gesperrt oder entfernt.** `null` ⇒ kein Hinweis, kein „geprüft" |
| B8 | Mindestens ein Bild | Letztes Bild nicht entfernbar, Grund sichtbar |
| B9 | Schon veröffentlicht | Leiste nur lesend |

**Immer:** keine Meta-IDs, keine Speicherpfade, kein Schlüssel im Browser. Status „Instagram" auf der Website bleibt aus `lib/claims.ts`.

## Abnahme

Lauf auf Staging: Entwurf → Bilder → umordnen → Freigabe aufgehoben → erneut freigeben; Auftrag zeigt die gewählte Reihenfolge (prüft Social mit `e3_acceptance_real_session.mjs`). ES, EN, mobil. Danach RV6-Punkt.

## Bitte, bis Mo 09.11. abends

- **Redesign:** Termin für B1–B9, nach dem RV6-Build.
- **API:** Termin für die eine Zeile.
