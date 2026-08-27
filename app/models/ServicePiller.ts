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
    },

    secondSection: {
      title: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
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
    },

    fifthSection: {
      title: {
        type: String,
        // required: true,
      },
      items: [
        {
          _id: String,
          image: String,
          imageAlt: String,
          title: String,
          description: String,
        },
      ],
    },

    sixthSection: {
      title: {
        type: String,
        // required: true,
      },
      subTitle: {
        type: String,
      },
      items: [
        {
          id: String,
          title: String,
          image: String,
          imageAlt: String,
          link: String,
        },
      ],
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
          description: String,
        },
      ],
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
    },

    ninthSection: {
      title: {
        type: String,
        // required: true,
      },
      serviceIndustries: [
        {
          _id: String,
          image: String,
          imageAlt: String,
          title: String,
          page: String,
        },
      ],
    },

    tenthSection: {
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
          id: Number,
          value: String,
          label: String,
        },
      ],
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
          icon: String,
          link: String,
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
        // required: true,
      },
      data: [
        {
          id: String,
          title: String,
          description: String,
        },
      ],
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
