/**
 * Evergreen intro content for /jobs/[function]/ landing pages.
 *
 * SEO target: each page should rank for its primary keyword cluster.
 * Source data: DataForSEO research 2026-05-06 (memory/dfs-research-2026-05-06.json).
 *
 * Updated by Scout. Refresh quarterly (salary bands, employers, market notes).
 * Last refresh: 2026-05-06
 */

export type FunctionSlug =
  | "planning"
  | "buying"
  | "ad-ops"
  | "programmatic"
  | "analytics"
  | "strategy"
  | "leadership";

export interface FunctionIntro {
  slug: FunctionSlug;
  /** URL path segment — usually = slug, but ad-ops becomes ad-operations for SEO. */
  urlSlug: string;
  /** Page H1 + <title>. */
  h1: string;
  /** SEO <title> tag (≤60 chars). */
  metaTitle: string;
  /** SEO meta description (≤160 chars). */
  metaDescription: string;
  /** Plain language label used in card filters etc. */
  label: string;
  /** Primary keyword cluster — for analytics + content planning. */
  primaryKeyword: string;
  /** 250-300 word evergreen intro paragraph(s) shown above the listings. */
  intro: string[];
  /** Typical salary band (US, mid-level, 2026). */
  salaryBand: { min: number; max: number };
  /** Top 6-8 employers known to hire this role. */
  topEmployers: string[];
  /** What this role actually does (for FAQPage JSON-LD). */
  faqs: { q: string; a: string }[];
}

