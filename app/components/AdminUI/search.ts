/** Lower-cases and strips HTML/entities so stored markup (e.g. blog headings) is searchable as text. */
const normalize = (value: unknown) =>
  String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .toLowerCase();

/**
 * True when every word of the query appears in at least one of the given values.
 * An empty query matches everything.
 */
export const matchesQuery = (query: string, ...values: unknown[]) => {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = values.map(normalize).join(" ");
  return terms.every((term) => haystack.includes(term));
};
