import type { SeoFormValues } from "@/app/types/seo";

export type NewPortfolioHighlight = {
  number?: string;
  text?: string;
};

export type NewPortfolioDeliveredItem = {
  _id?: string;
  title?: string;
  icon?: string;
};

export type NewPortfolioCallToAction = {
  title?: string;
  buttonText?: string;
  link?: string;
};

export type NewPortfolio = {
  _id?: string;
  company?: {
    name?: string;
    industry?: string;
    country?: string;
  };
  slug?: string;
  brand?: {
    logo?: string;
    websiteLink?: string;
    banner?: {
      image?: string;
      title?: string;
    };
    oneLineContext?: string;
  };
  highlights?: NewPortfolioHighlight[];
  previewImages?: string[];
  standalonePreviewImage?: string;
  whatWeDelivered?: {
    title?: string;
    items?: NewPortfolioDeliveredItem[];
  };
  callsToAction?: {
    primary?: NewPortfolioCallToAction;
    secondary?: NewPortfolioCallToAction;
  };
  relatedPortfolios?: {
    title?: string;
    items?: string[];
  };
  categories?: (string | { _id: string; name?: string; link?: string })[];
  sectionVisibility?: {
    highlights?: boolean;
    previewImages?: boolean;
    whatWeDelivered?: boolean;
    primaryCta?: boolean;
    secondaryCta?: boolean;
    relatedPortfolios?: boolean;
  };
  seo?: Partial<SeoFormValues>;
  isPublished?: boolean;
  featured?: boolean;
  isListed?: boolean;
  index?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
