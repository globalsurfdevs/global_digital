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

const Tours = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`/api/portfolio`);
        if (response.ok) {
          const data = await response.json();
          console.log(data.portfolio);
          setPortfolios(data.portfolio.slice(0, 2));
        } else {
          console.error("Failed to fetch portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolios();
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
          <h2 className="text-font65">Featured Projects</h2>
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
          <div className="grid gap-8 md:grid-cols-2">
            {portfolios.length > 0 ? (
              portfolios.map((item) => (
                <div
                  className="tour-card relative h-full min-h-[350px] lg:min-h-[500px]"
                  key={item.id}
                >
                  <img
                    src={item.bannerImage ?? item.coverImage}
                    alt={item.companyName}
                    width={500}
                    height={350}
                    className="absolute h-full   w-full object-cover duration-300 ease-linear"
                  />
                  <div className="absolute bottom-[15px] left-[15px] z-10 lg:bottom-[46px] lg:left-[59px]">
                    <h3 className="text-font30 leading-lh1p66 text-white">
                      {item.companyName}
                    </h3>
                    <div className="flex gap-1">
                      
                      {item.channels.length == 0 && <h4 className={`text-primary ${lexend.className}`}>
                        {item.channelsUsed}
                      </h4>}
                      {item.channels.length > 0 && item.channels.map((channel,index) => (
                        <h4 className={`text-primary ${lexend.className}`} key={channel.channelName}>
                          {index == item.channels.length - 1 ? channel.channelName : channel.channelName + ", "}
                        </h4>
                      ))}
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

export default Tours;
