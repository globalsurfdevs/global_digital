import connectDB from "@/lib/mongodb";
import PortfolioIndustry from "@/app/models/PortfolioIndustry";

export const getIndustries = async () => {
    await connectDB();
    const categories = await PortfolioIndustry.find({}).sort({ name: "asc" }).lean();
    const parsed = JSON.parse(JSON.stringify(categories));
    return parsed.map((cat: any) => ({
        _id: cat._id,
        name: cat.name,
        subCategories: (cat.subCategories ?? []).map((s: any) => s.name) as string[],
    }));
};