# COPY · Wording for "Connect the number" and screen B · DRAFT · 07.11.2026

**For:** Redesign (the screens) and API; Social checks them against its requirements. Themes 13 and 25.
**Basis:** `SOCIAL_TO_API_REDESIGN_1107_EMBEDDED_SIGNUP_SCREEN_v1.md` (S0–S11) and `SOCIAL_TO_REDESIGN_API_1107_SCREEN_B_MEDIA_v1.md` (B1–B9).
**Status:** draft. No release to build or publish, no legal approval. Both screens sit inside the login, so they do not fall under the public view; on the website "available" follows `lib/claims.ts`.
**Rules:** no step numbers in Meta's window; no date and no promise; no technical words; no key, PIN, raw Meta ID or other tenant; a value from Meta is named as Meta's.

---

## 1. WhatsApp "Connect the number" (ES, EN, DE with Sie)

| # | Element | ES | EN | DE |
|---|---|---|---|---|
| — | Area title | WhatsApp | WhatsApp | WhatsApp |
| S0 | Line | WhatsApp con el número de tu agencia no está disponible en este momento. | WhatsApp on your agency's own number is not available at the moment. | WhatsApp mit der Nummer Ihrer Agentur ist im Moment nicht verfügbar. |
| S1 | Title | Conecta el número de tu agencia | Connect your agency's number | Verbinden Sie die Nummer Ihrer Agentur |
| S1 | Lead | Los pasos los haces tú, en una ventana de Meta. | You carry out the steps yourself, in a window from Meta. | Die Schritte führen Sie selbst aus, in einem Fenster von Meta. |
| S1 | List title | Necesitas | You need | Sie brauchen |
| S1 | Need 1 | Ser administrador del portfolio comercial de tu agencia en Meta, o crear uno nuevo. | To be an administrator of your agency's business portfolio at Meta, or to create a new one. | Administratorrechte im Business-Portfolio Ihrer Agentur bei Meta, oder Sie legen ein neues an. |
| S1 | Need 2 | Un número que pueda recibir un código por SMS o por llamada. | A number that can receive a code by SMS or by call. | Eine Nummer, die einen Code per SMS oder Anruf empfangen kann. |
| S1 | Need 3 | Después, una forma de pago en el WhatsApp Manager de Meta. | Afterwards, a payment method in Meta's WhatsApp Manager. | Danach eine Zahlungsart im WhatsApp Manager von Meta. |
| S1 | Warning | **Importante:** si este número usa hoy la app WhatsApp Business, esa app deja de funcionar en este número y se pierde su historial de mensajes. Si quieres conservarla, conecta otro número. | **Important:** if this number uses the WhatsApp Business app today, that app stops working on this number and its message history is lost. If you want to keep it, connect another number. | **Wichtig:** Nutzt diese Nummer heute die App WhatsApp Business, funktioniert die App auf dieser Nummer nicht mehr, und ihr Nachrichtenverlauf geht verloren. Wenn Sie sie behalten möchten, verbinden Sie eine andere Nummer. |
| S1 | Tick (required) | Lo he entendido. | I have understood this. | Ich habe das verstanden. |
| S1 | Button | Conectar con Meta | Connect with Meta | Mit Meta verbinden |
| S2 | Line | La ventana de Meta está abierta. Sigue los pasos allí. | Meta's window is open. Follow the steps there. | Das Fenster von Meta ist geöffnet. Folgen Sie dort den Schritten. |
| S2 | Window blocked | Tu navegador ha bloqueado la ventana de Meta. Permite las ventanas emergentes para esta página y vuelve a intentarlo. | Your browser blocked Meta's window. Allow pop-ups for this page and try again. | Ihr Browser hat das Fenster von Meta blockiert. Erlauben Sie Pop-ups für diese Seite und versuchen Sie es erneut. |
| S2 | Buttons | Cancelar · Volver a intentarlo | Cancel · Try again | Abbrechen · Erneut versuchen |
| S3 | Line | Has cancelado. No se ha conectado nada. | You cancelled. Nothing was connected. | Sie haben abgebrochen. Es wurde nichts verbunden. |
| S3 | Button | Volver a intentarlo | Try again | Erneut versuchen |
| S4 | Line, with Meta's message below it | Meta ha devuelto este error: | Meta returned this error: | Meta hat diesen Fehler gemeldet: |
| S4 | Line after it | Si se repite, contacta con soporte. | If it happens again, contact support. | Wenn es wieder passiert, wenden Sie sich an den Support. |
| S4 | Buttons | Volver a intentarlo · Contactar con soporte | Try again · Contact support | Erneut versuchen · Support kontaktieren |
| S5 | Line | Estamos configurando el número. No se envía ningún mensaje. | We are setting up the number. No message is sent. | Wir richten die Nummer ein. Es wird keine Nachricht verschickt. |
| S6 | Line, always | No se ha podido terminar. No ha quedado nada a medias: este número no recibe ni envía nada desde NuovaSolution. | This could not be finished. Nothing is left half done: this number neither receives nor sends anything through NuovaSolution. | Das konnte nicht abgeschlossen werden. Nichts ist halb eingerichtet: Diese Nummer empfängt und sendet nichts über NuovaSolution. |
| S6 | Part: too late | Ha pasado demasiado tiempo. | Too much time passed. | Es ist zu viel Zeit vergangen. |
| S6 | Part: check | No hemos podido comprobar el número con Meta. | We could not check the number with Meta. | Wir konnten die Nummer bei Meta nicht prüfen. |
| S6 | Part: messages | No hemos podido activar los mensajes para este número. | We could not switch on messages for this number. | Wir konnten die Nachrichten für diese Nummer nicht aktivieren. |
| S6 | Part: registration | No hemos podido registrar el número en WhatsApp. | We could not register the number with WhatsApp. | Wir konnten die Nummer nicht bei WhatsApp registrieren. |
| S6 | Button | Volver a empezar | Start again | Neu beginnen |
| S7 | Line | Este número ya está conectado. Si crees que es un error, contacta con soporte. | This number is already connected. If you think that is a mistake, contact support. | Diese Nummer ist bereits verbunden. Wenn Sie das für einen Fehler halten, wenden Sie sich an den Support. |
| S7 | Button | Contactar con soporte | Contact support | Support kontaktieren |
| S8 | Line | Falta una forma de pago. Añádela en el WhatsApp Manager de Meta. La gestiona Meta, no NuovaSolution. | A payment method is missing. Add it in Meta's WhatsApp Manager. Meta handles it, not NuovaSolution. | Es fehlt eine Zahlungsart. Hinterlegen Sie sie im WhatsApp Manager von Meta. Das verwaltet Meta, nicht NuovaSolution. |
| S8 | Button | Abrir WhatsApp Manager | Open WhatsApp Manager | WhatsApp Manager öffnen |
| S9 | Title | Conectado | Connected | Verbunden |
| S9 | Labels | Número · Nombre visible · Estado según Meta · Calidad según Meta · Conectado el | Number · Display name · Status according to Meta · Quality according to Meta · Connected on | Nummer · Anzeigename · Status laut Meta · Qualität laut Meta · Verbunden am |
| S9 | Button | Desconectar | Disconnect | Trennen |
| S9 | Confirmation before disconnecting | Si desconectas, los mensajes a este número dejan de gestionarse. ¿Desconectar? | If you disconnect, messages to this number are no longer handled. Disconnect? | Wenn Sie trennen, werden Nachrichten an diese Nummer nicht mehr bearbeitet. Trennen? |
| S10 | Number restricted | Meta ha limitado este número. El motivo y los pasos están en el WhatsApp Manager. | Meta has restricted this number. The reason and the steps are in the WhatsApp Manager. | Meta hat diese Nummer eingeschränkt. Grund und Schritte finden Sie im WhatsApp Manager. |
| S10 | Security or PIN | Meta avisa de un cambio de seguridad en este número. Contacta con soporte para revisarlo. | Meta reports a security change on this number. Contact support to review it. | Meta meldet eine Sicherheitsänderung an dieser Nummer. Wenden Sie sich an den Support, um das zu prüfen. |
| S10 | Quality | Meta ha bajado la calidad de este número. Los detalles están en el WhatsApp Manager. | Meta has lowered this number's quality rating. The details are in the WhatsApp Manager. | Meta hat die Qualität dieser Nummer herabgestuft. Die Details finden Sie im WhatsApp Manager. |
| S10 | Main device | Meta indica un cambio en el dispositivo de este número. Contacta con soporte para revisarlo. | Meta reports a change in this number's device. Contact support to review it. | Meta meldet eine Änderung am Gerät dieser Nummer. Wenden Sie sich an den Support, um das zu prüfen. |
| S11 | Line | Desconectado desde el {date}. Los mensajes a este número ya no se gestionan. | Disconnected since {date}. Messages to this number are no longer handled. | Getrennt seit {date}. Nachrichten an diese Nummer werden nicht mehr bearbeitet. |
| S11 | Button | Volver a conectar | Connect again | Neu verbinden |

