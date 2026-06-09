import connectDB from "@/lib/mongodb";
import Industry from "@/app/models/Industry";

export const getIndustries = async () => {
    await connectDB();
    const industries = await Industry.find({}).sort({ name: "asc" }).lean();
    return JSON.parse(JSON.stringify(industries));
};