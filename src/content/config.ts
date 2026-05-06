import { defineCollection, z } from "astro:content";

const jobs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    location: z.string(),
    remote: z.enum(["onsite", "hybrid", "remote"]).default("onsite"),
    function: z.enum([
      "planning",
      "buying",
      "ad-ops",
      "programmatic",
      "analytics",
      "strategy",
      "leadership",
    ]),
    level: z.enum(["entry", "mid", "senior", "manager", "director", "vp"]),
    salaryMin: z.number().optional(),
    salaryMax: z.number().optional(),
    employmentType: z
      .enum(["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN"])
      .default("FULL_TIME"),
    postedAt: z.coerce.date(),
    applyUrl: z.string().url(),
    source: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { jobs };
