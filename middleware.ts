export { auth as middleware } from "@/auth";


export const config = {
    matcher: ["/admin/:path*"], // Matches all routes under /admin
  };