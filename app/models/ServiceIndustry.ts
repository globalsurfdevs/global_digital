import mongoose from "mongoose";

const serviceIndustrySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceIndustry ||
  mongoose.model("ServiceIndustry", serviceIndustrySchema);