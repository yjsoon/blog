# Agent-ready SEO

This site uses [seo-graph](https://github.com/iannuttall/seo-graph) so search
engines and AI agents can read the same structured facts.

## What is installed

- [`@iannuttall/seo-graph-core`](https://www.npmjs.com/package/@iannuttall/seo-graph-core)
  builds linked schema.org `@graph` objects.
- [`@iannuttall/seo-graph-astro`](https://www.npmjs.com/package/@iannuttall/seo-graph-astro)
  emits Markdown twins, `llms.txt`, and a route manifest at build time.

The Astro package lists Astro 7 as an optional peer. This project stays on
Astro 5 and installs with `legacy-peer-deps` (see `.npmrc`). The hooks we
use (`astro:config:*` and `astro:build:done`) exist in Astro 5. That install
mode also nests some transitive packages, so `vite` and the React types are
listed directly.

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

## Left for later

- IndexNow key + incremental submit on production deploys
- A Worker handler for `Accept: text/markdown` at canonical URLs
- `llms-full.txt` (optional one-file export; not part of the llms.txt v2
  proposal)
