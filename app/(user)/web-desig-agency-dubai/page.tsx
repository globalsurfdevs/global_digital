import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";


import { BannerSection,Wecanhelp,OurServices,ExpertServicesdata,Platformsecomdata,Cta,AreaExpertise,Faq,relatedservices } from "../../components/wdd-web-design/data";

import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Testimonials from "@/app/components/HomePage/Testimonials";
import ExpertServices from "@/app/components/wdd-web-design/ExpertServices";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  robots: string;
  openGraph: {
    title: string;
    siteName: string;
    url: string;
    description: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Web Design Company Dubai | Web Designing Agency | GS Digital",
    description:
      "Leverage our 25+ design experts to build a website that converts. From wireframing to launch, our Dubai web design agency ensures pixel-perfect execution. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/web-design-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "Dubai’s Best Web Design Agency | 25+ Experts, 11+ Years",
      siteName: "Global Surf Digital Media",
      url: "https://www.globalsurf.ae/web-design-agency-dubai ",
      description:
        "From wireframes to launch, trust our web design experts to build a site that reflects your brand. Mobile-first, fast, and pixel-perfect—every time. Get a quote today!",

    },
  };
}

const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={26} />
      <ExpertServices title={ExpertServicesdata.title} bgcolor={'bg-white'}  data={ExpertServicesdata.data} colcount={3} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} hiddentitle={true} leftzero={true} colcount={4} />

      <div className="bg-black text-white bordergrey">
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      </div>
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />


      <section className="pb-[50px]   lg:pb-[140px] ">
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} data={Platformsecomdata.data} />
      </section>
      <section className="innerbgpd">
        <Testimonials />
        </section>
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"LET'S GET STARTED TODAY!"}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title} description={relatedservices.description}   data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
