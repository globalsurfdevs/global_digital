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
        <meta
          property="og:title"
          content="Strategic Digital Marketing Solutions in Dubai | GS.Digital"
        />
        <meta property="og:site_name" content="Global Surf Digital" />
           <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content="https://www.globalsurf.ae/"
        />
        <meta
          property="og:description"
          content="GS.Digital helps brands thrive with powerful SEO, paid ads, content strategies, and more, crafted by a team of Dubai-based marketing professionals. Discover your growth potential today."
        />
        <meta
          property="og:image"
          content="https://www.globalsurf.ae/_next/static/media/gs-digital-logo.2e30d388.svg"
        />
        <meta
          property="og:image:alt"
          content="Global Surf Digital Logo"
        />
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
