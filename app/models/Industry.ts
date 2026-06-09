import mongoose from "mongoose";

const IndustrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.industry || mongoose.model("industry", IndustrySchema);
