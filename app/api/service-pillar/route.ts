import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServicePillar from "@/app/models/ServicePiller";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const data = await ServicePillar.findOne({ slug }).lean();

      if (!data) {
        return NextResponse.json(
          { message: "Service Pillar not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ data }, { status: 200 });
    }

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await ServicePillar.countDocuments();

    const data = await ServicePillar.find(
      {},
      {
        _id:1,
        name: 1,
        slug: 1,
        icon:1,
        createdAt: 1,
      },
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        data,
        totalItems,
        totalPages: Math.max(Math.ceil(totalItems / limit), 1),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch Service Pillars:", error);

    return NextResponse.json(
      { message: "Failed to fetch Service Pillars" },
      { status: 500 },
    );
  }
}


const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export async function POST(req: NextRequest) {
  try {
    // const isAdmin = await verifyAdmin(req);

    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }

    await connectDB();

    const body = await req.json();
    const name = body?.name?.trim();
    const slug = body?.slug?.trim()
      ? slugify(body.slug)
      : slugify(name || "");

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 },
      );
    }

    const existing = await ServicePillar.findOne({ slug });

    if (existing) {
      return NextResponse.json(
        { message: "A Service Pillar with this slug already exists" },
        { status: 409 },
      );
    }

    const created = await ServicePillar.create({
      name,
      slug,
    });

    return NextResponse.json(
      {
        message: "Service Pillar created successfully",
        data: created,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create Service Pillar:", error);

    return NextResponse.json(
      { message: "Failed to create Service Pillar" },
      { status: 500 },
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    // const isAdmin = await verifyAdmin(req);

    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const currentSlug = searchParams.get("slug");
    const body = await req.json();
    // console.log("PUT request body:", body);
    // console.log("PUT request body:", currentSlug);
    // if (!currentSlug) {
    //   return NextResponse.json(
    //     { message: "Current slug is required" },
    //     { status: 400 },
    //   );
    // }

    const name = body?.name?.trim();
    const newSlug = body?.slug?.trim()
      ? slugify(body.slug)
      : slugify(name || "");


    if (!name || !newSlug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 },
      );
    }

    const slugTaken = await ServicePillar.findOne({
      slug: newSlug,
      _id: { $ne: (await ServicePillar.findOne({ slug: currentSlug }))?._id },
    });

    if (slugTaken) {
      return NextResponse.json(
        { message: "This slug is already in use" },
        { status: 409 },
      );
    }

    const updated = await ServicePillar.findOneAndUpdate(
      { _id: body._id }, 
      { name, slug: newSlug },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { message: "Service Pillar not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Service Pillar updated successfully",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update Service Pillar:", error);

    return NextResponse.json(
      { message: "Failed to update Service Pillar" },
      { status: 500 },
    );
  }
}