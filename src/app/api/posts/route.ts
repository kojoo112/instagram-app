import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFollowingPostListOf } from "@/service/post";

const handler = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollowingPostListOf(user.username).then((data) =>
    NextResponse.json(data),
  );
};

export { handler as GET };
