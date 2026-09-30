"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";

const images = [
  {
    src: "../../assets/social-media-marketing/clients/s-1.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-2.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-3.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-4.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-5.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-6.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-7.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-8.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-9.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-10.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-11.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-12.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-13.jpg",

    subTxt: "Social Media Post",
  },
  {
    src: "../../assets/social-media-marketing/clients/s-14.jpg",

    subTxt: "Social Media Post",
  },
];

const Ourworks = () => {
  return (
    <div className="flex flex-col  py-[50px] lg:pb-[80px] lg:pt-[110px]">
      <div className="container  mx-auto  ">
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
          <h2 className="title-65 mb-5 md:mb-[35px]">Our Works</h2>
        </motion.div>
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
          <div>
            <Swiper
              simulateTouch={false}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              initialSlide={0}
              spaceBetween={25}
              breakpoints={{
                // when window width is >= 480px
                480: {
                  slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 3,
                },
                // when window width is >= 1280px
                1280: {
                  slidesPerView: 4,
                },
              }}
              modules={[Autoplay, Navigation]}
              className="custom-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className={`custom-swiper-slide `}>
                  <div className="custom-slide">
                    <img
                      src={image.src}
                      alt={`Slide ${index}`}
                      className="custom-image"
                    />
                    {/* <h3 className="text-30 mt-5">{image.text}</h3> */}
                    {/* <p className="custom-para">{image.subTxt}</p> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ourworks;
