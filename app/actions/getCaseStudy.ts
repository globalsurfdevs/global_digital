import connectDb from "@/lib/mongodb";
import Portfolio from "@/app/models/Portfolio";
import PortfolioHighlight from "@/app/models/PortfolioHighlight";
import mongoose from "mongoose";
import "@/app/models/Category";
import "@/app/models/Channel";
import type { Portfolio as PortfolioData } from "@/app/types/Portfolio";

export async function getCaseStudyOrPortfolio(slug: string, type: string) {
  await connectDb();

  const caseStudy = (await Portfolio.findOne({ slug })
    .populate("categories")
    .populate("channels")
    .lean()) as any;

  if (!caseStudy) return null;

  const caseStudyHighlights = await PortfolioHighlight.find({
    companyId: new mongoose.Types.ObjectId(caseStudy._id),
  }).lean();

  let data;
  if (type == "portfolio" || slug == "quad-dream") {
    data = { portfolio: caseStudy, portfolioHighlights: caseStudyHighlights };
  } else {
    data = { caseStudy, caseStudyHighlights };
  }

  return JSON.parse(JSON.stringify(data));
}

export async function getSuccessStoriesPortfolios({
  companyId,
  slug,
  relatedPortfolioIds,
}: {
  companyId: string;
  slug: string;
  relatedPortfolioIds?: (string | { _id: string })[];
}): Promise<PortfolioData[]> {
  await connectDb();

  const portfolios = await Portfolio.find({})
    .sort({ index: "ascending" })
    .populate("categories")
    .populate("channels")
    .lean();
  const serializedPortfolios = JSON.parse(
    JSON.stringify(portfolios),
  ) as PortfolioData[];
  const currentPortfolioId = companyId.toString();

  if (relatedPortfolioIds?.length) {
    const relatedIds = relatedPortfolioIds
      .map((portfolio) =>
        typeof portfolio === "string" ? portfolio : portfolio._id.toString(),
      )
      .filter((id) => id !== currentPortfolioId);
    const portfoliosById = new Map(
      serializedPortfolios.map((portfolio) => [portfolio._id, portfolio]),
    );

    return relatedIds
      .map((id) => portfoliosById.get(id))
      .filter((portfolio): portfolio is PortfolioData => portfolio !== undefined);
  }

  const otherPortfolios = serializedPortfolios.filter(
    (portfolio) => portfolio._id !== currentPortfolioId,
  );

  if (slug === "sobha-constructions-v2") {
    return otherPortfolios.filter((portfolio) =>
      ["innovo-group", "asgc", "general-construction-co-llc"].includes(
        portfolio.slug,
      ),
    );
  }

  const allowedIds = [46, 49, 57, 85, 73, 83, 1, 43];

  return otherPortfolios
    .filter((portfolio) => allowedIds.includes(portfolio.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}
