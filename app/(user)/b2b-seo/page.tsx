import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/eCommerceSeoDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Results from "../../components/PermormanceMarketing/Results";



import { ResultsData } from "../../data/services/b2b-seo/results";
import { BannerSection } from "../../data/services/b2b-seo/herosection";
import { OurServices } from "../../data/services/b2b-seo/our-services";
import { Frameworkdata } from "../../data/services/b2b-seo/framework";
import { relatedservices } from "../../data/services/b2b-seo/relatedservices";
import { Wecanhelp } from "../../data/services/b2b-seo/wecanhelp";
import { Platformsecomdata } from "../../data/services/b2b-seo/platformsecom";
import { Cta } from "../../data/services/b2b-seo/cta";
import { Faq } from "../../data/services/b2b-seo/faq";
import { Platformsdata } from "../../data/services/b2b-seo/platforms";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";

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
    title: "Data-Driven Performance Marketing Agency in Dubai | GS.Digital",
    description:
      "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
    robots: "noindex, nofollow",
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={23} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true}  leftzero={true} colcount={3} />
      <Services title={OurServices.title} data={OurServices.data}  colcount={5} hrcontent={true} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
     <section className="pb-[50px] lg:pb-[140px] border-b ">
        <Slider Platformsdata={Platformsdata} />
        </section>

      <Testimonials bgcolor={'white'} />
      <Platformsecom title={Platformsecomdata.title} btmpara={Platformsecomdata.btmpara} desc={Platformsecomdata.desc} data={Platformsecomdata.data} colm={3} />

      <Results title={ResultsData.title} description={ResultsData.description} data={ResultsData.data} nopt={true} />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TODAY "}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
