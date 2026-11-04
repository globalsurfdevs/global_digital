import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { verifyAdmin } from "@/lib/verifyAdmin";
import {
  getOAuthConfig,
  signState,
} from "@/app/lib/integrations/instagram/oauth";

// Admin-only: creates the link to send to a client. Valid for 7 days.
export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId } = await req.json();
  if (
    typeof portfolioId !== "string" ||
    !mongoose.Types.ObjectId.isValid(portfolioId)
  ) {
    return NextResponse.json({ error: "Invalid portfolio id" }, { status: 400 });
  }

  const config = getOAuthConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Client connect links aren't set up yet. Set META_APP_ID, META_APP_SECRET, META_LOGIN_CONFIG_ID and INSTAGRAM_REDIRECT_URI in the environment.",
      },
      { status: 500 },
    );
  }

  // The link lives on the same site as the registered redirect address.
  const origin = new URL(config.redirectUri).origin;
  const url = `${origin}/api/instagram/oauth/start?state=${encodeURIComponent(signState(portfolioId))}`;
  return NextResponse.json({ url });
}
