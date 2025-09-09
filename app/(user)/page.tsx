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
  robots: string;
  openGraph: {
    title: string;
    site_name: string;
    url: string;
    description: string;
    type: string;
    images: { url: string; alt: string; type: string }[];
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Global Surf Digital: Digital Transformation Company in Dubai",
    description:
      "Fading into the digital noise? Global Surf Digital, a digital solutions agency in Dubai, offers SEO, PPC, social media, and more to elevate your brand. Learn more! ",
    alternates: {
      canonical: "https://www.globalsurf.ae",
    },
    robots: "index, follow",
    openGraph: {
      title: "Strategic Digital Marketing Solutions in Dubai | GS.Digital",
      site_name: "Global Surf Digital",
      url: "https://www.globalsurf.ae/",
      description:
        "GS.Digital helps brands thrive with powerful SEO, paid ads, content strategies, and more, crafted by a team of Dubai-based marketing professionals. Discover your growth potential today.",

      images: [
        {
          url: "https://www.globalsurf.ae/gs-digital-logo.svg",
          alt: "Global Surf Digital Logo",
          type: "image/svg+xml", // Use appropriate MIME type if SVG
        },
      ],
      type:"website"
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
