/**
 * English copy. House rules: no dashes in public copy, no invented numbers,
 * no guaranteed outcomes, every capability statement bounded by the canonical
 * status carried in lib/content/capabilities.ts.
 */
export const en = {
  meta: {
    siteName: "NuovaSolution",
    title: "NuovaSolution. The operating layer of a real estate agency",
    description:
      "Enquiries answered, understood and carried forward in one system, with one record of each customer. Built for real estate agencies in Spain.",
  },

  nav: {
    platform: "Platform",
    overview: "Platform overview",
    menuTitle: "Everything Nuova does",
    overviewLine: "See how the parts fit together",
    packages: "Packages",
    trial: "Trial",
    contact: "Contact",
    login: "Log in",
    startFree: "Start free",
    // The account corner once a session exists (audit order 2026-10-08b): WORKING
    account: "My agency",
    logout: "Log out",
    loggingOut: "Logging out",
    signedOut: "You are logged out.",
    reports: "Reports",
    menu: "Menu",
    close: "Close",
    // Stage names in customer language (PRODUCT_TEXTS_C3_v1 §1.1)
    stages: {
      attract: "Be found",
      answer: "Answer enquiries",
      understand: "Organise leads",
      advance: "Show properties",
      handover: "Support your team",
    },
    // LAUNCH_COPY_v1 §7.1 (the menu itself lists the published capabilities from the register).
    stageLines: {
      attract: "",
      answer: "AI Sales Agent",
      understand: "Lead Intelligence, CRM",
      advance: "Property Experience, on request",
      handover: "Daily Assistant",
    },
    allCapabilities: "See every capability",
    // LAUNCH_COPY_v1 §7.2: exactly one sentence each for the two on-request modules, nowhere else.
    onRequest: "On request",
    // COPY_DELTAS_0929 D-43 (Voice) and D-42 (3D, 3D_FEATURE_TRUTH §2): these sentences and no others.
    // COPY_DELTAS_0930 D-49: 3D, with what the customer sends and what we check.
    onRequestLines: ["An interactive 3D model of your property in the browser, built by us on request. To scale from your plans; furniture and materials are illustrative. Tap a room, choose a floor, switch the furnishing on and off. You send us a dimensioned floor plan, and photos if you have them. We build the model from the plan, check it against your drawings, and you get a link. Furniture and materials are illustrative and can be switched off."],
    // COPY_DELTAS_0930 D-48: the phone is not something you can order; it has its own heading.
    beingBuilt: "Being built",
    beingBuiltLines: ["A phone assistant that answers calls is being built. It is not part of what you can order today, and we will say so plainly until it is."],
    faq: "Questions",
  },

  common: {
    skip: "Skip to content",
    language: "Language",
    english: "English",
    spanish: "Español",
    // LAUNCH_COPY_v1 §7.1: "Book a demo" only after the Reviewer's test booking (DEMO_PATH = PASS).
    bookDemo: "Request a demo",
    startFree: "Try free", // owner 2026-10-06 §2
    tryFree: "Try free for 14 days",
    noPayment: "No payment method required.",
    noSalesCall: "No sales call required.",
    readModule: "Read the module",
    explorePlatform: "Explore the platform",
    seePackages: "See the packages",
    talkToUs: "Talk to us",
    contactUs: "Contact us",
    external: "Opens in a new tab",
    illustrative: "Illustrative",
    example: "Example",
    stubData: "Local stub data",
    placeholder: "Placeholder",
    statusToday: "Status today",
    pending: {
      productView: "Product view. Capture pending.",
      film: "Film in production.",
      photo: "Photography pending.",
      filmFallback: "The film is being made. The fastest way to see the system work is to talk to us.",
      moduleFilmFallback: "We are filming this module properly rather than showing you a mockup. Book a demo and we will walk you through it live.",
      reducedMotion: "Motion is off, so here is the same thing in words.",
    },
    qualifiers: {
      q1: "Where the platform permits it.",
      q2: "Based on agency permissions and configuration.",
      q3: "Subject to applicable communication rules.",
      q4: "With human oversight and customer handling rules you define.",
      q5: "Available on the channels you have connected.",
    },
    bothHalves: "What is certified and what is still pending, stated plainly.",
    notAvailable: "Not available",
    env: {
      // PRODUCT_TEXTS_C2_v1 §7
      // PRODUCT_TEXTS_C3_v1 §5
      stub: { label: "Demonstration only", line: "Nothing you enter creates an account or reaches anyone." },
      staging: { label: "Test environment", line: "Accounts and data here are for testing and may be reset." },
      // Review preview (audit R24): visible on every page of a deployment that is not the released production site.
      preview: { label: "Preview", line: "Not public. Demonstration data only: nothing you enter creates an account or reaches anyone." },
    },
    errors: {
      no_session: "Your session has ended. Log in again to continue.",
      unresolved_membership: "Your login works, but your agency account is not set up yet.",
      forbidden: "Your role cannot change this. Ask your agency admin.",
      environment_misconfigured: "This environment is not configured correctly, so nothing was sent.",
      awaiting_contract: "This step is built but not connected yet. Nothing was saved.",
      not_selectable: "That option cannot be chosen right now.",
      invalid_provider: "That option is not offered.",
      rate_limited: "Too many attempts. Try again later, or write to us.",
      not_activatable: "Not everything needed to go live is in place yet.",
      generic: "That did not work. Nothing was changed. Try again, or contact us.",
      // The browser gave up waiting, or never reached us: nothing is blocked, the button is free again.
      timeout: "The connection took too long and nothing was changed. Check your connection and try again.",
      connection: "We could not reach the server. Nothing was changed. Check your connection and try again.",
      not_available: "This is not available on this site yet.",
      invalid_grant: "That email and password do not match an account.",
      email_not_confirmed: "Confirm your email address first, using the link we sent you.",
      invalid_input: "Some of what you entered is not valid. Nothing was saved.",
      server_error: "Something broke on our side. Nothing was changed. Try again in a moment.",
      link_expired: "This link has expired or was already used. Ask your agency admin or us for a new one.",
      weak_password: "Choose a longer password: at least 10 characters.",
      invalid_tax_id: "That tax number is not a valid CIF, NIF or NIE.",
      invalid_url: "One of the links is not a valid web address. Use the full address, starting with https://.",
      invalid_email: "That email address is not valid.",
      unsupported_file_type: "That file type is not accepted. Use PNG, JPEG or WebP.",
      file_rejected: "The file that arrived is not the image it said it was, so it was deleted. Export it again and upload it once more.",
      invalid_dimensions: "The image size does not fit. A logo needs at least 48 and at most 1024 pixels on each side, and must not be extremely tall or wide.",
      upload_expired: "The upload took too long. Choose the file again.",
      invalid_agency_name: "Enter your agency's name.",
      membership_not_active: "Your access to this agency is not active. Ask your agency admin.",
      notice_required: "Read and confirm the notice before choosing Google Sheets.",
      file_too_large: "That file is larger than 5 MB. Use a smaller one.",
      invalid_file_size: "That file could not be read. Try exporting it again.",
      invalid_asset_kind: "That kind of image is not accepted here.",
      upload_not_found: "The upload did not arrive. Try once more.",
      cross_tenant_asset: "That file cannot be used here. Upload it again from this account.",
      office_out_of_scope: "That office is outside what your role can change.",
      invalid_wizard_action: "That step cannot be changed like this.",
    },
  },

  home: {
    // Section texts: PRODUCT_TEXTS_C3_v1 §2 (H1 to H9). Card and view data: synthetic, labelled.
    // One sales path (owner criteria 2026-09-28): the pain of an agency, what Nuova does on one
    // continuous example (Laura M., a two bedroom flat in Estepona), the visible benefit, the next
    // step. Texts PRODUCT_TEXTS_C3_v1 §2; status sentences are not rendered (audit R27).
    // Texts LAUNCH_COPY_v1 §3 and §4 (2026-09-28): one person (Laura M.), one property (a two bedroom flat
    // in Estepona), four surfaces. The ES disclosure line is the owner-approved WhatsApp text v1.0-es, quoted.
    hero: {
      eyebrow: "For real estate agencies in Spain",
      h1: "Answered when it arrives", // COPY_DELTAS_1001 D-81
      lead: "A buyer writes while you are at a viewing. Nuova answers in her language, records what she asked for and leaves your team one task.", // WORKING (master order 2026-10-10 §4, §5); was COPY_HERO_1003 §1
      state: "Today in Spanish, for text enquiries on WhatsApp and email.", // COPY_HERO_1003 §1, the state line under the buttons
      qualifier: "On the channels you connect.",
      note: "14 days free. No payment.",
      ctaSecondary: "See how it works",
      cards: {
        synthetic: "Example with synthetic data",
        // One person across every surface, the same as in the Daily captures (daily_media/MANIFEST.md): Laura Serrano, Thursday morning.
        enquiry: { channel: "WhatsApp · new enquiry", time: "Tuesday 11:20", text: "Hello, I am Laura Serrano. Is the two bedroom flat in Estepona still free to view? We are in Manchester and could come on Thursday morning.", from: "Laura Serrano" }, // D-09
        answer: {
          label: "Answered by Nuova, under your agency's name",
          time: "Tuesday 11:20",
          disclosure: "I am an AI assistant. I will help you with your property enquiry. If you prefer to speak to a human agent, tell me at any time.",
          disclosureMark: "Sample translation. The approved notice is the Spanish one.", // D-78
          // No availability is confirmed: there is no inventory source behind the example (external finding 13, COPY_DELTAS_0929 D-10).
          text: "Hello Laura, thank you for writing. I have noted your interest in the flat in Estepona and Thursday morning. Would 10 or 12 suit you better? An agent from the agency will confirm with you.", // WORKING (owner 2026-10-06 §3)
          // D-79: the former disclosureNote is gone; flow.stepsDetail (D-77) says it once.
        },
        // D-12: no priority and no qualification (not in production, LEAD_TRUTH_INPUT_v1 §1); the record shows what the customer asked for.
        record: { label: "Customer record", name: "Laura Serrano", lines: ["Asked for: 2 bedrooms, Estepona · EST-204", "Wants to view: Thursday morning", "Writes in: English"], next: "Next: a task for your team" },
        task: {
          label: "Your team's tasks, today",
          title: "Confirm Thursday's viewing with Laura Serrano",
          reason: "Reason: viewing requested, Estepona, 2 bedrooms",
          state: "Open · nobody has claimed it yet",
          action: "Claim",
          note: "A request is not an appointment. The task exists so a person confirms the time.",
        },
      },
    },
    // Three concrete pains, each followed by what the product does about it (owner order 2026-09-29 B).
    // Pain sentences 1 and 2 and the benefits are LAUNCH_COPY_v1 / DAILY_FEATURE_TRUTH §2 sentences;
    // pain 3 and the three labels are interim implementer wording until COPY_DELTAS_0929.
    problem: {
      h2: "The enquiry arrives at the worst moment",
      lead: "You are at a viewing when it lands.",
      items: [
        { label: "Lost enquiries", pain: "It waits until the evening. By then they have written to another agency.", benefit: "Text enquiries are answered and recorded under your agency's name." },
        { label: "Scattered context", pain: "Monday starts with a full inbox and no order to it.", benefit: "The conversation and what the customer asked for stay on one record, so the next person to open it sees everything without asking." },
        { label: "Unclear ownership", pain: "A viewing was asked for, and nobody knows who calls back.", benefit: "Whoever takes a task owns it. The others can see that it is taken and by whom." },
      ],
      benefitLabel: "With Nuova",
      close: "None of that is a discipline problem. There is simply nobody free at 21:40 on a Sunday.",
    },
    flow: {
      eyebrow: "What Nuova does",
      // COPY_DELTAS_0929 D-02 to D-08: one journey of four steps that ends with a person acting; setup is not a step.
      h2: "From a message to a finished task",
      lead: "The enquiry is answered in the customer's language. It becomes one record with what they asked for. A viewing request becomes a task, and one of your people takes it and closes it.",
      steps: ["Answered", "Recorded", "Handed over", "Done"],
      stepsDetail: "Written by the assistant, and it says so. It agrees no price, no date and no condition.", // D-77
      cards: {
        answer: { step: "Answered", title: "WhatsApp and e-mail", line: "Text enquiries are answered and recorded under your agency's name." },
        understand: { step: "Recorded", title: "One record per enquiry", line: "The conversation and what the customer asked for stay on one record, so the next person to open it sees everything without asking." },
        handover: { step: "Handed over", title: "One clear task, not a reminder", line: "A viewing request becomes a task with a name, a reason and an owner. Your team claims it and completes it." },
        done: { step: "Done", title: "One of your people finishes it", line: "One tap takes the task, one tap completes it. The card shows who took it, and nobody can take the same task twice." },
        setup: { step: "Your setup", title: "Your agency, set up by you", line: "Your agency details, your legal details and your logo, plus your team and their roles. Your progress is saved between sessions." },
      },
    },
    views: {
      conversation: {
        agency: "Your agency",
        channel: "WhatsApp",
        synthetic: "Synthetic data",
        assistant: "Nuova · AI assistant", // D-76
        caption: "The reply that goes out, with the notice it must carry.",
        time: "21:40",
        footer: "Names and times are invented.",
      },
      board: {
        title: "Leads",
        subtitle: "Your agency · this week",
        // D-13: rows say what was asked for and what comes next; no qualification, no priority chip.
        columns: { asked: "Asked for", next: "Next" },
        rows: [
          { name: "Laura Serrano", asked: "2 bedrooms, Estepona · EST-204", next: "A task for your team" },
          { name: "Peter and Anna K.", asked: "A valuation in Marbella", next: "Call this week" },
          { name: "Carlos R.", asked: "A villa in Benahavís", next: "Reply on WhatsApp" },
          { name: "Sofía L.", asked: "A long term rental in Fuengirola", next: "Wait for her reply" },
        ],
        footer: "Synthetic data. One week of enquiries, each one as a record with what the customer asked for.",
      },
      task: { caption: "What your team does first, and why." },
      readiness: { label: "Example", withYou: "We set this up with you" }, // D-19
      // The real task surface (DAILY_FEATURE_TRUTH rows 1 to 6; captures 2026-09-28, synthetic data). The chat
      // assistant, a team board and a staff login address are not claimed: they do not exist in production.
      // Texts COPY_DELTAS_0929 §5 (MEDIA_CAPTIONS); playLabel, clipMeta and the alt text are the implementer's control labels.
      // Clip v2 (daily_clip_v2/MANIFEST.md, 2026-10-01): the request arrives on camera, an agent takes it, it is finished.
      // Texts COPY_DELTAS_1001 D-72 to D-75; the five cues are Daily's subtitles, approved as they are (§2.1).
      daily: {
        clipHeading: "A request, taken and finished", // D-72
        clipLead: "Under thirty seconds from the screen your team actually uses. No sound.", // D-73, length after clip v3 (22 to 26 s by cut)
        posterLabel: "", // clip v3: the poster is the opening frame and the first subtitle describes it (D-74 was written for the v2 poster)
        playLabel: "Play the clip",
        clipMeta: "Under 30 seconds, no sound",
        clipError: "The clip did not load. Try again in a moment.",
        clipAlt: "The task list in the staff app, with a request waiting to be taken.",
        note: "Recorded from the product with invented people and properties. The ring marks where the agent taps and is part of the recording.", // D-75
        cues: ["An agent sees what is waiting.", "Laura writes on WhatsApp, and her request arrives as a task with the reference and the time she asked for.", "The agent takes it.", "It is hers now. Nobody else can take it.", "Once it is done, it leaves the list."], // clip v3, Daily's subtitles
        stills: {
          tasks: "Each person sees their own list: taken, waiting, and what nobody has yet.",
          "task-action": "Taken by you. Only you can close it.",
          "task-done": "Closed. The task leaves the list.",
          "task-card": "The customer, the property and the time they asked for, on one card.",
        },
        mediaWithheld: "The recording of the staff list is being re-cut with the reference EST-204 and is shown again as soon as Daily delivers it.", // WORKING
        synthetic: "Synthetic data",
      },
    },
    // LAUNCH_COPY_v1 §3.4: the one-system idea, kept short.
    record: {
      eyebrow: "One system",
      h2: "Nothing lives in three places", // D-83
      lead: "The conversation, what the customer asked for and the task all sit on one record. Nothing has to be kept in someone's head, and nobody has to ask a colleague what was already said.", // D-46
    },
    access: {
      eyebrow: "Getting started",
      h2: "14 days free, no payment",
      lead: "Create your account, set your agency up yourself and decide with the system running. No payment during the trial, and no sales call needed.",
      link: "See what is included",
      steps: [
        { title: "Create your account", line: "Your name, your work email, a password. Then confirm your email." },
        { title: "Name your agency", line: "You name your agency and move on to the setup." }, // COPY_DELTAS_1003 D-88: the trial starts on activation
        { title: "Set it up yourself", line: "Your agency details, your legal details and your logo, plus your team and their roles." }, // D-51
      ],
      noCharge: "Nothing is charged, and we do not ask for a card at any point in these three steps.", // D-53
      viewCaption: "You set your agency up yourself, one step at a time.",
    },
    offer: {
      eyebrow: "Plans",
      h2: "Start free, then choose a plan",
      lead: "14 days free with no payment. After that you choose a plan with us. We tell you the price for your agency before anything is agreed.",
      link: "See the plans",
    },
    ask: {
      eyebrow: "Ask",
      h2: "Ask Nuova anything about the product.",
      lead: "Answers come from what NuovaSolution has confirmed about its product. Prices, legal and tax questions go to a person.",
      points: ["Answers in English or Spanish."],
    },
    // Home section in place of the question box (COPY_DELTAS_0930 §3 frame); the link label is interim.
    faqTeaser: { link: "All questions" },
    closing: {
      h2: "Your next enquiry is already on its way",
      body: "The only question is what happens to it.",
      /** Empty on purpose: the payment sentence appears once per page, in the hero note or the getting started section. */
      caption: "",
    },
    // Home v3. Headline: the owner's line; W-1 to W-7 confirmed by COPY_WORKING_TEXTS_1006, W-8 and W-9 replaced
    // there. Texts marked WORKING are the implementer's working text for Copy to confirm after the implementation
    // (owner follow-up order 2026-10-06). The example reference is EST-204 everywhere (COPY_DELTAS_1003 §7).
    v3: {
      workingText: "Working text. The wording is not final.",
      story: {
        name: "Laura Serrano",
        time: "Tuesday 11:20",
        fields: [
          { k: "Asked for", v: "2 bedrooms, Estepona · EST-204" },
          { k: "Wants to view", v: "Thursday morning" },
          { k: "Writes in", v: "Spanish" },
          { k: "Channel", v: "WhatsApp" },
        ],
      },
      hero: {
        h1Soft: "Less admin.", // W-1
        h1: "More time for your clients.", // W-1
        lead: "Nuova replies in Spanish to enquiries on WhatsApp and email, records what each client asks for and makes the next step clear.", // W-2
        ctaDemo: "See the demonstration", // W-3
        trialLine: "14 days · No card", // owner 2026-10-06 §2, matches the real flow (no payment method, no card)
        labels: { enquiry: "WhatsApp enquiry", reply: "Reply in Spanish", crm: "Customer record", next: "Next step" }, // COPY_HERO_1003 §2, W-4
        example: "Illustrative example",
        replay: "Play again",
        surfaceLabel: "Example: a WhatsApp enquiry, the reply in Spanish, the customer record and the next step",
      },
      demo: {
        eyebrow: "The product in action",
        h2: "What Nuova does, in five scenes", // WORKING
        lead: "Choose a scene. Each one says what is available today and what is still a prototype.", // WORKING
        controls: { prev: "Previous step", next: "Next step", pause: "Pause", play: "Play", step: "Step", of: "of", scenes: "Scenes" },
        short: "Shortened view",
        full: "Show the full conversation",
        fullHide: "Hide the full conversation",
        fullTitle: "The full conversation, with the notice every reply carries",
        record: { updated: "Updated now", from: "From the WhatsApp conversation · Tuesday 11:20" },
        task: { taken: "Taken by you", complete: "Mark as done", done: "Done. It leaves the list.", again: "Start again" },
      },
      // The trial, offered again after the demonstrations: the real steps, in their real order (owner 2026-10-06 §2).
      offer: {
        cta: "Try free",
        line: "14 days · No card",
        stepsTitle: "How you start", // WORKING
        steps: [
          { title: "Create your account", line: "Your name, your work email, a password." }, // WORKING
          { title: "Name your agency and set it up", line: "Your details, your legal details, your logo, your team." }, // WORKING
          { title: "Connect your channels with us", line: "WhatsApp and email are connected together with us; that is a separate step from the account." }, // WORKING, FAQ Q-40
        ],
        note: "No minutes are promised: setting up takes as long as your details take.", // WORKING
      },
      packages: {
        eyebrow: "Packages",
        h2: "Three packages, each on top of the last", // WORKING
        lead: "What each package adds, with its honest state. 3D models can also be ordered on their own.", // WORKING
        includes: "Includes",
        perMonth: "per month",
      },
    },
  },

  platform: {
    eyebrow: "Platform",
    h1: "Everything one enquiry needs, in one place", // D-47
    lead: "Each part of Nuova does one job properly, and they share one record, so the answer, the context and the task are never in three different places.",
    indexEyebrow: "Capabilities",
    indexH2: "What Nuova does for your agency.",
    exampleEyebrow: "One enquiry, end to end",
    exampleH2: "From a message to a finished task",
    tenant: {
      eyebrow: "Your environment",
      h2: "Each agency has its own branded environment.",
      body: "Your logo, your email branding, your configuration, your team and your roles. Your customers hear from your agency, under your brand. In development.",
    },
  },

  product: {
    eyebrowPrefix: "Platform",
    whatItDoes: "What it does",
    inPractice: "In practice",
    scenarioLabel: "Illustrative scenario",
    film: "The film",
    fits: "Fits your operation",
    related: "Related",
    statusHeading: "Status today",
    notAvailableHeading: "Not available",
    bothHalvesHeading: "Both halves, stated plainly",
    certified: "Certified internally",
    pending: "External gate pending",
  },

  packages: {
    // PRODUCT_TEXTS_C3_v1 §3: no price, interval or discount anywhere until PRICING_AUTHORITY exists.
    eyebrow: "Plans",
    // LAUNCH_COPY_v1 §5.1 interim wording (trial plan not Essential yet); the Essential wording after TRIAL_PLAN_ALIGNED.
    h1Neutral: "Start with 14 days of trial",
    leadNeutral: "14 days, no payment method. After that you choose a plan with us, and we tell you the price for your agency before anything is agreed.",
    // COPY_DELTAS_0929 D-20, D-21: the Essential wording is released (PRODUCT_TRUTH_TABLE_v1 §G).
    h1: "Try Essential free for 14 days",
    lead: "14 days of Essential, free, with no payment method. After that you choose a plan with us, and we tell you the price and the billing period before anything is agreed.",
    plansEyebrow: "The plans",
    included: "Included",
    baselineHeading: "What every plan includes",
    baseline: ["CRM", "Lead Engine", "Automatic replies", "Basic follow up", "Property matching", "Core reporting"],
    baselineLine: "Every plan includes the replies, the record and the tasks. The CRM is included from the start.", // D-30
    noPriceHeading: "Pricing",
    noPriceBody: "We tell you the price for your agency before anything is agreed. There is no self-service billing. Start the free trial or talk to us.",
    notAvailable: "Billing self-service is not available.",
    stubNote: "Plan names and contents shown here come from a local stub while the backend connection is pending. They are not an offer.",
    plansAwaiting: "Plan names and contents are read from the backend. In this environment that connection is not available yet, so none are shown.",
    cta: "Start free",
    ctaSecondary: "Talk to us about plans",
    faqEyebrow: "Questions",
    faq: [
      { q: "Do I need a card to start?", a: "No. Nothing is charged during the trial and no payment method is asked for." },
      { q: "Can I pay online?", a: "Not on this site. We send an invoice and you pay by bank transfer." },
      { q: "Do I have to talk to someone first?", a: "No. You can start on your own. A demo is optional." },
      { q: "What happens after 14 days?", a: "You keep your account and your data. Paid features pause until you choose a plan." },
    ],
    tiersEyebrow: "Three plans, side by side",
    tiersLead: "What each plan includes, read from the plan catalogue.",
    proposalLine: "Tell us your offices, your team and your channels, and we send you a proposal.",
    amount: "Price for your agency",
    amountLine: "We tell you the price and the billing period before anything is agreed.", // D-29
    amountNote: "There is no card checkout and no automatic renewal. Receiving an invoice does not activate the plan; the confirmed payment does.",
    trialEyebrow: "Trial and expiry",
    trialLines: [
      "14 days, free, with no payment method.",
      "Your account and your data stay. Paid features pause until you choose a plan. You can still log in.",
    ],
    // Pricing comparison (owner order 2026-09-29): what differs is shown once per plan, what is shared is said once.
    // Interim implementer wording until COPY_DELTAS_0929; amounts and the period come from PRICING_AUTHORITY (O-7).
    noPaymentMethod: "No payment method",
    compareHeading: "What differs between the plans",
    compareLead: "All three plans include the same working parts today. They differ in size: offices, seats and enquiries per month.", // D-25
    planColumn: "Plan",
    periodHeading: "Price and billing period",
    periodLine: "We state the price and the billing period in your proposal and on every invoice. Nothing is charged automatically.",
    planLines: { essential: "One office and a small team.", growth: "A larger team in one office.", scale: "Several offices." },
    // Trial badge and CTA move onto Essential only after the API signal TRIAL_PLAN_ALIGNED (audit R26).
    trialBadge: "14 days of trial",
    trialBadgeAligned: "14 days free", // D-22: the chip sits on the Essential card only
    ctaTrialEssential: "Try Essential free",
    limitsHeading: "Limits",
    limits: { offices: "Offices", seats: "Seats", leads_month: "Leads per month", crm_connections: "CRM connections", voice_minutes: "Voice minutes", unlimited: "No monthly cap", none: "None" },
    featuresHeading: "Included",
    featureNames: {
      "cx.baseline": "Automatic text replies",
      "channel.email": "Email through Gmail", // D-27
      "channel.whatsapp": "WhatsApp",
      "lead.qualify": "What each customer asked for, kept on their record", // D-26
      "crm.core": "CRM included",
      "followup.basic": "Basic follow up",
      "consent.handling": "Consent handling",
      "reporting.basic": "Core reporting",
      "property.matching": "Property Matching",
      "lead.engine.orchestrate": "Meta Lead Ads and Google Lead Forms intake",
      "reporting.advanced": "Advanced reporting",
      "channel.voice": "Voice",
      "feed.structured": "Structured property feed",
    },
    ctaTrial: "Start free",
    ctaProposal: "Request a proposal",
    payEyebrow: "How paying works",
    payH2: "An invoice, paid by bank transfer",
    // LAUNCH_COPY_v1 §5.2: four separated steps; the fourth is not the third.
    paySteps: [
      { title: "You request the plan.", line: "You tell us which plan you want." },
      { title: "We issue the invoice.", line: "It states the amount and the bank details." },
      { title: "You transfer the amount.", line: "From your own bank, whenever you choose." },
      { title: "We confirm the payment and activate the plan.", line: "A person checks that the amount arrived." },
    ],
    checkoutNote: "An issued invoice does not activate anything. The confirmed payment does. There is no card payment on this site and no automatic renewal.",
  },

  trial: {
    eyebrow: "Trial",
    h1: "Try free for 14 days.",
    lead: "Set your agency up and decide with the system running.",
    ctaPrimary: "Start free",
    ctaSecondary: "See the packages",
    howEyebrow: "How it works",
    howH2: "The conditions, in plain sight.",
    how: [
      { title: "14 days free", line: "Create your agency account and set up your own environment." },
    ],
    honesty: {
      h2: "What the website never does",
      lines: [
        "The browser never grants a trial, an entitlement, a role, a readiness state or an extension. Every one of those comes from the backend.",
        "The remaining days shown in your account come from the server, never from a countdown computed in your browser.",
      ],
    },
    filmEyebrow: "Setting up",
    filmH2: "What you provide, and what you see afterwards.",
    stepsEyebrow: "Your environment",
    stepsH2: "You set your agency up yourself.",
    stepsLead: "One step at a time, in your own time. Your progress is saved, so you can stop and pick up where you left off.",
    steps: [
      { title: "Account", line: "Your name, your email, your language." },
      { title: "Agency details", line: "Company name, address, contact details and the languages you work in." },
      { title: "Branding", line: "Your logo and your email banner, for the messages that go out under your brand." },
      { title: "Team", line: "Add your team and set their roles: agent, team lead, office manager, agency admin." },
      { title: "Channels", line: "Connect your channels, based on the permissions you hold." },
      { title: "Lead sources", line: "Connect the places your leads already come from." },
      { title: "CRM", line: "A CRM is included from the start. If you use another one, tell us which: connecting it is not offered yet, and you stay on the included CRM meanwhile." },
      { title: "Property source", line: "Point it at your own website, a supported feed or your CRM inventory." },
      { title: "Readiness", line: "A clear readiness check before you go live. A step waiting on a provider is never shown as done." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    h1: "Talk to a person.",
    lead: "Direct human reach, in English or in Spanish. A demo is optional and never a condition for starting the trial.",
    emailLabel: "Email",
    demoEyebrow: "Optional",
    demoH2: "Request a demo", // D-31
    demoBody: "We walk you through the system on a real example and you can ask anything. No slide deck.", // D-32
    demoCta: "Request a demo",
    trialH2: "Or just start",
    trialBody: "Try free for 14 days. No payment method required, no sales call required.",
    // A plan interest from the packages page is carried into the request (audit Z03, Z11). The plan name comes from the catalog.
    planInterest: "Plan of interest: {plan}",
    planInterestBody: "Write to us with your agency's name and we send you a proposal for this plan.",
    proposalSubject: "Proposal request: {plan}",
  },

  signup: {
    // AUTH_COPY_v1 §1. The payment sentence appears once on the page, here in the lead.
    eyebrow: "Start free",
    h1: "Create your agency account",
    lead: "14 days free. No payment.",
    fields: {
      name: "Your name",
      agency: "Agency name",
      email: "Work email",
      emailPlaceholder: "you@agency.com",
      password: "Password",
      language: "Language of your account",
    },
    passwordHelp: "At least 10 characters.",
    submit: "Create account",
    submitting: "Creating your account",
    privacy: "Your details are used to create your agency account. Read the privacy notice.",
    haveAccount: "Already have an account?",
    loginLink: "Log in",
    success: "Account created. Let us set your agency up.",
    errors: {
      email_exists: "That email already has an account. Log in instead.",
      invalid_input: "Something in the form is not right. Check the highlighted fields.",
      captcha_failed: "That check did not pass. Try it once more.",
      rate_limited: "Too many attempts. Try again later, or write to us.",
      server_error: "Something broke on our side. Nothing was changed. Try again, or contact us and we will set you up together.",
      required: "We need this one to create your account.",
      invalidEmail: "That email address does not look right.",
      shortPassword: "Use at least 10 characters.",
    },
    stubNotice: "Local stub. This form does not create a real account until the backend connection is released.",
    // AUTH_COPY_v1 §1.1: the one hour is the contracted link lifetime; no delivery time is promised.
    checkEmail: {
      h: "Confirm your email",
      body: "We sent a link to {email}. Open it to continue. The link works for one hour.",
      otherDevice: "If you open the link on another device, log in here afterwards with your email and password.",
      wrongAddress: "Wrong address? Start again with the right one.",
      noMail: "No email after a few minutes? Check spam, then contact us.",
    },
    goToLogin: "Go to log in",
    languageHelp: "Only for your account and our emails to you. The language used with your customers is set when you name your agency.",
    rateErrors: {
      over_email_send_rate_limit: "Our mail server is sending too many emails right now, so this one was not sent. If you already submitted this form, check your inbox first. Otherwise try again later, or write to us.",
      over_request_rate_limit: "Too many requests in a short time. Try again later. Nothing you typed is lost.",
    },
  },

  login: {
    // AUTH_COPY_v1 §3
    eyebrow: "Log in",
    h1: "Log in",
    lead: "Continue where you left off.",
    fields: { email: "Email", password: "Password" },
    submit: "Log in",
    submitting: "Logging you in…",
    redirecting: "Logged in. Opening your agency…",
    forgot: "Forgot your password?",
    forgotUnavailable: "Password reset is not available yet. Write to us and we will help you.",
    noAccount: "No account yet?",
    createLink: "Create one",
    errors: {
      invalid_grant: "That email and password do not match an account.",
      email_not_confirmed: "Confirm your email first. Open the link we sent you.",
      rate_limited: "Too many attempts. Try again later.",
      server_error: "Something broke on our side. Nothing was changed. Try again in a moment.",
      required: "We need this one to log you in.",
    },
    stubNotice: "Local stub. Any email and password open the stub onboarding while the backend connection is pending.",
    // AUTH_COPY_v1 §2: an already confirmed person is routed to the login, never back to sign up.
    confirmedHint: "If you already confirmed your email, log in with the password you chose. One step is left: name your agency.",
    resend: "Send a new link",
    resent: "A new link is on its way to {email}.",
    resendFailed: "Too many attempts. Try again later, or write to us.",
  },

  onboarding: {
    eyebrow: "Onboarding",
    h1: "Set your agency up.",
    lead: "Each step shows its real status. Anything waiting on someone else says so.",
    progress: "complete",
    resume: "Continue where you left off",
    activatable: "Your agency is ready to go live.",
    notActivatable: "A few things are still needed before you go live.",
    blockedMandatory: "Required", // D-57
    blockedFeatures: "Disabled features never block readiness",
    // One state vocabulary (COPY_DELTAS_1001 §1.1): Saved · Connected · Checked · Required, plus the honest "Waiting on {provider}".
    stepStatus: {
      completed: { label: "Saved", line: "What you entered is stored for your agency." }, // D-54
      needs_action: { label: "Required", line: "This step is still needed from you." }, // D-55
      externally_pending: { label: "Waiting on {provider}", line: "Sent. {provider} has not approved it yet. Nothing more for you to do right now." },
      locked_by_plan: { label: "Not on your plan", line: "Available on the plans that include it." },
      optional: { label: "Optional", line: "Not needed to go live. You can come back to it." },
    },
    connector: {
      connected: { label: "Connected", line: "Working." },
      degraded: { label: "Needs a look", line: "Still working, but something has changed on the provider's side." },
      action_required: { label: "Action needed", line: "Something on the provider's side has changed and this has stopped working properly." },
    },
    providerFallback: "the provider",
    stubCases: "Stub cases",
    stubNotice: "Rendered from a local stub of the readiness contract. Nothing here is a real account.",
    caseLabels: ["Fresh account", "Partly complete", "Waiting on a provider", "Locked by plan", "Optional steps skipped", "Ready to go live"],
    trialEnd: "Your trial ends on {date}.",
    notice: "Notice",
    crm: {
      // PRODUCT_TEXTS_C2_v1 §1.2. UI state lines (save, saved, sheetsNext, notReadable, registerInterest) are the implementer's, not claims.
      heading: "Where your leads are kept",
      lead: "A CRM is included from the start.",
      nativeTitle: "No external CRM. Use the CRM included in Nuova.",
      nativeTag: "Included · Recommended",
      nativeBody: "Each enquiry becomes a lead with the contact details, what the person asked for and the conversation so far. Viewing requests become tasks for your team. Nothing to connect and nothing extra to pay.", // D-86
      nativeLimits: "It is not a replacement for an accounting or transaction system, and it does not import records from another CRM.",
      sheetsTitle: "Also keep a copy in Google Sheets",
      sheetsBody: "Nuova stays the place where leads are kept. A Google Sheet receives a copy you can open, filter and share.",
      externalGroup: "Your own CRM",
      externalSoon: "Interest only", // D-60
      externalBody: "Connecting {provider} is not offered. Selecting it records your interest, nothing is sent to {provider}, and your leads stay in the CRM included in Nuova.", // D-61
      registerInterest: "I use {provider}",
      interestSaved: "Interest recorded. Nothing is sent to {provider}.", // D-62
      unavailable: "Not offered",
      other: "My CRM is not listed",
      otherBody: "That CRM is not offered. You are on the CRM included in Nuova, and you can change this later.",
      done: "Using the CRM included in Nuova.",
      chooseLabel: "Your selection", // D-59
      save: "Save choice",
      saved: "Saved. This is what the backend now holds for your agency.",
      sheetsNext: "Connecting the Google Sheet itself is a separate step that is not available on this site yet.",
      notReadable: "The Google Sheets choice cannot be read back in this environment yet, so it is not shown here.",
      savedStub: "Saved in this demonstration only. Nothing reached a backend.",
      sheetsChosen: "Selected, not connected", // D-63
      sheetsConnected: "Connected",
      sheetsOffUnavailable: "Turning the Google Sheets copy off is not available on this site yet. Your leads stay in the CRM included in Nuova either way.",
    },
    progressSteps: "{done} of {total} steps done",
    // Five areas (owner order 2026-10-01 §7); the progress counts only the steps that are really needed.
    progressRequired: "{done} of {total} required steps saved",
    progressShort: "{done} of {total} required", // the slim strip on the phone
    progressLabel: "Your progress",
    nextUp: "Next",
    goToStep: "Go to this step",
    noFormHere: "There is no form for this on the site yet. The status comes from your agency's account.",
    areas: {
      agency: { title: "Agency data and brand", line: "Who you are, your legal details, and the logo on your emails." },
      channels: { title: "Connections and channels", line: "Where enquiries come in, and what is connected to your agency." },
      crm: { title: "CRM and property sources", line: "Where your leads are kept, and where your listings would be read from." },
      team: { title: "Team and working hours", line: "Who works with the tasks, and the hours stored for your agency." },
      summary: { title: "Summary and activation", line: "What is checked, what is still required, and the step that goes live." },
    },
    // Step titles by backend key. The backend's own title is English only, so the page renders these.
    steps: {
      account: "Account",
      agency: "Agency details",
      branding: "Branding",
      team: "Team",
      communication: "Channels",
      lead_acquisition: "Lead sources",
      crm: "CRM",
      property_source: "Property source",
      property_experience: "Property Experience",
      ready: "Readiness",
    },
    gates: {
      // PRODUCT_TEXTS_C2_v1 §4.1. A key not listed here renders nothing (redaction boundary).
      agency_tenant: "Your agency account",
      owner_admin: "An admin for your agency",
      staff_provisioned: "Your team",
      plan_entitlements: "Your plan",
      white_label_legal: "Your legal details and branding",
      whatsapp: "WhatsApp",
      ai_disclosure: "The notice that tells your customers an assistant is replying",
      business_hours: "Your opening hours",
      routing_mode: "Who receives which enquiries",
      test_scenarios: "A test run before going live",
      launch_approval: "Final approval to go live",
      gmail: "Gmail",
      crm_connection: "An external CRM",
      google_sheets: "Google Sheets",
      voice_provider: "Voice",
      voice_transport: "Voice",
      paid_acquisition: "Lead ads",
      property_feed: "Property feed",
      property_matching: "Property matching",
      property_experience: "Property Experience 3D",
      legal: "Your legal details",
    },
    gateDetail: {
      white_label_legal: "Legal name, tax number (CIF or NIF), address, logo, and links to your own privacy notice and terms.",
      plan_entitlements: "Your trial carries the Essential scope for 14 days. What a paid plan includes is agreed with you before anything is signed.", // D-67
    },
    // D-66: nothing answers a call today; what is set is stored for the phone assistant being built.
    voiceLine: "No phone number is connected to your agency. What you set here is stored for when the phone assistant is ready, and nothing answers a call today.",
    // D-71: the website is not read today; property matching is switched on per agency later.
    propertySourceHelp: "Your website is where we would read your listings from, once property matching is switched on for your agency. Nothing is read from it today.",
    aiDisclosurePending: "Waiting on us. We are finalising the notice that tells your customers when an assistant is replying. You do not need to do anything.",
    readyWaitingOnUs: "Some of this is waiting on us, not on you. We will tell you when it clears.",
    readyError: "We could not load your readiness right now. Nothing has changed. Try again in a moment.",
    skip: "Skip for now",
    goLive: "Go live",
    goLiveNote: "Activation is performed by the backend. The browser only sends the request.",
    trial: {
      trialing: "{days} days left in your trial.",
      lastDay: "Last day of your trial.",
      trial_expired: "Your trial has ended. Your account has not.",
      active: "Your plan is active.",
      past_due: "There is a problem with your payment.",
      suspended: "Your account is suspended. Talk to us and we will sort it out.",
      canceled: "Your subscription has ended.",
      expiredBody: "You keep your account and everything in it. Premium features pause until you choose a package.",
    },
    branding: {
      heading: "Branding",
      logo: "Logo",
      banner: "Email banner",
      constraints: "PNG, JPEG or WebP. Up to 5 MB.",
      upload: "Choose a file",
      uploading: "Uploading",
      remove: "Remove",
      validated: "Validated by the server before it is stored.",
    },
    // AUTH_COPY_v1 §4
    register: {
      heading: "Name your agency",
      lead: "Your login works. This last step creates your agency, and the 14 days start when you activate it.", // D-89
      agencyName: "Agency name",
      agencyNameHelp: "The name your customers know.",
      language: "Main language with your customers",
      languageHelp: "Replies are written in the language each customer writes in. This is the default when we cannot tell.",
      timezone: "Time zone",
      submit: "Create agency and continue",
      submitting: "Creating your agency",
      alreadyRegistered: "Your agency already exists. Continuing to the setup.",
      backendError: "Something broke on our side. Your agency was not created, so nothing is half finished. Try again.",
    },
    setup: {
      heading: "Your agency setup",
      lead: "What you save here is stored for your agency and shown as the server read it back.",
      save: "Save",
      saved: "Saved. This is what is now stored.",
      invalidField: "Check this field: {field}.",
      adminOnly: "Only an agency admin can change this.",
      managersOnly: "Only a team member who manages users can change this.",
      business: {
        heading: "Business details",
        hoursHeading: "Opening hours",
        name: "Agency name",
        timezone: "Time zone",
        languages: "Languages your agency answers in",
        defaultLanguage: "Main language",
        hours: "Opening hours",
        hoursHelp: "Your hours are stored for your agency. They do not change when a text enquiry is answered: that happens whenever it arrives. They will steer the phone assistant, which is being built.", // D-64
        open: "Open",
        from: "From",
        to: "To",
        closed: "Closed",
        days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
        languageNames: { es: "Spanish", en: "English", de: "German", fr: "French", it: "Italian", nl: "Dutch", pt: "Portuguese" },
      },
      legal: {
        heading: "Legal details",
        lead: "These details go into the emails your agency sends through Nuova and onto the invoices we send you. Without them we cannot send in your name.", // D-68
        addressHelp: "Your address appears in the legal footer of those emails and on your invoices.", // D-69
        linksHelp: "These links are placed in the emails sent in your name, so the people who write to you can reach your own notices. Nuova's own notices are separate.", // D-70
        notReadable: "Saved legal details cannot be shown again here yet, so the form starts empty. Whether they are complete is shown under \"What is needed to go live\".",
        legalName: "Legal name",
        taxId: "Tax number (CIF or NIF)",
        addressLine: "Address",
        city: "City",
        postalCode: "Postal code",
        region: "Province (optional)",
        privacyUrl: "Link to your privacy notice",
        imprintUrl: "Link to your legal notice (optional)",
        termsUrl: "Link to your terms",
        missing: "Still missing: {list}.",
        complete: "Legal details and logo are complete.",
        fields: { legal_name: "legal name", tax_id: "tax number", address: "address", privacy_url: "privacy link", terms_url: "terms link", logo: "logo" },
      },
      branding: {
        lead: "Your logo and email banner go on the emails your agency sends through Nuova.",
        logoHelp: "Use a PNG with a transparent background, at least 48 pixels on each side. In emails it is shown up to 180 pixels wide.",
        darkHelp: "Many people read email in dark mode. A dark logo on a transparent background can disappear there. Check the preview on both backgrounds below.",
        previewLight: "On a light background",
        previewDark: "On a dark background",
        textFallback: "If no logo is set, your agency name is shown in text instead.",
        untouched: "We never recolour, crop or redraw your logo. If something looks wrong, upload a different file.",
        public: "Images you upload here are stored so that email programs can display them, which means anyone with the image link can open them. Do not upload anything confidential.",
        saved: "Saved. This is how it will look.",
        choose: "Choose a logo file",
        replace: "Replace the logo",
        stubNote: "Stub: your file is not stored. A labelled demonstration logo is shown instead.",
        // PRODUCT_TEXTS_C2_v1 §3.2 variant strings; the controls ship with WEBSITE_HANDOFF_v2 §3.
        darkLogo: "Logo for dark backgrounds (optional)",
        darkLogoHelp: "A light version of your logo. We use it where the background is dark.",
        chooseDark: "Choose a light version",
        needsLight: "My logo only works on a light background",
        needsLightHelp: "We then place it on a light panel so it stays readable in dark mode.",
      },
      calendar: {
        heading: "Appointments and hand-off",
        connected: "A calendar is connected.",
        notConnected: "No calendar is connected, so nothing is booked and no appointment is confirmed. A customer who asks for a time becomes a task for your team.", // D-65
        types: "Appointment types",
        typeNames: { viewing: "Viewing", valuation: "Valuation", call: "Call" },
        minutes: "{n} min",
        fallback: "When no calendar is connected",
        capture: "Ask the customer for a preferred time",
        callback: "Create a callback task for your team",
        callbackFixed: "Always on, so no request is dropped.",
        inform: "Tell the customer that someone will get back to them",
      },
      readiness: {
        heading: "What is needed to go live",
        mandatory: "Needed to go live",
        optional: "Optional",
        states: {
          READY: "Checked", // D-56
          BLOCKED: "Required", // D-57
          OPTIONAL: "Optional, never blocks going live",
          DISABLED: "Switched off for this account",
          UNSUPPORTED_GATE: "We cannot check this one yet. It does not block you.",
        },
      },
    },
  },

  welcome: {
    // AUTH_COPY_v1 §2 and §5
    eyebrow: "Welcome",
    h1: "Set your password",
    lead: "You were invited to your agency's account. Choose a password to continue.",
    forEmail: "Account: {email}",
    password: "New password",
    confirm: "Repeat the password",
    help: "At least 10 characters.",
    mismatch: "The two passwords do not match.",
    submit: "Save and continue",
    submitting: "Saving",
    checking: "One moment, we are checking your link.",
    noLink: "Open the link from the email we sent you.",
    expiredH1: "This link no longer works",
    expiredBody: "Links are valid for one hour.",
    expiredConfirmed: "If you already confirmed your email, just log in.",
    loginInstead: "Log in instead",
  },

  callback: {
    // PRODUCT_TEXTS_C2_v1 §2.2. The URL is a hint only: success is never shown from the query string.
    h1: "Connection result",
    connected: "{provider} is connected. New leads will also reach {provider}.",
    pending: "Sent. {provider} has not confirmed it yet. Nothing more for you to do right now. You stay on the included CRM until it does.",
    state_expired: "The connection took too long and timed out. Nothing has changed. Start it again when you are ready.",
    state_mismatch: "This connection belongs to a different agency account or setup. Nothing has changed. Start again from your own CRM step.",
    state_invalid: "This connection link was already used or is not valid. Nothing has changed. Start again from the CRM step.",
    user_cancelled: "You cancelled the connection. Nothing has changed.",
    access_denied: "Access was not approved in {provider}, so nothing was connected. If that was a mistake, try again and approve access.",
    wrong_account: "You signed in to a different {provider} account than expected. Nothing was connected. Sign out of {provider} and try again with your agency's account.",
    provider_error: "{provider} could not complete the connection. Nothing has changed. You can try again.",
    unknown: "We could not confirm the connection. Nothing has been marked as connected. Try again or contact us.",
    providerFallback: "The provider",
    back: "Back to onboarding",
  },

  legal: {
    placeholderBanner: "PLACEHOLDER. This text is not final and has not been reviewed by counsel. It is published so the route exists and is clearly labelled.",
    updated: "Last updated",
    privacy: { title: "Privacy notice" },
    terms: { title: "Terms of service" },
    dataDeletion: {
      title: "Data deletion",
      body: "You can ask us to delete the personal data we hold about you. A request on this page is received by a person and handled manually. This page does not itself delete anything. When the backend data subject request authority is connected, requests will be processed through it.",
      cta: "Request deletion by email",
    },
    notice: { title: "Legal notice" },
    contactLine: "Questions about these pages: antonio@nuovasolution.com",
  },

  // Social screens (account surface, staging). States and error texts: SOCIAL_UI_SPEC_v1 §2 and §5 (EN column,
  // binding). Everything the spec gives no English sentence for is the implementer's interim wording
  // (marked "interim") until Social and Copy deliver it.
  social: {
    eyebrow: "Social",
    navLabel: "Social sections",
    tabs: { connect: "Connect", post: "Post", inbox: "Inbox", settings: "Connection and data" },
    readOnly: "This page shows the state of your workspace. Each control is switched on only when the state allows it; the database decides, never the page.", // interim
    // The write side (SOCIAL_ACTIONS_CONTRACT_v1 §2, §3): why a control is off, and what an action answered. Interim wording where no §5 text exists.
    actions: {
      noRelease: "No release has been granted for this access yet.", // §5 (no release)
      notConfigured: "Instagram is not set up for this workspace yet.",
      needsConnection: "Connect an Instagram account first.",
      limitReached: "The agreed post limit is reached.", // §5
      stub: "Demonstration data: this action sends nothing here.",
      running: "Working …",
      done: "Done.",
      connectOpened: "Instagram opened in a new tab. This page reads the state again every few seconds until the account appears.",
      connectWaited: "The account has not appeared after five minutes. Read the state again, or start the connection once more.",
      popupBlocked: "The browser did not open the Instagram window. Allow pop-ups for this page and try again.",
      unclear: "Outcome unclear. Check the status; nothing is published again.", // §5 / contract §3
      serverProblem: "A problem on our side. Nothing was changed. Try again in a moment.", // contract §3 ops_auth_failed and alike
      refused: "Not done: {reason}.",
      reasons: {
        not_entitled: "Instagram is not enabled for this workspace",
        no_connected_account: "no Instagram account is connected",
        already_replied_or_claimed: "already answered",
        recipient_not_in_received_comments: "that comment was not received here",
        recipient_never_messaged_us: "that person has not written to this account",
        publication_readiness: "this listing cannot be published",
        post_limit_reached: "the agreed post limit is reached",
        release_missing: "no release has been granted for this access",
        rate_limited: "too many actions in a short time",
        invalid_input: "that request could not be made",
        not_available_in_stub: "demonstration data, nothing is sent",
      },
      accountCheck: "Check account",
      accountChecked: "Account {name} · {type}",
      publish: "Publish",
      fetched: "Fetched. The list below is read again.",
      sent: "Sent.",
      disconnected: "Disconnected. The access token was deleted.",
    },
    asOf: "State read",
    refresh: "Read again",
    problem: "The state could not be read. Nothing was changed.", // interim
    connect: {
      h1: "Connect Instagram",
      lead: "The Instagram account your agency publishes from and answers on.", // interim
      unavailable: "Instagram is not enabled for this workspace yet.", // §5 provider_status:unavailable
      inactive: "Your agency account is not active yet.", // interim
      none: "No Instagram account connected.", // §5 no_connected_account
      action: "Connect Instagram",
      connected: "Connected",
      disconnected: "Disconnected",
      account: "Account",
      platform: "Platform",
      since: "Connected since",
      until: "Disconnected on",
      manage: "Connection and data",
      // The four uses are the four requested permissions in plain words (META_PERMISSION_MATRIX_v1 §1); interim wording.
      usesH: "What the connection is used for",
      uses: [
        "Showing your account in Nuova.",
        "Publishing the listing posts you approve.",
        "Reading comments, replying in public, and one private reply per comment.",
        "Reading messages and answering them within 24 hours.",
      ],
      never: "Nuova never writes to anyone first.",
    },
    post: {
      h1: "Create a post",
      lead: "Choose a listing, check the text, approve it, publish it.", // interim
      steps: ["Choose a listing", "Create the text", "Approve", "Publish"],
      listingsH: "Your listings",
      listingsEmpty: "No listings yet.", // interim
      ready: "Can be published",
      blocked: "This listing cannot be published:", // §5 publication_readiness
      reasons: {
        source_rights_missing: "The image rights for this listing are not documented.",
        listing_stale: "The listing data is older than {hours} hours.",
        other: "A requirement for publishing is not met.", // interim
      },
      choose: "Choose",
      // Screen B, the middle of the path (SOCIAL_UI_SPEC_v1 §2 steps 2 and 3; wiring patch §2b): WORKING
      draft: "Create the text",
      approve: "Approve",
      drafted: "Text created. Check it, then approve it.",
      approved: "Approved. The post is queued; publish it from the posts list.",
      testMarker: "Test post: the caption carries the technical test marker.",
      noImage: "No image for this listing",
      imageExpired: "The image link has expired.",
      imageReload: "Load again",
      language: "Language",
      dataFrom: "Listing data from",
      postsH: "Posts",
      postsEmpty: "No posts yet.", // interim
      states: {
        queued: "Being published …",
        published: "Published",
        delivery_unknown: "Outcome unclear. Check status — do not publish again.", // §5
        blocked: "Not published",
        other: "In preparation", // interim
      },
      checkStatus: "Check status",
      scheduled: "Planned for",
      ctaWithheld: "Contact number not approved: the post is published without a link.",
      mock: "Test post, not on Instagram", // interim
      open: "Open the post",
    },
    inbox: {
      h1: "Inbox",
      lead: "Comments and messages that arrived on your connected account.", // interim
      comments: "Comments",
      messages: "Messages",
      emptyComments: "No comments yet.",
      emptyMessages: "No messages yet.",
      fetch: "Fetch now",
      intentLabel: "Recognised as",
      lead_: "Became a lead",
      replyLabel: "Your reply",
      replyPublic: "Reply publicly",
      replyPrivate: "Reply privately",
      replyMessage: "Send reply",
      answered: "Already answered.", // §5 already_replied_or_claimed
      answeredKinds: { public: "Public reply", private: "Private reply", message: "Reply", other: "Reply" },
      privateUsed: "One private reply per comment.",
      windowExpired: "The reply window has expired.",
      reference: "Reference",
      received: "Events received",
      lastReceived: "last one",
      intents: {
        viewing_request: "Viewing request",
        price_inquiry: "Price question",
        availability: "Availability question",
        attribute_question: "Question about the property",
        location_question: "Question about the location",
        financing: "Financing question",
        explicit_interest: "Interest in the property",
        seller_intent: "Wants to sell",
        question_other: "Other question",
        informational: "Information",
        generic_praise: "Praise",
        emoji_only: "Emoji only",
        complaint: "Complaint",
        competitor: "Competitor",
        spam: "Spam",
        scam: "Suspected fraud",
        abuse: "Abusive",
        unrelated: "Unrelated",
        unintelligible: "Not understandable",
        unknown_fact: "Asks for a fact we do not have",
        other: "Not classified",
      },
    },
    settings: {
      h1: "Connection and data",
      lead: "Disconnect the account, and see how stored data is deleted.", // interim
      connectionH: "Connection",
      disconnectH: "Disconnect",
      disconnectBody: "After disconnecting, the access token is deleted and reading and publishing stop.",
      disconnect: "Disconnect",
      deleteH: "Delete data",
      deleteBody: "Posts, comments, messages and leads from this channel that are already stored are deleted on request.", // interim, no deadline promised
      deleteLink: "How to request deletion",
      releaseH: "Release",
      releaseActive: "A test release is granted for this access.",
      releaseUntil: "Valid until",
      releasePosts: "Posts used",
      recentH: "Last operations",
      steps: { connect: "Connect", publish: "Publish", verify_publish: "Status check", poll_comments: "Comments fetched", poll_dms: "Messages fetched", reply_public: "Public reply", reply_private: "Private reply", dm_reply: "Message reply", revoke: "Disconnect" },
    },
  },

  qa: {
    open: "Ask a question",
    close: "Close",
    title: "Ask Nuova",
    intro: "Questions about what Nuova does and whether it fits your agency.",
    placeholder: "Type your question",
    send: "Send",
    sending: "Sending",
    thinking: "Reading your question",
    cannotConfirm: "We cannot confirm that from here. You can send the question to antonio@nuovasolution.com.", // D-50
    humanCta: "Contact a person",
    boundaries: "It does not give prices, legal or tax advice, and it does not commit us to anything. A person answers those.",
    ai: "Answers are written by an AI assistant.",
    slow: "Still working on it.",
    rateLimited: "Too many questions in a short time. Try again shortly.",
    // The design preview shows the box as a demo (audit R25). No contact details are asked for here: the product
    // assistant records no handover (WEBQA_BACKEND_READY_2026-09-29 §3), so the contact page owns that promise.
    demo: "Demo",
    demoNote: "Demo: no assistant is connected here, so every question gets the honest answer that it cannot be confirmed from here.",
    failed: "That did not go through. Try once more, or contact a person.",
    error: "That did not send. Try once more, or contact a person.",
    tooLong: "Please keep it under 4000 characters.",
    suggestionsLabel: "Common questions",
    suggestions: ["Does Nuova answer WhatsApp enquiries at night?", "Do I need to change my CRM?", "What happens after the 14 day trial?"],
  },

  media: {
    // Captions for the prepared media slots (audit Z14). The poster is a real product frame; a film replaces it without layout shift.
    conversation: "The conversation view: one WhatsApp enquiry, answered and recorded. Synthetic data.",
    setup: "The readiness check in the setup. Synthetic data.",
  },

  footer: {
    brandLine: "Nuova answers your agency's enquiries and makes the next step clear. Built for agencies in Spain.", // W-9
    platform: "Platform",
    getStarted: "Get started",
    legal: "Legal",
    company: "Company",
    copyright: "© 2026 NuovaSolution. All rights reserved.",
    privacy: "Privacy notice",
    terms: "Terms of service",
    dataDeletion: "Data deletion",
    notice: "Legal notice",
  },

  notFound: {
    h1: "That page does not exist.",
    body: "The address may have changed. The homepage is the best place to start.",
    cta: "Go to the homepage",
  },
  errorPage: {
    h1: "Something broke on our side.",
    body: "Try again, or contact a person and we will help directly.",
    retry: "Try again",
  },
} as const;
