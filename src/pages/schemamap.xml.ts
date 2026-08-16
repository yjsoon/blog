import { getCollection } from "astro:content";
import { createSchemaMap } from "@iannuttall/seo-graph-astro";
import { SITE } from "@/config";
import postFilter from "@/utils/postFilter";

const posts = (await getCollection("blog")).filter(postFilter);
const lastModified = posts.reduce((latest, post) => {
  const updated = post.data.modDatetime ?? post.data.pubDatetime;
  return updated > latest ? updated : latest;
}, new Date(0));

export const GET = createSchemaMap({
  siteUrl: SITE.website,
  entries: [{ path: "/schema/blog.json", lastModified }],
  cacheControl: "max-age=3600",
});
