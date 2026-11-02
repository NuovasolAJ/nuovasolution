# WEBSITE COPY HANDOVER 1102 — one file for the redesign chat: RV5 lines, the English seal, the launch scope

> **SUPERSEDED on 2026-11-02 by `WEBSITE_COPY_HANDOVER_1102_v2.md`.** After the owner's verdict (WEBSITE_STAGE1 not accepted) and
> the report "02_NuovaSolution_Review.pdf", v2 is the only copy source. It carries over §A, §B and §C of this file, aligned with
> the new direction. Do not apply this file.

**For:** the redesign chat, the only writer of the website source files. **One file, one pass.** Every row gives the file and
line on **`845429e`** (`dpl_8WBTUP8TGPDX3snnMp2zM9YTeru1`, the stage-1 build, read 02.11. through its fixed URL), the current
text, and the exact new ES and EN text. The EN text sits at the same key as the ES text unless a row says otherwise.
**Sources:** `WEBSITE_COPY_RV5_1030_RETURN_v1.md` (L-1, AL-1, EX-1, EX-2); the owner's lines on the legal seal and on
LAUNCH-UMFANG; API's claims register `governance/API_CLAIMS_LINES_1102_v1.md` (commit `25a6382`), whose rule is: "Disponible"
only where the column "may say today" allows it, otherwise "En preparación" or left out.
**Marking:** technical and editorial. **Not a legal approval, not a Meta approval. No publication released.**

**Scope rule (owner, LAUNCH-UMFANG):** the core launch does not wait for Voice, 3D or Instagram posting. Only scope that has been
accepted is shown as available. Voice, 3D and Instagram posting carry an honest state until they are accepted.

---

## A. The four open RV5 lines

### L-1 · The deletion page, at all four places, = `META_LEGAL_TEXT_FINAL.md` §3 word for word

| Place | File on `845429e` |
|---|---|
| `/es/legal/data-deletion` | `lib/content/legal.ts`, the ES `data-deletion` page |
| `/en/legal/data-deletion` | `lib/content/legal.ts`, the EN `data-deletion` page (from line 86) |
| P1 ES | `docs/website_redesign/p1_nuovasolution_com/eliminar-datos.html` |
| P1 EN | `docs/website_redesign/p1_nuovasolution_com/data-deletion.html` |

**Today** all four carry the earlier text: no identity block, no paragraph on what is deleted and what stays, and two different
phrasings. **New:** the text below, which is §3 of `META_LEGAL_TEXT_FINAL.md` at `56123d2`, copied by script.

- `⟦E14: …⟧` is filled from the E14 block once API signals E14 complete. Until then the page stays "PROVISIONAL".
- `⟦COUNSEL: F9⟧` is **not rendered**. It is the publication gate: the paragraph may go live only after counsel has answered F9
  (R26-i). On the preview the paragraph may show without the mark, under the "PROVISIONAL" banner.

**ES (`/eliminar-datos`, `/es/legal/data-deletion`):**

