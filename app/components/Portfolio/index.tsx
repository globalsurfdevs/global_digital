
import React from 'react'
import HeroSection from './HeroSection'
import PortfolioList from './PortfolioList'

const Portfolio = ({ data, industries }: { 
  data: any; 
  industries: { _id: string; name: string; subCategories: string[] }[] 
}) => {
  return (
    <>
      <HeroSection />
      <PortfolioList data={data} industries={industries} />
    </>
  );
};

export default Portfolio