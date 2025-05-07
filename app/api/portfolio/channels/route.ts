// import { supabase } from "@/app/lib/initSupabase";
// import { Portfolio } from "@/app/types/Portfolio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {channels} = await req.json()


       console.log(channels)

        return NextResponse.json({ message: "Hello" })

    } catch (error) {
        console.log(error)
    }
}