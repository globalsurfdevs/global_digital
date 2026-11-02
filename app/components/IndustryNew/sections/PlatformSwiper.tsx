"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { StaticImageData } from "next/image";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

interface PlatformsItem {
  id: number;
  image: string | StaticImageData;
  title: string;
  btntext: string;
  btnurl?: string;
  subtext?: string;
}

interface PlatformsSectionProps {
  Clientsformsdata: PlatformsItem[];
}

const PlatformSwiper: React.FC<PlatformsSectionProps> = ({
  Clientsformsdata,
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
      <div className="container" ref={nextContainerRef}></div>
      <div
        style={{ width: isSmallScreen ? "" : divWidth }}
        className={`${isSmallScreen ? "container mx-auto py-10" : ""} ml-auto`}
      >
        <div className="flex w-full flex-col lg:flex-row">
          <Swiper
            className="w-full"
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            freeMode={true}
            slidesPerView="auto"
            centeredSlides={false}
            speed={3000}
            grabCursor={true}
            modules={[Autoplay]}
            breakpoints={{
              320: { spaceBetween: 30, slidesPerView: 1 },
              768: { spaceBetween: 70, slidesPerView: 1 },
              1024: { spaceBetween: 80 },
              1366: { spaceBetween: 30, slidesPerView: 2.2 },
            }}
          >
            {Clientsformsdata.map((item) => (
              <SwiperSlide key={item.id} className=" border border-black/10 rounded-[10px]">
                <div className="flex">
                  {/* Text + Button Section */}
                  <div className="flex w-1/2 flex-col justify-between bg-white p-[20px] lg:py-[40px] lg:pl-[40px] lg:pr-[40px] rounded-[10px]">
                    <div>
                      <h3 className="mb-2 text-[25px] leading-[28px] lg:max-w-[330px] lg:leading-[38px] xxl:text-[30px]">
                        {item.title}
                      </h3>
                      <p className="fnt-lexend text-19  text-gray1 ">
                        {item.subtext}
                      </p>
                    </div>
                    <Link
                        href={item.btnurl ?? ""}
                        className="group flex h-fit w-fit items-center space-x-2 rounded-full border border-primary px-[25px] py-[15px] text-black transition duration-300 ease-in mt-[40px] hover:text-white hover:bg-black"
                    >
                        <span className="text-font16 uppercase duration-300 ease-in group-hover:text-white">
                            {item.btntext}
                        </span>
                        <div className="bg-primary p-1">
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:scale-105"
                            >
                                <g clipPath="url(#clip0_65_39)">
                                    <path
                                        d="M8.88346 1.26172L1.13281 8.8624"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                    ></path>
                                    <path
                                        d="M1.13281 1.26172H8.88346V8.71245"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_65_39">
                                        <rect width="10" height="10" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </Link>
                  </div>

                  {/* Image Section */}
                  <div className="w-1/2">
                    <div className="h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={450}
                        height={450}
                        className="h-full w-[400px] object-cover lg:w-[450px] rounded-r-[10px]"
                      />
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

export default PlatformSwiper;
