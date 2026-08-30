# COPY AND CONVERSION MASTER — NuovaSolution Website

**Owner of this document:** Lead Product Marketing Writer / Conversion Strategist
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Binding under:** `MASTER_GOVERNANCE.md` R3, R4, R6, R10
**Document status:** **DRAFT. NOT CLEARED FOR PUBLICATION.**

---

## 0. Status, scope and how to use this file

### 0.1 Why this document is a draft

`MASTER_GOVERNANCE.md` §3 places two documents above this one. **Both arrived while this
document was being written**, in commit `7ec0010`, and this file has been reconciled against
them in a second pass.

| Document | Present | Consequence for this file |
|---|---|---|
| `PRODUCT_TRUTH.md` | **Present** | Capability statements follow its status categories. No capability is Category 1. |
| `CLAIMS_MATRIX.md` | **Present** | Wording follows its verdicts. Its Approved Wording column outranks anything drafted here. |

**The single fact that governs every line below** (`CLAIMS_MATRIX.md` §0):

> No capability has Status 1. Backend verification was not performed and was not permitted
> under the owner's system isolation directive. Every capability claim therefore ships
> qualified, or it does not ship.

Consequently this document is still a draft, but for a different reason than when it was
started. It is no longer waiting for the truth documents. It is waiting on the **18 owner
decisions** in `CLAIMS_MATRIX.md` §21 and the **14 legal dependencies** in its §22.

Under R3 a claim without a matrix entry is not written. This file therefore does three
things:

1. It provides the **complete conversion architecture, structure, hierarchy and voice**,
   which depend on strategy rather than product facts and are safe to finalise now.
2. It provides **body copy carrying only `APPROVED` and `APPROVED-Q` wording**, with the
   required qualifiers attached to the claim rather than hidden in a footer.
3. It maps every line to its matrix row in §13, so an auditor can check any sentence on the
   site against a verdict in one step.

**Nothing in this file may be published, deployed or pasted into a component until the
matrix rows it depends on are `APPROVED` or `APPROVED-Q` and their owner and legal
dependencies are closed.** Every page block below carries a `PUBLICATION GATE` line stating
exactly what has to be true before that page can ship.

### 0.1b What the reconciliation pass changed

Recorded so the change is auditable rather than silent. The first draft of this document was
written before the truth documents existed, and it was wrong in both directions.

**Wording removed because the matrix rejects it:**

| Removed | Matrix row |
|---|---|
| "Works alongside the inbox, portals and CRM you already use" | F-07, F-08. "Works with yours" is explicitly forbidden. |
| "Every enquiry answered in seconds" as a hero promise | B-04, B-06. Reads as an SLA. |
| "That took four seconds" | B-06. No numeric response time may be published. |
| "Three properties", "three homes" | F-03. A fixed count is forbidden until confirmed. |
| The follow up persistence and revival narrative | E-04, E-05, L-02. The highest risk capability on the site. |
| "A property listed on Tuesday and the client who described it in March" | E-04, L-02. Reactivation of older contacts. |
| Voice AI written in the present tense | V-01, V-03. Voice is Category 7 on the public site. |
| "Every tier runs the whole loop. We do not hold back." | PK-04. Factually wrong. Higher packages do gate capabilities. |
| "30 minutes" under every demo CTA | CTA-2. A duration promise that is not confirmed. |
| "Your client data stays yours" | B-15, N-03. A security claim. |
| "One system instead of five" | P-03. Replaced with the approved wording. |

**Pages upgraded because the truth documents specify them far better than assumed:**

| Page | Was | Now |
|---|---|---|
| Property Experience | EMBARGOED, treated as undefined | Specified in detail. `PRODUCT_TRUTH.md` §13 defines twelve capabilities including a deliberate structural navigation boundary. Rewritten as a real page. |
| Social Growth | EMBARGOED, treated as unknown | `PRODUCT_TRUTH.md` §5 defines nine capabilities and one exclusion. Rewritten as a real page. |

**Confirmed correct by the matrix:** the operating layer positioning (P-02), the decision to
retire *Talk to Nuova* (CTA-4), Ladder B as the shipping CTA hierarchy (T-01, §16 note), the
refusal to publish the 1 to 100 score scale (D-04), and the requirement for a pre interaction
simulation label (S-02).

### 0.2 What is finalised and what is not

| Layer | State |
|---|---|
| Positioning, category story, operating loop | **Finalised.** Strategy, not a product claim. |
| Message hierarchy, voice, banned language | **Finalised.** |
| Page inventory, section order, page goals | **Finalised.** |
| CTA system and hierarchy | **Finalised as two ladders.** Which ladder ships depends on C-01. |
| Hero headline recommendation | **Finalised as a recommendation.** Owner sign off required. |
| Package names | **Finalised as a recommendation.** Package contents blocked by C-06. |
| Body copy | **Drafted and reconciled against the matrix.** Gated per page and per section. |
| Spanish | **Strategy, key surfaces and the final qualifier bank finalised. Full ES body copy is a second pass.** |
| Legal and compliance wording | **Drafted or blocked, per `CLAIMS_MATRIX.md` §22.** A lawyer signs it, not this instance. |
| Claims register | **Replaced.** Keyed to matrix IDs, not to private ones. |

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
| **Attract** | Leads arrive from your campaigns and your website carrying the source they came from. | Lead Acquisition, Social Growth |
| **Answer** | Every enquiry gets an answer, day or night, in the customer's own language. | AI Sales Agent |
| **Understand** | One customer, one record, with a priority signal so your team knows where to start. | Lead Intelligence, Universal CRM |
| **Advance** | The conversation continues, and the customer sees a relevant selection rather than a list dump. | Follow up, Property Matching, Property Experience |
| **Hand over** | The conversation goes to a person when it matters, with the full history. | Daily Assistant |
| **Learn** | You can see where leads came from, how fast they were answered and what was booked. | Reporting |

**Voice sits outside the loop on the public site.** `CLAIMS_MATRIX.md` §9 rules voice
Category 7 until the owner answers V-01. It appears only in a visually separated future
section, never inside a live capability list. See §6.5.

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

**CTA-2 forbids a duration or outcome promise that is not confirmed**, and names *15 minutes*
and *no commitment* as forbidden. Every duration is therefore removed until the owner supplies
one. The lines below work without a number.

| Context | EN | ES |
|---|---|---|
| Demo, homepage and final CTA | We show you Nuova running on a real enquiry, not a slide deck. | Te enseñamos Nuova funcionando con una consulta real, no un PowerPoint. |
| Demo, module pages | In English or in Spanish. Nothing to prepare. | En español o en inglés. No hace falta preparar nada. |
| Demo, pricing page | We tell you what it costs on the call. | Te decimos lo que cuesta en la llamada. |
| Experience Nuova | Nothing to install. | Sin instalar nada. |

**Held, not written.** Trial microcopy is not drafted at all. T-01 forbids *free trial*,
*start free*, *try free* and *no credit card required* in every wording, so drafting a line
for a CTA that may not exist only creates something to accidentally ship.

**Removed.** *No card. Your data stays yours.* The second sentence is a security and data
handling claim, rejected under B-15 and N-03.

**OWNER DECISION.** Supply a real demo duration, or confirm that none is published. The
current live site says 15 minutes, which CTA-2 names as forbidden wording precisely because
it is unconfirmed. This instance will not choose a number that describes the owner's own
calendar.

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
> Every enquiry gets an answer, day or night, in the customer's own language. Every
> conversation is understood and carried forward. Your agents hear about the ones that are
> ready.

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

**Assign H4's headline** to the Platform Overview hero, where a category first line is
correct. **Its subheadline as scored above does not ship**: *connected in one system instead
of five* is replaced by P-03's approved wording. The options in §4.2 are preserved as the
record of what was evaluated, not as shippable copy.

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

Gates below are **after** reconciliation against the truth documents. Two pages moved up, one
moved down to no page at all.

| # | Page | Route | Gate | Principal blocker |
|---|---|---|---|---|
| 1 | Homepage | `/` | HELD | Composed of module sections, so it inherits their gates |
| 2 | Platform Overview | `/platform` | **OPEN** | Security section held on L-14 |
| 3 | AI Sales Agent | `/platform/ai-sales-agent` | HELD | Follow up section on L-01, qualification on L-09 |
| 4 | Lead Intelligence and CRM | `/platform/lead-intelligence` | HELD | L-09 throughout, G-11 positioning |
| 5 | Voice AI | **no route** | **BLOCKED** | V-01. One future block on Platform Overview instead |
| 6 | Property Matching | `/platform/property-matching` | **OPEN** | Section 5 removed on L-02 |
| 7 | Daily Assistant | `/platform/daily-assistant` | HELD | Every row OWNER |
| 8 | Social Growth | `/platform/social-growth` | **OPEN** ⬆ | Section 5 held on L-07. **Was EMBARGOED** |
| 9 | Reporting | `/platform/reporting` | **OPEN** | Section on L-11 removed |
| 10 | Property Experience | `/platform/property-experience` | **OPEN** ⬆ | Square metres on L-12. **Was EMBARGOED** |
| 11 | Solutions and Outcomes | `/solutions` | **OPEN** | Rows for blocked modules are omitted |
| 12 | Pricing | `/pricing` | HELD | PK-02, PK-04, PK-05, PK-06 |
| 13 | Experience Nuova | `/experience` | HELD | S-02 disclosure wording is an owner decision |
| 14 | Onboarding and Start | `/start` | HELD | O-01 and O-02 OWNER |