> **Cómo pedirnos que eliminemos tus datos**
>
> **Quién responde.** NuovaSolution es el nombre comercial de ⟦E14: NOMBRE⟧, NIF ⟦E14: NIF⟧,
> ⟦E14: DIRECCIÓN⟧, ⟦E14: EMAIL⟧. El aviso de privacidad completo
> está en https://nuovasolution.com/politica-privacidad.
>
> **Si escribiste a una inmobiliaria que usa Nuova.** Esa agencia decide sobre tus datos y nosotros
> actuamos según sus instrucciones. Escribe a ⟦E14: EMAIL⟧ desde el email o el teléfono que
> usaste e indica que quieres que se eliminen tus datos. Trasladamos tu solicitud a la agencia, la ayudamos
> a responderla y te comunicamos el resultado.
>
> **Si eres una agencia que usa Nuova.** Escribe a ⟦E14: EMAIL⟧ desde la dirección de tu
> cuenta, o pídenoslo dentro de tu cuenta. Confirmamos qué se va a eliminar, qué tenemos que conservar por
> ley y cuándo está hecho.
>
> **Si tu agencia conectó Instagram.** Abre NuovaSolution, entra en Social y pulsa Desconectar. El token se
> elimina de inmediato y dejamos de leer y de publicar. Eliminar la app en los ajustes de Instagram también
> termina nuestro acceso. Ninguna de las dos cosas suprime los datos ya guardados: para eso, escribe a
> ⟦E14: EMAIL⟧ desde la dirección de tu cuenta e indica el nombre de la agencia. Entonces
> suprimimos las publicaciones, los comentarios, los mensajes y las oportunidades creadas a partir de ellos
> para esa conexión.
>
> **Si has comentado o escrito por Instagram a una agencia.** Escribe a ⟦E14: EMAIL⟧ e indica
> la agencia y la fecha aproximada de tu mensaje. No guardamos tu nombre de usuario ni tu identificador
> original de Instagram, así que la agencia y el periodo son lo que nos permite encontrar tus datos.
>
> **Qué necesitamos de ti.** La dirección o el número que usaste y qué pides: una copia de tus datos, una
> corrección o la eliminación. Podemos pedirte que confirmes la solicitud desde esa misma dirección o
> número, para que nadie más pueda pedir tus datos.
>
> **Qué pasa después.** Una persona gestiona cada solicitud. Respondemos para confirmar que la hemos
> recibido y de nuevo cuando está hecha, incluido lo que tengamos que conservar por ley y por qué.
> Respondemos dentro del plazo que marca la ley, que normalmente es de un mes.
>
> **Qué eliminamos y qué se mantiene un tiempo.** Cuando toca eliminar, borramos a la persona de todos los
> almacenes de nuestra base de datos en un solo paso y después revisamos toda la base por si queda algo.
> Algunas copias están fuera de esa base y se eliminan según su propio plazo: los registros de nuestro
> servidor de automatización a los 14 días, y nuestras copias de seguridad como máximo a los 14 días. Si
> alguna vez se restaura una copia, la eliminación se
> aplica de nuevo antes de usar los datos. Las copias que guardan los servicios que usamos, como Meta para
> WhatsApp, siguen sus propios plazos. Una copia que conserva la propia agencia, por ejemplo en su buzón,
> la elimina la agencia, y le decimos qué tiene que borrar. Guardamos constancia de que la eliminación se
> pidió y se hizo, sin tus mensajes ni tus datos de contacto en forma legible, y el registro de cualquier
> consentimiento que diste o retiraste. ⟦COUNSEL: F9⟧
>
> **Qué no hace esta página.** Esta página no elimina nada por sí misma. Te indica cómo pedirlo.
>
> **Si no estás conforme.** Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).

**EN (`/data-deletion`, `/en/legal/data-deletion`):**

