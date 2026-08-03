import mongoose from "mongoose";
import seoSchema from "./Seo";

const serviceItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    seo: {
        type: seoSchema,
    },
    firstSection: {
        image: {
            type: String
        },
        imageAlt: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                link: { type: String, required: true },
            }
        ]
    },
    secondSection: {
        title: {
            type: String
        },
        description: {
            type: String
        }
    },
    thirdSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        imageAlt: {
            type: String
        }
    },
    fourthSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        description: {
            type: String
        }
    },
    fifthSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    sixthSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    seventhSection: {
        title: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    eighthSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            }
        ]
    },
    ninethSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
            }
        ]
    },
    tenthSection: {
        title: {
            type: String
        },
        items: [
            {
                image: { type: String },
                imageAlt: { type: String, required: true },
                title: { type: String, required: true },
            }
        ]
    },
    eleventhSection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        description: {
            type: String
        },
        items: [
            {
                number: { type: String, required: true },
                value: { type: String, required: true },
            }
        ]
    },
    ctaSection: {
        titleRed: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        buttonText: {
            type: String
        },
        buttonLink: {
            type: String
        }
    },
    caseStudySection: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        items: [{
            title: String,
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "portfolio",
            },
            description: String
        }]
    },
    testimonialsSection: {
        title: {
            type: String
        }
    },
    faqSection: {
        title: {
            type: String
        },
        items: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
            }
        ]
    }
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
    items: [serviceItemSchema]
});

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);