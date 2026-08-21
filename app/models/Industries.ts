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
      logo: {
        type: String,
      },
      logoAlt: {
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
      subTitle: {
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
      items: [
        {
          title: { type: String },
          image: { type: String },
          imageAlt: { type: String },
          description: { type: String },
          link: { type: String },
        },
      ],
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
      items: [
        {
          title: { type: String },
          description: { type: String },
        },
      ],
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
          image: { type: String },
          imageAlt: { type: String },
          title: { type: String },
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
    seventhSection: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          image: { type: String },
          imageAlt: { type: String },
          title: { type: String },
          description: { type: String },
        },
      ],
    },
    eighthSection: {
      title: {
        type: String,
      },
      items: [
        {
          company: { type: String },
          number: { type: String },
          value: { type: String },
          title: { type: String },
          description: { type: String },
          isPrimary: { type: Boolean, default: false },
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
      logo: {
        type: String,
      },
      logoAlt: {
        type: String,
      },
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

const industriesSchema = new mongoose.Schema({
  items: [industriesItemSchema],
});

export default mongoose.models.Industry_new ||
  mongoose.model("Industry_new", industriesSchema);
