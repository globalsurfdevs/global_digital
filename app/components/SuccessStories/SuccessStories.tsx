"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/app/types/Portfolio";
import {
  formatLinkForPortfolio,
  formatLinkForCaseStudy,
} from "@/app/helpers/formatLink";
import portfolioListRaw from "@/portfolios_rows_converted.json";

export const SuccessStories = ({
  companyId,
}: {
  companyId: string | undefined;
}) => {
  const [data, setData] = useState<Portfolio[] | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const response = await fetch(`/api/portfolio`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(
          data?.portfolio
            .filter((item: Portfolio) => item._id !== companyId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3),
        );
      }
    };

    fetchPortfolios();
  }, [companyId]);

  return (
    <div className="flex flex-col pb-[52px] pt-[50px]   lg:pb-[140px] lg:pt-[50px]">
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
          <h2 className="title-65 pb-5 lg:pb-[48px]">
            Success Stories We&apos;re Proud of
          </h2>
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
        <div className="grid gap-8 lg:grid-cols-3">
          {data && data.length > 0
            ? data?.map((item, index) => (
                <div className="relative flex flex-col " key={index}>
                  <div className="relative mb-4 h-96 bg-black lg:mb-[31px]">
                    <Image
                      src={
                        item.bannerImage == "" || null
                          ? item.coverImage
                          : item.bannerImage
                      }
                      alt="image"
                      className="absolute h-full w-full object-cover"
                      fill
                    />
                  </div>
                  <div className="">
                    <img
                      src={item.logo}
                      alt="logo"
                      className="h-[50px] w-auto"
                    />
                  </div>
                  <div className="mb-[10px] mt-[10px] h-[.5px] w-full bg-black lg:mb-[42px] lg:mt-[32px]"></div>
                  <div>
                    <h4 className="text-font30">{item.companyName}</h4>
                  </div>

                  <Link
                    href={
                      item.section == "portfolio"
                        ? `/portfolio/${formatLinkForPortfolio(item.companyName)}`
                        : `/case-study/${formatLinkForCaseStudy(item.companyName)}`
                    }
                    className="absolute left-0 top-0 h-full w-full"
                  ></Link>
                </div>
              ))
            : null}
        </div>
      </motion.div>
    </div>
  );
};
