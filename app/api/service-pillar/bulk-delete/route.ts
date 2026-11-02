import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import ServicePillar from "@/app/models/ServicePiller";
import { verifyAdmin } from "@/lib/verifyAdmin";

// POST /api/service-pillar/bulk-delete
// Body: { ids: string[] }
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const ids = Array.isArray(body?.ids)
      ? body.ids.filter(
          (id: unknown): id is string =>
            typeof id === "string" && id.trim().length > 0,
        )
      : [];

    if (ids.length === 0) {
      return NextResponse.json(
        { message: "No Service Pillar IDs provided" },
        { status: 400 },
      );
    }

    const result = await ServicePillar.deleteMany({
      _id: { $in: ids },
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No Service Pillars found" },
        { status: 404 },
      );
    }

    revalidateTag("service-pillar");

    return NextResponse.json({
      message: `${result.deletedCount} Service Pillar${result.deletedCount === 1 ? "" : "s"} deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting Service Pillars:", error);
    return NextResponse.json(
      { message: "Failed to delete Service Pillars" },
      { status: 500 },
    );
  }
}
