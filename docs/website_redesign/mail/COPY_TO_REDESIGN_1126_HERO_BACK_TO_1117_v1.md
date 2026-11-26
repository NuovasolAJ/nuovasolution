# Copy → Redesign (cc RV6): the hero goes back to the owner's text of 17.11. · 26.11.2026

**Order:** the owner, 26.11.:
> "Hero zurück auf meinen Text vom 17.11. (genau so, keine Kürzung) … Bitte nur die EN-Unterzeile sinngleich liefern, an Redesign."

**Status:** an editorial and technical check, not a legal approval.

## The hero (final)

| Element | ES (the owner's text, verbatim) | EN |
|---|---|---|
| h1 | Haz crecer tu inmobiliaria. No tu carga de trabajo. | Grow your agency. Not your workload. |
| subline | NuovaSolution capta clientes, responde consultas y hace seguimiento. Reactiva contactos, propone inmuebles y te muestra qué merece tu atención, para que tu negocio avance sin que todo dependa de ti. | NuovaSolution brings in clients, answers enquiries and follows up. It re-engages past contacts, suggests properties and shows you what deserves your attention, so your business moves forward without everything depending on you. |

**The EN is the same as on 17.11.** It comes from `COPY_TO_REDESIGN_1117_TARGET_PRODUCT_TEXTS_v2.md` H-h1/H-sub. It was built in `92f873d` and RV6 measured it word for word (`review_2026-11-16/checks/expected-16-fe8100b.json`). Nothing in it is shortened.

**How the EN matches the ES:**
- "brings in clients" = "capta clientes": a function, not a number.
- "re-engages past contacts" = "Reactiva contactos": "past" says what reactivating means in English; it adds no promise.
- "suggests properties" = "propone inmuebles": a suggestion, not a confirmed availability.
- "without everything depending on you" = "sin que todo dependa de ti".

## For Redesign

- **ES:** the owner's text, character for character. Keep the full stops and the comma before "para que".
- **No public fallback.** The 17.11. fallback line (H-subP) is not used. Under the owner's decision 2 of 23.11., the preview shows the product at 100 %.
- **The first screen:** the subline is longer than the E2 line. RV6 measures the fold again (F22a: the button inside 1366 × 768, and the phone set 360/390/414).
