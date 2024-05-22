import { User } from "@/model/User";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
