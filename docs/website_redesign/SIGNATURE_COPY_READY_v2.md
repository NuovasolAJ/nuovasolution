# SIGNATURE COPY READY v2 — final sign-off and AI role label

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22 · **Copy version:** `signoff-v2`
**Lane:** Website Copy / Product Truth / Director, for **Lead** (`ROLE_LABEL_DECISION`, text
contract owner) and **Hosting** (renderer), with **API** for data fields
**Status:** localisation, not a legal text. Not independently reviewed.
**Supersedes:** `SIGNATURE_COPY_READY_v1.md` Part A. v1 Part B (AI disclosure) has moved to
`COUNSEL_PACKAGE_v1.md` §E, where it is completed for all three channels and both versions.

```
SIGNATURE_COPY_FINAL = v1 (copy version signoff-v2) 2026-09-22
```

The signal name follows the dispatch (`SIGNATURE_COPY_FINAL = v1`); the document is this lane's
second version of the file.

---

## 1. What is deployed today, and what still has to go

Read from `HOSTING_SYNC_0921_RETURN_v1.md` §H2 and the Audit's read of 2026-09-22.

| Item | State |
|---|---|
| Renderer v2 in prod Main (`942392608803592d`) | deployed; builds a deterministic closing and role line; source `render_compose_email_v2.js` sha256-16 `1c8754aa6995e1d9` (byte identity with prod confirmed by sfp only) |
| Its closings | es "Un cordial saludo," · en "Kind regards," · de "Mit freundlichen Grüßen" · it "Cordiali saluti," — **identical to this file** |
| Its role labels | Lead's current spec: es "Asistente virtual de {brand}" · en "AI assistant of {brand}" · de "KI-Assistent von {brand}" · it "Assistente virtuale di {brand}" |
| Message Agent prompt lines 93 to 99 (closing "/ Antonio's AI Assistant") | **still in prod** |
| Code fallback N3 in `customer_message_html.js` (re-injects "Antonio's AI Assistant") | **still in prod** |
| Real client reply seen with the new sign-off | **none**; no Main run since 2026-09-21 |

**Both old sources must disappear.** The renderer only strips one trailing closing. While the
prompt still writes "Saludos cordiales / Antonio's AI Assistant" and the fallback can re-inject it,
F4 is not fixed, whatever the renderer does.

## 2. Recommendation for `ROLE_LABEL_DECISION` (to Lead)

**Adopt the harmonised set.** All four name AI explicitly and carry the same meaning.

| Locale | Lead's current spec (deployed) | **Recommended** |
|---|---|---|
| es | Asistente virtual de {brand} | **Asistente de IA de {brand}** |
| en | AI assistant of {brand} | **AI assistant of {brand}** |
| de | KI-Assistent von {brand} | **KI-Assistent von {brand}** |
| it | Assistente virtuale di {brand} | **Assistente IA di {brand}** |

Why: EN and DE say AI, ES and IT say virtual. A reader in Spain or Italy can take "asistente
virtual" for a person working remotely; a reader of the English line cannot. Requirement R4 of
`VOICE_DISCLOSURE_REQUIREMENTS_v1.md` asks for equivalent strength across languages. The change is
two strings in the renderer; closings and everything else stay.

**Form of address is not reopened.** The sign-off lines contain no *tú*, *usted*, *du*, *Sie*,
*tu* or *Lei*, so the approved address of each channel is untouched by this file.

## 3. Rules

1. **Language of the sign-off = language of the text being sent.** Resolution order:
   `reply_language` (the language the reply body is actually written in) → detected inbound
   language → tenant default locale → `es`. The renderer's current first step, "a closing found in
   the body", should disappear with the prompt change, because the body will carry no closing.
2. **Brand is never translated or altered.** `{brand}` = `agency_branding.brand_display_name` only.
3. **Never a private person as a fixed agency brand.** The sign-off does **not** fall back to
   `legal_name`, a legacy agency name or `clients.name`. For a sole trader each of those can be a
   person's name, and printing it as "AI assistant of {person}" is the same defect as "Antonio's AI
   Assistant". This differs from renderer v2's fallback chain and is the one functional change asked
   of Hosting besides the role labels. Legal names belong in the legal footer and the disclosure,
   not in the sign-off.
4. **No brand set:** the role line is printed **without** the brand (row "role, no brand" below).
   It is never dropped, because the role line is the reader's cue that an assistant wrote the text.
   Event `signoff_brand_missing` is logged.
