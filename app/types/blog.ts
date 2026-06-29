export interface BlogItem {
  title: string;
  content: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

// Individual blog post form
export interface BlogFormInputs {
  metaTitle: string;
  metaDescription: string;
  category: string;
  heading: string;
  slug: string;
  thumbnail: string;
  thumbnailAlt: string;
  content?: string;
  featuredImage: string;
  featuredImageAlt: string;
  items: BlogItem[];
  faqTitle: string;
  faqItems: BlogFaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  schemaScript?: string;
}

export interface BlogListItem {
  _id: string;
  heading: string;
  slug: string;
  thumbnail: string;
  isHidden: boolean;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
}

// Blog listing page config (singleton)
export interface BlogPageFormInputs {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
}