import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";

import {
  BannerSection,
  Wecanhelp,
  OurServices,
  AreaExpertise,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
  Clientsformsdata,
} from "../../data/services/wdd-custom-web-development/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import WorkIn from "@/app/components/common/WorkIn";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import SucessStories from "@/app/components/wdd-custom-web-development/SucessStories";

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
    title: "Custom Web Development Company in Dubai | G.S Digital",
    description:
      "Elevate your digital presence with expert web development in Dubai. We craft tailored websites that are fast, secure, and built to scale with your business.",
    alternates: {
      canonical: "https://www.globalsurf.ae/web-development-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "Dubai’s Trusted Partner for Web Development Solutions",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/web-development-agency-dubai",
      description:
        "Discover top-tier custom web development services in Dubai. We build high-performance, secure websites tailored to your business goals.",
      type: "website",
      images: [
        {
          url: "https://www.globalsurf.ae/_next/static/media/banner.759dbe9a.jpg",
          width: 1200,
          height: 630,
          alt: "Web Development Services Dubai",
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
      <div className="hdpd">
        <Expertise title={AreaExpertise.title} data={AreaExpertise.data} />
      </div>
      <section className="mb-[50px]   bg-black  pb-[50px]   pt-[50px] text-white lg:mb-[140px] lg:pb-[200px] lg:pt-[140px]">
        <WorkIn />
      </section>
      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>
      <section className="pb-[50px] lg:pb-[140px] ">
      <SucessStories
        Clientsformsdata={Clientsformsdata.filter((item) => item !== undefined)}
        subdesc={"Our Works"}
      />
      </section>
      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"LET'S CONNECT AND GET STARTED TODAY!"}
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