**No page carrying a form ships at all.** A-04b and B-03b are P0: this website has no API
routes, no forms and no submission path. Form copy in §9.4 is prepared, not deployable.

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
> Every enquiry gets an answer, day or night, in the customer's own language. Every
> conversation is understood and carried forward. Your agents hear about the ones that are
> ready.

**Primary CTA.** Book a demo. Ladder B is the only ladder that ships (`CLAIMS_MATRIX.md`
T-01, CTA-1).
**Secondary CTA.** Experience Nuova, with its simulation label.
**Hero reassurance line.** One system instead of separate tools for messaging, follow up,
matching and reporting. `[P-03]`

> **Rejected wording, recorded so it is not reintroduced.** The first draft used *Works
> alongside the inbox, portals and CRM you already use*. F-07 and F-08 forbid *works with
> yours* and every compatibility claim, because no integration is evidenced. P-03's approved
> wording above makes the same competitive point without the integration claim.

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

| Stage | Line | Matrix |
|---|---|---|
| Attract | Leads arrive from your campaigns and your website, each carrying the source it came from. | A-04, A-06 |
| Answer | Every enquiry gets an answer, day or night, in the customer's own language. | B-04, B-07 |
| Understand | One customer, one record, with a priority signal so your team knows where to start. | D-01, D-03 |
| Advance | The conversation continues, and your customer receives a short, relevant selection rather than a list dump. | E-01, F-03 |
| Hand over | It hands the conversation to a person when it matters, with the full history. | B-12 |
| Learn | You can see where leads came from, how fast they were answered and what was booked. | R-01, R-02, R-05 |

Qualifier attached directly under the loop, not in a page footer:

> Based on agency permissions and configuration. `[Q-2]`

Closing line:

> One system, one record, one place where the whole thing is visible.

**Removed from the first draft.** *Every outcome is measured, and what worked feeds back
into what happens next*, and the closing line *What the agency learns on Friday changes what
the system does on Monday*. Nothing in `PRODUCT_TRUTH.md` §12 describes a feedback loop from
reporting into system behaviour. It was an attractive idea with no evidence, which is
precisely what R3 exists to stop. The loop is presented as six things the system does, not as
a self improving system.

---

**4. What the system runs**
Eyebrow: *The platform*

> ### Not a tool your team has to remember to open.

Body:

> Each part of Nuova does one job properly. Together they behave like one system, because the
> customer is one record rather than one record per tool. Nothing starts over.

Module cards. Name, one line, entitlement label where required, link.

| Module | Homepage line | Matrix | Label |
|---|---|---|---|
| AI Sales Agent | Every enquiry gets an answer, day or night, in the customer's own language. | B-04, B-07 | Included in every paid package |
| Universal CRM | Every message, from every channel, on one record. | G-02 | Included in every paid package |
| Lead Intelligence | Every enquiry qualified, and a priority signal so your team knows where to start. | D-02, D-03 | Included in every paid package |
| Property Matching | Understands what each customer is actually looking for, and sends a short, relevant selection. | F-01, F-03 | Included in every paid package |
| Reporting | See where your leads came from, how fast they were answered and what was booked. | R-01, R-02, R-05 | Included in every paid package |
| Social Growth | Helps create property and social content in your brand voice, and turns genuine engagement into a tracked lead. | C-01, C-06 | Higher package |
| Property Experience | A real panorama for every room, with the real floor plan alongside it. | K-01, K-06 | Higher package |
| Daily Assistant | Ask it who to call today, or why a lead is a priority, and see the reasoning. | I-01, I-06 | Higher package |

**Two rules this grid must obey.**

1. **Voice AI is not in this grid.** V-02 permits voice only in a visually separated future
   section. Putting it in a live module grid is exactly the placement the matrix forbids.
2. **The entitlement label is not optional.** `PRODUCT_TRUTH.md` §5.7 and §17.3 require that
   higher package capabilities are labelled wherever they appear, so no visitor believes
   Social Growth, Property Experience or the Daily Assistant is in the entry package.

Qualifier under the grid: Based on agency permissions and configuration. `[Q-2]`

Under the grid, a separated future line, styled as a quieter register than the grid itself:

> **Voice, coming next.** `[V-02]`

CTA: Explore the platform.

---

**5. Agent productivity**
Eyebrow: *Your team*

> ### Your agents stop administering the pipeline.

Body:

> Most agents spend the first hour of the day working out what happened overnight. Which
> messages came in, which ones matter, who has gone quiet, what was promised to whom.
>
> Nuova gives them somewhere to ask. Who should I call today. Why is this lead a priority.
> Which buyers match this villa. On desktop, on mobile, or by speaking.
> `[I-01]` `[I-05]` `[I-06]` `[I-08]`

Example questions, labelled as examples per the mandatory framing in §6.7. **The first draft
claimed the assistant hands each agent an ordered list of ready clients, which is close to
I-09's rejected *runs your day* and is unevidenced.** Higher package label required.

CTA: Read the module. Links to Daily Assistant.

---

**6. Property experience**
Eyebrow: *What your customer receives*

> ### Room by room, through the real doorways.

Body:

> A serious buyer flying in for a weekend does not want a folder of attachments. They want to
> understand the property before they get on the plane.
>
> A real panorama for every room, floor to ceiling, with the real floor plan alongside it.
> They always know which room they are in and which way they are facing.
> `[K-01]` `[K-02]` `[K-06]` `[K-07]` `[K-08]`
>
> No joystick, no getting lost. Structured navigation by design. `[K-11]`

Higher package label required. **The first draft ended with *tells you what the client looked
at*.** R-12 does approve *see how buyers used the property experience*, but engagement
tracking of a named prospect has a lawful basis question behind it, so the homepage does not
raise it. The module page handles it.

CTA: Read the module.

---

**7. Reporting and control**
Eyebrow: *The whole operation*

> ### For the first time, you can see all of it.

Body:

> See where your leads came from, how fast enquiries were answered, how they qualified and
> what was booked. `[R-01]` `[R-02]` `[R-03]` `[R-05]`
>
> Not an analytics product. Just the answer to the question every owner asks on Monday and
> nobody can currently prove.

**Removed:** *which agents are converting* (R-08, I-07, blocked on **L-11**) and *which
sources are worth what you pay for them* (R-13, which rejects every spend and ROI reference).

CTA: Read the module.

---

**8. Experience Nuova**
Eyebrow: *See it work*

> ### Send it an enquiry. Watch what happens.

Body:

> Type the kind of message your agency gets every day, in any language, and watch Nuova
> read it, answer it, work out how serious it is and decide whether an agent needs to know.
>
> Nothing to install.

Simulation label is mandatory here. See §9.2. **`[S-02]`**

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

> The only question is what happens to it. Book a demo and we will show you Nuova
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
> One system instead of separate tools for messaging, follow up, matching and reporting.
> `[P-03]`

**The count is gone.** The first draft ended *instead of five*. P-03's approved wording avoids
naming a number of tools, and its forbidden column includes naming the tools it replaces.

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
> Nuova keeps it in one place. One customer, one record, across every channel they use. The
> system that answers at midnight is the same system that already knows her three days later.
> Nothing starts over. `[D-01]` `[B-08]`
>
> Nothing is handed over, so nothing is dropped.

D-01 forbids *perfect identity resolution* and *never duplicates*. B-08 forbids *remembers
everything, forever* and *never forgets*. The approved phrasing *nothing starts over* does the
same emotional work without either. **The first draft's closing clause, *the same one that
tells your agent she is ready*, is removed**: no matrix row approves an alerting capability.

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

**BLOCKED as written in the first draft. Rewritten to what the matrix allows.**

> ### One place where the whole relationship lives.

> Every message, from every channel, on one record. Universal across your channels.
> `[G-02]` `[G-10]`
>
> Connect your channels, based on the permissions you hold. `[O-03]` `[Q-2]`

**Removed.** *Nuova sits behind the tools your agency already uses. Your CRM keeps being your
CRM. Everything passes through one system on the way.* Every sentence there is an integration
or coexistence claim. F-07 and F-08 reject all of them, G-11 leaves CRM positioning as an
open owner question, and no integration is evidenced anywhere.

**No portal, CRM or channel brand name and no logo appears on this page or any other**, per
F-06 and F-07, which require the owner to confirm or reject each name individually. That is
`CLAIMS_MATRIX.md` §21 item 3 and it blocks the single most persuasive element a platform
page normally has, which is a logo strip. The page has to earn belief another way, and §2 The
principle is where it does that.

**6. Languages and channels**

> ### Your clients do not all write in the same language.

> On this coast an agency gets a local seller, an international buyer and a family abroad
> asking about the same street in the same afternoon. Nuova speaks to each customer in their
> own language. `[B-07]`

B-07 forbids naming a language count or a language list until each is confirmed, so the
specific nationalities are removed here as they are on the AI Sales Agent page. **OWNER
DECISION:** supply the confirmed language list and both pages get materially stronger.

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
> Nuova answers in seconds rather than hours, in the customer's own language, asks the
> questions your agents would ask, and hands the conversation to a person when it matters.

