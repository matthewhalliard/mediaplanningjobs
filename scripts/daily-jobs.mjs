#!/usr/bin/env node
/**
 * Daily job refresh for getmediaplanningjobs.com.
 *
 *   1. Import: search Adzuna (US) for media planning, buying, programmatic,
 *      ad ops, analytics and strategy roles, keep the ones that fit the site's
 *      function taxonomy, and write up to MAX_NEW new listings as .mdx files.
 *   2. Prune: remove listings older than EXPIRY_DAYS, and listings whose apply
 *      link now returns 404 or 410.
 *
 * Credentials come from the environment by name (ADZUNA_APP_ID, ADZUNA_APP_KEY)
 * and are never printed. Adzuna only accepts them as query parameters, so this
 * script never logs a request URL.
 *
 * Usage:
 *   node scripts/daily-jobs.mjs                 # import + prune
 *   node scripts/daily-jobs.mjs --prune-only    # prune only (no key needed)
 *   node scripts/daily-jobs.mjs --dry-run       # report, change nothing
 *   node scripts/daily-jobs.mjs --no-link-check # prune by age only
 *   MAX_NEW=60 node scripts/daily-jobs.mjs      # larger first run (backfill)
 *   ADZUNA_FIXTURE=path.json ...                # use a saved Adzuna response (tests)
 *
 * Writes a summary to $GITHUB_STEP_SUMMARY and, for the workflow, the commit
 * message to .daily-jobs-commit-message.
 */
import fs from "node:fs";
import path from "node:path";

const JOBS_DIR = path.resolve("src/content/jobs");
const EXPIRY_DAYS = Number(process.env.EXPIRY_DAYS ?? 45);
const MAX_NEW = Number(process.env.MAX_NEW ?? 10);
const MAX_AGE_DAYS_ON_IMPORT = 14; // only import fresh postings
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const PRUNE_ONLY = args.has("--prune-only");
const NO_LINK_CHECK = args.has("--no-link-check");
const today = new Date();
const todayISO = today.toISOString().slice(0, 10);

// Searches sent to Adzuna. Each result is still classified by its title below,
// so a loose search can't put an off-topic job on the site.
const SEARCHES = [
  "media planner",
  "media buyer",
  "media planning",
  "media buying",
  "programmatic",
  "ad operations",
  "media analyst",
  "media strategist",
  "media director",
  "paid media",
];

// ---------- classification ----------

const has = (s, re) => re.test(s);

export function classifyFunction(title) {
  const t = title.toLowerCase();
  // Must be a media / advertising role at all ("Data Scientist" alone is not).
  const mediaish = /\b(media|advertising|ad ops|adops|ad operations|programmatic|dsp|trafficker|paid social|paid search|ppc|biddable|marketing analytics|digital investment)\b/;
  if (!has(t, mediaish)) return null;
  if (has(t, /\b(vp|svp|evp|vice president|chief|head of|media director|director of media)\b/)) return "leadership";
  if (has(t, /\b(ad ?ops|ad operations|advertising operations|trafficker|trafficking|campaign operations)\b/)) return "ad-ops";
  if (has(t, /\b(programmatic|dsp|trader|trading desk)\b/)) return "programmatic";
  // "Media Buyer/Planner" is a buyer; "Planner/Buyer" a planner: first word wins.
  const plan = t.search(/\b(planner|planning)\b/);
  const buy = t.search(/\b(buyer|buying|investment)\b/);
  if (plan >= 0 && (buy < 0 || plan < buy)) return "planning";
  if (buy >= 0) return "buying";
  if (has(t, /\bintegrated media\b/)) return "planning";
  if (has(t, /\b(analyst|analytics|measurement|insights|data)\b/)) return "analytics";
  if (has(t, /\b(strategist|strategy|paid media|paid social|paid search|biddable|media manager|media supervisor)\b/)) return "strategy";
  return null;
}

