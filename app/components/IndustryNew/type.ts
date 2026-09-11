import { SeoFormValues } from "@/app/types/seo";

export interface IndustryLandingPageType {
  _id: string;
  seo: SeoFormValues;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    subTitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  thirdSection: {
    title: string;
    subTitle: string;
    description: string;
    lastCardTitle: string;
    lastCardDescription: string;
  };
  caseStudySection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      project: {
        _id: string;
        companyName: string;
        slug: string;
        logo: string;
        section:string;
      };
      description: string;
      image: string;
      imageAlt: string;
    }[];
  };
  servicesSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      service: {
        _id: string;
        name: string;
        slug: string;
        icon: string;
        imageAlt: string;
      };
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
  };
  ctaSection: {
    titleRed: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  faqSection: {
    title: string;
    items: {
      _id: string;
      question: string;
      answer: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}