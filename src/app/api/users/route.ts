import { NextRequest, NextResponse } from "next/server";
import { getUserByUsernameOrName } from "@/service/user";

const handler = async (request: NextRequest) => {
  const keyword = request.nextUrl.searchParams.get("keyword");
  return getUserByUsernameOrName(keyword).then((data) =>
    NextResponse.json(data),
  );
};

export { handler as GET };
