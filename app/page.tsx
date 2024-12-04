import AboutGlobal from "./components/AboutGlobal";
import HeroSection from "./components/HeroSection";
import LogoSwiper from "./components/LogoSwiper";
import OurAchievements from "./components/OurAchievements";
import OurServices from "./components/OurServices";
import WorkIn from "./components/WorkIn";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <LogoSwiper/>
      <AboutGlobal/>
      <OurServices/>
      <OurAchievements/>
      <WorkIn/>
    </>
    
  );
}
