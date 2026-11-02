import { NextResponse } from "next/server";
import { getFeaturedPortfolios } from "@/app/lib/services/portfolio.service";

export async function GET() {
  try {
    const portfolio = await getFeaturedPortfolios();
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Error fetching featured portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured portfolios" },
      { status: 500 },
    );
  }
}
