import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPost } from "@/service/post";

type Context = {
  params: { id: string };
};

const handler = async (request: NextRequest, context: Context) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPost(context.params.id).then((data) => NextResponse.json(data));
};

export { handler as GET };
