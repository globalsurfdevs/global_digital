import React from "react";
import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Framework from "../../components/PermormanceMarketing/Framework";
import Platforms from "../../components/PermormanceMarketing/Platforms";
import Platformsecom from "../../components/PpcAdvertisingAgencyDubai/Platformsecom";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import CtaBox from "../../components/PermormanceMarketing/CtaBox";



import { BannerSection } from "../../data/services/social-media-management/herosection";
import { OurServices } from "../../data/services/social-media-management/our-services";
import { Frameworkdata } from "../../data/services/social-media-management/framework";
import { relatedservices } from "../../data/services/social-media-management/relatedservices";
import { Wecanhelp } from "../../data/services/social-media-management/wecanhelp";
import { Platformsdata } from "../../data/services/social-media-management/platforms";
import { Platformsecomdata } from "../../data/services/social-media-management/platformsecom";
import { Cta } from "../../data/services/social-media-management/cta";
import { Faq } from "../../data/services/social-media-management/faq";
import Testimonials from "@/app/components/HomePage/Testimonials";
import RelatedServices from "@/app/components/eCommerceSeoDubai/RelatedServices";

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
    title: "Data-Driven Performance Marketing Agency in Dubai | GS.Digital",
    description:
      "Drive Measurable Results. Our performance-based approach aligns bespoke strategies with your brand's objectives. Contact us today for a free consultation.",
    alternates: {
      canonical: "https://www.globalsurf.ae/",
    },
    robots: "noindex, nofollow",
  };
}
const page = () => {
  return (
    <div>
      <HeroSection Bannerdata={BannerSection} hideslider={true} maxchwidth={21} />
      <Platforms title={Wecanhelp.title} data={Wecanhelp.data} icontitle={true} leftzero={true} colcount={4} hiddentitle={true} />
      <Services title={OurServices.title} description={OurServices.desc} data={OurServices.data}  colcount={5}  />
      <Framework title={Frameworkdata.title} description={Frameworkdata.description} data={Frameworkdata.data} />
      <section className="bg-black innpding">
        <Platforms title={Platformsdata.title} data={Platformsdata.data} bgblack={true} />
      </section>

      <Testimonials bgcolor={'white'} />
      <section className="mb-[50px] md:mb-[111px]">
      <Platformsecom title={Platformsecomdata.title} desc={Platformsecomdata.desc} fdesc={Platformsecomdata.fdesc} data={Platformsecomdata.data} />
      </section>
      <CtaBox
        data={Cta}
        ctabbutton={"CONTACT US TODAY "}
        link={"/lets-talk"}
      />
      <FAQ data={Faq} />
      <RelatedServices title={relatedservices.title} description={relatedservices.description}  data={relatedservices.data} colcount={3} />
    </div>
  );
};

export default page;
