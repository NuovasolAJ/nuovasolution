# COPY AND CONVERSION MASTER — NuovaSolution Website

**Owner of this document:** Lead Product Marketing Writer / Conversion Strategist
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Binding under:** `MASTER_GOVERNANCE.md` R3, R4, R6, R10
**Document status:** **DRAFT. NOT CLEARED FOR PUBLICATION.**

---

## 0. Status, scope and how to use this file

### 0.0 Wave A2 revision, 2026-08-31

This document has been revised against the **backend handoff** (`backend_handoff/
WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md`, the technical authority) and the **updated
`CLAIMS_MATRIX.md`** (the binding authority for public statements), following the 44 row copy
audit in `FINAL_RECONCILIATION_REPORT.md` §4.

**What changed at the level of the whole document.**

The backend handoff moved roughly two dozen capabilities from *owner brief only* to
`BACKEND CONFIRMED`. That is a large change, and it is easy to misread. It answers the
**evidence** question. It does not answer the **permission** question, the **legal** question
or the **release** question.

> `BACKEND CONFIRMED` is not permission to publish.
> `CLAIMS_MATRIX.md` §The rule that governs every reconciled row.

Three consequences run through every page below.

1. **The account tree is now real copy.** Signup, login, the fourteen day trial, the ten step
   self service wizard, saved progress, agency details, branding, team and roles, CRM
   selection, property source, entitlements, plans, subscription state and checkout handoff
   all have contracts. They get written properly here for the first time.
2. **Nothing about the conversational product moved.** Automatic replies, qualification,
   follow up, matching behaviour, the assistant's question set and voice capability are
   exactly where they were. The handoff confirms **channel connections**, not conversational
   behaviour, and conflating the two is a P0 violation (`CLAIMS_MATRIX.md` §9 note).
3. **Every legal hold survived.** L-01 to L-13 are unchanged and **L-14 grew**, because
   account creation, password handling, sessions, team personal data, uploaded assets,
   provider tokens, testimonial content and a payment handoff are all new processing the
   privacy policy does not describe. No authenticated surface reaches a public URL before
   L-14 closes.

**The vocabulary `LIVE` and `PRODUCTION READY` is removed from this document**, per
`CLAIMS_MATRIX.md`. Nothing here is production ready and this document never says otherwise.

### 0.1 Why this document is a draft

`MASTER_GOVERNANCE.md` §3 places two documents above this one. **Both arrived while this
document was being written**, in commit `7ec0010`, and this file has been reconciled against
them in a second pass, then again in Wave A2 against the backend handoff.

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
retire *Talk to Nuova* (CTA-4, now `REJECTED` and the label retired), *Book a demo* as the
shipping primary CTA, the
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

### 3.1 Two states, and the gate between them

The trial now exists. `CLAIMS_MATRIX.md` T-00 records it as `BACKEND CONFIRMED`: the tenant
is created with a fourteen day trial window at signup, and `GET /trial/status` serves
`status`, `plan`, `trial_end`, `days_left` and `account_state`.

That does not make the trial CTA shippable. Three separate things still stand between the
contract and a button a visitor can press:

| Gate | What is missing | Who closes it |
|---|---|---|
| Commercial wording | The word **free**, and whether a payment method is required at signup (T-01) | Owner |
| Website integration | No signup surface, no BFF, no route exists (`WEBSITE INTEGRATION PENDING`) | The integration wave |
| Per action release | `MASTER_GOVERNANCE.md` §14.3 requires an explicit, individually recorded owner release per CTA. **The activation register is empty** | Owner |

> **The arrival of a backend contract is not a release.** `MASTER_GOVERNANCE.md` §14.3.

The CTA system is therefore specified as **two states**. Implementation ships state one and
holds state two behind the gate. Nothing is invented in either.

### 3.2 State one: INTEGRATION PENDING

**This is what ships.** It is complete, honest, and has no dead ends.

| Level | EN | ES | Target | Note |
|---|---|---|---|---|
| Primary | **Book a demo** | **Reserva una demo** | Existing external scheduling tool | The only working conversion path. Outside the product boundary. |
| Secondary | **Experience Nuova** | **Descubre Nuova** | `/experience` | Ships only with a cleared pre interaction simulation label (S-02). |

**The trial entry does not render as a working control in this state.** It may appear only as
a marked placeholder under §14.3, and only if the owner has ratified its wording. If the
wording is unratified it does not appear at all. A placeholder beats nothing only when the
visitor can tell it is one.

**Not in this state, at all:** WhatsApp (CTA-7, no number exists), a chat launcher (CTA-5,
`RESERVED`), *Talk to Nuova* (CTA-4, retired), *Log in* as a live link (CTA-6, no
destination, `MF-03`).

### 3.3 State two: POST INTEGRATION CANDIDATE

**Candidate only. Not approved. Activation is owner and integration gate dependent.**

| Level | EN | ES | Target |
|---|---|---|---|
| Primary | **Start your 14 day trial** | **Empieza tu prueba de 14 días** | `POST /signup` through the BFF |
| Secondary | **Book a demo** | **Reserva una demo** | External scheduling tool |
| Tertiary | **Experience Nuova** | **Descubre Nuova** | `/experience` |

**Book a demo stays in the ladder and never leaves it.** `MASTER_GOVERNANCE.md` §11.4 is
explicit: booking a demo is optional and is **never a prerequisite to starting a trial**. No
step in any journey may route a trial signup through a sales call. That rule exists because
the live site does exactly that today, and T-02 rejects the pattern by name.

### 3.4 The trial wording, Variant A and Variant B

T-01 blocks the word **free** and every variant of it. The duration is confirmed; the price is
not. Both variants are drafted so the owner ratifies wording rather than briefing it.

**VARIANT A. No claim about price. Shippable the moment the owner ratifies it.**

| Surface | EN | ES |
|---|---|---|
| Primary CTA | Start your 14 day trial | Empieza tu prueba de 14 días |
| Short form, mobile and nav | Start your trial | Empieza tu prueba |
| Supporting line | Fourteen days to set your agency up and see it working. | Catorce días para configurar tu agencia y verla funcionando. |
| Pricing page entry | Start with the 14 day trial, or talk to us first. | Empieza con la prueba de 14 días, o hablamos antes. |

Variant A carries **no price claim of any kind**, so T-01 does not reach it. It stays honest
whether the trial turns out to be free, card required, or neither. **This is the recommended
variant, and every page below is built around it.**

**VARIANT B. Contains the word free. NOT APPROVED. NOT RELEASED.**

> ⚠ **Variant B may not be implemented, staged, previewed or pasted into a component.** It is
> drafted here so the owner can ratify wording in one step rather than two, and for no other
> reason. It becomes usable only when T-01 is answered **yes, the trial is free**, and the
> §14.3 release is recorded. Until both happen this block is reference material.

| Surface | EN | ES |
|---|---|---|
| Primary CTA | Start your 14 day free trial | Empieza tu prueba gratuita de 14 días |
| Short form | Start free | Empieza gratis |
| Supporting line | Fourteen days, free, to set your agency up and see it working. | Catorce días, gratis, para configurar tu agencia y verla funcionando. |

**Not drafted in either variant:** *No credit card required*.
`FINAL_RECONCILIATION_REPORT.md` §4 row 3 marks it `REMOVE`, T-01 forbids it by name, and
nothing in the handoff says whether a payment method is taken at signup. It was correctly
never drafted and it stays undrafted. Writing it now would create a sentence that could ship
by accident.

### 3.5 Full CTA label inventory

| ID | EN label | ES label | Target | State |
|---|---|---|---|---|
| CTA-01 | Book a demo | Reserva una demo | External scheduling tool | **Ships.** Fix A-02: real `href`, embed as progressive enhancement |
| CTA-02 | Start your 14 day trial | Empieza tu prueba de 14 días | `POST /signup` | `INTEGRATION PENDING` + §14.3 release + T-01 wording |
| CTA-03 | Experience Nuova | Descubre Nuova | `/experience` | Ships with a cleared simulation label (S-02) |
| CTA-04 | Explore the platform | Descubre la plataforma | `/platform` | Ships. Navigation, no claim |
| CTA-05 | See pricing | Ver precios | `/pricing` | Owner decision PK-07: public or on request |
| CTA-06 | Talk to us about pricing | Hablemos de precios | External scheduling tool | Ships |
| CTA-07 | Read the module | Ver el módulo | Module page | Ships |
| CTA-08 | Log in | Iniciar sesión | Destination unknown | `BLOCKED` on `MF-03`. Does not render |
| CTA-09 | Create your account | Crea tu cuenta | `POST /signup` | Same gate as CTA-02 |
| CTA-10 | Continue where you left off | Continúa donde lo dejaste | `resume_step` | `INTEGRATION PENDING` |
| CTA-11 | Choose a plan | Elige un plan | `GET /plans` then checkout | `INTEGRATION PENDING`, PK-09 |
| CTA-12 | Continue to checkout | Continuar al pago | `POST /checkout/session` | `INTEGRATION PENDING` + §14.3 release |

