const ACRONYMS = new Set([
  "seo", "geo", "ppc", "roi", "b2b", "b2c", "cro", "smm", "kpi", "ai", "ux", "ui", "uae"
]);

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
  const words = text.trim().split(/\s+/);

  return words
    .map((word, index) => {
      const match = word.match(/^(\W*)(.*?)(\W*)$/);
      const [, prefix, core, suffix] = match ?? ["", "", word, ""];

      const cased = core
        .split("-")
        .map((part, partIndex) => {
          const lower = part.toLowerCase();

          if (ACRONYMS.has(lower)) {
            return lower.toUpperCase();
          }

          // Capitalize only the very first letter of the very first word
          if (index === 0 && partIndex === 0) {
            return lower.charAt(0).toUpperCase() + lower.slice(1);
          }

          return lower;
        })
        .join("-");

      return prefix + cased + suffix;
    })
    .join(" ");
};