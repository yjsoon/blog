# Content adaptation workflow

Use this workflow when turning a LinkedIn post or another social post into a blog post.

## Source text is authoritative

- Treat the source post body as copy to preserve, not material to rewrite.
- Keep the original wording, order, tone, punctuation, spelling, capitalization, emoji, emphasis, and jokes.
- Do not add explanatory transitions, headings, summaries, conclusions, or invented context.
- A user-specified blog title is metadata and may differ from the source post. Keep frontmatter metadata concise, but do not let the description replace or alter the body.

## Formatting and media

Formatting changes are allowed when they do not change the text:

- Split the source into its existing paragraphs.
- Use Markdown lists and blockquotes where the source clearly contains lists or quotations.
- Preserve attached images by storing local copies under `src/assets/images/YYYY/MM/` and adding descriptive alt text.
- Embed linked videos using the existing component, such as `YouTubeEmbed`. Preserve timestamps from the source; YouTube timestamps use seconds (for example, 17 minutes becomes `start=1020`).
- Do not replace a video with a summary or paraphrase.

Keep presentation compact and literal:

- If a video is embedded immediately after a source sentence, keep the sentence as a short cue such as `17 minutes into this video:` and do not add a second visible URL.
- If the same destination appears later as a named link, remove a redundant earlier link without changing the surrounding wording.
- Use italics for a short inline quotation when requested; use a blockquote for a long quotation and do not retain quotation marks that duplicate the blockquote styling.
- Keep consecutive bullet items adjacent unless the source clearly contains separate paragraphs; do not insert blank lines between ordinary bullets.
- Keep the final LinkedIn backlink as one compact paragraph so its punctuation does not render on a line by itself. Use the `LinkedInBacklink` component for that closer so it stays readable in both light and dark themes.

## Links

- Resolve LinkedIn short links (`lnkd.in`) and other platform redirects to the original destination, then link to that original source in the blog post.
- Keep the source post’s visible wording wherever possible while changing only the destination needed to point to the original.
- Keep a final backlink to the exact source post on LinkedIn so readers can discuss or react there. This backlink is intentionally not replaced with the original destination.
- Do not guess a destination when a redirect cannot be resolved; flag it for the user.

## Verification

- Check the adapted body against the source before editing beyond formatting and link/media substitutions.
- Run Prettier on the changed content file and `npm run build` for content changes. Confirm the generated page contains the expected original link, media embed, and LinkedIn backlink.

## Publishing

- In this project, interpret “commit and push” as “publish”: commit the intended changes, push the branch, land it on `main`, wait for Cloudflare Pages to deploy, and verify the live URL.
- Pushing a feature branch alone is not publication. When working off `main`, create or update the merge path to `main` and complete it before reporting success.
- Keep unrelated working-tree changes out of the published scope, and report the commit, `main` status, deployment status, and live verification separately.
