"use client";

import Image from "next/image";
import MainSectionDetails from "./MainSectionDetails";
import HeroSectionDetails from "./HeroSectionDetails";
import ResultDetails from "./ResultDetails";
import CtaDetailsTwo from "./CtaDetailsTwo";
import WhatWeDelivered from "./WhatWeDelivered";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
import type { PortfolioDetailsProps } from "./PortfolioDetails.types";

const NewPortfolioDetails = ({
  data,
  endpoint,
  successStories,
}: Pick<PortfolioDetailsProps, "data" | "endpoint" | "successStories">) => {
  const previewImages =
    data.portfolio.previewImage?.images.filter(Boolean) ?? [];
  const deliveredSectionItems = data.portfolio.whatWeDeliveredSec?.data;
  const savedDeliveredItems =
    deliveredSectionItems?.length
      ? deliveredSectionItems
      : data.portfolio.whatWeDeliveredData;
  const deliveredData =
    Array.isArray(savedDeliveredItems) && savedDeliveredItems.length > 0
      ? savedDeliveredItems.map((item, index) => ({
          _id:
            ("_id" in item ? item._id : undefined) ??
            ("id" in item ? item.id : undefined) ??
            index + 1,
          title: item.title,
          icn: item.icn || "",
          urllink: Array.isArray(item.urllink)
            ? item.urllink.find((link: string) => Boolean(link))
            : item.urllink,
        }))
      : [];

  const newData = {
    ...data,
    portfolio: {
      ...data.portfolio,
      bannerImage: data.portfolio.newBannerImage || "",
      bannerTitle: data.portfolio.newBannerTitle || "",
      story: data.portfolio.oneLineBrandContext || "",
      detailsCtaOneTitle:
        data.portfolio.detailsCtaOne?.title ||
        data.portfolio.detailsCtaOneTitle,
      detailsCtaOneLinkText:
        data.portfolio.detailsCtaOne?.ctaText ||
        data.portfolio.detailsCtaOneLinkText,
      detailsCtaTwoTitle:
        data.portfolio.detailsCtaTwo?.title ||
        data.portfolio.detailsCtaTwoTitle,
      detailsCtaTwoButtonText:
        data.portfolio.detailsCtaTwo?.ctaText ||
        data.portfolio.detailsCtaTwoButtonText,
    },
    portfolioHighlights: (data.portfolio.newPortfolioHighlights || []).map(
      (highlight, index) => ({
        ...highlight,
        customId: `new-highlight-${index}`,
        companyId: Number(data.portfolio.id) || 0,
      }),
    ),
  };

  return (
    <>
      <MainSectionDetails data={newData} />
      <HeroSectionDetails data={newData} />
      {endpoint == "innovo-group" && (
        <ResultDetails data={newData} />
      )}
      {previewImages && previewImages.length > 0 && (
        <section className="container mx-auto grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
          {previewImages.map((imageUrl: string, index: number) => (
            <Image
              key={`preview-${index}`}
              src={imageUrl}
              alt={`Portfolio work preview ${index + 1}`}
              width={900}
              height={746}
              className="h-auto w-full"
            />
          ))}
        </section>
      )}
      <WhatWeDelivered
        title={
          data.portfolio.whatWeDeliveredSec?.title ||
          data.portfolio.whatWeDeliveredTitle ||
          ""
        }
        data={deliveredData}
        endpoint={endpoint}
        colcount={3}
      />
      <div className="container mx-auto border-t border-gray-400 py-4">
        <div>
          <SuccessStoriesPortfolio
            data={successStories ?? []}
            colCount={3}
          />
        </div>
      </div>
      <CtaDetailsTwo data={newData} />
    </>
  );
};

export default NewPortfolioDetails;
