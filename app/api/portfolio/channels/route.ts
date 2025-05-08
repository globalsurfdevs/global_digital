// import { supabase } from "@/app/lib/initSupabase";
// import { Portfolio } from "@/app/types/Portfolio";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/initSupabase";

export async function POST(req: NextRequest) {
    try {
        const { channelName, channelLink } = await req.json();
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (id) {
            const { data: updatedChannel, error: updateError } = await supabase
                .from('channels')
                .update({ channelName, channelLink })
                .eq('id', id)
                .select()
                .single();

            if (updateError) {
                return NextResponse.json({ error: updateError.message }, { status: 500 });
            }

            // Now update all portfolios that include this channel
            const { data: portfolios, error: fetchError } = await supabase
                .from('portfolios')
                .select('id, channels');

            if (fetchError) {
                return NextResponse.json({ error: fetchError.message }, { status: 500 });
            }

            // Filter and update
            for (const portfolio of portfolios) {
                const updatedChannels = (portfolio.channels || []).map((ch: any) =>
                    ch.id === updatedChannel.id
                        ? { ...ch, channelName: updatedChannel.channelName, channelLink: updatedChannel.channelLink }
                        : ch
                );

                await supabase
                    .from('portfolios')
                    .update({ channels: updatedChannels })
                    .eq('id', portfolio.id);
            }

            return NextResponse.json(
                { message: "Channels updated successfully" },
                { status: 200 }
            );
        }

        const { data, error } = await supabase
            .from('channels')
            .insert([
                { channelName, channelLink },
            ])
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(
            { message: "Channels added successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const { data, error } = await supabase
            .from('channels')
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
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
  
      // Step 1: Delete the channel
      const { data: deletedChannel, error: deleteError } = await supabase
        .from("channels")
        .delete()
        .eq("id", id)
        .select()
        .single();
  
      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }
  
      // Step 2: Fetch all portfolios with channels
      const { data: portfolios, error: fetchError } = await supabase
        .from("portfolios")
        .select("id, channels");
  
      if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
      }
  
      // Step 3: Filter out deleted channel from each portfolio
      for (const portfolio of portfolios) {
        const updatedChannels = (portfolio.channels || []).filter(
          (ch: any) => ch.id?.toString() !== id
        );
  
        await supabase
          .from("portfolios")
          .update({ channels: updatedChannels })
          .eq("id", portfolio.id);
      }
  
      return NextResponse.json(
        { message: "Channel deleted and portfolios updated" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

