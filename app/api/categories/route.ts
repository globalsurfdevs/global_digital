import { supabase } from "@/app/lib/initSupabase";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    try {


        let { data: categories, error } = await supabase
            .from('categories')
            .select('*')

        if (categories) {

            return NextResponse.json({ categories });
        }

        if (error) {
            return NextResponse.json({ error: "Fetching categories failed" })
        }

    } catch (error) {
        console.log("error getting categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    try {

        const formData = await req.formData()
        const category = formData.get("category") as string;


        const { data, error } = await supabase
            .from('categories')
            .insert([
                { name: category },
            ])
            .select()



        if (data) {
            return NextResponse.json({ message: "Added category successfully" }, { status: 200 });
        }

        if (error) {
            console.log(error)
            return NextResponse.json({ error: "Fetching categories failed" }, { status: 400 })
        }

    } catch (error) {
        console.log("error getting categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {

    try {

        const formData = await req.formData()
        const id = formData.get("id") as string;



        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id',id)




        if (!error) {
            return NextResponse.json({ message: "Removed category successfully" }, { status: 200 });
        }

        if (error) {
            console.log(error)
            return NextResponse.json({ error: "Removing categories failed" }, { status: 400 })
        }

    } catch (error) {
        console.log("error removing categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}