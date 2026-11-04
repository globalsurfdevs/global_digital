import { NextRequest, NextResponse } from "next/server";
import { getInstagramFeed } from "@/app/lib/integrations/instagram/getInstagramFeed";

export const dynamic = "force-dynamic";

// Public: returns post data only. The access token never leaves the server.
// Used by pages that don't receive the feed from the server (e.g. case studies).
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ portfolioId: string }> },
) {
  const { portfolioId } = await params;
  const posts = await getInstagramFeed(portfolioId);

  // Not cacheable downstream; freshness is handled by the tagged server cache.
  return NextResponse.json({ posts }, { headers: { "Cache-Control": "no-store" } });
}
