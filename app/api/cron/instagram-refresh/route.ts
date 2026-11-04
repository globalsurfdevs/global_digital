import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import InstagramConnection from "@/app/models/InstagramConnection";
import { refreshInstagramToken } from "@/app/lib/integrations/instagram/instagram";

const REFRESH_AFTER_DAYS = 7;

// Schedule weekly. Callers must send `Authorization: Bearer <CRON_SECRET>`
// (Vercel Cron does this automatically when CRON_SECRET is set).
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const cutoff = new Date(Date.now() - REFRESH_AFTER_DAYS * 24 * 60 * 60 * 1000);
  // Facebook Login connections (igUserId set) have no refresh endpoint.
  const due = await InstagramConnection.find({
    igUserId: { $in: [null, ""] },
    $or: [{ lastRefreshedAt: { $lt: cutoff } }, { lastRefreshedAt: null }],
  });

  const results = { refreshed: 0, failed: [] as string[] };
  for (const connection of due) {
    try {
      const { accessToken, expiresAt } = await refreshInstagramToken(
        connection.accessToken,
      );
      connection.accessToken = accessToken;
      connection.tokenExpiresAt = expiresAt;
      connection.lastRefreshedAt = new Date();
      await connection.save();
      results.refreshed++;
    } catch (error) {
      console.error(`Instagram refresh failed for ${connection.portfolio}`, error);
      results.failed.push(String(connection.portfolio));
    }
  }

  return NextResponse.json(results);
}
