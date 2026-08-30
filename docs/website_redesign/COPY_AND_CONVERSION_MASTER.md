# COPY AND CONVERSION MASTER — NuovaSolution Website

**Owner of this document:** Lead Product Marketing Writer / Conversion Strategist
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Binding under:** `MASTER_GOVERNANCE.md` R3, R4, R6, R10
**Document status:** **DRAFT. NOT CLEARED FOR PUBLICATION.**

---

## 0. Status, scope and how to use this file

### 0.1 Why this document is a draft

`MASTER_GOVERNANCE.md` §3 places two documents above this one:

| Document | Present | Consequence for this file |
|---|---|---|
| `PRODUCT_TRUTH.md` | **Missing** | No capability statement in this file may be treated as confirmed. |
| `CLAIMS_MATRIX.md` | **Missing** | No wording in this file is cleared for public use. |

Under R3 a claim without a matrix entry is not written. This file therefore does two
things at once:

1. It provides the **complete conversion architecture, structure, hierarchy and voice**,
   which depend on strategy rather than on product facts and are safe to finalise now.
2. It provides **body copy in a drafted state**, with every substantive claim carried in a
   numbered register (§15) that doubles as the intake request to the Product Truth instance.

**Nothing in this file may be published, deployed or pasted into a component until the
claim IDs it uses are cleared in `CLAIMS_MATRIX.md`.** Every page block below carries a
`PUBLICATION GATE` line stating exactly what has to be true before that page can ship.

### 0.2 What is finalised and what is not

| Layer | State |
|---|---|
| Positioning, category story, operating loop | **Finalised.** Strategy, not a product claim. |
| Message hierarchy, voice, banned language | **Finalised.** |
| Page inventory, section order, page goals | **Finalised.** |
| CTA system and hierarchy | **Finalised as two ladders.** Which ladder ships depends on C-01. |
| Hero headline recommendation | **Finalised as a recommendation.** Owner sign off required. |
| Package names | **Finalised as a recommendation.** Package contents blocked by C-06. |
| Body copy | **Drafted.** Gated per page. |
| Spanish | **Strategy and key surfaces finalised. Full ES body copy is a second pass.** |
| Legal and compliance wording | **Drafted, marked LEGAL PENDING.** A lawyer signs it, not this instance. |

### 0.3 Reading conventions used below

| Marker | Meaning |
|---|---|
| `[Cnn]` | A claim ID. Registered in §15. Not cleared until the matrix says so. |
| `GATE: OPEN` | Page can ship once its claim IDs clear. No structural blocker. |
| `GATE: HELD` | Page has a named unresolved dependency beyond the claims check. |
| `GATE: EMBARGOED` | Page describes a capability with no evidence in the repository. Do not build. |
| `LEGAL PENDING` | Wording requires legal review before publication. |
| `OWNER DECISION` | A choice this instance is not entitled to make. |

### 0.4 House style rule that applies to every line in this file

The em dash, the en dash and the dash used as a parenthetical break are **not used in
customer facing copy**, in either language. Sentences are separated with full stops, joined
with commas, or introduced with a colon. Long parenthetical insertions are rewritten as two
sentences. This is a hard style rule, not a preference. It is one of the fastest ways to
stop a page reading like generated output.

---

## 1. Positioning

### 1.1 The problem with the brief's own sentence

The working description is:

> An AI operating and growth platform for real estate agencies that unifies acquisition,
> communication, lead intelligence, follow up, property matching, agent productivity,
> reporting and property experiences in one connected system.

That sentence is accurate and it is unusable as public copy. It is a list. Lists of eight
nouns do not create belief, they create the impression that the product is unfinished in
eight directions at once. An agency owner reading it thinks *what is this actually for*.

The formal category descriptor is kept for metadata, legal text and analyst style contexts.
The public positioning has to be sharper than the category.

### 1.2 The positioning

> **Nuova is the operating layer of a modern real estate agency.**
>
> Every enquiry, every channel, every language, every follow up and every property match
> runs through one system with one memory. Nothing waits for someone to be free. Nothing
> gets lost between tools. Your agents stop administering the pipeline and start closing it.

### 1.3 The strategic idea we own: continuity

Every competing product in this market is a **stage**. A chatbot answers. A CRM stores. A
portal delivers. A marketing tool posts. An automation tool connects two of them and stops.
The agency is left holding the joints, and the joints are where the money leaks.

Nuova's claim is not that it does more things. It is that **nothing is handed off**. One
enquiry stays inside one system, with one memory of the client, from the first message to
the moment a human should take over, and after that the system keeps the record and reports
on what happened.

This is defensible, it is not an AI buzzword, and no point tool can answer it without
rebuilding itself.

**The two realisations every page has to produce** (governance R10):

> This does not just automate messages. This could change how my agency operates.

> Why am I paying for five tools when one system could carry the whole thing.

### 1.4 The Nuova Operating Loop

The loop is the spine of the homepage, the Platform Overview page and the navigation. Every
product module belongs to exactly one stage, which is how a visitor holds eight modules in
their head without a diagram.

| Stage | What it means to the agency | Modules |
|---|---|---|
| **Attract** | Enquiries do not only arrive, they are created. | Social Growth, Property Experience |
| **Answer** | Every enquiry gets a real reply, in its own language, immediately. | AI Sales Agent, Voice AI |
| **Understand** | The system knows who is serious and why, and writes it down. | Lead Intelligence and CRM |
| **Advance** | The conversation keeps moving without anyone remembering to move it. | AI Sales Agent follow up, Property Matching |
| **Hand over** | The system steps back and puts a ready client in an agent's hands. | Daily Assistant |
| **Learn** | The agency can see the whole operation and what actually worked. | Reporting |

The loop closes: what Reporting learns feeds what Attract does next. Say that explicitly
once, on the homepage and on Platform Overview, and never again. Repetition of a good idea
is what turns it into marketing filler.

### 1.5 Message hierarchy

Ranked. Higher messages beat lower ones for hero space, and lower messages never appear
before a higher one on the same page.

1. **One system carries the whole enquiry.** Continuity. The differentiator.
2. **Nothing waits.** Speed as an operating property, not a feature.
3. **You see who is serious.** Priority and focus.
4. **Your agents get their day back.** Productivity.
5. **You can see the whole operation.** Control and reporting.
6. **It fits how you already work.** Adoption risk removal.
7. **It works in your clients' languages.** Relevance to the Spanish international market.

### 1.6 Proof strategy when we have no permitted proof

R6 forbids invented customers, testimonials, logos, case studies, metrics and percentages.
This project currently has **zero cleared social proof**. That is a constraint, and it is
also an opportunity, because most competitors in this category are propped up entirely by
numbers nobody can verify.

Permitted proof, in order of strength:

1. **Demonstration.** Experience Nuova. Let the visitor watch the system handle an enquiry.
   Shown behaviour outranks any claimed statistic.
2. **Specificity of domain knowledge.** Copy that names real situations, a viewing request
   at 23:40, a buyer writing in German about a Marbella listing, a seller asking for a
   valuation. Specificity reads as competence and requires no permission.
3. **Operational honesty.** Saying plainly what is live and what is in development builds
   more trust with an agency owner than a wall of logos.
4. **Craft.** The quality of the page itself is a trust signal that costs no claim.

Forbidden until cleared, without exception: response time figures, conversion figures,
"agencies using Nuova", star ratings, ROI, revenue impact, percentages of any kind, counts
of customers, counts of messages handled, named client agencies, portal and CRM logos.

### 1.7 Voice

Nuova sounds like a serious operator talking to another serious operator.

**Is:** direct, calm, specific, confident, warm at the edges, occasionally dry.
**Is not:** excited, visionary, technical, apologetic, cute, or impressed with itself.

Rules:

1. Short sentences carry the weight. Long sentences carry the detail.
2. Concrete nouns beat abstract ones. Say *viewing*, *valuation*, *portal enquiry*, not
   *touchpoint*, *engagement*, *interaction*.
3. Address the reader as *you*, and mean the agency owner or manager, not the end buyer.
4. Never explain how it works technically. Explain what changes on Monday morning.
5. One idea per section. If a section needs a second headline to be understood, it is two
   sections.
6. Never end a paragraph with a promise the product has not been confirmed to keep.
7. No exclamation marks anywhere on the site, in any language.

### 1.8 Banned language

Hard blocklist. Any of these appearing in a built page is a P2 finding at minimum, and a P0
finding where it carries an unbacked claim.

**Banned words and phrases:** revolutionary, cutting edge, game changer, next generation,
supercharge, unlock, unleash, empower, seamless, effortless, 10x, transform your business,
AI powered, powered by AI, harness the power, leverage, synergy, robust, best in class,
world class, industry leading, state of the art, future proof, disrupt, innovative,
solutions provider, end to end solution, holistic, journey (as a metaphor), delight your
customers, magic, smart (as a standalone adjective), simply, just, easily.

**Banned constructions:** three word tricolons used as a headline with no content
("Faster. Smarter. Better."), a headline that is only the product name plus a category,
rhetorical questions as section headings, "Imagine if...", "What if your agency...",
"In today's competitive market...", any sentence starting with "Whether you are".

**Banned claim shapes:** any guarantee of revenue, closings, ROI or lead volume. Any
implied guarantee ("you will close more deals"). Any future capability stated in the
present tense. Any number that is not sourced from a cleared `PRODUCT_TRUTH.md` entry.

**Banned punctuation:** em dash, en dash, dash as a parenthetical break, ellipsis in
headlines, emoji in headlines or body copy. Emoji are permitted only inside simulated chat
content where a real person would plausibly use one, and only when the simulation is
labelled.

---

## 2. Audience

| Segment | What they are actually worried about | What wins them | Where they enter |
|---|---|---|---|
| **Agency owner**, one to three offices | Losing deals they never knew existed. Paying for tools nobody uses. Team dependency. | Continuity, control, reporting, no adoption risk. | Homepage, Pricing |
| **Broker / partner** in a group | Consistency across offices and agents. Margin. | Reporting, Lead Intelligence, Solutions. | Solutions, Platform Overview |
| **Sales manager** | Which agent is on which deal. Response discipline. Pipeline visibility. | Daily Assistant, Reporting, Lead Intelligence. | Platform, Solutions |
| **Individual agent** | Admin load. Being blamed for slow replies. Weekends. | Daily Assistant, Property Matching, Hand over. | Homepage, AI Sales Agent |
| **Marketing lead** in a larger agency | Lead cost, portal spend, brand presence. | Social Growth, Property Experience, Reporting. | Social Growth, Reporting |

**Market context that shapes every line:** Spain, Andalusia, Costa del Sol. International
buyers. Enquiries arrive in Spanish, English, German, Dutch, French and Scandinavian
languages, often about the same listing, often outside office hours, often through
WhatsApp. Multilingual is not a feature in this market, it is table stakes, and it should be
written as an assumption rather than as a boast.

---

## 3. CTA system

### 3.1 The blocker

The governance CTA hierarchy is:

| Level | Action |
|---|---|
| Primary | Start your 14 day free trial |
| Secondary | Book a demo |
| Tertiary | Experience Nuova |

`INTEGRATION_CONTRACT.md` §1 records the trial as `BLOCKED`: no signup, no auth, no
provisioning, no billing. Open conflict **C-01** states the phrase may not appear on the
site until `PRODUCT_TRUTH.md` confirms the trial exists.

This document therefore specifies **two complete ladders**. Implementation switches between
them with a single flag and invents nothing.

### 3.2 Ladder A. Ships only after C-01 is answered yes

| Level | EN | ES |
|---|---|---|
| Primary | Start your 14 day free trial | Empieza tu prueba gratuita de 14 días |
| Secondary | Book a demo | Reserva una demo |
| Tertiary | Experience Nuova | Descubre Nuova |

Short forms for tight surfaces such as sticky mobile bars and nav:

| Level | EN short | ES short |
|---|---|---|
| Primary | Start free trial | Prueba gratis |
| Secondary | Book a demo | Reserva una demo |
| Tertiary | Experience Nuova | Descubre Nuova |

### 3.3 Ladder B. Ships today. Honest, complete, no dead ends

| Level | EN | ES |
|---|---|---|
| Primary | Book a demo | Reserva una demo |
| Secondary | Experience Nuova | Descubre Nuova |
| Tertiary | Request early access | Solicita acceso anticipado |

Ladder B is not a downgrade if it is written with confidence. A demo led ladder is normal
for a product sold to agencies, and Cal.com is the only integration verified as live, which
makes it the only path that cannot fail.

**Tertiary caution.** *Request early access* only ships once `INTEGRATION_CONTRACT.md` §11
resolves to a real destination. Until then the tertiary slot is left empty rather than
filled with something that goes nowhere. An empty slot is not a dead end. A form that
posts into nothing is a P0 finding.

### 3.4 Full CTA label inventory

