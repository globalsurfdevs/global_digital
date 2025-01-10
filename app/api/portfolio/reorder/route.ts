import { supabase } from "@/app/lib/initSupabase";
import { Portfolio } from "@/app/types/Portfolio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const portfolios = formData.get("portfolios") as string
        const actualPortfolios = JSON.parse(portfolios)

        console.log(actualPortfolios)
        
        for (let i = 0; i < actualPortfolios.length; i++) {

            const { data, error } = await supabase
                .from('portfolios')
                .update({ index: actualPortfolios[i].index })
                .eq('id', actualPortfolios[i].id)
                .select()
        }

        return NextResponse.json({ message: "Hello" })

    } catch (error) {
        console.log(error)
    }
}