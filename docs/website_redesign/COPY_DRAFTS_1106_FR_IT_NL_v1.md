# COPY · AI notice and phone sentences in FR, IT, NL · DRAFT · 06.11.2026

**For:** API and Voice, when the owner opens these languages; counsel for the notice.
**Basis:** owner lines `SPRACHEN-NEU` (FR, IT, NL as the next stage, each language with its evidence) and `KI-HINWEIS-BASIS = v1.1-es`; the
ES of `COPY_TO_API_1106_AI_NOTICE_EN_DE_v1.md` and `COPY_TO_VOICE_1106_FIXED_SENTENCES_EN_DE_v1.md`.
**Status: DRAFT.** Nothing here is to be switched on now. No approval and no legal review; `v1.1-es` itself is still pending. Written by
Copy, not checked by a native reviewer. Editorial and technical, not a legal approval.

**Form of address:** formal everywhere (FR vous, IT Lei, NL u), following the reasoning of the owner's `WHATSAPP-DE-ANREDE = Sie`. So the
WhatsApp text is faithful in content, not in the "tú" of the Spanish. This replaces the "tu" of the older IT draft on WhatsApp.

---

## 1. The AI notice

| Channel | ES (source) | FR | IT | NL |
|---|---|---|---|---|
| WhatsApp | 🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento. | 🤖 Je suis un assistant d'intelligence artificielle. Je vous aiderai pour votre demande immobilière. Si vous préférez parler à un agent humain, dites-le-moi à tout moment. | 🤖 Sono un assistente di intelligenza artificiale. La aiuterò con la sua richiesta immobiliare. Se preferisce parlare con un agente umano, me lo dica in qualsiasi momento. | 🤖 Ik ben een assistent met kunstmatige intelligentie. Ik help u met uw vraag over vastgoed. Spreekt u liever met een menselijke medewerker, laat het me dan op elk moment weten. |
| E-mail (v1.1) | Le atiende el asistente digital de {{agency_legal_name}}, con la supervisión de nuestro equipo. Si prefiere hablar con una persona, indíquelo en su respuesta. | Vous êtes pris en charge par l'assistant numérique de {{agency_legal_name}}, sous la supervision de notre équipe. Si vous préférez parler à une personne, indiquez-le dans votre réponse. | La assiste l'assistente digitale di {{agency_legal_name}}, con la supervisione del nostro team. Se preferisce parlare con una persona, lo indichi nella sua risposta. | U wordt geholpen door de digitale assistent van {{agency_legal_name}}, onder toezicht van ons team. Spreekt u liever met een persoon, geef dat dan aan in uw antwoord. |
| Phone, fragment | el asistente de inteligencia artificial de la agencia. ¿En qué puedo ayudarle? | l'assistant d'intelligence artificielle de l'agence. Comment puis-je vous aider ? | l'assistente di intelligenza artificiale dell'agenzia. Come posso aiutarla? | de assistent met kunstmatige intelligentie van het kantoor. Waarmee kan ik u helpen? |

- The IT e-mail text is the stored `v1.1-it-2026-09-draft`, unchanged.
- FR with a female agent name: "l'assistante d'intelligence artificielle".
- Counsel's points in §4 of the API file apply here too. New for NL: "AI-assistent" is shorter; I keep "kunstmatige intelligentie" because the Spanish spells it out.

---

## 2. The fixed sentences of the phone

Row numbers as in the Voice file; the ES and the rules are there. "Quelqu'un de l'équipe" / "qualcuno del team" / "iemand van het team" for
"un compañero". `{…}` stays. `{idiomas}` is the list of the languages that are on (§3).

