import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ratelimit from "@/app/lib/infrastructure/rateLimit";

const { auth } = NextAuth(authConfig);

const BLOCKED_CITIES = ["north charleston", "lanzhou", "ashburn"];
const BLOCKED_COUNTRIES: string[] = [];
const BLOCKED_IPS: string[] = [];

const ROLE_ALLOWED_PREFIXES: Record<string, string[]> = {
  hr: ["/admin/career", "/admin/career/linkedin", "/admin/jobs"],
};

const ROLE_ALLOWED_EXACT: Record<string, string[]> = {};

const ROLE_HOME: Record<string, string> = {
  hr: "/admin/career",
  admin: "/admin",
};

function isAllowedForRole(role: string, path: string): boolean {
  if (role === "admin") return true;

  const exact = ROLE_ALLOWED_EXACT[role] || [];
  if (exact.includes(path)) return true;

  const allowed = ROLE_ALLOWED_PREFIXES[role] || [];
  return allowed.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

const HR_API_PATHS = [
  "/api/career",
  "/api/career/bulk-delete",
  "/api/jobs",
  "/api/linkedin",
  "/api/linkedin/bulk-delete",
];

const PRIVATE_API_READ_PATHS = [
  "/api/career",
  "/api/linkedin",
  "/api/lead",
  "/api/enquiry",
  "/api/emails",
];

function pathMatches(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`);
}

function isPrivateApiRead(path: string): boolean {
  return PRIVATE_API_READ_PATHS.some((prefix) => pathMatches(path, prefix));
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
  const role = (session?.user as any)?.role || "user";

  // All API writes are private by default. Reads that expose staff or
  // applicant records are private too; public content GET routes stay public.
  const isApi = nextUrl.pathname.startsWith("/api/");
  const isApiWrite = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  const isPrivateRead =
    ["GET", "HEAD"].includes(request.method) &&
    isPrivateApiRead(nextUrl.pathname);

  if (isApi && (isApiWrite || isPrivateRead)) {
    if (!isLoggedIn) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isHrApi = HR_API_PATHS.some((prefix) =>
      pathMatches(nextUrl.pathname, prefix),
    );
    if (role !== "admin" && !(role === "hr" && isHrApi)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const apiIp =
      request.headers.get("x-vercel-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const apiLimit = await ratelimit.limit(apiIp);
    if (!apiLimit.success) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
  }

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

    if (!isAllowedForRole(role, nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL(ROLE_HOME[role] || "/auth/signin", request.url),
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  // Skip /api/auth: the auth() wrapper re-issues the session cookie on every
  // request it handles, which would undo the cookie deletion on sign-out.
  matcher: ["/((?!api/auth).*)"],
};
