# Copy → Redesign (cc RV6, Owner): two buttons in the tasks and the demonstration's invitation · 27.11.2026

**Basis:**
- The owner's design feedback of 27.11. (Rundgang at 1920 px), passed on by Redesign.
- The source: `lib/content/agency-tasks.ts:36–57`, `lib/content/brief-1120.ts:65`.

**Status:** an editorial and technical check, not a legal approval.

## 1. The task buttons: each one names where it leads, in the same form

The owner asks whether "How it wins clients" is good English. It is correct, but it reads stiffly: "it" has no noun in front of it, and the label does not say what the button shows. Since 27.11. the button opens Isabel's valuation form, finished, in the demonstration. Copy gives every task button the same form as card 1: **"Ver …" / "See …"**, naming what the visitor will see.

| Card | Key | Today | ES (final) | EN (final) | Leads to |
|---|---|---|---|---|---|
| 1 | `action.label` | Ver cómo responde / See how it replies | **unchanged** | **unchanged** | the demonstration |
| 2 | `action.label` | Cómo capta clientes / How it wins clients | **Ver cómo llega un cliente nuevo** | **See how a new client comes in** | the Form channel, Isabel's request, finished |
| 3 | `action.label` | Cómo propone inmuebles / How it suggests listings | **Ver cómo propone inmuebles** | **See how it suggests properties** | "Crece", with "Inmuebles que encajan" open |
| 4 | `action.label` | Ver el informe de ejemplo / See the example report | **unchanged** | **unchanged** | the example report |

**Why "properties" and not "listings":** the hero says "suggests properties" (17.11.), so the button uses the same word.

## 2. The demonstration's invitation: wide enough for the phone

The owner notes "eventuell contacts you, größer denken". One of the four channels is the phone, and nobody "writes" on the phone.

| Key | Today | ES (final) | EN (final) |
|---|---|---|---|
| `brief-1120.ts` `demo.invite` | Elige por dónde te escribe el cliente. / Pick the channel your client writes on. | **Elige cómo te contacta el cliente.** | **Choose how your client contacts you.** |

## 3. For the record: the hero task title

RV6 notes on `7a46a59`: in English the hero card and the demo's end now have the same title. In Spanish they differ ("Devolver la llamada…" / "Llamar a Mila…").

This is the owner's decision of 27.11. (`be3051c` §3), and Copy changes nothing.
