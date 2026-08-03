import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import ratelimit from "./app/lib/rateLimit";
import User from "./app/models/User";
import connectDB from "./lib/mongodb";


type User = {
  id: string;
  username: string;
  email: string;
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectDB()
        const user: any = await User.findOne({ username: credentials.username })

        if (user) {
          if (user.password === credentials.password) {
            return {
              id: user._id.toString(),
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
            }
          } else {
            throw new Error("Invalid Credentials")
          }
        }
        throw new Error("Invalid Credentials")
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    authorized: async ({ request, auth }) => {

      const isLoggedIn = auth?.user
      if (isLoggedIn) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

        const result = await ratelimit.limit(ip);

        if (!result.success) {
          return Response.json(
            { message: "Too many requests. Please try again later." },
            { status: 429 }
          );
        } else {
          if (request.nextUrl.pathname.startsWith('/admin/auth/signin')) {
            return Response.redirect((new URL('/admin', request.nextUrl)))
          }
        }
      }

      return !!auth
    },
    jwt({ token, user }) {

      if (user) {
        token.id = user?.id
        token.role = user.isAdmin ? "admin" : "user";
      }

      return token
    },
    session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },

  },
  pages: {
    signIn: '/admin/auth/signin'
  },
});
