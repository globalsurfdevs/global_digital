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
  Frameworkdata,
  AreaExpertise,
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
  Clientsformsdata,
} from "../../data/services/wdd-web-apps/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Expertise from "@/app/components/PermormanceMarketing/Expertise";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import SucessStories from "@/app/components/wdd-web-apps/SucessStories";
import Framework from "@/app/components/PermormanceMarketing/Framework";

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
    title: "Web Application Development Agency Dubai | G.S Digital",
    description:
      "Partner with a top web app development company in Dubai specializing in custom web applications. We build secure web apps tailored to your business. ",
    alternates: {
      canonical: "https://www.globalsurf.ae/web-app-dev-agency",
    },
    robots: "index, follow",
    openGraph: {
      title: "Custom Web App Solutions in Dubai | G.S Digital",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/web-app-dev-agency",
      description:
        "Delivering cutting-edge, secure web applications crafted to meet your business needs. Trusted web app developers in Dubai.",
      type: "website",
      images: [
        {
          url: "https://www.globalsurf.ae/_next/static/media/wewbanner.b502c4dc.jpg",
          width: 1200,
          height: 630,
          alt: "Web App Development Agency Dubai",
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
        maxchwidth={34}
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
        data={AreaExpertise.data}
        subttle={AreaExpertise.subttle}
      />

      <section className="pb-[50px]   lg:pb-[140px] ">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>
      <SucessStories
        Clientsformsdata={Clientsformsdata.filter((item) => item !== undefined)}
        subdesc={"Showcasing Our Finest Creations"}
      />
      <GetInTouch data={Cta} redlast={true} ctabbutton={"CONTACT US TODAY!"} />
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
