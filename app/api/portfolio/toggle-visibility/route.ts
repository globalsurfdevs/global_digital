import { auth } from "@/auth";
import Portfolio from "@/app/models/Portfolio";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const id = new URL(req.url).searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "A valid portfolio ID is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }


   const updatedPortfolio = await Portfolio.findByIdAndUpdate(
     id,
     { isListed: !portfolio.isListed },
     { new: true },
   );
   if (!updatedPortfolio) {
     return NextResponse.json(
       { error: "Portfolio not found" },
       { status: 404 },
     );
   }

    revalidateTag("portfolio");
    revalidateTag("caseStudies");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      message: updatedPortfolio.isListed ? "Portfolio listed" : "Portfolio unlisted",
      isListed: updatedPortfolio.isListed,
    });
  } catch (error) {
    console.error("Error toggling portfolio listing status:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio listing status" },
      { status: 500 },
    );
  }
}
