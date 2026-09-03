import mongoose from "mongoose";
import seoSchema from "./Seo";
import { MODEL_NAMES } from "../const/model-name/modelName";

const industryLandingSchema = new mongoose.Schema(
  {
    seo: {
      type: seoSchema,
    },
    firstSection: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      imageAlt: {
        type: String,
      },
    },
    secondSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
      buttonText: {
        type: String,
      },
      buttonLink: {
        type: String,
      },
    },
    thirdSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
      lastCardTitle: {
        type: String,
      },
      lastCardDescription: {
        type: String,
      },
    },
    caseStudySection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAMES.PORTFOLIO,
            set: (v: any) => (v === "" ? null : v),
          },
          description: { type: String },
          image: { type: String },
          imageAlt: { type: String },
        },
      ],
    },
    servicesSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: MODEL_NAMES.SERVICE_PILLAR,
            set: (v: any) => (v === "" ? null : v),
          },
          // title: { type: String },
          description: { type: String },
          // image: { type: String },
          // imageAlt: { type: String },
        },
      ],
    },
    ctaSection: {
      titleRed: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      buttonText: {
        type: String,
      },
      buttonLink: {
        type: String,
      },
    },
    faqSection: {
      title: {
        type: String,
      },
      items: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
    },
  },
  { timestamps: true },
);

export default mongoose.models.IndustryLandingPage ||
  mongoose.model("IndustryLandingPage", industryLandingSchema);