import { SeoFormValues } from "./seo";

export interface HomeType {
  seo: SeoFormValues;

  clientSection: {
    title: string;
    items: ClientItemType[];
  };

  testimonialSection: {
    title: string;
    starText: string;
    bottomText: string;
    items: TestimonialItemType[];
  };

  faqSection: {
    title: string;
    items: FAQItemType[];
  };
}

export interface ClientItemType {
  image: string;
  imageAlt: string;
}

export interface TestimonialItemType {
  image: string;
  imageAlt: string;
  name: string;
  designation: string;
  message: string;
  companyLogo: string;
  companyLogoAlt: string;
  companyName: string;
}

export interface FAQItemType {
  question: string;
  answer: string;
}