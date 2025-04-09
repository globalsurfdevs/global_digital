import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { BannerSection,Wecanhelp,OurServices,ExpertServicesdata,Platformsecomdata,Cta,AreaExpertise,Faq,relatedservices } from "../../components/wdd-web-design/data";

import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Testimonials from "@/app/components/HomePage/Testimonials";
import ExpertServices from "@/app/components/wdd-web-design/ExpertServices";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

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
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={26} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={4} />
      <ExpertServices title={ExpertServicesdata.title} bgcolor={'bg-white'}  data={ExpertServicesdata.data} colcount={3} />

      <div className="bg-black text-white bordergrey">
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      </div>
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />


      <section className="pb-[50px]   lg:pb-[140px] ">
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      </section>
      <section className="innerbgpd">
        <Testimonials />
        </section>
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"LET'S GET STARTED TODAY!"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title} description={relatedservices.description}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
