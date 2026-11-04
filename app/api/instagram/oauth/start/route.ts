import { NextRequest, NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  getOAuthConfig,
  resultPage,
  verifyState,
} from "@/app/lib/integrations/instagram/oauth";

// Public: the client opens the link we sent them. We check it's genuine and
// unexpired, then send them to Instagram's own approval page.
export async function GET(req: NextRequest) {
  const state = new URL(req.url).searchParams.get("state");
  if (!verifyState(state)) {
    return resultPage(
      "This link has expired",
      "Please ask your Global Surf contact for a new connection link.",
      400,
    );
  }

  const config = getOAuthConfig();
  if (!config) {
    return resultPage(
      "Connection unavailable",
      "This feature isn't set up yet. Please contact Global Surf.",
      500,
    );
  }

  return NextResponse.redirect(buildAuthorizeUrl(config, state as string));
}
