import { AuthUser } from "@/model/AuthUser";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
