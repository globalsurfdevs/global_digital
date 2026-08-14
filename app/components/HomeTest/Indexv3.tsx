import HeroSection from "./HeroSectionv3";
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
import { getHome } from "../../lib/home.service";
import { getTestimonials } from "../../lib/testimonials";


export default async function Home() {
    const home = await getHome();
    const testimonials = await getTestimonials()
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

            <HeroSection />
            <LogoSwiper />
            <AboutGlobal />
            <OurServices />
            <OurAchievements />
            <IndustriesweWork />
            {/* <WorkIn /> */}
            <Tours />
            <SuccessStories clientTitle={home.clientSection.title} />
            <Clients data={home.clientSection} />
            <Testimonials data={testimonials.testimonialSection} reviews={false}
                bottomText={false} />
            <FAQ title={home.faqSection.title}
                data={home.faqSection.items.map((item: { question: string, answer: string }) => ({
                    title: item.question,
                    description: item.answer,
                }))} />
            <Cta />
        </>
    );
}
