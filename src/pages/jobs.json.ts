import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const jobs = await getCollection("jobs");
  const items = jobs
    .sort((a, b) => b.data.postedAt.getTime() - a.data.postedAt.getTime())
    .map((j) => ({
      title: j.data.title,
      company: j.data.company,
      location: j.data.location,
      remote: j.data.remote,
      function: j.data.function,
      level: j.data.level,
      salaryMin: j.data.salaryMin,
      salaryMax: j.data.salaryMax,
      postedAt: j.data.postedAt.toISOString(),
      url: new URL(`/jobs/${j.slug}/`, site).toString(),
      applyUrl: j.data.applyUrl,
    }));
  return new Response(JSON.stringify({ count: items.length, jobs: items }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
