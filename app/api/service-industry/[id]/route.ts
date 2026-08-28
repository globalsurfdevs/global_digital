import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ServiceIndustry from "@/app/models/ServiceIndustry";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    console.log("Request body:", body);
    const updated = await ServiceIndustry.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });   
    console.log("Updated document:", updated);

    if (!updated) {
      return NextResponse.json(
        { message: "Service industry not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Service industry updated", data: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update service industry" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await ServiceIndustry.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Service industry not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Service industry deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete service industry" },
      { status: 500 },
    );
  }
}
