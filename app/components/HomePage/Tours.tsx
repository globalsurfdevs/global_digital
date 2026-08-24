"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Lexend } from "next/font/google";
import { motion } from "framer-motion";
import { Portfolio } from "@/app/types/Portfolio";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import {
  formatLinkForCaseStudy,
  formatLinkForPortfolio,
} from "@/app/helpers/formatLink";
import Image from "next/image";

interface ToursProps {
  title?: string;
  showViewAll?: boolean;
}
const Tours = ({ title="Featured projects", showViewAll = true }: ToursProps) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`/api/portfolio`);
        if (response.ok) {
          const data = await response.json();
          // console.log(data.portfolio);
          setPortfolios(
            data.portfolio.filter(
              (item: { featured: boolean }) => item.featured,
            ),
          );
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
            hidden: { y: 50 }, // Start below and invisible
            visible: {
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
            hidden: { y: 50 }, // Start below and invisible
            visible: {
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            }, // Slide up and fade in
          }}
        >
          {portfolios.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation
              modules={[Navigation, Autoplay]}
              speed={3000}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="toursSwpr"
            >
              {portfolios.map((item) => (
                <SwiperSlide key={item.id}>
                  <div>
                    <div className="tour-card relative  min-h-[350px] lg:min-h-[400px] xl:min-h-[400px] 3xl:min-h-[605px]">
                      <Image
                        loading="lazy"
                        priority={false}
                        src={item.bannerImage ?? item.coverImage}
                        alt={item.companyName}
                        width={500}
                        height={350}
                        className="absolute h-full   w-full object-cover duration-300 ease-linear"
                      />

                      <Link
                        href={
                          item.section == "portfolio"
                            ? `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                            : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                        }
                        className="absolute left-0 top-0 z-10 h-full w-full"
                      ></Link>
                    </div>
                    <div className="  mt-5 ">
                      <h3 className="text-font30 leading-lh1p66 text-black">
                        {item.companyName}
                      </h3>
                      <div className="flex flex-wrap gap-1 text-[14px] md:text-[16px]">
                        {item.categories.length > 0 &&
                          item.categories.map((category, index) => (
                            <h4
                              className={`text-primary ${lexend.className}`}
                              key={category.name}
                            >
                              {index == item.categories.length - 1
                                ? category.name
                                : category.name + ", "}
                            </h4>
                          ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div>No projects available</div>
          )}
          {showViewAll&&(

          <div className="innerfnont mt-[30px] flex w-full justify-center lg:mt-[50px]">
            <Link
              href="/portfolio"
              className="group flex h-fit w-fit items-center space-x-2 rounded-full border border-primary px-6 py-2 text-black transition duration-300 ease-in  hover:text-black hover:shadow-lg"
            >
              <span className="fnt-lexend uppercase duration-300 ease-in group-hover:text-black">
                View All
              </span>
              <div className="bg-primary p-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-105"
                >
                  <g clipPath="url(#clip0_65_39)">
                    <path
                      d="M8.88346 1.26172L1.13281 8.8624"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M1.13281 1.26172H8.88346V8.71245"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_65_39">
                      <rect width="10" height="10" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Tours;