> **How to ask us to delete your data**
>
> **Who this is.** NuovaSolution is the trading name of ⟦E14: NAME⟧, NIF ⟦E14: NIF⟧, ⟦E14: ADDRESS⟧,
> ⟦E14: EMAIL⟧. The full privacy notice is at
> https://nuovasolution.com/privacy-policy.
>
> **If you wrote to an estate agency that uses Nuova.** That agency decides about your data and we act on
> its instructions. Write to ⟦E14: EMAIL⟧ from the e-mail address or phone number you used,
> and say that you want your data deleted. We pass your request to the agency, help it answer, and tell you
> the outcome.
>
> **If you are an agency using Nuova.** Write to ⟦E14: EMAIL⟧ from the address of your
> account, or ask us inside your account. We confirm what will be deleted, what we have to keep by law, and
> when it is done.
>
> **If your agency connected Instagram.** Open NuovaSolution, go to Social and choose Disconnect. The
> access token is deleted immediately and we stop reading and publishing. Removing the app in your
> Instagram settings also ends our access. Neither of those deletes the data already stored: for that,
> write to ⟦E14: EMAIL⟧ from the address of your account and name your agency. We then delete
> the posts, comments, messages and the leads created from them for that connection.
>
> **If you commented on or wrote to an agency on Instagram.** Write to ⟦E14: EMAIL⟧ and name
> the agency and the approximate date of your message. We do not store your Instagram username or your
> original Instagram identifier, so the agency and the time frame are what let us find your data.
>
> **What we need from you.** The address or number you used, and what you want: a copy of your data, a
> correction, or deletion. We may ask you to confirm the request from that same address or number, so that
> nobody else can ask for your data.
>
> **What happens then.** A person handles every request. We reply to confirm that we received it, and again
> when it is done, including anything we must keep by law and why. We answer within the period the law
> sets, which is normally one month.
>
> **What we delete, and what stays for a while.** When a deletion is due, we remove the person from every
> store of our database in one step, and then search the whole database for anything left behind. Some
> copies sit outside that database and are removed on their own schedule: the records of our automation
> server after 14 days, and our backups at the latest after 14 days. If a backup is
> ever restored, the deletion is applied again before the data is used. Copies held by the services we use,
> such as Meta for WhatsApp, follow those services' own deletion periods. A copy the agency keeps itself, in
> its own mailbox for example, is the agency's to delete, and we tell it what to remove. We keep a record that
> the deletion was requested and done, without your messages or your contact details in readable form, and
> the record of any consent you gave or withdrew. ⟦COUNSEL: F9⟧
>
> **What this page does not do.** This page does not delete anything by itself. It tells you how to ask.
>
> **If you are not satisfied.** You can complain to the Spanish data protection authority, the AEPD.

### AL-1 · The alt text of the empty 3D picture

| File | Current | New ES | New EN |
|---|---|---|---|
| `lib/content/home-sections.ts:53` `pairAlt` (the empty picture, `living-empty-1200.webp`) | "Casa de ejemplo ficticia: el mismo salón vacío y con mobiliario ilustrativo" · "Fictional example house: the same living room empty and with illustrative furnishing" | Casa de ejemplo ficticia: el mismo salón vacío, desde la misma cámara | Fictional example house: the same living room, empty, from the same camera |

### EX-1, EX-2 · The example report

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| EX-1 | `lib/content/example-report.ts:27` (ES), `:55` (EN), `chart.note` | "Cuatro semanas de ejemplo" · "Four example weeks" | Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación. | Four example weeks. The week-by-week trend is part of the extended report, in preparation. |
| EX-2 | `example-report.ts:40` (ES), `:68` (EN), `next[2]` | "Confirmar con Laura la visita del jueves a las 10:00." · "Confirm Thursday's 10:00 viewing with Laura." | Recordar a Laura la visita del jueves a las 10:00. | Remind Laura of Thursday's 10:00 viewing. |

EX-1 falls if API confirms that the agency login already shows several weeks. API's register says the extended report tier is
empty in production.

---

## B. The English legal seal

The Spanish pages say "Provisional"; the English ones say "Placeholder". The English seal gets the Spanish meaning.

| File | Current | New EN |
|---|---|---|
| `lib/i18n/dictionaries/en.ts:80` `placeholder` | "Placeholder" | Provisional |
| `en.ts:897` `placeholderBanner` | "PLACEHOLDER. This text is not final and has not been reviewed by counsel. It is published so the route exists and is clearly labelled." | PROVISIONAL. This text is not final and has not been reviewed by a lawyer. It is published so that the route exists and is clearly marked. |

The Spanish stays: "PROVISIONAL. Este texto no es definitivo y no ha sido revisado por un abogado. Se publica para que la ruta
exista y esté claramente identificada." (`es.ts:842`).

---

## C. The launch scope, against API's register

### C.1 The alert for important enquiries: held back in production → no "Disponible"

