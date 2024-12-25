export { auth as middleware } from "@/auth";

console.log("Work")

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|$).*)"],
};