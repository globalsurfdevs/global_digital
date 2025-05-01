import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import OurWorks from "../../components/Bc-logo/OurWorks";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import WhyChoose from "../../components/Bc-logo/WhyChoose";

import { BannerSection } from "../../data/services/bc-logo-design/herosection";
import { Clientsformsdata } from "../../data/services/bc-logo-design/ourworks";
import { OurServices } from "../../data/services/bc-logo-design/our-servies";
import { Whychoosedata } from "../../data/services/bc-logo-design/whychoose";
import { Typelogodata } from "../../data/services/bc-logo-design/typesdesign";
import { relatedservices } from "../../data/services/bc-logo-design/relatedservices";
import { Wecanhelp } from "../../data/services/bc-logo-design/wecanhelp";
import { Cta } from "../../data/services/bc-logo-design/cta";
import { Faq } from "../../data/services/bc-logo-design/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";
import { log } from "console";

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
    title: "Logo Design Agency in Dubai | Logo Design Services | GS Digital",
    description:
      "Get a logo without any compromise. Our Dubai agency offers innovative logo design services with unlimited revisions, ensuring 100% satisfaction. Contact us!",
    alternates: {
      canonical: "https://www.globalsurf.ae/logo-design-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "Dubai’s #1 Logo Design Company | Craft a Timeless Brand Identity",
      siteName: "Global Surf Digital Media",
      url: "https://www.globalsurf.ae/logo-design-agency-dubai",
      description:
        "Your brand deserves a logo that lasts. Partner with Dubai’s top-rated logo design company for custom, modern logos that captivate audiences and build instant trust. Let’s create magic!",
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
        <OurWorks
          Clientsformsdata={Clientsformsdata}
          maintitle="Success Stories<br> That Speak for Themselves"
        />
      </section>

      <GetInTouch data={Cta} redlast={false} ctabbutton={"CONTACT US TODAY "} />
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
