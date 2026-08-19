import mongoose from "mongoose";
import seoSchema from "./Seo";

const aboutSchema = new mongoose.Schema({
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
    video: {
      type: String,
    },
  },
  teamSection: {
    title: {
      type: String,
    },
    items: [
      {
        image: { type: String, required: true },
        imageAlt: { type: String, required: true },
        name: { type: String, required: true },
        designation: { type: String, required: true },
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
    items: [
      {
        image: {
          type: String,
        },
        imageAlt: {
          type: String,
        },
        title: {
          type: String,
        },
      },
    ],
  },
  fourthSection: {
    title: {
      type: String,
    },
    items: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  lastSection: {
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
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
