import React from "react";
import HeroSection from "../../../components/PerformanceMarketing/HeroSection";
import Services from "../../../components/PerformanceMarketing/Services";
import Platforms from "../../../components/PerformanceMarketing/Platforms";
import Platformsecom from "../../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../../components/PerformanceMarketing/FAQ";
import GetInTouch from "../../../components/PerformanceMarketing/GetInTouch";

import {
  BannerSection,
  Wecanhelp,
  OurServices,
  Platformimgmdata,
  Cta,
  Faq,
  relatedservices,
  Frameworkdata,
} from "../../../components/programmatic-advertising/data";

import Expertise from "@/app/components/PerformanceMarketing/Expertise";
import Testimonials from "@/app/components/HomePage/Testimonials";
import ExpertServices from "@/app/components/wdd-web-design/ExpertServices";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PerformanceMarketing/Framework";
import Platformimg from "@/app/components/common/Platformimg";

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
    title:
      "Programmatic Advertising Agency in Dubai |  Targeted Display & Video | GS Digital",
    description:
      "Programmatic advertising in Dubai: audience planning, DSP activation and optimisation for brand and performance campaigns. Request a programmatic demo.",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/programmatic-advertising-agency-dubai",
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
        maxchwidth={26}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={3}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />

      <section className="pb-[50px]   lg:pb-[140px] ">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="bg-[#F2F2F2]"
          colcount={3}
        />
      </section>
      <section className="innerbgpd">
        <Testimonials />
      </section>
      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformimg
          title={Platformimgmdata.title}
          desc={Platformimgmdata.desc}
          data={Platformimgmdata.data}
          colcount={4}
        />
      </section>

      <RelatedServices
        title={relatedservices.title}
        bgcolor={"black"}
        text="white"
        data={relatedservices.data}
        colcount={3}
      />

      <GetInTouch
        bgcolor={"#F2F2F2"}
        data={Cta}
        redlast={true}
        ctabbutton={"CONTACT US TODAY! "}
      />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