5. **A human line only when a human wrote or approved the message**, with that employee's public
   name. An assistant reply never carries a person's name as author.
6. **Unsupported language** (anything other than es, en, de, it): body stays in the customer's
   language; the sign-off uses the **en** strings; event `signoff_locale_fallback` with the detected
   language is logged. This is an agreed, visible fallback, not a silent one: the English role line
   still states that an AI assistant wrote the reply, and it contains no private name. French and
   Dutch strings are added only after a native check.
7. **A tenant override** (`agency_signature_text`) replaces the built sign-off only if it contains no
   string from the blocklist in §4 and is non empty; otherwise the built sign-off is used and
   `signoff_override_rejected` is logged.
8. **Exactly one sign-off** per message. The detector must not treat *asistente* or *saludos* in the
   body as an existing signature (defect noted in v1 §0.2).

## 4. Machine readable mapping (for Hosting)

```json
{
  "copy_version": "signoff-v2",
  "state": "2026-09-22_SYNC_0900Z",
  "supported_locales": ["es", "en", "de", "it"],
  "locale_resolution": ["reply_language", "inbound_detected_language", "tenant_default_locale", "es"],
  "unsupported_locale": { "use_locale": "en", "log_event": "signoff_locale_fallback" },
  "brand_source": ["agency_branding.brand_display_name"],
  "brand_missing": { "use": "role_no_brand", "log_event": "signoff_brand_missing" },
  "strings": {
    "es": { "closing": "Un cordial saludo,", "role_with_brand": "Asistente de IA de {brand}", "role_no_brand": "Asistente de IA" },
    "en": { "closing": "Kind regards,", "role_with_brand": "AI assistant of {brand}", "role_no_brand": "AI assistant" },
    "de": { "closing": "Mit freundlichen Grüßen", "role_with_brand": "KI-Assistent von {brand}", "role_no_brand": "KI-Assistent" },
    "it": { "closing": "Cordiali saluti,", "role_with_brand": "Assistente IA di {brand}", "role_no_brand": "Assistente IA" }
  },
  "layout_email": ["closing", "role", "brand_line", "contact_line_optional", "legal_footer"],
  "human_author": { "role_line": "{employee_public_name}", "subline_optional": "{employee_title} · {brand}" },
  "tenant_override": { "field": "agency_signature_text", "reject_if_contains_blocklist": true, "log_event": "signoff_override_rejected" },
  "blocklist": ["Antonio's AI Assistant", "Antonio's AI assistant", "Antonio’s AI Assistant"],
  "whatsapp": { "signoff": "none" },
  "exactly_one_signoff": true
}
```

If Lead keeps its current spec instead of §2, replace only the four `role_*` values for es and it
with "Asistente virtual" / "Assistente virtuale"; nothing else changes.

## 5. Acceptance on real replies

The fix is proven only on real outgoing messages, never on renderer unit output alone.

| Test | Where | Pass condition |
|---|---|---|
| S1 to S8 from v1 §A.3 | staging, real LLM, Hosting's un-mock window (Lead's `REPLY_CONTRACT_V2` matrix: es, en, de, it × offerable / no inventory) | sign-off per §4 in each language; brand correct; human line only for S6 |
| **S9** | every test and the prod check below | the string "Antonio's AI Assistant" and any variant in the blocklist appear **zero** times in the sent message, including the plain text part |
| S10 | staging | prompt lines 93 to 99 removed **and** fallback N3 removed: a body generated without closing receives exactly one sign-off; a body that happens to contain *saludos* still receives exactly one |
| S11 | staging | tenant without `brand_display_name`: role line without brand, event `signoff_brand_missing` logged |
| S12 | staging | French enquiry: French body, English sign-off, event `signoff_locale_fallback` logged |
| P1 | prod, the owner's new first contact identity (`NEW_FIRST_CONTACT_IDENTITY`), as part of `GMAIL_POSTFIX_E2E_PASS` | the received email in the real inbox shows the §4 sign-off once, no "Antonio's AI Assistant"; screenshot of the received message |

Closing signals: Lead `ROLE_LABEL_DECISION = <harmonised|lead_spec>` · Lead/Hosting
`REPLY_CONTRACT_V2 = STAGING_PASS` · Hosting prompt and N3 removal recorded with the new Main sfp ·
P1 inside `GMAIL_POSTFIX_E2E_PASS`.
