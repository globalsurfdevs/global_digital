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

export async function verifyRole(
  request: NextRequest,
  allowedRoles: string[],
): Promise<boolean> {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  return (
    !!token &&
    typeof token.role === "string" &&
    allowedRoles.includes(token.role)
  );
}
