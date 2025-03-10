import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/PermormanceMarketing/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertising/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Paidsearch from "../../components/PpcAdvertising/Paidsearch";


import { ResultsData } from "../../data/services/ppc-advertising/results";
import { BannerSection } from "../../data/services/ppc-advertising/herosection";
import { OurServices } from "../../data/services/ppc-advertising/our-services";
import { Frameworkdata } from "../../data/services/ppc-advertising/framework";
import { relatedservices } from "../../data/services/ppc-advertising/relatedservices";
import { Paidsearchdata } from "../../data/services/ppc-advertising/Paidsearchdata";
import { Wecanhelp } from "../../data/services/ppc-advertising/wecanhelp";
import { Platformsecomdata } from "../../data/services/ppc-advertising/platformsecom";
import { Cta } from "../../data/services/ppc-advertising/cta";
import { Faq } from "../../data/services/ppc-advertising/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/SeoEcommerce/RelatedServices";

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
      <HeroSection Bannerdata={BannerSection} hideslider={true} bannerlogp={true} />
      <Paidsearch title={Paidsearchdata.title} data={Paidsearchdata.data} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={4} />
      <Services title={OurServices.title} data={OurServices.data} colcount={6} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} colcount={3} />

      <Results title={ResultsData.title} description={ResultsData.description} data={ResultsData.data} />

      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      <Testimonials bgcolor={'white'} />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"Lets talk growth"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title} description={ relatedservices.description} data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
