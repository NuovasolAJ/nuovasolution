# AUTH COPY v1 — sign up, confirmation, login, agency creation, auth e-mail

**State:** `2026-09-22_SYNC_1800Z` · **Written:** 2026-09-23 · **Copy version:** `auth-v1`
**Lane:** Website Copy / Product Truth → **Website Implementer** (pages) and **API** (the e-mail
template, §6) · Reviewer checks the integrated flow.
**Status:** DRAFT by its author, not independently reviewed.

> Owner rules applied: **"14 días"**, never "Catorce días". The payment sentence appears **once per
> page**. No selling sentences between a heading and its form. The same quality on sign up, login,
> confirmation, errors and the e-mail.
>
> Contract rules applied (`WEBSITE_HANDOFF_v2.md` §2, `AUTH_INVITE_CALLBACK_CONTRACT_v1.md`):
> confirmation is required, the link lives **60 minutes**, the flow is sign up → confirm → log in →
> name your agency → the 14 day trial starts. **No resend endpoint is contracted**, and no wait
> time for the e-mail is contracted, so neither is promised here.

---

## 1. Sign up

Order on the page: eyebrow, heading, form, one line under the submit button. Nothing between the
heading and the first field.

| Key | EN | ES |
|---|---|---|
| `signup.eyebrow` | Start free | Empieza gratis |
| `signup.h1` | Create your agency account | Crea la cuenta de tu agencia |
| `signup.lead` | 14 days free. No payment. | 14 días gratis. Sin pago. |
| `signup.fields.name` | Your name | Tu nombre |
| `signup.fields.email` | Work email | Email de trabajo |
| `signup.fields.emailPlaceholder` | you@agency.com | tu@agencia.com |
| `signup.fields.password` | Password | Contraseña |
| `signup.passwordHelp` | At least 10 characters. | Al menos 10 caracteres. |
| `signup.submit` | Create account | Crear cuenta |
| `signup.submitting` | Creating your account | Creando tu cuenta |
| `signup.privacy` | Your details are used to create your agency account. Read the privacy notice. | Tus datos se usan para crear la cuenta de tu agencia. Lee el aviso de privacidad. |
| `signup.haveAccount` | Already have an account? | ¿Ya tienes cuenta? |
| `signup.loginLink` | Log in | Iniciar sesión |

**Three changes from what is built today.**

