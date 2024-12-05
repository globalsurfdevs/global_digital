"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { workSvgs } from "../data/works";

const WorkSwiper = () => {
  console.log(logos);
  return (
    <div className="">
      <Swiper
        className="!overflow-visible"
        modules={[Autoplay]}
        speed={2000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Pause on hover
        }}
        spaceBetween={50}
        slidesPerView={1}
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
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: "130",
          },
        }}>
        {workSvgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center flex-col gap-4 group ">
              <div className="bg-white p-2 w-fit group-hover:bg-primary ease-linear duration-200 ">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 group-hover:brightness-0 group-hover:invert ease-linear duration-200" />
              </div>
              <h3 className="text-font30 leading-lh1p33 mt-[22]">{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;
