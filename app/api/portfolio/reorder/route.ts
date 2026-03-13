import Portfolio from "@/app/models/Portfolio";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const portfolios = formData.get("portfolios") as string;

        if (!portfolios) {
            return NextResponse.json(
                { error: "Portfolios data missing" },
                { status: 400 }
            );
        }

        const actualPortfolios = JSON.parse(portfolios);

        await Promise.all(
            actualPortfolios.map((portfolio: any) =>
                Portfolio.findByIdAndUpdate(portfolio._id, {
                    index: portfolio.index,
                })
            )
        );

        return NextResponse.json(
            { message: "Portfolios updated successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}