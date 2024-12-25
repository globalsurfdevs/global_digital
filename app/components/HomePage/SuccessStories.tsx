"use client"

import React, { useRef } from "react";
import { stories } from "../../data/stories";
import {Lexend} from "next/font/google";


import { motion } from 'framer-motion';
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

const SuccessStories = () => {

const ref = useRef(null)






// useEffect(() => {
//   if (isInView) {
//     const startAnimations = () => {
//       stories.forEach((story, index) => {
//         animate(
//           0,
//           story.count,
//           {
//             duration: 2, // Duration in seconds
//             onUpdate: (value) => {
//               setAnimatedValues((prev) => {
//                 const updated = [...prev];
//                 updated[index] = Math.round(value); // Update with rounded value
//                 return updated;
//               });
//             },
//           }
//         );
//       });
//     };

//     startAnimations();
//   }
// }, [isInView]);


  return (
    <div className="container px-4 mx-auto">

      <div className="pt-6 lg:pt-[70px]  pb-[50px] lg:pb-[150px]  flex flex-col gap-6 lg:gap-[50px]">
      <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
          <h2 className="title-65">Discover Our Success Stories</h2>

        </motion.div>
        <motion.div
          initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                  variants={{
                    hidden: { opacity: 0, y: 50 }, // Start below and invisible
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                  }}
        >
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {stories.map((item, index) => (
            <div className="bg-black   group text-white hover:cursor-pointer ease-linear duration-300" key={index} ref={ref}>
              <div className="bg-gray2 py-6 lg:py-12  flex flex-col gap-5 justify-center px-8 md:px-12 group-hover:bg-primary ease-in-out duration-300">
                <div className="relative h-full flex flex-col justify-between">
                  <h3 className="text-font30 leading-lh1p66 mb-[14px]">{item.title1}</h3>
                  <h3 className="text-white text-font65 leading-lh0p76 mb-[28px]">
                    {/* {index == 0 ? <span>&#8595;</span> : <span>&#8593;</span>}
                    {animatedValues[index] + "%"} */}
                    {item.count}
                  </h3>
                  <h3 className={`text-font25 w-3/4 leading-lh1p4 ${lexend.className}`}>{item.description1}</h3>
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 ease-in-out duration-500">
                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.8125 1.7998L1.25977 33.7227" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                      <path d="M1.25977 1.7998H33.8125V33.0929" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-white flex flex-col justify-center gap-8 py-12  px-8 md:px-12">
                <h3 className="text-font30 leading-lh1p26">{item.title2}</h3>
                <p className={`text-font19 leading-lh1p4 ${lexend.className}`}>{item.description2}</p>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
        </div>
    </div>
  );
};

export default SuccessStories;
