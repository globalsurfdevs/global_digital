import React from 'react'
import HeroSection from '../../components/PermormanceMarketing/HeroSection'
import Expertise from '../../components/PermormanceMarketing/Expertise'
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

import { BannerSection } from "../../data/services/performance-marketing/herosection";
import { AreaExpertise } from "../../data/services/performance-marketing/area-of-expertise";
import { boostEngage } from "../../data/services/performance-marketing/boost-engage";
import { OurServices } from "../../data/services/performance-marketing/our-services";
import { Frameworkdata } from "../../data/services/performance-marketing/framework";
import { ResultsData } from "../../data/services/performance-marketing/results";
import { Platformsdata } from "../../data/services/performance-marketing/platforms";
import { partnerData } from "../../data/partnerData";
import { Cta } from "../../data/services/performance-marketing/cta";
import { Faq } from "../../data/services/performance-marketing/faq";


interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};


export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Data-Driven Performance Marketing Solutions in Dubai |GS.Digital",
    description: "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
    alternates: {
      canonical: 'https://globalsurf.ae/performance-marketing',
    },
  };
}
const page = () => {
  return (
    <div>
        <HeroSection  Bannerdata={BannerSection} order={'01'}/>
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data}  />
        <Boost title={boostEngage.title} data={boostEngage.data}/>
        <Services title={OurServices.title} data={OurServices.data}/>
        <Framework title={Frameworkdata.title} data={Frameworkdata.data}/>
        <Industries/>
        <Results title={ResultsData.title} data={ResultsData.data}/>
        <Platforms title={Platformsdata.title} data={Platformsdata.data}/>
        <Partner data={partnerData} />
        <Testimonials/>
        <GetInTouch data={Cta} ctabbutton= {"LET'S TALK GROWTH"}  link={'/lets-talk'}/>
        <FAQ data={Faq}/>
    </div>
  )
}

export default page