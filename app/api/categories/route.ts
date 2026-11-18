
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
    const name = formData.has("name")
      ? (formData.get("name") as string)?.trim()
      : undefined;
    const link = formData.has("link")
      ? (formData.get("link") as string)?.trim() ?? ""
      : undefined;
    const isHiddenValue = formData.get("isHidden");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (name !== undefined && !name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    if (
      isHiddenValue !== null &&
      isHiddenValue !== "true" &&
      isHiddenValue !== "false"
    ) {
      return NextResponse.json({ error: "Invalid category visibility value" }, { status: 400 });
    }

    if (name !== undefined) {
      const duplicate = await Category.findOne({
        _id: { $ne: id },
        name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
      });
      if (duplicate) {
        return NextResponse.json({ error: "Category already exists" }, { status: 400 });
      }
    }

    const updates: { name?: string; link?: string; isHidden?: boolean } = {};
    if (name !== undefined) updates.name = name;
    if (link !== undefined) updates.link = link;
    if (isHiddenValue !== null) updates.isHidden = isHiddenValue === "true";
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No category changes were provided" }, { status: 400 });
    }

    const updated = await Category.findByIdAndUpdate(
      id,
      updates,
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully", category: updated },
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
