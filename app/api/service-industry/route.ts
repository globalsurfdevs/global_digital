import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceIndustry from "@/app/models/ServiceIndustry";

export async function GET() {
  try {
    await connectDB();
    const data = await ServiceIndustry.find().sort({ createdAt: -1 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch service industries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { image, imageAlt, title } = body;

    if (!image || !imageAlt || !title) {
      return NextResponse.json(
        { message: "image, imageAlt and title are required" },
        { status: 400 }
      );
    }

    const created = await ServiceIndustry.create({ image, imageAlt, title });
    return NextResponse.json(
      { message: "Service industry created", data: created },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create service industry" },
      { status: 500 }
    );
  }
}