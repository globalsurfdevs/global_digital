import AboutGlobal from "@/app/components/HomePage/AboutGlobal";
import HeroSection from "@/app/components/HomePage/HeroSection";
import LogoSwiper from "@/app/components/HomePage/LogoSwiper";
import OurAchievements from "@/app/components/HomePage/OurAchievements";
import OurServices from "@/app/components/HomePage/OurServices";
import SuccessStories from "@/app/components/HomePage/SuccessStories";
import Testimonials from "@/app/components/HomePage/Testimonials";
import Tours from "@/app/components/HomePage/Tours";
import WorkIn from "@/app/components/HomePage/WorkIn";
import Cta from "@/app/components/HomePage/Cta";


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
      <Testimonials />
      <Cta />

    </>

  );
}
