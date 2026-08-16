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

## Deployment

Deployed automatically via **Cloudflare Pages** connected to the GitHub repository. Push to `main` branch triggers automatic deployment.

When asked to “commit and push,” publish the requested changes all the way to `main`, wait for Cloudflare Pages to finish, and verify the live URL. A feature-branch push by itself is not a production deployment.

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: Specified in `.nvmrc`

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