Register, "Alarm in prod": "**P: held back today** (HA1; fix in v3) · **no** 'Disponible' · condition: V3-DEPLOY + a prod probe
with a real alert to staff". The example in the story may still **show** an alert. Every **state** and every **promise** changes.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-1 | `lib/content/home-story.ts:250`, the hero lead | "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente **y lo pasa a la persona de tu equipo que toca**. Menos consultas que se quedan sin atender." | Responde a lo que llega por WhatsApp y email y guarda en una ficha lo que busca cada cliente. Menos consultas que se quedan sin atender. | Answers what arrives on WhatsApp and e-mail and keeps what each customer is looking for on a record. Fewer enquiries left unanswered. |
| C-2 | `lib/content/home-sequence.ts:118`, step 5 state | "Disponible hoy: el aviso por email, todavía sin horario de oficina. En preparación: la lista de tareas." | En preparación: el aviso por email y la lista de tareas. | In preparation: the e-mail alert and the task list. |
| C-3 | `home-story.ts:363`, story D state | "Disponible hoy: el aviso por email. El aviso llega cuando entra la consulta, todavía sin horario de oficina. En preparación: la lista de tareas…" | En preparación: el aviso por email a la persona que toca, la lista de tareas para tomarlas y cerrarlas, y el asistente que explica el orden. | In preparation: the e-mail alert to the right person, the task list to take and close tasks, and the assistant that explains the order. |
| C-4 | `lib/content/platform-map.ts:70`, row "Avisos de consultas importantes" | state `available` · line "…Todavía sin horario de oficina." | state **`preparing`** · line: Un email a la persona adecuada de tu equipo cuando entra una consulta importante. | state **`preparing`** · line: An e-mail to the right person on your team when an important enquiry comes in. |
| C-5 | `lib/content/package-matrix.ts:66`, Essential row "Avisos de consultas importantes" | state `available` · note "por email, todavía sin horario de oficina" | state **`preparing`**, no note | the same |
| C-6 | `lib/content/faq.ts:125`, "¿Me dice qué leads están calientes?" | "Sí, por email. Cuando una consulta parece importante, la persona adecuada de tu equipo recibe un aviso con el motivo. Todavía sin horario de oficina." | Todavía no. El aviso por email a la persona adecuada de tu equipo, con el motivo, está en preparación. Hoy la consulta queda en su ficha. | Not yet. The e-mail alert to the right person on your team, with the reason, is in preparation. Today the enquiry is kept on its record. |
| C-7 | `lib/content/capabilities.ts:85`, AI Sales Agent, the fourth point | "Un aviso por email a la persona adecuada cuando una consulta importa." | Un aviso por email a la persona adecuada cuando una consulta importa (en preparación). | An e-mail alert to the right person when an enquiry matters (in preparation). |

### C.2 Registration and the trial: no public sign-up promise yet