export function classifyLevel(title) {
  const t = title.toLowerCase();
  if (has(t, /\b(vp|svp|evp|vice president|chief)\b/)) return "vp";
  if (has(t, /\b(director|head of)\b/)) return "director";
  if (has(t, /\b(manager|supervisor|lead)\b/)) return "manager";
  if (has(t, /\b(senior|sr\.?)\b/)) return "senior";
  if (has(t, /\b(intern|internship|assistant|coordinator|junior|jr\.?|entry|trainee|associate)\b/)) return "entry";
  return "mid";
}

export function classifyRemote(title, location, description) {
  const s = `${title} ${location} ${description}`.toLowerCase();
  if (/\bhybrid\b/.test(s)) return "hybrid";
  if (/\bremote\b/.test(`${title} ${location}`.toLowerCase())) return "remote";
  return "onsite";
}

export function slugFor(title, company) {
  return `${title} ${company}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s/g, "-")
    .slice(0, 80)
    .replace(/-+$/, "");
}

const yaml = (s) => JSON.stringify(String(s));
// Descriptions go into MDX, where braces and angle brackets are code.
const mdxSafe = (s) =>
  String(s).replace(/[{}<>]/g, " ").replace(/\s+/g, " ").trim();

function toMdx(job) {
  const lines = [
    "---",
    `title: ${yaml(job.title)}`,
    `company: ${yaml(job.company)}`,
    `location: ${yaml(job.location)}`,
    `remote: ${yaml(job.remote)}`,
    `function: ${yaml(job.function)}`,
    `level: ${yaml(job.level)}`,
  ];
  if (job.salaryMin) lines.push(`salaryMin: ${job.salaryMin}`);
  if (job.salaryMax) lines.push(`salaryMax: ${job.salaryMax}`);
  lines.push(
    `employmentType: ${yaml(job.employmentType)}`,
    `postedAt: ${job.postedAt}`,
    `applyUrl: ${yaml(job.applyUrl)}`,
    `source: "Adzuna"`,
    `featured: false`,
    "---",
    "",
    "## About the role",
    "",
    mdxSafe(job.description),
    ""
  );
  return lines.join("\n");
}

// ---------- Adzuna ----------

async function adzunaSearch(what, page) {
  if (process.env.ADZUNA_FIXTURE) {
    return JSON.parse(fs.readFileSync(process.env.ADZUNA_FIXTURE, "utf8")).results ?? [];
  }
  const id = process.env.ADZUNA_APP_ID;
  const key = process.env.ADZUNA_APP_KEY;
  if (!id || !key) throw new Error("ADZUNA_APP_ID and ADZUNA_APP_KEY must be set to import jobs.");
  const q = new URLSearchParams({
    app_id: id,
    app_key: key,
    what_phrase: what,
    results_per_page: "50",
    max_days_old: String(MAX_AGE_DAYS_ON_IMPORT),
    sort_by: "date",
    "content-type": "application/json",
  });
  const res = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/${page}?${q}`, {
    headers: { Accept: "application/json" },
  });
  // Never echo the URL: it carries the key.
  if (!res.ok) throw new Error(`Adzuna search "${what}" page ${page} failed: HTTP ${res.status}`);
  const body = await res.json();
  return body.results ?? [];
}

function fromAdzuna(r) {
  const title = (r.title ?? "").replace(/<[^>]+>/g, "").trim();
  const company = (r.company?.display_name ?? "").trim();
  const location = (r.location?.display_name ?? "US").trim();
  const description = (r.description ?? "").replace(/<[^>]+>/g, "").trim();
  const fn = classifyFunction(title);
  if (!title || !company || !fn || !r.redirect_url || !r.created) return null;
  const predicted = String(r.salary_is_predicted ?? "0") === "1";
  const employmentType =
    /\bintern(ship)?\b/i.test(title) ? "INTERN"
    : r.contract_type === "contract" ? "CONTRACTOR"
    : r.contract_time === "part_time" ? "PART_TIME"
    : "FULL_TIME";
  return {
    slug: slugFor(title, company),
    title,
    company,
    location,
    remote: classifyRemote(title, location, description),
    function: fn,
    level: classifyLevel(title),
    // Only show salaries the employer published, not Adzuna's estimates.
    salaryMin: !predicted && r.salary_min ? Math.round(r.salary_min) : undefined,
    salaryMax: !predicted && r.salary_max ? Math.round(r.salary_max) : undefined,
    employmentType,
    postedAt: String(r.created).slice(0, 10),
    applyUrl: r.redirect_url,
    description,
  };
}

