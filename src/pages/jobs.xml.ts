// Indeed-compatible XML feed.
// Spec: https://www.indeed.com/hire/how-to-post-a-job-online/free-job-posting-sites
// Indeed crawls <source><job>...</job></source> with CDATA-wrapped HTML descriptions.
// Used for syndication; Indeed will index and surface our roles in search.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const mdToHtml = (raw: string): string => {
  const body = (raw || "").replace(/^---[\s\S]*?---\s*/m, "").trim();
  if (!body) return "";
  const lines = body.split(/\n/);
  const out: string[] = [];
  let inList = false;
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${para.join(" ").trim()}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  for (const ln of lines) {
    const t = ln.trim();
    if (!t) {
      flushPara();
      closeList();
      continue;
    }
    const h = t.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      flushPara();
      closeList();
      out.push(`<h3>${h[2]}</h3>`);
      continue;
    }
    const li = t.match(/^[-*]\s+(.+)$/);
    if (li) {
      flushPara();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${li[1]}</li>`);
      continue;
    }
    para.push(t);
  }
  flushPara();
  closeList();
  return out
    .join("")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\([^)]+\)/g, "$1");
};

export const GET: APIRoute = async ({ site }) => {
  const jobs = await getCollection("jobs");
  const sorted = jobs.sort((a, b) => b.data.postedAt.getTime() - a.data.postedAt.getTime());
  const publisherUrl = site?.toString() || "https://getmediaplanningjobs.com/";
  const generated = new Date().toUTCString();

  const items = sorted
    .map((j) => {
      const d = j.data;
      const url = new URL(`/jobs/${j.slug}/`, site).toString();
      const desc = mdToHtml(j.body || "") || `<p>${d.title} at ${d.company}, based in ${d.location}.</p>`;
      const city = d.location.split(",")[0]?.trim() || "";
      const state = d.location.split(",")[1]?.trim() || "";
      const salary =
        d.salaryMin && d.salaryMax
          ? `$${d.salaryMin.toLocaleString()} - $${d.salaryMax.toLocaleString()}`
          : d.salaryMin
            ? `$${d.salaryMin.toLocaleString()}+`
            : d.salaryMax
              ? `Up to $${d.salaryMax.toLocaleString()}`
              : "";
      const jobType =
        d.employmentType === "FULL_TIME"
          ? "fulltime"
          : d.employmentType === "PART_TIME"
            ? "parttime"
            : d.employmentType === "CONTRACTOR"
              ? "contract"
              : d.employmentType === "INTERN"
                ? "internship"
                : "fulltime";

      return [
        "  <job>",
        `    <title>${cdata(d.title)}</title>`,
        `    <date>${escapeXml(d.postedAt.toUTCString())}</date>`,
        `    <referencenumber>${escapeXml(j.slug)}</referencenumber>`,
        `    <url>${escapeXml(url)}</url>`,
        `    <company>${cdata(d.company)}</company>`,
        `    <city>${cdata(city)}</city>`,
        state ? `    <state>${cdata(state)}</state>` : "",
        `    <country>US</country>`,
        d.remote === "remote" ? `    <remotetype>1</remotetype>` : "",
        `    <description>${cdata(desc)}</description>`,
        salary ? `    <salary>${cdata(salary)}</salary>` : "",
        `    <jobtype>${escapeXml(jobType)}</jobtype>`,
        `    <category>${cdata(d.function)}</category>`,
        `    <experience>${cdata(d.level)}</experience>`,
        "  </job>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>Media Planning Jobs</publisher>
  <publisherurl>${escapeXml(publisherUrl)}</publisherurl>
  <lastBuildDate>${escapeXml(generated)}</lastBuildDate>
${items}
</source>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
