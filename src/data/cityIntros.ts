// City landing pages \u2014 evergreen content for top US media markets + remote.
//
// Matching logic: each city declares an array of `match` strings (case-insensitive
// substring matches against the listing's `location` field). Adzuna location data is
// noisy (neighborhood/county-level), so each city gathers boroughs, suburbs, and the
// surrounding metro under one canonical landing page.
//
// Refresh quarterly: salary bands, market notes, top employers.

export interface CityIntro {
  /** URL slug, e.g. "new-york" */
  urlSlug: string;
  /** Display label, e.g. "New York" */
  label: string;
  /** H1 on the page */
  h1: string;
  /** <title> tag */
  metaTitle: string;
  /** <meta name="description"> */
  metaDescription: string;
  /** Substring patterns we match against listing.location (case-insensitive) */
  match: string[];
  /** True if this is a remote-work bucket (matches listing.remote === "remote") */
  remoteBucket?: boolean;
  /** 2-3 paragraph evergreen intro */
  intro: string[];
  /** Typical comp band for media roles in this market */
  salaryBand: { min: number; max: number; note?: string };
  /** Hand-curated list of agencies/holding cos hiring in market */
  topEmployers: string[];
  /** FAQs for FAQPage JSON-LD + on-page rendering */
  faqs: { q: string; a: string }[];
}