| # | Key or moment | FR | IT | NL |
|---|---|---|---|---|
| 1 | `first_message` | Bonjour, vous êtes bien chez {agency_name}. Je suis {agent_name}, {disclosure_text} | Buongiorno, ha chiamato {agency_name}. Sono {agent_name}, {disclosure_text} | Goedendag, u spreekt met {agency_name}. Ik ben {agent_name}, {disclosure_text} |
| 2 | `callback_confirm` | Quelqu'un de l'équipe vous appellera. | Qualcuno del team la chiamerà. | Iemand van het team belt u. |
| 2b | first time | Quelqu'un de l'équipe vous appellera à ce numéro. | Qualcuno del team la chiamerà a questo numero. | Iemand van het team belt u op dit nummer. |
| 3 | `callback_confirm_after_hours` | Quelqu'un de l'équipe vous appellera pendant nos heures d'ouverture. | Qualcuno del team la chiamerà durante il nostro orario di apertura. | Iemand van het team belt u tijdens onze openingstijden. |
| 3b | first time | Quelqu'un de l'équipe vous appellera à ce numéro pendant nos heures d'ouverture. | Qualcuno del team la chiamerà a questo numero durante il nostro orario di apertura. | Iemand van het team belt u op dit nummer tijdens onze openingstijden. |
| 4 | `holding` | Un instant, s'il vous plaît. | Un momento, per favore. | Een moment, alstublieft. |
| 5 | `readback` | Donc, environ {budget} euros à {zone}, c'est bien ça ? | Quindi, circa {budget} euro a {zona}, giusto? | Dus ongeveer {budget} euro in {gebied}, klopt dat? |
| 5b | with a ceiling | Donc, jusqu'à {budget} euros à {zone}, c'est bien ça ? | Quindi, fino a {budget} euro a {zona}, giusto? | Dus tot {budget} euro in {gebied}, klopt dat? |
| 6 | `readback_repeat_budget` | Pouvez-vous me répéter le budget, s'il vous plaît ? | Può ripetermi il budget, per favore? | Kunt u het budget herhalen, alstublieft? |
| 7 | `wish_noted` | Je note {words}. Quelqu'un de l'équipe vous confirmera l'heure lors de son appel. | Annoto {words}. Qualcuno del team le confermerà l'orario quando la chiamerà. | Ik noteer {words}. Iemand van het team bevestigt het tijdstip wanneer die u belt. |
| 8 | `offer_callback` | Souhaitez-vous que quelqu'un de l'équipe vous appelle ? | Desidera che qualcuno del team la chiami? | Wilt u dat iemand van het team u belt? |
| 9 | `ask_same_number` | Nous vous appelons à ce numéro ? | La chiamiamo a questo numero? | Zullen we u op dit nummer bellen? |
| 10 | `language_offer` | Bien sûr, continuons en français. Pour que vous le sachiez : je suis l'assistant d'intelligence artificielle de l'agence. | Certo, continuiamo in italiano. Perché lo sappia: sono l'assistente di intelligenza artificiale dell'agenzia. | Natuurlijk, we gaan verder in het Nederlands. Zodat u het weet: ik ben de assistent met kunstmatige intelligentie van het kantoor. |
| 11 | `language_unclear` | Excusez-moi, je ne vous ai pas bien compris. Je peux vous aider en {idiomas}. | Mi scusi, non l'ho capita bene. Posso aiutarla in {idiomas}. | Sorry, ik heb u niet goed verstaan. Ik kan u helpen in het {idiomas}. |
| 12 | `ask_send_whatsapp` | Nous vous l'envoyons par WhatsApp à ce numéro ? | Glielo inviamo su WhatsApp a questo numero? | Zullen we het u via WhatsApp op dit nummer sturen? |
| 13 | `not_yet_sent` | La demande d'envoi est notée pour l'équipe ; rien n'a encore été envoyé. | La richiesta di invio è annotata per il team; finora non è stato inviato nulla. | Het verzoek om te versturen is genoteerd voor het team; er is nog niets verstuurd. |
| 14 | `retry_registration` | Je n'ai pas encore pu enregistrer l'appel. Voulez-vous que je réessaie ? | Non sono ancora riuscito a registrare la chiamata. Vuole che riprovi? | Het is me nog niet gelukt de oproep vast te leggen. Zal ik het opnieuw proberen? |
| 16 | another language asked for | Je suis désolé, au téléphone je peux vous aider en {idiomas}. | Mi dispiace, al telefono posso aiutarla in {idiomas}. | Het spijt me, aan de telefoon kan ik u helpen in het {idiomas}. |
| 17 | how they are contacted | Quelqu'un de l'équipe vous appellera et vous confirmera l'heure à ce moment-là. Aucune confirmation n'est envoyée d'ici. Préférez-vous un autre moyen de contact ? | Qualcuno del team la chiamerà e allora le confermerà l'orario. Da qui non viene inviata nessuna conferma. Preferisce un altro modo di contatto? | Iemand van het team belt u en bevestigt dan het tijdstip. Van hieruit wordt geen bevestiging verstuurd. Wilt u liever op een andere manier contact? |
| 18 | wish: WhatsApp | Je note que vous préférez WhatsApp ; l'équipe le verra. Rien n'est envoyé d'ici. | Annoto che preferisce WhatsApp; il team lo vedrà. Da qui non viene inviato nulla. | Ik noteer dat u WhatsApp verkiest; het team ziet dat. Van hieruit wordt niets verstuurd. |
| 19 | wish: e-mail | Je note que vous préférez l'e-mail ; l'équipe le verra. Rien n'est envoyé d'ici. | Annoto che preferisce l'email; il team lo vedrà. Da qui non viene inviato nulla. | Ik noteer dat u e-mail verkiest; het team ziet dat. Van hieruit wordt niets verstuurd. |
| 20 | wish: a call | Je note que vous préférez un appel ; l'équipe le verra. | Annoto che preferisce una chiamata; il team lo vedrà. | Ik noteer dat u liever gebeld wordt; het team ziet dat. |
| 21 | before the call-back exists | Quelqu'un de l'équipe peut vous appeler et vous confirmer l'heure. | Qualcuno del team può chiamarla e confermarle l'orario. | Iemand van het team kan u bellen en het tijdstip bevestigen. |
| 22 | after a change | Je note {words}. Quelqu'un de l'équipe vous confirmera l'heure lors de son appel. Autre chose ? | Annoto {words}. Qualcuno del team le confermerà l'orario quando la chiamerà. Altro? | Ik noteer {words}. Iemand van het team bevestigt het tijdstip wanneer die u belt. Verder nog iets? |
| 23 | a later change | Je note {words}. | Annoto {words}. | Ik noteer {words}. |
| 24 | waiting word | Voyons… | Vediamo… | Even kijken… |
| 26 | a closed day | Nous sommes fermés {le samedi} ; un autre jour vous conviendrait-il, {du lundi au vendredi} ? | {Il sabato} siamo chiusi; le va bene un altro giorno, {dal lunedì al venerdì}? | Op {zaterdag} zijn we gesloten; past een andere dag u, {maandag tot en met vrijdag}? |
| 27 | a holiday | {Lundi} est un jour férié et nous sommes fermés ; un autre jour vous conviendrait-il, {du mardi au vendredi} ? | {Lunedì} è festivo e siamo chiusi; le va bene un altro giorno, {dal martedì al venerdì}? | {Maandag} is een feestdag en we zijn gesloten; past een andere dag u, {dinsdag tot en met vrijdag}? |
| 28 | no other day to name | … Quel autre jour vous conviendrait ? | … Quale altro giorno le va bene? | … Welke andere dag past u? |
| 29 | an hour outside | À cette heure-là, nous sommes fermés ; ce jour-là, nous sommes ouverts {hours}. Quelle autre heure vous conviendrait ? | A quell'ora siamo chiusi; quel giorno siamo aperti {hours}. Quale altro orario le va bene? | Op dat tijdstip zijn we gesloten; die dag zijn we {hours} open. Welk ander tijdstip past u? |
| 30 | still outside | À cette heure-là, nous sommes toujours fermés ; quelqu'un de l'équipe verra cela avec vous. | A quell'ora siamo ancora chiusi; qualcuno del team lo vedrà con lei. | Op dat tijdstip zijn we nog steeds gesloten; iemand van het team bekijkt dat met u. |
| 31 | still a closed day | Ce jour-là, nous sommes toujours fermés ; quelqu'un de l'équipe verra cela avec vous. | Quel giorno siamo ancora chiusi; qualcuno del team lo vedrà con lei. | Die dag zijn we nog steeds gesloten; iemand van het team bekijkt dat met u. |
| 32 | hours, inside | Ce sera pendant nos heures d'ouverture : {hours}. | Sarà durante il nostro orario di apertura: {hours}. | Dat wordt tijdens onze openingstijden: {hours}. |
| 33 | we open | Nous ouvrons à {time}. | Apriamo alle {time}. | We gaan open om {time}. |
| 34 | we close | Nous fermons à {time}. | Chiudiamo alle {time}. | We sluiten om {time}. |
| 35 | we reopen | Nous rouvrons {when}. | Riapriamo {when}. | We gaan weer open {when}. |
| 36 | no listing found | Pour l'instant, je ne peux pas vous en proposer. | Al momento non posso offrirgliene nessuna. | Op dit moment kan ik u er geen aanbieden. |
| 37 | offer to check | Souhaitez-vous que quelqu'un de l'équipe vérifie cela et vous appelle ? | Desidera che qualcuno del team lo controlli e la chiami? | Wilt u dat iemand van het team dat nakijkt en u belt? |
| 38 | anything else | Autre chose ? | Altro? | Verder nog iets? |

