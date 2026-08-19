import mongoose from "mongoose";
import seoSchema from "./Seo";

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
            ref: "portfolio",
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
            ref: "Service",
          },
          title: { type: String },
          description: { type: String },
          image: { type: String },
          imageAlt: { type: String },
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