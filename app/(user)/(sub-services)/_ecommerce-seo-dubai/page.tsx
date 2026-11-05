import React from "react";
import HeroSection from "../../../components/PerformanceMarketing/HeroSection";
import Services from "../../../components/PerformanceMarketing/Services";
import Framework from "../../../components/PerformanceMarketing/Framework";
import Results from "@/backup/components/sub-services/ecommerce-seo/eCommerceSeoDubai/Result";
import Platforms from "../../../components/PerformanceMarketing/Platforms";
import Platformsecom from "@/backup/components/sub-services/ecommerce-seo/eCommerceSeoDubai/Platformsecom";
import FAQ from "../../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../../components/PerformanceMarketing/GetInTouch";

import { BannerSection } from "@/backup/data/seo-ecommerce/herosection";
import { OurServices } from "@/backup/data/seo-ecommerce/our-services";
import { Frameworkdata } from "@/backup/data/seo-ecommerce/framework";
import { relatedservices } from "@/backup/data/seo-ecommerce/relatedservices";
import { ResultsData } from "@/backup/data/seo-ecommerce/results";
import { Platformsdata } from "@/backup/data/seo-ecommerce/platforms";
import { Platformsecomdata } from "@/backup/data/seo-ecommerce/platformsecom";
import { Wecanhelp } from "@/backup/data/seo-ecommerce/wecanhelp";
import { Cta } from "@/backup/data/seo-ecommerce/cta";
import { Faq } from "@/backup/data/seo-ecommerce/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import { faqSchema, serviceSchema } from "@/backup/data/sub-services/ecommerce-seo/data";

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
    title: "Ecommerce SEO Services in Dubai | Revenue-Driven SEO Agency",
    description:
      "Drive more revenue with expert Ecommerce SEO services in Dubai. Improve rankings, attract buyers & grow your online store.Book your strategy now ",
    alternates: {
      canonical: "https://www.globalsurf.ae/ecommerce-seo-dubai",
    },
    robots: "index, follow",
  };
}
const page = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={28}
      />
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
