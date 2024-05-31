import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/post";
import { withSessionUser } from "@/util/session";

type Context = {
  params: { id: string };
};

const handler = async (request: NextRequest, context: Context) => {
  return withSessionUser(async (user) => {
    return getPost(context.params.id).then((data) => NextResponse.json(data));
  });
};

export { handler as GET };
