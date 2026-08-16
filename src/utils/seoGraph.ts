import type { CollectionEntry } from "astro:content";
import type { Blog, Organization, Person } from "schema-dts";
import {
  assembleGraph,
  buildArticle,
  buildBreadcrumbList,
  buildImageObject,
  buildPiece,
  buildSiteNavigationElement,
  buildWebPage,
  buildWebSite,
  makeIds,
  type GraphEntity,
  type WebPageType,
} from "@iannuttall/seo-graph-core";
import personPhoto from "@/assets/logo.png";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";

export type SchemaKind = "home" | "about" | "collection" | "page" | "post";

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export interface SeoImage {
  url: string;
  width: number;
  height: number;
}

export interface BuildSeoGraphInput {
  kind: SchemaKind;
  url: string;
  name: string;
  description: string;
  image?: SeoImage;
  datePublished?: Date;
  dateModified?: Date | null;
  breadcrumbs?: BreadcrumbCrumb[];
  headline?: string;
  articleSection?: string;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const CONTENT_LICENSE = "https://creativecommons.org/licenses/by/4.0/";
export const BLOG_PATH = "/posts";

const PERSON_SAME_AS = [
  "https://x.com/yjsoon",
  "https://threads.net/@yjsoon",
  "https://www.linkedin.com/in/yjsoon",
  "https://www.github.com/yjsoon",
] as const;

export const ids = makeIds({
  siteUrl: SITE.website,
  personUrl: SITE.profile,
});

export const origin = SITE.website.replace(/\/+$/, "");
export const blogId = `${origin}${BLOG_PATH}/#blog`;
export const blogUrl = absoluteUrl(BLOG_PATH);
export const aboutUrl = SITE.profile;
export const language = SITE.lang || "en";

export const personImage: SeoImage = {
  url: absoluteUrl(personPhoto.src),
  width: personPhoto.width ?? 300,
  height: personPhoto.height ?? 300,
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//u.test(path)) return path;
  return new URL(path, SITE.website).href;
}

export function canonicalHref(url: string | URL): string {
  return new URL(url, SITE.website).href;
}

export function postCanonicalUrl(post: CollectionEntry<"blog">): string {
  if (post.data.canonicalURL) return canonicalHref(post.data.canonicalURL);
  return absoluteUrl(getPath(post.id, post.filePath));
}

export function postImage(post: CollectionEntry<"blog">): SeoImage {
  const ogImage = post.data.ogImage;
  if (typeof ogImage === "string") {
    return { url: absoluteUrl(ogImage), ...OG_IMAGE_SIZE };
  }
  if (ogImage?.src) {
    return {
      url: absoluteUrl(ogImage.src),
      width: ogImage.width ?? OG_IMAGE_SIZE.width,
      height: ogImage.height ?? OG_IMAGE_SIZE.height,
    };
  }
  if (SITE.dynamicOgImage) {
    return {
      url: absoluteUrl(`${getPath(post.id, post.filePath)}/index.png`),
      ...OG_IMAGE_SIZE,
    };
  }
  return defaultPageImage();
}

export function defaultPageImage(): SeoImage {
  return { url: absoluteUrl(`/${SITE.ogImage}`), ...OG_IMAGE_SIZE };
}

export function siteWidePieces(): GraphEntity[] {
  return [
    buildWebSite(
      {
        url: SITE.website,
        name: SITE.title,
        description: SITE.desc,
        publisher: { "@id": ids.person },
        about: { "@id": ids.person },
        inLanguage: language,
        hasPart: { "@id": ids.navigation },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/search?q={search_term_string}`,
          },
        },
      },
      ids
    ),
    buildPiece<Person>({
      "@type": "Person",
      "@id": ids.person,
      name: SITE.author,
      url: aboutUrl,
      description:
        "Teacher, designer, and programmer based in Singapore. Co-founder of Tinkertanker.",
      jobTitle: "Teacher, designer, and programmer",
      image: { "@id": ids.personImage },
      sameAs: [...PERSON_SAME_AS],
      nationality: { "@type": "Country", name: "Singapore" },
      knowsLanguage: language,
      knowsAbout: [
        "Programming",
        "Teaching",
        "Design",
        "Education",
        "Artificial intelligence",
      ],
      worksFor: { "@id": ids.organization("tinkertanker") },
    }),
    buildImageObject(
      {
        id: ids.personImage,
        url: personImage.url,
        width: personImage.width,
        height: personImage.height,
        caption: SITE.author,
        inLanguage: language,
      },
      ids
    ),
    buildPiece<Organization>({
      "@type": "Organization",
      "@id": ids.organization("tinkertanker"),
      name: "Tinkertanker",
      url: "https://tinkertanker.com",
    }),
    buildPiece<Blog>({
      "@type": "Blog",
      "@id": blogId,
      name: SITE.title,
      description: SITE.desc,
      url: blogUrl,
      publisher: { "@id": ids.person },
      inLanguage: language,
    }),
    buildSiteNavigationElement(
      {
        name: "Main navigation",
        isPartOf: { "@id": ids.website },
        items: [
          { name: "Home", url: SITE.website },
          { name: "About", url: aboutUrl },
          { name: "Posts", url: blogUrl },
          { name: "Tags", url: absoluteUrl("/tags") },
          ...(SITE.showArchives
            ? [{ name: "Archives", url: absoluteUrl("/archives") }]
            : []),
        ],
      },
      ids
    ),
  ];
}

function pageTypeForKind(kind: SchemaKind): WebPageType {
  if (kind === "about") return "ProfilePage";
  if (kind === "home" || kind === "collection") return "CollectionPage";
  return "WebPage";
}

export function blogPostPieces(input: {
  url: string;
  name: string;
  description: string;
  headline?: string;
  image: SeoImage;
  datePublished: Date;
  dateModified?: Date | null;
  breadcrumbs?: BreadcrumbCrumb[];
  articleSection?: string;
}): GraphEntity[] {
  return buildSeoGraphPieces({
    kind: "post",
    url: input.url,
    name: input.name,
    description: input.description,
    headline: input.headline,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    breadcrumbs: input.breadcrumbs,
    articleSection: input.articleSection,
  });
}

export function buildSeoGraphPieces(input: BuildSeoGraphInput): GraphEntity[] {
  const url = canonicalHref(input.url);
  const image = input.image ?? defaultPageImage();
  const pageType = pageTypeForKind(input.kind);
  const about =
    input.kind === "home" || input.kind === "about"
      ? { "@id": ids.person }
      : input.kind === "collection"
        ? { "@id": blogId }
        : undefined;

  const pieces: GraphEntity[] = [
    ...siteWidePieces(),
    buildWebPage(
      {
        url,
        name: input.name,
        description: input.description,
        isPartOf: { "@id": ids.website },
        inLanguage: language,
        datePublished: input.datePublished,
        dateModified: input.dateModified ?? undefined,
        primaryImage: { "@id": ids.primaryImage(url) },
        about,
        copyrightHolder: { "@id": ids.person },
        license: CONTENT_LICENSE,
        isAccessibleForFree: true,
        ...(input.breadcrumbs?.length
          ? { breadcrumb: { "@id": ids.breadcrumb(url) } }
          : {}),
      },
      ids,
      pageType
    ),
    buildImageObject(
      {
        pageUrl: url,
        url: image.url,
        width: image.width,
        height: image.height,
        inLanguage: language,
        caption: input.headline ?? input.name,
      },
      ids
    ),
  ];

  if (input.breadcrumbs?.length) {
    pieces.push(
      buildBreadcrumbList(
        {
          url,
          items: input.breadcrumbs.map(item => ({
            name: item.name,
            url: canonicalHref(item.url),
          })),
        },
        ids
      )
    );
  }

  if (input.kind === "post" && input.datePublished) {
    pieces.push(
      buildArticle(
        {
          url,
          headline: input.headline ?? input.name,
          description: input.description,
          datePublished: input.datePublished,
          dateModified: input.dateModified ?? undefined,
          author: { "@id": ids.person },
          publisher: { "@id": ids.person },
          isPartOf: [{ "@id": ids.webPage(url) }, { "@id": blogId }],
          image: { "@id": ids.primaryImage(url) },
          inLanguage: language,
          articleSection: input.articleSection,
          license: CONTENT_LICENSE,
          isAccessibleForFree: true,
        },
        ids,
        "BlogPosting"
      )
    );
  }

  return pieces;
}

export function buildSeoGraph(input: BuildSeoGraphInput) {
  return assembleGraph(buildSeoGraphPieces(input), {
    warnOnDanglingReferences: true,
  });
}
