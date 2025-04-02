import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import OurWorks from "../../components/Bc-logo/OurWorks";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import WhyChoose from "../../components/BcGraphicDesign/WhyChoose";
import OurServices from "../../components/BcGraphicDesign/OurServices";

import { BannerSection } from "../../data/services/bc-graphic-design/herosection";
import { Clientsformsdata } from "../../data/services/bc-logo-design/ourworks";
import { Whychoosedata } from "../../data/services/bc-graphic-design/whychoose";
import { Typelogodata } from "../../data/services/bc-graphic-design/typesdesign";
import { relatedservices } from "../../data/services/bc-graphic-design/relatedservices";
import { Wecanhelp } from "../../data/services/bc-graphic-design/wecanhelp";
import { Cta } from "../../data/services/bc-graphic-design/cta";
import { Faq } from "../../data/services/bc-graphic-design/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

type Metadata = {
  title: string;
  description: string;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Create a Powerful Brand Identity with Professional Logo Design Services in Dubai ",
    description:
      "Partner with Dubai’s top B2B SEO agency for tailored SEO services that drive results. Increase traffic, generate leads, & grow your business with us.  Call us!",

    robots: "noindex, nofollow",
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
      <OurServices
        title="Our Graphic<br> Design Services"
        description="Great design isn’t just about looking good—it’s about making an impact. At Global Surf Digital Media, we create visuals that don’t just sit on a page; they move people. Every line, every color, every element is crafted to tell a story—your story. "
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
      <WhyChoose
        colcount={4}
        title={Whychoosedata.title}
        data={Whychoosedata.data}
        desc="With a team of passionate graphic design experts, we bring years of experience in creating visuals that elevate brands. Our approach is creative and strategy-driven, ensuring every design delivers impact."
      />

      <section className="pb-[50px] lg:pb-[140px]">
        <OurWorks Clientsformsdata={Clientsformsdata} maintitle="Our Works" />
      </section>

      <GetInTouch
        data={Cta}
        redlast={false}
        ctabbutton={"Let’s bring your vision to life, Contact us today!"}
        link={"/lets-talk"}
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