**Retired, and never reintroduced:**

| Label | Why |
|---|---|
| Talk to Nuova | CTA-4 `REJECTED`. The label is retired from the project |
| Talk to us on WhatsApp | CTA-7. No number exists and R7 forbids inventing one |
| Chat with Nuova | CTA-5 `RESERVED`. A launcher that accepts input and never answers is a P0 violation |
| Start for free, routed to a demo booking | T-02. The exact pattern live on the site today |
| Request early access | Superseded. A trial signup contract exists, so a request queue is the wrong shape |

**Never used as a label anywhere:** *Get started*, *Learn more*, *Discover more*, *Find out
more*, *Submit*, *Click here*. Every CTA on this site names the thing that happens next.

### 3.6 CTA microcopy

CTA-2 forbids a duration or outcome promise that is not confirmed, and names *15 minutes* and
*no commitment* as forbidden. **Every duration is removed.** The lines work without one.

| Context | EN | ES |
|---|---|---|
| Demo, homepage and final CTA | We show you Nuova running on a real enquiry, not a slide deck. | Te enseñamos Nuova funcionando con una consulta real, no un PowerPoint. |
| Demo, module pages | In English or in Spanish. Nothing to prepare. | En español o en inglés. No hace falta preparar nada. |
| Demo, pricing page | We tell you what it costs on the call. | Te decimos lo que cuesta en la llamada. |
| Experience Nuova | Nothing to install. | Sin instalar nada. |
| Trial, Variant A only | You set your agency up yourself. No developers needed. | Configuras tu agencia tú mismo. Sin desarrolladores. |

The trial line uses O-08's approved wording, which is `BACKEND CONFIRMED` in structure: ten
steps, saved progress, resume, role gated writes. It carries no price claim, so it holds under
Variant A.

**OWNER DECISION.** Supply a real demo duration, or confirm none is published. The live site
says 15 minutes today, which CTA-2 names as forbidden precisely because it is unconfirmed.
This instance does not choose a number that describes the owner's own calendar.


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

Gates below are **after** Wave A2 reconciliation against the backend handoff and the updated
matrix. The site is now two trees, not one, and they have different gates.

**The public marketing tree.**

| # | Page | Route | Gate | Principal blocker |
|---|---|---|---|---|
| 1 | Homepage | `/` | HELD | Composed of module sections, so it inherits their gates |
| 2 | Platform Overview | `/platform` | **OPEN** | Security section held on L-14 |
| 3 | AI Sales Agent | `/platform/ai-sales-agent` | HELD | Follow up section on L-01, qualification on L-09 |
| 4 | Lead Intelligence and CRM | `/platform/lead-intelligence` | HELD | L-09 throughout. CRM section improved, F-07 naming is owner decision D |
| 5 | Voice AI | **no route** | **BLOCKED** | V-01. One future block on Platform Overview instead |
| 6 | Property Matching | `/platform/property-matching` | **OPEN** | Strengthened by F-02b. Section 5 removed on L-02 |
| 7 | Daily Assistant | `/platform/daily-assistant` | HELD | Every row still OWNER. The `assistant` entitlement key changes nothing |
| 8 | Social Growth | `/platform/social-growth` | **OPEN** | Section 5 held on L-07 |
| 9 | Reporting | `/platform/reporting` | **OPEN** | Section on L-11 removed |
| 10 | Property Experience | `/platform/property-experience` | **OPEN** | Square metres on L-12. Entitlement copy now confirmed (K-17) |
| 11 | Solutions and Outcomes | `/solutions` | **OPEN** | Rows for blocked modules are omitted |
| 12 | Pricing | `/pricing` | HELD | PK-07 public or on request. Prices are served, never authored |
| 13 | Experience Nuova | `/experience` | HELD | S-02 disclosure wording is an owner decision |
| 14 | Onboarding and Start | `/start` | **OPEN** ⬆ | Public page unblocked by O-00b, O-01, O-02 |

**The authenticated tree. New in Wave A2.**

| # | Surface | Route | Gate | Principal blocker |
|---|---|---|---|---|
| 15 | Signup | `/signup` | `INTEGRATION PENDING` | **L-14.** Plus `MF-08` captcha, `MF-09` language values |
| 16 | Login | `/login` | `INTEGRATION PENDING` | **L-14.** Destination `BLOCKED` on `MF-03` |
| 17 | Trial status | authenticated shell | `INTEGRATION PENDING` | **L-14.** Reminder cadence `MF-06` |
| 18 | Trial expiry | authenticated shell | `INTEGRATION PENDING` | **L-14.** Day fifteen wording is an owner decision |
| 19 | Plan selection | authenticated shell | `INTEGRATION PENDING` | **L-14.** PK-04, PK-05, PK-07, `MF-10` |

> **No authenticated surface reaches a public URL before L-14 closes.**
> `CLAIMS_MATRIX.md` L-14, enlarged on 2026-08-31. The confirmed integration adds account
> creation, password handling, JWT sessions, agency and team personal data, uploaded branding
> assets, provider OAuth tokens held server side, testimonial consent and content, and a
> payment handoff. **All of it is new processing the privacy policy does not describe.** This
> is site wide and launch blocking, and it is not a copy problem that copy can solve.

**Every product CTA additionally needs an individual §14.3 owner release.** The activation
register in `INTEGRATION_CONTRACT.md` is empty. A contract is not a release.

**The public marketing forms still have nowhere to go.** A-04b is unchanged and P0: a signup
contract now exists, but a **generic marketing form destination does not**. The form library in
§9.4 is prepared, not deployable, and no contact or callback form ships.

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

**Primary CTA.** Book a demo. State one, INTEGRATION PENDING (§3.2). The trial entry becomes
primary only in state two, after T-01 wording and a §14.3 release.
**Secondary CTA.** Experience Nuova, with its pre interaction simulation label.
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
> it costs on the call, without a proposal process.

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

**6. A CRM is included. You do not have to bring your own.**

**Rewritten again in Wave A2, and this is the largest single copy unblock the handoff
produced.** The previous pass could not answer *we already have a CRM* at all. It can now.

> ### A CRM is included from the start.

> A CRM is included. You do not have to bring your own. `[G-11b]`
>
> Every message, from every channel, on one record. The whole relationship in one place, with
> the source it came from, who took over and when. `[G-01]` `[G-02]` `[G-03]` `[G-06]`
>
> Universal across your channels. `[G-10]`
>
> If you already use another CRM, you can connect it instead. `[G-11]`

**Why this is now defensible.** Backend handoff §3 step 7: *Nuova universal CRM is the default
and completes with no action. External CRM becomes `externally_pending` until authorized, then
`completed`.* `CLAIMS_MATRIX.md` records G-11b as `BACKEND CONFIRMED`. The claim is no longer
that Nuova works with your CRM. It is that Nuova brings one, and yours is an alternative.

That is a better sales position than the one the first draft was reaching for, and it happens
to be the one that is true.

**Three constraints that still bind.**

1. **No CRM vendor is named on this page.** F-07 moved from `REJECTED` to `OWNER`: the four
   vendors are in the handoff, so the evidence objection is gone, but **naming them publicly
   is a commercial decision the owner has not made** (`CLAIMS_MATRIX.md` §21 decision D).
   Until it is made, the page says *another CRM*, never a brand.
2. **No CRM logo, in any circumstance.** F-07b is `BLOCKED` on trademark permission. Adapter
   evidence does not confer the right to display a mark.
3. **No sync claim.** F-08 rejects *always synced to your CRM* and every variant, and it was
   **not** rescued by the handoff. The confirmed contract is connection, connection state and
   a health probe. None of that is a promise of continuous synchronisation, and *always* is an
   absolute.

**G-10 is a precise constraint.** The word *universal* may be used **only** as *universal
across your channels*. Standing alone it implies compatibility with any external CRM, which is
the claim that is rejected.

**OWNER DECISION, now narrower and worth making.** G-11 asks whether the Nuova CRM is
positioned as a **replacement** or an **alternative**. The handoff makes *default in, external
optional* the accurate description, and the wording above is written to that. Confirming it
lets this section state the position outright instead of describing a mechanism.

**Connection honesty on this page.** If the agency connects an external CRM, that connection
passes through `externally_pending` before it is done, and O-00d forbids showing it as
complete. The public page does not need to explain that, but it must not promise anything the
authenticated surface will then contradict. See §9.7b.

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
>
> Your own agency website works as a property source. Nothing is rejected for being taken from
> your own site. `[F-02b]`

