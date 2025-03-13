"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Lexend } from "next/font/google";
import { motion } from "framer-motion";
import { Portfolio } from "@/app/types/Portfolio";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import {
  formatLinkForCaseStudy,
  formatLinkForPortfolio,
} from "@/app/helpers/formatLink";

interface ServicesSectionProps {
  title?: string;
}
const Works: React.FC<ServicesSectionProps> = ({ title }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`/api/portfolio`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.portfolio);
          setPortfolios(data.portfolio.slice(0, 3));
        } else {
          console.error("Failed to fetch portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolios();
    console.log(fetchPortfolios);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-4 border-b pb-[50px] pt-[50px] lg:gap-10 lg:pb-[150px] lg:pt-[110px]">
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
          <h2 className="text-font65">{title}</h2>
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
          <div className="grid gap-5 md:grid-cols-3 lg:gap-[60px]">
            {portfolios.length > 0 ? (
              portfolios.map((item) => (
                <div className="group">
                  <div
                    className="tour-card relative min-h-[400px] lg:min-h-[580px] "
                    key={item.id}
                  >
                    <img
                      src={item.bannerImage ?? item.coverImage}
                      alt={item.companyName}
                      width={500}
                      height={350}
                      className="absolute h-full   w-full object-cover duration-300 ease-linear"
                    />
                    <div className="relative h-full   w-full">
                      <img
                        src={item.logo}
                        alt={item.companyName}
                        width={147}
                        height={30}
                        className=" absolute  bottom-8 right-8 z-[1] object-cover brightness-0  invert-[1] duration-300 ease-linear"
                      />
                    </div>

                    <Link
                      href={
                        item.section == "portfolio"
                          ? `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                          : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                      }
                      className="absolute left-0 top-0 z-10 h-full w-full"
                    ></Link>
                  </div>
                  <div className="relative ">
                    <div className="mt-4 border-b pb-6 transition-all duration-300   ease-in group-hover:border-primary lg:mt-7">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-font30 leading-[1.3] text-black">
                            {item.companyName}
                          </h3>
                          <div className="flex gap-2">
                            <p
                              className={`text-gray1 transition-all   duration-300 ease-in group-hover:text-primary ${lexend.className}`}
                            >
                              {item.industry}
                            </p>
                          </div>
                        </div>
                        <div className="transition-transform duration-300 group-hover:translate-x-[-5px] md:group-hover:translate-x-[-30px]">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 36 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 group-hover:scale-110 brightness-0 group-hover:brightness-[1]"
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
                    <Link
                      href={
                        item.section == "portfolio"
                          ? `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                          : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                      }
                      className="absolute left-0 top-0 z-10 h-full w-full"
                    ></Link>
                  </div>
                </div>
              ))
            ) : (
              <div>No projects available</div>
            )}

            {/* <div className="relative tour-card h-full lg:min-h-[500px] min-h-[350px] "  >
              <img
                src="/assets/portfolio2.webp"
                alt="American School Of Creative Science" width={500} height={350}
                className="ease-linear duration-300   h-full absolute object-cover w-full"
              />
              <div className="absolute lg:bottom-[46px] lg:left-[59px] bottom-[15px] left-[15px] z-10">
                <h3 className="text-white text-font30 leading-lh1p66">American School Of Creative Science</h3>
                <div className="flex gap-2">
                  <h4 className={`text-primary ${lexend.className}`}>Website</h4>
                </div>
              </div>
              <Link href={`/portfolio/american-school-of-creative-science`} className="absolute w-full h-full left-0 top-0 z-10"></Link>
            </div> */}
          </div>
          <div className="innerfnont mt-[30px] flex w-full justify-center lg:mt-[50px]">
            <Link href={`/portfolio`}>
              {" "}
              <motion.button
                className="text-30 rounded-full border px-8 py-3 font-medium leading-[1.67] lg:px-[195px] lg:py-4 "
                initial={{ scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW ALL
              </motion.button>
            </Link>
          </div>
        </motion.div>
        {/* <motion.div
                  initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                          variants={{
                            hidden: { opacity: 0, y: 50 }, // Start below and invisible
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
          <div className="grid md:grid-cols-2 gap-8">
          {portfolios.slice(0, 2).map((item, index) => (


  <div className="relative tour-card h-full lg:min-h-[500px] min-h-[350px] "
  key={item.id} >
    <img
      src={item.bannerImage}
      alt={item.companyName} width={500} height={350}
      className="ease-linear duration-300   h-full absolute object-cover w-full"
    />
    <div className="absolute lg:bottom-[46px] lg:left-[59px] bottom-[15px] left-[15px] z-10">
      <h3 className="text-white text-font30 leading-lh1p66">{item.companyName}</h3>
      <div className="flex gap-2">
        <h4 className={`text-primary ${lexend.className}`}>{item.channelsUsed}</h4>
      </div>
    </div>
    <Link href={`/portfolio/${formatLinkForPortfolio(item.companyName)}`} key={index} className="absolute w-full h-full left-0 top-0 z-10"></Link>
  </div>
))}

        </div>
        <div className="w-full flex justify-center mt-[30px] lg:mt-[50px] innerfnont">
        <Link href={`/portfolio`}> <motion.button
      className="border lg:py-4 lg:px-[195px] py-3 px-8 rounded-full leading-[1.67] text-30 font-medium "
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#000000",
        color: "#ffffff",
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      VIEW ALL
            </motion.button>
              </Link>
          </div>
          </motion.div> */}
      </div>
    </div>
  );
};

export default Works;
