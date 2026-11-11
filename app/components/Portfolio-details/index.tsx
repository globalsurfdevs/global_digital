"use client";

import NewPortfolioDetails from "./NewPortfolioDetails";
import OldPortfolioDetails from "./OldPortfolioDetails";
import type { PortfolioDetailsProps } from "./PortfolioDetails.types";

const PortfolioDetails = ({
  data,
  endpoint,
  successStories,
  instagramPosts,
  instagramFlush,
}: PortfolioDetailsProps) => {
  const storedPortfolioType: unknown = data.portfolio.portfolioType;
  const isNewPortfolio =
    storedPortfolioType === "new" || storedPortfolioType === "modern";

  if (isNewPortfolio) {
    return (
      <NewPortfolioDetails
        data={data}
        endpoint={endpoint}
        successStories={successStories}
      />
    );
  }

  return (
    <OldPortfolioDetails
      data={data}
      successStories={successStories}
      instagramPosts={instagramPosts}
      instagramFlush={instagramFlush}
    />
  );
};

export default PortfolioDetails;
