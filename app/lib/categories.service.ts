import connectDB from "@/lib/mongodb";
import Category from "@/app/models/Category";

export const getCategories = async () => {
  await connectDB();
  const categories = await Category.find({}).sort({ sortOrder: 1 }).lean();
  const parsed = JSON.parse(JSON.stringify(categories));
  return parsed.map((c: any) => ({
    _id: c._id,
    name: c.name,
    link: c.link,
    sortOrder: c.sortOrder ?? 0,
  }));
};