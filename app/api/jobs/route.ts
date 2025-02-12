import { supabase } from "@/app/lib/initSupabase"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const slug = searchParams.get("slug")

        if (id) {

            let { data: jobs, error } = await supabase
                .from('jobs')
                .select('*')


            if (!jobs) {
                return NextResponse.json({ error: "Jobs not found" }, { status: 404 });
            }

            return NextResponse.json({ jobs });
        }

        else if (slug) {
            let { data: job, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('slug', slug)

            if (!job) {
                    return NextResponse.json({ error: "Job not found" }, { status: 404 });
            } else {
                return NextResponse.json({ job });
            }


        } else {


            let { data: jobs, error } = await supabase
                .from('jobs')
                .select("*")

            if (!jobs) {
                return NextResponse.json({ error: "Job not found" }, { status: 404 });
            }

            return NextResponse.json({ jobs });
        }

    } catch (error) {
        console.log("error getting team members:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const formData = await req.formData()
    const jobTitle = formData.get("jobTitle") as string
    const team = formData.get("team") as string
    const description = formData.get("description") as string
    const slug = formData.get("slug") as string

    try {

        if (!id) {
            const { data, error } = await supabase
                .from('jobs')
                .insert([
                    { jobTitle, team, description,slug },
                ])
                .select()

            if (data) {
                return NextResponse.json({ message: "Job added successfully" }, { status: 200 })
            } else if (error) {
                return NextResponse.json({ error: "Adding job failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        } else {

            const { data, error } = await supabase
                .from('jobs')
                .update({jobTitle, team, description,slug})
                .eq('id', id)
                .select()

            if (data) {
                return NextResponse.json({ message: "Job updated successfully" }, { status: 200 })
            } else if (error) {
                return NextResponse.json({ error: "Updating job failed" }, { status: 400 })
            } else {
                return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
            }
        }

    } catch (error) {
        console.log("Adding/Updating job failed", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 })
    }
}


export async function DELETE(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Job not found" }, { status: 400 })
        }


        const { error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', id)

            if(error){
                return NextResponse.json({error:"Deleting job failed"},{status:400})
            }

            return NextResponse.json({message:"job deleted successfully"},{status:200})

    } catch (error) {
        console.log("error getting news:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}