| ID | EN label | ES label | Target | Status |
|---|---|---|---|---|
| CTA-01 | Book a demo | Reserva una demo | Cal.com | `LIVE` |
| CTA-02 | Start your 14 day free trial | Empieza tu prueba gratuita de 14 días | Trial signup | `BLOCKED` C-01 |
| CTA-03 | Experience Nuova | Descubre Nuova | /experience | `PENDING` C-02 |
| CTA-04 | See how Nuova handles a real enquiry | Mira cómo Nuova gestiona una consulta real | /experience | `PENDING` C-02 |
| CTA-05 | Explore the platform | Descubre la plataforma | /platform | Safe |
| CTA-06 | See the whole system | Ver el sistema completo | /platform | Safe |
| CTA-07 | Talk to us on WhatsApp | Escríbenos por WhatsApp | wa.me | `BLOCKED` C-05 |
| CTA-08 | Request early access | Solicita acceso anticipado | Access request | `PENDING` |
| CTA-09 | Log in | Iniciar sesión | Customer app | `BLOCKED` C-03 |
| CTA-10 | See pricing | Ver precios | /pricing | `PENDING` C-06 |
| CTA-11 | Talk to us about pricing | Hablemos de precios | Cal.com | `LIVE` |
| CTA-12 | Request a call | Solicita una llamada | Callback | `PENDING` |
| CTA-13 | Read the module | Ver el módulo | Module page | Safe |
| CTA-14 | Tell me when this is ready | Avísame cuando esté listo | Notify request | `PENDING` |

**Never used:** *Talk to Nuova*. Conflict C-04 records that the label maps to no defined
behaviour. An ambiguous CTA in a three level ladder is a conversion defect, not a nice extra.
It is removed from the vocabulary until the owner defines it, and if it turns out to mean the
Voice AI, it is renamed to something that says so.

**Never used:** *Get started*, *Learn more*, *Discover more*, *Find out more*, *Submit*,
*Click here*. Every CTA on the site names the thing that happens next.

### 3.5 CTA microcopy

Placed under the primary CTA. One line. Removes the two objections that stop a click.

| Context | EN | ES |
|---|---|---|
| Demo, homepage and final CTA | 30 minutes. We show you Nuova running on a real enquiry, not a slide deck. | 30 minutos. Te enseñamos Nuova funcionando con una consulta real, no un PowerPoint. |
| Demo, module pages | 30 minutes, in English or Spanish. No preparation needed. | 30 minutos, en español o en inglés. No hace falta preparar nada. |
| Demo, pricing page | We will tell you what it costs on the call. | Te decimos lo que cuesta en la llamada. |
| Trial, Ladder A only | No card. Your data stays yours. | Sin tarjeta. Tus datos siguen siendo tuyos. |
| Experience Nuova | Two minutes. Nothing to install. | Dos minutos. Sin instalar nada. |

**OWNER DECISION.** The demo length is written as 30 minutes throughout. The current site
says 15 minutes. Confirm which is true. It is a promise about the owner's own calendar, so
this instance will not choose.

---

## 4. Hero headline options and recommendation

### 4.1 Scoring method

Four criteria, weighted. Credibility carries the highest weight because `PRODUCT_TRUTH.md`
does not exist and R6 is absolute, so a headline that needs a claim we cannot make is worth
nothing regardless of how well it converts.

| Criterion | Weight | Question |
|---|---|---|
| Clarity | 25% | Does an agency owner know what this is within five seconds? |
| Differentiation | 25% | Could a chatbot vendor put their logo on it? If yes, it fails. |
| Credibility | 30% | Can it ship without an unbacked claim, a number or a guarantee? |
| Conversion | 20% | Does it create a reason to keep reading and to book? |

Scores are 1 to 5.

### 4.2 The options

**H1**
> Your agency, running at full attention.
>
> Every enquiry answered, understood and carried forward by one system, so your agents spend
> their day on the clients who are ready.

**H2**
> One system between your leads and your agents.
>
> Nuova answers every enquiry, works out who is serious, keeps the conversation moving and
> hands your team the ones worth their time.

**H3**
> Nothing gets dropped between the first message and the keys.
>
> Nuova carries every enquiry through one system with one memory, from the first reply to
> the moment a person should take over.

**H4**
> The operating layer of a modern real estate agency.
>
> Acquisition, conversation, qualification, follow up, matching and reporting, connected in
> one system instead of five.

**H5**
> Your next enquiry is already on its way. The only question is who answers it.
>
> Nuova answers it in seconds, in the client's language, and tells your agent when it is
> worth their time.

**H6**
> Built so your agency never has to say we will get back to you.
>
> Every enquiry gets a real reply immediately, and stays inside one system until it becomes
> a viewing or a valuation.

**H7**
> Every enquiry answered. Every client understood. Every agent one step ahead.
>
> One connected system for how a real estate agency actually runs.

**H8**
> Run the agency. Let Nuova run the pipeline.
>
> Enquiries, qualification, follow up, matching and reporting in one system, so your team
> works on clients instead of on admin.

### 4.3 Scoring

| # | Clarity | Diff. | Cred. | Conv. | Weighted | Note |
|---|---|---|---|---|---|---|
| H1 | 4 | 5 | 5 | 4 | **4.55** | Owns attention as the scarce resource. No claim to clear beyond the sub. |
| H2 | 5 | 4 | 5 | 4 | **4.55** | The clearest statement of the platform position. Slightly mechanical. |
| H3 | 4 | 5 | 4 | 4 | **4.25** | Best line in the set, but "the keys" needs a closing claim we cannot yet back. |
| H4 | 3 | 4 | 5 | 3 | **3.85** | Category first. Correct for Platform Overview, too abstract for the homepage. |
| H5 | 4 | 3 | 5 | 4 | **4.05** | Strong, but it narrows Nuova back down to speed. That is the old positioning. |
| H6 | 4 | 5 | 5 | 4 | **4.55** | Memorable and human. Negative framing costs it nothing here. |
| H7 | 5 | 2 | 4 | 4 | **3.70** | Tricolon. Any competitor could ship it tomorrow. Fails differentiation. |
| H8 | 4 | 4 | 4 | 5 | **4.25** | Best pure conversion line. Slightly close to "let AI do the work" territory. |

### 4.4 Binding recommendation

**Adopt H1 as the homepage hero, with the H2 subheadline logic folded into it.**

> ## Your agency, running at full attention.
>
> Every enquiry answered in seconds, in the client's language. Every conversation understood
> and carried forward. Your agents hear about the ones that are ready.

Reasoning:

- The headline does the emotional and differentiating work. Attention is the honest scarce
  resource in an agency, and no competitor owns that frame.
- The subheadline does the category work, so the hero is not abstract. It states three
  distinct capabilities rather than a list of eight.
- It ships without a single number.
- It is not about AI. It is about the agency. That is the difference between this and the
  entire competitive set.

**Reserve H6** as the A/B alternate once analytics events exist. It tests the same idea with
a sharper emotional edge, so the result is readable rather than noise.

**Assign H4** to the Platform Overview hero, where a category first line is correct.

**Retire H5.** It is the current site's positioning and the redesign supersedes it.

**Spanish recommendation** is in §12.7. It is not a translation of H1. *Full attention*
translates literally into something limp, so the Spanish hero is built on the same idea with
a different sentence.

---

## 5. Package names

### 5.1 Constraint

Names are safe to design now. Prices, contents, seat counts, limits, contract terms and
inclusion lists are all blocked by **C-06** and R6. A package name carries no claim. A
feature bullet inside a package carries several.

### 5.2 Recommended set

| Tier | Name | Who it is for | Why it works |
|---|---|---|---|
| Essential | **Studio** | One office, a focused team, an owner still close to every deal. | Premium in architecture and design language. Signals craft rather than smallness. Reads identically in Spanish. |
| Growth | **Signature** | An agency with its own brand, several agents, real volume. | Confident without being loud. Used comfortably in Spanish premium marketing. Suggests the agency's own standard, which flatters the buyer. |
| Scale | **Prime** | A group across offices and markets, international clients, management layer. | Native to real estate in both languages. *Zona prime* is everyday Spanish property vocabulary. Short, hard, expensive sounding. |

**Nuova Studio. Nuova Signature. Nuova Prime.**

The ladder reads as a progression on first sight, none of the three sounds cheap, none
sounds aggressive, and none needs translating for Spain.

### 5.3 Alternates

| Set | Essential | Growth | Scale | Trade off |
|---|---|---|---|---|
| B | Essential | Momentum | Horizon | Safer, more generic. *Horizon* is soft for a top tier. |
| C | Office | Network | Group | Extremely clear about who each tier is for. Reads as seat licensing, which invites the wrong pricing conversation. |

**Do not use:** Starter, Basic, Pro, Business, Enterprise, Premium, Plus, Ultimate,
Unlimited. Every one of them prices the customer rather than describing them, and *Basic* in
particular tells a paying agency they bought the cheap one.

### 5.4 Naming rules

- The word *Free* never appears in a tier name. If a trial exists it is an entry path, not a
  tier.
- Tier names are never translated. `Nuova Studio` is `Nuova Studio` in Spanish.
- A tier name is never used as a verb or an adjective in body copy.

---

## 6. Page copy

Fourteen pages. Each carries the full field set required by the brief.

### 6.0 Page inventory and routing

| # | Page | Route | Gate |
|---|---|---|---|
| 1 | Homepage | `/` | HELD |
| 2 | Platform Overview | `/platform` | OPEN |
| 3 | AI Sales Agent | `/platform/ai-sales-agent` | OPEN |
| 4 | Lead Intelligence and CRM | `/platform/lead-intelligence` | OPEN |
| 5 | Voice AI | `/platform/voice-ai` | HELD |
| 6 | Property Matching | `/platform/property-matching` | OPEN |
| 7 | Daily Assistant | `/platform/daily-assistant` | HELD |
| 8 | Social Growth | `/platform/social-growth` | EMBARGOED |
| 9 | Reporting | `/platform/reporting` | HELD |
| 10 | Property Experience | `/platform/property-experience` | EMBARGOED |
| 11 | Solutions and Outcomes | `/solutions` | OPEN |
| 12 | Pricing | `/pricing` | HELD |
| 13 | Experience Nuova | `/experience` | HELD |
| 14 | Onboarding and Start | `/start` | HELD |

**Routing decision for the implementation instance.** `CURRENT_SITE_AUDIT.md` §3 lists
*Lead Acquisition* and *Follow up Automation* as separate required routes. Two standalone
pages for those would be thin and would repeat Social Growth and AI Sales Agent almost word
for word. Recommendation: **Lead Acquisition** becomes the top section of Social Growth, and
**Follow up Automation** becomes a full named section of AI Sales Agent, both with anchor
links so any existing reference still resolves. Logged as an OWNER DECISION.

---

## 6.1 Homepage

**Route:** `/`
**GATE: HELD.** Blocked on C-01 (which CTA ladder), C-02 (simulation labelling), and
clearance of claims C01 to C14. Sections 6 and 7 below are removed entirely if their
modules are not confirmed.

**Page goal.** Move an agency owner from *this is another AI chatbot* to *this could change
how my agency operates*, and into a booked demo. One goal. Every section either advances the
story or is cut.

**Audience.** Agency owner and broker first. Sales manager second. Written for someone
scanning on a phone between viewings.

**Primary message.** One system carries the whole enquiry, so nothing is lost in the gaps
between your tools and your people.

**Hero headline.**
> Your agency, running at full attention.

**Hero subheadline.**
> Every enquiry answered in seconds, in the client's language. Every conversation understood
> and carried forward. Your agents hear about the ones that are ready.

**Primary CTA.** Book a demo (Ladder B) or Start your 14 day free trial (Ladder A).
**Secondary CTA.** Experience Nuova.
**Hero reassurance line.** `[C01]` Works alongside the inbox, portals and CRM you already
use.

**Section order.**

1. Hero
2. The gap
3. The Nuova Operating Loop
4. What the system runs
5. Agent productivity
6. Property experience
7. Reporting and control
8. Experience Nuova
9. Pricing entry
10. Final conversion

**Section headlines and body copy.**

---

**2. The gap**
Eyebrow: *Where agencies actually lose*

> ### The work is not the problem. The gaps between the work are.

Body:

> Enquiries land in four places. Context lives in three tools. Whether a client hears back
> at nine on a Sunday evening depends on who happens to be looking at their phone.
>
> Nothing in that is broken exactly. Everyone is working. And opportunities still fall out
> of the middle of it, quietly, without anyone noticing which ones.
>
> The agency that wins the client is rarely the one with the better listing. It is the one
> where nothing had to be remembered by a person.

Visual direction for `LUXURY_UX_MEDIA_SYSTEM.md`: the loss is shown as a gap between
systems, not as a sad face or a falling card. Restraint here is what separates this from
every other pain section in the category.

---

**3. The Nuova Operating Loop**
Eyebrow: *How Nuova works*

> ### One system, from the first message to the next one.

Body:

> Nuova sits underneath the agency rather than beside it. Everything an enquiry needs
> happens in one place, with one memory of the client, so nothing has to be handed between
> tools and nothing has to be re held in someone's head.

Six stages, one line each:

