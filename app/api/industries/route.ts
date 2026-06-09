import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Industry from "@/app/models/Industry";

export async function GET() {
    try {
        await connectDB();
        const industries = await Industry.find({}).sort({ name: "asc" });
        return NextResponse.json({ industries });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        const name = formData.get("name") as string;

        if (!name?.trim()) {
            return NextResponse.json({ error: "Industry name is required" }, { status: 400 });
        }

        const existing = await Industry.findOne({ name: name.trim() });
        if (existing) {
            return NextResponse.json({ error: "Industry already exists" }, { status: 400 });
        }

        const industry = await Industry.create({ name: name.trim() });
        return NextResponse.json({ message: "Industry added successfully", industry }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add industry" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        const industry = await Industry.findByIdAndDelete(id);
        if (!industry) return NextResponse.json({ error: "Industry not found" }, { status: 404 });

        return NextResponse.json({ message: "Industry deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
    }
}