async function importJobs(existing) {
  const seen = new Set(existing);
  const byFunction = new Map();
  for (const what of SEARCHES) {
    for (const page of [1, 2]) {
      const results = await adzunaSearch(what, page);
      for (const r of results) {
        const job = fromAdzuna(r);
        if (!job || seen.has(job.slug)) continue;
        seen.add(job.slug);
        if (!byFunction.has(job.function)) byFunction.set(job.function, []);
        byFunction.get(job.function).push(job);
      }
      if (results.length < 50 || process.env.ADZUNA_FIXTURE) break;
    }
  }
  // Newest first within each function, then take them in turn so one busy
  // function (programmatic, say) can't fill the whole day's quota.
  for (const list of byFunction.values()) list.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  const picked = [];
  while (picked.length < MAX_NEW && [...byFunction.values()].some((l) => l.length)) {
    for (const list of byFunction.values()) {
      if (list.length && picked.length < MAX_NEW) picked.push(list.shift());
    }
  }
  for (const job of picked) {
    if (!DRY) fs.writeFileSync(path.join(JOBS_DIR, `${job.slug}.mdx`), toMdx(job));
  }
  return picked;
}

// ---------- prune ----------

function frontmatter(file) {
  const text = fs.readFileSync(file, "utf8");
  const fm = text.split("---")[1] ?? "";
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?`, "m")) ?? [])[1];
  return { postedAt: get("postedAt"), applyUrl: get("applyUrl") };
}

async function linkIsGone(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
    return res.status === 404 || res.status === 410;
  } catch {
    return false; // network trouble is not proof the job is gone
  }
}

async function prune() {
  const removed = [];
  for (const name of fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".mdx"))) {
    const file = path.join(JOBS_DIR, name);
    const { postedAt, applyUrl } = frontmatter(file);
    const age = postedAt ? Math.floor((today - new Date(postedAt)) / 86400000) : Infinity;
    let reason = null;
    if (age > EXPIRY_DAYS) reason = `age ${age}d > ${EXPIRY_DAYS}d`;
    else if (!NO_LINK_CHECK && applyUrl && (await linkIsGone(applyUrl))) reason = "apply link 404/410";
    if (reason) {
      removed.push({ name, reason });
      if (!DRY) fs.unlinkSync(file);
    }
  }
  return removed;
}

// ---------- main ----------

async function main() {
  const existing = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  const added = PRUNE_ONLY ? [] : await importJobs(existing);
  const removed = await prune();
  const left = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".mdx")).length;

  const summary = [
    `## Daily jobs ${todayISO}${DRY ? " (dry run)" : ""}`,
    "",
    `Added ${added.length}, removed ${removed.length}, ${DRY ? "would leave" : "now"} ${DRY ? existing.length + added.length - removed.length : left} listings.`,
    "",
    ...(added.length ? ["### Added", ...added.map((j) => `- \`${j.slug}\` (${j.function}, ${j.level})`), ""] : []),
    ...(removed.length ? ["### Removed", ...removed.map((r) => `- \`${r.name}\`: ${r.reason}`), ""] : []),
  ].join("\n");
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  if (!DRY) {
    fs.writeFileSync(
      ".daily-jobs-commit-message",
      `daily: +${added.length} jobs, -${removed.length} expired (${todayISO})\n\n${summary}\n`
    );
  }
}

// Run only when executed directly, so the classifiers can be imported by tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
