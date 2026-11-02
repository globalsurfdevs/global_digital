import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Real logic lives in auth.ts (needs Node APIs: bcrypt, mongoose).
      // This stub only exists so Edge-safe middleware knows a Credentials
      // provider is configured — it is never actually invoked here.
      async authorize() {
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/admin/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  jwt: {
    maxAge: 24 * 60 * 60,
  },

  // These callbacks are the fix: middleware's session is built from THIS
  // config, so without jwt/session here, session.user.role is always
  // undefined in middleware, even though auth.ts sets it correctly.
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
