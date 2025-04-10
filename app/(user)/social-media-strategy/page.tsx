import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { BannerSection,Wecanhelp,OurServices,Frameworkdata,Platformsecomdata,Cta,Faq,relatedservices,ResultsData,Specializedin} from "../../data/services/social-media-strategy/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Results from "../../components/SocialMediaMarketingDubai/Results";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Testimonials from "@/app/components/HomePage/Testimonials";
import Specialize from "@/app/components/common/Specialize";


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
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={25} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={3} />
       <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />
      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor="bg-[#F2F2F2]"
        colcount={3}
      />
      <Specialize
        title={Specializedin.title}
        data={Specializedin.data}
        bgcolor="bg-black"
        colcount={3} />

      <Results title={ResultsData.title} description={ResultsData.description} data={ResultsData.data} />

      <Testimonials bgcolor={'white'} />
      <section className="pb-[50px]   lg:pb-[140px] ">
      <Platformserver title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} colm={4} />
      </section>

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TODAY!"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title}   data={relatedservices.data} colcount={3} description={relatedservices.description} />
    </div>
  );
};

export default page;
