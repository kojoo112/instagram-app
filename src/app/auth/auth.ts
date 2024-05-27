import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "@/service/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = session.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        };
      }

      return session;
    },
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }

      await addUser({
        id,
        name: name || "",
        image,
        email,
        username: email.split("@")[0],
      });

      return true;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
