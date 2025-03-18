import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/eCommerceSeoDubai/Result";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/eCommerceSeoDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import { BannerSection } from "../../data/services/seo-ecommerce/herosection";
import { OurServices } from "../../data/services/seo-ecommerce/our-services";
import { Frameworkdata } from "../../data/services/seo-ecommerce/framework";
import { relatedservices } from "../../data/services/seo-ecommerce/relatedservices";
import { ResultsData } from "../../data/services/seo-ecommerce/results";
import { Platformsdata } from "../../data/services/seo-ecommerce/platforms";
import { Platformsecomdata } from "../../data/services/seo-ecommerce/platformsecom";
import { Wecanhelp } from "../../data/services/seo-ecommerce/wecanhelp";
import { Cta } from "../../data/services/seo-ecommerce/cta";
import { Faq } from "../../data/services/seo-ecommerce/faq";
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
    title: "eCommerce SEO Services Agency in Dubai | G.S Digital",
    description:
      "Global Surf Digital, a trusted eCommerce SEO agency, offers expert services to boost your store’s visibility and sales. Contact our consultants today! ",
    alternates: {
      canonical: "https://www.globalsurf.ae/ecommerce-seo-dubai",
    },
    robots: "index, follow",
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} />
      <Platforms
        title={Platformsdata.title}
        data={Platformsdata.data}
        bgblack={true}
        leftzero={true}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        leftzero={true}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={6}
        hrcontent={true}
      />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />

      <Results
        title={ResultsData.title}
        desc={ResultsData.desc}
        data={ResultsData.data}
      />

      <Testimonials bgcolor={"white"} bordertop={true} />
      <Platformsecom
        title={Platformsecomdata.title}
        desc={Platformsecomdata.desc}
        data={Platformsecomdata.data}
        colm={4}
      />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TODAY FOR A FREE CONSULTATION"}
        link={"/lets-talk"}
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
