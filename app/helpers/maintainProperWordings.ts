const ACRONYMS = new Set([
  "seo", "geo", "ppc", "roi", "b2b", "b2c", "cro", "smm", "kpi", "ai", "ux", "ui", "uae","crm"
]);


const PROPER_NOUNS: Record<string, string> = {
  linkedin: "LinkedIn",
  uae: "UAE",
  dubai: "Dubai",
  "gs digital": "GS Digital",
};

export const toTitleCase = (text: string) => {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => {
      const match = word.match(/^(\W*)(.*?)(\W*)$/);
      const [, prefix, core, suffix] = match ?? ["", "", word, ""];

      const cased = core
        .split("-")
        .map((part) => {
          const lower = part.toLowerCase();
          if (ACRONYMS.has(lower)) {
            return lower.toUpperCase();
          }
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("-");

      return prefix + cased + suffix;
    })
    .join(" ");
};

export const toSentenceCase = (text: string) => {
  if(!text) return text;
  // Capitalize the first letter after start-of-string or sentence-ending punctuation
  let result = text.replace(
    /(^\s*\w|[.!?]\s+\w)/g,
    (match) => match.toUpperCase()
  );

  // Restore known proper nouns/brand names to their correct casing
  Object.entries(PROPER_NOUNS).forEach(([lower, correct]) => {
    const regex = new RegExp(`\\b${lower}\\b`, "gi");
    result = result.replace(regex, correct);
  });

  return result;
};