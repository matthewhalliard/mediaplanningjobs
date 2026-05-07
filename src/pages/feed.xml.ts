import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: "Media Planning Jobs — Editorial",
    description:
      "Career guides, salary data, and reporting on the media planning, buying, ad ops, and programmatic disciplines.",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: [post.data.primaryKeyword, ...post.data.tags],
    })),
    customData: "<language>en-us</language>",
  });
}
