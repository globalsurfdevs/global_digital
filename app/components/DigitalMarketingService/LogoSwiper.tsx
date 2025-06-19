"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { StaticImageData } from "next/image";

interface LogoSwiperProps {
  src?: string | StaticImageData;
  alt?: string;
}

interface LogoSwiperSectionProps {
  logosdata: LogoSwiperProps[];
  slidesPerView?: number | "auto";
  title1?: string;
}

const LogoSwiper: React.FC<LogoSwiperSectionProps> = ({
  logosdata,
  slidesPerView = "auto",
  title1,
}) => {
  return (
    <div className="overflow-hidden bg-white ">
      <div className="container !overflow-visible">
        <motion.div
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
          {" "}
          <div className="mb-4 mt-6 grid lg:mb-[75px] lg:mt-0">
            {title1 && (
              <h2
                className="title-65"
                dangerouslySetInnerHTML={{ __html: title1 }}
              ></h2>
            )}
          </div>
        </motion.div>
        <div >
        <Swiper
          className="logo-swiper !overflow-visible"
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          cssMode={false}
          slidesPerView={slidesPerView}
          speed={5000}
          grabCursor={true}
          loopAdditionalSlides={2}
          modules={[Autoplay]}
          simulateTouch={false}
          allowTouchMove={false}
          breakpoints={{
            320: {
              spaceBetween: 30,
            },
            768: {
              spaceBetween: 40,
            },
            1024: {
              spaceBetween: 80,
            },
            1366: {
              spaceBetween: 100,
            },
          }}
        >
          {logosdata.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-[5px] bg-[#F2F2F2]">
                <img
                  src={
                    typeof logo.src === "string"
                      ? logo.src
                      : (logo.src?.src ?? "")
                  }
                  alt={logo.alt}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LogoSwiper;
