import React from "react";
import Head from "next/head";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Results from "../../components/PermormanceMarketing/Results";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Paidsearch from "../../components/PpcAdvertisingAgencyDubai/Paidsearch";

import { ResultsData } from "../../data/services/ppc-advertising/results";
import { BannerSection } from "../../data/services/ppc-advertising/herosection";
import { OurServices } from "../../data/services/ppc-advertising/our-services";
import { Frameworkdata } from "../../data/services/ppc-advertising/framework";
import { relatedservices } from "../../data/services/ppc-advertising/relatedservices";
import { Paidsearchdata } from "../../data/services/ppc-advertising/Paidsearchdata";
import { Wecanhelp } from "../../data/services/ppc-advertising/wecanhelp";
import { Platformsecomdata } from "../../data/services/ppc-advertising/platformsecom";
import { Cta } from "../../data/services/ppc-advertising/cta";
import { Faq } from "../../data/services/ppc-advertising/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";
import Slider from "@/app/components/PpcAdvertisingAgencyDubai/Slider";
import { Platformsdata } from "../../data/services/ppc-advertising/platforms";

interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
  robots: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PPC Agency Dubai | Pay Per Click Advertising Services ",
    description:
      "Looking for a pay per click advertising agency in Dubai? Our expert PPC services deliver targeted campaigns to maximize ROI. Contact us today! ",
    alternates: {
      canonical: "https://www.globalsurf.ae/ppc-advertising-agency-dubai",
    },
    robots: "index, follow",
  };
}
const page = () => {
  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content="PPC Agency Dubai | Pay Per Click Services for All Industries"
        />
        <meta property="og:site_name" content="Global Surf Digital Media" />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/performance-marketing-agency-dubai"
        />
        <meta
          property="og:description"
          content="Maximize your brand’s reach with our expert PPC advertising services. Drive targeted traffic, increase conversions, and achieve measurable ROI with data-driven paid search and display campaigns. Get results with Google Ads, bing ads, and more."
        />
      </Head>
      <HeroSection
        Bannerdata={BannerSection}
        hideslider={true}
        bannerlogp={true}
      />
      <Paidsearch title={Paidsearchdata.title} data={Paidsearchdata.data} />
      <Platforms
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={4}
      />
      <Services
        title={OurServices.title}
        data={OurServices.data}
        colcount={6}
      />
      <Framework title={Frameworkdata.title} data={Frameworkdata.data} />
      <section className="border-b pb-[50px] lg:mb-[70px] lg:pb-[140px]">
        <Slider Platformsdata={Platformsdata} />
      </section>
      <Results
        title={ResultsData.title}
        description={ResultsData.description}
        data={ResultsData.data}
      />

      <Platformsecom
        title={Platformsecomdata.title}
        desc={Platformsecomdata.desc}
        data={Platformsecomdata.data}
      />
      <Testimonials bgcolor={"white"} />

      <GetInTouch
        data={Cta}
        redlast={true}
        ctabbutton={"Lets talk growth"}
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
