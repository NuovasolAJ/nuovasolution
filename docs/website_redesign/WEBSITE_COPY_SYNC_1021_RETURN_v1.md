# WEBSITE COPY — return, round 2026-10-21 (R21)

**State:** `2026-10-20` · **Lane:** Website Copy / Product Truth
**Base:** `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`, its source and its rendered HTML through the fixed
deployment URL. **Marking:** technical and editorial check. **Not a legal approval, not a Meta approval.**

---

## 1. Delivered

```
WEBSITE_COPY_HANDOVER_1021.md      → Website, one pass on the next named build
  §A  home story and the morning example       A-1 … A-16
  §B  platform page                            B-1 … B-8
  §C  packages: figures off, card leads,       C-1 … C-10, and a state on every feature
      ads wording
  §D  imprint paragraph, page title and        D-1 … D-4
      description, the legal routes
  §E  the language sentence and the residual
  §F  a dead key                               F-1
  §G  what each piece of evidence unlocks later
```

38 numbered rows and the feature-state table. The file stands on its own: each row has the file and line on
`deb9b66`, the current text as it is in the source, and the full ES and EN replacement. Every "current" text
was matched against `git show deb9b66:<file>` before the commit.

## 2. Point 1: the language sentence

**The sentence the Reviewer quoted in RV2 is not on `deb9b66`.** "El sistema responde en el idioma del
cliente; lo que falta en otros idiomas es la aprobación legal del aviso, no la función" has 0 hits in the
source and 0 in the rendered `/es` and `/en`, the RSC payload included. RV2 marked it "unchanged from RV1";
it was carried forward, not read again. **To the Reviewer:** please re-check F-R16-5 on the next build
against the source and the HTML.

**The residual is still real in substance, though.** The home story's German e-mail ends as "una con
borrador", "borrador en alemán pendiente" and "Revisar el borrador, enviarlo…". That is the held-reply flow,
which runs on staging only. In production a German e-mail is held and nothing is created. So the example
claimed the function in another language without stating it in words, and the story's state line said "el
borrador y la tarea están en pruebas" next to it.

**Replacement, one canonical form:**

> ES **Hoy respondemos en español. En otro idioma no se envía nada automáticamente.**
> EN **Today we answer in Spanish. In another language nothing is sent automatically.**

It says what production does and nothing about a capability. It does not put the gap down to the legal
notice, because that again implies the function exists and only waits for permission. Rows A-3, A-6, A-7
and A-8 bring the German example to the production behaviour. They return to the draft wording on
`PORT_DEPLOYED`, not before. One unrendered key, `home.flow.lead`, still said "en el idioma del cliente". It
is fixed as well (F-1), so reusing the key cannot bring the claim back.

## 3. Point 2: the packages without numbers

The cards now orient without a figure: "Para una oficina y un equipo pequeño", "Para un equipo que crece",
"Para varias oficinas". The offices and seats rows go, the Essential limits line loses "Una oficina, hasta 3
personas", and the comparison lead no longer says the packages "grow in size: offices, seats and enquiries
per month". It says each package includes the one before and adds features.

**`plans.ts` keeps its values; the page must not show any of them** (C-6). They are a proposal of 20.07. and a
staging test set, never the owner's. Numbers return only from `OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md` once
the owner has filled it in.

## 4. The ads wording

Per the owner: running ads is after the launch and is not advertised. Nothing on the site may say that we
run, plan or fund campaigns. **The intake of leads from ads the agency already runs stays "En preparación ·
todavía no contratable"** until it is proven end to end. There were **two** places that said in the present
tense that we take those leads in: the platform row (B-8) and a second note under the Growth card (C-10,
`adsNote`). Both move to the future tense, and the Growth feature is renamed "Recogida de leads de tus
anuncios actuales". "Las campañas siguen siendo tuyas" stays.

## 5. Found while assembling the file

Against the source rather than the earlier copy files, five rows were added that `COPY_1019` and R20 did not
have:

| Row | Finding |
|---|---|
| D-2, D-3 | the page **title** and **description**, which appear in every browser tab and search result, still said "capa operativa" and "una sola ficha por cliente" / "one record of each customer" |
| A-15 | the second "al momento" in story D (`did`) |
| A-16 | "confirmadas por el equipo" also in the report **behind the login**: label changed, data key unchanged |
| C-10 | the second ads note, above |

A-13 also drops "4 propuestas enviadas" from the report example, because property proposals are not in
production.

## 6. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | one pass applying `WEBSITE_COPY_HANDOVER_1021.md` on a named build, then a text check from this lane | Website, then Copy |
| 2 | the package limits in `OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md` | Owner |
| 3 | F-R16-5 re-checked against source and HTML | Reviewer |
| 4 | E14, the company details | Owner |
| 5 | the retention decision with the backup window | Owner, then counsel |
| 6 | the production purge path, for the one conditional sentence on the deletion page | Hosting, API |
| 7 | E19 working hours in production | Lead, Hosting |
| 8 | ad intake proven end to end | API, Lead |
| 9 | E10 | Owner and counsel |

## 7. What I did not do

No application code, no design work, no acceptance, no publication. No limit, price or capacity figure
written. No company data invented. The preview was read with GET only. Both files were committed with a
pathspec, and `git show --stat HEAD` was checked to list only them.
