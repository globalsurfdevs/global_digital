import Industry from "@/app/models/Industries"; // adjust path/name to match your actual model file
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const industries = body.industries;

        if (!industries || !Array.isArray(industries)) {
            return NextResponse.json(
                { message: "Industries data missing" },
                { status: 400 }
            );
        }

        const doc = await Industry.findOne();

        if (!doc) {
            return NextResponse.json(
                { message: "Industry document not found" },
                { status: 404 }
            );
        }

        // Map incoming order (array of _ids in new sequence) to actual subdocuments
        const reordered = industries
            .map((industry: any) => doc.items.id(industry._id))
            .filter(Boolean);

        // Guard: only overwrite if every id was found, so a bad payload can't wipe the array
        if (reordered.length !== doc.items.length) {
            return NextResponse.json(
                { message: "Reorder payload did not match existing items" },
                { status: 400 }
            );
        }

        doc.items = reordered;

        await doc.save();

        return NextResponse.json(
            { message: "Industries reordered successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}