import mongoose, { Schema, Document, Model } from "mongoose";

// ─── Individual Blog Post ────────────────────────────────────────────────────

export interface IBlogItem {
  title: string;
  content: string;
}

export interface IBlogFaqItem {
  question: string;
  answer: string;
}

export interface IBlog extends Document {
  metaTitle: string;
  metaDescription: string;
  category: string;
  heading: string;
  slug: string;
  publishedAt: Date;
  thumbnail: string;
  thumbnailAlt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  items: IBlogItem[];
  faqTitle: string;
  faqItems: IBlogFaqItem[];
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
  schemaScript: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

const BlogItemSchema = new Schema<IBlogItem>({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});

const BlogFaqItemSchema = new Schema<IBlogFaqItem>({
  question: { type: String, default: "" },
  answer: { type: String, default: "" },
});

const BlogSchema = new Schema<IBlog>(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    category: { type: String, default: "" },
    heading: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    publishedAt: { type: Date, default: Date.now },
    thumbnail: { type: String, default: "" },
    thumbnailAlt: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    featuredImageAlt: { type: String, default: "" },
    content: { type: String, default: "" },
    items: { type: [BlogItemSchema], default: [] },
    faqTitle: { type: String, default: "" },
    faqItems: { type: [BlogFaqItemSchema], default: [] },
    isHidden: { type: Boolean, default: false },
    schemaScript: { type: String, default: "" },
    ctaTitle: { type: String, default: "" },
    ctaDescription: { type: String, default: "" },
    ctaButtonText: { type: String, default: "" },
    ctaButtonLink: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

// ─── Blog Listing Page (singleton) ──────────────────────────────────────────

export interface IBlogPage extends Document {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
}

const BlogPageSchema = new Schema<IBlogPage>({
  metaTitle: { type: String, default: "" },
  metaDescription: { type: String, default: "" },
  pageTitle: { type: String, default: "" },
  pageDescription: { type: String, default: "" },
});

export const BlogPage: Model<IBlogPage> =
  mongoose.models.BlogPage ||
  mongoose.model<IBlogPage>("BlogPage", BlogPageSchema);

export default Blog;