import { createApiCatalog } from "@iannuttall/seo-graph-astro";
import { SITE } from "@/config";

export const GET = createApiCatalog({
  siteUrl: SITE.website,
  schemaEndpoints: [{ path: "/schema/blog.json", schemaType: "BlogPosting" }],
  schemaMap: { path: "/schemamap.xml" },
  additional: [
    {
      anchor: "/llms.txt",
      type: "text/plain",
      serviceDoc: "https://github.com/iannuttall/seo-graph",
    },
    {
      anchor: "/rss.xml",
      type: "application/rss+xml",
    },
    {
      anchor: "/agent-routes.json",
      type: "application/json",
    },
  ],
  cacheControl: "max-age=3600",
});
