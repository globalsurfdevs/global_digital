export interface ArticleHeading {
  title: string;
  _id: string;
}

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

const textFromHtml = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .trim();

export function prepareBlogArticle(html: string) {
  const usedIds = new Set<string>();
  const headings: ArticleHeading[] = [];
  const renderedHtml = html.replace(
    /<(h[23])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attributes: string, inner: string) => {
      const title = textFromHtml(inner);
      if (!title) return `<${tag}${attributes}>${inner}</${tag}>`;

      const existingId = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i)?.[2];
      const baseId = existingId || slugifyHeading(title);
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
      usedIds.add(id);

      headings.push({ title, _id: id });
      const cleanAttributes = attributes.replace(/\s+id\s*=\s*(["']).*?\1/i, "");
      return `<${tag}${cleanAttributes} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: renderedHtml, headings };
}
