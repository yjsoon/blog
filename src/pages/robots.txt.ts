import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL, site: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}

# Agent discovery
# ${new URL("llms.txt", site).href}
# ${new URL(".well-known/api-catalog", site).href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL, site ?? sitemapURL));
};
