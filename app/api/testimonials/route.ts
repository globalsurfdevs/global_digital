import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonials from "@/app/models/Testimonials";
import { revalidateTag } from "next/cache";

export async function GET() {
    try {
        await dbConnect();

        const doc = await Testimonials.findOne({});

        return NextResponse.json({ data: doc ?? {} });
    } catch (error) {
        console.error("Error fetching testimonials page:", error);
        return NextResponse.json(
            { message: "Failed to fetch testimonials" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();

        const updatedDoc = await Testimonials.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, upsert: true }
        );

        revalidateTag("testimonials")

        return NextResponse.json({
            message: "Testimonials updated successfully",
            data: updatedDoc,
        });
    } catch (error) {
        console.error("Error updating testimonials page:", error);
        return NextResponse.json(
            { message: "Failed to update testimonials" },
            { status: 500 }
        );
    }
}