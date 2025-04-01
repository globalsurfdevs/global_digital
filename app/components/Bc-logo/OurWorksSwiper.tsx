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
  btntext?: string;
  btnurl?: string;
  desc?: string;
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
      <div
        ref={nextContainerRef}
        className="absolute left-0 right-0 w-full"
      ></div>

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
              1366: { spaceBetween: 20, slidesPerView: 4.2 },
            }}
          >
            {Clientsformsdata.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group flex flex-col items-start border-b-[1px] pb-3 text-left  lg:pb-[30px]">
                  <Image src={item.image} alt={item.title} className="w-full" />
                  <div className="mt-3 flex w-full items-center lg:mt-[30px]">
                    <div className="w-full">
                      {" "}
                      {/* Ensure full width */}
                      <h2 className="mb-2 text-[25px] lg:text-[30px]">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 transition-colors duration-300 group-hover:text-primary">
                        {item.desc}
                      </p>
                    </div>
                    {/* <div className="mt-2 flex justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="transition-colors duration-300 group-hover:stroke-primary"
                      >
                        <g id="Layer_1" clip-path="url(#clip0_39_343)">
                          <path
                            id="Vector"
                            d="M24.4082 2.18359L1.15625 24.9856"
                            stroke="#77787B"
                            stroke-width="2"
                            stroke-miterlimit="10"
                          />
                          <path
                            id="Vector_2"
                            d="M1.15625 2.18359H24.4082V24.5358"
                            stroke="#77787B"
                            stroke-width="2"
                            stroke-miterlimit="10"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_39_343">
                            <rect
                              width="25.437"
                              height="25"
                              fill="white"
                              transform="translate(0.257812 0.898438)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* <div className="container">
        <div className="border-t border-[#B6B2B2] lg:mt-[141px]"></div>
      </div> */}
    </>
  );
};

export default PlatformSwiper;
