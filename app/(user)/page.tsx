import AboutGlobal from "@/app/components/HomePage/AboutGlobal";
import HeroSection from "@/app/components/HomePage/HeroSection";
import LogoSwiper from "@/app/components/HomePage/LogoSwiper";
import OurAchievements from "@/app/components/HomePage/OurAchievements";
import OurServices from "@/app/components/HomePage/OurServices";
import SuccessStories from "@/app/components/HomePage/SuccessStories";
import Clients from "@/app/components/HomePage/Clients";
import Testimonials from "@/app/components/HomePage/Testimonials";
import Tours from "@/app/components/HomePage/Tours";
import WorkIn from "@/app/components/HomePage/WorkIn";
import Cta from "@/app/components/HomePage/Cta";



interface Canonicals {
  canonical: string;
}

type Metadata = {
  title: string;
  description: string;
  alternates: Canonicals;
};


export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Full Service Digital Marketing Agency in Dubai |GS.Digital",
    description: "Fading into the digital noise? Global Surf crafts compelling campaigns that captivate audiences, drive sales, and elevate your brand to new heights. Click here to learn more",
    alternates: {
      canonical: 'https://globalsurf.ae/',
    },
  };
}

export default function Home() {
  return (
    <>
      <HeroSection/>
      <LogoSwiper/>
      <AboutGlobal/>
      <OurServices/>
      <OurAchievements/>
      <WorkIn/>
      <Tours/>
      <SuccessStories/>
      <Clients/>
      <Testimonials />
      <Cta />

    </>

  );
}
