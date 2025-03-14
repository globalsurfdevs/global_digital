import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/SocialMediaMarketingDubai/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { BannerSection } from "../../data/services/branding-agency-dubai/herosection";
import { OurServices } from "../../data/services/branding-agency-dubai/our-services";
import { Frameworkdata } from "../../data/services/branding-agency-dubai/framework";
import { relatedservices } from "../../data/services/branding-agency-dubai/relatedservices";
import { Wecanhelp } from "../../data/services/social-media-marketing-dubai/wecanhelp";
import { Platformsecomdata } from "../../data/services/branding-agency-dubai/platformsecom";
import { Cta } from "../../data/services/branding-agency-dubai/cta";
import { Faq } from "../../data/services/branding-agency-dubai/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Works from "@/app/components/branding-agency-dubai/Works";

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
    title: "Global Surf Digital",
    description:
      "Contact us now!",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
  robots: "noindex, nofollow",
  };
}

const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={27} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={3} />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} bgcolor="bg-[#fff]" colcount={3} />
      <section className="bg-black black-serv">
      <Services title={OurServices.title} data={OurServices.data} hrcontent={true} colcount={5} />
      </section>
      <section className="pt-[50px]   lg:pt-[140px] ">
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      </section>
    <Works title="Our Works"/>

      <Testimonials  />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"READY TO GET STARTED?"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
