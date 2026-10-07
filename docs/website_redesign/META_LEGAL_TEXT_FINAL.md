# META_LEGAL_TEXT_FINAL — Instagram sections and the deletion instruction page, ES and EN

**State:** `2026-10-07` (v1 2026-10-03, content check 2026-10-06) · **Lane:** Website Copy / Product Truth → **Website Implementer** (publish) and
**Social** (confirm the substance).
**Source:** `backend_handoff/handoff_in_2026-10-03/META_LEGAL_SECTIONS_v1.md` (Social, 2026-09-28), with
the **two corrections** this round requires. Integrated versions of these texts also live in
`LEGAL_PAGES_FINAL_v1.md` v3; this file is the publishable extract.
**Aligned with the built state on 2026-10-07, see §4b; content checked 2026-10-06, see §4. Placeholders: none. Publish-ready: NO — two points in §4b (the clock runs on staging, no deletion observed) and the owner's retention decision in §5b.** Not one open mark appears below, so a search for the mark glyph returns zero hits
in this file. The three pages this file feeds can be published without
waiting for the tax number, the full address, the retention decision or counsel's two terms questions,
because none of them appears in these texts.
**Governance label:** this document is a draft by its author and has **not** been legally reviewed. That
label belongs to this document and **must not be rendered on the public page**: an internal review note on
a customer page is exactly what the register forbids.

---

## 0. The two corrections against Social's draft

| # | Social's draft | This file | Why |
|---|---|---|---|
| 1 | "Instagram **or Facebook**", and a Meta-wide framing in the deletion paths | **Instagram only**, said in the first line of the section | Social's own delimitation D2: Facebook pages and advertising lead forms run through a different login with different permissions and are not part of this connection. A page naming Facebook describes a connection we do not have |
| 2 | an automatic deletion callback: "if you remove NuovaSolution from your Instagram apps, Instagram notifies us. We then delete… and provide a confirmation code" | **no callback is described.** Removing the app revokes our access; deletion of stored data is requested on the instruction page, and a person confirms it in writing | there is no deletion callback endpoint. Meta accepts an instruction URL, and describing an automated path that does not exist would be the one thing a reviewer can check and disprove |

Also not adopted: Social's proposed deadlines of 72 hours and 30 days. Social itself writes they need
counsel and must not be promised before the path is served, and no social deletion request has ever been
handled. The pages state the statutory period instead. That question stays open as CQ-13.

---

## 1. Privacy notice, the Instagram section

### 1.1 EN

> **Instagram connection (Meta platform data)**
>
> In this section, “we” and “NuovaSolution” mean the controller named at the top of this notice.
>
> This section applies only to agencies that connect an Instagram professional account. It covers
> Instagram and nothing else: Facebook pages and advertising lead forms are not part of this connection and
> we do not read them.
>
> If your agency connects its Instagram professional account to NuovaSolution, we process the following
> data from the Instagram API with Instagram Login:
>
> - **Account data of the connected account:** the Instagram account identifier, the username and the
>   account type. We use it to show you which account is connected and to publish on your behalf.
> - **Access token:** a token issued by Instagram, valid for up to 60 days. It is stored encrypted, used
>   only for what this section describes, and deleted when you disconnect.
> - **Your own content:** the posts we create from your property listings, their texts and images, the
>   identifier of the published post and its link.
> - **Comments and direct messages on your account:** the text, the time, and the interest our system
>   recognises.
> - **The identifier we need in order to reply (the reply target).** To answer inside the period Instagram
>   allows, we keep the identifier of the comment, or the sender identifier of a direct message, in readable
>   form and **only for as long as we may reply: 7 days for a comment, and 24 hours from that person's own
>   message.** The same identifier and the same deadline apply to the comment identifier in our record of
>   received events. A clean-up runs every fifteen minutes and removes what has fallen due, so the
>   identifier is gone at the latest fifteen minutes after the period ends; if a run is missed, the next one
>   removes what was due. It is removed straight away if your agency disconnects the account or if the
>   person asks for erasure. What remains is a salted value that cannot
>   be turned back into the original, kept for one purpose only: so that a late repeat of the same event
>   does not produce a second message.
>
>   This is a product rule and a short one. It is **not** the retention of the message texts, which is set
>   out further down and is a different rule.
> - **Leads:** if a comment or a message shows interest in a property, we create a lead record for your
>   agency.
>
> **What we use it for:** publishing your listings, showing you incoming comments and messages, replying to
> them from your workspace, and creating leads. Not for advertising, not sold, and never shared with
> another agency.
>
> **Legal basis:** performance of the contract with your agency, and our legitimate interest in operating
> the service. For the people who write to your agency, your agency is the controller and we act as its
> processor.
>
> **Who processes it:** the services listed in the processors section of this notice, plus Meta as the
> operator of the platform.
>
> **How long it is kept:** the account data and the token for as long as the connection exists. Comments,
> messages and the leads created from them are **not deleted on a timer today**: they stay while your
> agency's account exists, and we delete them when you or the person concerned ask us to. If we introduce
> an automatic period for them, it will be stated here before it starts to apply.
>
> **Automated processing:** messages are classified by an AI model in order to recognise interest. Replies
> drafted by the system carry the notice described in this notice in the channel where they are sent.
>
> **Your rights:** you can disconnect the Instagram account in NuovaSolution at any time. When you do, we
> delete the access token **and every reply target still stored for that connection**. For the deletion of
> data already stored, see the data deletion page.

