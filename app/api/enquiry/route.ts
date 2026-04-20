import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/app/models/Contact";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const filter: any = {};

    if (from || to) {
        filter.created_at = {};

        if (from) {
            filter.created_at.$gte = new Date(from);
        }

        if (to) {
            const toDate = new Date(to);
            toDate.setHours(23, 59, 59, 999); // include full day
            filter.created_at.$lte = toDate;
        }
    }

    const skip = (page - 1) * limit;

    const data = await Contact.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Contact.countDocuments(filter);

    return NextResponse.json({
        data,
        totalPages: Math.ceil(total / limit),
    });
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return NextResponse.json({ message: "Enquiry not deleted" }, { status: 404 });
        }
        return NextResponse.json({ data: contact, message: "Enquiry deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}