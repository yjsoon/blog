# yjsoon.com

Personal blog of YJ Soon, built with [Astro](https://astro.build/).

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Theme**: Based on [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Search**: [Pagefind](https://pagefind.app/)
- **SEO**: [seo-graph](https://github.com/iannuttall/seo-graph) for JSON-LD, `llms.txt`, and Markdown twins (see [docs/seo-graph.md](docs/seo-graph.md))
- **Interactive Components**: [React](https://react.dev/)

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Production builds omit drafts and posts more than the configured 15-minute
publication margin into the future, including article pages, generated OG images,
archives, and derived discovery files. Development previews still show scheduled
non-draft posts. Publishing a scheduled post requires a new production build.

The development server uses Astro's default Host validation. Docker Compose
exposes it only on `127.0.0.1:4321`. If a trusted development proxy requires a
custom hostname, allow that exact hostname in `server.allowedHosts`; do not set
it to `true` or allow an entire shared hosting domain.

Run `npm run test:security` for the publication and Host-header regressions.
The publication test builds synthetic posts in a temporary copy and removes it
afterward; it needs temporary disk space for dependencies and network access for
the existing Google Fonts OG renderer. The Host test starts and stops a local
development server on an ephemeral port.

## Deployment

Deployed automatically via **Cloudflare Pages** connected to the GitHub repository. Push to `main` branch triggers automatic deployment.

When asked to “commit and push,” publish the requested changes all the way to `main`, wait for Cloudflare Pages to finish, and verify the live URL. A feature-branch push by itself is not a production deployment.

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: Specified in `.nvmrc`
- Build cache: Enable Cloudflare Pages build caching so Astro can reuse its
  incremental build output from `node_modules/.astro`

For Bing verification, sitemap submission, and automatic IndexNow notifications
via Cloudflare Crawler Hints, follow the [search discovery setup](docs/seo-graph.md#search-and-chatgpt-discovery).
The optional `PUBLIC_BING_SITE_VERIFICATION` build variable adds Bing's
verification meta tag; account verification and Crawler Hints need separate setup.

## Content Authoring

- See [RSS content rendering](docs/rss-content.md) for feed-safe video markup
  and other RSS compatibility notes.

## License

- Code: MIT — see [LICENSE](./LICENSE).
- Content (posts, pages, and images in `src/data` and elsewhere unless noted):
  [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
  You may share and adapt with attribution to "YJ Soon" and a link to the
  original page or https://yjsoon.com.

Notes

- Third‑party trademarks and logos are the property of their respective owners.
- Some images or embeds may have their own licenses; where applicable, those
  are indicated in the post.
