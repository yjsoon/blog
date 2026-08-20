import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { agentMarkdown } from "@iannuttall/seo-graph-astro";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  compressHTML: true,
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  experimental: {
    incrementalBuild: true,
  },
  server: {
    allowedHosts: true,
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
    agentMarkdown({
      llmsTxt: {
        title: SITE.title,
        summary: SITE.desc,
        details:
          "Personal blog of YJ Soon. Content is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). RSS is at /rss.xml. A corpus-wide JSON-LD graph is at /schema/blog.json.",
        sections: [
          {
            heading: "Start here",
            items: [
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/posts", label: "All posts" },
              { path: "/archives", label: "Archives" },
            ],
          },
        ],
        autoSection: { heading: "All pages", position: "after" },
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
