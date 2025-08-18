import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () => {
  const imageBuffer = await generateOgImageForSite();
  return new Response(imageBuffer as BodyInit, {
    headers: { "Content-Type": "image/png" },
  });
};
