"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";


import { allDataWebdesign1 } from "../../data/services/portfolio1";

import { allDataWebdesig2 } from "../../data/services/portfolio2";

import Image from "next/image";
const Ourportfolio = () => {
  const allData1 = allDataWebdesign1
  const allData2 = allDataWebdesig2
  return (
    <div className="flex flex-col  py-[50px] lg:pt-[110px] lg:pb-[80px]">
      <div className="container  mx-auto  ">
         <motion.div
                            initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                                    variants={{
                                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                                    }}
                          >
                      <h2 className='title-65 mb-5 md:mb-[35px]'>Crafting Dreams,<br className="hidden md:block "></br>
                      Check Out Our Portfolio</h2>
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


centeredSlides={true}
// centeredSlidesBounds={true}
// simulateTouch={false}
loop={true}

// speed={1800}
autoplay={false}
navigation={{
  prevEl: ".prev",
  nextEl: ".next",
}}

breakpoints={{
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },

  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  992: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
}}


modules={[Autoplay, Navigation]}
className="mySwiper sslide"
>
{allData1.map((itm, index) => {
  return (
<SwiperSlide key={index}>

  <div className="" >
    <div className="ovefls">
      <Image className="ftr rounded-[20px] " src={itm.image} alt={itm.title} width={900} height={600}/>
    </div>

    <div className="p-5">
       <Image  src={itm.iconsimage} alt={itm.title}  width={itm.iconswidth} height={itm.iconsheight}/>

    </div>
  </div>

</SwiperSlide>
)
  })}

</Swiper>
          </div>
          <div >
                <Swiper


centeredSlides={true}
// centeredSlidesBounds={true}
// simulateTouch={false}
loop={true}

// speed={1800}
autoplay={false}
navigation={{
  prevEl: ".prev",
  nextEl: ".next",
}}

breakpoints={{
  0: {
    slidesPerView: 1,
    spaceBetween: 10,
  },

  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  992: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
}}


modules={[Autoplay, Navigation]}
className="mySwiper sslide"
                >
                  {allData2.map((itm, index) => {
                    return (
                  <SwiperSlide key={index}>

                    <div className="" >
                      <div className="ovefls">
                        <Image className="ftr rounded-[20px]" src={itm.image} alt={itm.title} width={900} height={600}/>
                      </div>

                      <div className="p-5">
                        {/* <h3>{itm.title} </h3> */}
                        {/* <p className="mb-0">{itm.title}</p> */}
                        <Image  src={itm.iconsimage} alt={itm.title} width={itm.iconswidth} height={itm.iconsheight}/>
                      </div>
                    </div>

                  </SwiperSlide>
                  )
                    })}

                </Swiper>
              </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ourportfolio;