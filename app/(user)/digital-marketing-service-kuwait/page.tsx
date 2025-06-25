

import HeroSection from "../../components/PermormanceMarketing/HeroSection";
import Services from "../../components/PermormanceMarketing/Services";
import Typeslogo from "../../components/Bc-logo/TypesLogo";
import FAQ from "../../components/PermormanceMarketing/FAQ";
import GetInTouch from "../../components/PermormanceMarketing/GetInTouch";
import Link from "next/link";
// import LetsTalk from "../../components/common/LetsConnect";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import {
  BannerSection,
  Wecanhelp,
  OurServices,
  Platformsecomdata,
  Cta,
  Faq,
  relatedServicesData,
  featuredProjectsdata,
} from "../../data/services/digital-marketing-service-kuwait/data";


import Platformserver from "@/app/components/e-commerce-wdd/Platformserver";
import SucessStories from "@/app/components/wdd-custom-web-development/SucessStories";
import CountBox from "@/app/components/DigitalMarketingService/CountBox";
import HelpYouSec from "@/app/components/DigitalMarketingService/HelpYouSec";
import { Typelogodata } from "@/app/data/services/digital-marketing-service-kuwait/data";
import PartnersSec from "@/app/components/DigitalMarketingService/PartnersSec";
import Industydetail from "@/app/components/industry/Industydetail";
import FeaturedProjectsSlider from "@/app/components/DigitalMarketingService/FeaturedProjectsSlider";
import LetsTalkBtn from "@/app/components/DigitalMarketingService/LetsTalkBtn";

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
    title: "Digital Marketing Services in Kuwait | G.S Digital",
    description:
      "Digital Marketing Services in Kuwait Trusted Digital Marketing Partner for Data-Driven Growth",
    alternates: {
      canonical: "https://www.globalsurf.ae/digital-marketing-service-kuwait",
    },
    robots: "index, follow",
    openGraph: {
      title: "Digital Marketing Services in Kuwait | G.S Digital",
      siteName: "Global Surf Digital",
      url: "https://www.globalsurf.ae/digital-marketing-service-kuwait",
      description:
        "Digital Marketing Services in Kuwait Trusted Digital Marketing Partner for Data-Driven Growth",
      type: "website",
      images: [
        {
          url: "https://www.globalsurf.ae/_next/static/media/banner.759dbe9a.jpg",
          width: 1200,
          height: 630,
          alt: "Digital Marketing Services in Kuwait",
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
      <section className="py-140">
        <div className="container">
          <div className="flex flex-col gap-5 lg:gap-75 border-b border-black/10 pb-5 lg:pb-75">
            <h2 className="text-font65 leading-[1.076923076923077] font-normal">For Your Business, Your Market, Your Goals Cut Through the Noise. Capture More Value.</h2>
            <div>
              <p className="text-gray1 text-font19 font-medium fnt-lexend mb-6 lg:mb-10 leading-[1.473684210526316]">We help brands grow in Kuwait’s fast-evolving digital landscape through clear strategy, precise targeting, and performance that matters. With a focus on measurable results, we create digital experiences that engage, convert, and scale.</p>
              <h3 className="text-font19 font-semibold fnt-lexend leading-[1.473684210526316]">Strategically driven. Data-backed.</h3>
              <p className="text-gray1 text-font19 font-medium fnt-lexend mb-0 leading-[1.473684210526316]">No guesswork—just powerful execution that delivers ROI.</p>
            </div>
            {/* <button className="z-2 z-1 group relative flex w-fit items-center gap-1 lg:gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 " >
              <div className="relative">
                  <p className={`duration-200" text-font16 font-medium ease-in-out group-hover:text-primary uppercase ${lexend.className}`}>
                    Let’s turn your brand’s online presence into its biggest growth engine.
                  </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="duration-200 ease-in-out group-hover:scale-125 group-hover:stroke-black">
                <g clipPath="url(#clip0_46_1045)" className="group-hover:stroke-black">
                  <path d="M18.7892 1.27512L0.699219 19.0151" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10" className="group-hover:stroke-black" />
                  <path d="M0.699219 1.27512H18.7892V18.6651" stroke="#E63E31" strokeWidth="2" strokeMiterlimit="10" className="group-hover:stroke-black" />
                </g>
                <defs>
                  <clipPath id="clip0_46_1045">
                    <rect width="19.79" height="19.45" fill="white" transform="translate(0 0.275116)" />
                  </clipPath>
                </defs>
              </svg>
            </button> */}
               <LetsTalkBtn />
          </div>
        </div>
      </section>
      <CountBox />
      <HelpYouSec
        title={Wecanhelp.title}
        data={Wecanhelp.data}
        icontitle={true}
        hiddentitle={true}
        leftzero={true}
        colcount={4}
      />
      <Typeslogo
        title={Typelogodata.title}
        data={Typelogodata.data.map((item) => ({
          ...item,
          icon: item.icon,
        }))}
      />
      <section className="py-140">
        <FeaturedProjectsSlider  FeaturedProjectsdata={featuredProjectsdata.filter((item) => item !== undefined)} mainTitle={"Featured Projects"} />
      </section>
      <Services title={OurServices.title} data={OurServices.data} colcount={5} hrcontent={true} bgcolor="bg-black" />
      <PartnersSec />
      <section className="lg:pt-140 pt-12">
        <Platformserver
          title={Platformsecomdata.title}
          desc={Platformsecomdata.desc}
          data={Platformsecomdata.data}
        />
      </section>
      <Industydetail title={relatedServicesData.title} data={relatedServicesData.data} colnum={3} />
      <GetInTouch data={Cta} redlast={true} ctabbutton={"Get Started Today "} />
      <FAQ data={Faq} />
      {/* <RelatedServicesSection title={relatedServicesData.title} data={relatedServicesData.data} colcount={3} /> */}
    </div>
  );
};

export default page;
