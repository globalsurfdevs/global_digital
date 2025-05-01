import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import OurWorks from "../../components/Bc-logo/OurWorks";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import WhyChoose from "../../components/BcGraphicDesign/WhyChoose";
import OurServices from "../../components/BcGraphicDesign/OurServices";

import {
  BannerSection,
  AreaExpertise,
} from "../../data/services/bc-graphic-design/herosection";
import { Clientsformsdata } from "../../data/services/bc-logo-design/ourworks";
import {
  Whychoosedata,
  Platformimgmdata,
} from "../../data/services/bc-graphic-design/whychoose";
import { Typelogodata } from "../../data/services/bc-graphic-design/typesdesign";
import { relatedservices } from "../../data/services/bc-graphic-design/relatedservices";
import { Wecanhelp } from "../../data/services/bc-graphic-design/wecanhelp";
import { Cta } from "../../data/services/bc-graphic-design/cta";
import { Faq } from "../../data/services/bc-graphic-design/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Platformimg from "@/app/components/common/Platformimg";

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
    title:
      "Dubai Graphic Design Agency |  Graphic Design Services | GS Digital ",
    description:
      "Elevate your brand with Dubai’s leading graphic design agency. From logo design to packaging, we deliver graphic design services that drive ROI.  Call us!",
    alternates: {
      canonical: "https://www.globalsurf.ae/graphic-design-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "Transform Your Brand with Dubai’s Top Graphic Design Agency",
      siteName: "Global Surf Digital Media",
      url: "https://www.globalsurf.ae/graphic-design-agency-dubai",
      description:
        "Elevate your business with custom branding, packaging, and social media designs that captivate. Partner with a leading graphic design agency in Dubai for visuals that sell. Get a quote today!",
    },
  };
}
const page = () => {
  return (
    <div>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        maxchwidth={23}
      />

      <Expertise
        title={AreaExpertise.title}
        data={AreaExpertise.data}
        maxchwidth={12}
      />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        leftzero={true}
        colcount={4}
      />

      <Typeslogo
        title={Typelogodata.title}
        description={Typelogodata.description}
        data={Typelogodata.data.map((item) => ({
          ...item,
          id: item.id.toString(),
        }))}
      />
      <Testimonials bgcolor={"white"} />

      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformimg
          title={Platformimgmdata.title}
          desc={Platformimgmdata.desc}
          data={Platformimgmdata.data}
          colcount={4}
        />
      </section>

      <section className="pb-[50px] lg:pb-[140px]">
        <OurWorks Clientsformsdata={Clientsformsdata} maintitle="Our Works" />
      </section>

      <GetInTouch
        data={Cta}
        redlast={false}
        ctabbutton={"Let’s bring your vision to life, Contact us today!"}
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
