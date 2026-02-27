"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const images = [
  
  {
    src: "../../assets/works/realestate.svg",

    title: "Construction",
    desc: "Helping contractors, developers and EPC firms capture qualified project enquiries and strengthen visibility during procurement and tender evaluation stages.",
  },
  {
    src: "../../assets/works/real.svg",

    title: "Real Estate",
    desc: "Empowering developers and property brands with digital strategies that improve buyer quality, project visibility, and sales conversion performance.",
  },
  {
    src: "../../assets/works/b2b.svg",

    title: "B2B & Industrial",
    desc: "Enabling manufacturers and industrial firms to attract decision-makers, improve lead qualification, and support high-value contract acquisition.",
  },
  {
    src: "../../assets/works/profserv.svg",

    title: "Corporate & Professional Services",
    desc: "Strengthening authority for consulting, legal, and advisory firms through credibility-driven digital presence and thought leadership.",
  },
  {
    src: "../../assets/works/ecommerce.svg",

      title: "E-Commerce",
    desc: "Driving scalable traffic, higher AOV, and revenue growth for online retailers through performance media, CRO, and data-led strategies optimized for UAE's competitive retail landscape.",
  },  
  {
    src: "../../assets/works/education.svg",

      title: "Education",
    desc: "Helping institutions improve programme visibility, attract qualified applicants, and strengthen credibility among prospective students and parents.",
  }, 
  {
    src: "../../assets/works/hospitality.svg",

      title: "Hospitality",
    desc: "Enhancing brand visibility and direct booking demand for hotels, resorts, and hospitality groups with precision social, SEO, and performance ads that cut through Dubai's crowded tourism market.",
  }, 
  {
    src: "../../assets/works/healthcare.svg",

      title: "Healthcare",
    desc: "Strengthening patient acquisition and digital trust for providers with compliant, credibility-focused strategies that drive enquiries while navigating strict regulations.",
  }
];

const IndustriesweWork = () => {
  return (
    <div className="flex flex-col  py-[50px] lg:pb-[140px] lg:pt-[140px] bg-gray-100">
      <div className="  ">
        <motion.div
        className="container  mx-auto"
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
          <h2 className="title-65 mb-5 md:mb-5">Industries We Work With</h2>
          <p className="text-font25 leading-[1.4] max-w-[70ch] mb-5 lg:mb-[58px]">We partner with businesses across diverse industries to deliver digital solutions that align with real-world challenges and growth goals. Our strategies are tailored to each sector’s audience behavior, competition, and market dynamics.</p>
        </motion.div>
        <motion.div
        className="ps-4 pe-4 lg:pe-0 container lg:!max-w-full" 
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
              // simulateTouch={false}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 2500,
                // disableOnInteraction: true,
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
              {images.map((image, index) => (
                <SwiperSlide key={index} className={`custom-swiper-slide `}>
                  <div className="custom-slide">
                     

                    <div
                                            key={index}
                                            className="group flex flex-col justify-between gap-3 border p-5 transition-all duration-500 hover:bg-primary h-[300px]  lg:h-[340px] lg:gap-0 lg:p-10 xl:h-[414px]"
                                          >
                                            {/* Image Wrapper */}
                                            <div className="align-center flex h-[30px] w-[30px] justify-center bg-white p-2 transition-colors duration-500 group-hover:bg-white md:h-[50px] md:w-[50px]">
                                              
                                               <Image   src={image.src}   alt={`Slide ${index}`} width= {54} height={34}
                                                                            className="  transition duration-500 "
                                                                          />
                                            </div>
                    
                                            {/* Content */}
                                            <div>
                                              {/* Title */}
                                              <h3 className="text-30  titlesp transition-colors duration-300 group-hover:text-white">
                                                {image.title}
                                              </h3>
                    
                                              <div className=" overflow-hidden">
                                                <p
                                                  className="text-19 fnt-lexend cntsmd hided-content max-h-0 w-[102%] overflow-hidden pt-2 text-white
                                                    opacity-0 transition-all duration-500 group-hover:max-h-[15rem] group-hover:opacity-100"
                                                >
                                                  {image.desc}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
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

export default IndustriesweWork;
