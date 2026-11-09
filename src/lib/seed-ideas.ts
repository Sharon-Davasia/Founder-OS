export interface SeedIdea {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  level: string;
  problem: string;
  solution: string;
  whyNow: string;
  businessModel: string;
  moat: string;
  targetUser: string;
  difficulty: number;
  capital: string;
  timeToMvp: string;
  pitchScore: number;
}

export const SEED_IDEAS: SeedIdea[] = [
  {
    slug: "gridvault",
    name: "GridVault",
    tagline: "Second-life EV batteries, re-graded and sold as grid storage",
    category: "Climate & Energy",
    level: "both",
    problem:
      "Electric vehicles retire battery packs at ~70-80% of original capacity — too weak for cars, far too valuable to shred. Recyclers currently destroy this residual value while farms, telecom towers, and factories overpay for new lithium storage. Meanwhile, solar-heavy regions face evening grid instability with no cheap buffer.",
    solution:
      "Aggregate retired EV packs from fleet auctions and insurers, run them through fast diagnostic grading (impedance + cycle modeling), re-assemble matched modules into cabinet-scale storage with a software layer for health monitoring, and sell/lease to behind-the-meter customers — farms, towers, small factories — at 40-60% of new-battery prices.",
    whyNow:
      "The first EV mass-market waves (2018-2023 vehicles) are now hitting end-of-automotive-life in volume, creating a supply tsunami with no standardized grading market. Simultaneously, distributed solar penetration and time-of-use tariffs are making storage ROI obvious for small commercial buyers.",
    businessModel:
      "Hardware margin on re-graded cabinets (30-45% gross), plus recurring revenue from monitoring software ($15-40/kWh-year) and energy-management optimization fees. Long-term: capacity aggregation for grid services with revenue share.",
    moat:
      "Cornered resource (supply contracts with fleets/insurers) compounding into process power — the grading dataset across thousands of packs makes each subsequent grade faster and cheaper, a classic data flywheel incumbents can't shortcut.",
    targetUser: "Commercial farms, telecom tower operators, and 50-500kW industrial facilities in solar-rich regions",
    difficulty: 5,
    capital: "$50-150K (lab + first packs)",
    timeToMvp: "6-9 months (grading prototype on salvaged modules)",
    pitchScore: 94,
  },
  {
    slug: "sonoguard",
    name: "SonoGuard",
    tagline: "Machine-health audio diagnostics for small factories",
    category: "DeepTech & IoT",
    level: "university",
    problem:
      "Small and mid-size manufacturers lose 5-20% of output to unplanned machine downtime, yet predictive-maintenance suites are built (and priced) for enterprises with vibration engineers on staff. A lathe that squeals for three hours before dying is currently discovered by a human who happens to walk by.",
    solution:
      "A clip-on acoustic+vibration sensor paired with edge AI trained to recognize the acoustic fingerprint of bearing wear, misalignment, belt slip, and cavitation per machine type. Alerts route to the floor supervisor's phone with plain-language diagnosis and urgency windows.",
    whyNow:
      "Cheap MEMS microphones, sub-$20 edge-AI chips, and pre-trained audio models have collapsed the BOM below $40/unit — a threshold where small factories can instrument every critical machine for the price of one emergency repair.",
    businessModel:
      "Hardware at cost (~$45/unit installed) with a per-machine SaaS of $8-25/month. Expansion revenue per added machine line; annual contracts for multi-plant operators.",
    moat:
      "The per-machine-type acoustic failure dataset — accumulated thousands of machine-hours of labeled pre-failure audio — is a cornered resource no new entrant can synthesize quickly. Switching costs rise with each machine's baseline history.",
    targetUser: "MSME manufacturing: machine shops, plastics molders, food processors, textile units",
    difficulty: 4,
    capital: "$5-25K (sensors + first factory pilot)",
    timeToMvp: "8-12 weeks (one machine type, one factory)",
    pitchScore: 91,
  },
  {
    slug: "signscribe",
    name: "SignScribe",
    tagline: "Real-time sign-language translation for service counters",
    category: "AI & Accessibility",
    level: "university",
    problem:
      "70M+ deaf people worldwide navigate banks, hospitals, and government offices through lip-reading, note-writing, and awkward pointing — a daily dignity tax institutionalized by the absence of interpreters at counters. Institutions pay interpreters $40-80/hour for rare, unpredictable encounters, so coverage is nearly zero.",
    solution:
      "A tablet-mounted system at service counters: computer-vision models translate sign language to speech in real time; speech recognition returns the clerk's words as live captions. Fine-tuned for high-frequency counter vocabularies (banking, healthcare triage, licensing).",
    whyNow:
      "Pose-estimation and sequence models crossed usable accuracy thresholds for constrained-vocabulary translation, and on-device inference now runs on commodity tablets — no cloud, no latency, no privacy leak for sensitive counter conversations.",
    businessModel:
      "B2G/B2B SaaS per counter license ($100-300/month) with a hardware kit sold near cost; procurement wedges through disability-compliance budgets and ESG mandates.",
    moat:
      "Domain-constrained signing corpora per vertical (banking, triage) — collected via pilot deployments with deaf-community co-design — form the accuracy gap. Compliance integration depth (audit logs, accessibility-certification tooling) adds switching costs.",
    targetUser: "Public-facing counters: banks, hospitals, DMVs, universities, airports",
    difficulty: 4,
    capital: "$2-10K (camera tablets + pilot site)",
    timeToMvp: "10-14 weeks (one vertical, 300-sign vocabulary)",
    pitchScore: 90,
  },
  {
    slug: "mymetrics",
    name: "MittiMetrics",
    tagline: "Satellite-verified carbon credits for smallholder farms",
    category: "Climate & Energy",
    level: "both",
    problem:
      "Smallholder farmers (200M+ in India alone) could earn $10-50/acre/year from carbon-sequestering practices, but certification costs $15-40/acre in manual audits — economically impossible at their scale. Carbon buyers, meanwhile, are starved for verifiable supply and plagued by fraud.",
    solution:
      "A monitoring-reporting-verification (MRV) stack: satellite imagery + soil-model ML quantifies sequestration per plot automatically; aggregators enroll farmer clusters; credits mint with continuous verification, and payouts flow through farmer co-ops with transparent ledgers.",
    whyNow:
      "High-resolution open satellite data plus validated remote-sensing soil models hit audit-grade confidence, while corporate net-zero deadlines concentrate billions in demand for verified agricultural credits.",
    businessModel:
      "Take 15-25% of each credit sale as the MRV+broker; SaaS tier for agri-enterprises monitoring their own supply-chain carbon; data licensing to insurers.",
    moat:
      "Process power via the ground-truthed plot dataset (satellite signature ↔ actual soil carbon from physical sampling) paired with co-op distribution trust — both take years to replicate.",
    targetUser: "Farmer cooperatives and carbon-market buyers needing verified agricultural offsets",
    difficulty: 4,
    capital: "$10-40K (data costs + one co-op pilot)",
    timeToMvp: "12-16 weeks (one season's monitoring pilot)",
    pitchScore: 89,
  },
  {
    slug: "reloop",
    name: "ReLoop",
    tagline: "Pooled reusable packaging for e-commerce transit",
    category: "Circular Economy",
    level: "university",
    problem:
      "D2C brands drown in single-use cardboard and plastic — their #1 unrecycled cost and the top unboxing complaint from eco-anxious customers. Reusable packaging exists, but reverse logistics per brand is a nightmare: tracking, cleaning, retrieval rates, dead legs.",
    solution:
      "A city-scale pooling network: standardized, durable shipping totes circulate between micro-warehouses, courier hubs, and customer drop-points (kirana stores, lockers). QR-scanned handoffs, deposit mechanics, and industrial washing as backbone services — brands rent per trip, like pallets for parcels.",
    whyNow:
      "EPR (extended producer responsibility) regulations now make packaging waste a balance-sheet liability for brands, and quick-commerce infrastructure has built the exact dense micro-hub grid a pool needs to operate economically.",
    businessModel:
      "Per-trip rental fee 10-20% above cardboard-equivalent cost, justified by brand-value and EPR compliance; deposits, wash fees, and lost-tote penalties stabilize the unit economics; enterprise contracts add volume floors.",
    moat:
      "Route density: the pool only works at network scale, so the first mover to reach retrieval-rate >90% in a city builds a cost curve competitors can't enter profitably — a local network effect similar to bike-share done right.",
    targetUser: "Mid-size D2C brands (1K-100K orders/month) in one metro, especially beauty, fashion, and food",
    difficulty: 4,
    capital: "$8-30K (first 500 totes + washing partner)",
    timeToMvp: "8-10 weeks (one neighborhood loop, 3 brands)",
    pitchScore: 87,
  },
  {
    slug: "urbancool",
    name: "UrbanCool",
    tagline: "Cool-roof retrofits as a subscription, verified by thermal drones",
    category: "Climate & Energy",
    level: "university",
    problem:
      "Heat waves now cut worker productivity 3-7% per degree above threshold and push low-income households into dangerous spending choices between cooling and food. Reflective cool-roof coatings slash indoor temperatures 3-8°C but upfront costs and invisible results kill adoption.",
    solution:
      "Sell cooling as a measured service: coat roofs (or install radiant barriers) with zero upfront cost, then fly thermal-drone scans quarterly to verify retained reflectivity and temperature deltas; customers pay a subscription smaller than their measured electricity savings.",
    whyNow:
      "Populated heat-stress records are resetting climate-adaptation budgets; drone thermal imaging commoditized verification; and green-building codes beginning to mandate roof albedo create regulatory tailwinds.",
    businessModel:
      "Monthly per-square-meter subscription ($/billed against measured savings), material financing partnerships, carbon-credit stacking (cool roofs have measurable avoided-energy carbon), municipal bulk contracts.",
    moat:
      "The before/after thermal dataset across weather patterns is the underwriting core for credit and municipal contracts — data-backed verification is the product, coating is the delivery mechanism.",
    targetUser: "Low-rise housing clusters, warehouses, school and hospital roofs in heat-stressed cities",
    difficulty: 3,
    capital: "$3-15K (coating pilot + drone access)",
    timeToMvp: "6-8 weeks (10-roof pilot over one summer)",
    pitchScore: 86,
  },
  {
    slug: "dentiscope",
    name: "DentiScope",
    tagline: "Phone-camera oral screening routed to teledentists",
    category: "HealthTech",
    level: "both",
    problem:
      "Over 3.5 billion people carry untreated oral disease; in most markets, a dental check means half a day off work and $40-120 — so decay advances silently to root canals that cost 10-30× a filling that would have worked. Employers quietly pay the bill in dental emergencies and absent days.",
    solution:
      "A guided smartphone screening: computer vision walks a user through eight intraoral shots, scores caries/gum/plaque risk, and routes results to a teledentist who triages urgency — emergencies fast-tracked to partner clinics, maintenance plans sold as subscriptions. Employers distribute screenings as a benefit.",
    whyNow:
      "Phone cameras with macro focus and on-device models now reach dentist-assisted triage accuracy for the most common lesions, teledentistry regulation matured post-COVID, and corporate wellness budgets hunt measurable preventive programs.",
    businessModel:
      "B2B2C per-employee-per-year benefit pricing ($15-40), clinic referral revenue share, screening-instrument sales to school and rural health programs.",
    moat:
      "The annotated oral-image corpus (paired with confirmed clinical outcomes from partner clinics) compounds accuracy, and the clinic network creates two-sided lock-in vertically.",
    targetUser: "Distributed workforces, schools, and rural health programs; self-pay parents as beachhead",
    difficulty: 4,
    capital: "$5-20K (labeling + one employer pilot)",
    timeToMvp: "10-14 weeks (screening flow + one teledentist panel)",
    pitchScore: 88,
  },
  {
    slug: "skillstamp",
    name: "SkillStamp",
    tagline: "Verified skill passports for blue-collar trades",
    category: "EdTech & Work",
    level: "university",
    problem:
      "Welders, CNC machinists, electricians, and HVAC techs face a credential vacuum: employers can't verify claims, skilled workers can't prove superiority, and wages collapse to the lowest common denominator. Hiring happens through brokers who tax both sides, while certificates on paper are trivially forged.",
    solution:
      "Practical, proctored skill assessments (recorded task performance scored by calibrated rubrics + AI video checks) issue tamper-evident digital passports; employers search verified profiles filtered by actual task scores, and workers own portable records of what they can demonstrably do.",
    whyNow:
      "Infrastructure build-outs and reshoring have created skilled-trades shortages with 20-50% wage variance by real skill, the identity rails (Aadhaar-style eKYC, verifiable-credentials standards) finally exist, and assessment AI crossed the reliability threshold for structured manual tasks.",
    businessModel:
      "Employer-side subscription for verified search + assessment fees per role; free-to-cheap for workers (wedge: demand-side pays); training-partner referrals as expansion revenue.",
    moat:
      "Two-sided network anchored by standardized assessments calibrated against employer outcome data (who actually performs) — a credential monopoly built on verified truth rather than paperwork.",
    targetUser: "Trade employers (construction, manufacturing, maintenance) and 18-45yo skilled workers",
    difficulty: 3,
    capital: "$2-8K (assessment rig + first employer pilot)",
    timeToMvp: "6-10 weeks (one trade, 50 assessed workers)",
    pitchScore: 85,
  },
  {
    slug: "mycopack",
    name: "MycoPack",
    tagline: "Mycelium-grown protective packaging replacing EPS foam",
    category: "Circular Economy",
    level: "university",
    problem:
      "Expanded polystyrene (Styrofoam) packaging is banned or taxed in a growing list of jurisdictions, yet brands shipping electronics, glassware, and furniture have no drop-in replacement that's compostable, moldable, and price-competitive at small volumes.",
    solution:
      "Grow packaging from mycelium-bound agricultural waste (husks, straw): custom molds fill with substrate, grow in 6-9 days, heat-kill, and ship — composting in home soil in 45 days. Sell design services plus per-unit inserts, targeting brands in ban-affected markets.",
    whyNow:
      "EPS bans went from paper to enforcement with real per-shipment fines, agricultural residue is free-to-negative cost, and mid-volume brands now pay green premiums they can pass through to increasingly eco-screening buyers.",
    businessModel:
      "Per-unit insert pricing at 1.2-1.8× EPS cost absorbed by brand premiums, mold/design fees, licensing of grow-kits to regional micro-factories (the scaling play).",
    moat:
      "Strain + substrate process know-how tuned to local agri-waste streams plus the licensed micro-factory network — IP-light but execution-heavy, compounding through supply-contract exclusivity on residue streams.",
    targetUser: "D2C brands shipping fragile goods (cosmetics, electronics, homeware) in regulated markets",
    difficulty: 4,
    capital: "$5-20K (bio-lab basics + first molds)",
    timeToMvp: "10-12 weeks (100-unit pilot for one brand)",
    pitchScore: 84,
  },
  {
    slug: "civicsense",
    name: "CivicSense",
    tagline: "ML triage for municipal grievances with SLA dashboards",
    category: "GovTech",
    level: "real-world",
    problem:
      "City governments receive thousands of complaints weekly through fragmented channels (call lines, apps, social media, ward offices) — 60-80% misrouted on first touch, with no visibility into resolution times. Citizens experience a black box; commissioners fly blind on which departments breach service levels.",
    solution:
      "An intelligence layer over existing channels: NLP classifies and routes complaints to the right ward/department automatically, duplicate detection merges reports, predicted-resolution SLAs trigger escalations, and public dashboards expose per-department performance.",
    whyNow:
      "Smart-city programs left software budgets allocated but grievance stacks unbuilt; multilingual LLM classification now handles the code-mixed reality of citizen complaints; and transparency-driven political incentives reward visible SLA dashboards.",
    businessModel:
      "Per-capita annual SaaS to municipalities ($0.2-1.0/citizen/year), integration/setup fees, analytics tiers for state-level aggregates; wedge through one reform-minded commissioner, expand by reference.",
    moat:
      "The code-mixed complaint corpus per city plus deep integrations into legacy municipal software — process entrenchment that makes replacement politically and technically costly.",
    targetUser: "Mid-size municipalities (0.5-5M citizens) and smart-city SPVs",
    difficulty: 3,
    capital: "$2-10K (pilot with one city or campus)",
    timeToMvp: "8-12 weeks (triage prototype on exported complaint data)",
    pitchScore: 82,
  },
  {
    slug: "dosepod",
    name: "DosePod",
    tagline: "Pharmacy-side 3D-printed personalized polypills",
    category: "HealthTech",
    level: "real-world",
    problem:
      "Chronic patients on 5-12 daily pills face 50%+ long-term non-adherence, driving hundreds of billions in avoidable complications. Multi-drug adherence packaging (blister cards) helps organizationally but can't combine doses into single units or personalize release timing to individual patients.",
    solution:
      "A compounding-grade 3D printer inside partner pharmacies fuses a patient's full daily generic regimen into one polypill with tuned release profiles (immediate/delayed layers). Physicians prescribe regimens; pharmacists print per-patient batches; adherence tracking completes the loop.",
    whyNow:
      "Printing materials gained pharmacopeia-compliant excipient approvals, the first 3D-printed drug cleared regulatory precedent, and generic-drug price erosion makes per-pill personalization economically rational for payers fighting non-adherence losses.",
    businessModel:
      "Printer placement + consumable cartridge margins (razor-blade), per-patient monthly service fees charged to insurers/payers, pharmacy revenue-share on refill lock-in.",
    moat:
      "Regulatory-cleared formulations library (the hard, slow asset) plus payer contracts predicated on adherence data — a cornered resource built through the full apparatus of pharmaceutical compliance.",
    targetUser: "Payers and pharmacy chains serving polypharmacy chronic-disease populations",
    difficulty: 5,
    capital: "$100K+ (regulatory advisers + formulation work)",
    timeToMvp: "9-18 months (first approved formulation pathway)",
    pitchScore: 83,
  },
  {
    slug: "nightloom",
    name: "NightLoom",
    tagline: "The sleep clinic, moved to your mattress",
    category: "HealthTech",
    level: "both",
    problem:
      "Chronic insomnia affects ~10% of adults while sleep-medicine access is rationed: polysomnography costs $1-3K, requires an overnight lab stay measuring you in strange conditions, and waitlists stretch months. Wearables measure proxies badly (and don't survive a clinical-grade workflow), so physicians distrust home data.",
    solution:
      "An under-mattress sensor strip (ballistocardiography + actigraphy) with clinical-grade algorithms producing physician-formatted reports: sleep staging, respiratory events, movement indices. Insomnia clinics prescribe it for multi-week home baselining; CBT-I programs layer on top.",
    whyNow:
      "BCG sensor fidelity now matches contact-based staging for the key metrics insurers reimburse, CPT-style codes for home sleep testing expanded, and clinics actively hunt capacity relief from lab backlogs.",
    businessModel:
      "Per-test rental/lease to clinics ($40-120/administration), SaaS for report workflow, CBT-I program revenue share, direct-to-consumer sleep-coaching upsell as beachhead.",
    moat:
      "Validation datasets tying sensor signals to gold-standard PSG across thousands of nights (required for clinical acceptance) plus workflow integration into clinic EMRs.",
    targetUser: "Sleep clinics and CBT-I programs with lab-capacity backlogs",
    difficulty: 4,
    capital: "$10-40K (sensor prototypes + one validation study)",
    timeToMvp: "12-16 weeks (consumer version; clinical takes longer)",
    pitchScore: 81,
  },
  {
    slug: "stackpost",
    name: "StackPost",
    tagline: "Reverse-logistics orchestrator for e-commerce returns",
    category: "Software & Infra",
    level: "real-world",
    problem:
      "E-commerce returns run 15-30% of orders in fashion and cost sellers $10-20 per returned item to triage: shipping, inspection, restocking, or liquidation. Most mid-size sellers dump returns into black-hole warehouses and write off inventory that was resellable.",
    solution:
      "A returns operating system: routing logic decides per-item destination (restock, refurbish, liquidate, donate) using resale-value ML; consolidated return centers handle grading with photo evidence; integrations push decisions into the seller's storefront and inventory systems in real time.",
    whyNow:
      "Marketplace free-returns wars normalized the behavior just as shipping costs doubled — sellers now face margin collapse; resale/recommerce channels matured enough to absorb triage efficiently; and returns data became a recognized profit lever in boardrooms.",
    businessModel:
      "Per-return processing fee ($2-6 + value-share on recovered resale), SaaS analytics tier, freight-margin capture on consolidated return shipping.",
    moat:
      "The disposition-decision dataset (which items in which condition resell where, at what price, how fast) compounds routing accuracy into recoverable-value benchmarks competitors can't match — plus integrations entrenchment.",
    targetUser: "Mid-size e-commerce sellers ($1-50M GMV) in fashion, electronics accessories, and home goods",
    difficulty: 3,
    capital: "$5-20K (partner 3PL + software)",
    timeToMvp: "8-12 weeks (one category, one 3PL)",
    pitchScore: 80,
  },
  {
    slug: "lablight",
    name: "LabLight",
    tagline: "Lab discovery and equipment-sharing OS for universities",
    category: "Science & Research",
    level: "university",
    problem:
      "Research universities own $50-500K instruments that sit idle 60-80% of the time, while spinout startups and other labs buy external testing at 3-5× intrinsic cost or purchase duplicate hardware. Billing, booking, and compliance paperwork made informal sharing more hassle than it was worth.",
    solution:
      "A campus-level equipment cloud: inventory discovery with live availability, compliant booking with usage-based billing between departments, exportable chargeback accounting for grants, and an external tier letting local startups rent verified academic capacity.",
    whyNow:
      "Universities face grant environments explicitly rewarding shared-infrastructure utilization; lab managers drown in spreadsheets; and university spinout rates are rising — the buyer and the market are the same institution.",
    businessModel:
      "Institutional SaaS ($20-100K/year per university), transaction take on external rentals, and insurance/verification services integrations for expensive instruments.",
    moat:
      "Institutional data gravity (the inventory becomes the system of record for grants and compliance) plus procurement entrenchment — once the chargeback system eats lab accounting, replacement means migrating an institution's financial rails.",
    targetUser: "Research universities and their spinout ecosystems; corporate R&D parks secondarily",
    difficulty: 3,
    capital: "$1-5K (start at your own university)",
    timeToMvp: "6-8 weeks (inventory + booking for one department)",
    pitchScore: 83,
  },
];

export const IDEA_CATEGORIES = [
  "All",
  ...Array.from(new Set(SEED_IDEAS.map((i) => i.category))),
];
