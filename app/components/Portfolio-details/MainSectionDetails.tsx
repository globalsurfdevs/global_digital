"use client";
import { motion } from "motion/react";
import { Portfolio } from "@/app/types/Portfolio";
import { PortfolioHighlight } from "@/app/types/PortfolioHighlights";
import Image from "next/image";
import Link from "next/link";

const MainSectionDetails = ({
  data,
}: {
  data: {
    portfolio: Portfolio;
    portfolioHighlights: PortfolioHighlight[];
  } | null;
}) => {
  if (!data) return null;

  return (
    <section>
      <div className="relative">
        <div className="z-1 relative h-[350px] w-full lg:h-[450px] xl:h-screen">
          <Image
            src={data.portfolio.bannerImage}
            alt="heroImage"
            className="absolute h-full w-full object-cover object-center"
            fill
          />
          <div className="bg-bl-gradient absolute top-0 h-full w-full "></div>
        </div>
      </div>
      <div className="bg-dgray">
        <div className="container mx-auto py-2">
          <div className=" ptcs0   pb-10  pt-[20px] sm:pt-[50px]  lg:pb-[80px]  lg:pt-[100px] xl:pb-[100px] 2xl:pb-[140px] ">
            <div className="mb-5 items-end justify-between border-b border-black/20  pb-5 md:flex lg:mb-[50px] lg:pb-[60px]">
              <div className=" xxl:max-w-[120ch]">
                <h1 className="title-80">
                  {data.portfolio.bannerTitle == "null" ||
                  data.portfolio.bannerTitle == "undefined"
                    ? ""
                    : data.portfolio.bannerTitle}
                </h1>
              </div>
              <div className="ml-auto mt-3 w-fit md:mt-0">
                <Image
                  src={data.portfolio.logo}
                  alt={data.portfolio.companyName}
                  width={150}
                  height={100}
                  className="max-w-[100px] md:max-w-[150px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between  gap-4   lg:flex-row">
              <div className="flex justify-between gap-5 lg:gap-10  xl:gap-[120px]">
                <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Industry
                  </p>
                  <p className="text-30 font-normal leading-lh1p33">
                    {data.portfolio.industry}
                  </p>
                </div>
                <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Country
                  </p>
                  <p className="text-30 font-normal leading-lh1p33">
                    {data.portfolio.country}
                  </p>
                </div>
                <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Year
                  </p>
                  <p className="text-30 font-normal leading-lh1p33">2025</p>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Services
                  </p>
                  <div className="flex max-w-md flex-wrap gap-2">
                    {data.portfolio.categories.map((item, index) => (
                      <button
                        key={index}
                        className="btn-outline-primary-text-black"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSectionDetails;
