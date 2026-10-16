# WEBSITE COPY — return, round 2026-10-16 (R18)

**State:** `2026-10-16` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Commit:** `3e45eb1`
**Binding input:** the owner's screenshot of the morning letter delivered 2026-10-14, 10:21.
**Order:** `AUDIT_TO_LANES_2026-10-16_R18.md` (`5de1482`, Gate §16) and the owner's priority list.
**Status:** author's record. **No design acceptance is claimed anywhere**, and the owner has not seen a
preview of any of this.

---

## 1. Delivered

```
COPY_1016.md   sha256 817c56161e5d9c686340ebd22288c4f8dbb8d9a97de6c8d612aea1a616348c2b
  §1 the morning letter, rewritten                  → Daily, Hosting
  §2 the weekly report                              → Daily, Hosting
  §3 the design handover card, ten criteria         → Website, with Daily and Hosting
  §4 staff-v4 corrections, five keys                → Daily
  §5 E22, the final Spanish                         → Social
  §6 the dictation privacy line                     → Daily, then counsel
  §7 where the limits belong                        → the next named build
  §8 the one open factual question                  → API
```

## 2. The morning letter: seven faults, read off the screen

The letter arrived and carried the right data. That is not the question the owner asked, and the rejection
stands on its own terms.

| # | On screen | Fixed by |
|---|---|---|
| 1 | "Una cosa espera a una persona" — a count, identical for a callback, a viewing or a held reply | the headline now names the subject by kind: "{customer} quiere ver un inmueble", "{customer} espera tu llamada", "{customer} sigue sin respuesta". Without a name it names the **request**, not "una persona" |
| 2 | "+4 915 156 766 918" — the person is a number, and the number was regrouped into Spanish threes | a number is printed **exactly as stored**, E.164, `+4915156766918`, never regrouped. A wrong grouping of a foreign number reads as a different number |
| 3 | "Ha escrito: «nächste Woche»" — German raw inside a Spanish sentence | the customer's words get **their own block**, in their language, marked as theirs. Our summary says *that* they wrote in German, not what it means |
| 4 | the same quote again three lines later | `good_to_know` renders only if its content is not already in the quotation block |
| 5 | «nächste Woche» with no origin | a relative expression **keeps its origin date**: «nächste Woche» · mensaje del 12 oct. We never resolve it into a week of ours, because the customer's week counts from their message |
| 6 | "confirmar la visita" | **struck from every slot.** A wish is agreed, never confirmed. "Lo siguiente: acordar una hora con {customer}" |
| 7 | headline, summary and card state saying the same thing | each now carries different information, and the check is to read the letter aloud |

## 3. The weekly report

A short balance first, then the measured results, then what is open with its concrete next step. Three
rules that keep it a business mail rather than a log:

**Absent produces no line.** At most **one** closing sentence about what is not measured, and only where
its absence would otherwise read as a zero — today that is delivery. A reader does not need an inventory
of our instrumentation.

**No invented anything:** no revenue, no saved time, no delivery we did not measure, no advertising
recommendation. `provider_accepted` and `delivered` stay apart and neither renders yet.

**The login is not linked** until that path has actually been accepted. The button points at the list the
reader already uses.

## 4. The design handover, and who owns it

**Website owns the shell** and corrects it in the existing MAIL_SHELL deliverable; **Daily and Hosting
integrate**. No second mail shell is built. §3 of the file is ten criteria that can be checked rather than
argued: the logo file and its size, one accent taken from the site's own tokens (`--champagne-400`, ink,
`--ivory`), two body sizes, hierarchy that survives images being blocked, 24 px between blocks, exactly
one button at 44 px, the quotation block visibly the customer's, a **real handset** rather than an
emulator in Gmail and Apple Mail, dark mode that does not eat the logo, and nothing said three times.

**Preview first, then the controlled send in the agreed window.** This lane does not call anything
accepted, and this return does not report one.

## 5. Priority 2, done

**staff-v4:** five corrections, everything else confirmed. The clash Daily asked about is resolved by
surface rather than by picking a winner: Daily's wording gives way in the brief and the card, Lead's stays
in the report, and both keep one element word for word — *contesta tú al cliente; el borrador está en la
tarea* — because the report speaks to an owner about a week and the card to the person who must answer
now.

**E22:** Social's structure unchanged, the Spanish finalised for the three templates. Two things stated
for the submission rather than hidden in the wording: T-3 is marketing in Meta's own sense and the BAJA
line is not evidence of an opt-in; and a `wamid` is acceptance, not delivery. One point stays Social's: a
call conducted by the assistant needs the AI notice in T-2, and the only approved notice is Spanish for
WhatsApp and e-mail, so until then T-2 follows a call a **person** conducted.

**The dictation line** is written from the measured flow: the audio goes to the browser maker's service,
Chrome to Google and Safari to Apple, **not to us**, and we receive the text only on *Enviar*. Saying "we
process your voice" would be false in the other direction. To counsel: whether that placement suffices for
an employee rather than a customer.

**Where the limits belong:** the five claim-and-limit pairs in §7, so a material restriction stands where
the capability is advertised instead of only on `/hoy`. No new wording — the sentences already exist.

## 6. Website text acceptance

Not given, and not possible this round. It happens **on the named build after the owner's requested
roll-back**, and this lane will not sign a text check on an unnamed build.

## 7. The one open factual question

**Which source governs a public sentence about Google Sheets?** The truth table and the package matrix
call it one active production workflow receiving a copy of the leads; `MAIL_CRM_MATRIX_v1` calls it an
uncertified path. Both can be true and they produce opposite sentences. **Asked of API.** Until it is
answered, no Sheets line renders anywhere and delta D-101 stays held back.

## 8. What I did not do

No new website redesign and no mixing of this work with one. No second mail shell. No claim that any
design is accepted: the owner has seen the 14.10. letter and rejected it, and has not yet seen a preview
of the rewrite. No figure, delivery, saving or recommendation that is not measured.
