import React from 'react'
import HeroSection from '../components/PermormanceMarketing/HeroSection'
import Expertise from '../components/PermormanceMarketing/Expertise'
import Boost from '../components/PermormanceMarketing/Boost'
import Services from '../components/PermormanceMarketing/Services'
import Framework from '../components/PermormanceMarketing/Framework'
import Industries from '../components/PermormanceMarketing/Industries'
import Results from '../components/PermormanceMarketing/Results'
import Platforms from '../components/PermormanceMarketing/Platforms'
import Partner from '../components/PermormanceMarketing/Partner'
import Testimonials from '../components/HomePage/Testimonials'
import FAQ from '../components/PermormanceMarketing/FAQ'
import GetInTouch from '../components/PermormanceMarketing/GetInTouch'

import { BannerSection } from "../data/services/performance-marketing/herosection";
import { AreaExpertise } from "../data/services/performance-marketing/area-of-expertise";
import { boostEngage } from "../data/services/performance-marketing/boost-engage";
import { OurServices } from "../data/services/performance-marketing/our-services";
import { Frameworkdata } from "../data/services/performance-marketing/framework";
import { ResultsData } from "../data/services/performance-marketing/results";
import { Platformsdata } from "../data/services/performance-marketing/platforms";
import { partnerData } from "../data/partnerData";
import { Cta } from "../data/services/performance-marketing/cta";
import { Faq } from "../data/services/performance-marketing/faq";

const page = () => {
  return (
    <div>
        <HeroSection  Bannerdata={BannerSection} />
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data}  />
        <Boost title={boostEngage.title} data={boostEngage.data}/>
        <Services title={OurServices.title} data={OurServices.data}/>
        <Framework title={Frameworkdata.title} data={Frameworkdata.data}/>
        <Industries/>
        <Results title={ResultsData.title} data={ResultsData.data}/>
        <Platforms title={Platformsdata.title} data={Platformsdata.data}/>
        <Partner data={partnerData} />
        <Testimonials/>
        <GetInTouch data={Cta} ctabbutton= {"LET'S TALK GROWTH"}/>
        <FAQ data={Faq}/>
    </div>
  )
}

export default page