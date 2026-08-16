import { getCollection, type CollectionEntry } from "astro:content";
import { createSchemaEndpoint } from "@iannuttall/seo-graph-astro";
import { SITE } from "@/config";
import postFilter from "@/utils/postFilter";
import { blogPostPieces, postCanonicalUrl, postImage } from "@/utils/seoGraph";

function postPieces(post: CollectionEntry<"blog">) {
  const url = postCanonicalUrl(post);
  return blogPostPieces({
    url,
    name: `${post.data.title} | ${SITE.title}`,
    headline: post.data.title,
    description: post.data.description,
    image: postImage(post),
    datePublished: post.data.pubDatetime,
    dateModified: post.data.modDatetime,
    breadcrumbs: [
      { name: "Home", url: SITE.website },
      { name: "Posts", url: new URL("/posts", SITE.website).href },
      { name: post.data.title, url },
    ],
    articleSection: post.data.tags[0],
  });
}

export const GET = createSchemaEndpoint({
  entries: async () => (await getCollection("blog")).filter(postFilter),
  mapper: postPieces,
  cacheControl: "max-age=3600",
});