**F-02b is new in Wave A2 and it removes a real objection.** Backend handoff §3 step 8 makes
agency owned scraped website inventory a **first class valid source**, and
`GET /property-source/status` returns `accepts_scraped_owned_inventory: true`. The four
accepted source types are the agency website, a supported feed, CRM inventory, or another
authorised source.

Most small and mid sized agencies on this coast keep their listings in exactly one place:
their own website. Before this, the honest answer to *how does it get our properties* was a
shrug. Now it is a sentence, and it is `BACKEND CONFIRMED`.

F-02 forbids *searches the whole market*, *every listing in Spain* and *all portals*. The
headline deliberately says the opposite, and restraint is the better sales argument here.

**No portal is named, and this has not changed.** F-06 stays `REJECTED`. The handoff's `feed`
type is a **generic supported feed**, not a named portal, and reading it as permission to name
Idealista or Fotocasa would be a P0 violation. `CLAIMS_MATRIX.md` §7 states the asymmetry
between F-06 and F-07 explicitly and requires it to be preserved: **CRM vendors appear in the
handoff, property portals do not.**

**OWNER DECISION carried from F-02.** What does *authorised* actually test? The word is doing
load bearing work in a sentence about someone else's property data, and it should mean
something specific before it ships.

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

**Entitlement label, mandatory.** Approved wording, K-17:

> Property Experience is available on the plans that include it.

**What Wave A2 changed, and what it did not.** The **entitlement and the onboarding entry
point** are `BACKEND CONFIRMED`: the canonical `px.experience` key resolves through
`GET /entitlements`, and `GET /px/entry` returns `available` or `locked_addon`. **The twelve
capture capabilities K-01 to K-12 are not in the handoff** and keep their `PRODUCT_TRUTH.md`
§13 status. So the page may now state confidently *which plans this is on*, and states
everything about *what it does* exactly as carefully as before.

**Three hard constraints.**

1. **No quota number, and no visual implication of one.** PK-05 names the devices: bars, dots,
   *up to* phrasing, comparative column heights. Per package capacity is `CLAIMS_MATRIX.md`
   §21 decision 14 and is unanswered.
2. **Never show the entitlement key.** `px.experience` is a technical identifier and Appendix
   B invariant 6 forbids it reaching the agency. The visitor sees a plan name, never a key.
3. **The website does not build a capture wizard.** The backend handoff §3 step 9 assigns the
   3D room based 360 capture wizard to the PX lane and says explicitly not to build a second
   one. This document specifies the marketing page and the entitlement copy, nothing more.

**`locked_addon` is rendered as `locked_by_plan`**, per §9.7b: an upgrade path, never an
error, never an apology.

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

Two layouts. **They are called Layout A and Layout B to keep them distinct from the trial
wording Variant A and Variant B in §3.4**, which are a different decision entirely.

**Hero subheadline, Layout A, prices displayed.**
> Three packages, built around the size of the operation they run. Every paid package
> includes the same working baseline. `[PK-01]` `[PK-03]`

**Hero subheadline, Layout B, pricing on request. The default until PK-07 is answered.**
> Three packages, built around the size of the operation they run. We tell you which one fits
> and what it costs on the call. `[PK-01]` `[PK-07]`

**Primary CTA.** Layout A: Choose a plan `[CTA-11]`, which is `INTEGRATION PENDING`. Layout B:
Talk to us about pricing `[CTA-06]`, which ships. In state two the trial entry (§3.4 Variant A)
becomes primary on this page and *Talk to us about pricing* moves to secondary.

**The pricing mechanism changed in Wave A2, and this is the most important line on the page.**

`GET /plans` is `BACKEND CONFIRMED` and returns `{ code, name, price_display,
features_summary }`. PK-06's rule is therefore no longer *no price may be displayed*. It is:

> **The website renders `price_display` as served. It never authors a figure.**

That distinction is the whole compliance position for this page. A price on the page is not an
invented statistic if it came from the endpoint at request time. A price typed into a
component is a P0 finding whether or not it happens to be correct today.

Consequences the implementation instance must hold:

1. No price, currency, billing period, discount, setup fee or minimum term is ever written
   into markup, a constant, a CMS field or a translation string.
2. Plan **names** also come from the endpoint. `PRODUCT_TRUTH.md` records internal IDs
   `essential`, `growth`, `scale`; the public names are whatever `/plans` serves.
3. **Whether the public marketing site shows prices at all is still PK-07, an owner
   decision.** Layout A may not be built until that answer exists.

**OWNER DECISION, and it is new.** §5.2 of this document recommends the public names **Nuova
Studio, Nuova Signature, Nuova Prime**. Those names must be the ones configured in `/plans`,
or the site and the backend will display different names for the same package. Confirming the
names is now a backend configuration task, not only a marketing one.

**Blocked on `MF-10`:** the currency and tax basis carried by `price_display`, and whether
`name` is the public marketing name. Spanish buyers expect IVA handling to be explicit, and
that cannot be written until `MF-10` lands.

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
**GATE: OPEN for the public page. `INTEGRATION PENDING` for the wizard itself.**
**Upgraded in Wave A2.** O-01, O-00b and O-02 moved from `OWNER` to `APPROVED-Q`. The ten
step self service wizard is `BACKEND CONFIRMED`, with `percent_complete`, `resume_step`,
`completed_steps` and role gated writes. The question *does the flow exist* is answered yes.

**Page goal.** Remove the last fear before a commitment, which is never price. It is *how much
of my time does this cost, and what happens if it goes wrong*.

**Audience.** Owner who has already decided in principle.

**Primary message.** You set your agency up yourself, one step at a time, and you can stop and
come back.

**Hero headline.**
> Set your agency up yourself.

**Hero subheadline.**
> Ten steps, in your own time. Your progress is saved, so you can stop and pick up where you
> left off. No developers needed. `[O-00b]` `[O-00c]` `[O-08]`

**Primary CTA.** State one: Book a demo. State two: Start your 14 day trial (§3.4 Variant A).
**Secondary CTA.** Explore the platform.

**Section order.**

1. Hero
2. The ten steps
3. Your progress is saved
4. What is honest about the status
5. What you do not have to do
6. Final conversion

**Section headlines and body copy.**

**2. The ten steps**

> ### Everything it needs, in order.

The step **names** are `APPROVED` (reconciliation report row 9). The behavioural descriptions
inherit their own capability verdicts, which is why several lines below are deliberately
short.

| # | Step | Public line | Matrix |
|---|---|---|---|
| 1 | Account | Your name, your email, your language. | O-00 |
| 2 | Agency details | Company name, address, contact details and the languages you work in. | O-01 |
| 3 | Branding | Your logo, your email banner, your signature. Every message goes out under your brand. | N-01 |
| 4 | Team | Add your team and set their roles: agent, team lead, office manager, agency admin. | O-02 |
| 5 | Channels | Connect your channels, based on the permissions you hold. | O-03, Q-2 |
| 6 | Lead sources | Connect the places your leads already come from. | O-06, A-10 |
| 7 | CRM | A CRM is included from the start. If you already use another one, you can connect it instead. | O-03b, G-11b |
| 8 | Property source | Point it at your own website, a supported feed, or your CRM inventory. | O-03c, F-02b |
| 9 | Property Experience | Available on the plans that include it. | K-17 |
| 10 | Readiness | A clear readiness check before you go live. | O-03d |

**The four roles in step 4 are exact.** O-02 confirms agent, team lead, office manager and
agency admin, and forbids naming a fifth or claiming per role permissions beyond what is
contracted. Do not invent a *viewer* or an *owner* role to round the list out.

**Step 8 carries a genuinely good sentence that is now defensible.** See section 5 below.

**Step 9 is entitlement gated.** K-17 approves *available on the plans that include it* and
forbids presenting it as included everywhere. It also forbids showing the technical
entitlement key, which is an Appendix B invariant, so the page never displays `px.experience`.

**3. Your progress is saved**

> ### Stop whenever you need to.

> Your progress is saved. Come back and continue where you stopped. `[O-00c]`

Short, and worth its own section. Agency owners abandon setup flows because they get
interrupted by the job they actually do, and this is the sentence that answers that fear.
`resume_step` is `BACKEND CONFIRMED`, so the claim is accurate rather than aspirational.

**Do not add a completion time.** O-10 rejects *live in a day*, *up and running in 15 minutes*
and every figure. `percent_complete` exists in the contract, but a percentage of steps is not
a duration, and rendering it as one would be an invented statistic.

**4. What is honest about the status**

> ### You always know what is actually done.

> Some steps wait on someone else. When a provider has not approved a connection yet, it says
> so, and it does not pretend to be finished. `[O-00d]`

**This is a release blocking invariant, not a nicety.** `CLAIMS_MATRIX.md` O-00d and the
backend handoff §3 both state it: a step in an external pending state is **never** presented
as done. Breaching it is P0.

