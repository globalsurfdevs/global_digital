import { createHmac, timingSafeEqual } from "node:crypto";
import mongoose from "mongoose";
import {
  FACEBOOK_API_VERSION,
  FACEBOOK_GRAPH_URL,
  fetchInstagramUsername,
} from "./instagram";

// Facebook Login for Business with a configuration ("unified login"). The
// client approves access on Meta's own page; we only receive a token. The
// result is a Page token plus the linked Instagram account ID, saved in the
// same shape as a connection pasted in by hand.
const DIALOG_URL = `https://www.facebook.com/${FACEBOOK_API_VERSION}/dialog/oauth`;

// How long a link sent to a client stays usable.
const LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type MetaOAuthConfig = {
  appId: string;
  appSecret: string;
  configId: string;
  redirectUri: string;
};

/** A failure the client can act on; the message is safe to show them. */
export class OAuthUserError extends Error {
  constructor(public title: string, message: string) {
    super(message);
  }
}

/** Null when the environment isn't configured. */
export function getOAuthConfig(): MetaOAuthConfig | null {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const configId = process.env.META_LOGIN_CONFIG_ID;
  // Must match, character for character, the address registered in the Meta
  // dashboard: https://<your-domain>/api/instagram/oauth/callback
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  if (!appId || !appSecret || !configId || !redirectUri) return null;
  try {
    new URL(redirectUri);
  } catch {
    return null;
  }
  return { appId, appSecret, configId, redirectUri };
}

function sign(payload: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return createHmac("sha256", secret).update(payload).digest();
}

/**
 * A tamper-proof, expiring token that carries the portfolio ID through the
 * login round trip. The client is not logged in to the admin, so this is what
 * proves the link came from us and which portfolio it is for.
 */
export function signState(portfolioId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ p: portfolioId, e: Date.now() + LINK_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload).toString("base64url")}`;
}

/** Returns the portfolio ID, or null if the state is forged or expired. */
export function verifyState(state: string | null): string | null {
  if (!state) return null;
  const [payload, signature] = state.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const given = Buffer.from(signature, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  try {
    const { p, e } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (
      typeof p !== "string" ||
      typeof e !== "number" ||
      e < Date.now() ||
      !mongoose.Types.ObjectId.isValid(p)
    ) {
      return null;
    }
    return p;
  } catch {
    return null;
  }
}

export function buildAuthorizeUrl(config: MetaOAuthConfig, state: string) {
  const params = new URLSearchParams({
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    state,
    // The configuration decides the permissions, so no `scope` is sent.
    config_id: config.configId,
    response_type: "code",
  });
  return `${DIALOG_URL}?${params}`;
}

async function graphGet<T>(
  path: string,
  params: Record<string, string>,
): Promise<T> {
  const res = await fetch(`${FACEBOOK_GRAPH_URL}${path}?${new URLSearchParams(params)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    // Meta's error bodies describe the failure and never echo the token.
    let detail = "";
    try {
      const json: { error?: { message?: string } } = await res.json();
      detail = json.error?.message ? `: ${json.error.message}` : "";
    } catch {}
    throw new Error(`Meta ${path} failed (${res.status})${detail}`);
  }
  return res.json();
}

type PageWithInstagram = {
  id: string;
  name?: string;
  access_token?: string;
  instagram_business_account?: { id: string; username?: string };
};

/**
 * Turns the one-time code into a Page token and the Instagram account it is
 * linked to. Throws OAuthUserError for problems the client can fix.
 */
export async function exchangeCodeForInstagramConnection(
  config: MetaOAuthConfig,
  code: string,
): Promise<{ accessToken: string; igUserId: string; username: string }> {
  const first = await graphGet<{ access_token: string }>("/oauth/access_token", {
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    client_secret: config.appSecret,
    code,
  });

  // A Page token derived from a long-lived user token does not expire; one
  // derived from a short-lived token lasts about an hour. Some configuration
  // types (system user) issue a token that needs no exchange, so if Meta
  // refuses, carry on with the token we have.
  let userToken = first.access_token;
  try {
    const longLived = await graphGet<{ access_token: string }>(
      "/oauth/access_token",
      {
        grant_type: "fb_exchange_token",
        client_id: config.appId,
        client_secret: config.appSecret,
        fb_exchange_token: userToken,
      },
    );
    userToken = longLived.access_token;
  } catch (error) {
    console.warn("Long-lived token exchange skipped:", error);
  }

  const accounts = await graphGet<{ data?: PageWithInstagram[] }>(
    "/me/accounts",
    {
      fields: "id,name,access_token,instagram_business_account{id,username}",
      limit: "100",
      access_token: userToken,
    },
  );

  const linked = (accounts.data ?? []).filter(
    (page) => page.access_token && page.instagram_business_account?.id,
  );
  if (linked.length === 0) {
    throw new OAuthUserError(
      "No Instagram account found",
      "We couldn't find an Instagram Business or Creator account linked to a Facebook Page you approved. Please check the account is linked to a Page and try the link again.",
    );
  }
  // Guessing between accounts could publish the wrong client's feed.
  if (linked.length > 1) {
    throw new OAuthUserError(
      "More than one account found",
      "Several Instagram accounts were approved. Please contact Global Surf so the right one can be connected.",
    );
  }

  const page = linked[0];
  const igUserId = page.instagram_business_account!.id;
  const accessToken = page.access_token!;
  const username =
    page.instagram_business_account!.username ??
    (await fetchInstagramUsername({ accessToken, igUserId }));

  return { accessToken, igUserId, username };
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** A plain page for the client to land on; they are not using the admin. */
export function resultPage(title: string, message: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${escapeHtml(title)}</title>
<style>body{font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;background:#f5f6f8;color:#111}
main{max-width:420px;margin:24px;padding:32px;background:#fff;border-radius:12px;text-align:center}
h1{font-size:20px;margin:0 0 12px}p{margin:0;line-height:1.5;color:#444}</style></head>
<body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p></main></body></html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
