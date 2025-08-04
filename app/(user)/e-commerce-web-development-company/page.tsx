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
  AreaExpertise,
  Frameworkdata,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
} from "../../components/e-commerce-wdd/data";

import Testimonials from "@/app/components/HomePage/Testimonials";
import ExpertServices from "@/app/components/wdd-web-design/ExpertServices";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Framework from "@/app/components/PermormanceMarketing/Framework";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";

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
    type: string;
    images?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ecommerce Web Development Company in Dubai | G.S Digital",
    description:
      "Looking to build your online store? Our Dubai-based e-commerce development company specializes in Shopify & WooCommerce solutions tailored for growth. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/e-commerce-web-development-company",
    },
    robots: "index, follow",
    openGraph: {
      title: "Top E-commerce Development Experts in Dubai | GS Digital",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/e-commerce-web-development-company",
      description:
        "Launch and grow your online store with Dubai’s leading e-commerce developers specializing in Shopify and WooCommerce solutions.",
      type: "website",
      images: [
        {
          url: "https://www.globalsurf.ae/_next/static/media/bannersr.1e1a92f2.jpg",
          width: 1200,
          height: 630,
          alt: "Ecommerce Development Company Dubai",
        },
      ],
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
      <div className="mnstsaq bg-black text-white">
        <Framework
          title={Frameworkdata.title}
          data={Frameworkdata.data}
          bgcolor="bg-black"
          colcount={3}
        />
      </div>
      <Expertise
        title={AreaExpertise.title}
        subttle={AreaExpertise.subttle}
        data={AreaExpertise.data}
      />

      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>

      <section className="innerbgpd">
        <Testimonials />
      </section>
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"LET’S BRING YOUR VISION TO LIFE, CONTACT US TODAY!"}
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
