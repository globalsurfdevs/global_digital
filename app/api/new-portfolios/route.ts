import { auth } from "@/auth";
import NewPortfolio from "@/app/models/NewPortfolio";
import Category from "@/app/models/Category";
import PortfolioIndustry from "@/app/models/PortfolioIndustry";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const editableFields = [
  "company",
  "slug",
  "brand",
  "highlights",
  "previewImages",
  "whatWeDelivered",
  "callsToAction",
  "relatedPortfolios",
  "categories",
  "sectionVisibility",
  "seo",
  "isPublished",
  "featured",
  "isListed",
  "index",
] as const;

function pickEditableFields(body: Record<string, unknown>) {
  return Object.fromEntries(
    editableFields
      .filter((field) => Object.hasOwn(body, field))
      .map((field) => [field, body[field]]),
  );
}

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

async function validateRelatedPortfolios(
  relatedPortfolios: unknown,
  currentId?: string,
) {
  if (relatedPortfolios === undefined) return null;
  if (!relatedPortfolios || typeof relatedPortfolios !== "object") {
    return "Related portfolios must be an object.";
  }

  const items = (relatedPortfolios as { items?: unknown }).items;
  if (items === undefined) return null;
  if (
    !Array.isArray(items) ||
    !items.every(
      (id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id),
    )
  ) {
    return "Related portfolio IDs must be valid IDs.";
  }

  if (currentId && items.includes(currentId)) {
    return "A portfolio cannot be related to itself.";
  }

  const uniqueIds = [...new Set(items as string[])];
  const matchingCount = await NewPortfolio.countDocuments({
    _id: { $in: uniqueIds },
  });
  return matchingCount === uniqueIds.length
    ? null
    : "Related portfolios must reference existing new portfolios.";
}

async function validateCategories(categories: unknown) {
  if (categories === undefined) return null;
  if (
    !Array.isArray(categories) ||
    !categories.every(
      (id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id),
    )
  ) {
    return "Categories must be a list of valid category IDs.";
  }
  const ids = [...new Set(categories as string[])];
  const count = await Category.countDocuments({ _id: { $in: ids } });
  return count === ids.length ? null : "One or more categories were not found.";
}

async function validateIndustry(company: unknown) {
  if (!company || typeof company !== "object") return null;
  const industry = (company as { industry?: unknown }).industry;
  if (industry === undefined || industry === "") return null;
  if (typeof industry !== "string") return "Select a valid industry.";
  const portfolioIndustries = await PortfolioIndustry.find({})
    .select("subCategories.name")
    .lean();
  const validNames = portfolioIndustries.flatMap((item) =>
    (item.subCategories || []).map((subCategory: { name: string }) => subCategory.name),
  );
  return validNames.includes(industry) ? null : "Selected industry was not found.";
}

async function revalidateNewPortfolioPages(slug?: string) {
  revalidateTag("new-portfolios");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/portfolio/${slug}`);
    revalidatePath(`/portfolio/${slug}-v2`);
  }
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const id = new URL(request.url).searchParams.get("id");
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid portfolio ID." }, { status: 400 });
      }
      const portfolio = await NewPortfolio.findById(id).lean();
      if (!portfolio) {
        return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
      }
      return NextResponse.json({ portfolio });
    }

    const portfolios = await NewPortfolio.find({})
      .sort({ index: 1, updatedAt: -1 })
      .lean();
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error("Failed to fetch new portfolios:", error);
    return NextResponse.json({ error: "Failed to fetch new portfolios." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be an object." }, { status: 400 });
    }
    const fields = pickEditableFields(body as Record<string, unknown>);
    const relatedError = await validateRelatedPortfolios(fields.relatedPortfolios);
    if (relatedError) {
      return NextResponse.json({ error: relatedError }, { status: 400 });
    }
    const categoryError = await validateCategories(fields.categories);
    if (categoryError) return NextResponse.json({ error: categoryError }, { status: 400 });
    const industryError = await validateIndustry(fields.company);
    if (industryError) return NextResponse.json({ error: industryError }, { status: 400 });
    const slug = typeof fields.slug === "string" ? fields.slug.trim() : "";
    if (slug && (await NewPortfolio.exists({ slug }))) {
      return NextResponse.json({ error: "That new portfolio slug is already in use." }, { status: 409 });
    }

    const portfolio = await NewPortfolio.create({
      ...fields,
      ...(slug ? { slug } : {}),
      isPublished: fields.isPublished === true,
    });
    await revalidateNewPortfolioPages(portfolio.slug);
    return NextResponse.json({ message: "New portfolio created.", portfolio }, { status: 201 });
  } catch (error) {
    console.error("Failed to create new portfolio:", error);
    return NextResponse.json({ error: "Failed to create new portfolio." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "A valid portfolio ID is required." }, { status: 400 });
    }

    await connectDB();
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be an object." }, { status: 400 });
    }
    const fields = pickEditableFields(body as Record<string, unknown>);
    const relatedError = await validateRelatedPortfolios(fields.relatedPortfolios, id);
    if (relatedError) {
      return NextResponse.json({ error: relatedError }, { status: 400 });
    }
    const categoryError = await validateCategories(fields.categories);
    if (categoryError) return NextResponse.json({ error: categoryError }, { status: 400 });
    const industryError = await validateIndustry(fields.company);
    if (industryError) return NextResponse.json({ error: industryError }, { status: 400 });
    const slug = typeof fields.slug === "string" ? fields.slug.trim() : undefined;
    if (slug && (await NewPortfolio.exists({ slug, _id: { $ne: id } }))) {
      return NextResponse.json({ error: "That new portfolio slug is already in use." }, { status: 409 });
    }
    if (slug !== undefined) fields.slug = slug;

    const portfolio = await NewPortfolio.findByIdAndUpdate(
      id,
      { $set: fields },
      { new: true, runValidators: true },
    );
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }
    await revalidateNewPortfolioPages(portfolio.slug);
    return NextResponse.json({ message: "New portfolio updated.", portfolio });
  } catch (error) {
    console.error("Failed to update new portfolio:", error);
    return NextResponse.json({ error: "Failed to update new portfolio." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "A valid portfolio ID is required." }, { status: 400 });
    }
    await connectDB();
    const portfolio = await NewPortfolio.findByIdAndUpdate(
      id,
      { $set: { isListed: false } },
      { new: true },
    );
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
    }
    await revalidateNewPortfolioPages(portfolio.slug);
    return NextResponse.json({ message: "New portfolio archived.", portfolio });
  } catch (error) {
    console.error("Failed to archive new portfolio:", error);
    return NextResponse.json({ error: "Failed to archive new portfolio." }, { status: 500 });
  }
}
