"use client";

import NewPortfolioDetails from "./NewPortfolioDetails";
import OldPortfolioDetails from "./OldPortfolioDetails";
import type { PortfolioDetailsProps } from "./PortfolioDetails.types";

const PortfolioDetails = ({
  data,
  endpoint,
  isV2Preview = false,
  successStories,
  instagramPosts,
  instagramFlush,
}: PortfolioDetailsProps) => {
  if (isV2Preview || data.portfolio.isNewPortfolioPublished) {
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
