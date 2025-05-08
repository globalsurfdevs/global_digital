// import { supabase } from "@/app/lib/initSupabase";
// import { Portfolio } from "@/app/types/Portfolio";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/initSupabase";

export async function POST(req: NextRequest) {
    try {
        const {channels} = await req.json()
        

        const { data, error } = await supabase
        .from('channels')
        .update({ channels: channels })
        .eq('id', 1)
        .select()
                

if(error){
    return NextResponse.json({ error: error.message }, { status: 500 })
}
        
       console.log(channels)

        return NextResponse.json({ message: "Channels added successfully" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
        .from('channels')
        .select()
        
        if(error){
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
