import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import subService from "@/app/models/SubService";
import { verifyAdmin } from "@/lib/verifyAdmin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;
    const slug = decodeURIComponent(id);
    const data = await subService.findOne({ slug }).lean();

    if (!data) {
      return NextResponse.json(
        { message: "Sub Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Sub Service:", error);
    return NextResponse.json(
      { message: "Failed to fetch Sub Service" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
   
    const { id } = await params;

    const currentSlug = decodeURIComponent(id);
    const body = await request.json();

    // console.log("pillar body:", JSON.stringify(body.eleventhSection));
    const current =
      (await subService.findOne({ slug: currentSlug })) ||
      (body?._id ? await subService.findById(body._id) : null);

    if (!current) {
      return NextResponse.json(
        { message: "Sub Service not found" },
        { status: 404 },
      );
    }

    const requestedSlug =
      typeof body?.slug === "string" ? body.slug.trim() : currentSlug;
    const nextSlug = requestedSlug || currentSlug;

    const slugTaken = await subService.findOne({
      slug: nextSlug,
      _id: { $ne: current._id },
    });

    if (slugTaken) {
      return NextResponse.json(
        { message: "This slug is already in use" },
        { status: 409 },
      );
    }

    const { _id, createdAt, updatedAt, ...updateData } = body ?? {};
    const updated = await subService.findOneAndUpdate(
      { _id: current._id },
      { ...updateData, slug: nextSlug },
      { new: true, runValidators: true },
    ).lean();

    revalidateTag("sub-service");
    revalidateTag(`sub-service:${currentSlug}`);
    if (nextSlug !== currentSlug) {
      revalidateTag(`sub-service:${nextSlug}`);
    }

    return NextResponse.json(
      {
        message: "Sub Service updated successfully",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update Sub Service:", error);
    return NextResponse.json(
      { message: "Failed to update Sub Service" },
      { status: 500 },
    );
  }
}
