import Job from "@/app/models/Job";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {

      const jobs = await Job.findById(id);

      if (!jobs) {
        return NextResponse.json({ error: "Jobs not found" }, { status: 404 });
      }

      return NextResponse.json({ jobs });
    } else if (slug) {
     
      const job = await Job.findOne({ slug });

      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      } else {
        return NextResponse.json({ job });
      }
    } else {

      const jobs = await Job.find();

      if (!jobs) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }

      return NextResponse.json({ jobs });
    }
  } catch (error) {
    console.log("error getting team members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const formData = await req.formData();
  const jobTitle = formData.get("jobTitle") as string;
  const team = formData.get("team") as string;
  const description = formData.get("description") as string;
  const slug = formData.get("slug") as string;

  try {
    if (!id) {
    

      const job = await Job.create({ jobTitle, team, description, slug });

      if (job) {
        return NextResponse.json(
          { message: "Job added successfully" },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { error: "Adding job failed" },
          { status: 400 },
        );
      }
    } else {

      const job = await Job.findByIdAndUpdate(id, {
        jobTitle,
        team,
        description,
        slug,
      });

      if (job) {
        return NextResponse.json(
          { message: "Job updated successfully" },
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          { error: "Updating job failed" },
          { status: 400 },
        );
      }
    }
  } catch (error) {
    console.log("Adding/Updating job failed", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job not found" }, { status: 400 });
    }


    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { error: "Deleting job failed" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("error getting news:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
