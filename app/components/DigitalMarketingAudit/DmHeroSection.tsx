"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import LetsTalk from "../common/LetsConnect";
import { Lexend } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import LogoSwiper from "./LogoSwiper";
import { logoSwipper } from "@/app/data/services/digital-marketing-audit/herosection";
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
  points: string[]
}

const HeroSection: React.FC<HeroSectionProps> = ({
  Bannerdata,
  order,
  hideslider,
  bannerlogp,
  maxchwidth,
  points
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
  const scrollToSection = () => {
    const section = document.getElementById('requestst');
    section?.scrollIntoView({ behavior: 'smooth' });
  };
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
                className={` ptcs0 md:border-b pb-10 pt-[20px] sm:pt-[50px] lg:pt-[130px] `}
              >
                <div
                  className={`flex  justify-between  ${bannerlogp ? "items-start" : "items-end"}`}
                >
                  <div
                    className={` xxl:max-w-[1000px]`}
                    style={{ maxWidth: `${maxchwidth}ch` }}
                  >

                    <div>
                      {herosection.navigation && (
                        <nav className="mb-6 text-[20px] uppercase text-[#77787B] lg:mb-[40px] xl:mb-[60px]">
                          <ul className="flex items-center space-x-2">
                            {herosection.navigation.map((navItem, index) => (
                              <React.Fragment key={index}>
                                <li>
                                  {navItem.url ? (
                                    <Link
                                      href={navItem.url}
                                      className="hover:underline"
                                    >
                                      {navItem.label}
                                    </Link>
                                  ) : (
                                    <span className="text-[#77787B]">
                                      {navItem.label}
                                    </span>
                                  )}
                                </li>
                                {index <
                                  (herosection.navigation?.length || 0) -
                                  1 && (
                                    <li>
                                      <Image
                                        src="../images/ecom-industry/bc-arrow.png" // Replace with the actual path to your arrow image
                                        alt="Arrow"
                                        width={7} // Adjust width as needed
                                        height={12} // Adjust height as needed
                                        className=""
                                      />
                                    </li>
                                  )}
                              </React.Fragment>
                            ))}
                          </ul>
                        </nav>
                      )}
                    </div>
                    {herosection.title1 && (
                      <p className="mb-6 border-l-2 border-[#DC0000] pl-5 text-[20px] uppercase text-[#77787B] lg:mb-[79px] ">
                        {herosection.title1}
                      </p>
                    )} 
                      <nav className="mb-6 text-[10px] sm:text-font14 lg:text-font19 uppercase text-[#77787B] lg:mb-8">
                        <ul className="flex items-center space-x-2"> 
                            <React.Fragment >
                              <li>
                                
                                  <Link
                                    href="/"
                                    className="hover:underline"
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
                                      className=""
                                    />
                                  </li> 
                                  <li>
                               
                                  <span className="text-[#77787B]">
                                   Free Digital Marketing Audit
                                  </span>
                             
                              </li> 
                                
                            </React.Fragment>
                         
                        </ul>
                      </nav>
                  
                    <h1 className="title-80"> {herosection.title}</h1>

                    {herosection.subtitle && (
                      <h3 className="my-3 text-[20px] text-gray1 lg:my-[75px] lg:max-w-[946px] lg:text-[35px]">
                        {" "}
                        {herosection.subtitle}
                      </h3>
                    )}
                    {herosection.buttontitle && (
                      <button
                        className="z-2 z-1 group relative flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 lg:mb-[45px]
                "
                      >
                        <div className="relative">
                          <p
                            className={`text-sm uppercase font-medium duration-200 ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                          >
                            {herosection.buttontitle}
                          </p>
                          <Link
                            href={herosection.buttonurl || "#"}
                            className="absolute top-0 z-[1] h-full w-full"
                          ></Link>
                        </div>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="duration-200 ease-in-out group-hover:scale-125 "
                        >
                          <g clipPath="url(#clip0_65_58)">
                            <path
                              d="M18.7892 1.2749L0.699219 19.0149"
                              stroke="#E53F30"
                              strokeWidth="3"
                              strokeMiterlimit="10"
                              className="group-hover:stroke-black"
                            />
                            <path
                              d="M0.699219 1.2749H18.7892V18.6649"
                              stroke="#E53F30"
                              strokeWidth="3"
                              strokeMiterlimit="10"
                              className="group-hover:stroke-black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_65_58">
                              <rect
                                width="19.79"
                                height="19.45"
                                fill="white"
                                transform="translate(0 0.274902)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    )}
                  </div>
                  {bannerlogp && (
                    <div className="lg:gap-18 flex h-full w-full flex-col justify-between gap-5 pb-0 pt-4 lg:col-span-3 lg:items-end lg:py-4 xl:col-span-3">
                      <Link
                        href="https://www.google.com/partners/agency?id=5412848486"
                        rel="nofollow"
                        target="_blank"
                      >
                        {" "}
                        <Image
                          src={assets.googlepartner}
                          alt="image"
                          className="w-20 md:w-48"
                          width={10}
                          height={10}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                <div className="text-right text-font19 text-gray1">{order}</div>
              </div>
                {herosection.sub.map(
                  (su, index) =>
                    su.stitle &&
                    su.desc && (
                        <div key={index}>
                          {su.buttonTitle && (
                            <button onClick={scrollToSection}
                              className="md:hidden flex z-2 z-1 group relative   w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-0 pb-3
                                   before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-all before:duration-300 before:ease-in-out after:absolute
                                        after:bottom-0 after:right-0 after:h-[1px] after:w-full after:bg-orange-500 after:transition-all after:duration-300 after:ease-in-out hover:border-b-white hover:after:w-0 "
                            >
                              <div className="relative">
                                <p
                                  className={`duration-200 text-sm font-medium uppercase ease-in-out group-hover:text-primary md:text-[16px] ${lexend.className}`}
                                >
                                  {su.buttonTitle}
                                </p>
                              </div>
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="duration-200 ease-in-out group-hover:scale-125"
                              >
                                <g clipPath="url(#clip0_65_58)">
                                  <path
                                    d="M18.7892 1.2749L0.699219 19.0149"
                                    stroke="#E53F30"
                                    strokeWidth="3"
                                    strokeMiterlimit="10"
                                    className="group-hover:stroke-black"
                                  />
                                  <path
                                    d="M0.699219 1.2749H18.7892V18.6649"
                                    stroke="#E53F30"
                                    strokeWidth="3"
                                    strokeMiterlimit="10"
                                    className="group-hover:stroke-black"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_65_58">
                                    <rect
                                      width="19.79"
                                      height="19.45"
                                      fill="white"
                                      transform="translate(0 0.274902)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          )}
                        </div>
                        )
                      )
                  }

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
              <div>
                {herosection.sub.map(
                  (su, index) =>
                    su.stitle &&
                    su.desc && (
                      <div
                        key={index}
                        className="grid grid-cols-1 py-8 lg:py-[75px] "
                      >

                        <div className=" ">
                          <p className={`ms-0 text-gray1 text-font30 font-normal max-w-[48ch] `}>
                            {su.desc}
                          </p>
                          <div className={`grid grid-cols-1 md:grid-cols-2 mb-2 lg:mb-0 max-w-fit gap-8 mt-6 lg:mt-14 ${lexend.className}`}>

                            {points.map((point, index) => (
                              <div className="flex items-center gap-2 max-w-fit" key={index}>
                                <div className="h-5 w-5 bg-primary"></div>
                                <p className="text-gray1">{point}</p>
                              </div>
                            ))}

                          </div>
                          {su.buttonTitle && (
                            <button onClick={scrollToSection}
                              className="hidden z-2 z-1 group relative  md:flex w-fit items-center gap-3 border border-l-0 border-r-0 border-t-0 border-transparent p-3 bg-primary
                                    lg:mt-10 mt-8 rounded-[5px]"
                            >
                              <div className="relative">
                                <p
                                  className={`duration-200 text-sm font-medium uppercase ease-in-out text-white md:text-[16px] ${lexend.className}`}
                                >
                                  {su.buttonTitle}
                                </p>
                              </div>
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="duration-200 ease-in-out group-hover:scale-125"
                              >
                                <g clipPath="url(#clip0_65_58)">
                                  <path
                                    d="M18.7892 1.2749L0.699219 19.0149"
                                    stroke="#fff"
                                    strokeWidth="3"
                                    strokeMiterlimit="10"
                                    className=""
                                  />
                                  <path
                                    d="M0.699219 1.2749H18.7892V18.6649"
                                    stroke="#fff"
                                    strokeWidth="3"
                                    strokeMiterlimit="10"
                                    className=""
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_65_58">
                                    <rect
                                      width="19.79"
                                      height="19.45"
                                      fill="white"
                                      transform="translate(0 0.274902)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          )}
                        </div>


                      </div>
                    ),
                )}
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
                  <LogoSwiper logoSwiper={logoSwipper} />
                </div>
              </div>
            </div>
          )}
          {Bannerdata.map((herosection, index) => (
            <div className=" w-full bg-black " key={index}>
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
