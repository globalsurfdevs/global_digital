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
                <div className="flex">
                  {/* Text + Button Section */}
                  <div className="flex w-1/2 flex-col justify-between bg-[#F2F2F2] p-[20px] lg:py-[40px] lg:pl-[40px] lg:pr-[40px]">
                    <h2 className="mb-2 text-[25px] leading-[28px] lg:max-w-[330px] lg:leading-[38px] xxl:text-[30px]">
                      {item.title}
                    </h2>
                    <a
                      href={item.btnurl || ""}
                      className="group relative z-10 flex w-fit items-center gap-3 border-b-0 border-transparent pb-3 
      before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 
      before:ease-in-out after:absolute after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 
      after:ease-in-out hover:border-b-white hover:after:w-0"
                    >
                      <p className="text-sm font-medium duration-200 ease-in-out group-hover:text-primary md:text-[16px]">
                        {item.btntext}
                      </p>
                      <svg
                        width="10"
                        height="10"
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
                            className="group-hover:stroke-black"
                          />
                          <path
                            d="M0.699219 1.2749H18.7892V18.6649"
                            stroke="#E53F30"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            className="group-hover:stroke-black"
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
                    </a>
                  </div>

                  {/* Image Section */}
                  <div className="w-1/2">
                    <div className="h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="h-full w-[400px] object-cover lg:w-[450px]"
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
