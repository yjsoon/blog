import { createApiCatalog } from "@iannuttall/seo-graph-astro";
import { SITE } from "@/config";

export const GET = createApiCatalog({
  siteUrl: SITE.website,
  schemaEndpoints: [{ path: "/schema/blog.json", schemaType: "BlogPosting" }],
  schemaMap: { path: "/schemamap.xml" },
  additional: [
    { anchor: "/llms.txt" },
    { anchor: "/rss.xml" },
    { anchor: "/agent-routes.json" },
  ],
  cacheControl: "max-age=3600",
});
