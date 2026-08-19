import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ratelimit from "@/app/lib/rateLimit";

const { auth } = NextAuth(authConfig);

const BLOCKED_CITIES = ["north charleston", "lanzhou", "ashburn"];
const BLOCKED_COUNTRIES: string[] = [];
const BLOCKED_IPS: string[] = [];

const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  hr: ["/admin/career", "/admin/career/linkedin", "/admin/jobs"],
};

// Paths every logged-in role can land on exactly, regardless of their
// scoped prefixes — the shared dashboard landing page.
const ROLE_ALLOWED_EXACT: Record<string, string[]> = {
  hr: ["/admin"],
};

const ROLE_HOME: Record<string, string> = {
  hr: "/admin",
  admin: "/admin",
};

function isAllowedForRole(role: string, path: string): boolean {
  if (role === "admin") return true;

  const exact = ROLE_ALLOWED_EXACT[role] || [];
  if (exact.includes(path)) return true;

  const allowed = ROLE_ALLOWED_PREFIXES[role] || [];
  return allowed.some((prefix) => path.startsWith(prefix));
}

function isBlocked(request: NextRequest): boolean {
  const city = request.headers.get("x-vercel-ip-city")?.toLowerCase() ?? "";
  const country =
    request.headers.get("x-vercel-ip-country")?.toLowerCase() ?? "";
  const ip =
    request.headers.get("x-vercel-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";

  if (BLOCKED_CITIES.includes(city)) return true;
  if (BLOCKED_COUNTRIES.includes(country)) return true;
  if (BLOCKED_IPS.includes(ip)) return true;

  return false;
}

export default auth(async (request: NextRequest) => {
  const { nextUrl } = request;

  const isExcluded =
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon") ||
    nextUrl.pathname.startsWith("/blocked") ||
    nextUrl.pathname.startsWith("/admin/auth");

  if (isExcluded) return NextResponse.next();

  if (isBlocked(request)) {
    return NextResponse.rewrite(new URL("/blocked", request.url));
  }

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const session = (request as any).auth;
  const isLoggedIn = !!session?.user;

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && isLoggedIn) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    const result = await ratelimit.limit(ip);

    if (!result.success) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const role = (session.user as any).role || "user";

    if (!isAllowedForRole(role, nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL(ROLE_HOME[role] || "/auth/signin", request.url),
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/:path*"],
};
