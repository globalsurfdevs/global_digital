// const ACRONYMS = new Set([
//   "seo", "geo", "ppc", "roi", "b2b", "b2c", "cro", "smm", "kpi", "ai", "ux", "ui", "uae", "crm",
// ]);


// const PROPER_NOUNS: Record<string, string> = {
//   linkedin: "LinkedIn",
//   uae: "UAE",
//   dubai: "Dubai",
//   "gs digital": "GS Digital",
// };

// export const toTitleCase = (text: string) => {
//   return text
//     .trim()
//     .split(/\s+/)
//     .map((word) => {
//       const match = word.match(/^(\W*)(.*?)(\W*)$/);
//       const [, prefix, core, suffix] = match ?? ["", "", word, ""];

//       const cased = core
//         .split("-")
//         .map((part) => {
//           const lower = part.toLowerCase();

//           if (ACRONYMS.has(lower)) {
//             return lower.toUpperCase();
//           }

//           // Handle plural acronyms, e.g. "kpis" -> "KPIs", "ctas" -> "CTAs"
//           if (lower.endsWith("s") && ACRONYMS.has(lower.slice(0, -1))) {
//             return lower.slice(0, -1).toUpperCase() + "s";
//           }

//           return lower.charAt(0).toUpperCase() + lower.slice(1);
//         })
//         .join("-");

//       return prefix + cased + suffix;
//     })
//     .join(" ");
// };

// export const toSentenceCase = (text: string) => {
//   if (!text) return text;
//   // Capitalize the first letter after start-of-string or sentence-ending punctuation
//   let result = text.replace(
//     /(^\s*\w|[.!?]\s+\w)/g,
//     (match) => match.toUpperCase()
//   );

//   // Restore known proper nouns/brand names to their correct casing
//   Object.entries(PROPER_NOUNS).forEach(([lower, correct]) => {
//     const regex = new RegExp(`\\b${lower}\\b`, "gi");
//     result = result.replace(regex, correct);
//   });

//   return result;
// };




const ACRONYMS = new Set([
  "seo", "geo", "ppc", "roi", "b2b", "b2c", "cro", "smm", "kpi", "ai", "ux", "ui", "uae", "crm",
]);

const PROPER_NOUNS: Record<string, string> = {
  linkedin: "LinkedIn",
  uae: "UAE",
  dubai: "Dubai",
  "gs digital": "GS Digital",
};

// Splits text into segments, alternating between non-anchor text and
// full <a ...>...</a> blocks (tag + attributes + inner text, as one piece).
// Anchor segments are returned as-is by callers below — href and any
// other attributes are never touched, only plain text outside <a> tags is.
const splitByAnchors = (text: string) => {
  return text.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
};

const isAnchorSegment = (segment: string) => /^<a\b/i.test(segment);

export const toTitleCase = (text: string) => {
  return splitByAnchors(text)
    .map((segment) => {
      if (isAnchorSegment(segment)) return segment;

      return segment
        .trim()
        .split(/\s+/)
        .map((word) => {
          if (!word) return word;

          const match = word.match(/^(\W*)(.*?)(\W*)$/);
          const [, prefix, core, suffix] = match ?? ["", "", word, ""];

          const cased = core
            .split("-")
            .map((part) => {
              const lower = part.toLowerCase();

              if (ACRONYMS.has(lower)) {
                return lower.toUpperCase();
              }

              // Handle plural acronyms, e.g. "kpis" -> "KPIs", "ctas" -> "CTAs"
              if (lower.endsWith("s") && ACRONYMS.has(lower.slice(0, -1))) {
                return lower.slice(0, -1).toUpperCase() + "s";
              }

              return lower.charAt(0).toUpperCase() + lower.slice(1);
            })
            .join("-");

          return prefix + cased + suffix;
        })
        .join(" ");
    })
    .join("");
};

export const toSentenceCase = (text: string) => {
  if (!text) return text;

  return splitByAnchors(text)
    .map((segment) => {
      if (isAnchorSegment(segment)) return segment;

      let result = segment.replace(
        /(^\s*\w|[.!?]\s+\w)/g,
        (match) => match.toUpperCase()
      );

      Object.entries(PROPER_NOUNS).forEach(([lower, correct]) => {
        const regex = new RegExp(`\\b${lower}\\b`, "gi");
        result = result.replace(regex, correct);
      });

      return result;
    })
    .join("");
};