export const CITY_INTROS: CityIntro[] = [
  {
    urlSlug: "new-york",
    label: "New York",
    h1: "Media Jobs in New York",
    metaTitle: "Media Planning & Buying Jobs in New York City",
    metaDescription:
      "Open media planner, buyer, programmatic, and ad ops jobs in New York City. Roles at Horizon, OMD, Mediahub, Wpromote, and more.",
    match: ["new york", "manhattan", "brooklyn", "queens", "bronx", "nyc", "staten island"],
    intro: [
      "New York is the center of US media. Every major holding company \u2014 Omnicom, IPG, WPP, Publicis \u2014 runs significant planning and buying operations from Manhattan, alongside independents like Horizon Media, Mediahub, and Wpromote. Roles span linear TV planning, programmatic trading, retail media, and ad operations.",
      "Compensation runs higher than other US markets to offset cost of living. Mid-level planners typically clear $80K base with bonus eligibility; senior buyers and supervisors land in the $110\u2013$150K range. Programmatic and ad ops specialists often command 10\u201320% premiums vs. generalist planning roles.",
      "Most NYC roles are hybrid (3 days in office is the prevailing standard as of 2026), with select senior IC and director positions offering remote flexibility. The market is large enough that lateral moves between agencies are common \u2014 expect tenure of 18\u201336 months at any one shop.",
    ],
    salaryBand: { min: 65000, max: 180000 },
    topEmployers: [
      "Horizon Media",
      "OMD",
      "Mediahub",
      "Wpromote",
      "Initiative",
      "GroupM",
      "Publicis Media",
      "Mindshare",
      "EssenceMediacom",
      "Goodapple",
      "Crossmedia",
    ],
    faqs: [
      {
        q: "How much do media planners make in New York?",
        a: "Entry-level coordinators start around $50\u2013$60K. Mid-level planners earn $70\u2013$90K. Senior planners and supervisors range $95\u2013$130K. Group directors and VPs at major agencies earn $150\u2013$250K+ with bonus.",
      },
      {
        q: "Are NYC media jobs hybrid or in-office?",
        a: "Most agencies require 3 days/week in office as of 2026. A handful of independents and IC-track senior roles offer fully remote, but it's the exception. Expect hybrid as the default.",
      },
      {
        q: "Which NYC agencies hire the most media planners?",
        a: "Horizon Media is the largest US-headquartered independent and consistently has 20+ planning openings. The holding company shops (OMD, Mindshare, Initiative, EssenceMediacom) each run dozens of NYC-based teams across clients. Mid-size shops like Mediahub, Wpromote, and Goodapple post less frequently but typically pay competitively.",
      },
      {
        q: "Do I need agency experience to get hired in NYC?",
        a: "For coordinator and entry-planner roles, no \u2014 fresh graduates and career-changers from adjacent fields (marketing analytics, ad sales) get hired regularly. For senior+ roles, holding company or major independent agency experience is the dominant filter.",
      },
    ],
  },
  {
    urlSlug: "los-angeles",
    label: "Los Angeles",
    h1: "Media Jobs in Los Angeles",
    metaTitle: "Media Planning & Buying Jobs in Los Angeles",
    metaDescription:
      "Open media planner, buyer, programmatic, and ad ops roles in Los Angeles. Agency and brand-side jobs at RPA, Mekanism, Wpromote, and more.",
    match: ["los angeles", "santa monica", "culver city", "west hollywood", "burbank", "playa vista", "beverly hills"],
    intro: [
      "Los Angeles anchors the West Coast media market. The agency landscape skews toward independents and brand-led shops \u2014 RPA, Mekanism, Mediahub LA, Wpromote, Tinuiti, and Mindgruve all maintain LA offices alongside the holding company satellites. CTV and streaming-native planning is a particular LA strength given the entertainment client concentration.",
      "Compensation runs slightly below NYC for equivalent roles but cost of living often nets out favorably outside the Westside. Mid-level planners earn $70\u2013$90K; senior and supervisor roles run $100\u2013$140K. Streaming/CTV specialists with platform certifications (Roku, Netflix Ads, Amazon DSP) command meaningful premiums.",
      "LA media culture is more flexible on remote and hybrid arrangements than NYC. Many shops settled at 2 days/week in office post-2024, and fully remote IC roles within US time zones are common at the senior level.",
    ],
    salaryBand: { min: 60000, max: 165000 },
    topEmployers: [
      "RPA",
      "Mekanism",
      "Wpromote",
      "Tinuiti",
      "Mindgruve",
      "MediaLink",
      "Initiative",
      "Mediahub",
      "Stun Creative",
      "Cashmere Agency",
    ],
    faqs: [
      {
        q: "How much do media planners make in Los Angeles?",
        a: "Entry-level $48\u2013$58K. Mid-level $70\u2013$88K. Senior $95\u2013$125K. Director and VP roles at major shops range $140\u2013$220K+ with bonus.",
      },
      {
        q: "Is LA a good market for CTV and streaming media jobs?",
        a: "Yes \u2014 LA has the highest concentration of entertainment and streaming clients in the US, which translates to deep CTV planning and addressable TV buying expertise across local agencies. If your interest is video and streaming-native media, LA is arguably the best US market behind NYC.",
      },
      {
        q: "Do LA agencies hire remote employees?",
        a: "More than NYC. Many LA-headquartered shops hire fully remote within Pacific and Mountain time zones, especially at senior IC levels. Hybrid (2 days/week) is the most common arrangement for mid-level and below.",
      },
      {
        q: "Which LA agencies focus on programmatic media?",
        a: "Wpromote and Tinuiti both run substantial programmatic and biddable teams from LA. RPA and Mekanism take a more integrated approach with programmatic embedded in planning. The holding company offices (OMD LA, Mindshare LA) maintain dedicated programmatic squads.",
      },
    ],
  },
  {
    urlSlug: "chicago",
    label: "Chicago",
    h1: "Media Jobs in Chicago",
    metaTitle: "Media Planning & Buying Jobs in Chicago",
    metaDescription:
      "Open media planner, buyer, programmatic, and ad ops jobs in Chicago. Roles at Leo Burnett, FCB, Starcom, Spark Foundry, and more.",
    match: ["chicago", "evanston", "oak park"],
    intro: [
      "Chicago is the third-largest US media market and the historic home of Publicis-owned shops Starcom and Spark Foundry. Leo Burnett and FCB also run significant Chicago planning and buying operations, alongside independents like Energy BBDO and Cramer-Krasselt. The market has deep CPG, retail, and B2B client relationships.",
      "Compensation tracks below NYC and LA but cost of living is meaningfully lower, particularly for housing. Mid-level planners earn $65\u2013$80K; senior and supervisor roles range $85\u2013$120K. Bonuses at Publicis-network shops can add 10\u201320% in good years.",
      "Hybrid (3 days/week) is standard, with most agencies clustered in the Loop or River North. Chicago is also a strong remote-friendly market for senior IC roles given the CST timezone advantage for serving both coasts.",
    ],
    salaryBand: { min: 52000, max: 145000 },
    topEmployers: [
      "Starcom",
      "Spark Foundry",
      "Leo Burnett",
      "FCB",
      "Energy BBDO",
      "Cramer-Krasselt",
      "DDB Chicago",
      "Havas Chicago",
      "Burrell Communications",
    ],
    faqs: [
      {
        q: "How much do media planners make in Chicago?",
        a: "Entry-level $45\u2013$55K. Mid-level $65\u2013$80K. Senior $85\u2013$110K. Director and VP roles at Publicis-network shops range $125\u2013$190K+ with bonus.",
      },
      {
        q: "Which Chicago agencies are best for new media planners?",
        a: "Starcom and Spark Foundry both run sizable associate and coordinator programs and hire predictably each year. Leo Burnett and FCB take fewer entry-level hires but offer stronger creative-integrated planning training. Cramer-Krasselt and Energy BBDO are good independents to consider.",
      },
      {
        q: "Is Chicago good for programmatic or ad ops careers?",
        a: "Solid but smaller than NYC or LA. Publicis runs dedicated programmatic teams (Performics, Spark Foundry biddable), and the holding company tech stacks are well-represented. Independent ad ops roles are less common.",
      },
      {
        q: "Are Chicago agencies hiring remotely?",
        a: "Some, especially at senior IC levels. Most mid-level and below roles still require Chicago-area presence with 2\u20133 days/week in office.",
      },
    ],
  },
  {
    urlSlug: "remote",
    label: "Remote",
    h1: "Remote Media Planning & Buying Jobs",
    metaTitle: "Remote Media Planning, Buying & Programmatic Jobs (US)",
    metaDescription:
      "Fully remote media planner, buyer, programmatic, and ad ops roles. US-based positions at agencies, brands, and ad tech companies.",
    match: [],
    remoteBucket: true,
    intro: [
      "Remote-first roles in media planning and buying have grown dramatically since 2020. While most agency mid-level positions still require hybrid presence in NYC, LA, or Chicago, fully remote opportunities are common at independents, ad tech vendors, brand in-house teams, and senior IC levels at holding companies.",
      "Remote roles cluster around three patterns: (1) ad tech companies (DSPs, SSPs, measurement vendors) hiring sales engineers, account managers, and specialists; (2) brand-side in-house media teams at e-commerce and DTC companies; (3) senior agency IC roles where the talent pool justifies geographic flexibility. Programmatic, paid social, and ad ops roles tend to remote more readily than integrated planning.",
      "Compensation for fully remote roles is typically benchmarked to NYC or major-metro bands, though some employers apply geo-based adjustments. Expect $70\u2013$110K for mid-level remote planning/buying roles and $120\u2013$180K for senior remote IC and management.",
    ],
    salaryBand: { min: 60000, max: 170000, note: "US-based, full-time" },
    topEmployers: [
      "Wpromote",
      "Tinuiti",
      "Power Digital",
      "Common Thread Collective",
      "Disruptive Advertising",
      "Hawke Media",
      "MuteSix",
      "Closed Loop",
    ],
    faqs: [
      {
        q: "Are there really fully remote media planning jobs?",
        a: "Yes \u2014 particularly at performance-led independents (Wpromote, Tinuiti, Power Digital, Hawke Media) and at ad tech vendors. Holding company agencies (OMD, Mindshare, Initiative) are mostly hybrid as of 2026, but offer remote at senior IC and director levels selectively.",
      },
      {
        q: "Do remote media jobs pay less?",
        a: "Sometimes. Performance-led independents typically pay NYC-equivalent regardless of location. Larger holding companies and brands more often apply geo-based pay bands, which can mean a 10\u201320% reduction outside major metros. Always ask explicitly.",
      },
      {
        q: "What kinds of media roles remote most easily?",
        a: "Programmatic trading, paid social specialist, paid search, ad ops, and analyst roles all remote well \u2014 the work is screen-based and async-friendly. Integrated planning roles that involve heavy client interaction tend to require at least hybrid presence.",
      },
      {
        q: "Are remote-first agencies a good career bet?",
        a: "Wpromote, Tinuiti, Power Digital, and Common Thread Collective all built remote-native cultures pre-2020 and have weathered the return-to-office wave intact. Career growth at these shops is generally on par with traditional agencies, with the tradeoff of less in-person mentorship.",
      },
    ],
  },
];

/**
 * Match a listing to a city.
 * Remote bucket: returns the remote city if listing.remote === "remote".
 * Otherwise: case-insensitive substring match against location.
 * Returns the FIRST matching city; cities should be ordered by specificity if needed.
 */
export function matchListingToCity(
  location: string,
  remote: string,
): CityIntro | null {
  const loc = (location || "").toLowerCase();
  for (const city of CITY_INTROS) {
    if (city.remoteBucket) {
      if (remote === "remote") return city;
      continue;
    }
    if (city.match.some((m) => loc.includes(m))) return city;
  }
  return null;
}