| Stage | Line |
|---|---|
| Attract `[C02]` | Enquiries do not only arrive. Nuova helps create them. |
| Answer `[C03]` | Every message gets a real reply in seconds, in the language it was written in. |
| Understand `[C04]` | Nuova works out what the client wants and how serious they are, and writes it down. |
| Advance `[C05]` | The conversation keeps moving. Follow up happens whether or not anyone remembers. |
| Hand over `[C06]` | When a client is ready, an agent gets them, with the full history already attached. |
| Learn `[C07]` | Every outcome is measured, and what worked feeds back into what happens next. |

Closing line:

> The loop closes. What the agency learns on Friday changes what the system does on Monday.

---

**4. What the system runs**
Eyebrow: *The platform*

> ### Not a tool your team has to remember to open.

Body:

> Each part of Nuova does one job properly. Together they behave like one system, because
> they share the same memory of every client and every property.

Module cards. Name, one line, link. **Any module not confirmed in `PRODUCT_TRUTH.md` is
removed from this grid.** A grid of eight where three are aspirational is a P0 finding.

| Module | Homepage line |
|---|---|
| AI Sales Agent `[C03]` | Answers every enquiry immediately, in the client's language, and keeps the conversation going. |
| Lead Intelligence and CRM `[C04]` | Understands who is serious, and keeps one clean record of every client. |
| Property Matching `[C08]` | Reads what a client wants, looks at what you have, and sends the homes worth their trip. |
| Voice AI `[C09]` | Picks up the phone when nobody in the office can. |
| Daily Assistant `[C10]` | Tells each agent what to do first, and why. |
| Social Growth `[C11]` | Keeps the agency visible where sellers and buyers are already looking. |
| Reporting `[C12]` | Shows what the operation actually did, by agent, by source, by outcome. |
| Property Experience `[C13]` | Gives buyers something worth opening, not another PDF. |

CTA: Explore the platform.

---

**5. Agent productivity**
Eyebrow: *Your team*

> ### Your agents stop administering the pipeline.

Body:

> Most agents spend the first hour of the day working out what happened overnight. Which
> messages came in, which ones matter, who has gone quiet, what was promised to whom.
>
> Nuova has already done that. Each agent opens their day and finds a short, ordered list of
> the clients who are actually ready, with the context already attached and the next action
> already obvious. `[C10]`
>
> The rest is not ignored. It is handled, and it is still moving.

CTA: Read the module. Links to Daily Assistant.

---

**6. Property experience**
Eyebrow: *What your client receives*
**Removed entirely unless C13 clears.**

> ### The part of the agency your client actually sees.

Body:

> A serious buyer flying in for a weekend does not want a folder of attachments. They want
> to understand a property before they get on the plane, and to feel that the agency they
> are dealing with is the professional one. `[C13]`
>
> Nuova turns what you already have into something worth opening, and tells you what the
> client looked at.

CTA: Read the module.

---

**7. Reporting and control**
Eyebrow: *The whole operation*

> ### For the first time, you can see all of it.

Body:

> How many enquiries came in, where from, how quickly they were answered, which ones turned
> into viewings, which agents are converting and which sources are worth what you pay for
> them. `[C12]`
>
> Not an analytics product. Just the answer to the question every owner asks on Monday and
> nobody can currently prove.

CTA: Read the module.

---

**8. Experience Nuova**
Eyebrow: *See it work*

> ### Send it an enquiry. Watch what happens.

Body:

> Type the kind of message your agency gets every day, in any language, and watch Nuova
> read it, answer it, work out how serious it is and decide whether an agent needs to know.
>
> Two minutes. Nothing to install.

Simulation label is mandatory here. See §11.2. **`[C14]`**

CTA: Experience Nuova.

---

**9. Pricing entry**
Eyebrow: *Pricing*

> ### Priced by the size of the operation, not by the number of messages.

**Blocked by C-06.** Two variants, implementation picks based on the owner's answer.

*Variant A, prices public:* three tier names, one line each, price, CTA *See pricing*.
Body copy for that variant lives on the Pricing page and is repeated here in short form.

*Variant B, pricing on request, the honest default today:*

> Nuova is set up around how an agency actually operates, so we quote it after we have seen
> yours. Three tiers, Studio, Signature and Prime. We will tell you which one fits and what
> it costs on a 30 minute call, without a proposal process.

CTA: Talk to us about pricing.

---

**10. Final conversion**

> ### Your next enquiry is already on its way.

Body:

> The only question is what happens to it. Book 30 minutes and we will show you Nuova
> handling a real enquiry from your own market, live.

Primary CTA plus microcopy. Secondary CTA. Nothing else in this section. No second
navigation, no repeated module grid, no newsletter box.

---

**Objections answered on this page.**

| Objection | Where it is answered |
|---|---|
| This is just a chatbot with a nicer website. | Sections 3 and 4. The loop plus eight modules under one memory. |
| We already have a CRM and it did not fix this. | Section 2. The problem is the gaps, not the tools. |
| My team will not adopt another system. | Hero reassurance line, section 5. It runs underneath, agents receive from it. |
| AI will talk to my clients badly. | Section 8. Do not argue it, let them test it. |
| Sounds expensive. | Section 9. Named entry point, no proposal theatre. |
| Is this real or a landing page. | Section 8, plus honest availability labels in section 4. |

**Trust requirements.**

- No statistics anywhere on this page until cleared. Not one percentage.
- No client logos, no testimonials, no "trusted by".
- Every module card links to a real page. A card that links nowhere is removed.
- The simulation label in section 8 is visible without interaction. Not in a tooltip.
- Language switch reachable in the hero viewport.
- Legal footer links present. Cookie and analytics notice per §11.6.

**Cross links.** Platform Overview (twice, hero area and section 4), each module page from
its card, Daily Assistant from section 5, Reporting from section 7, Experience Nuova twice,
Pricing once, Solutions from the nav only.

**Mobile copy notes.**

- Hero headline stays one line of thought. It may wrap to three lines. Do not shorten it.
- Hero subheadline drops to its first two sentences on screens under 400px. The third
  sentence is desirable, not load bearing.
- Section 2 body drops the third paragraph on mobile. The first two carry the idea.
- The module grid is a vertical list on mobile with the module name and its single line. No
  truncation with an ellipsis. If a line does not fit, it is rewritten, not cut.
- Sticky bottom bar carries one CTA only, the primary. A two button sticky bar competes
  with itself and is a P1 finding under the CTA hierarchy rule.
- Section 9 uses variant B copy on mobile regardless, because a price table on a phone is
  either unreadable or a horizontal scroll.

---

## 6.2 Platform Overview

**Route:** `/platform`
**GATE: OPEN** once C01 to C14 clear.

**Page goal.** Give a visitor the whole system in one page, so they can decide which module
matters to them and leave with the impression of one product rather than a bundle.

**Audience.** Owner, broker, sales manager. Also the page a visitor sends to a partner.

**Primary message.** These are not eight products. It is one system, and here is the shape
of it.

**Hero headline.**
> The operating layer of a modern real estate agency.

**Hero subheadline.**
> Acquisition, conversation, qualification, follow up, matching, productivity and reporting,
> connected in one system instead of five.

**Primary CTA.** Book a demo. **Secondary CTA.** Experience Nuova.

**Section order.**

1. Hero
2. The principle
3. The loop, expanded
4. Modules by stage
5. How it fits what you already run
6. Languages and channels
7. Security and data
8. Final conversion

**Section headlines and body copy.**

**2. The principle**

> ### One memory. That is the whole idea.

> Most agency software is a set of tools that pass work to each other, and lose a little
> each time. A portal enquiry becomes an email, becomes a note, becomes something someone
> meant to follow up on.
>
> Nuova keeps it all in one place. The system that answers a client at midnight is the same
> system that remembers her three days later when she writes from a different address, the
> same one that matches her to a property, and the same one that tells your agent she is
> ready. `[C15]`
>
> Nothing is handed over, so nothing is dropped.

**3. The loop, expanded**

> ### Six things the system never stops doing.

Six blocks, each with a stage name, two sentences and the modules that sit in it. Content is
the §1.4 table expanded to two lines per stage. Do not repeat the homepage wording verbatim,
rewrite it longer here.

**4. Modules by stage**

> ### Every part, and what it is for.

Eight module blocks grouped under their loop stage. Each block: module name, one sentence
of what it does, two or three specifics, availability label if applicable, link.

**5. How it fits what you already run**

> ### It goes underneath, not on top.

> Nuova is designed to sit behind the tools your agency already uses, so the day it starts
> nobody has to learn a new place to work. `[C01]` Enquiries keep arriving where they
> already arrive. Your CRM keeps being your CRM. Your agents keep using their phones.
>
> The difference is that everything now passes through one system on the way. `[C16]`

**Integration naming is blocked.** No portal, CRM or channel brand name appears until
`PRODUCT_TRUTH.md` confirms each integration and its state. See claim C16.

**6. Languages and channels**

> ### Your clients do not all write in the same language.

> On this coast an agency gets a Spanish seller, a German buyer and a Scandinavian family
> asking about the same street in the same afternoon. Nuova reads each one in the language it
> was written in and answers in that language. `[C17]`
>
> Not translated afterwards. Written in it.

**7. Security and data**

> ### Your client data stays your client data.

LEGAL PENDING. See §11.6. Nothing in this section is written before the owner confirms
where data is stored, who processes it and under which agreements. Placeholder structure
only, no claims.

**8. Final conversion.** Standard block. See §11.9.

**Objections answered.** It is too big to adopt (section 5). It will not handle my clients'
languages (section 6). Where does my data go (section 7). Is this eight half products
(sections 2 and 3).

**Trust requirements.** Availability labels on every module that is not confirmed live. No
integration logos. No architecture diagram that exposes internal infrastructure, per the
`CLAUDE.md` architecture rule.

**Cross links.** All eight module pages, Solutions, Pricing, Experience Nuova.

**Mobile copy notes.** Section 4 is the longest block on the site. On mobile it becomes an
accordion grouped by loop stage, with the stage name and module names always visible and the
detail collapsed. Module names are never abbreviated.

---

## 6.3 AI Sales Agent

**Route:** `/platform/ai-sales-agent`
**GATE: OPEN.** This is the module with the most evidence behind it in the repository.

**Page goal.** Convince a sceptical owner that an automated first reply will not embarrass
them in front of a client, then get them to test it.

**Audience.** Owner and agent. The agent is the sceptic. Write for the sceptic.

**Primary message.** Every enquiry gets a real answer immediately, and the conversation
keeps going until there is something for a person to do.

**Hero headline.**
> Every enquiry answered before it goes cold.

**Hero subheadline.**
> Nuova replies in seconds, in the client's language, asks the questions your agents would
> ask, and keeps following up until the conversation is ready for a person.

**Primary CTA.** Experience Nuova. **Secondary CTA.** Book a demo.

This is the one page where the tertiary CTA is promoted above the demo, because the fastest
way to sell this module is to let the visitor break it.

**Section order.**

1. Hero
2. The first ninety seconds
3. It asks the right questions
4. Follow up automation
5. It knows when to stop
6. In every language your clients use
7. What it will not do
8. Objections
9. Final conversion

**Section headlines and body copy.**

**2. The first ninety seconds**

> ### The reply that decides everything.

> A buyer sends the same message to four agencies at once. That is not cynicism, it is how
> anyone shops for a home. Whoever answers first is the one who gets to have the
> conversation.
>
> Nuova answers immediately, at any hour, with something specific about the property they
> asked about rather than a confirmation that their message was received. `[C03]` `[C18]`

**3. It asks the right questions**

> ### Qualification that sounds like a person doing their job.

> The first reply is not the point. What matters is what comes back. Nuova asks the two or
> three things your agents would ask, in the order a real conversation would ask them.
> Budget. Timing. Whether they are already in the country. Whether they want to see it this
> week. `[C19]`
>
> By the time an agent reads the thread, the qualifying is done and the client has not been
> made to fill in a form.

**4. Follow up automation**
Anchor: `#follow-up`

> ### Most deals are not lost. They are forgotten.

> A client goes quiet on a Tuesday. Nobody decides to drop them. The week just happens.
>
> Nuova keeps the thread alive. It comes back at a sensible interval, on a channel the
> client actually uses, with a reason to reply rather than a reminder that they have not
> replied. `[C05]` `[C20]`
>
> The conversation you had already written off is often the one that books a viewing.

**5. It knows when to stop**

> ### The handover is the feature.

> Automation that will not let go is worse than no automation. When a client is ready, or
> asks something that needs a person, or says something a system should not answer, Nuova
> steps back and hands the agent a live conversation with the full history attached. `[C06]`
>
> Your agents do not inherit a mess. They inherit a client who is already warm.

**6. In every language your clients use**

> ### It answers in the language it was written in.

> Spanish, English, German, Dutch, French and the Scandinavian languages, in the same
> afternoon, about the same street. `[C17]`

**Language list is a claim.** Do not publish the list until each language is confirmed. If
only some are confirmed, the sentence becomes *in the languages your market actually writes
in*, with no list.

**7. What it will not do**

> ### Where we draw the line.

> Nuova does not negotiate. It does not commit your agency to a price, a date or a
> condition. It does not invent a property that does not exist, and it does not answer legal
> or contractual questions. Those go to a person, immediately. `[C21]`
>
> An assistant that oversteps costs more than one that does less.

