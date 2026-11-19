import { auth } from "@/auth";
import PortfolioIndustry from "@/app/models/PortfolioIndustry";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    if (
      !body ||
      typeof body !== "object" ||
      !Array.isArray((body as { industryIds?: unknown }).industryIds)
    ) {
      return NextResponse.json(
        { error: "A valid industry order is required." },
        { status: 400 },
      );
    }

    const industryIds = (body as { industryIds: unknown[] }).industryIds;
    if (
      !industryIds.every(
        (id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id),
      ) ||
      new Set(industryIds).size !== industryIds.length
    ) {
      return NextResponse.json(
        { error: "A valid industry order is required." },
        { status: 400 },
      );
    }

    await connectDB();
    const currentIndustries = await PortfolioIndustry.find({})
      .select("_id")
      .lean();
    const currentIds = currentIndustries.map((industry) =>
      String(industry._id),
    );
    const submittedIds = industryIds as string[];
    const currentSet = new Set(currentIds);

    if (
      submittedIds.length !== currentIds.length ||
      submittedIds.some((id) => !currentSet.has(id))
    ) {
      return NextResponse.json(
        { error: "The industry list changed. Reload it and try again." },
        { status: 409 },
      );
    }

    if (submittedIds.length > 0) {
      await PortfolioIndustry.bulkWrite(
        submittedIds.map((id, index) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { sortOrder: index + 1 } },
          },
        })),
      );
    }

    revalidatePath("/portfolio");
    revalidatePath("/portfolio/v2");
    return NextResponse.json({ message: "Industry order saved." });
  } catch (error) {
    console.error("Failed to reorder portfolio industries:", error);
    return NextResponse.json(
      { error: "Failed to save the industry order." },
      { status: 500 },
    );
  }
}
