import React from "react";
import HeroSection from "./HeroSection";
import PortfolioList from "./PortfolioList";

const Portfolio = ({
  data,
  industries,
}: {
  data: any;
  industries: { _id: string; name: string; subCategories: string[] }[];
}) => {
  const filtered = data.filter((p: any) => p.slug !== "the-garden-concept");

  return (
    <>
      <HeroSection />
      <PortfolioList data={filtered} industries={industries} />
    </>
  );
};

export default Portfolio;
