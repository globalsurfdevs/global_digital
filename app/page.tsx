import AboutGlobal from "./components/HomePage/AboutGlobal";
import HeroSection from "./components/HomePage/HeroSection";
import LogoSwiper from "./components/HomePage/LogoSwiper";
import OurAchievements from "./components/HomePage/OurAchievements";
import OurServices from "./components/HomePage/OurServices";
import SuccessStories from "./components/HomePage/SuccessStories";
import Testimonials from "./components/HomePage/Testimonials";
import Tours from "./components/HomePage/Tours";
import WorkIn from "./components/HomePage/WorkIn";


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
      <Testimonials/>
    </>

  );
}
