// Two token flavours exist. "Instagram Login" tokens talk to graph.instagram.com
// and resolve the account via /me. "Facebook Login" tokens (Page/User tokens)
// talk to graph.facebook.com and need the Instagram business account ID.
const INSTAGRAM_GRAPH_URL = "https://graph.instagram.com";
export const FACEBOOK_API_VERSION = "v23.0";
export const FACEBOOK_GRAPH_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}`;

export type InstagramCredentials = {
  accessToken: string;
  /** Present only for Facebook Login tokens. */
  igUserId?: string;
};

export type InstagramPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
  mediaType: string;
  timestamp: string;
};

type RawMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

function endpointFor({ igUserId }: InstagramCredentials) {
  return igUserId
    ? `${FACEBOOK_GRAPH_URL}/${igUserId}`
    : `${INSTAGRAM_GRAPH_URL}/me`;
}

// Graph API error bodies describe the failure and never echo the token.
async function graphErrorMessage(res: Response): Promise<string> {
  try {
    const json: { error?: { message?: string; code?: number } } =
      await res.json();
    return `${json.error?.message ?? "unknown error"} (code ${json.error?.code})`;
  } catch {
    return "unparseable error body";
  }
}

// Posts older than the newest MAX_POSTS can't be picked or shown.
export const MAX_POSTS = 50;

export const instagramCacheTag = (portfolioId: string) =>
  `instagram-${portfolioId}`;

export async function fetchInstagramPosts(
  credentials: InstagramCredentials,
  { limit = MAX_POSTS, cacheTag }: { limit?: number; cacheTag?: string } = {},
): Promise<InstagramPost[]> {
  const params = new URLSearchParams({
    fields:
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    limit: String(limit),
    access_token: credentials.accessToken,
  });

  // The public feed and the admin picker make this same request, so one
  // cached response per hour serves both. The tag lets the admin clear it early.
  const res = await fetch(`${endpointFor(credentials)}/media?${params}`, {
    next: { revalidate: 3600, tags: cacheTag ? [cacheTag] : [] },
  });
  if (!res.ok) {
    throw new Error(
      `Instagram media request failed (${res.status}) via ${
        credentials.igUserId ? "graph.facebook.com" : "graph.instagram.com"
      }: ${await graphErrorMessage(res)}`,
    );
  }

  const json: { data?: RawMedia[] } = await res.json();
  return (json.data ?? [])
    .map((item) => ({
      id: item.id,
      // Videos expose a still frame as thumbnail_url; media_url is the video file.
      image:
        (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) ??
        "",
      permalink: item.permalink,
      caption: item.caption,
      mediaType: item.media_type,
      timestamp: item.timestamp,
    }))
    .filter((post) => post.image);
}

export async function fetchInstagramUsername(
  credentials: InstagramCredentials,
): Promise<string> {
  const params = new URLSearchParams({
    fields: "username",
    access_token: credentials.accessToken,
  });
  const res = await fetch(`${endpointFor(credentials)}?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Token rejected by Instagram");
  }
  const json: { username?: string } = await res.json();
  return json.username ?? "";
}

/**
 * Instagram Login tokens only. Facebook Page tokens derived from a long-lived
 * user token do not expire and have no refresh endpoint.
 */
export async function refreshInstagramToken(
  accessToken: string,
): Promise<{ accessToken: string; expiresAt: Date }> {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: accessToken,
  });
  const res = await fetch(
    `${INSTAGRAM_GRAPH_URL}/refresh_access_token?${params}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error(`Instagram token refresh failed (${res.status})`);
  }
  const json: { access_token: string; expires_in: number } = await res.json();
  return {
    accessToken: json.access_token,
    expiresAt: new Date(Date.now() + json.expires_in * 1000),
  };
}