This section is a conversion asset, not a disclaimer. It is the section that makes an owner
believe the rest of the page.

**8. Objections.** Three questions in the site's FAQ pattern. See §11.7 for shared wording.

**9. Final conversion.** Experience Nuova primary, Book a demo secondary.

**Objections answered.** It will sound robotic (sections 2, 3, 6, and Experience Nuova). It
will say something wrong to my client (section 7). It will annoy people with follow ups
(section 4, on a sensible interval, with a reason). It will not let go of the client
(section 5).

**Trust requirements.** No response time figure until cleared. *In seconds* is a claim and
carries C18. Every sample conversation on this page is labelled as an example.

**Cross links.** Lead Intelligence, Property Matching, Voice AI, Experience Nuova.

**Mobile copy notes.** Section 2 and section 7 are the two that must survive on a phone.
Sections 3 and 6 can collapse. Sample conversations render as a real message thread and
never as a two column comparison, which does not exist on a phone.

---

## 6.4 Lead Intelligence and CRM

**Route:** `/platform/lead-intelligence`
**GATE: OPEN.**

**Page goal.** Move the value from *fast replies* to *you finally know what is in your
pipeline*, which is the message that justifies a higher price.

**Audience.** Owner and sales manager. This is the manager's page.

**Primary message.** Every client becomes one clean record that keeps itself up to date, and
you can see who is worth an agent's afternoon.

**Hero headline.**
> Know which clients are ready, and why.

**Hero subheadline.**
> Every enquiry becomes one clear record that updates itself as the conversation goes on, so
> your team can tell a serious buyer from a browser without reading forty messages.

**Primary CTA.** Book a demo. **Secondary CTA.** Experience Nuova.

**Section order.**

1. Hero
2. One record per client
3. How Nuova reads intent
4. Priority that changes with the conversation
5. When your team gets told
6. Works with the CRM you have
7. Final conversion

**Section headlines and body copy.**

**2. One record per client**

> ### The same person, however they come back.

> A buyer writes through a portal on Monday, sends a WhatsApp on Thursday and emails from a
> different address the week after. In most agencies that is three leads and three half
> conversations.
>
> In Nuova it is one person, with one history, and everything already known about her still
> attached. `[C15]` `[C22]`

**3. How Nuova reads intent**

> ### What the system is actually looking for.

> Buyer or seller. Buying to live in or to let. Budget, when they said it and whether it
> moved. Location. Timing. Whether they are already here. Whether they asked for a viewing
> or a valuation, which is the moment everything changes. `[C04]` `[C19]`
>
> None of it is guessed from a form. It comes out of the conversation, the way a good agent
> would pick it up.

**4. Priority that changes with the conversation**

> ### A client who was cold on Tuesday can be the best one you have on Friday.

> Priority is not set once and left. Every new message updates it. A browser who suddenly
> names a budget and asks about availability this weekend moves up, immediately, without
> anyone reviewing anything. `[C23]`

**Scoring numbers are blocked.** The current site says *scored from 1 to 100* and *above 80
is priority*. Neither number ships until `PRODUCT_TRUTH.md` confirms the scale actually
exists and works that way. Until then, priority is described in words. See claim C23.

**5. When your team gets told**

> ### Interrupt them for the right client, and only then.

> When a client crosses from interested to ready, the agent who owns them gets told
> immediately, on their phone, with the three things they need to know before they reply.
> `[C24]`
>
> Everything else waits for the morning list. An alert that fires for everything is an alert
> nobody reads.

**6. Works with the CRM you have**

> ### You do not have to move.

> Nuova keeps its own record because it needs one. It is built to write back into the CRM
> your agency already runs on, so your reporting, your team and your process stay where they
> are. `[C16]` `[C25]`

**CRM names are blocked** until each integration is confirmed. No logo wall.

**7. Final conversion.** Standard block.

**Objections answered.** We already have a CRM (sections 1 and 6). Scoring is a black box
(section 3, and the honest wording in section 4). We will be spammed with alerts (section 5).
Our data will be split across two systems (section 6).

**Trust requirements.** No score numbers until cleared. No CRM logos. Any record shown in a
screenshot uses obviously illustrative data and is labelled per §11.2.

**Cross links.** AI Sales Agent, Daily Assistant, Reporting, Property Matching.

**Mobile copy notes.** Section 3's list of signals becomes a plain vertical list, not chips
that wrap into three ragged rows. Section 4 keeps its headline, which is the most
persuasive line on the page, and drops nothing.

---

## 6.5 Voice AI

**Route:** `/platform/voice-ai`
**GATE: HELD.** `lib/os/copy.ts` marks voice as *coming soon*. `INTEGRATION_CONTRACT.md`
W-05 asks the owner whether a callable entry point exists at all. **Until that is answered,
this page ships in Availability State B below, or it does not ship.**

**Page goal.** Own the phone call as a category signal without promising a date.

**Audience.** Owner. Especially owners whose agencies still lose most enquiries by phone.

**Primary message.** The calls nobody in the office can take are still worth something.

**Hero headline, State A (confirmed live).**
> The call your agency could not take.

**Hero subheadline, State A.**
> Nuova answers the phone when the office cannot, understands what the caller wants, and
> hands your agent a conversation instead of a missed call. `[C09]`

**Hero headline, State B (in development, the honest default today).**
> Nuova is learning to pick up the phone.

**Hero subheadline, State B.**
> Voice is in development. Today Nuova tells your agent about the call. Soon it will take
> it. Here is what we are building and why. `[C26]`

**Primary CTA.** State A: Book a demo. State B: Book a demo, with the tertiary *Tell me when
this is ready* only once a real notify destination exists.

**Section order.**

1. Hero, with availability label
2. Why the phone still matters here
3. What it will do
4. What happens to the call afterwards
5. Where it stops
6. Availability and honesty note
7. Final conversion

**Section headlines and body copy.**

**2. Why the phone still matters here**

> ### Some clients will always ring.

> An international buyer standing outside a property calls. A seller who has decided to move
> this year calls. The enquiries that come by phone are, on average, the ones furthest along,
> and they are the ones an agency is least able to catch.

This section carries no product claim and is safe in both states.

**3. What it will do**

State A: present tense, gated on C09.
State B: written explicitly as intent. Every sentence begins from *is being built to* or
*will*, never the present tense. No date, no quarter, no year.

**4. What happens to the call afterwards**

> ### A call becomes a record like everything else.

> The call joins the same client record as the messages, so the next conversation does not
> start from nothing, whichever channel it arrives on. `[C15]`

**5. Where it stops**

Same discipline as AI Sales Agent §7. Voice hands to a human faster than text does.

**6. Availability and honesty note**

State B, mandatory, visible without interaction:

> Voice is in development and is not part of what we sell today. We would rather tell you
> that here than in the third week of your trial. `[C26]`

That paragraph is worth more to a serious buyer than the entire page above it.

**Objections answered.** Is this real yet (section 6, answered plainly). Will it sound like
a robot on the phone (section 3, and honestly, only a live demo settles it). What about
compliance and call recording (LEGAL PENDING, see §11.6).

**Trust requirements.** Availability label in the hero, not only at the bottom. No launch
date. **Call recording, consent and retention are a legal matter in Spain and this page does
not ship any claim about them without counsel.**

**Cross links.** AI Sales Agent, Lead Intelligence, Platform Overview.

**Mobile copy notes.** The availability label is directly under the hero headline on mobile,
not pushed below the fold. A visitor must not be able to read the whole hero on a phone
without seeing it.

---

## 6.6 Property Matching

**Route:** `/platform/property-matching`
**GATE: OPEN.**

**Page goal.** Show the module that turns Nuova from a communication layer into something
that does actual agency work.

**Audience.** Agent and owner. The agent recognises this as the job they hate doing at
eleven at night.

**Primary message.** The system reads what a client wants, looks at what you have, and sends
the properties worth their time.

**Hero headline.**
> Three properties worth the flight.

**Hero subheadline.**
> Nuova reads what a client is actually looking for, checks it against your portfolio, and
> sends a short, personal selection instead of a link to everything you have.

**Primary CTA.** Book a demo. **Secondary CTA.** Experience Nuova.

**Section order.**

1. Hero
2. What a client actually said
3. Matching against your portfolio
4. What the client receives
5. It keeps matching after the first send
6. Final conversion

**Section headlines and body copy.**

**2. What a client actually said**

> ### Requirements are not a filter form.

> A client says she wants somewhere quiet but not isolated, walkable to a decent restaurant,
> with room for her parents in the summer, and that eight hundred is her limit but she would
> stretch for the right one.
>
> No search filter holds that. A good agent does. Nuova is built to read it the way the
> agent would. `[C08]` `[C27]`

**3. Matching against your portfolio**

> ### Your properties, not a public feed.

> Matching runs against the portfolio your agency actually has, so what goes out is
> something you can show on Thursday. `[C28]`

**4. What the client receives**

> ### A short list, and a reason for each one.

> Three properties, each with a line explaining why it is on the list. Serious buyers do not
> want more options. They want fewer, chosen well, by someone who understood them. `[C27]`

**5. It keeps matching after the first send**

> ### When something new comes in, it remembers who wanted it.

> A property is listed on a Tuesday and the client who described it in March is still in the
> system. Nuova connects the two without anyone going back through old conversations.
> `[C29]`

That single behaviour is one of the strongest reasons to buy the whole platform, because it
is impossible without one memory. Give it its own section, always.

**6. Final conversion.** Standard block.

**Objections answered.** Our portfolio is not structured enough for this (section 3, and it
is a real question for the demo). Clients will get spammed with listings (section 4, three,
with reasons). This is just a saved search (section 5).

**Trust requirements.** Any example property shown is clearly illustrative, per §11.2. No
real listing from a real agency until that agency gives written permission, which is an R6
matter.

**Cross links.** AI Sales Agent, Property Experience, Lead Intelligence.

**Mobile copy notes.** Section 2's quoted client requirement is the emotional core of the
page and stays in full on mobile. It is the one long block on this page that is not
shortened.

---

## 6.7 Daily Assistant

**Route:** `/platform/daily-assistant`
**GATE: HELD.** No evidence of this module in the repository. Copy is drafted against the
brief's description of agent productivity and does not ship until `PRODUCT_TRUTH.md`
describes what the assistant actually does.

**Page goal.** Sell the agent productivity story to a manager, and make agents want it
rather than fear it.

**Audience.** Sales manager first, agent second, owner third.

**Primary message.** Every agent starts the day knowing exactly what to do first and why.

**Hero headline.**
> The first hour of the day, already done.

**Hero subheadline.**
> Nuova hands each agent an ordered list of the clients who need them today, with the
> context attached and the next step already clear.

**Primary CTA.** Book a demo. **Secondary CTA.** Explore the platform.

**Section order.**

1. Hero
2. What the morning looks like now
3. What the assistant hands over
4. Through the day
5. It is not surveillance
6. Final conversion

**Section headlines and body copy.**

**2. What the morning looks like now**

> ### Nobody starts the day with a plan.

> The average agent opens four inboxes, scrolls to find what changed overnight, tries to
> remember who they promised what, and starts with whichever message was loudest. By the
> time the day has a shape, half of it is gone.

Safe. No product claim.

**3. What the assistant hands over**

> ### A short list, in the right order.

> The clients who are ready. The ones who went quiet and are worth one more attempt. What
> was promised yesterday and has not happened. Each one with the history already attached,
> so nothing has to be looked up. `[C10]`

**4. Through the day**

> ### It keeps the list honest.

> When a conversation moves, the list changes. An agent does not have to go back and check
> whether the priority they were given at nine still holds at three. `[C10]`

**5. It is not surveillance**

> ### Built for the agent, not against them.

> This is not a monitoring tool and it is not a scoreboard. It is the difference between
> starting the day with four inboxes and starting it with a list. `[C30]`

Keep this section. Agent resistance kills more rollouts of this kind of product than price
does, and a manager buying it knows that.

**Objections answered.** My agents will feel watched (section 5). They already have a task
list nobody uses (section 4, it maintains itself). It will tell them the wrong priority
(section 4, plus the demo).

**Trust requirements.** No productivity percentages. No time saved figures. No screenshots
containing a real agent's name.

**Cross links.** Lead Intelligence, Reporting, AI Sales Agent.

**Mobile copy notes.** Section 3 is a list and reads well on a phone. Section 5 must not be
collapsed behind an accordion, because it answers the objection the reader is already having.

---

## 6.8 Social Growth

**Route:** `/platform/social-growth`
**GATE: EMBARGOED.** `lib/os/copy.ts` marks lead generation as *coming soon* and nothing in
the repository describes a social capability. **This page is not built until
`PRODUCT_TRUTH.md` defines what it is.** The copy below is a structural draft so that the
page can be written quickly once it is defined, and so the Product Truth instance can see
exactly what is being asked of it.

**Page goal.** Extend the story from *handle the enquiries you get* to *get more of them*,
which is the difference between an operations tool and a growth platform.

**Audience.** Owner and marketing lead.

**Primary message.** The same system that handles your enquiries also helps create them.

**Hero headline (draft).**
> Stop waiting for the portal to send you someone.