Matrix: B-05 for the speed framing, B-07 for language, B-12 for the handover. **The first
draft ended this sentence with *keeps following up until the conversation is ready for a
person*. E-05 rejects *until they answer* and every persistence framing.**

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
> Nuova answers day or night, in seconds rather than hours, with something specific about the
> property they asked about rather than a confirmation that their message was received.
> `[B-04]` `[B-05]`
>
> Based on agency permissions and configuration. `[Q-2]`

**3. It asks the right questions**

> ### Qualification that sounds like a person doing their job.

> The first reply is not the point. What matters is what comes back. Nuova asks the two or
> three things your agents would ask, in the order a real conversation would ask them.
> Budget. Timing. Whether they are already in the country. Whether they want to see it this
> week. `[D-02]`
>
> By the time an agent reads the thread, the qualifying is done and the client has not been
> made to fill in a form.

**4. Follow up automation**
Anchor: `#follow-up`
**LEGAL PENDING. This section does not ship until L-01 closes.**

`CLAIMS_MATRIX.md` E-01 is the only follow up row with approved wording, and its verdict is
`LEGAL`, blocked on L-01 (follow up timing and lawful basis). E-02 advanced follow up, E-03
nurturing and E-04 reactivation are all blocked. E-05 rejects persistence framing outright.

**Approved wording, held until L-01 closes:**

> ### Nobody decides to drop a lead. The week just happens.

> If a lead goes quiet, follow up continues automatically, subject to applicable
> communication rules and your own permissions. `[E-01]` `[Q-3]`
>
> You can always see what has been sent and what is due next. `[D-08]`

**Removed from the first draft, and recorded so it is not reintroduced:**

| Removed line | Why |
|---|---|
| "Nuova keeps the thread alive" | E-05. Persistence framing. |
| "comes back at a sensible interval" | E-01. A behavioural description of timing, which is exactly what L-01 blocks. |
| "on a channel the client actually uses" | L-08. Cross channel communication. |
| "The conversation you had already written off is often the one that books a viewing." | **E-04, L-02. Reactivation of older contacts, named in the matrix as the highest risk single capability on the site.** |

**Note for the owner.** Basic follow up is in the confirmed baseline of every paid package
(`PRODUCT_TRUTH.md` §17.2), so the *capability name* may be listed on the Pricing page today
under PK-03. Only its *behavioural description* is blocked. That distinction is worth
understanding, because it means the Pricing page is less blocked than this page is.

**5. It knows when to stop**

> ### The handover is the feature.

> Automation that will not let go is worse than no automation. When a client is ready, or
> asks something that needs a person, or says something a system should not answer, Nuova
> steps back and hands the agent a live conversation with the full history attached. `[B-12]`
>
> Your agents do not inherit a mess. They inherit a client who is already warm.

**6. In every language your clients use**

> ### It answers in the language it was written in.

> On this coast an agency gets a Spanish seller, a northern European buyer and an
> international family asking about the same street in the same afternoon. Nuova speaks to
> each customer in their own language. `[B-07]`

**The language list is removed.** B-07 forbids naming a language count or a language list
until each one is confirmed. The first draft named six. The sentence is stronger without
them, because it describes the reader's actual afternoon rather than a specification.

**OWNER DECISION.** Supply the confirmed language list. Until then no page names one.

**7. What it will not do**

> ### Where we draw the line.

> Nuova runs with configurable customer handling and human oversight. You decide what it
> handles on your agency's behalf and what always goes to a person. `[B-13]` `[Q-4]`
>
> An assistant that oversteps costs more than one that does less.

**Rewritten from the first draft.** The original listed specific guardrails as facts: it does
not negotiate, does not commit the agency, does not invent a property, does not answer legal
questions. Those are safety promises, and B-14 rejects absolute reliability claims while
B-13 forbids *fully controlled*, *cannot make mistakes* and *guaranteed brand safe*. The
approved framing puts the control in the agency's hands, which is both compliant and a
better sales argument.

**OWNER DECISION carried from B-13.** What handling rules exist, and who sets them? Once
that is answered, this section can name the specific boundaries rather than describe the
mechanism. It is the section that makes a sceptical agent believe the rest of the page, so it
is worth unblocking early.

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
> One customer, one record, across every channel they use, with a priority signal so your
> team knows where to start. `[D-01]` `[D-03]`

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
> attached. `[D-01]` `[B-08]`

**3. How Nuova reads intent**

**LEGAL PENDING on L-09.**

> ### It comes out of the conversation, not out of a form.

> Every enquiry is qualified automatically, and Nuova remembers what each customer is looking
> for. `[D-02]` `[D-06]`

**The signal list is removed.** The first draft listed what the system looks for: buyer or
seller, budget and whether it moved, location, timing, whether they asked for a viewing. That
is a scoring and profiling description, and **D-09 blocks any scoring description until L-09
is reviewed**. L-09 covers automated profiling, which under GDPR is a live question when a
system produces a decision about a person.

The two approved sentences above carry the same commercial message without describing the
mechanism. The mechanism section returns when L-09 closes, and it will be a strong section
then, because specificity is this page's best asset.

**4. Priority, so your team knows where to start**
**LEGAL PENDING on L-09.**

> ### Know where to start.

> Each lead carries a priority signal, so your team knows where to start, and works the most
> promising leads first. `[D-03]` `[D-05]`
>
> You can always see what has been sent and what is due next. `[D-08]`

**Every number stays off this page.** D-04 rejects *scored from 1 to 100*, *leads above 80*
and any threshold or scale, and records that those figures on the live site today come from
**the website's own simulation, not the product**. D-03 forbids *predicts which leads will
close* and *deal probability*. D-05 forbids *guarantees you never miss a serious buyer*.

**OWNER DECISION.** Supply the product's real score scale and thresholds, or confirm that
none is published. It is `CLAIMS_MATRIX.md` §21 item 9.

**5. When your team gets told**
**BLOCKED. No matrix row approves an alerting capability.**

The first draft wrote that the owning agent is told immediately on their phone when a client
crosses from interested to ready, with the three things they need before replying. Nothing in
`PRODUCT_TRUTH.md` describes alerting, alert routing or an ownership model, so there is no
row to clear it against, and `CLAIMS_MATRIX.md` §How to use is explicit: a claim not in the
matrix is not approved.

This is a gap in the truth documents rather than a rejection. Hot lead alerting is prominent
in the owner's brief and in `CLAUDE.md`, and it is one of the strongest conversion moments
available. **Requested from the Product Truth instance:** does alerting exist, on which
channel, routed to whom, and under what ownership model?

Until then the page ends at section 4, and D-08 carries the *you can see what is due next*
message.

**6. Works with the CRM you have**

> ### Universal across your channels.

> Every message, from every channel, on one record. The whole relationship in one place, with
> the source it came from, who took over and when. `[G-01]` `[G-02]` `[G-03]` `[G-06]`
>
> Universal across your channels. `[G-10]`

**Rewritten. The first draft was rejected wording twice over.** It said *Nuova keeps its own
record and is built to write back into the CRM your agency already runs on, so your process
stays where it is*. F-07 and F-08 reject every named CRM integration and every compatibility
claim including *works with yours*, and G-11 makes CRM replacement positioning an unanswered
owner question. There is no evidence of any CRM integration.

**G-10 is a precise constraint.** The word *universal* may be used **only** as *universal
across your channels*. Standing alone it implies compatibility with any external CRM, which
is exactly the claim that is rejected.

**OWNER DECISION, and it is a positioning question not a copy question.** Is the Universal
CRM positioned as a replacement for the agency's CRM, or as a layer beside it? Until that is
answered this page cannot address the single most common objection an agency will raise, which
is *we already have a CRM*. It is `CLAIMS_MATRIX.md` §21 items 3 and 6.

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

**Route:** none. **GATE: BLOCKED.** V-01 is an unanswered blocking owner question and every
row in `CLAIMS_MATRIX.md` §9 is `OWNER`, `LEGAL` or `REJECTED`. V-11 additionally holds call
recording and transcription under L-05, which is a Spanish consent matter.

**Page goal.** Own the phone call as a category signal without promising a date.

**Audience.** Owner. Especially owners whose agencies still lose most enquiries by phone.

**Primary message.** The calls nobody in the office can take are still worth something.

**Recommendation: do not build this page yet.**

`CLAIMS_MATRIX.md` §9 rules voice Category 7 on the public website and marks **thirteen of
thirteen rows** as `OWNER`, `LEGAL` or `REJECTED`. V-01 is a blocking owner question. V-02
approves exactly one form of words, *Voice, coming next*, and only inside a visually
separated future section.

A dedicated page is a poor fit for a capability that may be stated in four words. A page
implies availability through its own existence, and a visitor who lands on it from search has
no way to know they are reading about something that is not sold today.

**Therefore:** voice appears as **one separated future block on Platform Overview**, and
nowhere else, until V-01 is answered. No route, no navigation entry, no footer link, no
module card.

**The approved block, in full:**

> **Voice, coming next.** `[V-02]`
>
> Some customers will always ring. It is the enquiry an agency is least able to catch and
> often the one furthest along. Voice is what we are building next. It is not part of what we
> sell today, and we would rather tell you that here than in your third week.

The second paragraph carries no capability claim. It is context and an honest statement of
non availability, which `CLAIMS_MATRIX.md` §0 treats as carrying no capability risk.

**Forbidden here, from the first draft:** *The call your agency could not take*, *Nuova
answers the phone when the office cannot*, *Nuova is learning to pick up the phone*, and
*Today Nuova tells your agent about the call*. The first two are V-03. The third and fourth
are present tense wording, which V-02 forbids, and the fourth also asserts a live alerting
capability on calls that nothing evidences.

