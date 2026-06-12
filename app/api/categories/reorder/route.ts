import Category from "@/app/models/Category";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { categories } = await req.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await Promise.all(
        categories.map(({ _id, sortOrder }: { _id: string; sortOrder: number }) =>
          Category.findByIdAndUpdate(
            _id,
            { $set: { sortOrder } },
            { session }
          )
        )
      );

      await session.commitTransaction();
      return NextResponse.json({ message: "Reordered successfully" }, { status: 200 });

    } catch (err) {
      await session.abortTransaction();
      throw err; // bubble to outer catch
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.log("error reordering categories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}