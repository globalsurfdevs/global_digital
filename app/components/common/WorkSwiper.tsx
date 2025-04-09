"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { workSvgs } from "../../data/services/wdd-custom-web-development/data";

const WorkSwiper = () => {
  return (
    <div className="mnic">
      <Swiper
        className="!overflow-visible"
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        freeMode={true}
        speed={5000} // Slide transition duration (500ms)
        slidesPerView="auto"
        loop={true} // Enable infinite looping
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          400: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
          1600: { slidesPerView: 4.6, spaceBetween: 60 },
        }}
      >
        {workSvgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="home-st   ">
              <div className=" me-1 flex min-h-[30px] w-fit min-w-[30px] items-center justify-center bg-primary duration-200 ease-linear   lg:me-2 lg:min-h-[50px] lg:min-w-[50px]">
                <img
                  src={item.icon}
                  alt={item.text}
                  width={item.width}
                  height={item.height}
                  className="w-[18px] duration-200 ease-linear   lg:w-auto brightness-[0] invert-[1]"
                />
              </div>
              <h3 className="textslide-30 pt-4 md:pt-7 ">{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;