export const FUNCTION_INTROS: FunctionIntro[] = [
  {
    slug: "planning",
    urlSlug: "media-planner",
    h1: "Media Planner Jobs",
    metaTitle: "Media Planner Jobs — Open Roles at Top Agencies (2026)",
    metaDescription:
      "Real, current media planner jobs from agencies and brands. Filter by level, location, and remote. Updated daily.",
    label: "Media Planning",
    primaryKeyword: "media planner jobs",
    intro: [
      "Media planners build the campaign blueprints behind every dollar an advertiser spends. They translate a brand's audience, budget, and KPIs into a channel mix — connected TV, paid social, programmatic display, search, OOH, and increasingly retail media — then handoff a buy-ready plan to a buyer or trader. The role lives at the intersection of strategy, data, and tactical execution, and it's the discipline closest to where most agency money still flows.",
      "In 2026, media planning is being reshaped by three forces: cookie deprecation pushing investment toward first-party-data-rich channels, AI-assisted plan generation collapsing the lower-skill mix-modeling tasks, and the rise of integrated planner-buyer hybrid roles at independent agencies. The candidates winning offers right now combine traditional planning fundamentals with comfort in DSPs, measurement platforms (LiveRamp, InfoSum, MMM tools), and at least passing fluency in SQL or Excel modeling.",
      "Most US planning roles sit at holdco agencies (GroupM, Publicis, Omnicom, IPG, Dentsu) and independent shops (Horizon, Mediahub, Camelot, RPA, Mekanism, Wpromote). In-house brand teams at Disney, NBCU, Paramount, Spotify, Roku, Netflix, and Amazon also hire planners directly, often paying 15-25% above agency bands. Below: every open media planning role we've verified this week.",
    ],
    salaryBand: { min: 65000, max: 165000 },
    topEmployers: [
      "Horizon Media",
      "GroupM",
      "Publicis Media",
      "OMD",
      "Wpromote",
      "Mediahub",
      "RPA",
      "Mekanism",
    ],
    faqs: [
      {
        q: "What does a media planner do?",
        a: "A media planner translates a brand's audience, budget, and goals into a paid media plan — choosing channels (CTV, social, display, search), allocating spend, defining audiences, and setting KPIs. They hand the plan off to media buyers or programmatic traders for execution.",
      },
      {
        q: "What's the salary range for a media planner in the US?",
        a: "Entry-level media planners earn $55K-$70K. Mid-level (3-5 years) typically earn $80K-$110K. Senior planners and supervisors hit $115K-$145K. Associate Media Directors and Group Heads can reach $150K-$200K+ at major agencies.",
      },
      {
        q: "Media planner vs media buyer — what's the difference?",
        a: "Planners decide WHAT to buy (channel mix, audiences, budget allocation). Buyers execute the plan — negotiating with publishers, placing buys, optimizing in-flight. At smaller agencies the roles are merged; at holdcos they're separate.",
      },
      {
        q: "Is media planning being replaced by AI?",
        a: "AI is automating mix modeling, plan optimization, and reporting — the lower-skill tasks. The strategic work (audience definition, brand strategy, channel innovation, vendor relationships) is becoming MORE valuable. The bar for entry-level roles is rising; senior roles are growing.",
      },
    ],
  },
  {
    slug: "buying",
    urlSlug: "media-buyer",
    h1: "Media Buyer Jobs",
    metaTitle: "Media Buyer Jobs — Agency & Brand Roles, US (2026)",
    metaDescription:
      "Real media buyer jobs across digital, programmatic, broadcast, and OOH. Filter by level, location, remote. Updated daily.",
    label: "Media Buying",
    primaryKeyword: "media buyer jobs",
    intro: [
      "Media buyers are the executors. They take an approved plan, negotiate rates with publishers, place insertion orders, traffick creative, monitor pacing, and optimize in-flight to hit the brief. Compared to planners, buyers spend more time inside platforms (DV360, The Trade Desk, Meta Ads Manager, Amazon DSP) and on negotiation calls with sales reps. The work is operational, fast-paced, and high-leverage — a great buyer can shift 10-20% of a campaign's outcome through optimization alone.",
      "The role has bifurcated. Traditional broadcast and OOH buying still exists at major holdcos, but the volume has shifted to digital and programmatic. Most new buyer roles in 2026 are 'paid media buyer' or 'programmatic buyer' titles, working primarily through DSPs, social ad platforms, and retail media networks like Amazon Ads, Walmart Connect, and Roundel. The clearest career path now goes: junior buyer → senior buyer → trader/programmatic specialist OR account director.",
      "Top employers actively hiring buyers include performance shops (Tinuiti, Wpromote, Brainlabs), holdco buying units (GroupM Nexus, Publicis Practia), specialist programmatic agencies, and brand in-house teams. Below: every open media buying role we've verified this week.",
    ],
    salaryBand: { min: 55000, max: 145000 },
    topEmployers: [
      "Tinuiti",
      "Wpromote",
      "GroupM Nexus",
      "Brainlabs",
      "Mediahub",
      "Publicis Media",
      "OMD",
      "Croud",
    ],
    faqs: [
      {
        q: "What does a media buyer do?",
        a: "A media buyer executes an approved media plan — negotiating with publishers, placing buys, trafficking creative, monitoring spend pacing, and optimizing campaigns in-flight to hit performance goals.",
      },
      {
        q: "What's a typical media buyer salary?",
        a: "Junior buyers earn $50K-$65K. Senior buyers and supervisors earn $75K-$110K. Buying directors and VPs reach $130K-$180K. Programmatic buyers/traders typically earn 10-15% above traditional buyers at the same level.",
      },
      {
        q: "Do I need to know specific platforms to be a media buyer?",
        a: "Yes. The most-requested skills in 2026 buyer postings: DV360, The Trade Desk, Meta Ads Manager, Google Ads, Amazon DSP, and at least one measurement platform (LiveRamp, MMM tools, GA4). Platform certifications help for entry-level applicants.",
      },
    ],
  },
  {
    slug: "ad-ops",
    urlSlug: "ad-operations",
    h1: "Ad Operations Jobs",
    metaTitle: "Ad Operations Jobs — Trafficking, QA, Campaign Management",
    metaDescription:
      "Open ad ops roles across agencies, publishers, and ad tech. Trafficking, troubleshooting, campaign QA. Updated daily.",
    label: "Ad Operations",
    primaryKeyword: "ad operations jobs",
    intro: [
      "Ad operations is the engine room of digital advertising. Ad ops specialists traffick creative, set up tags, troubleshoot delivery issues, run campaign QA, and manage the technical handoff between buy and serve. They live in ad servers (Google Ad Manager, Campaign Manager 360), DSPs, and SSPs — and they're the first call when a campaign isn't pacing or pixels aren't firing. The role is technical, detail-obsessed, and increasingly specialized as the ad tech stack grows.",
      "In 2026, ad ops has split into three specialty tracks: traditional ad ops (publisher-side trafficking, yield management), advertiser ad ops (agency-side trafficking, tag management, campaign QA), and platform ops (running operations inside specific platforms — Amazon DSP, Walmart Connect, Roku OneView). The growth area is platform ops: as retail media networks proliferate, every brand running spend needs operators who know each platform's quirks.",
      "Active hirers include holdco trading desks, performance agencies, SSPs and DSPs (Index Exchange, PubMatic, The Trade Desk, Roku, Magnite), and brand in-house teams running their own DSP relationships. Below: every open ad operations role we've verified this week.",
    ],
    salaryBand: { min: 50000, max: 135000 },
    topEmployers: [
      "Roku",
      "The Trade Desk",
      "Magnite",
      "Index Exchange",
      "PubMatic",
      "Tinuiti",
      "GroupM",
      "Spotify",
    ],
    faqs: [
      {
        q: "What does ad operations actually do?",
        a: "Ad ops handles the technical execution of digital advertising: trafficking creative into ad servers, setting up tracking pixels, QAing campaign setup, troubleshooting delivery issues, and managing the handoff between buyers and the ad server.",
      },
      {
        q: "Is ad operations a good career?",
        a: "Yes — particularly platform-specific ad ops (Amazon DSP, retail media, CTV ad servers) is one of the highest-growth areas of adtech in 2026. Compensation has risen 15-20% over the past two years for senior platform ops roles.",
      },
      {
        q: "What skills do I need for ad ops?",
        a: "Core: ad server experience (Google Ad Manager, CM360, Roku OneView), tag management (Google Tag Manager, Tealium), basic SQL, debugging skills, attention to detail. Bonus: HTML/CSS, JavaScript, ad spec knowledge (VAST, VPAID, OpenRTB).",
      },
    ],
  },
  {
    slug: "programmatic",
    urlSlug: "programmatic",
    h1: "Programmatic Advertising Jobs",
    metaTitle: "Programmatic Jobs — DSP, Trader, AdTech Roles (2026)",
    metaDescription:
      "Real programmatic trader, DSP specialist, and adtech jobs. The Trade Desk, DV360, Amazon DSP. Filter and apply. Updated daily.",
    label: "Programmatic",
    primaryKeyword: "programmatic jobs",
    intro: [
      "Programmatic is where most digital media spend now lives. Programmatic traders, specialists, and account managers run the auction-based buying of display, video, CTV, audio, and DOOH inventory through DSPs like The Trade Desk, DV360, Amazon DSP, and Roku OneView. The work is part media buyer, part data analyst, part platform engineer — optimizing bid strategies, building audience segments, and squeezing performance out of each impression.",
      "The 2026 programmatic job market is bifurcated. Traditional 'programmatic trader' roles at agencies pay $70K-$130K and emphasize hands-on platform operation. Senior programmatic strategist and director roles at brands and specialty shops pay $150K-$220K and emphasize stack architecture, identity strategy (post-cookie), and CTV/retail-media expansion. The fastest-growing subniche: retail-media programmatic — buying on Amazon DSP, Walmart Connect, Kroger Precision Marketing, and similar — where compensation skews 10-20% higher than general programmatic.",
      "Top employers: holdco trading desks (Xaxis/GroupM Nexus, Performics, Hearts & Science), independents (Tinuiti, Goodway Group, Acceleration Partners), DSPs themselves (The Trade Desk, Amazon Ads, Roku), and brand in-house teams. Below: every open programmatic role we've verified this week.",
    ],
    salaryBand: { min: 65000, max: 220000 },
    topEmployers: [
      "The Trade Desk",
      "Amazon Ads",
      "Roku",
      "Tinuiti",
      "GroupM Nexus",
      "Goodway Group",
      "Performics",
      "Hearts & Science",
    ],
    faqs: [
      {
        q: "What is a programmatic trader?",
        a: "A programmatic trader manages real-time bidding campaigns inside a DSP — building audiences, setting bid strategies, optimizing in-flight, and reporting on performance. They're the technical media buyer for auction-based digital inventory.",
      },
      {
        q: "What's the average programmatic trader salary?",
        a: "US programmatic traders earn $65K-$95K at junior levels, $95K-$130K at senior, and $135K-$180K at director level. Retail-media-focused programmatic roles (Amazon DSP, Walmart Connect) trend 10-20% higher.",
      },
      {
        q: "Do I need to know The Trade Desk or DV360?",
        a: "At least one is effectively required. The Trade Desk and DV360 (Google's DSP) dominate; Amazon DSP is the fastest-growing. Most agencies use 2-3 DSPs and expect cross-platform fluency at senior levels.",
      },
      {
        q: "Is programmatic a good career path?",
        a: "Yes — programmatic now accounts for 90%+ of digital display and a growing share of CTV and audio. Roles are growing across agencies, DSPs, retail media networks, and brand in-house teams. It's also one of the most platform-portable skills in adtech.",
      },
    ],
  },
  {
    slug: "analytics",
    urlSlug: "media-analyst",
    h1: "Media Analyst Jobs",
    metaTitle: "Media Analyst Jobs — Insights, Measurement, Attribution",
    metaDescription:
      "Open media analyst, insights, and measurement roles. SQL, MMM, attribution, dashboards. Filter by level. Updated daily.",
    label: "Analytics",
    primaryKeyword: "media analyst jobs",
    intro: [
      "Media analysts turn campaign data into decisions. They build dashboards, run attribution analyses, design tests, model media mix, and translate platform reports into recommendations the planning and buying teams can act on. The role spans junior 'reporting analyst' positions (heavy in Excel/Tableau, lighter strategy) up through senior measurement leads who own MMM, incrementality testing, and cross-platform attribution architecture.",
      "In 2026, media analytics has been reshaped by the cookie deprecation everyone's been promising for half a decade. The growth roles are around clean rooms (Google Ads Data Hub, Amazon Marketing Cloud, LiveRamp, InfoSum), incrementality testing, and MMM revival — anything that works without third-party identifiers. Generic 'pull a report' analyst roles are being absorbed into AI tools; senior analysts who can architect measurement frameworks are in higher demand than at any point in the past decade.",
      "Active hirers include performance agencies (Tinuiti, Wpromote, Brainlabs), measurement specialists (Analytic Partners, Marketing Evolution, MMA), in-house brand teams at Amazon, Disney, NBCU, Paramount, and the analytics arms of major holdcos. Below: every open media analyst role we've verified this week.",
    ],
    salaryBand: { min: 60000, max: 180000 },
    topEmployers: [
      "Tinuiti",
      "Wpromote",
      "Analytic Partners",
      "Amazon Ads",
      "NBCU",
      "Disney",
      "GroupM",
      "Brainlabs",
    ],
    faqs: [
      {
        q: "What does a media analyst do day to day?",
        a: "Pull and clean campaign data from DSPs and platforms, build dashboards (Tableau, Looker, Power BI), run attribution and incrementality analyses, design A/B tests, build MMM models, and translate findings into recommendations for planners and buyers.",
      },
      {
        q: "What skills do media analysts need in 2026?",
        a: "SQL is table stakes. Most senior roles also expect Python or R, fluency in at least one BI tool, and understanding of MMM, attribution methodologies, and incrementality design. Familiarity with clean rooms (ADH, AMC, LiveRamp) is increasingly required.",
      },
      {
        q: "Media analyst vs marketing analyst — same thing?",
        a: "Overlapping but distinct. Media analysts focus on paid media measurement (campaign performance, attribution, MMM). Marketing analysts often have broader scope including organic, CRM, lifecycle. Compensation is similar; media analyst roles tend to be more platform-specialized.",
      },
    ],
  },
  {
    slug: "strategy",
    urlSlug: "media-strategy",
    h1: "Media Strategy Jobs",
    metaTitle: "Media Strategist Jobs — Brand & Agency Strategy Roles",
    metaDescription:
      "Open media strategy and communications planning roles. Insights, brand strategy, comms planning. Updated daily.",
    label: "Strategy",
    primaryKeyword: "media strategist jobs",
    intro: [
      "Media strategists work upstream of planners. They define how a brand should show up in market — the comms architecture, the audience thesis, the cultural insight, the channel philosophy — before the planner builds the actual schedule. Strategy is the discipline closest to brand thinking inside a media agency, and the role tends to attract people who could also have ended up in account planning, brand strategy, or insights consulting.",
      "Senior strategy roles (Strategy Director, VP Strategy, Chief Strategy Officer) are some of the highest-paid positions in agency media, reaching $200K-$350K+ at major shops. Junior strategy roles can be hard to break into directly — most strategists pivot in from planning, account, or research backgrounds. The 2026 trend: strategy roles are increasingly expected to combine traditional comms planning with data fluency (audience platforms, MMM literacy, retail media positioning).",
      "Top employers: holdco strategy practices (Mindshare, Mediahub, Wavemaker, Initiative), independents with strong strategy reputations (Mekanism, Goodby Silverstein, Anomaly's media practice), and brand in-house teams at companies that treat media as a strategic discipline (Apple, Nike, Liquid Death, Allbirds, Patagonia). Below: every open media strategy role we've verified this week.",
    ],
    salaryBand: { min: 80000, max: 350000 },
    topEmployers: [
      "Mediahub",
      "Mindshare",
      "Wavemaker",
      "Initiative",
      "Mekanism",
      "Anomaly",
      "Goodby Silverstein",
      "Horizon Media",
    ],
    faqs: [
      {
        q: "Strategist vs planner — what's the difference?",
        a: "Strategists work upstream of planners. They define audience thesis, comms architecture, and channel philosophy. Planners take the strategy and turn it into a concrete plan with channels, budgets, and KPIs. At smaller agencies the roles are merged.",
      },
      {
        q: "Can I become a media strategist without being a planner first?",
        a: "It's hard but possible. Common alternative paths in: account planning, brand strategy at a creative agency, research/insights, or the strategy team at a brand. Direct entry-level strategist roles exist but are rare.",
      },
      {
        q: "What's a senior media strategist salary?",
        a: "Senior Strategist: $115K-$160K. Strategy Director: $160K-$230K. VP Strategy: $200K-$300K. Chief Strategy Officer at a major agency: $300K-$500K+ all-in.",
      },
    ],
  },
  {
    slug: "leadership",
    urlSlug: "media-director",
    h1: "Media Director & Leadership Jobs",
    metaTitle: "Media Director Jobs — VP, Head of Media, Senior Roles",
    metaDescription:
      "Open media director, VP, and head of media roles at agencies and brands. Senior leadership only. Updated daily.",
    label: "Leadership",
    primaryKeyword: "media director jobs",
    intro: [
      "Media directors and senior leadership roles are the apex of the agency media career. The titles vary — Media Director, Group Media Director, VP Media, Head of Media, Chief Media Officer — but the work is consistent: own client P&L, lead 5-50 person teams, set discipline strategy, and act as the most senior media voice on the account.",
      "These roles are rarely posted publicly with full transparency. Most are filled through executive search, network, or internal promotion. The listings that do appear publicly tend to be at fast-growing independent agencies, in-house brand teams scaling their media function, or holdcos backfilling departures. Compensation ranges widely: $180K-$300K base for Director-level, $250K-$450K all-in at VP level, $400K-$800K+ at Chief Media Officer / agency head of media at major holdcos.",
      "Active hirers include independents scaling their senior bench (Tinuiti, Wpromote, Mediahub, Camelot, RPA, Mekanism), in-house brand teams at growth-mode companies, and holdcos building out specialty practices (retail media, CTV, programmatic). Below: every open media leadership role we've verified this week.",
    ],
    salaryBand: { min: 175000, max: 500000 },
    topEmployers: [
      "Tinuiti",
      "Wpromote",
      "Mediahub",
      "Horizon Media",
      "GroupM",
      "Publicis Media",
      "Disney",
      "NBCU",
    ],
    faqs: [
      {
        q: "How do I become a media director?",
        a: "Most paths: 8-12 years progressing through planner/buyer → senior planner/buyer → supervisor → manager → associate director → director. Strong client relationships and a P&L track record matter more than tenure at this level.",
      },
      {
        q: "What's the difference between Media Director and VP Media?",
        a: "Media Director typically owns one large account or several mid-size accounts, leading a team of 5-15. VP Media owns a practice or major client portfolio, leading 20-50+ across multiple directors. Comp roughly: Director $200K-$280K, VP $280K-$450K all-in.",
      },
      {
        q: "Are these roles ever remote?",
        a: "Senior leadership roles are increasingly hybrid (3 days in office) but rarely fully remote. The exception: in-house brand roles at companies with distributed cultures (some tech, some DTC) and holdco specialty practice roles at firms that have committed to remote-first.",
      },
    ],
  },
];

export const FUNCTION_INTRO_BY_URL: Record<string, FunctionIntro> = Object.fromEntries(
  FUNCTION_INTROS.map((f) => [f.urlSlug, f]),
);

export const FUNCTION_INTRO_BY_SLUG: Record<FunctionSlug, FunctionIntro> = Object.fromEntries(
  FUNCTION_INTROS.map((f) => [f.slug, f]),
) as Record<FunctionSlug, FunctionIntro>;
