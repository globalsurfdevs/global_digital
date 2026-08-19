import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Lead from "@/app/models/Lead";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { ids } = await req.json();

    await Lead.deleteMany({
      _id: { $in: ids },
    });

    return NextResponse.json({
      message: "Enquiries deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
