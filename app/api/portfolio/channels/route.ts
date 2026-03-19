// import { supabase } from "@/app/lib/initSupabase";
// import { Portfolio } from "@/app/types/Portfolio";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/initSupabase";
import Channel from "@/app/models/Channel";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import Portfolio from "@/app/models/Portfolio";

export async function POST(req: NextRequest) {
  try {
    const { channelName, channelLink } = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    // UPDATE CHANNEL
    if (id) {
      const updatedChannel = await Channel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        { channelName, channelLink },
        { new: true }
      );

      if (!updatedChannel) {
        return NextResponse.json(
          { error: "Channel not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Channel updated successfully" },
        { status: 200 }
      );
    }

    // CREATE CHANNEL
    const channel = await Channel.create({ channelName, channelLink });

    return NextResponse.json(
      { message: "Channel added successfully", channel },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // const { data, error } = await supabase
    //     .from('channels')
    //     .select()

    // if (error) {
    //     return NextResponse.json({ error: error.message }, { status: 500 })
    // }

    await connectDB()

    const data = await Channel.find({})

    if (!data) {
      return NextResponse.json({ error: "Channels not found" }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    // Step 1: Delete channel
    const deletedChannel = await Channel.findByIdAndDelete(objectId);

    if (!deletedChannel) {
      return NextResponse.json(
        { error: "Channel not found" },
        { status: 404 }
      );
    }

    // Step 2: Remove channel from all portfolios
    await Portfolio.updateMany(
      { channels: objectId },
      { $pull: { channels: objectId } }
    );

    return NextResponse.json(
      { message: "Channel deleted and portfolios updated" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


