import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import InstagramConnection from "@/app/models/InstagramConnection";
import { instagramCacheTag } from "@/app/lib/integrations/instagram/instagram";
import {
  OAuthUserError,
  exchangeCodeForInstagramConnection,
  getOAuthConfig,
  resultPage,
  verifyState,
} from "@/app/lib/integrations/instagram/oauth";

// Public: Meta sends the client back here after they approve (or decline).
export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams;

  const portfolioId = verifyState(params.get("state"));
  if (!portfolioId) {
    return resultPage(
      "This link has expired",
      "Please ask your Global Surf contact for a new connection link.",
      400,
    );
  }

  if (params.get("error")) {
    return resultPage(
      "Access wasn't granted",
      "Nothing was connected. You can close this window, or open the link again to retry.",
    );
  }

  const code = params.get("code");
  const config = getOAuthConfig();
  if (!code || !config) {
    return resultPage(
      "Something went wrong",
      "We couldn't complete the connection. Please contact Global Surf.",
      400,
    );
  }

  try {
    const { accessToken, igUserId, username, expiresAt } =
      await exchangeCodeForInstagramConnection(config, code);

    await connectDB();
    await InstagramConnection.findOneAndUpdate(
      { portfolio: portfolioId },
      {
        accessToken,
        igUserId,
        username,
        lastRefreshedAt: new Date(),
        // A Page token doesn't expire. A user token does, and its date is shown
        // in the admin panel so it can be reconnected before the feed stops.
        ...(expiresAt
          ? { tokenExpiresAt: expiresAt }
          : { $unset: { tokenExpiresAt: "" } }),
      },
      { upsert: true, new: true },
    );
    revalidateTag(instagramCacheTag(portfolioId));

    return resultPage(
      "Instagram connected",
      `@${username} is now connected. You can close this window.`,
    );
  } catch (error) {
    if (error instanceof OAuthUserError) {
      return resultPage(error.title, error.message, 422);
    }
    console.error("Instagram OAuth callback failed:", error);
    return resultPage(
      "Couldn't connect Instagram",
      "Please make sure the account is a Business or Creator account linked to a Facebook Page, then try the link again.",
      502,
    );
  }
}