### 1.2 ES

> **Conexión con Instagram (datos de la plataforma de Meta)**
>
> En este apartado, «nosotros» y «NuovaSolution» se refieren al responsable del tratamiento indicado al
> principio de este aviso.
>
> Este apartado se aplica solo a las agencias que conectan una cuenta profesional de Instagram. Cubre
> Instagram y nada más: las páginas de Facebook y los formularios de publicidad no forman parte de esta
> conexión y no los leemos.
>
> Si tu agencia conecta su cuenta profesional de Instagram con NuovaSolution, tratamos los siguientes datos
> procedentes de la API de Instagram con inicio de sesión de Instagram:
>
> - **Datos de la cuenta conectada:** el identificador de la cuenta, el nombre de usuario y el tipo de
>   cuenta. Sirven para mostrarte qué cuenta está conectada y para publicar en tu nombre.
> - **Token de acceso:** un token emitido por Instagram con una validez de hasta 60 días. Se guarda
>   cifrado, se usa solo para lo que describe este apartado y se elimina al desconectar.
> - **Tu propio contenido:** las publicaciones que creamos a partir de tus inmuebles, sus textos e
>   imágenes, el identificador de la publicación y su enlace.
> - **Comentarios y mensajes directos en tu cuenta:** el texto, la fecha y el interés que detecta nuestro
>   sistema.
> - **El identificador que necesitamos para responder (el destino de la respuesta).** Para poder contestar
>   dentro del plazo que permite Instagram, guardamos el identificador del comentario, o el identificador del
>   remitente de un mensaje directo, en forma legible y **solo durante el plazo en el que podemos responder:
>   7 días en el caso de un comentario y 24 horas desde el propio mensaje de esa persona.** El mismo
>   identificador y el mismo plazo se aplican al identificador del comentario en nuestro registro de eventos
>   recibidos. Una limpieza se ejecuta cada quince minutos y retira lo que ha vencido, así que el
>   identificador desaparece como muy tarde quince minutos después de que termine el plazo; si una ejecución
>   se salta, la siguiente retira lo que estaba pendiente. Se retira de inmediato si tu agencia desconecta la
>   cuenta o si la persona solicita la supresión. Lo que queda es un valor con sal que no se puede convertir de vuelta en
>   el original, conservado con una única finalidad: que un reenvío tardío del mismo evento no genere un
>   segundo mensaje.
>
>   Esta es una regla de producto y es corta. **No** es la conservación de los textos de los mensajes, que se
>   indica más abajo y es una regla distinta.
> - **Oportunidades:** si un comentario o un mensaje muestra interés por un inmueble, creamos un registro
>   para tu agencia.
>
> **Para qué lo usamos:** publicar tus inmuebles, mostrarte los comentarios y mensajes entrantes,
> responderlos desde tu panel y crear oportunidades. No con fines publicitarios, no se venden y nunca se
> comparten con otra agencia.
>
> **Base jurídica:** la ejecución del contrato con tu agencia y nuestro interés legítimo en la prestación
> del servicio. Respecto de quienes escriben a tu agencia, la agencia es la responsable del tratamiento y
> nosotros actuamos como encargados.
>
> **Quién lo trata:** los servicios que figuran en el apartado de proveedores de este aviso, más Meta como
> operador de la plataforma.
>
> **Cuánto tiempo se guarda:** los datos de la cuenta y el token mientras exista la conexión. Los
> comentarios, los mensajes y las oportunidades que surjan de ellos **hoy no se eliminan por plazo**:
> permanecen mientras exista la cuenta de tu agencia y los suprimimos cuando nos lo pides tú o la persona
> afectada. Si establecemos un plazo automático para ellos, se indicará aquí antes de que empiece a
> aplicarse.
>
> **Tratamiento automatizado:** los mensajes se clasifican con un modelo de inteligencia artificial para
> detectar interés. Las respuestas que redacta el sistema llevan el aviso descrito en este documento en el
> canal en el que se envían.
>
> **Tus derechos:** puedes desconectar la cuenta de Instagram en NuovaSolution en cualquier momento. Al
> hacerlo eliminamos el token de acceso **y todos los destinos de respuesta que sigan guardados de esa
> conexión**. Para la supresión de los datos ya almacenados, consulta la página de eliminación de datos.