Row 15 is §1. Row 25 stays Spanish for the staff.

**Acknowledgements for the prompt:**

| FR | IT | NL |
|---|---|---|
| Très bien · Parfait · D'accord · Entendu | Perfetto · Molto bene · D'accordo · Capito | Prima · Heel goed · Akkoord · Begrepen |

**IT, row 14:** with a female agent name, "riuscita". **FR, row 16:** with a female agent name, "désolée".

---

## 3. The language names for `{idiomas}`, with the word for "or" before the last

Rows 11 and 16 in **every** language, also the ES, EN and DE of the Voice file, name only the languages that are on. So those rows change
each time a language turns on.

| Language | ES | EN | DE | FR | IT | NL |
|---|---|---|---|---|---|---|
| Spanish | español | Spanish | Spanisch | espagnol | spagnolo | Spaans |
| English | inglés | English | Englisch | anglais | inglese | Engels |
| German | alemán | German | Deutsch | allemand | tedesco | Duits |
| French | francés | French | Französisch | français | francese | Frans |
| Italian | italiano | Italian | Italienisch | italien | italiano | Italiaans |
| Dutch | neerlandés | Dutch | Niederländisch | néerlandais | olandese | Nederlands |

**The website:** the example in handover §15 (the Renards, French) has to move again when French turns on.
