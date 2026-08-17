"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";

const images = [

  {
    // src: assets.realestate1,
    src: "/assets/industry_icons/1.svg",
    title: "Construction",
    desc: "Digital credibility and qualified project enquiry generation for contractors, developers, and EPC firms. ",
    link: "/industry/construction",
  },
  {
    // src: assets.b2b1,
    src: "/assets/industry_icons/2.svg",
    title: "Engineering and infrastructure",
    desc: "B2B SEO, thought leadership content, and LinkedIn presence for engineering consultancies that need to be visible and credible.",
    link: "/industry/b2b-digital-marketing-services",
  },
  {
    // src: assets.real1,
    src: "/assets/industry_icons/3.svg",
    title: "Real estate and property development",
    desc: "Full lifecycle digital marketing for UAE property developers, from project launch brand building through to buyer acquisition campaigns. ",
    link: "",
  },

  {
    // src: assets.profserv1,
    src: "/assets/industry_icons/4.svg",
    title: "Industrial ",
    desc: "Supplier discovery SEO, LinkedIn Ads, and technical content for industrial equipment and services firms. ",
    link: "",
  },
  {
    // src: assets.ecommerce1,
    src: "/assets/industry_icons/5.svg",
    title: "Manufacturing ",
    desc: "B2B lead generation, export market visibility, and direct-to-consumer channel support for UAE and GCC manufacturers. ",
    link: "/industry/ecommerce-digital-marketing",
  },
  {
    // src: assets.hospitality1,
    src: "/assets/industry_icons/6.svg",
    title: "Lifestyle and retail",
    desc: "Performance marketing, social media, and brand strategy for UAE consumer brands across fashion, retail, and lifestyle categories. ",
    link: "/industry/digital-marketing-agency-for-hospitality",
  },
  {
    // src: assets.education1,
    src: "/assets/industry_icons/7.svg",
    title: "Education",
    desc: "Digital marketing for UAE universities, schools, and training providers, focused on brand visibility and student recruitment. ",
    link: "",
  },
  // {
  //   src: assets.hospitality1,
  //   title: "Hospitality",
  //   desc: "Enhancing brand visibility and direct booking demand for hotels, resorts, and hospitality groups with precision social, SEO, and performance ads that cut through Dubai's crowded tourism market.",
  //   link: "/industry/digital-marketing-agency-for-hospitality",
  // },
  // {
  //   src: assets.healthcare1,
  //   title: "Healthcare",
  //   desc: "Strengthening patient acquisition and digital trust for providers with compliant, credibility-focused strategies that drive enquiries while navigating strict regulations.",
  //   link: "",
  // }
];

const IndustriesweWork = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex flex-col  py-[50px] lg:pb-[140px] lg:pt-[140px] bg-gray-100">
      <div className="  ">
        <motion.div
          className="container  mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { y: 50 }, // Start below and invisible
            visible: {
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <h2 className="title-65 mb-5 md:mb-5">Industries we work with</h2>
          <p className="text-font25 leading-[1.4] max-w-[70ch] mb-5 lg:mb-[58px]">We partner with businesses across Dubai and the wider UAE to deliver digital solutions that align with real-world commercial challenges and growth goals. Our strategies are built around each sector's audience behaviour, competitive context, and market dynamics.</p>
        </motion.div>
        <motion.div
          className="ps-4 pe-4 lg:pe-0 container lg:!max-w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
          variants={{
            hidden: { y: 50 }, // Start below and invisible
            visible: {
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          <div
            onMouseEnter={() => swiperRef.current?.autoplay.pause()}
            onMouseLeave={() => swiperRef.current?.autoplay.resume()}
          >
            <Swiper
              // simulateTouch={false}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
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
                992: {
                  slidesPerView: 3.4,
                },
                // when window width is >= 1280px
                1680: {
                  slidesPerView: 4.4,
                },
              }}
              modules={[Autoplay, Navigation]}
              className="custom-swiper"
            >
              {images.map((image, index) => {
                const card = (
                  <div
                    className="group flex h-[300px] flex-col justify-between gap-3 border p-5 transition-all duration-500 hover:bg-primary lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                  >
                    {/* Image Wrapper */}
                    <div className="align-center flex h-[30px] w-[30px] justify-center bg-white p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                      <Image
                        src={image.src}
                        alt={`Slide ${index}`}
                        width={54}
                        height={34}
                        loading="lazy"
                        className="transition duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      {/* Title */}
                      <h3 className="text-30 titlesp transition-colors duration-300 group-hover:text-white">
                        {image.title}
                      </h3>

                      <div className="overflow-hidden">
                        <p className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100">
                          {image.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                return (
                  <SwiperSlide key={index} className={`custom-swiper-slide `}>
                    <div className="custom-slide">
                      {image.link ? (
                        <Link href={image.link} className="block">
                          {card}
                        </Link>
                      ) : (
                        card
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IndustriesweWork;
