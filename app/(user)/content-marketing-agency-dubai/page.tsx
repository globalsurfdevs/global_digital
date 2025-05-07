import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import {
  Becomebrand,
  BannerSection,
  Wecanhelp,
  OurServices,
  Frameworkdata,
  Platformsecomdata,
  Cta,
  Faq,
} from "../../components/ContentMarketing/data";

import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Platforms from "@/app/components/PermormanceMarketing/Platforms";
import BecomePartner from "@/app/components/ContentMarketing/BecomePartner";

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
    title: "Content Marketing Services Agency in Dubai | GS Digital",
    description:
      "Grow with our expert content marketing services in the UAE. GS Digital is a Dubai-based agency delivering tailored content solutions for modern businesses.",
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
        maxchwidth={30}
      />

      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={4}
      />

      <Framework
        title={Frameworkdata.title}
        data={Frameworkdata.data}
        bgcolor="white"
        colcount={4}
      />

      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        bgcolor="bg-black"
        bgtt1="text-white"
        bgtt3="text-white"
        hrcontent={true}
      />
<BecomePartner Becomebrand={Becomebrand} />

      <section className="pb-[50px] lg:pb-[150px]">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"LET’S CHAT!"} />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
