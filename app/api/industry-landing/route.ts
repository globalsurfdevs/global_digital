import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import IndustryLanding from "@/app/models/IndustryLanding";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { revalidateTag } from "next/cache";


export async function GET() {
    try {
        await connectDB();
        const industryLanding = await IndustryLanding.findOne({});
        if (!industryLanding) {
            return NextResponse.json({ message: "IndustryLanding not found" }, { status: 404 });
        }
        return NextResponse.json({data:industryLanding,message:"IndustryLanding fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const industryLanding = await IndustryLanding.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!industryLanding) {
            return NextResponse.json({ message: "Industry Landing not found" }, { status: 404 });
        }
        revalidateTag("industryLanding")
        return NextResponse.json({data:industryLanding,message:"Industry Landing updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}