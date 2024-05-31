import { AuthUser } from "@/model/AuthUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";

export const withSessionUser = async (
  handler: (user: AuthUser) => Promise<Response>,
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return handler(user);
};
