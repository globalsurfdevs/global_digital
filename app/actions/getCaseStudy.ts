import connectDb from "@/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import PortfolioHighlight from "@/app/models/PortfolioHighlight";
import mongoose from "mongoose";
import "@/app/models/Category";
import "@/app/models/Channel";

export async function getCaseStudyOrPortfolio(slug: string, type: string) {
    await connectDb();

    const caseStudy = await Portfolio
        .findOne({ slug })
        .populate("categories")
        .populate("channels")
        .lean() as any;

    if (!caseStudy) return null;

    const caseStudyHighlights = await PortfolioHighlight.find({
        companyId: new mongoose.Types.ObjectId(caseStudy._id)
    }).lean();

    let data;
    if (type == "portfolio") {
        data = { portfolio: caseStudy, portfolioHighlights: caseStudyHighlights };
    } else {
        data = { caseStudy, caseStudyHighlights };
    }
    return JSON.parse(JSON.stringify(data));
}