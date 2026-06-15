import React from "react";
import HeroSection from "./HeroSection";
import PortfolioList from "./PortfolioList";

const Portfolio = ({
  data,
  industries,
  categories,
}: {
  data: any;
  industries: { _id: string; name: string; subCategories: string[] }[];
  categories: { _id: string; name: string; link: string; sortOrder: number }[];
}) => {
  const filtered = data.filter((p: any) => p.slug !== "the-garden-concept");

  return (
    <>
      <HeroSection />
      <PortfolioList data={filtered} industries={industries} categories={categories} />
    </>
  );
};

export default Portfolio;