1. `signup.lead` loses "Fourteen days free to set your agency up and see it working. No payment
   method required." It becomes four words. The payment sentence then appears **only** in the lead,
   so the `<Caption>{d.common.noPayment} {d.common.noSalesCall}</Caption>` at
   [app/[locale]/signup/page.tsx:28](app/[locale]/signup/page.tsx#L28) is **removed from this page**.
   The two `common` keys stay in the dictionary for the pages that still use them. Today the same
   promise is on the sign up page twice.
2. **The language field is removed from sign up.** The meaning of the sign up `language` is
   undecided (API question A2(d)), while the `register` step already asks for the language under a
   label that is contracted ("Main language with customers", `clients.language`). Asking once, in
   the right place, removes the ambiguity instead of documenting it. If the Implementer keeps the
   field, use: EN "Language of your account" · ES "Idioma de tu cuenta", with the values limited to
   the site locales `en` and `es`.
3. `signup.privacy` **keeps its exact trailing sentence** "Read the privacy notice." /
   "Lee el aviso de privacidad.":
   [components/site/auth-forms.tsx:107](components/site/auth-forms.tsx#L107) strips exactly those
   two strings with a literal regex before rendering the link. Changing a word leaves the sentence
   in place and the link beside it, so the person reads the instruction twice.

Order on the page, as built and as kept: eyebrow, heading, lead, the environment band on a test
build, then the form. The environment band is a state notice, not a selling sentence, so it does not
break rule 4 in §7.

### 1.1 After submitting

| Key | EN | ES |
|---|---|---|
| `signup.checkEmail.h` | Confirm your email | Confirma tu email |
| `signup.checkEmail.body` | We sent a link to {email}. Open it to continue. The link works for one hour. | Hemos enviado un enlace a {email}. Ábrelo para continuar. El enlace vale durante una hora. |
| `signup.checkEmail.wrongAddress` | Wrong address? Start again with the right one. | ¿Dirección equivocada? Empieza de nuevo con la correcta. |
| `signup.checkEmail.noMail` | No email after a few minutes? Check spam, then contact us. | ¿No llega en unos minutos? Mira en spam y, si no, escríbenos. |

"One hour" is the contracted `mailer_otp_exp` of 3600 seconds. **No delivery time is promised**,
because none is contracted. `noMail` points to a person instead of inventing a wait.

---

## 2. Confirmation result

The confirmation arrives as a URL fragment, so the page must render a state, not a blank screen.

| State | Trigger | EN | ES |
|---|---|---|---|
| Checking | fragment being read | One moment, we are checking your link. | Un momento, estamos comprobando tu enlace. |
| Confirmed, continue | session created, `next: "register"` | Email confirmed. One step left: name your agency. | Email confirmado. Queda un paso: pon nombre a tu agencia. |
| Confirmed, agency exists | `next: "onboarding"` | Email confirmed. Let us continue where you left off. | Email confirmado. Sigamos donde lo dejaste. |
| Link expired | `otp_expired` in the fragment | This link has expired. Links are valid for one hour. Ask for a new one below. | Este enlace ha caducado. Los enlaces valen una hora. Pide uno nuevo abajo. |
| Link already used or invalid | no session, no `otp_expired` | This link no longer works. If you already confirmed your email, just log in. | Este enlace ya no funciona. Si ya confirmaste tu email, inicia sesión. |
| No link at all | page opened directly | Open the link from the email we sent you. | Abre el enlace del email que te hemos enviado. |

**The "already used" line sends a confirmed person to the login, never back to sign up.** That is
the owner's case from 2026-09-22: the account was confirmed, and only the redirect failed. Telling
that person to register again would create a second account.

### 2.1 Ask for a new link

**No resend endpoint is contracted.** Until API delivers one, the control is not rendered and the
expired state shows the fallback line instead.

| Case | EN | ES |
|---|---|---|
| Resend available | Send a new link | Enviar un enlace nuevo |
| Sent | A new link is on its way to {email}. | Un enlace nuevo va de camino a {email}. |
| Resend **not** available yet (today) | Write to us and we will send you a new link. | Escríbenos y te enviamos un enlace nuevo. |
| Too many requests | Too many attempts. Try again later, or write to us. | Demasiados intentos. Inténtalo más tarde o escríbenos. |

The rate limit line carries **no minute count**: the code behind the owner's "Demasiados intentos"
is still unidentified (API question `SIGNUP_RATE_LIMIT_RCA`). When API supplies a retry window, the
line becomes EN "Try again in {n} minutes." / ES "Inténtalo de nuevo en {n} minutos."

---

## 3. Log in

| Key | EN | ES |
|---|---|---|
| `login.h1` | Log in | Iniciar sesión |
| `login.lead` | Continue where you left off. | Continúa donde lo dejaste. |
| `login.fields.email` / `.password` | Email / Password | Email / Contraseña |
| `login.submit` / `.submitting` | Log in / Logging you in | Iniciar sesión / Iniciando sesión |
| `login.forgot` | Forgot your password? | ¿Has olvidado la contraseña? |
| `login.forgotUnavailable` | Password reset is not available yet. Write to us and we will help you. | El restablecimiento de contraseña todavía no está disponible. Escríbenos y te ayudamos. |
| `login.noAccount` / `.createLink` | No account yet? / Create one | ¿Todavía no tienes cuenta? / Crea una |

### 3.1 Login errors

| Code | EN | ES |
|---|---|---|
| `invalid_grant` | That email and password do not match an account. | Ese email y esa contraseña no coinciden con ninguna cuenta. |
| `email_not_confirmed` | Confirm your email first. Open the link we sent you. | Confirma primero tu email. Abre el enlace que te hemos enviado. |
| `rate_limited` | Too many attempts. Try again later. | Demasiados intentos. Inténtalo más tarde. |
| `server_error` / `backend_error` | Something broke on our side. Nothing was changed. Try again in a moment. | Algo ha fallado por nuestra parte. No se ha cambiado nada. Inténtalo de nuevo en un momento. |
| `required` | We need this one to log you in. | Necesitamos este dato para iniciar sesión. |

---

## 4. Name your agency (the `register` step)

Shown to a confirmed user without an agency (`session` → `next: "register"`).

| Key | EN | ES |
|---|---|---|
| `onboarding.register.heading` | Name your agency | Pon nombre a tu agencia |
| `onboarding.register.lead` | Your login works. This last step creates your agency and starts your 14 day trial. | Tu acceso funciona. Este último paso crea tu agencia y empieza tu prueba de 14 días. |
| `onboarding.register.agencyName` | Agency name | Nombre de la agencia |
| `onboarding.register.agencyNameHelp` | The name your customers know. | El nombre con el que te conocen tus clientes. |
| `onboarding.register.language` | Main language with your customers | Idioma principal con tus clientes |
| `onboarding.register.languageHelp` | Replies are written in the language each customer writes in. This is the default when we cannot tell. | Las respuestas se escriben en el idioma en el que escribe cada cliente. Este es el idioma por defecto cuando no se puede saber. |
| `onboarding.register.timezone` | Time zone | Zona horaria |
| `onboarding.register.submit` | Create agency and continue | Crear agencia y continuar |
| `onboarding.register.submitting` | Creating your agency | Creando tu agencia |

The language helper explains the contracted behaviour: the reply follows the customer's own
language, and `clients.language` is the fallback. The **site** language stays on the header
switcher and is not mixed into this field.

### 4.1 Register errors, mapped to the contract

| Code | EN | ES |
|---|---|---|
| `EMAIL_NOT_CONFIRMED` | Confirm your email first. Open the link we sent you. | Confirma primero tu email. Abre el enlace que te hemos enviado. |
| `INVALID_AGENCY_NAME` | That agency name cannot be used. Try the name your customers know. | Ese nombre de agencia no se puede usar. Prueba con el nombre que conocen tus clientes. |
| `INVALID_LANGUAGE` | Choose one of the languages in the list. | Elige uno de los idiomas de la lista. |
| `INVALID_TIMEZONE` | Choose a time zone from the list. | Elige una zona horaria de la lista. |
| `MEMBERSHIP_NOT_ACTIVE` | Your access to this agency is not active. Write to us and we will sort it out. | Tu acceso a esta agencia no está activo. Escríbenos y lo resolvemos. |
| `already_registered` (not an error) | Your agency already exists. Continuing to the setup. | Tu agencia ya existe. Seguimos con la configuración. |
| `missing_session` / `invalid_session` | Your session has ended. Log in again to continue. | Tu sesión ha terminado. Inicia sesión otra vez para continuar. |
| `backend_error` | Something broke on our side. Your agency was not created, so nothing is half finished. Try again. | Algo ha fallado por nuestra parte. Tu agencia no se ha creado, así que no queda nada a medias. Inténtalo otra vez. |

The `backend_error` line states the contracted guarantee: "Any failure leaves nothing behind."

---

## 5. Invitation and password (colleagues)

| Key | EN | ES |
|---|---|---|
| `welcome.h1` | Set your password | Crea tu contraseña |
| `welcome.lead` | You were invited to your agency's account. Choose a password to continue. | Te han invitado a la cuenta de tu agencia. Elige una contraseña para continuar. |
| `welcome.forEmail` | Account: {email} | Cuenta: {email} |
| `welcome.password` / `.confirm` | New password / Repeat the password | Nueva contraseña / Repite la contraseña |
| `welcome.help` | At least 10 characters. | Al menos 10 caracteres. |
| `welcome.mismatch` | The two passwords do not match. | Las dos contraseñas no coinciden. |
| `welcome.submit` / `.submitting` | Save and continue / Saving | Guardar y continuar / Guardando |
| `welcome.expiredH1` | This link no longer works | Este enlace ya no funciona |
| `welcome.expiredBody` | Invitation links are valid for one hour. Ask your agency admin to send a new one. | Los enlaces de invitación valen una hora. Pide a tu administrador que te envíe uno nuevo. |
| `welcome.loginInstead` | Log in instead | Iniciar sesión |
| `welcome.weak_password` | Use at least 10 characters. | Usa al menos 10 caracteres. |

---

## 6. Confirmation e-mail, for API (`AUTH_MAIL_TEMPLATE`)

Nothing is configured today: sender, subject, language and template are open
(`PROMPT_02_API.md` A2(e)). These are the texts. API owns the delivery, the sender address and the
link target.

**Rules:** the brand is NuovaSolution, the agency's own brand does not appear (this is our account
e-mail, not an agency message); one clear action; the expiry is stated because it is contracted;
no marketing sentence; no AI disclosure, because no AI wrote it.

| Element | EN | ES |
|---|---|---|
| Sender name | NuovaSolution | NuovaSolution |
| Subject | Confirm your email | Confirma tu email |
| Preheader | One click and your agency account is ready. | Un clic y la cuenta de tu agencia está lista. |
| Heading | Confirm your email | Confirma tu email |
| Body | You created an account for {agency_or_email}. Confirm this address to continue setting up your agency. | Has creado una cuenta para {agency_or_email}. Confirma esta dirección para continuar con la configuración de tu agencia. |
| Button | Confirm email | Confirmar email |
| Expiry line | The link works for one hour. | El enlace vale durante una hora. |
| Fallback | If the button does not work, copy this address into your browser: | Si el botón no funciona, copia esta dirección en tu navegador: |
| Not you | If you did not create this account, ignore this email. | Si no has creado esta cuenta, ignora este mensaje. |
| Footer | NuovaSolution · {legal_footer} | NuovaSolution · {legal_footer} |

**Invitation e-mail** (a colleague is invited by an agency admin):

| Element | EN | ES |
|---|---|---|
| Subject | You have been added to {agency_name} | Te han añadido a {agency_name} |
| Heading | Set your password | Crea tu contraseña |
| Body | {inviter_or_agency} added you to their Nuova account. Choose a password to get in. | {inviter_or_agency} te ha añadido a su cuenta de Nuova. Elige una contraseña para entrar. |
| Button | Set password | Crear contraseña |
| Expiry line | The link works for one hour. | El enlace vale durante una hora. |

**Language rule for both e-mails:** send in the language the person chose on the site (`en` or
`es`). If none is known, send Spanish, which matches the backend default. Do **not** send a
bilingual e-mail.

**Open for API before this ships:** the sender address and whether a custom SMTP is used; whether
the site domain is on the redirect allow list (`STG_AUTH_REDIRECTS`); what `{legal_footer}` must
contain (see `COUNSEL_PACKAGE_v2.md`). With the default mailer, confirmation e-mails reach only
project team addresses, so this template cannot be validated with an outside address yet.

---

## 7. Rules that hold across all auth screens

1. **Never send a confirmed person back to sign up.** Every "link used" or "already confirmed"
   state offers the login.
2. **No invented waiting times.** Only the contracted one hour link lifetime is stated.
3. **The payment sentence appears once per page**, in the sign up lead.
4. **No selling sentence between a heading and a form.**
5. **Errors say what happened to the data**: "nothing was changed", "your agency was not created".
6. **Account language and customer reply language are separate.** The site switcher sets the page
   language; the register step sets the language used with customers.
7. Any string that mentions a backend result must be true in the build that renders it: in the
   demonstration build the sign up form carries the demonstration band and does not claim an
   account was created.

## 8. Open items

| # | Item | Owner | Closing signal |
|---|---|---|---|
| 1 | Resend confirmation endpoint, its limit and code | API | resend contract in `WEBSITE_HANDOFF_v3` |
| 2 | Rate limit code and whether a retry window may be shown | API | `SIGNUP_RATE_LIMIT_RCA` |
| 3 | Codes for "already confirmed" and "invalid link" at the callback | API | callback state list |
| 4 | Meaning of the sign up `language` field, if the field is kept | API | A2(d) answer |
| 5 | `register` idempotent for a confirmed user without a tenant | API | `REGISTER_RESUME_CONFIRMED_USER = READY` |
| 6 | Sender address, SMTP, redirect allow list, legal footer | API + counsel | `AUTH_MAIL_TEMPLATE` |
| 7 | "Start free" CTA gating so it never leads to a form that cannot work (WR-32) | Implementer | re-review |
