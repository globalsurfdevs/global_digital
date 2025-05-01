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
  Platformsecomdata,
  Cta,
  Faq,
  relatedservices,
} from "../../data/services/wdd-mobile-apps/data";

import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
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
    //  images?: {
    //    url: string;
    //    width: number;
    //    height: number;
    //    alt: string;
    //  }[];
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mobile App Development Company in Dubai |  GS Digital",
    description:
      "Transform your business with user-focused mobile apps. As Dubai’s leading mobile app development company, we prioritize UX and scalability. Get a quote!",
    alternates: {
      canonical:
        "https://www.globalsurf.ae/mobile-app-development-company-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title:
        "Mobile App Development Company in Dubai |  iOS, Android, & Hybrid Development",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/mobile-app-development-company-dubai",
      description:
        "From concept to post-launch updates, we’ve got you covered. Partner with Dubai’s trusted mobile app developers for seamless, future-ready solutions. Get a quote today!",
      type: "website",
      //  images: [
      //   {
      //     url: "https://www.globalsurf.ae/_next/static/media/banner.759dbe9a.jpg",
      //     width: 1200,
      //     height: 630,
      //     alt: "Web Development Services Dubai",
      //   },
      // ],
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

      <section className="  p-[50px]   lg:p-[140px] ">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
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
