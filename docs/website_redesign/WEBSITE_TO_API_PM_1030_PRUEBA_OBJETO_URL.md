# Signal `PRUEBA_OBJETO_URL` — the E-FU2 test listing is live on the production domain · 30.10.2026

**Written for:** API (binds exactly this URL), PM (the test mechanism), Hosting and Audit (reading along). **Basis:** the owner's
line of 27.10. 07:59Z as recorded by PM (`PM_TO_WEBSITE_API_LEAD_1027_EFU2_RELEASED_v1.md`: "nur diese eine Testseite (noindex,
nicht verlinkt)") and the audit's R26 ZIEL 1.

```
PRUEBA_OBJETO_URL   = https://nuovasolution.com/es/prueba-objeto
PRUEBA_OBJETO_IMAGE = https://nuovasolution.com/prueba/imagen-prueba.jpg
DEPLOYMENT          = dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq  (project nuovasolution, target production,
                      https://nuovasolution-90ov7ev2h-nuovasolajs-projects.vercel.app, aliased to nuovasolution.com, 30.10.)
CODE                = branch efu2-prueba-objeto @ e03b5fb = production main 9943660 + 3 files
                      (app/es/prueba-objeto/page.tsx, public/prueba/imagen-prueba.jpg, next.config.js: two X-Robots-Tag headers)
```

## What the page carries (PM's fields, the owner's released values)

```
[PRUEBA] Piso de demostración NuovaSolution
Referencia: NS-TEST-0001
Estado: Disponible
Actualizado: 30/10/2026
Precio: 289.000 €
Ubicación: Nerja, Málaga
Tipo: piso
Dormitorios: 2
Baños: 1
Superficie: 75 m²
Operación: Venta
Este es un inmueble de prueba de NuovaSolution. No es una oferta real.
Imagen: propia (NuovaSolution)
```

Every field is server-rendered text (no JavaScript needed). The picture is NuovaSolution's own drawn graphic (a house diagram, no
third-party content) with "PRUEBA" burnt into the pixels, `alt` "Imagen de prueba NuovaSolution".

## Proof, measured on the domain after the deploy (30.10.)

| Check | Result |
|---|---|
| `GET /es/prueba-objeto` | `200`, served directly (no redirect); HTML carries `<meta name="robots" content="noindex, nofollow, nocache">`; response header `X-Robots-Tag: noindex, nofollow` |
| `GET /prueba/imagen-prueba.jpg` | `200`, `Content-Type: image/jpeg`, `X-Robots-Tag: noindex, nofollow` |
| Linked from anywhere? | no: the production code has no reference to `prueba-objeto` outside the page itself (grep over app, components, lib, translations: 0); no sitemap route exists on the old site; no menu entry |
| Other routes | `/`, `/legal-notice`, `/aviso-legal`, `/privacy-policy` → `200` before and after, unchanged code (the branch is `main` + the three files above, `git diff --stat origin/main..e03b5fb` = 3 files); `/prueba-objeto` and `/es/prueba-objeto/x` → `404` |
| Nothing of the new website on the domain | the deployment is built from the old site's code (`main` of 25.05. + the page); no route of the redesign is served there |

## Removal (PM §4), when the owner's receipt line comes

1. `Estado: Disponible` → `Estado: Retirado`, `Actualizado:` = removal date (one deploy of the branch).
2. API sets the inventory row and the source inactive.
3. After 7 days the page answers `410 Gone` and the picture is removed.

**Note for Hosting/Audit:** the production deployment was made with the Vercel CLI from the branch's files. A later push to `main`
through the Git integration would publish `main` without this page; until the test ends, `main` must not be redeployed over it (or
the branch is merged into `main` first).
