import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { createPost, getFollowingPostListOf } from "@/service/post";

const GET = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollowingPostListOf(user.username).then((data) =>
    NextResponse.json(data),
  );
};

const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, text, file).then((data) =>
    NextResponse.json(data),
  );
};

export { GET, POST };
