import { createClient } from "@sanity/client"

export const client = createClient({
    projectId: "kejtws47",
    dataset: "production",
    apiVersion: "2024-03-11",
    // Set to `true` for production environments
    useCdn: false,
})
