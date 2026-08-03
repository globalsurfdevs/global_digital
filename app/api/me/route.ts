// app/api/admin/me/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    return NextResponse.json(
      { success: true, role: (session.user as any).role || "user" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}