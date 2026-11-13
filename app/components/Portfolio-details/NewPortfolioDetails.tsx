"use client";

import MainSectionDetails from "./MainSectionDetails";
import HeroSectionDetails from "./HeroSectionDetails";
import ResultDetails from "./ResultDetails";
import CtaDetailsTwo from "./CtaDetailsTwo";
import CtaDetailsone from "./CtaDetailsone";
import WhatWeDelivered from "./WhatWeDelivered";
import { SuccessStoriesPortfolio } from "../SuccessStories/SuccessStoriesPortfolio";
import type { PortfolioDetailsProps } from "./PortfolioDetails.types";

const NewPortfolioDetails = ({
  data,
  endpoint,
  successStories,
  hidePrimaryCta,
}: Pick<PortfolioDetailsProps, "data" | "endpoint" | "successStories" | "hidePrimaryCta">) => {
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
  const hasConfiguredPrimaryCta = Boolean(
    data.portfolio.detailsCtaOne?.title ||
      data.portfolio.detailsCtaOne?.ctaText ||
      data.portfolio.detailsCtaOne?.ctaLink ||
      data.portfolio.detailsCtaOneTitle ||
      data.portfolio.detailsCtaOneLinkText,
  );
  const hasConfiguredSecondaryCta = Boolean(
    data.portfolio.detailsCtaTwo?.title ||
      data.portfolio.detailsCtaTwo?.ctaText ||
      data.portfolio.detailsCtaTwo?.ctaLink ||
      data.portfolio.detailsCtaTwoTitle ||
      data.portfolio.detailsCtaTwoButtonText,
  );

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
    portfolioHighlights: (data.portfolio.sectionVisibility?.highlights === false
      ? []
      : data.portfolio.newPortfolioHighlights || []).map(
      (highlight, index) => ({
        ...highlight,
        customId: `new-highlight-${index}`,
        companyId: Number(data.portfolio.id) || 0,
      }),
    ),
  };
// 
  return (
    <>
      <MainSectionDetails data={newData} />
      <HeroSectionDetails data={newData} />
      {data.portfolio.sectionVisibility?.previewImages !== false && (
        <ResultDetails data={newData} />
      )}
      {data.portfolio.sectionVisibility?.whatWeDelivered !== false && <WhatWeDelivered
        title={
          data.portfolio.whatWeDeliveredSec?.title ||
          data.portfolio.whatWeDeliveredTitle ||
          ""
        }
        data={deliveredData}
        endpoint={endpoint}
        colcount={3}
      />}
      {data.portfolio.sectionVisibility?.relatedPortfolios !== false &&
        (data.portfolio.sectionVisibility === undefined || successStories?.length) && <div className="container mx-auto border-t border-gray-400 py-4">
        <div>
          <SuccessStoriesPortfolio
            data={successStories ?? []}
            colCount={3}
          />
        </div>
      </div>}
      {!hidePrimaryCta && data.portfolio.sectionVisibility?.primaryCta !== false &&
        hasConfiguredPrimaryCta && <CtaDetailsone data={newData} />}
      {data.portfolio.sectionVisibility?.secondaryCta !== false &&
        (data.portfolio.sectionVisibility === undefined || hasConfiguredSecondaryCta) &&
        <CtaDetailsTwo data={newData} />}
    </>
  );
};

export default NewPortfolioDetails;
