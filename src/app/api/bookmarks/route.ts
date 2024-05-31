import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/util/session";

async function handler(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

export { handler as PUT };
