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

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Primary keyword the post targets (used for analytics + content planning). */
    primaryKeyword: z.string(),
    /** Always "Halliard Editorial" — never an individual byline. */
    author: z.literal("Halliard Editorial").default("Halliard Editorial"),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    /** Estimated reading time in minutes. */
    readingMinutes: z.number().optional(),
    tags: z.array(z.string()).default([]),
    /** Discipline this post is most relevant to. */
    function: z
      .enum([
        "planning",
        "buying",
        "ad-ops",
        "programmatic",
        "analytics",
        "strategy",
        "leadership",
        "general",
      ])
      .default("general"),
    /** Optional FAQ block surfaced as FAQPage JSON-LD. */
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        }),
      )
      .optional(),
    /** Hide a post from listings/feed without deleting (e.g. while drafting). */
    draft: z.boolean().default(false),
  }),
});

export const collections = { jobs, posts };
