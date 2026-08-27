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

    heroSection: {
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

    titleDescSection: {
      title: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
      },
    },

    ourApproachSection: {
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

    whyMatterSection: {
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

    expertiseSection: {
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

    BECSsection: {
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

    whatIncludeSection: {
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

    processSection: {
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

    IndustriesSection: {
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

    whyChooseSection: {
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

    relatedServiceSections: {
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
  }
);

const ServicePillar =
  mongoose.models.ServicePillar ||
  mongoose.model("ServicePillar", servicePillarSchema);

export default ServicePillar;