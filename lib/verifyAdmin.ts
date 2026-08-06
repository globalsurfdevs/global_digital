import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function verifyAdmin(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", // same secret NextAuth() uses
  });

  if (!token) {
    return false;
  }


  return token.role === "admin";
}