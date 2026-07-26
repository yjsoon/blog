import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt({
  html: true, // Enable HTML tags in source
});

function toAbsoluteSiteUrl(path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }

  return new URL(path, SITE.website).toString();
}

function getHtmlAttribute(attributes: string, name: string): string | null {
  const match = attributes.match(
    new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i")
  );

  return match?.[1] ?? match?.[2] ?? null;
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceVideosWithLinks(content: string): string {
  return content.replace(
    /<video\b([^>]*)>[\s\S]*?<\/video>/gi,
    (_, attributes: string) => {
      const source = getHtmlAttribute(attributes, "src");

      if (!source) {
        return "\n\n[Embedded video unavailable in this feed]\n\n";
      }

      const videoUrl = escapeHtmlAttribute(toAbsoluteSiteUrl(source));
      const poster = getHtmlAttribute(attributes, "poster");
      const label = escapeHtmlAttribute(
        getHtmlAttribute(attributes, "aria-label") || "Embedded video"
      );
      const posterLink = poster
        ? `<a href="${videoUrl}"><img src="${escapeHtmlAttribute(
            toAbsoluteSiteUrl(poster)
          )}" alt="${label}" /></a>\n`
        : "";

      return `\n\n${posterLink}<p><a href="${videoUrl}">▶ Watch video</a></p>\n\n`;
    }
  );
}

// Dynamic import of all images from assets
const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{png,jpg,jpeg,gif,webp}');

// Function to create image import mapping from the post body
function createImageMapping(postBody: string): Record<string, string> {
  const importMapping: Record<string, string> = {};
  const importRegex = /import\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s+from\s+["']([^"']+)["'];?/gm;
  
  let match;
  while ((match = importRegex.exec(postBody)) !== null) {
    const [, variableName, importPath] = match;
    // Convert relative import path to absolute path for imageModules
    if (importPath.includes('assets/images')) {
      const absolutePath = importPath.replace('../../', '/src/');
      importMapping[variableName] = absolutePath;
    }
  }
  
  return importMapping;
}

// Function to resolve imported image variable names to actual paths
async function resolveImagePath(imageName: string, postBody: string): Promise<string> {
  const imageMapping = createImageMapping(postBody);
  const absolutePath = imageMapping[imageName];
  
  if (absolutePath && imageModules[absolutePath]) {
    try {
      const imageModule = await imageModules[absolutePath]();
      // Return the src property of the imported image
      return imageModule.default.src;
    } catch (error) {
      console.error(`Error loading image ${absolutePath}:`, error);
    }
  }
  
  // If not found, return the original name
  return imageName;
}

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  
  const items = await Promise.all(
    sortedPosts.map(async (post) => {
      let content = post.data.description;
      
      if (post.body) {
        // Remove MDX import statements
        let cleanBody = post.body.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '').trim();
        
        // Convert ImageWithModal components to raw HTML img tags (before markdown processing)
        // Handle both {variable} and "string" src formats with async image resolution
        const variableImageRegex = /<ImageWithModal\s+src=\{([^}]+)\}\s+alt="([^"]*)"[^>]*\/?>/g;
        const stringImageRegex = /<ImageWithModal\s+src="([^"]*)"\s+alt="([^"]*)"[^>]*\/?>/g;
        const multilineVariableRegex = /<ImageWithModal\s*\n?\s*src=\{([^}]+)\}\s*\n?\s*alt="([^"]*)"[^>]*\/?>/gm;
        const multilineStringRegex = /<ImageWithModal\s*\n?\s*src="([^"]*)"\s*\n?\s*alt="([^"]*)"[^>]*\/?>/gm;
        
        // Process variable-based image sources
        let match;
        while ((match = variableImageRegex.exec(cleanBody)) !== null) {
          const [fullMatch, src, alt] = match;
          const resolvedSrc = await resolveImagePath(src, post.body || '');
          const resolvedPath = resolvedSrc.startsWith('/') ? `${SITE.website}${resolvedSrc}` : resolvedSrc;
          cleanBody = cleanBody.replace(fullMatch, `\n\n<img src="${resolvedPath}" alt="${alt}" />\n\n`);
        }
        
        while ((match = multilineVariableRegex.exec(cleanBody)) !== null) {
          const [fullMatch, src, alt] = match;
          const resolvedSrc = await resolveImagePath(src, post.body || '');
          const resolvedPath = resolvedSrc.startsWith('/') ? `${SITE.website}${resolvedSrc}` : resolvedSrc;
          cleanBody = cleanBody.replace(fullMatch, `\n\n<img src="${resolvedPath}" alt="${alt}" />\n\n`);
        }
        
        // Process string-based image sources (direct URLs)
        cleanBody = cleanBody.replace(stringImageRegex, '\n\n<img src="$1" alt="$2" />\n\n');
        cleanBody = cleanBody.replace(multilineStringRegex, '\n\n<img src="$1" alt="$2" />\n\n');
        
        // RSS readers inconsistently support video elements. Use a linked poster
        // and an absolute video URL so the content works across feed clients.
        cleanBody = replaceVideosWithLinks(cleanBody);

        // Convert YouTubeEmbed components to clickable thumbnail + link
        cleanBody = cleanBody.replace(
          /<YouTubeEmbed\s*\n?\s*videoId="([^"]+)"\s*\n?\s*(?:title="([^"]*)")?\s*\n?\s*\/?>/gm,
          (_, videoId, title) => {
            const label = title || 'Watch on YouTube';
            return `\n\n<a href="https://www.youtube.com/watch?v=${videoId}"><img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${label}" /></a>\n<p><a href="https://www.youtube.com/watch?v=${videoId}">▶ ${label}</a></p>\n\n`;
          }
        );

        // Convert MovingStoryGallery components to placeholder text
        cleanBody = cleanBody.replace(
          /<MovingStoryGallery[^>]*\/?>/g,
          '\n\n[Photo Gallery]\n\n'
        );
        
        content = sanitizeHtml(parser.render(cleanBody), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        });
      }
      
      return {
        link: getPath(post.id, post.filePath),
        title: post.data.title,
        description: post.data.description,
        content,
        pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
        author: post.data.author || SITE.author,
        categories: post.data.tags,
      };
    })
  );
  
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
    customData: `<language>en-us</language>`,
  });
}
