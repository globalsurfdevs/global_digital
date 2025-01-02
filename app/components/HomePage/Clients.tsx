"use client";

import React, { useRef } from "react";
import { Clientsdata } from "../../data/Clientsdata";
import { Lexend } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

import { motion } from "framer-motion";

const Clients = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col  gap-6 pb-[50px]    lg:gap-[50px] lg:pb-[150px]  ">
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { opacity: 0, y: 50 }, // Start below and invisible
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <h2 className="title-65">Discover Our Success Stories</h2>
        </motion.div> */}
        <div >
          <Swiper
            loop
            speed={3000}
            autoplay={{
              delay: 1,
              disableOnInteraction: true,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="clntsSwpr"
          >
            {Clientsdata.map((itm, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="clngsb">
                    <Image
                      src={itm.image}
                      alt="global"
                      width={250}
                      height={80}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Clients;
