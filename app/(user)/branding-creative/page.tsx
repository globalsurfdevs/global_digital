import React from 'react'
import HeroSection from '../../components/PermormanceMarketing/HeroSection'
import Boost from '../../components/PermormanceMarketing/Boost'
import Services from '../../components/PermormanceMarketing/Services'
import Framework from '../../components/PermormanceMarketing/Framework'
import Industries from '../../components/PermormanceMarketing/Industries'
import Results from '../../components/PermormanceMarketing/Results'
import Platforms from '../../components/PermormanceMarketing/Platforms'
import Partner from '../../components/PermormanceMarketing/Partner'
import Testimonials from '../../components/HomePage/Testimonials'
import FAQ from '../../components/PermormanceMarketing/FAQ'
import GetInTouch from '../../components/PermormanceMarketing/GetInTouch'

import { BannerSection } from "../../data/services/branding-creative/herosection";
import { boostEngage } from "../../data/services/branding-creative/boost-engage";
import { OurServices } from "../../data/services/branding-creative/our-services";
import { Frameworkdata } from "../../data/services/branding-creative/framework";
import { ResultsData } from "../../data/services/branding-creative/results";
import { Platformsdata } from "../../data/services/branding-creative/platforms";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/branding-creative/cta";
import { Faq } from "../../data/services/branding-creative/faq";

const page = () => {
  return (
    <div>
        <HeroSection  Bannerdata={BannerSection} />
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