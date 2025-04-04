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
import Head from "next/head";

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
    description:
      "Fading into the digital noise? Global Surf digital marketing agency in Dubai, offers SEO, PPC, social media & more to elevate your brand. Learn more today! ",
    alternates: {
      canonical: "https://www.globalsurf.ae",
    },
  };
}

export default function Home() {
  return (
    <>
 <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Global Surf Digital",
              "url": "https://www.globalsurf.ae"
            })
          }}
        />
      </Head>
      <HeroSection />
      <LogoSwiper />
      <AboutGlobal />
      <OurServices />
      <OurAchievements />
      <WorkIn />
      <Tours />
      <SuccessStories />
      <Clients />
      <Testimonials />
      <Cta />
    </>
  );
}
