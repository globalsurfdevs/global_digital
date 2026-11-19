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
  newBannerImage?: string;
  newBannerTitle?: string;
  newBannerAlt?: string;
  logoAlt?: string;
  oneLineBrandContext?: string;
  newPortfolioHighlights?: {
    number: string;
    text: string;
  }[];
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
  portfolioType?: "old" | "new";
  /** Collection that supplied this record; controls the public detail renderer. */
  portfolioSource?: "old" | "new";
  isNewPortfolioPublished?: boolean;
  /** Order within a selected portfolio industry, separate from the View All index. */
  index?: number;
  industryOrders?: {
    industryId?: string;
    index?: number;
  }[];
  sectionVisibility?: {
    highlights?: boolean;
    previewImages?: boolean;
    whatWeDelivered?: boolean;
    primaryCta?: boolean;
    secondaryCta?: boolean;
    relatedPortfolios?: boolean;
  };
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
  standalonePreviewImage?: string;
  whatWeDeliveredSec?: {
    title?: string;
    data?: {
      _id: number;
      title: string;
      dec?: string;
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
  homeTitle: string;
  homeSubTitle: string;
  slug: string;
  bannerTitle: string;
  websiteLink: string;
  video?: string;
  isListed?: boolean;
};
