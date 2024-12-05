"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";


const LogoSwiper = () => {
  console.log(logos);
  return (
    <div className="bg-bglight py-3 overflow-hidden">
      <div className="container !overflow-visible">
        <Swiper
          className="!overflow-visible logo-swiper"
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView="auto"
          centeredSlides={false}
          speed={3000} // Smooth transition speed
          autoplay={{
            delay: 0, // No delay between slides
            disableOnInteraction: false,
            reverseDirection: false, // Slide in one direction
            stopOnLastSlide: false, // Continuous scrolling
          }}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          simulateTouch={false}
          allowTouchMove={false}
          watchSlidesProgress={true}
          breakpoints={{
            320: {
              spaceBetween: 10,
            },
            768: {
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 30,
            },
            1366:{
              spaceBetween:80,
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
