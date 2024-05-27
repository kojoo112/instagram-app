import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { getFollowingPostListOf } from "@/service/post";
import { getUserByUsernameOrName } from "@/service/user";

const handler = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const keyword = request.nextUrl.searchParams.get("keyword");
  return getUserByUsernameOrName(keyword).then((data) =>
    NextResponse.json(data),
  );
};

export { handler as GET };