It is also, unusually, a section where compliance and conversion point the same way. Every
agency owner has been burned by a setup flow that showed green while nothing worked.

**5. What you do not have to do**

> ### Your own website already counts.

> Your own agency website works as a property source. Nothing is rejected for being taken from
> your own site. `[F-02b]`
>
> A CRM is included. You do not have to bring your own. `[G-11b]`
>
> No developers needed. `[O-08]`

**Both of the first two sentences are new in Wave A2 and both are strong.** F-02b is
`BACKEND CONFIRMED` with `accepts_scraped_owned_inventory: true`, and G-11b is
`BACKEND CONFIRMED` because Nuova CRM is the wizard default and completes with no action.
Together they remove the two objections that most often stop a small agency at the door: *our
listings are only on our website* and *we already have a CRM*.

**Removed, and it must stay removed.** *No setup needed*, live on the site today, is
`REJECTED` under O-09 and the handoff makes it more clearly false, not less: ten configured
steps, provider OAuth, branding upload and an inventory source. O-08's *no developers needed*
is the approved claim and it is the honest one.

**6. Final conversion.** Standard block.

**Objections answered.** This will eat a month of my time (sections 2 and 3, and no invented
duration). We will have to change everything (section 5). Our listings only live on our own
website (section 5, F-02b). We already have a CRM (section 5, G-11b).

**Trust requirements.** No setup duration. No support SLA. No *go live in 24 hours*. No
technical entitlement key, tenant ID, storage object ID or workflow identifier visible
anywhere, per Appendix B invariant 6. No security or encryption claim, per B-15.

**Cross links.** Pricing, Platform Overview, Signup.

**Mobile copy notes.** Section 2 is the whole page on a phone. The ten steps render as a
vertical list with the step name on its own line and the description beneath, never as a two
column table. Section 3 sits directly under it, because *your progress is saved* is what makes
a ten step list feel survivable on a small screen.

---

## 6.15 Signup

**Route:** `/signup`
**GATE: `INTEGRATION PENDING`.** The contract is `BACKEND CONFIRMED`: `POST /signup`, public
plus captcha, `{ name, email, password, language, agency_name }`, `409` on an existing email.
**No signup surface may ship before L-14 closes**, because this is the page that starts
collecting personal data, and the privacy policy does not describe the processing.

**Page goal.** Get an agency owner from decision to account with nothing in the way.

**Audience.** An owner who has decided. This page persuades nobody; it only removes friction.

**Primary message.** Create your agency account and start the fourteen day trial.

**Hero headline.**
> Create your agency account.

**Hero subheadline.**
> Fourteen days to set your agency up and see it working. `[T-00]` `[Variant A]`

**Under Variant B this becomes** *Fourteen days, free, to set your agency up and see it
working*. **Variant B is not approved.** See §3.4.

**Form fields.** Exactly the contracted set. The five field maximum in §9.4 holds exactly,
which is a good sign the contract and the conversion discipline agree.

| Field | EN label | EN placeholder | ES label | ES placeholder |
|---|---|---|---|---|
| `name` | Your name | | Tu nombre | |
| `agency_name` | Agency name | | Nombre de la agencia | |
| `email` | Work email | you@agency.com | Email de trabajo | tu@agencia.com |
| `password` | Password | | Contraseña | |
| `language` | Language | | Idioma | |

**Blocked on `MF-09`:** the accepted values for `language`. The field cannot be built as a
select until the enumeration exists, and it must not be guessed from the site's own locale
list.

**Blocked on `MF-08`:** the captcha provider. The widget, its copy and its failure state
cannot be written until it is named.

**Success.** The contract returns `{ ok, next: "onboarding", session? }`, so the success state
is a navigation, not a message. If a session comes back the visitor lands in the wizard. If
only a login hint comes back they land on Login with the email prefilled.

> Account created. Let us set your agency up. / Cuenta creada. Vamos a configurar tu agencia.

**Errors.** Written against the contracted codes. **Blocked on `MF-04`** for the full `code`
enumeration; the three below are the ones the handoff names explicitly.

| Case | EN | ES |
|---|---|---|
| `409` email exists | That email already has an account. Log in instead. | Ese email ya tiene una cuenta. Inicia sesión. |
| `400` invalid input | Something in the form is not right. Check the highlighted fields. | Hay algo que no cuadra. Revisa los campos marcados. |
| `429` rate limited | Too many attempts. Wait a moment and try again. | Demasiados intentos. Espera un momento e inténtalo otra vez. |
| Captcha failed | That check did not pass. Try it once more. | Esa verificación no ha pasado. Inténtalo otra vez. |
| `5xx` | Something broke on our side. Try again, or book a demo and we will set you up together. | Algo ha fallado por nuestra parte. Inténtalo otra vez, o reserva una demo y lo configuramos juntos. |

The `5xx` line offers the one path that always works, which is the honest states rule doing
real conversion work.

**Never on this page:** any security, encryption, isolation or GDPR claim (B-15, G-13, X-08).
The temptation is strong on a signup form and it is a P0 violation. A privacy link at the
point of collection is required; a security badge is forbidden.

**Trust requirements.** Privacy link beside the submit control, per §9.5. No *no credit card
required* (T-01). No *instant setup* implication (O-00). No count of agencies already signed
up (X-04).

**Mobile copy notes.** Five fields, one column, labels always visible. The trial line sits
above the form, not below it, because on a phone the reason to fill in a form must precede the
form.

---

## 6.16 Login

**Route:** `/login`
**GATE: `INTEGRATION PENDING`, and the destination is `BLOCKED` on `MF-03`.**
Authentication itself is `BACKEND CONFIRMED`: Supabase GoTrue password grant, logout, refresh.
What does not exist is the answer to *where does the product live after the wizard finishes*.

**Page goal.** Get a returning user in, with no decoration.

**Hero headline.**
> Log in.

**Hero subheadline.**
> Continue where you left off. `[O-00c]`

**Fields.** Email, password. Nothing else.

**Copy.**

| Element | EN | ES |
|---|---|---|
| Submit | Log in | Iniciar sesión |
| Forgot password | Forgot your password? | ¿Has olvidado la contraseña? |
| No account | No account yet? Create one. | ¿Todavía no tienes cuenta? Crea una. |
| `400 invalid_grant` | That email and password do not match. | Ese email y esa contraseña no coinciden. |
| Session expired | Your session ended. Log in again to continue. | Tu sesión ha terminado. Inicia sesión otra vez para continuar. |
| Refresh failed | We could not keep you signed in. Log in again. | No hemos podido mantener la sesión. Inicia sesión otra vez. |
| `429` | Too many attempts. Wait a moment. | Demasiados intentos. Espera un momento. |

**One deliberate wording choice.** The failed login line does not say which of the two was
wrong. That is standard practice and it is also the honest thing, because the site does not
know.

**`Log in` does not render in the navigation until `MF-03` is answered.** `MASTER_GOVERNANCE.md`
§11.4 and CTA-6 both say so. A nav item pointing nowhere is worse than an absent one, and R7
forbids inventing the URL.

**Forgot password is not drafted beyond the link label.** No reset contract appears in the
handoff. The flow cannot be written from nothing.

---

## 6.17 Trial status

**Route:** authenticated surface, inside the product shell
**GATE: `INTEGRATION PENDING`.** `GET /trial/status` is `BACKEND CONFIRMED` and returns
`status`, `plan`, `trial_end`, `days_left`, `account_state`.

**Page goal.** Tell the agency where they stand without nagging them.

**Primary message.** You have this long left, and here is what happens next.

**The binding rule for every string here.** T-00b: render `days_left` and `trial_end` **as
served**. **Never compute the countdown client side, and never hardcode fourteen anywhere.**
The backend is the single source of truth, and if the trial is extended the number changes
underneath the copy.

**Copy by `status` value.** The seven values are contracted, so the copy is written per value
rather than invented.

| `status` | EN | ES |
|---|---|---|
| `trialing` | {days_left} days left in your trial. | Te quedan {days_left} días de prueba. |
| `trialing`, one day | Last day of your trial. | Último día de prueba. |
| `trial_expired` | Your trial has ended. | Tu prueba ha terminado. |
| `active` | Your plan is active. | Tu plan está activo. |
| `past_due` | There is a problem with your payment. | Hay un problema con el pago. |
| `suspended` | Your account is suspended. Talk to us and we will sort it out. | Tu cuenta está suspendida. Habla con nosotros y lo resolvemos. |
| `canceled` | Your subscription has ended. | Tu suscripción ha terminado. |

**Blocked on `MF-06`:** the reminder cadence, and whether reminders are sent by the backend or
rendered by the website. Until that lands there is no reminder copy, because a reminder the
website invents could contradict an email the backend sends.

