import { SeoFormValues } from "@/app/types/seo";
import { BECSData } from "../../BrandingAndPositioning/BECS";

export type ServicePillarData = {
  _id: string;
  name: string;
  slug: string;
  seo: SeoFormValues;

  firstSection: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    showSection: boolean;
  };

  secondSection: {
    title: string;
    description: string;
    showSection: boolean;
  };

  thirdSection: {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
    buttonText: string;
    buttonLink: string;
    showSection: boolean;
  };

  fourthSection: {
    title: string;
    subTitle: string;
    description: string;
    showSection: boolean;
  };

  fifthSection: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      _id: string;
      image: string;
      imageAlt: string;
      title: string;
      description: string;
      link?: string;
    }[];
    showSection: boolean;
  };

  sixthSection: BECSData;

  seventhSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      image: string;
      imageAlt: string;
      link: string;
    }[];
    showSection: boolean;
  };

  eighthSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      description: string;
    }[];
    showSection: boolean;
  };
  ninthSection: {
    title: string;
    serviceIndustries: {
      _id: string;
      image: string;
      imageAlt: string;
      title: string;
      page: string | null;
    }[];
    showSection: boolean;
  };
  tenthSection: {
    tag: string;
    title: string;
    description: string;
    items: {
      id: number;
      value: string;
      label: string;
    }[];
    showSection: boolean;
  };

  eleventhSection: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
      link: string;
    }[];
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
    data: {
      id: string;
      title: string;
      description: string;
    }[];
    showSection: boolean;
  };
};