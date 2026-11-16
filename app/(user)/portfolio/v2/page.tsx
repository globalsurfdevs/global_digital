import type { Metadata } from "next";
import Portfolio from "@/app/components/Portfolio";
import { getNewPortfolioListing } from "@/app/actions/getNewPortfolio";
import { getIndustries } from "@/app/lib/services/industries.service";
import { getCategories } from "@/app/lib/services/categories.service";

export const metadata: Metadata = {
  title: "Portfolio Preview | GS Digital Dubai",
  description: "Preview the latest GS Digital portfolio pages.",
  robots: { index: false, follow: false },
};

export default async function PortfolioV2ListingPage() {
  const [portfolios, industries, categories] = await Promise.all([
    getNewPortfolioListing(),
    getIndustries(),
    getCategories(),
  ]);

  return (
    <Portfolio
      data={portfolios}
      industries={industries ?? []}
      categories={categories ?? []}
      isV2
    />
  );
}
