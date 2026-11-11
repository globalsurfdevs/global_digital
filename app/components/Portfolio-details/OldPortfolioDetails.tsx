"use client";

import HeroSection from "./HeroSection";
import Goals from "./Goals";
import Result from "./Result";
import MainSection from "./MainSection";
import YtVideo from "./YtVideo";
import SocialMedia from "./SocialMedia";
import SocialMediaInstagram from "./SocialMediaInstagram";
import type { PortfolioDetailsProps } from "./PortfolioDetails.types";

const OldPortfolioDetails = ({
  data,
  successStories,
  instagramPosts,
  instagramFlush,
}: Pick<
  PortfolioDetailsProps,
  "data" | "successStories" | "instagramPosts" | "instagramFlush"
>) => (
  <>
    <MainSection data={data} />
    <HeroSection data={data} />
    <Goals data={data} companyName={data.companyName?.toString() ?? null} />
    <YtVideo data={data} />
    {data?.portfolio.section == "case study new" &&
      // Only the /v2 and /v3 pages pass `instagramPosts`; every other page
      // keeps the original section with the uploaded images.
      (instagramPosts !== undefined ? (
        <SocialMediaInstagram
          data={data}
          instagramPosts={instagramPosts}
          flush={instagramFlush === true}
        />
      ) : (
        <SocialMedia data={data} />
      ))}
    <Result data={data} successStories={successStories ?? []} />
  </>
);

export default OldPortfolioDetails;
