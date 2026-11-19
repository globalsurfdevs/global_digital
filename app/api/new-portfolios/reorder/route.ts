import { auth } from "@/auth";
import PortfolioIndustry from "@/app/models/PortfolioIndustry";
import NewPortfolio from "@/app/models/NewPortfolio";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type ReorderBody = {
  scope?: "all" | "industry";
  industryId?: string;
  portfolioIds?: string[];
};

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

function sameIds(expected: string[], received: string[]) {
  if (expected.length !== received.length) return false;
  const expectedSet = new Set(expected);
  return (
    expectedSet.size === expected.length &&
    received.every((id) => expectedSet.has(id))
  );
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as ReorderBody;
    if (
      !body ||
      (body.scope !== "all" && body.scope !== "industry") ||
      !Array.isArray(body.portfolioIds) ||
      !body.portfolioIds.every(
        (id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id),
      ) ||
      new Set(body.portfolioIds).size !== body.portfolioIds.length
    ) {
      return NextResponse.json(
        { error: "A valid portfolio order is required." },
        { status: 400 },
      );
    }

    await connectDB();
    let query: Record<string, unknown> = {};
    let industryId: mongoose.Types.ObjectId | undefined;

    if (body.scope === "industry") {
      if (
        !body.industryId ||
        !mongoose.Types.ObjectId.isValid(body.industryId)
      ) {
        return NextResponse.json(
          { error: "A valid industry is required." },
          { status: 400 },
        );
      }

      const industry = await PortfolioIndustry.findById(body.industryId)
        .select("subCategories.name")
        .lean<{ subCategories?: { name: string }[] }>();
      if (!industry) {
        return NextResponse.json(
          { error: "Industry not found." },
          { status: 404 },
        );
      }

      const subCategoryNames = (industry.subCategories || []).map(
        (subCategory: { name: string }) => subCategory.name,
      );
      query = { "company.industry": { $in: subCategoryNames } };
      industryId = new mongoose.Types.ObjectId(body.industryId);
    }

    const current = await NewPortfolio.find(query).select("_id").lean();
    const expectedIds = current.map((item) => String(item._id));
    if (!sameIds(expectedIds, body.portfolioIds)) {
      return NextResponse.json(
        { error: "The portfolio list changed. Reload it and try again." },
        { status: 409 },
      );
    }

    const existingIndustryOrders =
      body.scope === "industry"
        ? await NewPortfolio.find({ _id: { $in: body.portfolioIds } })
            .select("_id industryOrders")
            .lean()
        : [];
    const industryOrdersById = new Map<string, any[]>(
      existingIndustryOrders.map((portfolio) => [
        String(portfolio._id),
        portfolio.industryOrders || [],
      ] as const),
    );

    const operations = body.portfolioIds.map((id, index) => {
      const update =
        body.scope === "all"
          ? { $set: { index: index + 1 } }
          : {
              $set: {
                industryOrders: [
                  ...(industryOrdersById.get(id) || []).filter(
                    (order: { industryId?: mongoose.Types.ObjectId | string }) =>
                      String(order.industryId) !== String(industryId),
                  ),
                  { industryId: industryId!, index: index + 1 },
                ],
              },
            };
      return { updateOne: { filter: { _id: id }, update } };
    });

    if (operations.length > 0) await NewPortfolio.bulkWrite(operations);
    revalidateTag("new-portfolios");
    revalidatePath("/portfolio");
    revalidatePath("/portfolio/v2");

    return NextResponse.json({ message: "Portfolio order saved." });
  } catch (error) {
    console.error("Failed to reorder new portfolios:", error);
    return NextResponse.json(
      { error: "Failed to save the portfolio order." },
      { status: 500 },
    );
  }
}
