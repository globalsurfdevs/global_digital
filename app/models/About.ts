import mongoose from "mongoose";
import seoSchema from "./Seo";

const aboutSchema = new mongoose.Schema({
    seo: {
        type: seoSchema,
    },
    teamSection: {
        title:{
            type:String
        },
        items: [
            {
                image: { type: String, required: true },
                imageAlt: { type: String, required: true },
                name: { type: String, required: true },
                designation: { type: String, required: true },
            }
        ]
    }
})

export default mongoose.models.About || mongoose.model("About", aboutSchema);