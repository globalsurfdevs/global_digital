
import { supabase } from "@/app/lib/initSupabase"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const slug = searchParams.get('slug')

        console.log("slug",slug)

        if (id) {


            let { data: blogs, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)


            if (!blogs) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }

            return NextResponse.json({ blogs });

        }else if(slug){
            let { data: blogs, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)

                console.log(blogs)

            if (!blogs) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }

            return NextResponse.json({ blogs });

        } else {

            let { data: blog, error } = await supabase
                .from('blogs')
                .select("*")

            if (!blog) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }

            return NextResponse.json({ blog });
        }

    } catch (error) {
        console.log("error getting blog data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const formData = await req.formData()
    const heading = formData.get("heading") as string
    const description = formData.get("description") as string
    const thumbnail = formData.get("thumbnail") as string
    // const metadataTitle = formData.get("metadataTitle") as string
    // const metadataDesc = formData.get("metadataDesc") as string
    const content = formData.get("content") as string
    const slug = formData.get("slug") as string
    const category = formData.get("category") as string

    try {

        if (!id) {

            const { data, error } = await supabase
                .from('blogs')
                .insert([
                    { heading, description, thumbnail, content, slug, category },
                ])
                .select()



            if (data) {
                return NextResponse.json({ message: "Blog added successfully" }, { status: 200 })
            } else if (error) {
                return NextResponse.json({ error: "Adding blog failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        } else {
            
            const { data, error } = await supabase
                .from('blogs')
                .update({ heading, description, thumbnail:!thumbnail ? undefined : thumbnail, content, slug, category })
                .eq('id', id)
                .select()

                console.log(error)
            if (data) {
                return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 })
            } else if (error) {
                return NextResponse.json({ error: "Updating blog failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

    } catch (error) {
        console.log("Adding/Updating blog failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }
}


export async function DELETE(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Blog not found" }, { status: 400 })
        }


        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id)

            if(error){
                return NextResponse.json({error:"Deleting blog failed"},{status:400})
            }

            return NextResponse.json({message:"Blog deleted successfully"},{status:200})

    } catch (error) {
        console.log("error getting news:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}