**No date, no quarter, no year, and no notify form**, because CTA-14 has no destination and
`INTEGRATION_CONTRACT.md` §11 has no target system. A *tell me when this is ready* button
that posts nowhere is a P0 finding.

**If V-01 comes back as live**, the page below becomes buildable. The structure is kept for
that case, and every section stays blocked until then.

**Primary CTA (future block only).** Book a demo.

**Section structure, kept only for the case where V-01 comes back live.**

1. Hero, with the future label
2. Why the phone still matters here
3. What it does
4. What happens to the call afterwards
5. Where it stops
6. Recording, consent and retention
7. Final conversion

**Only one section is drafted, because only one carries no capability claim.**

**2. Why the phone still matters here**

> ### Some customers will always ring.

> A buyer standing outside a property calls. A seller who has decided to move this year
> calls. The enquiries that arrive by phone tend to be the ones furthest along, and they are
> the ones an agency is least able to catch.

Safe in every state. It is context about the market, not a claim about the product, and it is
the paragraph that earns the separated future block on Platform Overview.

**Sections 3, 4, 5 and 6 are not drafted.** V-03 through V-10 are all `OWNER` and blocked
behind V-01, so any wording written now would be written against an unknown product. **Section
6 is additionally `LEGAL` under V-11 and L-05:** whether calls are recorded, whether the caller
is told, and how long audio is retained are Spanish consent questions, and V-04 separately
rejects *indistinguishable from a human* and *callers cannot tell*.

**Removed from the first draft.** *Voice is in development and is not part of what we sell
today. We would rather tell you that here than in the third week of your trial.* The sentiment
is right and it survives in the Platform Overview block in §6.5. The wording does not: **it
refers to a trial, and T-01 forbids trial wording in every form**, including a passing mention
inside another sentence. That is exactly how blocked claims get onto a site.

**Objections answered.** Is this real yet, answered by the future block itself rather than by
a page. Will it sound like a robot, unanswerable in copy and rejected as a claim under V-04.

**Trust requirements.** No launch date, quarter or year. No phone number, since V-12 forbids
inventing one and none exists. No call handling statistic, rejected under V-13.

**Cross links.** From the Platform Overview future block only.

**Mobile copy notes.** Not applicable while there is no page. In the Platform Overview future
block, the label sits with the heading and is never separated from it by a scroll.

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
> The right ones, not all of them.

**Hero subheadline.**
> Nuova understands what each customer is actually looking for, matches against your own or
> agency authorised property sources, and sends a short, relevant selection rather than a
> list dump. `[F-01]` `[F-02]` `[F-03]`

**The number is gone.** The first draft led with *Three properties worth the flight*, and
repeated *three* in the body. F-03 forbids a fixed count unless the owner confirms the
selection size is fixed. It is a good headline and it cannot ship as written.

**OWNER DECISION carried from F-03.** Is the selection a fixed count or variable? If it is
genuinely fixed at three, the original headline is available and it is the stronger line.

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
> agent would. `[F-01]`

**3. Matching against your portfolio**

> ### Your properties, not the whole market.

> Matching runs against your own or agency authorised property sources, so what goes out is
> something you can actually show. `[F-02]`

F-02 forbids *searches the whole market*, *every listing in Spain* and *all portals*. The
headline above deliberately says the opposite, and it is a better sales argument than breadth
would be.

**4. What the client receives**

> ### A short list, and a reason for each one.

> Your customer receives a short, relevant selection, not a list dump. Serious buyers do not
> want more options. They want fewer, chosen well, by someone who understood them. `[F-03]`
>
> Your agents see the wider set internally. `[F-04]`

The second line is worth keeping. F-04 approves it, and it answers the objection an agent has
immediately, which is *what happened to the rest of my stock*.

**5. It keeps matching after the first send**
**BLOCKED. This section does not ship.**

The first draft built this section on a property being listed on a Tuesday and matched to a
customer who described it months earlier, and argued it was the strongest reason to buy the
platform. It is **E-04, blocked under L-02**, which `CLAIMS_MATRIX.md` names as the highest
risk single capability on the site. Contacting an older customer about new inventory is
reactivation, and it carries a lawful basis question that copy cannot answer.

The section is not softened or requalified. It is removed until L-02 closes, and section 4
becomes the final content section of the page.

**OWNER AND LEGAL.** If L-02 clears, this is the section to write first. It is the one
behaviour on the site that a point tool cannot imitate, and it is worth the legal work.

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

**Primary message.** An agent can ask the system the questions they would ask a good
assistant, and get an answer with the reasoning attached.

**Hero headline.**
> Ask it what you would ask a good assistant.

**Hero subheadline.**
> Who should I call today. Why is this lead a priority. Which buyers match this villa. On
> desktop, on mobile, or by speaking. `[I-01]` `[I-05]` `[I-06]` `[I-08]`

**Mandatory framing, and this is the whole page.** `CLAIMS_MATRIX.md` §10 note is explicit:
until the owner confirms which questions genuinely work, the assistant may be presented
**only as a named capability with illustrative examples**, never as a demonstrated working
command set. Every example question on this page therefore carries a visible *example* label,
and the page never implies the set is complete or guaranteed.

**Entitlement label, mandatory:** Higher package.

**Rewritten from the first draft.** The original headline was *The first hour of the day,
already done*, with a subheadline promising an ordered list of clients handed to each agent.
That is close to I-09, which rejects *runs your day*, and it presented an unevidenced
behaviour as fact. The question frame is both compliant and better, because I-06 is a genuine
strength: asking *why is this lead a priority* and seeing the reasoning is explainability, and
almost nothing in this category offers it.

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

**3. What you can ask it**

> ### Questions, not menus.

Each rendered as an example, with a visible *Example* label per §9.2:

| Example question | Matrix |
|---|---|
| Who should I call today? | I-01 |
| Prepare me for my next viewing. | I-02 |
| Which buyers match this villa? | I-05 |
| Why is this lead a priority? | I-06 |

> Ask why a lead is a priority, and see the reasoning. `[I-06]`
>
> On desktop, on mobile, and by speaking. `[I-08]`

**Removed from the first draft.** *The ones who went quiet and are worth one more attempt.*
That is **E-04 reactivation of older contacts, blocked under L-02**, and it had slipped onto
this page as well as onto Property Matching. It is the same claim wearing different clothes,
which is precisely why the register in §13 lists it against every page it touched.

**4. It drafts, you confirm**

> ### Nothing goes out without you.

> Draft and send, with your confirmation. `[I-03]` `[I-04]`

I-03 forbids *sends on your behalf* without a confirmation step. The confirmation is not a
caveat here, it is the reason a manager will allow this near their client relationships.

**OWNER DECISION.** Confirm the confirmation step actually exists. If it does not, this
section is deleted rather than softened.

**5. It is not surveillance**
**HELD in part. L-11.**

> ### Built for the agent, not against them.

> This is not a monitoring tool and it is not a scoreboard.

That much is a statement about what the product does not do, which carries no capability risk
under `CLAIMS_MATRIX.md` §0.

**But the page may not go further.** I-07, *how is my team doing*, is `LEGAL` on **L-11**, and
its forbidden column names *track your agents*, *monitor performance* and *see who is
underperforming*. The page must not answer the manager's unspoken question by hinting at
monitoring, and it must not promise the absence of monitoring as a feature of a capability
that has not been legally reviewed. Two short sentences, then move on.

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
**GATE: OPEN for sections 1 to 4 and 6. HELD for section 5** (C-06 lead capture, blocked on
L-07). **Upgraded from EMBARGOED.** The first draft treated this module as undefined.
`PRODUCT_TRUTH.md` §5 defines nine capabilities and one explicit exclusion, and
`CLAIMS_MATRIX.md` §4 approves five of them with qualifiers.

**Page goal.** Extend the story from *handle the enquiries you get* to *be present where they
start*, without turning Nuova into something an agency owner would not trust with their
public voice.

**Audience.** Owner and marketing lead.

**Primary message.** Your agency stays present and responsive in public, deliberately and
under your brand, and a genuine enquiry becomes a conversation in the same place as every
other one.

**Hero headline.**
> Present in public. Deliberately restrained.

**Hero subheadline.**
> Nuova helps create property and social content in your brand voice, publishes where your
> permissions allow, and moves a genuine enquiry from a comment into a private conversation.
> `[C-01]` `[C-02]` `[C-04]`

**Primary CTA.** Book a demo. **Secondary CTA.** Explore the platform.

**Entitlement label, mandatory wherever this module appears:** Higher package.
Required by `PRODUCT_TRUTH.md` §5.7 so no visitor believes it is in the entry package.

**Section order.**

1. Hero, with entitlement label
2. Content in your voice
3. Comments are where agencies actually lose people
4. Built to protect your accounts
5. From engagement to a tracked lead. **HELD, L-07**
6. What we will not do
7. Final conversion

**Section headlines and body copy.**

**2. Content in your voice**

> ### Posts that sound like your agency wrote them.

> Nuova helps create property and social content in your brand voice, consistent across the
> languages your customers use. `[C-01]` `[C-07]`
>
> Scheduling and publishing happen where the platform and your own permissions allow it.
> `[C-02]` `[Q-1]` `[Q-2]`

