export function normalizeWebsiteLink(websiteLink: string): string {
  const trimmedLink = websiteLink.trim();

  if (!trimmedLink || /^https?:\/\//i.test(trimmedLink)) {
    return trimmedLink;
  }

  return `https://${trimmedLink.replace(/^\/+/, "")}`;
}
