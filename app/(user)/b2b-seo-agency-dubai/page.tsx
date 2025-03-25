import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Results from "../../components/PermormanceMarketing/Results";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import ProfileCard from "@/app/components/B2bSeo/ProfileCard";
import SuccessStories from "../../components/IndConstruction/SucessStories";

import { ResultsData } from "../../data/services/b2b-seo/results";
import { BannerSection } from "../../data/services/b2b-seo/herosection";
import { Clientsformsdata } from "../../data/services/b2b-seo/clientsstories";
import { OurServices } from "../../data/services/b2b-seo/our-services";
import { Frameworkdata } from "../../data/services/b2b-seo/framework";
import { relatedservices } from "../../data/services/b2b-seo/relatedservices";
import { Wecanhelp } from "../../data/services/b2b-seo/wecanhelp";
import { Platformsecomdata } from "../../data/services/b2b-seo/platformsecom";
import { Cta } from "../../data/services/b2b-seo/cta";
import { Faq } from "../../data/services/b2b-seo/faq";
import { Platformsdata } from "../../data/services/b2b-seo/platforms";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";

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
    site_name: string;
    url: string;
    description: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "B2B SEO Agency in Dubai | B2B SEO Services | GS Digital",
    description:
      "Partner with Dubai’s top B2B SEO agency for tailored SEO services that drive results. Increase traffic, generate leads, & grow your business with us.  Call us!",
    alternates: {
      canonical: "https://www.globalsurf.ae/b2b-seo-agency-dubai",
    },
    robots: "index, follow",
    openGraph: {
      title: "B2B  SEO Agency in Dubai | B2B SEO Services | GS Digital",
      site_name: "Global Surf Digital Media",
      url: "https://www.globalsurf.ae/b2b-seo-agency-dubai",
      description:
        "Boost your B2B business with expert SEO services in Dubai. Global Surf Digital helps companies increase visibility, generate high-quality leads, and dominate search rankings with data-driven SEO strategies. Get a free consultation today!",
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
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <SuccessStories Clientsformsdata={Clientsformsdata} />
      <section className="border-b pb-[50px] lg:pb-[140px] ">
        <Slider Platformsdata={Platformsdata} />
      </section>

      <Testimonials bgcolor={"white"} />
      {/* <Platformsecom
        title={Platformsecomdata.title}
        btmpara={Platformsecomdata.btmpara}
        desc={Platformsecomdata.desc}
        data={Platformsecomdata.data}
        colm={3}
      /> */}
      <Platformsecom
        title={Platformsecomdata.title}
        desc={Platformsecomdata.desc}
        data={Platformsecomdata.data}
      />
      <ProfileCard />

      {/* <Results
        title={ResultsData.title}
        description={ResultsData.description}
        data={ResultsData.data}
        nopt={true}
      /> */}

      <GetInTouch
        data={Cta}
        redlast={true}
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
