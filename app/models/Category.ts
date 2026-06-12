import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String
    },
    zone: {
        type: String,
        default: "zone2"
    },
    sortOrder: {
        type: Number,
        default: 0
    }
});

export default mongoose.models?.category || mongoose.model("category", CategoriesSchema);
