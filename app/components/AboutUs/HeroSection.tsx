"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto py-4">
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

          <div className="pb-[50px] lg:pb-[141px]  pt-[20px] sm:pt-[50px] lg:pt-[130px] flex flex-col gap-4 lg:gap-[30px]">
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
                  
                 <nav className="mb-6 text-[20px] uppercase text-[#77787B] lg:mb-8">
                                        <ul className="flex items-center space-x-2"> 
                                            <React.Fragment >
                                              <li>
                                                
                                                  <Link
                                                    href="/"
                                                    className="hover:underline text-[#77787B] text-[10px] sm:text-font14 lg:text-font19"
                                                  >
                                                    HOME
                                                  </Link>
                                                  </li> 
                                                  <li>
                                                    <Image
                                                      src="../images/ecom-industry/bc-arrow.png" // Replace with the actual path to your arrow image
                                                      alt="Arrow"
                                                      width={7} // Adjust width as needed
                                                      height={12} // Adjust height as needed
                                                      className="relative top-[3px] lg:top-0"
                                                    />
                                                  </li> 
                                                  <li>
                                               
                                                  <span className="hover:underline text-[10px] sm:text-font14 lg:text-font19">
                                                   About Us
                                                  </span>
                                             
                                              </li> 
                                                
                                            </React.Fragment>
                                         
                                        </ul>
                                      </nav>
                <h1 className="title-80 mb-3 lg:mb-5">
                Master Every Pixel of Your Digital Presence
                </h1>
              </div>
              <div>
                <p className="text-small-30 text-gray1 max-w-[48ch]">
                Creative that’s sharp, strategy that’s smarter, we craft digital experiences where every pixel drives purpose and every design amplifies your brand’s impact.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;
