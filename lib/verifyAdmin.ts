import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function verifyAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET, // same secret NextAuth() uses
  });

  if (!token) {
    return false;
  }

  console.log("Token",token)

  return token.role === "admin";
}