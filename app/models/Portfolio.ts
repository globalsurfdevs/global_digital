import mongoose, { Schema } from "mongoose";

import { MODEL_NAMES } from "../const/model-name/modelName";
import seoSchema from "./Seo";

const WhatWeDeliveredDataSchema = new Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
  },
  icn: {
    type: String,
  },
  dec: {
    type: String,
  },
  urllink: {
    type: [String],
    default: [],
  },
});
const PortfolioSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    industry: {
      type: String,
    },
    country: {
      type: String,
    },
    channelsUsed: [
      {
        type: String,
      },
    ],
    bannerImage: {
      type: String,
    },
    story: {
      type: String,
    },
    section2Image1: {
      type: String,
    },
    section2Image2: {
      type: String,
    },
    goals: {
      type: String,
    },
    objectives: {
      type: String,
    },
    section2BannerImage: {
      type: String,
    },
    challenge: {
      type: String,
    },
    solutions: {
      type: String,
    },
    result: {
      type: String,
    },
    resultImage1: {
      type: String,
    },
    resultImage2: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category",
      },
    ],
    tag: {
      type: String,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
    slug: {
      type: String,
    },
    seo: {
      type: seoSchema,
    },
    portfolioType: {
      type: String,
      enum: ["legacy", "modern"],
    },
    previewImage: {
      images: {
        type: [String],
        default: [],
      },
    },
    whatWeDeliveredSec: {
      title: String,
      data: {
        type: [WhatWeDeliveredDataSchema],
        default: [],
      },
    },
    detailsCtaOne: {
      title: String,
      ctaText: String,
      ctaLink: String,
    },
    detailsCtaTwo: {
      title: String,
      ctaText: String,
      ctaLink: String,
    },
    relatedPortfolios: {
      title: String,
      portfolio: [
        {
          type: Schema.Types.ObjectId,
          ref: MODEL_NAMES.PORTFOLIO,
        },
      ],
    },
    section: {
      type: String,
    },
    customId: {
      type: String,
    },
    index: {
      type: Number,
    },
    websiteLink: {
      type: String,
    },
    bannerTitle: {
      type: String,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "channel",
      },
    ],
    video: {
      type: String,
    },
    videoTitle: {
      type: String,
    },
    strategyApproach: {
      type: String,
    },
    socialMediaImages: [],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models[MODEL_NAMES.PORTFOLIO] ||
  mongoose.model(MODEL_NAMES.PORTFOLIO, PortfolioSchema);