Register: "public registration **not released** · **no** public sign-up promise · condition: owner registration line + new site
live (E28-Prod P1/P5)"; trial "not before the prod onboarding core (E28-Prod P4 + owner)". **Valid until those two lines exist;
then the current wording comes back.** The primary call to action becomes the demo, which is also the brief's primary CTA ("Book a
Demo").

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-8 | `lib/i18n/dictionaries/es.ts:61`, `:316`; `lib/content/package-matrix.ts:70`; `lib/content/plans.ts:86`: every "Probar gratis" button | "Probar gratis" | Reservar una demo | Book a demo |
| C-9 | `home-story.ts:252`, `home-sections.ts:118`, `example-report.ts:43`, `app/[locale]/packages/page.tsx:72`: the line under the button | "14 días gratis · Sin método de pago" | Prueba gratuita de 14 días: en preparación | 14-day free trial: in preparation |
| C-10 | `es.ts:370`, packages `h1` | "Pruébalo gratis 14 días" | Tres paquetes, con su estado real | Three packages, with their real state |
| C-11 | `es.ts:371`, packages `lead` under the `h1` | "14 días gratis, sin método de pago, con el paquete Essential. Después eliges un plan con nosotros y te decimos el precio…" | Hoy los paquetes todavía no se pueden contratar: el registro y la prueba de 14 días están en preparación. Te decimos el precio para tu agencia antes de acordar nada. | The packages cannot be booked yet: registration and the 14-day trial are in preparation. We tell you the price for your agency before anything is agreed. |
| C-12 | `es.ts:411`, the Essential card button | "Prueba Essential gratis" | Solicita una propuesta | Request a proposal |
| C-13 | `faq.ts:161`, "¿Cuánto dura la prueba y qué cuesta?" | "14 días de Essential, gratis, sin método de pago y sin tarjeta. Creas la cuenta tú mismo." | Será de 14 días de Essential, gratis y sin método de pago. El registro público está en preparación; hasta entonces, escríbenos y te enseñamos el sistema. | It will be 14 days of Essential, free and with no payment method. Public registration is in preparation; until then, write to us and we will show you the system. |
| C-14 | `faq.ts:195`, "¿Tengo que hablar antes con un comercial?", and `es.ts:388` ("¿Tengo que hablar con alguien antes?", the same answer shortened) | "No. Puedes empezar por tu cuenta. La demo es opcional y nunca una condición." | No hace falta una llamada comercial: escríbenos y te enseñamos el sistema. Empezar por tu cuenta llega con el registro público, en preparación. | No sales call is needed: write to us and we will show you the system. Starting on your own comes with public registration, in preparation. |
| C-15 | `lib/content/home-sections.ts:84`, "Cómo empiezas" lead | "Sin llamada comercial. Creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. El precio…" | Así será el arranque cuando abra el registro: creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. Hoy el registro está en preparación. El precio te lo decimos para tu agencia antes de acordar nada; lo que pasa con los datos está escrito aquí. | This is how it will start once registration opens: you create the account, set up your agency at your own pace and we connect the channels with you. Registration is in preparation today. We tell you the price for your agency before anything is agreed; what happens with the data is written here. |
| C-16 | `es.ts:445`, the `h1` of `/trial`, and the top of that page | "Prueba gratis durante 14 días." · no state | h1: **La prueba gratuita de 14 días, en preparación.** · state line under it: **Estado: El registro público y la prueba de 14 días están en preparación.** | h1: **The 14-day free trial, in preparation.** · **State: Public registration and the 14-day trial are in preparation.** |
| C-16a | `es.ts:62`, `tryFree` | "Prueba gratis durante 14 días" | Prueba gratuita de 14 días: en preparación | 14-day free trial: in preparation |
| C-16b | `es.ts:489`, `trialBody` (the contact page, "O simplemente empieza") | "Prueba gratis durante 14 días. Sin método de pago, sin llamada comercial." | La prueba gratuita de 14 días, sin método de pago, llega con el registro público, en preparación. | The 14-day free trial, with no payment method, comes with public registration, in preparation. |
| C-17 | `/signup` | linked from the trial path | not linked from public pages until the owner's registration line | the same |

### C.3 Packages: no "Disponible" per package

Register: "Package names / content: **S** only; prod has **no** package system · no 'Disponible' per package". The features still
work for our own agency, so the package lists say **what is included**, not that it is available to book.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-18 | `package-matrix.ts:112`, `states.available` (only in the package lists) | "Disponible" | Incluido | Included |
| C-19 | `package-matrix.ts:115`, `states.request` | "Disponible por encargo · sin cupo" | En preparación · todavía no contratable | In preparation · not bookable yet |

C-11 already says above the cards that the packages cannot be booked yet.

### C.4 3D: an honest state until it is accepted

Owner, LAUNCH-UMFANG: 3D does not hold up the launch and is not shown as available. T6 (order → workshop → QA → delivery →
protected viewer) is not complete.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-20 | `platform-map.ts:115`, row "Visualización 3D" | state `request` ("Por encargo") | state `preparing` | the same |
| C-21 | `package-matrix.ts:103`, Enterprise row "Modelos 3D incluidos por encargo" | state `request` · note "a partir de tus planos" | state `preparing`, no note | the same |
| C-22 | `package-matrix.ts:99`, Enterprise `limits` | "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma." | Los modelos 3D y la publicación en Instagram están en preparación; Instagram depende además de la aprobación de la plataforma. | 3D models and Instagram publishing are in preparation; Instagram also depends on the platform's approval. |
| C-23 | `home-sections.ts:23`, 3D section lead | "…Construimos el modelo, lo mostramos vacío y amueblado desde la misma cámara y lo comprobamos contra tu plano. Cada modelo es un encargo, con o sin paquete." | …Construimos el modelo, lo mostramos vacío y amueblado desde la misma cámara y lo comprobamos contra tu plano. Cada modelo será un encargo, con o sin paquete. **Estado: En preparación · todavía no contratable.** | …We build the model, show it empty and furnished from the same camera and check it against your plan. Each model will be an order, with or without a package. **State: In preparation · not bookable yet.** |
| C-24 | `home-sections.ts:59`, `package-matrix.ts:125` | "Modelos 3D también por separado, sin ningún paquete: nos envías los planos, lo construimos y lo comprobamos." | Más adelante, los modelos 3D también se podrán encargar por separado, sin ningún paquete. | Later, 3D models can also be ordered on their own, without a package. |
| C-25 | `home-sections.ts:62`, `package-matrix.ts:127`, button | "Pide un modelo" | Pregúntanos por el 3D | Ask us about 3D |

