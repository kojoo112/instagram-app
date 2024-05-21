import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
