# Agent-ready SEO

This site uses [seo-graph](https://github.com/iannuttall/seo-graph) so search
engines and AI agents can read the same structured facts.

## What is installed

- [`@iannuttall/seo-graph-core`](https://www.npmjs.com/package/@iannuttall/seo-graph-core)
  builds linked schema.org `@graph` objects.
- [`@iannuttall/seo-graph-astro`](https://www.npmjs.com/package/@iannuttall/seo-graph-astro)
  emits Markdown twins, `llms.txt`, and a route manifest at build time.

The Astro package peers with Astro 7, so it participates in normal npm
dependency resolution. `vite` is listed directly because the Tailwind Vite
plugin consumes it.

Page URLs in the graph use trailing slashes to match Astro's directory
output and the last breadcrumb item. Empty post descriptions fall back to
`SITE.desc` so the agent-markdown pipeline has a meta description to read.

## Page JSON-LD

`src/utils/seoGraph.ts` follows the personal-blog recipe: a site-wide
`WebSite`, `Person`, `Blog`, and navigation graph, plus a per-page
`WebPage` / `ProfilePage` / `CollectionPage` and `BlogPosting` where
needed. `src/layouts/Layout.astro` renders the assembled graph.

Do not hand-write a second JSON-LD blob on a page. Pass `schemaKind`,
breadcrumbs, and post fields into `Layout` instead.

## Build artefacts

`agentMarkdown()` walks the built HTML and writes:

- a `.md` twin beside each content page
- `/llms.txt`
- `/agent-routes.json`
- Cloudflare `_headers` rules for the Markdown routes

Decorative chrome should stay outside `<main>` or use
`data-agent-markdown="exclude"`. The converter already drops `nav`,
`footer`, `form`, and `button`.

Collection-source Markdown endpoints are intentionally not wired. The
build hook also writes `.md` twins and will refuse to overwrite a
different file at the same path.

## Discovery URLs

| URL | Purpose |
| --- | --- |
| `/llms.txt` | Curated + generated index of Markdown twins |
| `/agent-routes.json` | HTML ↔ Markdown map with hashes and token counts |
| `/schema/blog.json` | Corpus-wide blog `@graph` |
| `/schemamap.xml` | List of schema endpoints |
| `/.well-known/api-catalog` | RFC 9727 catalogue of machine-readable routes |

Runtime `Accept: text/markdown` negotiation at canonical HTML URLs needs
a Cloudflare Worker. This site is a static Pages deploy, so agents should
use the `.md` twins and `llms.txt` instead.

## Search and ChatGPT discovery

Following [Ian Nuttall's recommendations](https://x.com/iannuttall/status/1922215138511487303),
the technical baseline is already present: Astro builds readable HTML without
requiring JavaScript, `robots.txt` allows all crawlers (including `ChatGPT-User`,
`OAI-SearchBot`, and `GPTBot`), and advertises `/sitemap-index.xml`. Pages have
titles, descriptions, canonical links, and JSON-LD; posts have `BlogPosting`
schema, article Open Graph metadata, and publication/update dates.

These are discovery aids, not a guarantee of inclusion or ranking in ChatGPT.
Allowing crawlers in the repository does not override Cloudflare bot rules.

### Bing Webmaster Tools (account setup required)

1. Add `https://yjsoon.com/` in [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Choose HTML meta-tag verification. Set the **content value only** from
   Bing's `msvalidate.01` tag as `PUBLIC_BING_SITE_VERIFICATION` in the
   Cloudflare Pages production build environment. This is a public verification
   token, not an API credential.
3. Deploy a new build, check the homepage source for `msvalidate.01`, then
   complete verification in Bing. The tag is omitted when the variable is unset.
4. Submit `https://yjsoon.com/sitemap-index.xml` in Bing's Sitemaps section.
   Inspect a representative post URL and check crawl/indexing reports there.

### Automatic IndexNow notifications (production setting required)

Use Cloudflare's [Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
rather than maintaining a second submission service. In the site's Cloudflare
zone, go to **Caching → Configuration → Crawler Hints** and enable it. It uses
cache signals to send IndexNow notifications; it is not an immediate,
per-deployment submission guarantee. No repository key or build-time network
submission is needed. Keep the sitemap submission as well.

This setting and Bing account setup are not enabled by a code change. Review
Cloudflare bot/WAF settings too: they must allow the crawlers you want to reach
the public site. Do not disable security controls globally to achieve this.

### Editorial recommendations

- Keep titles and descriptions specific to the actual post, with useful heading
  structure and relevant internal links. Preserve source wording when adapting
  social posts, as required by [the content workflow](content-workflow.md).
- Set `modDatetime` only after a substantive update. The existing date component
  renders real dates using `<time datetime>` in `Asia/Singapore`; do not bump
  dates or append the current year merely to appear fresh.
- Add FAQ or HowTo schema only when a page genuinely contains that content.
  Do not label ordinary blog posts as FAQs or manufacture support/pricing pages
  for a personal blog.
- Publish original observations or data when available, cite sources, and
  explain methods. Do not invent statistics or bulk-generate thin long-tail posts.
- Pursue relevant mentions, expert contributions, and attributed cross-posts
  through the author's accounts. Outreach and external publishing require
  separate approval; do not automate promotional spam or link schemes.

## Left for later

- A Worker handler for `Accept: text/markdown` at canonical URLs
- `llms-full.txt` (optional one-file export; not part of the llms.txt v2
  proposal)
