import mongoose from "mongoose";
import seoSchema from "./Seo";

const industriesItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    seo: {
      type: seoSchema,
    },
    firstSection: {
      image: {
        type: String,
      },
      imageAlt: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          link: { type: String },
        },
      ],
    },
    secondSection: {
      title: {
        type: String,
      },
      description: {
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
      image: {
        type: String,
      },
      imageAlt: {
        type: String,
      },
    },
    fourthSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    fifthSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          image: { type: String },
          imageAlt: { type: String },
          description: { type: String },
        },
      ],
    },
    sixthSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          description: { type: String },
        },
      ],
    },
    seventhSection: {
      title: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          image: { type: String },
          imageAlt: { type: String },
          description: { type: String },
        },
      ],
    },
    eighthSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          description: { type: String },
        },
      ],
    },
    ninethSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: String },
          imageAlt: { type: String },
        },
      ],
    },
    tenthSection: {
      title: { type: String },
      industriesIndustries: [
        { type: mongoose.Schema.Types.ObjectId, ref: "IndustriesIndustry" },
      ],
    },
    eleventhSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
      items: [
        {
          number: { type: String },
          value: { type: String },
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
    caseStudySection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          title: String,
          project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "portfolio",
          },
          description: String,
        },
      ],
    },
    testimonialsSection: {
      title: {
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

const industriesSchema = new mongoose.Schema({
  items: [industriesItemSchema],
});

export default mongoose.models.Industries ||
  mongoose.model("Industries", industriesSchema);
