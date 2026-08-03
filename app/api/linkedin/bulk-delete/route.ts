import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Linkedin from "@/app/models/Linkedin";

export async function POST(req: Request) {
    try {
        await connectDb();

        const { ids } = await req.json();

        await Linkedin.deleteMany({
            _id: { $in: ids },
        });

        return NextResponse.json({
            message: "Data deleted successfully",
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Delete failed" },
            { status: 500 }
        );
    }
}