**OWNER DECISION carried from C-01 and §5.8.** Does content creation produce text only, or
images and video too, and is there an approval step before anything is published? The second
question is the first thing an agency owner will ask, and the page is materially weaker until
it can be answered on the page itself.

**3. Comments are where agencies actually lose people**

> ### A real question, under a post, at nine at night.

> Someone asks whether a property is still available, in a comment, on a Sunday. In most
> agencies that sits in a notifications tab until it does not matter any more.
>
> Nuova replies where permitted, and moves a genuine enquiry from a comment into a private
> conversation. `[C-03]` `[C-04]` `[Q-1]`

The first paragraph carries no capability claim and is the most recognisable moment on the
page. Keep it.

**4. Built to protect your accounts**

> ### Deliberately restrained. Built to protect your accounts, not to farm engagement.
> `[C-08]`

> Automated social behaviour is where most tools in this category get their customers into
> trouble. Nuova is built the other way round, on purpose.
>
> Platform rules change, and they change outside anyone's control. What is permitted is
> configured per agency, and what is not permitted does not happen.

This section is the strongest one on the page. C-08 is approved wording, it is a genuine
differentiator, and restraint is exactly what a serious agency owner wants to hear about
their own brand accounts. **Do not bury it below the feature sections.**

**5. From engagement to a tracked lead**
**HELD. Does not ship until L-07 closes.**

C-06 approves *social engagement becomes a tracked lead, where permitted*, but its verdict is
`LEGAL` on L-07, consents and controller and processor roles. C-05, continuing the
conversation on WhatsApp, is separately blocked on L-08.

Approved wording, held:

> Social engagement becomes a tracked lead, where permitted. `[C-06]` `[Q-1]`
>
> Every lead carries the campaign and source it came from. `[A-06]`

**Strategic note.** This section is the reason the module belongs inside Nuova rather than in
a social tool, because it is the point where acquisition and handling become the same system.
It is also the most legally exposed section on the page. Write it the day L-07 closes, and
not before.

**6. What we will not do**

> ### The things we deliberately do not build.

> No mass messaging. No bulk outreach. No cold direct messages. No automated follow requests.
> Nothing that treats your agency's accounts as something to farm.

Statements about what the product does not do carry no capability risk under
`CLAIMS_MATRIX.md` §0, so this section is plainly approvable, and it converts. It is also the
honest reading of C-09 and C-10.

**Never on this page, in any wording:** Facebook Group automation, excluded by the owner and
`REJECTED` under C-09, including every community engagement euphemism. Advertising budget
optimisation, excluded under A-07, including *optimises your ad spend*, *improves your
campaigns* and *reduces cost per lead*. Any reach, follower, engagement or social lead volume
figure, `REJECTED` under C-11.

**Objections answered.** Something will go out under my brand that I did not approve (section
2, once the approval question is answered, and section 4). We will get our accounts
restricted (section 4). This is a growth hacking tool (section 6). Which platforms (blocked,
§5.8 question 1).

**Trust requirements.** Entitlement label in the hero. Not one number anywhere. No platform
logos until the owner confirms which platforms and under which account permissions. The
approval question answered on the page as soon as it is answerable.

**Cross links.** Lead Intelligence, Reporting, Platform Overview.

**Mobile copy notes.** Sections 4 and 6 are the two that must survive on a phone, because
they are the trust sections and this is the module an owner is most cautious about. The
feature sections can collapse. The entitlement label sits directly under the hero headline on
mobile, not below the fold.

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
> See where your leads came from, how fast enquiries were answered, how they qualified and
> what was booked. `[R-01]` `[R-02]` `[R-03]` `[R-05]`

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

> ### What you can actually see.

Only the approved rows, each stated in the matrix's own words:

| Line | Matrix |
|---|---|
| See where your leads come from. | R-01 |
| See how fast enquiries were answered. | R-02 |
| See how leads qualified. | R-03, L-09 dependent |
| See your priority leads. | R-04, L-09 dependent |
| See what was booked. | R-05 |
| See how matching performed. | R-07 |
| **Supported conversions.** | R-06 |
| See how buyers used the property experience. | R-12 |

**R-06 is the most important row on this page and the easiest to break.** *Supported
conversions* is the owner's exact wording and it is preserved exactly. It may **never** be
shortened to *conversions*, and *conversions we generated* and *deals closed by Nuova* are
forbidden. Nuova supports a conversion, it does not make one, and the whole credibility of
this page rests on that distinction being visible.

**4. By source, and by outcome**

> ### Two ways to cut the same week.

> By source, so you can see where your leads came from. By outcome, so a booked viewing
> counts for more than a reply. `[R-01]` `[R-05]`

**By agent is removed, and this is a legal removal not a stylistic one.** The first draft
opened with *by agent, so you can see who is converting and who needs help rather than who
shouts loudest in the meeting*. R-08 team workload is `LEGAL` on **L-11, team performance
visibility**, and I-07 explicitly forbids *track your agents*, *monitor performance* and *see
who is underperforming*. Employee monitoring has its own consultation requirements in Spain.

When L-11 closes, the approved wording is R-08's: *see how work is distributed*. That is a
workload frame, not a ranking frame, and the difference is the entire point.

**Also removed:** *so you know what your portal spend is actually buying*. R-13 rejects every
spend, CPL, ROAS, ROI, revenue, commission and closing rate reference, in every form.

**5. What you do with it**
**REMOVED. No evidence.**

The first draft closed with *what Reporting shows changes what the system does next*, a
self improving feedback loop. Nothing in `PRODUCT_TRUTH.md` §12 describes one. It was the
same unevidenced idea that was removed from the homepage loop, and it is removed here for the
same reason. The page ends at section 4 and then converts.

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
**GATE: OPEN**, except the square metres section, which is `LEGAL` on L-12.
**Upgraded from EMBARGOED, and this was the largest error in the first draft.**
`PRODUCT_TRUTH.md` §13 defines twelve capabilities and one deliberate product boundary, and
`CLAIMS_MATRIX.md` §12 approves eleven of them. This is one of the best specified modules in
the product, not the least.

**Page goal.** Own the part of the agency the buyer actually sees. This is the most visual
page on the site and the easiest one to make genuinely beautiful, because the subject matter
is architecture.

**Audience.** Owner and marketing lead, and indirectly the end buyer, who will be shown this
page by an agency deciding whether to buy.

**Primary message.** A buyer moves through the property room by room, always knowing where
they are, with the real layout beside them.

**Hero headline.**
> Room by room, through the real doorways.

**Hero subheadline.**
> A real panorama for every room, floor to ceiling, with the real floor plan alongside it.
> Your buyer always knows which room they are in and which way they are facing.
> `[K-01]` `[K-02]` `[K-06]` `[K-07]` `[K-08]`

**Primary CTA.** Book a demo. **Secondary CTA.** Explore the platform.

**Entitlement label, mandatory:** Higher package. Capacity depends on the package
(`PRODUCT_TRUTH.md` §13.2). **No quota number is published**, per PK-05.

**Section order.**

1. Hero, with entitlement label
2. What most agencies send
3. A real panorama for every room
4. You always know where you are
5. Structured on purpose
6. The floor plan and the measurements. **HELD in part, L-12**
7. Final conversion

**Section headlines and body copy.**

**2. What most agencies send**

> ### Twenty photographs in an unclear order.

> A serious buyer flying in for a weekend gets a gallery. They cannot tell which room is
> next to which, how the light moves through it, or what they are actually looking at.

No capability claim. Safe, and it sets up everything below.

**3. A real panorama for every room**

> ### Every room, floor to ceiling.

> A real panorama for every room, as standard. Full view, floor to ceiling. Every room named,
> across multiple floors, with real stair transitions between them.
> `[K-01]` `[K-02]` `[K-04]` `[K-09]` `[K-10]`
>
> Requires your agency to supply the panoramas. `[Q]`

K-01 forbids *unlimited rooms* and *every property, automatically*. The qualifier is not
optional, and it is also honest about what onboarding involves.

**OWNER DECISION carried from §13.9.** Who produces the panoramas, the agency, NuovaSolution
or a third party? The answer changes this section from a requirement into a service, and that
is a materially different sale.

**4. You always know where you are**

> ### Move between rooms through the real doorways.

> Navigation follows the real doors, so the layout you experience is the layout of the
> building. You always know which room you are in, and which way you are facing.
> `[K-03]` `[K-07]` `[K-08]`

**5. Structured on purpose**

> ### No joystick. No getting lost.

> Movement is deliberately structured. This is a design decision, not a limitation. Free
> roam viewers lose people in corridors, and a buyer who gets disoriented closes the tab.
> `[K-11]`

K-11 is the only plain `APPROVED` row in this section, because it describes a boundary rather
than a capability. `PRODUCT_TRUTH.md` §13.4 asks explicitly that it be stated as an
intentional choice. It is also the section that stops this reading as a commodity tour
product.

**Never on this page:** *virtual tour*, *3D tour*, *walkthrough*, *metaverse*. All four are
`REJECTED` under K-13 because they imply free movement and directly contradict K-11. This
matters for SEO too, since those are the obvious keywords and they are not available.

**6. The floor plan and the measurements**
**Floor plan: OPEN. Square metres: HELD on L-12.**

> ### The real floor plan, alongside the rooms. `[K-06]`

The floor plan line ships. **The square metres line does not.**

K-05 is the sharpest legal exposure in this section. `PRODUCT_TRUTH.md` §13.6 records that
published property measurements in Spain carry consumer protection consequences and that
Andalusian regional rules on property marketing apply. Three rules follow:

