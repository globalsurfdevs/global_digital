//  export { auth as middleware } from "@/auth";


// export const config = {
//     matcher: ["/admin/:path*"], // Matches all routes under /admin
//   };
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_CITIES = [
  "north charleston",
  "lanzhou",
  "ashburn",
];

const BLOCKED_COUNTRIES: string[] = [];

const BLOCKED_IPS: string[] = [];

function isBlocked(request: NextRequest): boolean {
  const city    = request.headers.get("x-vercel-ip-city")?.toLowerCase()    ?? "";
  const country = request.headers.get("x-vercel-ip-country")?.toLowerCase() ?? "";
  const ip      = request.headers.get("x-vercel-ip") ??
                  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";

  console.log("GEO CHECK:", { city, country, ip });

  if (BLOCKED_CITIES.includes(city))       return true;
  if (BLOCKED_COUNTRIES.includes(country)) return true;
  if (BLOCKED_IPS.includes(ip))            return true;

  return false;
}

export default auth((request: NextRequest) => {
  const { nextUrl } = request;

  // ✅ Exclude these from middleware to prevent redirect loops
  const isExcluded =
    nextUrl.pathname.startsWith("/_next")             ||
    nextUrl.pathname.startsWith("/favicon")           ||
    nextUrl.pathname.startsWith("/blocked")           ||
    nextUrl.pathname.startsWith("/admin/auth");       // ← key fix: exclude signin page

  if (isExcluded) return NextResponse.next();

  // ✅ Step 1: Geo block
  if (isBlocked(request)) {
    console.log("Blocked request from:", request.headers.get("x-vercel-ip-city"));
    return NextResponse.rewrite(new URL("/blocked", request.url));
  }

  // ✅ Step 2: Admin auth
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoggedIn   = !!(request as any).auth;

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL("/admin/auth/signin", request.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/admin/:path*',
    '/:path*',
  ],
};