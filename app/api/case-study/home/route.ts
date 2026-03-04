import { NextRequest, NextResponse } from "next/server";
import PortfolioHighlight from "@/app/models/PortfolioHighlight";

export async function GET(req: NextRequest) {
    try {

        const caseStudyHighlights = await PortfolioHighlight
            .find({ showInHome: true })
            .populate("companyId") // reference to Portfolio
            .limit(3)
            .lean();

        const sortedHighlights = caseStudyHighlights.sort(
            (a: any, b: any) =>
                (a.companyId?.index ?? Infinity) - (b.companyId?.index ?? Infinity)
        );

        return NextResponse.json(
            { caseStudyHighlights: sortedHighlights },
            { status: 200 }
        );

    } catch (error) {
        console.error("error getting case study:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}