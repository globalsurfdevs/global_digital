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

  const channelsUsed = Array.isArray(data.portfolio.channelsUsed)
    ? data.portfolio.channelsUsed
    : [];
  const visibleCategories = (data.portfolio.categories ?? []).filter(
    (category) => category.isHidden !== true,
  );

  return (
    <section>
      <div className="relative">
        <div className="z-1 relative aspect-[4/3] w-full xl:aspect-auto xl:h-screen">
          {data.portfolio.bannerImage && (
            <>
              <picture className="contents">
                {data.portfolio.mobileBannerImage && (
                  <source
                    media="(max-width: 992px)"
                    srcSet={data.portfolio.mobileBannerImage}
                  />
                )}
                <Image
                  src={data.portfolio.bannerImage}
                  alt={
                    data.portfolio.newBannerAlt ||
                    data.portfolio.bannerTitle ||
                    "Portfolio banner"
                  }
                  className="absolute h-full w-full object-cover object-center"
                  fill
                  sizes="100vw"
                  quality={90}
                  priority
                />
              </picture>
              <div className="bg-bl-gradient absolute top-0 h-full w-full"></div>
            </>
          )}
        </div>
      </div>
      <div className="bg-dgray">
        <div className="container mx-auto py-2">
          <div className=" ptcs0   pb-10  pt-[20px] sm:pt-[50px]  lg:pb-[80px]  lg:pt-[100px] xl:pb-[100px] 2xl:pb-[140px] ">
            {/* <div className="mb-5 items-end justify-between border-b border-black/20  pb-5 md:flex lg:mb-[50px] lg:pb-[60px]">
              <div className=" xxl:max-w-[120ch]">
                <h1 className=" text-[32px] md:text-[50px] max-lg:leading-[1.2] 2xl:text-font80 xl:leading-lh1p22 ">
                  {data.portfolio.bannerTitle == "null" ||
                  data.portfolio.bannerTitle == "undefined"
                    ? ""
                    : data.portfolio.bannerTitle}
                </h1>
              </div>
              {data.portfolio.logo && (
                // <div className="max-sm:mr-auto max-sm:mt-2 max-sm:overflow-hidden flex h-[60px] w-[110px] shrink-0 items-end justify-end sm:h-[100px] sm:w-[140px] md:mt-0 md:h-[110px] md:w-[180px] lg:h-[40px] lg:w-[180px]">
                <div className="flex self-end shrink-0 items-end justify-end  max-sm:mr-auto max-md:mt-3 max-sm:overflow-hidden h-[30px] w-[150px] lg:h-[40px] lg:w-[180px]">
                  <Image
                    src={data.portfolio.logo}
                    alt={
                      data.portfolio.logoAlt ||
                      `${data.portfolio.companyName} logo`
                    }
                    width={180}
                    height={40}
                    className="md:object-bottom-right max-h-full max-w-full object-contain max-sm:h-full max-sm:w-full"
                  />
                </div>
              )}
            </div> */}
            <div className="mb-5 flex w-full flex-col gap-6 items-start justify-between border-b border-black/20 pb-5 md:items-end lg:mb-[60px] lg:flex-row lg:gap-[60px] lg:pb-[60px]">
              <div className="w-full  xxl:max-w-[120ch]">
                <h1 className="text-[32px] max-lg:leading-[1.2] md:text-[50px] xl:leading-lh1p22 2xl:text-font80">
                  {data.portfolio.bannerTitle == "null" ||
                  data.portfolio.bannerTitle == "undefined"
                    ? ""
                    : data.portfolio.bannerTitle}
                </h1>
              </div>

              {data.portfolio.logo && (
                <div className=" h-[40px] w-[150px] shrink-0 items-end justify-start self-start md:ml-auto md:mt-0 md:h-[60px] md:w-auto md:justify-end md:self-auto lg:max-h-[80px] lg:w-auto">
                  <Image
                    src={data.portfolio.logo}
                    alt={
                      data.portfolio.logoAlt ||
                      `${data.portfolio.companyName} logo`
                    }
                    width={180}
                    height={40}
                    className="max-h-full max-w-full object-contain object-left md:object-right"
                  />
                </div>
              )}
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
                {/* <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Country
                  </p>
                  <p className="text-30 font-normal leading-lh1p33">
                    {data.portfolio.country}
                  </p>
                </div> */}
                {/* <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Year
                  </p>
                  <p className="text-30 font-normal leading-lh1p33">2025</p>
                </div> */}
              </div>
              {visibleCategories.length > 0 && (
                <div>
                  <div>
                    <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                      Services
                    </p>
                    <div className="flex max-w-md flex-wrap gap-2">
                      {visibleCategories.map((item, index) => (
                        <Link
                          key={item.link || `${item.name}-${index}`}
                          href={item.link || "#"}
                          className="btn-outline-primary-text-black !px-[17px] !normal-case text-[19px] !py-[9px] leading-[1.5] !font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {channelsUsed.length ? (
                <div>
                  <p className="text-19 fnt-lexend leadeing-[2.105263157894737] pb-[5px] text-gray1">
                    Channels used
                  </p>
                  <div className="flex max-w-md flex-wrap gap-2">
                    {channelsUsed.map((channel, index) => (
                      <span
                        key={`${channel}-${index}`}
                        className="btn-outline-primary-text-black"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSectionDetails;
