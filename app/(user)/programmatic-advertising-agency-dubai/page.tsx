import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import {
  BannerSection,
  Wecanhelp,
  OurServices,
  Platformimgmdata,
  Cta,
  Faq,
  relatedservices,
  Frameworkdata,
} from "../../components/programmatic-advertising/data";

import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Testimonials from "@/app/components/HomePage/Testimonials";
import ExpertServices from "@/app/components/wdd-web-design/ExpertServices";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PermormanceMarketing/Framework";
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
    title: "Programmatic Advertising Agency in Dubai | Global Surf Digital ",
    description:
      "Unlock the power of programmatic advertising with the leading programmatic advertising agency in Dubai.  Reach your audience with GS Digital- call now! ",
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
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
    </div>
  );
};

export default page;
