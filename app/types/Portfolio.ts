export type Portfolio = {
  _id: string;
  customId: string;
  section: string;
  heading: string;
  id: number;
  companyName: string;
  industry: string;
  country: string;
  channelsUsed: string[];
  channels: { channelName: string; channelLink: string }[];
  bannerImage: string;
  story: string;
  goals: string;
  objectives: string;
  result: string;
  homeImage: string;
  resultImage1: string;
  resultImage2: string;
  section2BannerImage: string;
  section2Image1: string;
  section2Image2: string;
  solutions: string;
  challenge: string;
  strategyApproach: string;
  socialMediaImages: string[];
  categories: { name: string; link: string }[];
  tag: string;
  description: string;
  logo: string;
  portfolioType?: "legacy" | "modern";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    schema?: string;
  };
  previewImage?: {
    images: string[];
  };
  whatWeDeliveredSec?: {
    title?: string;
    data?: {
      _id: number;
      title: string;
      dec: string;
      icn?: string;
      urllink?: string[];
    }[];
  };
  detailsCtaOne?: {
    title?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  detailsCtaTwo?: {
    title?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  relatedPortfolios?: {
    title?: string;
    portfolio?: (string | { _id: string; companyName: string; slug?: string })[];
  };
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  whatWeDeliveredTitle?: string;
  whatWeDeliveredData?: {
    id: number;
    title: string;
    dec?: string;
    icn?: string;
    urllink?: string | string[];
  }[];
  detailsCtaOneTitle?: string;
  detailsCtaOneLinkText?: string;
  detailsCtaTwoTitle?: string;
  detailsCtaTwoButtonText?: string;
  coverImage: string;
  type?: string;
  index?: number;
  homeTitle: string;
  homeSubTitle: string;
  slug: string;
  bannerTitle: string;
  websiteLink: string;
  video?: string;
};