1. Square metres may be described as *from a verified source* **only if the product actually
   enforces sourcing**, meaning an agency cannot type an arbitrary number.
2. The site may **never** state or imply that NuovaSolution verifies, certifies or guarantees
   any measurement. Forbidden: *verified by NuovaSolution*, *guaranteed accurate*, *certified
   measurements*.
3. The word *verified* must be defined on the page, or replaced with the precise mechanism,
   for example *taken from the agency's official documentation*.

**If sourcing is not technically enforced, K-05 is dropped from public copy entirely.** That
is an owner answer, not a copy decision, and it is question 11 in `CLAIMS_MATRIX.md` §21.

**Objections answered.** Our photographers do not shoot panoramas (section 3, and the owner
decision above). Buyers will stop coming to viewings (K-14 forbids claiming it replaces a
viewing, so the page must not raise the idea at all). It will be disorienting like every
other tour product (section 5).

**Trust requirements.** Entitlement label in the hero. No quota number, and no visual
implication of one such as bars, dots or comparative heights, per PK-05. No viewings saved,
engagement or uplift figure, `REJECTED` under K-15. Any property shown is a real property used
with written permission, or clearly marked illustrative, per K-16 and §13.8. No named capture
hardware or service.

**Cross links.** Property Matching, Reporting for R-12, Pricing.

**Mobile copy notes.** This is the most media heavy page on the site and the one most likely
to break the LCP budget on a phone. The hero carries a poster image with reserved dimensions,
never an auto playing panorama. Sections 3 to 5 each show one still with its caption rather
than an embedded viewer. The interactive experience loads on demand, behind an explicit tap,
never on scroll.

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
> Three packages, built around the size of the operation they run. Every paid package
> includes the same working baseline. `[PK-01]` `[PK-03]`

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

> ### Every paid package runs the same working baseline.

> Every paid package includes: CRM · Lead Engine · Automatic Replies · Basic Follow up ·
> Property Matching · Core Reporting. `[PK-03]`

That list is the exact approved wording from PK-03 and it may ship today as **names**. What
each one *does* may only be described within what the matrix approves elsewhere, which is why
this section lists and does not explain.

**Corrected from the first draft, and this was a factual error.** The original said *Every
tier runs the whole loop. We do not hold back the part that answers your clients and sell it
back to you later.* `PRODUCT_TRUTH.md` §17.3 records the opposite: Voice, the Daily
Assistant, Social Growth, Advanced Follow up, Advanced Reporting, Property Experience and
Paid Acquisition are higher package capabilities. The original paragraph was an attractive
pricing philosophy that contradicted the product, and publishing it would have been a P0
finding under R3.

**4. What changes between tiers**
**BLOCKED. PK-04 and PK-05.**

Nothing may be placed in a package without an explicit owner mapping, and **no number exists
for any limit or quota**. PK-05 additionally forbids implying a number through visual devices:
bars, dots, *up to* phrasing, or comparative column heights. A comparison table that looks
quantitative without carrying a figure is still a P0 finding.

Until the mapping arrives, the page states only that higher packages add further
capabilities, and names them individually once the owner has confirmed each mapping.

**OWNER DECISION.** Supply the feature to package mapping (`CLAIMS_MATRIX.md` §21 item 5),
and confirm whether *Core Reporting* or *Basic Reporting* is the public name for the baseline
line item.

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

> ### Nobody was in the office.

> In a real agency that message arrives at 23:40 on a Sunday, and the reply goes out on
> Monday morning.

**The number is gone.** The first draft opened this section with *That took four seconds*.
B-06 forbids every numeric response time, and S-04 separately forbids publishing a timing
taken from the website's own simulation, which is exactly where that figure came from. The
second sentence describes the status quo in an agency without Nuova, so it carries no product
claim at all and is the more persuasive line.

**5. Conversion block**

> ### That was one enquiry. You get hundreds.

> Book a demo and we will run this on your own market, with the kind of messages your
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

**Only one variant is drafted.** The first draft carried a trial variant. **T-01 forbids
*free trial*, *start free*, *try free*, *start your 14 day free trial* and *no credit card
required* in every wording**, and T-02 additionally records that the live site's current
*Start for free* routing to a demo booking is a rejected pattern that must not be carried
over. Drafting trial copy now only creates something that can be shipped by accident.

**Hero headline.**
> What happens after the call.

**Hero subheadline.**
> You set up your agency yourself. No developers needed. `[O-01]` `[O-08]`

**O-09 is a direct rejection of wording this site publishes today.** *No setup needed* is
inaccurate for a platform that requires channel, branding and inventory configuration, and it
is live on the current homepage. O-08's *no developers needed* is the approved claim and it is
the honest one. O-10 separately rejects every onboarding duration: *live in a day*, *up and
running in 15 minutes*, and every figure.

**GATE note.** O-01 and O-02 are `OWNER`: it is not confirmed that a self service setup flow
exists at all, or where it lives. If setup is done by NuovaSolution rather than by the agency,
this page changes from a self service page into a service page, which is a materially
different and possibly better sale.

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

> ### No developers needed.

> Set up your agency yourself. Add your team and set their roles. Connect your channels,
> based on the permissions you hold. Your branding goes on every message that leaves.
> `[O-01]` `[O-02]` `[O-03]` `[N-01]` `[Q-2]`

**Removed.** *You do not have to move your CRM, retrain your team or change where your
enquiries arrive.* Every clause is a coexistence or integration claim, rejected under F-07,
F-08 and G-11. This was the third place the same rejected idea had appeared, after the
homepage hero and the Platform Overview.

**OWNER DECISION carried from O-02.** Which roles exist? Naming roles that are not confirmed
is forbidden, so the sentence stays general until the list arrives.

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

| Stage | Module | Nav descriptor | Label |
|---|---|---|---|
| Answer | AI Sales Agent | Answered day or night | Every paid package |
| Understand | Lead Intelligence | Qualified, and prioritised | Every paid package |
| Understand | Universal CRM | One record per customer | Every paid package |
| Advance | Property Matching | A short, relevant selection | Every paid package |
| Advance | Property Experience | Room by room, real doorways | Higher package |
| Attract | Social Growth | Present in public, restrained | Higher package |
| Hand over | Daily Assistant | Ask it, and see the reasoning | Higher package |
| Learn | Reporting | Sources, speed, what was booked | Every paid package |

**Voice AI is not in the navigation.** V-02 permits it only inside a visually separated
future section. A navigation entry is the strongest availability signal a site has, and it is
the placement the matrix forbids most directly.

**The entitlement label belongs in the dropdown**, not only on the page. `PRODUCT_TRUTH.md`
§5.7 requires it wherever the module appears, and the navigation is where a visitor forms
their first idea of what they are buying.

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
| **Platform** | Platform Overview, AI Sales Agent, Lead Intelligence, Universal CRM, Property Matching, Property Experience, Social Growth, Daily Assistant, Reporting. **No Voice AI entry** (V-02). Blocked modules omitted rather than linked to a pending page. |
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
| Module page demonstration | We are filming this module properly rather than showing you a mockup. Book a demo and we will walk you through it live. | Estamos grabando este módulo como toca, en lugar de enseñarte un montaje. Reserva una demo y te lo enseñamos en directo. |
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

Two different label systems are needed and the first draft conflated them.

**A. Future capability label.** Only one form of words is approved, V-02's:

| EN | ES | Where |
|---|---|---|
| **Voice, coming next** | **Voice, muy pronto** | Only inside a visually separated future section. Never in a live module list. |

**Banned:** *Launching Q3*, *Beta* as a decorative badge, any date, quarter or year, and any
present tense description of a future capability.

**B. Entitlement label.** Required by `PRODUCT_TRUTH.md` §5.7 and §17.3 wherever a higher
package capability appears, so no visitor believes it is in the entry package.

| EN | ES | Applies to |
|---|---|---|
| Included in every paid package | Incluido en todos los paquetes | CRM, Lead Engine, Automatic Replies, Basic Follow up, Property Matching, Core Reporting `[PK-03]` |
| Higher package | Paquete superior | Social Growth, Property Experience, Daily Assistant, and anything else the owner maps under PK-04 |

**Rule.** A label is not enough on its own. Any page carrying a future label also carries a
sentence saying plainly what is and is not available today. See §6.5 for the pattern.

