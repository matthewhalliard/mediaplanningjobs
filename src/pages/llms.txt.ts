// /llms.txt — Anthropic-proposed convention for LLM/agent crawlers.
// See https://llmstxt.org. Provides a curated, markdown-formatted index of
// the most important pages on the site so LLMs can ingest us cleanly without
// fighting our HTML.
//
// We regenerate this at build time so it stays in sync with the live job
// catalog and editorial pipeline.

import { getCollection } from "astro:content";
import type { APIContext } from "astro";

const FUNCTIONS = [
  { slug: "media-planner", label: "Media Planner" },
  { slug: "media-buyer", label: "Media Buyer" },
  { slug: "ad-operations", label: "Ad Operations" },
  { slug: "programmatic", label: "Programmatic" },
  { slug: "media-analyst", label: "Media Analyst" },
  { slug: "media-strategy", label: "Media Strategy" },
  { slug: "media-director", label: "Media Director" },
];

const CITIES = [
  { slug: "new-york", label: "New York" },
  { slug: "los-angeles", label: "Los Angeles" },
  { slug: "chicago", label: "Chicago" },
  { slug: "remote", label: "Remote" },
];

export async function GET(_context: APIContext) {
  const jobs = (await getCollection("jobs"))
    .sort((a, b) => b.data.postedAt.getTime() - a.data.postedAt.getTime());

  const posts = (await getCollection("posts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  const featured = jobs.filter((j) => j.data.featured).slice(0, 10);
  const recent = jobs.filter((j) => !j.data.featured).slice(0, 30);

  const lines: string[] = [];

  lines.push("# Media Planning Jobs");
  lines.push("");
  lines.push(
    "> The specialist job board for media planners, media buyers, ad operations, programmatic traders, and media analysts. Curated openings from agencies, brands, and ad-tech companies across the US. Operated by [Halliard](https://halliardmedia.com), the team behind [Media Planning Tool](https://mediaplanningtool.com).",
  );
  lines.push("");
  lines.push(
    "This file lists the canonical pages of the site for AI/LLM crawlers and answer engines. All URLs return static HTML with structured data (JobPosting, Article, Organization).",
  );
  lines.push("");

  // --- Core pages ---
  lines.push("## Core pages");
  lines.push("");
  lines.push("- [Home](https://getmediaplanningjobs.com/): site overview and today's featured roles.");
  lines.push("- [All jobs](https://getmediaplanningjobs.com/jobs/): complete job catalog with filters.");
  lines.push("- [Editorial](https://getmediaplanningjobs.com/blog/): salary data, career guides, and discipline reporting.");
  lines.push("- [About](https://getmediaplanningjobs.com/about/): who runs the site and editorial principles.");
  lines.push("- [Post a job](https://getmediaplanningjobs.com/post-a-job/): for employers hiring media talent.");
  lines.push("");

  // --- Browse by function ---
  lines.push("## Browse jobs by function");
  lines.push("");
  lines.push("Each page lists current openings, salary bands, top employers, and FAQ content for the role.");
  lines.push("");
  for (const fn of FUNCTIONS) {
    lines.push(`- [${fn.label} jobs](https://getmediaplanningjobs.com/jobs/function/${fn.slug}/)`);
  }
  lines.push("");

  // --- Browse by city ---
  lines.push("## Browse jobs by city");
  lines.push("");
  for (const c of CITIES) {
    lines.push(`- [Media jobs in ${c.label}](https://getmediaplanningjobs.com/jobs/city/${c.slug}/)`);
  }
  lines.push("");

  // --- Editorial ---
  if (posts.length) {
    lines.push("## Editorial");
    lines.push("");
    for (const p of posts) {
      const d = p.data.publishedAt.toISOString().slice(0, 10);
      lines.push(
        `- [${p.data.title}](https://getmediaplanningjobs.com/blog/${p.slug}/) — ${p.data.description} (published ${d})`,
      );
    }
    lines.push("");
  }

  // --- Featured jobs ---
  if (featured.length) {
    lines.push("## Featured jobs");
    lines.push("");
    for (const j of featured) {
      lines.push(
        `- [${j.data.title} — ${j.data.company} (${j.data.location})](https://getmediaplanningjobs.com/jobs/${j.slug}/)`,
      );
    }
    lines.push("");
  }

  // --- Recent jobs ---
  if (recent.length) {
    lines.push("## Recent openings");
    lines.push("");
    for (const j of recent) {
      lines.push(
        `- [${j.data.title} — ${j.data.company} (${j.data.location})](https://getmediaplanningjobs.com/jobs/${j.slug}/)`,
      );
    }
    lines.push("");
  }

  // --- Machine-readable feeds ---
  lines.push("## Machine-readable feeds");
  lines.push("");
  lines.push("- [sitemap-index.xml](https://getmediaplanningjobs.com/sitemap-index.xml): full URL index.");
  lines.push("- [jobs.json](https://getmediaplanningjobs.com/jobs.json): all active jobs as JSON.");
  lines.push("- [jobs.xml](https://getmediaplanningjobs.com/jobs.xml): Indeed-compatible JobPosting XML feed.");
  lines.push("- [feed.xml](https://getmediaplanningjobs.com/feed.xml): editorial RSS feed.");
  lines.push("");

  lines.push("## Operator");
  lines.push("");
  lines.push(
    "Site operated by Halliard. Contact: matthew@halliardmedia.com. Editorial integrity: we do not accept payment from listed employers and do not run paid placements in job rankings.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