---

## 2. Terms, the connected accounts block

### 2.1 EN

> **Connected Instagram accounts**
>
> You may connect an Instagram professional account that you own or administer. You are responsible for
> holding the rights to the images and texts you publish through NuovaSolution and for complying with
> Instagram's own terms and community guidelines.
>
> We reply to a comment or a message only after that person has contacted your account, never on our own
> initiative, and we send no unsolicited messages. A message to somebody who has not written to you is not
> possible in the system.
>
> **Replies only inside Instagram's periods.** A private reply to a comment is possible for 7 days, and a
> direct message only within 24 hours of that person's own message. Outside those periods the system refuses
> the reply rather than merely omitting it.
>
> **A post can be drafted automatically, and you decide whether it is published.** When one of your listings
> becomes publishable or its content changes, the system prepares exactly one draft. Whether that draft is
> published is your agency's setting: either a person approves it, or it goes out automatically after a delay
> you set. The same listing, unchanged, is never published twice.
>
> **A photo only where the rights cover embedding it.** A listing's photo is published only if the rights
> basis you store explicitly covers embedding the image. A permission that covers only the text or only a
> link is not enough, and the system then refuses to publish the photo.
>
> We may refuse or stop a publication if a listing has no proven image rights, if its data is out of date,
> or if Instagram restricts the connection. You can disconnect at any time, and publishing and reading stop
> immediately.
>
> NuovaSolution is not affiliated with Meta Platforms, Inc., and is neither endorsed nor certified by it.

### 2.2 ES

> **Cuentas de Instagram conectadas**
>
> Puedes conectar una cuenta profesional de Instagram de tu propiedad o que administres. Eres responsable
> de disponer de los derechos sobre las imágenes y los textos que publiques a través de NuovaSolution y de
> cumplir las condiciones y las normas de la comunidad de Instagram.
>
> Respondemos a un comentario o a un mensaje solo después de que esa persona haya contactado con tu cuenta,
> nunca por iniciativa propia, y no enviamos mensajes no solicitados. Un mensaje a alguien que no te ha
> escrito no es posible en el sistema.
>
> **Respuestas solo dentro de los plazos de Instagram.** Una respuesta privada a un comentario es posible
> durante 7 días, y un mensaje directo solo dentro de las 24 horas siguientes al propio mensaje de esa
> persona. Fuera de esos plazos el sistema rechaza la respuesta, no se limita a omitirla.
>
> **Una publicación puede redactarse automáticamente, y tú decides si se publica.** Cuando uno de tus
> inmuebles pasa a ser publicable o cambia su contenido, el sistema prepara exactamente un borrador. Que ese
> borrador se publique lo decide la configuración de tu agencia: o lo aprueba una persona, o sale
> automáticamente tras el plazo que tú indiques. El mismo inmueble, sin cambios, no se publica dos veces.
>
> **Una foto solo si los derechos cubren su incrustación.** La foto de un inmueble se publica solo si la base
> de derechos que tienes guardada cubre expresamente la incrustación de la imagen. Un permiso que cubre solo
> el texto o solo un enlace no basta, y en ese caso el sistema rechaza publicar la foto.
>
> Podemos rechazar o detener una publicación si el inmueble no tiene derechos de imagen acreditados, si sus
> datos no están actualizados o si Instagram restringe la conexión. Puedes desconectar en cualquier
> momento, y la publicación y la lectura se detienen de inmediato.
>
> NuovaSolution no está afiliada a Meta Platforms, Inc., ni cuenta con su respaldo o su certificación.

