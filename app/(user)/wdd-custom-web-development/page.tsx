import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { BannerSection,Wecanhelp,OurServices,AreaExpertise,Platformsecomdata,Cta,Faq,relatedservices,Clientsformsdata} from "../../data/services/wdd-custom-web-development/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import WorkIn from "@/app/components/common/WorkIn";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import SucessStories from "@/app/components/wdd-custom-web-development/SucessStories";


interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
   robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WDD Custom Web Development | G.S Digital",
    description:
      "Dubai's trusted SMM agency, Global Surf Digital, provides expert social media marketing services to help you dominate the digital landscape. Contact us now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
     robots: "noindex, nofollow",
  };
}

const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={34} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={3} />
       <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />
      <div className="hdpd">
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      </div>
      <section className="pb-[50px]   lg:pb-[200px]  pt-[50px]   lg:pt-[140px] bg-black text-white mb-[50px] lg:mb-[140px]">
      <WorkIn />
      </section>
      <section className="pb-[50px]   lg:pb-[140px] ">
      <Platformserver title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      </section>
      <SucessStories
        Clientsformsdata={Clientsformsdata.filter((item) => item !== undefined)}

        subdesc={
          "Our Works"
        }
      />
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"LET'S CONNECT AND GET STARTED TODAY!"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
