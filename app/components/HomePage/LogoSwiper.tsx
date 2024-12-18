"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";


const LogoSwiper = () => {
  console.log(logos);
  return (
    <div className="bg-bglight py-5 overflow-hidden">
      <div className="container !overflow-visible">
        <Swiper
          className="!overflow-visible logo-swiper"
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          cssMode={false}
          slidesPerView="auto"
          speed={5000}
          grabCursor={true}
          loopAdditionalSlides={2}
          modules={[Autoplay]}

          simulateTouch={false}
          allowTouchMove={false}
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
                <img src={logo.src} alt={logo.alt} className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoSwiper;
