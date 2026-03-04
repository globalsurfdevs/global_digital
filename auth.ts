import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import ratelimit from "@/app/lib/rateLimit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    ...authConfig.providers,

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          username: credentials?.username,
        });

        if (!user) throw new Error("Invalid Credentials");

        if (user.password !== credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async authorized({ request, auth }) {
      const isLoggedIn = auth?.user;

      if (isLoggedIn) {
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "127.0.0.1";

        const result = await ratelimit.limit(ip);

        if (!result.success) {
          return Response.json(
            { message: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }

        if (request.nextUrl.pathname.startsWith("/admin/auth/signin")) {
          return Response.redirect(new URL("/admin", request.nextUrl));
        }
      }

      return !!auth;
    },

    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
});