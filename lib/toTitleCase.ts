const minorWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "from",
  "by",
  "in",
  "of",
  "with",
]);

export function toTitleCase(title: string) {
  const words = title.toLowerCase().split(" ");

  return words
    .map((word, index) => {
      // Always capitalize first and last words
      if (index === 0 || index === words.length - 1 || !minorWords.has(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      return word;
    })
    .join(" ");
}