---

## 3. The data deletion page, in full

This is the page Meta is given as the Data Deletion Instructions URL:
`https://nuovasolution.com/data-deletion`, with the Spanish version at `/eliminar-datos`.

### 3.1 EN, `/data-deletion`

> **How to ask us to delete your data**
>
> **Who this is.** NuovaSolution is the trading name of Antonio Jesus Diaz Gomez, Prolongación Hernando de
> Carabeo, Nerja, Málaga, Spain, antonio@nuovasolution.com. The full privacy notice is at
> https://nuovasolution.com/privacy-policy.
>
> **If you wrote to an estate agency that uses Nuova.** That agency decides about your data and we act on
> its instructions. Write to antonio@nuovasolution.com from the e-mail address or phone number you used,
> and say that you want your data deleted. We pass your request to the agency, help it answer, and tell you
> the outcome.
>
> **If you are an agency using Nuova.** Write to antonio@nuovasolution.com from the address of your
> account, or ask us inside your account. We confirm what will be deleted, what we have to keep by law, and
> when it is done.
>
> **If your agency connected Instagram.** Open NuovaSolution, go to Social and choose Disconnect. The
> access token is deleted immediately and we stop reading and publishing. Removing the app in your
> Instagram settings also ends our access. Neither of those deletes the data already stored: for that,
> write to antonio@nuovasolution.com from the address of your account and name your agency. We then delete
> the posts, comments, messages and the leads created from them for that connection.
>
> **If you commented on or wrote to an agency on Instagram.** Write to antonio@nuovasolution.com and name
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
> **What this page does not do.** This page does not delete anything by itself. It tells you how to ask.
>
> **If you are not satisfied.** You can complain to the Spanish data protection authority, the AEPD.

### 3.2 ES, `/eliminar-datos`

> **Cómo pedirnos que eliminemos tus datos**
>
> **Quién responde.** NuovaSolution es el nombre comercial de Antonio Jesus Diaz Gomez, Prolongación
> Hernando de Carabeo, Nerja, Málaga, España, antonio@nuovasolution.com. El aviso de privacidad completo
> está en https://nuovasolution.com/politica-privacidad.
>
> **Si escribiste a una inmobiliaria que usa Nuova.** Esa agencia decide sobre tus datos y nosotros
> actuamos según sus instrucciones. Escribe a antonio@nuovasolution.com desde el email o el teléfono que
> usaste e indica que quieres que se eliminen tus datos. Trasladamos tu solicitud a la agencia, la ayudamos
> a responderla y te comunicamos el resultado.
>
> **Si eres una agencia que usa Nuova.** Escribe a antonio@nuovasolution.com desde la dirección de tu
> cuenta, o pídenoslo dentro de tu cuenta. Confirmamos qué se va a eliminar, qué tenemos que conservar por
> ley y cuándo está hecho.
>
> **Si tu agencia conectó Instagram.** Abre NuovaSolution, entra en Social y pulsa Desconectar. El token se
> elimina de inmediato y dejamos de leer y de publicar. Eliminar la app en los ajustes de Instagram también
> termina nuestro acceso. Ninguna de las dos cosas suprime los datos ya guardados: para eso, escribe a
> antonio@nuovasolution.com desde la dirección de tu cuenta e indica el nombre de la agencia. Entonces
> suprimimos las publicaciones, los comentarios, los mensajes y las oportunidades creadas a partir de ellos
> para esa conexión.
>
> **Si has comentado o escrito por Instagram a una agencia.** Escribe a antonio@nuovasolution.com e indica
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
> **Qué no hace esta página.** Esta página no elimina nada por sí misma. Te indica cómo pedirlo.
>
> **Si no estás conforme.** Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).

---

## 4. Publication check, 2026-10-06

Run before publication on the content, not only on placeholders. Six points, three of them changed
something.

