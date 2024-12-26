"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "../../data/testimonials";
import Image from "next/image";
import { Lexend } from "next/font/google";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const TestimonialsSwiper = () => {
  return (
    <div className=" testimonialswiper">
      <Swiper
        spaceBetween={90}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="mb-2  md:mb-4  lg:mb-8">
            <div className={`flex flex-col  ${lexend.className}`}>
              <div className="mb-6 flex   flex-col border-b border-black pt-[20px] lg:mb-[41px] lg:pt-[65px]">
                <Image
                  src={item.image}
                  alt="image"
                  className="mb-4 h-20 w-20 bg-white p-1 lg:mb-[30px]"
                ></Image>
                <h3 className="text-30  mb-[5px]">{item.name}</h3>
                <h5 className="mb-2 flex gap-1 text-font16 leading-lh2p3 text-gray1">
                  {item.position} - <p className="font-bold">{item.company}</p>
                </h5>
                <Image
                  src={item.logo}
                  alt="image"
                  className="mb-5 lg:mb-[26px] "
                ></Image>
              </div>
              <div className=" flex items-center justify-center">
                <p className="text-19 text-[#77787B]">{item.message}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSwiper;
