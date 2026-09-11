import { SeoFormValues } from "@/app/types/seo";

export type ServicePillarData = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
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

  sixthSection: {
    title: string;
    items: {
      id: string;
      title: string;
      image: string;
      imageAlt: string;
      description: string;
    }[];
    showSection: boolean;
  };

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
    serviceIndustries: string[];
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
      pillarId: string;
      description: string;
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
