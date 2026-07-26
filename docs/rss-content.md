# RSS content rendering

The RSS feed is generated from each post's Markdown or MDX source in
`src/pages/rss.xml.ts`. Interactive components need an explicit feed fallback
because RSS readers support a smaller and inconsistent subset of HTML.

## Native video

A standalone lowercase `<video>` block is converted to a clickable poster and a
`Watch video` link:

```html
<video
  src="/videos/example.mp4"
  poster="/images/example-poster.jpg"
  aria-label="Description of the video"
>
  Your browser does not support embedded video.
</video>
```

The media source may instead be supplied by the first lowercase child
`<source src="...">`. Single- and double-quoted attributes are supported.

Absolute and root-relative media URLs retain their normal meaning.
Path-relative URLs such as `media/example.mp4` resolve from the canonical post
URL, matching how they behave on the post page.

Video-like text in fenced, indented, or inline code is left unchanged, as is
markup inside HTML or MDX comments. Capitalized `<Video>` tags are treated as
MDX components and are not converted.

For the most predictable feed output, keep video and poster files under
`public/`, use root-relative URLs, and include both `poster` and `aria-label`.
