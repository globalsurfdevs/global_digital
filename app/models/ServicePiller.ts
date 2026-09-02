import mongoose from "mongoose";

import seoSchema from "./Seo";

const servicePillarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },

    slug: {
      type: String,
      //   required: true,
      unique: true,
    },
    icon: {
      type: String,
    },
    seo: {
      type: seoSchema,
      //   required: true,
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
        // required: true,
      },
      description: {
        type: String,
      },
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    secondSection: {
      title: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
      },
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    thirdSection: {
      title: {
        type: String,
        // required: true,
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
      buttonText: {
        type: String,
      },
      buttonLink: {
        type: String,
      },
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    fourthSection: {
      title: {
        type: String,
        // required: true,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    fifthSection: {
      title: {
        type: String,
        // required: true,
      },
      subTitle: {
        type: String,
      },
      description: {
        type: String,
      },
      items: [
        {
          _id: String,
          image: String,
          imageAlt: String,
          title: String,
          description: String,
          link: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    sixthSection: {
      title: {
        type: String,
        // required: true,
      },

      items: [
        {
          _id: String,
          title: String,
          image: String,
          imageAlt: String,
          link: String,
          description: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    seventhSection: {
      title: {
        type: String,
        // required: true,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          _id: String,
          title: String,
          image: String,
          imageAlt: String,
          link: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    eighthSection: {
      title: {
        type: String,
        // required: true,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          _id: String,
          title: String,
          description: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },
    ninthSection: {
      title: String,
      serviceIndustries: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ServiceIndustry" },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },
    tenthSection: {
      tag: {
        type: String,
        // required: true,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      items: [
        {
          id: Number,
          value: String,
          label: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    eleventhSection: {
      title: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
      },
      items: [
        {
          id: String,
          title: String,
          description: String,
          image: String,
          imageAlt: String,
          link: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
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
      showSection: {
        type: Boolean,
        default: true,
      },
    },

    faqSection: {
      title: {
        type: String,
        // required: true,
      },
      data: [
        {
          id: String,
          title: String,
          description: String,
        },
      ],
      showSection: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const ServicePillar =
  mongoose.models.ServicePillar ||
  mongoose.model("ServicePillar", servicePillarSchema);

export default ServicePillar;
