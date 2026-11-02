import {
  formatLinkForCaseStudy,
  formatLinkForPortfolio,
} from "@/app/helpers/formatLink";

/**
 * Builds public-site URLs for CMS items. Read-only helpers: they never touch data.
 * Paths are relative so they resolve against whichever host the admin runs on.
 */

// Mirrors app/components/Portfolio/PortfolioList.tsx. The live pages look up by `slug`
// (app/actions/getCaseStudy.ts), so prefer it and fall back to the formatted company name.
export const portfolioLiveUrl = (item: {
  section?: string;
  slug?: string;
  companyName?: string;
}): string | null => {
  const isCaseStudy =
    item.section === "case study" || item.section === "case study new";
  const slug =
    item.slug ||
    (item.companyName
      ? isCaseStudy
        ? formatLinkForCaseStudy(item.companyName)
        : formatLinkForPortfolio(item.companyName)
      : "");
  if (!slug) return null;
  return isCaseStudy ? `/case-study/${slug}` : `/portfolio/${slug}`;
};