**Open for this table:**
- **"Support":** which address or route the button opens depends on theme 14 (`SUPPORT-PILOT`).
- **S10:** the four cases are my reading of Social's list. Lead names the real events with M11; the wording follows them.
- **The sentence in S1 "Después":** Social's order says "later". If Meta asks for the payment method inside its window, the word changes.

---

## 2. Screen B: images and approval (ES, EN)

| # | Element | ES | EN |
|---|---|---|---|
| B1 | Bar title | Imágenes de la publicación | Images in this post |
| B1 | Mark on the first image | Portada | Cover |
| B1 | While a link is renewed | Cargando la imagen… | Loading the image… |
| B2 | Hint | Arrastra para cambiar el orden. | Drag to change the order. |
| B2 | Buttons without dragging | Mover antes · Mover después | Move earlier · Move later |
| B2 | Buttons | Usar como portada · Quitar de la publicación | Use as cover · Remove from this post |
| B2 | Note on removing | La imagen sigue en el inmueble. | The image stays on the listing. |
| B2 | Save | Guardar el orden | Save the order |
| B3 | Line | Has cambiado el orden: vuelve a aprobar la publicación. | You changed the order: approve the post again. |
| B3 | Button | Aprobar de nuevo | Approve again |
| B4 | Line on the greyed image | Esta imagen no se puede enviar. No puede ser la portada. | This image cannot be sent. It cannot be the cover. |
| B5 | Title | Esto es lo que apruebas | This is what you are approving |
| B5 | Labels | Imágenes · Texto · Precio · Cuenta de destino | Images · Text · Price · Destination account |
| B5 | Button | Aprobar esta publicación | Approve this post |
| B5 | Note | Se publica exactamente lo que ves. Nada se publica sin tu aprobación. | Exactly what you see is published. Nothing is published without your approval. |
| B7 | Hints | Imagen borrosa · Conviene revisarla · Casi igual que la imagen {n} · No sugerida | Blurry image · Worth checking · Almost the same as image {n} · Not suggested |
| B7 | Note under the hints | Solo son sugerencias: no se bloquea ni se quita ninguna imagen. | These are only suggestions: no image is blocked or removed. |
| B8 | Line | Una publicación necesita al menos una imagen. | A post needs at least one image. |
| B9 | Line | Ya está publicada: las imágenes no se pueden cambiar. | Already published: the images cannot be changed. |

**Answers from `media_order`:**

| Code | ES | EN |
|---|---|---|
| `at_least_one_image` | Una publicación necesita al menos una imagen. | A post needs at least one image. |
| `max_10_images` | Una publicación puede llevar hasta 10 imágenes. | A post can carry up to 10 images. |
| `already_published` | Ya está publicada: las imágenes no se pueden cambiar. | Already published: the images cannot be changed. |
| `unknown_position`, `position_repeated`, `invalid_input` | El orden no se ha podido guardar. Recarga la página y vuelve a intentarlo. | The order could not be saved. Reload the page and try again. |
| `variant_not_in_tenant` | Esta publicación no está disponible. | This post is not available. |

**Open for this table:**
- **B4:** `reason` for an image that cannot be sent has no list yet. Social or API names the values; then each gets its own line.
- **B7 with `check = null`:** no hint at all, as the requirement says. `SOCIAL_THEMA_25_POSTING_PROD_PLAN_1107_v1.md` line 7 says "nicht geprüft" instead. I follow the requirement; **Social settles it.**
- **"Precio" in B5:** shown as it stands on the listing. I add no wording for a missing price.
