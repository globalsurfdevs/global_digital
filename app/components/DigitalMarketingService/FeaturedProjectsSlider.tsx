"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { StaticImageData } from "next/image";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProjectsItem {
  id: number;
  logo: string | StaticImageData;
  image: string | StaticImageData;
  projectName: string;
  title: string;
  desc: string;
  slug: string;
}

interface FeaturedProjectsSectionProps {
  mainTitle?: string;
  FeaturedProjectsdata: FeaturedProjectsItem[];
}

const FeaturedProjectsSlider: React.FC<FeaturedProjectsSectionProps> = ({
  mainTitle,
  FeaturedProjectsdata,
}) => {
  const nextContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState("100%");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateDivWidth = () => {
      if (nextContainerRef.current) {
        const containerRect = nextContainerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(nextContainerRef.current);
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const totalWidth = containerRect.width + marginLeft - 15;
        setDivWidth(`${totalWidth}px`);
      }
    };
    updateDivWidth();
    window.addEventListener("resize", updateDivWidth);
    return () => window.removeEventListener("resize", updateDivWidth);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      setIsSmallScreen(window.innerWidth < 992);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <>
      <div className="container" ref={nextContainerRef}>
        <h2 className="title-65 mb-6 lg:mb-16">{mainTitle}</h2>
      </div>
      <div style={{ width: isSmallScreen ? "" : divWidth }} className={`${isSmallScreen ? "container mx-auto py-10" : ""} custom-class ml-auto`} >
        <div className="flex w-full flex-col lg:flex-row">
          <Swiper
            className="w-full"
            loop={true}
            freeMode={true}
            slidesPerView="auto"
            centeredSlides={false}
            speed={5000}
            grabCursor={true}
            modules={[Autoplay]}
             autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { spaceBetween: 30, slidesPerView: 1 },
              768: { spaceBetween: 70, slidesPerView: 1 },
              1024: { spaceBetween: 80 },
              1366: { spaceBetween: 30, slidesPerView: 2.2 },
            }}
          >
            {FeaturedProjectsdata.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col lg:flex-row group" >
                  {/* Image Section */}
                  <div className="w-full lg:w-1/2 lg:order2 ">
                    <div className="h-full relative">
                      <Link href={item.slug || ""}>
                        <Image src={item.image} alt={item.projectName} className="h-full w-full max-h-[200px] lg:max-h-[460px] object-cover lg:w-[450px]" />
                      </Link>
                      <a href={item.slug || ""} className="absolute bottom-6 lg:bottom-10 right-6 lg:right-10">
                        <div className="group relative z-10 flex w-fit items-center   border-b-0 border-transparent decoration-0 before:h-[1px]    ">
                          <Image src={item.logo} alt={item.projectName} className="h-full w-full object-contain bg-black/50 p-2 lg:p-0 lg:bg-transparent" width={450} height={450} />
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Text + Button Section */}
                  <div className="flex w-full lg:w-1/2 flex-col justify-between bg-[#F2F2F2] p-[20px] lg:py-[40px] lg:pl-[40px] lg:pr-[40px] lg:order1">
                    <Link href={item.slug || ""}>
                    <h2 className="mb-2 text-[25px] leading-[28px] lg:max-w-[330px] lg:leading-[38px] xxl:text-[30px] uppercase">
                      {item.projectName}
                    </h2>
                    </Link>
                    <div>
                      <div className="flex flex-col gap-6 ">
                        <Link href={item.slug || ""}>
                        <h3 className="text-font30 font-normal leading-[1.266666666666667]">{item.title}</h3>
                        </Link>
                        <p className="text-font19 text-gray1 fnt-lexend font-medium leading-[1.473684210526316]">{item.desc}</p>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FeaturedProjectsSlider;
