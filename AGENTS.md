# AGENTS.md

Repository guide for coding agents. Keep this file short; put durable project context in versioned docs or source comments and link to them from here.

## Start Here

- [README.md](README.md): local setup and deployment summary.
- [package.json](package.json): canonical scripts and toolchain.
- [src/config.ts](src/config.ts): site settings, pagination, timezone, scheduled post margin.
- [src/content.config.ts](src/content.config.ts): blog content schema and loader rules.
- [astro.config.ts](astro.config.ts): Astro integrations, markdown plugins, Shiki, and env schema.

## Working Rules

- Prefer small, atomic changes. Persist non-trivial decisions in repo docs instead of chat.
- Validate the narrowest relevant surface, but default to `npm run build` for changes that affect routes, content, rendering, feeds, OG images, or search.
- Run `npm run lint` for JS/TS/Astro edits and `npm run format:check` when formatting drift is likely.
- Do not edit `public/pagefind` by hand; `npm run build` regenerates and recopies it.
- There is no dedicated test suite in this repo. Treat build and lint as the main safety checks unless you add targeted tests.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
```

`npm run build` runs `astro check`, builds the site, generates Pagefind indexes, and copies them into `public/pagefind/`.

## Repo Map

- `src/data/blog/`: blog posts in `YYYY-MM-DD-slug.{md,mdx}` format.
- `src/pages/`: routes, feeds, robots, search, and dynamic OG endpoints.
- `src/components/`: Astro components plus a small number of React islands.
- `src/assets/images/`: optimised local images; `public/` holds passthrough static assets.
- `src/utils/`: slug/path logic, post filtering, tag helpers, redirects, and OG helpers.

## Content and Routing Invariants

- Blog content is loaded from `src/data/blog` with `**/[^_]*.{md,mdx}`. Underscore-prefixed files and directories are ignored.
- File names drive post URLs via `src/utils/getPath.ts`; date prefixes are stripped from slugs.
- Frontmatter is enforced by Zod in `src/content.config.ts`. `pubDatetime` must be a date; `tags` default to `["others"]`; `author` defaults to `SITE.author`.
- Scheduled publishing uses `SITE.scheduledPostMargin` in `src/config.ts` and is currently set to 15 minutes.
- `showArchives` in `src/config.ts` also controls whether archive pages are included in the sitemap.

## Rendering Notes

- Astro is the default. Use React only for genuine client-side interactivity, and hydrate explicitly in MDX or Astro with `client:*`.
- Theme, typography, and global styling live under `src/styles/`.
- Dynamic OG images are generated from `src/pages/og.png.ts` and `src/pages/posts/[...slug]/index.png.ts`.

## Deployment

- Production deploys from GitHub to Cloudflare Pages.
- Build output is `dist/`; Node version is pinned via `.nvmrc`.

## When You Add Durable Behaviour

- Update `README.md` for user-facing workflow changes.
- Add repo-specific architecture notes under `docs/` or a nearby markdown file instead of expanding this file into a knowledge dump.