**Never on this surface:** the plus seven day extension, in any wording. T-03 is DISABLED and
`LEGAL REVIEW PENDING` on L-13, and T-03b separately forbids hardcoding the number seven
anywhere in the website. The testimonial mechanism that triggers it is `LEGAL HOLD` and
`BLOCKED` on `MF-01`. **It is not mentioned, not hinted at, not placed in a tooltip.**

---

## 6.18 Trial expiry

**Route:** authenticated surface
**GATE: `INTEGRATION PENDING` + `OWNER DECISION` on the day fifteen commercial wording.**

**Page goal.** Convert without threatening. The contract makes this unusually easy, and the
copy should not waste it.

**The contracted behaviour, which is better than most trials.** When `status = trial_expired`,
premium features resolve to `denied`, and **login is never blocked**. The account and the data
stay. That is a genuinely reassuring fact and it is `BACKEND CONFIRMED`.

**Headline.**
> Your trial has ended. Your account has not.

**Body.**

> You keep your account and everything in it. Premium features pause until you choose a plan.
> `[T-00c]`

**Primary CTA.** Choose a plan `[CTA-11]`. **Secondary CTA.** Talk to us about pricing.

**Forbidden here, and named in T-00c:** *your account is deleted*, *you lose access*, and every
variant. They are false against the contract, and false in the direction that destroys trust.

**Forbidden generally:** any countdown to deletion, any artificial urgency, any *last chance*
framing, any discount that has not been confirmed (PK-06). Manufactured scarcity on an expiry
screen is the cheapest trick in this category and it is beneath the positioning.

**OWNER DECISION.** The day fifteen commercial wording. What exactly is offered, at what
point, and whether anything changes about the account after a further period. The copy above
is deliberately written to be true regardless of that answer, so it can ship first and be
extended later.

---

## 6.19 Plan selection

**Route:** authenticated surface, and the public `/pricing` page shares its logic
**GATE: `INTEGRATION PENDING` + `OWNER DECISION` (PK-04, PK-05, PK-07).**

**Page goal.** Let an agency pick the plan that fits and continue to checkout.

**Primary message.** Three packages, one baseline, and the size of your operation decides.

**Everything displayed comes from `GET /plans`.** `{ code, name, price_display,
features_summary }`. The website renders. It never authors. See §6.12 for the full rule.

**Copy.**

| Element | EN | ES |
|---|---|---|
| Heading | Choose your plan | Elige tu plan |
| Baseline line | Every paid package includes: CRM · Lead Engine · Automatic Replies · Basic Follow up · Property Matching · Core Reporting `[PK-03]` | Todos los paquetes incluyen: CRM · Lead Engine · Respuestas automáticas · Seguimiento básico · Property Matching · Core Reporting |
| Select | Choose this plan | Elegir este plan |
| Continue | Continue to checkout `[CTA-12]` | Continuar al pago |
| Current plan | Your current plan | Tu plan actual |
| `403 not_allowed` | This plan is not available for your account. Talk to us. | Este plan no está disponible para tu cuenta. Habla con nosotros. |
| `409 already_subscribed` | You are already on this plan. | Ya tienes este plan. |

**The baseline line ships as names only.** PK-03 approves the list as **capability names** and
forbids describing each one's behaviour beyond what §3 to §11 of the matrix approve. In
particular *Basic Follow up* may be named and may **not** be described, because E-01 is
`LEGAL` on L-01.

**What may not appear until PK-04 and PK-05 are answered:** which capabilities sit in which
package, any limit, any quota, and **any visual implication of a number**. PK-05 names the
devices explicitly: bars, dots, *up to* phrasing, comparative column heights. A comparison
column that looks quantitative without carrying a figure is still a P0 finding.

**Checkout handoff.** `POST /checkout/session` returns `{ checkout_url }`. The website
navigates. **No payment provider is ever named** (PK-09 forbidden wording), and no billing
term, renewal term or refund term is authored anywhere.

**Never here:** a *most popular* badge unless the owner confirms it is true, a crossed out
price, a countdown, or a discount. PK-06 covers the last two and R6 covers the first.

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

**Gated modules in the nav.** A module carries its entitlement label in the dropdown, per
§9.3. A module that is blocked does not appear in the navigation at all.

**Log in. The objection changed in Wave A2, and the answer did not.**

Authentication is `BACKEND CONFIRMED`: Supabase GoTrue password grant, logout, refresh. The
old question, *does a customer application exist*, is answered yes. **What is still missing is
the destination**: where the product lives after wizard step 10 (`MF-03`, `CLAIMS_MATRIX.md`
§21 decision B, a P0 scope question).

So the label is cleared in principle and the link still cannot render.

1. **Omit it until `MF-03` is answered.** Recommended. `MASTER_GOVERNANCE.md` §11.4: *Log in
   does not render as a link until its destination exists.*
2. Once the destination exists, link to it, full stop, after a §14.3 release.
3. Never a login link that opens a *coming soon* panel. That is worse than omitting it, and it
   is the pattern §14.3 calls a P0 violation.

R7 still forbids inventing the URL, and a plausible looking subdomain is not confirmation.

**The trial CTA in the nav.** In state one the nav utility cluster carries *Book a demo* only.
In state two it carries the trial entry as primary, in Variant A wording, and *Book a demo*
moves beside it. There is never a third control in that cluster.

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

### 9.7b Connection states, the eight contracted status values

**Added in Wave A2.** The backend handoff §4 defines the exact status vocabulary carried by
every wizard step and every provider surface. It is contracted, so the copy is written **per
value** rather than invented, and the same string is used everywhere that value appears.

`AUTHENTICATED_SURFACE_SYSTEM.md` §3 owns the visual specification for these eight. This
section owns their wording. The two must not drift.

| Status | EN label | EN explanation | ES label | ES explanation |
|---|---|---|---|---|
| `completed` | Done | Set up and confirmed. | Hecho | Configurado y confirmado. |
| `needs_action` | Needs you | Something here is waiting on you. | Te toca a ti | Aquí hay algo esperándote. |
| `externally_pending` | Waiting on {provider} | Sent. {provider} has not approved it yet. Nothing more for you to do right now. | Esperando a {provider} | Enviado. {provider} todavía no lo ha aprobado. Por ahora no tienes que hacer nada más. |
| `locked_by_plan` | Not on your plan | Available on the plans that include it. | No está en tu plan | Disponible en los planes que lo incluyen. |
| `optional` | Optional | Not needed to go live. You can come back to it. | Opcional | No hace falta para empezar. Puedes volver más tarde. |
| `connected` | Connected | Working. | Conectado | Funcionando. |
| `degraded` | Needs a look | Still working, but something has changed on the provider's side. Worth checking. | Conviene revisarlo | Sigue funcionando, pero algo ha cambiado en el proveedor. Merece la pena revisarlo. |
| `action_required` | Action needed | Something on the provider's side has changed and this has stopped working properly. | Requiere acción | Algo ha cambiado en el proveedor y esto ha dejado de funcionar bien. |

**Four rules that are release blocking, not stylistic.**

1. **`externally_pending` is never rendered as done.** Backend handoff §3 and Appendix B
   invariant 5, and `CLAIMS_MATRIX.md` O-00d. This is the single most likely place for the
   site to tell a lie by accident, because a pending state looks like progress.
2. **`locked_by_plan` is an upgrade path, not an error.** It never uses error colour, error
   wording or an apology. The agency has not done anything wrong.
3. **`degraded` is not `connected` and it is not an error.** It is additive. The wording above
   deliberately says *still working*, because that is what the contract means.
4. **No technical identifier is ever shown.** Appendix B invariant 6: no workflow ID, webhook
   ID, storage object ID, tenant UUID or entitlement key reaches the agency. `px.experience`
   is never printed on a screen.

**Blocked on `MF-11`:** the provider display name list that fills `{provider}`. Until it
lands, the fallback string is *Waiting on the provider* / *Esperando al proveedor*, with no
name. **Do not guess a display name from a vendor's marketing.**

**Blocked on the `missing_api_names[]` presentation decision:** what `action_required` shows
beyond the sentence above. `GET /crm/health` returns the specifics, and how much of that an
agency admin should see is a product decision, not a copy one.

### 9.7c Loading states

**Added in Wave A2.** `INTEGRATION_CONTRACT.md` requires a loading state for every action.
The rules matter more than the strings, because most loading copy is never read.

| Rule | Detail |
|---|---|
| Nothing appears before 300 ms | A flash of loading copy on a fast response reads as jank. |
| The control keeps its dimensions | No layout shift. `aria-busy="true"` on the control. |
| The label changes, the button does not move | Fixed width, so the swap does not reflow the row. |
| Never resubmittable while in flight | The most common duplicate signup cause. |
| A skeleton reserves the real height | Never a spinner where content will land. |

