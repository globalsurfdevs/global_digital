import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

import User from "./app/models/User";
import connectDB from "./lib/mongodb";
import { verifyAndUpgradePassword } from "./lib/password";
import authRateLimit from "./app/lib/infrastructure/authRateLimit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const username = credentials?.username;
        const password = credentials?.password;
        if (
          typeof username !== "string" ||
          typeof password !== "string" ||
          !username.trim() ||
          !password
        ) {
          return null;
        }

        const sourceIp =
          request.headers.get("x-vercel-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";
        const limit = await authRateLimit.limit(sourceIp);
        if (!limit.success) return null;

        await connectDB();
        const user: any = await User.findOne({
          username: username.trim(),
          isActive: { $ne: false },
        }).select("+password");

        if (!user) return null;

        const verification = await verifyAndUpgradePassword(
          password,
          user.password,
        );
        if (!verification.valid) return null;

        if (verification.upgradedHash) {
          user.password = verification.upgradedHash;
          await user.save();
        }

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
