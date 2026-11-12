import type { SeoFormValues } from "@/app/types/seo";

export type PortfolioFormValues = {
  portfolioType: "old" | "new";
  seo: SeoFormValues;
  companyName: string;
  industry: string;
  country: string;
  channelsUsed: { channelName?: string }[];
  story: string;
  goals: string;
  objectives: string;
  challenge: string;
  strategyApproach: string;
  socialMediaImages: string[];
  solutions: string;
  result: string;
  description: string;
  tag: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  whatWeDeliveredTitle: string;
  whatWeDeliveredData: string;
  detailsCtaOneTitle: string;
  detailsCtaOneLinkText: string;
  detailsCtaTwoTitle: string;
  detailsCtaTwoButtonText: string;
  newDetailsCtaOneLink: string;
  newDetailsCtaTwoLink: string;
  newBannerTitle: string;
  oneLineBrandContext: string;
  relatedPortfoliosTitle: string;
  websiteLink: string;
  bannerTitle: string;
  video: string;
  videoTitle: string;
  featured: string;
} & { [key: `highlightNumber${string}`]: string } & {
  [key: `highlightText${string}`]: string;
};

export type NewDeliveredItem = {
  _id: number;
  title: string;
  icn: string;
  urllink: string[];
};

export type AddingHighlight = {
  highlightText: string;
  highlightNumber: string;
  customId: string;
};
