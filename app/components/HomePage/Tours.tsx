"use client"
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {Lexend} from "next/font/google";
import { motion } from 'framer-motion';
import { Portfolio } from "@/app/types/Portfolio";
const lexend = Lexend({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] });
import { formatLinkForPortfolio } from "@/app/helpers/formatLink";

const Tours = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    useEffect(() => {
      const fetchPortfolios = async () => {
        try {
          const response = await fetch(`/api/portfolio`);
          if (response.ok) {
            const data = await response.json();
            console.log(data.portfolio);
            setPortfolios(data.combinedData);
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
    <div className="container px-4 mx-auto">
      <div className="pt-[50px] lg:pt-[110px] pb-[50px] lg:pb-[150px] flex flex-col gap-4 lg:gap-10 border-b">
       <motion.div
                 initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 50% visible
                         variants={{
                           hidden: { opacity: 0, y: 50 }, // Start below and invisible
                           visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
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
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Slide up and fade in
                          }}
                >
          <div className="grid md:grid-cols-2 gap-8">
          {portfolios.slice(0, 2).map((item, index) => (

  
  <div className="relative tour-card h-full lg:min-h-[550px] min-h-[350px] " >
    <img
      src={item.bannerImage}
      alt={item.companyName}
      className="ease-linear duration-300   h-full"
    />
    <div className="absolute lg:bottom-[46px] lg:left-[59px] bottom-[15px] left-[15px] z-10">
      <h3 className="text-white text-font30 leading-lh1p66">{item.companyName}</h3>
      <div className="flex gap-2">
        <h4 className={`text-primary ${lexend.className}`}>{item.channelsUsed}</h4>
      </div>
    </div>
    <Link href={`/portfolio/${formatLinkForPortfolio(item.companyName)}`} key={index} className="absolute w-full h-full left-0 top-0"></Link>
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
          </motion.div>
      </div>
    </div>
  );
};

export default Tours;