**Hero subheadline (draft).**
> Nuova keeps your agency visible where sellers and buyers are already looking, and every
> enquiry it creates lands in the same system that answers it. `[C11]`

**Section order (draft).**

1. Hero, with availability label
2. The cost of renting your pipeline
3. What Nuova does here
4. Every enquiry lands in the same system
5. What it does not do
6. Availability note
7. Final conversion

**Key strategic point for whoever finishes this page:** the differentiator is not the
posting. Anyone can post. The differentiator is section 4, that acquisition and handling are
the same system, so the agency can finally see what a channel is worth all the way to a
booked viewing. Everything else on this page is commodity. Write section 4 first.

**Required from `PRODUCT_TRUTH.md` before this page exists:**

1. What does Social Growth actually do. Content creation, scheduling, paid, organic,
   responding to comments and DMs, or something else.
2. Which platforms, and through which access.
3. Is content generated, assisted or only distributed.
4. Who approves what goes out under the agency's name. This is the question every owner will
   ask first.
5. Is it live, in development or an idea.

**Trust requirements.** Nothing about lead volume, reach, cost per lead, engagement or
follower growth. Not one number. Approval and brand control must be answered on the page,
because an agency owner will not hand their public voice to a system without it.

**Mobile copy notes.** Not applicable until the page exists.

---

## 6.9 Reporting

**Route:** `/platform/reporting`
**GATE: HELD.** Reporting is referenced in `lib/os/copy.ts` but its scope is undefined.

**Page goal.** Give the owner the reason to buy the top tier, and the reason to keep paying
after month three.

**Audience.** Owner and broker. The person who signs.

**Primary message.** For the first time, the whole operation is visible and comparable.

**Hero headline.**
> The Monday morning answer.

**Hero subheadline.**
> How many enquiries came in, where from, how fast they were answered, what became a viewing
> and which agents and sources are actually worth it.

**Primary CTA.** Book a demo. **Secondary CTA.** Explore the platform.

**Section order.**

1. Hero
2. The questions no agency can currently answer
3. What Nuova measures
4. By agent, by source, by outcome
5. What you do with it
6. Final conversion

**Section headlines and body copy.**

**2. The questions no agency can currently answer**

> ### Ask your agency three questions.

> How many enquiries did we get last month, and where did they come from. How long did the
> average one wait for a reply. Which source produced the viewings, not the leads.
>
> Almost no agency can answer the third one, and it is the only one that decides where the
> marketing budget should go.

Safe. No product claim, and it is the sharpest section on the page.

**3. What Nuova measures**

Gated. Every metric named here is a separate claim, because naming a metric asserts that it
is captured. See C12 and C31. Do not write this section until the metric list is confirmed.

**4. By agent, by source, by outcome**

> ### Three ways to cut the same week.

> By agent, so you can see who is converting and who needs help rather than who shouts
> loudest in the meeting. By source, so you know what your portal spend is actually buying.
> By outcome, so a viewing counts for more than a reply. `[C31]`

**5. What you do with it**

> ### The loop closes here.

> What Reporting shows changes what the system does next. Which follow up worked. Which
> language performed. Which source deserves more. This is the point of running the whole
> operation in one place instead of five. `[C07]`

**Objections answered.** We already have dashboards nobody opens (section 2, these are
questions not dashboards). Our agents will game it (section 4, outcomes not activity). It
will not match our CRM numbers (a demo conversation, not a copy problem).

**Trust requirements.** No example dashboard with plausible looking numbers unless labelled
as illustrative per §11.2. Numbers in a product screenshot read as real numbers, and under R6
that is an invented statistic.

**Cross links.** Lead Intelligence, Daily Assistant, Solutions, Pricing.

**Mobile copy notes.** Reporting screenshots do not work on a phone. On mobile this page
leads with section 2 as text and shows one metric group at a time. Never a scaled down
dashboard image.

---

## 6.10 Property Experience

**Route:** `/platform/property-experience`
**GATE: EMBARGOED.** Nothing in the repository defines this module. It is the least
specified item in the brief and carries the highest risk of accidentally promising a product
that does not exist.

**Page goal.** Own the part of the agency the buyer actually sees, and give the brand its
most visual page.

**Audience.** Owner, marketing lead, and indirectly the end buyer.

**Primary message.** What you send a serious buyer says as much about your agency as the
property does.

**Hero headline (draft).**
> The part of your agency the client actually sees.

**Hero subheadline (draft).**
> Nuova turns what you already have into something a serious buyer wants to open, and tells
> you what they looked at. `[C13]` `[C32]`

**Section order (draft).**

1. Hero, with availability label
2. What most agencies send
3. What Nuova sends instead
4. What you learn from it
5. Availability note
6. Final conversion

**Strategic note.** Section 4 is where this becomes a platform feature rather than a
brochure builder. If Nuova can tell an agent that a buyer opened a property three times and
spent most of the time on the terrace photos, that signal belongs in Lead Intelligence, and
the two modules together are worth more than either alone. If it cannot do that, section 4
is deleted and this page becomes much weaker. That is a product question, not a copy
question.

**Required from `PRODUCT_TRUTH.md` before this page exists:**

1. What is a property experience. A microsite, a shareable page, a PDF, a tour, a video.
2. Is it generated from existing listing data or built manually.
3. Is engagement tracked, and if so what exactly, and what is the lawful basis for tracking
   a named prospect. **This is a GDPR question before it is a copy question.**
4. Is it live, in development or an idea.

**Trust requirements.** No claim about buyer behaviour. No engagement statistics. Tracking
language is LEGAL PENDING in every case.

**Mobile copy notes.** Not applicable until the page exists.

---

## 6.11 Solutions and Outcomes

**Route:** `/solutions`
**GATE: OPEN.** Built entirely from outcomes, which lets it ship while several modules are
still gated.

**Page goal.** Let a visitor find themselves. Someone who does not want to read about eight
modules should be able to click the sentence that describes their problem.

**Audience.** Everyone who did not convert on the homepage.

**Primary message.** Whatever is going wrong in your agency right now, this is the part of
Nuova that addresses it.

**Hero headline.**
> Start with what is going wrong.

**Hero subheadline.**
> Most agencies do not need all of Nuova on day one. They need one thing fixed. Find yours.

**Primary CTA.** Book a demo. **Secondary CTA.** Explore the platform.

**Section order.**

1. Hero
2. By outcome
3. By role
4. By agency size
5. Final conversion

**2. By outcome.** Six blocks. Each: the problem in the owner's own words as the headline,
two sentences, and a link to the module that addresses it.

| Problem headline | Links to |
|---|---|
| We are not answering fast enough. | AI Sales Agent |
| We do not know which leads are worth chasing. | Lead Intelligence |
| Good leads go quiet and nobody follows up. | AI Sales Agent, follow up section |
| Our agents spend half the day on admin. | Daily Assistant |
| We have no idea what our marketing is actually producing. | Reporting |
| We are not getting enough enquiries in the first place. | Social Growth, gated |

Body copy pattern for each block, two sentences maximum. First sentence states the cost of
the problem in operational terms. Second sentence names what changes. No feature lists.

**3. By role.** Owner, sales manager, agent. Three blocks, three sentences each, written in
that role's language and linking to the two pages that matter to them.

**4. By agency size.** One office, several offices, group. Three blocks. This section
carries the pricing bridge, because size is how the tiers are shaped. Each block ends with a
link to the matching tier on Pricing.

**Objections answered.** This is too much for us (section 4, start with one). It is not
built for a team like ours (section 3). Where do we even start (the whole page).

**Trust requirements.** A gated module must not appear as an available answer to a problem.
If Social Growth is embargoed, that row is removed rather than linked to a page marked
coming soon. Sending a visitor with a live problem to an unavailable answer is worse than
not listing it.

**Cross links.** Every module page, Pricing, Experience Nuova.

**Mobile copy notes.** Sections 2, 3 and 4 are three long lists in a row on a phone. Use a
tab or segmented control at the top of the page (Outcome, Role, Size) so only one list shows
at a time. The tab labels are copy and are listed in §11.10.

---

## 6.12 Pricing

**Route:** `/pricing`
**GATE: HELD.** Blocked by C-06. **No price, no tier content, no inclusion list, no seat
count, no limit and no contract term ships until the owner confirms it in
`PRODUCT_TRUTH.md`.** R6 is absolute here and a pricing page with plausible looking invented
numbers is a P0 finding.

**Page goal.** Qualify the visitor and remove price as an unspoken objection, whether or not
prices are public.

**Audience.** Owner. The only page on the site where the reader is definitely the person who
signs.

**Primary message.** Nuova is priced by the size of the operation it runs, and finding out
what that means takes one conversation.

**Hero headline.**
> Priced by the size of your operation.

**Hero subheadline, Variant A, prices public.**
> Three tiers, built around how many offices, agents and enquiries you are running. Every
> tier includes the whole operating loop.

**Hero subheadline, Variant B, pricing on request, the honest default today.**
> Three tiers, built around how many offices, agents and enquiries you are running. We will
> tell you which one fits and what it costs on a 30 minute call.

**Primary CTA.** Variant A: Start your 14 day free trial, if C-01 clears, otherwise Book a
demo. Variant B: Talk to us about pricing.

**Section order.**

1. Hero
2. The three tiers
3. What every tier includes
4. What changes between tiers
5. How we price
6. Pricing questions
7. Final conversion

**2. The three tiers**

| Tier | Line |
|---|---|
| **Nuova Studio** | One office, one team, and an owner who is still close to every deal. |
| **Nuova Signature** | An agency with its own brand, several agents and real volume to handle. |
| **Nuova Prime** | A group operating across offices and markets, with management that needs to see all of it. |

Those three lines are safe. They describe the customer, not the product. Everything below
them in each card is blocked until C-06 clears.

**3. What every tier includes**

> ### The system is the same. The size of the operation is not.

> Every tier runs the whole loop. We do not hold back the part that answers your clients and
> sell it back to you later. What changes between tiers is scale, the number of offices and
> agents, and how much of the reporting and control layer you need.

**OWNER DECISION.** That paragraph states a pricing philosophy, that no core capability is
withheld from the entry tier. It is the right philosophy and it is a commitment, so the
owner confirms it before it is published. If capabilities are in fact tiered, this section
is rewritten honestly and it is a weaker page.

**5. How we price**

> ### No proposal process.

> One call, one recommendation, one number. If Nuova is not right for your agency yet, we
> will tell you on that call rather than three weeks later.

Safe, and it is the most persuasive block on the page for a Spanish agency owner who has
been through enough software sales processes.

**6. Pricing questions.** Four questions. Wording in §11.7. Every answer is blocked until
C-06 clears, except *what happens after the call*, which is a process question and safe.

**Objections answered.** It will be too expensive for us (section 2, tiers by size; section
5, one call). There will be hidden setup costs (blocked, must be answered once C-06 clears).
We will be locked into a long contract (blocked, same). What if it does not work for us
(section 5).

**Trust requirements.** No price without owner confirmation. No fake discount, no fake
urgency, no *from* price, no crossed out price. No *most popular* badge unless it is true.
If VAT and IVA handling differs, it is stated, which is a legal requirement in Spain and not
a design choice. LEGAL PENDING.

**Cross links.** Solutions by agency size, Platform Overview, Onboarding, Experience Nuova.

**Mobile copy notes.** A three column price table does not exist on a phone. Tiers stack as
three full width cards in the order Studio, Signature, Prime, with the recommended tier
first only if the owner confirms a recommendation is honest. Section 4's comparison, once it
exists, becomes an accordion by capability group, never a horizontally scrolling table.

---

## 6.13 Experience Nuova

**Route:** `/experience`
**GATE: HELD.** Blocked by C-02. This page cannot ship without cleared simulation labelling,
because presenting client side heuristics as the live product is the single largest false
claim risk on the site.

**Page goal.** Replace argument with evidence. A visitor who completes this converts at a
different rate to one who read about it.

**Audience.** The sceptic. Usually the agent, sometimes the owner who has been sold AI
before.

**Primary message.** Do not take our word for it. Send it something and watch.

**Hero headline.**
> Send it the kind of message your agency gets every day.

**Hero subheadline.**
> Write an enquiry in any language, the way a real client would write it, and watch Nuova
> read it, answer it, work out how serious it is and decide whether an agent needs to know.

**Primary CTA.** The input field itself. **Secondary CTA.** Book a demo, shown after
completion, never before.

**Section order.**

1. Hero, with simulation label
2. The input, with example prompts
3. The response, staged
4. What just happened
5. Conversion block
6. What this does not show

**2. The input.** Three example prompts a visitor can send with one tap, because most people
will not type. Examples are written in the languages of the market and are listed in §11.10.

**3. The response, staged.** Each stage is labelled with plain language, not system
vocabulary. Labels in §11.10.

**4. What just happened**

> ### That took four seconds and nobody was in the office.

> In a real agency, that message would have arrived at 23:40 on a Sunday, and the reply
> would have gone out on Monday. `[C33]`

**5. Conversion block**

> ### That was one enquiry. You get hundreds.

> Book 30 minutes and we will run this on your own market, with the kind of messages your
> agency actually receives.

**6. What this does not show**

