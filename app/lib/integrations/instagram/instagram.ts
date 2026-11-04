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
  return (json.data ?? []).map(toPost).filter((post) => post.image);
}

const toPost = (item: RawMedia): InstagramPost => ({
  id: item.id,
  // Videos expose a still frame as thumbnail_url; media_url is the video file.
  image:
    (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) ?? "",
  permalink: item.permalink,
  caption: item.caption,
  mediaType: item.media_type,
  timestamp: item.timestamp,
});

/** Instagram handles: letters, numbers, dots and underscores, up to 30. */
export const isValidInstagramUsername = (username: string) =>
  /^[A-Za-z0-9._]{1,30}$/.test(username);

/**
 * Your own Instagram account, used to read OTHER accounts' public posts through
 * Business Discovery. The clients never log in or approve anything.
 */
export function getAgencyCredentials():
  | (InstagramCredentials & { igUserId: string })
  | null {
  const accessToken = process.env.INSTAGRAM_AGENCY_ACCESS_TOKEN;
  const igUserId = process.env.INSTAGRAM_AGENCY_IG_USER_ID;
  return accessToken && igUserId ? { accessToken, igUserId } : null;
}

/**
 * A client's public posts, read with the agency account. Works only for
 * public Instagram Business or Creator accounts.
 */
export async function fetchBusinessDiscoveryPosts(
  agency: InstagramCredentials & { igUserId: string },
  username: string,
  { limit = MAX_POSTS, cacheTag }: { limit?: number; cacheTag?: string } = {},
): Promise<InstagramPost[]> {
  // The username goes into the field list, so it must be strictly validated.
  if (!isValidInstagramUsername(username)) {
    throw new Error("Invalid Instagram username");
  }

  const request = (withThumbnail: boolean) => {
    const mediaFields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "permalink",
      "timestamp",
      ...(withThumbnail ? ["thumbnail_url"] : []),
    ].join(",");
    const params = new URLSearchParams({
      fields: `business_discovery.username(${username}){media.limit(${limit}){${mediaFields}}}`,
      access_token: agency.accessToken,
    });
    return fetch(`${FACEBOOK_GRAPH_URL}/${agency.igUserId}?${params}`, {
      next: { revalidate: 3600, tags: cacheTag ? [cacheTag] : [] },
    });
  };

  // thumbnail_url may not be offered here; if Meta rejects the field list,
  // retry without it. Videos without a still frame are then left out.
  let res = await request(true);
  if (res.status === 400) res = await request(false);
  if (!res.ok) {
    throw new Error(
      `Business Discovery request failed (${res.status}): ${await graphErrorMessage(res)}`,
    );
  }

  const json: { business_discovery?: { media?: { data?: RawMedia[] } } } =
    await res.json();
  return (json.business_discovery?.media?.data ?? [])
    .map(toPost)
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
