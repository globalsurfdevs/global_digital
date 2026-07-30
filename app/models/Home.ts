import mongoose from "mongoose";
import seoSchema from "./Seo";

const homeSchema = new mongoose.Schema({
    seo: {
        type: seoSchema,
    },
    clientSection: {
        title: {
            type: String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
            }
        ]
    },
    testimonialSection: {
        title: {
            type: String
        },
        starText: {
            type: String
        },
        bottomText: {
            type: String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                name: { type: String, required: true },
                designation: { type: String, required: true },
                message: { type: String, required: true },
                companyLogo: { type: String, required: true },
                companyLogoAlt: { type: String, required: true },
                companyName: { type: String, required: true },
            }
        ]
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
})

export default mongoose.models.Home || mongoose.model("Home", homeSchema);