"use client";
import Image from "next/image";
// import { heroData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import Button from "../common/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import LetsTalk from "../../components/common/LetsConnect";
import { toSentenceCase, toTitleCase } from "@/app/helpers/maintainProperWordings";

interface HeroSectionProps {
  data: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: {
      title: string;
      link: string;
    }[];
  };
}


const HeroSection = ({ data }: HeroSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <section className="relative py-[110px] overflow-hidden md:h-[90vh] mt-[20px]">
      {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={data.image}
          alt={data.imageAlt}
          width={1920}
          height={1080}
          className="hidden h-full w-full object-cover md:block"
        />
        <Image
          src={"/images/service-hero-bg-mobile.jpg"}
          alt={data.imageAlt}
          width={1920}
          height={1080}
          className="h-full w-full object-cover md:hidden"
        />
      </div>
      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div>
          <h1 className="title-70 mb-3 max-w-[16ch] tracking-[-0.025em] xl:mb-5">
            {toTitleCase(data.title)}
          </h1>
          <p className="text-25 text-77787B max-w-[40ch] leading-[1.4] 3xl:max-w-[55ch]">
            {toSentenceCase(data.description)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-[14px] xl:mt-8 xxl:mt-[60px]">
            <Button
              className="max-h-[50px]"
              variant="primary"
              // href={data.items[0].link}
              onClick={() => setModalOpen(true)}
            >
              {data.items[0].title}
            </Button>

            {data.items[1] && (
              <Button
                className="max-h-[50px]"
                variant="whatsapp"
                href={data.items[1].link || "https://wa.me/97145821133"}
                external
              >
                {data.items[1].title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
