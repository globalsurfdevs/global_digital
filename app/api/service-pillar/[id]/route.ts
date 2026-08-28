import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import ServicePillar from "@/app/models/ServicePiller";
import { verifyAdmin } from "@/lib/verifyAdmin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;
    const slug = decodeURIComponent(id);
    const data = await ServicePillar.findOne({ slug }).lean();

    if (!data) {
      return NextResponse.json(
        { message: "Service Pillar not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Service Pillar:", error);
    return NextResponse.json(
      { message: "Failed to fetch Service Pillar" },
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
  

    const current =
      (await ServicePillar.findOne({ slug: currentSlug })) ||
      (body?._id ? await ServicePillar.findById(body._id) : null);

    if (!current) {
      return NextResponse.json(
        { message: "Service Pillar not found" },
        { status: 404 },
      );
    }

    const requestedSlug =
      typeof body?.slug === "string" ? body.slug.trim() : currentSlug;
    const nextSlug = requestedSlug || currentSlug;

    const slugTaken = await ServicePillar.findOne({
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
    const updated = await ServicePillar.findOneAndUpdate(
      { _id: current._id },
      { ...updateData, slug: nextSlug },
      { new: true, runValidators: true },
    ).lean();

    revalidateTag("service-pillar");
    revalidateTag(`service-pillar:${currentSlug}`);
    if (nextSlug !== currentSlug) {
      revalidateTag(`service-pillar:${nextSlug}`);
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
