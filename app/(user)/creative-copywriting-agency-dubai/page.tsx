import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import LogoSwiper from "../../components/CopyWriting/LogoSwiper";

import {Matslogo,
  BannerSection,
  OurServices,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
  Frameworkdata
} from "../../components/CopyWriting/data";

import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PermormanceMarketing/Framework";

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
    title: "Creative Copywriting Services  Agency in Dubai | GS Digital ",
    description:
      "Boost your brand voice with GS Digital, a top copywriting agency in Dubai. Our creative services deliver results-driven content from social media to ads.",
    alternates: {
      canonical: "https://www.globalsurf.ae/creative-copywriting-agency-dubai",
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
        maxchwidth={34}
      />



      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />

      <section className="textmnsa">
      <Framework
            title={Frameworkdata.title}
            data={Frameworkdata.data}
            bgcolor="bg-black"
            colcount={3}
          />
      </section>
      <section className="py-[50px] lg:py-[130px]">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>
      <div className="pb-[50px]   lg:pb-[130px]">
      <LogoSwiper mtslogo={Matslogo[0]}   />
      </div>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"CONTACT US TODAY!"} />
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
