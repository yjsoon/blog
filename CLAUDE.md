# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Key Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Type check, build, and generate search indexes
npm run preview      # Preview production build locally

# Code Quality
npm run format       # Format with Prettier
npm run lint         # ESLint check

# Build Process Note
# The build includes Pagefind search index generation: pagefind --site dist && cp -r dist/pagefind public/
```

## Architecture Overview

### Tech Stack
- **Astro 5.12.0** with MDX support for interactive content
- **TailwindCSS v4** using new `@import "tailwindcss"` syntax
- **React 19** for interactive components (photo galleries, etc.)
- **TypeScript** with strict mode and `@/*` path alias for `./src/*`

### Content Management

Blog posts live in `/src/data/blog/` as `.md` or `.mdx` files with naming pattern `YYYY-MM-DD-slug.{md,mdx}`.

Content schema (validated with Zod):
- `pubDatetime`: Publication date/time
- `featured`: Optional boolean for homepage featuring
- `draft`: Hidden in production when true
- `tags`: Array of strings for categorization
- Posts publish with 15-minute future margin (for build times)

### Styling System

TailwindCSS v4 with CSS custom properties for theming:

```css
/* Theme variables in global.css */
--background, --foreground, --accent, --muted, --border

/* Dark mode via data attribute */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

/* Typography class for blog content */
.app-prose /* extends Tailwind Typography with custom styles */
```

### Component Architecture

- **Astro components** (`.astro`): Static by default, for layouts and non-interactive UI
- **React components** (`.tsx`): Interactive features, hydrated with `client:load`
- **MDX support**: Import React components directly in blog posts

Example MDX usage:
```mdx
import PhotoGallery from "../../components/PhotoGallery.tsx";
<PhotoGallery photos={photos} client:load />
```

### Path Generation Logic

The `getPath.ts` utility creates URLs from file paths:
- Removes date prefixes from filenames
- Filters underscore-prefixed directories
- Handles nested directory structures
- Slugifies path segments

### Search Implementation

Pagefind generates static search indexes during build:
- Indexes are copied to `/public/pagefind/`
- Client-side fuzzy search on `/search` page
- Auto-generated, no manual index management needed

## Non-Obvious Patterns

1. **Dual Image Storage**: 
   - `/public/images/` for direct access
   - `/src/assets/images/` for Astro optimization

2. **Scheduled Posts**: Posts with future `pubDatetime` auto-publish with 15-minute margin

3. **Theme Script**: Inline script in `<head>` prevents theme flash on load

4. **View Transitions**: Full Astro view transitions support enabled

5. **Photo Gallery**: Custom React component with lightbox, uses `react-photo-album`

## Site Configuration

Main config in `/src/config.ts`:
- `SITE.website`: Base URL
- `SITE.postPerIndex`: Homepage post count
- `SITE.postPerPage`: Pagination size
- `SITE.showArchives`: Archive page visibility

Social links in `/src/constants.ts`

## Deployment

**Cloudflare Pages**: Automatically deploys from GitHub repository on push to main branch.
- No manual deployment commands needed
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version specified in `.nvmrc`

## Migration Context

This blog migrated from WordPress at yjsoon.com. TODO items include:
- Feed compatibility and redirects
- Image modal functionality
- Homepage layout improvements

## Development Tips

- When adding images to posts, use `/src/assets/images/YYYY/MM/` structure
- React components in MDX need `client:load` directive
- Use `.link` class for styled links outside prose content
- Check `npm run build` before committing (includes type checking)