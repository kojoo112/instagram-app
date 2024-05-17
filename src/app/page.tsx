import { client } from "@/utils/sanity/client"

async function getContent() {
  const CONTENT_QUERY = `*[_type == "project"] {
  ...,
  coverImage {
    ...,
    asset->
  },
  duration {
    ...
  },
  tags[],
  body
}
`
  const content = await client.fetch(CONTENT_QUERY)
  return content
}

// Log content to console
getContent().then(content => console.log(content))

// Insert the return component calling `getContent()` below

export default function Home() {
  return (
    <h1 className='text-yellow-800'>Instagram</h1>
  );
}
