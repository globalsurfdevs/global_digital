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
  industry: string;
  country?: string;
  btnurl?: string;
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
        className={`${isSmallScreen ? "container mx-auto py-10" : ""} custom-class ml-auto`}
      >
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
            breakpoints={{
              320: { spaceBetween: 30, slidesPerView: 1 },
              768: { spaceBetween: 70, slidesPerView: 1 },
              1024: { spaceBetween: 80 },
              1366: { spaceBetween: 30, slidesPerView: 2.2 },
            }}
          >
            {Clientsformsdata.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex group" >
                  {/* Text + Button Section */}
                  <div className="flex w-1/2 flex-col justify-between bg-[#F2F2F2] p-[20px] lg:py-[40px] lg:pl-[40px] lg:pr-[40px]">
                    <h2 className="mb-2 text-[25px] leading-[28px] lg:max-w-[330px] lg:leading-[38px] xxl:text-[30px] uppercase fnt-lexend">
                      {item.title}
                    </h2>

                    <div>
                      <div  className="border-b border-[#E5E5E5] pb-4 mb-4 ">
                        <p className="text-[12px] text-[#77787B] uppercase fnt-lexend">INDUSTRY</p>
                        <p className="text-[16px] fnt-lexend">{item.industry}</p>
                      </div>

                      <div  className=" ">
                        <p className="text-[12px] text-[#77787B] uppercase fnt-lexend">Country</p>
                        <p className="text-[12px] text-[#77787B] uppercase fnt-lexend">Country</p>
                        <p className="text-[16px] ">{item.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="w-1/2">
                    <div className="h-full ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover lg:w-[450px]"
                      />
  {/* <a href={item.btnurl || ""}
                      className="absolute opacity-0 group-hover:opacity-[1] bottom-8 right-8 w-[50px] h-[50px] bg-[#5a5656]  rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <div
                      className="group relative z-10 flex w-fit items-center   border-b-0 border-transparent    decoration-0 before:h-[1px]    ">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="duration-200 ease-in-out group-hover:scale-125"
                      >
                        <g clipPath="url(#clip0_65_58)">
                          <path
                            d="M18.7892 1.2749L0.699219 19.0149"
                            stroke="#E53F30"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            className="group-hover:stroke-primary"
                          />
                          <path
                            d="M0.699219 1.2749H18.7892V18.6649"
                            stroke="#E53F30"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            className="group-hover:stroke-primary"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_65_58">
                            <rect
                              width="19.79"
                              height="19.45"
                              fill="white"
                              transform="translate(0 0.274902)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                        </div>
                      </a> */}
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
