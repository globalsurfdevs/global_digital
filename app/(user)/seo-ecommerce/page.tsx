import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/SeoEcommerce/Result";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/SeoEcommerce/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import { BannerSection } from "../../data/services/seo-ecommerce/herosection";
import { OurServices } from "../../data/services/seo-ecommerce/our-services";
import { Frameworkdata } from "../../data/services/seo-ecommerce/framework";
import { ResultsData } from "../../data/services/seo-ecommerce/results";
import { Platformsdata } from "../../data/services/seo-ecommerce/platforms";
import { Platformsecomdata } from "../../data/services/seo-ecommerce/platformsecom";
import { Wecanhelp } from "../../data/services/seo-ecommerce/wecanhelp";
import { Cta } from "../../data/services/seo-ecommerce/cta";
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
    title: "Data-Driven Performance Marketing Agency in Dubai | GS.Digital",
    description:
      "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/performance-marketing-agency-dubai",
    },
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} />
      <Platforms title={Platformsdata.title} data={Platformsdata.data} bgblack={true} leftzero={true} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} leftzero={true} />
      <Services title={OurServices.title} data={OurServices.data} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} colcount={3} />

      <Results title={ResultsData.title} desc={ResultsData.desc} data={ResultsData.data} />
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TODAY FOR A FREE CONSULTATION"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
