"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import LetsTalk from "../../components/common/LetsConnect";
import PerformanceSwiper from "../PermormanceMarketing/PerformanceSwiper";
import { Lexend } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
interface su {
  stitle?: string;
buttonTitle?: string;
  desc?: string;
}
interface BannerSection {
  id: number;
  title: string;
  title1?: string;
  subtitle?: string;
  buttontitle?: string;
  buttonurl?: string;
  image: string | StaticImageData;
  sub: su[];
  heroAlt?: string;
  navigation?: { label: string; url?: string }[]; // Added navigation property
}
interface HeroSectionProps {
  order?: string;
  maxchwidth?: number;
  hideslider?: boolean;
  bannerlogp?: boolean;
  Bannerdata: BannerSection[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  Bannerdata,
  order,
  hideslider,
  bannerlogp,
  maxchwidth,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [modalOpen]);
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
        const totalWidth = containerRect.width + marginLeft - 15;

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
    {/* Modal section */}
      {modalOpen && (
        <div className="fixed left-0 top-0 z-[1000] w-screen overflow-y-auto bg-white">
          <LetsTalk onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className="container mx-auto py-2" ref={nextContainerRef}>
     
        {Bannerdata.map((herosection) => (
          
          <div key={herosection.id}>
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
              <div
                className={` ptcs0 border-b pb-10 pt-[20px] sm:pt-[50px] lg:pt-[130px] mb-[20px] sm:mb-[40px] lg:mb-[60px]  `}
              >
                <div
                  className={`flex  justify-between  ${bannerlogp ? "items-start" : "items-end"}`}
                >
                  <div
                  
                  >
                    <div>
                      {herosection.navigation && (
                        <nav className="mb-6 text-[20px]  text-[#77787B] lg:mb-8">
                          <ul className="flex items-center space-x-2 bredcbs">
                            {herosection.navigation.map((navItem, index) => (
                              <React.Fragment key={index}>
                                <li  >
                                  {navItem.url ? (
                                    <Link
                                      href={navItem.url}
                                      className="hover:underline text-[10px] sm:text-font14 lg:text-font19 "
                                    >
                                      {navItem.label}
                                    </Link>
                                  ) : (
                                    <span className="text-[#77787B] text-[10px] sm:text-font14 lg:text-font19">
                                      {navItem.label}
                                    </span>
                                  )}
                                </li>
                                {index <
                                  (herosection.navigation?.length || 0) -
                                  1 && (
                                    <li>
                                
                            <div className="h-[14px] w-[14px] bg-primary"></div>
                          
                                    </li>
                                  )}
                              </React.Fragment>
                            ))}
                          </ul>
                        </nav>
                      )}
                    </div>
                    
                  
                  </div>
                  <div>
                    <p className="hover:underline text-[10px] sm:text-font14 lg:text-font19 text-[#77787B]">Published on Sep 15, 2025  |  Updated on 14, 2025
                        </p>
                
                  </div>
                  
                </div>
                <div className="text-right text-font19 text-gray1">{order}</div>
                <div className="grid grid-cols-1 py-[50px] lg:py-[150px] xl:grid-cols-7   ">
      <div className="col-span-2  mb-5 xl:mb-0">
                          
                            {/* <div className="flex flex-col items-start gap-[16px]">
                       
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.shareicon} alt="share" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.linkedinicon} alt="linkedin" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.facebbokicon} alt="facebook" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.twittericon} alt="twitter" />
  </div>


                            </div> */}
                           
                          
                        </div>
                        <div className="col-span-5 w-full ">
                          <h1 className="title-80">
                          Mastering Social Media Video Production: Tips to Boost Engagement
                          </h1>
                          <div className="gap-[16px] mt-[40px] xl:hidden flex">
                        
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.shareicon} alt="share" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.linkedinicon} alt="linkedin" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.facebbokicon} alt="facebook" />
  </div>
  <div className="p-2 bg-[#C1C1C1]/30 rounded-[14px]">
    <Image src={assets.twittericon} alt="twitter" />
  </div>


                            </div>
           

                        </div>
      </div>
              </div>
            </motion.div>
        
          </div>
        ))}
        
      </div>
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
        <div
          style={{ width: isSmallScreen ? "" : divWidth }}
          className={`${isSmallScreen ? "container mx-auto py-2" : ""
            } custom-class`}
        >
          {!hideslider && (
            <div className="flex gap-5 bg-bglight  py-[17px]">
              <div className="  flexcl600 container mr-0 lg:mr-[-15px]">
                <div className="w-full  overflow-hidden">
                  <PerformanceSwiper />
                </div>
              </div>
            </div>
          )}
          {Bannerdata.map((herosection) => (
            <div className=" w-full bg-black ">
              <Image
                src={herosection.image}
                className="w-full"
                alt={herosection.heroAlt || "Banner image"}
                width={1500}
                height={700}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;
