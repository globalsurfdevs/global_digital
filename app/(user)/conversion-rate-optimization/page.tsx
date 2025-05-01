import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import {
  BannerSection,
  Wecanhelp,
  OurServices,
  Platformimgmdata,
  Cta,
  Faq,
  relatedservices,
  Frameworkdata,
} from "../../components/conversion-rate-optimization/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Platformimg from "@/app/components/common/Platformimg";

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
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={26}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={3}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />

      <section className="pb-[50px]   lg:pb-[140px] ">
        <div className="mnstsaq bg-black text-white">
          <Framework
            title={Frameworkdata.title}
            data={Frameworkdata.data}
            bgcolor="bg-black"
            colcount={4}
          />
        </div>
      </section>
      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformimg
          title={Platformimgmdata.title}
          desc={Platformimgmdata.desc}
          data={Platformimgmdata.data}
          colcount={3}
        />
      </section>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"REACH OUT TODAY!"} />
      <FAQ data={Faq} />
      <RelatedServices
        title={relatedservices.title}
        data={relatedservices.data}
        colcount={3}
      />
    </div>
  );
};

export default page;