### C.5 Voice and Instagram posting: already honest, unchanged

The phone is "Prototipo … solo en español" (story A, the platform row "Asistente telefónico · En preparación", FAQ "¿Atiende llamadas?
No."). Instagram is "Prototipo · depende de la aprobación de la plataforma", with the platform rows and the Enterprise row "En
preparación". **No change.** Both remain so until accepted.

### C.6 WhatsApp, data location, module pages

| # | File | Current | New ES | New EN | Register |
|---|---|---|---|---|---|
| C-26 | `platform-map.ts:54`, row WhatsApp | "Respuesta con el nombre de tu agencia; hoy en español." | Respuesta por WhatsApp, hoy en español. Conectar el número de tu agencia está en preparación. | Replies on WhatsApp, in Spanish today. Connecting your agency's own number is in preparation. | "✓ for our own agency; **not** 'your own number'". The disclosure with the agency's name (v1.1) is not approved either |
| C-27 | `home-sections.ts:111`, "Qué hacemos nosotros al conectar" | "Preparamos la cuenta de WhatsApp Business con tu nombre. Hoy las consultas por email…" | Conectar la cuenta de WhatsApp Business de tu agencia está en preparación. Hoy las consultas por email… *(rest unchanged)* | Connecting your agency's own WhatsApp Business account is in preparation. Today e-mail enquiries… *(rest unchanged)* | the same |
| C-28 | `faq.ts:224`, "¿Dónde se guardan los datos?" | "En la Unión Europea. La base de datos y los archivos están con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. …" | La base de datos y los archivos están en la Unión Europea, con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. Para los canales de mensajes y el proveedor de IA indicamos lo que declara cada proveedor. *(the sentence on files without a public link stays)* | The database and the files are in the European Union, with our infrastructure provider in Frankfurt, and the servers that run the automation are in Germany. For the message channels and the AI provider we state what each provider declares. *(the sentence on files stays)* | "base de datos en la UE (Fráncfort)"; **never** "todos los datos en la UE" |
| C-29 | `es.ts:89`, the line under "Encaja con tu operación" on the module pages | "Disponible según los canales que tengas conectados." | Hoy con WhatsApp y Gmail, respuestas en español. | Today with WhatsApp and Gmail, replies in Spanish. | WhatsApp (own agency), Gmail ✓ |
| C-30 | the same line on `/platform/daily-assistant` | as C-29 | **remove** on this page | **remove** | the page is "En preparación"; "Disponible…" under it contradicts it |

**Unchanged, because the register allows them:** "Disponible hoy: WhatsApp y email" (hero step 1, story A); "Disponible hoy, en
español" (step 2); "una ficha por consulta" (step 3, platform CRM); the Gmail labels; the report in the agency login; the CRM
included; "Google Sheets" only as an optional copy; external CRMs only "cuando esté listo"; the CRM page's "dos fichas"; Outlook
"Hoy no"; Spanish as the only reply language.

---

## D. After this pass

The Reviewer and I check **only these rows plus one regression run** on the build that is named next. When a register condition
is met (V3-DEPLOY with the alert probe, E28-Prod P4 with the owner's registration line, T6 for 3D, the multi-agency WhatsApp
path), the matching rows go back to the earlier wording **on that evidence**, and never before.
