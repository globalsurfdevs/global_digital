"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

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
      <div>
        <div className="bg-dgray pt-[50px] xs:pt-10 lg:pt-14   xl:pt-[109px]">
          <div className="container mx-auto px-4 text-white">
            <div className="flex flex-col">
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
                <div className="flex h-1/2  flex-col justify-center    ">
                  <h2 className="mb-[10px] text-font65 leading-lh1p07 text-black lg:mb-[10px]">
                    Get on the GS Talent Radar.
                  </h2>
                  <div className="text-19 max-w-[100ch] text-black">
                    <p>
                      You think you might be a good fit for LOOP? Send us your
                      LinkedIn or Xing profile with just one click. If we have a
                      position that we think you're perfect for, we'll reach out
                      to you.
                    </p>
                  </div>
                  <div className="innerfnont mb-10 mt-10  lg:mb-[120px] lg:mt-[57px]">
                    <Link href="lets-talk">
                      <button className=" flex gap-5 items-center justify-between uppercase text-black text-30 w-fit rounded-full border border-primary
                      py-3 leading-lh1p66 transition-all duration-300 ease-in      hover:shadow-lg w-[220px] px-[25px]  lg:w-[413px] lg:px-[50px]">
                        <svg
                          width="32"
                          height="30"
                          viewBox="0 0 32 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1154_569)">
                            <path
                              d="M31.392 18.39V30H24.66V19.17C24.66 16.452 23.688 14.592 21.252 14.592C19.392 14.592 18.288 15.84 17.802 17.052C17.622 17.484 17.58 18.084 17.58 18.69V29.994H10.848C10.848 29.994 10.938 11.652 10.848 9.75H17.58V12.618C17.58 12.618 17.55 12.66 17.538 12.684H17.58V12.618C18.474 11.244 20.07 9.276 23.646 9.276C28.074 9.276 31.392 12.168 31.392 18.384V18.39ZM3.81 0C1.506 0 0 1.512 0 3.498C0 5.484 1.464 6.996 3.72 6.996H3.762C6.108 6.996 7.566 5.442 7.566 3.498C7.524 1.512 6.108 0 3.804 0H3.81ZM0.402 30H7.128V9.756H0.402V30Z"
                              fill="#E63E31"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1154_569">
                              <rect width="31.392" height="30" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Linkedin
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
