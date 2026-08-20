import type { CollectionEntry } from "astro:content";

const getPostsCacheKey = (posts: CollectionEntry<"blog">[]) => {
  if (posts.some(({ digest }) => digest === undefined)) {
    return undefined;
  }

  return posts.map(({ id, digest }) => `${id}:${digest}`).join("|");
};

export default getPostsCacheKey;
