import HeroSection from "@/app/components/HomePage/HeroSection";
import LogoSwiper from "@/app/components/HomePage/LogoSwiper";
import AboutGlobal from "@/app/components/HomePage/AboutGlobal";
import OurAchievements from "@/app/components/HomePage/OurAchievements";
import OurServices from "@/app/components/HomePage/OurServices";
import SuccessStories from "@/app/components/HomePage/SuccessStories";
import Clients from "@/app/components/HomePage/Clients";
import Testimonials from "@/app/components/HomePage/Testimonials";
import Tours from "@/app/components/HomePage/Tours";
// import WorkIn from "@/app/components/HomePage/WorkIn";
import FAQ from "@/app/components/PermormanceMarketing/FAQ";
import Cta from "@/app/components/HomePage/Cta";
import IndustriesweWork from "@/app/components/HomePage/IndustriesweWork";
import Script from "next/script";
import {
  Faq,
} from "@/app/components/HomePage/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full service Digital Marketing Agency Dubai | GS Digital",
  description: "Full-service digital marketing agency in Dubai. From SEO to web development, we help 100+ brands dominate search & social. Start your growth journey today.",
  alternates: {
    canonical: "https://www.globalsurf.ae",
  },
  robots: "index, follow",
  openGraph: {
    title: "Strategic Digital Marketing Solutions in Dubai | GS Digital",
    siteName: "GS Digital", // ✅ siteName not site_name
    url: "https://www.globalsurf.ae/",
    description: "GS Digital helps brands thrive with powerful SEO, paid ads, content strategies, and more, crafted by a team of Dubai-based marketing professionals. Discover your growth potential today.",
    images: [
      {
        url: "https://www.globalsurf.ae/gs-digital-logo.svg",
        alt: "GS Logo",
        type: "image/svg+xml",
      },
    ],
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you choose the right digital marketing agency in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose a digital marketing agency in Dubai that defines strategy before activating channels. Engagements should begin with a growth audit covering competitive positioning, opportunity sizing, and KPI mapping tied to revenue goals. Only after strategic clarity should campaigns be executed, ensuring investment translates into accountable business performance rather than isolated activity.",
      },
    },
    {
      "@type": "Question",
      name: "What is a full-service digital marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full-service digital marketing agency integrates SEO, performance media, content, social, and web into one performance-led model. Every channel operates against shared commercial KPIs, preventing fragmented execution. This ensures all initiatives contribute directly to qualified demand, conversion efficiency, and measurable revenue impact.",
      },
    },
    {
      "@type": "Question",
      name: "What does a full-service digital marketing agency offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full-service digital marketing agency delivers integrated services including SEO, paid acquisition, content strategy, social positioning, and conversion-focused web development. These services operate within a unified demand model where visibility, lead quality, and growth objectives remain aligned to clear performance benchmarks.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.globalsurf.ae/#localbusiness",
  name: "GS Digital",
  image: "https://www.globalsurf.ae/gs-digital-logo.svg",
  url: "https://www.globalsurf.ae/",
  telephone: "+971 4 582 1133",
  email: "hello@globalsurf.ae",
  description:
    "Dubai-based full-service digital marketing agency specializing in SEO, performance marketing, PPC, web development, branding, and social media management. Helping 100+ UAE businesses across construction, real estate, and engineering industries dominate search and social with measurable ROI.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O.Box 13653, 901 - SIT Tower",
    addressLocality: "SIT Tower, Dubai Silicon Oasis",
    addressRegion: "Dubai",
    postalCode: "00000",
    addressCountry: "UAE",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.1177885",
    longitude: "55.3906747",
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],

  sameAs: [
    "https://www.facebook.com/globalsurf.digital",
    "https://www.instagram.com/globalsurf.digital/",
    "https://x.com/GlobalSurf_D",
    "https://www.linkedin.com/company/globalsurfdigital",
    "https://www.tiktok.com/@globalsurf.digital",
  ],
};

export default function Home() {
  return (
    <>
    {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        // strategy="beforeInteractive"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GS Digital",
            url: "https://www.globalsurf.ae",
          }),
        }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <LogoSwiper />
      <AboutGlobal />
      <OurServices />
      <OurAchievements />
      <IndustriesweWork />
      {/* <WorkIn /> */}
      <Tours />
      <SuccessStories />
      <Clients />
      <Testimonials />
      <FAQ data={Faq} />
      <Cta />
    </>
  );
}
