import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import ProfileCard from "@/app/components/B2bSeo/ProfileCard";
import SuccessStories from "../../components/IndConstruction/SucessStories";
import OurWorks from "../../components/Bc-logo/OurWorks";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import WhyChoose from "../../components/Bc-logo/WhyChoose";

import { BannerSection } from "../../data/services/bc-logo-design/herosection";
import { Clientsformsdata } from "../../data/services/bc-logo-design/ourworks";
import { OurServices } from "../../data/services/bc-logo-design/our-servies";
import { Whychoosedata } from "../../data/services/bc-logo-design/whychoose";
import { Frameworkdata } from "../../data/services/b2b-seo/framework";
import { Typelogodata } from "../../data/services/bc-logo-design/typesdesign";
import { relatedservices } from "../../data/services/b2b-seo/relatedservices";
import { Wecanhelp } from "../../data/services/bc-logo-design/wecanhelp";
import { Platformsecomdata } from "../../data/services/b2b-seo/platformsecom";
import { Cta } from "../../data/services/bc-logo-design/cta";
import { Faq } from "../../data/services/bc-logo-design/faq";
import { Platformsdata } from "../../data/services/b2b-seo/platforms";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";
import { log } from "console";

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
      <Platforms
        title={Wecanhelp.title}
        subtitle={
          "Your logo is more than just a design—it’s the face of your brand. A well-crafted logo helps you"
        }
        data={Wecanhelp.data}
        icontitle={true}
        leftzero={true}
        colcount={3}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={5}
        hrcontent={true}
      />
      <Typeslogo
        title={Typelogodata.title}
        description={Typelogodata.description}
        data={Typelogodata.data}
      />
      <WhyChoose title={Whychoosedata.title} data={Whychoosedata.data} />

      <Testimonials bgcolor={"white"} />
      <section className="pb-[50px] lg:pb-[140px] ">
        <OurWorks Clientsformsdata={Clientsformsdata} />
      </section>

      <GetInTouch
        data={Cta}
        redlast={false}
        ctabbutton={"CONTACT US TODAY "}
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
