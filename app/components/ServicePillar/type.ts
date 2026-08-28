import { SeoFormValues } from "@/app/types/seo";

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
  };

  secondSection: {
    title: string;
    description: string;
  };

  thirdSection: {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    imageAlt: string;
    buttonText: string;
    buttonLink: string;
  };

  fourthSection: {
    title: string;
    subTitle: string;
    description: string;
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
    }[];
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
  };

  eighthSection: {
    title: string;
    subTitle: string;
    items: {
      _id: string;
      title: string;
      description: string;
    }[];
  };

  ninthSection: {
    title: string;
    serviceIndustries: {
      _id: string;
      image: string;
      imageAlt: string;
      title: string;
      page: string;
    }[];
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
  };

  eleventhSection: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      link: string;
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
    data: {
      id: string;
      title: string;
      description: string;
    }[];
  };
};
