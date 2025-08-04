import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/SocialMediaMarketingDubai/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import { ResultsData } from "../../data/services/social-media-marketing-dubai/results";
import { BannerSection } from "../../data/services/social-media-marketing-dubai/herosection";
import { OurServices } from "../../data/services/social-media-marketing-dubai/our-services";
import { Frameworkdata } from "../../data/services/social-media-marketing-dubai/framework";
import { relatedservices } from "../../data/services/social-media-marketing-dubai/relatedservices";
import { Wecanhelp } from "../../data/services/social-media-marketing-dubai/wecanhelp";
import { Platformsecomdata } from "../../data/services/social-media-marketing-dubai/platformsecom";
import { Platformsdata } from "../../data/services/social-media-marketing-dubai/platforms";
import { Cta } from "../../data/services/social-media-marketing-dubai/cta";
import { Faq } from "../../data/services/social-media-marketing-dubai/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
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
    title: "Social Media Agency Dubai | Social Media Services | G.S Digital",
    description:
      "Dubai's trusted SMM agency, Global Surf Digital, provides expert social media marketing services to help you dominate the digital landscape. Contact us now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/social-media-marketing-dubai",
    },
    robots: "index, follow",
  };
}

const page = () => {
  return (
    <div>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={25.5}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={4}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
      />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <section className="pt-[50px]   lg:pb-[70px] lg:pt-[140px]">
        <Platforms title={Platformsdata.title} data={Platformsdata.data} />
      </section>
      <Results
        title={ResultsData.title}
        description={ResultsData.description}
        data={ResultsData.data}
      />

      <Testimonials bgcolor={"white"} />
      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformsecom
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TO GET STARTED!"}
      />
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
