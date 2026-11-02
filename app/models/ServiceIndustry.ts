import mongoose from "mongoose";

const serviceIndustrySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    title: { type: String, required: true },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Industry_new" },
    slug:{type:String}
  },
  { timestamps: true },
);

export default mongoose.models.ServiceIndustry ||
  mongoose.model("ServiceIndustry", serviceIndustrySchema);
