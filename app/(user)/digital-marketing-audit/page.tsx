import React from "react";
import DmHeroSection from "../../components/DigitalMarketingAudit/DmHeroSection";  
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework"; 
import Testimonials from "../../components/HomePage/Testimonials"; 
import RequestFreeAudit from "../../components/DigitalMarketingAudit/RequestFreeAudit";

import { BannerSection } from "../../data/services/digital-marketing-audit/herosection"; 
import { boostEngage } from "../../data/services/digital-marketing-audit/boost-engage";
import { OurServices } from "../../data/services/digital-marketing-audit/our-services";
import { Frameworkdata, IndustriesWeServe,tpcontent } from "../../data/services/digital-marketing-audit/framework";
 
import AuditSecTwo from "@/app/components/DigitalMarketingAudit/AuditSecTwo";
import Expertiseheimg from "@/app/components/EcomIndustry/Expertise";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";

// interface Canonicals {
//   canonical: string;
// }

// type Metadata = {
//   title: string;
//   description: string;
//   alternates: Canonicals;
// };

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Data-Driven Performance Marketing Agency in Dubai | GS.Digital",
//     description:
//       "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
//     alternates: {
//       canonical: "https://www.globalsurf.ae/performance-marketing-agency-dubai",
//     },
//   };
// }
const page = () => {
  return (
    <div>
      <section className=" ">
        <DmHeroSection
          Bannerdata={BannerSection} 
          bannerlogp={false}
          maxchwidth={28}
          points={BannerSection[0].points}
        />
      </section> 
      <AuditSecTwo title={boostEngage.title} data={boostEngage.data} />
      <Services bgcolor ="bg-dgray" title={OurServices.title} hrcontent={true} description={OurServices.desc} data={OurServices.data} />
      <div className="mnstsaq bg-black text-white">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="bg-black"
          colcount={3}
        />
      </div>
      <Expertiseheimg
        title={tpcontent.title}
        data={tpcontent.data}
      />
      <Testimonials />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
        colnum={3}
      />      
      <RequestFreeAudit  />
    </div>
  );
};

export default page;
