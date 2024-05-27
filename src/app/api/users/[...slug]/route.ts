import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "@/service/user";
import { getLikedPostsOf, getPostOf, getSavedPostsOf } from "@/service/post";

type Context = {
  params: { slug: string[] };
};

const handler = async (_: NextRequest, context: Context) => {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;
  let request = getPostOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
};

export { handler as GET };
