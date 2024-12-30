import { supabase } from "@/app/lib/initSupabase"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    console.log("Here")
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const formData = await req.formData()
    const highlightNumber = formData.get("highlightNumber") as string
    const hightlightText = formData.get("highlightText") as string
    const customId = formData.get("customId") as string

    try {

        const { data, error } = await supabase
            .from('portfolioHighlights')
            .insert([
                { number: highlightNumber, text: hightlightText, companyId:id,customId },
            ])
            .select()


        if (data) {

            return NextResponse.json({ message: "Added highlight successfully" }, { status: 200 })

        } else if (error) {
            return NextResponse.json({ error: "Adding highlight failed" }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
        }


    } catch (error) {
        console.log("Adding/Updating highlight failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}


export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    console.log("id",id)
    
    try {


        const { error } = await supabase
            .from('portfolioHighlights')
            .delete()
            .eq('customId', id)



        if (!error) {

            return NextResponse.json({ message: "Removed highlight successfully" }, { status: 200 })

        } else if (error) {
            return NextResponse.json({ error: "Removing highlight failed failed" }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
        }


    } catch (error) {
        console.log("Removing highlight failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }

}