| # | Checked | Result |
|---|---|---|
| P-1 | **Is "we" tied to a named controller?** | **Changed.** The Instagram section now opens with "In this section, 'we' and 'NuovaSolution' mean the controller named at the top of this notice", and the deletion page, which Meta reads on its own and which carried no identification at all, now opens with the controller's name, address and e-mail plus a link to the privacy notice |
| P-2 | **Which missing owner details do these sections need?** | **None.** See §5 |
| P-3 | **Does the sender identifier text match what is built?** | **Changed.** It said the identifier is held only as a one way value. With the reply target rule it is also held, in the form the platform requires, while the reply window of that conversation is open. Both sentences are now there, and the reply identifier is described as deleted when the window closes |
| P-4 | **Deletion page complete?** | Yes: who is responsible, the four ways in (agency customer, agency, Instagram connection, person who wrote on Instagram), what we need, what happens and when, what the page does not do, and the complaint route |
| P-5 | **Any claim that cannot be checked?** | No deletion callback, no confirmation code, no 72 hour or 30 day commitment, no Meta partnership, review or certification, no Facebook pages, no advertising lead forms |
| P-6 | **Placeholders** | Zero. A search for the mark glyph returns nothing |

**One condition on P-3.** The corrected sentence says the reply identifier is held "while the reply window
of that conversation is open" and deliberately names **no period**, because none has been confirmed. When
API and Social confirm the window, the period goes in as a number and this file gets a new version. The
page can be published with the sentence as it stands: it is accurate, and it is narrower than the claim it
replaces.

## 4b. Alignment against the built state, 2026-10-07

Source: `governance/SOCIAL_LEGAL_DELTAS_1006_v1.md` §1 to §6 and the "Copy + Social" section of
`governance/API_TO_LANES_1006_HANDOFFS_v1.md`. EN and ES were changed together, in the existing sections; no
parallel version was created.

| # | What is built | Where it now stands | Language |
|---|---|---|---|
| A-1 | the reply target: the comment identifier, or the sender identifier of a direct message, readable, for 7 days for a comment and 24 hours from that person's own message | privacy, Instagram section, its own bullet | EN + ES |
| A-2 | the same identifier and the same deadline apply to the comment identifier **in the record of received events** | same bullet, said explicitly | EN + ES |
| A-3 | deleted earlier on disconnect or on a deletion request; afterwards a salted value that cannot be reversed, kept only so a late repeat does not produce a second message | same bullet | EN + ES |
| A-4 | the retention of the **message texts** is a different and longer rule | said in the same bullet, pointing at the retention paragraph, so the two are not mixed | EN + ES |
| A-5 | outside the platform's periods the reply is **refused**, not merely omitted; a message to somebody who never wrote is impossible | terms, connected accounts | EN + ES |
| A-6 | a publishable listing produces exactly one draft; the agency decides by human approval or by a delay it sets; an unchanged listing is never published twice | terms, connected accounts | EN + ES |
| A-7 | a photo is published only where the stored rights basis explicitly covers embedding | terms, connected accounts | EN + ES |
| A-8 | disconnecting deletes the access token **and** every reply target still stored for that connection | privacy, "Your rights" | EN + ES |
| A-9 | no Facebook connection: Instagram Login only | already in §0 correction 1, unchanged | EN + ES |
| A-10 | no automatic deletion route over Meta; the instruction page is the permitted and sufficient route | already in §0 correction 2, unchanged | EN + ES |

### The clean-up sentence, and what it still waits for

A-1 and A-3 now describe the clean-up the way it is actually built: a clock, not a deletion at the exact
end of the window. The interval in the text is the measured one. Hosting reported
`REPLY_TARGET_PURGE_SCHEDULED = 1UVIZepbuUU1I7Rw`, every **fifteen minutes**, calling
`sg_reply_target_purge_due()` and nothing else, first run 135818 at 19:57:32Z with `purged 0, tenants 0`,
which was the correct answer because nothing was due. The catch-up sentence is in the text because a
missed run must not read as data kept for ever.

**Two things are still missing before this goes public, and neither is a wording question.**

1. **The clock runs on staging.** A public text describes production. The same schedule has to run against
   production before the sentence is true for the people who read it.
2. **No deletion has ever been observed.** The first run had nothing due, so the path from "due" to "gone"
   has not been exercised once. Hosting and Social owe `PURGE_DELETION_PROVEN`: one record that falls due,
   one run, and the record no longer there.

