import React from "react";
import HeroSection from "./HeroSection";
import PortfolioList from "./PortfolioList";

const Portfolio = ({
  data,
  industries,
  categories,
  isV2 = false,
}: {
  data: any;
  industries: { _id: string; name: string; subCategories: string[] }[];
  categories: { _id: string; name: string; link: string; sortOrder: number }[];
  isV2?: boolean;
}) => {
  const filtered = isV2
    ? data
    : data.filter(
        (p: any) =>
          p.portfolioSource === "new" ||
          (p.slug !== "the-garden-concept" && !p.slug.includes("v2")),
      );
// test
  return (
    <>
      <HeroSection />
      <PortfolioList
        data={filtered}
        industries={industries}
        categories={categories}
        isV2={isV2}
      />
    </>
  );
};

export default Portfolio;
