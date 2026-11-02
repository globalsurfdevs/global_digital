import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

import User from "./app/models/User";
import connectDB from "./lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user: any = await User.findOne({
          username: credentials.username,
        });

        if (!user) throw new Error("Invalid Credentials");
        if (user.password !== credentials.password)
          throw new Error("Invalid Credentials");

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role || (user.isAdmin ? "admin" : "user"),
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // shared jwt/session callbacks — role gets attached here
  },
});
