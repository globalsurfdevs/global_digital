import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/conversion-rate-optimization/ServicesWithHoverbg";
import Platforms from "../../components/PermormanceMarketing/Platforms";
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
} from "../../components/conversion-rate-optimization/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Platformimg from "@/app/components/conversion-rate-optimization/WhychooseWithoutSpace";

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
    title: "Top Conversion Rate Optimization Agency in Dubai | GS Digital ",
    description:
      "GS Digital is Dubai’s trusted CRO agency. Our CRO experts analyze, test & refine your website for better engagement & more sales. Get a free audit today! ",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/conversion-rate-optimization-agency-dubai",
    },
    robots: "noindex, nofollow",
    openGraph: {
      title:
        "Boost Conversions with Dubai’s Top CRO Agency | GS Digital | 25+ Experts, 11+ Years",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/conversion-rate-optimization-agency-dubai",
      description:
        "Dubai’s #1 CRO agency for eCommerce & corporate websites. We specialize in A/B testing, landing page optimization & UX improvements. Book a free consultation today!",
    },
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
        <div className="mnstsaq bg-black text-white">
          <Framework
            title={Frameworkdata.title}
            data={Frameworkdata.data}
            bgcolor="bg-black"
            colcount={4}
          />
        </div>
      </section>
      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformimg
          title={Platformimgmdata.title}
          desc={Platformimgmdata.desc}
          data={Platformimgmdata.data}
          colcount={3}
        />
      </section>

      <GetInTouch data={Cta} redlast={true} ctabbutton={"REACH OUT TODAY!"} />
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
