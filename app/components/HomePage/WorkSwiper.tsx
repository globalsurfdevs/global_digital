"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { logos } from "@/public/assets/assets";
import { workSvgs } from "../../data/works";

const WorkSwiper = () => {
  console.log(logos);
  return (
    <div className="mnic">
      <Swiper
        className="!overflow-visible"
        modules={[Autoplay]}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Pause on hover
        }}

        slidesPerView="auto"
        loop={true}
        freeMode={true}
        loopAdditionalSlides={2}
        simulateTouch={false}
        allowTouchMove={false}
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
            <div className="flex justify-center items-center    group ">
              <div>
              <div className="bg-white me-2  w-fit   ease-linear duration-200 ">
                <img src={item.icon} alt={item.alt} width={item.width} height={item.height} className="   ease-linear duration-200" />
              </div>
              </div>
              <h3 className="text-font30 leading-lh1p33">{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSwiper;