> ### Honest about the edges.

> This is a demonstration, not your agency. It does not know your properties, your prices or
> your team. That is exactly what the demo call is for.

**Simulation labelling is mandatory and non negotiable.** See §11.2. The label is visible in
the hero before the visitor interacts, not after, and not in a tooltip.

**Objections answered.** This is a scripted video (the label, plus free text input). It only
works with the examples (free text). It will not handle my language (multilingual input).

**Trust requirements.** Simulation label above the fold. No claim that this is the live
production system unless it is. If visitor typed text is stored or sent anywhere, that is
disclosed at the input, with a privacy link, LEGAL PENDING, per `INTEGRATION_CONTRACT.md` §3.

**Cross links.** AI Sales Agent, Lead Intelligence, Book a demo.

**Mobile copy notes.** This page is used on a phone more than any other page on the site.
The input is reachable without scrolling. The staged response never pushes the input off
screen without warning. Example prompts are three tappable chips, each under four words, and
the full prompt text is inserted into the field, not shown on the chip.

---

## 6.14 Onboarding and Start

**Route:** `/start`
**GATE: HELD.** Content depends entirely on C-01. If a trial exists this is the signup page.
If it does not, it is the *what happens after you book* page, which is still worth having.

**Page goal.** Remove the last fear before a commitment, which is never price. It is *how
much of my time will this cost and what happens if it goes wrong*.

**Audience.** Owner who has already decided in principle.

**Primary message.** Starting is a short, defined process with a person on the other end.

**Hero headline, Variant A, trial exists.**
> Start with your own enquiries.

**Hero subheadline, Variant A.**
> Fourteen days, set up in one session, using the enquiries your agency is already getting.
> `[C34]`

**Hero headline, Variant B, no trial, the honest default today.**
> What happens after the call.

**Hero subheadline, Variant B.**
> Nuova is set up around how your agency already works, so most of the first week is us
> listening rather than you configuring.

**Section order.**

1. Hero
2. The steps
3. What we need from you
4. What we do not need
5. Who you deal with
6. Final conversion

**2. The steps.** Numbered, four steps maximum, each with a realistic time. **Every time
estimate is a commitment about the owner's own delivery and is an OWNER DECISION.** This
instance writes the structure and leaves the durations blank rather than inventing them.

**3. What we need from you**

> ### Less than you think.

Gated on the real onboarding process. The strategic point is that this section should be
short. A long list here loses deals.

**4. What we do not need**

> ### You are not changing systems.

> You do not have to move your CRM, retrain your team on new software or change where your
> enquiries arrive. `[C01]` `[C16]`

**5. Who you deal with**

> ### A person, not a ticket queue.

LEGAL PENDING and OWNER DECISION. Any statement about support hours, response times or
named contacts is a commitment. Blank until confirmed.

**Objections answered.** This will eat a month of my time (section 2, real durations). We
will have to change everything (section 4). We will be handed to a support portal (section 5).

**Trust requirements.** No invented setup duration. No support SLA. No *go live in 24 hours*.

**Cross links.** Pricing, Platform Overview, Book a demo.

**Mobile copy notes.** Section 2 is the whole page on mobile. Steps are vertical with the
duration on its own line under each step title, not inline, where it wraps badly.

---

## 7. Navigation

**Structure.** Flat and short. A real estate agency owner is not browsing, they are checking
whether this is serious.

| Item | Type | Behaviour |
|---|---|---|
| **Platform** | Dropdown | Overview link, then eight modules grouped by loop stage. |
| **Solutions** | Dropdown | By outcome, by role, by agency size. Links into `/solutions` anchors. |
| **Pricing** | Link | `/pricing` |
| **Experience Nuova** | Link | `/experience` |

Right side: language switch, `Log in`, primary CTA.

**Platform dropdown copy.** Each module gets its name plus a three to five word descriptor.
Grouped under the loop stage names, which is how the navigation teaches the positioning
without a paragraph.

| Stage | Module | Nav descriptor |
|---|---|---|
| Answer | AI Sales Agent | Instant multilingual replies |
| Answer | Voice AI | Calls the office cannot take |
| Understand | Lead Intelligence and CRM | One record, real priority |
| Advance | Property Matching | The right homes, chosen |
| Hand over | Daily Assistant | Each agent's day, ordered |
| Attract | Social Growth | Enquiries you did not wait for |
| Attract | Property Experience | What your buyer opens |
| Learn | Reporting | The whole operation, visible |

Plus a first item: **Platform Overview**, *How the whole system fits together*.

**Gated modules in the nav.** A module that is not confirmed live carries a small
availability label in the dropdown, per §11.3. A module that is embargoed does not appear in
the navigation at all.

**Log in. BLOCKED by C-03.** Options, in order of preference:

1. **Omit it.** If there is no customer application, a login link is a lie about product
   maturity. Recommended until C-03 is answered.
2. If an application exists, link to it, full stop.
3. Never a login link that opens a *coming soon* panel. That is worse than omitting it.

**Mobile navigation.** Full screen panel. Order: primary CTA at the top, then Platform
expanded by loop stage, Solutions, Pricing, Experience Nuova, language switch at the bottom.
The CTA is at the top because a mobile visitor who opened the menu is looking for a way to
act, not to browse.

**ES navigation.**

| EN | ES |
|---|---|
| Platform | Plataforma |
| Platform Overview | Visión general |
| Solutions | Soluciones |
| Pricing | Precios |
| Experience Nuova | Descubre Nuova |
| Log in | Iniciar sesión |
| By outcome | Por objetivo |
| By role | Por rol |
| By agency size | Por tamaño de agencia |

Loop stage names in ES: Atraer, Responder, Entender, Avanzar, Traspasar, Aprender.

---

## 8. Footer

Four columns. **Only pages defined in this document appear.** No invented About, Blog,
Careers, Help Centre, Case Studies or Documentation. An empty column is not a design problem,
an invented link is a governance violation.

| Column | Items |
|---|---|
| **Platform** | Platform Overview, AI Sales Agent, Lead Intelligence and CRM, Property Matching, Voice AI, Daily Assistant, Reporting. Gated modules omitted. |
| **Solutions** | By outcome, By role, By agency size, Pricing |
| **Get started** | Book a demo, Experience Nuova, Onboarding |
| **Legal** | Legal notice, Privacy policy, Cookie policy (LEGAL PENDING). ES equivalents on the ES site. |

**Footer brand line.**

> EN: Nuova is the operating layer of a real estate agency. Built in Spain, for the way
> agencies here actually work.
>
> ES: Nuova es la capa operativa de una agencia inmobiliaria. Hecho en España, para la forma
> en que trabajan las agencias de aquí.

**OWNER DECISION.** *Built in Spain* is a factual claim about the company. Confirm before
publishing.

**Copyright line.** `© 2026 NuovaSolution. All rights reserved.` / `© 2026 NuovaSolution.
Todos los derechos reservados.`

**Company identification.** Spanish LSSI-CE requires specific company identification to be
accessible. It currently lives on the legal notice page. **Confirm with counsel whether the
footer must also carry the registered name and identifier.** LEGAL PENDING.

**Not in the footer:** newsletter signup (no consent flow, no list, no content to send),
social icons (unless the accounts exist and are active, an empty social account linked from
a premium site is a trust cost), trust badges of any kind.

---

## 9. Shared microcopy library

Every reusable string on the site. Implementation takes strings from here and does not write
its own.

### 9.1 Video and media empty states

For sections where a product film is planned but not produced. **A placeholder must never be
a grey box, a spinner or a play button that does nothing.** It is a designed state with a
real alternative action.

| Context | EN | ES |
|---|---|---|
| Homepage product film | The Nuova film is being made. Until it is ready, the fastest way to see the system work is to send it an enquiry yourself. | La película de Nuova está en producción. Mientras tanto, la forma más rápida de ver el sistema es enviarle tú mismo una consulta. |
| Module page demonstration | We are filming this module properly rather than showing you a mockup. Book 30 minutes and we will walk you through it live. | Estamos grabando este módulo como toca, en lugar de enseñarte un montaje. Reserva 30 minutos y te lo enseñamos en directo. |
| Experience Nuova walkthrough | The guided walkthrough is coming. The live simulation below already works. | El recorrido guiado llegará pronto. La simulación de abajo ya funciona. |
| Video failed to load | The video did not load. You can book a demo and see it live instead. | El vídeo no se ha cargado. Puedes reservar una demo y verlo en directo. |
| Reduced motion fallback | Motion is off, so here is the same thing in words. | Has desactivado las animaciones, así que aquí lo tienes en texto. |

Every placeholder carries a working CTA. That is the difference between an honest empty
state and a dead surface.

### 9.2 Simulation labels

Required by C-02. Three options. **Recommendation: S2.**

| ID | EN | ES | Assessment |
|---|---|---|---|
| S1 | Simulation. Built on the product's own logic, running on sample data. | Simulación. Construida con la lógica del producto, sobre datos de ejemplo. | Most precise. Slightly technical. |
| S2 | **This is a demonstration, not a live client account. Same logic, sample data.** | **Esto es una demostración, no una cuenta real. La misma lógica, datos de ejemplo.** | **Recommended.** Honest, premium, short enough to sit above the fold. Says what it is and what it is not. |
| S3 | A demonstration of how Nuova handles a real enquiry. | Una demostración de cómo Nuova gestiona una consulta real. | Warmest, and it does not disclose the sample data, so it is the weakest under R3. |

**S2 is not final until `CLAIMS_MATRIX.md` clears it, and it changes if the demo becomes a
live backend call.** If Experience Nuova moves to a real model, the label becomes:

> EN: Live. Your message is answered by the same system that answers our clients' enquiries,
> using sample properties.
>
> ES: En directo. Tu mensaje lo responde el mismo sistema que atiende las consultas de
> nuestros clientes, con propiedades de ejemplo.

**Placement rule.** Above the interaction, visible without scrolling, at body text size. Not
in a tooltip, not in a footnote, not in grey 11px type. A simulation label a visitor has to
look for is not a disclosure.

**Sample data label.** Any screenshot, card, chat thread, alert or record showing invented
content carries: `Example` / `Ejemplo`. Applied to every one, without exception.

### 9.3 Availability labels

| State | EN | ES | When |
|---|---|---|---|
| In development | In development | En desarrollo | Confirmed as being built, no date given. |
| Early access | Early access | Acceso anticipado | Available to some customers only. Requires a real access path. |
| Planned | Planned | Previsto | Confirmed on the roadmap, not started. |

**Banned:** *Coming soon* with no further information, *Launching Q3*, *Beta* used as a
badge with no meaning, any date or quarter.

**Rule.** A label is not enough on its own. Any page carrying one also carries a sentence
saying plainly what is and is not available today. See Voice AI §6 for the pattern.

### 9.4 Form copy

**Field labels.**

| Field | EN label | EN placeholder | ES label | ES placeholder |
|---|---|---|---|---|
| Name | Your name | | Tu nombre | |
| Work email | Work email | you@agency.com | Email de trabajo | tu@agencia.com |
| Agency | Agency name | | Nombre de la agencia | |
| Phone | Phone | Including country code | Teléfono | Con prefijo del país |
| Offices | Number of offices | | Número de oficinas | |
| Agents | Number of agents | | Número de agentes | |
| Language | Preferred language | | Idioma preferido | |
| Message | What would you like to fix first | | ¿Qué te gustaría resolver primero? | |

**Rules.** Labels are always visible, never placeholder only. Placeholders give format, not
instructions. No asterisks, mark the optional fields instead. Never more than five fields on
any form on this site. Every additional field costs conversions and none of them is worth
more than a booked call.

**Validation messages.**

| Case | EN | ES |
|---|---|---|
| Empty required | We need this one to get back to you. | Necesitamos este dato para poder responderte. |
| Invalid email | That email address does not look right. | Ese email no parece correcto. |
| Free email address, if required | Please use your agency email address. | Usa el email de tu agencia, por favor. |
| Invalid phone | Include the country code, for example +34. | Incluye el prefijo del país, por ejemplo +34. |
| Too long | That is longer than the field allows. A sentence is plenty. | Es más largo de lo permitido. Con una frase basta. |

**Form states.** Required by `INTEGRATION_CONTRACT.md` for every action.

| State | EN | ES |
|---|---|---|
| Loading, button | Sending | Enviando |
| Success, callback request | We have got it. Someone will call you on the number you gave us. | Recibido. Te llamamos al número que nos has dado. |
| Success, access request | Your request is in. We will come back to you by email. | Solicitud recibida. Te respondemos por email. |
| Error, retryable | That did not send. Try once more. | No se ha enviado. Inténtalo otra vez. |
| Error, fallback | That did not send. You can book a demo directly instead. | No se ha enviado. Puedes reservar una demo directamente. |
| Disabled, not connected | Not available yet. Book a demo and we will do this on the call. | Todavía no disponible. Reserva una demo y lo vemos en la llamada. |

**Success copy rule.** A success message states what happened and what happens next. Never
*Thanks!*, never *Success*, never an exclamation mark. **Success copy that promises a
response time is an OWNER DECISION**, because it is a commitment about the owner's calendar.
The wording above deliberately promises contact without promising a window.

