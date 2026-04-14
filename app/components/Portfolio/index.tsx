
import React from 'react'
import HeroSection from './HeroSection'
import PortfolioList from './PortfolioList'

const Portfolio = ({data}:any) => {
  return (
    <>
        <HeroSection/>
        <PortfolioList data={data}/>
    </>
  )
}

export default Portfolio