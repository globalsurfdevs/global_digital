import mongoose, { Schema } from "mongoose";
import { MODEL_NAMES } from "@/app/const/model-name/modelName";
import seoSchema from "./Seo";

const highlightSchema = new Schema(
  {
    number: String,
    text: String,
  },
  { _id: false },
);

const deliveredItemSchema = new Schema({
  title: String,
  icon: String,
});

const callToActionSchema = new Schema(
  {
    title: String,
    buttonText: String,
    link: String,
  },
  { _id: false },
);

const NewPortfolioSchema = new Schema(
  {
    company: {
      name: String,
      industry: String,
      country: String,
    },
    slug: {
      type: String,
      index: true,
    },
    brand: {
      logo: String,
      websiteLink: String,
      banner: {
        image: String,
        title: String,
      },
      oneLineContext: String,
    },
    highlights: {
      type: [highlightSchema],
      default: undefined,
    },
    previewImages: {
      type: [String],
      default: undefined,
    },
    whatWeDelivered: {
      title: String,
      items: {
        type: [deliveredItemSchema],
        default: undefined,
      },
    },
    callsToAction: {
      primary: callToActionSchema,
      secondary: callToActionSchema,
    },
    relatedPortfolios: {
      title: String,
      items: [
        {
          type: Schema.Types.ObjectId,
          ref: MODEL_NAMES.NEW_PORTFOLIO,
        },
      ],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    seo: seoSchema,
    isPublished: {
      type: Boolean,
      default: false,
    },
    featured: Boolean,
    isListed: {
      type: Boolean,
      default: true,
    },
    index: Number,
  },
  {
    timestamps: true,
    collection: "new_portfolios",
  },
);

const NewPortfolio =
  mongoose.models[MODEL_NAMES.NEW_PORTFOLIO] ||
  mongoose.model(MODEL_NAMES.NEW_PORTFOLIO, NewPortfolioSchema);

export default NewPortfolio;
