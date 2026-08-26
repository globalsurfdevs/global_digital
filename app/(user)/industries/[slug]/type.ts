// types/Service.ts

import { SeoFormValues } from "@/app/types/seo";

export interface IndustryItem {
  _id: string;
  name: string;
  slug: string;
  seo: SeoFormValues;

  firstSection: {
    image: string;
    imageAlt: string;
    logo: string;
    logoAlt: string;
    title: string;
    description: string;
    items: {
      _id: string;
      title: string;
      link: string;
    }[];
    showSection: boolean;
  };

  secondSection: {
    title: string;
    subTitle: string;
    description: string;
    showSection: boolean;
  };

  thirdSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      image: string;
      imageAlt: string;
      description: string;
      link: string;
    }[];
    showSection: boolean;
  };

  fourthSection: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      _id: string;
      title: string;
      description: string;
    }[];
    showSection: boolean;
  };

  fifthSection: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      _id: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
    showSection: boolean;
  };

  sixthSection: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      number: string;
      value: string;
    }[];
    showSection: boolean;
  };

  seventhSection: {
    title: string;
    subTitle: string;
    items: {
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
    showSection: boolean;
  };

  eighthSection: {
    title: string;
    items: {
      _id: string;
      company: string;
      number: string;
      value: string;
      title: string;
      description: string;
      isPrimary: boolean;
    }[];
    showSection: boolean;
  };

  ninethSection: {
    title: string;
    subTitle: string;
    logo: string;
    logoAlt: string;
    showSection: boolean;
  };

  ctaSection: {
    titleRed: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    showSection: boolean;
  };

  faqSection: {
    title: string;
    items: {
      _id: string;
      question: string;
      answer: string;
    }[];
    showSection: boolean;
  };

  createdAt: string;
  updatedAt: string;
}

export interface Industry {
  _id: string;
  items: IndustryItem[];
}