Until both hold, `META_LEGAL_TEXT_READY` stays unset. Nothing else in these texts waits on anything, and
no further copy round is needed: when the two points close, this paragraph is deleted and the file is
ready as it stands. If the production interval turns out to differ from fifteen minutes, the number in
both languages is the only thing that changes.

### The message texts: an undecided rule is not published as a fixed one

The section used to say comments, messages and the leads from them are kept "for as long as your agency's
account exists, unless you ask us to delete them earlier". That reads as a policy. It is not one: it is
what happens because production carries **zero** retention policy rows, so nothing is on a timer. The
wording now says exactly that, in both languages, and promises that a period will be stated here before it
starts to apply. The options for deciding it are in §5b, and they are a decision for the owner, not for
this lane.

## 5. What the owner is asked for, and what is not needed

The published privacy page names Antonio Jesus Diaz Gomez, Prolongación Hernando de Carabeo, Nerja,
Málaga, antonio@nuovasolution.com. Missing from it today are the **tax number** and the **house number and
postal code**.

| Detail | Needed for these three texts? | Reason |
|---|---|---|
| Tax number (NIF) | **No** | It identifies a business in a Spanish legal notice and on invoices. A privacy section and a deletion instruction page identify the controller by name, address and contact, and Meta's review asks for a reachable deletion route, not a tax number |
| House number and postal code | **No for publication, yes for the legal notice** | The deletion page and the privacy section are identifiable with the name, the street, the town and the e-mail that are already published. A **legal notice** under Spanish law needs the complete address, and so does Meta's business verification, which compares the entry with the official document |

So: **these three texts can be published today**, and the two missing details stay owed for the legal
notice, the invoices and the business verification. That is a narrower ask than "the owner must deliver
the legal entity before anything legal goes live", and it is the only one this file needs.

## 5b. The retention of the message texts: three options for the owner

**Why this is a decision and not a wording.** Production carries zero retention policy rows, so today
nothing is deleted on a timer, and the sentence in §1 says so. Before the pages go public the owner picks
one of these, the chosen one is **built**, and only then is it written as a rule. A period printed before
the mechanism runs is the same defect as the clean-up sentence in §4b.

| # | Rule | The sentence it produces | What has to be built | What it costs, and who carries it |
|---|---|---|---|---|
| **A** | keep while the agency's account exists, delete on request | "They stay while your agency's account exists, and we delete them when you or the person concerned ask us to." | **nothing**; it is today's behaviour | nothing to build, and the weakest position on storage limitation: a person who wrote once is kept indefinitely because an agency stayed a customer. Every erasure is a manual act. Counsel is most likely to object here |
| **B** | a fixed period per class after the last contact, for example 24 months, deletion on request earlier | "We delete them 24 months after the last contact, and earlier if you or the person concerned ask us to." | the retention mechanism configured per class, plus the offboarding path. The objects exist; production has no rows in them | the strongest position, and the one real business cost: a buyer who returns after the period is a stranger again, and in this market people do return after years. The agency loses that history without being asked |
| **C** | tied to the relationship: delete a set number of days after the agency's account ends, with an agency-level override to delete earlier | "They stay while your agency works with us, and we delete them a set time after the account ends, or earlier if you ask." | an offboarding routine that actually deletes, and the per-agency override | the middle, and the one that matches how the data is actually used: the agency keeps its history while it is a customer, and the data does not outlive the relationship. It needs the offboarding deletion to be real, which is the piece nobody has tested |

**This lane's view, and it is only that.** C is the one that can be defended without taking the agency's
history away, and it is the only one whose cost lands on us rather than on the customer. B is the strongest
on paper and the most expensive in the market we sell into. A is what happens today and should not be
published as a chosen policy, because nobody chose it.

**What the audit is asked for:** the owner's line naming A, B or C and, for B or C, the number. Then the
mechanism is built, and only then does the sentence in §1 change from "today nothing is on a timer" to the
rule.

## 6. For Social and the implementer

**Social confirms the substance** of §1 and §2 and tells us if correction 1 or 2 misstates the connection.
**The implementer publishes** §1 into the privacy notice, §2 into the terms, and §3 as its own page at the
two URLs above, in both languages, and reports the URLs. The deletion page is the one Meta is given; it
needs no account and no login to read.

**What this file deliberately does not contain:** a confirmation code, a deletion callback, a 72 hour or
30 day commitment, any claim of a Meta partnership, review or certification, and anything about Facebook
pages or advertising lead forms.
