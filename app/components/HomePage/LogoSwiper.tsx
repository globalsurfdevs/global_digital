"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { logos } from "@/public/assets/assets";
import "swiper/css";
import Image from "next/image";


const LogoSwiper = () => {
  return (
      <div className="bg-white py-5 overflow-hidden">
      <div className="container !overflow-visible">
        <Swiper
          className="!overflow-visible logo-swiper"
          loop={true}
          // freeMode={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          // cssMode={false}
          slidesPerView="auto"
          speed={5000}
          // grabCursor={true}
          // loopAdditionalSlides={2}
          modules={[Autoplay]}

          // simulateTouch={false}
          // allowTouchMove={false}
          // watchSlidesProgress={true}
          breakpoints={{
            320: {
              spaceBetween: 30,
            },
            768: {
              spaceBetween: 40,
            },
            1024: {
              spaceBetween: 50,
            },
            1366: {
              spaceBetween: 80,
            }
          }}>
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <Image width={100} height={100} src={logo.src} loading="lazy" alt={logo.alt} className="object-contain h-[40px] w-auto" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoSwiper;
