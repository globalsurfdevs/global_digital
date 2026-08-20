// "use client";
// import { useEffect, useRef, useState } from "react";
// import { industriesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
// import { Swiper, SwiperSlide } from "swiper/react";
// import type { Swiper as SwiperType } from "swiper";
// import { Autoplay, Pagination } from "swiper/modules";
// import Image from "next/image";
// import { ServiceItem } from "@/app/(user)/[slug]/type";
// import { moveUp } from "../animations/motionVariants";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const ButtonSlider = ({ data }: { data: ServiceItem["tenthSection"] }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [containerLeft, setContainerLeft] = useState(0);
//   useEffect(() => {
//     const updateContainerLeft = () => {
//       if (!containerRef.current) return;

//       setContainerLeft(containerRef.current.getBoundingClientRect().left);
//     };

//     updateContainerLeft();

//     window.addEventListener("resize", updateContainerLeft);

//     return () => {
//       window.removeEventListener("resize", updateContainerLeft);
//     };
//   }, []);

//   const loopItem = data.serviceIndustries.length < 7 ? [...data.serviceIndustries, ...data.serviceIndustries] : data.serviceIndustries;
//   return (
//     <div>
//       <div className="container" ref={containerRef}></div>
//       <div
//         style={{ marginLeft: containerLeft }}
//         className="flex flex-wrap items-center gap-6 px-3 xl:gap-10 xxl:gap-20 3xl:gap-[100px]"
//       >
//         {/* Heading */}
//         <div className="w-full shrink-0 sm:w-auto">
//           <div className="flex items-center gap-3">
//             <motion.p
//               initial="hidden"
//               whileInView="show"
//               variants={moveUp(0)}
//               viewport={{ once: true }}
//               className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted"
//             >
//               {data.title}
//             </motion.p>
//             {data.title && <div className="h-4 w-4 bg-primary"></div>}
//           </div>
//         </div>

//         {/* Slider */}
//         <motion.div
//           initial="hidden"
//           whileInView="show"
//           variants={moveUp(0.1)}
//           viewport={{ once: true }}
//           className="flex-1 cursor-grab overflow-hidden"
//         >
//           <Swiper
//             modules={[Autoplay]}
//             slidesPerView="auto"
//             spaceBetween={12}
//             className="!overflow-visible"
//             speed={1000}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             loop
//             breakpoints={{
//               768: {
//                 spaceBetween: 14,
//               },
//               1280: {
//                 spaceBetween: 18,
//               },
//             }}
//           >
//             {loopItem.map((item, index) => {
//               const content = (
//                 <button
//                   className={`${item.page ? "cursor-pointer" : "cursor-default"} flex items-center gap-[14px] whitespace-nowrap rounded-full border border-black/10 px-4 py-2 hover:bg-primary/15 lg:px-6 lg:py-4 xl:px-10 xl:py-[31px]`}
//                 >
//                   <Image
//                     src={item.image}
//                     alt={item.imageAlt}
//                     width={36}
//                     height={36}
//                     className="h-auto w-5 object-contain xl:w-[36px]"
//                   />
//                   <span className="text-28 leading-[1.214285714285714]">
//                     {item.title}
//                   </span>
//                 </button>
//               );

//               return (
//                 <SwiperSlide key={index} className="!w-auto ">
//                   {item.page
//                     ? // <Link href={`/industry/${item.page}`}>{content}</Link>
//                       content
//                     : content}
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ButtonSlider;

"use client";
import { useEffect, useRef, useState } from "react";
import { industriesData } from "@/app/data/services/branding-and-positioning-agency-in-dubai/data";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { ServiceItem } from "@/app/(user)/[slug]/type";
import { moveUp } from "../animations/motionVariants";
import { motion } from "framer-motion";

const ButtonSlider = ({ data }: { data: ServiceItem["tenthSection"] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerLeft, setContainerLeft] = useState(0);

  useEffect(() => {
    const updateContainerLeft = () => {
      if (!containerRef.current) return;
      setContainerLeft(containerRef.current.getBoundingClientRect().left);
    };
    updateContainerLeft();
    window.addEventListener("resize", updateContainerLeft);
    return () => window.removeEventListener("resize", updateContainerLeft);
  }, []);

  const REPEAT = 2;
  const items = data.serviceIndustries;
  const loopItems = Array.from({ length: REPEAT }, () => items).flat();
  const resetThreshold = items.length * (REPEAT - 1);
  return (
    <div>
      <div className="container" ref={containerRef}></div>
      <div
        style={{ marginLeft: containerLeft }}
        className="flex flex-wrap items-center gap-6 px-3 xl:gap-10 xxl:gap-20 3xl:gap-[100px]"
      >
        {/* Heading */}
        <div className="w-full shrink-0 sm:w-auto">
          <div className="flex items-center gap-3">
            <motion.p
              initial="hidden"
              whileInView="show"
              variants={moveUp(0)}
              viewport={{ once: true }}
              className="text-18 uppercase leading-[1] tracking-[-0.025em] text-muted"
            >
              {data.title}
            </motion.p>
            {data.title && <div className="h-4 w-4 bg-primary"></div>}
          </div>
        </div>

        {/* Slider */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={moveUp(0.1)}
          viewport={{ once: true }}
          className="flex-1 cursor-grab overflow-hidden"
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={12}
            speed={1000}
            roundLengths
            loop={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              stopOnLastSlide: false, // don't let Swiper's default "stop at end" kick in
            }}
            breakpoints={{
              768: { spaceBetween: 14 },
              1280: { spaceBetween: 18 },
            }}
            onSlideChangeTransitionEnd={(swiper) => {
              if (swiper.activeIndex >= resetThreshold) {
                swiper.slideTo(swiper.activeIndex - resetThreshold, 0, false);
                swiper.autoplay?.start();
              }
            }}
          >
            {loopItems.map((item, index) => {
              const content = (
                <button
                  type="button"
                  className={`${
                    item.page ? "cursor-pointer" : "cursor-default"
                  } flex items-center gap-[14px] whitespace-nowrap rounded-full border border-black/10 px-4 py-2 hover:bg-primary/15 lg:px-6 lg:py-4 xl:px-10 xl:py-[31px]`}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={36}
                    height={36}
                    className="h-auto w-5 object-contain xl:w-[36px]"
                  />
                  <span className="text-28 leading-[1.214285714285714]">
                    {item.title}
                  </span>
                </button>
              );

              return (
                <SwiperSlide key={index} className="!w-auto">
                  {content}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default ButtonSlider;