| Context | EN | ES |
|---|---|---|
| Generic submit | Sending | Enviando |
| Signup submit | Creating your account | Creando tu cuenta |
| Login submit | Logging you in | Iniciando sesión |
| Wizard step save | Saving | Guardando |
| Branding upload | Uploading | Subiendo |
| Provider connect redirect | Taking you to {provider} | Te llevamos a {provider} |
| Checkout redirect | Taking you to checkout | Te llevamos al pago |
| Loading a surface | Loading | Cargando |
| Slow response, after 10 seconds | Still working on it. | Seguimos con ello. |

**The ten second line is the one that earns its place.** A response that is merely slow and a
response that has failed feel identical to a user, and saying so is cheaper than a spinner
that spins forever.

### 9.7d The uniform response envelope, and what the visitor sees

Every BFF endpoint returns `{ ok, code, message, details, request_id }`. Three rules follow.

1. **`message` is documented as display safe, and it is still not displayed raw.** Copy is
   written per `code` in this document. A backend string rendered directly into a premium
   page is a category error, and it will not be in the visitor's language.
2. **`request_id` is shown only in the `5xx` state**, quietly, so a visitor can quote it if
   they contact us. It is a support affordance, not decoration.
3. **No internal detail is ever surfaced.** Not a stack, not a table name, not a provider
   error verbatim.

| HTTP | Meaning | EN | ES |
|---|---|---|---|
| `202` | Accepted, awaiting external approval | Render the `externally_pending` state from §9.7b, never a success | |
| `400` | Invalid input | Something in the form is not right. Check the highlighted fields. | Hay algo que no cuadra. Revisa los campos marcados. |
| `401` | No session or expired token | Your session ended. Log in again to continue. | Tu sesión ha terminado. Inicia sesión otra vez para continuar. |
| `403` | Forbidden, cross tenant, not on plan | Render `locked_by_plan` for `not_on_plan`. Otherwise: You do not have access to this. | Para `not_on_plan`, usa el estado del plan. Si no: No tienes acceso a esto. |
| `409` | Conflict | Depends on the surface. Signup: that email already has an account. | Depende de la pantalla. Registro: ese email ya tiene una cuenta. |
| `422` | Unprocessable | We could not use that. Check the details and try again. | No hemos podido procesarlo. Revisa los datos e inténtalo otra vez. |
| `424` | Degraded | Render the `degraded` state from §9.7b. | |
| `429` | Rate limited | Too many attempts. Wait a moment and try again. | Demasiados intentos. Espera un momento e inténtalo otra vez. |
| `5xx` | Server error | Something broke on our side. Try again, or book a demo and we will help directly. | Algo ha fallado por nuestra parte. Inténtalo otra vez, o reserva una demo y te ayudamos directamente. |

**`202` is the one to get right.** It is an acceptance, not a success. Rendering it as a green
tick is the `externally_pending` violation wearing a different hat.

**Blocked on `MF-04`:** the enumeration of `code` values. The table above is keyed to HTTP
status because that is all the handoff lists. Per code copy cannot be written until the
enumeration exists, and this is the largest single blocker on the authenticated error surface.


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

### 9.9 Connection and status states

**New in Wave A2.** The backend handoff §4 defines **eight status values** as an exact
vocabulary, and requires each to render distinctly. This is the copy for them. Implementation
takes these strings and does not write its own, because two of them are release blocking if
worded loosely.

**The five wizard step states.**

| Status | EN | ES | Intent |
|---|---|---|---|
| `completed` | Done | Hecho | Verified server side. |
| `needs_action` | Your turn | Te toca | The agency must do something. |
| `externally_pending` | Waiting on {provider} | Esperando a {provider} | **Never rendered as done.** |
| `locked_by_plan` | Included on a higher plan | Incluido en un plan superior | An upgrade path, never an error. |
| `optional` | Optional | Opcional | Not required to launch. |

**The three connector health states.**

| Status | EN | ES | Intent |
|---|---|---|---|
| `connected` | Connected | Conectado | Live and healthy. |
| `degraded` | Connected, needs attention | Conectado, requiere atención | Impaired. **Not an error and not `connected`.** |
| `action_required` | Action needed | Requiere acción | A real problem the owner must resolve. |

**Three rules that are not stylistic.**

1. **`externally_pending` is never presented as done.** Backend handoff §3 and Appendix B
   invariant 5, and `CLAIMS_MATRIX.md` O-00d. Breaching it is P0. The word *pending* alone is
   not enough: it must name who is being waited on, which is why the string carries
   `{provider}`.
2. **`degraded` is a third state, not a shade of one of the others.** Writing it as *connected*
   hides a real problem; writing it as *error* triggers support calls for something still
   working. The two part label is deliberate.
3. **`locked_by_plan` is never phrased as a failure.** It is the one status on this list that
   is also a conversion moment, and *not available on your plan* wastes it.

**Blocked on `MF-11`:** the provider display name list. Until it lands, `{provider}` has no
approved values, and the string cannot be rendered for a real connection. Do not substitute a
vendor name inferred from the endpoint path.

**Blocked on `MF-07`:** branding upload limits. `400 unsupported_file_type` and
`400 file_too_large` are contracted, but the accepted content types and the size ceiling are
not, so the validation copy cannot state what is allowed. A validation message that cannot
name the limit is a bad validation message.

**Never rendered to the agency**, per Appendix B invariant 6: n8n or workflow identifiers,
webhook IDs, storage object IDs, tenant UUIDs, and technical entitlement keys such as
`px.experience`. The agency sees plain language and nothing else. This is also the
`CLAUDE.md` architecture rule, and the two agree.

### 9.10 Loading states

| Context | EN | ES |
|---|---|---|
| Button in flight | Sending | Enviando |
| Signup in flight | Creating your account | Creando tu cuenta |
| Login in flight | Signing you in | Iniciando sesión |
| Wizard step saving | Saving | Guardando |
| Upload in flight | Uploading | Subiendo |
| Checkout redirect | Taking you to checkout | Te llevamos al pago |
| Reading status | Checking | Comprobando |

**Rules.** The control stays mounted at fixed dimensions, so nothing shifts. A spinner appears
only after 300ms, because a faster response with a flashed spinner reads as slower than one
without. `aria-busy="true"`. The control cannot be resubmitted while in flight. No progress
percentage is invented for an operation whose duration is unknown.

### 9.11 Error states

Written against the contracted envelope `{ ok, code, message, details, request_id }` and the
contracted HTTP statuses.

| Status | EN | ES |
|---|---|---|
| `400 invalid_input` | Something in the form is not right. Check the highlighted fields. | Hay algo que no cuadra. Revisa los campos marcados. |
| `401 no_session` | You are not signed in. | No has iniciado sesión. |
| `401 token_expired` | Your session ended. Log in again to continue. | Tu sesión ha terminado. Inicia sesión otra vez para continuar. |
| `403 forbidden` | You do not have permission for this. | No tienes permiso para esto. |
| `403 not_on_plan` | Included on a higher plan. | Incluido en un plan superior. |
| `409 conflict` | That has already been done. | Eso ya se ha hecho. |
| `422 unprocessable` | We could not process that. Check what you entered. | No hemos podido procesarlo. Revisa lo que has introducido. |
| `424 degraded` | The connection is working but needs attention. | La conexión funciona pero requiere atención. |
| `429 rate_limited` | Too many attempts. Wait a moment and try again. | Demasiados intentos. Espera un momento e inténtalo otra vez. |
| `5xx server_error` | Something broke on our side. Not on yours. Try again in a moment. | Algo ha fallado por nuestra parte. No por la tuya. Inténtalo en un momento. |

**Rules.**

1. **Never show a raw error code, a stack trace or an internal message.** The envelope's
   `message` field is documented as display safe, but the site does not rely on that: it maps
   `code` to its own approved string and falls back to the `5xx` line for anything unmapped.
2. **`request_id` is shown only in the `5xx` case**, as small print, so a visitor can quote it
   to support. It is a reference, never an explanation.
3. **Every error offers a real alternative path.** For anything blocking, that is *Book a
   demo*, because it is the one path that works.
4. **`403 not_on_plan` is not an error to the reader.** It uses the `locked_by_plan` wording
   and routes to plan selection.

**Blocked on `MF-04`:** the enumeration of `code` values. The mapping above is keyed to HTTP
status because that is all the handoff specifies. When `MF-04` lands, the mapping becomes code
first and this table becomes the fallback layer.

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
| Hot lead | **Not used. No Spanish term is needed.** | D-10 is `BLOCKED` on `MF-02`. There is no hot lead copy in either language, so there is nothing to translate. If a contract ever arrives, *oportunidad prioritaria* is the recommendation and *lead caliente* stays forbidden, because it reads cheap in a premium register. |
| Priority signal | **prioridad** | D-03's approved wording. Avoid *puntuación* entirely while L-09 is open. |
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