### 9.5 Trust and compliance lines

All LEGAL PENDING. Drafted so counsel has something to correct rather than something to
write.

| Context | EN | ES |
|---|---|---|
| At any form collecting personal data | We use this to reply to you and nothing else. Read how we handle your data. | Lo usamos solo para responderte. Consulta cómo tratamos tus datos. |
| Privacy link at point of collection | How we handle your data | Cómo tratamos tus datos |
| Data residency | *(Blocked. Requires confirmation of where data is stored and processed.)* | |
| Sub processors | *(Blocked. Requires the actual list.)* | |
| Client data ownership | Your client data stays yours. We process it to run the service, and for nothing else. | Los datos de tus clientes son tuyos. Los tratamos para prestar el servicio, y para nada más. |
| AI disclosure to end clients | *(Blocked. Whether an end client is told they are speaking with an automated assistant is a legal question in the EU and a product decision. It is not a copy decision.)* | |
| Cookie and analytics notice | *(Blocked. Depends on which analytics ship. Vercel Analytics is cookieless. Anything beyond it requires a consent layer before it loads.)* | |
| Call recording, Voice AI | *(Blocked. Spanish consent requirements apply.)* | |

**Compliance facts the copy must respect and this instance will not draft alone:**

1. GDPR and Spanish LSSI-CE apply to every form on the site.
2. Any analytics beyond a cookieless tool requires consent before loading, not after.
3. Company identification obligations under LSSI-CE apply to the site as a whole.
4. Automated processing that produces a decision about a person has disclosure implications.
   Lead scoring is close enough to that line for counsel to look at it.
5. Call recording and voice processing have separate consent requirements.

### 9.6 Objection and FAQ bank

Shared across pages. Answers marked `[gated]` do not ship until the relevant claim clears.

| Question EN | Answer EN | Page |
|---|---|---|
| Do we have to change our CRM? | No. Nuova is built to work alongside what you already run. `[C16]` | Lead Intelligence, Onboarding |
| Will our clients know they are talking to a system? | *(Blocked. Legal and product decision.)* | AI Sales Agent |
| What happens when a client asks something it should not answer? | It stops and hands the conversation to the agent who owns that client, with the full history. `[C21]` | AI Sales Agent |
| How long does setup take? | *(Blocked. OWNER DECISION.)* | Onboarding |
| What does it cost? | It depends on how many offices and agents you are running. We tell you on the call. | Pricing |
| Does it work in our clients' languages? | It reads and answers in the language the client wrote in. `[C17]` | AI Sales Agent |
| Is our data safe? | *(Blocked. LEGAL PENDING.)* | Platform, Pricing |
| Can we try it before deciding? | *(Blocked by C-01. Until then: you can send it a real enquiry yourself, and we will run it on your own market on the demo call.)* | Pricing, Onboarding |

**FAQ rule.** Maximum six questions per page. An FAQ longer than that is a page that failed
to explain itself. Questions are written the way the visitor would ask them, not the way
marketing would.

### 9.7 Error and system states

| State | EN headline | EN body | ES headline | ES body |
|---|---|---|---|---|
| 404 | That page is not here. | It may have moved, or it may not exist yet. The platform overview is a good place to start. | Esta página no está aquí. | Puede que se haya movido o que aún no exista. La visión general de la plataforma es un buen punto de partida. |
| 500 | Something broke on our side. | Not yours. Try again in a moment, or book a demo and we will talk instead. | Algo ha fallado por nuestra parte. | No por la tuya. Inténtalo en un momento o reserva una demo y hablamos. |
| Offline | You are offline. | The page will come back when your connection does. | Estás sin conexión. | La página volverá cuando vuelva tu conexión. |
| Booking widget failed | The booking widget did not load. | Open the booking page directly. | El calendario no se ha cargado. | Abre la página de reservas directamente. |

The booking fallback is the wording for audit finding A-02. The anchor navigates to the real
booking URL and this copy only appears if the embed fails after the page has already loaded.

### 9.8 Reusable blocks

**Standard final conversion block**, used on every module page.

> ### See it on your own enquiries.
>
> Book 30 minutes. We will show you Nuova handling the kind of messages your agency actually
> gets, in your market and your languages.

Primary CTA plus microcopy from §3.5. Secondary CTA: Experience Nuova.

**Standard section transition line**, used sparingly between major homepage sections. One
sentence, never more than two per page.

**Experience Nuova example prompts.**

| # | EN | ES |
|---|---|---|
| 1 | Hi, is the villa in Marbella still available? We could come and see it this week. | Hola, ¿sigue disponible la villa de Marbella? Podríamos verla esta semana. |
| 2 | I am thinking about selling my apartment in Estepona. What is it worth right now? | Estoy pensando en vender mi piso en Estepona. ¿Cuánto vale ahora mismo? |
| 3 | Looking for something near the beach for August, two adults, up to 1.200 a month. | Busco algo cerca de la playa para agosto, dos adultos, hasta 1.200 al mes. |

Chip labels, four words maximum: `Buyer, viewing` / `Seller, valuation` / `Rental, August`.
ES: `Comprador, visita` / `Vendedor, valoración` / `Alquiler, agosto`.

**Experience Nuova stage labels.**

| Stage | EN | ES |
|---|---|---|
| 1 | Read | Leído |
| 2 | Answered | Respondido |
| 3 | Understood | Entendido |
| 4 | Prioritised | Priorizado |
| 5 | Agent notified | Agente avisado |

Plain language, no system vocabulary. Never *parsing*, *classifying*, *scoring*, *NLP*,
*processing*, or a node name of any kind. The `CLAUDE.md` architecture rule forbids exposing
internal infrastructure and these labels are where that rule is most easily broken.

**Solutions page tab labels.** By outcome / By role / By agency size. ES: Por objetivo / Por
rol / Por tamaño.

**Loop stage names.** Attract, Answer, Understand, Advance, Hand over, Learn. ES: Atraer,
Responder, Entender, Avanzar, Traspasar, Aprender.

---

## 10. Mobile copy system

Mobile is not a shortened desktop. It is a different reading situation: one hand, in a car
park, between viewings, with the sun on the screen.

**Rules.**

1. **Hero headline is never rewritten for mobile.** It is the one thing that must survive
   intact. It may wrap to three lines.
2. **Every subheadline has a defined short form.** The short form is a subset of the
   sentences, never a paraphrase, so there is exactly one wording to maintain.
3. **First screen contains headline, subheadline and primary CTA.** Nothing else is required
   to be there.
4. **Body paragraphs are three sentences maximum on mobile.** Longer paragraphs are split at
   the source, not truncated at render.
5. **No text is truncated with an ellipsis anywhere on the site.** If it does not fit, it is
   rewritten. Truncated copy is a copy failure, not a layout feature.
6. **Sticky bar carries one CTA.** Two competing CTAs in a sticky bar is a P1 finding under
   the hierarchy rule.
7. **Availability and simulation labels are above the fold on mobile**, on any page that
   carries one.
8. **Tables become lists.** No horizontal scroll for copy, ever.
9. **Nav CTA is at the top of the mobile menu**, not the bottom.
10. **Spanish runs 15 to 25 percent longer than English.** Every mobile length decision is
    checked against the Spanish string, not the English one. A layout that works in English
    and breaks in Spanish is a P1 finding, and it is the single most common bilingual defect.

---

## 11. Spanish localisation strategy

### 11.1 Principle

The Spanish site is not a translated site. It is the same positioning, the same structure and
the same conversion architecture, written by someone who sells to Spanish agencies. A
literal translation of English marketing copy reads as imported and costs credibility in
exactly the market that matters most.

**Rule: translate the idea, not the sentence.** Where a line does not survive, it is
rewritten from the idea, and the Spanish version is recorded here as the canonical Spanish,
not as a variant of the English.

### 11.2 Register

| Relationship | Form | Reason |
|---|---|---|
| Nuova to the agency owner, all website copy | **tú** | Modern Spanish business tone. *Usted* on a website reads institutional and old, and the current site already uses *tú*. |
| Nuova the product to an end client, in any simulated message | **usted** | An agency writing to a buyer about an 800.000 € property uses *usted* until told otherwise. This distinction is already established in `lib/os/copy.ts` and it is correct. Keep it. |
| Legal pages | **usted** or impersonal | Legal convention. |

That two register split is the single most Spanish thing about this copy and it will be
noticed by the audience.

### 11.3 Terminology

| EN | ES recommended | Note |
|---|---|---|
| Lead | **contacto** or **oportunidad** in narrative copy, **lead** permitted in UI labels | *Lead* is used in the Spanish industry, but premium narrative copy reads better with *oportunidad*. |
| Enquiry | **consulta** | Established. |
| Viewing | **visita** | Never *vista*. |
| Valuation | **valoración** | |
| Listing / property | **propiedad**, **inmueble**, **vivienda** | *Vivienda* for homes specifically, *inmueble* in formal contexts. |
| Portfolio | **cartera** | |
| Agency | **agencia** or **inmobiliaria** | *Inmobiliaria* is what agencies call themselves. Prefer it in headlines. |
| Agent | **agente** or **asesor** | *Asesor inmobiliario* is the premium self description in Spain. Use *asesor* where the tone is elevated. |
| Follow up | **seguimiento** | |
| Hot lead | **oportunidad prioritaria** | Never *lead caliente* in headline copy. It reads cheap. The current site's *prioritario* is a good choice. Keep it. |
| Score | **prioridad** | Avoid *puntuación* until the scoring claim clears. |
| Dashboard | **panel** | |
| Pipeline | **cartera de oportunidades** or rewrite the sentence | *Pipeline* is understood but ugly in Spanish copy. |
| Onboarding | **puesta en marcha** | Not *onboarding*. |
| Free trial | **prueba gratuita** | |
| Booking a demo | **reservar una demo** | Established and natural. |

### 11.4 Not translated

Nuova. NuovaSolution. Tier names: Studio, Signature, Prime. Module names: AI Sales Agent,
Lead Intelligence, Voice AI, Property Matching, Daily Assistant, Social Growth, Reporting,
Property Experience.

**OWNER DECISION on module names.** Keeping product module names in English is standard for
premium Spanish SaaS and avoids clumsy constructions such as *Inteligencia de Contactos*.
Governance forbids mixed language UI, and this is a deliberate exception, so it needs sign
off. **If module names are kept in English, every one carries a Spanish descriptor line
underneath it, everywhere it appears.** That is what keeps it from reading as a lazy
half translation.

Descriptors:

| Module | ES descriptor |
|---|---|
| AI Sales Agent | Respuesta inmediata en cualquier idioma |
| Lead Intelligence | Una ficha por cliente, con prioridad real |
| Voice AI | Atiende las llamadas que tu oficina no puede |
| Property Matching | Las propiedades que de verdad encajan |
| Daily Assistant | El día de cada agente, ya ordenado |
| Social Growth | Consultas que no tuviste que esperar |
| Reporting | Toda la operación, a la vista |
| Property Experience | Lo que tu cliente abre de verdad |

### 11.5 Formatting

- Currency: `800.000 €`, with a non breaking space before the symbol. Never `€800,000`.
- Thousands separator is a full stop. Decimal separator is a comma.
- Dates: `jueves 11:00`, `12 de marzo`. Never `03/12`, which is ambiguous across the two
  markets the site serves.
- Phone: `+34` prefix shown.
- Question and exclamation marks: opening marks are mandatory. `¿Qué te gustaría resolver
  primero?`. Exclamation marks remain banned in both languages.
- Capitalisation: Spanish uses sentence case for headings. **Do not carry English title case
  into Spanish.** *Reservar Demo* is wrong. *Reservar una demo* is right. The current site
  gets this wrong in several places.
- Accents on capitals are kept. `Á`, `Í`, `Ó`.

### 11.6 Adaptation notes by page

| Page | Note |
|---|---|
| Homepage | *Full attention* does not survive translation. The ES hero is rebuilt from the idea. See §11.7. |
| Platform Overview | *Operating layer* becomes *capa operativa*, which works. Keep it. |
| AI Sales Agent | The multilingual section is more persuasive in Spanish, because a Spanish agency owner lives this problem daily. Give it more space in ES than in EN. |
| Lead Intelligence | *Priority* over *score* throughout, per §11.3. |
| Voice AI | Spanish clients call more than northern European clients do. The ES version of section 2 is stronger and should be longer. |
| Property Matching | The quoted client requirement in section 2 is written natively in Spanish, not translated. It has to sound like a real Spanish speaking buyer. |
| Reporting | *Reporting* is understood, but section headlines use *informes* and *resultados*. |
| Pricing | Spanish buyers expect IVA to be addressed explicitly. LEGAL PENDING. |
| Experience Nuova | Example prompts are written natively, and at least one is in Spanish from a Spanish speaking seller, which is the most common real case on this coast. |
| Onboarding | *Puesta en marcha*, not *onboarding*. |
| Legal | Existing `/aviso-legal` and `/politica-privacidad` content is retained and re verified after the redesign changes what data is collected. |

### 11.7 Spanish hero recommendation

Direct translations of H1 were tested and all of them fail:

