
import Category from "@/app/models/Category";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  

    await connectDB();
    const categories = await Category.find({});

    if (categories) {
      return NextResponse.json({ categories });
    }

    if (!categories) {
      return NextResponse.json({ error: "Fetching categories failed" });
    }
  } catch (error) {
    console.log("error getting categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const category = (formData.get("category") as string)?.trim();
    const categoryLink = (formData.get("categoryLink") as string)?.trim() ?? "";

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 },
      );
    }

    const existing = await Category.findOne({ name: new RegExp(`^${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    await Category.create({ name: category, link: categoryLink });

    return NextResponse.json(
      { message: "Added category successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("error adding category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Removed category successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("error removing categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = (formData.get("name") as string)?.trim();
    const link = (formData.get("link") as string)?.trim() ?? "";

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const duplicate = await Category.findOne({
      _id: { $ne: id },
      name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
    });
    if (duplicate) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, link },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("error updating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