**Delivered in Spanish.** Strategy, register, terminology, formatting rules, the final
qualifier bank (§11.3b), the Spanish hero, navigation, footer, the full CTA library including
both trial variants, form field labels and validation, **the eight connection states (§9.7b),
the loading states (§9.7c), the response envelope states (§9.7d)**, and every string on the
five authenticated surfaces in §6.15 to §6.19.

The authenticated strings were written natively in Wave A2 rather than deferred, for one
reason: they are short, high frequency, and a visitor meets them at the moment they are handing
over a password. A translated approximation is most damaging exactly there.

**Still outstanding in Spanish.**

| Missing | Why it waits |
|---|---|
| Full ES body copy for the fourteen public pages | Written once the English clears the matrix. Translating gated body copy produces two sets of claims to re verify instead of one |
| ES titles and meta descriptions | §12 notes these are written natively, not translated. They depend on the body copy above |
| Wizard step titles and per step descriptions in ES | `INTEGRATION PENDING` on `MF-05`, the per step `detail` shape. The step **names** in §6.14 are settled; the descriptions are not |
| `externally_pending` provider names in ES | `MF-11`. The fallback *Esperando al proveedor* ships until then |
| Trial reminder copy in ES | `MF-06` cadence, and it does not exist in English either |
| Branding upload errors in ES | `MF-07` file type and size limits, and it does not exist in English either |
| Captcha copy in ES | `MF-08` provider not named |
| Day fifteen commercial wording in ES | Owner decision, and it does not exist in English either |

**Four of those eight do not exist in English yet.** They are listed here so the Spanish gap
is not mistaken for a translation backlog when it is actually a source copy backlog.

**A native Spanish review of §9.7b is the highest value item on this list.** Those eight
strings appear on every wizard step and every provider surface, so a stiff translation there
is repeated dozens of times across the product.

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

**This table is the audit path.** For any sentence on the site, find its surface here, read
the matrix rows it depends on, and check those verdicts. Nothing ships whose rows are not
`APPROVED` or `APPROVED-Q` with their owner and legal dependencies closed.

Private claim IDs are not used. The matrix carries roughly 140 rows with verdicts, and a
second register would only drift from it.

### 13.1 Public marketing tree

| Page | Depends on | Verdict state | Blocked by |
|---|---|---|---|
| Homepage | P-02, P-03, A-04, A-06, B-04, B-05, B-07, D-01, D-03, E-01, F-01, F-03, B-12, R-01, R-02, R-05, K-01, K-11 | Mixed | E-01 on L-01. Sections gated per module |
| Platform Overview | P-01, P-02, P-03, G-02, G-10, O-03, B-07, D-01, B-08, V-02 | APPROVED / APPROVED-Q | Security section on L-14 |
| AI Sales Agent | B-04, B-05, B-07, B-12, B-13, D-02 | APPROVED-Q | Follow up on L-01. Qualification on L-09 |
| Lead Intelligence and CRM | D-01, D-02, D-03, D-05, D-06, D-08, G-01, G-02, G-03, G-06, G-10, **G-11, G-11b** | APPROVED-Q | L-09 throughout. Vendor naming on owner decision D. **D-10 alerting BLOCKED** |
| Voice AI | V-02 only | OWNER | V-01 blocking. No page |
| Property Matching | F-01, F-02, **F-02b**, F-03, F-04 | APPROVED-Q | Fixed count F-03. Reverse matching E-04 on L-02. Portals F-06 REJECTED |
| Daily Assistant | I-01, I-02, I-03, I-04, I-05, I-06, I-08 | **OWNER, every row** | Illustrative examples only. I-07 on L-11 |
| Social Growth | C-01, C-02, C-03, C-04, C-07, C-08, A-06 | APPROVED-Q | Lead capture on L-07. WhatsApp continuation on L-08 |
| Reporting | R-01 … R-07, R-09, R-11, R-12, R-15 | APPROVED-Q | R-08 on L-11. R-03 and R-04 on L-09 |
| Property Experience | K-01 … K-04, K-06 … K-12, **K-17**, K-16 | APPROVED / APPROVED-Q | K-05 square metres on L-12. Quotas on PK-05 |
| Solutions and Outcomes | Inherits every module row it links to | Mixed | A row is never offered as an answer while its module is blocked |
| Pricing | PK-01, PK-03, **PK-06, PK-07, PK-09** | APPROVED / OWNER | PK-07 public or on request. `MF-10` currency and tax |
| Experience Nuova | CTA-3, S-02, S-03, S-05 | OWNER | Disclosure wording |
| Onboarding and Start | **O-00b, O-00c, O-00d, O-01, O-02, O-03, O-03b, O-03c, O-08, N-01, F-02b, G-11b, K-17** | **APPROVED-Q** | O-03d readiness destination on `MF-03` |

### 13.2 Authenticated tree, new in Wave A2

| Surface | Depends on | Verdict state | Blocked by |
|---|---|---|---|
| Signup | O-00, T-00, CTA-1 | APPROVED-Q wording, `INTEGRATION PENDING` | **L-14.** `MF-04`, `MF-08`, `MF-09`. §14.3 release |
| Login | O-00, CTA-6 | APPROVED-Q wording, `INTEGRATION PENDING` | **L-14.** Destination on `MF-03` |
| Trial status | T-00, T-00b | APPROVED-Q | **L-14.** `MF-06`. T-03 and T-03b never appear |
| Trial expiry | T-00c | APPROVED-Q | **L-14.** Day fifteen wording is an owner decision |
| Plan selection | PK-03, PK-06, PK-09 | APPROVED-Q | **L-14.** PK-04, PK-05, PK-07, `MF-10` |
| Connection states §9.7b | O-00d, G-14, A-10 | APPROVED-Q | `MF-11` provider names |
| Error states §9.7d | Uniform envelope | Structure approved | **`MF-04` code enumeration** |

### 13.3 Claims requested that no document supplies

Gaps, not rejections. Each is now a named missing field rather than an open question, which is
progress even though none is closed.

| Requested | Status | Where it was needed |
|---|---|---|
| **Hot lead alerting** | **`BLOCKED` on `MF-02`.** Not in the handoff, no matrix row, D-10 forbids every wording and every visual | Lead Intelligence §5, homepage, Daily Assistant, any phone mockup |
| **Testimonial video** | **`BLOCKED` on `MF-01`.** The confirmed payload has no media field | Testimonial surface, which is `LEGAL HOLD` regardless |
| **Dashboard destination** | **`BLOCKED` on `MF-03`.** P0 scope question | `Log in`, the wizard exit, the whole authenticated route tree |
| Reply specificity | Not contracted. B-04 covers that a reply happens, not what is in it | AI Sales Agent §2 |
| Reporting feeding back into behaviour | No evidence. Removed twice | Homepage loop, Reporting §5 |

**D-10 deserves a sentence of its own.** `CLAUDE.md` mandates hot lead alerts as a mandatory
selling point. The matrix forbids every wording and every visual, including a phone mockup,
because no endpoint, channel, routing or ownership model exists anywhere. **Three documents
want this capability and the one document that should define it does not contain it.** Until
`MF-02` lands, `CLAUDE.md`'s mandate cannot be honoured, and that is owner decision 16.

### 13.4 Rejected wording removed from this document

Cumulative across both reconciliation passes, so no later editor reintroduces any of it from
an earlier draft.

