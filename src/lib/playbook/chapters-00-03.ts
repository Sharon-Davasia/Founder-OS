import type { Chapter } from "./types";

export const chaptersEarly: Chapter[] = [
  {
    id: "the-game",
    index: "00",
    phase: "PHASE 0 · ORIENTATION",
    title: "The Game",
    tagline: "Learn the rules of the board before you play a single card.",
    intro:
      "A startup is not a small business. It is a temporary organization designed to search for a repeatable, scalable business model under conditions of extreme uncertainty. Everything in this playbook — the validation loops, the equity splits, the SAFE notes — exists to manage that uncertainty. Understand the physics of the game first: startups run on growth, are fueled by risk capital, and are judged by power laws, not averages.",
    concepts: [
      {
        k: "DEFINITION",
        title: "What a startup actually is",
        body: "Steve Blank's definition is canon: a startup is a temporary organization searching for a repeatable and scalable business model. The keywords are searching, repeatable, and scalable. A bakery is a business — its model is proven the day ovens turn on. A bakery-tech platform that lets 10,000 home bakers sell through one app is a startup — the model is a hypothesis that must be discovered. Your job in months 0–12 is not execution, it is search.",
      },
      {
        k: "PHYSICS",
        title: "Growth is the definition, not the goal",
        body: "Paul Graham argues that the one essential thing about a startup is growth: roughly 5–7% a week in the early days is good, 10% exceptional. Everything else — team, brand, patents, press — is downstream of whether more people want the thing each week. This is why startups measure weekly active users in week one and revenue per customer before logos. If you remember one number from this manual, remember growth rate.",
      },
      {
        k: "MATH",
        title: "Power laws and venture math",
        body: "Startup outcomes follow a power law: in a portfolio of 30 startups, one typically returns more than the other 29 combined. This shapes every investor you will ever meet. They are not asking 'can this be profitable' — they are asking 'can this return the whole fund'. That means a believable path to $100M+ in revenue. If your idea is great but capped at $2M a year, bootstrap it proudly instead of forcing it onto the venture rails.",
      },
      {
        k: "SURVIVAL",
        title: "Default alive or default dead",
        body: "Ask yourself: on current trajectory, with expenses as they are, does the company reach profitability before the money runs out? If yes, you are default alive — you control your destiny. If no, you are default dead — you are betting everything on the next fundraise. Founders who know which they are make calm decisions; founders who don't, panic at month nine of an eighteen-month runway.",
      },
      {
        k: "CURRENCY",
        title: "The three currencies you spend",
        body: "Startups consume three currencies: time (your 20s, your weekends), attention (every feature you build is ten you didn't), and equity (the ownership you trade for fuel). Spend them in that order — time is worth least when young, equity is the most precious thing you will ever sell. A founder who gives away 30% before validating anything has inverted the exchange rate.",
      },
      {
        k: "MAP",
        title: "The whole journey at a glance",
        body: "The game has four quests: Discovery (chapters 01–03 — find a problem worth solving), Foundation (04–05 — assemble team and economics), Build & Launch (06–08 — ship product, find distribution, set up legal rails), and Fuel & Scale (09–11 — pitch, raise, compound growth). Each quest ends at a gate. You do not skip gates; skipping is what 'failing startups' is short for.",
      },
    ],
    checklist: [
      { text: "Can explain, in one breath, how a startup differs from a small business", note: "Search for a model vs. execution of a known model" },
      { text: "Know whether your ambition is venture-scale or bootstrap-scale", note: "Both are legitimate; choosing confusion is fatal" },
      { text: "Understand power-law logic and what it implies for market size" },
      { text: "Computed your personal runway — months of savings if revenue is $0" },
      { text: "Named your real weekly time budget: 10h, 25h, or 60h", note: "Plan the game around the truth, not the fantasy" },
      { text: "Decided your risk window — graduate, switch jobs, or go all-in date" },
      { text: "Read two founder post-mortems this week", note: "Causes of death repeat; the autopsies are public" },
      { text: "Set a review ritual — 30 minutes every Sunday on metrics and learning" },
    ],
    mistakes: [
      {
        title: "Playing startup instead of startups",
        body: "Logos, incubators, business cards and pitch events feel like progress but are cosplay. The only undebatable progress is learning from real users and growth in a number that matters. Budget 10% of your time for the theater, 90% for the craft.",
      },
      {
        title: "Confusing the venture path with the only path",
        body: "A $2M/year business you own 100% of will change your life more reliably than a lottery ticket you own 8% of. Choose the financing strategy that fits the idea's market size — not the one Twitter celebrates.",
      },
      {
        title: "Optimizing for looking fundable too early",
        body: "Investors fund evidence, not aesthetics. Three honest pilot customers beat a cinematic deck. Sequence: evidence first, storytelling second.",
      },
      {
        title: "Zero-autopsy flying",
        body: "Most startups die of a small set of diseases: no market need, cofounder divorce, running out of cash, pricing, and ignoring users. Studying failure modes is the cheapest insurance in the entire game.",
      },
    ],
    terms: [
      { term: "PMF", def: "Product-market fit — the moment retention flattens and the market pulls the product out of you" },
      { term: "Runway", def: "Cash in bank ÷ monthly net burn — how many months you have left to live" },
      { term: "Burn rate", def: "Net cash spent per month; gross burn minus revenue" },
      { term: "Dilution", def: "The shrinking of your ownership as new shares are issued to investors or the ESOP pool" },
      { term: "Power law", def: "Outcome distribution where the top 1–2 companies return more than everything else combined" },
      { term: "Default alive", def: "On current trajectory you reach profitability before cash-out" },
      { term: "Bootstrapping", def: "Funding growth from revenue and savings instead of external capital" },
      { term: "Pivot", def: "A structured change of strategy while keeping the same vision — not a random restart" },
      { term: "Derisking", def: "Systematically killing the biggest assumption that could kill the company, in order of lethality" },
      { term: "Search vs. execute", def: "The two startup modes: searching for a model (0→1) or executing a proven one (1→n)" },
    ],
    gate: "GATE 00 — You can state which game you are playing: bootstrap or venture, and why this idea fits its rails.",
  },
  {
    id: "ideation",
    index: "01",
    phase: "PHASE 1 · DISCOVERY",
    title: "Ideation",
    tagline: "Ideas are mined, not mused. Learn the six seams where they hide.",
    intro:
      "Mediocre founders brainstorm; great founders prospect. Startup ideas are not lightning bolts — they are seams in the world that open briefly: a new technology, a new regulation, a new behavior, a neglected workflow. Your mission in this chapter is to build an idea engine: a repeatable method that surfaces twenty candidate problems, scores them honestly, and selects one with a genuine edge. Note: you are choosing a problem, not a solution. Solutions are cheap and change weekly; problems are durable.",
    concepts: [
      {
        k: "SEAM 1",
        title: "Pain mining your own life",
        body: "Keep a frustration journal for 14 days. Every time you or someone near you says 'why is this so painful', 'I have a spreadsheet for this', or 'I pay someone to do this', write it down. Workflows people route around with spreadsheets, WhatsApp groups, or part-time interns are un-mined gold. The best qualifier: you have unusually deep context on a niche most 20-year-olds don't — a parent's clinic, a family factory, a campus bureaucracy you've navigated for years.",
      },
      {
        k: "SEAM 2",
        title: "Workflow autopsies in the real economy",
        body: "Pick a legacy industry — logistics, construction, labs, farms, kitchens, clinics — and shadow someone for a day. Watch for: copy-paste between two systems, re-entered data, phone-tag scheduling, paperwork awaiting signatures, and 'that's just how it is' moments. Each is a software-shaped hole. Boring industries are better: fewer tourists, real willingness to pay, customers who answer emails because the problem actually haunts them.",
      },
      {
        k: "SEAM 3",
        title: "Technology shifts — 'what did this just make possible?'",
        body: "Every technology wave makes old impossibilities suddenly cheap: GPS made Uber, smartphones made Instagram, LLMs make inferencing-at-zero-marginal-cost. Take a current shift — on-device AI, cheap satellites, lab automation, GLP-1s, robotics components — and ask: which long-standing human process now collapses from 10 hours to 10 seconds? The correct question is never 'what can we build with AI' but 'which painful process just became trivial'.",
      },
      {
        k: "SEAM 4",
        title: "Regulation, demographic and cultural cracks",
        body: "New rules create new markets overnight: privacy law spawned a compliance industry; telemedicine regulation unlocked remote care; carbon disclosure rules created carbon accounting startups. Track bills passing, licenses being issued, demographics inflecting (aging populations, degree inflation, urban density). Founders who read policy documents get 18-month head starts on founders who read TechCrunch.",
      },
      {
        k: "FRAMEWORK",
        title: "Jobs-To-Be-Done: the lens for every idea",
        body: "Customers don't buy products; they hire them to make progress in a circumstance. The milkshake lesson: commuters 'hired' a milkshake to survive a boring drive, not for taste. For every candidate idea write the job story: 'When [situation], I want to [motivation], so I can [outcome]'. If you cannot write it crisply for a named human, the idea is fog. Interviews in chapter 02 exist to fill in these blanks with real words.",
      },
      {
        k: "FRAMEWORK",
        title: "The Idea Score matrix",
        body: "Score each candidate 1–5 on seven axes: Founder fit (unfair knowledge/skills), Pain intensity (hair-on-fire?), Willingness to pay (existing budget line or new one), Market size (TAM, can it reach $100M revenue if venture), Timing (why now, not why 5 years ago), Defensibility (what compounds), and Reachability (can you actually get in front of buyers this month). Anything under 26/35 is a hobby. Kill it kindly.",
      },
      {
        k: "PRACTICE",
        title: "The 10-idea sprint + idea journal",
        body: "Run a two-week sprint: one scored idea per day, written before midnight, forcing functions over inspiration. Keep the journal forever — ideas compound, and today's bad idea becomes next year's obvious one when a shift lands. Ship constraints: university founders have unique deal flow — professor research, campus pilots, institutional customers, and free smart labor. Score student-startable distribution as a bonus.",
      },
    ],
    checklist: [
      { text: "14-day frustration journal complete with 30+ raw entries" },
      { text: "Shadowed one real workflow for a full day outside your own bubble" },
      { text: "Listed 3 technology/regulation shifts and what each newly makes cheap", note: "Use today's actual frontier, not 2019's" },
      { text: "Written JTBD job stories for your top 3 candidate problems" },
      { text: "Scored top 3 ideas on the 7-axis matrix; winner ≥ 26/35" },
      { text: "Identified your unfair advantage: knowledge, access, or skill nobody else on campus has" },
      { text: "Named the beachhead: the narrow first niche you can monopolize", note: "Facebook started at Harvard, not Earth" },
      { text: "Confirmed the problem is frequent AND painful — not rare-but-cute" },
      { text: "Checked the idea against your 10-year self: could I care about this for a decade?" },
      { text: "Killed at least 5 ideas on paper — prove your engine has brakes" },
    ],
    mistakes: [
      {
        title: "Starting from a solution looking for a problem",
        body: "'An AI app for X' with zero suffering humans attached is the most common startup corpse. Fall in love with a problem — a named, bleeding one — and let the solution mutate weekly until it fits.",
      },
      {
        title: "Idea secrecy paranoia",
        body: "Refusing to talk about your idea 'because someone will steal it' costs you the only thing that matters at this stage: information. Ideas are worthless multipliers — execution is the exponent. Talk to everyone; NDA theater is chapter 08 calculus and almost never applies.",
      },
      {
        title: "Choosing crowded 'idea hot tubs'",
        body: "Food delivery, note-taking, generic to-do apps, 'Tinder for Y' — these attract founders for social reasons, not market reasons. In overcrowded seams you compete on marketing budgets you don't have. Boring problems hide unclaimed budgets.",
      },
      {
        title: "Ignoring the 'why now' test",
        body: "If your idea was equally buildable in 2015, ask why it doesn't already exist and dominate. 'Nobody thought of it' is almost never true; 'the enabling piece didn't exist' is the answer you're hunting for.",
      },
    ],
    terms: [
      { term: "JTBD", def: "Jobs-To-Be-Done — the progress a customer hires a product to make" },
      { term: "Seam", def: "A structural opening — tech, regulation, or behavior shift — where new companies fit" },
      { term: "Founder-market fit", def: "Your specific edge of insight/access over every other team chasing this problem" },
      { term: "Beachhead", def: "The deliberately tiny first market you dominate before expanding (Amazon: books)" },
      { term: "Hair-on-fire problem", def: "A pain so acute customers are already duct-taping solutions and paying for them" },
      { term: "Vitamin vs. painkiller", def: "Nice-to-have vs. must-buy; startups selling vitamins die waiting for budgets" },
      { term: "Idea maze", def: "Balaji Srinivasan's map of the decision tree of a market — good founders pre-compute it" },
      { term: "Unfair advantage", def: "A durable edge that cannot be copied or bought this quarter" },
      { term: "TAM", def: "Total addressable market — see chapter 03 for honest sizing" },
      { term: "Counter-positioning", def: "Modeling your business so incumbents lose money by copying you" },
    ],
    gate: "GATE 01 — One scored, painful problem, a named beachhead niche, and a defensible 'why now'.",
  },
  {
    id: "validation",
    index: "02",
    phase: "PHASE 1 · DISCOVERY",
    title: "Validation",
    tagline: "Evidence has a hierarchy. Money > time > words. Collect accordingly.",
    intro:
      "Validation is not asking people if your idea is good — the answer is always a polite yes. Validation is engineering situations where people reveal the truth through what they sacrifice: money, time, introductions, or reputation. This chapter gives you the interview protocol that survives The Mom Test, the smoke-test toolkit for pre-product proof, and the kill criteria that save you two years of life. Your enemy here is confirmation bias — your brain will lie to you, so we build systems that don't.",
    concepts: [
      {
        k: "HIERARCHY",
        title: "The signal hierarchy",
        body: "Rank every validation signal: (1) Money — preorders, deposits, LOIs; (2) Time — they give you their data, let you shadow them, or sit a second call; (3) Reputation — they intro you to their boss or peers; (4) Words — 'cool idea', 'I'd probably use that'. Words are noise; the first three are signal. Design experiments that force people up the ladder. A $50 deposit from 5 strangers beats 500 'likes'.",
      },
      {
        k: "PROTOCOL",
        title: "The 30-interview protocol",
        body: "Week 1–2: recruit 30 people in your target segment (DMs, communities, campus, LinkedIn — offer ₹200/$5 coffee cards if needed). Week 3–4: run 20-minute calls with a script of past-behavior questions only. Track patterns in a spreadsheet: frequency of the problem, current workaround, spend on workarounds, who owns the budget, trigger moment it last occurred. Stop when you can finish their sentences. You want their words, verbatim — later they become your landing-page copy.",
      },
      {
        k: "METHOD",
        title: "The Mom Test rules",
        body: "Ask about specifics in the past, not opinions about the future. Bad: 'Would you use an app that does X?' Good: 'Tell me about the last time you dealt with X. What did you do? What did it cost? Who else was involved?' Three rules: talk about their life instead of your idea; ask about specifics in the past instead of generics and opinions; listen more than you talk. Compliments are data pollution — deflect and return to the past.",
      },
      {
        k: "EXPERIMENT",
        title: "Smoke tests before product",
        body: "Build the thinnest artifact that triggers a sacrifice. Landing page + $200 ad spend → measure signup conversion (2–5% from cold traffic is interesting). Fake-door button inside an existing tool → clicks tell you demand exists. Preorder campaign → the purest signal. Concierge MVP → deliver the service manually for 3 customers before writing code. Wizard of Oz → looks like software, is secretly you at 2am. Each buys real signal for <2% of build cost.",
      },
      {
        k: "B2B NOTE",
        title: "Enterprise validation is different",
        body: "For B2B, get LOIs (letters of intent) and design partners: 3–5 companies that agree to pilot with defined success criteria. Probe procurement early: 'If this works, what happens next — who signs, what budget, what process, how long?' The polite enterprise 'circle back next quarter' is where young founders' runways go to die. Pilots unpaid >30 days are sympathy, not validation.",
      },
      {
        k: "DISCIPLINE",
        title: "Kill criteria — pre-commit to honesty",
        body: "Before you start, write what result would kill the idea: e.g., 'If fewer than 8 of 30 interviewees report the problem monthly + spend >$50/workarounds, we abandon.' Tape it to the wall. Without pre-committed criteria, every founder talks themselves into continuation. Great founders are serial killers of their own ideas; delusional ones get feature-rich products and zero customers.",
      },
    ],
    checklist: [
      { text: "30 customer interviews completed and logged verbatim in a spreadsheet" },
      { text: "Zero 'would you use' questions asked — past behavior only" },
      { text: "Documented current workaround + its cost for 70%+ of interviewees", note: "No workaround = no problem, usually" },
      { text: "One smoke test shipped: landing page, fake door, preorder, or concierge" },
      { text: "Signal achieved: ≥3 sacrifices above 'words' (deposit, pilot, intro, data)" },
      { text: "Identified the trigger moment — what event makes this problem urgent" },
      { text: "Found the budget owner — whose wallet this actually comes out of" },
      { text: "Written kill criteria BEFORE reading experiment results" },
      { text: "Collected 10+ quotable sentences from users for future copy" },
      { text: "Spotted the top 3 objections — your pitch will need to answer these" },
      { text: "Repeated problem roughly weekly or worse in frequency", note: "Annual pains rarely support startups" },
      { text: "Decision made: proceed, pivot the problem, or kill — in writing" },
    ],
    mistakes: [
      {
        title: "Interviewing people who love you",
        body: "Friends, family, and professors will fund your confirmation bias with ten thousand kind lies. Interview strangers, or at minimum people with no incentive to protect your feelings. The Mom Test rule: if it's a compliment, it didn't happen.",
      },
      {
        title: "Pitching during 'research'",
        body: "The moment you describe your solution, the interview dies — they stop being a data source and become an audience. Sell later. Early calls exist to understand their world so precisely that the pitch writes itself.",
      },
      {
        title: "Survey delusion",
        body: "A 500-response survey with 4.2/5 interest is worth less than five deposits. Surveys measure opinions about hypotheticals — the least predictive data in existence. Surveys are fine for segmenting; useless for validating demand.",
      },
      {
        title: "Mistaking 'interesting' for 'urgent'",
        body: "Users will happily discuss interesting problems for free. Urgent ones they pay to fix this quarter. Urgency has a trigger event, a deadline, and a consequence. Locate all three or keep digging.",
      },
    ],
    terms: [
      { term: "The Mom Test", def: "Rob Fitzpatrick's book on customer conversations; ask about the past, never pitch" },
      { term: "Smoke test", def: "A low-cost experiment that simulates demand before the product exists" },
      { term: "Concierge MVP", def: "Serving the first customers manually to learn the workflow before automating it" },
      { term: "Wizard of Oz", def: "A product that appears automated but is secretly human-powered behind the curtain" },
      { term: "LOI", def: "Letter of intent — a nonbinding document saying a company intends to buy if built" },
      { term: "Design partner", def: "A customer who co-builds the early product in exchange for influence and discounts" },
      { term: "Confirmation bias", def: "Your tendency to hear 'yes' in every answer; the founder's fatal disease" },
      { term: "Fake door", def: "A button/feature that doesn't exist yet, measuring clicks as demand signal" },
      { term: "Problem-solution fit", def: "Evidence that a real problem maps to a solution people will adopt" },
      { term: "Kill criteria", def: "Pre-committed falsifiable thresholds for abandoning an idea" },
    ],
    gate: "GATE 02 — Real sacrifices upstream of words: deposits, pilots, intros, or data access from ≥3 strangers.",
  },
  {
    id: "market",
    index: "03",
    phase: "PHASE 1 · DISCOVERY",
    title: "Market & Moats",
    tagline: "Size the ocean honestly, then find the cove you can own first.",
    intro:
      "Great founders attack great markets; the market's tide does most of the rowing. This chapter teaches you to size a market from the bottom up (the only credible way), decode 'why now' into investable tailwinds, map competitors without despair, and design moats early — because the best time to think about defensibility is before you have anything worth defending. You'll also pick your beachhead: the absurdly specific first niche you can dominate in 90 days.",
    concepts: [
      {
        k: "SIZING",
        title: "TAM / SAM / SOM — sized bottom-up",
        body: "Top-down ('global dental market is $36B, we take 1%') is laughed out of every serious room. Bottom-up: count customers × annual spend of each. Example: 42,000 independent dental clinics in the country × $400/yr for your screening software = $16.8M SAM; the full 600,000-person global equivalent is your TAM story. Investors want the math to plausibly clear $100M annual revenue at maturity. $10M SAM with expansion paths to adjacent segments ('clinics → all practices → insurer networks') paints that path.",
      },
      {
        k: "TIMING",
        title: "'Why now' — the most important slide nothing in MBA teaches",
        body: "For your idea, write the paragraph: 'This was impossible/worse before because ___, and is inevitable now because ___.' Anchor in specifics: a regulation dated, a technology's cost curve crossed, a behavior adoption threshold passed. Airbnb's why-now: recession forced spare-room income + social trust comfort via Facebook connect. Every great startup is surfing; your job is to name your wave with evidence, not vibes.",
      },
      {
        k: "COMPETITION",
        title: "Competitor mapping without despair",
        body: "Build a 2×2 or feature matrix of every alternative — including the true #1 competitor: doing nothing, and the #2: the spreadsheet. 'No competitors' is a red flag, not good news — it usually means no market. What you want: competitors proving demand while leaving a wedge open — too slow, too old, too enterprise, wrong price, wrong segment. Read their 1-star reviews; that's your product roadmap written by angry customers for free.",
      },
      {
        k: "MOATS",
        title: "The 7 Powers of defensibility",
        body: "Hamilton Helmer's taxonomy — pick your primary moat now: (1) Scale economies — unit costs drop with size; (2) Network economies — each new user raises value for others (marketplaces); (3) Counter-positioning — incumbents can't copy without hurting themselves (cheap digital insurance vs. agent-commissioned incumbents); (4) Switching costs — embedding into workflows and data; (5) Branding — earned over years; (6) Cornered resource — exclusive data, licenses, people; (7) Process power — Toyota-style accumulated operational excellence. Student startups usually start with #6/#7 → grow into #2/#4.",
      },
      {
        k: "BEACHHEAD",
        title: "Own a cove before the ocean",
        body: "Crossing the Chasm law: niche down until the niche looks embarrassing, then dominate it. Amazon: books. Facebook: Harvard. Stripe: developers at YC companies. Your beachhead should be findable in a week (a directory, a Slack group, an industry), small enough that 30 customers = meaningful share, and dense enough that users talk to each other — because in dense niches, word-of-mouth is physics, not hope.",
      },
      {
        k: "POSITIONING",
        title: "One line that wins the mind",
        body: "Fill in: 'For [specific customer] who [urgent need], [product] is a [category] that [key outcome], unlike [status quo], because [proof].' Category choice is strategy: create a new category when you can ('revenue intelligence'), borrow a known one when you can't ('Figma for construction docs'). If a stranger can't repeat your line back after one hearing, keep carving. Positioning is not taglines; it's deciding which mental shelf you get placed on.",
      },
    ],
    checklist: [
      { text: "Bottom-up SAM computed: real customer count × realistic price" },
      { text: "TAM story clear: SAM is a believable foothold of a 10–100× larger ocean" },
      { text: "'Why now' paragraph written with at least 2 dated, checkable facts" },
      { text: "Competitor matrix covering ≥6 alternatives including 'do nothing'" },
      { text: "Mined 1-star reviews of incumbents for the wedge feature" },
      { text: "Primary moat chosen from the 7 Powers — with the mechanism in one sentence" },
      { text: "Beachhead named and findable in under a week", note: "If you can't list where your first 30 users live, go narrower" },
      { text: "Positioning one-liner tested on 5 strangers — repeated back ≥80% correctly" },
      { text: "Adjacent expansion path sketched: cove → lake → ocean" },
      { text: "Sanity check: would the winning competitor of 2035 be embarrassed you took this niche?" },
    ],
    mistakes: [
      {
        title: "The 1% fallacy",
        body: "'If we just get 1% of China's X market...' assumes demand distribution is homogeneous and free. Markets are won beachhead-by-beachhead. Replace fantasy percentages with names of specific first customers.",
      },
      {
        title: "Feature-comparison superiority",
        body: "A matrix where you have 14 checks and the incumbent has 3 proves you misunderstand what buyers purchase: trust, integrations, and familiarity. Win on an axis incumbents structurally can't fight — price model, speed, a segment they ignore.",
      },
      {
        title: "TAM so big it's meaningless",
        body: "'We're in the $8 trillion global healthcare market' tells investors you don't know who pays you. Big TAM impresses amateurs; crisp SAM impresses professionals.",
      },
      {
        title: "Moat fantasies without mechanisms",
        body: "'We'll build network effects' is not a moat, it's a wish. Name the mechanism: two-sided marketplace where each new merchant lowers buyer wait times, verified by which density counter. If you can't describe the flywheel's physics, you don't have one yet.",
      },
    ],
    terms: [
      { term: "TAM / SAM / SOM", def: "Total / serviceable / obtainable market — always sized bottom-up" },
      { term: "Why now", def: "The dated, specific reason this startup could not win five years ago" },
      { term: "7 Powers", def: "Helmer's moat taxonomy: scale, network, counter-positioning, switching, brand, cornered resource, process" },
      { term: "Beachhead", def: "The narrow first market you fully dominate; the D-Day cove" },
      { term: "Wedge", def: "The narrow opening in an incumbent's armor your product exploits" },
      { term: "Crossing the Chasm", def: "Moore's law of adoption: chasm between early adopters and the mainstream" },
      { term: "Flywheel", def: "A self-reinforcing loop where each turn makes the next cheaper or stronger" },
      { term: "Category design", def: "Naming and owning a new problem category instead of fighting in an old one" },
      { term: "Counter-positioning", def: "A moat where incumbents copying you would cannibalize themselves" },
      { term: "Bottom-up sizing", def: "Market size = #customers × price, never % of an analyst's trillion" },
    ],
    gate: "GATE 03 — Bottom-up market math, an evidence-based 'why now', a chosen moat, and a findable beachhead.",
  },
];
