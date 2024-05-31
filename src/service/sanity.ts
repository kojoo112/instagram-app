import { createClient } from "@sanity/client";
import { SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client: SanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).width(800).url();
};

export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2024-03-11/assets/images/${process.env.SANITY_DATASET}`;
