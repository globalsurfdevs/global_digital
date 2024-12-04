"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { logos } from '@/public/assets/assets';
import { workSvgs } from '../data/works';


const WorkSwiper = () => {
    console.log(logos)
  return (
    <div className="">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}>
        {workSvgs.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center flex-col gap-4 group ">
              <div className="bg-white p-2 w-fit group-hover:bg-primary ease-linear duration-200 ">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 group-hover:brightness-0 group-hover:invert ease-linear duration-200" />
              </div>
              <h3 className='text-font30 leading-lh1p33 mt-[22]'>{item.text}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WorkSwiper