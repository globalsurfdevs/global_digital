import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import InstagramConnection from "@/app/models/InstagramConnection";
import {
  fetchInstagramPosts,
  instagramCacheTag,
  type InstagramPost,
} from "./instagram";

const DEFAULT_POST_COUNT = 12;

async function loadFeed(portfolioId: string): Promise<InstagramPost[]> {
  await connectDB();
  const connection = await InstagramConnection.findOne({
    portfolio: portfolioId,
  }).lean<{
    accessToken: string;
    igUserId?: string;
    selectedPostIds?: string[];
  }>();
  if (!connection) return [];

  const allPosts = await fetchInstagramPosts(
    { accessToken: connection.accessToken, igUserId: connection.igUserId },
    { cacheTag: instagramCacheTag(portfolioId) },
  );

  // Hand-picked posts keep the admin's order. Picks that were deleted from
  // Instagram, or that fell out of the newest MAX_POSTS, are skipped.
  const byId = new Map(allPosts.map((post) => [post.id, post]));
  const picked = (connection.selectedPostIds ?? [])
    .map((id) => byId.get(id))
    .filter((post): post is InstagramPost => post !== undefined);

  return picked.length > 0 ? picked : allPosts.slice(0, DEFAULT_POST_COUNT);
}

/**
 * The posts to show for a portfolio, ready for server rendering.
 *
 * Cached for an hour under the portfolio's Instagram tag. Saving a selection,
 * connecting, disconnecting and "Refresh from Instagram" all revalidate that
 * tag, which also refreshes any rendered page that used this feed. The token
 * stays on the server; only post data is returned.
 */
export async function getInstagramFeed(
  portfolioId: string,
): Promise<InstagramPost[]> {
  if (!mongoose.Types.ObjectId.isValid(portfolioId)) return [];

  try {
    return await unstable_cache(
      () => loadFeed(portfolioId),
      ["instagram-feed", portfolioId],
      { revalidate: 3600, tags: [instagramCacheTag(portfolioId)] },
    )();
  } catch (error) {
    // Thrown errors aren't cached, so the next request retries. An empty list
    // makes the page fall back to the uploaded images.
    console.error("Instagram feed failed:", error);
    return [];
  }
}
