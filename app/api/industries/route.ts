// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import Industry from "@/app/models/Industry";

// export async function GET() {
//     try {
//         await connectDB();
//         const industries = await Industry.find({}).sort({ name: "asc" });
//         return NextResponse.json({ industries });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
//     }
// }

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();
//         const formData = await req.formData();
//         const name = formData.get("name") as string;

//         if (!name?.trim()) {
//             return NextResponse.json({ error: "Industry name is required" }, { status: 400 });
//         }

//         const existing = await Industry.findOne({ name: name.trim() });
//         if (existing) {
//             return NextResponse.json({ error: "Industry already exists" }, { status: 400 });
//         }

//         const industry = await Industry.create({ name: name.trim() });
//         return NextResponse.json({ message: "Industry added successfully", industry }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to add industry" }, { status: 500 });
//     }
// }

// export async function DELETE(req: NextRequest) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get("id");

//         if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

//         const industry = await Industry.findByIdAndDelete(id);
//         if (!industry) return NextResponse.json({ error: "Industry not found" }, { status: 404 });

//         return NextResponse.json({ message: "Industry deleted successfully" });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
//     }
// }





import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PortfolioIndustry from "@/app/models/PortfolioIndustry";

export async function GET() {
  try {
    await connectDB();
    const categories = await PortfolioIndustry.find({}).sort({ name: "asc" }).lean();
    const normalized = (categories as any[]).map((cat) => ({
      ...cat,
      subCategories: cat.subCategories ?? [],
    }));
    return NextResponse.json({ categories: normalized });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const action = formData.get("action") as string;

    if (action === "add_category") {
      const name = (formData.get("name") as string)?.trim();
      if (!name) return NextResponse.json({ error: "Category name is required" }, { status: 400 });
      const existing = await PortfolioIndustry.findOne({ name });
      if (existing) return NextResponse.json({ error: "Category already exists" }, { status: 400 });
      const category = await PortfolioIndustry.create({ name, subCategories: [] });
      return NextResponse.json({ message: "Category added", category });
    }

    if (action === "add_sub") {
      const categoryId = formData.get("categoryId") as string;
      const name = (formData.get("name") as string)?.trim();
      if (!categoryId || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      const category = await PortfolioIndustry.findById(categoryId);
      if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
      const duplicate = category.subCategories.find(
        (s: { name: string }) => s.name.toLowerCase() === name.toLowerCase()
      );
      if (duplicate) return NextResponse.json({ error: "Sub-category already exists" }, { status: 400 });
      category.subCategories.push({ name });
      await category.save();
      return NextResponse.json({ message: "Sub-category added", category });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const subId = searchParams.get("subId");

    if (!categoryId) return NextResponse.json({ error: "categoryId is required" }, { status: 400 });

    if (subId) {
      const category = await PortfolioIndustry.findById(categoryId);
      if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
      category.subCategories = category.subCategories.filter(
        (s: { _id: { toString: () => string } }) => s._id.toString() !== subId
      );
      await category.save();
      return NextResponse.json({ message: "Sub-category deleted" });
    }

    const deleted = await PortfolioIndustry.findByIdAndDelete(categoryId);
    if (!deleted) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ message: "Category deleted" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}