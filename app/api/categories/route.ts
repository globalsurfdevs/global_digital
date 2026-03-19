import { supabase } from "@/app/lib/initSupabase";
import Category from "@/app/models/Category";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    try {


        // let { data: categories, error } = await supabase
        //     .from('categories')
        //     .select('*')

        await connectDB()
        const categories = await Category.find({})

        if (categories) {

            return NextResponse.json({ categories });
        }

        if (!categories) {
            return NextResponse.json({ error: "Fetching categories failed" })
        }

    } catch (error) {
        console.log("error getting categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const category = formData.get("category") as string;

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 });
        }

        await Category.create({ name: category });

        return NextResponse.json(
            { message: "Added category successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("error adding category:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        const id = formData.get("id") as string;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Removed category successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("error removing categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}