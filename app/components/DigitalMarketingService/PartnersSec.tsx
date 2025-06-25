import React from 'react'
import LogoSwipera from '../MarketingAutomation/AutomationSwiper' 
import LogoSwiper from './LogoSwiper'
import { partnersLogoOne } from '../../data/services/digital-marketing-service-kuwait/data'
import { partnersLogosTwo } from '../../data/services/digital-marketing-service-kuwait/data'
export default function PartnersSec() {
  return (
    <section className='pt-5 md:pt-10 lg:pt-140'>
      <LogoSwipera mtslogo={partnersLogoOne[0]} slideBg={true} />
  
      {/* <LogoSwiper logosdata={logosdatas} slidesPerView={6.5} title1="Our Partners" /> */}
      <LogoSwiper logosdata={partnersLogosTwo} slidesPerView={6.5}  />
    </section>
  )
}
