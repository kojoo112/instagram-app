import { createClient } from "@sanity/client";
import { SanityClient } from "next-sanity";

export const client: SanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-03-11",
  // Set to `true` for production environments
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
