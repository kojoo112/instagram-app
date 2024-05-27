import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { addBookmark, removeBookmark } from "@/service/user";

async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export { handler as PUT };
