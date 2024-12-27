"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import SocialMediabg from "@/app/components/Careers/SocialMediabg";

const page = () => {
  return (
    <div>
      {/* component1 section1*/}
      <div>
        <div className="container mx-auto py-2">
          <div>
            <motion.div
              className="title-80"
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
              <div className="flex items-end justify-between border-b pb-10 pt-[20px] sm:pt-[50px] lg:pt-[130px]">
                <div className="  max-w-[1000px] ">
                  <h1 className="title-80">Careers</h1>
                </div>
              </div>
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
                  transition: { duration: 1.3, ease: "easeOut" },
                }, // Slide up and fade in
              }}
            >
              <div className="pb-[50px] pt-[50px] lg:pb-[142px] lg:pt-[138px] ">
                <h2 className="title-65 mb-[10px] lg:mb-[30px]">
                  Dominate the Digital Landscape 
                </h2>
                <div className="text-30 text-gray1">
                  <p>
                    Subheading: Bridging Creativity and Strategy to Enhance Your
                    Brand's Digital Potential 
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* component3 section3*/}
      <div>
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
          <SocialMediabg />
        </motion.div>
      </div>
      <div>
        <div className="container mx-auto py-2">
          <div>
            <motion.div
              className="title-80"
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
              <div className="  pb-[50px] pt-[50px]  lg:pb-[150px] lg:pt-[140px]">
                <div className="   ">
                  <h2 className="title-65 pb-[15px] lg:pb-[38px]">
                    Available Positions
                  </h2>
                </div>
                <div>
                  <div className="group flex   items-center justify-between border border-l-0 border-r-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform  duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Sales Specialist- Web and Digital Services</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Marketing Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="group flex items-center justify-between border border-l-0 border-r-0 border-t-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform   duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Digital Marketing Guru</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Digital Marketing Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between border border-l-0 border-r-0 border-t-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform   duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Content Wave Rider</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Content Writing Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between border border-l-0 border-r-0 border-t-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform   duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Surfing SEO Specialist</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Digital Marketing Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between border border-l-0 border-r-0 border-t-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform   duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Social Media Maverick</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Digital Marketing Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between border border-l-0 border-r-0 border-t-0 transition-all duration-300 hover:bg-black">
                    <div className="pb-[38px] pt-[41px] transition-transform   duration-300 group-hover:translate-x-[30px]">
                      <div className="text-30 leading-[1.5] transition-colors duration-300 group-hover:text-primary">
                        <p>Design Tide Turner</p>
                      </div>
                      <div className="text-19 leading-[1.5] text-gray1 transition-colors duration-300 group-hover:text-primary">
                        <p>Design Team</p>
                      </div>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-[-30px]">
                      <svg
                        width="36"
                        height="35"
                        viewBox="0 0 36 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path
                          d="M33.8105 1.7998L1.25781 33.7227"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M1.25781 1.7998H33.8105V33.0929"
                          stroke="#E63E31"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* component section 4 */}
    </div>
  );
};

export default page;