- *Tu agencia, con toda la atención puesta* is limp.
- *Tu agencia, siempre atenta* sounds like a slogan for a bank.
- *Atención total* sounds like a customer service department.

The Spanish hero is rebuilt from the same idea, that attention is the scarce resource:

> ## Tu inmobiliaria, sin que se le escape nada.
>
> Cada consulta respondida en segundos, en el idioma del cliente. Cada conversación entendida
> y llevada hacia adelante. Tus agentes se enteran de las que están listas.

*Sin que se le escape nada* carries the continuity idea, the loss aversion and the
operational competence in five words, and it is idiomatic Spanish rather than translated
English. It is the recommended Spanish hero.

Alternate for testing, matching H6:

> ## Para que tu inmobiliaria no tenga que decir ya te decimos algo.

### 11.8 Spanish QA checklist

Before any Spanish page ships:

1. Read aloud by a native speaker from Spain. Latin American Spanish is not this market.
2. No sentence is recognisable as translated English.
3. Title case has not leaked into any heading.
4. Opening question marks present everywhere.
5. Currency, dates and phone formats correct.
6. *tú* to the owner, *usted* in every simulated client message. No mixing.
7. Every EN string has an ES string. No English fallback rendering anywhere in the ES site,
   which is what the current `language-context.tsx` fallback chain would do silently.
8. Layout checked against Spanish string lengths, which run longer.
9. Legal pages match what the redesigned site actually collects.

### 11.9 Scope note

This document delivers the Spanish strategy, register, terminology, formatting rules, the
full Spanish CTA and microcopy library, the Spanish navigation and footer, and the Spanish
hero. **Full Spanish body copy for all fourteen pages is the second pass of this document**
and is written once the English body copy clears `CLAIMS_MATRIX.md`. Translating body copy
that is still gated would produce two sets of claims to re verify instead of one.

---

## 12. SEO copy

Titles and meta descriptions. Titles are under 60 characters, descriptions under 155.

| Page | EN title | EN description |
|---|---|---|
| Homepage | Nuova. The operating layer for real estate agencies | Every enquiry answered in seconds, understood and carried forward by one system, so your agents work on the clients who are ready. |
| Platform | The Nuova platform for real estate agencies | Acquisition, conversation, qualification, follow up, matching and reporting, connected in one system instead of five. |
| AI Sales Agent | AI Sales Agent for real estate agencies | Answers every enquiry immediately in the client's language, qualifies it, follows up, and hands your agent a client who is ready. |
| Lead Intelligence | Lead intelligence and CRM for real estate | One clear record per client that updates itself, so your team knows who is ready and why. |
| Voice AI | Voice AI for real estate agencies | The calls your office cannot take, answered and turned into a record like everything else. |
| Property Matching | Property matching for real estate agencies | Reads what a client actually wants, checks it against your portfolio, and sends the homes worth their time. |
| Daily Assistant | Daily assistant for real estate agents | Every agent starts the day with an ordered list of the clients who need them, context already attached. |
| Reporting | Reporting for real estate agencies | Enquiries, response times, sources, agents and outcomes. The answer to the question every owner asks on Monday. |
| Solutions | Nuova by outcome, role and agency size | Start with what is going wrong. Find the part of Nuova that fixes it. |
| Pricing | Nuova pricing for real estate agencies | Three tiers, priced by the size of the operation. One call, one recommendation, one number. |
| Experience Nuova | See Nuova handle a real enquiry | Send it the kind of message your agency gets every day and watch what happens. Two minutes, nothing to install. |
| Onboarding | Getting started with Nuova | What happens after the call, what we need from you, and what you do not have to change. |

ES titles and descriptions are written in the second pass, natively, not translated.
`hreflang` pairs are an implementation matter recorded in audit finding A-04.

---

## 13. Claims register

**This table is the intake request to the Product Truth instance.** Every ID used in this
document appears here. Nothing ships until its row reads `CLEARED`.

| ID | The claim being made | What must be confirmed | Status |
|---|---|---|---|
| C01 | Nuova works alongside the inbox, portals and CRM an agency already uses. | Which integrations exist, in which direction, and in what state. | UNVERIFIED |
| C02 | Nuova helps create enquiries, not only handle them. | Does any acquisition capability exist today. | UNVERIFIED |
| C03 | Every enquiry gets a reply in seconds. | Is it every enquiry or some. Is *seconds* accurate. Which channels. | UNVERIFIED |
| C04 | Nuova determines what a client wants and how serious they are, and records it. | How qualification actually works and how reliable it is. | UNVERIFIED |
| C05 | Follow up happens automatically. | Does automated follow up exist. On which channels. At what cadence. Who controls it. | UNVERIFIED |
| C06 | When a client is ready, an agent receives them with full history. | Does handover exist as a feature. What is included in the history. | UNVERIFIED |
| C07 | Outcomes are measured and feed back into the system. | Does any feedback loop exist, or is this aspirational. | UNVERIFIED |
| C08 | Nuova matches client requirements to the agency's properties. | Does matching exist. Against what data source. | UNVERIFIED |
| C09 | Voice AI answers calls. | Does it exist at all. `INTEGRATION_CONTRACT.md` W-05. | UNVERIFIED, likely NO |
| C10 | Daily Assistant gives each agent an ordered list with context. | Does this module exist in any form. | UNVERIFIED |
| C11 | Social Growth keeps the agency visible and creates enquiries. | Does this module exist. What does it do. Who approves output. | UNVERIFIED, likely NO |
| C12 | Reporting shows enquiries, sources, response times and outcomes. | Which metrics are actually captured. | UNVERIFIED |
| C13 | Property Experience produces something a buyer opens. | What is it. Does it exist. | UNVERIFIED, likely NO |
| C14 | Experience Nuova demonstrates real product behaviour. | Simulated or live. Conflict C-02. | UNVERIFIED |
| C15 | One memory. The same client recognised across channels, addresses and time. | Is identity resolution real. This is the core differentiator and the highest priority to verify. | UNVERIFIED |
| C16 | Nuova writes back into the agency's existing CRM. | Which CRMs. Read, write or both. Named integrations. | UNVERIFIED |
| C17 | Nuova reads and answers in the language the client wrote in. | Which languages, confirmed individually. | UNVERIFIED |
| C18 | The first reply is specific to the property asked about. | Does the reply reference real listing data. | UNVERIFIED |
| C19 | Nuova asks qualifying questions in a natural order. | Is the question flow real and configurable. | UNVERIFIED |
| C20 | Follow up uses a sensible interval and a channel the client uses. | Cadence, channel selection, agency control. | UNVERIFIED |
| C21 | Nuova does not negotiate, commit the agency, or answer legal questions. | Are these guardrails actually implemented. **This claim is a promise about safety and must be verified before publication, not after.** | UNVERIFIED |
| C22 | The same person is recognised across portal, WhatsApp and multiple email addresses. | Sub claim of C15. Verify separately, it is the hardest part. | UNVERIFIED |
| C23 | Priority updates as the conversation changes. | Does re scoring happen. Numeric scale blocked separately. | UNVERIFIED |
| C24 | The owning agent is alerted when a client becomes ready. | Alert routing, ownership model, channel. | UNVERIFIED |
| C25 | Nuova keeps its own record and syncs it. | Architecture question with a public consequence. | UNVERIFIED |
| C26 | Voice is in development. | Is it. If it is not started, *planned* is the honest label. | UNVERIFIED |
| C27 | Matching handles unstructured requirements, not filter fields. | The strongest matching claim, and the least likely to be fully true. Verify carefully. | UNVERIFIED |
| C28 | Matching runs against the agency's own portfolio. | Data source. Whether the agency's inventory is connected. | UNVERIFIED |
| C29 | A new listing is connected to a client who described it months earlier. | Does reverse matching over time exist. | UNVERIFIED |
| C30 | Daily Assistant is not a monitoring tool. | Product positioning decision with a real consequence for agent adoption. | UNVERIFIED |
| C31 | Reporting cuts by agent, source and outcome. | Which dimensions exist. | UNVERIFIED |
| C32 | Property Experience reports what a buyer looked at. | Tracking capability and its lawful basis. Legal before product. | UNVERIFIED |
| C33 | The Experience Nuova interaction reflects real timing. | Whether *four seconds* is honest for a simulation. | UNVERIFIED |
| C34 | A 14 day trial runs on the agency's own enquiries. | Conflict C-01. | UNVERIFIED, likely NO |

**Retired claims from the current site.** These appear in `translations/en.ts` and
`translations/es.ts` today and **must not be carried into the redesign** without clearance:

| Existing string | Problem |
|---|---|
| "scored from 1 to 100" | A specific mechanism. Unverified. |
| "Leads above 80 are marked as priority instantly" | A specific threshold. Unverified. |
| "Replied in < 1 second" | A performance figure. Unverified. |
| "Most agencies reply in hours" | A claim about third parties with no source. |
| "1 hr 45 min", "2 hr 10 min" in the slow agency timeline | Invented figures presented as typical. |
| "Every real inquiry gets a reply. Only spam is ignored." | An absolute guarantee. |
| "It takes 15 minutes. No setup needed." | Two commitments about the owner's delivery. |
| "Always synced to your CRM" | An integration claim. |
| "Replied in 4 seconds" (`lib/os/copy.ts`) | A performance figure. |
| "200 overnight · 3 for you" (`lib/os/copy.ts`) | Invented volume. |
| CRM and portal names in `lib/os/copy.ts` | Named third party integrations, unverified. |

---

## 14. Open decisions for the owner

Ordered by how much they block.

| # | Decision | Blocks |
|---|---|---|
| 1 | Does the 14 day trial exist? (C-01) | The entire CTA hierarchy, the Onboarding page, the Pricing primary CTA. |
| 2 | Is Experience Nuova simulated or live, and which label is cleared? (C-02) | The Experience page and the homepage demo section. |
| 3 | Do prices exist, and are they public? (C-06) | The Pricing page and the homepage pricing block. |
| 4 | Which modules are live, in development, planned, or not real? | Four module pages, the homepage module grid, the navigation, the footer. |
| 5 | Approve or reject the positioning in §1.2 and the operating loop in §1.4. | Every page. This is the foundation. |
| 6 | Approve or reject the hero recommendation in §4.4. | Homepage. |
| 7 | Approve or reject the package names Studio, Signature, Prime. | Pricing, Solutions. |
| 8 | Is the demo 15 minutes or 30 minutes? | Every CTA microcopy line on the site. |
| 9 | Is *Log in* omitted until an application exists? (C-03) | Navigation. |
| 10 | The real WhatsApp number, and who answers it. (C-05) | Every WhatsApp CTA. Currently none can ship. |
| 11 | What does *Talk to Nuova* mean, or is it retired? (C-04) | Resolved here by removing the label. Confirm. |
| 12 | Are module names kept in English on the Spanish site? | The whole Spanish site. |
| 13 | Is *Built in Spain* accurate? | The footer. |
| 14 | Does the entry tier include the whole loop, or are capabilities tiered? | The Pricing page's central promise. |
| 15 | Are *Lead Acquisition* and *Follow up Automation* merged into Social Growth and AI Sales Agent? | Routing and the navigation. |
| 16 | Confirm `CLAUDE.md` is superseded on positioning and visual direction. (C-07) | This document assumes the enterprise redesign brief wins. |

**Waiting on counsel, not on the owner:**

1. Cookie and analytics consent wording, and whether a consent layer is required.
2. Whether end clients must be told they are speaking with an automated assistant.
3. Lawful basis and disclosure for lead scoring as automated processing.
4. Call recording consent for Voice AI.
5. Engagement tracking of a named prospect for Property Experience.
6. IVA presentation on the Pricing page.
7. LSSI-CE company identification placement.
8. Re verification of both privacy pages once the redesign changes what data is collected.

---

## 15. Handover

**To the Product Truth instance.** §13 is your intake list. C15 is the highest priority
because the entire positioning rests on it. C21 is the second, because it is a safety
promise. C09, C11 and C13 determine whether four pages exist at all.

**To the Claims instance.** §13 needs a cleared or rejected wording per row. §9.2 needs a
cleared simulation label. §9.5 needs everything in it either cleared or replaced.

**To the Luxury UX instance.** Section orders in §6 are the page architecture. The loop in
§1.4 is the primary visual system on the homepage and Platform Overview. §9.1 defines every
media empty state, which need designing rather than hiding. §10 is the mobile copy contract
that the layout has to hold.

**To the implementation instance.** Do not take copy from this file into a component until
its claim IDs are cleared. Ladder B in §3.3 is the only CTA ladder that can ship today. Every
string in §9 is shared and belongs in one place, not repeated per component.

---

## 16. Status

Positioning, message hierarchy, voice, banned language, audience map, CTA system, hero
options with scoring and a binding recommendation, package names, fourteen page
specifications with drafted body copy, navigation, footer, the full shared microcopy library,
the Spanish localisation strategy with its key surfaces, SEO copy, a 34 entry claims register
and 16 open owner decisions.

**Drafted and awaiting `PRODUCT_TRUTH.md`, `CLAIMS_MATRIX.md`, owner decisions, and
independent technical and final audit.**

**No copy in this document is cleared for publication.**
