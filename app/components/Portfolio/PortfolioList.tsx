"use client";

import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Portfolio } from "@/app/types/Portfolio";

const PortfolioList = () => {
  const portfolioData = [
    {
      title: "Lorem Ipsum",
      description: "Lorem Ipsum is simply dummy text of the printing",
      tag: "SaaS",
      imageSrc: assets.imgs1,
      url: "case-study",
      category:"all"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Ipsum is simply dummy text of the printing",
      tag: "Fintech",
      imageSrc: assets.imgs2,
      url: "portfolio-details",
      category:"cat1"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Ipsum is simply dummy text of the printing",
      tag: "Fintech",
      imageSrc: assets.imgs2,
      url: "#",
      category:"cat2"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Ipsum is simply dummy text of the printing",
      tag: "Fintech",
      imageSrc: assets.imgs2,
      url: "#",
      category:"all"
    },
  ];

      const [portfolios, setPortfolios] = useState<Portfolio[]>([])
      
      useEffect(() => {
          const fetchPortfolios = async () => {
              try {
                  const response = await fetch(`/api/portfolio`);
                  if (response.ok) {
                      const data = await response.json();
                      console.log(data.portfolio)
                      setPortfolios(data.portfolio)
  
                  } else {
                      console.error("Failed to fetch portfolio data");
                  }
              } catch (error) {
                  console.error("Error fetching portfolio data:", error);
              }
          }
  
          fetchPortfolios()
      }, [])
      
  return (
    <>
      <div className="container mx-auto py-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 gap-8 lg:gap-y-12 items-center border-b lg:pt-[130px]  pt-[50px] pb-10 flex flex-col ">
          {portfolios.map((item, index) => (
            <motion.div
              key={index}
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
              <div className="portfolio-card col-span-1 group relative">
                <div className="relative card-img">
                  <img src={item.bannerImage} alt="image" className="w-[100%]" />
                  <div className="bg-gray1 group-hover:z-[1] group-hover:bg-primary ease-in-out duration-200 group-hover:text-white absolute md:top-5 md:left-5 top-3 left-3 px-4 py-2 rounded-3xl cursor-pointer">
                    <div className="text-white uppercase  ">
                      <p className="text-font14">{"SAAS"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 ">
                  <h3 className="text-30 mb-1 md:mb-2 group-hover:text-primary ease-in-out duration-200">
                    {item.companyName}
                  </h3>
                  <p className="text-19 text-gray1 ">item.description</p>
                </div>
                <Link href={`/portfolio-details/${item.id}`} className="absolute w-full h-full top-0 z-[1]"></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioList;
