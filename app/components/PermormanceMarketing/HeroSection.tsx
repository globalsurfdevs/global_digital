"use client"
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from "react"

import PerformanceSwiper from '../PermormanceMarketing/PerformanceSwiper'
import {Lexend} from "next/font/google";
const lexend = Lexend({subsets: ['latin'] ,weight:["300","400","500","600","700"] });

interface Employee {
  id: number;
  name: string;
  designation: string;
  width: string;
  height: string;
}

interface HeroSectionProps {
  jsonData: Employee[];
}

// const HeroSection = ({ jsonData }) => {
  const HeroSection: React.FC<HeroSectionProps> = ({ jsonData }) => {


    const [isSmallScreen, setIsSmallScreen] = useState(false);


  // Ref for the next container (HTMLDivElement type)
  const nextContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState("100%");

  useEffect(() => {
    const updateDivWidth = () => {
      if (nextContainerRef.current) {
        // Get the bounding rectangle of the next container
        const containerRect = nextContainerRef.current.getBoundingClientRect();

        // Get the computed style of the next container to retrieve margin values
        const computedStyle = window.getComputedStyle(nextContainerRef.current);

        // Calculate the total width including margins (left + width + right)
        const marginLeft = parseFloat(computedStyle.marginLeft);
          const totalWidth = containerRect.width + marginLeft - 15

        setDivWidth(`${totalWidth}px`);
      }
    };
    // Initial width calculation
    updateDivWidth();

    // Recalculate on window resize
    window.addEventListener("resize", updateDivWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const checkWidth = () => {
    if (window.innerWidth < 992) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Run on mount and on resize
  useEffect(() => {
    checkWidth(); // Check width on initial render
    window.addEventListener("resize", checkWidth); // Add event listener

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

    return (
      <>
         <ul>
        {jsonData.map((employee) => (
          <li key={employee.id}>
            <h2>{employee.name}</h2>
            <p>Role: {employee.name}</p>
            <p>Skills:</p>

          </li>
        ))}
      </ul>
            <div className='container mx-auto py-2' ref={nextContainerRef}  >
                <div className=''>
                <motion.div className="title-80"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Start below and invisible
                      visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                      }}
                            >
                    <div className='border-b flex justify-between lg:pt-[130px] sm:pt-[50px] pt-[20px] pb-10 items-end'>
                      <div className='  max-w-[1000px] '>
                      <h1 className="title-80"
                        > Data Driven Performance Marketing Solutions</h1>
                      </div>
                      <div className='text-gray1 text-font19'>01</div>
                    </div>
                  </motion.div>
                    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
          }}
              >
                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:py-[142px] py-[50px] '>

                        <div className='col-span-1 mb-2 lg:mb-0'>
                            <div className='flex gap-2 items-center'>
                                <h3 className='text-30 leading-[1.5]'>OUR APPROACH</h3>
                                <div className='w-5 h-5 bg-primary'></div>
                            </div>
                        </div>

                        <div className='text-[19px] text-gray1 xl:ms-[137px] ms-0 lg:ms-3'>
                            <p className={`text-font19 ${lexend.className}`}>Our team will work with you to understand your goals and identify the
                                channels that will give you the best ROI. We’ll help you develop a custom
                                ads strategy to make sure that your marketing budget is spent effectively.
                                We then design creative for your ads and provide ongoing optimization and
                                management in order to achieve sustainable, growth-focused results.</p>
                </div>

                    </div>
                    </motion.div>

                </div>
            </div>
            <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start below and invisible
          visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut" } }, // Slide up and fade in
          }}
              >
            <div style={{ width: isSmallScreen ? '' : divWidth }}    className={`${isSmallScreen ? "container mx-auto py-2" : ""} custom-class`} >
                <div className='flex gap-5 bg-bglight  py-[17px]'>
                    <div className='  container flexcl600 mr-0 lg:mr-[-15px]' >
                      <div className='w-full  overflow-hidden'>
                      <PerformanceSwiper />

                        </div>
                    </div>

                </div>

                <div className='bg-black w-full h-[350px] lg:h-[700px]'> </div>

            </div>
            </motion.div>



        </>
    )
}

export default HeroSection