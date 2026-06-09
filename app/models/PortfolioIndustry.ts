import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

const PortfolioIndustrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subCategories: [SubCategorySchema],
}, { timestamps: true });

export default mongoose.models.portfolioIndustry || 
  mongoose.model("portfolioIndustry", PortfolioIndustrySchema);