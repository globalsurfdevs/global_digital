import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import {
  Clientsformsdata,
  IndustriesWeServe,
  BannerSection,
  OurServices,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
} from "../../components/ContentProduction/data";

import Expertise from "../../components/EcomIndustry/Expertise";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import OurWorks from "@/app/components/Bc-logo/OurWorks";

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
    title: "Digital Marketing Services",
    description:
      "Partner with a top web app development company in Dubai specializing in custom web applications. We build secure web apps tailored to your business. ",
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
        maxchwidth={28}
      />



      <Services
        title={OurServices.title}
        data={OurServices.data}
        bgcolor="bg-[transparent]"
        leftzero={true}
        colcount={5}
        hrcontent={true}
      />
      <Expertise
        title={IndustriesWeServe.title}
        data={IndustriesWeServe.data}
      />


      <section className="pb-[50px] lg:pb-[150px]">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>
      <section className="pb-[50px] lg:pb-[140px]">
        <OurWorks Clientsformsdata={Clientsformsdata} maintitle="Our Works" desc="Want to see what we’ve created for brands like yours? <br>Explore our content production highlights and visual storytelling projects." />
      </section>
      <GetInTouch data={Cta} redlast={true} ctabbutton={"CONTACT US"} />
      <RelatedServices
        title={relatedservices.title}
        data={relatedservices.data}
        colcount={3}
      />
      <FAQ data={Faq} />

    </div>
  );
};

export default page;