| Removed wording | Matrix row | Where it had reached |
|---|---|---|
| No setup needed | O-09 | Live site. Never entered this document |
| Always synced to your CRM | F-08 | Live site. Never entered this document |
| Works alongside the inbox, portals and CRM you already use | F-07, F-08 | Five pages in draft one |
| Scored 1 to 100, leads above 80 | D-04, S-04 | Live site, and draft one |
| Every enquiry answered in seconds | B-04, B-06 | Homepage hero, hero recommendation |
| Replied in under a second, replied in four seconds | B-06, S-04 | Live site, `/v2` draft, Experience Nuova |
| Every hot lead alerting statement and visual | **D-10** | Removed from three pages and never rewritten |
| Talk to Nuova | CTA-4 | Retired from the CTA vocabulary |
| WhatsApp public CTA | CTA-7 | Removed. No number exists |
| Chat launcher as a working control | CTA-5 `RESERVED` | Removed. A launcher that never answers is P0 |
| Website voice and WhatsApp sales concierge | V-14, V-15 `RESERVED` | Never drafted as live behaviour |
| Voice in the present tense | V-01, V-03 | Page deleted. One future block remains |
| Idealista, Fotocasa, any portal name | **F-06, unchanged** | Never entered this document |
| Three properties, three homes | F-03 | Property Matching hero and body |
| Keeps the thread alive, until they answer | E-01, E-05 | AI Sales Agent |
| Reactivation, in three phrasings | **E-04, L-02** | AI Sales Agent, Property Matching, Daily Assistant |
| Every tier runs the whole loop | PK-04 | Pricing, homepage |
| 30 minutes, 15 minutes | CTA-2 | Every CTA microcopy line, and two page bodies |
| Your data stays yours | B-15, N-03 | CTA microcopy, trust lines |
| One system instead of five | P-03 | Platform Overview hero, SEO copy |
| By agent, who is converting | **R-08, I-07, L-11** | Reporting |
| What your portal spend is buying | R-13 | Reporting |
| Named languages | B-07 | AI Sales Agent, Platform Overview |
| The lead signal list | **D-09, L-09** | Lead Intelligence |
| Free, start free, no credit card required | **T-01** | Held in Variant B, marked not approved. Never in page copy |
| Plus seven day extension, the number seven | **T-03, T-03b, L-13** | Never drafted. Explicitly excluded from Trial status |
| Testimonial mechanism in public copy | **T-03, L-13** | Never drafted |
| Every guarantee of revenue, ROI, closings, lead volume, market share, conversions, response time | A-08, B-06, B-14, C-11, E-06, F-09, I-10, K-15, R-13, R-14, V-13, X-04, X-07 | Never drafted, and now enumerated in one place |

---

## 14. Open decisions for the owner

**The authoritative list is `CLAIMS_MATRIX.md` §21**, which now carries five lettered P0
decisions plus the numbered set, and its §22 carries fourteen legal dependencies. That list is
not duplicated here.

### 14.1 The five that block the most copy

| Matrix | Decision | What it unblocks in this document |
|---|---|---|
| **C** | **Is the 14 day trial free, and is a payment method required at signup?** | §3.4. Variant A ships without this answer; Variant B needs it. **Variant A is recommended precisely so the copy does not wait.** |
| **E** | **Release each product CTA individually under §14.3.** | Every product CTA. The activation register is empty, so nothing is wired regardless of how good the copy is |
| **B** | **Where does the product live after wizard step 10?** (`MF-03`) | `Log in`, the wizard exit, and whether §6.15 to §6.19 are pages on this site or somewhere else |
| **D** | **May the four confirmed CRM vendors be named? Are logo permissions held?** | Lead Intelligence §6, Onboarding step 7. Logos stay blocked either way |
| **A** | **May the website call a staging target?** | Not a copy question, but it decides whether any of this can ever be verified |

### 14.2 Decisions specific to copy and conversion

| # | Decision | Blocks |
|---|---|---|
| 1 | Approve the positioning in §1.2 and the operating loop in §1.4 | Every page |
| 2 | Approve the hero recommendation in §4.4 | Homepage |
| 3 | **Approve the public plan names, and confirm they are the names configured in `GET /plans`** | Pricing and plan selection. **New in Wave A2:** names are backend served at runtime, so a marketing decision alone is not enough. The site and the backend will otherwise display different names |
| 4 | Supply a real demo duration, or confirm none is published | Every CTA microcopy line |
| 5 | Are module names kept in English on the Spanish site, with Spanish descriptors? | The whole Spanish site |
| 6 | Is *Built in Spain* accurate? | The footer brand line |
| 7 | Merge *Lead Acquisition* into Social Growth and *Follow up Automation* into AI Sales Agent? | Routing and navigation |
| 8 | **Supply `MF-02`, or declare hot lead alerting out of the website's scope** | All hot lead copy, one homepage section, and `CLAUDE.md`'s mandatory selling point |
| 9 | **Ratify the trial CTA wording: Variant A or Variant B** (§3.4), and ratify state one as the shipping hierarchy | Site wide |
| 10 | The day fifteen commercial wording | Trial expiry §6.18 |
| 11 | Whether prices appear on the public marketing site at all (PK-07) | Whether Pricing ships as Layout A or Layout B |

### 14.3 Waiting on counsel, not on the owner

**L-14 is the one that matters most, and it grew on 2026-08-31.** Account creation, password
handling, JWT sessions, agency and team personal data, uploaded branding assets, provider OAuth
tokens held server side, testimonial consent and content, and a payment handoff are **all new
processing that the current privacy policy does not describe**. No authenticated surface
reaches a public URL before it closes. That is site wide and launch blocking.

The other thirteen are unchanged: L-01 follow up, L-02 reactivation, L-03 image storage, L-04
document storage, L-05 audio storage, L-06 retention, L-07 consents and controller roles, L-08
cross channel, L-09 automated profiling, L-10 AI disclosure, L-11 team performance visibility,
L-12 property measurement, L-13 incentivised testimonials.

> **A technical confirmation does not lift a legal hold.** T-03 is the worked example: the
> backend demonstrably implements the testimonial extension correctly, including the manual
> approval gate the owner specified, and it stays legally held and publicly forbidden.

---

## 15. Handover

**To the Product Truth and Claims instance.** §13.3 is the intake list, and it is now three
named missing fields rather than open questions. **`MF-02` is the one to chase**: it blocks a
capability `CLAUDE.md` calls mandatory, and no wording can exist without it. §9.2 still needs a
cleared simulation label; S-02 makes the wording an owner decision and §9.2 proposes three
options with a recommendation.

**To the Luxury UX and Authenticated Surface instances.** §9.7b owns the **wording** of the
eight contracted status values; `AUTHENTICATED_SURFACE_SYSTEM.md` §3 owns their **visual
specification**. The two must not drift, and `externally_pending` must never render as done in
either. Two further constraints are yours to hold: R-15 and K-16 require a visible illustrative
marker on every reporting visual and every sample property, and PK-05 forbids implying a quota
through bars, dots or comparative column heights.

**To the implementation instance.**

1. Do not take copy from this file into a component until its matrix rows are `APPROVED` or
   `APPROVED-Q` with owner and legal dependencies closed.
2. State one in §3.2 is the only CTA hierarchy that can ship. **Variant B in §3.4 may not be
   implemented, staged or previewed.**
3. **Capability status is a content property, not hard coded prose.** Qualifiers, entitlement
   labels and status strings change as evidence arrives, and must change without a rebuild.
4. **Prices, plan names and feature summaries are rendered from `GET /plans`, never authored.**
   A figure typed into a component is a P0 finding even when it is correct.
5. **Never render `message` from the response envelope directly.** Copy is written per code in
   §9.7d, in the visitor's language.
6. No technical identifier reaches the agency: no entitlement key, tenant UUID, storage object
   ID or workflow ID. Appendix B invariant 6.
7. No marketing form ships. A-04b is unchanged and there is no destination.
8. Every string in §9 is shared and belongs in one place, not repeated per component.

---

## 16. Status

**Delivered.** Positioning and the Nuova Operating Loop, message hierarchy, voice and banned
language, audience map, **a two state CTA system with the trial wording drafted as Variant A
and Variant B**, eight scored hero options with a binding recommendation, three package names,
**nineteen surfaces**: fourteen public pages each with the full field set required by the
brief, and five authenticated surfaces written for the first time in Wave A2. Navigation,
footer, and a shared microcopy library that now covers video empty states, simulation labels,
availability and entitlement labels, form copy, **the eight contracted connection states, the
loading states and the response envelope states**, trust lines, an FAQ bank and error states.
Mobile copy system, Spanish localisation strategy with the final qualifier bank and every
authenticated string written natively, SEO copy, a matrix keyed compliance register and the
open decisions specific to copy.

**Reconciled twice.** Against `PRODUCT_TRUTH.md` and `CLAIMS_MATRIX.md` when they arrived, and
again in Wave A2 against the backend handoff and the 44 row copy audit in
`FINAL_RECONCILIATION_REPORT.md` §4. §0.1b and §13.4 record every removal.

**Not delivered, deliberately.** Full Spanish body copy for the fourteen public pages, which
waits on the English clearing the matrix. Any wording for hot lead alerting, the testimonial
mechanism, the plus seven day extension, reactivation, follow up behaviour, voice capability,
a chat launcher, a WhatsApp CTA, a named portal, or a price authored by the website.

**The state of the work, stated plainly.** Copy exists for nineteen surfaces. **One conversion
path works**, *Book a demo*, through an external scheduling tool, and its current
implementation is defective (A-02). Everything else waits on an owner decision, a legal
clearance, a missing field, a §14.3 release, or website integration that does not exist yet.

**Drafted and awaiting owner decisions, legal clearance, and independent technical and final
audit.**

**No copy in this document is cleared for publication.** The gate is not this document's
completeness. It is `CLAIMS_MATRIX.md` §21 and §22, and `MASTER_GOVERNANCE.md` §14.3.
