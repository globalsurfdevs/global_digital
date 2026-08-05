import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/app/models/Service";
import { verifyAdmin } from "@/lib/verifyAdmin";

// POST /api/service/bulk-delete
// Body: { ids: string[] }
// Removes every item whose _id is in the given list from the items array.
export async function POST(req: NextRequest) {
    try {
        // const isAdmin = await verifyAdmin(req);
        // if (!isAdmin) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }
        await dbConnect();

        const body = await req.json();
        const ids: string[] = Array.isArray(body?.ids) ? body.ids : [];

        if (ids.length === 0) {
            return NextResponse.json(
                { message: "No service ids provided" },
                { status: 400 }
            );
        }

        const updatedDoc = await Service.findOneAndUpdate(
            {},
            { $pull: { items: { _id: { $in: ids } } } },
            { new: true }
        );

        if (!updatedDoc) {
            return NextResponse.json(
                { message: "No services found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: `${ids.length} service${ids.length > 1 ? "s" : ""} deleted successfully`,
        });
    } catch (error) {
        console.error("Error bulk deleting services:", error);
        return NextResponse.json(
            { message: "Failed to delete services" },
            { status: 500 }
        );
    }
}