**No entitlement label may imply a number.** PK-05 forbids implying a limit or quota through
*up to* phrasing or through visual devices such as bars, dots or comparative column heights.

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
| Client data ownership | *(Blocked. B-15 and X-08 reject every security, encryption, privacy and GDPR claim, and N-03 rejects "your data is separate and secure". L-14 records that the site's privacy policy is itself materially incomplete and launch blocking.)* | |
| Agency branding on outgoing messages | Every message goes out under your brand: your logo, your banner, your signature. In your agency's voice. `[N-01]` `[N-02]` | Cada mensaje sale con tu marca: tu logotipo, tu firma, tu identidad. Con la voz de tu agencia. |
| Product invisible to the end customer | Your customers hear from your agency, under your brand. `[P-04]` | Tus clientes reciben la respuesta de tu agencia, con tu marca. |
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
| Do we have to change our CRM? | *(Blocked. G-11 leaves CRM replacement positioning as an open owner question, and F-07 rejects every compatibility claim. This is the most common objection an agency will raise and the site currently cannot answer it. Highest value unblock on the page.)* | Lead Intelligence, Onboarding |
| Will our clients know they are talking to a system? | *(Blocked. Legal and product decision.)* | AI Sales Agent |
| What happens when a customer asks something it should not answer? | It hands the conversation to a person when it matters, with the full history. `[B-12]` | AI Sales Agent |
| How long does setup take? | *(Blocked. OWNER DECISION.)* | Onboarding |
| What does it cost? | It depends on how many offices and agents you are running. We tell you on the call. | Pricing |
| Does it work in our customers' languages? | It speaks to each customer in their own language. `[B-07]` | AI Sales Agent |
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
> Book a demo. We will show you Nuova handling the kind of messages your agency actually
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

### 11.3b The qualifier bank, final Spanish wording

`CLAIMS_MATRIX.md` §20 supplies five approved qualifiers with Spanish marked *draft, needs
native review*, and states that **final wording belongs to this document**. Below is that
final wording.

The matrix's Spanish is structurally correct and reads translated. The problem in every case
is the same: Spanish legal and commercial register prefers a verb where English uses a noun
phrase, and the matrix drafts are noun phrases carried over from English.

| # | English | Matrix ES draft | **Final ES** | Why it changed |
|---|---|---|---|---|
| Q-1 | Where permitted | Donde esté permitido | **Donde la plataforma lo permita** | *Donde esté permitido* is vague about who permits. Naming the platform is more precise and more honest, since this is exactly what changes outside anyone's control. |
| Q-2 | Based on agency permissions and configuration | Según los permisos y la configuración de la agencia | **Según los permisos y la configuración de tu agencia** | *Tu* keeps the owner register consistent with the rest of the site. *La agencia* reads like a third party. |
| Q-3 | Subject to applicable communication rules | Sujeto a las normas de comunicación aplicables | **Conforme a la normativa de comunicación aplicable** | *Normativa* is the standard Spanish term for a regulatory framework. *Normas* reads like house rules. *Conforme a* is the register a Spanish legal reader expects. |
| Q-4 | With configurable customer handling and human oversight | Con gestión de clientes configurable y supervisión humana | **Con supervisión humana y reglas de atención que defines tú** | The matrix draft is accurate and inert. Making the agency the subject turns a hedge into a selling point, which is what this qualifier actually is. |
| Q-5 | Availability depends on channel configuration | La disponibilidad depende de la configuración de canales | **Disponible según los canales que tengas conectados** | Positive construction. The Spanish draft leads with *disponibilidad depende*, which reads as a warning before the reader knows what is on offer. |

**Placement rule, both languages.** A qualifier attaches to the claim it qualifies, in the
same visual block, at readable size. `CLAIMS_MATRIX.md` §20 is explicit that a blanket footer
disclaimer is not acceptable, and §20's closing line matters as much as the bank itself:

> A qualifier narrows a claim. It does not rescue an unverified one.

Status 6 and 7 capabilities are not made publishable by adding a hedge, in either language.

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
| Homepage | Nuova. The operating layer for real estate agencies | Every enquiry gets an answer, day or night, in the customer's own language, understood and carried forward by one system. |
| Platform | The Nuova platform for real estate agencies | One system instead of separate tools for messaging, follow up, matching and reporting. |
| AI Sales Agent | AI Sales Agent for real estate agencies | Every enquiry gets an answer, day or night, in the customer's own language, and goes to a person when it matters. |
| Lead Intelligence | Lead intelligence for real estate agencies | One customer, one record, across every channel they use, with a priority signal so your team knows where to start. |
| Universal CRM | Universal CRM for real estate agencies | Every message, from every channel, on one record. The whole relationship in one place. |
| Property Matching | Property matching for real estate agencies | Understands what each customer is looking for and sends a short, relevant selection instead of a list dump. |
| Property Experience | Interactive property experience for agencies | A real panorama for every room, floor to ceiling, with the real floor plan alongside it. |
| Social Growth | Social growth for real estate agencies | Content in your brand voice, published where permitted, and comments that turn into real conversations. |
| Daily Assistant | The Nuova daily assistant for agents | Ask who to call today, or why a lead is a priority, and see the reasoning. |
| Reporting | Reporting for real estate agencies | See where your leads came from, how fast enquiries were answered and what was booked. |
| Solutions | Nuova by outcome, role and agency size | Start with what is going wrong. Find the part of Nuova that addresses it. |
| Pricing | Nuova pricing for real estate agencies | Three packages, built around the size of the operation they run. One call, one recommendation. |
| Experience Nuova | See Nuova handle a real enquiry | Send it the kind of message your agency gets every day and watch what happens. Nothing to install. |
| Onboarding | Getting started with Nuova | What happens after the call, and what setting up your agency actually involves. |

**No Voice AI metadata**, because there is no Voice AI route (V-02).

**Two SEO consequences worth stating plainly to the owner.** K-13 rejects *virtual tour*,
*3D tour*, *walkthrough* and *metaverse*, which are the obvious high volume keywords for the
Property Experience page. F-06 and F-07 reject every portal and CRM name, which removes the
usual *integrates with* long tail across the whole site. Both are correct calls and both cost
real search traffic. That trade is the owner's to accept, and it should be made knowingly
rather than discovered later.

ES titles and descriptions are written in the second pass, natively, not translated.
`hreflang` pairs are an implementation matter recorded in audit finding A-04.

---

## 13. Claims compliance register

**Superseded.** The first draft carried its own C01 to C34 claim IDs because no matrix
existed. `CLAIMS_MATRIX.md` now provides roughly 140 rows with verdicts, so private IDs would
create a second, competing register. They are replaced by matrix IDs throughout this document.

**This table is the audit path.** For any sentence on the site, find its page here, read the
matrix rows it depends on, and check those rows verdicts. Nothing ships whose rows are not
`APPROVED` or `APPROVED-Q` with their owner and legal dependencies closed.

| Page | Depends on | Verdict state | Blocked by |
|---|---|---|---|
| Homepage | P-02, P-03, A-04, A-06, B-04, B-07, D-01, D-03, E-01, F-01, F-03, B-12, R-01, R-02, R-05 | Mixed | E-01 on L-01. Sections gated per module. |
| Platform Overview | P-01, P-02, P-03, G-02, G-10, O-03, B-07, D-01, B-08 | APPROVED / APPROVED-Q | Security section held on L-14. |
| AI Sales Agent | B-04, B-05, B-07, B-12, B-13, D-02 | APPROVED-Q | Follow up section on L-01. Qualification on L-09. |
| Lead Intelligence and CRM | D-01, D-02, D-03, D-05, D-06, D-08, G-01, G-02, G-03, G-06, G-10 | APPROVED-Q | L-09 throughout. Alerting has no matrix row at all. CRM positioning on G-11. |
| Voice AI | V-02 only | OWNER | V-01 blocking. No page ships. |
| Property Matching | F-01, F-02, F-03, F-04 | APPROVED-Q | Fixed count on F-03. Reverse matching on E-04 and L-02. |
| Daily Assistant | I-01, I-02, I-03, I-04, I-05, I-06, I-08 | **OWNER, every row** | Illustrative examples only. I-07 on L-11. |
| Social Growth | C-01, C-02, C-03, C-04, C-07, C-08, A-06 | APPROVED-Q | Lead capture on L-07. WhatsApp continuation on L-08. |
| Reporting | R-01, R-02, R-03, R-04, R-05, R-06, R-07, R-12, R-15 | APPROVED-Q | R-08 on L-11. R-03 and R-04 on L-09. |
| Property Experience | K-01, K-02, K-03, K-04, K-06, K-07, K-08, K-09, K-10, K-11, K-12, K-16 | APPROVED / APPROVED-Q | Square metres K-05 on L-12. |
| Solutions and Outcomes | Inherits every module row it links to | Mixed | A row may not be offered as an answer while its module is blocked. |
| Pricing | PK-01, PK-03, PK-07 | APPROVED / APPROVED-Q | PK-02 names, PK-04 mapping, PK-05 limits, PK-06 prices. |
| Experience Nuova | CTA-3, S-02, S-03, S-05 | OWNER | Disclosure wording is an owner decision. |
| Onboarding | O-01, O-02, O-03, O-08, N-01 | OWNER / APPROVED-Q | O-09 and O-10 reject the current site wording. |
| Navigation and footer | CTA-2, CTA-6, P-02 | Mixed | Log in on CTA-6. Voice absent per V-02. |
| Form library | A-04b, B-03b | **P0 OWNER** | No submission path exists. No form ships. |
| Trust and compliance | B-15, X-08, L-14 | REJECTED / LEGAL | Privacy policy is materially incomplete and launch blocking. |

### 13.1 Claims this document requested and the matrix does not cover

Gaps rather than rejections. Each is a request to the Product Truth instance.

| Requested claim | Why it matters | Where it was needed |
|---|---|---|
| **Hot lead alerting.** Does the product alert an owning agent when a lead becomes ready, on which channel, routed how? | Prominent in the owner brief and in `CLAUDE.md`, and one of the strongest conversion moments available. No matrix row exists, so it cannot be written. | Lead Intelligence §5, homepage, Daily Assistant |
| **Reply specificity.** Does the first reply reference real listing data, or is it generic? | The difference between an autoresponder and a sales agent. B-04 covers that a reply happens, not what is in it. | AI Sales Agent §2 |
| **Reporting feeding back into behaviour.** | Was assumed in the first draft and removed twice. Worth knowing whether it is on the roadmap. | Homepage loop, Reporting §5 |

### 13.2 Rejected wording removed from this document during reconciliation

Recorded so no later editor reintroduces it from an earlier draft.

| Removed wording | Matrix row | Pages it had reached |
|---|---|---|
| Works alongside the inbox, portals and CRM you already use | F-07, F-08 | Homepage hero, Platform Overview, Lead Intelligence, Onboarding, FAQ bank |
| Every enquiry answered in seconds | B-04, B-06 | Homepage hero, hero recommendation |
| That took four seconds | B-06, S-04 | Experience Nuova |
| Three properties / three homes | F-03 | Property Matching hero and body, homepage module grid |
| Keeps the thread alive, comes back at a sensible interval | E-01, E-05 | AI Sales Agent |
| The conversation you had written off books a viewing | **E-04, L-02** | AI Sales Agent |
| A property listed Tuesday matched to a customer from March | **E-04, L-02** | Property Matching |
| The ones who went quiet and are worth one more attempt | **E-04, L-02** | Daily Assistant |
| Voice in the present tense, in any form | V-01, V-03 | Voice AI page, homepage module grid |
| Every tier runs the whole loop | PK-04 | Pricing, homepage pricing block |
| 30 minutes, 15 minutes | CTA-2 | Every CTA microcopy line |
| Your data stays yours | B-15, N-03 | CTA microcopy, trust lines |
| One system instead of five | P-03 | Platform Overview hero, SEO copy |
| By agent, who is converting and who needs help | **R-08, I-07, L-11** | Reporting |
| What your portal spend is buying | R-13 | Reporting |
| Named languages: Spanish, German, Dutch, French, Scandinavian | B-07 | AI Sales Agent, Platform Overview |
| The signal list: budget, timing, location, viewing request | **D-09, L-09** | Lead Intelligence |
| Scored 1 to 100, above 80 is priority | D-04, S-04 | Lead Intelligence (already flagged in draft one) |
| Tells your agent she is ready | No matrix row | Platform Overview, homepage |
| Reporting changes what the system does next | No evidence | Homepage loop, Reporting |
| Trial wording in every form | T-01, T-02 | Onboarding, CTA library, Pricing |

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

**The authoritative list is `CLAIMS_MATRIX.md` §21, eighteen decisions, and its §22, fourteen
legal dependencies. That list is not duplicated here**, because two registers would drift
apart. This section records only what is specific to copy and conversion, plus which of the
matrix decisions starve this document most.

### 14.1 Decisions this document needs that the matrix does not carry

| # | Decision | Blocks |
|---|---|---|
| 1 | Approve or reject the positioning in §1.2 and the operating loop in §1.4. | Every page. It is compatible with P-01 and P-02, and sharper than either. |
| 2 | Approve or reject the hero recommendation in §4.4. | Homepage. |
| 3 | Approve the public package names **Nuova Studio, Nuova Signature, Nuova Prime**. | Pricing and Solutions. This answers PK-02 directly. |
| 4 | Supply a real demo duration, or confirm none is published. | Every CTA microcopy line on the site. |
| 5 | Are module names kept in English on the Spanish site, with Spanish descriptors? | The whole Spanish site. See §11.4. |
| 6 | Is *Built in Spain* accurate? | The footer brand line. |
| 7 | Merge *Lead Acquisition* into Social Growth and *Follow up Automation* into AI Sales Agent? | Routing and navigation. |
| 8 | **Does hot lead alerting exist**, on which channel, routed to whom? | Lead Intelligence, homepage, Daily Assistant. No matrix row covers it, so it cannot be written at all. See §13.1. |
| 9 | Ratify Ladder B, primary *Book a demo*, as the shipping CTA hierarchy. | Site wide. `MASTER_GOVERNANCE.md` §11 still names the trial as primary and that cannot be implemented. |

### 14.2 The matrix decisions that block the most copy

Ranked by how much of this document they unblock, which is a different order from the
matrix's own, because copy and engineering are starved by different things.

| Matrix ref | Decision | What it unblocks here |
|---|---|---|
| §21.3 | Confirm or reject each named integration | The most reused rejected sentence in the first draft. It had reached five pages. Until it is answered the site cannot answer *we already have a CRM*, which is the first objection every agency raises. |
| §22 L-01 | Follow up timing and lawful basis | A full section of AI Sales Agent and the Advance stage of the loop. |
| §22 L-09 | Automated profiling | Most of Lead Intelligence and two Reporting rows. |
| §21.2 | Does the trial exist | The CTA ladder, Onboarding, the Pricing primary action. |
| §21.4 | Simulation disclosure wording | Experience Nuova, which is the strongest conversion asset available while no social proof exists. |
| §21.5 | Feature to package mapping, public or on request pricing | The Pricing page beyond its three tier names. |
| §21.9 | Real score scale, or none | Lead Intelligence. |
| §21.10 | A measured response time, or none | The hero and every speed line on the site. |
| §21.13 | Which Daily Assistant questions work | The whole page. Every row is OWNER. |
| §21.11 | Is the square metres source enforced | One section of Property Experience. |
| §22 L-11 | Team performance visibility | One Reporting section, one Daily Assistant section. |
| §22 L-14 | **The privacy policy is materially incomplete** | Launch blocking for the whole site, not only for copy. |

### 14.3 Two conclusions worth stating plainly

**First.** Six of seven conversion paths have no working target system (`CLAIMS_MATRIX.md`
§17). *Book a demo* is the only one that works, and its current implementation is defective
(A-02). Fixing that one anchor is worth more to conversion right now than any headline in
this document.

**Second.** No social proof of any kind is available, and none may be invented. The site
therefore has to earn belief through demonstration and craft, which is why Experience Nuova
and the quality of the pages themselves carry disproportionate weight. That is a real
strategy, not a consolation, but it only works if the demonstration is honest and the disclosure
in §9.2 is cleared.


## 15. Handover

**To the Product Truth instance.** §13.1 is the intake list, and it is short because the
matrix covers almost everything. Three gaps remain, and **hot lead alerting is the one that
matters**: it is prominent in the owner's brief, it is one of the strongest conversion moments
available, and no matrix row exists for it, so it cannot be written in any wording.

**To the Claims instance.** §9.2 needs a cleared simulation label; S-02 makes the wording an
owner decision and §9.2 proposes three options with a recommendation. §11.3b supplies the
final Spanish for the five approved qualifiers, per your §20 delegation. §9.5 needs every
remaining trust line either cleared or confirmed as blocked.

**To the Luxury UX instance.** Section orders in §6 are the page architecture, and they have
changed since the first draft: Voice AI has no page, Property Experience and Social Growth are
now full pages, and three sections were deleted outright rather than restyled. Two constraints
are yours to hold. First, **R-15 and K-16 require a visible illustrative marker on every
reporting visual and every sample property**, which is a design problem, not a footnote.
Second, **PK-05 forbids implying a quota through visual devices**, so no bars, dots or
comparative column heights on the Pricing page. §9.1 defines every media empty state, which
need designing rather than hiding. §10 is the mobile copy contract the layout has to hold.

**To the implementation instance.**

1. Do not take copy from this file into a component until the matrix rows in §13 are
   `APPROVED` or `APPROVED-Q` with their owner and legal dependencies closed.
2. Ladder B in §3.3 is the only CTA ladder that can ship. `MASTER_GOVERNANCE.md` §11 still
   names the trial as primary and that hierarchy cannot be implemented.
3. **Capability status must be a content property, not hard coded prose.** The matrix asks
   for this in its §25 and this document assumes it. Qualifiers, entitlement labels and
   availability labels will change as evidence arrives, and they must change without a
   rebuild.
4. Every string in §9 is shared and belongs in one place, not repeated per component.
5. No form ships. A-04b and B-03b are P0, and there is no submission path.

---

## 16. Status

**Delivered.** Positioning and category story, the Nuova Operating Loop, message hierarchy,
voice and a banned language list, audience map, the two CTA ladders with a full label
inventory, eight hero options scored against four weighted criteria with a binding
recommendation, three package names with alternates and a bilingual check, fourteen page
specifications each carrying the full field set required by the brief, navigation, footer, the
shared microcopy library covering video empty states, simulation labels, availability and
entitlement labels, form copy and states, trust lines, an FAQ bank and error states, the
mobile copy system, the Spanish localisation strategy including register, terminology,
formatting, the final Spanish qualifier bank and a natively written Spanish hero, SEO copy,
a matrix keyed compliance register, and the open decisions specific to copy.

**Reconciled.** `PRODUCT_TRUTH.md` and `CLAIMS_MATRIX.md` arrived after drafting began. A
second pass removed twenty one rejected wordings, rewrote two pages that had been wrongly
embargoed, deleted one page entirely, and replaced the private claim register with a matrix
keyed one. §0.1b records every change.

**Not delivered, and deliberately so.** Full Spanish body copy for all fourteen pages, which
is a second pass once the English clears the matrix (§11.9). Trial copy in any wording (T-01).
Any price, limit, quota, score scale, response time, percentage or count. Any named
integration. Voice in the present tense.

**Drafted and awaiting owner decisions, legal clearance, and independent technical and final
audit.**

**No copy in this document is cleared for publication.** The gate condition is not this
document's completeness. It is `CLAIMS_MATRIX.md` §21 and §22.